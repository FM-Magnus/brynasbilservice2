# Brynäs Bilservice — Design System

This is the living reference for the site's visual tokens and patterns.
**AUTHORITATIVE CANONICAL TOKENS**: `client/src/styles/design-tokens.css` defines the `--bb-*` design tokens that govern the 7 fully unique standalone pages, the 2 shared service-page families (Bilservice family, Guide family), and the standalone Public Shell (`PublicHeader`, `PublicFooter`, `GoogleReviewsCard`, and `ContactFormCard`) — see `docs/CSS_OWNERSHIP.md` for the current architecture. The legacy `client/src/css/index.css` and its tokens were deleted in Step 7 (2026-09-19).

## 1. Canonical Design Tokens (`--bb-*`) — Single Source of Truth

Located in [`client/src/styles/design-tokens.css`](../client/src/styles/design-tokens.css).

### Color Palette

| Token | Value | Role / Usage |
|---|---|---|
| `--bb-color-ink-950` | `#071416` | Deepest canvas tone, footer background, dark hero base |
| `--bb-color-ink-900` | `#0d1f22` | Dark card background, dark container surfaces |
| `--bb-color-ink-800` | `#14373b` | Elevated dark surfaces, borders, icon card backdrops |
| `--bb-color-ink-soft` | `#0c2327` | Soft ink secondary containers |
| `--bb-color-ink-glass` | `rgba(6, 21, 24, 0.9)` | Translucent ink for bars floating over content — the phone quick-contact bar in `PublicFooter.css`. Added 2026-09-29, Magnus approved |
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
| `--bb-color-featured-gradient-start` / `-end` | `var(--bb-color-teal-700)` (`#047784`) / `#066973` | Semantic, not a ramp step: the Guide family's "featured" symptom row (teal gradient). Added 2026-09-22 — was hardcoded hex that `check:css` couldn't see. Start deepened 2026-09-30 (audit C02) so white text is 5.3:1 or better |
| `--bb-color-urgent-gradient-start` / `-end` | `#b5500d` / `#9a4409` | Semantic: the Guide family's "urgent" symptom row (ember gradient). Added 2026-09-22, same reason. Deepened 2026-09-30 from `#e2711d` / `#c25a10` (white text was 2.8-4.4:1; now 5.1:1 or better; audit C02) |

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
   - Fixed floating layout with desktop navigation bar, a bar of seven items (Hem, Om oss, Biltjänster, Däck, Bärgning, Till salu, Kontakt; Felsökning and AC live in the menu), a Biltjänster dropdown in four groups (Underhåll, Motor & drivlina, Bromsar, hjul & chassi, Felsökning & klimat) plus an overview row (Våra tjänster, Reparationer & större arbeten), all driven by [`publicNavigation.ts`](../client/src/data/publicNavigation.ts) (`groups`, `overview`, `inServices`; `children` stays the flat list and the footer lists every top-level item), compact desktop navigation from 1187–1320px, and an accessible mobile slide-down panel at 1186px and below (Biltjänster is an accordion with the same groups). The logo is never smaller than the phone logo (195 × 48px) and the header stays 80px up to 1320px. The nav pill and the Boka tid button form one right-aligned unit (both 56px tall, no gap, square inner corners, no hover lift on the button), and the dropdown hangs from the pill's right edge. The dropdown and the panel scroll inside themselves on short screens (`max-height` = screen minus header).
2. **`PublicFooter`** ([`PublicFooter.tsx`](../client/src/components/layout/PublicFooter.tsx) + [`PublicFooter.css`](../client/src/components/layout/PublicFooter.css)):
   - Four-column footer on a deep `#061518` background with the wheel photo: brand and trust badges, quick links (the top-level items of `publicNavigation`), contact badge cards, hours with the Boka tid / Ring oss buttons. The sub-footer takes the legal name and org.nr from `business.ts`. Integritetspolicy and Cookies links were removed 2026-09-24 until a real page exists.
   - Phone footer (<= 650px): see `CSS_OWNERSHIP.md` and `STATUS.md`.
