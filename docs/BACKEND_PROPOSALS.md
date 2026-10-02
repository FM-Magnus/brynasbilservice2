# Deferred vehicle and gallery backend proposals

Preserved from the 2026-09-19 backend handoff. These sections are proposals, not implemented routes or approved schema. The current API is in [BACKEND.md](BACKEND.md).

## Vehicle listings ("Bilar till salu")

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

- Deploy step 8 (`docs/ops/deployment.md`) replaces `$DEPLOY_PATH/public/`, so uploads **must live outside `public/`**, for example `$DEPLOY_PATH/../brynas-uploads/vehicles/<vehicleId>/<imageId>-{main,thumb}.{webp,jpg}`.
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


## Gallery images (`/galleri`)

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
