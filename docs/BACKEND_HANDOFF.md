# Backend handoff — Brynäs Bilservice

**For:** Johnny (backend owner) · **From:** Magnus · **Written:** 2026-09-19 · **Branch:** `redesign/blue-teal-v1`

This document explains how the frontend is built and what it expects from the backend. Section 3 is the main new feature: vehicle listings that can be managed from `/admin`.

Everything under `server/` is yours. Nothing here has been implemented on the server, and nothing in `server/` has been changed. The endpoints, tables and choices below are **proposals**. Change whatever you like, but update the contract in §3 when you do. The frontend is built against that contract and nothing else.

---

## 0. TL;DR — what we need from you, in order

1. **Real admin authentication (blocking).** Admin login currently happens only in the browser, so the admin API is effectively open. See §2.1. Nothing that accepts file uploads should ship before this is fixed.
2. **Vehicle listings API + image upload** as specified in §3.
3. **Small existing issues** in §2.2, which you can fix when convenient.

When your endpoints respond as described in §3.4, the frontend switch is a single environment variable (§3.7).

---

## 1. How the frontend is built

| Area | Where | Notes |
|---|---|---|
| App root | `client/` | React 18.2, Vite 4.5, TypeScript. The root `package.json` / `vite.config.ts` are disabled leftovers; ignore them. |
| Routing | `client/src/main.tsx` | React Router. Pages are lazy-loaded. |
| Base path | `client/vite.config.ts` | `/` in dev, `/brynasbilservice/` in production builds. |
| HTTP client | `client/src/api/axiosConfig.ts` | `baseURL` is `http://localhost:3000` in dev and `/brynasbilservice` in prod, so the frontend calls `/brynasbilservice/api/...`, which Apache proxies to Express. |
| Public pages | `client/src/pages/*.tsx` | Page content is **hardcoded in the TSX**, except for bookings. The site works with no backend apart from the booking form. |
| Styling | Colocated `<Page>.css` files, plus `client/src/styles/design-tokens.css` and `shared-elements.css` | Not relevant to the backend. The legacy `client/src/css/index.css` is frozen and will be deleted. |
| Admin | `/admin` → `client/src/pages/admin/Dashboard.tsx`, `client/src/components/admin/*` | Tabs: Bookings, Services. We will add a **Vehicles** tab (§3.6). |
| Booking | `client/src/components/BookingForm.tsx` | Calls `GET /api/services`, `GET /api/available-dates`, `POST /api/bookings`. |

Commands: `npm --prefix client run dev | typecheck | build | test:browser`.

---

## 2. Current backend: what we found

These are read-only observations of `server/index.js` as of this date.

### 2.1 Security: admin auth is client-side only (P0)

- The credentials `admin` / `admin123` are checked **in the browser** (`client/src/components/admin/ProtectedRoute.tsx:18`, `client/src/pages/admin/Login.tsx:18`). They ship inside the public JS bundle, so anyone can read them.
- On success the browser stores a fixed string, `admin-secret-token`, in `localStorage`. The server accepts that same fixed string from anyone (`server/index.js:115-131`).
- **Consequence:** anyone who reads the bundle can list customers, change bookings and edit services. An image upload endpoint behind the same check would let anyone put files on the VPS.

**Proposal:**

- Add an `admin_users` table (§3.3) with `bcryptjs` hashes. `bcryptjs` is pure JS, so it avoids native builds on CentOS 7.
- Accounts: one for the owner (Maher) and one for Magnus.
- Add `POST /api/admin/login`, `POST /api/admin/logout` and `GET /api/admin/me`.
- Use a session in an **httpOnly, Secure, SameSite=Strict cookie** (`express-session` plus a MySQL store, or a signed cookie). A server-side session can be revoked; a long-lived JWT in `localStorage` cannot.
- Rate-limit the login endpoint (for example `express-rate-limit`, 5 attempts per 15 minutes per IP).
- Replace `authenticateAdmin` with a session check. Restrict `cors()` to the site origin, or remove it, since production is same-origin.
- Frontend side (we do this): remove the hardcoded credentials and `localStorage` token, call `/login` and `/me`, and send requests with `withCredentials`.

### 2.2 Other loose ends (P1/P2)

