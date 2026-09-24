# CSS ownership and migration policy

This is the operational CSS map for Brynäs Bilservice. It is intentionally explicit so smaller coding models can follow it without interpreting architectural intent.

## Non-negotiable rules

The legacy `client/src/css/index.css` was **deleted in Step 7 (2026-09-19)**. The rebuild is complete.

- Never recreate a global catch-all stylesheet, and never reintroduce `--redesign-*`, `--color-*` or legacy class systems.
- Global CSS is exactly: `styles/tailwind.css`, `styles/design-tokens.css`, `styles/base.css`, `styles/shared-elements.css` (loaded in that order in `main.tsx`). Adding a fifth global file needs Magnus's approval.
- Every page, family and shared component owns its CSS island, imported by its `.tsx`, with a unique class prefix.
- If a task seems to require a new global rule, token or shared pattern, stop and propose it to Magnus first.
- Public TSX carries no inline `style=`. It beats every stylesheet rule, so it hides values from the CSS that is meant to own them; `check:css` fails on it (admin is exempt, like Tailwind). Put the value in the page's island or, for a family page, in the family stylesheet.

## Public shell and shared components

- `client/src/styles/design-tokens.css` owns the `--bb-*` tokens. Everything consumes these; there are no other token sets.
- `client/src/data/publicNavigation.ts` is the navigation source for `PublicHeader`.
- `client/src/data/business.ts` is the single source for the workshop's business facts (phone, e-mail, address, Google Maps link, opening hours, legal name, org.nr). Never hard-code one of these values in a page, a component or a test — import `BUSINESS` / `weekdayHours` instead.
- `client/src/components/layout/PublicHeader.tsx` / `PublicHeader.css` and `PublicFooter.tsx` / `PublicFooter.css` are the only header and footer. The legacy `Header.tsx`/`Footer.tsx` were deleted in Step 7.
- `client/src/components/ui/GalleryTeaserCard.tsx` / `.css`: Ken Burns workshop slideshow card (`defaultWorkshopSlides`).
- `client/src/components/ui/GoogleReviewsCard.tsx` / `.css`: Google reviews (`defaultGoogleReviews`, `.bb-reviews-card*`).
- `client/src/components/ui/ContactFormCard.tsx` / `.css`: contact module (`defaultContactSubjects`, `.bb-contact-section*`, `.bb-contact-form*`).
- `client/src/components/ui/BiltjansterFaq.tsx` / `.css`: FAQ accordion (`.bb-faq__*`).
- `client/src/components/BookingForm.tsx` / `.css`: booking modal (`.modal-*`). Pages open it through callbacks; vehicle inquiries pass `initialComment`.

## The Rebuild Architecture (Master Blueprint)

**Revised 2026-09-18**: The site is not a symmetrical set of 7 style archetypes. Most pages are too divergent in content and purpose to honestly share a template. The entire site was rebuilt away from the legacy `index.css` (deleted 2026-09-19) into a canonical design token layer at the top, **7 fully unique standalone pages**, and **2 shared service-page families** (the only groups where the pages are genuinely the same kind of content):

