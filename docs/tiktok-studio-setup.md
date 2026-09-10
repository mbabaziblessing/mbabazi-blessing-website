# Bless Content Studio — private sandbox testing

This change adds an isolated static workspace at `/bless-content-studio/` and a Cloudflare Pages Function at `/api/tiktok/*`. Existing Vite/React routes, dependencies, contact and AI functions remain unchanged. No live TikTok request was made during development.

## What works after deployment and configuration

- TikTok Login Kit authorization with browser-bound, single-use state.
- Encrypted access tokens in Cloudflare D1; opaque Secure/HttpOnly session cookie.
- One-hour maximum sessions; refresh tokens are deliberately discarded. Reconnect when a session expires.
- Account information and current creator limits; MP4 preview before any video leaves the browser.
- Explicit consent, editable caption, manually selected Only me visibility, optional comments and own-brand/AI disclosures.
- Private Direct Post via FILE_UPLOAD; maximum 20 MiB (an application limit, not TikTok's maximum).
- Atomic submission identifiers and upload claims; no automatic retries that can duplicate publishing. Upload jobs belong to their session; the browser never receives TikTok tokens or signed upload URLs.
- Processing status and disconnect/revocation. No scheduler, AI video generator, public posting, paid partnerships, analytics, or production audit approval is claimed.

## 1. Deploy these files through the existing Git connection

Review and merge the change set, then run `git pull --ff-only` in your Windows project. Your existing Cloudflare Pages production branch is `main`. Keep build command `npm run build` and output directory `dist`. Pages deploys `functions/` from the repository root, separately from the Vite output. A static drag-and-drop upload of `dist` alone will NOT deploy the API.

No new npm dependency is needed. Keep all existing Cloudflare bindings and secrets.

## 2. Create the sandbox database

In Cloudflare, create a D1 database named `bless-content-studio-sandbox`. Open that database's SQL console and run all SQL from `docs/tiktok-studio-schema.sql`.

Alternatively, with a locally installed/authenticated Wrangler CLI:

```powershell
npx wrangler d1 create bless-content-studio-sandbox
npx wrangler d1 execute bless-content-studio-sandbox --remote --file=docs/tiktok-studio-schema.sql
```

In the existing Pages project's bindings, add a D1 binding named exactly `TIKTOK_STUDIO_DB`, selecting that database. Use a separate database and credentials for any preview environment; this integration rejects requests on an origin different from `TIKTOK_ORIGIN`.

## 3. Configure the Pages environment

Set these for the deployment environment serving `www.mbabaziblessing.com` (Cloudflare calls it Production even though the TikTok app is a Sandbox):

| Variable | Value / source |
|---|---|
| `TIKTOK_STUDIO_ENABLED` | `true` |
| `TIKTOK_ORIGIN` | `https://www.mbabaziblessing.com` |
| `TIKTOK_CLIENT_KEY` | Client key from Bless Content Studio Testing in TikTok |
| `TIKTOK_CLIENT_SECRET` | Sandbox client secret — store as an encrypted secret |
| `TIKTOK_SESSION_SECRET` | A new random 32-byte secret — store as an encrypted secret |

Generate the session secret locally, and paste the output into Cloudflare, NOT chat or GitHub:

```powershell
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Never prefix these with `VITE_`. Do not put them in `public/`, JavaScript source, a commit, a screenshot, or the client-side Vite environment. Redeploy after configuring bindings and variables.

To disable the integration, set `TIKTOK_STUDIO_ENABLED=false` and redeploy.

## 4. Match TikTok configuration

- Login Kit → Web redirect URI: `https://www.mbabaziblessing.com/api/tiktok/callback` (exact match, no trailing slash).
- Content Posting API → Direct Post enabled.
- Request scopes: `user.info.basic,video.publish`. The portal may include `video.upload` automatically, but the app does not request or use it.
- Add your account under Sandbox Target Users.
- This is private testing: TikTok requires unaudited API users to have a private account at posting time and sends `SELF_ONLY` posts. If your main account should remain public, use another eligible private account you own and add it as a sandbox target.
- FILE_UPLOAD is used. Existing verification files are preserved; media URL verification is not required for this transfer method.
- Ensure www serves the configured origin without redirecting the callback to the non-www domain. If www redirects, use the actual canonical origin consistently in TikTok and Cloudflare instead.

## 5. Run the live test yourself

1. Visit `https://www.mbabaziblessing.com/bless-content-studio/` in a new browser tab.
2. Select Connect TikTok, review the requested permissions, and authorize the sandbox target.
3. Verify the displayed account name and username.
4. Select a short original H.264 MP4 under 20 MiB, 23–60 FPS, 360–4096 pixels each dimension. The app checks browser metadata and the MP4 header; TikTok validates encoding/frame rate and actual content. It does not transcode video.
5. Preview it, edit the caption, explicitly select Only me, set disclosures, and tick consent.
6. Click Upload & post to Only me once. Keep the page open until transfer finishes.
7. Wait for `PUBLISH_COMPLETE` and inspect the private video in TikTok. Processing is not claimed as success until TikTok reports completion.
8. After an interrupted upload, check Current session activity before creating a new upload. `upload_uncertain` is not an invitation to retry blindly. A session expiring ends access to its job history; check TikTok itself before reposting.
9. Disconnect. This deletes that session and jobs and requests token revocation. If revocation cannot be confirmed, the page tells you to remove the app in TikTok permissions.

## Data lifecycle and scope limitations

State expires after ten minutes. Sessions and jobs expire after at most one hour and cannot be used after expiry. Expired rows are physically removed on the next Studio request; they may remain in D1 until then. D1 backups and Cloudflare operational logs have their own retention settings. The implementation does not intentionally log credentials or upload URLs. Video bytes are temporarily handled in the request and forwarded; they are not saved in D1 or the public website. Metadata/captions are sent to TikTok, not retained as a content library.

The policy pages describe this implementation. Review their accuracy against your actual Cloudflare settings before any public launch. Deletion/support uses your existing Contact page. Disconnection does not delete posts already uploaded to TikTok. Removing TikTok access outside the app makes its token unusable but does not instantly purge D1; expiry/cleanup still applies.

Public multi-user operation, scheduled cleanup, stronger operational rate controls, durable long-term refresh-token handling, moderation/review workflows and TikTok audit work remain separate. TikTok excludes private upload utilities from acceptable public Direct Post client use; do not represent this sandbox as an approved public creator service.

## Verification and troubleshooting

Use Node.js 24 for the server tests, which use the built-in SQLite test adapter.

```powershell
node --test tests/tiktok-studio.test.mjs
npm run build
```

- `503`: integration disabled, missing binding/secret/origin, or configuration not deployed.
- `500`: verify the D1 binding, schema, and correct secret. Raw server exceptions are deliberately hidden from the browser.
- State mismatch: restart from the Studio link on the exact www origin; don't reuse an old callback URL.
- Scope error: verify Direct Post / `video.publish` in the same sandbox as the configured keys; reconnect.
- HTML instead of JSON: the request reached Vite's fallback because Pages Functions were not deployed or a redirect intercepted the API.
- Private-account error: use an eligible private sandbox account. There is no bypass.
- Vite `npm run dev` alone does not run Pages Functions; test the backend in a configured Cloudflare deployment or an explicitly configured Wrangler Pages local environment.

Sources:
- https://developers.tiktok.com/doc/login-kit-web/
- https://developers.tiktok.com/docs/en/oauth-user-access-token-management
- https://developers.tiktok.com/docs/en/content-posting-api-reference-direct-post
- https://developers.tiktok.com/docs/en/content-sharing-guidelines
- https://developers.cloudflare.com/pages/functions/routing/
