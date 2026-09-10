# Agent Handoff Log — Brynäs Bilservice

This file is maintained by AI agents (Claude, Codex, Kimi, etc.) and updated at the end of every working session.
**If you are an AI agent starting a session: read this file first.**

---

## Current state (last updated: 2026-09-10 by Codex)

### What is working
- Full frontend renders: Hero, About, Services, ServiceList, WhyUs, EV, CTABanner, Contact, Footer
- Phase 1A header and hero redesign — real SVG logo, floating navigation/booking controls, keyboard-usable mobile menu, unchanged hero copy and connected `background_hero.jpg`
- Booking form modal (DatePicker + TimePicker) — Phase 1B improved mobile layout and accessibility
- Admin panel at `/admin` — booking management, service CRUD, soft-delete, search/filter/sort
- i18n context (Swedish/English) — LanguageProvider wraps the whole app in main.tsx; public section copy is currently hardcoded Swedish
- ThemeSwitcher + localStorage are used in admin; public sections use dark CSS tokens and have no visible theme switch
- Hero marquee removed as part of the approved Phase 1A redesign
- GoogleReviews component in hero — redesigned presentation with reduced-motion handling and placeholder data (not real Brynäs reviews)
- **Bilar till salu subpage** at `/bilar-till-salu` — real Peugeot 307 CC listing, 3-photo gallery with thumbnail strip, sold section, empty state
- **6 service cards** — each has its own photo (servicekort_repair/diagnosis/AC/tyres/tow/carbuy.jpg)
- "SE VÅRA BILAR" link on Bilar till salu service card routes correctly to `/bilar-till-salu`
- **Om oss section** uses Ken Burns slideshow (`KenBurnsSlideshow.tsx`) cycling 3 images (`OMOSS_KENBURNS1/2/3.jpg`) with crossfade + slow pan/zoom; respects `prefers-reduced-motion`

### What is broken / incomplete
1. **GitHub Actions deployment is intentionally absent from canonical history** — the legacy misplaced workflow was preserved on `legacy/pre-live-site-2026-09-09`. Do not restore or modify deployment automation without Magnus and Johnny agreeing on the `.htaccess` and server configuration.
2. **`.htaccess` discrepancy** — `server/.htaccess` says port 3000 + has `RewriteBase`. `docs/deployment.md` says port 3001 + explicitly forbids `RewriteBase`. One will fail at deploy. Johnny owns the resolution.
3. **GoogleReviews has fake data** — hardcoded from a different business. Needs real Brynäs Bilservice reviews. Screenshots of real reviews are in `_magnus/REVIEWS/` (22 images).
4. **comment_customer not saved** — BookingForm sends it in POST body but `server/index.js` `insertBooking()` does not include it in the INSERT query.
5. **admin comment read-only** — `comment_admin` field is shown in admin modal but cannot be edited or saved.
6. **schema.sql out of sync with live DB** — see "Database reality" in CLAUDE.md. The live DB is the source of truth; schema.sql is stale documentation.
7. **Orphan root project configs** — `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html` at repo root reference React 19 / Vite 8 / Tailwind 4 (the project actually uses 18/4/3 in `client/`). They're misleading scaffolding and could be deleted, but doing so requires checking if any tooling targets them.
8. **Four service booking links are dead anchors** — `Services.tsx` points to `#booking-form`, but the modal has no matching id and is opened through callbacks elsewhere.
9. **Booking modal backend limitation** — local API availability and real booking submission remain unverified. Phase 1B made no backend, payload or endpoint changes.
10. **Typography variables are undefined outside Phase 1A** — legacy CSS references `--font-heading` and `--font-body`, while the redesigned header and hero use scoped Barlow tokens.
11. **Remaining semantics gap** — About nests h2 headings. Existing Ken Burns reduced-motion support remains.

### Cars for sale (BilarTillSalu.tsx)
- Peugeot 307 CC 2.0, 2006, mörkgrå, 141 147 km, 39 900 kr, nybesiktigad maj 2026
- Photos: `peugeot-307-cc-1/2/3.jpg` (main is -3, side profile shot)
- To add more cars: import photos, add entry to `cars[]` array in `BilarTillSalu.tsx`
- To mark sold: add `sold: true` to the car object

### Section and nav order
Page scroll: Hero → About → Services → ServiceList → WhyUs → EV → CTABanner → Contact
Nav links: Om oss → Tjänster → Bilar till salu → Kontakt

