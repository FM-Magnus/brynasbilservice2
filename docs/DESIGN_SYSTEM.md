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
| `--bb-color-teal-500` | `#0ab2c1` | Vibrant cyan/teal accent for CTA highlights |
| `--bb-color-teal-100` | `#def7f8` | Pale teal tint for tags and light badges |
| `--bb-color-focus` | `#9ce8ed` | Accessible focus ring outline |
| `--bb-color-amber-500`| `#f09505` | Canonical automotive amber: footer accents, signature, urgent alerts |
| `--bb-color-amber-400`| `#fca311` | Light amber hover highlight |
| `--bb-color-amber-600`| `#d48202` | Deep amber border / shadow |
| `--bb-color-border-subtle` | `rgba(255, 255, 255, 0.08)` | Subtle border on dark ink surfaces (added 2026-09-20) |
| `--bb-color-border-subtle-light` | `rgba(7, 20, 22, 0.08)` | Subtle border on light white/page surfaces (added 2026-09-20) |
| `--bb-color-text` | `#122225` | Primary body text on light surfaces |
| `--bb-color-text-muted`| `#5e6c70` | Secondary / supporting text on light surfaces |
| `--bb-color-text-inverse` | `#ffffff` | Text on dark surfaces. Use this, not a bare `#fff` (11 bare `#fff` in `ServiceGuideTemplate.css` were converted 2026-09-22) |
| `--bb-color-featured-gradient-start` / `-end` | `#0b848e` / `#066973` | Semantic, not a ramp step: the Guide family's "featured" symptom row (teal gradient). Added 2026-09-22 — was hardcoded hex that `check:css` couldn't see |
| `--bb-color-urgent-gradient-start` / `-end` | `#e2711d` / `#c25a10` | Semantic: the Guide family's "urgent" symptom row (ember gradient). Added 2026-09-22, same reason |

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
| `--bb-radius-sm` | `4px` | Small tags and subtle corners |
| `--bb-radius-md` | `6px` | Compact cards, image panels and form fields |
| `--bb-radius-card` | `8px` | Standard card and panel corner |
| `--bb-radius-menu` | `8px` | Header dropdown and mobile navigation panel corner |
| `--bb-radius-control`| `6px` | Buttons, navigation and other controls |
| `--bb-shadow-floating` | `0 18px 44px rgba(0,0,0,0.34)` | Floating header & elevated dark card shadow |
| `--bb-shadow-button` | `0 10px 20px rgba(0,166,180,0.26)` | `.bb-btn--teal`'s glow (added 2026-09-18) |
| `--bb-shadow-card` | `0 10px 26px rgba(7,20,22,0.08)` | Resting card elevation (added 2026-09-18; used by `.bb-card--trust` and `ServiceGuideTemplate.css`) |
| `--bb-transition-fast` | `150ms cubic-bezier(0.4, 0, 0.2, 1)` | Standard fast hover/focus transition |

### Radius tokens: site-wide decision (2026-09-24)

Magnus chose slightly rounded, almost square corners across the public site. The radius tokens above are canonical and affect the header, footer, cards, buttons and page families. Larger local rectangular corners were aligned with these tokens. True circles (icons, avatars and tiny status dots) remain circular.

---

## 2. Canonical Public Shell Components

The site is framed and anchored by five standalone, self-contained Level 0 Public Shell & Canonical Core components, plus [`shared-elements.css`](../client/src/styles/shared-elements.css) (global `.bb-*` classes for button/eyebrow/card/icon-badge patterns — see §2a below):

1. **`PublicHeader`** ([`client/src/components/layout/PublicHeader.tsx`](../client/src/components/layout/PublicHeader.tsx) + [`PublicHeader.css`](../client/src/components/layout/PublicHeader.css)):
   - Renders at document root via React Portal (`z-index: 100`) so it clears all hero and stacking contexts.
   - Fixed floating layout with desktop navigation bar, Biltjänster dropdown (driven by [`publicNavigation.ts`](../client/src/data/publicNavigation.ts)), compact desktop navigation from 1001–1320px, and an accessible mobile slide-down panel at 1000px and below.
