# Brynäs Bilservice redesign handoff

## Verified starting point

- Repository: `/Users/magnusolsson/repos/brynasbilservice2` (remote `origin` = `FM-Magnus/brynasbilservice2`)
- Working branch: `redesign/blue-teal-v1`, tracking `origin/redesign/blue-teal-v1`. Do not push without Magnus's explicit approval.
- Last audited commit: `12ca91f1` (`feat(galleri): …`), audited 2026-09-19: typecheck 0 errors, `npm --prefix client run build` clean, Playwright 61 passed / 2 skipped (by design) at 1440/768/390.
- Build: `npm --prefix client run build` (needs Node ≥18.17; see `docs/deployment.md`).

Read [AGENTS.md](../AGENTS.md) and [the Phase 0 baseline](redesign-phase-0/README.md) before editing. This document records the approved redesign state; it does not authorize work beyond the next stated phase.

## Current continuation note — 2026-09-19

**AUTHORITATIVE REBUILD ROADMAP**: Consult [`HITL_Temporary_roadmap.md`](../HITL_Temporary_roadmap.md) before starting work.
- **What it is**: Magnus's authoritative human-in-the-loop rebuild roadmap.
- **Why it is there**: Keeps all agents aligned across sessions on the 7 design styles and prevents drift or unauthorized edits to frozen code.
- **Why it is temporary**: Exists only while migrating away from `index.css`. Once all pages are rebuilt on their independent templates and `index.css` is deleted, this roadmap will be archived.

- The canonical **Level 0 Public Shell & Design Tokens** foundation is completed and locked:
  - `client/src/styles/design-tokens.css` defines the authoritative `--bb-*` canonical tokens (colors, amber accent `#f09505`, typography scales, spacing, radii, `--bb-wrap-max: 1320px`).
  - `PublicHeader` (`PublicHeader.tsx` + `PublicHeader.css` + `publicNavigation.ts`): Standalone sticky/portal header rendering above all page contexts.
  - `PublicFooter` (`PublicFooter.tsx` + `PublicFooter.css`): Standalone 4-column automotive footer matching Magnus's approved mockup, with wheel background asset (`footer-wheel-bg.webp`), verified hours, contact cards, CTA button, and dynamic copyright.
  - `GalleryTeaserCard` (`GalleryTeaserCard.tsx` + `GalleryTeaserCard.css`): Standalone Ken Burns workshop slideshow card with single-source `defaultWorkshopSlides` array.
  - `GoogleReviewsCard` (`GoogleReviewsCard.tsx` + `GoogleReviewsCard.css`): Standalone Google reviews module with verified data, cyclic rotation, and frosted-glass transparent bounding field (`hero-overlay`) with zero layout shift / 0.0px CLS across viewports.
  - `ContactFormCard` (`ContactFormCard.tsx` + `ContactFormCard.css`): Standalone single-source-of-truth contact component (`defaultContactSubjects`) supporting `full-section` and `card-only` variants.
  - All five elements are mounted on Startsidan (`/`), 100% independent of legacy `index.css`.
