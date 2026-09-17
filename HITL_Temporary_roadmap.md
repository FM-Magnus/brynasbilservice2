# Rebuilding Brynäs Bilservice — Human-in-the-Loop (HITL) Roadmap

**Document Owner**: Magnus Olsson  
**Document Name**: `HITL_Temporary_roadmap.md`  
**Active Working Branch**: `redesign/blue-teal-v1`  
**Local Dev Server**: `http://localhost:5173/`

---

### Critical Agent Primer (For New Chats & Fresh Agent Contexts)

If you are a new AI agent (Antigravity, Codex, Claude) or continuing in a fresh conversation context:
1. **WHAT THIS DOCUMENT IS**: This is the authoritative, Human-in-the-Loop (HITL) strategic command roadmap for the ground-up rebuild of Brynäs Bilservice. It outlines the exact architecture, the 7 designated Page Archetypes, the step-by-step phased execution plan, review criteria for Magnus, and agent steering prompts.
2. **WHY IT IS THERE**: To prevent cognitive drift across agent switches or new context windows. It ensures every agent builds strictly according to Magnus's 7 Page Design Archetypes using canonical design tokens (`--bb-*`), standalone public shells (`PublicHeader`, `PublicFooter`), and isolated CSS islands—preventing any agent from inventing rogue styles or touching legacy code.
3. **WHY IT IS TEMPORARY**: This document exists *only* during the transition phase from the legacy monolithic stylesheet (`client/src/css/index.css`) to the new modular architecture. Once all routes are rebuilt on their designated archetypes and `index.css` is completely deleted from the project, this temporary roadmap will have fulfilled its purpose and will be archived into `docs/archive/`.

---

## 1. Executive Summary & The Core Strategy

### The Problem
The legacy site is trapped in a 7,500+ line bloated stylesheet (`client/src/css/index.css`). It mixes legacy layout hacks, Tailwind utility conflicts, hardcoded colors, and tangled page dependencies. Editing anything there risks breaking five other pages simultaneously.

### The Solution: Rebuild from the Ground Up via 7 Page Archetypes
Rather than trying to "clean up" the old CSS file, we leave `index.css` completely frozen behind a pre-commit hook. We are building a modern, modular site alongside it using **self-contained CSS islands**.

Once all pages are rebuilt on their respective archetypes, `index.css` has zero active callers and is simply **deleted**.

---

## 2. The 7-Style Blueprint (Visual Intent & Role)

```text
================================================================================
LEVEL 0: CANONICAL GLOBAL LAYER (Single Source of Truth)
  • client/src/styles/design-tokens.css (--bb-* tokens: colors, type, spacing, radii)
  • client/src/data/publicNavigation.ts  (Canonical menu registry)
  • PublicHeader.tsx / PublicHeader.css (Standalone sticky/portal header)
  • PublicFooter.tsx / PublicFooter.css (Upcoming standalone global footer)
================================================================================
                                │
        ┌───────────────────────┼───────────────────────┐
        ▼                       ▼                       ▼
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│ STYLE 1: Brand & │    │ STYLE 2: Major   │    │ STYLE 3: Tech    │
│ Conversion Hub   │    │ Services Hub     │    │ Guides (Group A) │
│ (Landing Parent) │    │ (Bilservice Par.)│    │ (Template A)     │
├──────────────────┤    ├──────────────────┤    ├──────────────────┤
│ • Startsidan     │    │ • Bilservice     │    │ • Koppling       │
│ • Om oss (NEW)   │    │ • Felsökning     │    │ • Oljebyte       │
│ • Kontakt (NEW)  │    │ • Däckservice    │    │ • Avgassystem    │
│                  │    │ • AC-service     │    │ • Bromssystem    │
└──────────────────┘    └──────────────────┘    └──────────────────┘
        │                       │                       │
        ▼                       ▼                       ▼
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│ STYLE 4: Tech    │    │ STYLE 5: Unique  │    │ STYLE 6: Unique  │
│ Guides (Group B) │    │ Workshop Gallery │    │ Vehicle Sales    │
│ (Template B)     │    │ (Bespoke layout) │    │ (Bespoke layout) │
├──────────────────┤    ├──────────────────┤    ├──────────────────┤
│ • Kamrem         │    │ • Galleri (NEW)  │    │ • Bilar till     │
│ • Bilbatteri     │    │                  │    │   salu           │
│ • Stötdämpare    │    │                  │    │                  │
│ • Hjullager      │    │                  │    │                  │
│ • Styrning       │    │                  │    │                  │
│ • Drivaxel       │    │                  │    │                  │
└──────────────────┘    └──────────────────┘    └──────────────────┘
```

