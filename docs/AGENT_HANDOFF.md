# Brynäs Bilservice redesign handoff

## Verified starting point

- Repository: `/Users/magnusolsson/Documents/REPOS/brynasbilservice_repo`
- Working branch: `redesign/blue-teal-v1`
- Verified commit: `aac2f674e920624acc872e8e94f5cddcdf85c114` (`fix: improve booking modal accessibility`)
- The branch intentionally has no upstream. Do not configure one and do not push without Magnus's explicit approval.
- Build: `cd client && npm run build`

Read [AGENTS.md](../AGENTS.md) and [the Phase 0 baseline](redesign-phase-0/README.md) before editing. This document records the approved redesign state; it does not authorize work beyond the next stated phase.

## Current continuation note — 2026-09-16

The historical Git details above are not current state. Always inspect the current worktree and branch before acting. Since this baseline was written:

- The newest local commit is `78cd10d3` on `redesign/blue-teal-v1` (ahead of origin by 1 commit).
- Dedicated hero background WebP/JPG pairs implemented across **Om oss** (`/om-oss`), **AC-service** (`/ac-service`), **Bärgning** (`/bargning`), and **Däckservice** (`/dackservice`), each styled via colocated scoped CSS files (`AboutPage.css`, `AcServicePage.css`, `BargningPage.css`, `DackservicePage.css`) using `image-set()` and the standard overlay gradient (`opacity: 0.85`).
- `/galleri` is a dedicated workshop gallery subpage (`GalleryPage.tsx`) featuring real workshop photos, dark hero, closing CTA, and booking modal.
- `/om-oss` features Maher Basher intro copy, consumer law proof ("15 procent"), authentic portrait card, and a stylish pill CTA button linking to `/galleri`.
- Startsidan features the reusable `GalleryTeaserCard` component with Ken Burns slideshow, "Grundat 2021" badge, and bottom-right cutout badge "TILL GALLERIET".
- `/biltjanster` is the Biltjänster hub headed **“Våra biltjänster”**, with linked summary cards for the current service guides and clearly labelled CSS image placeholders.
- `/felsokning` is a separate main-navigation destination immediately after Biltjänster, using the established service-page pattern and a future-image placeholder.
- Raw photos, blue-tone backgrounds and non-photographic layout graphics enter through `_incoming-assets/`. Its README defines the subject-based folders; selected web exports belong strictly in `client/src/assets/images/` and its subdirectories.

For the authoritative current route map and copy/image status, use [`PROJECT_STATUS.md`](PROJECT_STATUS.md).

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

Phases 0 through 4 (baseline capture → header/hero/reviews → booking modal → About section → Services/ServiceList/WhyUs/EV → the full Biltjänster guide set) are done and approved. The session-by-session record of exactly what changed and which files were touched now lives in `AGENTS.md`'s "Session log" (recent) and [`docs/SESSION_LOG_ARCHIVE.md`](SESSION_LOG_ARCHIVE.md) (2026-09-11 and earlier) — check those instead of duplicating that history here. `docs/redesign-phase-0/README.md` still holds the original Phase 0 mockup-to-component mapping if you need the very first baseline reasoning.

## Architecture and preservation rules

- The frontend lives in `client/`; use `cd client && npm run build`. Do not use or edit the root Vite/React scaffolding.
- `client/src/main.tsx` provides routing and `LanguageProvider`. The route list includes `/`, `/om-oss`, `/tjanster`, `/biltjanster`, `/service-reparationer`, `/felsokning`, the individual Biltjänster service guides, `/dackservice`, `/ac-service`, `/bargning`, `/bilar-till-salu`, and `/kontakt`; `/admin` is protected. Production uses the `/brynasbilservice` basename, which remains unverified.
- `Biltjänster` is the shared header dropdown. Its default route is `/biltjanster` (`Våra tjänster`), followed by `/service-reparationer#bilservice` (`Bilservice`) and the current service-guide destinations. The default route is now a linked service-guide hub; Bilservice owns the long-form service guide and its closing vehicle/reassurance blocks. The standalone `Felsökning` link follows Biltjänster in the main navigation. Keep future Biltjänster entries simple and add them only after an explicit route/content decision.
- `client/src/App.tsx` owns booking-modal state and renders: Header → Hero → About → Services → ServiceList → WhyUs → EV → CTA → Contact → Footer. Preserve that content and order unless a later approved phase says otherwise.
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
