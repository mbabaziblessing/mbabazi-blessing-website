import { MAX_VIDEO_BYTES, SESSION_SECONDS, StudioError, requireValue, randomToken, hash, seal, unseal,
  cookie, setCookie, sameOrigin, validatePost, validateUploadUrl, boundedBytes, jsonBody } from '../../../lib/tiktok-studio.js';

const API = 'https://open.tiktokapis.com/v2';
const SID = '__Host-bcs_session'; const STATE = '__Host-bcs_oauth';
const now = () => Math.floor(Date.now() / 1000);
const security = { 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer', 'X-Content-Type-Options': 'nosniff', 'X-Frame-Options': 'DENY' };
const json = (data, status = 200, headers = {}) => Response.json(data, { status, headers: { ...security, ...headers } });
const redirect = (url, cookies = []) => {
  const headers = new Headers({ ...security, Location: url });
  cookies.forEach(c => headers.append('Set-Cookie', c));
  return new Response(null, { status: 303, headers });
};
function uploadReceipt(response, expected) {
  const value = response.headers.get('Content-Range');
  if (!value) return null;
  const match = /^bytes\s+0-(\d+)\/(\d+)$/i.exec(value.trim());
  requireValue(match && Number(match[2]) === expected, 'TikTok returned an invalid upload receipt.', 424);
  const finalByte = Number(match[1]);
  requireValue(finalByte === expected - 1 || finalByte === expected, 'TikTok did not acknowledge the complete file.', 424);
  return expected;
}
async function tiktok(path, token, body) {
  const response = await fetch(`${API}${path}`, { method: body ? 'POST' : 'GET',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined, signal: AbortSignal.timeout(20000) });
  let data;
  try { data = await response.json(); }
  catch {
    console.warn('TikTok dependency returned a non-JSON response.', { path, status: response.status });
    throw new StudioError(`TikTok temporarily returned HTTP ${response.status}. Wait one minute and try once.`, response.status === 429 ? 429 : 424);
  }
  if (!response.ok || data.error?.code !== 'ok') {
    const code = data.error?.code || `http_${response.status}`;
    console.warn('TikTok API request failed.', { path, status: response.status, code, logId: data.error?.log_id || null });
    throw new StudioError(`TikTok: ${code}. Check account eligibility, permissions, or reconnect.`, response.status === 429 ? 429 : 424);
  }
  return data.data;
}
async function session(request, env) {
  const raw = cookie(request, SID);
  requireValue(/^[a-f0-9]{64}$/.test(raw), 'Connect TikTok to continue.', 401);
  const id = await hash(raw);
  const row = await env.TIKTOK_STUDIO_DB.prepare('SELECT * FROM studio_sessions WHERE id = ? AND expires > ?').bind(id, now()).first();
  requireValue(row, 'Session expired. Connect TikTok again.', 401);
  return { ...row, auth: await unseal(row.payload, env.TIKTOK_SESSION_SECRET) };
}
async function ownedJob(env, s, id) {
  requireValue(typeof id === 'string' && /^[a-f0-9]{64}$/.test(id), 'Invalid upload identifier.');
  const job = await env.TIKTOK_STUDIO_DB.prepare('SELECT * FROM studio_jobs WHERE id = ? AND owner = ? AND expires > ?').bind(id, s.id, now()).first();
  requireValue(job, 'Upload not found for this session.', 404);
  return job;
}
export async function onRequest({ request, env }) {
  try {
    requireValue(env.TIKTOK_STUDIO_ENABLED === 'true', 'TikTok Studio is not enabled yet.', 503);
    requireValue(env.TIKTOK_STUDIO_DB && env.TIKTOK_CLIENT_KEY && env.TIKTOK_CLIENT_SECRET && env.TIKTOK_SESSION_SECRET?.length >= 32 && env.TIKTOK_ORIGIN, 'Finish the Cloudflare Studio bindings and secrets setup.', 503);
    const origin = new URL(env.TIKTOK_ORIGIN).origin;
    const url = new URL(request.url);
    requireValue(url.origin === origin && url.protocol === 'https:', 'Open Studio on its configured HTTPS domain.', 403);
    const action = url.pathname.replace(/^\/api\/tiktok\//, '').replace(/\/$/, '');
    const callback = `${origin}/api/tiktok/callback`;
    const home = `${origin}/bless-content-studio/`;
    // Purge expired records whenever Studio is used. A scheduled purge is required before any public launch.
    await env.TIKTOK_STUDIO_DB.batch([
      env.TIKTOK_STUDIO_DB.prepare('DELETE FROM studio_oauth WHERE expires <= ?').bind(now()),
      env.TIKTOK_STUDIO_DB.prepare('DELETE FROM studio_jobs WHERE expires <= ?').bind(now()),
      env.TIKTOK_STUDIO_DB.prepare('DELETE FROM studio_sessions WHERE expires <= ?').bind(now()),
    ]);
    if (action === 'start' && request.method === 'GET') {
      const state = randomToken();
      const previous = cookie(request, STATE);
      if (/^[a-f0-9]{64}$/.test(previous)) await env.TIKTOK_STUDIO_DB.prepare('DELETE FROM studio_oauth WHERE id = ?').bind(await hash(previous)).run();
      await env.TIKTOK_STUDIO_DB.prepare('INSERT INTO studio_oauth (id, expires) VALUES (?, ?)').bind(await hash(state), now() + 600).run();
      const target = new URL('https://www.tiktok.com/v2/auth/authorize/');
      target.search = new URLSearchParams({ client_key: env.TIKTOK_CLIENT_KEY, response_type: 'code',
        scope: 'user.info.basic,video.publish', redirect_uri: callback, state }).toString();
      return redirect(target.href, [setCookie(STATE, state, 600)]);
    }
    if (action === 'callback' && request.method === 'GET') {
      const state = url.searchParams.get('state');
      requireValue(state && state === cookie(request, STATE) && /^[a-f0-9]{64}$/.test(state), 'Login state mismatch. Restart from Studio.', 403);
      const consumed = await env.TIKTOK_STUDIO_DB.prepare('DELETE FROM studio_oauth WHERE id = ? AND expires > ? RETURNING id').bind(await hash(state), now()).first();
      requireValue(consumed, 'Login expired or already used. Restart from Studio.', 403);
      if (url.searchParams.has('error')) return redirect(`${home}?login=cancelled`, [setCookie(STATE, '', 0)]);
      const code = url.searchParams.get('code'); requireValue(code && code.length < 4096, 'Missing authorization code.');
      const response = await fetch(`${API}/oauth/token/`, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ client_key: env.TIKTOK_CLIENT_KEY, client_secret: env.TIKTOK_CLIENT_SECRET, code,
          grant_type: 'authorization_code', redirect_uri: callback }), signal: AbortSignal.timeout(20000) });
      const auth = await response.json();
      requireValue(response.ok && auth.access_token && auth.open_id && auth.expires_in > 60, 'TikTok token exchange failed. Restart login and check the callback configuration.', 424);
      requireValue(auth.scope?.split(',').includes('video.publish'), 'Publishing permission was not granted. Enable Direct Post and reconnect.', 403);
      const user = await tiktok('/user/info/?fields=open_id,avatar_url,display_name', auth.access_token);
      requireValue(user.user?.open_id === auth.open_id, 'TikTok account could not be verified.', 424);
      const old = cookie(request, SID);
      if (/^[a-f0-9]{64}$/.test(old)) {
        const oldId = await hash(old);
        await env.TIKTOK_STUDIO_DB.batch([
          env.TIKTOK_STUDIO_DB.prepare('DELETE FROM studio_jobs WHERE owner = ?').bind(oldId),
          env.TIKTOK_STUDIO_DB.prepare('DELETE FROM studio_sessions WHERE id = ?').bind(oldId),
        ]);
      }
      const raw = randomToken(); const csrf = randomToken();
      const age = Math.min(SESSION_SECONDS, auth.expires_in - 60);
      // Refresh tokens are intentionally discarded: this is a short-lived interactive test, not a scheduler.
      const payload = await seal({ accessToken: auth.access_token, csrf, user: user.user }, env.TIKTOK_SESSION_SECRET);
      await env.TIKTOK_STUDIO_DB.prepare('INSERT INTO studio_sessions (id, payload, expires) VALUES (?, ?, ?)').bind(await hash(raw), payload, now() + age).run();
      return redirect(home, [setCookie(SID, raw, age), setCookie(STATE, '', 0)]);
    }
    const s = await session(request, env);
    if (action === 'session' && request.method === 'GET') {
      const creator = await tiktok('/post/publish/creator_info/query/', s.auth.accessToken, {});
      const jobs = await env.TIKTOK_STUDIO_DB.prepare('SELECT id, stage FROM studio_jobs WHERE owner = ? AND expires > ? ORDER BY created DESC LIMIT 10').bind(s.id, now()).all();
      return json({ user: s.auth.user, creator, csrf: s.auth.csrf, expires: s.expires, jobs: jobs.results });
    }
    if (request.method === 'POST') {
      sameOrigin(request, origin);
      requireValue(request.headers.get('X-Studio-CSRF') === s.auth.csrf, 'Session security check failed. Reload Studio.', 403);
    }
    if (action === 'disconnect' && request.method === 'POST') {
      let revoked = false;
      try {
        const r = await fetch(`${API}/oauth/revoke/`, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ client_key: env.TIKTOK_CLIENT_KEY, client_secret: env.TIKTOK_CLIENT_SECRET, token: s.auth.accessToken }), signal: AbortSignal.timeout(15000) });
        const body = await r.json(); revoked = r.ok && !body.error;
      } catch { /* Delete local access even if TikTok cannot be reached. */ }
      await env.TIKTOK_STUDIO_DB.batch([
        env.TIKTOK_STUDIO_DB.prepare('DELETE FROM studio_jobs WHERE owner = ?').bind(s.id),
        env.TIKTOK_STUDIO_DB.prepare('DELETE FROM studio_sessions WHERE id = ?').bind(s.id),
      ]);
      return json({ revoked }, 200, { 'Set-Cookie': setCookie(SID, '', 0) });
    }
    if (action === 'init' && request.method === 'POST') {
      const body = await jsonBody(request);
      requireValue(typeof body.requestId === 'string' && /^[a-f0-9]{64}$/.test(body.requestId), 'Missing upload request identifier.');
      const creator = await tiktok('/post/publish/creator_info/query/', s.auth.accessToken, {});
      const postInfo = validatePost(body, creator);
      const id = await hash(`${s.id}:${body.requestId}`);
      const result = await env.TIKTOK_STUDIO_DB.prepare("INSERT OR IGNORE INTO studio_jobs (id, owner, stage, size, created, expires) VALUES (?, ?, 'initializing', ?, ?, ?)")
        .bind(id, s.id, body.size, now(), s.expires).run();
      requireValue(result.meta.changes === 1, 'This request was already submitted. Check its status before starting another.', 409);
      try {
        const data = await tiktok('/post/publish/video/init/', s.auth.accessToken, {
          post_info: postInfo, source_info: { source: 'FILE_UPLOAD', video_size: body.size, chunk_size: body.size, total_chunk_count: 1 } });
        requireValue(data.publish_id && data.upload_url, 'TikTok did not return an upload destination.', 424);
        const payload = await seal({ publishId: data.publish_id, uploadUrl: validateUploadUrl(data.upload_url) }, env.TIKTOK_SESSION_SECRET);
        await env.TIKTOK_STUDIO_DB.prepare("UPDATE studio_jobs SET stage = 'ready', payload = ? WHERE id = ? AND owner = ?").bind(payload, id, s.id).run();
        return json({ id });
      } catch (error) {
        await env.TIKTOK_STUDIO_DB.prepare("UPDATE studio_jobs SET stage = 'initialization_failed' WHERE id = ? AND owner = ?").bind(id, s.id).run();
        throw error;
      }
    }
    if (action === 'upload' && request.method === 'POST') {
      const job = await ownedJob(env, s, url.searchParams.get('id'));
      requireValue(job.stage === 'ready', 'This upload has already started. Check its status.', 409);
      requireValue(request.headers.get('Content-Type') === 'video/mp4', 'MP4 required.', 415);
      const bytes = await boundedBytes(request, MAX_VIDEO_BYTES);
      requireValue(bytes.length === job.size, 'File size differs from the approved upload.');
      requireValue(new TextDecoder().decode(bytes.slice(4, 8)) === 'ftyp', 'File does not have an MP4 header.');
      const claimed = await env.TIKTOK_STUDIO_DB.prepare("UPDATE studio_jobs SET stage = 'uploading' WHERE id = ? AND owner = ? AND stage = 'ready' RETURNING id").bind(job.id, s.id).first();
      requireValue(claimed, 'Upload already started. Check status.', 409);
      const data = await unseal(job.payload, env.TIKTOK_SESSION_SECRET);
      try {
        // A Blob gives the Workers runtime a fixed-size body so it can generate the
        // transport Content-Length instead of forwarding an empty/chunked upload.
        const uploadBody = new Blob([bytes], { type: 'video/mp4' });
        const r = await fetch(validateUploadUrl(data.uploadUrl), { method: 'PUT', redirect: 'error', headers: {
          'Content-Type': 'video/mp4', 'Content-Range': `bytes 0-${bytes.length - 1}/${bytes.length}` },
          body: uploadBody, signal: AbortSignal.timeout(90000) });
        requireValue(r.status === 201, 'TikTok did not confirm the full upload. Check status before trying another post.', 424);
        const receiptBytes = uploadReceipt(r, bytes.length);
        const payload = await seal({ ...data, receiptBytes }, env.TIKTOK_SESSION_SECRET);
        await env.TIKTOK_STUDIO_DB.prepare("UPDATE studio_jobs SET stage = 'processing', payload = ? WHERE id = ? AND owner = ?").bind(payload, job.id, s.id).run();
        return json({ stage: 'processing', receiptBytes });
      } catch (error) {
        await env.TIKTOK_STUDIO_DB.prepare("UPDATE studio_jobs SET stage = 'upload_uncertain' WHERE id = ? AND owner = ?").bind(job.id, s.id).run();
        throw error;
      }
    }
    if (action === 'status' && request.method === 'GET') {
      const job = await ownedJob(env, s, url.searchParams.get('id'));
      if (!job.payload) return json({ status: job.stage, expectedBytes: job.size });
      const data = await unseal(job.payload, env.TIKTOK_SESSION_SECRET);
      const status = await tiktok('/post/publish/status/fetch/', s.auth.accessToken, { publish_id: data.publishId });
      if (status.status === 'PUBLISH_COMPLETE' || status.status === 'FAILED') {
        await env.TIKTOK_STUDIO_DB.prepare('UPDATE studio_jobs SET stage = ? WHERE id = ? AND owner = ?')
          .bind(status.status.toLowerCase(), job.id, s.id).run();
      }
      return json({
        status: status.status,
        failReason: status.fail_reason || null,
        uploadedBytes: Number.isSafeInteger(status.uploaded_bytes) ? status.uploaded_bytes : null,
        expectedBytes: job.size,
        receiptBytes: Number.isSafeInteger(data.receiptBytes) ? data.receiptBytes : null,
      });
    }
    return json({ error: 'Endpoint or method not found.' }, 404);
  } catch (error) {
    // Do not log or return raw errors: they can contain authorization codes, tokens, or signed URLs.
    return json({ error: error instanceof StudioError ? error.message : 'Studio could not complete this request. Check configuration or retry a status check.' }, error instanceof StudioError ? error.status : 500);
  }
}
