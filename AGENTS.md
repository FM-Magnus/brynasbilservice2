# Agent Handoff Log — Brynäs Bilservice

This file is maintained by AI agents (Claude, Codex, Kimi, etc.) and updated at the end of every working session.
**If you are an AI agent starting a session: read this file first.**

---

## Current state (last updated: 2026-05-07 by Claude)

### What is working
- Full frontend renders: Hero, About, Services, ServiceList, WhyUs, EV, CTABanner, Contact, Footer
- Header with new logo (LOGOTYP_NY.svg), sticky scroll, mobile hamburger menu
- Booking form modal (DatePicker + TimePicker)
- Admin panel at `/admin` — booking management, service CRUD, soft-delete, search/filter/sort
- i18n context (Swedish/English) — LanguageProvider wraps the whole app in main.tsx
- Dark mode via ThemeSwitcher + localStorage
- Marquee component in hero — content driven from `client/src/data/marquee-items.txt`
- GoogleReviews component in hero — currently shows placeholder data (not real Brynäs reviews)
- **Bilar till salu subpage** at `/bilar-till-salu` — CarCard grid, sold section, empty state, full CSS

### What is broken / incomplete
1. **GoogleReviews has fake data** — hardcoded from a different business. Needs real Brynäs Bilservice reviews. Screenshots of real reviews are in `_magnus/REVIEWS/` (22 images).
2. **comment_customer not saved** — BookingForm sends it in POST body but `server/index.js` `insertBooking()` does not include it in the INSERT query.
3. **admin comment read-only** — `comment_admin` field is shown in admin modal but cannot be edited or saved.
4. **schema.sql out of sync** — missing columns vs actual DB: `customer_name`, `comment_customer`, `comment_admin`; missing `'erased'` from status ENUM; `service` column is VARCHAR but stores an INT ID. The live DB may be correct — schema file just doesn't reflect it.
5. **SSH keys in project folder** — `client/fenrirm` and `client/fenrirm.pub` should not be here (blocked by .gitignore, but still on disk).
6. **Car images missing** — BilarTillSalu cars use SVG placeholder; real photos need to be added to `client/src/assets/images/` and set in the `cars` array in `BilarTillSalu.tsx`.

### Section and nav order
Page scroll: Hero → About → Services → ServiceList → WhyUs → EV → CTABanner → Contact
Nav links: Om oss → Tjänster → Bilar till salu → Kontakt (Bilar till salu now routes to `/bilar-till-salu`)

### Recently changed (this session)
- Git repo initialised (`git init`), initial commit `34c858c`, mobile hero CSS fix committed
- Bilar till salu subpage built: `client/src/pages/BilarTillSalu.tsx` + CSS + route + nav link (commit `f6b3a74`)
- Header nav "Bilar till salu" now points to `/bilar-till-salu` (was `#alla-tjanster`)
- Header nav section links changed to `/#om-oss` etc. so they work from subpages (commit `86f8dfa`)
- Header logo link changed from `#` to `/`
- Mobile hero spacing improved: `justify-content: space-between`, bigger google-reviews area
- `.claude/settings.json` Stop hook created to remind agents to update AGENTS.md

### Files agents should NOT touch
- `server/index.js` — owned by Sakar (Magnus's brother), backend developer
- `server/database/schema.sql` — owned by Sakar
- `server/.env` — credentials, never edit or read aloud

---

## Session log

### 2026-05-07 — Claude (claude-sonnet-4-6)
- Built Bilar till salu subpage: `client/src/pages/BilarTillSalu.tsx` (CarCard component, 3 placeholder cars, sold section, empty state)
- Added full CSS block for `.cars-page__*`, `.cars-grid`, `.car-card*` to `client/src/css/index.css`
- Added `/bilar-till-salu` route to `client/src/main.tsx`
- Updated Header.tsx nav: "Bilar till salu" now links to `/bilar-till-salu` instead of `#alla-tjanster`
- Fixed Header nav section links to use `/#om-oss`, `/#tjanster`, `/#kontakt` (were bare anchors, broke on subpages)
- Fixed Header logo link from `#` to `/`
- Build verified clean (0 errors), committed as `f6b3a74`, nav fix as `86f8dfa`
- AGENTS.md updated

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
