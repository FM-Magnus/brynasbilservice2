# Brynäs Bilservice

Website and booking system for Brynäs Bilservice — a local car repair shop in Gävle, Sweden.

**Live:** <https://labb.fenrirmedia.se/brynasbilservice/>

## Tech Stack

| Layer | Technology |
| ------ | ----------- |
| Frontend | React 18, TypeScript, Tailwind CSS 3, Vite 4 |
| Backend | Node.js 16 (server), Express 4, JavaScript |
| Database | MySQL / MariaDB |
| Deployment | GitHub Actions → SSH + tar → VPS |
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
│   │   ├── pages/
│   │   │   └── admin/   # Dashboard page
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
│   ├── deployment.md
│   └── ssh-setup.md
├── .htaccess            # Apache rewrite rules (deployed to server)
├── .github/
│   ├── copilot-instructions.md
│   └── workflows/
│       └── deploy.yml
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 20+ (for local development)
- npm
- SSH key `~/.ssh/fenrirm` for server/database access

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

The frontend dev server at `http://localhost:5173/brynasbilservice/` proxies API
calls to `http://localhost:3000` via the axios config.

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

Schema is defined in [`server/database/schema.sql`](server/database/schema.sql).
Tables: **customers**, **bookings**, **services**.

## Deployment

Automated via GitHub Actions on push to `main`. See [docs/deployment.md](docs/deployment.md)
for the full architecture, directory layout, and manual operations.

Key points:

- Client is built with Node 20 on GitHub Actions, deployed to `$DEPLOY_PATH/public/`
- Server runs with Node 16 on the VPS (CentOS 7, glibc too old for Node 18+)
- Express listens on port **3001** (not 3000 — that port is occupied)
- Apache `.htaccess` proxies `/api/` to Express and serves the SPA fallback
- `.env` is preserved across deploys via backup/restore

## Documentation

- [Admin Panel](docs/admin-panel.md) — features, auth flow, API endpoints
- [Deployment](docs/deployment.md) — architecture, GitHub Actions, server ops
- [SSH Setup](docs/ssh-setup.md) — key generation and server access

## Working with AI assistants

Magnus develops the frontend with help from AI coding assistants (Claude Code, Codex, Kimi,
etc.). Johnny works on the backend by hand. To keep both ways of working from stepping on
each other, the repo has three documentation files at the root.

### The three documentation files — at a glance

| File | Who it's for | What's in it |
|---|---|---|
| [`README.md`](README.md) | Anyone opening the repo | This file. High-level overview, tech stack, how to run it, links to deeper docs. |
| [`instructions.md`](instructions.md) | Magnus (and any human dev) | Practical day-to-day reference: how to run locally, change content, build, deploy. No AI-specific stuff. |
| [`CLAUDE.md`](CLAUDE.md) | AI assistants | Rules, ownership boundaries, architecture, the design system, API contract, known traps. AI tools read this once at session start. |
| [`AGENTS.md`](AGENTS.md) | AI assistants (all of them) | Living state of the project + chronological session log. Each AI session reads it first and updates it last. |

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
