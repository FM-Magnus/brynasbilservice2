# Current session log — Brynäs Bilservice

This file receives new dated session entries, newest first. It is not a mandatory startup read. Stable rules and current constraints belong in `AGENTS.md`; older history belongs in `SESSION_LOG_ARCHIVE.md`.

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
