# Brynäs Bilservice

Website and booking system for Brynäs Bilservice — a local car repair shop in Gävle, Sweden.

**Live:** <https://labb.fenrirmedia.se/brynasbilservice/>

## Tech Stack

| Layer | Technology |
| ------ | ----------- |
| Frontend | React 18, TypeScript, Tailwind CSS 3, Vite 4 |
| Backend | Node.js 16 (server), Express 4, JavaScript |
| Database | MySQL / MariaDB |
| Deployment | Production workflow unresolved; see [project status](docs/PROJECT_STATUS.md) |
| Process manager | PM2 (via fnm) |
| Hosting | VPS at `194.14.207.224` behind Cloudflare |

## Monorepo Structure

```bash
brynasbilservice/
├── client/              # React frontend (Vite)
│   ├── src/
│   │   ├── api/         # Axios config
│   │   ├── components/
│   │   │   ├── admin/   # Admin components (BookingManagement, ServiceManagement, ProtectedRoute)
│   │   │   ├── icons/   # SVG icon components
│   │   │   ├── layout/  # Header, Footer
│   │   │   ├── sections/# Page sections (Hero, Services, About, etc.)
│   │   │   └── ui/      # Reusable UI (Button, SectionHeader)
│   │   ├── context/     # React context (LanguageContext)
│   │   ├── css/         # Stylesheets
│   │   ├── pages/       # Public subpages and admin dashboard
│   │   ├── translations/# sv.ts, en.ts
│   │   ├── App.tsx
│   │   └── main.tsx     # Router setup
│   ├── vite.config.ts   # base: '/brynasbilservice/'
│   └── package.json
├── server/              # Express API (JavaScript, not TypeScript)
│   ├── index.js         # All routes and middleware
│   ├── database/        # Schema SQL
│   └── package.json
├── docs/                # Documentation
│   ├── admin-panel.md
│   ├── AGENT_HANDOFF.md
│   ├── CSS_OWNERSHIP.md
│   ├── PROJECT_STATUS.md
│   ├── SESSION_LOG_CURRENT.md
│   ├── deployment.md
│   └── ssh-setup.md
├── _incoming-assets/     # Git-ignored local image/graphics inbox; see its README
├── AGENTS.md            # Bounded agent startup contract and current constraints
├── CLAUDE.md            # Agent-specific working notes
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 20+ (for local development)
- npm
- SSH access only when working with the remote database or server

### Local Development

```bash
# Start DB tunnel (if working with real data)
ssh -i ~/.ssh/fenrirm -L 3306:localhost:3306 -N -f fenrirm@194.14.207.224

# Terminal 1 — backend
cd server
npm install
npm run dev            # runs on localhost:3000

# Terminal 2 — frontend
cd client
npm install
npm run dev            # runs on localhost:5173
```

The development frontend runs at `http://localhost:5173/` by default; Vite may select another port if 5173 is occupied. The client API configuration addresses the local Express server at `http://localhost:3000`.

### Build

```bash
cd client && npm run build    # outputs to client/dist/
```

## Database

| Field | Value |
| ------ | ----------- |
| Host | `localhost` (via SSH tunnel) |
| Port | `3306` |
| Database | `fenrirm_brynasbilservice` |
| Username | `fenrirm_brynasbilservice` |

The checked-in [`server/database/schema.sql`](server/database/schema.sql) is not a verified representation of the live database; Johnny owns reconciliation.
Tables: **customers**, **bookings**, **services**.

## Deployment

There is no active repository-root GitHub Actions deployment workflow. The older [deployment notes](docs/deployment.md) describe an intended setup and conflict with `server/.htaccess` on port and rewrite behaviour. Magnus and Johnny must verify the production configuration before deployment work. A push alone does not deploy this branch.

## Documentation

- [Admin Panel](docs/admin-panel.md) — features, auth flow, API endpoints
- [Project status](docs/PROJECT_STATUS.md) — current routes, content, images, responsibilities and open decisions
- [Image inbox](_incoming-assets/README.md) — local staging, naming and selection flow for raw photography and layout graphics
- [Agent handoff](docs/AGENT_HANDOFF.md) — approved redesign baseline and preservation rules
- [Session log](AGENTS.md) — recent work and known gaps
- [Deployment](docs/deployment.md) — historical/intended architecture; verify before use
- [SSH Setup](docs/ssh-setup.md) — key generation and server access

## Working with AI assistants

Magnus develops the frontend with help from AI coding assistants. Johnny owns the backend and deployment. The [project status](docs/PROJECT_STATUS.md) describes the current division of work.

### Documentation files — at a glance

| File | Who it's for | What's in it |
|---|---|---|
| [`README.md`](README.md) | Anyone opening the repo | This file. High-level overview, tech stack, how to run it, links to deeper docs. |
| [`instructions.md`](instructions.md) | Magnus (and any human dev) | Practical day-to-day reference: how to run locally, change content, build, deploy. No AI-specific stuff. |
| [`CLAUDE.md`](CLAUDE.md) | AI assistants | Rules, ownership boundaries, architecture, the design system, API contract, known traps. AI tools read this once at session start. |
| [`AGENTS.md`](AGENTS.md) | AI assistants (all of them) | Bounded startup contract and current constraints. Read first; do not append session logs. |
| [`docs/AGENT_HANDOFF.md`](docs/AGENT_HANDOFF.md) | AI assistants | Approved redesign baseline and preservation rules. |
| [`docs/PROJECT_STATUS.md`](docs/PROJECT_STATUS.md) | Everyone | Current page, copy, image and responsibility dashboard. |
| [`docs/CSS_OWNERSHIP.md`](docs/CSS_OWNERSHIP.md) | AI assistants | Frozen legacy-CSS rule and route-to-stylesheet ownership map. |
| [`docs/SESSION_LOG_CURRENT.md`](docs/SESSION_LOG_CURRENT.md) | Everyone | New dated work notes; older history is archived separately. |
| [`_incoming-assets/README.md`](_incoming-assets/README.md) | Magnus and frontend agents | Temporary, Git-ignored image/graphics intake and selection workflow. |

### What this means in practice

**For Johnny (backend):**
- You don't need to use the AI tools — keep working in `server/` like you always have.
- `AGENTS.md` lists `server/index.js`, `server/database/schema.sql`, `server/.htaccess`, and `server/.env` as **"do not touch"** for AI assistants. They will not edit your files unless Magnus explicitly tells them to.
- If you want to see what changed recently, read `docs/SESSION_LOG_CURRENT.md`; older history is in `docs/SESSION_LOG_ARCHIVE.md`.
- You're welcome to add backend entries to `docs/SESSION_LOG_CURRENT.md` using the same dated format.

**For Magnus (frontend):**
- Whichever AI tool you're using, it reads `AGENTS.md` first and `docs/CSS_OWNERSHIP.md` before CSS work. It writes the dated result to `docs/SESSION_LOG_CURRENT.md`, not back into `AGENTS.md`.
- If a tool reminder still says to update `AGENTS.md`, interpret that as: refresh stale current-state wording without growing the file, then log the session in `docs/SESSION_LOG_CURRENT.md`.
- If you switch tools mid-feature, the current session log gives the next tool the factual continuation context.

### Ownership boundaries (also documented in CLAUDE.md)

- **Magnus** — `client/src/`, frontend assets, CSS islands, components, the public site and admin UI; `client/src/css/index.css` remains frozen despite frontend ownership
- **Johnny** — `server/index.js`, `server/database/`, `server/.htaccess`, `server/.env`, anything PM2/MySQL/Apache-related
- AI assistants do not modify Johnny's files without explicit instruction from Magnus
