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
