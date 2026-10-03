# Netlify preview deploy (manual zip)

A static copy of the frontend can be put on Netlify (<https://app.netlify.com/projects/brynasbilservice/overview>, live at `brynasbilservice.netlify.app`) by dragging a zip onto **Deploys**. This is **not** the production deploy (that is Johnny's server, see [`deployment.md`](deployment.md) and [`../BACKEND.md`](../BACKEND.md)); it is for showing the site without a backend. Added 2026-10-03.

## Why a normal build does not work there
`npm run build` produces a build for the sub-path `/brynasbilservice/` (Johnny's server). On Netlify the site sits at the root, so every JS, CSS and image URL 404s and the page is blank. The deploy log still looks fine ("Building: Skipped" is normal for a zip upload).

## Make the zip
```bash
cd client
VITE_BASE=/ npm run build
printf '/brynasbilservice/api/*  /404.html  404\n/api/*  /404.html  404\n/*  /index.html  200\n' > dist/_redirects
printf '/*\n  X-Robots-Tag: noindex, nofollow\n' > dist/_headers
echo '<!doctype html><meta charset="utf-8"><title>404</title><p>Not found</p>' > dist/404.html
cd dist && zip -qr ../../_magnus/netlify-brynasbilservice.zip . -x "*.DS_Store"
```
- Zip the **contents** of `dist/` (`index.html` at the zip's root), not the folder; then drag it onto Deploys.
- `_redirects`: API calls answer 404 (so the booking modal shows its "ring oss" notice) and every other path loads the app (SPA fallback; without it `/dackservice` 404s).
- `_headers`: `noindex` keeps the preview out of Google until launch. The same three files were used by the earlier manual deploy (`_magnus/netlify-temp/`, which used the sub-path build with a redirect from `/`).
- Write the zip inside the repo folder (`_magnus/` is git-ignored): an agent session cannot write to `~/Downloads`.

## How it works in the code
- `client/vite.config.ts`: `base` is `/` in dev and `process.env.VITE_BASE || '/brynasbilservice/'` in builds. Without `VITE_BASE` the build is unchanged, so the production build for Johnny is still `npm run build`.
- `client/src/main.tsx`: the router `basename` is `import.meta.env.BASE_URL` without its trailing slash (`/brynasbilservice` by default, `/` with `VITE_BASE=/`).
- `_redirects` lives only in the zip, not in the repo (`client/public/` has none).

## Known limits
- No backend: `/api` does not exist on Netlify. `client/src/api/axiosConfig.ts` still calls `/brynasbilservice/api/...`, which the SPA fallback answers with `index.html`, so the booking modal shows its notice with the phone number and the contact forms open a pre-filled e-mail (see `STATUS.md`).
- The zip is about 19 MB, almost all WebP images (204 files, largest 330 KB); a visitor only downloads the images of the page they open.
- Never use this build on Johnny's server: it would need the `/brynasbilservice/` base.
