# Codex Handoff — Brynäs Bilservice

Updated **2026-09-14** by Antigravity.
This document prepares Codex to seamlessly continue frontend development on Brynäs Bilservice.

---

## 1. Quick Start & Repo Reality

- **Repository path:** `/Users/magnusolsson/Documents/REPOS/brynasbilservice_repo`
- **Active working branch:** `redesign/blue-teal-v1`
- **Branch status:** Ahead of `origin/redesign/blue-teal-v1`. **Strict rule: DO NOT PUSH to remote without Magnus's explicit prior approval.**
- **Frontend location:** `client/` (React 18, Vite 4, TypeScript, Tailwind 3).
  - Build command: `npm --prefix client run build`
  - Dev server: `npm --prefix client run dev` (runs on `http://localhost:5173/` or `5174`)
  - **Root files warning:** Root `package.json`, `vite.config.ts`, and `index.html` are orphaned legacy scaffolding. Never edit or build from the root directory.
- **Backend location:** `server/` (Node 16 CommonJS Express 4 + MySQL via `mysql2`).
  - **Ownership boundary:** Backend files (`server/index.js`, `server/database/schema.sql`, `server/.htaccess`, `server/.env`) are owned by Johnny (Magnus's brother). **Do NOT touch or modify server files.**
  - Local API returns 500 without the MySQL SSH tunnel (`ssh -i ~/.ssh/fenrirm -L 3306:localhost:3306 -N -f fenrirm@194.14.207.224`), which is expected during local UI work.

---

## 2. Visual System & Code Conventions

- **Typography:** Two-tier typography via centralized CSS tokens:
  - Display headings: `var(--font-heading)` (**Archivo 800**, uppercase or sentence case per section).
  - Body & UI controls: `var(--font-body)` (**Manrope 400–500** body, **600–700** badges/controls/buttons).
- **Color tokens:**
  - Page background: warm-white `#f8f7f3` (`var(--redesign-page)`).
  - Contained dark cards: `#101618` (`var(--redesign-card)` or direct hex) — dark mode is contained in cards, never full-viewport black on public pages.
  - Teal accent: `var(--redesign-accent)` (`#2496a0`) and dark accent `var(--redesign-accent-dark)` (`#1b727a`).
  - No gold, amber, or red accents (gold/yellow is only allowed on the Google Maps review badge).
- **Key UI components:**
  - `BookingFormModal` (`client/src/components/BookingForm.tsx`): opens via `isModalOpen` state and `openModal` callback.
  - Shared phone number: `070-553 33 95` via `tel:0705533395`.
  - Shared FAQ accordion: `client/src/components/ui/BiltjansterFaq.tsx` used across Biltjänster guide pages.
  - Section eyebrows (`.section-eyebrow`) are hidden site-wide via `display: none !important;` in `index.css`.

---

## 3. Current Route & Service Page Map

All routes are registered in `client/src/main.tsx`:

| Route | Component | Status | Details |
| --- | --- | --- | --- |
| `/` | `App.tsx` | Active | Landing page: Header → Hero (with GoogleReviews band) → ContactIntro → EV (Workshop process "Så fungerar det") → About → Services (preview) → Contact (combined closing card) → Footer |
| `/om-oss` | `AboutPage.tsx` | Implemented | Local workshop facts, 4-photo gallery, reassurance cards, 3-step process, closing CTA |
| `/biltjanster` | `BiltjansterPage.tsx` | Active Hub | Default Biltjänster destination with repair & diagnostics cards |
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
| `/dackservice` | `DackservicePage.tsx` | **Updated this session** | Specialized tire page: Hero → Statutory winter tire dates dark card (1 dec–31 mar, 1 okt–15 apr, 16 apr–30 sep, 3PMSF) → 6-card grid ("Allt för dina hjul") → Legacy reassurance card → Enriched advice prose (1.6/3mm, 3–5mm/4mm, DOT code 6–10y) → Closing CTA. Note: Däckkollen card removed per request. |
| `/ac-service` | `AcServicePage.tsx` | **Updated this session** | Specialized AC page: Hero with compressor damage note → 3 symptom cards with 1–2 line technical causes wired to interactive routing → Pricing section with frequency guidance (annual check vs biannual full service with DRAFT GUIDANCE code comment) + 3 pricing cards + R134a/R1234yf note with FACT TO CONFIRM caveat → 4-step process → FAQ → Booking CTA |
| `/bargning` | `BargningPage.tsx` | Implemented | Towing & transport page with direct phone CTA `070-553 33 95` |
| `/bilar-till-salu` | `BilarTillSalu.tsx` | Implemented | Peugeot 307 CC listing, 3-photo interactive gallery, trust badges, closing CTA |
| `/kontakt` | `ContactPage.tsx` | Implemented | Contact information, verified opening hours, inquiry form |
| `/admin` | Protected | Operational | Booking management, service CRUD, soft-delete, search/filter |

---

## 4. Key Work Completed in This Session

1. **Däckservice & Hjulskifte (`/dackservice`):**
   - Implemented the statutory winter tire dates card (`.tyres-page__dates`) styled identically to the dark highlight cards with teal checkmarks.
   - Enriched the prose in `.tyres-page__advice` with legal minimum tread depths (1.6 mm / 3 mm), practical safety replacement depths (3 mm / 3–5 mm / 4 mm), and reading 4-digit DOT codes (vecka/år, t.ex. 2421) and tire aging limits (6–10 years).
   - Removed the free "Däckkollen" card per Magnus's explicit request, updating closing button text to "Boka tid".
   - Held unplaced conditional items (tire dimensions `205/55 R16` and stud-vs-friction comparison) because this page has no FAQ section.
   - Verified 0px overflow across desktop (1440px) and mobile (390px).

2. **AC-service & Klimatrengöring (`/ac-service`):**
   - Investigated "Välj för rekommendation": confirmed it is wired to interactive React state (`recommendation`) which toggles `.is-selected`, displays a recommendation feedback line, and pre-fills `initialComment` for `BookingFormModal`.
   - Populated each of the 3 symptom cards with concise 1–2 line technical causes (poor cooling/fogging → low refrigerant/clogged condenser/fan; foul smell → evaporator moisture & bacterial buildup explicitly justifying why AC-rengöring is a separate service; noises → bearings/compressor clutch/system pressure).
   - Added compressor damage warning ("why not to wait") to the hero copy near the 3 trust badges.
   - Added frequency guidance intro line to the pricing section (lighter annual check vs full biannual service) with a `DRAFT GUIDANCE` code comment.
   - Preserved all 3 prices, card titles, 4-step process, and the R134a/R1234yf note with a `FACT TO CONFIRM` code comment.
   - Verified 0px overflow across 1440px and 390px.

---

## 5. Important Guidelines for Codex

1. **Copy Approval Status:**
   - **No page copy is final-approved yet.** All text is work-in-progress draft. Keep copy natural, professional Swedish, but do not state that copy is locked or verified with the workshop unless Magnus explicitly says so.
2. **Copywriting Sourcing Rule:**
   - Magnus has reference material (competitor pack `/Users/magnusolsson/Documents/varverkstad-2026-09-09/` and commissioned copy). **Never copy sentences verbatim.** Synthesize themes and write original Swedish phrasing ("Skriv om varje text litegrann").
3. **Responsive Quality Standard:**
   - Every page must maintain **0 px horizontal overflow** across 1440px desktop, 768px tablet, and 390px mobile.
   - Check using `npm --prefix client run build` and browser/CDP testing before reporting.
4. **Git Workflow:**
   - Work on `redesign/blue-teal-v1`.
   - Commit only when Magnus explicitly asks for it.
   - **Never push without explicit permission from Magnus.**
