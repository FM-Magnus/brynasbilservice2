# Backend — Brynäs Bilservice

**Current branch implementation:** 2026-10-02, `codex/repo-audit-2026-10-02`. Uncommitted; not deployed or approved by Johnny. Code is authoritative if this handoff drifts. Johnny's detailed review and rollout checklist is [backend-owner-review.md](ops/backend-owner-review.md). Vehicle/gallery CMS proposals were moved to [BACKEND_PROPOSALS.md](BACKEND_PROPOSALS.md); they remain unimplemented.

## 0. Review gates

The app now requires Node 22 or newer (`server/package.json`), while the previously documented labb VPS used CentOS 7 / Node 16. Johnny must verify or upgrade the real runtime before server deployment. The checked-in `.htaccess` and `docs/ops/deployment.md` disagree about Express port and RewriteBase; neither was changed. The live MySQL schema is known to differ from `server/database/schema.sql`; inspect its structure before applying the additive migration. There is no automatic deploy.

For the controlled owner review, Magnus selected `labb.fenrirmedia.se/brynasbilservice/` and `brynasbilservice@gmail.com` as contact recipient, with Gmail SMTP as transport. SMTP credentials, verified sender and separate test mailbox are not provided. No live mail delivery or labb API check has passed yet. Privacy notice, retention and deletion procedure for submitted personal data still need agreement before public collection.

## 1. Runtime and frontend integration

- Real app: `client/` (React 18, Vite 4, TypeScript) and `server/` (Express 4, mysql2 promise pool). No root package.
- Public site base: `/brynasbilservice/`; production API calls use `/brynasbilservice/api/*` through the existing proxy model. Vite proxies `/api` to `127.0.0.1:3000` in development.
- Contact forms on Kontakt and Landing share `client/src/api/contact.ts` and `useContactForm`. A `202` means the configured SMTP service accepted the message for the recipient; it does not guarantee inbox placement. Failures preserve form values and show an error.
- Booking modal uses `GET /api/services` and `POST /api/bookings`. A `201` means a pending request was saved; staff must confirm the time. `comment_customer` is stored, including vehicle inquiry text.
- CTA policy is in `server/config/public-actions.json`, served by `/api/public/actions` and resolved by `client/src/api/publicActions.ts` plus `PublicAction`. Values are allowlisted kinds, never arbitrary URLs; displayed business facts/targets come from `client/src/data/business.ts`. Defaults work when policy fetch fails, but contact/booking do not show success without API acceptance.

## 2. Implemented API in this branch

All errors use `{ "error": { "code": "...", "message": "...", "fields": { ... } } }` where fields apply. JSON body limit is 16 KiB. Mutations with an `Origin` header reject an origin other than `PUBLIC_ORIGIN`. Public contact, booking and login endpoints are rate limited per IP. The code does not log customer payloads.

| Method | Path | Outcome |
|---|---|---|
| GET | `/api/health` | DB readiness check. |
| GET | `/api/public/actions` | Versioned CTA map. |
| GET | `/api/services` | Service list. |
| GET | `/api/available-dates` | Existing available-date query. |
| POST | `/api/contact` | Validates name, email, phone, subject and message; `202` after SMTP acceptance, `422`, `429` or `503` otherwise. |
| POST | `/api/bookings` | Validates service/date/time and customer fields; inserts customer and pending booking in one transaction; `201` only after commit. |
| POST | `/api/admin/login` | Password hash check, session rotation, CSRF token. |
| GET | `/api/admin/me` | Session status and CSRF token. |
| POST | `/api/admin/logout` | Destroys session. |
| GET/PUT/DELETE | `/api/admin/bookings[/:id]` | List, update status or soft delete. |
| GET/POST/PUT/DELETE | `/api/admin/services[/:id]` | List/create/update/delete services. |
| GET | `/api/admin/customers` | Customer list. |

### 2.1 Admin security

The old browser-only `admin` / `admin123` check and fixed bearer token are removed from runtime code. Admin routes require a MySQL-backed `express-session` cookie; writes also require a CSRF token. Cookies are httpOnly, SameSite=Strict and Secure in production, with a configurable path. `server/database/migrations/001_admin_auth.sql` adds `admin_users` and `admin_sessions`; it is not applied anywhere. `npm --prefix server run create-admin` creates a bcrypt-hashed user on an approved DB. Johnny must review the live schema, migration, proxy settings and account lifecycle before rollout.

### 2.2 Contact and mail

`POST /api/contact` accepts the current `ContactMessage` shape. `server/lib/mail.js` uses configured SMTP sender and fixed `CONTACT_TO`, with the validated visitor address only as `Reply-To`. Missing SMTP config or a provider rejection produces `503`, never a success UI. The intended transport is Gmail SMTP; actual credentials/sender are pending. Direct displayed email and phone facts remain in `business.ts` and are separate from the destination of a submitted form.

### 2.3 Booking persistence

Request keys remain `customerName`, `customerEmail`, `customerPhone`, numeric `serviceId`, local calendar `date` (`yyyy-MM-dd`), `time` (`HH:mm`) and optional `comment_customer`. The server validates shape and service existence, reuses an existing customer by email, and inserts the booking in one transaction. The live table structure has not been verified; the SQL fixture test proves query construction, not MySQL compatibility. The existing `comment_admin` field is still read-only in this implementation.

## 3. Production facts to verify

The earlier handoff recorded Cloudflare → nginx → Apache → Express, PM2, port 3001, and a live MySQL database on the VPS. Those facts may have changed and conflict with `.htaccess` (port 3000 / RewriteBase). Johnny owns verification and deploy. Do not build the frontend on the legacy Node 16 host. Do not copy or edit `server/.env` from this branch.

## 4. Verification state

Local typecheck, CSS guard, temporary-directory production build, backend HTTP/SMTP tests and targeted browser tests pass. The backend tests include real loopback SMTP acceptance/rejection but use a SQL fixture for bookings and in-memory sessions. A disposable MySQL integration run, real Gmail test mailbox, live schema check and labb end-to-end smoke test are still required. See the dated runbook for exact steps and rollback.