- **PROGRESS & CURRENT CONTINUATION (2026-09-18 Antigravity)**:
  - **Level 0 Public Shell & Canonical Design Tokens**: Completed & locked (`design-tokens.css`, `shared-elements.css`, `PublicHeader`, `PublicFooter`, `GalleryTeaserCard`, `GoogleReviewsCard`, `ContactFormCard`).
  - **Unique Pages**:
    - Startsidan (`/`): Complete (`LandingPage.tsx` / `LandingPage.css`, `.landing-v2__*`).
    - Om oss (`/om-oss`): Complete (`AboutPage.tsx` / `AboutPage.css`, `.omoss-page__*`), mounts `PublicHeader` + `PublicFooter` + `GalleryTeaserCard`.
    - Kontakt (`/kontakt`): Complete (`ContactPage.tsx` / `ContactPage.css`, `.kontakt-page__*`), mounts `PublicHeader` (overlay) + `PublicFooter` + `ContactFormCard`.
    - Bärgning (`/bargning`): Complete (`BargningPage.tsx` / `BargningPage.css`, `.bargning-page__*`), mounts `PublicHeader` + `PublicFooter`.
    - Biltjänster (`/biltjanster`): Complete (`BiltjansterPage.tsx` / `BiltjansterPage.css`, `.biltjanster-hub__*`), mounts `PublicHeader` + `PublicFooter`.
    - Bilar till salu (`/bilar-till-salu`): Complete (`BilarTillSalu.tsx` / `BilarTillSalu.css`, `.bilartillsalu-page__*`), stock via `api/vehicles.ts` → `data/vehicles.ts`.
    - Galleri (`/galleri`): Complete (`GalleryPage.tsx` / `GalleryPage.css`, `.galleri-page__*`). **Gallery photos live in `client/src/assets/galleri/`** — adding/removing a file adds/removes it from the page; captions in `bildtexter.json`; instructions in [`LÄSMIG.md`](../client/src/assets/galleri/LÄSMIG.md).
    - **Step 6 is 100% COMPLETE.**
  - **Backend handoff**: [`docs/BACKEND_HANDOFF.md`](BACKEND_HANDOFF.md) — frontend overview for Johnny, admin-auth security finding, vehicle-listings API contract, and a runbook for building the backend on a separate branch.
  - **Bilservice Family (Parent & All 3 Siblings 100% Complete & Locked)**:
    - Bilservice (`/service-reparationer`): Complete on `.bb-hero` layout system, `--bb-*` tokens, mounts `PublicHeader` + `PublicFooter`.
    - Felsökning (`/felsokning`): Complete on `ServiceReparationerPage.css` (`.bilservice__*`), mounts `PublicHeader` (overlay) + `PublicFooter`, interactive symptom selector, OBD code readout, Playwright verified ($\Delta = 0\text{px}$).
    - Däckservice (`/dackservice`): Complete on `ServiceReparationerPage.css` (`.bilservice__*`), mounts `PublicHeader` (overlay) + `PublicFooter`, 6 tire service cards with photos & exact pricing, legal requirements banner, däckhotell card, Playwright verified ($\Delta = 0\text{px}$).
    - AC-service (`/ac-service`): Complete on `ServiceReparationerPage.css` (`.bilservice__*`), mounts `PublicHeader` (overlay) + `PublicFooter`, interactive symptom selector, 3 exact pricing cards with caveats, manometer photo split card, 4-step process, advice tips, FAQs, Playwright verified ($\Delta = 0\text{px}$).
    - **Step 4 is 100% COMPLETE**.
  - **Guide Family (10 / 10 Guides Complete & Locked)**:
    - All 10 technical guides (`Koppling`, `Avgassystem`, `Bromssystem`, `Oljebyte`, `Kamrem`, `Bilbatteri`, `Stötdämpare & fjädrar`, `Hjullagerbyte`, `Styrning & kulleder`, and `Drivaxel & drivknutar`) are fully rebuilt on `ServiceGuideTemplate.css`, aligned with canonical Level 0 tokens, Level 1 `.bb-*` elements, mixed-case Archivo 800 H1s, zero-specificity reset bug fix, and Playwright multi-viewport verification ($\Delta = 0\text{px}$).
    - **Step 5 is 100% COMPLETE**.
- **IMMEDIATE NEXT TASKS (Step 7: delete `index.css`)**:
  1. **Step 7** — prep is done (see `HITL_Temporary_roadmap.md` Step 7). Retire `ServicesPage.tsx` (`/tjanster`) and the dead code, replace `import './css/index.css'` with `import './styles/tailwind.css'` in `main.tsx`, delete `client/src/css/index.css`, and remove its freeze from the pre-commit hook.

## Authority and references

Apply sources in this order when they conflict:

1. Magnus's current explicit instruction and approval.
2. The seven locked Brynäs design mockups and supplied Brynäs assets.
3. The approved implementation on this branch and its Phase 0/1A/1B records.
4. `AGENTS.md` for repository, ownership, production and API constraints.
5. `REDESIGN_HANDOVER.md` for planning context; where it conflicts with the seven locked mockups, all seven mockups are authoritative.
6. The Vår Verkstad reference only for general inspiration. Do not copy its layout, content, assets, dimensions, colours, claims or interaction rules into Brynäs.
7. Any remaining assumption must be identified and confirmed before implementation.

Locked mockups (all are required references):

- `/Users/magnusolsson/AI Work Projects 2026/MOCKUPS FÖR BBIL/LOCKED DESIGN/exec-6d85f013-3d20-4b66-8884-5c004604cd82.png` — header, hero, reviews and early contact.
- `/Users/magnusolsson/AI Work Projects 2026/MOCKUPS FÖR BBIL/LOCKED DESIGN/exec-12fdaa72-b86a-42dd-ab98-e38cb51424c0.png` — FAQ and footer.
- `/Users/magnusolsson/AI Work Projects 2026/MOCKUPS FÖR BBIL/LOCKED DESIGN/exec-19b06bc4-5b0d-40fb-9a92-1684d59b7113.png` — find-us, map and opening hours.
- `/Users/magnusolsson/AI Work Projects 2026/MOCKUPS FÖR BBIL/LOCKED DESIGN/exec-79ece2de-7cdd-47ff-8914-7f7a35c746e7.png` — photographic booking CTA.
- `/Users/magnusolsson/AI Work Projects 2026/MOCKUPS FÖR BBIL/LOCKED DESIGN/exec-94663624-5a72-450f-bcd6-e8cb7ae8aa0d.png` — featured vehicle.
- `/Users/magnusolsson/AI Work Projects 2026/MOCKUPS FÖR BBIL/LOCKED DESIGN/exec-a992d87a-db25-475d-afb6-0a1e5e9c9160.png` — services, process and reassurance row.
- `/Users/magnusolsson/AI Work Projects 2026/MOCKUPS FÖR BBIL/LOCKED DESIGN/exec-afb1248b-8fde-4274-97ff-554108c67955.png` — About section.