### Recently changed (this session)
- Phase 1A was visually approved by Magnus: the redesigned header, hero and Google-review presentation are implemented; `background_hero.jpg` is connected and the marquee is removed.
- Phase 1B was visually and functionally approved by Magnus: the booking-modal mobile layout and accessibility are improved with dialog semantics, focus trap, Escape handling, focus restoration and scroll lock.
- Phase 1B verification passed at 1440, 768 and 390 px. Backend/API availability and real booking submission remain unverified; no backend, payload or endpoint changes were made.
- Backend/API availability, authentic Google reviews and deployed production behavior remain unverified.
- Redesign Phase 0 completed using all **seven** mockups, as explicitly clarified by Magnus; the handover's four-image limit is outdated.
- Added `docs/redesign-phase-0/README.md` with component/content mapping, existing issues, Phase 1 file scope, decision points and acceptance criteria; saved desktop/tablet/mobile baselines in its `captures/` directory.
- Magnus approved removing the marquee in the redesign; his supplied `background_hero.jpg` is in `client/src/assets/images/` and now wired into the hero.
- The Phase 1A build wrote ignored output under `client/dist/`; no screenshots or ignored files are part of the Phase 1A change set.
- `redesign/blue-teal-v1` is the intended redesign branch. It started at `1f8ab37b`, matching the locally stored `main` and `origin/main` refs. Having no upstream is intentional for the local baseline and is not a blocker; no push was performed.
- External business facts, backend behavior, production-basename behavior and real Google review data remain unverified.
- Correct local frontend is `http://127.0.0.1:5173/`. An older checkout separately listens on IPv6 localhost port 5173; avoid ambiguous `localhost` for this baseline.

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

## Session log

### 2026-09-10 — Codex
- Magnus visually and functionally approved Phase 1B. Improved booking-modal mobile layout and accessibility with dialog semantics, focus trap, Escape handling, focus restoration and scroll lock.
- Backend/API availability and real booking submission remain unverified. No backend, payload or endpoint changes were made.

### 2026-09-10 — Codex
- Magnus visually approved Phase 1A. Implemented the redesigned header, hero and Google-review presentation; connected `background_hero.jpg`; removed the marquee.
- Verified the approved visual result at 1440, 768 and 390 px, including the vehicle-sale header and mobile-menu behavior.
- Booking-modal clipping and modal accessibility remain deferred to Phase 1B. Backend/API availability, authentic Google reviews and deployed production behavior remain unverified.

### 2026-09-10 — Codex
- Completed redesign Phase 0 using all seven supplied design references and the local Vår Verkstad reference pack; added the report and nine baseline screenshots under `docs/redesign-phase-0/`.
- Verified clean starting worktree, origin and HEAD; existing redesign branch matches local main at `1f8ab37b`. Frontend build passes with the existing large-chunk warning.
- Verified 1440/768/390 viewport baselines, mobile menu, modal opening/closing, car thumbnail switching and navigation from the car page. Recorded the unavailable services API and mobile modal clipping; no booking submitted.
- Documented missing font variables, dead service anchors, motion/accessibility gaps and outdated theme/i18n claims. Magnus decided to remove the marquee in the redesign and supplied `background_hero.jpg`; moved it unchanged from repo root to `client/src/assets/images/` on his explicit instruction, without wiring it into the page.
- Phase 0 changed documentation and approved artifacts only: the build wrote ignored `client/dist/` output and screenshot capture created nine files. No application source, backend or deployment code changed. External business facts, backend behavior, production-basename behavior and real Google review data remain unverified.
- `redesign/blue-teal-v1` is the intended redesign branch. Its lack of upstream is intentional and not a blocker. No push was performed.

### 2026-09-09 — Codex
- Verified that the locally running frontend (including the Google Reviews hero) is the intended live-site version; `client/` was restored from its tracked local snapshot after a temporary working-tree deletion.
- Recovered Git continuity for `https://github.com/FM-Magnus/brynasbilservice2`: the previous unrelated GitHub `main` is preserved at `legacy/pre-live-site-2026-09-09`; the current local project history and verified frontend build are now canonical `main` (commit `1e5c5d4f`). A matching `recovery/live-site-2026-09-09` branch remains as an additional safety point.
- This checkout's `origin` now tracks `FM-Magnus/brynasbilservice2`; the former `FM-Johnny/brynasbilservice` remote is retained locally as `johnny-archive` for reference only.
- Removed 11 already-deleted unused `_magnus/` reference assets in the canonical recovery commit. The real frontend build (`client/npm run build`) passes. The root Vite scaffold is still not the application build target.
- Added `docs/git-history-recovery.md` as the plain-language explanation of the recovery, safety branches, everyday Git workflow, and deployment boundary.

