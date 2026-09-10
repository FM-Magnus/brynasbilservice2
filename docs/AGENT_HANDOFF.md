# Brynäs Bilservice redesign handoff

## Verified starting point

- Repository: `/Users/magnusolsson/Documents/REPOS/brynasbilservice_repo`
- Working branch: `redesign/blue-teal-v1`
- Verified commit: `aac2f674e920624acc872e8e94f5cddcdf85c114` (`fix: improve booking modal accessibility`)
- The branch intentionally has no upstream. Do not configure one and do not push without Magnus's explicit approval.
- Build: `cd client && npm run build`

Read [AGENTS.md](../AGENTS.md) and [the Phase 0 baseline](redesign-phase-0/README.md) before editing. This document records the approved redesign state; it does not authorize work beyond the next stated phase.

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

### Phase 0 — baseline

- Reviewed all seven locked mockups and recorded the component/content mapping in `docs/redesign-phase-0/README.md`.
- Added `background_hero.jpg` unchanged and nine visual baselines under `docs/redesign-phase-0/captures/`.
- Established `redesign/blue-teal-v1` from `1f8ab37b`; its lack of upstream is intentional.

### Phase 1A — approved header, hero and reviews

- Redesigned the header, hero and Google-review presentation; connected `background_hero.jpg`; removed the marquee.
- Preserved hero copy, booking callbacks, telephone navigation and the existing review data while changing presentation only.
- Verified at 1440, 768 and 390 CSS pixels.

Phase 1A files:

- `client/src/App.tsx`
- `client/src/components/GoogleReviews.tsx`
- `client/src/components/layout/Header.tsx`
- `client/src/components/sections/Hero.tsx`
- `client/src/css/index.css`

### Phase 1B — approved booking modal

- Improved booking-modal mobile layout and accessibility: dialog semantics, focus trap, Escape handling, focus restoration and scroll lock.
- Preserved booking fields, validation, callbacks, payload and endpoints. No backend work was made.
- Verified at 1440, 768 and 390 CSS pixels.

Phase 1B files:

- `client/src/components/BookingForm.tsx`
- `client/src/components/BookingForm.css`

## Architecture and preservation rules

- The frontend lives in `client/`; use `cd client && npm run build`. Do not use or edit the root Vite/React scaffolding.
- `client/src/main.tsx` provides routing and `LanguageProvider`. Routes are `/`, `/bilar-till-salu`, and `/admin`; production uses the `/brynasbilservice` basename, which remains unverified.
- `client/src/App.tsx` owns booking-modal state and renders: Header → Hero → About → Services → ServiceList → WhyUs → EV → CTA → Contact → Footer. Preserve that content and order unless a later approved phase says otherwise.
- `About.tsx` and `ui/KenBurnsSlideshow.tsx` currently provide the About content and reduced-motion slideshow. The next phase should work only in this area.
- Reuse existing Brynäs content, images, telephone/email/address, service data, booking callbacks and real vehicle data. Do not replace business facts with mockup text or invent routes, maps, FAQ answers, form recipients or dummy flows.
- Do not change `server/index.js`, `server/database/schema.sql`, `server/.htaccess`, `server/.env`, deployment files, or root project configs. Johnny owns backend/server decisions.

## Known limitations and unverified items

- Google review data is placeholder data, not verified Brynäs reviews.
- Local booking API availability and real booking submission remain unverified. `comment_customer` is not saved by the server; do not change payloads/endpoints without backend approval.
- Backend/database behaviour, production deployment, production basename navigation, external business facts and opening hours remain unverified.
- Deployment automation is intentionally absent from canonical history. `.htaccess` and deployment documentation disagree; do not resolve this without Magnus and Johnny.
- Four service booking links remain dead anchors. Address them only in an approved services phase.
- The About section has a remaining nested-heading semantics issue; handle it within the next phase while preserving the existing content.

## Next phase: About section only

Redesign `client/src/components/sections/About.tsx` and only the styles/assets/components necessary for that section. Use locked mockup 7 as the visual reference. Preserve the verified About content and Ken Burns reduced-motion behaviour unless a specific change is approved. Do not redesign services, contact, CTA, footer, vehicle content, the modal, header or hero in this phase.

For any visual work, verify at **1440**, **768** and **390 CSS pixels**, including no horizontal overflow, readable crop/text, keyboard use and reduced-motion behaviour where relevant. Run `git diff --check` and `cd client && npm run build`; visual approval from Magnus is required before committing.

## Startup checklist

1. Read this file, `AGENTS.md`, and `docs/redesign-phase-0/README.md`.
2. Confirm `redesign/blue-teal-v1`, the expected HEAD, a clean working tree and no upstream; do not fetch or push.
3. Inspect the About implementation and locked mockup 7 before editing. Attach the seven mockups and Vår Verkstad pack if working in a cloud environment.
4. Make only the approved About-section changes; preserve business data and functionality.
5. Verify at 1440, 768 and 390 CSS pixels, then run the diff and build checks.
6. Present the visual result for Magnus's approval. Commit only after approval; never push without explicit approval.
