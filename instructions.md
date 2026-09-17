# Brynäs Bilservice — Developer Instructions

## Who does what
- **Magnus** — frontend (React components, CSS, layout, design)
- **Johnny / server owner** — backend (Express API, MySQL database)

---

## Running the project locally

The public frontend can run on its own. Start the backend separately when testing API-backed booking or admin work; database access is needed for those flows.

### Terminal 1 — Backend server
```bash
cd server
npm run dev
```
Starts Express on `http://localhost:3000`
Requires a database connection using credentials from `server/.env`; the documented SSH tunnel is one local-development option.

### Terminal 2 — Frontend
```bash
cd client
npm run dev
```
Starts Vite at `http://localhost:5173/` by default; it may choose another port if 5173 is busy.

> **Note:** If MySQL isn't running locally, the API calls will fail but the UI will still load and render.

---

## Building for deployment

```bash
cd client
npm run build
```
This produces a local `client/dist/` build. Production deployment is a separate Johnny-owned task. The former automatic workflow is not active, and the checked-in deployment notes conflict with `server/.htaccess`; see [project status](docs/PROJECT_STATUS.md) before planning a release.

---

## Project structure

```
brynasbilservice/
├── client/               ← Frontend (React + Vite + TypeScript + Tailwind)
│   └── src/
│       ├── App.tsx       ← Section order and layout
│       ├── main.tsx      ← App entry point, routing, language context
│       ├── css/index.css ← Frozen legacy CSS + global tokens; never edit
│       ├── styles/       ← Explicitly shared CSS islands
│       ├── components/   ← All UI components
│       ├── pages/        ← Public subpages and admin UI
│       ├── context/      ← Language context (Swedish/English)
│       ├── translations/ ← sv.ts and en.ts
│       └── assets/       ← Images and other static assets
├── server/               ← Backend (Node.js + Express + MySQL)
│   ├── index.js          ← API routes and server config
│   ├── database/
│   │   └── schema.sql    ← Database structure
│   ├── public/           ← Built frontend files (deploy target)
│   └── .env              ← DB credentials (never commit this)
├── docs/                 ← Deployment and SSH setup docs
├── _magnus/              ← Magnus's personal notes, logs, design files
├── CLAUDE.md             ← Instructions for AI assistants
└── instructions.md       ← This file
```

---

## Frontend: what lives where

| What | Where |
|---|---|
| Master rebuild roadmap | `HITL_Temporary_roadmap.md` (7 Page Archetypes) |
| Landing page & sections | `client/src/pages/landing/LandingPage.tsx` (`LandingPage.css`) |
| Navigation registry | `client/src/data/publicNavigation.ts` |
| Canonical header | `client/src/components/layout/PublicHeader.tsx` (`PublicHeader.css`) |
| Design tokens | `client/src/styles/design-tokens.css` (canonical `--bb-*`) |
| Bilservice guide (Style 2) | `client/src/pages/ServiceReparationerPage.tsx` |
| Biltjänster hub | `client/src/pages/BiltjansterPage.tsx` |
| Tech guides Group A (Style 3) | `client/src/styles/ServiceGuideTemplate.css` (`/koppling`, `/oljebyte`, `/avgassystem`, `/bromssystem`) |
| Booking form (modal) | `client/src/components/BookingForm.tsx` |
| Final web images | `client/src/assets/images/` |
| New/raw image candidates | `_incoming-assets/` — see `_incoming-assets/README.md` |
| Admin panel | `client/src/components/admin/` + `client/src/pages/admin/` |

`client/src/css/index.css` is a frozen legacy stylesheet. Reading existing rules is permitted; editing, deleting, reformatting or adding rules there is strictly prohibited by pre-commit hooks. New/redesigned pages use the exact CSS island listed in [`docs/CSS_OWNERSHIP.md`](docs/CSS_OWNERSHIP.md).

---

## Changing opening hours

Opening hours appear in `LandingPage.tsx`, `Footer.tsx` and subpages. The verified hours are:
- Måndag – Fredag: 08:00 – 17:00
- Lördag: Förfrågan
- Söndag: Stängt

---

## Adding a new service card or guide

Follow `HITL_Temporary_roadmap.md`. Service guides belong to Style 2 (major services), Style 3 (Tech Guides A), or Style 4 (Tech Guides B). Put raw photos in `_incoming-assets/` first (which is Git-ignored). Only selected, web-exported images belong in `client/src/assets/images/`. Preserve the page's booking and telephone behaviour.

---

## Admin panel

URL: `/admin`

Login credentials are currently hardcoded (for development only — not production-safe):
- Username: `admin`
- Password: `admin123`

The admin panel lets you:
- View, filter, sort, and update booking statuses
- Add, edit, and delete services

---

## Backend API routes

| Method | Route | Description |
|---|---|---|
| GET | `/api/services` | All services (public) |
| POST | `/api/bookings` | Submit a booking (public) |
| GET | `/api/available-dates` | Dates with available=1 (public) |
| GET | `/api/admin/bookings` | All bookings (admin) |
| PUT | `/api/admin/bookings/:id` | Update booking status (admin) |
| DELETE | `/api/admin/bookings/:id` | Soft-delete booking (admin) |
| GET/POST | `/api/admin/services` | List / create services (admin) |
| PUT/DELETE | `/api/admin/services/:id` | Update / delete service (admin) |
| GET | `/api/admin/customers` | All customers (admin) |

Admin routes require header: `Authorization: Bearer admin-secret-token`

---

## Known issues to fix

1. **GoogleReviews widget** contains confirmed Brynäs review data, but its rating, count and selected reviews are hardcoded and can become stale
2. **Customer comment** is collected in the booking form but not saved to the database
3. **Database schema** (`server/database/schema.sql`) is out of sync with the actual running database
4. **Admin auth** is not production-ready — hardcoded credentials and token

---

## Environment variables

`server/.env` (do not commit):
```
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
PORT=3000
```
