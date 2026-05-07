# Brynäs Bilservice — Claude Code Instructions

## Project overview
Website for Brynäs Bilservice, a car repair shop in Gävle, Sweden. Full-stack:
- **Client** — React 18 + Vite 4 + TypeScript + Tailwind 3, in `client/`
- **Server** — Node.js 16 + Express 4 + MySQL (raw `mysql2` callbacks, CommonJS, no ORM), in `server/`

Two developers:
- **Magnus** (frontend) — works on design, layout, components, CSS
- **Sakar** (backend, Magnus's brother) — owns `server/index.js`, `server/database/schema.sql`, MySQL

## Production environment
- **Live URL:** https://labb.fenrirmedia.se/brynasbilservice/
- **Host:** VPS at `194.14.207.224` behind Cloudflare → nginx → Apache → Express
- **OS:** CentOS 7 (glibc 2.17 — **cannot run Node 18+**, locked to Node 16)
- **Build runtime:** Node 20 on GitHub Actions Ubuntu runner
- **Production port:** Express runs on **3001** (port 3000 is taken by another tenant)
- **Local dev port:** Express runs on **3000**
- **Process manager:** PM2 via fnm
- **Apache `.htaccess`:** proxies `/api/*` to Express, falls back to `public/index.html` for SPA routes
- **Auto-deploy:** GitHub Actions on push to `main` (currently broken — workflow file is in wrong location, see `AGENTS.md`)
- **Database access for local dev:** SSH tunnel required —
  `ssh -i ~/.ssh/fenrirm -L 3306:localhost:3306 -N -f fenrirm@194.14.207.224`

## Division of responsibility
**Magnus owns (safe to edit freely):**
- `client/src/` — all components, sections, CSS, assets
- `client/package.json`
- `client/tailwind.config.js`, `client/vite.config.ts`

**Do NOT modify without explicit instruction:**
- `server/index.js` — backend API, owned by the other developer
- `server/database/schema.sql` — database structure
- `server/package.json`
- `server/.env`

## Architecture

### Client (`client/`)
```
src/
  App.tsx               — page layout, section order, IntersectionObserver for .fade-up
  main.tsx              — React root, BrowserRouter, LanguageProvider, routes
  css/index.css         — all CSS (custom properties, component styles, responsive)
  components/
    sections/           — Hero, About, Services, ServiceList, WhyUs, EV, CTABanner, Contact
    layout/             — Header, Footer
    ui/                 — Button, ButtonLink, SectionHeader, Marquee
    icons/              — SVG icon components
    admin/              — BookingManagement, ServiceManagement, ProtectedRoute
    BookingForm.tsx     — booking modal (react-datepicker + react-time-picker)
    GoogleReviews.tsx   — hardcoded review data, needs updating with real Brynäs reviews
    ThemeSwitcher.tsx
  pages/admin/          — Dashboard, Login
  context/              — LanguageContext (sv/en i18n)
  translations/         — en.ts, sv.ts
  data/                 — marquee-items.txt (one item per line, loaded raw by Hero.tsx)
  assets/images/        — all image assets
```

### Server (`server/`)
```
index.js          — Express API (bookings, services, customers, admin CRUD)
database/
  schema.sql      — MySQL schema (NOTE: currently out of sync with actual DB — see known issues)
public/           — built client output served statically (deploy target)
dist/             — server build output
```

### Routes
- `/` — public site (App.tsx)
- `/bilar-till-salu` — used cars subpage (BilarTillSalu.tsx)
- `/admin` — admin dashboard (ProtectedRoute → Dashboard)
- `/api/*` — Express API endpoints

### API contract (server/index.js)
All routes return JSON. No request validation, no error middleware — keep payloads tight.

| Method | Route | Auth | Body / params |
|---|---|---|---|
| GET | `/api/services` | public | — |
| GET | `/api/available-dates` | public | — (queries `bookings WHERE available=1`) |
| POST | `/api/bookings` | public | `{ customerName, customerEmail, customerPhone, serviceId, date, time, comment_customer? }` |
| GET | `/api/admin/bookings` | admin | — |
| PUT | `/api/admin/bookings/:id` | admin | `{ status }` (enum: `pending`, `confirmed`, `completed`, `cancelled`, `erased`) |
| DELETE | `/api/admin/bookings/:id` | admin | soft-delete via status=`erased` |
| GET / POST | `/api/admin/services` | admin | list / create |
| PUT / DELETE | `/api/admin/services/:id` | admin | update / delete |
| GET | `/api/admin/customers` | admin | — |

Admin auth header: `Authorization: Bearer admin-secret-token` (hardcoded — not production-safe).
Customers are deduplicated by **email** in `POST /api/bookings`.

### Database reality (live DB ≠ schema.sql)
The `bookings` table on the live DB has more columns than `server/database/schema.sql` shows:
- `service` is **INT** (FK to services.id), schema says VARCHAR
- `available` BOOLEAN exists (used by `/api/available-dates`), missing from schema
- `time` TIME exists, missing from schema
- `customer_name`, `comment_customer`, `comment_admin` exist, missing from schema
- `status` ENUM includes `'erased'` for soft-delete, schema is missing it

**Do not edit `schema.sql` to "fix" this** — Sakar owns it and the live DB is the source of truth.

## Dev setup
Two terminals required:

```bash
# Terminal 1 — backend
cd server && npm run dev   # nodemon, port 3000

# Terminal 2 — frontend
cd client && npm run dev   # vite, port 5173
```

Open `http://localhost:5173` in browser.
The Vite dev server proxies `/api` to `localhost:3000` automatically via axiosConfig.

## Deploy
**Intended flow** (when GitHub Actions is fixed): push to `main` → workflow builds the client and tars it to `$DEPLOY_PATH/public/` over SSH → `.env` is preserved across deploys → PM2 restarts the server. See `docs/deployment.md` for the full pipeline and required GitHub Secrets.

**Manual flow** (current, since auto-deploy is broken):
```bash
cd client && npm run build
# Copy client/dist/* to server/public/
```
Server serves the built client from `server/public/` as static files.

## Repo traps to avoid
- **Don't touch root `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`** — they reference React 19 / Vite 8 / Tailwind 4, none of which is what the project actually uses. They're orphan scaffolding from an earlier attempt and confuse new agents. The real frontend project lives in `client/`.
- **`server/.htaccess` and `docs/deployment.md` disagree** about port and `RewriteBase`. The docs are correct (port 3001, no `RewriteBase`); `server/.htaccess` is stale. Sakar owns the resolution.
- **`.github/workflows/deploy.yml` is in the wrong place** (lives at `client/.github/workflows/`, GitHub looks at repo root). Auto-deploy is silently broken until this is moved.
- **No git remote is configured** as of this writing — `git remote -v` is empty. The repo is local-only until pushed to GitHub.

## Design system
All CSS custom properties are in `client/src/css/index.css` under `:root`.

Key tokens:
- `--color-gold: #F0B800` — primary accent
- `--color-red: #CC1417` — secondary accent
- `--color-black: #080808` — background
- `--font-heading` — Exo 2
- `--font-body` — Barlow

Animations: `.fade-up` class + IntersectionObserver in App.tsx triggers `.visible` on scroll.

## Page section order (App.tsx)
Hero → About → Services → ServiceList → WhyUs → EV → CTABanner → Contact

Nav link order (Header.tsx): Om oss → Tjänster → Bilar till salu → Kontakt

## Known issues / open TODOs
1. **GoogleReviews.tsx** — contains hardcoded placeholder data, not real Brynäs reviews
2. **schema.sql out of sync** — missing columns: `customer_name`, `comment_customer`, `comment_admin`; missing `'erased'` from status ENUM; `service` column is VARCHAR but stores INT ID
3. **comment_customer not saved** — BookingForm sends it, but server's insertBooking() doesn't include it in the INSERT
4. **Admin comment read-only** — admin modal shows comment_admin but provides no way to save it
5. **SSH key in project folder** — `client/fenrirm` and `client/fenrirm.pub` should not be here

## Agent handoff rules
- **Read `AGENTS.md` first** — it has the current state of the project and recent session history
- Read recent logs in `_magnus/` before making design changes
- Check existing component structure before adding new files
- Never rewrite large files unnecessarily — prefer targeted edits
- Preserve unfinished or in-progress work unless clearly broken
- Do not touch server files unless explicitly asked
- **Update `AGENTS.md` at the end of every session** — rewrite the "current state" section and append a new entry to the session log
