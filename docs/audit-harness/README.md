# Audit harness

Small, read-only scripts that measure the live site so a visual or structural change can be **proved** instead of eyeballed. They were built during the 2026-09-20 icon, inline-style and hero work and are kept here because the same proofs are needed again (hero outliers, breakpoints, hex colours). They are documentation tooling, not production code: nothing here is imported by `client/`, and none of it edits the repo.

## Prerequisites

- Dev server running: `npm --prefix client run dev` (port 5173).
- Google Chrome installed. Playwright's own browser may not be (it was not on this machine); every script launches `channel: 'chrome'`. For the repo's Playwright suite use `npx playwright test -c ../docs/audit-harness/pw.config.ts` from `client/`. Do not edit `client/playwright.config.ts` for this.
- Run scripts from the **repo root** (or set `REPO`). Set `S` to a scratch output folder outside the repo, e.g. `S=/tmp/audit`, and create the subfolders a script writes to:
  `mkdir -p $S/hero-phase0/snap $S/hero-phase0/shots2 $S/icons-phase0/snap $S/inline-phase0/dom`
- The scripts mock `/api/*` with empty JSON and parse the route list from `client/src/main.tsx`, so they cover every public route.

## The method (why it works)

1. **Capture a baseline from the committed code** (`git stash` your edits first if needed).
2. Make the change.
3. **Capture again and diff on invariants**, not on screenshots. Screenshots cannot prove a layout change is invisible, because everything below a changed element legitimately moves.
4. **Check the harness is deterministic first**: capture the same code twice and diff. Expect 0 differences.
5. **Mutation-check any claim** you write into code or a test: break the thing on purpose and confirm the check fails.

## What is here

| Folder | Scripts | Use it to |
|---|---|---|
| `hero/` | `collect.cjs` (hero height, fold, structure at six viewports), `natural.cjs` (height with `min-height` removed), `stack.cjs` and `blocks.cjs` (where the height goes), `whatif.cjs` (simulate levers in the browser without editing), `herosnap.cjs` + `herodiff.cjs` (before/after invariants), `shots.cjs` (first-screen screenshots) | Measure a hero and prove a hero change is safe. `herodiff`: everything below a hero must keep its size and shift by exactly the hero's height change. `ALLOW_TEXT=1` skips the "text inside the hero keeps its size" check when text is meant to change. |
| `icons/` | `parse_sources.py` (all local and shared icon definitions), `collect.cjs` / `collect_routes.cjs` (every rendered `<svg>` with computed style and the winning CSS rule), `analyze.py`, `make_targets.py` + `targets.py`, `snap.cjs` + `diff.cjs` (4x crops, pixel and computed-style diff), `reaudit.py` (winning rule per property unchanged), `compare3.cjs` (swap one icon for another in place and measure the pixel change) | Replace or dedupe an icon and prove nothing else moved. |
| `inline-styles/` | `audit.cjs` (effect of every `style=` with and without it, and the rule it beats), `collateral.cjs` (how many elements a candidate selector matches), `domsnap.cjs` + `domdiff.cjs` (computed style and box of every element plus a full-page screenshot, before and after) | Move styles between inline, class and family CSS with zero visible change. |

## Traps that cost time (check these first)

- **Reduced-motion leaves `transition: 1e-05s` on everything.** A style you set from a script only takes effect a frame later, so an immediate `getBoundingClientRect()` reads the old value and a what-if shows "no effect". Inject `*{transition:none!important;animation:none!important}` before measuring (`whatif.cjs` and `herosnap.cjs` do).
- **Lazy images change layout after load.** A shorter hero brings a `loading="lazy"` image into range, it loads, and a section grows. Force `img.loading='eager'` and wait for `complete` before snapshotting (`herosnap.cjs` does).
- **`page.route('**/api/**')` also matches Vite's own `/src/api/*.ts` modules** and breaks the page. Match on `url.pathname.startsWith('/api/')`.
- **Element screenshots wait for visibility** and time out on hidden or overlapped elements; take a clipped `page.screenshot` from the bounding box instead.
- **Absolutely positioned or fixed elements do not move with the page** (the public header sits after the hero in the DOM but is pinned at the top). Exclude them from "shifts by exactly N" checks.
- **Specificity beats intent when moving inline styles to classes.** `.bilservice__intro p` (0,1,1) beats a bare modifier class, and a later media rule of equal specificity beats an earlier modifier. Nest the selector or double the class, then mutation-check it.
- **`herodiff.cjs` compares by element index, so a change that adds or removes elements makes it report `element count A -> B` and compare nothing else on that page.** The guide trust-row change (2026-09-21) added one wrapper span per item, so the ten guides were proved with a throwaway variant: cut the changed subtree out of both snapshots (found by rect containment), require everything else to align 1:1 by tag, then apply the same invariants. It was mutation-checked (a 5px shift below the hero, a wider hero text block and an overflow flag were each caught). It is not kept in the repo; write a variant the same way, and mutation-check it.
- **Pass `S` to inline Python** (`S=$S python3 - <<'EOF'`); a bare `python3` will not see the shell variable.
- **macOS has no `timeout`.** Wrap long runs some other way.
- **Check `git status` for ` D` lines before trusting a test run.** On 2026-09-21 seven tracked images disappeared from an iCloud-synced checkout (`~/Documents`) in one second; Vite then failed with "Failed to resolve import" and 28 tests failed on pages nobody had touched. `git restore -- <paths>` brings them back byte-identical.
- The Mac used for this work was memory-starved (load average over 130, swap in use) and one gallery spec timed out once under load. Use `--workers=3` or fewer for the full suite when that happens.

## Not in here on purpose

One-off debug probes, and anything that would need editing the repo. If you need a new proof, copy the closest script and keep it read-only.
