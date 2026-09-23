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
- **Auto-deploy:** No active repository-root workflow; see [current project status](docs/archive/PROJECT_STATUS.md). Deployment needs Magnus and Johnny's review.
- **Database access for local dev:** SSH tunnel required —
  `ssh -i ~/.ssh/fenrirm -L 3306:localhost:3306 -N -f fenrirm@194.14.207.224`

## Division of responsibility
**Magnus owns (edit only within the current task's explicit write scope):**
- `client/src/` — frontend components, sections, CSS islands and assets (the global layer in `client/src/styles/` changes only with explicit approval)
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
  main.tsx              — React root, BrowserRouter, LanguageProvider, routes; loads the global layer:
                          styles/tailwind.css, design-tokens.css, base.css, shared-elements.css
  App.tsx               — mounts pages/landing/LandingPage (route "/")
  styles/               — design-tokens.css (--bb-*), base.css (element defaults), shared-elements.css (.bb-*),
                          ServiceGuideTemplate.css, tailwind.css (directives; utilities for /admin only)
  pages/                — one TSX + colocated CSS island per unique page / family owner; admin/
  components/
    layout/             — PublicHeader, PublicFooter
    ui/                 — GalleryTeaserCard, GoogleReviewsCard, ContactFormCard, BiltjansterFaq
    icons/              — SVG icon components
    admin/              — BookingManagement, ServiceManagement, ProtectedRoute
    BookingForm.tsx     — BookingFormModal (react-datepicker + react-time-picker)
  api/                  — axiosConfig.ts, vehicles.ts, gallery.ts (loaders; static source or API)
  data/                 — publicNavigation.ts, vehicles.ts (car stock), gallery.ts + galleryHelpers.ts
  types/                — vehicle.ts, gallery.ts (contracts; see docs/BACKEND_HANDOFF.md)
  assets/galleri/       — gallery photos: drop in / delete a file (see LÄSMIG.md there)
  assets/images/        — final web-optimized image assets
  context/, translations/ — LanguageContext (sv/en)
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
`client/src/main.tsx` defines the public routes, including `/biltjanster`, `/service-reparationer`, `/felsokning`, the Biltjänster guide routes, `/dackservice`, `/ac-service`, `/bargning`, `/bilar-till-salu` and `/kontakt`. `/tjanster` redirects to `/biltjanster`. `/admin` is protected; `/api/*` belongs to Express. Navigation for every public page comes from `client/src/data/publicNavigation.ts`, rendered by `PublicHeader`. The authoritative route → CSS-owner map is `docs/CSS_OWNERSHIP.md`.

### Image intake

`_incoming-assets/` is a temporary, Git-ignored local intake for raw photography, background candidates and layout graphics. Read `_incoming-assets/README.md` before sorting or selecting assets. Do not import unselected raw files from there into the application: only chosen, web-exported files belong in `client/src/assets/images/`. Exception: gallery photos go straight into `client/src/assets/galleri/` (originals; variants are generated at build time).

### API contract (server/index.js)
All routes return JSON. No request validation, no error middleware — keep payloads tight.

| Method | Route | Auth | Body / params |
|---|---|---|---|
| GET | `/api/services` | public | — |
| GET | `/api/available-dates` | public | — (queries `bookings WHERE available=1`) |
| POST | `/api/bookings` | public | `{ customerName, customerEmail, customerPhone, serviceId (number), date ('yyyy-MM-dd'), time ('HH:mm'), comment_customer? }` (contract: `docs/BACKEND_HANDOFF.md` §2.3) |
| GET | `/api/admin/bookings` | admin | — |
| PUT | `/api/admin/bookings/:id` | admin | `{ status }` (enum: `pending`, `confirmed`, `completed`, `cancelled`, `erased`) |
| DELETE | `/api/admin/bookings/:id` | admin | soft-delete via status=`erased` |
| GET / POST | `/api/admin/services` | admin | list / create |
| PUT / DELETE | `/api/admin/services/:id` | admin | update / delete |
| GET | `/api/admin/customers` | admin | — |

Admin auth header: `Authorization: Bearer admin-secret-token` (hardcoded). **Security:** the admin login is checked only in the browser and the server accepts that fixed token from anyone — see `docs/BACKEND_HANDOFF.md` §2.1.
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
The client build needs **Node ≥18.17** (`vite-imagetools`/sharp generates gallery images). Build locally or in CI, never on the production server (Node 16).

## Deploy
**Intended flow** (when GitHub Actions is fixed): push to `main` → workflow builds the client and tars it to `$DEPLOY_PATH/public/` over SSH → `.env` is preserved across deploys → PM2 restarts the server. See `docs/deployment.md` for the full pipeline and required GitHub Secrets.

The local frontend build is `npm --prefix client run build`. Do not treat a successful build or Git push as a verified deployment. Johnny owns production steps.

## Repo traps to avoid
- **Ignore the root `*.disabled` files** (`package.json.disabled`, `vite.config.ts.disabled`, `tsconfig.json.disabled`, `index.html.disabled`) — orphan React 19 / Vite 8 / Tailwind 4 scaffolding. The real frontend project lives in `client/` (React 18.2, Vite 4.5, Tailwind 3.4).
- **`server/.htaccess` and `docs/deployment.md` disagree** about port and `RewriteBase`. Neither proves the live setup; Johnny owns the resolution.
- **Deployment workflow is not active at repo root.** A legacy file exists under `client/.github/workflows/`. Do not move or run it as a repair without a joint deployment decision.
- **Git remote exists.** `origin` points to `FM-Magnus/brynasbilservice2`; verify the current branch and remote before any authorized Git operation.

## Design system
Canonical tokens are `--bb-*` in `client/src/styles/design-tokens.css`; shared patterns are `.bb-*` in `client/src/styles/shared-elements.css`. Details: `docs/DESIGN_SYSTEM.md`.

**CSS architecture:** the legacy `index.css` was deleted in Step 7 (2026-09-19). Global CSS is only the four files in `styles/` loaded by `main.tsx`; never add another. Read `docs/CSS_OWNERSHIP.md` before any CSS task and edit only the route's listed CSS island. Never use `--redesign-*` or other `index.css` custom properties, and never reuse a legacy class prefix (run the collision check in `CSS_OWNERSHIP.md`).

**Headings:** Archivo 800 in **mixed case** (`.bb-h1`, `.bb-h2`), with a teal highlight via `.bb-accent`. The older "uppercase hero headings / `.title-accent` / `--redesign-accent`" rule is retired.

**Colour:** amber (`--bb-color-amber-500`) is the small accent for icons, eyebrow dashes and badges; teal for heading highlights and dark-surface buttons. Google gold is limited to the Google-rating field.

**Tailwind** is allowed only under `/admin`. Public pages use semantic BEM classes in their CSS island (the pre-commit hook blocks new Tailwind utilities in public TSX).

## Page section order (Startsidan)
Owned by `client/src/pages/landing/LandingPage.tsx`: Hero (with Google-review field) → Contact/form → "Trygg bilservice" reassurance → Services preview → five-step process → About/gallery → used-car CTA → closing contact → Footer.

Nav link order (`data/publicNavigation.ts`): Start → Om oss → Biltjänster → Felsökning → Däck → AC → Bärgning → Till salu → Kontakt

## Known issues / open TODOs
The maintained list is "What is broken / incomplete" in `AGENTS.md`. Highlights: client-side-only admin auth (P0), `comment_customer` not saved, `schema.sql` out of sync, hardcoded Google-review data, the contact form that sends nothing, and open hero/audit work — see `docs/AGENT_HANDOFF.md`. (The old roadmap is archived at `docs/archive/HITL_Temporary_roadmap.md`, history only.)

## Agent handoff rules
- **Read `AGENTS.md` first** — it is the bounded startup contract; then `docs/AGENT_HANDOFF.md` “Start here” (status, next steps, working rules); read `docs/CSS_OWNERSHIP.md` before CSS work
- **Working rules Magnus set:** ask when anything is ambiguous; measure first, then propose at a gate, then implement; never change copy, tokens or shared CSS without approval; show visible changes before committing; one logical change per commit; never push without an explicit go-ahead
- Read recent logs in `_magnus/` before making design changes
- Check existing component structure before adding new files
- Never rewrite large files unnecessarily — prefer targeted edits
- Preserve unfinished or in-progress work unless clearly broken
- Do not touch server files unless explicitly asked
- **Log work in `docs/SESSION_LOG_CURRENT.md`** — do not append session entries to `AGENTS.md`