1. **Top: Canonical Design Layer & Shell**:
   - `client/src/styles/design-tokens.css` owns the `--bb-*` canonical tokens (colors, Archivo display/Manrope body type scales, radii, spacing, shadows).
   - `client/src/styles/shared-elements.css` owns global `.bb-*` pattern classes below the token layer (buttons, eyebrow, headings, card motifs, icon badges) — see `docs/DESIGN_SYSTEM.md` §2a. Loaded globally in `client/src/main.tsx` together with `design-tokens.css`, and used by all rebuilt pages.
   - `client/src/data/publicNavigation.ts` + `PublicHeader.tsx` / `PublicHeader.css` (free-standing navigation element) + `PublicFooter.tsx` / `PublicFooter.css` (canonical standalone global footer).
   - `client/src/components/ui/GalleryTeaserCard.tsx` / `GalleryTeaserCard.css` (reusable standalone workshop teaser card).
   - `client/src/components/ui/GoogleReviewsCard.tsx` / `GoogleReviewsCard.css` (reusable standalone Google reviews card/overlay).
   - `client/src/components/ui/ContactFormCard.tsx` / `ContactFormCard.css` (reusable standalone contact module and form card).
   - `client/src/components/BookingForm.tsx` / `BookingForm.css` (booking modal, `.modal-*`, on `--bb-*` tokens) and `client/src/components/ui/BiltjansterFaq.tsx` / `BiltjansterFaq.css` (FAQ accordion, `.bb-faq__*`), both independent of `index.css` since 2026-09-19.
   - `client/src/styles/base.css` (global element defaults) and `client/src/styles/tailwind.css` (Tailwind directives; preflight global, utilities for `/admin` only), both imported in `main.tsx`.

2. **The 7 unique, standalone pages** — each owns its own bespoke design and its own colocated CSS island. No shared page template between them.
   - `Startsidan` (`/`) — `LandingPage.tsx` + `LandingPage.css` (`.landing-v2__*`). Complete.
   - `Om oss` (`/om-oss`) — `AboutPage.tsx` + `AboutPage.css` (`.omoss-page__*`). Complete. Rebuilt from approved mockup with zero dependency on `index.css`.
   - `Kontakt` (`/kontakt`) — `ContactPage.tsx` + `ContactPage.css` (`.kontakt-page__*`). Complete. Rebuilt from approved mockup with zero dependency on `index.css`, mounts `PublicHeader` (overlay) + `PublicFooter`.
   - `Bärgning` (`/bargning`) — `BargningPage.tsx` + `BargningPage.css` (`.bargning-page__*`). Complete. Rebuilt from approved mockup with zero dependency on `index.css`, mounts `PublicHeader` + `PublicFooter`.
   - `Bilar till salu` (`/bilar-till-salu`) — `BilarTillSalu.tsx` + `BilarTillSalu.css` (`.bilartillsalu-page__*`). Complete. Zero dependency on `index.css`, mounts `PublicHeader` (overlay) + `PublicFooter`. Stock data lives outside the page in `client/src/data/vehicles.ts` behind `client/src/api/vehicles.ts` (backend-ready; see `docs/BACKEND.md`).
   - `Galleri` (`/galleri`) — `GalleryPage.tsx` + `GalleryPage.css` (`.galleri-page__*`). Complete. Zero dependency on `index.css`, mounts `PublicHeader` (overlay) + `PublicFooter`. Photos are folder-driven: `client/src/assets/galleri/` via `client/src/data/gallery.ts` → `client/src/api/gallery.ts` (see `LÄSMIG.md` in that folder).
   - `Biltjänster` (`/biltjanster`) — `BiltjansterPage.tsx` + `BiltjansterPage.css` (`.biltjanster-hub__*`). Complete. The service-catalog overview/index page; links out to every page in both families below.

3. **"Bilservice" family (shared template)** — major service-hub pages, all structurally the same kind of page:
   - *Owner*: `ServiceReparationerPage.tsx` + `ServiceReparationerPage.css` (`.bilservice__*`).
   - *Service page imagery (2026-09-23)*: `/service-reparationer` uses `<picture>` inside the family-owned `.bilservice__image-frame` with `--wide` and `--card` aspect-ratio modifiers. The older `.bilservice__image-slot--*` modifiers remain for sibling pages; the placeholder base was removed from the owner page.
   - *Pages on this template*: `Bilservice` (`/service-reparationer`), `Felsökning` (`/felsokning`), `Däckservice` (`/dackservice`), `AC-service` (`/ac-service`).
   - *Spacing modifiers (moved out of inline styles 2026-09-20; exact values kept):* `.bilservice__container--pad-sm` / `--pad` / `--pad-lg` / `--flow` (block padding for containers in unclassed sections), `.bilservice__intro--wide` / `--wide-sm` / `--tight`, `.bilservice__lead--intro` / `--intro-tight` / `--split` and `.bilservice__note`. Context rules under `.bilservice__service-content`, `.bilservice__intro`, `.bilservice__card--teal`, `.bilservice__price-amount` and `.bilservice__split-media--right` replaced the rest. Where a modifier sits under `.bilservice__intro`, that is deliberate: `.bilservice__intro p` (0,1,1) would beat a bare class. `.bilservice__symptom-grid--auto` is doubled for the same reason against a later media rule.
   - *Near-duplicates kept on purpose (a design decision, not a bug):* `--pad` 64px vs `--pad-lg` 72px, `--wide` 78ch vs `--wide-sm` 75ch, `--intro` 0.5rem vs `--intro-tight` 0.4rem.

