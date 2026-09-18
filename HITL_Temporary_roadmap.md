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

### Step 3: Build Om oss & Kontakt as Unique Pages `[IN PROGRESS: Kontakt COMPLETE, Om oss PENDING]`
- **Why this order**: These are the two most-trafficked pages after the landing page, and their content (personal brand story, direct contact/booking) is closest in tone to the landing page's proof already built — but each still needs its own dedicated visual identity and CSS island, not a shared "Style 1" template.
- **Status**:
  - **`/kontakt` (COMPLETE)**: Rebuilt from scratch (`ContactPage.tsx` + dedicated `ContactPage.css`, `.kontakt-page__*`). Mounted `<PublicHeader />` (overlay) and `<PublicFooter />`, integrated `<ContactFormCard />`, direct phone CTA, Google Maps card, verified hours. Playwright verified across 1440, 768, 390 with $\Delta = 0\text{px}$ overflow.
  - **`/om-oss` (PENDING - NEXT UNIQUE PAGE)**: Rebuild `AboutPage.tsx` + dedicated `AboutPage.css` (`.omoss-page__*` to avoid legacy collisions). Authentic Maher Basher portrait, company transparency, "15%-regeln" consumer proof, workshop history, `<GalleryTeaserCard />`. Mount `<PublicHeader />` and `<PublicFooter />`.
- **Your Job (HITL Decision)**:
  - Test `/kontakt` in the browser. Next up: approve rebuild of `/om-oss`.
- **Steering Prompt**:
  > *"Rebuild Om oss (/om-oss) from scratch as its own unique page, using the canonical --bb-* tokens and public shell. Wrap it in PublicHeader and PublicFooter."*

---

### Step 4: Roll Out the "Bilservice" Family `[IN PROGRESS]`
- **Why this order**: Bilservice (`/service-reparationer`) already has its standalone `.bilservice__*` CSS island. By mounting the new PublicHeader/Footer on Bilservice and aligning its tokens, it becomes the shared identity for the other three service-hub pages.
- **Status**:
  - **`Bilservice` (COMPLETE)**: Parent owner on `--bb-*` tokens and `.bb-hero` layout system, mounts `<PublicHeader />` and `<PublicFooter />`.
- **Agent's Job (Next in this family)**:
  - Rebuild **`Felsökning`** (`/felsokning`) on the Bilservice family template with OBD diagnostics focus and symptom selector.
  - Rebuild **`Däckservice`** (`/dackservice`) on the Bilservice family template with tire hotel (däckhotell) focus, legal requirements, and shift booking.
  - Rebuild **`AC-service`** (`/ac-service`) on the Bilservice family template with climate diagnostics, R134a/R1234yf options, and cleaning.
- **Your Job (HITL Decision)**:
  - Review the service tier cards, pricing tables, and process steps across these 4 pages. Verify that technical wording and pricing caveats are clear.
- **Steering Prompt**:
  > *"Rebuild Felsökning (/felsokning) using Bilservice's shared family template (ServiceReparationerPage.css with .bilservice__* classes)."*

---

### Step 5: Roll Out the "Guide" Family (All 10 Technical Guides) `[IN PROGRESS: 4 PILOTS COMPLETE & SECOND PASS DONE]`
- **Why this order**: All ten guides share one single template (`ServiceGuideTemplate.css`). The 4 pilot guides (`Koppling`, `Avgassystem`, `Bromssystem`, `Oljebyte`) have proven the template's reusability across standard, dual-accent, and deep-dive content blocks, and have all completed their **Second Pass** (100% canonical Level 0 `--bb-*` tokens, Level 1 `.bb-*` shared elements, mixed-case Archivo 800 H1s, zero-specificity reset bug fix, and Playwright verification).
- **Status**:
  - **`Koppling` (`/koppling`)**: Complete & Second Pass verified.
  - **`Avgassystem` (`/avgassystem`)**: Complete & Second Pass verified.
  - **`Bromssystem` (`/bromssystem`)**: Complete & Second Pass verified.
  - **`Oljebyte` (`/oljebyte`)**: Complete & Second Pass verified (full-page topic blocks wrapped in `.bb-wrap`).
- **Agent's Job (Next in this family)**:
  - Migrate the remaining six guides onto `ServiceGuideTemplate.css` in pairs:
    1. **`Kamrem`** (`/kamrem`) & **`Bilbatteri`** (`/bilbatteri`)
    2. **`Stötdämpare & fjädrar`** (`/stodampare-fjadrar`) & **`Hjullagerbyte`** (`/hjullagerbyte`)
    3. **`Styrning & kulleder`** (`/styrning-kulleder`) & **`Drivaxel & drivknutar`** (`/drivaxel-drivknutar`)
  - Each guide mounts `<PublicHeader />` and `<PublicFooter />`, consumes `ServiceGuideTemplate.css`, and follows the mixed-case Archivo 800 heading standard.
- **Your Job (HITL Decision)**:
  - Confirm the remaining 6 guides integrate cleanly into the shared template.
- **Steering Prompt**:
  > *"Migrate Kamrem (/kamrem) and Bilbatteri (/bilbatteri) onto ServiceGuideTemplate.css, mounting PublicHeader and PublicFooter and using canonical tokens."*

---

### Step 6: Build the Remaining Unique Pages `[IN PROGRESS: Biltjänster COMPLETE]`
- **Why this order**: `Bärgning`, `Bilar till salu`, `Galleri`, and `Biltjänster` don't share a template with each other or with anything else; each has its own unique UI requirements.
- **Status**:
  - **`Biltjänster` (`/biltjanster`) (COMPLETE)**: Rebuilt as the service-catalog hub (`BiltjansterPage.css`, `.biltjanster-hub__*`), mounts `<PublicHeader />` and `<PublicFooter />`.
- **Agent's Job (Next in this group)**:
  - Rebuild **`Bärgning`** (`/bargning`) as its own unique page (`BargningPage.css`, `.bargning-hub__*` or similar distinct prefix) — towing/transport dispatch focus, direct-call CTA.
  - Rebuild **`Bilar till salu`** (`/bilar-till-salu`) as its own unique page — vehicle spec badges, multi-photo viewer, and inquiry modal.
  - Rebuild **`Galleri`** (`/galleri`) as its own unique page — image-first layout and workshop overview.
  - Mount `<PublicHeader />` and `<PublicFooter />` on all three.
- **Your Job (HITL Decision)**:
  - Inspect vehicle photos, test the gallery viewer, verify inquiry call-to-actions, and confirm all pages link to the public shell.

---

### Step 7: The Moment of Liberation (Deleting `index.css`)
- **The Milestone**: Every single active route is now living on its own clean CSS island or one of the two shared family templates, wrapped in `PublicHeader` and `PublicFooter`.
- **Agent's Job**:
  - Search codebase for any lingering references to `index.css`.
  - Delete `client/src/css/index.css`.
  - Remove the pre-commit freeze hook from `.githooks/pre-commit`.
  - Run full Playwright test suite and client production build.
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
