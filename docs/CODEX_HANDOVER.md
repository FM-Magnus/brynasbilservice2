# Codex Handoff — Brynäs Bilservice

Updated **2026-09-15** by Codex. This is a continuation guide, not a substitute for inspecting the live worktree.
This document prepares Codex (or any incoming AI assistant) to seamlessly continue frontend development on Brynäs Bilservice.

---

## 1. Quick Start & Repo Reality

- **Repository path:** `/Users/magnusolsson/Documents/REPOS/brynasbilservice_repo`
- **Active working branch:** `redesign/blue-teal-v1`
- **Branch status:** The last known pushed baseline is `05b9f34f`. On 2026-09-15, the local branch was ahead by one commit with intentional, uncommitted frontend, documentation and image-inbox work. Run `git status --short --branch` before any action; do not assume this handoff remains current.
- **Push rule:** **STRICT RULE: Never run `git push` without Magnus's explicit prior approval.**
- **Frontend location:** `client/` (React 18, Vite 4, TypeScript, Tailwind CSS 3).
  - Build command: `npm --prefix client run build`
  - Dev server: `npm --prefix client run dev` (runs on `http://localhost:5173/` or `5174`)
  - **Root files warning:** Root `package.json`, `vite.config.ts`, `tsconfig.json`, and `index.html` are orphaned legacy scaffolding. Never edit, install, or build from the root repository directory.
