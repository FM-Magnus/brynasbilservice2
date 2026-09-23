# Agent startup contract — Brynäs Bilservice

**Read this file first. Do not append session logs here.** Write dated work notes to [`docs/SESSION_LOG_CURRENT.md`](docs/SESSION_LOG_CURRENT.md).
**ARCHITECTURE**: The rebuild is finished (all 7 roadmap steps; `index.css` deleted 2026-09-19). The living references are [`docs/CSS_OWNERSHIP.md`](docs/CSS_OWNERSHIP.md) (route → CSS owner map and write rules), [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) (tokens `--bb-*`, patterns `.bb-*`) and [`docs/AGENT_HANDOFF.md`](docs/AGENT_HANDOFF.md) (session status). The rebuild plan itself is archived at [`docs/archive/HITL_Temporary_roadmap.md`](docs/archive/HITL_Temporary_roadmap.md) — history, not instructions. Always verify with Playwright.

## CSS SAFETY — HIGHEST PRIORITY

1. **There is no global legacy stylesheet any more.** `client/src/css/index.css` was deleted in Step 7 (2026-09-19). Never recreate it, and never reintroduce `--redesign-*`, `--color-*` or legacy class systems (`.services-page__*`, `.container`, `.btn`, …).
2. Global CSS is exactly four Level 0/1 files, loaded in `main.tsx`: `styles/tailwind.css`, `styles/design-tokens.css`, `styles/base.css` and `styles/shared-elements.css`. Do not add another.
3. Every page and shared component styles itself through its own CSS island, imported by its `.tsx`, with a unique class prefix. Check that the prefix isn't already used anywhere under `client/src`.
4. Shared CSS is allowed only for a page family explicitly listed in `docs/CSS_OWNERSHIP.md` (Bilservice family, Guide family) and for `.bb-*` patterns in `shared-elements.css`.
5. Tokens are `--bb-*` only. If a task seems to need a new global token or pattern, propose it to Magnus first.
6. The pre-commit hook runs `npm --prefix client run check:css` — every `var(--bb-*)` must resolve (an unresolved one silently drops the whole declaration), and `--redesign-*` / `index.css` are banned outright. It also blocks Tailwind utilities and inline `style=` in public TSX. Never bypass it without Magnus's explicit approval.

## OPERATIONAL HIERARCHY & ARCHITECTURAL SAFETY

1. **Document Precedence Hierarchy**: (1) `AGENTS.md` (Operational contract & highest authority) → (2) `docs/CSS_OWNERSHIP.md` (CSS islands & family mapping) → (3) `docs/DESIGN_SYSTEM.md` (Tokens `--bb-*` & patterns `.bb-*`) → (4) `docs/AGENT_HANDOFF.md` (session status).
2. **Application Root & Manifest Safety (F-00, HIGH RISK)**: `client/` is the **SOLE** application directory (React 18 / Tailwind CSS 3 / Vite 4; installed 2026-09-20: 18.3.1, 3.4.19, 4.5.14, TypeScript 7.0.2). Root configuration files are renamed to `*.disabled`. **NEVER** generate Tailwind v4 (`@theme`) or React 19 patterns. Run all commands prefixed to `client/` (`npm --prefix client ...`).
3. **Tailwind Utility Policy**: Utilities (`flex`, `p-4`, etc.) are permitted **ONLY** in `/admin` (`client/src/components/admin/`). Strictly prohibited on all public-facing pages and components.
4. **Guide Family Architecture**: Shared parent is `client/src/styles/ServiceGuideTemplate.css` (`.service-guide__*`), **NOT** a shared TSX layout component. Each guide is an independent TSX file. Verify markup structure against proof pages (`AvgassystemPage.tsx`, `BromssystemPage.tsx`) to prevent sibling drift.
5. **TypeScript Baseline**: `"typecheck": "tsc -p tsconfig.app.json --noEmit"` in `client/package.json`. `vite build` does not perform full typechecks; agents must run typecheck and ensure 0 errors.

---

## Current state (last updated: 2026-09-20 by Claude — icons, inline styles and booking lifecycle done; hero steps 1–2 done)