The planning handover is `/Users/magnusolsson/AI Work Projects 2026/MOCKUPS FÖR BBIL/REDESIGN_HANDOVER.md`. The Vår Verkstad reference is `/Users/magnusolsson/Documents/varverkstad-2026-09-09`. Neither its files nor the locked mockups may be copied into this repository. A cloud-based agent must receive them as attachments because these local paths will not exist in its environment.

## Approved visual direction

Use a warm-white page surround, dark photographic cards, rounded corners, strong open sans-serif headlines, and a restrained turquoise/blue accent family. Preserve the Brynäs character; do not substitute Vår Verkstad's electric blue or reproduce that product. The supplied hero photo is already in `client/src/assets/images/background_hero.jpg` and is connected. The hero marquee is intentionally removed.

## Completed work

Phases 0 through 4 (baseline capture → header/hero/reviews → booking modal → About section → Services/ServiceList/WhyUs/EV → the full Biltjänster guide set) are done and approved. Session-by-session records live in [`SESSION_LOG_CURRENT.md`](SESSION_LOG_CURRENT.md) and [`SESSION_LOG_ARCHIVE.md`](SESSION_LOG_ARCHIVE.md); `AGENTS.md` is now a bounded startup contract and its embedded legacy log is frozen. `docs/redesign-phase-0/README.md` still holds the original Phase 0 mockup-to-component mapping.

## Architecture and preservation rules

- The frontend lives in `client/`; use `cd client && npm run build`. Do not use or edit the root Vite/React scaffolding.
- `client/src/css/index.css` is a frozen legacy dependency layer. Never modify or clean it; use the route owner in [`CSS_OWNERSHIP.md`](CSS_OWNERSHIP.md) for every CSS task.
- `client/src/main.tsx` provides routing and `LanguageProvider`. The route list includes `/`, `/om-oss`, `/tjanster`, `/biltjanster`, `/service-reparationer`, `/felsokning`, the individual Biltjänster service guides, `/dackservice`, `/ac-service`, `/bargning`, `/bilar-till-salu`, and `/kontakt`; `/admin` is protected. Production uses the `/brynasbilservice` basename, which remains unverified.
- `Biltjänster` is the shared header dropdown. Its default route is `/biltjanster` (`Våra tjänster`), followed by `/service-reparationer#bilservice` (`Bilservice`) and the current service-guide destinations. The default route is now a linked service-guide hub; Bilservice owns the long-form service guide and its closing vehicle/reassurance blocks. The standalone `Felsökning` link follows Biltjänster in the main navigation. Keep future Biltjänster entries simple and add them only after an explicit route/content decision.
- `client/src/App.tsx` mounts `client/src/pages/landing/LandingPage.tsx` for the start route. `LandingPage` owns the isolated page composition and its local booking-modal state: floating header → sunset hero with rotating Google review link → contact/form → reassurance → services → five-step process → gallery/about → used-car CTA → closing contact → footer. It does not use the former home-section composition; preserve the current public functionality and order unless a later approved phase says otherwise.
- Reuse existing Brynäs content, images, telephone/email/address, service data, booking callbacks and real vehicle data. Do not replace business facts with mockup text or invent routes, maps, FAQ answers, form recipients or dummy flows.
- Do not change `server/index.js`, `server/database/schema.sql`, `server/.htaccess`, `server/.env`, deployment files, or root project configs. Johnny owns backend/server decisions.

## Known limitations and unverified items

- Google review data is real Brynäs Bilservice data confirmed by Magnus (4,3 / 50 recensioner and the linked Google Maps profile), but it is hardcoded and can become stale over time.
- Local booking API availability and real booking submission remain unverified. `comment_customer` is not saved by the server; do not change payloads/endpoints without backend approval.
- Backend/database behaviour, production deployment, production basename navigation, external business facts and opening hours remain unverified.
- Deployment automation is intentionally absent from canonical history. `.htaccess` and deployment documentation disagree; do not resolve this without Magnus and Johnny.


## Startup checklist

1. Read this file, `AGENTS.md`, and `docs/redesign-phase-0/README.md`.
2. Confirm the current branch is `redesign/blue-teal-v1` and record—not alter—the actual worktree state. Do not assume it is clean or synced; never push without Magnus's explicit prior approval.
3. Inspect the About implementation and locked mockup 7 before editing. Attach the seven mockups and Vår Verkstad pack if working in a cloud environment.
4. Make only the approved About-section changes; preserve business data and functionality.
5. Verify at 1440, 768 and 390 CSS pixels, then run the diff and build checks.
6. Present the visual result for Magnus's approval. Commit only after approval; never push without explicit approval.