4. **"Guide" family (shared template)** — technical repair-guide pages, all structurally the same kind of page. There is only one guide template; the remaining six guides join the same one already proven on the first four, not a second template.
   - *Owner*: `ServiceGuideTemplate.css` (`.service-guide__*`).
   - *Hero trust row (2026-09-21)*: the three trust items in every guide hero use the shared `.bb-trust-row` pattern from `shared-elements.css`, with the same markup as the Bilservice-family heroes. `ServiceGuideTemplate.css` holds no trust-row rules; do not add a local one.
   - *Full-bleed hero (2026-09-22)*: all ten guides use `.service-guide__hero-bg` (real `<picture>` behind a gradient), not the old split grid; `.service-guide__hero-media` / `.service-guide__hero-badge` are deleted. Per-photo crop via `.service-guide__hero-bg--pos-left`. Details in `DESIGN_SYSTEM.md` §2c.
   - *Tips (2026-09-22)*: tip callouts use the global `.bb-tip` from `shared-elements.css`; `.service-guide__tip-strip` is deleted. The family owns only the spacing rule `.service-guide__intro-content > .bb-tip`. The Bilservice family's `.bilservice__repair-note` was folded into the same component (`.bilservice__price-grid + .bb-tip` owns its spacing).
   - *Symptom rows*: `--featured` / `--urgent` colour rules use a doubled class (`.service-guide__symptom-row.service-guide__symptom-row--featured p`) because the plain `.service-guide__symptom-row p` rule is declared later with the same specificity — without the doubling it silently wins and greys out the text on coloured cards (live bug, fixed 2026-09-22). Keep the doubling. Their gradients come from the `--bb-color-featured-gradient-*` / `--bb-color-urgent-gradient-*` tokens, not hex.
   - *Wide symptom photo*: Kamrem alone uses `.service-guide__symptoms-media--landscape` to center a shorter image box beside the symptom list, preserving the hand and remhjul in its landscape source. Other guides retain the full-height portrait slot. The modifier stays in the Guide-family stylesheet and adds no global token or shared pattern.
   - *Pages on this template*: `Koppling` (`/koppling`), `Avgassystem` (`/avgassystem`), `Oljebyte` (`/oljebyte`), `Bromssystem` (`/bromssystem`), `Kamrem` (`/kamrem`), `Bilbatteri` (`/bilbatteri`), `Stötdämpare & fjädrar` (`/stodampare-fjadrar`), `Hjullagerbyte` (`/hjullagerbyte`), `Styrning & kulleder` (`/styrning-kulleder`), `Drivaxel & drivknutar` (`/drivaxel-drivknutar`).

## Active Status of Routes During Rebuilding