- **Backend location:** `server/` (Node 16 CommonJS Express 4 + MySQL via `mysql2`).
  - **Ownership boundary:** Backend files (`server/index.js`, `server/database/schema.sql`, `server/.htaccess`, `server/.env`) are owned by Johnny (Magnus's brother). **Do NOT touch or modify server files.**
  - Local API returns 500 without the MySQL SSH tunnel (`ssh -i ~/.ssh/fenrirm -L 3306:localhost:3306 -N -f fenrirm@194.14.207.224`), which is expected during local UI work.

---

## 2. Visual System & Code Conventions

- **Typography:** Two-tier typography via centralized CSS tokens in `client/src/css/index.css`:
  - Display headings: `var(--font-heading)` (**Archivo 800**, uppercase or sentence case per section).
  - Body & UI controls: `var(--font-body)` (**Manrope 400–500** body, **600–700** badges/controls/buttons).
- **Color tokens:**
  - Page background: warm-white `#f8f7f3` (`var(--redesign-page)`).
  - Contained dark cards: `#101618` (`var(--redesign-card)` or direct hex). For ordinary content, dark styling stays contained; the established shared service-page hero is the intentional exception.
  - Teal accent: `var(--redesign-accent)` (`#2496a0`) and dark accent `var(--redesign-accent-dark)` (`#1b727a`).
  - Strict color prohibition: No gold, amber, or red accents (gold/yellow is only allowed on the Google Maps review badge).
- **Key UI components:**
  - `BookingFormModal` (`client/src/components/BookingForm.tsx`): opens via local `isModalOpen` state and `openModal` callback.
  - Shared phone link: `070-553 33 95` via `<a href="tel:0705533395">`.
  - Shared FAQ accordion: `client/src/components/ui/BiltjansterFaq.tsx` used across all Biltjänster customer guide pages.
  - Section eyebrows (`.section-eyebrow`) are hidden site-wide via `display: none !important;` in `index.css`.
  - Responsive standard: **0 px horizontal overflow** across 1440px desktop, 768px tablet, and 390px mobile.

---

## 3. Current Route & Service Page Map

All public routes are registered in `client/src/main.tsx` and dropdown navigation in `client/src/components/Header.tsx`:

| Route | Component | Status | Details |
| --- | --- | --- | --- |
| `/` | `App.tsx` | Active | Landing page: Header → Hero (with GoogleReviews band) → ContactIntro → EV (Workshop process "Så fungerar det") → About → Services (preview) → Contact (combined closing card) → Footer |
| `/om-oss` | `AboutPage.tsx` | Implemented | Local workshop facts, 4-photo gallery, reassurance cards, 3-step process, closing CTA |
| `/biltjanster` | `BiltjansterPage.tsx` | Active hub | “Våra biltjänster”: linked draft-summary cards for the eleven current service guides, with CSS-only image placeholders |
| `/felsokning` | `FelsokningPage.tsx` | Implemented draft | Standalone diagnostic-service entry after Biltjänster in the main navigation; existing diagnostic wording and CSS-only hero placeholder |
| `/service-reparationer#bilservice` | `ServiceReparationerPage.tsx` | Implemented | Long-form Bilservice guide, service levels, process, pricing CTA |
| `/oljebyte` | `OljebytePage.tsx` | Implemented | Oil change basics, oil standards, intervals, checklist, shared FAQ |
| `/kamrem` | `KamremPage.tsx` | Implemented | Timing belt vs chain, warning signs, checklist, shared process & FAQ |
| `/koppling` | `KopplingPage.tsx` | Implemented | Clutch guide, warning signs, checklist, draft guidance, shared FAQ |
| `/bromssystem` | `BromssystemPage.tsx` | Implemented | Brake system overview, warning signs, checklist, shared FAQ |
| `/bilbatteri` | `BilbatteriPage.tsx` | Implemented | Battery types (standard/EFB/AGM), warning signs, checklist, shared FAQ |
| `/stodampare-fjadrar` | `StodampareFjadrarPage.tsx` | Implemented | Shocks & springs, strut assembly, warning signs, checklist, shared FAQ |
| `/hjullagerbyte` | `HjullagerbytePage.tsx` | Implemented | Wheel bearings, nav units, ABS sensors, warning signs, checklist, shared FAQ |
| `/avgassystem` | `AvgassystemPage.tsx` | Implemented | Exhaust system, lambda sensors, catalytic converter, checklist, shared FAQ |
| `/drivaxel-drivknutar` | `DrivaxelDrivknutarPage.tsx` | Implemented | Driveshafts, CV joints, rubber boots, warning signs, checklist, shared FAQ |
| `/styrning-kulleder` | `StyrningKullederPage.tsx` | Implemented | Ball joints, tie rods, power steering (EPS/hydraulic), checklist, shared FAQ |
| `/dackservice` | `DackservicePage.tsx` | **Enriched & Verified** | Specialized tire page: Hero → Statutory winter tire dates dark card (1 dec–31 mar, 1 okt–15 apr, 16 apr–30 sep, 3PMSF) → 6-card grid ("Allt för dina hjul") → Reassurance card → Enriched advice prose (1.6/3mm, 3–5mm/4mm, DOT code 6–10y) → Closing CTA. Note: Free Däckkollen card removed per request. |
| `/ac-service` | `AcServicePage.tsx` | **Enriched & Verified** | Specialized AC page: Hero with compressor damage note → 3 symptom cards with 1–2 line technical causes wired to interactive routing → Pricing section with frequency guidance (annual check vs biannual full service with DRAFT GUIDANCE code comment) + 3 pricing cards + R134a/R1234yf note with FACT TO CONFIRM caveat → 4-step process → FAQ → Booking CTA |
| `/bargning` | `BargningPage.tsx` | Implemented | Towing & transport page with direct phone CTA `070-553 33 95` |
| `/bilar-till-salu` | `BilarTillSalu.tsx` | Implemented | Peugeot 307 CC listing, 3-photo interactive gallery, trust badges, closing CTA |
| `/kontakt` | `ContactPage.tsx` | Implemented | Contact information, verified opening hours, inquiry form |
| `/admin` | Protected | Operational | Booking management, service CRUD, soft-delete, search/filter |

---

## 4. Key Work Completed in This Session

1. **Current Biltjänster guide pattern:**
   - The guide destinations are implemented across the route map above. `/biltjanster` is now headed “Våra biltjänster” and presents linked draft-summary cards for the current service guides, all with CSS-only future-image placeholders.
   - Each page follows the approved structure:
     1. Hero with Archivo 800 heading, draft lead, `Boka tid` button, `Ring oss` link, and replaceable image placeholder.
     2. "Vad är..." explanatory section with key mechanical context.
     3. Customer benefits in clean readable cards.
     4. Warning signs / symptoms in cards with soft accent icons.
     5. Contained dark card (`#101618`) for "Det här kan vi hjälpa dig med" with teal checkmarks.
     6. "Mer info" guidance section (intervals, technical tips, safety notes) on warm-white surround.
     7. Shared 5-step process card ("Så går det till hos oss").
     8. Shared FAQ accordion (`BiltjansterFaq.tsx`) populated with page-specific Q&A.
     9. Closing dark booking CTA card.
   - Scoped CSS rules added to `client/src/css/index.css`.

2. **Däckservice & Hjulskifte (`/dackservice`):**
   - Implemented statutory winter tire dates card (`.tyres-page__dates`) covering legal dates (1 dec–31 mar, 1 okt–15 apr, 16 apr–30 sep) and the mandatory 3PMSF alpine symbol.
   - Enriched prose in `.tyres-page__advice` with legal minimum tread depths (1.6 mm / 3 mm), recommended replacement depths (3 mm / 3–5 mm / 4 mm), 4-digit DOT date codes, and tire aging limits (6–10 years).
   - Removed the free "Däckkollen" card per Magnus's request, updating the closing CTA button to "Boka tid".
   - Verified 0px horizontal overflow on desktop (1440px) and mobile (390px).

3. **AC-service & Klimatrengöring (`/ac-service`):**
   - Preserved interactive symptom card recommendation routing (sets state, toggles `.is-selected`, reveals feedback note, and pre-fills booking comment).
   - Enriched all 3 symptom cards with concise 1–2 line technical causes (refrigerant loss, evaporator moisture/bacteria justifying AC-rengöring, compressor clutch/bearings).
   - Added compressor damage warning ("why not to wait") to hero lead copy.
   - Added service frequency guidance (annual check vs biannual full service) with a `DRAFT GUIDANCE` code comment.
   - Preserved all 3 prices, card titles, 4-step process, and R134a/R1234yf note with `FACT TO CONFIRM` code comment.
   - Verified 0px horizontal overflow on desktop (1440px) and mobile (390px).

4. **Remote Parity & Git State:**
   - All commits (`15956373` through `05b9f34f`) pushed to `origin/redesign/blue-teal-v1` with Magnus's approval.
   - Working tree is clean.
   - Full build (`npm --prefix client run build`) passes in ~1.8s with 0 errors.

---

## 5. Standard Development Pattern for Incoming Tasks

When Codex receives a new task from Magnus:

1. **Confirm scope and page component:**
   - Locate the target component under `client/src/pages/` or `client/src/components/`.
   - Never create or modify files in the repo root or in `server/`.
2. **Apply Design Tokens & Conventions:**
   - Display headings: `font-heading` (`Archivo`, uppercase or sentence-case).
   - Body/Controls: `font-body` (`Manrope`).
   - Page background: `#f8f7f3` (warm white).
   - Dark cards: `#101618` (contained cards only).
   - Accent color: `#2496a0` (`var(--redesign-accent)`).
   - No arbitrary gold, red, or orange accent colors.
3. **Copywriting & Draft Rules:**
   - **No page copy is final-approved.** Treat all text as draft.
   - **Never copy external text verbatim** from reference folders or competitors. Rephrase and synthesize original Swedish text ("Skriv om varje text litegrann").
   - **Image workflow:** Put raw photography, blue-tone background candidates and non-photographic layout graphics in `_incoming-assets/` first. Read `_incoming-assets/README.md`; image contents there are deliberately ignored by Git. Add only selected, web-exported images to `client/src/assets/images/`.
4. **Verification Checklist:**
   - Run `npm --prefix client run build` to ensure 0 TypeScript or build errors.
   - Check layout on desktop (1440px) and mobile (390px) to guarantee **0 px horizontal overflow**.
5. **Git Policy:**
   - Commit ONLY when Magnus explicitly asks.
   - **NEVER push without Magnus's explicit prior approval.**
