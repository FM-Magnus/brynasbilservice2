# Autonomous backgrounds run — brief

For one unattended session. Read first, in this order: `AGENTS.md`, `docs/BACKGROUNDS.md` (treatments A–N, **the clean budget**, recipe K), `docs/CSS_OWNERSHIP.md`, `_incoming-assets/IMPLEMENT/backgrounds/MANIFEST.md`, `docs/audit-harness/backgrounds/SLOT_BRIEF.md`, and the queue `docs/audit-harness/backgrounds/QUEUE.md`.

## Setup (once)
1. Branch `design/backgrounds-night` from `redesign/blue-teal-v1`; tag the start `checkpoint/pre-backgrounds-night`. Never push. Stage files by name. One commit per page.
2. Start the dev server (`npm --prefix client run dev`, port 5173). Use `OUT=/tmp/bgnight` and `BASE=http://localhost:5173` for the harness scripts.
3. `node docs/audit-harness/backgrounds/shots.cjs before <all queue routes>` (before-shots for the morning review).
4. Create `/tmp/bgnight/log.md`; append one short entry per page (decisions, numbers, anything skipped).

## Per page (in queue order)
1. **Page plan first, no code.** Open the page, list every surface (hero, bands, cards, CTAs, white sections). For each, assign one role: `photo` (which treatment and image), `clean` (solid colour, no photo) or `K` (white band with an object on the page). Obey the clean budget in `BACKGROUNDS.md` (at most half the cards in a group, never forms/FAQ/tips/ledgers/fact cards, no two photo surfaces touching, no photo or treatment repeated beyond the limits, mix light/mid/dark, at least one **amber photo surface** on every long page (recipe O or a native `amber-*` card; amber as text or a solid card does not count; never more than one in three photo surfaces, measure white text on amber), one K band per page where a `white-*` image fits the topic). Pick images from `MANIFEST.md` by topic first, tone second, copy side third. Save the plan in the log.
2. **Implement the planned slots**, one at a time, CSS only in the page's island or family file (`ServiceReparationerPage.css`, `ServiceGuideTemplate.css`), modifier rule `.x.x--variant` when it restyles a child. No shared CSS, tokens, copy, Tailwind, inline styles. Copy only the WebP actually used into `client/src/assets/images/<area>/`.
3. **Measure each photo slot** at 1440, 768, 390: `contrast.cjs` + `contrast.py` (every element ≥ 4.5:1, large ≥ 3:1), `visibility.cjs` + `visibility.py` (a featured slot must read VISIBLE; FAINT only on a calm secondary slot; never GONE: if the veil needed for contrast hides the photo, make the slot clean instead), `sec.cjs` (overflow 0).
4. **One look** at the finished page at 1440 and 390 (a screenshot each), judged against the plan and the budget. Fix once; if still wrong, make the slot clean.
5. `npm --prefix client run typecheck`, `check:css`, then the full suite once: `cd client && npx playwright test -c ../docs/audit-harness/pw.config.ts --workers=3 --reporter=json`, read `stats` (expect 235 passed, 0 unexpected; never `tail`). If a baseline text snapshot changes, that is a copy change you made by mistake: revert.
6. Commit `feat(<page>): …` with the measured numbers, add the slots to the table in `docs/BACKGROUNDS.md` and *used on* in `MANIFEST.md` in the same commit.

## Stop rules
- A page that fails contrast, overflow or the suite after three attempts: `git restore` the page's files, log why, go on to the next page.
- Anything that needs a shared pattern, a token, copy, a new global file, or a person/plate image (Maher's OK) or anything outside `client/` styles: skip it and log it.
- Never touch `server/`, `AGENTS.md`, the baseline snapshots, or the three untracked `phase3` files.
- If the suite is red for a reason you cannot find, stop the run after restoring the last page and write what happened.

## At the end
`node docs/audit-harness/backgrounds/shots.cjs after <routes>`, `OUT=/tmp/bgnight python3 docs/audit-harness/backgrounds/morning.py` (builds `/tmp/bgnight/index.html`, before | after per page, with the log on top), keep the review in `/tmp` (it is not committed) and report the path. Update `STATUS.md` (replace, not append) and one bullet in today's `LOG.md`; commit. Final message: pages done, pages skipped and why, and the review path.
