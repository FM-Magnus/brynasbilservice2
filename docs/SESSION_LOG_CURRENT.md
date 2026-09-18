# Current session log — Brynäs Bilservice

This file receives new dated session entries, newest first. It is not a mandatory startup read. Stable rules and current constraints belong in `AGENTS.md`; older history belongs in `SESSION_LOG_ARCHIVE.md`.

### 2026-09-18 — Antigravity (Second Pass: Full-Page Canonical Alignment & Token Audit on /bargning)

- **Standardized standalone Bärgning page (`BargningPage.tsx` / `BargningPage.css`) to Landing truth & canonical tokens**:
  - **Typography & Display Headings**:
    - Standardized H1 with `.bb-h1` and `.bb-accent` (`Bärgning & <span className="bb-accent">Biltransport</span>`).
    - Standardized H2 headings across all sections (`.bb-h2`).
    - Removed `text-transform: uppercase` from `.bargning-page__quick-step-heading` to preserve natural mixed-case Archivo display typography.
  - **Eyebrows & Accents**:
    - Replaced duplicate process eyebrow with canonical `<p className="bb-eyebrow bb-eyebrow--dark">Steg för steg</p>`.
    - Maintained light-surface `<p className="bb-eyebrow">Din lokala verkstad</p>` with teal-800 text and teal dash.
  - **Shared Button Variants (`shared-elements.css`)**:
    - Replaced `.bb-btn--teal` on the white intake card with canonical `.bb-btn.bb-btn--ember-solid` (the designated button pattern for light surfaces).
    - Preserved dark-surface `.bb-btn.bb-btn--teal` and `.bb-btn.bb-btn--ember` across hero, showcase, used cars, and closing CTA.
  - **Interactive States & Focus Rings**:
    - Added `:focus-visible` with `var(--bb-color-focus)` (`outline: 3px solid var(--bb-color-focus); outline-offset: 3px;`) to `.bargning-page__showcase-book-link` and `.bargning-page__fact-link`.
    - Standardized background-color to `var(--bb-color-ink-950)`.
  - **Strict CSS Safety**: `client/src/css/index.css` remained 100% frozen (0 lines changed).
- **Verification**:
  - `npm --prefix client run build`: Built cleanly with 0 errors in 1.84s.
  - Playwright visual test (`client/tests/browser/bargning.visual.spec.ts`): All 3 tests passed in 3.2s with $\Delta = 0\text{px}$ horizontal overflow across 1440px desktop, 768px tablet, and 390px mobile viewports. Modal interaction verified.

### 2026-09-18 — Antigravity (Rebuilt "Bärgning & Biltransport" /bargning from scratch against final mockup)

- **Rebuilt Bärgning page (`BargningPage.tsx` / `BargningPage.css`) from approved visual mockup**:
  - **CSS Safety & Architectural Isolation**: Built completely from scratch as an isolated CSS island with unique class prefix `.bargning-page__*`. Zero touches or dependencies on legacy `index.css` (0 lines changed). Consumes Level 0 `--bb-*` design tokens from `client/src/styles/design-tokens.css` and canonical shared patterns (`.bb-*`) from `client/src/styles/shared-elements.css`.
  - **Public Shell & Modal**: Mounted canonical `PublicHeader` and `PublicFooter`, wired all booking CTAs to `BookingFormModal`, featured prominent emergency phone number `070-553 33 95`.
  - **Existing Asset Reuse**: Reused existing optimized WebP/JPG assets for hero/closing backgrounds (`towing-hero-bg`), Iveco tow truck (`tow-truck-at-workshop`), workshop car lift (`workshop-car-on-lift`), and used car banner (`peugeot-307-cc-side-profile`).
  - **Section 1: Hero (`.bargning-page__hero`)**: Natural mixed-case H1 `Bärgning & Biltransport i <span className="bb-accent">Gävle med omnejd</span>`, amber pill eyebrow `Snabb assistans vid haveri eller olycka`, primary teal phone CTA (`.bb-btn--teal`), secondary booking button (`.bb-btn--ember`), and 3 trust badges (Snabb utryckning, Trygg transport, Direkt till verkstad).
  - **Section 2: Quick 3-Step Action Bar (`.bargning-page__quick-steps`)**: 3 high-contrast numbered action steps with amber numeric badges (`01`, `02`, `03`), circular teal icons, and amber connector arrows.
  - **Section 3: Showcase Split Card (`.bargning-page__showcase`)**: Responsive split card featuring Iveco tow truck photo with floating badge "Egen bärgningsbil i Gävle", dark petrol card with service pill, 2-column feature checkmarks, emergency phone CTA and booking link.
  - **Section 4: Towing Scenarios Grid (`.bargning-page__scenarios`)**: 4 distinct scenario cards (Akut motorstopp / haveri, Punktering & däckskador, Transport till verkstad, Starhhjälp & mindre åtgärder) matching mockup colors (clean light card, teal gradient card, dark petrol card, sunset road photo card).
  - **Section 5: Step-by-Step Workshop Protocol (`.bargning-page__process`)**: Dark petrol band with technical grid, 3 numbered horizontal cards detailing workflow from roadside to inspection and finished repair.
  - **Section 6: Workshop Intake Reassurance (`.bargning-page__workshop-intake`)**: Workshop lift photo, reassuring story copy, link to `/om-oss`, and workshop facts checklist panel.
  - **Section 7: Used Cars Cross-Sell Banner (`.bargning-page__cars-banner`)**: Clean promo card with Peugeot 307 CC graphic and direct link to `/bilar-till-salu`.
  - **Section 8: Closing Emergency CTA (`.bargning-page__cta`)**: Dark petrol closing card over towing background with dual action buttons.
- **Verification**:
  - `npm --prefix client run build`: Built cleanly with 0 errors in 1.74s.
  - Playwright visual test (`client/tests/browser/bargning.visual.spec.ts`): Verified across 1440px desktop, 768px tablet, and 390px mobile viewports with $\Delta = 0\text{px}$ horizontal overflow across all checks. Booking modal trigger verified. Full-page screenshots generated and verified.

### 2026-09-18 — Antigravity (Second Pass: Full-Page Canonical Alignment & Token Cleanup on /om-oss)

- **Standardized standalone "Om oss" page (`AboutPage.tsx` / `AboutPage.css`) to Landing truth & canonical tokens**:
  - **Mixed-Case Display Headings & Accents**: Standardized H1 to natural mixed-case `Din lokala och <span className="bb-accent">personliga</span> bilverkstad i Brynäs` via `.bb-h1` and `.bb-accent`. Removed `text-transform: uppercase` from `.omoss-page__hero-title`.
  - **Shared Design Elements (`shared-elements.css`)**:
    - Section containers wrapped in canonical `.bb-wrap`.
    - Eyebrows converted to semantic `<p className="bb-eyebrow bb-eyebrow--dark omoss-page__hero-eyebrow">` in hero and process, and `<p className="bb-eyebrow">` in story and principles.
    - Section titles and leads wired to `.bb-h2`, `.bb-lead`, and `.bb-lead--dark`.
    - Secondary phone CTAs converted to canonical `.bb-btn.bb-btn--ember`.
  - **Design Token Purity & Specificity**:
    - Scoped strictly within `.omoss-page__*`.
    - Cleaned up redundant local eyebrow and button rules in `AboutPage.css` in favor of canonical `.bb-*` classes.
  - **Strict CSS Safety**: `client/src/css/index.css` remained 100% frozen (0 lines changed).
- **Verification**:
  - `npm --prefix client run build`: Built cleanly with 0 errors in 1.87s.
  - Playwright visual test (`client/tests/browser/about.visual.spec.ts`): All tests passed across 1440px desktop, 768px tablet, and 390px mobile with 0px horizontal overflow.

### 2026-09-18 — Antigravity (Second Pass: Full-Page Canonical Alignment & Token Cleanup on /kontakt)

- **Standardized standalone Contact page (`ContactPage.tsx` / `ContactPage.css`) to Landing truth & canonical tokens**:
  - **CSS Island & Specificity**: Scoped completely within `.kontakt-page__*`. Verified `:where()` resets on element selectors to prevent specificity leaks against shared `.bb-*` components.
  - **Design Token Purity**: Eliminated non-canonical / phantom token references in `ContactPage.css`:
    - Replaced `var(--bb-font-sans)` with canonical `var(--bb-font-body)` (`'Manrope', Arial, sans-serif`).
    - Replaced `var(--bb-color-border-subtle)` with clean RGBA borders (`rgba(7, 20, 22, 0.08)` on light cards, `rgba(255, 255, 255, 0.08)` on dark cards).
    - Replaced undefined `var(--bb-color-teal-300)` / `var(--bb-color-teal-400)` with `var(--bb-color-teal-500)` and `var(--bb-color-focus)`.
    - Standardized `.kontakt-page__success-icon` to canonical `var(--bb-color-teal-500)`.
  - **Buttons & Shared Patterns**:
    - Hero actions: `.bb-btn.bb-btn--teal` ("Boka tid") and `.bb-btn.bb-btn--ember` ("Ring 070-553 33 95").
    - Form submit button: `.bb-btn.bb-btn--ember-solid` (canonical for light-surface actions).
    - Closing CTA card: `.bb-btn.bb-btn--teal` and `.bb-btn.bb-btn--ember`.
    - Eyebrow: `.bb-eyebrow.bb-eyebrow--dark` in hero and closing, `.bb-eyebrow` on light step card.
    - H1 & Accents: `.bb-h1` with `.bb-accent` ("Hör av dig till Brynäs Bilservice").
  - **Strict CSS safety**: `client/src/css/index.css` remained completely untouched (0 lines changed).
- **Verification**:
  - `npm --prefix client run build`: Passed cleanly with 0 errors in 1.88s.
  - Playwright visual tests (`client/tests/browser/contact.visual.spec.ts`): Verified across 1440px desktop, 768px tablet, and 390px mobile viewports: $\Delta = 0\text{px}$ horizontal overflow across all checks. Booking modal trigger verified.


### 2026-09-18 — Antigravity (Om oss `/om-oss` Rebuilt from scratch against approved mockup)

