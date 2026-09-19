# Rebuilding Brynäs Bilservice — Human-in-the-Loop (HITL) Roadmap

**Document Owner**: Magnus Olsson  
**Document Name**: `HITL_Temporary_roadmap.md`  
**Active Working Branch**: `redesign/blue-teal-v1`  
**Local Dev Server**: `http://localhost:5173/`

---

### Critical Agent Primer (For New Chats & Fresh Agent Contexts)

If you are a new AI agent (Antigravity, Codex, Claude) or continuing in a fresh conversation context:
1. **WHAT THIS DOCUMENT IS**: This is the authoritative, Human-in-the-Loop (HITL) strategic command roadmap for the ground-up rebuild of Brynäs Bilservice. It outlines the exact architecture, the 7 fully unique standalone pages, the 2 shared service-page families, the step-by-step phased execution plan, review criteria for Magnus, and agent steering prompts.
2. **WHY IT IS THERE**: To prevent cognitive drift across agent switches or new context windows. It ensures every agent builds strictly according to Magnus's page architecture using canonical design tokens (`--bb-*`), standalone public shells (`PublicHeader`, `PublicFooter`), and isolated CSS islands — preventing any agent from inventing rogue styles or touching legacy code.
3. **WHY IT IS TEMPORARY**: This document exists *only* during the transition phase from the legacy monolithic stylesheet (`client/src/css/index.css`) to the new modular architecture. Once all routes are rebuilt on their designated archetype and `index.css` is completely deleted from the project, this temporary roadmap will have fulfilled its purpose and will be archived into `docs/archive/`.

---

## 1. Executive Summary & The Core Strategy

### The Problem
The legacy site is trapped in a 7,500+ line bloated stylesheet (`client/src/css/index.css`). It mixes legacy layout hacks, Tailwind utility conflicts, hardcoded colors, and tangled page dependencies. Editing anything there risks breaking five other pages simultaneously.

### The Solution: Rebuild from the Ground Up as Unique Pages + Two Service Families
Rather than trying to "clean up" the old CSS file, we leave `index.css` completely frozen behind a pre-commit hook. We are building a modern, modular site alongside it using **self-contained CSS islands**.

**Revised 2026-09-18**: The site does not fit a symmetrical "7 archetypes with parent/child styles" model. Content analysis of each page showed most of them are too divergent from one another to share a template honestly. The architecture is now:

- **7 fully unique, standalone pages** — each gets its own bespoke design and its own CSS island. Nothing shared between them beyond the Level 0 Canonical Core.
- **2 shared service-page families** — the only page groups where a genuinely reusable template makes sense, because the pages within each group are structurally the same kind of content (a service hub, or a technical repair guide).

Once all pages are rebuilt on their designated identity, `index.css` has zero active callers and is simply **deleted**.

---

## 2. The Architecture (Visual Intent & Role)

```text
================================================================================
LEVEL 0: CANONICAL GLOBAL LAYER & PUBLIC SHELL (Single Source of Truth)
  • client/src/styles/design-tokens.css (--bb-* tokens: colors, type, spacing, radii)
  • client/src/data/publicNavigation.ts  (Canonical menu registry)
  • PublicHeader.tsx / PublicHeader.css (Standalone sticky/portal header)
  • PublicFooter.tsx / PublicFooter.css (Standalone global automotive footer)
  • GalleryTeaserCard.tsx / GalleryTeaserCard.css (Standalone workshop slideshow card)
  • GoogleReviewsCard.tsx / GoogleReviewsCard.css (Standalone Google reviews badge/card)
  • ContactFormCard.tsx / ContactFormCard.css (Standalone contact module & form card)
================================================================================
                                │
        ┌───────────┬───────────┬───────────┬───────────┬───────────┬───────────┐
        ▼           ▼           ▼           ▼           ▼           ▼           ▼
   Startsidan    Om oss      Kontakt     Bärgning   Bilar till    Galleri   Biltjänster
      (/)      (/om-oss)  (/kontakt)  (/bargning)   salu       (/galleri)  (/biltjanster)
                                                  (/bilar-till-salu)
   Each of the 7 pages above is FULLY UNIQUE — its own bespoke design, its
   own colocated CSS island, own class prefix. No shared page template.
                                │
                ┌───────────────┴───────────────┐
                ▼                                ▼
   ┌─────────────────────────┐      ┌─────────────────────────────┐
   │ "BILSERVICE" FAMILY     │      │ "GUIDE" FAMILY               │
   │ (shared template)       │      │ (shared template)            │
   ├─────────────────────────┤      ├─────────────────────────────┤
   │ • Bilservice (parent)   │      │ • Koppling                   │
   │ • Felsökning            │      │ • Avgassystem                │
   │ • Däckservice           │      │ • Oljebyte                   │
   │ • AC-service             │      │ • Bromssystem                 │
   │                          │      │ • Kamrem                     │
   │ CSS owner:               │      │ • Bilbatteri                 │
   │ ServiceReparationerPage  │      │ • Stötdämpare & fjädrar      │
   │ .css (.bilservice__*)    │      │ • Hjullagerbyte               │
   │                          │      │ • Styrning & kulleder        │
   │                          │      │ • Drivaxel & drivknutar      │
   │                          │      │                               │
   │                          │      │ CSS owner: ServiceGuide-     │
   │                          │      │ Template.css (.service-guide__*) │
   └─────────────────────────┘      └─────────────────────────────┘
```

