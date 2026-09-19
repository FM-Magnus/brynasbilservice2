# Brynäs Bilservice — Design System

This is the living reference for the site's visual tokens and patterns.
**AUTHORITATIVE CANONICAL TOKENS**: `client/src/styles/design-tokens.css` defines the `--bb-*` design tokens that govern the 7 fully unique standalone pages, the 2 shared service-page families (Bilservice family, Guide family), and the standalone Public Shell (`PublicHeader`, `PublicFooter`, `GalleryTeaserCard`, `GoogleReviewsCard`, and `ContactFormCard`) — see `docs/CSS_OWNERSHIP.md` for the current architecture. The legacy `client/src/css/index.css` and its tokens were deleted in Step 7 (2026-09-19).

## 1. Canonical Design Tokens (`--bb-*`) — Single Source of Truth

Located in [`client/src/styles/design-tokens.css`](../client/src/styles/design-tokens.css).

### Color Palette

| Token | Value | Role / Usage |
|---|---|---|
| `--bb-color-ink-950` | `#071416` | Deepest canvas tone, footer background, dark hero base |
| `--bb-color-ink-900` | `#0d1f22` | Dark card background, dark container surfaces |
| `--bb-color-ink-800` | `#14373b` | Elevated dark surfaces, borders, icon card backdrops |
| `--bb-color-ink-soft` | `#0c2327` | Soft ink secondary containers |
| `--bb-color-surface` | `#ffffff` | Pure white card surfaces |
| `--bb-color-page` | `#f8f7f3` | Warm-white canvas background for page surround |
| `--bb-color-teal-800` | `#007a86` | Deep teal base, badge borders, hover accents |
| `--bb-color-teal-700` | `#047784` | Dark teal buttons, active navigation state |
| `--bb-color-teal-600` | `#0a9dac` | Primary brand teal, standard button fills, link hover |
| `--bb-color-teal-500` | `#0ab2c1` | Vibrant cyan/teal accent, pill CTA highlights |
| `--bb-color-teal-100` | `#def7f8` | Pale teal tint for tag pills, light badges |
| `--bb-color-focus` | `#9ce8ed` | Accessible focus ring outline |
| `--bb-color-amber-500`| `#f09505` | Canonical automotive amber: footer accents, signature, urgent alerts |
| `--bb-color-amber-400`| `#fca311` | Light amber hover highlight |
| `--bb-color-amber-600`| `#d48202` | Deep amber border / shadow |
| `--bb-color-text` | `#122225` | Primary body text on light surfaces |
| `--bb-color-text-muted`| `#5e6c70` | Secondary / supporting text on light surfaces |

### Typography & Hierarchy

| Token | Value | Role / Usage |
|---|---|---|
| `--bb-font-display` | `'Archivo', Arial, sans-serif` | Display headings (`h1`–`h4`), weight 800 |
| `--bb-font-body` | `'Manrope', Arial, sans-serif` | Body text, navigation, controls, badges (weights 400–700) |
| `--bb-font-size-body` | `1rem` (16px) | Standard readable body copy |
| `--bb-font-size-support` | `0.92rem` (~14.7px) | Secondary descriptions, subheadings |
| `--bb-font-size-label` | `0.78rem` (~12.5px) | Uppercase tags, category badges, microcopy |
| `--bb-font-size-control` | `0.95rem` (~15.2px) | Navigation links, button labels, form inputs |
| `--bb-line-height-body` | `1.6` | Optimal body readability line-height |
| `--bb-line-height-support` | `1.55` | Supporting text line-height |

### Layout, Radii & Shadows

| Token | Value | Role / Usage |
|---|---|---|
| `--bb-wrap-max` | `1320px` | Outer maximum wrapper for public navigation & footer |
| `--bb-layout-max` | `1280px` | Standard page content container maximum width |
| `--bb-radius-sm` | `8px` | Small tags, subtle card corners, icon badges |
| `--bb-radius-md` | `14px` | Compact cards (service/image cards, glass panels) — smaller than `--bb-radius-card`, added 2026-09-18 when Landing's own service-card (13px) and why-section list panel (15px) were found to be two near-duplicate literals with no token |
| `--bb-radius-card` | `20px` | Standard automotive card radius (cards, teaser panels) |
| `--bb-radius-menu` | `24px` | Header dropdown menu & floating navigation panel radius |
| `--bb-radius-control`| `999px` | Fully rounded pills (buttons, search bars, badges) |
| `--bb-shadow-floating` | `0 18px 44px rgba(0,0,0,0.34)` | Floating header & elevated dark card shadow |
| `--bb-shadow-button` | `0 10px 20px rgba(0,166,180,0.26)` | `.bb-btn--teal`'s glow (added 2026-09-18) |
| `--bb-shadow-card` | `0 10px 26px rgba(7,20,22,0.08)` | Resting card elevation (added 2026-09-18; used by `.bb-card--trust` and `ServiceGuideTemplate.css`) |
| `--bb-transition-fast` | `150ms cubic-bezier(0.4, 0, 0.2, 1)` | Standard fast hover/focus transition |