**Start every session with [`docs/AGENT_HANDOFF.md`](docs/AGENT_HANDOFF.md) “Start here” (what is done, what is next, working rules). Measurement scripts for proving changes: [`docs/audit-harness/README.md`](docs/audit-harness/README.md).**

- **Architecture** (full route map and CSS owners in `docs/CSS_OWNERSHIP.md`):
  - *Level 0/1*: `client/src/styles/tailwind.css` (Tailwind directives), `design-tokens.css` (`--bb-*` tokens), `base.css` (element defaults) and `shared-elements.css` (`.bb-*` patterns), loaded globally in `client/src/main.tsx` in that order.
  - *Shared shell & UI* (each with its own stylesheet): `PublicHeader`, `PublicFooter` (`components/layout/`), `GalleryTeaserCard`, `GoogleReviewsCard`, `ContactFormCard`, `BiltjansterFaq` (`components/ui/`), `BookingFormModal` (`components/BookingForm.tsx`).
  1. *7 unique pages, one CSS island each — all complete*: Startsidan (`landing/LandingPage.css`, `.landing-v2__*`), Om oss (`AboutPage.css`, `.omoss-page__*`), Kontakt (`ContactPage.css`, `.kontakt-page__*`), Bärgning (`BargningPage.css`, `.bargning-page__*`), Biltjänster (`BiltjansterPage.css`, `.biltjanster-hub__*`), Bilar till salu (`BilarTillSalu.css`, `.bilartillsalu-page__*`), Galleri (`GalleryPage.css`, `.galleri-page__*`).
  2. *Bilservice family — `ServiceReparationerPage.css` (`.bilservice__*`)*: Bilservice (`/service-reparationer`, owner), Felsökning, Däckservice, AC-service. Complete.
  3. *Guide family — `styles/ServiceGuideTemplate.css` (`.service-guide__*`)*: all 10 guides. Complete.
