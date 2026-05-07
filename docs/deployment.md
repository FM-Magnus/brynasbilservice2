# Deployment

## Architecture

The production environment uses a layered request stack:

```bash
Client browser
  → Cloudflare (SSL termination, CDN)
    → nginx (reverse proxy, port 80)
      → Apache (port 8080, .htaccess processing)
        → Node.js / Express (port 3001 via mod_proxy for /api/ routes)
```

### Request flow

1. **Static assets** (`/brynasbilservice/assets/*`) — served directly by Apache
   via a symlink at `$DEPLOY_PATH/assets → public/assets`.
2. **API requests** (`/brynasbilservice/api/*`) — Apache proxies to Express on
   `localhost:3001` using `mod_proxy` (`[P]` flag in `.htaccess`).
3. **Everything else** — Apache serves `public/index.html` (SPA fallback), and
   React Router handles client-side routing.

### .htaccess

The `.htaccess` file lives in the repo root and is deployed automatically. It
contains three rules:

```apache
RewriteEngine On
RewriteRule ^api/(.*)$ http://localhost:3001/api/$1 [P,L]  # API proxy
RewriteCond %{REQUEST_FILENAME} -f                          # Serve existing files
RewriteRule ^ - [L]
RewriteRule ^ public/index.html [L]                         # SPA fallback
```

> **Note:** Do not add `RewriteBase` — it breaks routing on this server because
> the subdomain document root already includes the `labb/` prefix.

## Server constraints

| Constraint | Detail |
| ---------- | ------ |
| OS | CentOS 7 (glibc 2.17) |
| Node.js runtime | **v16 only** — v18+ requires glibc 2.28 which is unavailable |
| Node.js build | v20 (runs on GitHub Actions Ubuntu runner, not on the server) |
| Process manager | PM2 (via fnm) |
| Port | **3001** (port 3000 is occupied by another process) |

## Deploy directory layout

```bash
$DEPLOY_PATH/
├── .env                 # DB credentials + PORT=3001 (preserved across deploys)
├── .htaccess            # Apache rewrite rules (deployed from repo)
├── index.html           # Copy of public/index.html for directory index
├── index.js             # Express server entry point
├── package.json
├── node_modules/
├── assets -> public/assets  # Symlink for /brynasbilservice/assets/ URLs
├── public/
│   ├── index.html       # React SPA entry point
│   └── assets/          # Vite-built JS, CSS, images
├── database/
└── dist/                # Legacy (from server build script)
```

## GitHub Actions workflow

Triggered on push to `main` or via `workflow_dispatch`.

### Steps

1. Checkout repo
2. Install client deps and build (`vite build` with `base: '/brynasbilservice/'`)
3. Install server deps
4. SSH into server
5. **Backup `.env`** to `/tmp/.env.brynas.bak`
6. Wipe deploy directory clean
7. Deploy server files via `tar`
8. Deploy `client/dist` to `$DEPLOY_PATH/public/`
9. Deploy `.htaccess` from repo root via `scp`
10. Copy `public/index.html` to root
11. Create `assets` symlink
12. **Restore `.env`** from backup
13. `npm install --production`
14. Restart PM2 (using fnm + Node 16)

### GitHub Secrets

| Secret | Description |
| ------ | ----------- |
| `DEPLOY_SSH_KEY` | Private SSH key for server access |
| `DEPLOY_HOST` | Server IP (`194.14.207.224`) |
| `DEPLOY_PORT` | SSH port (default `22`) |
| `DEPLOY_USER` | SSH username (`fenrirm`) |
| `DEPLOY_PATH` | Absolute path to web root on server |

### Production .env

The `.env` file is **not** in the repo. It lives only on the server and is
preserved across deploys via the backup/restore step. Contents:

```bash
DB_HOST=localhost
DB_USER=fenrirm_brynasbilservice
DB_PASSWORD=<secret>
DB_NAME=fenrirm_brynasbilservice
PORT=3001
```

If the `.env` is ever lost, recreate it manually on the server before the next
deploy.

## Manual operations

### SSH into the server

```bash
ssh -i ~/.ssh/fenrirm fenrirm@194.14.207.224
```

### Check PM2 status

```bash
export FNM_PATH="$HOME/.local/share/fnm" && export PATH="$FNM_PATH:$PATH" \
  && eval "$(fnm env --shell bash)" && fnm use 16 && pm2 list
```

### View server logs

```bash
# Same fnm preamble, then:
pm2 logs brynasbilservice --lines 50
```

### Restart the server

```bash
pm2 restart brynasbilservice
```

### Database SSH tunnel (local development)

```bash
ssh -i ~/.ssh/fenrirm -L 3306:localhost:3306 -N -f fenrirm@194.14.207.224
```

Then connect to `127.0.0.1:3306` with the credentials from the server `.env`.