| # | Issue | Where |
|---|---|---|
| a | `comment_customer` is sent by the booking form but never stored; the route neither reads it nor inserts it. Vehicle inquiries rely on this field (§3.8). Exact request contract and fix: §2.3. | `server/index.js:69`, `:101` |
| b | `bookings.customer_name` is inserted but not in `schema.sql`; `schema.sql` is stale compared with the live DB. Please dump the live schema into the repo as the source of truth. | `server/database/schema.sql` |
| c | A single `mysql.createConnection` with no reconnect. A pool (`mysql2.createPool`) would survive MySQL idle timeouts. | `server/index.js:21` |
| d | No input validation or error middleware. | throughout |
| e | Port / `RewriteBase` mismatch: `server/.htaccess` (3000 + RewriteBase) vs `docs/deployment.md` (3001, no RewriteBase). | yours to resolve |
| f | `comment_admin` is shown in the admin UI but there is no endpoint to save it. | admin bookings |

### 2.3 Booking request contract and the `comment_customer` fix

The frontend is finished on its side of this. `client/src/api/bookings.ts` builds the body from `client/src/types/booking.ts`, and `client/tests/browser/booking-form.spec.ts` pins it.

`POST /api/bookings` body, as sent today:

```json
{
  "customerName": "Anna Andersson",
  "customerEmail": "anna@example.se",
  "customerPhone": "0701234567",
  "serviceId": 3,
  "date": "2026-09-20",
  "time": "09:30",
  "comment_customer": "Gäller förfrågan om Peugeot 307 CC (2006)"
}
```

- `serviceId` is a number. `date` is the calendar day the customer picked, `yyyy-MM-dd`, **not a UTC timestamp**. `time` is 24-hour `HH:mm`. Text fields are trimmed.
- `comment_customer` is **omitted** when the customer wrote nothing, so store `NULL`. The snake_case key is the existing contract and is kept on purpose.
- **Date bug fixed on the client.** Until 2026-09-20 the client sent a JSON-serialised `Date`. A customer in Sweden picking 20 Sep sent `2026-09-19T22:00:00.000Z`, which `format(new Date(date), 'yyyy-MM-dd')` turns into 19 Sep on a UTC server. Bookings made before that fix may sit one day early in the live DB.

Fix for §2.2a (two changes in the route; not applied, `server/index.js` is not ours):

```js
const { customerName, customerEmail, customerPhone, serviceId, date, time, comment_customer } = req.body;
// ...
const bookingQuery = 'INSERT INTO bookings (customer_id, customer_name, service, date, time, comment_customer) VALUES (?, ?, ?, ?, ?, ?)';
db.query(bookingQuery, [customerId, customerName, serviceId, formattedDate, time, comment_customer || null], ...);
```

The admin list already selects `b.comment_customer` (`GET /api/admin/bookings`), so it shows the text once it is stored.

Also for whoever implements it:

- **Column type and length.** The live DB is the truth and is not in the repo. If `comment_customer` is `VARCHAR(255)` under strict SQL mode, a longer comment makes the INSERT fail. Check it, then validate the length server-side and return `422`. The client currently sets no `maxLength`; agree a limit and it will be added.
- **Date parsing.** `date` now arrives as `yyyy-MM-dd`. Validate it against `^\d{4}-\d{2}-\d{2}$` and store it as is, instead of round-tripping through `new Date()`.
- **Status codes drive the wording the customer sees.** No response, timeout, `429`, other `4xx` and `5xx` each get their own message (`client/src/hooks/useFormSubmission.ts`). Return `422` for content problems rather than `500`. Today every failure is a `500`.
- **Remove** the `console.log('Received booking data:', req.body)` at `:70`; it logs customers' personal data (also §6.8).
- **Acceptance test.**
  ```bash
  curl -s -X POST http://localhost:3000/api/bookings -H 'Content-Type: application/json' \
    -d '{"customerName":"Test","customerEmail":"t@example.se","customerPhone":"0700000000","serviceId":1,"date":"2026-09-20","time":"09:30","comment_customer":"hej"}'
  ```
  Expect `201`, then `GET /api/admin/bookings` returns `"comment_customer": "hej"` and `date` `2026-09-20`.

---

## 3. Feature: vehicle listings ("Bilar till salu")

### 3.1 Goal

The owner or Magnus logs in at `/admin`, opens **Vehicles**, and can:

- add a car (details plus several photos)
- reorder, replace or remove photos
- publish it, mark it sold, or delete it

`/bilar-till-salu` shows the result without a redeploy.

### 3.2 Split of work

