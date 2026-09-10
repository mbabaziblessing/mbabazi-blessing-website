// Server-only helpers. Never import into the Vite frontend.
export const MAX_VIDEO_BYTES = 20 * 1024 * 1024;
export const SESSION_SECONDS = 3600;
export class StudioError extends Error {
  constructor(message, status = 400) { super(message); this.status = status; }
}
export function requireValue(condition, message, status = 400) {
  if (!condition) throw new StudioError(message, status);
}
export function randomToken() {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)), b => b.toString(16).padStart(2, '0')).join('');
}
export async function hash(value) {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2, '0')).join('');
}
async function encryptionKey(secret) {
  requireValue(typeof secret === 'string' && secret.length >= 32, 'Studio encryption secret is not configured.', 503);
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(secret));
  return crypto.subtle.importKey('raw', bytes, 'AES-GCM', false, ['encrypt', 'decrypt']);
}
export async function seal(value, secret) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, await encryptionKey(secret), new TextEncoder().encode(JSON.stringify(value)));
  const encode = bytes => btoa(String.fromCharCode(...new Uint8Array(bytes)));
  return `${encode(iv)}.${encode(encrypted)}`;
}
export async function unseal(value, secret) {
  const [iv, ciphertext] = value.split('.').map(s => Uint8Array.from(atob(s), c => c.charCodeAt(0)));
  const bytes = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, await encryptionKey(secret), ciphertext);
  return JSON.parse(new TextDecoder().decode(bytes));
}
export function cookie(request, name) {
  return (request.headers.get('Cookie') || '').split(';').map(s => s.trim()).find(s => s.startsWith(`${name}=`))?.slice(name.length + 1) || '';
}
export function setCookie(name, value, age = SESSION_SECONDS) {
  return `${name}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${age}`;
}
export function sameOrigin(request, origin) {
  requireValue(request.headers.get('Origin') === origin, 'Request origin rejected.', 403);
}
export function validateUploadUrl(raw) {
  const u = new URL(raw);
  requireValue(u.protocol === 'https:' && !u.username && !u.password && !u.port && u.hostname.endsWith('.tiktokapis.com'), 'TikTok returned an unexpected upload destination.', 502);
  return u.href;
}
export function validatePost(body, creator) {
  requireValue(body.consent === true, 'Confirm the upload and Music Usage Confirmation.');
  requireValue(body.privacy === 'SELF_ONLY', 'This testing version supports Only me posts.');
  requireValue(creator.privacy_level_options?.includes('SELF_ONLY'), 'TikTok is not offering Only me for this account.');
  requireValue(Number.isInteger(body.size) && body.size >= 12 && body.size <= MAX_VIDEO_BYTES, 'Choose an MP4 up to 20 MiB.');
  requireValue(body.type === 'video/mp4', 'This testing version accepts MP4 videos.');
  requireValue(Number.isFinite(body.duration) && body.duration > 0 && body.duration <= creator.max_video_post_duration_sec, 'Video exceeds the account duration limit.');
  requireValue(typeof body.caption === 'string' && body.caption.length <= 2200, 'Caption must be at most 2,200 characters.');
  requireValue(body.paidPartnership === false, 'Paid partnerships require a public publishing flow and are not supported in this private test.');
  for (const field of ['comments', 'ownBrand', 'aiGenerated']) requireValue(typeof body[field] === 'boolean', `Missing ${field} selection.`);
  requireValue(!body.comments || !creator.comment_disabled, 'Comments are disabled for this account.');
  return { title: body.caption, privacy_level: 'SELF_ONLY', disable_duet: true, disable_stitch: true,
    disable_comment: !body.comments, brand_content_toggle: false, brand_organic_toggle: body.ownBrand, is_aigc: body.aiGenerated };
}
export async function boundedBytes(request, max) {
  const length = request.headers.get('Content-Length');
  if (length) requireValue(Number(length) <= max, 'Request too large.', 413);
  requireValue(request.body, 'Empty request.');
  const reader = request.body.getReader(); const chunks = []; let size = 0;
  for (;;) {
    const { value, done } = await reader.read(); if (done) break;
    size += value.length;
    if (size > max) { await reader.cancel(); throw new StudioError('Request too large.', 413); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return bytes;
}
export async function jsonBody(request) {
  requireValue(request.headers.get('Content-Type')?.startsWith('application/json'), 'JSON required.', 415);
  try { return JSON.parse(new TextDecoder().decode(await boundedBytes(request, 12000))); }
  catch (e) { if (e instanceof StudioError) throw e; throw new StudioError('Invalid JSON.'); }
}
