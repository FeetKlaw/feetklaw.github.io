# Feet Klaw (Static Site)

Static site for **Feet Klaw**.

## ✅ No backend, no secrets
- Static Vite + React build
- **No authentication**
- **No API clients**
- **No .env required**
- Safe to publish (no secret keys included)

## Tech
- Vite + React
- Tailwind CSS
- Routing: **HashRouter** (GitHub Pages safe)

## Local development
```bash
yarn install
yarn dev
```

## Build
```bash
yarn build
```
Outputs a deployable `dist/`.

### Build sanity check
After building, confirm:
- `dist/index.html` exists
- assets load without absolute paths
- routes work:
  - `/#/about`
  - `/#/community`

## GitHub Pages deployment
Recommended setup (GitHub Actions or manual):
1. Run `yarn build`
2. Publish `dist/` to GitHub Pages

### Routing hardening
This repo uses **HashRouter**, so deep links like `/#/about` won’t break on GitHub Pages.

Additionally, `public/404.html` is included as a belt-and-suspenders fallback.

## Vite base URL (custom domain vs subpath)
By default, `vite.config.js` uses:
```js
base: '/'
```
This is correct for a **custom domain** (e.g. `https://www.feetklaw.com`).

If you deploy under a subpath (e.g. `https://username.github.io/repo/`), change to:
```js
base: '/repo/'
```

## Security / CSP guidance (recommended headers)
GitHub Pages can’t always enforce headers, but for a custom domain you should consider:
- `Content-Security-Policy` (CSP)
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (disable unused features)

Example CSP starting point (adjust as needed for Google Fonts):
```
Content-Security-Policy: default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self'; frame-src 'self' https:;
```

## Notes
- Preview video embed is configured in **one place**: `src/config/site.js` (`previewEmbedUrl`).
- Theme defaults to **dark**, and preference is stored in localStorage (with privacy-mode safe guards).

## Production deploy (GitHub Pages)

This repo includes a GitHub Actions workflow that builds the site and publishes **dist/** to GitHub Pages on every push to **main**.

### One-time GitHub setup
1. Go to **Settings → Pages**
2. Under **Build and deployment → Source**, select **GitHub Actions**
3. Push to **main** (or run the workflow manually) and wait for the **Deploy to GitHub Pages** workflow to finish.

### Custom domain
- Add your domain in **Settings → Pages → Custom domain**
- Put **CNAME** for `www` to `feetklaw.github.io`
- Put the 4 **A** records for the apex (`feetklaw.com`) to the GitHub Pages IPs:
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153

> Note: GitHub Pages serves the built output from **dist/**. The repo root contains source code and is not meant to be served directly.