| Frontend (Magnus / Claude) | Backend (Johnny) |
|---|---|
| `Vehicle` TypeScript type = the contract (`client/src/types/vehicle.ts`) | Tables, migrations, endpoints per §3.4 |
| Public page renders from `getPublicVehicles()`, with loading, error and empty states | Session auth (§2.1) |
| Admin Vehicles tab: form, photo picker, reorder, status | Multipart upload, validation, file storage |
| **Browser-side image resizing** into the exact variants in §3.5 | Serving `/brynasbilservice/uploads/...` |
| A mock adapter so the admin UI can be built and tested before the API exists | Backups of the uploads folder and DB |

### 3.3 Data model (proposal)

JSON uses **camelCase**; the DB uses **snake_case**. All tables use `utf8mb4` because the data contains å, ä and ö.

```sql
CREATE TABLE admin_users (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username      VARCHAR(60)  NOT NULL UNIQUE,
  password_hash VARCHAR(100) NOT NULL,
  display_name  VARCHAR(100) NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login_at DATETIME NULL
) DEFAULT CHARSET=utf8mb4;

CREATE TABLE vehicles (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug        VARCHAR(120) NOT NULL UNIQUE,          -- e.g. peugeot-307-cc-2006
  make        VARCHAR(60)  NOT NULL,                 -- Peugeot
  model       VARCHAR(80)  NOT NULL,                 -- 307 CC 2.0
  year        SMALLINT UNSIGNED NOT NULL,
  mileage_km  INT UNSIGNED NOT NULL,                 -- stored in km, UI shows Swedish "mil" (km / 10)
  fuel        VARCHAR(30)  NOT NULL,                 -- Bensin, Diesel, El, Hybrid …
  gearbox     VARCHAR(30)  NOT NULL,                 -- Manuell, Automat
  color       VARCHAR(40)  NOT NULL,
  price_sek   INT UNSIGNED NOT NULL,                 -- whole kronor, no decimals
  description TEXT NOT NULL,                         -- plain text, newlines allowed, no HTML
  status      ENUM('draft','available','sold') NOT NULL DEFAULT 'draft',
  sold_at     DATETIME NULL,                         -- set when status becomes 'sold'
  sort_order  INT NOT NULL DEFAULT 0,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at  DATETIME NULL                          -- soft delete, same idea as bookings 'erased'
) DEFAULT CHARSET=utf8mb4;

CREATE TABLE vehicle_images (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  vehicle_id  INT UNSIGNED NOT NULL,
  position    SMALLINT UNSIGNED NOT NULL DEFAULT 0,  -- 0 = main image
  alt         VARCHAR(200) NOT NULL,
  main_webp   VARCHAR(255) NOT NULL,                 -- relative path under the uploads root
  main_jpg    VARCHAR(255) NOT NULL,
  thumb_webp  VARCHAR(255) NOT NULL,
  thumb_jpg   VARCHAR(255) NOT NULL,
  width       SMALLINT UNSIGNED NOT NULL,            -- of the main variant
  height      SMALLINT UNSIGNED NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
) DEFAULT CHARSET=utf8mb4;
```

We use `VARCHAR` rather than `ENUM` for fuel and gearbox so that a new value doesn't need a migration. The admin UI offers a fixed dropdown instead.

### 3.4 API contract

**Error shape (all endpoints):**

```json
{ "error": { "code": "VALIDATION_FAILED", "message": "Human-readable text", "fields": { "priceSek": "Must be a positive integer" } } }
```

`fields` is only present for 422 responses.

Status codes: `200` ok, `201` created, `204` no content, `401` not logged in, `404` not found, `413` file too large, `415` wrong file type, `422` validation failed, `500` server error.

**Vehicle object (the contract):**

```json
{
  "id": 1,
  "slug": "peugeot-307-cc-2006",
  "make": "Peugeot",
  "model": "307 CC 2.0",
  "year": 2006,
  "mileageKm": 141147,
  "fuel": "Bensin",
  "gearbox": "Manuell",
  "color": "Mörkgrå",
  "priceSek": 39900,
  "description": "Snygg och välskött cabriolet …",
  "status": "available",
  "soldAt": null,
  "images": [
    {
      "id": 11,
      "alt": "Peugeot 307 CC från sidan",
      "main":  { "webp": "/brynasbilservice/uploads/vehicles/1/11-main.webp",  "jpg": "/brynasbilservice/uploads/vehicles/1/11-main.jpg",  "width": 1600, "height": 1000 },
      "thumb": { "webp": "/brynasbilservice/uploads/vehicles/1/11-thumb.webp", "jpg": "/brynasbilservice/uploads/vehicles/1/11-thumb.jpg", "width": 640,  "height": 400 }
    }
  ],
  "createdAt": "2026-09-19T10:00:00Z",
  "updatedAt": "2026-09-19T10:00:00Z"
}
```