| Route | Architecture Group | Status | CSS Owner |
| --- | --- | --- | --- |
| `/` | Unique | Complete / Active | `LandingPage.css` + `PublicHeader.css` + `PublicFooter.css` + `GalleryTeaserCard.css` + `GoogleReviewsCard.css` + `ContactFormCard.css` |
| `/om-oss` | Unique | Complete | `AboutPage.css` (`.omoss-page__*`), mounts `PublicHeader` + `PublicFooter` + `GalleryTeaserCard` + `GoogleReviewsCard` |
| `/kontakt` | Unique | Complete | `ContactPage.css` (`.kontakt-page__*`), mounts `PublicHeader` (overlay) + `PublicFooter` + `GoogleReviewsCard` |
| `/service-reparationer` | Bilservice family (owner) | Complete — on `--bb-*` tokens & `shared-elements.css` (`.bb-*`), mounts `PublicHeader`/`PublicFooter` + `GoogleReviewsCard` | `ServiceReparationerPage.css` (`.bilservice__*`) |
| `/felsokning` | Bilservice family | Complete — on `--bb-*` tokens & `.bilservice__*` family styles, mounts `PublicHeader` (overlay) + `PublicFooter` + `GoogleReviewsCard` | `ServiceReparationerPage.css` |
| `/dackservice` | Bilservice family | Complete — on `--bb-*` tokens & `.bilservice__*` family styles, mounts `PublicHeader` (overlay) + `PublicFooter` + `GoogleReviewsCard` | `ServiceReparationerPage.css` |
| `/ac-service` | Bilservice family | Complete — on `--bb-*` tokens & `.bilservice__*` family styles, mounts `PublicHeader` (overlay) + `PublicFooter` | `ServiceReparationerPage.css` |
| `/koppling` | Guide family | Complete — on `--bb-*` tokens & `.bb-*` shared elements, mounts `PublicHeader` (overlay) + `PublicFooter` (Second Pass verified) | `ServiceGuideTemplate.css` |
| `/avgassystem` | Guide family | Complete — on `--bb-*` tokens & `.bb-*` shared elements, mounts `PublicHeader` (overlay) + `PublicFooter` (Second Pass verified) | `ServiceGuideTemplate.css` |
| `/oljebyte` | Guide family | Complete — on `--bb-*` tokens & `.bb-*` shared elements, mounts `PublicHeader` (overlay) + `PublicFooter` (Second Pass verified) | `ServiceGuideTemplate.css` |
| `/bromssystem` | Guide family | Complete — on `--bb-*` tokens & `.bb-*` shared elements, mounts `PublicHeader` (overlay) + `PublicFooter` (Second Pass verified) | `ServiceGuideTemplate.css` |
| `/kamrem` | Guide family | Complete — on `--bb-*` tokens & `.bb-*` shared elements, mounts `PublicHeader` (overlay) + `PublicFooter` (First Sibling Proof verified) | `ServiceGuideTemplate.css` |
| `/bilbatteri` | Guide family | Complete — on `--bb-*` tokens & `.bb-*` shared elements, mounts `PublicHeader` (overlay) + `PublicFooter` | `ServiceGuideTemplate.css` |
| `/stodampare-fjadrar` | Guide family | Complete — on `--bb-*` tokens & `.bb-*` shared elements, mounts `PublicHeader` (overlay) + `PublicFooter` | `ServiceGuideTemplate.css` |
| `/hjullagerbyte` | Guide family | Complete — on `--bb-*` tokens & `.bb-*` shared elements, mounts `PublicHeader` (overlay) + `PublicFooter` | `ServiceGuideTemplate.css` |
| `/styrning-kulleder` | Guide family | Complete — on `--bb-*` tokens & `.bb-*` shared elements, mounts `PublicHeader` (overlay) + `PublicFooter` | `ServiceGuideTemplate.css` |
| `/drivaxel-drivknutar` | Guide family | Complete — on `--bb-*` tokens & `.bb-*` shared elements, mounts `PublicHeader` (overlay) + `PublicFooter` | `ServiceGuideTemplate.css` |
| `/bargning` | Unique | Complete | `BargningPage.css` (`.bargning-page__*`), mounts `PublicHeader` + `PublicFooter` |
| `/galleri` | Unique | Complete | `GalleryPage.css` (`.galleri-page__*`), mounts `PublicHeader` (overlay) + `PublicFooter` |
| `/bilar-till-salu` | Unique | Complete | `BilarTillSalu.css` (`.bilartillsalu-page__*`), mounts `PublicHeader` (overlay) + `PublicFooter` |
| `/biltjanster` | Unique | Complete | `BiltjansterPage.css` (`.biltjanster-hub__*`), mounts `PublicHeader` + `PublicFooter` |
| `/tjanster` | Redirect | Retired in Step 7 — `<Navigate to="/biltjanster" replace />` in `main.tsx` | — |
| `/admin` | Admin | Internal utility | Tailwind utilities (`styles/tailwind.css`) |

