# Brynäs Bilservice — Claude Code Instructions

## Project overview
Website for Brynäs Bilservice, a car repair shop in Gävle, Sweden. Full-stack:
- **Client** — React 18 + Vite 4 + TypeScript + Tailwind 3, in `client/`
- **Server** — Node.js 16 + Express 4 + MySQL (raw `mysql2` callbacks, CommonJS, no ORM), in `server/`

Two developers:
- **Magnus** (frontend) — works on design, layout, components, CSS
- **Johnny** (backend, Magnus's brother) — owns `server/index.js`, `server/database/schema.sql`, MySQL

## Production environment
- **Live URL:** https://labb.fenrirmedia.se/brynasbilservice/
- **Host:** VPS at `194.14.207.224` behind Cloudflare → nginx → Apache → Express
- **OS:** CentOS 7 (glibc 2.17 — **cannot run Node 18+**, locked to Node 16)
- **Build runtime in the historical deployment plan:** Node 20 on a GitHub Actions Ubuntu runner; no active root workflow currently executes it
- **Production port:** Express runs on **3001** (port 3000 is taken by another tenant)
- **Local dev port:** Express runs on **3000**
- **Process manager:** PM2 via fnm
- **Checked-in `server/.htaccess`:** contains an API proxy and SPA fallback, but its port/rewrite rules conflict with `docs/deployment.md`; live behaviour is unverified
- **Auto-deploy:** No active repository-root workflow; see [current project status](docs/PROJECT_STATUS.md). Deployment needs Magnus and Johnny's review.
- **Database access for local dev:** SSH tunnel required —
  `ssh -i ~/.ssh/fenrirm -L 3306:localhost:3306 -N -f fenrirm@194.14.207.224`

## Division of responsibility
**Magnus owns (edit only within the current task's explicit write scope):**
- `client/src/` — frontend components, sections, CSS islands and assets; `client/src/css/index.css` is frozen even though it is frontend-owned
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
  App.tsx               — root component mounting LandingPage
  main.tsx              — React root, BrowserRouter, LanguageProvider, routes
  css/index.css         — frozen legacy CSS; never edit (enforced by hook)
  styles/               — design-tokens.css (--bb-* tokens), ServiceGuideTemplate.css
  data/                 — publicNavigation.ts (canonical menu registry)
  components/
    layout/             — PublicHeader, PublicFooter, legacy Header/Footer
    ui/                 — reusable UI components (BiltjansterFaq, etc.)
    icons/              — SVG icon components
    admin/              — BookingManagement, ServiceManagement, ProtectedRoute
    BookingForm.tsx     — booking modal (react-datepicker + react-time-picker)
    GoogleReviews.tsx   — reviews widget for service pages
    ThemeSwitcher.tsx   — admin theme switcher
  pages/                — landing/LandingPage, service guides, subpages, admin
  context/              — LanguageContext (sv/en i18n)
  translations/         — en.ts, sv.ts
  assets/images/        — final web-optimized image assets
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
`client/src/main.tsx` defines the public routes, including `/biltjanster`, `/service-reparationer`, `/felsokning`, the Biltjänster guide routes, `/dackservice`, `/ac-service`, `/bargning`, `/bilar-till-salu` and `/kontakt`. `/admin` is protected; `/api/*` belongs to Express. The Header's Biltjänster dropdown starts with `Våra tjänster` (`/biltjanster`) then `Bilservice` (`/service-reparationer#bilservice`); the standalone `Felsökning` link follows Biltjänster in the main navigation. See [project status](docs/PROJECT_STATUS.md) for the current route map.

### Image intake

`_incoming-assets/` is a temporary, Git-ignored local intake for raw photography, background candidates and layout graphics. Read `_incoming-assets/README.md` before sorting or selecting assets. Do not import unselected raw files from there into the application: only chosen, web-exported files belong in `client/src/assets/images/`.

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

**Do not edit `schema.sql` to "fix" this** — Johnny owns it and the live DB is the source of truth.

## Dev setup
Two terminals required:

```bash
# Terminal 1 — backend
cd server && npm run dev   # nodemon, port 3000

# Terminal 2 — frontend
cd client && npm run dev   # vite, port 5173
```

Open `http://localhost:5173` in browser.
The Axios configuration points directly to `http://localhost:3000` in development; it does not use a Vite `/api` proxy.

## Deploy
**Intended flow** (when GitHub Actions is fixed): push to `main` → workflow builds the client and tars it to `$DEPLOY_PATH/public/` over SSH → `.env` is preserved across deploys → PM2 restarts the server. See `docs/deployment.md` for the full pipeline and required GitHub Secrets.

The local frontend build is `npm --prefix client run build`. Do not treat a successful build or Git push as a verified deployment. Johnny owns production steps.

## Repo traps to avoid
- **Don't touch root `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`** — they reference React 19 / Vite 8 / Tailwind 4, none of which is what the project actually uses. They're orphan scaffolding from an earlier attempt and confuse new agents. The real frontend project lives in `client/`.
- **`server/.htaccess` and `docs/deployment.md` disagree** about port and `RewriteBase`. Neither proves the live setup; Johnny owns the resolution.
- **Deployment workflow is not active at repo root.** A legacy file exists under `client/.github/workflows/`. Do not move or run it as a repair without a joint deployment decision.
- **Git remote exists.** `origin` points to `FM-Magnus/brynasbilservice2`; verify the current branch and remote before any authorized Git operation.

## Design system
All CSS custom properties are in `client/src/css/index.css` under `:root`.

**CSS hard freeze:** never modify `client/src/css/index.css`, including cleanup or deletion. Read `docs/CSS_OWNERSHIP.md` before any CSS task and edit only the route's listed CSS island. Existing legacy dependencies stay untouched; new designs use isolated stylesheets.

Current public-design tokens include `--redesign-accent` (teal), `--redesign-page` (warm white), `--redesign-ink`, `--font-heading` (Archivo) and `--font-body` (Manrope). Legacy red/black variables remain in the stylesheet; they are not the direction for new public UI. Yellow is limited to the landing-page Google field.

Animations: `.fade-up` class + IntersectionObserver in App.tsx triggers `.visible` on scroll.

**Hero rule (site-wide, established 2026-09-15):** every page hero heading uses `text-transform: uppercase` with a teal-accented portion (`<span className="title-accent">`, colored via `var(--redesign-accent)`). Every hero container shares `min-height: clamp(640px, calc(100svh - 60px), 760px)` with `display:flex; align-items:center` — the same sizing as the landing page's `.hero__frame`. Apply this to any new page hero.

**Card motifs (established 2026-09-15):** two reusable card treatments break up all-white card grids — a **teal accent card** (`background: linear-gradient(145deg, #0b848e 0%, #066973 100%)`, white text) for "featured" content, and a **dark card** (`var(--redesign-ink)` background, white text, `#91d7d9` highlights) for "technical/serious" content. Reuse these (see AGENTS.md Current state for exact usages) before inventing a new card style.

## Page section order (App.tsx)
Header → Hero → ContactIntro → EV (workshop process) → About → Services (preview) → Contact → Footer

Nav link order (Header.tsx): Start → Om oss → Biltjänster → Felsökning → Däck → AC → Bärgning → Till salu → Kontakt

## Known issues / open TODOs
1. **GoogleReviews.tsx** — real Brynäs review data is hardcoded and will become stale unless maintained
2. **schema.sql out of sync** — missing columns: `customer_name`, `comment_customer`, `comment_admin`; missing `'erased'` from status ENUM; `service` column is VARCHAR but stores INT ID
3. **comment_customer not saved** — BookingForm sends it, but server's insertBooking() doesn't include it in the INSERT
4. **Admin comment read-only** — admin modal shows comment_admin but provides no way to save it

## Agent handoff rules
- **Read `AGENTS.md` first** — it is the bounded startup contract; read `docs/CSS_OWNERSHIP.md` before CSS work
- Read recent logs in `_magnus/` before making design changes
- Check existing component structure before adding new files
- Never rewrite large files unnecessarily — prefer targeted edits
- Preserve unfinished or in-progress work unless clearly broken
- Do not touch server files unless explicitly asked
- **Log work in `docs/SESSION_LOG_CURRENT.md`** — do not append session entries to `AGENTS.md`
