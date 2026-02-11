# LineOAClient

Angular + Tailwind + Spartan UI project for LINE OA (LIFF-first flow).

## Architecture (current)

The app now uses a **page-centric + lazy-loaded** structure:

- `src/app/app.routes.ts`
- `src/app/pages/entry/page.ts`
- `src/app/pages/landing/page.ts`
- `src/app/pages/callback/page.ts`
- `src/app/pages/pdpa/page.ts`
- `src/app/pages/pdpa/components/pdpa-content.ts`
- `src/app/pages/booking/page.ts`

### Runtime flow

1. User opens `/` → redirects to `/entry`.
2. `/entry` checks environment:
   - LIFF/LINE context → `/callback`
   - normal web/desktop browser → `/landing`
3. Guarded routes (`/callback`, `/pdpa`, `/booking`) require LIFF initialization and login.
4. On desktop/web browser, user always sees landing instructions + QR.

> Important: Desktop browser with mobile responsive mode is still **not LIFF context**. It should still show landing page.

---

## How to run (local)

```bash
npm install
ng serve --host 0.0.0.0 --port 4200
```

Open locally at `http://localhost:4200`.

> Dev-server host allowlist is set to `allowedHosts: true` in `angular.json` for tunnel testing.
> If you changed `angular.json`, **restart `ng serve`** (hot reload will not apply this server option).

---

## How to test with LINE / LIFF (using ngrok)

Because LIFF callback must be public HTTPS, use ngrok tunnel.

### 1) Start app + tunnel

Terminal A:

```bash
ng serve --host 0.0.0.0 --port 4200
```

Terminal B:

```bash
ngrok http 4200
```

Copy HTTPS URL, for example:

- `https://xxxx-xxxx.ngrok-free.app`

### 2) Update LINE Developer Console (every time URL changes)

In your **LINE Login channel**:

- Callback URL: `https://xxxx-xxxx.ngrok-free.app/callback`

In your **LIFF app settings**:

- Endpoint URL: `https://xxxx-xxxx.ngrok-free.app`

> If ngrok URL changes, LINE console URLs must be updated too.

### 3) Open from LINE OA on phone

- Open LINE app on mobile
- Open your OA rich menu/chat menu that links to LIFF
- LIFF URL should be something like `https://liff.line.me/<LIFF_ID>`

---

## Why your previous access failed

From your screenshot/logs there were 2 separate issues:

1. **Blocked host (Vite allowedHosts)**
   - Error: `Blocked request. This host ... is not allowed.`
   - Cause: ngrok domain not in dev server allowed hosts.
   - Fixed in `angular.json` by setting `serve.options.allowedHosts: true` for dev tunnel testing.

2. **ngrok endpoint offline**
   - Error: `ERR_NGROK_3200 endpoint is offline`
   - Cause: tunnel process stopped or domain rotated.
   - Fix: restart `ngrok http 4200` and update new URL in LINE console again.

---

## LIFF ID configuration

Set LIFF ID in `src/index.html`:

```html
<meta name="liff-id" content="YOUR_LIFF_ID" />
```

---

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

> Note: If lint fails with `@angular-eslint/directive-selector` missing, this is an existing tooling/config issue in `src/ui/form-field/*` and not related to LIFF routing flow.