- **Rebuilt Om oss page (`AboutPage.tsx` / `AboutPage.css`) from approved visual mockup**:
  - **CSS Safety & Independence**: Built completely from scratch as an isolated CSS island prefixed with `.omoss-page__*`. Zero reliance or touches to legacy `index.css` (0 lines changed). Consumes canonical design tokens `--bb-*` from `client/src/styles/design-tokens.css` and shared patterns from `client/src/styles/shared-elements.css`.
  - **Public Shell & Modal**: Wrapped in canonical `PublicHeader` and `PublicFooter`, wired all "Boka tid" CTAs to canonical `BookingFormModal`.
  - **Section 1: Hero (`.omoss-page__hero`)**: Archivo 800 title `Din lokala och <span class="omoss-page__teal-highlight">personliga</span> bilverkstad i Brynäs`, amber pill eyebrow `Sedan 2021 i Gävle`, primary `.bb-btn--teal` CTA + outline phone button, high-res portrait cutout of Maher Basher, and amber Caveat cursive handwriting quote (`/ Maher`).
  - **Section 2: Trust Strip (`.omoss-page__trust-strip`)**: 4 trust badge cards (Personlig service, Erfarna mekaniker, Tryggt och enkelt, Oberoende verkstad) floating directly below the hero.
  - **Section 3: Workshop Story & Profile (`.omoss-page__story`)**:
    - Left column: Photo card of Maher leaning on workshop bench (optimized from `_incoming-assets/team__maher-i-verkstaden__landskap__v01.png` to `client/src/assets/images/about/maher-workshop-bench.{webp,jpg}`) with overlay badge `Maher Basher | Grundare & mekaniker` + dark petrol card detailing company facts, contact details, opening hours, and Google Maps link.
    - Right column: Eyebrow `— Om Brynäs Bilservice`, heading `En fristående verkstad med hjärtat i Gävle`, 2 copy paragraphs, and pull quote card with amber quote mark.
  - **Section 4: Core Principles (`.omoss-page__principles`)**: Centered header with 4 principle cards on warm-white canvas (Tydlig kommunikation, Omsorg om din bil, Kostnadsförslag före arbete, Oberoende rådgivning).
  - **Section 5: Step-by-Step Process (`.omoss-page__process`)**: Dark petrol band with subtle technical grid, 3 connected step cards with cyan numeric badges (`01`, `02`, `03`) and amber connector arrows.
  - **Section 6: Workshop Gallery Preview (`.omoss-page__gallery-preview`)**: Header with eyebrow `— Bakom garageportarna`, intro text, `.bb-btn--teal` button linking to `/galleri`, and 4-photo responsive card grid.
  - **Section 7: Closing CTA Banner (`.omoss-page__cta`)**: Dark petrol card with `Redo att boka service eller reparation?`, `Boka tid nu` button, `Se alla tjänster` link, and direct phone link.
- **Verification**:
  - `npm --prefix client run build`: Passed cleanly in 2.05s with 0 errors.
  - Playwright visual tests (`client/tests/browser/about.visual.spec.ts`): Verified across 1440px (desktop), 768px (tablet), and 390px (mobile) viewports with strictly 0px horizontal overflow (`scrollWidth <= clientWidth`). Modal trigger verified.


### 2026-09-18 — Antigravity (Second Pass: Hero & Full-Page Canonical Alignment on /oljebyte)

- **Standardized Oljebyte (`/oljebyte`) hero, topic blocks & sections to Landing truth**:
  - **H1 Display Typography**: Converted hardcoded uppercase JSX to natural mixed-case `Oljebyte<br />för en motor<br />som <span className="bb-accent">mår bra</span>` using Archivo 800 `.bb-h1` and `.bb-accent`.
  - **Full-Page Canonical Elements**:
    - Eyebrow wired to `.bb-eyebrow.bb-eyebrow--dark` with canonical amber bar; lead paragraph to `.bb-lead.bb-lead--dark`.
    - Hero, tip-strip, process, and closing CTAs connected to `.bb-btn.bb-btn--teal` and `.bb-btn.bb-btn--ember`.
    - Hero trust items connected to `.bb-icon-bare` with amber accent and drop-shadow.
    - All section containers and 5 deep-dive topic blocks (Ageing, Viscosity, Standards, Types, Misconceptions) wrapped with `.bb-wrap.service-guide__container`.
    - Process section heading standardized to natural mixed-case `Så går det till<br /><span className="bb-accent">hos oss</span>`.
  - **Shared Template Modernization (`ServiceGuideTemplate.css`)**: Standardized `.service-guide__topic-card` border-radius from hardcoded literal `20px` to `var(--bb-radius-card)`.
- **Strict CSS safety**: `client/src/css/index.css` remained completely untouched (0 lines changed).
- **Verification**:
  - `npm --prefix client run build`: Passed cleanly with zero errors in 1.88s.
  - `git diff --check`: Clean, 0 whitespace errors.
  - Playwright Multi-Viewport Verification (`/oljebyte`): 1440px desktop, 768px tablet, and 390px mobile viewports: $\Delta = 0\text{px}$ horizontal overflow across all checks. Secondary button text contrast verified (`rgb(255, 255, 255)` over ember border). Topic cards verified at `border-radius: 20px` with `--bb-shadow-card`.

### 2026-09-18 — Antigravity (Second Pass: Hero & Canonical Alignment on /avgassystem)

- **Standardized Avgassystem (`/avgassystem`) hero & sections to Landing truth**:
  - **H1 Display Typography**: Converted hardcoded uppercase JSX to natural mixed-case `Avgassystem<br />för tyst gång<br />och <span className="bb-accent">ren</span> motor` using Archivo 800 `.bb-h1` and `.bb-accent`.
  - **Kanoniska Knappar**: Connected hero, process, and closing actions to `.bb-btn.bb-btn--teal` ("Boka tid") and `.bb-btn.bb-btn--ember` ("Ring 070-553 33 95").
  - **Eyebrow & Ingress**: Wired eyebrow ("Avgasrening & ljuddämpning") to `.bb-eyebrow.bb-eyebrow--dark` with canonical amber bar, and lead paragraph to `.bb-lead.bb-lead--dark`.
  - **Trust Row**: Connected trust items to glowing `.bb-icon-bare` with amber accent and drop-shadow.
  - **Wrappers & Process Title**: Added `.bb-wrap` across all section inner containers and updated process section title to natural mixed-case `Så går det till<br /><span className="bb-accent">hos oss</span>`.
- **Strict CSS safety**: `client/src/css/index.css` remained completely untouched (0 lines changed).
- **Verification**:
  - `npm --prefix client run build`: Passed cleanly with zero errors in 1.86s.
  - `git diff --check`: Clean, 0 whitespace errors.
  - Playwright Multi-Viewport Verification (`/avgassystem`): 1440px desktop, 768px tablet, and 390px mobile viewports: $\Delta = 0\text{px}$ horizontal overflow across all checks. Secondary button text contrast verified (`rgb(255, 255, 255)` over ember border).

### 2026-09-18 — Antigravity (Second Pass: Hero & Canonical Alignment on /bromssystem)

- **Standardized Bromssystem (`/bromssystem`) hero & sections to Landing truth**:
  - **H1 Display Typography**: Converted hardcoded uppercase JSX to natural mixed-case `Bromssystem<br />när <span className="bb-accent">säkerheten</span><br />måste fungera` using Archivo 800 `.bb-h1` and `.bb-accent`.
  - **Kanoniska Knappar**: Connected hero, process, and closing actions to `.bb-btn.bb-btn--teal` ("Boka bromsservice") and `.bb-btn.bb-btn--ember` ("Ring 070-553 33 95").
  - **Eyebrow & Ingress**: Wired eyebrow ("Bromsservice & säkerhet") to `.bb-eyebrow.bb-eyebrow--dark` with canonical amber bar, and lead paragraph to `.bb-lead.bb-lead--dark`.
  - **Trust Row**: Connected trust items to glowing `.bb-icon-bare` with amber accent and drop-shadow.
  - **Wrappers & Process Title**: Added `.bb-wrap` across all section inner containers and updated process section title to natural mixed-case `Så går det till<br /><span className="bb-accent">hos oss</span>`.
- **Strict CSS safety**: `client/src/css/index.css` remained completely untouched (0 lines changed).
- **Verification**:
  - `npm --prefix client run build`: Passed cleanly with zero errors in 1.73s.
  - `git diff --check`: Clean, 0 whitespace errors.
  - Playwright Multi-Viewport Verification (`/bromssystem`): 1440px desktop, 768px tablet, and 390px mobile viewports: $\Delta = 0\text{px}$ horizontal overflow across all checks. Secondary button text contrast verified (`rgb(255, 255, 255)` over ember border).

### 2026-09-18 — Antigravity (Second Pass: Hero & Canonical Alignment on /koppling & ServiceGuideTemplate.css)

- **Standardized Koppling (`/koppling`) hero & template to Landing truth**:
  - **H1 Display Typography**: Converted hardcoded uppercase JSX to natural mixed-case `Koppling <span className="bb-accent">när</span><br />kraften behöver<br />nå hjulen` and removed `text-transform: uppercase` from `.service-guide__title` and `.service-guide__process-text h2` in `ServiceGuideTemplate.css`.
  - **Kanoniska Knappar**: Connected hero and closing actions to `.bb-btn.bb-btn--teal` and `.bb-btn.bb-btn--ember`. Fixed specificity bug where `.service-guide :where(a)` was overriding `.bb-btn--ember` text color — resolved by making resets truly zero-specificity via `:where(.service-guide) :where(a)` and removing conflicting `border: 1px solid transparent` from `.service-guide__btn`.
  - **Eyebrow & Ingress**: Wired eyebrow to `.bb-eyebrow.bb-eyebrow--dark` with canonical amber bar, and lead paragraph to `.bb-lead.bb-lead--dark`.
  - **Trust Row**: Connected trust items to glowing `.bb-icon-bare` with amber accent and drop-shadow.
  - **Wrappers**: Added `.bb-wrap` across all section inner containers for consistent max-width and responsive margin/padding.
- **Strict CSS safety**: `client/src/css/index.css` remained completely untouched (0 lines changed).
- **Verification**:
  - `npm --prefix client run build`: Passed cleanly with zero errors in 1.72s.
  - `git diff --check`: Clean, 0 whitespace errors.
  - Playwright Multi-Viewport Verification (`/koppling`): 1440px desktop, 768px tablet, and 390px mobile viewports: $\Delta = 0\text{px}$ horizontal overflow across all checks. Secondary button text contrast verified (`rgb(255, 255, 255)` over ember border).

### 2026-09-18 — Antigravity (Modernize ServiceGuideTemplate.css & Retrofit 4 Pilot Guide Pages)

- **Modernized Guide Family Shared Template (`client/src/styles/ServiceGuideTemplate.css`)**:
  - Completely eradicated legacy `--redesign-*` tokens (`--redesign-page`, `--redesign-hero-max`, `--redesign-accent`, `--redesign-ink`, `--redesign-surface`, `--redesign-radius-*`) and `--font-*` properties.
  - Upgraded fully to canonical `--bb-*` design tokens (`--bb-color-page`, `--bb-wrap-max`, `--bb-color-ink-950`, `--bb-color-surface`, `--bb-color-teal-*`, `--bb-color-amber-*`, `--bb-font-display`, `--bb-font-sans`, `--bb-radius-card`, `--bb-radius-control`, `--bb-shadow-card`).
  - Wrapped element resets in `.service-guide :where(...)` for zero-specificity protection.
  - Modernized hero buttons with canonical gradients (`.bb-btn--teal` and `.bb-btn--ember` styling) and light-surface button variations.
- **Retrofitted 4 Pilot Guide Pages (`/koppling`, `/avgassystem`, `/oljebyte`, `/bromssystem`)**:
  - Replaced legacy `Header`/`Footer` with canonical Public Shell (`PublicHeader variant="overlay"` + `PublicFooter`).
  - Preserved 100% of Swedish copy, FAQs, component logic, and booking modal triggers.
