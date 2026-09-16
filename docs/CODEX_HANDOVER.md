# Codex Handoff — Brynäs Bilservice (historical, 2026-09-15)

**Superseded — kept for historical record only.** `AGENTS.md` contains the bounded startup contract and current constraints; `docs/SESSION_LOG_CURRENT.md` contains new work notes; and `docs/PROJECT_STATUS.md` contains the route table. This file is a point-in-time session recap from 2026-09-15 by Antigravity. Don't treat it as a required read.

Updated **2026-09-15** by Antigravity. This is a continuation guide and source of truth for Codex (or any incoming AI assistant) to seamlessly continue development on Brynäs Bilservice.

---

## 1. Quick Start & Repo Reality

- **Repository path:** `/Users/magnusolsson/Documents/REPOS/brynasbilservice_repo`
- **Active working branch:** `redesign/blue-teal-v1`
- **Branch status:** The last known pushed baseline is `05b9f34f`. The image-library cleanup and Kamrem visual work are local changes on this branch; always verify the live ahead count before acting.
- **Push rule:** **STRICT RULE: Never run `git push` without Magnus's explicit prior approval.**
- **Frontend location:** `client/` (React 18, Vite 4, TypeScript, Tailwind CSS 3).
  - Build command: `npm --prefix client run build` (verified: 0 errors).
  - Dev server: `npm --prefix client run dev` (runs on `http://localhost:5173/`).
  - **Root files warning:** Root `package.json`, `vite.config.ts`, `tsconfig.json`, and `index.html` are orphaned legacy scaffolding. Never edit, install, or build from the root repository directory.
