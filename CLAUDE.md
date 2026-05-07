# Brynäs Bilservice — Claude Code Instructions

## Project overview
Website for Brynäs Bilservice, a car repair shop in Gävle, Sweden. Full-stack:
- **Client** — React + Vite + TypeScript + Tailwind, in `client/`
- **Server** — Node.js + Express + MySQL, in `server/`

Two developers:
- **Magnus** (frontend) — works on design, layout, components, CSS
- **Sakar's brother** (backend) — owns `server/index.js`, `server/database/schema.sql`, MySQL

## Division of responsibility
**Magnus owns (safe to edit freely):**
- `client/src/` — all components, sections, CSS, assets
- `client/package.json`
- `client/tailwind.config.js`, `client/vite.config.ts`

**Do NOT modify without explicit instruction:**
- `server/index.js` — backend API, owned by the other developer
- `server/database/schema.sql` — database structure
- `server/package.json`
- `server/.env`

## Architecture

### Client (`client/`)
```
src/
  App.tsx               — page layout, section order, IntersectionObserver for .fade-up
  main.tsx              — React root, BrowserRouter, LanguageProvider, routes
  css/index.css         — all CSS (custom properties, component styles, responsive)
  components/
    sections/           — Hero, About, Services, ServiceList, WhyUs, EV, CTABanner, Contact
    layout/             — Header, Footer
    ui/                 — Button, ButtonLink, SectionHeader, Marquee
    icons/              — SVG icon components
    admin/              — BookingManagement, ServiceManagement, ProtectedRoute
    BookingForm.tsx     — booking modal (react-datepicker + react-time-picker)
    GoogleReviews.tsx   — hardcoded review data, needs updating with real Brynäs reviews
    ThemeSwitcher.tsx
  pages/admin/          — Dashboard, Login
  context/              — LanguageContext (sv/en i18n)
  translations/         — en.ts, sv.ts
  data/                 — marquee-items.txt (one item per line, loaded raw by Hero.tsx)
  assets/images/        — all image assets
```

### Server (`server/`)
```
index.js          — Express API (bookings, services, customers, admin CRUD)
database/
  schema.sql      — MySQL schema (NOTE: currently out of sync with actual DB — see known issues)
public/           — built client output served statically (deploy target)
dist/             — server build output
```

### Routes
- `/` — public site (App.tsx)
- `/admin` — admin dashboard (ProtectedRoute → Dashboard)
- `/api/*` — Express API endpoints

## Dev setup
Two terminals required:

```bash
# Terminal 1 — backend
cd server && npm run dev   # nodemon, port 3000

# Terminal 2 — frontend
cd client && npm run dev   # vite, port 5173
```

Open `http://localhost:5173` in browser.
The Vite dev server proxies `/api` to `localhost:3000` automatically via axiosConfig.

## Deploy
```bash
cd client && npm run build
# Copy client/dist/* to server/public/
```
Server serves the built client from `server/public/` as static files.

## Design system
All CSS custom properties are in `client/src/css/index.css` under `:root`.

Key tokens:
- `--color-gold: #F0B800` — primary accent
- `--color-red: #CC1417` — secondary accent
- `--color-black: #080808` — background
- `--font-heading` — Exo 2
- `--font-body` — Barlow

Animations: `.fade-up` class + IntersectionObserver in App.tsx triggers `.visible` on scroll.

## Page section order (App.tsx)
Hero → About → Services → ServiceList → WhyUs → EV → CTABanner → Contact

Nav link order (Header.tsx): Om oss → Tjänster → Bilar till salu → Kontakt

## Known issues / open TODOs
1. **GoogleReviews.tsx** — contains hardcoded placeholder data, not real Brynäs reviews
2. **schema.sql out of sync** — missing columns: `customer_name`, `comment_customer`, `comment_admin`; missing `'erased'` from status ENUM; `service` column is VARCHAR but stores INT ID
3. **comment_customer not saved** — BookingForm sends it, but server's insertBooking() doesn't include it in the INSERT
4. **Admin comment read-only** — admin modal shows comment_admin but provides no way to save it
5. **SSH key in project folder** — `client/fenrirm` and `client/fenrirm.pub` should not be here

## Agent handoff rules
- **Read `AGENTS.md` first** — it has the current state of the project and recent session history
- Read recent logs in `_magnus/` before making design changes
- Check existing component structure before adding new files
- Never rewrite large files unnecessarily — prefer targeted edits
- Preserve unfinished or in-progress work unless clearly broken
- Do not touch server files unless explicitly asked
- **Update `AGENTS.md` at the end of every session** — rewrite the "current state" section and append a new entry to the session log
