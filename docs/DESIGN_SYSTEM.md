# Brynäs Bilservice — Design System

This is the living reference for the site's visual tokens and patterns.
**AUTHORITATIVE CANONICAL TOKENS**: `client/src/styles/design-tokens.css` defines the `--bb-*` design tokens that govern the 7 Page Design Archetypes and the standalone Public Shell (`PublicHeader`, `PublicFooter`, and `GalleryTeaserCard`). Legacy tokens in `client/src/css/index.css` are frozen and retained solely for unmigrated legacy pages.

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
| `--bb-radius-sm` | `8px` | Small tags, subtle card corners |
| `--bb-radius-card` | `20px` | Standard automotive card radius (cards, teaser panels) |
| `--bb-radius-menu` | `24px` | Header dropdown menu & floating navigation panel radius |
| `--bb-radius-control`| `999px` | Fully rounded pills (buttons, search bars, badges) |
| `--bb-shadow-floating` | `0 18px 44px rgba(0,0,0,0.34)` | Floating header & elevated dark card shadow |
| `--bb-transition-fast` | `150ms cubic-bezier(0.4, 0, 0.2, 1)` | Standard fast hover/focus transition |

---

## 2. Canonical Public Shell Components

The site is framed by three standalone, self-contained components:

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

---

## 3. Legacy Palettes & Migration Status (Reference Only)

The legacy tokens below remain in `client/src/css/index.css` solely for unmigrated legacy routes. **DO NOT USE FOR NEW WORK.**

**Legacy palette** (pre-redesign; still in the stylesheet, not the direction for new public UI per `CLAUDE.md`):

| Token | Value |
|---|---|
| `--color-black` | `#080808` |
| `--color-dark` | `#111111` |
| `--color-dark-2` | `#181818` |
| `--color-dark-3` | `#222222` |
| `--color-red` | `#CC1417` |
| `--color-red-dark` | `#A00F12` |
| `--color-red-light` | `#E8191C` |
| `--color-white` | `#FFFFFF` |
| `--color-grey-light` | `#f4f4f4` |
| `--color-grey` | `#888888` |
| `--color-grey-dark` | `#444444` |
| `--color-text` | `#FFFFFF` |
| `--color-background` | `#080808` |
| `--color-text-muted` | `#aaaaaa` |

Yellow (`#ffe066` / `#FBBC04`-family) is not tokenized and is intentionally scoped to the landing-page Google reviews field only (per `CLAUDE.md`) — do not extend it elsewhere.

### GAP — hardcoded hex values with no token

These colors are used directly (not via a CSS variable) across the stylesheet, outside the `:root` block. Counted 2026-09-16 via `grep -oE '#[0-9a-fA-F]{3,8}'` over `client/src/css/index.css` excluding lines 1-60:

| Hex | Occurrences | Apparent role | Token candidate |
|---|---|---|---|
| `#ffffff` / `#fff` | 175 combined | white, mostly redundant with `--color-white` / `--redesign-surface` | reuse existing token |
| `#556266` | 47 | **muted body text — the single most-used color with no token at all** | needs a new token, e.g. `--redesign-ink-muted` |
| `#101618` | 41 | duplicates `--redesign-ink` used as a literal instead of the variable | should just use `var(--redesign-ink)` |
| `#0b848e` | 10 | teal accent card gradient start | part of the [teal accent card](#teal-accent-card) gradient, not a general token |
| `#066973` | 10 | teal accent card gradient end | same as above |
| `#91d7d9` | 6 | light-teal highlight text on dark cards | candidate `--redesign-accent-light` |
| `#0e1416`, `#0d1214`, `#111718`, `#141c1f`, `#0b1113`, `#0b0f10`, `#1a2224` | 2-5 each | near-black ink variants, likely gradient/shadow steps around `--redesign-ink` | possibly consolidate into a small ink-scale |
| `#ffe066` | 4 | yellow, Google-field only (see above) | intentionally not a general token |
| `#FBBC04` | 2 | Google-brand yellow (their brand color, not ours) | leave hardcoded — it's a third-party brand mark |
| `#66c2c5`, `#7ed9dd`, `#9be4e5`, `#58aeb1`, `#18818c`, `#08373e`, `#064b52`, `#052429`, `#e2f2f3`, `#d2ecf0`, `#f2f8f7`, `#e7eded` | 1-2 each | one-off teal tints/shades, likely gradient stops for specific components | audit per-component before tokenizing — may not generalize |
| `#ffb547`, `#ff6b6b` | 1 each | warning/alert accents (amber, red) | no warning/error tokens exist yet |
| `#000` / `#111` | 1-2 each | shadow/overlay black | reuse `--redesign-ink` or `--color-black` |
| `#8c9b9f`, `#58686d`, `#536266`, `#445155`, `#354246` | 1 each | secondary muted-ink steps, close to `#556266` but not identical — may be copy-paste drift rather than intentional variants | needs review — could collapse into `#556266`/`--redesign-ink` |

**The headline gap:** `#556266` (muted text) is used 47 times and has no token. Any future token-consolidation pass should start there — it's the highest-leverage single fix.

### Interaction states

Confirmed IMPLEMENTED pattern: hover states go **darker**, not lighter. Example — `.btn--primary` (`client/src/css/index.css:124-130`) is `--redesign-accent` at rest and `--redesign-accent-dark` on hover. This is the opposite of the "lighter-on-hover" direction shown in the V2 reference sheets (see [Open decisions](#open-decisions)) — flagged as an unresolved GAP, not yet a decision either way.

---

## Typography

| Token | Value |
|---|---|
| `--font-family-display` / `--font-heading` | `'Archivo', sans-serif` |
| `--font-family-body` / `--font-body` | `'Manrope', sans-serif` |
| `--font-weight-display` | `800` |
| `--font-weight-body` | `400` |
| `--font-weight-body-medium` | `500` |
| `--font-weight-control` | `600` |
| `--font-weight-control-bold` | `700` |

Loaded weights (`client/index.html:10`): **Archivo at 800 only**, **Manrope at 400/500/600/700**. There is no Archivo weight below 800 loaded — any UI that wants a lighter/regular Archivo weight would need an additional `@font-face` request, which doesn't exist today.

Usage convention (from `client/src/css/index.css:78-90`):
- All headings (`h1`–`h6`) use `--font-heading` at `--font-weight-display` (800), `line-height: 1.15`, `letter-spacing: -0.02em`.
- Body text (`p`) uses `--font-body` at `--font-weight-body` (400).
- Controls, nav, and badges use Manrope 600/700 per `CLAUDE.md`'s "two-tier typography system" note.

**GAP:** the V2 reference sheets specify Lato, not Archivo/Manrope. Unresolved — see [Open decisions](#open-decisions).

---

## Spacing

| Token | Value |
|---|---|
| `--space-1` | `0.25rem` |
| `--space-2` | `0.5rem` |
| `--space-3` | `0.75rem` |
| `--space-4` | `1rem` |
| `--space-6` | `1.5rem` |
| `--space-8` | `2rem` |
| `--space-12` | `3rem` |
| `--space-16` | `4rem` |
| `--space-20` | `5rem` |
| `--space-24` | `6rem` |

A 4px-ish base scale (values step in mostly-consistent multiples), but it skips 5, 7, 9-11, etc. — not every step exists. No documented rule for when to introduce a new step vs. reuse the nearest one.

## Radius

| Token | Value |
|---|---|
| `--radius-sm` | `4px` |
| `--radius-md` | `8px` |
| `--radius-lg` | `16px` |
| `--redesign-radius-card` | `40px` |
| `--redesign-radius-pill` | `999px` |

Note the jump from `--radius-lg` (16px) to `--redesign-radius-card` (40px) — there's no step in between, and cards consistently use the 40px value rather than 16px.

## Motion

| Token | Value |
|---|---|
| `--dur-fast` | `150ms` |
| `--dur-normal` | `300ms` |
| `--ease` | `cubic-bezier(0.4, 0, 0.2, 1)` |

Plus the `.fade-up` class + `IntersectionObserver` pattern in `App.tsx` for scroll-triggered reveals (adds `.visible` class), used site-wide.

## Layout

| Token | Value |
|---|---|
| `--container-max` | `1200px` |
| `--container-pad` | `clamp(1rem, 5vw, 3rem)` |
| `--redesign-hero-max` | `1376px` |

### GAP — breakpoints have no formal scale

Confirmed IMPLEMENTED breakpoints (2026-09-16, via `grep -oE '@media[^{]+' client/src/css/index.css client/src/components/BookingForm.css`, counting distinct `px` values in media-query conditions):

**480, 520, 580, 600, 640, 768, 800, 900, 1024** — 9 distinct values, all `max-width`. No `min-width` queries exist in the codebase (mobile styles are the default; breakpoints override downward from desktop... actually the reverse — check a specific component before assuming direction).

There is no documented rule for which breakpoint to reach for when adding new responsive CSS. In practice, component authors pick whatever value matches their content's actual overflow point rather than snapping to a shared scale. A future consolidation could round these into a standard scale (e.g. 480/768/1024), but that's a GAP to resolve with Magnus, not something to silently "fix" while touching unrelated code.

---

## Card motifs

Two reusable card treatments exist for breaking up all-white card grids (established 2026-09-15, see `CLAUDE.md` "Design system"):

### Teal accent card
```css
background: linear-gradient(145deg, #0b848e 0%, #066973 100%);
color: white;
```
Used for "featured" content — either as the single standout card in a grid, or (when asked for full coverage) applied to every card in a grid. Examples: Bilbatteri's AGM battery-type card, Felsökning's 6 category cards, Bilservice's 4 benefit cards.

**GAP:** `#0b848e` and `#066973` are not tokens — they're written as literal hex in every usage. If this gradient is going to keep spreading (it's now in ~5 components), it's a candidate for `--redesign-accent-gradient-start` / `-end` tokens.

### Dark card
```css
background: var(--redesign-ink);
color: white;
/* highlights: #91d7d9 */
```
Used for "technical/serious" content that should read as more authoritative than "featured" — checklists, symptom-picker cards, guidance stat-strips. Examples: Oljebyte's "Vad ingår" checklist, Felsökning's symptom-picker cards.

---

## Hero rule (site-wide, established 2026-09-15)

Every page hero heading:
- `text-transform: uppercase`
- has a teal-accented portion via `<span className="title-accent">`, colored `var(--redesign-accent)`

Every hero container:
- `min-height: clamp(640px, calc(100svh - 60px), 760px)`
- `display: flex; align-items: center`

This matches the shared page-hero baseline. The isolated start page owns its hero separately through `.landing-v2__*` in `pages/landing/LandingPage.css`; do not alter it through this generic rule. Apply this baseline to any new non-landing page hero — see `CLAUDE.md` for the full rule text and the list of hero containers it currently applies to.

---

## CSS file organization

**Hard freeze, confirmed by Magnus 2026-09-16: never edit `client/src/css/index.css`.**

The file is a fragile legacy dependency layer routed across many pages. A broad cleanup could destabilize unrelated routes, so migration happens by making the file gradually irrelevant—not by modifying or splitting it:

- Do not add, delete, move, rename, reformat or “clean up” any rule in `index.css`, even when a rule appears dead after a page rebuild.
- Existing legacy pages may continue using the file unchanged.
- Any new or redesigned page/component gets an owned CSS island, imported directly by its `.tsx` file and using a unique class prefix.
- A shared CSS island is allowed only for an explicitly named page family. Reuse that file directly; never copy it into another file.
- Global `:root` tokens still load from `index.css` through `main.tsx` and remain available to every CSS island. Consuming a token does not authorize editing its definition.
- If a task appears to require changing `index.css`, stop before editing and report `BLOCKED` to Magnus.
- Historical log entries describing earlier deletions from `index.css` are evidence of past work, not permission to repeat it. This freeze supersedes them.

The route-to-stylesheet map and exact write rules live in [`CSS_OWNERSHIP.md`](CSS_OWNERSHIP.md). The pre-commit hook rejects every staged change to `index.css`.

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
2. **Accent color target.** V2 sheets specify `#159CA5`. Implemented is `#2496a0` (`--redesign-accent`). Not reconciled.
3. **Hover direction.** V2 sheets imply lighter-on-hover. Implemented is darker-on-hover (`--redesign-accent` → `--redesign-accent-dark`). Not reconciled.
4. **V2 sheet accuracy.** The two V2 sheets have at least one confirmed labeling error (Amber Dark shown as `#845309`/`#84530B` vs. its own written spec of `#B45309`) and one fabricated price (`595 kr` for hjulskifte — the real prices on `/dackservice` are 350/500 kr). A regeneration prompt was drafted to fix both issues and test real Lato instead of the rendered approximation. **Check with Magnus whether that regeneration happened** before using the sheets as a reliable source for anything beyond general direction.

Until these are resolved, treat this document as the IMPLEMENTED baseline only. When a TARGET is confirmed, add it alongside the IMPLEMENTED value in the relevant table rather than overwriting — that's what makes the three-state model useful going forward.
