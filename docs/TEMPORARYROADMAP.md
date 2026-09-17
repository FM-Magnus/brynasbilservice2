# Temporary Redesign Roadmap — Brynäs Bilservice

**Status**: Active Working Document  
**Target**: Total eradication of `client/src/css/index.css` via Canonical Tokens & 7 Page Design Archetypes.  
**Branch**: `redesign/blue-teal-v1`

---

## 1. Master Architecture (The 7 Page Styles)

```text
================================================================================
LEVEL 0: CANONICAL GLOBAL LAYER (Single Source of Truth)
  • design-tokens.css   (--bb-* tokens: colors, type scale, spacing, radii)
  • publicNavigation.ts (Canonical menu data)
  • PublicHeader        (Standalone sticky/portal header)
  • PublicFooter        (Standalone shared footer)
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

---

## 2. Phased Execution Roadmap

### Phase 1: Reference Standard & Public Shell Foundation *(Current Phase)*
- [x] **Standalone `PublicHeader` ecosystem**: `PublicHeader.tsx`, `PublicHeader.css`, `publicNavigation.ts`, `design-tokens.css`.
- [x] **Scroll-layer portal fix**: Document-body portal mounting with z-index 100 above isolated landing hero stacking contexts.
- [x] **Landing page visual polish**: Spacing rhythm, typography scale, readable Google reviews block at desktop and mobile.
- [x] **Playwright testing baseline**: Automated tests at 1440px, 768px, and 390px with zero horizontal overflow.
- [ ] **Promote validated tokens**: Consolidate `--landing-*` scales into universal `--bb-*` tokens in `client/src/styles/design-tokens.css`.
- [ ] **Build standalone `PublicFooter`**: Create `PublicFooter.tsx` and `PublicFooter.css` with clean `--bb-*` styling to complete the global shell.

---

### Phase 2: Style 1 Brand Trio Rebuild
*Rebuild brand pages from scratch matching the Landing Page visual standard (clean warm-white canvas, teal accents, Archivo/Manrope typography).*
- [ ] **Kontakt (`/kontakt`)**:
  - Rebuild on Style 1 (`ContactPage.tsx` + colocated CSS).
  - Adopt Landing contact form and verified workshop details.
  - Mount `<PublicHeader />` and `<PublicFooter />`.
- [ ] **Om oss (`/om-oss`)**:
  - Rebuild on Style 1 (`AboutPage.tsx` + colocated CSS).
  - Feature Maher Basher portrait, consumer law guarantee (15%), workshop history, and verified company credentials.
  - Mount `<PublicHeader />` and `<PublicFooter />`.

---

### Phase 3: Style 2 Major Services & Editorial Hub
*Rebuild primary service hubs matching Bilservice’s high-trust automotive editorial aesthetic (dark petrol hero, service tiers, reassurance).*
- [ ] **Bilservice (`/service-reparationer`)**:
  - Mount `<PublicHeader variant="solid" />` and `<PublicFooter />`.
  - Harmonize with canonical `--bb-*` tokens.
- [ ] **Felsökning (`/felsokning`)**:
  - Rebuild on Style 2 with OBD diagnostics focus, symptom selector, and transparent scope.
  - Mount `<PublicHeader />` and `<PublicFooter />`.
- [ ] **Däckservice (`/dackservice`)**:
  - Rebuild on Style 2 with tire storage (däckhotell), shift booking, and legal seasonal requirements.
  - Mount `<PublicHeader />` and `<PublicFooter />`.
- [ ] **AC-service (`/ac-service`)**:
  - Rebuild on Style 2 with R134a/R1234yf options, cleaning, and climate diagnostics.
  - Mount `<PublicHeader />` and `<PublicFooter />`.

---

### Phase 4: Style 3 Tech Guides (Group A) Integration
*Connect the four existing rebuilt precision guide pages to the canonical shell.*
- [ ] Mount `<PublicHeader />` and `<PublicFooter />` across:
  - `/koppling` (`KopplingPage.tsx`)
  - `/avgassystem` (`AvgassystemPage.tsx`)
  - `/oljebyte` (`OljebytePage.tsx`)
  - `/bromssystem` (`BromssystemPage.tsx`)
- [ ] Align `client/src/styles/ServiceGuideTemplate.css` with `--bb-*` design tokens.

---

### Phase 5: Style 4 Tech Guides (Group B) Template & Migration
*Create a distinct, fresh technical guide template (Template B) and migrate remaining guides.*
- [ ] Design and build `ServiceGuideTemplateB.css` with distinct visual rhythm and component cards.
- [ ] Migrate technical service guides to Style 4:
  - `/kamrem`
  - `/bilbatteri`
  - `/stodampare-fjadrar`
  - `/hjullagerbyte`
  - `/styrning-kulleder`
  - `/drivaxel-drivknutar`

---

### Phase 6: The Two Bespoke Standalone Pages
- [ ] **Galleri (`/galleri`) (Style 5)**:
  - Rebuild as a bespoke image-first showcase with workshop storytelling and tactile gallery carousel.
  - Mount `<PublicHeader />` and `<PublicFooter />`.
- [ ] **Bilar till salu (`/bilar-till-salu`) (Style 6)**:
  - Dedicated automotive inventory design with vehicle spec badges, multi-angle viewer, and purchase inquiry flow.
  - Mount `<PublicHeader />` and `<PublicFooter />`.

---

### Phase 7: The Grand Finale — Complete Retirement of `index.css`
- [ ] Verify zero remaining active imports or dependencies on `client/src/css/index.css`.
- [ ] Delete `client/src/css/index.css`.
- [ ] Remove `check_frozen` from `.githooks/pre-commit`.
- [ ] Run full test suite and verify clean production build.

---

## 3. Strict Rules During Rebuilding
1. **Never edit `client/src/css/index.css`** while it remains in place.
2. **Never invent a 4th design style** — every page must map to one of the 7 archetypes.
3. **Use `--bb-*` tokens only** for new shared CSS.
4. **All visual changes must pass Playwright verification** at 1440px, 768px, and 390px with zero horizontal overflow.