- **Backend location:** `server/` (Node 16 CommonJS Express 4 + MySQL via `mysql2`).
  - **Ownership boundary:** Backend files (`server/index.js`, `server/database/schema.sql`, `server/.htaccess`, `server/.env`) are owned by Johnny (Magnus's brother). **Do NOT touch or modify server files.**
  - Local API returns 500 without the MySQL SSH tunnel (`ssh -i ~/.ssh/fenrirm -L 3306:localhost:3306 -N -f fenrirm@194.14.207.224`), which is expected during local UI work.
- **Verification standard:** Strict **0 px horizontal overflow** across 1440px desktop, 768px tablet, and 390px mobile viewports.

---

## 2. Work Completed in This Session (Antigravity)

### 1. Maher Basher Intro Copy, Consumer Law Proof & Portrait (`AboutPage.tsx` at `/om-oss`)
- Committed as `6af5dc8b`.
- Added introduction copy for the owner, **Maher Basher** (often referred to as Maher or Shomaher in customer reviews).
- Added consumer law reassurance paragraph (följer konsumenttjänstlagen: arbetet påbörjas inte förrän fast pris/kostnadsförslag godkänts och priset får inte överskridas med mer än 15 %).
- Integrated an authentic, optimized 1:1 portrait card beside the Maher copy and above the facts box:
  - `client/src/assets/images/people/maher-basher-portrait.webp` (127 kB) with JPG fallback (157 kB).
- Left clean JSX TODO comments for future staff presentation and gallery expansion.

### 2. Dedicated Workshop Gallery Subpage (`GalleryPage.tsx` at `/galleri`)
- Built dedicated gallery page at `client/src/pages/GalleryPage.tsx` registered as `/galleri` in `client/src/main.tsx`.
- Features dark hero (`Bilder & Verkstadsmiljö`, `Bilder från Brynäs Bilservice`), dual `Boka tid` / `Ring` CTAs, an image-first viewer with a full-size selected asset, horizontal thumbnail carousel, previous/next controls, mouse-wheel/trackpad scrolling, track dragging and Arrow-key navigation, plus the closing dark CTA card and `BookingFormModal`.
- The viewer deliberately excludes customer reception, portrait, handover and every people-containing image. It uses eleven visually reviewed no-people workshop views, each with a 1920px WebP/JPG main pair and a matching 640px thumbnail pair; see `_incoming-assets/ASSET_INVENTORY.md` for the exact mapping.

### 3. Gallery Teaser CTA Button on `/om-oss`
- Committed as `97cb0817`.
- Replaced the old 4-card gallery block on `AboutPage.tsx` with a stylish, centered teal pill CTA button:
  `"Ta en titt bakom garageportarna – välkommen in i vårt bildgalleri"` linking directly to `/galleri`.
- Cleaned up unused image imports and arrays from `AboutPage.tsx` (the photos live on the dedicated `/galleri` page).
- Styled in `client/src/css/index.css` with hover lift, subtle arrow transition, and responsive text wrapping on mobile (390px).

### 4. Reusable `GalleryTeaserCard.tsx` on Homepage
- Committed as `eb6ccb1c`.
- Built standalone, reusable component in `client/src/components/ui/GalleryTeaserCard.tsx`.
- The entire card is an interactive link (`<a>` pointing to `/galleri`) with hover zoom (`scale(1.03)`), shadow deepening, and focus-visible ring.
- Contains:
  1. `KenBurnsSlideshow` cycling 4 sharp, lightweight workshop thumbnails.
  2. Frosted glass badge in top-left: `"Grundat 2021"`.
  3. Organic bottom-right corner cutout (`background: var(--redesign-page); border-top-left-radius: 20px;`) displaying active slide dots, uppercase `"TILL GALLERIET"` text, and circular arrow badge with slide hover animation (`translateX(3px)`).
- Integrated into `client/src/components/sections/About.tsx` replacing inline slideshow markup.

### 5. Complete image-library organization
- Committed as `eb6ccb1c`.
- Production assets are grouped by purpose, while source, legacy and documentation images stay visibly separate. The authoritative map is `_incoming-assets/ASSET_INVENTORY.md`.
- The eleven production gallery images are in `client/src/assets/images/gallery/workshop/`: every basename has a 1920px WebP/JPG main pair and a 640px `-thumb` WebP/JPG pair.
- `GalleryTeaserCard.tsx` imports six dedicated 1280px overview `-card.webp` exports strictly from `../../assets/images/gallery/workshop/`; tire-machine/workbench detail views are intentionally excluded. The 640px `-thumb` files are reserved for the compact carousel, while the large viewer and the `/om-oss` hero import only 1920px main files.
- Historical image exports are grouped under `client/src/assets/images/archive/` by actual subject, including `gallery-legacy/` and `brand/`; no production code imports this tree.
- **Zero dependencies or import references** to the temporary, Git-ignored `_incoming-assets/` folder in production code.

---

## 3. Visual System & Code Conventions

- **Typography:** Centralized CSS tokens in `client/src/css/index.css`:
  - Headings: `var(--font-heading)` (**Archivo 800**).
  - Body & UI: `var(--font-body)` (**Manrope 400–500** body, **600–700** controls/badges/buttons).
- **Color tokens:**
  - Page surround: warm-white `#f8f7f3` (`var(--redesign-page)`).
  - Dark cards: `#101618` (`var(--redesign-card)` or direct hex). Keep dark styling contained; never make the whole page dark.
  - Teal accent: `var(--redesign-accent)` (`#2496a0`) and hover `var(--redesign-accent-dark)` (`#1b727a`).
  - No arbitrary gold/red/orange accent colors (gold is strictly reserved for the Google review star block).
- **Interactive UI components:**
  - `BookingFormModal` (`client/src/components/BookingForm.tsx`): opens via local `isModalOpen` state.
  - Shared phone link: `070-553 33 95` via `<a href="tel:0705533395">`.
  - Section eyebrows (`.section-eyebrow`) remain hidden site-wide via `display: none !important;` in `index.css`.
- **Accessibility & Motion:**
  - Always respect `prefers-reduced-motion: reduce`.
  - All interactive buttons and links must have visible focus rings (`:focus-visible`).

---

## 4. Complete Route & Page Map

| Route | Component | Purpose / Status | Key Features |
| --- | --- | --- | --- |
| `/` | `App.tsx` | Landing page | Header → Hero (with GoogleReviews band) → ContactIntro → Process ("Så fungerar det") → About (with `GalleryTeaserCard`) → Services preview → Contact → Footer |
| `/om-oss` | `AboutPage.tsx` | About page | Hero → Local workshop section with Maher copy & portrait card → 3-step process → Gallery CTA button (*"Ta en titt bakom garageportarna..."*) → Closing CTA |
| `/galleri` | `GalleryPage.tsx` | Dedicated Gallery | Dark hero → full-size image viewer with accessible thumbnail carousel → Closing dark CTA card → Booking modal |
| `/biltjanster` | `BiltjansterPage.tsx` | Biltjänster hub | "Våra biltjänster": linked draft summary cards for 11 service guides with CSS placeholders |
| `/felsokning` | `FelsokningPage.tsx` | Diagnostics | Standalone diagnostic service entry with symptom checklist & placeholder |
| `/service-reparationer#bilservice` | `ServiceReparationerPage.tsx` | Bilservice guide | Long-form Bilservice content, service levels, process, pricing CTA |
| `/oljebyte` | `OljebytePage.tsx` | Oil change guide | Oil standards, intervals, service checklist, expandable FAQ |
| `/kamrem` | `KamremPage.tsx` | Timing belt guide | Image-led precision hero, belt vs chain, numbered system cards, warning signs, checklist, shared process & FAQ |
| `/koppling` | `KopplingPage.tsx` | Clutch guide | Clutch components, symptoms, checklist, shared FAQ |
| `/bromssystem` | `BromssystemPage.tsx` | Brake guide | Brake overview, warning signs, checklist, shared FAQ |
| `/bilbatteri` | `BilbatteriPage.tsx` | Battery guide | Battery types (standard/EFB/AGM), advice, shared FAQ |
| `/stodampare-fjadrar` | `StodampareFjadrarPage.tsx` | Shocks & springs | Shocks, springs, bounce test tip, broken spring note, FAQ |
| `/hjullagerbyte` | `HjullagerbytePage.tsx` | Wheel bearing guide | Nav units, ABS sensors, warning signs, safety note, FAQ |
| `/avgassystem` | `AvgassystemPage.tsx` | Exhaust guide | Silencers, catalytic converter, lambda sensors, FAQ |
| `/drivaxel-drivknutar` | `DrivaxelDrivknutarPage.tsx` | Driveshaft guide | CV joints, rubber boots, warning signs, safety note, FAQ |
| `/styrning-kulleder` | `StyrningKullederPage.tsx` | Steering guide | Ball joints, tie rods, EPS/hydraulic power steering, FAQ |
| `/dackservice` | `DackservicePage.tsx` | Tire service | Statutory winter dates card (1 dec–31 mar, 3PMSF), 6 service cards with pricing, tread depth advice prose |
| `/ac-service` | `AcServicePage.tsx` | AC service | Compressor damage warning, 3 interactive symptom cards with routing, 3 pricing cards, R134a/R1234yf note |
| `/bargning` | `BargningPage.tsx` | Towing & transport | Towing service card, direct phone CTA `070-553 33 95`, 3-step transport protocol |
| `/bilar-till-salu` | `BilarTillSalu.tsx` | Cars for sale | Peugeot 307 CC listing, 3-photo gallery, trust badges, closing CTA |
| `/kontakt` | `ContactPage.tsx` | Contact page | Contact card, verified hours, inquiry form with request-only callout |
| `/admin` | Protected | Admin panel | Booking CRUD, service management, soft-delete, filter |

---

## 5. Asset Pipeline & Ingestion Guidelines

1. **Intake (`_incoming-assets/`)**:
   - Temporary local inbox for raw photography and assets. Git-ignored by design.
   - New files belong in `_incoming-assets/incoming/` and are sorted into subject folders (`03_verkstad_och_team/`, etc.).
   - Read `_incoming-assets/README.md` and `_incoming-assets/ASSET_INVENTORY.md`.
2. **Promotion to Production (`client/src/assets/images/`)**:
   - Only when an image is explicitly chosen for a page/component is it exported into `client/src/assets/images/` (or dedicated subfolders like `gallery/`).
   - Standard format: WebP primary (quality 82, compressed) with JPG compatibility fallback when the consuming component supports both.
   - Thumbnails for cards: ~640px wide, < 70 kB.
   - Hero/large images: ~1920px wide, compressed.
   - Current promoted assets documented in `_incoming-assets/README.md`. The `/kamrem` page uses `services/timing-belt/timing-belt-in-hand.webp` with JPG fallback; its source remains in the Kamrem subject folder.

---

## 6. Priority Backlog for Codex

When continuing from here, the following tasks are top priority:

1. **Gallery curation (when new material arrives)**:
   - Keep the full viewer limited to no-people images and create a 1920px WebP/JPG main pair plus matching 640px thumbnail pair before adding a new item. Never use a teaser thumbnail as a full viewer source.
2. **Hero GoogleReviews band height tuning**:
   - If Magnus shortens/curates the long review texts, re-measure `.google-reviews__list` `min-height` and lower the desktop/tablet/mobile height constraints to eliminate dead whitespace.
3. **Problem-solving symptom routes (`/problem/*`)**:
   - Address the architectural research finding: transform company-presenting structure into customer-problem-solving entry points for common symptoms (missljud, vibrationer, varningslampor).
4. **Copywriting & Fact-checking**:
   - All guide text remains draft. Technical intervals and claims should be fact-checked with Maher before live deployment.