### What Each Style Actually Means:
1. **Canonical Core**: The global glue. Colors, fonts (Archivo display + Manrope body), standard button radii, and the standalone Header/Footer shell that frames every page.
2. **Style 1 (Brand & Conversion)**: Clean warm-white canvas (`#f8f7f3`), deep petrol dark sections, high-contrast teal accents, direct contact forms, customer reassurance cards.
3. **Style 2 (Major Editorial Services)**: Automotive editorial tone. High-trust tier packages (Brons/Silver/Guld), deep technical breakdown, transparent pricing, reassuring owner-first messaging.
4. **Style 3 (Tech Guides Group A)**: Precision technical symptom breakdowns, checklists, repair timelines, and urgent warning cues (amber/teal).
5. **Style 4 (Tech Guides Group B)**: A fresh second layout template for sub-services (belt, battery, suspension, bearings) so the website never feels monotonous or copy-pasted.
6. **Style 5 (Unique Gallery)**: Image-first workshop storytelling, authentic photography viewer, tactile carousel.
7. **Style 6 (Unique Vehicle Sales)**: Automotive showroom UI, vehicle spec pills, photo carousel, inspection badges, and direct purchase inquiry flow.

---

## 3. Step-by-Step HITL Execution Plan

Use this section to know **what the agent is doing**, **what you need to review/decide**, and **what prompt to give next**.

---

### Step 1: Lock the Reference Standard (Landing Page) *(NOW)*
- **Agent's Job**: Fine-tune the Landing page spacing, typography scales, hero alignment, and Google reviews readability.
- **Your Job (HITL Decision)**:
  - Open `http://localhost:5173/` in your browser.
  - Check the hero bottom: Are the Google review rating, stars, and quote easily readable?
  - Scroll down: Does the section rhythm (contact form, reassurance, process, used car teaser) feel natural and well-paced?
  - Test on mobile (DevTools at 390px): Does everything stack cleanly with zero side-scrolling?
- **Ready to proceed when**: You look at the landing page and say, *"Yes, this is the visual benchmark."*

---

### Step 2: Extract Canonical Tokens & Build `PublicFooter`
- **Why this order**: Before building new pages, we promote the proven `--landing-*` variables into universal `--bb-*` tokens in `design-tokens.css`, and create `PublicFooter`. This completes the "sandwich" (Header + Footer) so every new page drops right into a finished shell.
- **Agent's Job**:
  - Unify font scales, colors, and radii into `design-tokens.css`.
  - Build `PublicFooter.tsx` and `PublicFooter.css` with clean `--bb-*` tokens, verified address, phone, email, and opening hours.
  - Mount `PublicFooter` on Landing page.
- **Your Job (HITL Decision)**:
  - Review the new footer on `http://localhost:5173/`. Verify links, opening hours (Mån–Fre 08:00–17:00), and mobile layout.
- **Steering Prompt**:
  > *"Promote the landing typography and spacing scales into design-tokens.css as canonical --bb-* tokens, then create the standalone PublicFooter component and mount it on the landing page."*

---

### Step 3: Complete Style 1 — Rebuild `Kontakt` & `Om oss` from Scratch
- **Why this order**: These pages directly inherit the visual DNA of the Landing page. Because the contact form, info cards, Maher intro, and reassurance cards are already designed on the landing page, these two pages can be rebuilt rapidly with zero legacy bloat.
- **Agent's Job**:
  - Rebuild `/kontakt` (`ContactPage.tsx` + dedicated CSS): High-trust contact form, direct phone CTA, Google Maps card, verified hours.
  - Rebuild `/om-oss` (`AboutPage.tsx` + dedicated CSS): Authentic Maher Basher portrait, company transparency, "15%-regeln" consumer proof, workshop history.
  - Both pages mount `<PublicHeader />` and `<PublicFooter />`.
- **Your Job (HITL Decision)**:
  - Test `/kontakt` and `/om-oss` in the browser. Confirm copy and layout feel like natural extensions of the homepage.