Image URLs are returned **ready to use**; the frontend never builds paths. `images` is sorted by `position`, and the first entry is the main image.

**Public endpoints (no auth):**

| Method | Path | Returns |
|---|---|---|
| GET | `/api/vehicles` | `{ "vehicles": Vehicle[] }`: `available` cars sorted by `sort_order`, then `sold` cars from the last **60 days** (proposed). Never drafts or deleted cars. Send `Cache-Control: public, max-age=60`. |
| GET | `/api/vehicles/:slug` | One `Vehicle`, or `404`. Reserved for a future detail page. |

**Admin endpoints (session cookie required):**

| Method | Path | Body | Returns |
|---|---|---|---|
| POST | `/api/admin/login` | `{ "username", "password" }` | `204` + `Set-Cookie`, or `401` |
| POST | `/api/admin/logout` | — | `204` |
| GET | `/api/admin/me` | — | `{ "username", "displayName" }` or `401` |
| GET | `/api/admin/vehicles` | — | `{ "vehicles": Vehicle[] }`: all non-deleted cars, including drafts |
| POST | `/api/admin/vehicles` | Vehicle fields without `id`/`images`/timestamps. `slug` optional; generate it if missing. | `201` + Vehicle |
| PATCH | `/api/admin/vehicles/:id` | Any subset of the fields. Setting `status: "sold"` sets `soldAt`; setting it back clears it. | `200` + Vehicle |
| DELETE | `/api/admin/vehicles/:id` | — | `204` (soft delete) |
| POST | `/api/admin/vehicles/:id/images` | `multipart/form-data`: `mainWebp`, `mainJpg`, `thumbWebp`, `thumbJpg` (files), `alt`, `width`, `height` (text). Appended last. | `201` + image object |
| PUT | `/api/admin/vehicles/:id/images/order` | `{ "imageIds": [11, 13, 12] }` (must contain exactly the vehicle's images) | `200` + Vehicle |
| PATCH | `/api/admin/vehicles/:id/images/:imageId` | `{ "alt" }` | `200` + image object |
| DELETE | `/api/admin/vehicles/:id/images/:imageId` | — | `204`; also deletes the four files |

**Validation (server must enforce; the UI mirrors it):**

| Field | Rule |
|---|---|
| make, model, fuel, gearbox, color | required, trimmed, 1 to 60/80/30/30/40 chars |
| year | integer, 1950 to current year + 1 |
| mileageKm | integer, 0 to 2 000 000 |
| priceSek | integer, 0 to 5 000 000 |
| description | required, max 4 000 chars, plain text (render as text, never as HTML) |
| status | `draft` / `available` / `sold` |
| images | max 12 per vehicle; each file ≤ 2 MB; **check file type by magic bytes**, not the extension or `Content-Type`; accept only WebP and JPEG |
| publishing | a vehicle cannot become `available` with 0 images (422) |

### 3.5 Images: why the browser resizes them

The public page needs, for each photo:

| Variant | Size | Formats | Used for |
|---|---|---|---|
| `main` | 1600 px wide, **16:10**, centre-cropped | WebP (q≈0.8) + JPG (q≈0.82) | large viewer, `<picture>` with WebP and a JPG fallback |
| `thumb` | 640 px wide, 16:10 | WebP + JPG | thumbnail buttons |

**Proposal: the admin UI makes these four files in the browser** (canvas `toBlob`) and uploads them together.

- **Why:** image libraries like `sharp` depend on native binaries. On CentOS 7 (glibc 2.17) with Node 16, recent versions may not install. Resizing in the browser avoids any native dependency on the server, and phone photos (5 to 10 MB) are shrunk before upload.
- **The server still validates everything:** type by magic bytes, size limit, dimensions within reason. It never trusts the client.
- **Alternative if you prefer:** do the resizing server-side with a `sharp` version you've confirmed runs on the VPS. The contract doesn't change, except that the upload becomes one original file.

**Storage:**

- Deploy step 8 (`docs/deployment.md`) replaces `$DEPLOY_PATH/public/`, so uploads **must live outside `public/`**, for example `$DEPLOY_PATH/../brynas-uploads/vehicles/<vehicleId>/<imageId>-{main,thumb}.{webp,jpg}`.
- Serve them at `/brynasbilservice/uploads/` through an Apache `Alias`, or `express.static`, with long cache headers. Filenames change when an image is replaced, so caching is safe.
- Please include that folder in the backup, along with the DB.

**Filenames:** generate them on the server; never reuse the uploaded name.

### 3.6 Admin UI (we build this)

- New **Vehicles** tab in `Dashboard.tsx`. Admin screens may use Tailwind; public pages may not.
- The list shows status chips (Utkast / Till salu / Såld), and each row has **Redigera**, **Markera som såld** and **Ta bort** (with a confirm step).
- The form contains the fields from §3.4, a photo picker with drag-to-reorder, alt text per photo, and a preview of the 16:10 crop.
- Everything is built against a mock adapter that follows §3.4 exactly. Your endpoints replace the mock without any UI changes.

### 3.7 How the public page switches to the API

- `client/src/types/vehicle.ts`: the `Vehicle` type from §3.4.
- `client/src/data/vehicles.ts`: today's Peugeot, written in exactly that shape.
- `client/src/api/vehicles.ts`: `getPublicVehicles()` reads from the static file or `GET /api/vehicles`, depending on `VITE_VEHICLES_SOURCE=static|api` (default `static`).
- `BilarTillSalu.tsx` only ever calls `getPublicVehicles()`, and it has loading, error ("Ring oss på 070-553 33 95") and empty states.

**Go-live:**

1. Deploy the API.
2. Upload the Peugeot through the admin.
3. Build with `VITE_VEHICLES_SOURCE=api`.
4. Delete the static seed.

### 3.8 Inquiries about a car

"Skicka förfrågan" on a vehicle opens the existing booking modal, prefilled with the comment `Gäller förfrågan om <make> <model> (<year>)`. For this to reach the workshop, fix **§2.2a** (`comment_customer` must be stored).

Optionally, later: add a nullable `vehicle_id` to `bookings` so inquiries can be filtered per car.

---

## 4. Acceptance checklist (backend)

- [ ] Hardcoded admin credentials and the fixed token are gone; logging in sets an httpOnly cookie; `/api/admin/*` returns 401 without it.
- [ ] Login is rate-limited.
- [ ] `GET /api/vehicles` returns exactly the §3.4 shape and never includes drafts or deleted cars.
- [ ] Uploading a `.php` renamed to `.jpg` is rejected with 415.
- [ ] Uploaded files survive a normal deploy.
- [ ] Deleting an image removes its files; deleting a vehicle hides it publicly.
- [ ] `comment_customer` is stored on bookings, and `date` is stored as sent (`yyyy-MM-dd`, no day shift). See §2.3.
- [ ] Live DB schema is committed to `server/database/`.

## 5. Open decisions for you

1. Session store: `express-session` plus a MySQL store, or a signed stateless cookie?
2. Image resizing: in the browser (proposed) or with `sharp` on the server?
3. Uploads location on the VPS, and whether Apache or Express serves it.
4. How long sold cars stay visible (proposed: 60 days).
5. Whether to use a migration tool, or keep hand-run SQL files in `server/database/migrations/`.

---

## 6. Runbook: building it ourselves (Magnus + Claude)

Use this section only if we try the backend on our own branch instead of handing §3 to Johnny. It turns the contract above into a safe order of work. If anything below is unclear or a stop condition (§6.9) is hit, stop and hand over to Johnny.

### 6.1 Ground rules

1. **Johnny must agree first.** `AGENTS.md` lists `server/` as his. Get his OK before the first commit that touches `server/`. He reviews the branch before anything is merged or deployed.
2. **Separate branch.** Commit Step 6 first, then create the branch:
   ```bash
   git switch redesign/blue-teal-v1 && git switch -c backend/vehicles-attempt
   ```
   Make one commit per phase (§6.5), and don't push until Magnus says so.
3. **Additive only.** New tables and new files only. Never `ALTER` or `DROP` existing tables. Never rewrite Johnny's booking code; the only edits to `server/index.js` are small, listed ones (§6.4). Because the changes are additive, a rollback never needs a database restore.
4. **No real customer data on a laptop.** Copy the live database *structure* (no rows) and the non-personal `services` rows. Never copy `customers` or `bookings` rows.
5. **Node 16 compatibility.** Production runs Node 16 (glibc 2.17). Run the server tests under Node 16 locally (`fnm use 16`), even though this Mac runs Node 20.
6. **Never read, print or commit `server/.env`.** Secrets are added to the server's `.env` by Magnus by hand.

### 6.2 Decisions (defaults if we build it)

These replace the open questions in §5.

| Question | Our choice | Why |
|---|---|---|
| Session store | `express-session` + `express-mysql-session` | A session can be revoked on logout and survives PM2 restarts; no extra services |
| Image resizing | In the browser (§3.5) | No native image library on CentOS 7 |
| Uploads location | `$DEPLOY_PATH/../brynas-uploads/` | Deploy step 6 wipes the whole `$DEPLOY_PATH`, so uploads must live outside it |
| Uploads URL | `/brynasbilservice/api/uploads/...`, served by `express.static` | Apache already proxies `/api/*` to Express (`docs/deployment.md:31`), so **no Apache or `.htaccess` change is needed**. The contract is unaffected because the API returns full URLs. |
| Sold cars visible | 60 days | Proposal from §3.4 |
| Schema changes | Numbered SQL files in `server/database/migrations/` (`001_…sql`), written with `IF NOT EXISTS`, run by hand, logged in a README there | Matches how the DB is managed today; no new tooling |

### 6.3 Phase 0: preparation (no code)

1. **Johnny's OK.** Also ask him which `.htaccess` is really live (§2.2e). We don't depend on the answer, but we must not break it.
2. **Versions on the server** (read-only, over SSH):
   ```bash
   node -v && mysql --version
   ```
   `node:test` needs Node **16.17 or later**. If production is older, use `mocha` for tests instead.
3. **Export the live structure** (read-only, through the existing SSH tunnel):
   ```bash
   mysqldump --no-data --skip-comments -h 127.0.0.1 -u <user> -p fenrirm_brynasbilservice > server/database/live-schema.sql
   ```
   ```bash
   mysqldump --no-create-info -h 127.0.0.1 -u <user> -p fenrirm_brynasbilservice services > server/database/seed-services.sql
   ```
   Commit both only after Johnny has looked at them. `live-schema.sql` becomes the reference; the old `schema.sql` stays untouched.
4. **Local MySQL with the same major version as production** (Docker or Homebrew):
   - Create two databases: `brynas_dev` and `brynas_test`.
   - Load `live-schema.sql` and `seed-services.sql` into both.
   - Add a handful of **fake** customers and bookings for dev.
5. **Local `server/.env`** pointing at `brynas_dev`, plus `SESSION_SECRET` (a random 64-character string) and `UPLOADS_DIR=../brynas-uploads-dev`. It stays git-ignored.
6. **Dev proxy.** Add a Vite proxy (`/api` → `http://localhost:3000`) and use `baseURL: ''` in dev. Dev then runs on one origin, like production, so session cookies behave the same without dev-only CORS settings.

### 6.4 File layout (new code lives beside Johnny's)

```text
server/
├── index.js                 # small edits only, see below
├── lib/db.js                # mysql2 connection POOL (promise API), used by new code only
├── lib/imageCheck.js        # magic-byte checks: JPEG = FF D8 FF, WebP = "RIFF"....."WEBP"
├── lib/slug.js              # "Peugeot 307 CC 2.0", 2006 -> "peugeot-307-cc-2-0-2006", å/ä -> a, ö -> o
├── middleware/requireAdmin.js
├── routes/adminAuth.js      # /api/admin/login, /logout, /me
├── routes/vehicles.js       # public GET /api/vehicles, /api/vehicles/:slug
├── routes/adminVehicles.js  # all /api/admin/vehicles/* incl. images
├── scripts/create-admin.js  # asks for the password on the prompt, never as an argument
├── database/migrations/001_admin_users.sql, 002_vehicles.sql, 003_sessions.sql (if the store doesn't create it)
└── test/*.test.js           # node:test + supertest against brynas_test
```

**The only edits to `server/index.js`:**

1. `app.set('trust proxy', 1)`. Traffic passes through Cloudflare, nginx and Apache; without this, Secure cookies are never set and the rate limiter sees every visitor as the same IP.
2. Add the session middleware.
3. Mount the three routers, plus `express.static` for `/api/uploads`, **before** the `app.get('*')` catch-all.
4. Make the existing `authenticateAdmin` check the session instead of the fixed token.
5. Add `comment_customer` to the `INSERT` in `insertBooking()` (§2.2a). The column already exists in the live DB, per `CLAUDE.md`.
6. Restrict `cors()` to the site's origin.

**Dependencies** (all plain JavaScript; check each one's `engines` field against Node 16 before installing):

- `express-session`, `express-mysql-session`
- `bcryptjs`
- `multer` (2.x; 1.x has known DoS issues)
- `express-rate-limit`
- dev only: `supertest`

We skip `file-type`: its current versions are ESM-only, and the 15-line magic-byte check in `lib/imageCheck.js` is enough.

**Session cookie settings:**

- `httpOnly: true`
- `sameSite: 'strict'`
- `secure: true` in production, `false` locally
- `path: '/brynasbilservice'` in production
- `maxAge`: 8 hours

Every `/api/admin/*` response sends `Cache-Control: no-store` so Cloudflare never caches it.

### 6.5 Phases (each one is a commit, a test run and a stop point)

| Phase | Backend | Frontend | Done when |
|---|---|---|---|
| **1. Real login** | Migration 001 (and 003 if needed); `adminAuth.js`; `requireAdmin`; session setup; rate limit; `create-admin.js`; `authenticateAdmin` checks the session; `comment_customer` fix | `ProtectedRoute.tsx` and `Login.tsx` call `/login` and `/me`; hardcoded credentials and `localStorage` token removed; logout button | Tests in §6.6 group A pass; Bookings and Services admin still work locally |
| **2. Read-only vehicles** | Migration 002; `routes/vehicles.js`; seed the Peugeot locally | `getPublicVehicles()` with `VITE_VEHICLES_SOURCE=api` works against the local server | Group B passes; the page looks identical in static and api mode (Playwright, 3 widths) |
| **3. Admin edits** | `adminVehicles.js` (all non-image routes) | Vehicles tab: list, create, edit, sold, delete | Group C passes |
| **4. Photos** | Image routes, multer (memory storage, 2 MB limit, 4 files), magic-byte check, write files to `UPLOADS_DIR`, delete files on image delete | Browser resize to 1600/640 at 16:10 in WebP and JPG; picker; reorder; alt text | Group D passes; a real 8 MB phone photo uploads and shows correctly |
| **5. Go-live** | Deploy (§6.7) | Build with `VITE_VEHICLES_SOURCE=api`; delete the static seed after the Peugeot is live from the DB | The §4 checklist is ticked on production |

Phase 1 can be deployed on its own. It's worth doing even if the rest of the attempt is abandoned, because it closes the security hole.

### 6.6 Tests (`cd server && npm test`, under Node 16, against `brynas_test`)

The test database is emptied and reseeded before each run.

- **A. Auth**
  - Wrong password gives 401.
  - The 6th attempt within 15 minutes gives 429.
  - A correct login sets an httpOnly cookie; `/me` works with it and gives 401 without it.
  - After logout the old cookie gets 401.
  - Every existing `/api/admin/*` route gives 401 without a cookie, including the old `Bearer admin-secret-token`.
- **B. Public vehicles**
  - Drafts and deleted cars never appear.
  - A car sold 61 days ago doesn't appear; one sold yesterday does.
  - The response matches §3.4 field for field (camelCase, image URLs complete).
- **C. Admin vehicles**
  - Each validation rule in §3.4 returns 422 with the right `fields` key.
  - Setting `sold` sets `soldAt`; setting it back clears it.
  - Publishing with 0 images gives 422.
  - Delete is soft (the row stays with `deleted_at` set).
- **D. Images**
  - A PHP file renamed `.jpg` gives 415.
  - A 3 MB file gives 413.
  - A 13th image gives 422.
  - The reorder list must contain exactly the vehicle's images.
  - Deleting an image removes its 4 files.
  - Filenames never contain the uploaded name.
- **Frontend.** Existing Playwright suite, plus a Bilar till salu spec in api mode against the local server.

### 6.7 Deploy and rollback (manual; there is no CI)

**Before deploying:**

1. Back up the database on the server:
   ```bash
   mysqldump fenrirm_brynasbilservice > ~/backups/brynas-$(date +%F-%H%M).sql
   ```
2. Back up the deploy folder:
   ```bash
   tar czf ~/backups/deploy-$(date +%F-%H%M).tgz -C "$DEPLOY_PATH" .
   ```
3. Magnus adds `SESSION_SECRET` and `UPLOADS_DIR` to the server's `.env` by hand. Create the uploads folder outside `$DEPLOY_PATH` and make it writable by the PM2 user.

**Deploy:**

1. Run the new migration files in order.
2. Follow the existing steps in `docs/deployment.md`, which already preserve `.env`.
3. On the server, run `npm ci --omit=dev` under Node 16.
4. Restart PM2.
5. Run `node scripts/create-admin.js` twice: once for the owner, once for Magnus. Each person types their own password.

**Smoke test in production:**

1. The public site loads.
2. A booking can be made, and its comment appears in admin.
3. Admin login, logout, and a 401 without a cookie.
4. `GET /brynasbilservice/api/vehicles` returns JSON.

**Rollback:**

1. Restore the deploy tarball and restart PM2.
2. The new tables can stay; they're unused by the old code.
3. Restore the database dump only if existing data was damaged, which additive migrations shouldn't cause.

### 6.8 Security checklist for the branch

- [ ] Search the client bundle for `admin123` and `admin-secret-token` after `npm run build`: 0 hits.
- [ ] All SQL uses `?` placeholders; no string concatenation.
- [ ] Descriptions are rendered as text in React (no `dangerouslySetInnerHTML`).
- [ ] Uploads folder: files are never executed or listed; `express.static` with `dotfiles: 'deny'` and `index: false`.
- [ ] Passwords are never logged. Remove the existing `console.log('Received booking data:', req.body)` in `server/index.js:70`, which logs customers' personal data.

### 6.9 Stop and hand to Johnny if

- Any change to existing tables seems necessary.
- The live schema export differs from `CLAUDE.md` in a way we don't understand.
- A dependency won't install or run on Node 16 / CentOS 7.
- The Apache or nginx config would need changing.
- The admin Bookings or Services tabs stop working in any phase.

---

## 7. Feature: gallery images (`/galleri`)

### 7.1 Today: photos come from a folder in the repo

`/galleri` shows every JPG, PNG or WebP in `client/src/assets/galleri/`.

- **Variants:** `vite-imagetools` generates a `main` (≤1920px) and a `thumb` (≤640px) for each photo, in WebP and JPG, at build time.
- **Captions** live in `bildtexter.json` in the same folder.
- **Adding or removing a photo** is a file change followed by a build and deploy. See `client/src/assets/galleri/LÄSMIG.md`.
- **No backend is involved yet.**

### 7.2 Contract (`client/src/types/gallery.ts`)

```json
{
  "id": 11,
  "slug": "servicegang-mot-kontor",
  "title": "Servicegången i verkstaden",
  "description": "En lång vy genom verkstadens arbetsyta och utrustning.",
  "category": "Verkstad",
  "alt": "Servicegång i verkstaden med utrustning och däckställ",
  "main":  { "webp": "/brynasbilservice/api/uploads/gallery/11-main.webp",  "jpg": "…-main.jpg",  "width": 1920, "height": 1278 },
  "thumb": { "webp": "/brynasbilservice/api/uploads/gallery/11-thumb.webp", "jpg": "…-thumb.jpg", "width": 640,  "height": 426 }
}
```

- The aspect ratio is free; the page never crops.
- `slug` is used in page URLs (`/galleri?bild={slug}`), so it must stay stable once published.

### 7.3 Endpoints (proposal)

| Method | Path | Returns / body |
|---|---|---|
| GET | `/api/gallery` | `{ "images": GalleryImage[] }`, sorted by position. Public, `Cache-Control: public, max-age=60` |
| GET | `/api/admin/gallery` | Same list, admin session required |
| POST | `/api/admin/gallery` | multipart: `mainWebp`, `mainJpg`, `thumbWebp`, `thumbJpg`, plus `title`, `description`, `category`, `alt`, `width`, `height`, `noPeopleConfirmed=true` → `201` + image |
| PATCH | `/api/admin/gallery/:id` | Any of `title`, `description`, `category`, `alt` |
| PUT | `/api/admin/gallery/order` | `{ "imageIds": [...] }`, which must contain exactly all images |
| DELETE | `/api/admin/gallery/:id` | `204`; also deletes the four files |

- **Uploads:** same pipeline and storage as vehicle photos (§3.5, §6.2): resized in the browser, files outside `$DEPLOY_PATH`, served under `/api/uploads/gallery/`.
- **Validation:** magic bytes, ≤2 MB per file, and a required, non-empty `alt`.

### 7.4 Content rule: no people

Gallery photos must not show people: no faces, customers or staff.

- The admin upload form should have a required checkbox, **"Bilden innehåller inga personer"**, sent as `noPeopleConfirmed=true`.
- The server rejects uploads without it (`422`).
- This is a policy the owner confirms. The server cannot verify it.

### 7.5 Switching from the folder to the backend

1. Deploy the endpoints.
2. Upload the folder's current photos once, as the starting set.
3. Build with `VITE_GALLERY_SOURCE=api`. The page only ever calls `getGalleryImages()` (`client/src/api/gallery.ts`), so nothing else changes.
