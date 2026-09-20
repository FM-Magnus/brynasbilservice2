# Brynäs Bilservice redesign handoff

## Start here (updated 2026-09-20)

- **Repo:** `/Users/magnusolsson/repos/brynasbilservice2` (remote `origin` = `FM-Magnus/brynasbilservice2`).
- **Branch:** `redesign/blue-teal-v1`, clean tree, **16 commits ahead of origin. Never push without Magnus's explicit approval.**
- **Last verified commit:** `cc22940c` (2026-09-20). typecheck 0 errors, `npm --prefix client run build` clean, Playwright **67 passed / 2 skipped** (the 2 are touch-only tests skipped off mobile) at 1440/768/390.
- **Commands:** `npm --prefix client run dev | typecheck | build | test:browser`. The build needs **Node ≥18.17** (`vite-imagetools`/sharp); never build on the production server (Node 16).
- **Read next:** [`AGENTS.md`](../AGENTS.md) (contract), [`CSS_OWNERSHIP.md`](CSS_OWNERSHIP.md) (route → CSS owner map, write rules), [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) (tokens and patterns), [`BACKEND_HANDOFF.md`](BACKEND_HANDOFF.md) (backend plan for Johnny), [`SESSION_LOG_CURRENT.md`](SESSION_LOG_CURRENT.md) (dated history, newest first).

## The rebuild is finished (2026-09-19)

All 7 roadmap steps are done and the plan is archived at [`archive/HITL_Temporary_roadmap.md`](archive/HITL_Temporary_roadmap.md) — history, not instructions.

- **Legacy `client/src/css/index.css` is deleted.** Global CSS is exactly four files loaded in `client/src/main.tsx`, in order: `styles/tailwind.css`, `styles/design-tokens.css`, `styles/base.css`, `styles/shared-elements.css`. Do not add a fifth without Magnus's approval, and never reintroduce `--redesign-*` or legacy class systems. Global CSS went from 287.8 KB to 100.0 KB (44.2 → 17.7 KB gzip).
- **7 unique pages**, one CSS island each: Startsidan (`.landing-v2__*`), Om oss (`.omoss-page__*`), Kontakt (`.kontakt-page__*`), Bärgning (`.bargning-page__*`), Biltjänster (`.biltjanster-hub__*`), Bilar till salu (`.bilartillsalu-page__*`), Galleri (`.galleri-page__*`).
- **2 families:** Bilservice (`ServiceReparationerPage.css`, `.bilservice__*`) with Bilservice/Felsökning/Däckservice/AC-service; Guide (`styles/ServiceGuideTemplate.css`, `.service-guide__*`) with all 10 technical guides.
- **Shared components, each with its own stylesheet:** `PublicHeader`, `PublicFooter`, `BookingForm` (`.modal-*`), `BiltjansterFaq` (`.bb-faq__*`), `GalleryTeaserCard`, `GoogleReviewsCard`, `ContactFormCard`.
- **`/tjanster` is a redirect** to `/biltjanster`; the legacy `Header`/`Footer`, `ServicesPage` and `GoogleReviews.tsx` are gone.
- **Tailwind** is allowed only under `/admin`; the pre-commit hook blocks utilities in public TSX.

## Content Magnus edits without a developer

- **Cars:** `client/src/data/vehicles.ts` (add an entry, or `status: 'sold'`). The page reads it through `api/vehicles.ts`; `VITE_VEHICLES_SOURCE=api` switches to the future backend.
- **Gallery:** drop or delete an image in `client/src/assets/galleri/`; captions in `bildtexter.json`; Swedish instructions in `LÄSMIG.md` there. `VITE_GALLERY_SOURCE=api` switches to the future backend.
- **Business facts:** phone, e-mail, address, Google Maps link, opening hours, legal name and org.nr all live in `client/src/data/business.ts`. Change a value there and it updates everywhere, including the Playwright assertions.
- All of these need a build and deploy to reach the live site.

## Open follow-ups (nothing is in progress)

1. **P0 security — admin auth is client-side only.** Credentials ship in the public bundle and the server accepts a fixed token from anyone. Plan: `BACKEND_HANDOFF.md` §2.1. Johnny owns `server/`.
2. **Font-swap layout shift** site-wide: add a metric-matched fallback `@font-face`, then move `styles/base.css` onto `--bb-font-*` (it deliberately uses the legacy stacks today; see the comment in that file).
3. `GalleryTeaserCard` still has its own six-image list; it could read `assets/galleri/` instead (shared-component change).
4. Om oss gallery links could deep-link as `/galleri?bild={slug}`.
5. Footer Instagram icon points at `instagram.com`, not the workshop profile — Magnus needs to supply the real URL or decide to drop the icon. (The phone-number split was resolved on 2026-09-20; everything now comes from `data/business.ts`.)
6. Seven already-unreferenced assets plus `client/src/assets/images/archive/` — Magnus decides whether to delete.
7. Server-side, Johnny: `comment_customer` not saved on bookings, `schema.sql` out of sync, `.htaccess` port/RewriteBase mismatch.

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
- The legacy `client/src/css/index.css` was deleted (2026-09-19). Global CSS is the four files in `client/src/styles/`; every page and shared component owns its island. See [`CSS_OWNERSHIP.md`](CSS_OWNERSHIP.md) before any CSS work.
- `client/src/main.tsx` provides routing and `LanguageProvider`, and loads the four global stylesheets. Every public route is lazy-loaded; `/tjanster` redirects to `/biltjanster`; `/admin` is protected. Production uses the `/brynasbilservice` basename, which remains unverified.
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

1. Read this file and `AGENTS.md`; then `docs/CSS_OWNERSHIP.md` before any CSS work.
2. Record the actual worktree state (`git status -sb`) — do not assume it is clean or synced, and never push without Magnus's explicit approval.
3. For a page change, edit only that route's island plus its TSX; state the allowed write paths first (task contract in `CSS_OWNERSHIP.md`).
4. Preserve business data: prices, opening hours, phone, address, review figures and vehicle facts come from Magnus, never from a model's guess.
5. Verify with Playwright at 1440, 768 and 390 px (zero horizontal overflow), plus `npm --prefix client run typecheck` and `build`.
6. Write a dated entry in `docs/SESSION_LOG_CURRENT.md`. Commit when the work is verified; never push without explicit approval.