2. **`PublicFooter`** ([`client/src/components/layout/PublicFooter.tsx`](../client/src/components/layout/PublicFooter.tsx) + [`PublicFooter.css`](../client/src/components/layout/PublicFooter.css)):
   - 4-column automotive footer matching Magnus's approved mockup (`media_1789659344071.png`).
   - Column 1: Centered brand logo (`66px`), white subheader `— DIN LOKALA BILVERKSTAD I BRYNÄS, GÄVLE`, 3 trust badges (*Tryggt och enkelt*, *Personlig service*, *Erfarna mekaniker*), centered amber script signature *"Vi håller din bil i rullning!"*.
   - Column 2: 9 Snabba länkar with right-pointing interactive chevrons (`›`).
   - Column 3: 4 dark-teal contact badge cards (Telefon, E-post, Besöksadress, Google Maps link).
   - Column 4: Vertically centered amber clock with verified hours (Mån–Fre 08:00–17:00), cyan `BOKA TID →` button, and direct phone link `RING OSS: 070-553 33 95`.
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
     - `variant="hero-overlay"`: Frosted-glass transparent bounding field (`background: rgba(3, 22, 26, 0.42); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: var(--bb-radius-card); backdrop-filter: blur(8px)`) with a 660px maximum width, separate 96px rating and 155px Google columns, a 110px reviewer-name track, and a fixed 100px height on desktop/tablet, with the review excerpt clamped to three lines. On phones (≤650px) it has a compact layout (2026-09-24, Magnus's choice): the rating and Google on one row and one line of the rotating quote ("Name: text…", avatar and per-review stars hidden), 94px tall. Every line is single-line, so rotating reviews cannot resize a hero. The `card` variant keeps the full phone layout.
     - `variant="card"`: Elevated dark-ink card (`#0d1f22`) with border and floating shadow for standard page body or sidebar placement.
   - The hero-overlay variant appears in the heroes on Landing, Om oss, Bilservice, Felsökning, Däckservice and Kontakt. The card variant remains in the page flow on AC-service. Page-level link resets require the owning page CSS to preserve light text on the overlay or card.
5. **`ContactFormCard`** ([`client/src/components/ui/ContactFormCard.tsx`](../client/src/components/ui/ContactFormCard.tsx) + [`ContactFormCard.css`](../client/src/components/ui/ContactFormCard.css)):
   - Centralized Single Source of Truth for contact topics/subjects (`defaultContactSubjects = ['Bilservice & oljebyte', 'Reparation & felsökning', 'Däckservice & hjulinställning', 'AC-service', 'Bärgning & transport', 'Övrigt']`), direct phone/email/address details, and submission states.
   - Dual variants:
     - `variant="full-section"`: Two-column conversion section with background decorative brand art, left contact info column, and right form card.
     - `variant="card-only"`: Standalone teal-gradient contact form card, perfectly suited for embedding in subpages, service guides, or modal flows.

### 2a. `shared-elements.css` — canonical patterns below the token layer

[`client/src/styles/shared-elements.css`](../client/src/styles/shared-elements.css), imported once globally in `main.tsx` alongside `design-tokens.css`. Global classes, no page prefix — use these directly instead of writing a page-local equivalent. Extracted from `LandingPage.css`, re-synced 2026-09-18 against Landing's fully-finished, live-verified state (not just re-read from source — checked with `getComputedStyle()`). Used by every rebuilt page (7 unique pages + both families). Some islands still carry page-local variants of a pattern; prefer the shared class when touching them.

- **`.bb-wrap`** — the `1320px` (`--bb-wrap-max`) content container, identical everywhere already.
- **`.bb-btn` + three variants** — slightly rounded button, every state (hover, `:focus-visible`) defined once per variant:
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
- **`.bb-trust-row`** — 3-pillar hero trust pattern (*Personlig service*, *Erfarna mekaniker*, *Tryggt och enkelt*), containing `.bb-trust-row__item`, `.bb-icon-bare`, and `.bb-trust-row__text` (`<b>` + `<small>`). Hidden on phones (<=650px, Magnus 2026-09-24), like Bärgning's own `.bargning-page__hero-trust-row`. Used by the Bilservice-family heroes, Landing, Bilar till salu and, since 2026-09-21, the ten guide heroes; a page must not define its own trust-row CSS.
- **`.bb-process-grid`** — 5-step workshop protocol process layout (`<ol className="bb-process-grid">`), number `01` above `.bb-icon-bare`, with glowing amber connector line (`li::after`) across steps. Wraps cleanly to 3 columns on tablet and 2 columns on mobile.
- **`.bb-promo-card`** — dark cross-sell / promo banner card (`linear-gradient(135deg, var(--bb-color-ink-900) 0%, var(--bb-color-ink-950) 100%)`), containing `.bb-promo-card__copy` (`.bb-eyebrow--dark` + `h3`) and `.bb-btn--teal`. Stacks on mobile (<=640px).
- **`.bb-tip`** (added 2026-09-22) — the one canonical "tip" callout, any page, any family. Pale teal (`--bb-color-teal-100`) card with a 4px `--bb-color-teal-500` left border. Markup: `.bb-tip` > `.bb-icon-badge` (icon) + `.bb-tip__body` > `.bb-eyebrow` ("Tips") + `.bb-tip__title` (`<strong>`) + `.bb-tip__text`, optionally followed by a `.bb-btn`. Stacks on mobile (<=640px), button goes full width. Replaced two drifting family-local versions, `.service-guide__tip-strip` (Guide family) and `.bilservice__repair-note` (Bilservice, only ever used on AC-service) — both deleted; do not recreate a page-local tip box. Spacing above it is set by the consuming family (`.service-guide__intro-content > .bb-tip`, `.bilservice__price-grid + .bb-tip`), not by `.bb-tip` itself. Deliberately `position: relative` with no `overflow: hidden`: a planned mascot ("Schomaher", "TIPS FRÅN SCHOMAHER" label) will peek over the top edge — see `docs/LOG.md` 2026-09-22.
- **`.bb-card--trust`** — light surface reassurance card (`background: var(--bb-color-surface, #fff)` with `var(--bb-shadow-card)`), containing `.bb-card--trust__icon`, `.bb-card--trust__text` (display `h3` + `.bb-lead`), and action buttons. Stacks on mobile (<=640px).
- **`.bb-hero` system** — standardized full-bleed hero layout from Landing (`.bb-hero`, `.bb-hero__media`, `.bb-hero__shade`, `.bb-hero__content`, `.bb-hero__copy`, `.bb-hero__actions`, `.bb-hero__bottom`). Governed by tokens `--bb-hero-min-height` (`clamp(520px, 70svh, 640px)`, changed 2026-09-20), `--bb-hero-min-height-mobile` (`780px`), `--bb-hero-copy-max-width` (`540px`), and canonical dual-layer scrim overlay (`90deg` dark-to-translucent ink + `0deg` bottom-to-top vignette). Stacks to single column with adjusted padding on mobile (<=650px). **Scope**: shared by the Landing and requested page heroes. Landing, Om oss, Felsökning, Däckservice, AC-service, Bärgning and Kontakt set `min-height: var(--bb-hero-matched-height)` (added 2026-09-24): 730px above 1120px, `clamp(701px, calc(532px + 22vw), 780px)` from 651 to 1120px, 686px at 650px and below (phones have no trust row, a compact review card, "Ring oss nu" hero buttons and no second Kontakt paragraph). Each value is at least the tallest of the seven heroes' content at that width, so they come out equal; if a hero's content grows, re-measure and raise the token. Other routes keep `--bb-hero-min-height`. Guarded by `tests/browser/hero-size-consistency.spec.ts`.

**Harmonization & Site-wide Decisions (2026-09-18, confirmed by Magnus)**:
1. *Canvas*: Landing's `--bb-color-page: #f8f7f3` is the generic site-wide rule (replacing Bilservice's one-off `#f5f3ee`).
2. *Dark Palette*: Canonical Ink (`--bb-color-ink-950: #071416`, `--bb-color-ink-900: #0d1f22`, etc.) site-wide (eliminating Bilservice's petrol drift `#07181c`, `#0a2429`).
3. *Process Layout*: Landing's process step layout is the canonical standard (number above `.bb-icon-bare`, glowing horizontal amber connector line).
4. *Hero System*: Landing's hero geometry, dual scrim overlay, typography, and bottom anchor layout are the canonical standard for all full-bleed heroes on independent pages.
Both Landing (`/`) and Bilservice (`/service-reparationer`) now actively consume these shared patterns and tokens, with redundant local rules pruned.

**Radius decision (2026-09-24):** Magnus chose slightly rounded, almost square corners for cards, menus and controls. See the radius token table above.

---

### 2b. Icons (`client/src/components/icons/`)

- **Shape.** One file per icon, `XxxIcon.tsx`, a named export taking only `{ className?: string }`. Decorative: `aria-hidden="true"`, `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`. Import each icon directly; there is no barrel file, so route-level code splitting keeps working.
- **Drawing standard: stroke 2 for every shared icon** (decided 2026-09-20; all 29 use it). Round caps and joins are set on `MailIcon`, `SendIcon`, `CalendarIcon`, `MapPinIcon` and three older icons (ChatDots, ShieldHeart, Instagram); the other 22 use the default butt caps and are not normalised.
- **Promotion rule.** A glyph becomes a shared icon when two or more files draw it. A glyph used in one file stays local.
- **Size and colour are never in the icon.** Colour is `currentColor`. Size comes from the consumer's own island (`.bargning-page__hero-trust-icon svg`) or a shared pattern (`.bb-btn svg`, `.bb-card-arrow svg`, `.bb-icon-badge svg`, `.bb-icon-bare svg`).
- **CSS beats SVG attributes.** Where a rule sets `stroke`, `stroke-width`, `fill` or linecap on `svg`, that rule owns the value. Today that is only `PublicHeader.css`, so the header's five icons stay local and attribute-free; a shared icon with its own attributes would state the same value twice.
- **Adding or swapping an icon:** search the CSS for rules that touch `svg` in that context, then render the old and new drawing at the size actually used and compare before committing.
- **Still local, by decision (2026-09-20):** the header's five icons (`PublicHeader.css` owns their paint); Landing's chat, shield, clock and car (the shared shield has no check mark and `CarSaleIcon` is a different glyph); ContactPage's chevron; and one-offs in Bärgning (4) and Om oss (6). Phone, pin, arrow and check are deduplicated: the shared drawings won for phone, arrow and check, and `MapPinIcon` carries the footer pin's shape.
- **Open:** round caps on the 22 butt-cap icons, and whether Landing's four local icons should get shared equivalents.

### 2c. Hero geometry (steps 1-3 done; step 3 on 2026-09-21)

- **Tokens** (`design-tokens.css`): `--bb-header-height` (80px up to 1320px wide; above that `2 * clamp(1rem, 2vw, 1.9rem) + 64px`, the header's own formula), `--bb-hero-clearance` (header height + 1.5rem), `--bb-hero-padding-top` (= clearance), `--bb-hero-min-height` (`clamp(520px, 70svh, 640px)`) and `--bb-hero-h1-size` (`clamp(2.25rem, 3.4vw + 0.6rem, 3rem)`, max 48px).
- **Where they land:** `.bb-hero` pages (Home, Bilservice, Felsökning, Däckservice, AC-service, Kontakt, Bilar till salu), the ten guides (`.service-guide__hero`), Om oss and Bärgning. AC-service's hero is full-bleed with booking and phone actions only (no registration field, badges or trust row). The hero H1 size is set in `.bb-hero__copy .bb-h1`, `.service-guide__hero .service-guide__title`, `.omoss-page__hero-title` and `.bargning-page__hero-title`. Galleri and Biltjänster are the compact type and are untouched.
- **Why:** the old top padding (141-173px) was sized for the 122px header at 1440 wide; below 1321px the header is 80px. Measured before the change: at 1280x720, 18 of 21 heroes were taller than the screen, and for 19 of 21 the height came from content and padding, not `min-height`.
- **Guard:** `tests/browser/hero.spec.ts` checks `--bb-header-height` against the real header edge at eight widths and that every H1 starts at least 24px below the header. If `PublicHeader.css` changes its padding or logo height, update the token.
- **Guide trust row (step 3):** the ten guides use the shared `.bb-trust-row` (§2a) in place of their own `.service-guide__trust-*` rules, which were deleted: three equal columns above 650px, hidden below (since 2026-09-24), items vertically centred, title `<b>` and text `<small>` (were `<h3>` and `<p>`). At 1280x720 the row went from 148-167px to 82-98px; tablet heroes moved by -10 to +8px and phone heroes are 53-85px shorter. The copy is unchanged; the guides' `.text.txt` baseline snapshots lost 6 blank lines each.
- **Status at 1280x720 after steps 1-3 (hero as % of screen height):** Kontakt 72, Bärgning 78, Bilservice 82, Bilbatteri 84, Hjullager 84, Stötdämpare 84, Styrning 85, Drivaxel 87, Home 89, Bilar till salu 90, Däckservice 91, Koppling 92, Bromssystem 92, Felsökning 94, Avgassystem 94, Om oss 98, Kamrem 105, Oljebyte 105, AC-service 125. Target for the Standard type is 85%: five guides are at 84-87%.
- **Guide hero is now full-bleed (2026-09-22, supersedes the column measurements below):** the ten guides no longer have a split grid with an image column (`.service-guide__hero-media` and the floating `.service-guide__hero-badge` card were deleted). The photo is a real `<picture>`/`<img>` in `.service-guide__hero-bg`, absolutely positioned behind a `90deg` ink gradient (`.service-guide__hero::before`, same ramp as `.bargning-page__hero`); copy sits in `.service-guide__hero-inner` (max 680px). A real image rather than CSS `background-image` keeps the alt text and avoids inline `style=` (banned in public TSX). Crop defaults to `object-position: center right`; add `.service-guide__hero-bg--pos-left` when the photo's subject sits left of centre (Stötdämpare) — alignment is per photo, so decide it by looking at the image, not by default. A guide with no hero photo omits `.service-guide__hero-bg` and gets the plain ink-950 background. **Photo brief for future guide heroes:** subject in the right ~60%, left ~40% dark and soft for the text; object close-ups (a part on a bench) integrate better than mechanic shots — Drivaxel is the reference.
- **Open (measured before the full-bleed change — re-measure before acting):** Koppling, Bromssystem and Avgassystem (92-94%: the H1 wraps to three lines and the lead is long; the "84% floor from a 435px media column" no longer applies now the column is gone); Oljebyte and Kamrem (105%, previously set by a 587px image column — likely lower now); Om oss and Bilar till salu are set by their image or side column, not the text. Mobile hero tokens are unchanged. The phone-button label has six copy variants (copy decision).

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

**Found live** (2026-09-18) on Landing, Kontakt, and Biltjänster: every `<button>` "Boka tid"/submit button was rendering at the browser's inherited font-weight/size instead of the intended bold button text, while `<a>`-based buttons (like the "Ring" call links) right next to them rendered correctly. Bilservice was unaffected only because its older stylesheet (written 2026-09-16, before this reset pattern existed) never had the conflicting line.

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
