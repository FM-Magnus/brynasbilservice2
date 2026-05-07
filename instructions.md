# Brynäs Bilservice — Developer Instructions

## Who does what
- **Magnus** — frontend (React components, CSS, layout, design)
- **Sakar / server owner** — backend (Express API, MySQL database)

---

## Running the project locally

You need **two terminals open at the same time**.

### Terminal 1 — Backend server
```bash
cd server
npm run dev
```
Starts Express on `http://localhost:3000`
Requires MySQL running locally with credentials from `server/.env`

### Terminal 2 — Frontend
```bash
cd client
npm run dev
```
Starts Vite on `http://localhost:5173` — open this in your browser.

> **Note:** If MySQL isn't running locally, the API calls will fail but the UI will still load and render.

---

## Building for deployment

```bash
cd client
npm run build
```
This outputs to `client/dist/`. Copy everything from `client/dist/` into `server/public/` — the Express server serves those files statically.

```bash
# Quick deploy copy (run from project root)
cp -r client/dist/* server/public/
```

Then restart the server on the host.

---

## Project structure

```
brynasbilservice/
├── client/               ← Frontend (React + Vite + TypeScript + Tailwind)
│   └── src/
│       ├── App.tsx       ← Section order and layout
│       ├── main.tsx      ← App entry point, routing, language context
│       ├── css/index.css ← All CSS — custom properties, components, responsive
│       ├── components/   ← All UI components
│       ├── pages/        ← Admin dashboard and login
│       ├── context/      ← Language context (Swedish/English)
│       ├── translations/ ← sv.ts and en.ts
│       ├── data/         ← marquee-items.txt (edit to change marquee text)
│       └── assets/       ← Images and other static assets
├── server/               ← Backend (Node.js + Express + MySQL)
│   ├── index.js          ← API routes and server config
│   ├── database/
│   │   └── schema.sql    ← Database structure
│   ├── public/           ← Built frontend files (deploy target)
│   └── .env              ← DB credentials (never commit this)
├── docs/                 ← Deployment and SSH setup docs
├── _magnus/              ← Magnus's personal notes, logs, design files
├── CLAUDE.md             ← Instructions for AI assistants
└── instructions.md       ← This file
```

---

## Frontend: what lives where

| What | Where |
|---|---|
| Page section order | `client/src/App.tsx` |
| Navigation links | `client/src/components/layout/Header.tsx` |
| Colors, fonts, spacing | `client/src/css/index.css` (`:root` variables) |
| Hero section | `client/src/components/sections/Hero.tsx` |
| About section | `client/src/components/sections/About.tsx` |
| Service cards (with images) | `client/src/components/sections/Services.tsx` |
| Full service list | `client/src/components/sections/ServiceList.tsx` |
| Booking form (modal) | `client/src/components/BookingForm.tsx` |
| Google reviews widget | `client/src/components/GoogleReviews.tsx` |
| Scrolling marquee | `client/src/components/ui/Marquee.tsx` |
| Marquee text content | `client/src/data/marquee-items.txt` |
| Images | `client/src/assets/images/` |
| Admin panel | `client/src/components/admin/` + `client/src/pages/admin/` |

---

## Changing the marquee text

Edit `client/src/data/marquee-items.txt` — one item per line.
The Hero section reads this file and passes lines to the Marquee component.

---

## Changing opening hours

Edit `client/src/components/sections/Contact.tsx` — the hours table is defined there.
Also update the info bar text in `client/src/components/layout/Header.tsx`.

---

## Adding a new service card

Edit `client/src/components/sections/Services.tsx`.
Each card is an entry in the `services` array with: `img`, `alt`, `w`, `h`, `icon`, `title`, `desc`, `linkText`, `linkHref`.

Add the card image to `client/src/assets/images/`.

---

## Admin panel

URL: `/admin`

Login credentials are currently hardcoded (for development only — not production-safe):
- Username: `admin`
- Password: `admin123`

The admin panel lets you:
- View, filter, sort, and update booking statuses
- Add, edit, and delete services

---

## Backend API routes

| Method | Route | Description |
|---|---|---|
| GET | `/api/services` | All services (public) |
| POST | `/api/bookings` | Submit a booking (public) |
| GET | `/api/available-dates` | Dates with available=1 (public) |
| GET | `/api/admin/bookings` | All bookings (admin) |
| PUT | `/api/admin/bookings/:id` | Update booking status (admin) |
| DELETE | `/api/admin/bookings/:id` | Soft-delete booking (admin) |
| GET/POST | `/api/admin/services` | List / create services (admin) |
| PUT/DELETE | `/api/admin/services/:id` | Update / delete service (admin) |
| GET | `/api/admin/customers` | All customers (admin) |

Admin routes require header: `Authorization: Bearer admin-secret-token`

---

## Known issues to fix

1. **GoogleReviews widget** shows placeholder data — needs real Brynäs Bilservice reviews
2. **Customer comment** is collected in the booking form but not saved to the database
3. **Database schema** (`server/database/schema.sql`) is out of sync with the actual running database
4. **Admin auth** is not production-ready — hardcoded credentials and token

---

## Environment variables

`server/.env` (do not commit):
```
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
PORT=3000
```
