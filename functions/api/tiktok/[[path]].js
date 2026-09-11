import { MAX_VIDEO_BYTES, SESSION_SECONDS, StudioError, requireValue, randomToken, hash, seal, unseal,
  cookie, setCookie, sameOrigin, validatePost, boundedBytes, jsonBody } from '../../../lib/tiktok-studio.js';

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
async function deleteMediaFromPayload(env, payload) {
  if (!payload) return;
  try {
    const data = await unseal(payload, env.TIKTOK_SESSION_SECRET);
    if (data.objectKey) await env.TIKTOK_MEDIA_BUCKET.delete(data.objectKey);
  } catch { /* Cleanup is best effort; the R2 lifecycle rule is the final backstop. */ }
}
async function deleteOwnerMedia(env, owner) {
  const jobs = await env.TIKTOK_STUDIO_DB.prepare('SELECT payload FROM studio_jobs WHERE owner = ?').bind(owner).all();
  await Promise.all((jobs.results || []).map(job => deleteMediaFromPayload(env, job.payload)));
}
async function serveMedia(request, env, url) {
  requireValue(request.method === 'GET' || request.method === 'HEAD', 'Endpoint or method not found.', 404);
  const id = url.searchParams.get('id'); const token = url.searchParams.get('token');
  requireValue(/^[a-f0-9]{64}$/.test(id || '') && /^[a-f0-9]{64}$/.test(token || ''), 'Media not found.', 404);
  const job = await env.TIKTOK_STUDIO_DB.prepare('SELECT payload FROM studio_jobs WHERE id = ? AND expires > ?').bind(id, now()).first();
  requireValue(job?.payload, 'Media not found.', 404);
  const data = await unseal(job.payload, env.TIKTOK_SESSION_SECRET);
  requireValue(data.objectKey && data.mediaTokenHash && await hash(token) === data.mediaTokenHash, 'Media not found.', 404);
  const object = request.method === 'HEAD'
    ? await env.TIKTOK_MEDIA_BUCKET.head(data.objectKey)
    : await env.TIKTOK_MEDIA_BUCKET.get(data.objectKey, { range: request.headers });
  requireValue(object, 'Media not found.', 404);
  const headers = new Headers({
    'Accept-Ranges': 'bytes', 'Cache-Control': 'private, no-store', 'Content-Type': 'video/mp4',
    'X-Content-Type-Options': 'nosniff', ETag: object.httpEtag || object.etag || '',
  });
  if (object.writeHttpMetadata) object.writeHttpMetadata(headers);
  headers.set('Content-Type', 'video/mp4');
  if (object.range) {
    headers.set('Content-Length', String(object.range.length));
    headers.set('Content-Range', `bytes ${object.range.offset}-${object.range.offset + object.range.length - 1}/${object.size}`);
  } else headers.set('Content-Length', String(object.size));
  if (!headers.get('ETag')) headers.delete('ETag');
  return new Response(request.method === 'HEAD' ? null : object.body, { status: object.range ? 206 : 200, headers });
}
export async function onRequest({ request, env }) {
  try {
    requireValue(env.TIKTOK_STUDIO_ENABLED === 'true', 'TikTok Studio is not enabled yet.', 503);
    requireValue(env.TIKTOK_STUDIO_DB && env.TIKTOK_MEDIA_BUCKET && env.TIKTOK_CLIENT_KEY && env.TIKTOK_CLIENT_SECRET && env.TIKTOK_SESSION_SECRET?.length >= 32 && env.TIKTOK_ORIGIN, 'Finish the Cloudflare Studio bindings and secrets setup.', 503);
    const origin = new URL(env.TIKTOK_ORIGIN).origin;
    const url = new URL(request.url);
    requireValue(url.origin === origin && url.protocol === 'https:', 'Open Studio on its configured HTTPS domain.', 403);
    const action = url.pathname.replace(/^\/api\/tiktok\//, '').replace(/\/$/, '');
    const callback = `${origin}/api/tiktok/callback`;
    const home = `${origin}/bless-content-studio/`;
    // Purge expired records whenever Studio is used. R2 lifecycle deletion remains a backstop.
    const expired = await env.TIKTOK_STUDIO_DB.prepare('SELECT payload FROM studio_jobs WHERE expires <= ?').bind(now()).all();
    await Promise.all((expired.results || []).map(job => deleteMediaFromPayload(env, job.payload)));
    await env.TIKTOK_STUDIO_DB.batch([
      env.TIKTOK_STUDIO_DB.prepare('DELETE FROM studio_oauth WHERE expires <= ?').bind(now()),
      env.TIKTOK_STUDIO_DB.prepare('DELETE FROM studio_jobs WHERE expires <= ?').bind(now()),
      env.TIKTOK_STUDIO_DB.prepare('DELETE FROM studio_sessions WHERE expires <= ?').bind(now()),
    ]);
    if (action === 'media') return await serveMedia(request, env, url);
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
        await deleteOwnerMedia(env, oldId);
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
      await deleteOwnerMedia(env, s.id);
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
      const payload = await seal({ postInfo }, env.TIKTOK_SESSION_SECRET);
      const result = await env.TIKTOK_STUDIO_DB.prepare("INSERT OR IGNORE INTO studio_jobs (id, owner, stage, size, payload, created, expires) VALUES (?, ?, 'ready', ?, ?, ?, ?)")
        .bind(id, s.id, body.size, payload, now(), s.expires).run();
      requireValue(result.meta.changes === 1, 'This request was already submitted. Check its status before starting another.', 409);
      return json({ id });
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
      const approved = await unseal(job.payload, env.TIKTOK_SESSION_SECRET);
      const objectKey = `studio/${job.id}.mp4`; const mediaToken = randomToken();
      try {
        await env.TIKTOK_MEDIA_BUCKET.put(objectKey, bytes, { httpMetadata: { contentType: 'video/mp4' } });
        const mediaTokenHash = await hash(mediaToken);
        const available = await seal({ ...approved, objectKey, mediaTokenHash }, env.TIKTOK_SESSION_SECRET);
        await env.TIKTOK_STUDIO_DB.prepare("UPDATE studio_jobs SET stage = 'initializing_tiktok', payload = ? WHERE id = ? AND owner = ?").bind(available, job.id, s.id).run();
        const mediaUrl = `${origin}/api/tiktok/media?id=${encodeURIComponent(job.id)}&token=${encodeURIComponent(mediaToken)}`;
        const initialized = await tiktok('/post/publish/video/init/', s.auth.accessToken, {
          post_info: approved.postInfo, source_info: { source: 'PULL_FROM_URL', video_url: mediaUrl } });
        requireValue(initialized.publish_id, 'TikTok did not accept the media URL.', 424);
        const payload = await seal({ publishId: initialized.publish_id, objectKey, mediaTokenHash }, env.TIKTOK_SESSION_SECRET);
        await env.TIKTOK_STUDIO_DB.prepare("UPDATE studio_jobs SET stage = 'processing', payload = ? WHERE id = ? AND owner = ?").bind(payload, job.id, s.id).run();
        return json({ stage: 'processing' });
      } catch (error) {
        await env.TIKTOK_MEDIA_BUCKET.delete(objectKey);
        await env.TIKTOK_STUDIO_DB.prepare("UPDATE studio_jobs SET stage = 'initialization_failed', payload = NULL WHERE id = ? AND owner = ?").bind(job.id, s.id).run();
        throw error;
      }
    }
    if (action === 'status' && request.method === 'GET') {
      const job = await ownedJob(env, s, url.searchParams.get('id'));
      if (!job.payload) return json({ status: job.stage, expectedBytes: job.size });
      const data = await unseal(job.payload, env.TIKTOK_SESSION_SECRET);
      if (!data.publishId) return json({ status: job.stage, expectedBytes: job.size });
      const status = await tiktok('/post/publish/status/fetch/', s.auth.accessToken, { publish_id: data.publishId });
      if (status.status === 'PUBLISH_COMPLETE' || status.status === 'FAILED') {
        await deleteMediaFromPayload(env, job.payload);
        const finalPayload = await seal({ publishId: data.publishId }, env.TIKTOK_SESSION_SECRET);
        await env.TIKTOK_STUDIO_DB.prepare('UPDATE studio_jobs SET stage = ?, payload = ? WHERE id = ? AND owner = ?')
          .bind(status.status.toLowerCase(), finalPayload, job.id, s.id).run();
      }
      return json({
        status: status.status,
        failReason: status.fail_reason || null,
        downloadedBytes: Number.isSafeInteger(status.downloaded_bytes) ? status.downloaded_bytes : null,
        expectedBytes: job.size,
      });
    }
    return json({ error: 'Endpoint or method not found.' }, 404);
  } catch (error) {
    // Do not log or return raw errors: they can contain authorization codes, tokens, or signed URLs.
    return json({ error: error instanceof StudioError ? error.message : 'Studio could not complete this request. Check configuration or retry a status check.' }, error instanceof StudioError ? error.status : 500);
  }
}