### Radius tokens: what's safe to tune vs. already live (checked 2026-09-18)

`PublicHeader`/`PublicFooter` are shipped, live, shared components — not a document waiting for an implementation round. Before changing any `--bb-*` value to "fix" how something looks, check whether it's consumed there first; if it is, the change lands site-wide immediately, not just on whatever you're previewing against.

Checked by grepping both files' `var(--bb-*)` usage directly (not assumed):

- **Safe to tune against Landing alone** (not used by either file): `--bb-radius-card`, `--bb-radius-md`, `--bb-shadow-button`, `--bb-shadow-card`, `--bb-color-ink-900`, `--bb-color-page`, `--bb-color-teal-800`, `--bb-color-amber-400`, `--bb-color-amber-600`, `--bb-color-text`, `--bb-color-text-muted`, `--bb-color-text-inverse`, `--bb-color-ink-soft`, `--bb-font-display`, `--bb-font-size-body`, `--bb-font-size-control`, `--bb-line-height-body`.
- **Not safe — live on `PublicHeader` and/or `PublicFooter` today**: `--bb-radius-control` (the pill shape — used by both: header's nav pill/booking button, footer's book button), `--bb-radius-sm` (footer), `--bb-radius-menu` (header dropdown), `--bb-color-focus`, `--bb-color-ink-950`, `--bb-color-ink-800`, `--bb-color-surface`, `--bb-color-teal-700/600/500/100`, `--bb-color-amber-500`, `--bb-font-body`, `--bb-font-size-label`/`-support`, `--bb-line-height-support`, `--bb-layout-max`, `--bb-wrap-max`, `--bb-shadow-floating`, `--bb-transition-fast`.

Practical consequence for the open "too rounded" question: card roundness (`--bb-radius-card`/`-md`) can be previewed against Landing in isolation. Button *shape* (pill vs. rounded-rectangle) means `--bb-radius-control`, which is not isolated — changing it changes the header and footer immediately.

---

## 2. Canonical Public Shell Components

The site is framed and anchored by five standalone, self-contained Level 0 Public Shell & Canonical Core components, plus [`shared-elements.css`](../client/src/styles/shared-elements.css) (global `.bb-*` classes for button/eyebrow/card/icon-badge patterns — see §2a below):

1. **`PublicHeader`** ([`client/src/components/layout/PublicHeader.tsx`](../client/src/components/layout/PublicHeader.tsx) + [`PublicHeader.css`](../client/src/components/layout/PublicHeader.css)):
   - Renders at document root via React Portal (`z-index: 100`) so it clears all hero and stacking contexts.
   - Fixed floating layout with desktop navigation pill, Biltjänster dropdown (driven by [`publicNavigation.ts`](../client/src/data/publicNavigation.ts)), compact breakpoint switch at 1320px, and accessible mobile slide-down panel.
2. **`PublicFooter`** ([`client/src/components/layout/PublicFooter.tsx`](../client/src/components/layout/PublicFooter.tsx) + [`PublicFooter.css`](../client/src/components/layout/PublicFooter.css)):
   - 4-column automotive footer matching Magnus's approved mockup (`media_1789659344071.png`).
   - Column 1: Centered brand logo (`66px`), white subheader `— DIN LOKALA BILVERKSTAD I BRYNÄS, GÄVLE`, 3 trust badges (*Tryggt och enkelt*, *Personlig service*, *Erfarna mekaniker*), centered amber script signature *"Vi håller din bil i rullning!"*.
   - Column 2: 9 Snabba länkar with right-pointing interactive chevrons (`›`).
   - Column 3: 4 dark-teal contact badge cards (Telefon, E-post, Besöksadress, Google Maps link).
   - Column 4: Vertically centered amber clock with verified hours (Mån–Fre 08:00–17:00), cyan pill `BOKA TID →` button, and direct phone link `RING OSS: 070-553 33 95`.
   - Sub-footer: Dynamic copyright, workshop tagline, Facebook + Instagram links, legal notice.
   - Background: Atmospheric automotive wheel asset (`footer-wheel-bg.webp`, 116 KB) on deep `#061518` background.