## Class-prefix collision check (mandatory before naming a new CSS island)

Two stylesheets matching the same class makes a page render with a mix of both — found live on `/kontakt` (2026-09-18), when a legacy prefix was reused. `index.css` is gone, but the rule still applies between islands. **Before writing a new prefix**, confirm it's unused:

```bash
grep -rn "\.<new-prefix>" client/src --include=*.css
```

It must return nothing. Prefixes in use include `.landing-v2__`, `.omoss-page__`, `.kontakt-page__`, `.bargning-page__`, `.biltjanster-hub__`, `.bilartillsalu-page__`, `.galleri-page__`, `.bilservice__`, `.service-guide__`, `.public-header`, `.bb-footer__`, `.bb-*` (shared) and `.modal-*` (booking).

## How a conflict is actually resolved (verified 2026-09-20)

This project declares **no cascade layers** (`@layer` appears in no stylesheet) and uses
**no CSS Modules**. A conflict between two author rules is therefore decided by
specificity first, then source order. Source order is:

1. The four global files, in `main.tsx` order: `tailwind.css` → `design-tokens.css` →
   `base.css` → `shared-elements.css`.
2. Then every component and page island, because each is imported by its own `.tsx`.

So an island rule beats a `.bb-*` shared rule of equal specificity, and beats a Tailwind
utility of equal specificity. Confirmed in the dev server's `document.styleSheets` order
and in the production build, where `index-*.css` is linked in `index.html` and each
route's chunk is appended when the lazy route loads.

Two worked examples:

- `base.css` sets `h1..h6 { font-family: 'Archivo', sans-serif }` (specificity 0,0,1) and
  `shared-elements.css` sets `.bb-h1 { font-family: var(--bb-font-display) }` (0,1,0).
  **Specificity** decides: the class wins, and the element rule only reaches headings that
  carry no `.bb-h*` class.
- `shared-elements.css` sets `.bb-btn { ... }` and several islands restyle the same buttons
  through their own prefixed selectors. Where specificity ties, **source order** decides in
  the island's favour, because islands load after the global layer.

**Rule for modifiers (added 2026-09-22 after a live bug):** a modifier that restyles a
child — `.x--variant p` — has the *same* specificity (0,1,1) as the base `.x p`. If the
base rule sits later in the file it silently wins, and nothing errors: this greyed out the
text on every coloured Guide symptom card. Write the modifier with the base class doubled
(`.x.x--variant p`, 0,2,1) or as parent-modifier + child-class (`.x--variant .x__title`,
0,2,0) so it wins regardless of order. Existing correct examples:
`.bilservice__symptom-grid.bilservice__symptom-grid--auto`, the Guide symptom rows,
`.bargning-page__scenario-card--light .bargning-page__scenario-heading`,
`.bb-tip .bb-eyebrow`. `check:css` does not detect this class of bug.

`!important` appears 11 times. Nine are inside `prefers-reduced-motion` blocks and one is
`.public-header__mobile-panel[hidden] { display: none !important }` — both idiomatic. Only
`AboutPage.css` `.omoss-page__trust-item { border-right: none !important }` is avoidable
debt. This is not a specificity-escalation problem; do not "clean it up".

## Token sources — there are two, and both are load-bearing

- `client/src/styles/design-tokens.css` owns the `--bb-*` custom properties. This is the
  only token source for public pages. To add one, put it here and nowhere else.
