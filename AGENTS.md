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

## Current state (last updated: 2026-09-19 by Claude — Step 6 complete, Step 7 next)

- **Architecture** (full route map and CSS owners in `docs/CSS_OWNERSHIP.md`):
  - *Level 0/1*: `client/src/styles/tailwind.css` (Tailwind directives), `design-tokens.css` (`--bb-*` tokens), `base.css` (element defaults) and `shared-elements.css` (`.bb-*` patterns), loaded globally in `client/src/main.tsx` in that order.
  - *Shared shell & UI* (each with its own stylesheet): `PublicHeader`, `PublicFooter` (`components/layout/`), `GalleryTeaserCard`, `GoogleReviewsCard`, `ContactFormCard`, `BiltjansterFaq` (`components/ui/`), `BookingFormModal` (`components/BookingForm.tsx`).
  1. *7 unique pages, one CSS island each — all complete*: Startsidan (`landing/LandingPage.css`, `.landing-v2__*`), Om oss (`AboutPage.css`, `.omoss-page__*`), Kontakt (`ContactPage.css`, `.kontakt-page__*`), Bärgning (`BargningPage.css`, `.bargning-page__*`), Biltjänster (`BiltjansterPage.css`, `.biltjanster-hub__*`), Bilar till salu (`BilarTillSalu.css`, `.bilartillsalu-page__*`), Galleri (`GalleryPage.css`, `.galleri-page__*`).
  2. *Bilservice family — `ServiceReparationerPage.css` (`.bilservice__*`)*: Bilservice (`/service-reparationer`, owner), Felsökning, Däckservice, AC-service. Complete.
  3. *Guide family — `styles/ServiceGuideTemplate.css` (`.service-guide__*`)*: all 10 guides. Complete.
- **Step 7 done (2026-09-19)**: `index.css` deleted; `/tjanster` redirects to `/biltjanster`; legacy `Header`/`Footer`, `GoogleReviews.tsx`, the unused admin `Login.tsx` and orphaned assets removed. Global CSS went from 287.8 KB to 100.0 KB (44.2 → 17.7 KB gzip). Awaiting Magnus's click-through sign-off (roadmap Step 7, "Your Job").
- **Anti-drift guardrails**: never invent a new shared template or force a unique page into one; tokens are `--bb-*` only; always mount `PublicHeader`/`PublicFooter`; verify every visual change with Playwright (`--disable-gpu`) at 1440, 768 and 390 with zero horizontal overflow.
- **Data-driven, backend-ready pages** (contracts and backend proposal: `docs/BACKEND_HANDOFF.md`):
  - *Bilar till salu*: stock via `getPublicVehicles()` (`api/vehicles.ts`) from the static seed `data/vehicles.ts`; `VITE_VEHICLES_SOURCE=api` switches to the future API.
  - *Galleri*: photos are folder-driven from `client/src/assets/galleri/` (drop in / delete a file; captions in `bildtexter.json`; instructions in `LÄSMIG.md`), read via `getGalleryImages()` (`api/gallery.ts`); `VITE_GALLERY_SOURCE=api` switches to the future API.
- **Build**: `vite-imagetools` (sharp) generates gallery variants at build time and needs Node ≥18.17. Build locally or in CI (Node 20) — never on the production server (Node 16).
- **Typography**: Archivo 800 display headings (mixed case), Manrope body (400–500) and controls (600–700), via tokens.
- **Booking modal** (`BookingForm.tsx`): DatePicker + TimePicker; pages pass `initialComment` for prefilled inquiries. **Admin** at `/admin`: bookings and services; Tailwind is allowed only there.
- **Google reviews** are real Brynäs data, confirmed by Magnus: 4,3 rating, 50 reviews, Google Maps link. Reviews naming "Shomaher"/"Maher" refer to the owner, **Maher**. Rendered by `GoogleReviewsCard` (`hero-overlay` and `card` variants).
- **i18n**: `LanguageProvider` wraps the app, but public copy is hardcoded Swedish.
- **Image intake** (`_incoming-assets/`): local, Git-ignored, flat intake folder for Magnus's raw assets. Read `_incoming-assets/README.md`. Never copy images into `client/src/assets/` speculatively. Gallery photos are the exception: Magnus adds them to `client/src/assets/galleri/` himself. **Data-quality note:** `bilservice__servicebok-och-bilnyckel__landskap__v01.jpeg` actually contains the CV-joint photo and `drivaxel__drivknut-pa-arbetsbank__landskap__v01.jpeg` the wrench/bolt photo — always visually verify a source image before trusting its filename.