### 2026-05-08 — Claude (claude-opus-4-7)
- Built reusable `KenBurnsSlideshow` component (`client/src/components/ui/KenBurnsSlideshow.tsx`) — crossfading slideshow with continuous Ken Burns pan/zoom on each image, three pan variants rotating, respects `prefers-reduced-motion`
- Replaced static About image with slideshow cycling `OMOSS_KENBURNS1/2/3.jpg` (7s visible per image, 1.5s crossfade)
- Removed accent image and `sakar_works.jpg` entirely from the codebase
- Removed obsolete `.about__img-main` and `.about__img-accent` CSS rules; added `.kenburns*` rules + 3 keyframe animations
- Mobile slideshow height adjusted to 280px (was 240px on the static image — Ken Burns needs slightly more room for the pan)
- **Name correction:** Magnus's brother (backend dev) is named **Johnny**, not Sakar. Fixed across `CLAUDE.md`, `AGENTS.md`, `README.md`, `instructions.md`. The asset filename `sakar_works.jpg` was deleted as part of the Ken Burns work so no leftover reference remains.
- Rewrote the "Working with AI assistants" section in `README.md` to address both Magnus and Johnny — Johnny now has explicit guidance that the AI tools won't touch his backend files, and that he's welcome to add his own entries to the AGENTS.md session log
- Two extra untracked images (`BARGNING_TRANSPORT.jpg`, `HAR_FINNS_VI.jpg`) ended up committed alongside the Ken Burns work because of `git add -A` — they're now in the repo waiting to be used in some future feature

### 2026-05-07 (later) — Claude (claude-opus-4-7)
- Full repo audit comparing CLAUDE.md / AGENTS.md / instructions.md against actual code
- Discovered: GitHub Actions deploy file in wrong location (silent broken deploy), no git remote, .htaccess port/RewriteBase mismatch, schema.sql heavily out of sync with live DB, orphan root project configs (React 19/Vite 8) confusing newer agents
- Removed orphan files at repo root: `Hero_Bakground_warmer.jpg`, `LOGOTYP_NY.svg`, `New_old_logo.png`, `logo1-c66a10e4@0.5x.png`
- Removed `client/src/service_card_carsale.jpg` (stray, not imported)
- Removed `client/src/backup/` (only contained unused `Button.d.ts`)
- Added Production environment section + full API contract section to AGENTS.md
- Added Production environment + API contract + Database reality + Repo traps sections to CLAUDE.md
- Added 3 new entries to "What is broken" (deploy, no remote, .htaccess mismatch)
- Build verified clean after cleanup
- Proposed but **declined by Magnus**: moving `deploy.yml` to repo root (B), reconciling `.htaccess` (C), removing orphan root configs (D). All three remain as known issues — they involve Johnny's domain or risk breaking production. Future agents: do not act on these without Magnus explicitly asking.
- Added "Working with AI assistants" section to README.md so the AI workflow (three docs, Stop hook, AGENTS.md as shared log) is discoverable from the project entry point

### 2026-05-07 — Claude (claude-sonnet-4-6)
- Built Bilar till salu subpage (`client/src/pages/BilarTillSalu.tsx`) — Car interface, CarCard component, gallery with thumbnail strip, sold section, empty state, full CSS
- Added `/bilar-till-salu` route to `main.tsx`
- Header nav: all section links changed to `/#section` format so they work from subpages; logo fixed to `/`
- Replaced 3 fake placeholder cars with real Peugeot 307 CC 2.0 (2006, mörkgrå, 141 147 km, 39 900 kr)
- Added 3 Peugeot photos (`peugeot-307-cc-1/2/3.jpg`), renamed from macOS screenshot names, wired into gallery
- Fixed dead link on "Bilar till salu" service card (`#kontakt` → `/bilar-till-salu`)
- Replaced all 6 service card images with new per-service photos (repair, diagnosis, AC, tyres, tow, carbuy)
- Car interface changed from `image?: string` to `images?: string[]` to support multi-photo gallery
- Fixed mobile padding bug on car card body: `--space-5` doesn't exist in design system, changed to `--space-6`
- All builds verified clean throughout

### 2026-05-05 — Claude (claude-sonnet-4-6)
- Full codebase review and analysis
- Identified 3 missing npm packages blocking the build; installed them
- Identified broken/incomplete features (see current state above)
- Compared current codebase to LaCie backup ("brynasbilservice INNAN STÄDNING I CODE")
- Reinstated files deleted by Kimi Code cleanup: GoogleReviews.tsx, Marquee.tsx, SnowflakeIcon.tsx, TruckIcon.tsx, marquee-items.txt, LOGOTYP_NY.svg, HERO_BG_V4/V6/V7.jpg, Hero_Background_V3.jpg, Hero_Bakground_warmer.jpg, new_old_logo.png
- Restored Hero.tsx, Services.tsx, Header.tsx, Footer.tsx, css/index.css, App.tsx to pre-cleanup versions
- Fixed nav: deduplicated Bilar till salu link (was `#kontakt`, now `#alla-tjanster`)
- Created CLAUDE.md, instructions.md, AGENTS.md

---

## How to update this file

At the end of your session, update **two sections**:

1. **Current state** — rewrite it to reflect reality now. Remove things that are fixed. Add new broken things.
2. **Session log** — append a new entry at the top of the log with: date, agent name/model, bullet list of what was done.

Keep entries factual and short. Future agents need to understand what changed, not why.