- **Strict CSS safety**: `client/src/css/index.css` remained completely untouched (0 lines changed).
- **Verification**:
  - `npm --prefix client run build`: Passed cleanly with zero errors.
  - `git diff --check`: Clean, 0 whitespace errors.
  - Playwright Multi-Viewport Verification across all 4 routes (`/koppling`, `/avgassystem`, `/oljebyte`, `/bromssystem`) at 1440px, 768px, and 390px viewports: $\Delta = 0\text{px}$ horizontal overflow across all 12 checks.
  - Visual inspection confirmed crisp typography, clean hero clearance under sticky `PublicHeader`, and intact interactive modals.

### 2026-09-18 — Antigravity (Retrofit Kontakt page to Canonical Design System & Shared Elements)

- **Standardized Kontakt Page (`/kontakt`) to consume canonical design hierarchy**:
  - **Canonical Design Tokens (`design-tokens.css`)**: Switched all local color codes, radii, spacing, and typography to canonical `--bb-*` tokens (`--bb-color-page`, `--bb-color-ink-950`, `--bb-color-ink-900`, `--bb-color-teal-*`, `--bb-color-amber-*`, `--bb-color-border-subtle`, `--bb-shadow-card`).
  - **Canonical Shared Elements (`shared-elements.css`)**:
    - Hero: Adopted `.bb-hero`, `.bb-hero__media` with picture tag (`about-hero-bg.webp`/`.jpg`), `.bb-hero__shade`, `.bb-hero__content`, `.bb-hero__copy`, and `.bb-hero__actions`.
    - Containers: Replaced all `.kontakt-page__wrap` with canonical `.bb-wrap`.
    - Typography: Converted headings and eyebrows to `.bb-h1`, `.bb-h2`, `.bb-accent`, `.bb-eyebrow`, `.bb-eyebrow--dark`, `.bb-lead`, `.bb-lead--dark`.
    - Buttons: Replaced all `.kontakt-page__btn*` with `.bb-btn`, `.bb-btn--teal`, `.bb-btn--ember`, and `.bb-btn--ember-solid`.
    - Reset safety: Scoped local resets with `:where(...)` to avoid specificity collisions.
  - **Component & Stylesheet Refactoring (`ContactPage.tsx` / `ContactPage.css`)**:
    - Preserved all Swedish copy, contact details, Google Maps URLs, form fields, and booking modal triggers verbatim.
    - Pruned 120+ lines of redundant CSS from `ContactPage.css` (down from 469 lines to 349 lines).
  - **Strict CSS safety**: `client/src/css/index.css` remained completely untouched (0 lines changed).
  - **Verification**: Verified with Playwright across 1440px desktop, 768px tablet, and 390px mobile viewports:
    - $\Delta = 0\text{px}$ horizontal overflow across all viewports.
    - `npm --prefix client run build` passed with zero errors.
    - Visual inspection of captured screenshots confirmed clean typography hierarchy, crisp buttons, proper contrast, and zero layout bugs.


### 2026-09-18 — Antigravity (Canonical Full-Bleed Hero System Elevation: Landing as Truth)

- **Elevated the Landing Page (`/`) Hero into the canonical standard for all full-bleed heroes on independent pages**:
  - **Explicit Scope Boundary (confirmed by Magnus)**: Applies strictly to new independent pages disconnected from legacy `index.css` (currently Landing `/` and Bilservice `/service-reparationer`). Legacy pages connected to `index.css` remain 100% frozen.
  - **Canonical Design Tokens (`design-tokens.css`)**:
    - `--bb-hero-min-height: clamp(700px, 58vw, 850px);`
    - `--bb-hero-min-height-mobile: 780px;`
    - `--bb-hero-copy-max-width: 540px;`
    - `--bb-hero-padding-top: clamp(7rem, 11vw, 9rem);`
    - `--bb-hero-padding-bottom: clamp(2rem, 3.5vw, 3.5rem);`
    - `--bb-hero-padding-top-mobile: 7rem;`
    - `--bb-hero-padding-bottom-mobile: 1.6rem;`
  - **Canonical Shared Elements (`shared-elements.css`)**:
    - Added full `.bb-hero` class system: `.bb-hero`, `.bb-hero__media`, `.bb-hero__shade`, `.bb-hero__content`, `.bb-hero__copy`, `.bb-hero__actions`, and `.bb-hero__bottom`.
    - Bakes in the dual-layer scrim overlay (`90deg` dark-to-translucent ink + `0deg` bottom-to-top vignette) on desktop and mobile.
    - Standardizes the `display: flex; flex-direction: column;` title stacking, mixed-case `.bb-h1`, and `.bb-accent` teal word highlights.
    - Anchors `.bb-trust-row` and conversion widgets in `.bb-hero__bottom` with automatic responsive column stacking at 1120px and 650px.
  - **Refactored Landing Page (`LandingPage.tsx` / `LandingPage.css`)**:
    - Adopted `.bb-hero*` in JSX; pruned all local `.landing-v2__hero*` desktop and mobile rules (~35 lines removed, `LandingPage.css` now down to 117 lines).
  - **Refactored Bilservice Page (`ServiceReparationerPage.tsx` / `ServiceReparationerPage.css`)**:
    - Adopted `.bb-hero` full-bleed structure; wired `PublicHeader` with `variant="overlay"`; anchored `.bb-trust-row` into `.bb-hero__bottom`.
    - Sized `ImageSlot` placeholder to fill 100% within `.bb-hero__media` behind the `.bb-hero__shade` scrim, ready for drop-in real photography.
    - Pruned all local `.bilservice__hero*` desktop rules, inner wrappers, and 1024px media query overrides (~40 lines removed, `ServiceReparationerPage.css` now down to 196 lines).
  - **PublicHeader Alignment**:
    - Verified `variant="overlay"` frosted navigation pill, white link contrast, and portal stacking context (`z-index: 100`) against the standardized dark hero canvas.
- **Strict CSS safety**: `client/src/css/index.css` remained completely untouched (0 lines changed). `git diff --check` passed with 0 errors.
- **Verification**: Verified via Playwright across 1440px desktop, 768px tablet, and 390px mobile viewports with 0px horizontal overflow (`delta = 0`) across both routes. Client build (`npm run build`) passed with 0 errors. Full test suite (`npm run test:browser`) passed 3/3.

### 2026-09-18 — Antigravity (Site-wide Harmonization & Canonical Elevation: Landing + Bilservice)

