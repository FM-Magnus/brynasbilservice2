# Brynäs Bilservice — Design System

This is the living reference for the site's visual tokens and patterns. It didn't exist before 2026-09-16; this first version documents **what the code actually implements today (IMPLEMENTED)**. It does not yet adopt or reject the "V2" reference sheets Magnus supplied (a proposed dark-UI/light-UI target palette). That decision is still open — see [Open decisions](#open-decisions) at the bottom.

## The three-state model

Every token or pattern in this doc can be in one of three states:

- **IMPLEMENTED** — what `client/src/css/index.css` (or a component file) actually does right now. Source of truth: the code, not this doc.
- **TARGET** — a value proposed by a design reference (e.g. the V2 sheets) that the team has agreed to move toward, but hasn't shipped yet.
- **GAP** — a place where IMPLEMENTED and TARGET disagree, or where IMPLEMENTED itself is inconsistent (e.g. a color used as a hardcoded hex in 47 places with no token).

A GAP is not automatically a bug to fix — it's a fact to record. Don't collapse it into "the target doesn't apply here" or "go fix the code now" without an explicit decision from Magnus.

Right now this document has **no confirmed TARGET values** — only IMPLEMENTED, with known GAPs flagged inline.

---

## Color

### Tokens (`:root` in `client/src/css/index.css:5-60`)

**Redesign palette** (current public-facing direction):

| Token | Value | Used for |
|---|---|---|
| `--redesign-page` | `#f8f7f3` | warm-white page background |
| `--redesign-surface` | `#ffffff` | card/surface background |
| `--redesign-ink` | `#101618` | dark card background, primary dark text |
| `--redesign-accent` | `#2496a0` | teal accent — links, primary buttons, highlights |
| `--redesign-accent-dark` | `#1b747b` | hover/active state for accent (darker-on-hover, see [Interaction](#interaction-states)) |

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

This matches the landing page's `.hero__frame`. Apply to any new page hero — see `CLAUDE.md` for the full rule text and the list of hero containers it currently applies to.

---

## CSS file organization

**New rule, established 2026-09-16 — do not add more CSS to `client/src/css/index.css`.**

That file is 8,742 lines because ~15+ past sessions each followed the same instruction — "add scoped CSS for `.your-page` in `index.css`" — for every new page. Nobody was ever tasked with fixing that, so it compounded. The fix isn't a risky big-bang split of the existing file; it's just stopping the growth going forward:

- **Any new page or component gets its own CSS file**, colocated next to its `.tsx` file (e.g. `client/src/pages/NewPage.tsx` + `client/src/pages/NewPage.css`), imported directly in that component (`import './NewPage.css'`).
- This already has a working precedent: `client/src/components/BookingForm.css` is imported directly in `BookingForm.tsx`, not appended to `index.css`.
- `:root` tokens (`--redesign-accent`, `--space-4`, etc.) are defined once in `index.css`, which loads globally via `main.tsx`. A component's own CSS file can use `var(--redesign-accent)` etc. freely — tokens aren't tied to which file you're in.
- `index.css` itself is **not being split retroactively** right now — that's a separate, riskier decision (moving ~8,700 existing lines without breaking a selector, on a site that isn't visually finalized yet). Leave existing page styles where they are unless a specific page is being substantially rebuilt anyway.

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
