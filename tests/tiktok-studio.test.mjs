import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import { onRequest } from '../functions/api/tiktok/[[path]].js';
import { seal, unseal, hash, randomToken, validatePost, validateUploadUrl, boundedBytes } from '../lib/tiktok-studio.js';
const origin = 'https://www.mbabaziblessing.com';
const secret = 'test-only-secret-abcdefghijklmnopqrstuvwxyz';
const creator = { creator_nickname:'Test Creator', creator_username:'test', privacy_level_options:['SELF_ONLY'], max_video_post_duration_sec:60, comment_disabled:false };
const valid = () => ({ requestId:randomToken(), consent:true, privacy:'SELF_ONLY', size:16, type:'video/mp4', duration:5, caption:'My original test', paidPartnership:false, comments:false, ownBrand:false, aiGenerated:false });
function database() {
  const sqlite = new DatabaseSync(':memory:');
  sqlite.exec(readFileSync(new URL('../docs/tiktok-studio-schema.sql', import.meta.url), 'utf8'));
  const wrap = (sql, args=[]) => ({
    bind(...values) { return wrap(sql, values); },
    async first() { return sqlite.prepare(sql).get(...args) || null; },
    async all() { return {results:sqlite.prepare(sql).all(...args)}; },
    async run() { return {meta:sqlite.prepare(sql).run(...args)}; },
  });
  return { prepare: sql=>wrap(sql), async batch(statements) { const results=[]; for(const stmt of statements) results.push(await stmt.run()); return results; }, sqlite };
}
function environment() { return {TIKTOK_STUDIO_ENABLED:'true', TIKTOK_ORIGIN:origin, TIKTOK_CLIENT_KEY:'test-client', TIKTOK_CLIENT_SECRET:'test-client-secret', TIKTOK_SESSION_SECRET:secret, TIKTOK_STUDIO_DB:database()}; }
async function loggedIn(env) {
  const raw=randomToken(); const csrf=randomToken(); const id=await hash(raw);
  const payload=await seal({accessToken:'secret-access-token',csrf,user:{open_id:'user-one',display_name:'Test'}},secret);
  await env.TIKTOK_STUDIO_DB.prepare('INSERT INTO studio_sessions VALUES (?, ?, ?)').bind(id,payload,Math.floor(Date.now()/1000)+3600).run();
  return {id,csrf,raw};
}
function request(path, method='GET', s=null, body, extra={}) {
  return new Request(origin+'/api/tiktok/'+path,{method,headers:{ ...(s?{Cookie:`__Host-bcs_session=${s.raw}`} :{}), ...(method==='POST'?{Origin:origin,'X-Studio-CSRF':s?.csrf || '', 'Content-Type':'application/json'}:{}), ...extra}, body:body===undefined?undefined:typeof body==='string'||body instanceof Uint8Array?body:JSON.stringify(body)});
}
function mockTikTok(t, custom) {
  const calls=[];
  t.mock.method(globalThis,'fetch',async (url,options={})=>{
    calls.push({url:String(url),options});
    if(custom) { const result=await custom(String(url),options); if(result) return result; }
    if(String(url).endsWith('/creator_info/query/')) return Response.json({data:creator,error:{code:'ok'}});
    if(String(url).endsWith('/video/init/')) return Response.json({data:{publish_id:'publish-one',upload_url:'https://open-upload.tiktokapis.com/video/?upload_token=secret'},error:{code:'ok'}});
    if(String(url).startsWith('https://open-upload.tiktokapis.com/')) return new Response('',{status:201});
    if(String(url).endsWith('/status/fetch/')) return Response.json({data:{status:'PUBLISH_COMPLETE',uploaded_bytes:16},error:{code:'ok'}});
    if(String(url).endsWith('/oauth/revoke/')) return Response.json({});
    throw new Error('Unexpected mock request');
  });
  return calls;
}
test('tokens encrypt, decrypt, and reject tampering',async()=>{
  const encrypted=await seal({accessToken:'never-visible'},secret); assert.ok(!encrypted.includes('never-visible'));
  assert.deepEqual(await unseal(encrypted,secret),{accessToken:'never-visible'});
  await assert.rejects(unseal(encrypted,secret+'wrong'));
});
test('validation enforces private consent and current account limits',()=>{
  assert.equal(validatePost(valid(),creator).privacy_level,'SELF_ONLY');
  for(const patch of [{consent:false},{privacy:'PUBLIC_TO_EVERYONE'},{size:21*1024*1024},{duration:61},{paidPartnership:true},{caption:'x'.repeat(2201)}]) assert.throws(()=>validatePost({...valid(),...patch},creator));
  assert.throws(()=>validatePost({...valid(),comments:true},{...creator,comment_disabled:true}));
  assert.throws(()=>validatePost(valid(),{...creator,privacy_level_options:[]}));
});
test('upload destinations reject arbitrary hosts, credentials and HTTP',()=>{
  assert.ok(validateUploadUrl('https://upload.us.tiktokapis.com/video/?token=x'));
  for(const url of ['https://evil.test/a','http://open-upload.tiktokapis.com/a','https://open-upload.tiktokapis.com.evil.test/a','https://u:p@open-upload.tiktokapis.com/a']) assert.throws(()=>validateUploadUrl(url));
});
test('request body limit enforced without Content-Length',async()=>{
  await assert.rejects(boundedBytes(new Request(origin,{method:'POST',body:'too much data'}),3));
});
test('API disabled by default; no credential data returned',async()=>{
  const r=await onRequest({request:request('session'),env:{}}); assert.equal(r.status,503);
  assert.equal(r.headers.get('Cache-Control'),'no-store');
});
test('OAuth state is browser bound and single-use, tokens never sent to browser',async t=>{
  const env=environment(); mockTikTok(t,(url)=>{
    if(url.endsWith('/oauth/token/')) return Response.json({access_token:'secret-token',refresh_token:'discard-me',open_id:'oid',expires_in:86400,scope:'user.info.basic,video.publish'});
    if(url.includes('/user/info/')) return Response.json({data:{user:{open_id:'oid',display_name:'Owner'}},error:{code:'ok'}});
  });
  const start=await onRequest({request:request('start'),env}); assert.equal(start.status,303);
  const state=new URL(start.headers.get('Location')).searchParams.get('state');
  assert.ok(start.headers.get('Set-Cookie').includes('HttpOnly; Secure; SameSite=Lax'));
  const callback=`callback?state=${state}&code=one-use-code`;
  assert.equal((await onRequest({request:request(callback),env})).status,403);
  const r=await onRequest({request:request(callback,'GET',null,undefined,{Cookie:`__Host-bcs_oauth=${state}`}),env});
  assert.equal(r.status,303); assert.equal(r.headers.get('Location'),origin+'/bless-content-studio/');
  assert.ok(!JSON.stringify([...r.headers]).includes('secret-token'));
  const stored=env.TIKTOK_STUDIO_DB.sqlite.prepare('SELECT payload FROM studio_sessions').get();
  assert.ok(!stored.payload.includes('secret-token'));
  assert.ok(!JSON.stringify(await unseal(stored.payload,secret)).includes('discard-me'));
  assert.equal((await onRequest({request:request(callback,'GET',null,undefined,{Cookie:`__Host-bcs_oauth=${state}`}),env})).status,403);
});
test('anonymous, wrong origin and missing CSRF requests are rejected',async()=>{
  const env=environment(); const s=await loggedIn(env);
  assert.equal((await onRequest({request:request('init','POST',null,valid()),env})).status,401);
  assert.equal((await onRequest({request:request('init','POST',s,valid(),{Origin:'https://evil.test'}),env})).status,403);
  assert.equal((await onRequest({request:request('init','POST',s,valid(),{'X-Studio-CSRF':'wrong'}),env})).status,403);
});
test('post lifecycle keeps uploads private, prevents duplicates and isolates sessions',async t=>{
  const env=environment(); const s=await loggedIn(env); const other=await loggedIn(env); const calls=mockTikTok(t);
  const input=valid(); const init=await onRequest({request:request('init','POST',s,input),env}); assert.equal(init.status,200);
  const {id}=await init.json();
  assert.equal((await onRequest({request:request('init','POST',s,input),env})).status,409);
  assert.equal(calls.filter(c=>c.url.endsWith('/video/init/')).length,1);
  assert.equal(JSON.parse(calls.find(c=>c.url.endsWith('/video/init/')).options.body).post_info.privacy_level,'SELF_ONLY');
  assert.equal((await onRequest({request:request(`status?id=${id}`,'GET',other),env})).status,404);
  const bytes=new Uint8Array(16); bytes.set(new TextEncoder().encode('ftyp'),4);
  assert.equal((await onRequest({request:request(`upload?id=${id}`,'POST',other,bytes,{'Content-Type':'video/mp4'}),env})).status,404);
  assert.equal((await onRequest({request:request(`upload?id=${id}`,'POST',s,bytes,{'Content-Type':'video/mp4'}),env})).status,200);
  assert.equal((await onRequest({request:request(`upload?id=${id}`,'POST',s,bytes,{'Content-Type':'video/mp4'}),env})).status,409);
  const status=await onRequest({request:request(`status?id=${id}`,'GET',s),env});
  assert.deepEqual(await status.json(),{status:'PUBLISH_COMPLETE',failReason:null,uploadedBytes:16,expectedBytes:16});
  assert.equal(env.TIKTOK_STUDIO_DB.sqlite.prepare('SELECT stage FROM studio_jobs WHERE id=?').get(id).stage,'publish_complete');
  const response=await onRequest({request:request('session','GET',s),env}); const data=await response.text();
  assert.ok(!data.includes('secret-access-token')); assert.ok(!data.includes('upload_token'));
});
test('failed upload can be checked but cannot blindly retry bytes',async t=>{
  const env=environment(); const s=await loggedIn(env); mockTikTok(t,url=>url.startsWith('https://open-upload.')?new Response('',{status:500}):null);
  const r=await onRequest({request:request('init','POST',s,valid()),env}); const {id}=await r.json();
  const bytes=new Uint8Array(16); bytes.set(new TextEncoder().encode('ftyp'),4);
  assert.equal((await onRequest({request:request(`upload?id=${id}`,'POST',s,bytes,{'Content-Type':'video/mp4'}),env})).status,424);
  assert.equal((await onRequest({request:request(`upload?id=${id}`,'POST',s,bytes,{'Content-Type':'video/mp4'}),env})).status,409);
  assert.equal(env.TIKTOK_STUDIO_DB.sqlite.prepare('SELECT stage FROM studio_jobs WHERE id=?').get(id).stage,'upload_uncertain');
});
test('disconnect removes local data even if TikTok revocation fails',async t=>{
  const env=environment(); const s=await loggedIn(env); mockTikTok(t,url=>url.endsWith('/oauth/revoke/')?new Response('bad',{status:500}):null);
  await onRequest({request:request('init','POST',s,valid()),env});
  const r=await onRequest({request:request('disconnect','POST',s),env}); assert.equal(r.status,200); assert.equal((await r.json()).revoked,false);
  assert.equal(env.TIKTOK_STUDIO_DB.sqlite.prepare('SELECT count(*) AS n FROM studio_sessions').get().n,0);
  assert.equal(env.TIKTOK_STUDIO_DB.sqlite.prepare('SELECT count(*) AS n FROM studio_jobs').get().n,0);
  assert.ok(r.headers.get('Set-Cookie').includes('Max-Age=0'));
});
test('expired session is inaccessible and purged',async()=>{
  const env=environment(); const s=await loggedIn(env); env.TIKTOK_STUDIO_DB.sqlite.prepare('UPDATE studio_sessions SET expires=0').run();
  assert.equal((await onRequest({request:request('session','GET',s),env})).status,401);
  assert.equal(env.TIKTOK_STUDIO_DB.sqlite.prepare('SELECT count(*) AS n FROM studio_sessions').get().n,0);
});