### What is broken / incomplete
1. **GitHub Actions deployment is intentionally absent from canonical history** — the legacy misplaced workflow was preserved on `legacy/pre-live-site-2026-09-09`. Do not restore or modify deployment automation without Magnus and Johnny agreeing on the `.htaccess` and server configuration.
2. **`.htaccess` discrepancy** — `server/.htaccess` says port 3000 + has `RewriteBase`; `docs/deployment.md` says port 3001 + forbids `RewriteBase`. One will fail at deploy. Johnny owns the resolution.
3. **Admin auth is client-side only (P0 security)** — `admin`/`admin123` is checked in the browser (`components/admin/ProtectedRoute.tsx`) and ships in the public bundle; the server accepts the fixed token `admin-secret-token` from anyone. Must be fixed before any upload feature ships. Proposal: `docs/BACKEND_HANDOFF.md` §2.1.
4. **comment_customer not saved** — `BookingForm` sends it, but `server/index.js` `insertBooking()` omits it from the INSERT. Vehicle inquiries ("Gäller förfrågan om …") depend on it.
5. **admin comment read-only** — `comment_admin` is shown in the admin modal but cannot be saved.
6. **schema.sql out of sync with live DB** — see "Database reality" in CLAUDE.md. The live DB is the source of truth.
7. **Orphan root project configs** — `package.json.disabled`, `vite.config.ts.disabled` etc. at repo root are leftovers. The real frontend is `client/`.
8. **Booking modal backend limitation** — local API availability and real booking submission remain unverified.
9. **Google review data is hardcoded** (`defaultGoogleReviews` in `components/ui/GoogleReviewsCard.tsx`) and will drift from the live profile.
10. **Unconfirmed copy, flagged in code**: Felsökning's "1–2 tim" estimate (`DRAFT GUIDANCE`, `FelsokningPage.tsx`); AC-service frequency (`DRAFT GUIDANCE`) and refrigerant capability (`FACT TO CONFIRM`) in `AcServicePage.tsx`. Däckservice's TPMS FAQ is deliberately generic.

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
Full dated work logs and historical session notes are preserved in [`docs/SESSION_LOG_CURRENT.md`](docs/SESSION_LOG_CURRENT.md) and [`docs/SESSION_LOG_ARCHIVE.md`](docs/SESSION_LOG_ARCHIVE.md).

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
| POST | `/api/bookings` | public | body: `customerName, customerEmail, customerPhone, serviceId, date, time, comment_customer?` |
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

## Legacy recent session log — frozen

Do not append here. New entries belong in [`docs/SESSION_LOG_CURRENT.md`](docs/SESSION_LOG_CURRENT.md); older history remains in [`docs/SESSION_LOG_ARCHIVE.md`](docs/SESSION_LOG_ARCHIVE.md).

