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
│   ├── PROJECT_STATUS.md
│   ├── deployment.md
│   └── ssh-setup.md
├── AGENTS.md            # Current state and chronological session log
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
| [`AGENTS.md`](AGENTS.md) | AI assistants (all of them) | Living state of the project + chronological session log. Each AI session reads it first and updates it last. |
| [`docs/AGENT_HANDOFF.md`](docs/AGENT_HANDOFF.md) | AI assistants | Approved redesign baseline and preservation rules. |
| [`docs/PROJECT_STATUS.md`](docs/PROJECT_STATUS.md) | Everyone | Current page, copy, image and responsibility dashboard. |

### What this means in practice

**For Johnny (backend):**
- You don't need to use the AI tools — keep working in `server/` like you always have.
- `AGENTS.md` lists `server/index.js`, `server/database/schema.sql`, `server/.htaccess`, and `server/.env` as **"do not touch"** for AI assistants. They will not edit your files unless Magnus explicitly tells them to.
- If you want to see what changed on the frontend recently, the **session log in `AGENTS.md`** is a chronological list of what Magnus's AI sessions did. The "What is broken / incomplete" section also flags backend-related issues that need your attention (schema-vs-live-DB drift, the `.htaccess` port mismatch, etc.).
- You're welcome to add your own entries to the session log when you make backend changes — same format, just date and what you did. It helps the next AI session know what state the API/DB is in.

**For Magnus (frontend):**
- Whichever AI tool you're using — Claude Code, Kimi, Codex — the workflow is the same: it reads `AGENTS.md` at the start of the session, you do the work, it updates `AGENTS.md` at the end.
- For Claude Code specifically, a Stop hook in `.claude/settings.json` automatically reminds it to update `AGENTS.md` before finishing the session. Other tools rely on you starting with "read AGENTS.md first".
- If you switch tools mid-feature (start with Claude, finish with Kimi) the session log gives the new tool full context on what's already been done.

### Ownership boundaries (also documented in CLAUDE.md)

- **Magnus** — `client/src/`, all frontend assets, CSS, components, the public site, the admin panel UI
- **Johnny** — `server/index.js`, `server/database/`, `server/.htaccess`, `server/.env`, anything PM2/MySQL/Apache-related
- AI assistants do not modify Johnny's files without explicit instruction from Magnus