- `client/tailwind.config.js` `theme.extend` owns a `brynas` colour palette
  (black/dark/dark-2/dark-3/gold/gold-light/gold-dark/red/red-dark/muted). **It is live, not
  dead**: the admin panel consumes it through `dark:` variants — `dark:bg-brynas-dark`,
  `dark:border-brynas-dark-3`, `dark:text-brynas-muted` and others, in
  `components/admin/*` and `pages/admin/Dashboard.tsx`. Deleting the extend removes 12
  rules from the built stylesheet and breaks `/admin` dark mode. A plain grep for
  `bg-brynas-` misses these because of the `dark:` prefix — search for `brynas-` instead.

Public pages must not use the `brynas` palette; it is the retired club palette and
contradicts the approved teal/amber direction. It stays because `/admin` already depends
on it.

## Known fragile areas

- **One undefined token remains: `--bb-font-sans`** (33 references in `ServiceGuideTemplate.css`, no fallback), on the pending list in `scripts/check-css.mjs`. The declarations are accidentally pinning the font fallback stack; untangle them together with the font-loading fix, not before (the header comment in that file explains why deleting them changes text wrapping). The other tokens once listed here are resolved. Do not add to the pending list.
- **Structural selectors in the Guide family parent.** `ServiceGuideTemplate.css` styles
  `.service-guide__importance > div > p` and `.service-guide__service-card > div > p`. A
  sibling guide that wraps that paragraph differently silently loses the styling; there is
  no shared TSX layout to keep the markup honest.
- **`ServiceReparationerPage.tsx` builds `bilservice__level-card--0${index + 1}`** from an
  array index, and the CSS defines `--01`, `--02`, `--03` only. `serviceLevels` currently
  has exactly 3 entries; a fourth renders unstyled.
- **`--bb-header-height` mirrors `PublicHeader.css`.** Hero clearance is derived from it (`design-tokens.css`). If the header's padding or logo height changes, update the token; `tests/browser/hero.spec.ts` fails until you do.
- **`LandingPage.css` ships on every route**, because `main.tsx` imports `App.tsx`
  statically and `App` mounts `LandingPage`. Its `.landing-v2__*` prefix contains it, but
  it is not route-scoped.

## Verification commands that exist in this repository

`npm --prefix client run typecheck`, `npm --prefix client run build`, `npm --prefix client run check:css`,
`npm --prefix client run test:browser` (Playwright, 19 spec files at 1440/768/390 — currently 155 passed / 4 skipped;
the skips are the touch-only tests off mobile and the desktop-only width matrix in `hero.spec.ts`). `baseline.spec.ts` and
`hero.spec.ts` loop over all 21 public routes. Baseline snapshots record computed styles of the shell and shared primitives
(including the hero H1); update one only after reading the diff line by line. There is **no working lint**:
`client/eslint.config.js` is ESM in a CommonJS package and imports five packages that are not in `client/package.json`. Do not
cite lint as a check. The Playwright browser may not be installed; see `docs/audit-harness/README.md` for the system-Chrome config.

## Required task contract

Every CSS task must state exact write paths before editing:

```text
ALLOWED WRITES:
- client/src/pages/ExamplePage.tsx
- client/src/pages/ExamplePage.css

FORBIDDEN WRITES:
- client/src/styles/* (global layer — only with explicit approval)
- AGENTS.md
- server/**
- every path not listed above

STOP CONDITION:
If another path is required, report BLOCKED before editing it.
```

## Verification

For a page or shared-island change:

1. Confirm `git diff --name-only` contains only approved paths.
2. Run `git diff --check`.
3. Run `npm --prefix client run typecheck` and `npm --prefix client run build`.
4. Use Playwright for every real-browser UI evaluation. Check 1440, 768 and 390 CSS pixels when UI changed; capture screenshots, verify zero horizontal overflow and exercise the affected interactions.
5. Write the dated work note to `docs/LOG.md`, not `AGENTS.md`.
