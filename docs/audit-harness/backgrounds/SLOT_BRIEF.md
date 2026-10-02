# Slot brief — one background, one slot

Paste into a task. Fill the bracketed parts. Read first: `AGENTS.md`, `docs/BACKGROUNDS.md`, `docs/CSS_OWNERSHIP.md`, and `_incoming-assets/IMPLEMENT/backgrounds/MANIFEST.md`.

**Slot:** [page and element, e.g. Däckservice › closing card, `.bb-card--trust.bilservice__closing-card`]
**Image:** [`card-…` id from MANIFEST.md, file size, e.g. wide-1000]  **Treatment:** [letter from BACKGROUNDS.md, A–J]
**Mode:** [proposal only — text, no screenshots, no tests]  or  [implement]

**Implement rules:**
1. Branch `design/backgrounds-freestyle` (or the branch named here). One slot, one commit, stage files by name, never push.
2. Copy the one WebP into `client/src/assets/images/<area>/` with a descriptive name. `loading="lazy"` below the fold, empty `alt` for decoration.
3. CSS only in the page's own island or its family file. Modifier that restyles a child must out-rank the base (`.x.x--variant`). No Tailwind utilities, no inline `style=`, no shared CSS or tokens, no copy changes.
4. Start `npm --prefix client run dev` (or the preview tool). Per width 1440, 768, 390:
   - `BASE=http://localhost:5173 OUT=<scratch> node docs/audit-harness/backgrounds/contrast.cjs <route> '<selector>'`, then `OUT=<scratch> python3 docs/audit-harness/backgrounds/contrast.py`. Every element ≥ 4.5:1 (large text ≥ 3:1). Use the lowest veil that passes.
   - `node docs/audit-harness/backgrounds/sec.cjs <route> '<selector>' <tag>`: overflow must be 0; look at the screenshots once.
5. `npm --prefix client run typecheck && npm --prefix client run check:css`, then the Playwright suite once: from `client/`, `npx playwright test -c ../docs/audit-harness/pw.config.ts --workers=3 --reporter=json` and read `stats` (expected 235 passed, 0 unexpected). Do not use `tail`; it hides failures.
6. Add the slot to the table in `docs/BACKGROUNDS.md` and to *used on* in `MANIFEST.md`.
7. Report: image, treatment, veil values, weakest contrast per width, overflow, test result. Show before/after and wait for Magnus before the next slot.

**Proposal mode:** answer in text only: 1–3 candidates (id, why it fits the topic, copy side, starting veil values and treatment letter). Touch nothing.