3. **`GoogleReviewsCard`** ([`client/src/components/ui/GoogleReviewsCard.tsx`](../client/src/components/ui/GoogleReviewsCard.tsx) + [`GoogleReviewsCard.css`](../client/src/components/ui/GoogleReviewsCard.css)):
   - Standalone Google reviews module with verified Brynäs reviews (`4,3` rating, 50 reviews, link to Google Maps).
   - Encapsulates 8s cyclic rotation, 220ms cross-fade, cleans up interval on unmount, and respects `prefers-reduced-motion`.
   - Single accessible `<a>` tag with visible focus ring.
   - Dual variants:
     - `variant="hero-overlay"`: Frosted-glass transparent bounding field (`background: rgba(3, 22, 26, 0.42); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: var(--bb-radius-card); backdrop-filter: blur(8px)`) with a 660px maximum width, separate 96px rating and 155px Google columns, a 110px reviewer-name track, and a fixed 100px height on desktop/tablet, with the review excerpt clamped to three lines. On phones (≤650px) it has a compact layout (2026-09-24, Magnus's choice): the rating and Google on one row and one line of the rotating quote ("Name: text…", avatar and per-review stars hidden), 94px tall. Every line is single-line, so rotating reviews cannot resize a hero. The `card` variant keeps the full phone layout.
     - `variant="card"`: Elevated dark-ink card (`#0d1f22`) with border and floating shadow for standard page body or sidebar placement.
   - The hero-overlay variant appears in the heroes on Landing, Om oss, Bilservice, Felsökning, Däckservice and Kontakt, always bottom-left directly under the hero buttons (2026-09-30). The card variant remains in the page flow on AC-service. Page-level link resets require the owning page CSS to preserve light text on the overlay or card.
4. **`ContactFormCard`** ([`client/src/components/ui/ContactFormCard.tsx`](../client/src/components/ui/ContactFormCard.tsx) + [`ContactFormCard.css`](../client/src/components/ui/ContactFormCard.css)):
   - Centralized Single Source of Truth for contact topics/subjects (`contactSubjects` in `client/src/api/contact.ts` = `['Bilservice & oljebyte', 'Reparation & felsökning', 'Däckservice & hjulinställning', 'AC-service', 'Bärgning & transport', 'Övrigt']`), direct phone/email/address details, and submission states. Until a `/api/contact` endpoint exists, submitting opens a pre-filled e-mail through `client/src/api/contact.ts` (the Kontakt page's own form shares the submit logic through `hooks/useContactForm.ts`).
   - Dual variants:
     - `variant="full-section"`: Two-column conversion section with background decorative brand art, left contact info column, and right form card.
     - `variant="card-only"`: Standalone teal-gradient contact form card, perfectly suited for embedding in subpages, service guides, or modal flows.
5. **`GalleryDockStrip`** ([`GalleryDockStrip.tsx`](../client/src/components/ui/GalleryDockStrip.tsx) + [`.css`](../client/src/components/ui/GalleryDockStrip.css), added 2026-09-25):
   - Horizontal photo strip pulling the same images as `/galleri` via `getGalleryImages()` (never hard-code images; a file dropped into `client/src/assets/galleri/` appears in both places). The heading links to `/galleri`; each photo deep-links to `/galleri?bild={slug}`.
   - Mobile: one photo at a time, native swipe/snap. From 640px: a short row with mouse-drag scrolling (mouse only), Dock-style hover magnify and hover edge scrolling; the tuning constants (`EDGE_ZONE_FRACTION`, `EDGE_MAX_SPEED_PX_PER_S`) are in the component.
   - Used on Landing (under the services row) and Om oss (above "Därför väljer kunder oss").

### 2a. `shared-elements.css` — canonical patterns below the token layer

[`client/src/styles/shared-elements.css`](../client/src/styles/shared-elements.css), imported once globally in `main.tsx` alongside `design-tokens.css`. Global classes, no page prefix — use these directly instead of writing a page-local equivalent. Extracted from `LandingPage.css`, re-synced 2026-09-18 against Landing's fully-finished, live-verified state (not just re-read from source — checked with `getComputedStyle()`). Used by every rebuilt page (7 unique pages + both families). Some islands still carry page-local variants of a pattern; prefer the shared class when touching them.

- **`.bb-wrap`** — the `1320px` (`--bb-wrap-max`) content container, identical everywhere already.
- **`.bb-btn` + three variants** — slightly rounded button, every state (hover, `:focus-visible`) defined once per variant:
  - **`.bb-btn--teal`** ("teal_button") — dark surfaces only. Transparent-to-teal horizontal gradient, white border; hover fills in to a solid two-tone gradient.
  - **`.bb-btn--ember`** ("ember_button") — dark surfaces only. Transparent-to-amber horizontal gradient (faint), amber border; hover intensifies the fill.
  - **`.bb-btn--ember-solid`** — light surfaces only (warm-white page, white card). Solid two-tone diagonal amber gradient, neutral drop shadow, slight inset bevel — a different treatment from `--ember`, not a lighter version of it, since there's no dark backdrop for a transparent gradient to blend into. The label is dark (`--bb-color-ink-950`, 8.0/6.2:1 at rest); white on this amber is only 2.3-3.0:1 (design audit C01, 2026-09-30).
- **`.bb-eyebrow`, `.bb-eyebrow--dark`** — bakes in the dark-surface rule: dash stays amber, text turns white. `--dark` is for dark surfaces only, never on the light page background.
- **`.bb-h1`, `.bb-h2`** — Archivo 800, **mixed case** (not uppercase — Landing's rule, which every page now follows; Biltjänster was the last to change, 2026-09-24).
- **`.bb-accent`** — inline word-highlight inside a heading: `--bb-color-teal-700` by default (4.9:1 on the light page background; teal-500 was 2.4:1, audit C05), inside an `h1` (all heroes, on photos) the lighter `--bb-color-focus` cyan (3:1 or better on the measured slides, audit C03), and `--bb-color-teal-500` in the sections with a dark surface (Landing process, Bilservice-family process, Kontakt focus), each set in its own island.
- **`.bb-lead`, `.bb-lead--dark`** — muted body-text color for light/dark surfaces; font-size/line-height stay contextual per page.
- **`.bb-icon-badge`, `.bb-icon-bare`** — two real icon treatments now (a third, a pale full circle behind a process-step icon, was tried on Landing and explicitly removed 2026-09-18 — do not reintroduce it as a shared pattern). `.bb-icon-badge` is ember-tinted rounded-square (ember is the accent color for icons site-wide now, not teal); `.bb-icon-bare` is a bare glyph with a drop-shadow for legibility, for an icon floating directly on a busy/dark background with nothing behind it.
- **`.bb-trust-strip` / `.bb-trust-row`** — the trust points as one flush row directly under a hero (moved out of the hero 2026-09-30 to declutter it; Magnus). Rendered only by `components/ui/TrustStrip.tsx` (`<TrustStrip items label? />`, items `{ icon, title, text }`); the guides mount it from `GuideHero`; Om oss, Bilar till salu, Bilservice, Felsökning and Däckservice mount it right after their hero section. Dark text on the page background, equal columns (three, four on Om oss), `.bb-icon-bare` amber icons (`.bb-trust-row__item`, `.bb-trust-row__text` with `<b>` + `<small>`), a hairline below; hidden on phones (<=650px, Magnus 2026-09-24). Guarded by `shared-components.spec.ts`. Landing uses it too, with its four items (its own boxed-icon `.landing-v2__trust-strip` was deleted 2026-09-30); Bärgning's hero trust row is a deliberate page design, not a copy to consolidate (Magnus, 2026-09-24). Om oss's own floating four-card strip (`.omoss-page__trust-strip`) was removed 2026-09-30 in favour of this one.
- **`.bb-process-grid`** — 5-step workshop protocol process layout (`<ol className="bb-process-grid">`), number `01` above `.bb-icon-bare`, with glowing amber connector line (`li::after`) across steps. Wraps cleanly to 3 columns on tablet and 2 columns on mobile.
- **`.bb-promo-card`** — dark cross-sell / promo banner card (`linear-gradient(135deg, var(--bb-color-ink-900) 0%, var(--bb-color-ink-950) 100%)`), containing `.bb-promo-card__copy` (`.bb-eyebrow--dark` + `h3`) and `.bb-btn--teal`. Stacks on mobile (<=640px).
- **`.bb-shade-copy-left`** (added 2026-09-29, Magnus approved) — the hero shade that darkens toward the copy: a 90° ink ramp from the left on desktop, a vertical band behind the stacked text at ≤650px, and from 651 to 1120px a taller bottom-anchored vertical ramp (100 % at the bottom, 85 % at 45 %, 50 % at 70 %, 0 at 92 %) because the copy sits half-way up the tall tablet hero (audit C04, 2026-09-30). Add it to a hero's shade layer (`.bb-hero__shade` on Kontakt, `.omoss-page__hero-shade` on Om oss); `.bb-hero__shade.bb-shade-copy-left` out-ranks `.bb-hero__shade`'s own `background: none`. Page extras layer on top with a page-local `::before` (Om oss's 30% black left edge). Replaced two identical page copies; rendering unchanged (pixel diff 0 at 2% tolerance, 1440/768/390).
- **`.bb-hero__slide`** (added 2026-09-29, Magnus approved) — the one hero slideshow layer: each `<picture>` in the hero's media layer gets `.bb-hero__slide`, `.is-active` on the shown one; paired with `hooks/useHeroSlideshow.ts` (7 s interval, pauses when the tab is hidden, off with reduced motion). Absolute, full-size, 1.4 s opacity crossfade, image `object-fit: cover`. Deliberately sets no `object-position`: the crop is per page and per photo, written page-scoped (`.omoss-page__hero .bb-hero__slide img`, `.kontakt-page__hero .kontakt-page__hero-slide--car img`). Used by Landing, Om oss, Kontakt and Bärgning; replaced four page-local copies — do not recreate one.
- **`.bb-tip`** (added 2026-09-22) — the one canonical "tip" callout, any page, any family. Pale teal (`--bb-color-teal-100`) card with a 4px `--bb-color-teal-500` left border. Markup: `.bb-tip` > `.bb-icon-badge` (icon) + `.bb-tip__body` > `.bb-eyebrow` ("Tips") + `.bb-tip__title` (`<strong>`) + `.bb-tip__text`, optionally followed by a `.bb-btn`; rendered by `components/ui/Tip.tsx` (`<Tip title text action? />`), never hand-written. Stacks on mobile (<=640px), button goes full width. Replaced two drifting family-local versions, `.service-guide__tip-strip` (Guide family) and `.bilservice__repair-note` (Bilservice, only ever used on AC-service) — both deleted; do not recreate a page-local tip box. Spacing above it is set by the consuming family (`.service-guide__intro-content > .bb-tip`, `.bilservice__price-grid + .bb-tip`), not by `.bb-tip` itself. Deliberately `position: relative` with no `overflow: hidden`: a planned mascot ("Schomaher", "TIPS FRÅN SCHOMAHER" label) will peek over the top edge — see `docs/LOG.md` 2026-09-22.
- **`.bb-location-pin`** (added 2026-09-30, Magnus approved) — an arrow above a solid dark label card, for pointing at a building in a photo. Rendered only by `components/ui/LocationPin.tsx` (`<LocationPin label? address? className? />`), never hand-written; address defaults to `BUSINESS.address.full` (`data/business.ts`) and must not be typed by hand elsewhere. Absolute, anchored bottom-center by default — the photo's own wrapper needs `position: relative`, and a consumer needing a different anchor overrides via `className`. Replaces a one-off: the Om oss gallery's workshop-exterior photo had this same message baked into its pixels, with an address that had already drifted from `business.ts` by one line (no "B", wrong district) — that photo is left as-is until a clean, unannotated source exists; the component isn't wired into any page yet.
- **`.bb-card--trust`** — light surface reassurance card (`background: var(--bb-color-surface, #fff)` with `var(--bb-shadow-card)`), containing `.bb-card--trust__icon`, `.bb-card--trust__text` (display `h3` + `.bb-lead`), and action buttons. Stacks on mobile (<=640px).
- **`.bb-hero` system** — standardized full-bleed hero layout from Landing (`.bb-hero`, `.bb-hero__media`, `.bb-hero__shade`, `.bb-hero__content`, `.bb-hero__copy`, `.bb-hero__actions`, `.bb-hero__bottom`). Governed by tokens `--bb-hero-min-height` (`clamp(520px, 70svh, 640px)`, changed 2026-09-20), `--bb-hero-min-height-mobile` (`686px`, was 780px until 2026-09-30), `--bb-hero-copy-max-width` (`540px`), and the shared hero shade `.bb-shade-copy-left` (2026-09-30): on a hero's `.bb-hero__shade` layer it draws an elliptical gradient anchored to the bottom-left text corner (a vertical gradient that is clear across the top on phones, so the phone photo's focal area is untouched). Its peak opacity is one token, `--bb-shade-strength` (default `0.55` in `design-tokens.css`), set per hero in the page's island: Landing 0.6, Bilservice family 0.3, Felsökning 0.5, Bilar till salu 0.7, Kontakt 0.45, Om oss 0.7, Bärgning 0.6, guides 0.68 (Landing, Bilar till salu and Om oss raised 2026-09-30, audit C04). Every hero uses this one mechanism; the page-local scrims (Landing, Felsökning, Bärgning `::before`, guides `::before`) were deleted. `.bb-hero__bottom` holds only the review card, `margin-top` `clamp(1.25rem, 2vw, 1.75rem)` so it sits directly under the buttons (2026-09-30); the trust row is no longer in the hero. **Text placement rule (2026-09-30, Magnus):** in every hero the text stack (eyebrow, h1, lead, buttons, review card) is bottom-left locked at every width, with the same bottom padding (`--bb-hero-padding-bottom`, `--bb-hero-padding-bottom-mobile` on phones). The shared `.bb-hero` does it with `justify-content: flex-end`; the own-container heroes (Om oss, Bärgning, the guides) do it with `display: flex; justify-content: flex-end` in their island; AC-service no longer overrides it. On phones (<=650px) `--bb-hero-h1-size` is `2rem` (one size for every hero; the old `clamp(2.75rem, 13vw, 4rem)` override is gone), the lead paragraph is hidden (Landing, Bilservice, Felsökning, Däckservice, AC, Kontakt, Bilar till salu, 404 through `.bb-hero__copy > p:not(.bb-eyebrow)`; Om oss, Bärgning and the guides in their own islands), and every hero is 686px tall (guides and Bilar till salu use `--bb-hero-matched-height` on phones). The free zone above the h1 is then 200-480px on 320-430px phones: that is the focal area for phone hero photos. Galleri and Biltjänster keep their own hero layout. Stacks to single column with adjusted padding on mobile (<=650px). **Scope**: shared by the Landing and requested page heroes. Landing, Om oss, Felsökning, Däckservice, AC-service, Bärgning and Kontakt set `min-height: var(--bb-hero-matched-height)` (added 2026-09-24): 730px above 1120px, `clamp(701px, calc(532px + 22vw), 780px)` from 651 to 1120px, 686px at 650px and below (phones have no trust row, a compact review card, "Ring oss nu" hero buttons and no second Kontakt paragraph). Each value is at least the tallest of the seven heroes' content at that width, so they come out equal; if a hero's content grows, re-measure and raise the token. Other routes keep `--bb-hero-min-height`. Guarded by `tests/browser/hero-size-consistency.spec.ts`.

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
- **Size and colour are never in the icon.** Colour is `currentColor`. Size comes from the consumer's own island (`.bargning-page__hero-trust-icon svg`) or a shared pattern (`.bb-btn svg`, `.bb-icon-badge svg`, `.bb-icon-bare svg`).
- **CSS beats SVG attributes.** Where a rule sets `stroke`, `stroke-width`, `fill` or linecap on `svg`, that rule owns the value. Today that is only `PublicHeader.css`, so the header's five icons stay local and attribute-free; a shared icon with its own attributes would state the same value twice.
- **Adding or swapping an icon:** search the CSS for rules that touch `svg` in that context, then render the old and new drawing at the size actually used and compare before committing.
- **Still local, by decision (2026-09-20):** the header's five icons (`PublicHeader.css` owns their paint); Landing's chat, shield, clock and car (the shared shield has no check mark and `CarSaleIcon` is a different glyph), plus its service-graphic `TireIcon` and `EngineIcon` (2026-09-24; stroke 1.7/1.8, the only icons off the stroke-2 standard); ContactPage's chevron; and one-offs in Bärgning (4) and Om oss (6). Phone, pin, arrow and check are deduplicated: the shared drawings won for phone, arrow and check, and `MapPinIcon` carries the footer pin's shape.
- **Open:** round caps on the 22 butt-cap icons, and whether Landing's four local icons should get shared equivalents.

### 2c. Hero geometry (steps 1-3 done; step 3 on 2026-09-21)

- **Tokens** (`design-tokens.css`): `--bb-header-height` (80px up to 1320px wide; above that `2 * clamp(1rem, 2vw, 1.9rem) + 64px`, the header's own formula), `--bb-hero-clearance` (header height + 1.5rem), `--bb-hero-padding-top` (= clearance), `--bb-hero-min-height` (`clamp(520px, 70svh, 640px)`) and `--bb-hero-h1-size` (`clamp(2.25rem, 3.4vw + 0.6rem, 3rem)`, max 48px).
- **Where they land:** `.bb-hero` pages (Home, Bilservice, Felsökning, Däckservice, AC-service, Kontakt, Bilar till salu), the ten guides (`.service-guide__hero`), Om oss and Bärgning. AC-service's hero is full-bleed with booking and phone actions only (no registration field, badges or trust row). The hero H1 size is set in `.bb-hero__copy .bb-h1`, `.service-guide__hero .service-guide__title`, `.omoss-page__hero-title` and `.bargning-page__hero-title`. Galleri and Biltjänster are the compact type and are untouched.
- **Why:** the old top padding (141-173px) was sized for the 122px header at 1440 wide; below 1321px the header is 80px. Measured before the change: at 1280x720, 18 of 21 heroes were taller than the screen, and for 19 of 21 the height came from content and padding, not `min-height`.
- **Guard:** `tests/browser/hero.spec.ts` checks `--bb-header-height` against the real header edge at eight widths and that every H1 starts at least 24px below the header. If `PublicHeader.css` changes its padding or logo height, update the token.
- **Guide trust row (step 3):** the ten guides use the shared `.bb-trust-row` (§2a) in place of their own `.service-guide__trust-*` rules, which were deleted: three equal columns above 650px, hidden below (since 2026-09-24), items vertically centred, title `<b>` and text `<small>` (were `<h3>` and `<p>`). At 1280x720 the row went from 148-167px to 82-98px; tablet heroes moved by -10 to +8px and phone heroes are 53-85px shorter. The copy is unchanged; the guides' `.text.txt` baseline snapshots lost 6 blank lines each.
- **Superseded (2026-09-24):** the hero-height percentages measured at 1280x720 on 2026-09-21 no longer apply. Landing, Om oss, Felsökning, Däckservice, AC-service, Bärgning and Kontakt now share `--bb-hero-matched-height` (see the `.bb-hero` system in §2a); re-measure the other heroes before acting on their heights.
- **Guide hero is now full-bleed (2026-09-22, supersedes the column measurements below):** the ten guides no longer have a split grid with an image column (`.service-guide__hero-media` and the floating `.service-guide__hero-badge` card were deleted). The photo is a real `<picture>`/`<img>` in `.service-guide__hero-bg`, absolutely positioned behind a `90deg` ink gradient (`.service-guide__hero::before`, same ramp as `.bargning-page__hero`); copy sits in `.service-guide__hero-inner` (max 680px). A real image rather than CSS `background-image` keeps the alt text and avoids inline `style=` (banned in public TSX). Crop defaults to `object-position: center right`; add `.service-guide__hero-bg--pos-left` when the photo's subject sits left of centre (Stötdämpare) — alignment is per photo, so decide it by looking at the image, not by default. A guide with no hero photo omits `.service-guide__hero-bg` and gets the plain ink-950 background. **Photo brief for future guide heroes:** subject in the right ~60%, left ~40% dark and soft for the text; object close-ups (a part on a bench) integrate better than mechanic shots — Drivaxel is the reference.
- **Open:** the guide heroes (Koppling, Bromssystem, Avgassystem, Oljebyte, Kamrem) were last measured before the full-bleed change — re-measure before acting. Hero phone buttons read "Ring oss nu" on the seven matched heroes; elsewhere the label still varies (a copy decision).

> Card and band background treatments (photo + veil, glass, stepped rows, which cards stay plain) are Magnus's per-slot decisions and live in [`BACKGROUNDS.md`](BACKGROUNDS.md) until he approves them as shared patterns.

## 3. Legacy system — removed in Step 7 (2026-09-19)

The legacy `client/src/css/index.css` (7,531 lines, `--redesign-*` / `--color-*` tokens, `.services-page__*` and similar systems) was deleted in Step 7. Its audit (hex literals without tokens, legacy spacing, radius, motion, breakpoints, and the "teal accent card" and "dark card" motifs) lives in Git history (the file exists up to and including commit `80ec3958`). **Do not recreate any of it.** Every value now comes from §1 (`--bb-*`), and every shared pattern from §2a (`.bb-*`).

Global element defaults that used to live in `index.css` (`html`, `body`, `h1–h6`, `p`, `img`, `a`, `ul`) are now in `client/src/styles/base.css`. Tailwind's directives are in `client/src/styles/tailwind.css`.

---

## Eyebrow color rule (`--bb-*` pages, established 2026-09-18)

The small uppercase label above a heading (the "eyebrow") has a leading color-matched dash and comes in two contexts:

- **On a light/warm-white surface**: text and dash both `--bb-color-teal-700`/`-800`.
- **On a dark surface** (dark card, dark section, photo hero): the **dash stays amber** (`--bb-color-amber-500`), but the **text turns white** (`#fff`) — never amber text on a dark background. Confirmed live on Landing's hero eyebrow, Landing's "why/process/cars" dark-section eyebrows, and Biltjänster's closing-CTA eyebrow; apply the same split (amber dash + white text) to any new page's dark-surface eyebrow. Since 2026-09-24 the ten guide heroes and Biltjänster follow it too: `.service-guide__eyebrow` no longer sets a colour, and Biltjänster uses `.bb-eyebrow--dark` instead of a local copy.

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

## Copy conventions (established 2026-10-01)

- **Dash:** the Swedish en dash with spaces (` – `) in running text, never the em dash (`—`). Separators in short lines (footer legal line) are ` · `.
- **Buttons:** booking is `Boka tid` (a specific job may say `Boka oljebyte`, `Boka tid för visning`, `Boka verkstadstid`); phone is `Ring 070-553 33 95` without a colon, except the hero's `Ring oss nu`.
- **Hero H1:** keep the service word and add a benefit or a symptom from the page's own copy; at most three short lines; the accent marks the point, never the town. "i Gävle" belongs in `<title>` and the meta description, not in every H1.
- **Location:** the workshop is on Sörby Urfjäll in Gävle. "Brynäs" is the company name only.
- **Form subjects** (`api/contact.ts`) use the same service names as the Landing service cards.

## CSS file organization

Global stylesheets, loaded once in `client/src/main.tsx` in this order:

1. `styles/tailwind.css`: Tailwind directives. Preflight is global; utilities are for `/admin` only.
2. `styles/design-tokens.css`: `--bb-*` tokens (§1).
3. `styles/base.css`: global element defaults.
4. `styles/shared-elements.css`: `.bb-*` patterns (§2a).

Everything else is a CSS island imported by its own `.tsx` file:

- Each unique page has its own colocated `<Page>.css` with a unique class prefix.
- The two page families share exactly one file each: `ServiceReparationerPage.css` and `styles/ServiceGuideTemplate.css`. Reuse that file directly; never copy it.
- Shared components (`PublicHeader`, `PublicFooter`, `BookingForm`, `BiltjansterFaq`, `GoogleReviewsCard`, `ContactFormCard`, `GalleryDockStrip`) each own a stylesheet next to their `.tsx`.
- Before naming a new prefix, check it isn't already used anywhere under `client/src` (see [`CSS_OWNERSHIP.md`](CSS_OWNERSHIP.md)).
- Do not add new global CSS. A pattern needed on several pages belongs in `shared-elements.css`, and only if it genuinely is shared.

The route-to-stylesheet map lives in [`CSS_OWNERSHIP.md`](CSS_OWNERSHIP.md). The pre-commit hook blocks Tailwind utilities in public TSX.

## JS code splitting

**Rule since 2026-09-16 — every route imports lazily, no exceptions** (`/` joined on 2026-09-20, the admin gate on 2026-09-24).

`client/src/main.tsx` had the same shape of problem as the CSS file, for the same reason: every new page got a plain top-level `import PageName from './pages/PageName.tsx'`, which forces the bundler to include every single page's code in one JS file that ships on every visit — 850KB (228KB gzip) for what was, on any given visit, one page. Fixed 2026-09-16 by converting every route except `/` to `React.lazy()` + a shared `<Suspense>` boundary around `<Routes>`. Result: main bundle 850KB → 495KB, and every other page is now its own 5-18KB chunk fetched only when a visitor actually navigates there. `/admin`'s 81KB no longer ships to public visitors at all.

**The rule going forward:**

- **Any new route added to `client/src/main.tsx` must use `lazy(() => import('./pages/PageName.tsx'))`**, not a static top-level import. Copy the existing pattern in that file.
- The homepage route (`/`, `App.tsx`) is lazy too; the comment above the imports in `main.tsx` records the trade-off.
- `/admin` and its `ProtectedRoute` gate must stay lazy — until server-side auth exists the gate holds the admin credentials, and they must not ship in the entry chunk.
- Lazy routes need the `RouteErrorBoundary` around them in `main.tsx`: without it, a chunk that fails to load (typically right after a deploy) unmounts the whole app to an empty page. Unknown addresses go to the `*` route (`NotFoundPage`).
- If you add a route and skip this, the bundle silently grows back toward one big file again — that's exactly how it happened the first time, one reasonable-looking `import` line at a time.

## Open decisions

**Not yet resolved — do not treat either side as settled:**

1. **Typography target.** Two V2 reference sheets (dark UI + light UI, supplied by Magnus) specify **Lato**. The site implements **Archivo 800 (display) / Manrope 400-700 (body)**. No decision has been made to adopt Lato, keep the current pair, or something else. A "Lato experiment" (real Lato rendering vs. the image model's rendered approximation in the V2 sheets) was proposed but not confirmed as run — verify with Magnus before treating the V2 sheets' typography as settled either way.
2. **Accent color target.** V2 sheets specify `#159CA5`. Implemented on `--bb-*` pages is `--bb-color-teal-500` `#0ab2c1` (headings) with `--bb-color-teal-700`/`-800` for buttons and labels; the legacy `--redesign-accent` `#2496a0` no longer exists. Not reconciled.
3. **Hover direction.** V2 sheets imply lighter-on-hover. Implemented `.bb-btn--*` hovers fill in or deepen the gradient (see `shared-elements.css`); the old legacy `.btn--primary` (deleted) went darker. Not reconciled.
4. **V2 sheet accuracy.** The two V2 sheets have at least one confirmed labeling error (Amber Dark shown as `#845309`/`#84530B` vs. its own written spec of `#B45309`) and one fabricated price (`595 kr` for hjulskifte — the real prices on `/dackservice` are 350/500 kr). A regeneration prompt was drafted to fix both issues and test real Lato instead of the rendered approximation. **Check with Magnus whether that regeneration happened** before using the sheets as a reliable source for anything beyond general direction.

Until these are resolved, treat this document as the IMPLEMENTED baseline only. When a TARGET is confirmed, add it alongside the IMPLEMENTED value in the relevant table rather than overwriting, so each row shows both the implemented value and the confirmed target.
