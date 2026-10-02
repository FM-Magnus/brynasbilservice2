# Brynäs Bilservice server

Express/MySQL API for the Brynäs Bilservice site. This branch is for Johnny's review; it has not been deployed. Requires Node 22+. Start with [docs/BACKEND.md](../docs/BACKEND.md) and the [owner-review runbook](../docs/ops/backend-owner-review.md).

## Local setup

`npm ci` in `server/`, then configure a private `server/.env` using `server/env.example` as a variable list. Do not commit credentials. Review `database/migrations/001_admin_auth.sql` against a disposable MySQL database before applying. `npm test` runs the HTTP and captured SMTP tests. `npm run dev` starts the API (default port 3000); run the client Vite server separately. `npm run create-admin` prompts for a new account after the migration.

## Routes

Public: `GET /api/health`, `/api/public/actions`, `/api/services`, `/api/available-dates`; `POST /api/contact`, `/api/bookings`. Admin: `POST /api/admin/login`, `GET /api/admin/me`, `POST /api/admin/logout`, and the existing bookings, services and customers CRUD endpoints behind the server session. Writes require a CSRF token. See the linked runbook for examples, status codes, Gmail setup and deployment gates.