3. **`GalleryTeaserCard`** ([`client/src/components/ui/GalleryTeaserCard.tsx`](../client/src/components/ui/GalleryTeaserCard.tsx) + [`GalleryTeaserCard.css`](../client/src/components/ui/GalleryTeaserCard.css)):
   - Standalone Ken Burns workshop slideshow card with single-source `defaultWorkshopSlides` array.
   - Frosted "Grundat 2021" badge, active slide indicators, and bottom-right corner cutout badge linking to `/galleri`.
4. **`GoogleReviewsCard`** ([`client/src/components/ui/GoogleReviewsCard.tsx`](../client/src/components/ui/GoogleReviewsCard.tsx) + [`GoogleReviewsCard.css`](../client/src/components/ui/GoogleReviewsCard.css)):
   - Standalone Google reviews module with verified Brynäs reviews (`4,3` rating, 50 reviews, link to Google Maps).
   - Encapsulates 8s cyclic rotation, 220ms cross-fade, cleans up interval on unmount, and respects `prefers-reduced-motion`.
   - Single accessible `<a>` tag with visible focus ring.
   - Dual variants:
     - `variant="hero-overlay"`: Frosted-glass transparent bounding field (`background: rgba(3, 22, 26, 0.42); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 16px; backdrop-filter: blur(8px)`) with locked author track width (`96px`/`88px`) and reserved min-heights (`84.6px` desktop/tablet, `158px` mobile) guaranteeing 0.0px layout shift (CLS = 0) during review cycling.
     - `variant="card"`: Elevated dark-ink card (`#0d1f22`) with border and floating shadow for standard page body or sidebar placement.
5. **`ContactFormCard`** ([`client/src/components/ui/ContactFormCard.tsx`](../client/src/components/ui/ContactFormCard.tsx) + [`ContactFormCard.css`](../client/src/components/ui/ContactFormCard.css)):
   - Centralized Single Source of Truth for contact topics/subjects (`defaultContactSubjects = ['Bilservice & oljebyte', 'Reparation & felsökning', 'Däckservice & hjulinställning', 'AC-service', 'Bärgning & transport', 'Övrigt']`), direct phone/email/address details, and submission states.
   - Dual variants:
     - `variant="full-section"`: Two-column conversion section with background decorative brand art, left contact info column, and right form card.
     - `variant="card-only"`: Standalone teal-gradient contact form card, perfectly suited for embedding in subpages, service guides, or modal flows.

### 2a. `shared-elements.css` — canonical patterns below the token layer

[`client/src/styles/shared-elements.css`](../client/src/styles/shared-elements.css), imported once globally in `main.tsx` alongside `design-tokens.css`. Global classes, no page prefix — use these directly instead of writing a page-local equivalent. Extracted from `LandingPage.css`, re-synced 2026-09-18 against Landing's fully-finished, live-verified state (not just re-read from source — checked with `getComputedStyle()`). Used by every rebuilt page (7 unique pages + both families). Some islands still carry page-local variants of a pattern; prefer the shared class when touching them.

- **`.bb-wrap`** — the `1320px` (`--bb-wrap-max`) content container, identical everywhere already.
- **`.bb-btn` + three variants** — pill button, every state (hover, `:focus-visible`) defined once per variant:
  - **`.bb-btn--teal`** ("teal_button") — dark surfaces only. Transparent-to-teal horizontal gradient, white border; hover fills in to a solid two-tone gradient.
  - **`.bb-btn--ember`** ("ember_button") — dark surfaces only. Transparent-to-amber horizontal gradient (faint), amber border; hover intensifies the fill.
  - **`.bb-btn--ember-solid`** — light surfaces only (warm-white page, white card). Solid two-tone diagonal amber gradient, neutral drop shadow, slight inset bevel — a different treatment from `--ember`, not a lighter version of it, since there's no dark backdrop for a transparent gradient to blend into.