- **Step 7 done (2026-09-19)**: `index.css` deleted; `/tjanster` redirects to `/biltjanster`; legacy `Header`/`Footer`, `GoogleReviews.tsx`, the unused admin `Login.tsx` and orphaned assets removed. Global CSS went from 287.8 KB to 100.0 KB (44.2 → 17.7 KB gzip). Awaiting Magnus's click-through sign-off (roadmap Step 7, "Your Job").
- **2026-09-20 (committed and pushed to `origin/redesign/blue-teal-v1` at Magnus's instruction):** shared icon set consolidated (29 icons, all stroke 2; rules in `DESIGN_SYSTEM.md` §2b); all 27 inline `style=` removed from public TSX and now banned by `check:css`; booking form lifecycle (`useFormSubmission`, no `alert()`, local `yyyy-MM-dd` date); hero clearance and H1 tokens (`DESIGN_SYSTEM.md` §2c, guard `tests/browser/hero.spec.ts`). Open: hero step 3, audit points 3/5/6 — see the handoff.
- **Anti-drift guardrails**: never invent a new shared template or force a unique page into one; tokens are `--bb-*` only; always mount `PublicHeader`/`PublicFooter`; verify every visual change with Playwright (`--disable-gpu`) at 1440, 768 and 390 with zero horizontal overflow.
- **Data-driven, backend-ready pages** (contracts and backend proposal: `docs/BACKEND.md`):
  - *Bilar till salu*: stock via `getPublicVehicles()` (`api/vehicles.ts`) from the static seed `data/vehicles.ts`; `VITE_VEHICLES_SOURCE=api` switches to the future API.
  - *Galleri*: photos are folder-driven from `client/src/assets/galleri/` (drop in / delete a file; captions in `bildtexter.json`; instructions in `LÄSMIG.md`), read via `getGalleryImages()` (`api/gallery.ts`); `VITE_GALLERY_SOURCE=api` switches to the future API.
- **Build**: `vite-imagetools` (sharp) generates gallery variants at build time and needs Node ≥18.17. Build locally or in CI (Node 20) — never on the production server (Node 16).
- **Typography**: Archivo 800 display headings (mixed case), Manrope body (400–500) and controls (600–700), via tokens.
- **Booking modal** (`BookingForm.tsx`): DatePicker + TimePicker; pages pass `initialComment` for prefilled inquiries; submits through `useFormSubmission` (in-flight lock, inline success/error, no `alert()`). **Admin** at `/admin`: bookings and services; Tailwind is allowed only there.
- **Google reviews** are real Brynäs data, confirmed by Magnus: 4,3 rating, 50 reviews, Google Maps link. Reviews naming "Shomaher"/"Maher" refer to the owner, **Maher**. Rendered by `GoogleReviewsCard` (`hero-overlay` and `card` variants).
- **i18n**: `LanguageProvider` wraps the app, but public copy is hardcoded Swedish.
- **Image intake** (`_incoming-assets/`): local, Git-ignored, flat intake folder for Magnus's raw assets. Read `_incoming-assets/README.md`. Never copy images into `client/src/assets/` speculatively. Gallery photos are the exception: Magnus adds them to `client/src/assets/galleri/` himself. **Data-quality note:** `bilservice__servicebok-och-bilnyckel__landskap__v01.jpeg` actually contains the CV-joint photo and `drivaxel__drivknut-pa-arbetsbank__landskap__v01.jpeg` the wrench/bolt photo — always visually verify a source image before trusting its filename.

### What is broken / incomplete
1. **GitHub Actions deployment is intentionally absent from canonical history** — the legacy misplaced workflow was preserved on `legacy/pre-live-site-2026-09-09`. Do not restore or modify deployment automation without Magnus and Johnny agreeing on the `.htaccess` and server configuration.
2. **`.htaccess` discrepancy** — `server/.htaccess` says port 3000 + has `RewriteBase`; `docs/deployment.md` says port 3001 + forbids `RewriteBase`. One will fail at deploy. Johnny owns the resolution.
3. **Admin auth is client-side only (P0 security)** — `admin`/`admin123` is checked in the browser (`components/admin/ProtectedRoute.tsx`) and ships in the public bundle; the server accepts the fixed token `admin-secret-token` from anyone. Must be fixed before any upload feature ships. Proposal: `docs/BACKEND.md` §2.1.
4. **comment_customer not saved (server side)** — the client sends it correctly (contract and the two-line fix: `BACKEND.md` §2.3), but `server/index.js` `insertBooking()` omits it from the INSERT. Vehicle inquiries ("Gäller förfrågan om …") depend on it.
5. **admin comment read-only** — `comment_admin` is shown in the admin modal but cannot be saved.
6. **schema.sql out of sync with live DB** — see "Database reality" in CLAUDE.md. The live DB is the source of truth.
7. **Orphan root project configs** — `package.json.disabled`, `vite.config.ts.disabled` etc. at repo root are leftovers. The real frontend is `client/`.
8. **Booking modal backend limitation** — local API availability and real booking submission remain unverified.
9. **Google review data is hardcoded** (`defaultGoogleReviews` in `components/ui/GoogleReviewsCard.tsx`) and will drift from the live profile.
10. **Contact form sends nothing** — `ContactFormCard.tsx` shows “Tack” without any request, and no `/api/contact` exists. Needs a Magnus decision; it must not claim success. Also: no 404 route or error boundary, and ESLint is not runnable.
11. **Unconfirmed copy, flagged in code**: Felsökning's "1–2 tim" estimate (`DRAFT GUIDANCE`, `FelsokningPage.tsx`); AC-service frequency (`DRAFT GUIDANCE`) and refrigerant capability (`FACT TO CONFIRM`) in `AcServicePage.tsx`. Däckservice's TPMS FAQ is deliberately generic.

### Cars for sale (Bilar till salu)
- Stock lives in `client/src/data/vehicles.ts`, not in the page. Current car: Peugeot 307 CC 2.0, 2006, mörkgrå, 141 147 km, 39 900 kr, nybesiktigad maj 2026.
- To add a car: import its photos in `data/vehicles.ts` and add an entry. To mark it sold: `status: 'sold'` plus `soldAt`.
- The layout adapts on its own: 1–2 cars get full cards; with 3+, the first car keeps the full card (and the hero panel) and the rest become compact cards in a grid, with "Visa alla N bilar" after 9.

### Gallery photos (Galleri)
- `client/src/assets/galleri/`: every JPG/PNG/WebP there is shown on `/galleri`, ordered by filename (an optional `010-` prefix sets the order). Captions go in `bildtexter.json`; instructions in `LÄSMIG.md`. **No people in gallery photos.**

### Section and nav order
Page scroll: Hero → Contact/form → "Trygg bilservice" reassurance → Services preview → five-step process → About/gallery → used-car CTA → Contact (combined closing section) → Footer
Nav links: Start → Om oss → Biltjänster (Våra tjänster, Bilservice and the current service guides) → Felsökning → Däck → AC → Bärgning → Till / Salu → Kontakt

### Landing hero layout (changed 2026-09-16)
`LandingPage.tsx` owns the start-page hero under the `.landing-v2__*` namespace. It combines the supplied sunset vehicle image with a left-side contrast overlay, floating navigation, headline/actions and the cyclic Google-review field in the lower-right field. Keep this CSS island independent from legacy `.hero__*` selectors; on narrow viewports the content and trust/review fields stack without creating horizontal overflow.

### Research documents (external, not in repo)
Two evidence-based strategy documents live in Magnus's Google Drive under `> RESEARCH OUTPUTS/BBilservice/`:
- `Brynas-Bilservice-webbkravspecifikation (2).md` — a full research-backed requirements spec (IA, trust model, pricing law, GDPR, Core Web Vitals, structured data, 30-day launch plan). Written against an **Astro + Tailwind** target; this project is React + Vite, so its technical chapters do not transfer directly, but its information architecture and trust chapters do.
- `Brynäs Bilservice_ Digital Konkurrensanalys och Strategi för Bil.md` — local competitor analysis for Gävle.

**Treat their business-specific facts about Brynäs with suspicion.** The competitor analysis names the owner as "Sakar Fouad Kareem Al-Barazanchi"; Magnus confirmed the owner is **Maher**. It also assumes opening hours Tis–fre 08:00–16:00 with Mondays closed, which contradicts the Mån–Fre 08:00–17:00 used across the site and confirmed earlier by the owner. Verify against Magnus before acting on any fact from these files.

### Open design thread (paused mid-review)
Magnus asked for a structural review of the site against the research documents, delivered **one suggestion at a time**. Progress so far:
- The current architecture is company-presenting (Start / Om oss / Tjänster / Bilar till salu / Kontakt); the spec's is customer-problem-solving (symptom-based `/problem/*` entry points). That gap is the headline finding and is **not yet addressed**.
- Two structural observations recorded but not acted on: the identical 3-step "Så fungerar det" block is repeated on four pages without ever deepening into its own page, and opening hours are hardcoded in several places (`PublicFooter.tsx`, `ContactPage.tsx`, `AboutPage.tsx`, `BargningPage.tsx`, `BilarTillSalu.tsx`) instead of one source.
- Förslag 1 (replace the hero review panel with cold-start proof) was **withdrawn** after Magnus confirmed the review data is genuine. Förslag 2 has not been presented yet.

### Copywriting sourcing rule (established this session)
Magnus wants the site's content deepened by drawing on two outside sources — a competitor reference pack (`/Users/magnusolsson/Documents/varverkstad-2026-09-09/`, a scrape of varverkstad.com) and a commissioned copywriting file (`> RESEARCH OUTPUTS/BBilservice/Copywriting för Brynäs Bilservice.txt` in his Drive). **Do not paste sentences from either source verbatim, including the commissioned file.** Borrow themes, structure and facts, then write original Swedish wording. This matters most for the varverkstad pack — reusing an actual competitor's marketing copy is a copyright and duplicate-content risk, and `varverkstad-2026-09-09/08-target-translation.md` already documents this as a hard rule from an earlier session ("Do not copy their copy, Swedish text strings"). Magnus confirmed this approach ("Skriv om varje text litegrann") after it was raised.

### Session history reference
Full dated work logs and historical session notes are preserved in [`docs/SESSION_LOG_CURRENT.md`](docs/SESSION_LOG_CURRENT.md) and [`docs/archive/SESSION_LOG_ARCHIVE.md`](docs/archive/SESSION_LOG_ARCHIVE.md).

### Files agents should NOT touch
- `server/index.js` — owned by Johnny (Magnus's brother), backend developer
- `server/database/schema.sql` — owned by Johnny (and stale; live DB is the truth)
- `server/.htaccess` — owned by Johnny (also has known port/RewriteBase mismatch)
- `server/.env` — credentials, never edit or read aloud
- Root `package.json` / `vite.config.ts` / `tsconfig.json` / `index.html` — orphan scaffolding, do not act on them. Real frontend is in `client/`.

---

## Production environment (read this before any deploy or server work)

| Item | Value |
|---|---|
| Live URL | https://labb.fenrirmedia.se/brynasbilservice/ |
| Host | `194.14.207.224` (VPS) — Cloudflare → nginx → Apache → Express |
| OS | CentOS 7, glibc 2.17 |
| Node.js (production) | **16** — cannot upgrade (glibc constraint) |
| Node.js (build) | 20 on GitHub Actions Ubuntu runner |
| Express port (production) | **3001** (port 3000 is taken) |
| Express port (local dev) | 3000 |
| Process manager | PM2 via fnm |
| Database | MySQL `fenrirm_brynasbilservice` on the VPS |
| Local DB access | SSH tunnel: `ssh -i ~/.ssh/fenrirm -L 3306:localhost:3306 -N -f fenrirm@194.14.207.224` |
| `.env` location | Server only, preserved across deploys via backup/restore step |

Auto-deploy is **intentionally absent from canonical history** — see "What is broken" #1.

---

## API contract (server/index.js)

All routes return JSON. No request validation, no error middleware, raw mysql2 callbacks.

| Method | Route | Auth | Notes |
|---|---|---|---|
| GET | `/api/services` | public | — |
| GET | `/api/available-dates` | public | queries `bookings WHERE available=1` |
| POST | `/api/bookings` | public | body: `customerName, customerEmail, customerPhone, serviceId` (number)`, date` (`yyyy-MM-dd`, local day, not a UTC timestamp)`, time` (`HH:mm`)`, comment_customer?` (omitted when empty) |
| GET | `/api/admin/bookings` | admin | — |
| PUT | `/api/admin/bookings/:id` | admin | body: `{ status }` (enum below) |
| DELETE | `/api/admin/bookings/:id` | admin | soft-delete via `status='erased'` |
| GET / POST | `/api/admin/services` | admin | list / create |
| PUT / DELETE | `/api/admin/services/:id` | admin | update / delete |
| GET | `/api/admin/customers` | admin | — |

- Admin auth header: `Authorization: Bearer admin-secret-token` (hardcoded — not production-safe)
- Customers are deduplicated by **email** in `POST /api/bookings`
- Booking status enum: `pending`, `confirmed`, `completed`, `cancelled`, `erased`
- Frontend uses `axios` via `client/src/api/axiosConfig.ts` — baseURL switches between `localhost:3000` (dev) and `/brynasbilservice` (prod)

---

## Legacy session log — moved

The frozen 2026-09-15/16 entries that lived here were moved verbatim to [`docs/archive/SESSION_LOG_ARCHIVE.md`](docs/archive/SESSION_LOG_ARCHIVE.md) on 2026-09-20. They mostly describe the deleted `index.css`; treat them as history.

## Documentation updates

- Replace stale Current state text concisely; do not append parallel versions.
- Add new dated work notes to `docs/SESSION_LOG_CURRENT.md`, newest first.
- `AGENTS.md` may not grow. `.githooks/pre-commit` enforces this, and also runs the canonical CSS check (`npm --prefix client run check:css`) and blocks Tailwind utilities in public TSX.
- Never bypass the hook without Magnus's explicit approval.