- **Harmonized Landing Page (`/`) and Bilservice Page (`/service-reparationer`) based on Magnus's three authoritative decisions**:
  1. **Canvas**: Standardized on Landing's `--bb-color-page: #f8f7f3` site-wide (eliminating Bilservice's one-off `#f5f3ee` and `#faf9f6`).
  2. **Dark Palette**: Adopted Canonical Ink (`--bb-color-ink-950: #071416`, `--bb-color-ink-900: #0d1f22`) site-wide (eliminating Bilservice's petrol drift `#07181c`, `#0a2429` in hero, value cards, tier cards, and promo banner).
  3. **Process Layout**: Unified on Landing's process step layout as canonical standard (number `01` above `.bb-icon-bare`, glowing horizontal amber connector line `li::after`).
- **Elevated 4 new canonical component patterns into `client/src/styles/shared-elements.css` (`.bb-*`)**:
  - **`.bb-trust-row`**: 3-pillar hero trust pattern (*Personlig service*, *Erfarna mekaniker*, *Tryggt och enkelt*), containing `.bb-trust-row__item`, `.bb-icon-bare`, and `.bb-trust-row__text` (`<b>` + `<small>`). Responsive 1-column stack on mobile (<=650px).
  - **`.bb-process-grid`**: 5-step workshop protocol process layout (`<ol className="bb-process-grid">`), number `01` above `.bb-icon-bare`, with glowing horizontal amber connector line across steps. Responsive 3-col on tablet, 2-col on mobile.
  - **`.bb-promo-card`**: Dark cross-sell / promo banner card (`linear-gradient(135deg, var(--bb-color-ink-900) 0%, var(--bb-color-ink-950) 100%)`), containing `.bb-promo-card__copy` (`.bb-eyebrow--dark` + `h3`) and `.bb-btn--teal`. Responsive column stack on mobile (<=640px).
  - **`.bb-card--trust`**: Light surface reassurance card (`background: var(--bb-color-surface, #fff)` with `var(--bb-shadow-card)`), containing `.bb-card--trust__icon`, `.bb-card--trust__text` (display `h3` + `.bb-lead`), and action buttons. Responsive column stack on mobile (<=640px).
- **Refactored pages and pruned redundant local rules**:
  - `LandingPage.tsx`: Adopted `.bb-trust-row` in hero-bottom and `<ol className="bb-process-grid">` in process section.
  - `LandingPage.css`: Mapped local variables directly to canonical tokens (`--landing-ink: var(--bb-color-ink-950);`, etc.), pruned redundant `.landing-v2__trust-row*` rules, and pruned `.landing-v2__process-content ol/li*` rules.
  - `ServiceReparationerPage.tsx`: Replaced `.bilservice__hero-trust` with `.bb-trust-row`, replaced old arrowed process steps with `<ol className="bb-process-grid">`, replaced `.bilservice__promo` with `.bb-promo-card`, and replaced `.bilservice__trust-card` with `.bb-card--trust`. Removed unused `Fragment` import.
  - `ServiceReparationerPage.css`: Updated canvas and surface to `var(--bb-color-page)` and `var(--bb-color-surface)`. Switched hero, value cards, and tier cards from petrol to canonical ink. Pruned all redundant local `.bilservice__hero-trust*`, `.bilservice__process-steps*`, `.bilservice__promo*`, and `.bilservice__trust-card*` rules (~70 lines removed).
- **Documentation**: Updated `docs/DESIGN_SYSTEM.md` (§2a) with the 4 elevated components and the 3 harmonization decisions.
- **Strict CSS safety**: `client/src/css/index.css` remained completely untouched (0 lines changed).
- **Verification**: Verified via Playwright at 1440px desktop, 768px tablet, and 390px mobile viewports with 0px horizontal overflow across both Landing and Bilservice. Client build (`npm run build`) passed with 0 errors. Full test suite (`npm run test:browser`) passed 3/3.

### 2026-09-18 — Antigravity (Bilservice `/service-reparationer` canonical CSS styling rules pass)

- **Applied full canonical CSS styling rules from `shared-elements.css` and `design-tokens.css` across Bilservice page**:
  - **Value Cards ("Varför är bilservice viktigt?")**:
    - Converted non-canonical teal circle icons to canonical `.bb-icon-badge` (amber-tinted rounded square, `rgba(240, 149, 5, 0.15)` with `--bb-color-amber-500` icon).
    - Fixed the card body stretch bug: added `flex: 1; display: flex; flex-direction: column;` to `.bilservice__value-body` and set dark card background `var(--bilservice-petrol-900)` so shorter cards (e.g. Card 3 "Prestation") stretch seamlessly with 0 white gaps at the bottom.
    - Updated container to `border-radius: var(--bb-radius-card);` and `box-shadow: var(--bb-shadow-card);`.
  - **Process Section ("Så går det till hos oss")**:
    - Replaced local pale circle icon containers with canonical `.bb-icon-bare` (amber glyph with subtle drop-shadow).
    - Re-styled step numbers to white (`#fff`) and step arrows to canonical amber (`var(--bb-color-amber-500)`).
  - **Typography & Headings**:
    - Removed `text-transform: uppercase` from `.bilservice__hero-title` and `.bilservice__process-heading` to respect canonical Archivo 800 mixed-case heading rules (`.bb-h1`, `.bb-h2`).
    - Connected all body/supporting copy to `.bb-lead` (light surfaces) and `.bb-lead--dark` (dark surfaces).
  - **Trust Card**:
    - Updated icon to `.bb-icon-badge.bilservice__trust-icon` with `var(--bb-radius-sm)` and canonical amber accent.
    - Updated card container to `border-radius: var(--bb-radius-card);` and `box-shadow: var(--bb-shadow-card);`.
  - **Radius & Shadow Canonicalization**:
    - Standardized all card, bridge, promo, and image-slot radii to `var(--bb-radius-card)` and `var(--bb-radius-lg)`, eliminating arbitrary literal radii (`22px`, `24px`, `26px`, `30px`).
    - Converted local box-shadow definitions to `var(--bb-shadow-card)`.
    - Aligned local color tokens to canonical tokens (`--bilservice-muted: var(--bb-color-text-muted);`, `--bilservice-amber: var(--bb-color-amber-500);`, `--bilservice-container-max: var(--bb-wrap-max);`).
- **Strict CSS safety**: `client/src/css/index.css` remained completely untouched (0 lines changed).
- **Browser & Overflow verification**: Verified via Playwright at 1440px desktop, 768px tablet, and 390px mobile viewports:
  - `Viewport 1440px`: `clientWidth=1440`, `scrollWidth=1440`, `delta=0`
  - `Viewport 768px`: `clientWidth=768`, `scrollWidth=768`, `delta=0`
  - `Viewport 390px`: `clientWidth=390`, `scrollWidth=390`, `delta=0`
  - Zero horizontal overflow across all breakpoints. Client build (`npm run build`) passed with 0 errors.

### 2026-09-18 — Antigravity (Bilservice `/service-reparationer` retrofitted to canonical `shared-elements.css` layer)

- **Retrofitted Bilservice page (`ServiceReparationerPage.tsx` / `ServiceReparationerPage.css`, parent of the "Bilservice" shared family)** to consume canonical Level 0 shared design elements from `client/src/styles/shared-elements.css` (`.bb-*`), removing redundant page-local CSS while keeping 100% visual fidelity:
  - **Containers**: Wrapped all section inner containers with `.bb-wrap.bilservice__container` and hero inner container with `.bb-wrap.bilservice__hero-inner`.
  - **Eyebrows**: Converted hero and used-car promo eyebrows to `<p className="bb-eyebrow bb-eyebrow--dark">`. Pruned local `.bilservice__eyebrow*` and `.bilservice__promo-eyebrow` rules from `ServiceReparationerPage.css`.
  - **Headings & Accents**: Wired hero H1 to `.bb-h1`, section headings to `.bb-h2`, teal word highlights to `.bb-accent`. Pruned repetitive local display font clamps in `.bilservice__hero-title`, `.bilservice__price-heading`, `.bilservice__intro h2`, `.bilservice__bridge h2`, and `.bilservice__process-heading`.
  - **Buttons & CTAs**:
    - Hero & Process dark actions: Converted to `.bb-btn.bb-btn--teal` (primary "Boka tid" / "Ring oss") and `.bb-btn.bb-btn--ember` (outline call link).
    - Pricing & Reassurance light actions: Converted to `.bb-btn.bb-btn--ember-solid` (solid "Boka tid för bilservice" / "Boka tid nu") and `.bb-btn.bb-btn--ember` (phone link).
    - Used-car promo action: Converted to `.bb-btn.bb-btn--teal`.
    - Pruned all local `.bilservice__btn*` and `.bilservice__promo-link*` rules (~45 lines removed).
  - **Trust icons**: Converted hero trust row to `.bb-icon-bare` (amber glyph with subtle drop-shadow).
  - **CSS Reset Specificity**: Applied `:where(a)` and `:where(button, input, textarea, select)` inside `.bilservice` root to guarantee zero specificity leaks against shared component classes.
- **Strict CSS safety**: `client/src/css/index.css` remained completely untouched (0 lines changed).
- **Browser & Overflow verification**: Verified via Playwright at 1440px desktop, 768px tablet, and 390px mobile viewports:
  - `Viewport 1440px`: `clientWidth=1440`, `scrollWidth=1440`, `delta=0`
  - `Viewport 768px`: `clientWidth=768`, `scrollWidth=768`, `delta=0`
  - `Viewport 390px`: `clientWidth=390`, `scrollWidth=390`, `delta=0`
  - Zero horizontal overflow across all breakpoints. Client build (`npm run build`) passed with 0 errors.

### 2026-09-18 — Antigravity (Landing Page retrofitted to canonical `shared-elements.css` layer)

- **Retrofitted Landing Page (`LandingPage.tsx` / `LandingPage.css`) to consume the Level 0 shared design elements** from `client/src/styles/shared-elements.css` (`.bb-*`), removing redundant page-local CSS while keeping 100% visual fidelity:
  - **Wrap container**: Migrated `.landing-v2__wrap` to `.bb-wrap`.
  - **Buttons**: Converted hero and dark-section primary actions to `.bb-btn.bb-btn--teal`, hero call action to `.bb-btn.bb-btn--ember`, and light-surface actions (Services, About) to `.bb-btn.bb-btn--ember-solid`. Removed ~30 lines of redundant `.landing-v2__book`/`.landing-v2__call` rules and section overrides from `LandingPage.css`.
  - **Eyebrows**: Converted dark-surface eyebrows (Hero, Why, Process, Cars) to `.bb-eyebrow.bb-eyebrow--dark` and light-surface eyebrows (Services, About) to `.bb-eyebrow`. Removed local `.landing-v2__eyebrow*` and `.landing-v2__hero-eyebrow*` definitions.
  - **Headings & Accents**: Connected `#landing-v2-hero-title` to `.bb-h1`, all 5 section headings to `.bb-h2`, inline teal heading highlights to `.bb-accent`, and lead text to `.bb-lead` / `.bb-lead--dark`. Removed repetitive desktop `h2` font-size clamp rules.
  - **Cards & Arrows**: Converted Why-section reassurance panel to `.bb-card--glass`, Services-grid cards to `.bb-card--photo`, replaced legacy shade div with `.bb-card--photo::after`, and wired `.bb-card-arrow` for the bottom-right ember arrow.
  - **Icons**: Connected Why-section icons to `.bb-icon-badge` (amber-tinted rounded square) and Hero trust-row / Process-step icons to `.bb-icon-bare` (amber glyph with subtle drop-shadow).
- **Strict CSS safety**: `client/src/css/index.css` remained completely untouched (0 lines changed).
- **Browser verification**: Verified via Playwright (`test:browser`) at 1440px desktop, 768px tablet, and 390px mobile viewports. All tests passed (3/3), screenshots visually verified, and 0px horizontal overflow across all viewports. Client build succeeded cleanly.

### 2026-09-18 — Claude (Docs sync pass; radius-safety audit; "too rounded" paused, not resolved)

- **Magnus flagged cards and possibly buttons as "too rounded"** — paused rather than guessed, since the radius tokens aren't uniformly safe to touch. Audited `PublicHeader.css`/`PublicFooter.css`'s actual `var(--bb-*)` usage (grepped, not assumed) to find out which tokens are still isolated to Landing's preview versus already live on the shipped shared header/footer. Result: `--bb-radius-card`/`--bb-radius-md` are safe to tune against Landing alone; `--bb-radius-control` (the pill shape) is not — it's used by both the header's nav pill/booking button and the footer's book button, so changing it lands site-wide immediately, not just in preview. Same split found for several color/font/shadow tokens. Full safe/unsafe list now in `docs/DESIGN_SYSTEM.md` under "Radius tokens: what's safe to tune vs. already live," so this doesn't need re-deriving next time a token change is considered. **Not resolved** — waiting on Magnus to say whether "too rounded" means cards only or button shape too.
- **Full documentation sync** (this entry's actual request): `docs/DESIGN_SYSTEM.md` §2a was stale — still described the pre-rename `.bb-btn--primary`/`--outline` (now `--teal`/`--ember`/`--ember-solid`) and didn't mention the headings/`.bb-accent`/`.bb-lead`/`.bb-card-arrow` additions from the comprehensive re-sync pass. Rewritten to match `shared-elements.css` exactly. Added `shared-elements.css` to `docs/CSS_OWNERSHIP.md`'s Level 0 layer list (was missing entirely). `AGENTS.md`'s master-blueprint bullet already mentioned it from an earlier edit today — left as-is, still accurate.
- **Current plan, for the record** (nothing new, consolidating what's been agreed across this session so this doesn't need reconstructing from scattered messages): Landing's detail-tuning pass is finished and `shared-elements.css` is fully re-synced to it. Next is a commit, then a fresh context window, then Magnus will ask for the retrofit — replacing each page's site-specific button/eyebrow/heading/card/icon CSS with the `.bb-*` shared classes. The rounding question stays open until then; it doesn't block the retrofit since none of the radius tokens in question change shape/structure, only the corner values.

### 2026-09-18 — Claude (Landing detail pass finished; comprehensive `shared-elements.css` sync; a second reset-specificity bug found and fixed on 3 pages)

- **Landing detail-tuning pass (live, iterative, verified with real Playwright screenshots and `:hover` triggers at each step)**: hero primary/outline buttons got a live-tuned treatment ("teal_button", "ember_button" — Magnus's names) with a transparent-to-color horizontal gradient, thin border, and a hover state per button; extended that treatment from hero-only to all four dark-photo sections (why/process/cars too) after Magnus asked why they didn't match, which also surfaced a real bug (see below); the two light-surface buttons (Services, About) got a separate solid diagonal ember gradient with a neutral drop shadow and a slight inset bevel, replacing a colored glow that didn't fit a white background; process-step connector lines/numbers/icons re-colored (white numbers, ember lines, ember bare icons with drop-shadow) and their pale circular plates removed entirely; why-section list icons and service-card arrows re-colored ember; service-card icon badges removed outright (Magnus is replacing those images); service-card scrim gradient made more translucent.
- **Found a second instance of the reset-specificity bug class** (first found earlier today on `font: inherit`, documented in `docs/DESIGN_SYSTEM.md`): `.landing-v2 a { color: inherit }` (class+type, higher specificity) was silently overriding `.landing-v2__book { color: #fff }` (single class) on every `<a>`-based button. It stayed invisible because `inherit` isn't an obviously-wrong value — on the four dark-photo sections the ambient color was already white, so it happened to look right; only on the two light sections (Services, About) did it actually resolve to the wrong (dark ink) color, caught via `getComputedStyle()`, not by eye. Fixed with the same `:where()` pattern as the font-weight bug. **Audited Kontakt and Biltjänster for the identical latent risk** (same `.page a { color: inherit }` line) — both had it, neither had visibly triggered it yet only because their `<a>`-buttons currently all happen to sit on matching-color dark backgrounds. Fixed both pre-emptively rather than leaving a landmine. Documented the generalized rule in `docs/DESIGN_SYSTEM.md`.
- **Comprehensively re-synced `shared-elements.css`** against Landing's final, fully-verified state (not just re-read from memory of earlier edits): added a third button variant `.bb-btn--ember-solid` for light surfaces (distinct from the dark-surface `.bb-btn--ember`, which is transparent/outline-style — these are visually different treatments, not two sizes of the same thing); recolored `.bb-icon-badge` from teal to ember (the only surviving badge-icon instance on the page is now ember, and "ember is the accent" per Magnus); removed `.bb-icon-badge--circle` entirely since the pattern it described (pale circle behind a process-step icon) was explicitly removed from the reference page and shouldn't be preserved as a phantom shared pattern; updated `.bb-card--photo`'s scrim gradient to the new translucency values; added `.bb-accent` (teal heading word-highlight), `.bb-lead`/`.bb-lead--dark` (muted body text color, light/dark surface), and `.bb-card-arrow` (the ember bottom-right "go to" affordance) — three small but genuinely consistent patterns found while doing the full pass that hadn't been captured yet.
- **Still deliberately not done**: no page has been retrofitted to consume any `.bb-*` shared class yet. Magnus's plan: this pass is the last thing before a commit and a fresh context window, after which the retrofit ("replace all the code that is site specific concerning buttons and stuff with the tokens") happens as its own focused pass.
- Verified in-browser (Playwright): 0px horizontal overflow at 1440/768/390px on Landing, Kontakt and Biltjänster; full-page screenshot review confirmed every button/icon/card change renders consistently across the whole page; 0 console errors beyond the known benign ones. `npm --prefix client run build` clean. 0 lines touched in `client/src/css/index.css`.

### 2026-09-18 — Claude (Landing polish pass + new canonical `shared-elements.css` layer)

- **Landing detail pass** (per Magnus, before any canonical work): hero trust-row icons (bare glyphs, no badge) got a subtle `drop-shadow` for legibility against the busy photo background — the only bare/badge-less icon spot on the page, confirmed by auditing all four icon usages rather than assuming.
- **New canonical layer**: `client/src/styles/shared-elements.css`, global `.bb-*` classes (no page prefix), imported once in `main.tsx` alongside `design-tokens.css`. Extracted directly from `LandingPage.css` as the now-finalized reference: `.bb-wrap`, `.bb-btn`/`--primary`/`--outline` (one button spec, every state), `.bb-eyebrow`/`--dark` (bakes in the amber-dash/white-text rule), `.bb-card--photo`/`--glass` (the two real card motifs), `.bb-icon-badge`/`--circle`/`.bb-icon-bare` (the three real icon treatments, deliberately not consolidated to one shape).
- **`design-tokens.css` additions**: `--bb-color-text-inverse` (closes the 40-occurrence raw-`#fff` gap found earlier), `--bb-shadow-button`, `--bb-shadow-card`.
- **Deliberately not done in this pass**: no existing page (Landing, Kontakt, Biltjänster, Bilservice) was retrofitted to consume the new classes yet — each still has its own page-local button/eyebrow/card CSS. Magnus's plan: commit this as its own checkpoint, start a fresh context window, then do the retrofit as a separate, focused pass so it isn't mixed into the same context as all of today's design-tuning back-and-forth.
- Verified purely additive: checked `.bb-*` class names against `index.css` and every existing stylesheet for collisions (none — the one substring hit, `bb-wrap`, was only other files referencing the pre-existing `--bb-wrap-max` token, not the new class), then confirmed all four live pages render identically and 0px-overflow-clean after the import was wired in, zero console errors beyond the known benign ones. `npm --prefix client run build` clean. 0 lines touched in `client/src/css/index.css`.

### 2026-09-18 — Claude (Found and fixed a real button bug: `<button>` CTAs silently lost their font-weight/size on 3 of 4 pages)

- Magnus asked "what about how buttons look" as a general consistency check, similar to the earlier eyebrow/radius questions. Pulled `getComputedStyle()` for every primary button across Landing, Kontakt, Biltjänster, and Bilservice to actually compare rather than eyeball it — and found a real, previously invisible bug, not just a style inconsistency.
- **Root cause**: each page's reset block includes a line like `.page button, .page input, .page textarea, .page select { font: inherit; }`. That selector (class + element type) is *more specific* than the single-class `.page__btn--primary { font-weight: 700; ... }` rule that's supposed to style the button — so on any actual `<button>` element, the reset silently wins and the button renders at the browser's inherited weight/size instead of bold. `<a>`-based buttons using the identical class (e.g. the "Ring" call links) aren't affected, since anchors don't match a `button` selector — which is exactly why this was invisible in every screenshot taken today: the two button styles sat right next to each other looking subtly different and it never registered as wrong.
- **Confirmed live** on Landing (pre-existing, not written today — this bug has been live since Landing was first built), Kontakt, and Biltjänster: "Boka tid"/submit buttons all rendered at `font-weight: 400` instead of `700`, and the wrong font-size (16px inherited vs. the intended 15.2px). Bilservice was unaffected only because its CSS predates this reset pattern.
- **Fix**: wrapped each reset's element list in `:where(...)`, which contributes zero specificity so it can never outrank a real component class — `.page :where(button, input, textarea, select) { font: inherit; }`. Documented as a standing rule in `docs/DESIGN_SYSTEM.md` ("`:where()` the reset, not the button") so every future unique page's reset block is written this way from the start instead of reintroducing the same bug.
- Verified in-browser via Playwright: all four pages' primary buttons now report `fontWeight: 700` consistently, matching their `<a>`-based counterparts; 0px horizontal overflow unaffected at 1440px (didn't re-check 768/390 since this was a font-weight/size fix with no layout impact, not a structural change). `npm --prefix client run build` clean. 0 lines touched in `client/src/css/index.css`.

### 2026-09-18 — Claude (Design rule: dark-surface eyebrows keep the amber dash but turn the text white)

- Magnus wanted this changed before the canonical shared-elements extraction, not after: on a dark background (dark card, dark section, photo hero), an eyebrow label's leading dash stays amber but its text turns white — amber text on dark was never the intended look. Documented as a permanent rule in `docs/DESIGN_SYSTEM.md` (new "Eyebrow color rule" section, right before "Card motifs").
- Applied everywhere the pattern currently exists: `LandingPage.css` (`.landing-v2__hero-eyebrow` and `.landing-v2__eyebrow--dark` — hero eyebrow plus the why/process/cars dark-section eyebrows) and `BiltjansterPage.css` (`.biltjanster-hub__eyebrow--dark`, the closing-CTA eyebrow). Checked Kontakt and Bilservice for the same pattern — neither uses an amber eyebrow at all (both already use teal on dark surfaces), so nothing to change there.
- Verified in-browser via Playwright screenshots on both affected pages (Landing hero, Landing "why" section, Biltjänster closing CTA): dash still amber, text now white, layout unaffected. `npm --prefix client run build` clean. 0 lines touched in `client/src/css/index.css`.

### 2026-09-18 — Claude (Landing page audited and tightened, ahead of extracting it as the shared design reference)

- **Why**: Magnus wants Landing's own button/eyebrow/card patterns extracted into a shared, globally-editable CSS layer (so changing a button once updates every `--bb-*` page). Before extracting from it, audited Landing itself the same way the day's other rebuilds were audited (index.css collision, legacy token refs, legacy classnames) — it's about to become the reference every other page copies from, so it needed to be clean first.
- **Findings**: `.landing-v2__*` has 0 collisions in `index.css`, no `--redesign-*`/legacy `--font-*` refs, no stray legacy classnames — Landing was already the cleanest page in the codebase (makes sense, it was built first). Two real issues found and fixed:
  1. **Border-radius had no system**: 9 distinct `border-radius` values in one file (`999px, 22px, 20px, 15px, 13px, 9px, 8px, 50%, 0`), several of them near-duplicates of each other or of existing `--bb-radius-*` tokens, all written as raw literals. Added `--bb-radius-md: 14px` to `design-tokens.css` (a genuine missing step between `--bb-radius-sm:8px` and `--bb-radius-card:20px`) and pointed every literal at the nearest token (13px/15px → the new `--bb-radius-md`, 8px/9px → `--bb-radius-sm`, 20px/22px → `--bb-radius-card`, 999px → `--bb-radius-control`). Left `50%` and the two mobile `border-radius:0` full-bleed resets as literals — those are intentional shapes, not a missing token. Verified with a before/after Playwright screenshot diff at 1440px: pixel-identical: the fix only changed 8–9 CSS radius values by 1–2px each, nothing perceptible.
  2. **Focus ring used a one-off gold (`#f6ce46`)** instead of the site's `--bb-color-focus` (cyan) used everywhere else (`PublicHeader`, `ContactFormCard`, and today's three rebuilds). Swapped to `var(--bb-color-focus)`.
- **Canonical values extracted via Playwright `getComputedStyle()` at 1440px** (not just source-reading, since `clamp()` values needed to be resolved to real pixels) for the upcoming shared-elements pass: primary/outline button (pill, 52px, exact gradient/border/shadow values), eyebrow label (2 color variants, same shape), three distinct icon-badge treatments (31px plain glyph / 44px circle / 32–34px rounded-square — not one shared shape), two distinct card motifs (dark image card vs. translucent glass panel), and H1/H2/body type scale. Not yet turned into a shared CSS file — that's the next step, pending Magnus's go-ahead.
- Verified in-browser (Playwright): 0px horizontal overflow at 1440/768/390px, 0 console errors (cleanest page yet — no local-API noise since Landing doesn't call `/api/services` on load). `npm --prefix client run build` clean. 0 lines touched in `client/src/css/index.css`.

### 2026-09-18 — Claude (Bilservice: legacy shell removed, migrated onto --bb-* tokens, ahead of family rollout)

- **Per Magnus's request, did this before extending the "Bilservice" family to Felsökning/Däckservice/AC-service**, since those three will inherit whatever `ServiceReparationerPage.css`/`.tsx` looks like once they mount on it — fixing it now avoids copying stale dependencies into three more pages.
- **Legacy shell removed entirely**: `ServiceReparationerPage.tsx` no longer imports `Header`/`Footer` — replaced with `PublicHeader variant="solid"` + `PublicFooter`. Checked the `.bilservice__*` class prefix against `index.css` first (per the collision rule added earlier today) — 0 matches, no rename needed.
- **Migrated off every remaining legacy token**: the page's scoped `--bilservice-*` custom properties (`--bilservice-ink`, `--bilservice-teal-800`, `--bilservice-teal-700`) previously pointed at `var(--redesign-ink)` / `var(--redesign-accent-dark)` / `var(--redesign-accent)` — repointed to `var(--bb-color-text)` / `var(--bb-color-teal-800)` / `var(--bb-color-teal-600)`. Bulk-replaced `var(--font-body)` → `var(--bb-font-body)`, `var(--font-heading)` → `var(--bb-font-display)`, and `var(--redesign-radius-pill)` → `var(--bb-radius-control)` throughout the CSS (35 total legacy references, now 0). Also found the page's 3 hero/heading accent spans used the shared legacy `.title-accent` class from `index.css` — renamed to a page-owned `.bilservice__accent`, and consolidated the two identical `.title-accent` color overrides in the CSS into that one rule (small de-bloat, not just a rename).
- **Verified in-browser**: 0px horizontal overflow at 1440/768/390px; checked the solid header's clearance against the hero specifically because this exact page had a documented clearance bug before (see the 2026-09-16 entry below) — still clear at all three widths with the new `PublicHeader` (75px+ clearance measured via `getBoundingClientRect()`), no regression. All sections (value cards, service tiers, process, closing) visually confirmed, only the expected local-API network errors in console. `npm --prefix client run build` clean. 0 lines touched in `client/src/css/index.css`.
- **Not done, left for the family rollout step**: no image search was done (explicitly out of scope per Magnus — placeholders stay). `ServiceGuideTemplate.css` (the Guide family's template) still has the same `--redesign-*`/no-PublicHeader issue and was not touched in this entry.

### 2026-09-18 — Claude (Kontakt rebuilt as a unique page; found and fixed a class-prefix collision bug on Biltjänster)

- **`/kontakt` rebuilt from scratch as a unique page**, matching a Magnus-supplied reference image as closely as available assets allow. `ContactPage.tsx` no longer imports the legacy `Header`/`Footer` — replaced with `PublicHeader variant="overlay"` (photo hero, same pattern as Landing) + `PublicFooter`. New colocated `ContactPage.css` (`.kontakt-page__*`), `--bb-*` tokens only. Sections: photo hero (eyebrow/title/lead/CTAs), two-column contact-details + "så fungerar det" steps card / message form (existing copy preserved verbatim from the pre-rebuild page), a new "Hitta till oss" band (real Google Maps `iframe` embed via the no-API-key `output=embed` URL, plus a dark teal directions card with the brand SVG logo as a faint watermark), a new "Personlig service i fokus" photo band, and a closing CTA with a third "Vägbeskrivning" button (all new, per the reference).
- **Hero photo**: no existing asset matches the reference's stylized garage-exterior-with-signage shot (likely an AI mockup, not real photography Magnus has on file). Reused `about/about-hero-bg.webp` (the handshake photo) instead — thematically a strong fit for a contact page and not yet claimed by a rebuilt `/om-oss` (still legacy). Flagging: when `/om-oss` gets its own unique-page rebuild, it will need a *different* hero photo since this one is now Kontakt's. "Personlig service i fokus" reuses `services/tires/tire-wheel-change.webp` (mechanic + tire), a close match to the reference's photo.
- **Found a real bug, not just a style choice**: `ContactPage.css` was first written reusing the exact `.contact-page__*` prefix the *legacy* `ContactPage.tsx` already used — and `index.css` still has 107 rules under that prefix (frozen, never deleted, still loaded globally via `main.tsx`). The result wasn't an isolated island; it was silently blending with 107 old rules, visible as the closing CTA rendering centered instead of left-aligned (an old `.contact-page__closing-card` rule in `index.css:7440-7516`). Renamed the entire new page to `.kontakt-page__*`, confirmed 0 remaining collisions, confirmed the bug gone.
- **Checked whether the earlier Biltjänster rebuild (same session) had the same bug — it did.** `.biltjanster-page__*` had 9 rules in `index.css` (from the legacy page's guide-card markup), and two of them genuinely collided with the new CSS: `.biltjanster-page__guide-media` and `.biltjanster-page__guide-placeholder`. Visible bug: every placeholder card ("Bild kommer") was rendering with a decorative dashed border neither written nor wanted, from `index.css`'s `.biltjanster-page__guide-media::after`. Renamed to `.biltjanster-hub__*` (0 collisions), rebuilt, confirmed the dashed border is gone.
- **New standing rule added to `docs/CSS_OWNERSHIP.md`**: before naming a new page's CSS island, `grep -c` the legacy page's old class prefix against `index.css`; if non-zero, pick a visibly different prefix. This is now a permanent check, not a one-off fix, since it will bite every remaining legacy-page rebuild (Om oss, Bärgning, Galleri, Bilar till salu, the two shared-family templates) if skipped.
- Verified in-browser: both pages re-tested after their renames at 1440/768/390px, 0px horizontal overflow, forms/mobile-menu/map embed all functional, `npm --prefix client run build` clean, 0 lines touched in `client/src/css/index.css`.

### 2026-09-18 — Claude (Architecture revised: 7 unique pages + 2 shared families; Biltjänster rebuilt)

- **Architecture decision (Magnus)**: the "7 Page Design Archetypes" model is retired. Om oss, Kontakt, Bärgning, Bilar till salu, Galleri, Biltjänster and Startsidan are each fully unique standalone pages with no shared template — content analysis showed they're too divergent to honestly share one. Only two groups remain templated: the "Bilservice" family (Bilservice, Felsökning, Däckservice, AC-service) and the "Guide" family (all ten technical guides, including the six that would have been a separate "Style 4" — there is no second guide template). Updated `HITL_Temporary_roadmap.md` (Section 2 blueprint + Section 3 execution plan, step count 8→7), `docs/CSS_OWNERSHIP.md` (architecture section + full route table), `AGENTS.md` (current-state blueprint bullet, guardrail #1, superseded-styling line — net -4 lines, stays under the frozen line cap), and `docs/DESIGN_SYSTEM.md` (intro line).
- **`/biltjanster` rebuilt as a unique page**: `BiltjansterPage.tsx` no longer imports the legacy `Header`/`Footer` at all — fully replaced with `PublicHeader variant="solid"` + `PublicFooter`. New colocated `BiltjansterPage.css` (`.biltjanster-page__*`), consuming only `--bb-*` tokens, zero dependency on `index.css`. Existing Swedish copy and the 11-guide directory data preserved verbatim; same real-photo/placeholder mix as before.
- **Fixed-pixel header clearance, not a `vw` clamp**: measured `PublicHeader`'s actual rendered height with `getBoundingClientRect()` on both sides of its own 1320px breakpoint (80px compact, ~121.6px full nav) and set the hero's `padding-top` as two fixed pixel values via a matching media query, per the clearance bug already documented in `AGENTS.md` from the Bilservice rebuild. Verified 24–32px clearance at 1440/768/390px, not the ~8px a naive `clamp()` would have given at 1440px.
- Verified in-browser (built-in browser pane): 0px horizontal overflow at 1440/768/390px, mobile menu opens and highlights "Biltjänster" active, booking modal opens cleanly on mobile. `npm --prefix client run build` clean, `BiltjansterPage` chunk code-splits normally (7.49kB). 0 lines touched in `client/src/css/index.css`.
- **Found but not yet fixed**: `ServiceReparationerPage.css` and `ServiceGuideTemplate.css` — the CSS owners of the two shared families — still reference `--redesign-*` custom properties (defined only in the frozen `index.css`), not `--bb-*`. None of the 5 pages already built on them (Bilservice, Koppling, Avgassystem, Oljebyte, Bromssystem) mount `PublicHeader`/`PublicFooter` yet either. Flagged to Magnus as the recommended next unit of work before extending either family further, so the dependency isn't copied into more pages.

### 2026-09-18 — Antigravity (GoogleReviewsCard: Verified Component & Zero Layout Shift Field)

- Verified Landing Page Hero Review Component: Confirmed that `LandingPage.tsx` strictly mounts the new Level 0 `GoogleReviewsCard` (`variant="hero-overlay"`) with zero references to legacy components or classes.
- Stabilized Review Bounding Field (Zero Layout Shift): Wrapped the hero-overlay review module in its own transparent, frosted-glass field container (`background: rgba(3, 22, 26, 0.42); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 16px; backdrop-filter: blur(8px)`).
- Eliminated Content Movement on Rotation: Fixed author track widths (`96px` desktop, `88px` mobile) and reserved quote min-heights across breakpoints (`84px` desktop/tablet, `158px` mobile). Measured in Playwright across all 4 customer reviews: card height and heroBottom height variance is exactly 0.0px (CLS = 0).
- Smooth Cross-Fade Transition: Added 220ms subtle cross-fade state during review cycling so reviews transition smoothly without visual snapping, while fully respecting `prefers-reduced-motion`.
- Mobile Responsive Polish: Redesigned mobile grid to a clean 2-row layout (rating & Google header row, followed by full-width review quote row) preventing horizontal word squashing.
- Verified: Playwright browser tests passed (3/3), 0px horizontal overflow, zero build errors, zero lines touched in `client/src/css/index.css`.

### 2026-09-18 — Antigravity (Extract standalone reusable ContactFormCard component)

- Extracted the "Skicka ett meddelande" contact module and form from `LandingPage.tsx` / `LandingPage.css` into a standalone, reusable Level 0 UI component: `client/src/components/ui/ContactFormCard.tsx` and `ContactFormCard.css`.
- Single Source of Truth: Centralized `defaultContactSubjects`, direct contact items (phone, email, address), and submission confirmation logic in one place so changes propagate site-wide.
- Multi-variant Architecture: Supports `variant="full-section"` (two-column layout with background decorative art and contact info column) and `variant="card-only"` (standalone teal gradient card with form fields, ideal for embedding in subpages or service guides).
- Scoped CSS: Built with `.bb-contact-section*` and `.bb-contact-form*` namespaces, fully driven by `--bb-*` design tokens (`--bb-font-display`, `--bb-font-body`, `--bb-color-teal-*`, `--bb-color-focus`).
- Integrated into `LandingPage.tsx` and pruned inline `ContactForm` and ~45 lines of legacy `.landing-v2__contact-*` / `.landing-v2__form-*` rules.
- Real-browser verified via Playwright: 3/3 tests passed with 0px horizontal overflow at 1440px, 768px, and 390px; visual review confirmed zero regression.
- Strict CSS safety: 0 lines edited in `client/src/css/index.css`; client production build succeeded with 0 errors.

### 2026-09-18 — Antigravity (Extract standalone reusable GoogleReviewsCard component)

- Extracted the Google reviews module from `LandingPage.tsx` / `LandingPage.css` into a standalone, reusable Level 0 UI component: `client/src/components/ui/GoogleReviewsCard.tsx` and `GoogleReviewsCard.css`.
- Single Source of Truth: Created `defaultGoogleReviews` array with verified Brynäs Bilservice reviews (4.3 rating, 50 reviews, link to Google Maps profile).
- Multi-variant Architecture: Supports `variant="hero-overlay"` (transparent, text-shadowed, end-aligned for dark heros) and `variant="card"` (self-contained dark ink card with border and shadow for page bodies and sidebars).
- Accessible & Motion-safe: Encapsulates 8s cyclic rotation, cleans up interval on unmount, respects `prefers-reduced-motion: reduce`, and renders as a single accessible `<a>` tag with clear `aria-label` and visible focus state.
- Scoped CSS: Powered exclusively by `--bb-*` tokens (`--bb-font-display`, `--bb-font-body`, `--bb-color-amber-500`, `--bb-color-focus`).
- Integrated into `LandingPage.tsx` and pruned redundant inline `LandingReviews`, inline reviews array, `Star` component, and ~30 lines of legacy `.landing-v2__reviews*` rules.
- Real-browser verified via Playwright: 3/3 tests passed with 0px horizontal overflow at 1440px desktop, 768px tablet, and 390px mobile viewports; visual review confirmed zero regression.
- Strict CSS safety: 0 lines edited in `client/src/css/index.css`; client production build succeeded with 0 errors.

### 2026-09-17 — Antigravity (Landing Page: Eyebrow Preceding Lines & Amber Accent on Dark Cards)

- Added the standard preceding 23px accent line (`::before`) to all section eyebrows (`.landing-v2__eyebrow`), matching the hero format across the entire landing page.
- Styled `.landing-v2__eyebrow--dark` (Why section, Process section, Cars section) and its preceding line in the amber accent (`var(--landing-amber)` / `--bb-color-amber-500: #f09505`), while light section eyebrows (Services, About) use deep teal (`var(--landing-teal-deep)` / `--bb-color-teal-800: #007a86`).
- `PublicFooter` strictly untouched.
- Verified via Playwright across 1440px, 768px, and 390px with 0px horizontal overflow; confirmed build with 0 errors; 0 edits to `client/src/css/index.css`.

### 2026-09-17 — Antigravity (Landing Page: Hero "Ring oss nu" Outline to Amber Accent)

- Updated the outline of the secondary call button (`.landing-v2__call`) in the landing hero to the canonical amber accent token (`var(--landing-amber)` / `--bb-color-amber-500: #f09505`).
- Styled the hover outline to brighter amber (`--bb-color-amber-400: #fca311`), creating a warm and distinct secondary action pairing with the primary cyan `BOKA TID` pill.
- Verified via Playwright at 1440px, 768px, and 390px with 0px horizontal overflow; confirmed build with 0 errors; 0 edits to `client/src/css/index.css`.

### 2026-09-17 — Antigravity (Landing Page: Hero Eyebrow Text and Amber Accent)

- Updated hero eyebrow text in `LandingPage.tsx` from "Din bilverkstad i Brynäs, Gävle" to "Din lokala bilverkstad i Gävle" (`DIN LOKALA BILVERKSTAD I GÄVLE`).
- Styled both the text and its preceding line indicator (`.landing-v2__hero-eyebrow` and `::before`) with the amber accent token (`var(--landing-amber)` / `--bb-color-amber-500: #f09505`).
- Verified via Playwright at 1440px, 768px, and 390px with 0px horizontal overflow; confirmed build with 0 errors; 0 edits to `client/src/css/index.css`.

### 2026-09-17 — Antigravity (Landing Page: Hero Trust Row Symbols to Amber Accent)

- Updated the three trust icons at the bottom of the landing page hero (`.landing-v2__trust-row i` — check-shield, wrench, and clock) from teal to the canonical amber accent token (`var(--landing-amber)` / `--bb-color-amber-500: #f09505`).
- Preserved the white headings and light-gray subtext, creating a warm, balanced accent that harmonizes with the Google review badge and the amber elements across the design.
- Verified via Playwright at 1440px, 768px, and 390px with 0px horizontal overflow; confirmed build with 0 errors; 0 edits to `client/src/css/index.css`.

### 2026-09-17 — Antigravity (Landing Page: Remove Duplicate Closing CTA Card Before PublicFooter)

- Removed duplicate closing section ("BEHÖVER DIN BIL HJÄLP?") and panel (`.landing-v2__closing-section`) from `LandingPage.tsx`, eliminating redundant repetition of contact info, hours, and booking buttons immediately above `PublicFooter`.
- Pruned obsolete `.landing-v2__closing-*` CSS rules from `LandingPage.css` and adjusted `.landing-v2__cars-section` bottom margin (`clamp(3.2rem, 5vw, 5rem)`, mobile `3.5rem`) for clean spacing before `PublicFooter`.
- Verified with Playwright across all 3 viewports (1440px desktop, 768px tablet, 390px mobile): all passed with zero horizontal overflow; captured and visually confirmed screenshots.
- Zero edits to `client/src/css/index.css`; client production build succeeded with 0 errors.

### 2026-09-17 — Antigravity (Canonical Public Shell Documentation Reconciliation)

- Reconciled documentation across `HITL_Temporary_roadmap.md`, `AGENTS.md`, `docs/CSS_OWNERSHIP.md`, `docs/AGENT_HANDOFF.md`, and `docs/DESIGN_SYSTEM.md` to record the completion and role of the three standalone Public Shell elements:
  1. `PublicHeader` (`PublicHeader.tsx` + `PublicHeader.css` + `publicNavigation.ts`): Standalone floating sticky/portal header (`z-index: 100`) with desktop navigation pill, Biltjänster dropdown, and mobile menu panel.
  2. `PublicFooter` (`PublicFooter.tsx` + `PublicFooter.css`): Standalone 4-column automotive footer matching Magnus's approved mockup, with contour logo, trust badges, amber signature, quick links, contact badges, opening hours, booking CTA, and atmospheric wheel background (`footer-wheel-bg.webp`).
  3. `GalleryTeaserCard` (`GalleryTeaserCard.tsx` + `GalleryTeaserCard.css`): Standalone interactive Ken Burns workshop slideshow card with single-source `defaultWorkshopSlides` array.
- Marked Step 1 and Step 2 as `[COMPLETED & LOCKED]` in `HITL_Temporary_roadmap.md`; established Step 3 (rebuilding `/kontakt` and `/om-oss` from scratch as Style 1) as the immediate next active step.
- Strictly maintained `AGENTS.md` at 314 lines (well below the $\le 333$ line target and 344 pre-commit limit).
- Verified zero edits to frozen `client/src/css/index.css`.

### 2026-09-17 — Magnus & Antigravity (Canonical Design Tokens & PublicFooter Rebuild Against Approved Mockup)

- Built canonical standalone `PublicFooter.tsx` and `PublicFooter.css` (`.bb-footer*`) based faithfully on Magnus's approved automotive mockup (`media_1789659344071.png` and `media_1789659349199.png`).
- 4-Column Layout:
  1. Brand: Contour logo, amber-dashed eyebrow, descriptive copy, 3 trust badges (*Tryggt och enkelt*, *Personlig service*, *Erfarna mekaniker*), and crisp amber script signature *"Vi håller din bil i rullning!"* with brush underline.
  2. Snabba länkar: 9 navigation destinations with interactive chevrons.
  3. Kontakt: 4 dark-teal rounded icon badge items (phone, email, visiting address, Google Maps link).
  4. Öppettider & CTA: Centered circular clock badge with formatted hours table, cyan-pill `BOKA TID →` button, and amber direct phone link `RING OSS: 070-553 33 95`.
  5. Sub-footer: Dynamic copyright year, workshop tagline, centered Facebook and Instagram buttons, and legal links.
- Background: Atmospheric automotive wheel asset (`footer-wheel-bg.webp`) with warm rim lighting anchored on the right and smooth petrol gradient fade to deep `#061518`.
- Promoted typography, line-height, amber accent, and container tokens into `client/src/styles/design-tokens.css`.
- Mounted `PublicFooter` on `LandingPage.tsx` and pruned 50+ lines of redundant legacy `.landing-v2__footer*` CSS.
- Real-browser verified via Playwright: 0px horizontal overflow across desktop (1440px), tablet (768px), and mobile (390px). Verified 0 edits to `client/src/css/index.css`.

### 2026-09-17 — Antigravity (Extract standalone reusable GalleryTeaserCard component)

- Extracted the Ken Burns workshop gallery teaser card from `LandingPage.tsx` / `LandingPage.css` into a standalone, reusable UI component: `client/src/components/ui/GalleryTeaserCard.tsx` and `GalleryTeaserCard.css`.
- Single Source of Truth: Created `defaultWorkshopSlides` array within `GalleryTeaserCard.tsx` so workshop slide images and alts can be modified in ONE single place, propagating across startsidan, `/om-oss`, and future service pages.
- Configured scoped `.bb-gallery-card` styles powered by `--bb-*` design tokens, Ken Burns transitions, accessible focus, and responsive mobile overrides. Added `--bb-color-page: #f8f7f3;` and `--bb-color-teal-800: #007a86;` to `design-tokens.css`.
- Verified 0-error build (`npm --prefix client run build`), 0px horizontal overflow across all three viewports (1440px, 768px, 390px) with Playwright, and pixel-identical visual presentation.

### 2026-09-17 — Magnus & Antigravity (7-Style Master Blueprint & Anti-Drift Documentation Reconciliation)

- Formalized the master architectural plan in `AGENTS.md` and `docs/CSS_OWNERSHIP.md`: total eradication of `index.css` via Canonical Tokens (`design-tokens.css` with `--bb-*`) and 7 page design archetypes (Style 1: Brand/Landing, Style 2: Bilservice/Editorial, Style 3: Tech Guides A, Style 4: Tech Guides B, Style 5: Bespoke Gallery, Style 6: Bespoke Car Sales, Style 7: Canonical Core).
- Created `HITL_Temporary_roadmap.md` detailing the 7-style architecture diagram, execution phases (Phase 1 through 7), task checklists, and strict rebuild rules.
- Codified strict anti-drift guardrails in `AGENTS.md`: no 4th design systems, `--bb-*` tokens only, standalone `PublicHeader` authority, zero incremental "fixing" of legacy pages in `index.css`, and mandatory Playwright checks. Added clear agent primer explaining what `HITL_Temporary_roadmap.md` is, why it's there, and why it's temporary across agent context switches.
- Trimmed stale legacy references in `AGENTS.md` to safely keep the document within the pre-commit ceiling (333 lines vs 344 limit).
- Removed dead leftover `client/src/data/marquee-items.txt` and updated `instructions.md` and `CLAUDE.md` to eliminate references to deleted legacy section components (`Hero.tsx`, `About.tsx`, `Services.tsx`, `Contact.tsx`).

### 2026-09-17 — Antigravity (Landing hero Google review scale & readability enhancement)

- Scaled up the Google review badge and quote in `LandingPage.css` and `LandingPage.tsx`: increased rating number, Google label, reviewer name, star icons (from 11px to 13px), and quote text (from ~8.8px to readable 0.84rem / ~13.5px).
- Expanded `.landing-v2__reviews` max-width and adjusted hero-bottom grid distribution to comfortably give the review text room without awkward wrapping.
- Added `--disable-gpu` to `playwright.config.ts` for smooth sandbox compatibility, captured real browser screenshots at 1440, 768, and 390 CSS pixels, and verified zero horizontal overflow across all viewports.

### 2026-09-17 — Magnus & Antigravity (Landing padding, distancing and architecture verification)

- Refined spacing, section padding, and distancing on the landing page (`LandingPage.css`) within its isolated `--landing-*` scope.
- Verified all new architecture files: standalone `PublicHeader.tsx`, `PublicHeader.css`, `design-tokens.css`, and `publicNavigation.ts`.
- Confirmed strict CSS safety: `client/src/css/index.css` has zero diff, `git diff --check` is clean, and `npm --prefix client run build` succeeds with zero errors.

### 2026-09-17 — Codex (Landing contact alignment)

- Reduced only the Landing contact-grid gap, bringing the “Hör av dig till oss” column closer to the “Skicka ett meddelande” form without changing either block’s content or Bilservice.

### 2026-09-17 — Codex (Landing typography harmonization)

- Harmonized only `LandingPage.css` to the Bilservice page's readable type hierarchy: 1rem/1.6 body copy, .92rem/1.55 supporting copy, .78rem labels, .95rem controls, less extreme display-heading sizing, and more balanced display line-height.
- Defined those scales as Landing-local `--landing-*` variables. The Landing stylesheet contains no `--redesign-*`, `--font-*` or `--color-*` reference; it does not import or depend on Bilservice or `index.css` CSS.
- Playwright visually reviewed Landing at 1440px, 768px and 390px, with zero horizontal overflow at all three widths. Bilservice and `index.css` had no file diff.

### 2026-09-17 — Codex (Landing spacing rhythm)

- Tightened only `LandingPage.css`: reduced oversized Landing section padding, section-to-section margins, and desktop grid gaps to a closer 3–6rem rhythm, using `/service-reparationer` only as a visual reference.
- Preserved Landing content, hero, cards, typography, Header and interactive behavior. `ServiceReparationerPage.tsx` and `ServiceReparationerPage.css` were not changed.
- Playwright captured Landing at 1440px and 390px with zero overflow. The desktop Landing height reduced from 4643px to 4346px; Bilservice remained 4312px before and after the pass.

### 2026-09-17 — Codex (PublicHeader scroll-layer correction)

- Moved only the independent `PublicHeader` render target to the document root with a React portal and raised its own z-layer to 100. This lets its fixed scrolled state sit above Landing sections despite the Landing hero's isolated stacking context; no Landing or legacy stylesheet was changed.
- Playwright confirmed the previous defect (hit-testing reached the contact section despite a fixed header) and the repaired behavior (hit-testing reaches a header navigation link). The open Biltjänster dropdown was also confirmed interactive and above page content after scrolling.

### 2026-09-17 — Codex (PublicHeader logo scale)

- Enlarged only the independent desktop header logo from 220×54px to 260×64px.
- Moved the independent header's desktop-to-compact breakpoint to 1320px so the larger logo and readable menu are never compressed together. Tablet and mobile logo constraints remain unchanged.
- Playwright verified the enlarged logo, breakpoint transition and zero horizontal overflow at 1440, 1321, 1320, 768 and 390 CSS pixels; the 1440px result was visually reviewed.

### 2026-09-17 — Codex (PublicHeader full menu-link correction)

- Corrected the incomplete typography pass within the independent public header only: Biltjänster submenu links and mobile menu links now also render at 16px / Manrope 700, matching every desktop navigation item.
- Removed the header-only `stackedLabel` treatment, so `Till salu` is a normal one-line navigation label on both desktop and mobile.
- Playwright inspected the open desktop dropdown and open mobile panel, confirmed all 20 declared menu destinations map to registered client routes (plus the intentional telephone link), and found zero horizontal overflow at 1440px and 390px.

### 2026-09-17 — Codex (PublicHeader desktop navigation typography)

- Changed only `client/src/components/layout/PublicHeader.css`: all desktop public-navigation items now explicitly render at 16px, Manrope 700, matching the former Biltjänster presentation exactly. The higher-specificity header selector prevents Landing CSS from treating the Biltjänster `<button>` differently from the other navigation links.
- Moved the existing compact-menu breakpoint to 1120px, preserving the requested readable desktop typography without compressing it at narrower widths. The independent mobile header/menu remains unchanged.
- Playwright checked the rendered typography at 1440px and 1121px (every item: 16px / 700), verified the deliberate mobile switch at 1120px, and confirmed zero horizontal overflow at 1440, 1121, 1120, 768 and 390 CSS pixels. A 1440px screenshot was visually reviewed.

### 2026-09-17 — Codex (independent PublicHeader foundation)

- Added `design-tokens.css` (`--bb-*` only), a canonical `publicNavigation.ts` registry, and an isolated `PublicHeader` component/CSS island. The header does not import or use the legacy Header, Footer, BookingForm, Tailwind utilities, `index.css` selectors or `index.css` token names.
- Replaced only the Landing route's local header with the new public header. The existing legacy Header remains unchanged for Bilservice and all other legacy/transitional routes; the Landing booking modal remains local and is reached only through the new header's callback.
- Recreated the approved Bilservice-header interaction model from Playwright analysis: desktop navigation pill, Biltjänster dropdown, mobile panel, booking/call actions, Arrow Down access to the first service link, Escape/outside dismissal and focus restoration. The mobile panel explicitly honours `hidden`, fixing the prior Landing menu's initial-open rendering fault.
- Playwright evaluation is required at 1440, 768 and 390 CSS pixels; its Landing check now covers the desktop dropdown and mobile menu states in addition to the full-page screenshot and horizontal-overflow assertion.

### 2026-09-17 — Codex (Playwright real-browser verification baseline)

- Added `@playwright/test` and installed the matching Chromium browser.
- Added a reusable Playwright configuration with 1440, 768 and 390 CSS-pixel projects at device scale factor 1, plus a landing-page real-browser capture and overflow check.
- Made Playwright mandatory for future real-browser UI evaluation and screenshots in `AGENTS.md` and `docs/CSS_OWNERSHIP.md`; generated reports and screenshots remain untracked.
- First Chromium run passed at all three viewports with exact-width full-page screenshots and zero horizontal overflow. Visual inspection exposed a pre-existing Landing issue: its mobile/tablet navigation is visible on initial load because the responsive `display: grid` rule overrides the element's `hidden` state. This installation task did not change the current header; the issue is carried into the upcoming `PublicHeader` replacement requirements.
- No application CSS, page implementation, backend, commit or push was changed.

### 2026-09-17 — Antigravity (streamline _incoming-assets to flat intake and establish implementation-only rule)

- Flattened `_incoming-assets/`: safely moved the 7 image files from subfolders to the root of `_incoming-assets/`, deleted all empty subfolders and their 33 tracked `.gitkeep` files.
- Codified strict asset rule in `_incoming-assets/README.md` and `AGENTS.md`: `_incoming-assets/` is a flat staging folder where Magnus places completed assets before runs. Assets remain there and are NEVER moved, copied, or "pre-sorted" into `client/src/assets/images/` speculatively or during cleanup. They are only moved/exported into the repo by an implementing coding prompt that is actively integrating them into a feature or page.
- Simplified `_incoming-assets/.gitignore` to ignore all raw files except `.gitignore`, `README.md`, and `ASSET_INVENTORY.md`.

### 2026-09-16 — Antigravity (dead code cleanup across client/src)

- Deleted orphan page `client/src/pages/BiltjanstPlaceholderPage.tsx` (unreferenced in routing or components).
- Deleted unmounted legacy start-page section components in `client/src/components/sections/` (`About.tsx`, `Contact.tsx`, `ContactIntro.tsx`, `EV.tsx`, `Hero.tsx`, `Services.tsx`), now fully superseded by the isolated `LandingPage.tsx` island.
- Deleted unused legacy UI components in `client/src/components/ui/` (`Button.tsx`, `ButtonLink.tsx`, `GalleryTeaserCard.tsx`, `KenBurnsSlideshow.tsx`, `Marquee.tsx`, `SectionHeader.tsx`).
- Preserved active shared components (`BiltjansterFaq.tsx`, `BookingForm.tsx`, `GoogleReviews.tsx`, `ThemeSwitcher.tsx`, and all icons).
- Verified with `npm --prefix client run build`: successful zero-error build. `index.css` untouched.

### 2026-09-16 — Codex (isolated landing-page rebuild and documentation reconciliation)

- Replaced the legacy start-page composition in `client/src/App.tsx` with the route-local `client/src/pages/landing/LandingPage.tsx` and colocated `LandingPage.css`. The page is a dedicated `.landing-v2__*` CSS island; `client/src/css/index.css` was not changed.
- Rebuilt the supplied landing-page hierarchy: floating navigation, sunset hero, cyclic Google review field, “Hör av dig till oss” and “Skicka ett meddelande”, reassurance panel, image-led service preview, five-step process, gallery/about split, used-car CTA, closing contact card and footer. Existing `BookingFormModal` behaviour remains available.
- Preserved the Google field as one external Google Maps link with the confirmed `4,3` rating, five Google-gold stars, `50 recensioner`, reviewer data and cyclic rotation. Rotation stops when `prefers-reduced-motion` is requested; gold is not used as a general Brynäs accent.
- Exported Magnus’s selected `_incoming-assets/incoming/HERO BG LANDING SUNDOWN.webp` source into the production-only `client/src/assets/images/home/landing-v2/landing-sundown-hero.{webp,jpg}` pair. The source remains in intake; the page imports only the production asset pair.
- Restored source-grounded contact/process/about copy and avoided new service, price or operational claims. Reconciled `AGENTS.md`, `CSS_OWNERSHIP.md`, `PROJECT_STATUS.md`, `AGENT_HANDOFF.md`, `CODEX_HANDOVER.md` and `DESIGN_SYSTEM.md` so the route, CSS owner and current handoff now match the implementation.
- Verification completed: `npm --prefix client run build` passed and `git diff --check` passed. Full browser checks at 1440, 768 and 390 CSS pixels remain required before visual approval; this run had no direct browser-screenshot channel. Work is uncommitted, unstaged and not pushed.

### 2026-09-16 — Codex (hard CSS freeze and bounded agent documentation)

- Magnus confirmed that `client/src/css/index.css` is routed across too many pages for safe incremental cleanup. The migration strategy is to leave it untouched and make it gradually irrelevant through isolated page or page-family CSS islands.
- Changed `.githooks/pre-commit` from a line-growth guard to a complete staged-change block for `index.css`; additions, deletions, rewrites and cleanup attempts now all fail a normal commit.
- Changed the `AGENTS.md` guard from a 450-line ceiling to no growth. New dated work notes go in this file instead of expanding the mandatory startup contract.
- Added `docs/CSS_OWNERSHIP.md` with explicit fully isolated, transitional and legacy-dependent route ownership plus an allowed-write/forbidden-write task contract designed for smaller coding models.
- Updated agent/design documentation to make the hard freeze authoritative. No application code or CSS was changed.
- Verified shell-hook syntax, Claude settings JSON, active `core.hooksPath=.githooks`, clean `git diff --check` and a successful client production build. A temporary-index test staged an `index.css` deletion and confirmed the hook rejected it with exit code 1; an unchanged index passed.
