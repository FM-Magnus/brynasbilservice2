# Agent Handoff Log — Brynäs Bilservice

This file is maintained by AI agents (Claude, Codex, Kimi, etc.) and updated at the end of every working session.
**If you are an AI agent starting a session: read this file first.**

---

## Current state (last updated: 2026-05-07 by Claude)

### What is working
- Full frontend renders: Hero, About, Services, ServiceList, WhyUs, EV, CTABanner, Contact, Footer
- Header with new logo (LOGOTYP_NY.svg), sticky scroll, mobile hamburger menu — all nav links work from subpages (`/#om-oss` etc.)
- Booking form modal (DatePicker + TimePicker)
- Admin panel at `/admin` — booking management, service CRUD, soft-delete, search/filter/sort
- i18n context (Swedish/English) — LanguageProvider wraps the whole app in main.tsx
- Dark mode via ThemeSwitcher + localStorage
- Marquee component in hero — content driven from `client/src/data/marquee-items.txt`
- GoogleReviews component in hero — currently shows placeholder data (not real Brynäs reviews)
- **Bilar till salu subpage** at `/bilar-till-salu` — real Peugeot 307 CC listing, 3-photo gallery with thumbnail strip, sold section, empty state
- **6 service cards** — each has its own photo (servicekort_repair/diagnosis/AC/tyres/tow/carbuy.jpg)
- "SE VÅRA BILAR" link on Bilar till salu service card routes correctly to `/bilar-till-salu`

### What is broken / incomplete
1. **GoogleReviews has fake data** — hardcoded from a different business. Needs real Brynäs Bilservice reviews. Screenshots of real reviews are in `_magnus/REVIEWS/` (22 images).
2. **comment_customer not saved** — BookingForm sends it in POST body but `server/index.js` `insertBooking()` does not include it in the INSERT query.
3. **admin comment read-only** — `comment_admin` field is shown in admin modal but cannot be edited or saved.
4. **schema.sql out of sync** — missing columns vs actual DB: `customer_name`, `comment_customer`, `comment_admin`; missing `'erased'` from status ENUM; `service` column is VARCHAR but stores an INT ID. The live DB may be correct — schema file just doesn't reflect it.
5. **SSH keys in project folder** — `client/fenrirm` and `client/fenrirm.pub` should not be here (blocked by .gitignore, but still on disk).
6. **Om oss images** — both main and accent image use `sakar_works.jpg`. Magnus wants to replace them. Main image: 1200×800px (3:2), accent image: 600×400px (3:2).

### Cars for sale (BilarTillSalu.tsx)
- Peugeot 307 CC 2.0, 2006, mörkgrå, 141 147 km, 39 900 kr, nybesiktigad maj 2026
- Photos: `peugeot-307-cc-1/2/3.jpg` (main is -3, side profile shot)
- To add more cars: import photos, add entry to `cars[]` array in `BilarTillSalu.tsx`
- To mark sold: add `sold: true` to the car object

### Section and nav order
Page scroll: Hero → About → Services → ServiceList → WhyUs → EV → CTABanner → Contact
Nav links: Om oss → Tjänster → Bilar till salu → Kontakt

### Recently changed (this session)
- Git repo initialised (`git init`), initial commit `34c858c`
- Mobile hero spacing improved, google-reviews area enlarged
- `.claude/settings.json` Stop hook created to remind agents to update AGENTS.md
- Bilar till salu subpage built with full CSS, route, CarCard gallery (commits `f6b3a74`, `3b1ccf2`)
- Header nav links fixed to use `/#section` for cross-page navigation, logo fixed to `/` (`86f8dfa`)
- Real Peugeot 307 CC listing added, placeholder cars removed (`3e18b1e`)
- 3 Peugeot photos added and wired up with clickable thumbnail strip (`3b1ccf2`)
- "SE VÅRA BILAR" link on service card fixed from `#kontakt` to `/bilar-till-salu` (`7422eb8`)
- All 6 service card images replaced with fitting photos (`b344b59`)

### Files agents should NOT touch
- `server/index.js` — owned by Sakar (Magnus's brother), backend developer
- `server/database/schema.sql` — owned by Sakar
- `server/.env` — credentials, never edit or read aloud

---

## Session log

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