### 2026-09-16 — Claude (Bilservice rebuilt from scratch — third page identity)
- Magnus supplied a final mockup + a very detailed implementation brief for `/service-reparationer` (Bilservice): "clean automotive advertising / ownership confidence" — a third visual identity, explicitly distinct from both `index.css`'s `.services-page__*` system and the teal-technical `ServiceGuideTemplate.css` used by Koppling/Avgassystem/Oljebyte/Bromssystem. Priority was visual fidelity to the mockup's macro geometry (section heights, column ratios, colour proportions, card hierarchy) over creative reinterpretation.
- Rewrote `ServiceReparationerPage.css` entirely (previously a 41-line file of small `.bilservice-guide__*` tweaks layered on `.services-page__*`) into a self-contained ~330-line stylesheet, class prefix `.bilservice__`, scoped custom properties for the page's own warm off-white / petrol / teal / amber palette (only inheriting the global `--redesign-*` tokens and fonts, per the brief's "brand implementation authority" rule).
- Rebuilt `ServiceReparationerPage.tsx` section by section per the brief's chapter list: full-bleed dark hero (44/56 text/image split, gradient-masked for contrast, 3 trust points), light 50/50 price-transparency section, 4-card value grid (each with its own image slot), a 3-tier service-level ladder using colour *darkness* to communicate scope (pale aqua → teal → deep petrol, replacing the old middle-card-raised-via-transform treatment), a pale-aqua "Mer än bara service" bridge card, a dark 5-step process anchor (icon + number + title + desc, left text column), a compact dark used-vehicle promo strip, and a light trust/reassurance card. All existing approved Swedish copy carried over verbatim — no new claims invented from the mockup's harder-to-read text (e.g. keept the approved "Prestation" wording rather than switching to the mockup's "Prestanda").
- Added a small reusable `ImageSlot` helper rendering a clearly-labelled, aspect-ratio-correct placeholder (`data-image-slot="bilservice-hero-car"` etc.) for all 6 image positions (hero, service-book/key, and the 4 value cards) — no photography exists yet for this rebuild, unlike Koppling's photo-delivery flow.
- No new icons needed — reused existing `ShieldIcon`/`ClockIcon`/`BoltIcon`/`DollarIcon` (value cards, unchanged from before), plus `WrenchIcon`/`GaugeIcon`/`ThumbsUpIcon`/`InfoIcon`/`PhoneIcon`/`CheckIcon`/`ShieldHeartIcon`/`ArrowRightIcon` for the trust row and process icons.
- Verified against the mockup section-by-section via in-browser screenshots at 1440px (macro geometry, colour proportions and card hierarchy all matched closely), then confirmed 0px horizontal overflow and clean responsive recomposition (hero image moves above text, value grid to 2-then-1 columns, process steps to a vertical list) at 768px and 375px. `npx tsc --noEmit` clean. Committed, not pushed.
- Remaining fidelity gaps to revisit once real photography is supplied: the hero's gradient-masked bleed effect is tuned against a placeholder pattern, not a real photo, so the mask fade position may need a small tweak once the actual car photo is dropped in.
- **Post-launch bug (found by Magnus testing in real Safari, fixed same session):** the hero's top padding used a `vw`-scaled `clamp()` that capped out at 88–128px — well below the fixed floating header's real footprint (measured via `getBoundingClientRect()`: header bottom edge sits at ~77px mobile / ~89px tablet / ~122px desktop). Result: only 14px of clearance at a realistic 1728px Safari window, and literal 1px overlap at 768px tablet. **Lesson: when a hero has to clear a `position: fixed` header, don't size the clearance with a proportional `vw` clamp — measure the header's actual rendered bottom edge with the browser tools and pad past it with a fixed safety margin.** A `vw`-based value is the wrong tool because a fixed header's pixel height doesn't scale with viewport width the way the formula assumes. Fixed by replacing both the desktop and stacked (≤1024px) hero padding-top with values verified against real coordinates (75–144px clearance across 375/768/1440/1728px, confirmed with `getBoundingClientRect()`, not just eyeballed screenshots).
- **Also found a double-padding bug on the same page** (found by Magnus comparing screenshots against the reference mockup): the "Letar du efter en begagnad bil?" and "Alltid tydliga besked" sections each had padding applied twice — once from `.bilservice__section--tight` on the outer `<section>`, again from a leftover inline `paddingBlock` on the inner container div — stacking to 96–168px of dead white space between two blocks that should read as adjacent chapters. Confirmed with `getComputedStyle()` before touching anything, then removed the redundant class so each section keeps a single intentional padding source.
- **Same two audits applied to `ServiceGuideTemplate.css`** (shared by Koppling/Avgassystem/Oljebyte/Bromssystem), per Magnus's request to bring the tighter rhythm to all the template-based pages: the hero there had the *identical* clearance bug, actually worse (7px at 1728px, from a `clamp(5.5rem,9vw,7.5rem)` capping at 120px against the header's 122px bottom edge) — fixed with the same verified formula. Also reduced `.service-guide__section` (80px→60px cap), `--section--tight` (40px→28px cap) and `.service-guide__topic-block` (80px→60px cap) so consecutive same-background sections sit closer together (Koppling's section-to-section combined padding: 120px→88px). No double-padding bug found on these four pages (no inline `style={{...}}` overrides exist there, unlike Bilservice) — this was a single shared-file fix, verified individually on all four pages with `getBoundingClientRect()` at 1728/768/375px.

### 2026-09-16 — Claude (Bromssystem rebuilt on ServiceGuideTemplate — 4th proof)
- Magnus supplied 3 new mockups for Bromssystem showing a dual teal+amber accent scheme, a 3-column "Det här kan vi hjälpa dig med" section and several real-looking photos; checked `_incoming-assets/incoming/` first (empty) — no new photos exist yet, so all 3 media slots use the standard `MediaPlaceholder`, same as Avgassystem's initial state.
- Rebuilt `BromssystemPage.tsx` on `ServiceGuideTemplate.css`, migrating all existing Swedish copy unchanged (parts, importance, symptoms, service items, guidance, process, FAQ). No new content invented beyond short generic microcopy (trust badges, captions), consistent with prior rebuilds.
- Resolved the open design-system question from the mockups (single reusable template vs. a second design) in favor of the former: added exactly one new modifier, `.service-guide__symptom-row--urgent` (amber gradient, mirrors the existing teal `--featured` modifier), applied to the single most urgent symptom ("Pedalen sjunker" — brake-fluid leak warning). This reproduces the mockup's dual-accent look without forking the template.
- Also widened `.service-guide__importance-grid` from a fixed `repeat(4, ...)` to `repeat(auto-fit, minmax(190px, 1fr))` since Bromssystem's `importance` array has 5 items (vs. 4 on Koppling/Avgassystem) — confirmed it still renders a clean 4-col row on desktop with the 5th wrapping to its own row, not an orphaned single card.
- Deleted `BromssystemPage.css` and all `.brake-page__*` rules from `index.css` outright (91 lines, one contiguous block). `index.css`: 7622 → 7531 lines.
- Verified build + desktop (1440px)/tablet (768px)/mobile (375px) in-browser, 0px horizontal overflow at every width, amber urgent row and 5-item importance grid both confirmed visually. Committed, not pushed.

### 2026-09-16 — Claude (Oljebyte rebuilt on ServiceGuideTemplate — 3rd page, hardest yet)
- Duplicated `KopplingPage.tsx` as the literal starting scaffold, then replaced content section by section. Used Koppling/Avgassystem for form/rhythm only, not content shape — Oljebyte has 8 content arrays (vs. 5-6 on the other two) plus multiple paragraphs of freeform technical prose with no equivalent in either reference page.
- Reused sections as-is: hero, intro (paired with the existing funnel photo), 4-card importance panel (`benefits`), service-scope checklist (`includedItems`, same shape as Koppling's `serviceItems`).
- Added a new reusable pattern to `ServiceGuideTemplate.css`: `.service-guide__topic-block` (heading + 2/3/4-column card grid + optional closing prose, alternating surface tone) and `.service-guide__prose-card` (short highlight block for flowing text with no list items). Used the topic-block 5 times: oil ageing, viscosity numbers, API/ACEA standards, oil base groups, misconceptions.
- Intentionally skipped: the "featured symptom" pattern and safety-strip — no symptom list or safety notice exists in Oljebyte's original content, so neither was invented.
- Reused the two real photos this page already had (hero, funnel) — no placeholders needed.
- Deleted `OljebytePage.css` and all `.oil-page__*` rules from `index.css` (~270 contiguous lines plus a few stray media-query lines mixed into shared breakpoints, removed without touching the shared `.biltjanster-faq` rules in the same block).
- Verified: all 8 content arrays present, build clean, desktop/tablet/mobile no overflow, FAQ accordion confirmed via accessibility tree. Committed, not pushed.

### 2026-09-16 — Claude (Koppling: real photos wired in)
- Magnus supplied 3 photos via `_incoming-assets/incoming/` (hero, clutch components on a bench, portrait mechanic-under-vehicle). All three matched their filenames. Exported to `client/src/assets/images/services/clutch/`, replacing Koppling's placeholder slots; removed the now-unused `MediaPlaceholder` helper. Originals moved from `incoming/` into `04_tjanster/05_koppling/` (git-ignored, no repo change). Verified build + desktop/mobile.

### 2026-09-16 — Claude (Avgassystem rebuilt on ServiceGuideTemplate — 2nd proof)
- Rebuilt `AvgassystemPage.tsx` on the same `ServiceGuideTemplate.css` built for Koppling, migrating all existing Swedish copy (parts, importance, symptoms, service items, guidance, process, FAQ, closing). Only short generic microcopy was added (trust badges, felsökning cross-link, photo captions), same spirit as Koppling's additions.
- Confirmed the template is genuinely reusable, not Koppling-specific: Avgassystem's 4-item component/importance grids (vs. Koppling's 2) wrapped cleanly into the template's existing 2-column grids with zero CSS changes.
- Judgment calls made migrating content into a different shape: featured the most commonly-noticed symptom (loud exhaust noise) instead of Koppling's slipping-clutch symptom; folded a leftover "motorlampa" tip (no equivalent slot in Koppling) into the Mer info grid as a 5th card rather than dropping it; added a small reusable `.service-guide__info-flag` "OBS" badge to the template for the catalytic-converter-theft warning card.
- Deleted `AvgassystemPage.css` and its superseded `.exhaust-page__*` rules in `index.css` outright. `index.css`: 8123 → 7913 lines across both rebuilds this session.
- Verified build + desktop/tablet/mobile, no overflow, FAQ intact. Not pushed.

### 2026-09-16 — Claude (Koppling rebuilt as a reusable service-guide template)
- Magnus is redesigning Koppling from scratch (four approved mockups, GPT-drafted implementation brief) and wants the result to be a template for redesigning the other bland guide pages, not a one-off.
- New shared file `client/src/styles/ServiceGuideTemplate.css` (class prefix `.service-guide__*`), imported by `KopplingPage.tsx`. Depends only on global tokens in `index.css`, not on any page-specific class. Future page redesigns using this look should import this same file rather than copy its rules.
- Rebuilt `KopplingPage.tsx` entirely from the mockups: dark hero (eyebrow, 3-line heading, trust badges, photo + floating badge), intro with 2 numbered components + a felsökning cross-link callout, dark 4-card "why it matters" panel, 5-row symptom list (first row featured) + photo, dark service-scope checklist card, "Mer info" (2 cards + safety strip), dark 5-step process panel, existing shared FAQ component, closing CTA. All existing Swedish copy preserved; only short new hero/tip/caption microcopy the mockups specifically call for was added.
- 3 photo slots (hero, component explainer, symptoms) are placeholders — Magnus is producing the actual photography separately and will supply it next.
- Added 9 new small stroke icons (`LightbulbIcon`, `AlertTriangleIcon`, `ThumbsUpIcon`, `HourglassIcon`, `InfoIcon`, `GaugeIcon`, `SlidersIcon`, `WavesIcon`, `Volume2Icon`) matching the existing icon set's style — the old generic-wrench-only icon set didn't cover what the mockups needed.
- Deleted the old `KopplingPage.css` and its superseded `.clutch-page__*` rules from `index.css` outright (not migrated — nothing in the old design carries over). `index.css`: 8123 → 8033 lines.
- Verified build + desktop/tablet/mobile in-browser. One committed so far; not pushed.

### 2026-09-16 — Claude (handoff doc refresh for Antigravity)
- Updated `docs/PROJECT_STATUS.md` (per-page image/next-task cells for all 11 Biltjänster rows, top git-status line) and `docs/ANTIGRAVITY_HANDOFF.md` (stale commit count, consumed image inventory, obsolete "build the next page" task brief) to match the finished Biltjänster layout pass. Net shorter than before. No code changed.

### 2026-09-16 — Claude (Biltjänster layout & imagery pass, parts 1–3 — complete)
- Layout pass across 11 Biltjänster pages for visual variety; real photos added to Bilservice, Oljebyte and Drivaxel (Koppling, Avgassystem, Oljebyte and Bromssystem were later superseded by full rebuilds on `ServiceGuideTemplate.css`). Every page verified in-browser with zero horizontal overflow; all commits local on `redesign/blue-teal-v1`.

### 2026-09-16 — Claude (Däckservice service-card photos)
- Found 6 well-named, unused images loose in `_incoming-assets/` root (`dack_hjulskifte.png`, `dack_forvaring.jpg`, `dack_omlaggning.png`, `dack_hjulinstallning.png`, `dack_balans.png`, `dack_reparation.png`) — each a real photo matching one of the 6 tire-service cards on `/dackservice`, which were all sharing one generic desaturated placeholder with a "Bild kommer" badge.
- Copied (not moved — originals still in `_incoming-assets/`) and processed with ImageMagick/cwebp: resized to 900px width and compressed to JPG+WebP pairs (37–105 KB each) in `client/src/assets/images/services/tires/`, following the site's `<picture>`/WebP-with-JPG-fallback convention.
- Updated `DackservicePage.tsx` to import and wire each image to its matching card, removed the "Bild kommer" placeholder badge, and removed the placeholder-only desaturation/opacity filter from `.tyres-page__service-image img` in `index.css` (edit reduced index.css's line count, so the anti-bloat pre-commit growth guard was unaffected).
- Found and fixed an unrelated pre-existing bug while verifying in-browser: `ClockIcon` was referenced in `DackservicePage.tsx` but never imported, crashing the page in dev. Added the missing import.
- Verified in-browser (desktop + mobile viewport, via the built-in browser preview): correct WebP/JPG negotiation, no console errors, no horizontal overflow. `npm --prefix client run build` passes clean.
- Committed on `redesign/blue-teal-v1`. Not pushed — awaiting Magnus's approval per the no-push rule.
- **Follow-up (same session, autonomous run):** Magnus asked to continue sourcing images from `_incoming-assets/` for other pages, copy-only, aesthetically judged, committing periodically. Gave Oljebyte, Drivaxel och drivknutar and the Bilservice guide each a real hero photo in place of their placeholder box (see Current state for details and the filename/content mismatch found along the way). Verified all three in-browser (desktop + mobile), `npm --prefix client run build` clean. Committed separately from the Däckservice commit.
- **Bärgning card photo (`/bargning` and `/tjanster#bargning-transport`)** — Both pages shared the same generic-looking stock photo (`tow-truck-night.jpg`, a dramatic night shot of an unbranded truck) for the Bärgning card. Replaced with `tow-truck-at-workshop.{webp,jpg}`, an authentic photo of Brynäs's own Iveco flatbed truck loaded with tires, parked at their real workshop building — sourced from `_incoming-assets/bargning__iveco-vid-verkstad__landskap__v01.jpg`. The old stock file was fully unreferenced afterward and was deleted.
- **Biltjänster hub card photos (`/biltjanster`)** — 5 of the 11 guide cards (Bilservice, Oljebyte, Kamrem, Bilbatteri, Drivaxel och drivknutar) now show a real 640px thumbnail reusing the photo already established on that guide's own page, using the exact same `.services-category-card__media`/`__img` pattern the Bärgning card already used (badge icon + number overlay stay). The other 6 cards (Koppling, Bromssystem, Stötdämpare & fjädrar, Hjullagerbyte, Avgassystem, Styrning & kulleder) keep their existing dashed-border "Bild kommer" placeholder — no matching photos exist in `_incoming-assets/` for those topics (their `04_tjanster/` subfolders are empty). The mix reads fine since the placeholder is a deliberate branded state, not a broken one. New `-thumb`/`-thumb-card` 640px exports added alongside each guide's existing full-size image (suffixed `-thumb-card` for kamrem/bilbatteri to avoid colliding with an existing unrelated `-thumb` file).

### 2026-09-16 — Antigravity (Bärgning & Om oss hero background image setups)
- **Om oss** (`/om-oss`): Added handshake/workshop hero background image (`client/src/assets/images/about/about-hero-bg.{webp,jpg}`) with dark teal gradient overlay.
- Added colocated scoped CSS in `client/src/pages/AboutPage.css` imported in `AboutPage.tsx` without adding lines to `index.css`.
- **Bärgning** (`/bargning`): Added high-quality towing hero background image (`client/src/assets/images/services/towing/towing-hero-bg.{webp,jpg}`) with dark teal gradient overlay.
- Added colocated scoped CSS in `client/src/pages/BargningPage.css` imported in `BargningPage.tsx` without modifying or duplicating shared `services-page__*` classes in `index.css`.
- Verified clean build (`npm --prefix client run build`), `git diff --check`, and responsive layout.

### 2026-09-15 — Claude (visual redesign pass: Bilbatteri, Felsökning, AC, Däckservice + site-wide hero rule)
- **Bilbatteri** (`/bilbatteri`): replaced the icon placeholder with 3 real photos Magnus supplied (2 pasted via chat, 1 already in `_incoming-assets/incoming/`), exported to `client/src/assets/images/services/battery/`, originals sorted into `_incoming-assets/04_tjanster/07_bilbatteri_och_el/`. Restructured benefits (icon-row list), symptoms (numbered list), guidance (stat-strip). No copy changed.
- **Felsökning** (`/felsokning`): full rebuild from the old thin `ac-page`-template shell to the `services-page` template, using a competitor benchmark report Magnus provided (GMA Bilverkstad, VIA Bilservice, Sala Bilteknik, Vianor, Mekare, Autobutler) as the basis. Added pricing/time-estimate content, an FAQ, 3 new photos, an interactive symptom picker, and a "code readout" hero detail. Iterated several times on the symptom-picker cards per Magnus's feedback: made the recommendation always-visible instead of click-gated, right-aligned it, added a "what/how long" detail line, tried red/green semantic coloring then reverted to the site's conventional dark-card white/teal coloring on request. Removed dead CSS left over from the old shell.
- **AC-service** (`/ac-service`) and **Däckservice** (`/dackservice`): reworked against two more benchmark reports Magnus provided (Swedish AC-service and tire-service competitor analysis). Added the sections each report identified as missing — value-proposition cards, a pedagogical-tips section, a social-proof + contact section reusing the existing `GoogleReviews` component, process steps, and expanded FAQs — while leaving each page's existing pricing, images and core content untouched. Iterated on section order and sizing per Magnus's follow-up feedback (moved/shrank Däckservice's legal-dates card twice; changed AC's process-section color from near-black to teal).
- **Bilservice** (`ServiceReparationerPage.tsx`) and **Oljebyte** (`OljebytePage.tsx`): follow-up visual passes applying the teal/dark "accent card" motif established during this session (see Current state) to existing card grids, plus one section reorder on Oljebyte. No copy changes.
- **Established a site-wide hero rule**: every page hero heading is now uppercase with a teal-accented portion, and every hero container shares the landing page's `min-height: clamp(640px, calc(100svh - 60px), 760px)`. Applied to all `services-page__hero`-based guide pages, `ac-page__hero`, `tyres-page__hero`, `cars-page__hero` (Bilar till salu), `about-page__hero` (Om oss) and `contact-page__hero` (Kontakt). Verified in-browser across every hero layout variant (full-bleed photo, image-in-frame, placeholder box, dark grid) for overflow/clipping.
- Verified after every change: `tsc --noEmit`, `npm run build`, and an in-browser walkthrough (console errors, network requests for new images, booking-modal open/close, FAQ accordions, symptom-picker interactivity, header nav) across all touched pages plus the homepage. The only console error observed anywhere is the expected `ERR_CONNECTION_REFUSED` from the booking form's services fetch, because the Express backend isn't running in this session's browser checks — not something these changes caused.
- Added `.claude/launch.json` (Vite dev-server launch config for this session's browser-preview tool) — not app code, safe to keep or remove.
- Committed as `afda8cee` on `redesign/blue-teal-v1` ("feat(pages): rework Bilbatteri, Felsokning, AC, Dackservice pages + site-wide hero rule"), plus a follow-up docs fix as `1dd9fb0a`. Both were **pushed to `origin/redesign/blue-teal-v1`** on Magnus's explicit request — `origin` is Magnus's own fork (`FM-Magnus/brynasbilservice2`), not `main`, and `johnny-archive` was not touched. Local and `origin/redesign/blue-teal-v1` are in sync as of this writing; always re-verify with `git status --short --branch` before assuming that still holds.

### 2026-09-15 — Codex (complete image audit and gallery-quality correction)
- Audited the source bank, production tree, legacy exports, public files, documentation captures and Magnus reference images. The new `_incoming-assets/ASSET_INVENTORY.md` records their ownership and explicitly distinguishes source, production, legacy and evidence-only image families.
- Re-exported all eleven visually reviewed no-people workshop originals from `03_verkstad_och_team/verkstadsoversikter/` as named 1920px WebP/JPG production pairs in `client/src/assets/images/gallery/workshop/`, each with a matching 640px `-thumb` WebP/JPG pair. The full viewer now uses only the former; the carousel and homepage teaser use only the latter.
- Moved the old mixed gallery exports to `client/src/assets/images/archive/gallery-legacy/`, grouped old brand variants under `archive/brand/`, and moved the unused public icon sprite to `client/public/archive/legacy-icons.svg`. No production import may reference an archive or `_incoming-assets/` source path.
- Updated `GalleryPage.tsx`, `AboutPage.tsx`, `GalleryTeaserCard.tsx`, `_incoming-assets/README.md`, `_incoming-assets/ASSET_INVENTORY.md`, `docs/CODEX_HANDOVER.md` and `docs/PROJECT_STATUS.md` to reflect the exact asset mapping. Build, reference, loading, interaction and responsive checks remain required before commit. No commit or push has been made.

### 2026-09-15 — Codex (image-library cleanup)
- Inventoried every image in `_incoming-assets/` and `client/src/assets/images/`, including dimensions, format, file size, visible content and code references. All opaque filenames from `incoming/` were renamed and sorted by actual subject; `incoming/` is now empty.
- Preserved raw home-hero and Peugeot originals in `_incoming-assets/`, created optimized production WebP/JPG pairs for the home hero, gallery and Peugeot listing, and created missing local source-bank thumbnails plus Peugeot image-picker thumbnail pairs.
- Replaced flat production asset naming with categorised `brand/`, `home/`, `gallery/`, `people/`, `services/` and `vehicles/` folders. The 14 older tracked but unimported exports are in `client/src/assets/images/archive/`, not treated as approved runtime imagery.
- Updated every live React/CSS image import for the new paths; Gallery, About and the vehicle listing now use WebP with JPG fallback where appropriate. Added `_incoming-assets/ASSET_INVENTORY.md` and updated image-pipeline documentation.
- No backend, root configuration, routing, page-copy, dependency or push change was made.

### 2026-09-15 — Codex (Kamrem visual differentiation)
- Reworked `/kamrem` so it is no longer another near-identical service-guide shell: added a distinct dark precision-grid hero, authentic local timing-belt image, sculpted media composition, compact visual label and a numbered timing-system card treatment. The page’s route, booking/call actions, technical draft copy, prices and backend boundary remain unchanged.
- Exported the existing Kamrem source photo to `client/src/assets/images/services/timing-belt/timing-belt-in-hand.webp` with JPG fallback and a 640px WebP thumbnail; raw source remains in `_incoming-assets/04_tjanster/04_kamrem/`.
- Verified image loading and zero horizontal overflow at 1440px, 768px and 390px. No push was made.

### 2026-09-15 — Antigravity (Om oss copy & Maher portrait)
- Updated `AboutPage.tsx` (`/om-oss`):
  - Added Maher Basher introduction paragraph ("Brynäs Bilservice drivs av Maher Basher...") highlighting his background, passion for cars, vocational education, and the well-known "Shomaher" nickname reflected in Google Maps reviews.
  - Added JSX TODO comment for future team/staff section.
  - Added proof / Swedish consumer services law paragraph ("Vi tror mer på bevis än på löften...", adhering to the 15% approximate quote rule under konsumenttjänstlagen).
  - Added JSX TODO comment for expanding gallery categories with DSLR photos (team at work, before/after, equipment close-ups).
  - Integrated authentic portrait of owner Maher Basher in a 1:1 rounded card beside the introduction text, above the company facts card, with glass badge ("Maher Basher · Grundare & mekaniker").
  - Generated web-optimized `maher_portrait.webp` (127 KB) and fallback `maher_portrait.jpg` (157 KB) from candidate in `_incoming-assets/`.
  - Added scoped CSS for `.about-page__local-aside`, `.about-page__maher-card`, and responsive badge rules in `client/src/css/index.css`.
- Verified clean build (`npm --prefix client run build`), `git diff --check`, and 0px horizontal overflow across 1440px desktop and 390px mobile viewports.

### 2026-09-15 — Codex (Antigravity continuation preparation)
- Updated the project handovers and status dashboard for an Antigravity continuation. Recorded the actual local baseline (`6d589d16`, two commits ahead of origin at handover time), the no-push rule, the incoming-image workflow and the reviewed candidate image inventory. No runtime code, image import, build configuration, backend or deployment file was changed; do not assume the worktree is clean—inspect it before every task.

### 2026-09-15 — Codex (image and layout-graphics intake)
- Added `_incoming-assets/` as the Git-ignored local staging area for raw photography, blue-tone hero/card backgrounds and layout graphics. Its README specifies subject-based folders, including customer interaction, workshop/team, each service, bärgning split into recovery/transport/winter, vehicle listings and layout graphics. Images must be selected and web-exported before entering `client/src/assets/images/`; no runtime asset was added or changed.

### 2026-09-15 — Codex (Felsökning entry page)
- Added the standalone `/felsokning` route and its desktop/mobile main-navigation entry after Biltjänster. The new page uses the existing AC-service layout language without AC content, imagery, prices or registration input; it contains only existing diagnostic wording, a CSS-only hero placeholder and the established booking/call actions.

### 2026-09-15 — Codex (Biltjänster standard hero)
- Replaced the temporary contained `/biltjanster` hero with the shared full-width service-page hero used by the other Biltjänster destinations. The H1 is now “Våra biltjänster”; its existing lead, booking modal CTA, phone link and replaceable image placeholder remain intact.
- Replaced the two detailed repair/diagnostics cards with a linked collection of the eleven existing service guides. Each card uses a concise source-grounded draft summary and a CSS-only future-image placeholder; no individual guide page, route or shared navigation was changed.

**Entries older than 2026-09-15 are in [`docs/SESSION_LOG_ARCHIVE.md`](docs/SESSION_LOG_ARCHIVE.md).** This embedded log is retained only as historical evidence and must not grow.

## Documentation updates

- Replace stale Current state text concisely; do not append parallel versions.
- Add new dated work notes to `docs/SESSION_LOG_CURRENT.md`, newest first.
- `AGENTS.md` may not grow. `.githooks/pre-commit` enforces this, and also runs the canonical CSS check (`npm --prefix client run check:css`) and blocks Tailwind utilities in public TSX.
- Never bypass the hook without Magnus's explicit approval.