- **Steering Prompt**:
  > *"Rebuild the Kontakt page (/kontakt) from scratch using Style 1 (inheriting the landing page's design language, form, and tokens). Wrap it in PublicHeader and PublicFooter."*

---

### Step 4: Lock & Roll Out Style 2 — Major Services Hub
- **Why this order**: Bilservice (`/service-reparationer`) already has its standalone `.bilservice__*` CSS island. By mounting the new PublicHeader/Footer on Bilservice and aligning its tokens, it becomes the parent style guide for the other three major service hubs.
- **Agent's Job**:
  - Mount `<PublicHeader variant="solid" />` and `<PublicFooter />` on `ServiceReparationerPage.tsx`.
  - Rebuild **`Felsökning`** (`/felsokning`) on Style 2 with OBD diagnostics focus and symptom selector.
  - Rebuild **`Däckservice`** (`/dackservice`) on Style 2 with tire hotel (däckhotell) focus, legal requirements, and shift booking.
  - Rebuild **`AC-service`** (`/ac-service`) on Style 2 with climate diagnostics, R134a/R1234yf options, and cleaning.
- **Your Job (HITL Decision)**:
  - Review the service tier cards, pricing tables, and process steps across these 4 pages. Verify that technical wording and pricing caveats are clear.
- **Steering Prompt**:
  > *"Mount PublicHeader and PublicFooter on Bilservice, then rebuild Felsökning using Bilservice's Style 2 editorial archetype."*

---

### Step 5: Connect Style 3 — Technical Service Guides (Group A)
- **Why this order**: `Koppling`, `Avgassystem`, `Oljebyte`, and `Bromssystem` are already rebuilt on `ServiceGuideTemplate.css`. They just need the global shell and token alignment.
- **Agent's Job**:
  - Mount `<PublicHeader />` and `<PublicFooter />` on the 4 pages.
  - Ensure `ServiceGuideTemplate.css` consumes `--bb-*` tokens cleanly.
- **Your Job (HITL Decision)**:
  - Check `/koppling`, `/oljebyte`, `/avgassystem`, and `/bromssystem`. Confirm the menu navigation and footer frame them seamlessly.
- **Steering Prompt**:
  > *"Connect PublicHeader and PublicFooter to the four Style 3 service guides (Koppling, Oljebyte, Avgassystem, Bromssystem) and verify zero horizontal overflow."*

---

### Step 6: Create Style 4 — Technical Service Guides (Group B)
- **Why this order**: The remaining 6 service guides (*Kamrem*, *Bilbatteri*, *Stötdämpare*, *Hjullager*, *Styrning*, *Drivaxel*) currently rely on legacy styling or transitional CSS. Building a second distinct template (`ServiceGuideTemplateB.css`) gives them a cohesive, fresh look while preventing the entire site from looking identical.
- **Agent's Job**:
  - Design and build `ServiceGuideTemplateB.css`.
  - Migrate all 6 remaining technical guides to this template.
- **Your Job (HITL Decision)**:
  - Review the visual distinction between Style 3 and Style 4 guides. Confirm they feel like part of the same automotive family while offering visual variety.
- **Steering Prompt**:
  > *"Create the Style 4 technical guide template (ServiceGuideTemplateB.css) and migrate Kamrem and Bilbatteri to it as the first proofs."*

---

### Step 7: Build the Two Unique Pages
- **Why this order**: These pages don't share templates with other pages; they have unique UI requirements.
- **Agent's Job**:
  - Rebuild **`Galleri`** (`/galleri`) (Style 5) with an image-first layout and workshop overview.
  - Rebuild **`Bilar till salu`** (`/bilar-till-salu`) (Style 6) with vehicle spec badges, multi-photo viewer, and inquiry modal.
  - Mount `<PublicHeader />` and `<PublicFooter />` on both.
- **Your Job (HITL Decision)**:
  - Inspect vehicle photos, test the gallery viewer, and verify inquiry call-to-actions.

---

### Step 8: The Moment of Liberation (Deleting `index.css`)
- **The Milestone**: Every single active route is now living on its own clean CSS island or shared template, wrapped in `PublicHeader` and `PublicFooter`.
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

4. **If an agent drifts or tries to edit legacy CSS**:
   Tell them:
   > *"STOP. We are following the HITL_Temporary_roadmap.md ground truth. Do not edit legacy index.css. Rebuild the page cleanly on its designated Style Archetype using --bb-* tokens."*
