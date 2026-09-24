# Brynäs Bilservice

Website and booking system for Brynäs Bilservice — a car repair workshop in Gävle, Sweden.

**Live:** <https://labb.fenrirmedia.se/brynasbilservice/>

This README is for people (Magnus, Johnny, any developer). AI tools read [`AGENTS.md`](AGENTS.md) instead.

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite 4. Plain CSS with shared design tokens; Tailwind 3 only in `/admin` |
| Backend | Node.js 16 on the server, Express 4, JavaScript |
| Database | MySQL |
| Hosting | VPS behind Cloudflare, PM2 via fnm — details in [`docs/BACKEND.md`](docs/BACKEND.md) |

## Folder structure

```
client/                   Frontend (React + Vite)
  src/
    main.tsx              App entry: routes and the four global stylesheets
    pages/                One file (+ its own CSS) per public page; admin/ and landing/
    components/           layout/ (header, footer), ui/ (shared cards), icons/, admin/, BookingForm
    styles/               Design tokens, shared patterns, the Guide-family stylesheet
    data/                 business.ts (phone, address, hours), vehicles.ts, gallery, navigation
    api/  types/  hooks/  Data loaders, contracts, shared hooks
    assets/images/        Finished web images · assets/galleri/ = gallery photos
server/                   Express API — Johnny's (index.js, database/schema.sql)
docs/                     Status, image workflow, CSS rules, design system, backend, ops
_incoming-assets/         Git-ignored inbox for raw images
_magnus/                  Magnus's personal notes (local only, git-ignored)
```

## Running it locally

```bash
# Terminal 1 — backend (only needed for booking and admin)
cd server && npm install && npm run dev     # http://localhost:3000

# Terminal 2 — frontend
cd client && npm install && npm run dev     # http://localhost:5173
```

The public pages work without the backend; only booking and admin need it. The backend needs a database connection from `server/.env`; to use the live database from a laptop, open the SSH tunnel first (the command is in [`docs/BACKEND.md`](docs/BACKEND.md)). Without MySQL the API calls fail but the site still loads.

`server/.env` (never commit it):
```
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
PORT=3000
```

## Building

```bash
cd client && npm run build      # outputs client/dist/
```

Building needs Node 18.17 or newer (it generates the gallery image sizes), so build on a laptop, never on the production server (Node 16). A build or a git push does **not** deploy anything — there is no automatic deploy. Deployment is Johnny's; see [`docs/BACKEND.md`](docs/BACKEND.md) and [`docs/ops/deployment.md`](docs/ops/deployment.md).

## Everyday content changes

| To change… | Edit |
|---|---|
| Phone, e-mail, address, opening hours | `client/src/data/business.ts` — the only place; every page reads from it |
| Cars for sale | `client/src/data/vehicles.ts`: add an entry and import its photos; mark sold with `status: 'sold'` + `soldAt`. The page layout adapts to the number of cars |
| Gallery photos | Drop files into `client/src/assets/galleri/` (see `LÄSMIG.md` there). No people in gallery photos |
| Page images | Follow [`docs/IMAGES.md`](docs/IMAGES.md) |
| Page text | The page's own file in `client/src/pages/` (Swedish, hard-coded) |

## Admin panel

At `/admin`: view, filter and update bookings; add, edit and delete services. **The login (`admin` / `admin123`) is checked only in the browser and is not safe for production** — see [`docs/BACKEND.md`](docs/BACKEND.md) §2.1 and [`docs/ops/admin-panel.md`](docs/ops/admin-panel.md).

## Documentation

| File | For | What's in it |
|---|---|---|
| [`AGENTS.md`](AGENTS.md) | AI tools | The rules every AI assistant follows (`CLAUDE.md` / `GEMINI.md` just point to it) |
| [`docs/STATUS.md`](docs/STATUS.md) | everyone | What's done, what's next, what's broken |
| [`docs/IMAGES.md`](docs/IMAGES.md) | image work | How a page gets its pictures, per-page status |
| [`docs/BACKEND.md`](docs/BACKEND.md) | Johnny | Production setup, current API, live database, backend proposals |
| [`docs/CSS_OWNERSHIP.md`](docs/CSS_OWNERSHIP.md), [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) | frontend | Which CSS file owns what; colours, fonts, shared patterns |
| [`docs/ops/`](docs/ops/) | server work | Deployment, SSH setup, admin panel, git recovery |
| [`docs/LOG.md`](docs/LOG.md) | anyone | Dated work notes, newest first |
| [`docs/archive/`](docs/archive/) | history | Old handovers and logs — not instructions |

## Who owns what

- **Magnus** — the frontend: `client/`, design, content, images.
- **Johnny** — the backend: `server/index.js`, `server/database/`, `server/.htaccess`, `server/.env`, PM2/MySQL/Apache. AI assistants never edit these files unless Magnus explicitly asks.
- Johnny doesn't need the AI tools. To see recent changes, read [`docs/LOG.md`](docs/LOG.md); backend entries in the same dated format are welcome there.