- **`.bb-eyebrow`, `.bb-eyebrow--dark`** — bakes in the dark-surface rule: dash stays amber, text turns white. `--dark` is for dark surfaces only, never on the light page background.
- **`.bb-h1`, `.bb-h2`** — Archivo 800, **mixed case** (not uppercase — this is Landing's actual rule; Kontakt/Biltjänster/Bilservice currently uppercase their H1s and are the ones that need to change, not Landing).
- **`.bb-accent`** — teal inline word-highlight inside a heading; same color on light or dark surfaces.
- **`.bb-lead`, `.bb-lead--dark`** — muted body-text color for light/dark surfaces; font-size/line-height stay contextual per page.
- **`.bb-card--photo`** — dark image card shell (photo + bottom gradient scrim), caller supplies the `<img>`/content.
- **`.bb-card-arrow`** — the ember bottom-right "go to" arrow that sits inside a `.bb-card--photo`.
- **`.bb-card--glass`** — translucent glass panel for a list/detail block on a dark photo band.
- **`.bb-icon-badge`, `.bb-icon-bare`** — two real icon treatments now (a third, a pale full circle behind a process-step icon, was tried on Landing and explicitly removed 2026-09-18 — do not reintroduce it as a shared pattern). `.bb-icon-badge` is ember-tinted rounded-square (ember is the accent color for icons site-wide now, not teal); `.bb-icon-bare` is a bare glyph with a drop-shadow for legibility, for an icon floating directly on a busy/dark background with nothing behind it.
- **`.bb-trust-row`** — 3-pillar hero trust pattern (*Personlig service*, *Erfarna mekaniker*, *Tryggt och enkelt*), containing `.bb-trust-row__item`, `.bb-icon-bare`, and `.bb-trust-row__text` (`<b>` + `<small>`). Stacks to 1 column on mobile (<=650px).
- **`.bb-process-grid`** — 5-step workshop protocol process layout (`<ol className="bb-process-grid">`), number `01` above `.bb-icon-bare`, with glowing amber connector line (`li::after`) across steps. Wraps cleanly to 3 columns on tablet and 2 columns on mobile.
- **`.bb-promo-card`** — dark cross-sell / promo banner card (`linear-gradient(135deg, var(--bb-color-ink-900) 0%, var(--bb-color-ink-950) 100%)`), containing `.bb-promo-card__copy` (`.bb-eyebrow--dark` + `h3`) and `.bb-btn--teal`. Stacks on mobile (<=640px).
- **`.bb-card--trust`** — light surface reassurance card (`background: var(--bb-color-surface, #fff)` with `var(--bb-shadow-card)`), containing `.bb-card--trust__icon`, `.bb-card--trust__text` (display `h3` + `.bb-lead`), and action buttons. Stacks on mobile (<=640px).
- **`.bb-hero` system** — standardized full-bleed hero layout from Landing (`.bb-hero`, `.bb-hero__media`, `.bb-hero__shade`, `.bb-hero__content`, `.bb-hero__copy`, `.bb-hero__actions`, `.bb-hero__bottom`). Governed by tokens `--bb-hero-min-height` (`clamp(700px, 58vw, 850px)`), `--bb-hero-min-height-mobile` (`780px`), `--bb-hero-copy-max-width` (`540px`), and canonical dual-layer scrim overlay (`90deg` dark-to-translucent ink + `0deg` bottom-to-top vignette). Stacks to single column with adjusted padding on mobile (<=650px). **Scope**: applies strictly to new independent pages disconnected from `index.css` (Landing, Bilservice, and future rebuilt standalone pages).

**Harmonization & Site-wide Decisions (2026-09-18, confirmed by Magnus)**:
1. *Canvas*: Landing's `--bb-color-page: #f8f7f3` is the generic site-wide rule (replacing Bilservice's one-off `#f5f3ee`).
2. *Dark Palette*: Canonical Ink (`--bb-color-ink-950: #071416`, `--bb-color-ink-900: #0d1f22`, etc.) site-wide (eliminating Bilservice's petrol drift `#07181c`, `#0a2429`).
3. *Process Layout*: Landing's process step layout is the canonical standard (number above `.bb-icon-bare`, glowing horizontal amber connector line).
4. *Hero System*: Landing's hero geometry, dual scrim overlay, typography, and bottom anchor layout are the canonical standard for all full-bleed heroes on independent pages.
Both Landing (`/`) and Bilservice (`/service-reparationer`) now actively consume these shared patterns and tokens, with redundant local rules pruned.

**Open, deliberately paused (2026-09-18)**: Magnus flagged that cards and possibly buttons read "too rounded." Not yet resolved — see "Radius tokens: what's safe to tune vs. already live" below before touching any radius token.

---

## 3. Legacy system — removed in Step 7 (2026-09-19)

The legacy `client/src/css/index.css` (7,531 lines, `--redesign-*` / `--color-*` tokens, `.services-page__*` and similar systems) was deleted in Step 7. Its audit (hex literals without tokens, legacy spacing, radius, motion, breakpoints, and the "teal accent card" and "dark card" motifs) lives in Git history (the file exists up to and including commit `80ec3958`). **Do not recreate any of it.** Every value now comes from §1 (`--bb-*`), and every shared pattern from §2a (`.bb-*`).

Global element defaults that used to live in `index.css` (`html`, `body`, `h1–h6`, `p`, `img`, `a`, `ul`) are now in `client/src/styles/base.css`. Tailwind's directives are in `client/src/styles/tailwind.css`.

---

## Eyebrow color rule (`--bb-*` pages, established 2026-09-18)

The small uppercase label above a heading (the "eyebrow") has a leading color-matched dash and comes in two contexts:

- **On a light/warm-white surface**: text and dash both `--bb-color-teal-700`/`-800`.
- **On a dark surface** (dark card, dark section, photo hero): the **dash stays amber** (`--bb-color-amber-500`), but the **text turns white** (`#fff`) — never amber text on a dark background. Confirmed live on Landing's hero eyebrow, Landing's "why/process/cars" dark-section eyebrows, and Biltjänster's closing-CTA eyebrow; apply the same split (amber dash + white text) to any new page's dark-surface eyebrow.

## `:where()` the reset, not the button (found 2026-09-18)

Every `--bb-*` unique page opens with a small reset block, including a line like:

```css
.page-prefix button, .page-prefix input, .page-prefix textarea, .page-prefix select { font: inherit; }
```

This silently wins over `.page-prefix__btn--primary { font-weight: 700; font-size: ...; }` on any actual `<button>` element, because `.page-prefix button` (class + type selector) is *more specific* than a single class — even though the reset line comes first in the file. Source order only breaks ties between rules of *equal* specificity; it doesn't matter here. The bug is invisible unless you compare a `<button>`-based CTA against an `<a>`-based one styled with the exact same class, since anchors don't match the `button` selector and render correctly.

**Found live** (2026-09-18) on Landing, Kontakt, and Biltjänster: every `<button>` "Boka tid"/submit button was rendering at the browser's inherited font-weight/size instead of the intended bold pill-button text, while `<a>`-based buttons (like the "Ring" call links) right next to them rendered correctly. Bilservice was unaffected only because its older stylesheet (written 2026-09-16, before this reset pattern existed) never had the conflicting line.

**The fix, and the rule going forward**: wrap the reset's element list in `:where()`, which contributes zero specificity so it can never outrank a real component class:

```css
.page-prefix :where(button, input, textarea, select) { font: inherit; }
```

Apply this in the reset block of every new unique page from the start — do not write the un-wrapped version, even though it will look identical to the un-wrapped version on `<a>`-only buttons in a quick check.

**Same bug, different property, found the same day**: `.page-prefix a { color: inherit; text-decoration: none; }` beats `.page-prefix__btn--primary { color: #fff; }` by the identical specificity math. On Landing this stayed invisible even longer than the font-weight case, because `inherit` doesn't produce an obviously-wrong value — it just pulls whatever color the ambient section already has. On the four dark-photo sections that's `#fff` too, so the button "happened" to look right by coincidence; on the two light sections it silently inherited the page's dark ink color instead, and a screenshot glance didn't catch it — only comparing `getComputedStyle(el).color` against the source did. **The lesson**: any reset combining a class with an element type (`a`, `button`, `input`, …) needs `:where()`, not just the one line that happened to cause a visibly-broken font-weight once. Audit every such line on a page, not just the one that already bit you.

## CSS file organization

Global stylesheets, loaded once in `client/src/main.tsx` in this order:

1. `styles/tailwind.css`: Tailwind directives. Preflight is global; utilities are for `/admin` only.
2. `styles/design-tokens.css`: `--bb-*` tokens (§1).
3. `styles/base.css`: global element defaults.
4. `styles/shared-elements.css`: `.bb-*` patterns (§2a).

Everything else is a CSS island imported by its own `.tsx` file:

- Each unique page has its own colocated `<Page>.css` with a unique class prefix.
- The two page families share exactly one file each: `ServiceReparationerPage.css` and `styles/ServiceGuideTemplate.css`. Reuse that file directly; never copy it.
- Shared components (`PublicHeader`, `PublicFooter`, `BookingForm`, `BiltjansterFaq`, `GalleryTeaserCard`, `GoogleReviewsCard`, `ContactFormCard`) each own a stylesheet next to their `.tsx`.
- Before naming a new prefix, check it isn't already used anywhere under `client/src` (see [`CSS_OWNERSHIP.md`](CSS_OWNERSHIP.md)).
- Do not add new global CSS. A pattern needed on several pages belongs in `shared-elements.css`, and only if it genuinely is shared.

The route-to-stylesheet map lives in [`CSS_OWNERSHIP.md`](CSS_OWNERSHIP.md). The pre-commit hook blocks Tailwind utilities in public TSX.

## JS code splitting

**New rule, established 2026-09-16 — every route imports lazily, no exceptions.**

`client/src/main.tsx` had the same shape of problem as the CSS file, for the same reason: every new page got a plain top-level `import PageName from './pages/PageName.tsx'`, which forces the bundler to include every single page's code in one JS file that ships on every visit — 850KB (228KB gzip) for what was, on any given visit, one page. Fixed 2026-09-16 by converting every route except `/` to `React.lazy()` + a shared `<Suspense>` boundary around `<Routes>`. Result: main bundle 850KB → 495KB, and every other page is now its own 5-18KB chunk fetched only when a visitor actually navigates there. `/admin`'s 81KB no longer ships to public visitors at all.

**The rule going forward:**

- **Any new route added to `client/src/main.tsx` must use `lazy(() => import('./pages/PageName.tsx'))`**, not a static top-level import. Copy the existing pattern in that file.
- The homepage route (`/`, `App.tsx`) stays a static/eager import — it's the most common entry point, and lazy-loading it would just add a loading flash for the majority of first visits with no real benefit.
- `/admin` must stay lazy — it's a protected, low-traffic route; there's no reason its code should ever reach a public visitor's browser.
- If you add a route and skip this, the bundle silently grows back toward one big file again — that's exactly how it happened the first time, one reasonable-looking `import` line at a time.

## Open decisions

**Not yet resolved — do not treat either side as settled:**

1. **Typography target.** Two V2 reference sheets (dark UI + light UI, supplied by Magnus) specify **Lato**. The site implements **Archivo 800 (display) / Manrope 400-700 (body)**. No decision has been made to adopt Lato, keep the current pair, or something else. A "Lato experiment" (real Lato rendering vs. the image model's rendered approximation in the V2 sheets) was proposed but not confirmed as run — verify with Magnus before treating the V2 sheets' typography as settled either way.
2. **Accent color target.** V2 sheets specify `#159CA5`. Implemented on `--bb-*` pages is `--bb-color-teal-500` `#0ab2c1` (headings) with `--bb-color-teal-700`/`-800` for buttons and labels; the legacy `--redesign-accent` `#2496a0` no longer exists. Not reconciled.
3. **Hover direction.** V2 sheets imply lighter-on-hover. Implemented `.bb-btn--*` hovers fill in or deepen the gradient (see `shared-elements.css`); the old legacy `.btn--primary` (deleted) went darker. Not reconciled.
4. **V2 sheet accuracy.** The two V2 sheets have at least one confirmed labeling error (Amber Dark shown as `#845309`/`#84530B` vs. its own written spec of `#B45309`) and one fabricated price (`595 kr` for hjulskifte — the real prices on `/dackservice` are 350/500 kr). A regeneration prompt was drafted to fix both issues and test real Lato instead of the rendered approximation. **Check with Magnus whether that regeneration happened** before using the sheets as a reliable source for anything beyond general direction.

Until these are resolved, treat this document as the IMPLEMENTED baseline only. When a TARGET is confirmed, add it alongside the IMPLEMENTED value in the relevant table rather than overwriting — that's what makes the three-state model useful going forward.
