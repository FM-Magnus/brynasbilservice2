# Brynäs Bilservice — client

React 18 + Vite 4 + TypeScript frontend. Project overview, running and building: the root [`README.md`](../README.md). Rules for AI tools: [`AGENTS.md`](../AGENTS.md).

```bash
npm install
npm run dev           # http://localhost:5173/
npm run typecheck     # vite build does not typecheck
npm run check:css
npm run build         # outputs dist/; needs Node 18.17 or newer
npm run test:browser  # Playwright at 1440/768/390
```

## Base path

`vite.config.ts` serves the app at `/` in dev and builds it for `/brynasbilservice/`; `main.tsx` sets the router `basename` to match. Internal links must therefore be `<Link to="/…">`: a plain `<a href="/…">` works in dev but leaves the app on the live site. `tests/browser/internal-links.spec.ts` guards this.

## Where things live

- **Routes:** `src/main.tsx`. Every route is lazy, wrapped in `RouteErrorBoundary`, with a `*` route to `NotFoundPage`.
- **Navigation:** `src/data/publicNavigation.ts` (header and footer). **Business facts:** `src/data/business.ts` only.
- **CSS:** plain CSS islands on `--bb-*` tokens; Tailwind only under `/admin`. Ownership: [`docs/CSS_OWNERSHIP.md`](../docs/CSS_OWNERSHIP.md).
- **API client:** `src/api/axiosConfig.ts`. Development calls `http://localhost:3000`; production calls `/brynasbilservice/api/…`, which Apache proxies to Express ([`docs/BACKEND.md`](../docs/BACKEND.md)).
- **Contact forms:** `src/api/contact.ts` opens a pre-filled e-mail until a backend endpoint exists.
- **Translations** (`src/translations/`, `LanguageContext`): used by the admin panel only. Public pages are Swedish and hard-coded.