### What Each Group Actually Means:
1. **Canonical Core**: The global glue. Colors, fonts (Archivo display + Manrope body), standard button radii, and the standalone Header/Footer shell that frames every page.
2. **The 7 unique pages**: Startsidan, Om oss, Kontakt, Bärgning, Bilar till salu, Galleri, and Biltjänster. Each has diverged enough in content and purpose (brand storytelling vs. conversion form vs. towing dispatch vs. vehicle inventory vs. photo showcase vs. service directory) that forcing a shared template would mean fighting the content instead of presenting it well. Each owns its own colocated `<PageName>.css` with a unique class prefix.
3. **"Bilservice" family**: The major service-hub pages — automotive editorial tone, high-trust tier packages (Brons/Silver/Guld), deep technical breakdown, transparent pricing, reassuring owner-first messaging. Structurally the same kind of page (a service line's dedicated hub), so one shared identity is honest, not forced.
4. **"Guide" family**: The technical repair-guide pages — precision symptom breakdowns, checklists, repair timelines, warning cues (amber/teal). All ten guides are the same kind of content (single-component deep-dive), so they share one template rather than getting split into two near-identical templates.

---

## 3. Step-by-Step HITL Execution Plan

Use this section to know **what the agent is doing**, **what you need to review/decide**, and **what prompt to give next**.

---

### Step 1: Lock the Reference Standard (Landing Page) `[COMPLETED & LOCKED]`
- **Status**: Completed. Landing page spacing, typography hierarchy, hero contrast overlay, cyclic Google review badge (4.3 / 50 reviews), and responsive layout are locked as the visual benchmark. Landing is itself one of the 7 unique pages — it does not have "children" that inherit its template.
- **Verification**: Verified via Playwright across 1440px, 768px, and 390px with zero horizontal overflow.

---

### Step 2: Extract Canonical Tokens & Build Standalone Public Shell Elements `[COMPLETED & LOCKED]`
- **Status**: Completed.
  - Promoted universal `--bb-*` design tokens into `client/src/styles/design-tokens.css` (colors, Archivo 800 display, Manrope body, amber accent `#f09505`, spacing, `--bb-wrap-max: 1320px`).
  - Built standalone `PublicFooter.tsx` and `PublicFooter.css`, `PublicHeader.tsx` and `PublicHeader.css`.
  - Extracted standalone `GalleryTeaserCard.tsx`, `GoogleReviewsCard.tsx`, and `ContactFormCard.tsx` as shared, reusable components — these stay shared regardless of which unique page or family uses them.
  - Mounted on `LandingPage.tsx` and pruned redundant legacy CSS.
- **Verification**: Verified via Playwright at 1440px, 768px, and 390px with zero horizontal overflow; 0 lines added to `index.css`.

---

### Step 3: Build Om oss & Kontakt as Unique Pages `[COMPLETED & LOCKED]`
- **Why this order**: These are the two most-trafficked pages after the landing page, and their content (personal brand story, direct contact/booking) is closest in tone to the landing page's proof already built — but each still needs its own dedicated visual identity and CSS island, not a shared "Style 1" template.
- **Status**:
  - **`/kontakt` (COMPLETE)**: Rebuilt from scratch (`ContactPage.tsx` + dedicated `ContactPage.css`, `.kontakt-page__*`). Mounted `<PublicHeader />` (overlay) and `<PublicFooter />`, integrated `<ContactFormCard />`, direct phone CTA, Google Maps card, verified hours. Playwright verified across 1440, 768, 390 with $\Delta = 0\text{px}$ overflow.
  - **`/om-oss` (COMPLETE)**: Rebuilt from scratch (`AboutPage.tsx` + dedicated `AboutPage.css`, `.omoss-page__*`). Authentic Maher Basher portrait, company transparency, "15%-regeln" consumer proof, workshop history, `<GalleryTeaserCard />`. Mounted `<PublicHeader />` and `<PublicFooter />`. Playwright verified across 1440, 768, 390 with $\Delta = 0\text{px}$ overflow.
- **Verification**: Verified via Playwright at 1440px, 768px, and 390px with zero horizontal overflow; 0 lines added to `index.css`.

---

### Step 4: Roll Out the "Bilservice" Family `[COMPLETED & LOCKED]`
- **Why this order**: Bilservice (`/service-reparationer`) already had its standalone `.bilservice__*` CSS island. By mounting the new PublicHeader/Footer on Bilservice and aligning its tokens, it became the shared identity for the other three service-hub pages.
- **Status (4 / 4 Complete — 100% Rebuilt & Locked)**:
  - **`Bilservice` (COMPLETE)**: Parent owner on `--bb-*` tokens and `.bb-hero` layout system, mounts `<PublicHeader />` and `<PublicFooter />`.
  - **`Felsökning` (COMPLETE)**: Rebuilt on `ServiceReparationerPage.css` (`.bilservice__*`), mounts `<PublicHeader />` and `<PublicFooter />`, interactive symptom selector, OBD code readout, 0 errors typecheck and Playwright verified ($\Delta = 0\text{px}$).
  - **`Däckservice` (COMPLETE)**: Rebuilt on `ServiceReparationerPage.css` (`.bilservice__*`), mounts `<PublicHeader />` and `<PublicFooter />`, 6 tire service cards with photos & exact pricing, legal requirements banner, däckhotell card, 0 errors typecheck and Playwright verified ($\Delta = 0\text{px}$).
  - **`AC-service` (COMPLETE)**: Rebuilt on `ServiceReparationerPage.css` (`.bilservice__*`), mounts `<PublicHeader />` and `<PublicFooter />`, interactive symptom selector with booking feedback, 3 pricing cards with exact pricing & caveats, manometer photo split card, process steps, tips, FAQs, 0 errors typecheck and Playwright verified ($\Delta = 0\text{px}$).
- **Verification**: All 4 pages verified via Playwright at 1440px, 768px, and 390px with zero horizontal overflow; transitional CSS (`AcServicePage.css`, `DackservicePage.css`) deleted; 0 lines added to `index.css`.

---

### Step 5: Roll Out the "Guide" Family (All 10 Technical Guides) `[COMPLETED & LOCKED]`
- **Why this order**: All ten guides share one single template (`ServiceGuideTemplate.css`). The entire Guide Family is now 100% rebuilt and verified with zero dependency on `index.css`, 100% canonical Level 0 `--bb-*` tokens, Level 1 `.bb-*` shared elements, mixed-case Archivo 800 H1s, zero-specificity reset bug fix, and Playwright verification across all viewports.
- **Status (10 / 10 Guides Complete)**:
  - **`Koppling` (`/koppling`)**: Complete & Second Pass verified.
  - **`Avgassystem` (`/avgassystem`)**: Complete & Second Pass verified.
  - **`Bromssystem` (`/bromssystem`)**: Complete & Second Pass verified.
  - **`Oljebyte` (`/oljebyte`)**: Complete & Second Pass verified (full-page topic blocks wrapped in `.bb-wrap`).
  - **`Kamrem` (`/kamrem`)**: Complete & First Sibling Proof verified via Playwright ($\Delta = 0\text{px}$ overflow).
  - **`Bilbatteri` (`/bilbatteri`)**: Complete & verified via Playwright ($\Delta = 0\text{px}$ overflow).
  - **`Stötdämpare & fjädrar` (`/stodampare-fjadrar`)**: Complete & verified via Playwright ($\Delta = 0\text{px}$ overflow).
  - **`Hjullagerbyte` (`/hjullagerbyte`)**: Complete & verified via Playwright ($\Delta = 0\text{px}$ overflow).
  - **`Styrning & kulleder` (`/styrning-kulleder`)**: Complete & verified via Playwright ($\Delta = 0\text{px}$ overflow).
  - **`Drivaxel & drivknutar` (`/drivaxel-drivknutar`)**: Complete & verified via Playwright ($\Delta = 0\text{px}$ overflow).
- **Next Horizon**: Step 6 is complete as well (2026-09-19). Only Step 7 remains.

---

### Step 6: Build the Remaining Unique Pages `[COMPLETED: all 7 unique pages rebuilt — Galleri finished 2026-09-19]`
- **Why this order**: `Bärgning`, `Bilar till salu`, `Galleri`, and `Biltjänster` don't share a template with each other or with anything else; each has its own unique UI requirements and must be built as an isolated CSS island.
- **Status**:
  - **`Biltjänster` (`/biltjanster`) (COMPLETE)**: Rebuilt as the service-catalog hub (`BiltjansterPage.css`, `.biltjanster-hub__*`), mounts `<PublicHeader />` and `<PublicFooter />`.
  - **`Bilar till salu` (`/bilar-till-salu`) (COMPLETE, 2026-09-19)**: Rebuilt from scratch (`BilarTillSalu.tsx` + dedicated `BilarTillSalu.css`, `.bilartillsalu-page__*`). Hero with trust row, featured vehicle card (16:10 viewer, thumbnails, 4 spec badges, prefilled inquiry via `BookingFormModal`), empty/error/loading states, sold archive, closing `.bb-card--trust`. Stock is read through `getPublicVehicles()` (`client/src/api/vehicles.ts`) from the static seed `client/src/data/vehicles.ts`; switching to the future backend is `VITE_VEHICLES_SOURCE=api` (see `docs/BACKEND_HANDOFF.md`). Playwright verified across 1440, 768, 390 with $\Delta = 0\text{px}$ overflow.
  - **`Bärgning` (`/bargning`) (COMPLETE)**: Rebuilt from scratch (`BargningPage.tsx` + dedicated `BargningPage.css`, `.bargning-page__*`). Towing and breakdown dispatch focus, showcase split card, direct-call CTA, used-cars promo banner, emergency closing card. Mounted `<PublicHeader />` and `<PublicFooter />`. Playwright verified across 1440, 768, 390 with $\Delta = 0\text{px}$ overflow.
- **Agent's Job (Remaining in this group — Claude Code Roadmap)**:
  1. **`Bilar till salu` (`/bilar-till-salu`)**:
     - **File**: `client/src/pages/BilarTillSalu.tsx` + colocated `client/src/pages/BilarTillSalu.css` (`.bilartillsalu-page__*`). Zero dependency on `index.css`.
     - **Public Shell**: Mount `<PublicHeader onBookingClick={openModal} variant="overlay" />` and `<PublicFooter onBookingClick={openModal} />`.
     - **Vehicle Showcase**: Active vehicle (Peugeot 307 CC) with 3-photo interactive gallery (16:10 aspect ratio, thumbnail indicator), spec badges (Årsmodell, Miltal, Drivmedel, Växellåda), trust badges ("Verkstadsinspekterade", "Färdiga för leverans", "Personlig kontakt").
     - **Booking Wiring**: Prepopulate `<BookingFormModal />` with vehicle inquiry details (`"Gäller förfrågan om Peugeot 307 CC"`).
     - **Sections**: Active vehicles grid, sold vehicles section, clean empty state, and dark closing trust card (`.bb-card--trust`).
  2. **`Galleri` (`/galleri`) (COMPLETE, 2026-09-19)**: Rebuilt from scratch as a folder-driven page (`GalleryPage.tsx` + `GalleryPage.css`, `.galleri-page__*`, zero `index.css` dependency). Photos come from `client/src/assets/galleri/` (drop in / delete a file; `vite-imagetools` generates 640/1920px WebP+JPG at build time; captions in `bildtexter.json`; see `LÄSMIG.md`). Dark image-first stage, `?bild={slug}` deep links, keyboard + swipe, Playwright verified across 1440/768/390. Original brief kept below for reference:
     - **File**: `client/src/pages/GalleryPage.tsx` + colocated `client/src/pages/GalleryPage.css` (`.galleri-page__*`). Zero dependency on `index.css`.
     - **Public Shell**: Mount `<PublicHeader onBookingClick={openModal} variant="overlay" />` and `<PublicFooter onBookingClick={openModal} />`.
     - **Image-First Experience**: Large selected image viewer, tactile horizontal thumbnail carousel, explicit prev/next buttons, mouse-wheel / trackpad drag, Arrow-key navigation.
     - **STRICT Constraint**: Exactly 11 visually reviewed no-people workshop views (1920px WebP/JPG for main viewer, 640px `-thumb` for carousel). Zero people, portraits, reception, or handover imagery.
     - **Closing Section**: Closing reassurance card (`.bb-card--trust`) with direct booking and call CTAs.
  3. **Legacy Route Cleanup** (moves to Step 7):
     - Deprecate/redirect `client/src/pages/ServicesPage.tsx` (which still imports legacy `Header`/`Footer`) to `/biltjanster`.
     - **`ServicesPage.tsx` (`/tjanster`) is now the last page consuming `index.css`.** Retiring it is the only thing left before `index.css` can be deleted.
- **Your Job (HITL Decision)**:
  - Inspect vehicle photos, test the gallery viewer, verify inquiry call-to-actions, and confirm all pages link to the public shell.

---

### Step 7: The Moment of Liberation (Deleting `index.css`)
- **The Milestone**: Every active route lives on its own CSS island or one of the two family templates, wrapped in `PublicHeader` and `PublicFooter`.
- **Status (audited 2026-09-19)**: `index.css` is imported once, globally, in `client/src/main.tsx:5`. Retiring `/tjanster` is **not enough** to delete it. These dependencies must be removed first:
  1. **Tailwind directives**: `@tailwind base/components/utilities` exist only in `index.css` (lines 1–3). Move them into a dedicated stylesheet (for example `client/src/styles/tailwind.css`, imported in `main.tsx`) and decide consciously whether the Tailwind preflight reset stays global, since the public pages were built on top of it. Then verify `/admin`.
  2. **Booking modal** (`components/BookingForm.tsx` + `BookingForm.css`, used on 22 pages): `BookingForm.css` reads `--redesign-accent`, `--redesign-accent-dark`, `--redesign-font-body`, `--redesign-ink`, `--redesign-page` and `--redesign-surface`, and the submit button uses `.btn`/`.btn--primary`. Move it to `--bb-*` tokens and its own button class.
  3. **FAQ component** (`components/ui/BiltjansterFaq.tsx`, used on 13 guide and Bilservice-family pages): all 7 of its classes (`.biltjanster-faq*`, `.container`) are defined only in `index.css`. Give it its own stylesheet.
  4. **Tailwind leftovers on public pages**: `w-4 h-4` / `w-3 h-3` icon sizes in `AboutPage.tsx` and `BargningPage.tsx`. Move them into those islands.
  5. **`/tjanster`** (`pages/ServicesPage.tsx`): the last page on legacy `Header`/`Footer` and `index.css` classes. Redirect it to `/biltjanster` (or remove it) and check that nothing links to it.
  6. **Dead code** that goes with it: `components/layout/Header.tsx`, `components/layout/Footer.tsx`, `components/GoogleReviews.tsx` (unused), `pages/admin/Login.tsx` (unused), and the 38 unreferenced files in `client/src/assets/images/gallery/workshop/` (list in `docs/SESSION_LOG_CURRENT.md`, Galleri entry).
- **Agent's Job** (after 1–6):
  - Search the codebase for any lingering reference to `index.css`, legacy class names and `--redesign-*`.
  - Delete `client/src/css/index.css` and its import in `main.tsx`.
  - Remove the `index.css` freeze from `.githooks/pre-commit`, but keep the public-Tailwind check.
  - Run the full Playwright suite and the client production build, and screenshot every route at 1440/768/390.
- **Your Job (HITL Decision)**:
  - Click through every link in the menu on `http://localhost:5173/`. Enjoy the speed, elegance, and zero-bloat architecture. Celebrate the deletion of `index.css`!

---

## 4. How You Keep the Agents on Track (Cheat Sheet)

If you step away and come back, or if a model runs out of credits, here is how you check status:

1. **Check Git Status**:
   ```bash
   git status
   ```
   *Rule*: `client/src/css/index.css` should NEVER show up under "modified".

2. **Run Real Browser Verification**:
   ```bash
   npm --prefix client run test:browser
   ```
   *Rule*: All viewports (1440px desktop, 768px tablet, 390px mobile) must pass with zero horizontal overflow.

3. **Verify Build**:
   ```bash
   npm --prefix client run build
   ```
   *Rule*: Must build with 0 errors.

4. **If an agent drifts or tries to edit legacy CSS, or tries to force a shared template onto one of the 7 unique pages**:
   Tell them:
   > *"STOP. We are following the HITL_Temporary_roadmap.md ground truth. Do not edit legacy index.css. Om oss, Kontakt, Bärgning, Bilar till salu, Galleri, and Biltjänster are each unique pages — do not force them into a shared template. Only the Bilservice family and the Guide family share a template. Rebuild cleanly using --bb-* tokens."*
