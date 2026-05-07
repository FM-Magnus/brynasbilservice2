# Brynäs Bilservice Client

React frontend for Brynäs Bilservice, built with TypeScript, Tailwind CSS, and Vite.

## Getting Started

```bash
npm install
npm run dev      # http://localhost:5173/brynasbilservice/
npm run build    # outputs to dist/
```

## Vite Configuration

The Vite `base` is set to `/brynasbilservice/` in `vite.config.ts`. This means
all built asset paths are prefixed with `/brynasbilservice/assets/...`, matching
the production URL structure.

## Routing

React Router uses `basename="/brynasbilservice"` (set in `main.tsx`). Routes:

- `/` — public landing page
- `/admin` — admin panel (login form if unauthenticated, dashboard if authenticated)

## API Calls

Axios is configured in `src/api/axiosConfig.ts`:

- **Development:** `http://localhost:3000` (direct to Express)
- **Production:** `/brynasbilservice` (proxied by Apache `.htaccess` to Express on port 3001)

## Translations

Bilingual support (Swedish/English) via `src/translations/sv.ts` and `en.ts`,
managed through `LanguageContext`.
