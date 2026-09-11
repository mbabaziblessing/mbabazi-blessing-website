const $ = id => document.getElementById(id);
let state = null; let file = null; let previewUrl = ''; let duration = 0; let busy = false;
let selection = 0; const jobs = new Map();
const token = () => Array.from(crypto.getRandomValues(new Uint8Array(32)), b => b.toString(16).padStart(2, '0')).join('');
function notice(message, error = false) { $('message').textContent = message; $('message').classList.toggle('error', error); }
async function api(path, options = {}) {
  const response = await fetch(`/api/tiktok/${path}`, { credentials: 'same-origin', ...options,
    headers: { ...(options.method === 'POST' ? { 'X-Studio-CSRF': state?.csrf || '' } : {}), ...options.headers } });
  const type = response.headers.get('Content-Type') || '';
  if (!type.includes('application/json')) {
    const message = response.status === 502
      ? 'Cloudflare returned a temporary 502 gateway error. Wait one minute and try once.'
      : `Studio received an unexpected HTTP ${response.status} response. Check Cloudflare Functions logs.`;
    throw new Error(message);
  }
  const data = await response.json();
  if (!response.ok) { const e = new Error(data.error || 'Request failed.'); e.status = response.status; throw e; }
  return data;
}
function row(id, status) {
  let entry = jobs.get(id);
  if (!entry) {
    const li = document.createElement('li'); const label = document.createElement('span'); const button = document.createElement('button');
    button.type = 'button'; button.className = 'secondary'; button.textContent = 'Check status';
    button.addEventListener('click', () => checkStatus(id)); li.append(label, button); $('jobs').prepend(li);
    entry = { label, button }; jobs.set(id, entry);
  }
  entry.label.textContent = `Upload ${id.slice(0, 8)} · ${status}`; $('activity').hidden = false;
}
function byteProgress(data) {
  if (!Number.isSafeInteger(data.downloadedBytes) || !Number.isSafeInteger(data.expectedBytes)) return '';
  return ` · ${data.downloadedBytes.toLocaleString()} of ${data.expectedBytes.toLocaleString()} bytes downloaded by TikTok`;
}
async function checkStatus(id) {
  const entry = jobs.get(id); if (entry) entry.button.disabled = true;
  try {
    const data = await api(`status?id=${encodeURIComponent(id)}`);
    row(id, `${data.failReason ? `${data.status}: ${data.failReason}` : data.status}${byteProgress(data)}`);
    if (data.status === 'PUBLISH_COMPLETE') notice('TikTok confirmed the post is complete. Check Only me videos on your profile.');
    else if (['PROCESSING_DOWNLOAD', 'PROCESSING_UPLOAD'].includes(data.status)) notice(`TikTok is still downloading or finalizing this video${byteProgress(data)}. Do not submit it again.`);
    else if (data.status === 'FAILED') notice(`TikTok rejected this post: ${data.failReason || 'No failure reason was provided.'}`, true);
    return data.status;
  } catch (e) { notice(e.message, true); return 'CHECK_FAILED'; }
  finally { if (entry) entry.button.disabled = false; }
}
async function load() {
  try {
    state = await api('session'); $('connect').hidden = true; $('disconnect').hidden = false; $('post-form').hidden = false;
    $('account').textContent = `${state.creator.creator_nickname || state.user.display_name} (@${state.creator.creator_username || 'connected account'})`;
    const privateAvailable = state.creator.privacy_level_options?.includes('SELF_ONLY');
    if (privateAvailable) $('privacy').add(new Option('Only me', 'SELF_ONLY'));
    $('publish').disabled = !privateAvailable;
    $('comments').disabled = state.creator.comment_disabled === true;
    $('comments-note').textContent = state.creator.comment_disabled ? 'Your TikTok account currently disables comments.' : '';
    for (const job of state.jobs) row(job.id, job.stage);
    notice(privateAvailable ? `Connected. Maximum video duration: ${state.creator.max_video_post_duration_sec} seconds.` : 'TikTok is not offering Only me for this account. Private posting is unavailable.', !privateAvailable);
  } catch (e) {
    if (e.status === 401) notice(new URLSearchParams(location.search).get('login') === 'cancelled' ? 'Login was cancelled. Connect when you are ready.' : 'Connect your TikTok sandbox target account to begin.');
    else notice(e.message, true);
  }
}
$('video-file').addEventListener('change', async () => {
  const current = ++selection; file = null; duration = 0; $('consent').checked = false;
  if (previewUrl) URL.revokeObjectURL(previewUrl); $('preview').hidden = true; $('preview').removeAttribute('src');
  const chosen = $('video-file').files[0]; if (!chosen) return;
  if (!chosen.name.toLowerCase().endsWith('.mp4') || chosen.size > 20 * 1024 * 1024 || chosen.size < 12) { notice('Choose an MP4 video no larger than 20 MiB.', true); return; }
  const player = $('preview'); previewUrl = URL.createObjectURL(chosen);
  try {
    await new Promise((resolve, reject) => {
      player.onloadedmetadata = resolve; player.onerror = () => reject(new Error('This browser cannot preview the video. Export it as H.264 MP4.'));
      player.src = previewUrl;
    });
    if (current !== selection) return;
    if (!Number.isFinite(player.duration) || player.duration <= 0 || player.duration > state.creator.max_video_post_duration_sec) throw new Error('Video exceeds your TikTok duration limit.');
    if (Math.min(player.videoWidth, player.videoHeight) < 360 || Math.max(player.videoWidth, player.videoHeight) > 4096) throw new Error('Video dimensions must each be between 360 and 4096 pixels.');
    file = chosen; duration = player.duration; player.hidden = false;
    $('video-detail').textContent = `${chosen.name} · ${(chosen.size / 1048576).toFixed(1)} MiB · ${duration.toFixed(1)} seconds`;
    notice('Review the preview, caption, visibility, and disclosures before uploading.');
  } catch (e) { notice(e.message, true); }
});
$('caption').addEventListener('input', () => { $('count').textContent = `${$('caption').value.length} / 2200`; $('consent').checked = false; });
for (const id of ['privacy','comments','own-brand','ai-generated','paid']) $(id).addEventListener('change', () => { $('consent').checked = false; });
$('disconnect').addEventListener('click', async () => {
  if (busy) return;
  $('disconnect').disabled = true;
  try {
    const result = await api('disconnect', { method: 'POST' });
    state = null; $('post-form').hidden = true; $('disconnect').hidden = true; $('connect').hidden = false; $('activity').hidden = true;
    $('account').textContent = 'No account connected.';
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    notice(result.revoked ? 'Disconnected. Local session data was cleared and TikTok access was revoked.' : 'Local session cleared. TikTok revocation could not be confirmed; remove Bless Content Studio in TikTok’s app permissions.');
  } catch (e) { notice(e.message, true); }
  finally { $('disconnect').disabled = false; }
});
$('post-form').addEventListener('submit', async event => {
  event.preventDefault(); if (busy) return;
  if (!state || !file || !duration) { notice('Choose a valid video and wait for its preview.', true); return; }
  if ($('paid').checked) { notice('Paid partnerships are not supported in this private test.', true); return; }
  if ($('privacy').value !== 'SELF_ONLY' || !$('consent').checked) { notice('Choose Only me and approve the upload.', true); return; }
  busy = true;
  const body = { requestId: token(), size: file.size, type: 'video/mp4', duration, caption: $('caption').value,
    privacy: $('privacy').value, consent: true, comments: $('comments').checked, ownBrand: $('own-brand').checked,
    aiGenerated: $('ai-generated').checked, paidPartnership: false };
  const disabledBefore = new Map();
  for (const el of $('post-form').elements) { disabledBefore.set(el, el.disabled); el.disabled = true; }
  $('disconnect').disabled = true; let jobId = null;
  try {
    notice('Preparing your approved upload…');
    const job = await api('init', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    jobId = job.id; row(jobId, 'Uploading to temporary storage'); notice('Uploading securely to temporary storage. Keep this page open.');
    await api(`upload?id=${encodeURIComponent(jobId)}`, { method: 'POST', headers: { 'Content-Type': 'video/mp4' }, body: file });
    row(jobId, 'TikTok download started'); notice('TikTok is downloading the video. Checking processing status…');
    for (let attempt = 0; attempt < 12; attempt++) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      const status = await checkStatus(jobId);
      if (['PUBLISH_COMPLETE', 'FAILED', 'CHECK_FAILED'].includes(status)) break;
    }
  } catch (e) {
    notice(`${e.message}${jobId ? ' Use Check status before posting again.' : ' No video bytes were uploaded by this page.'}`, true);
    if (jobId) row(jobId, 'Status needs checking');
  } finally {
    busy = false; for (const [el, disabled] of disabledBefore) el.disabled = disabled;
    $('disconnect').disabled = false; $('consent').checked = false;
  }
});
window.addEventListener('beforeunload', event => { if (busy) { event.preventDefault(); event.returnValue = ''; } });
load();
