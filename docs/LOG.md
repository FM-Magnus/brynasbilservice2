# Work log — Brynäs Bilservice

One dated entry per day, newest first — one short bullet per session, naming the tool and topic first. **History, never instructions:** rules live in `AGENTS.md`, the current state in [`STATUS.md`](STATUS.md). When the oldest entries here are more than about two weeks old, move them to the top of [`archive/SESSION_LOG_ARCHIVE.md`](archive/SESSION_LOG_ARCHIVE.md). (Renamed from `SESSION_LOG_CURRENT.md` on 2026-09-23; entries below keep their original file names.)

### 2026-09-24

- **Codex — daytime, committed through `b165217c`:** subtle radius tokens site-wide (60 style snapshots); Landing review-bar spacing; Google reviews moved into the Om oss, Bilservice, Felsökning, Däckservice and Kontakt heroes; Felsökning hero code panel removed; the guide/hub, Bilservice and Felsökning imagery, Oljebyte layout, Om oss hero and desktop-header breakpoint committed separately; five stale desktop text baselines refreshed.
- **Codex — evening, left uncommitted:** Bilservice-family spacing (section top 64/48/48px); NEW3 header logo plus a black variant; Landing services as five linked vector-icon points, new why/process photos; stable hero review card; AC hero without the registration form; Felsökning ember tint and lighter Bärgning overlay; Däckservice dates banner below the tyre cards and ember-graded card photos; a first, fixed-pixel (717/693/921) equal-hero-height attempt.
- **Claude Code — review of that work:** removed dead AC CSS and the unused v1 handshake images, corrected DESIGN_SYSTEM §2c, gitignored test output. Replaced the fixed hero heights with `--bb-hero-matched-height`, sized from the tallest natural content at 17 widths (an earlier measurement was inflated by a running `min-height` transition). With Magnus: Felsökning H1 "Felsökning & Diagnostik i Gävle", "Ring oss nu" on the seven matched heroes, no trust points on phones anywhere, a compact phone review card, Kontakt's second hero paragraph hidden on phones — phone heroes 686px (was 921). Split into 12 commits (`706a7278`–`3e3dc6ec`).
- **Claude Code — three read-only audits** (documentation, structure, code; reported in chat). Main findings: plain `<a href="/…">` links broken under the production basename; blank page for unknown URLs and failed chunk loads; admin credentials in the public entry bundle; two different org.nr values; contact forms that sent nothing; stale ops and reference docs.
- **Claude Code — fixes, Phases 1–3 of the resulting plan:** links to `<Link>` plus a source-scan guard (`4702d0f1`); lazy admin gate (`41c0e933`); 404 page and error boundary (`11969e38`); booking notice when services fail (`f991bd4f`); business facts only from `business.ts`, org.nr 559343-5307 confirmed in the company registers (`c828ff3b`); footer menu from `publicNavigation`, placeholder legal links removed (`feed7968`); contact forms open a pre-filled e-mail (`01272dc4`); audit-harness skips the 404 route (`2b7269c8`); reference-doc corrections (`719208bf`); AGENTS.md stage, shared roles and this one-entry-per-day rule (`5ea56058`); STATUS rewritten as current state; Stop-hook quoting repaired (`9bf1d7db`). Every new test was mutation-checked against the old code. Suite 199 passed / 10 skipped; `booking-form.spec.ts` stays intermittently flaky (≈3 in 105 runs, same before and after the modal change) and a separate session is fixing it. Nothing pushed.
- **Claude Code — Phase 4, assets and repo hygiene (Magnus's choices):** moved Om oss's live exterior photo out of `images/archive/` byte-identical (`ae9e62d0`), then deleted the unused archive (31 files, 4.6 MB, `3c7720bc`) and 11 unused page images (1.4 MB, `11cf45f6`; the Maher portrait kept); renamed `images/gallery/workshop/` to `images/workshop/` so it can't be mistaken for `/galleri` (`f0762726`); deleted the orphan root scaffold (`880b5cff`); `_magnus/` untracked and git-ignored, files kept on disk (`7233fb38`). Build and suite pass: 200 passed, 10 skipped.
- **Claude Code — Phase 5, performance baseline:** measured a production build with Playwright and Chrome's own performance APIs (390 px, slow 4G, 4× CPU, cold cache, median of 5; Lighthouse itself not installed). The plan's premise was wrong: 7 of 10 guide heroes (not 3) use `loading="lazy"`, but lazy and eager heroes start their request at the same time (~2.2–2.3 s), because the image only exists once the page's JavaScript has run. No code change. Found instead: Hjullagerbyte CLS 0.12 on phones, most likely the web-font swap.
- **Claude Code — Phase 6, CSS consistency (Magnus's choices):** guide hero eyebrows white with amber dash — a colour on `.service-guide__eyebrow` had overridden `.bb-eyebrow--dark` by source order (`0efdd1f0`); Biltjänster H1 mixed case and shared dark eyebrow (`f0962202`); unused selectors deleted, shared and page-level, with every style baseline unchanged, and a Landing test that had silently skipped its review screenshot fixed (`db9469c6`); 15 redundant global-CSS imports dropped, built CSS byte-identical (`703c2cde`); TypeScript `strict` on (`ebfdf9b8`). Bärgning and Om oss trust rows kept as deliberate page designs.
- **Claude Code — handover:** the final full-suite run after `703c2cde`/`ebfdf9b8` is still owed (the :5173 dev server broke with two copies of React; restart with `--force`), and the booking-form flake fix (`openClockOnFocus={false}`) sits uncommitted in worktree `hopeful-ramanujan-df378a`. Both are recorded at the top of STATUS "Next up".
- **Claude Code — Phase 7, structure (Magnus's choices), worktree `kind-gagarin-ffdf9b`:** full suite re-run on a fresh `--force` dev server (200 passed) and the booking time-picker flake fix committed (`93c8c58d`); `useBookingModal` for all 22 pages (`3c878504`); guide section components plus a shared `Tip` for the ten guides and AC-service, about 1,400 lines fewer (`73947539`); `useContactForm` for both contact forms, Kontakt's field names now English, values trimmed (`10b5ce24`); route-wide specs read `main.tsx` (`16c1212c`). Each step verified by diffing the rendered HTML of all 22 routes at 1440 and 390 (identical except Kontakt's five `name` attributes) plus the full suite (206 passed).

### 2026-09-23 — Codex (desktop navigation breakpoint)

- Kept the regular PublicHeader navigation visible in computer-width viewports from 1001px upward; the compact 1001–1320px layout reduces logo and navigation spacing. The mobile menu now starts at 1000px.
- Playwright verified the desktop menu at 1440/1280/1024/1001px, the mobile menu at 1000/768/390px, the Biltjänster dropdown, 80px compact header height and zero horizontal overflow. `check:css`, typecheck, build and hero tests pass. The full baseline run has six desktop text-snapshot differences from existing page edits; no header-style snapshot failed.

### 2026-09-23 — Codex (Felsökning diagnostics imagery refresh)

- Replaced all three `/felsokning` images, including the hero, with new workshop diagnostics photography. Optimized exports as WebP+JPG pairs in `services/diagnostics/` at measured retina dimensions. Removed the old hero and service-card pairs; kept the old mechanic workshop pair because Landing still imports its WebP.
- Updated Swedish alt text for the intro and OBD detail; the hero photo is correctly decorative behind the accessible hero copy. No page copy, shared CSS, or tokens changed.
- Browser checks at 1440/768/390 confirmed all slots load and no horizontal overflow or page errors. Targeted CSS/type/build, hero and baseline checks recorded after implementation.

### 2026-09-23 — Codex (Drive-guided Service imagery and Biltjänster cards)

- Found `## FOR AGENTS_BRYNASBIL` on Google Drive and used its real-workshop and camera/grade references. Generated six photorealistic Service images, exported optimized WebP+JPG pairs under `services/general/`, and wired the hero, servicebook section and four value cards into `/service-reparationer` with Swedish alt text. Replaced the owner page's image placeholders with family-owned aspect-ratio classes.
- Reused existing clutch and suspension WebP+JPG pairs for the last two empty cards on `/biltjanster`; all 11 cards now show photos. Removed the unused card-placeholder branch and CSS.
- `check:css`, `typecheck`, build and hero tests passed. Focused Service and Biltjänster baselines passed at 1440/768/390 after expected placeholder text/style snapshots were reviewed and updated. Browser checks found no failed images, page errors or horizontal overflow. Changes remain uncommitted.

### 2026-09-23 — Codex (Kamrem imagery)

- Converted two selected graded PNGs to optimized WebP+JPG pairs in `services/timing-belt/`, wired them into `/kamrem` with Swedish alt text, removed the page's placeholders, and moved the used raw intake image to `IMPLEMENT/OLD/`.
- Added a guide-family landscape modifier used only by Kamrem's wide inspection image; existing cards, lists, tokens, copy, hero, and `/biltjanster` card remain in place. Browser screenshots at 1440/768/390 show no horizontal overflow.
- `check:css`, `typecheck`, build, hero tests, and Kamrem visual tests pass. Updated only Kamrem's reviewed desktop text baseline; six unrelated desktop text baselines differ from prior working-tree changes. Left uncommitted.

### 2026-09-23 — Antigravity (Imagery rollout: Bromssystem, Hjullagerbyte, Styrning & kulleder, Avgassystem, Drivaxel & drivknutar)

- **5 guide pages 100% completed**: Processed incoming assets from `_incoming-assets/IMPLEMENT/` into retina WebP+JPG pairs under `client/src/assets/images/services/{brakes,wheel-bearing,steering,exhaust,driveshaft}/`.
- **Integrated into TSX**: Added semantic `<picture>` elements for heroes, intro components, and symptoms inspection portraits on `/bromssystem`, `/hjullagerbyte`, `/styrning-kulleder`, `/avgassystem`, and `/drivaxel-drivknutar`. All `MediaPlaceholder` components removed from these pages.
- **Hub page updated**: Wired the new components images into guide cards on `/biltjanster` (`BiltjansterPage.tsx`).
- **Clean intake**: Processed raw exports moved into `_incoming-assets/IMPLEMENT/OLD/`, leaving `IMPLEMENT/` clean.
- **Verification**: `npm run check:css`, `npm run typecheck`, `npm run build`, and Playwright tests (`hero.spec.ts` clearance across viewports, baseline snapshots updated) pass with 0 errors. Left uncommitted for Codex/Claude review.

### 2026-09-23 — Claude (documentation overhaul for the imagery stage)

- **Why:** 30 `.md` files (~5,300 lines) with two competing contracts (`AGENTS.md` and a 159-line `CLAUDE.md`), no `GEMINI.md`, status spread over four files, and a Stop hook pointing at a wrong path. Magnus approved a "one fact, one home" restructure.
- **Now:** `AGENTS.md` is the single contract (76 lines; precedence: code → AGENTS → CSS_OWNERSHIP/DESIGN_SYSTEM → STATUS → topic docs → LOG/archive). `CLAUDE.md` = `@AGENTS.md` import, `GEMINI.md` = pointer. New `docs/STATUS.md` (current state, replaced not appended) and `docs/IMAGES.md` (slot sizes, per-page status, photo brief, prompt library). `BACKEND_HANDOFF.md` → `BACKEND.md` with production, current API and live-DB facts written for Johnny. `instructions.md` folded into `README.md` (human-facing) and deleted. `SESSION_LOG_CURRENT.md` → `LOG.md`; ops how-tos → `docs/ops/`; superseded handovers, `AGENT_HANDOFF.md`, `PROJECT_STATUS.md`, the phase-0 report and the retired prompt library → `docs/archive/`.
- **Guards:** pre-commit also blocks growth of `CLAUDE.md`/`GEMINI.md` and caps `STATUS.md` at 120 lines; Stop-hook text fixed.
- **Stale facts fixed on the way:** Service-reparationer's hero is still an `ImageSlot` placeholder (docs implied otherwise); `DESIGN_SYSTEM.md` listed a `--bb-shadow-elevated` token that doesn't exist; the inactive `client/.github/workflows/deploy.yml` is now documented in `BACKEND.md`.
- **Router enforcement (`eb9c1fee`):** pre-commit now blocks any commit where `CLAUDE.md`/`GEMINI.md` don't start with their import line (`@AGENTS.md` / `@./AGENTS.md`), exceed 12 lines or contain `##` sections, or where `AGENTS.md` is missing. Tested against six drift cases in a temporary index.
- **Note:** commit `512e7b6d` (hooks) also carries the file moves and the `instructions.md` deletion, because `git mv`/`git rm` had staged them; content is correct, the message undersells it.

### 2026-09-22 — Claude (Guide-family hero migration, Stötdämpare & fjädrar imagery, shared symptom-card CSS bugfix)

- **Guide-family hero migration (shared, all 10 guide pages)**: Replaced the split-grid hero + small image box (`.service-guide__hero-inner`/`.service-guide__hero-media`/`.service-guide__hero-badge`) in `ServiceGuideTemplate.css` with a full-bleed background hero (`.service-guide__hero-bg`, absolutely-positioned real `<picture>`/`<img>`, not a CSS `background-image`, to keep alt text and respect the ban on inline `style=` in public TSX) plus a dark gradient overlay, matching the pattern already used on Bärgning/Däck. Updated all 10 guide pages (`Koppling`, `Bromssystem`, `Avgassystem`, `Oljebyte`, `Bilbatteri`, `Drivaxel/drivknutar`, `Kamrem`, `Stötdämpare/fjädrar`, `Hjullagerbyte`, `Styrning/kulleder`) to the new markup; pages without a hero photo yet cleanly fall back to a dark background instead of a placeholder box. Added a `.service-guide__hero-bg--pos-left` modifier since `object-position` needs to be per-photo (Kamrem's timing-belt shot needs `right`, the new suspension hero needs `left`).
- **Stötdämpare och fjädrar (`/stodampare-fjadrar`) — all 3 image slots filled**: hero (`suspension-mechanic-wrench-workshop-hero`), components (`suspension-strut-new-vs-old-comparison`, rotated 90° CCW from a portrait source to fit the landscape intro-media slot), and inspection (`suspension-mechanic-strut-inspection-portrait`). Removed the now-dead `MediaPlaceholder` helper from the page.
- **Shared CSS bugfix (`ServiceGuideTemplate.css`, affects all guide pages using the symptom-list pattern)**: `.service-guide__symptom-row--featured`/`--urgent` text was silently rendering in the muted/ink colors meant for plain cards, not white — a CSS-specificity tie where the generic `.service-guide__symptom-row p`/`h3` rule was declared after the variant rules with identical specificity and won on source order alone. Fixed by giving the variant selectors explicit two-class specificity so this can't silently regress again.
- **Plain symptom-card background**: changed from `var(--bb-color-surface)` (white) to `var(--bb-color-teal-100)` (very light teal) at Magnus's request, shared across all guide pages using this pattern.
- **Copy audit (Stötdämpare och fjädrar)**: added the `branschmässigt riktvärde` qualifier (matching the convention already used on Kamrem/Bromssystem/Koppling) to two previously-unflagged specific numeric claims — the "upp till 20 procent" braking-distance benefit and the FAQ's "1–3 timmar per axel" labor estimate.
- **Reusable image-generation workflow**: built out a camera-preset + color-grade prompt library for the GPT Imagegen 2.5 + Pixelmator pipeline; per Magnus's decision this now lives canonically in Google Drive (`## FOR AGENTS_BRYNASBIL/`), not in the repo — `_magnus/IMAGE-PROMPT-LIBRARY.md` is retired/superseded, kept only for its per-slot pairing-log history. Also established a three-tier reference-image convention for generation prompts (`env_ref` = locality/ambiance, `char_ref` = person identity, `env_subject` = object/part accuracy).
- **Deferred, not implemented**: a "Schomaher" mascot (humorous F1-driver/Kurdish-menswear caricature of Maher, wordplay on his old workshop nickname) and a proposal to promote the existing Guide-family `.service-guide__tip-strip` pattern to a canonical `.bb-tip` component in `shared-elements.css` so a "TIPS FRÅN SCHOMAHER" callout with the mascot peeking over the top edge can be reused site-wide. Needs: final mascot art (prompt + Maher's real portrait as `char_ref` already prepared), an isolated "peek" crop of that art, Magnus's decision on shared-vs-guide-family scope, and Maher's sign-off on the likeness before anything ships.
- **Verification**: `npm --prefix client run typecheck` (0 errors) and `npm --prefix client run check:css` (clean, 86 tokens, 1 pre-existing pending) after every shared-CSS change; browser-checked at 1440/768/390 with zero horizontal overflow.
- **Later the same day (commit `4fe94a24`)**: promoted the tip callout to a canonical global `.bb-tip` in `shared-elements.css` (Magnus chose "bold accent border + label" — pale teal card, teal left border, "Tips" eyebrow, amber `.bb-icon-badge`). Migrated all 11 tips on 9 guide pages plus AC-service's repair note; deleted `.service-guide__tip-strip` and `.bilservice__repair-note`. Copy in all tips reviewed — no factual problems. Content gaps noted, not fixed: Bromssystem has no tip; Felsökning, Däck and Service-reparationer have none. Follow-up audit found no further specificity ties in the Guide/Bilservice/Bärgning/shared files (AboutPage, ContactPage, BilarTillSalu, Galleri, Biltjänster not exhaustively checked) and fixed token hygiene: four new semantic gradient tokens (90 tokens now) and 11 bare `#fff` → `--bb-color-text-inverse`.
- **2026-09-23 docs sync**: `DESIGN_SYSTEM.md` (§1 new tokens, §2a `.bb-tip`, §2c full-bleed guide hero + photo brief, stale column measurements marked) and `CSS_OWNERSHIP.md` (Guide family notes, a general rule for modifier specificity ties) now describe the above.

### 2026-09-22 — Antigravity / Gemini (Landing hero, brand logo vectorization, exhaust guide hero)

- **Landing hero image update**: Replaced `landing-sundown-hero.{jpg,webp}` with new production asset `landing-cockpit-steering-hero.{jpg,webp}` (2200x1500px) in `client/src/assets/images/home/landing-v2/`. Updated `LandingPage.tsx` imports and alt text (`"Förarmiljö med händer på ratten"`), and updated `BargningPage.tsx` reference.
- **Landing hero & process scrims**: Added subtle ink/teal gradients to `.bb-hero__shade` and `.landing-v2__process-shade` in `LandingPage.css` for improved text readability and brand alignment without overpowering the car interior and tools.
- **Brand logo SVG update**: Upgraded `client/src/assets/images/brand/brynas-bilservice-logo.svg` with clean vector artwork from `_incoming-assets/NY LOGOTYP BBIL.svg`, removing the solid black artboard background so the logo renders with transparent cutout across `PublicHeader` and `PublicFooter`.
- **Exhaust guide hero (`/avgassystem`)**: Connected new production asset `exhaust-system-repair-underbody.{jpg,webp}` (2200x1563px) in `client/src/assets/images/services/exhaust/`, replacing `MediaPlaceholder` in `AvgassystemPage.tsx` with `<picture>` element.
- **Verification**: `npm --prefix client run typecheck` (0 errors), `npm --prefix client run check:css` (clean, 86 tokens, 1 pending), `npm --prefix client run build` (clean in 9.5s), Playwright screenshots verified at 1440, 768, and 390px with zero horizontal overflow.


### 2026-09-21 — Antigravity / Gemini (Landing why-reassurance handshake image & slot inventory)

- **Handshake image integration**: Added `landing-why-reassurance-handshake.{jpg,webp}` to `client/src/assets/images/home/landing-v2/` from `_incoming-assets/IMPLEMENT/` (derived from Magnus's asset `A.webp` / `A.jpg`, 1586x438px). Updated `LandingPage.tsx` to reference the WebP asset as background in `.landing-v2__why-section`. Tested alignment across 1440, 768, 390 viewports with Playwright.
- **Slot Inventory**: Completed inventory of all 19 `MediaPlaceholder` slots across the 7 guide pages and 6 `ImageSlot` placeholders on `/service-reparationer`, documenting recommended export dimensions and aspect ratios in `_incoming-assets/ASSET_INVENTORY.md`.
- **Validation**: `npm --prefix client run typecheck` (0 errors), `npm --prefix client run check:css` (clean, 86 tokens, 1 pending), `npm --prefix client run build` (clean in 2.6s).
- **Branch status**: Committed and pushed to `origin/redesign/blue-teal-v1` for continuation on MacBook Pro.

### 2026-09-21 — Claude (audit point 4: hero step 3, the guides adopt the shared trust row)

- **Setup:** pulled 61 commits from the MacBook session (a stray ref `redesign/blue-teal-v1 2` and a stale `base.lock` under `.git/refs/codex` had to be removed first; the ref pointed at a commit already in history). `client/node_modules` lacked 4 packages, so `npm ci` was run (Magnus approved). Baseline on this machine: typecheck 0 errors, `check:css` clean (86 tokens, 1 pending), build ok, Playwright 155 passed / 4 skipped. `herosnap` was deterministic (two captures, 0 differences in 126 page-states) and the hero numbers in §2c were still correct.
- **First proposal was wrong, and Magnus caught it.** I proposed a 6-line desktop-only override on the guides' local `.service-guide__trust-row`, using `@media not all and (max-width: 1024px)` (no precedent in the repo; `(min-width: 1024px)` already exists) and an invented `minmax(9.5rem, …)`. I had not looked for an existing pattern: `.bb-trust-row` in `shared-elements.css` already does this job for six other pages, and the guides carried a private duplicate. Route B (adopt the shared pattern, delete the duplicate) was measured and chosen by Magnus. A second error of mine: my DOM simulation put `bb-icon-bare` on the SVG (31px icon); the canonical markup wraps a 24px icon in a 31px box.
- **Change:** the ten guide TSX files use `.bb-trust-row` / `__item` / `__text` (`<b>` + `<small>`, icon in a `span.bb-icon-bare`, as on the Bilservice-family pages); `ServiceGuideTemplate.css` lost `.service-guide__trust-row`, `-item`, `-icon`, their `h3` and `p` rules and the ≤640px gap rule (−12 CSS lines; markup +30). The `--bb-font-sans` references in that file went from 35 to 33.
- **Measured at 1280x720 (hero %):** Bilbatteri 92→84, Stötdämpare 90→84, Hjullager 87→84, Styrning 94→85, Drivaxel 96→87, Koppling 101→92, Bromssystem 103→92, Avgassystem 101→94, Oljebyte and Kamrem 105→105 (image column). Tablet heroes -10 to +8px; phone heroes 53-85px shorter. Full per-page status: `DESIGN_SYSTEM.md` §2c.
- **Proof:** `herodiff.cjs` cannot compare an edit that adds elements (it aborts on element count; see the harness README). A throwaway variant that cuts the trust-row subtree out passed 60 of 60 guide page-states with 0 violations (below-hero elements shift by exactly the hero's height change, in-hero text blocks keep their size, no overflow, H1 clearance at least 31px) and was mutation-checked. The stock `herodiff` on the other 66 page-states: 0 violations, no hero height change. No clipped text in 30 guide states.
- **Visible costs (Magnus approved the before/after images):** items are vertically centred, so titles start at different heights when their wrapping differs; title 0.92→0.88rem and text 0.82→0.78rem; description contrast up; the items are `b`/`small`, no longer `h3`/`p`, so they left the heading outline.
- **Snapshots:** ten `client/tests/browser/baseline-snapshots/desktop-1440/<guide>-text.txt` files lost 6 blank lines each (60 deletions). `git diff --ignore-blank-lines` on them is empty, so the words and their order are unchanged. Playwright had failed those 10 tests before the update. Approved by Magnus.
- **Docs:** `CSS_OWNERSHIP.md` (guide-family note, reference count), `DESIGN_SYSTEM.md` §2a and §2c, `AGENT_HANDOFF.md`, the harness README. **`AGENTS.md` line 36 still lists hero step 3 as open; it is off limits to agents, so Magnus has to change it.** `CLAUDE.md`'s "Hero rule" (`min-height: clamp(640px, …)`) was already out of date after hero step 1; not touched.
- **Test fix (own commit, `test(hero): wait for layout after each resize…`, Magnus approved):** the header-height guard in `hero.spec.ts` read the header straight after `setViewportSize` and flaked. A replay failed 13-14 of 25 on the committed code and 9-10 of 25 with this change (the real spec failed 3 of 10); two animation frames after each resize give 0 of 25 and 10 of 10, and a token forced to 90px is still caught at all eight widths. It surfaced as one random failure per full run (also `booking-form`, which passes 5 of 5 alone).
- **Environment incident:** mid-session seven tracked images (`client/public/favicon.png`, three `gallery/workshop/*.jpg`, two under `archive/`, `services/towing/towing-hero-bg.webp`) vanished from the working tree in one second and were not in the Trash. None of my edits or commands touched them, but the cause is not proven. Vite then reported "Failed to resolve import" and one full run showed 28 failures on untouched pages. Magnus approved `git restore` of exactly those 7 paths (byte-identical to HEAD). This checkout is under `~/Documents`, which is iCloud-synced: the iCloud daemons were pegged, swap was nearly full, a cleaner app was running, and the stray `blue-teal-v1 2` ref at the start looks like an iCloud conflict copy. Consider moving the repo out of the synced folder.
- **Final gate, no retries:** typecheck 0 errors, `check:css` clean, build ok, Playwright 155 passed / 4 skipped.
- **Not pushed.** Next: hero outliers (each needs a design decision), then audit points 3, 5 and 6 (see the handoff).

### 2026-09-20 — Claude (health check, hand-off to Antigravity/Gemini, push)

- **Health check (read-only, measured):** 0 import cycles, no layering violations (nothing lower imports a page; icons import nothing else), no unimported files, 0 `any`/`@ts-ignore`, CSS-ownership mismatches only the documented families, guide pages share 8% of their lines, about 11 of about 800 CSS selectors unreferenced (some built dynamically), comments about 2% of lines, 19 exports unused outside their file, largest files `BargningPage.css` 1,016 / `AboutPage.css` 909 / `ServiceReparationerPage.css` 819 lines (content-rich, not padded). Findings that need action are collected as the hygiene backlog in `AGENT_HANDOFF.md` "Where to pick up" (unused `classnames` and `@types/axios`, two admin `console.log`s printing bookings, repeated per-page modal boilerplate, a 1,100-line session log, five superseded handovers, an unused 2.1 MB archived image). Not fixed here.
- **Hand-off prompt** for Antigravity/Gemini written (kept outside the repo so it does not add a sixth handover file): read order, Magnus's working rules, hard rules, the check commands, current state, the first task (hero step 3, compact guide trust row, with the measured facts and the measure, propose, implement, prove, show, approve sequence), traps, and a fixed report format. It points at `AGENT_HANDOFF.md` rather than repeating it.
- **Push:** Magnus asked for the docs to be brought up to date, committed and pushed. The branch was 27 commits ahead and 0 behind `origin/redesign/blue-teal-v1` (his own fork), so a plain fast-forward push; the docs that said “not pushed” were updated first.

### 2026-09-20 — Claude (handover: docs brought in line with the repo)

- **Why:** the session ended after a long run of changes; the startup docs still described an earlier state (Step 6/7, 67 tests, 46 undefined tokens, `Login.tsx`, the frozen 2026-09-15/16 log inside `AGENTS.md`).
- **AGENTS.md** 278 to 156 lines: the frozen legacy log moved verbatim to `docs/SESSION_LOG_ARCHIVE.md`; current-state header and 2026-09-20 summary added; “what is broken” updated (comment_customer is a server-side gap now, contact form sends nothing, no 404/error boundary, ESLint); `POST /api/bookings` body corrected (numeric `serviceId`, local `yyyy-MM-dd`, comment omitted when empty).
- **AGENT_HANDOFF.md:** “Start here” rewritten (branch state, 155/4 checks, the three guards, how Magnus wants to work, where the proof scripts are); new “what the session finished” and an ordered “where to pick up” (hero step 3, audit points 3/5/6, contact form, admin client half, images with the proposed file-naming convention, small leftovers, push); traps that already cost time.
- **CSS_OWNERSHIP.md:** the undefined-token warning replaced by the one real pending token (`--bb-font-sans`); test counts, coverage and the lint note corrected. **BACKEND_HANDOFF.md:** stale `index.css`/`Login.tsx` references fixed; the reviewed client plan for admin auth added. **CLAUDE.md:** API row, archived-roadmap path and the working rules added.
- **`docs/audit-harness/`** (new): 22 read-only measurement scripts plus a README (prerequisites, the before/after-invariant method, and the traps: transitions, lazy images, `**/api/**` mocks, fixed elements, specificity). Copied from the session scratch folder with absolute paths made relocatable; syntax-checked and two scripts run from the new location. Not production code; nothing in `client/` imports it.
- **Pushed later the same day** (see the entry above).

### 2026-09-20 — Claude (audit point 4: hero size and uniformity, steps 1 and 2 of 3)

- **Phase 0 (measured, read-only).** 21 routes at six viewports. At 1280x720, 18 of 21 heroes were taller than the screen (guides 106-120%, AC-service 136%); on 15 the next section did not peek in. H1, CTA and phone were already above the fold on 20 of 21 (AC-service's phone was cut off), so this is pacing, not missing content. My earlier claim that one token would fix the seven `.bb-hero` pages was wrong: for 19 of 21 the height is content and padding, not `min-height`. Where the height goes (guide, 1280): 180px above the content, 570px content, 65px below; H1 is about 58px on 3-4 lines (173-231px), the guide trust row 148px, top padding 141-173px against an 80px header.
- **A harness trap found and fixed:** the reduced-motion rule leaves `transition: 1e-05s`, so programmatic style changes read the old value for a frame; my first what-if therefore showed no effect on guides. Disable transitions before measuring.
- **Decisions (Magnus):** three hero types (Home, Standard, Compact), 85% target for Standard at 1280x720, levers = clearance + spacing + H1 + trust row, AC-service treated as a known outlier, tokens approved.
- **Step 1 (`ac6f6b10`):** `--bb-header-height`, `--bb-hero-clearance`, hero padding-top and min-height tokens, guide/Om oss/Bärgning top padding. Proof: 126 page-states before and after, everything below each hero shifts by exactly the hero's height change, no hero text block changes size, no overflow (0 violations); harness determinism checked. New permanent `tests/browser/hero.spec.ts` (mutation-checked).
- **Step 2 (this commit):** `--bb-hero-h1-size` (max 48px, min 36px on phones) and about 25% tighter gaps between eyebrow, H1, lead and buttons, scoped to heroes. Same invariant, 0 violations. The 60 changed lines in the baseline snapshots were inspected: only the H1's `font-size` and `line-height` (57.6, 66.24 and 44px to 48 or 36px).
- **Measured result at 1280x720:** see DESIGN_SYSTEM 2c. Gains from step 2 were smaller than the what-if predicted (guides 3-7 points); Kamrem, Om oss and Bilar till salu did not change (image or side column sets their height).
- **Not done:** step 3 (compact guide trust row) was postponed at Magnus's request; without it most guides stay at 96-105%. Pushed later the same day (see the push entry above).
- **Next context, start here:** (1) step 3, then re-measure with `hero-phase0` scripts (scratch, not in the repo: `collect.cjs`, `herosnap.cjs`, `herodiff.cjs`); (2) decide AC-service and the image-driven heroes; (3) audit points 3 (16 breakpoints, incl. 1320/1321), 5 (hard-coded hex colours) and 6 (no error token); (4) whether to push.

### 2026-09-20 — Claude (audit point 2: inline styles in the Bilservice family)

- **Phase 0 (measured).** 27 source sites, 29 rendered elements, only in `ServiceReparationerPage`, `FelsokningPage`, `DackservicePage` and `AcServicePage` (none anywhere else in public TSX). Each element was measured with and without its inline style: every one had a real effect, but `color:#fff` on the three dark-card h2s and `display:block` on one img were no-ops at all three widths. `.bilservice__container` has no block padding of its own and its sections are unclassed, so the seven inline paddings were the section rhythm. A collateral count showed which selectors were safe to scope (they matched exactly the inline elements) and which needed an explicit modifier (`.bilservice__intro .bb-lead` would have changed four other elements).
- **Decision (Magnus):** keep exact values (so near-duplicates stay) and add a regression guard.
- **Change, one page per commit:** Bilservice, Felsokning, Dackservice, AC-service. All new rules live in `ServiceReparationerPage.css` (the family owner) with the same values the inline styles had; no new file, token, global rule or `!important`. Two traps handled on purpose: `.bilservice__intro p` (0,1,1) beats a bare modifier, so intro modifiers are nested under `.bilservice__intro`; and a later small-screen media rule sets `.bilservice__symptom-grid` to 1fr, so the AC modifier doubles the class. The second was mutation-checked: with the plain selector the AC page is 142 px taller at 768.
- **Proof, every commit:** computed style and bounding box of every element (482 to 606 per page) plus a full-page screenshot, on all four pages at 1440, 768 and 390, against the original baseline: 0 property differences and 0 differing pixels each time. The harness was verified deterministic first.
- **Guard:** `check-css.mjs` now fails on `style=` in public TSX (admin and ThemeSwitcher exempt, comments ignored); mutation-tested on a public page (fails), admin (passes), a comment (passes). `AGENTS.md` rule 6 updated in place.
- **Cost:** CSS grows by 19 rules (plus a few comment lines) (ServiceReparationerPage.css 20130 to 21411 bytes raw, loaded by all four family pages) while the four pages' JS shrinks by 84, 239, 221 and 328 bytes. Typecheck, `check:css` and the full Playwright suite (151 passed, 2 skipped) pass on every commit.
- **Open:** whether to unify the near-duplicates (`--pad` 64 vs `--pad-lg` 72px, `--wide` 78 vs `--wide-sm` 75ch, `--intro` 0.5 vs `--intro-tight` 0.4rem), each a visible change; the unclassed sections in these pages still take their rhythm from container modifiers rather than a section class.

### 2026-09-20 — Claude (icon dedupe: majority wins per glyph)

- **Decision (Magnus):** after strokes were equal, the remaining differences between local and shared phone, pin, arrow and check were shape, not caps (adding round caps moved the match by at most about 6 points, and made check worse). Majority wins per glyph: phone, arrow and check use the shared drawing; the pin, whose local drawing is on all 21 routes through the footer, became the shared `MapPinIcon` shape. Flow arrows in Bärgning and Om oss swap to the shared arrow.
- **Commits, one consumer each:** `MapPinIcon` takes the footer pin shape (22 instances on 5 routes); `ContactFormCard` phone and pin (local `Icon` deleted entirely); `LandingPage` phone, pin, arrow, check; `BargningPage` and `AboutPage` flow arrows; `PublicFooter` pin.
- **Measured per commit** (4x crops, computed styles, box sizes, winning rule per property, svg counts): pins are pixel-identical wherever the local pin was swapped (footer on all 21 routes, Landing, contact card); phone, arrow, check and the flow arrows show only the approved shape and cap change; every icon not being changed stayed at 0 changed pixels. Rendered sizes and winning CSS rules never changed.
- **Bundle:** total JS -572 (ContactFormCard), -590 (Landing), -303 (Bärgning), -303 (Om oss), -810 (footer) bytes per step; MapPinIcon +65. The shared modules moved between chunks, so the entry chunk moved by +32, +31 and -192 bytes, which every route loads; net effect across the sequence is smaller.
- **Net lines:** MapPin 0, ContactFormCard -26, Landing 0, Bärgning -9, Om oss -9, footer -8.
- **Now local by decision:** header icons (CSS-owned), Landing chat, shield, clock and car, ContactPage chevron, and the one-offs in Bärgning (4) and Om oss (6). The shared set is 29 icons, all stroke 2.
- **Open:** round caps on the 22 butt-cap shared icons; shared equivalents for Landing's four local icons.

### 2026-09-20 — Claude (icon look decided: light, stroke 2 everywhere)

- **Decision (Magnus):** the canonical icon look is the light one, stroke 2. Evidence shown first: bold (2.5) was the majority for phone (101 vs 24 instances), arrow (39 vs 8) and check (121 vs 1), light for the pin (23 vs 11), and 20 of the 26 shared icons were already stroke 2. One component mixed both looks: the footer contact list drew a bold phone next to a light mail and pin.
- **Change:** `strokeWidth` 2.5 to 2 in `PhoneIcon`, `MapPinIcon`, `ArrowRightIcon`, `CheckIcon`, `BoltIcon`, `DollarIcon` (six lines, six files).
- **Measured on all 559 rendered instances** (21 routes, 1440 and 390, 42 page states): the only computed-style change is `stroke-width: 2.5px` to `2px`; rendered sizes, colours, fill, filter, winning CSS rule per property, matched rule sets and svg counts are unchanged.
- **Gates:** typecheck 0 errors; `check:css` clean; build ok (each icon chunk 2 bytes smaller, total -12 bytes, no route grows); full Playwright suite 151 passed, 2 skipped.
- **Visible effect:** lines are 20% thinner on the affected icons: hero call buttons, check lists, contact details, arrows. In the contact list the phone, mail and pin now share one weight.
- **Still open:** dedupe the local phone, pin, arrow and check drawings against the shared icons (differences left are round vs butt caps and the pin shape); the duplicated `FlowArrowIcon`; the header's CSS-owned icons; normalising caps on the 23 icons that use butt caps.

### 2026-09-20 — Claude (icon consolidation, audit point 1)

Scope: consolidate duplicated local icon helpers into the shared set, with no visible change unless approved. No CSS, token, copy or `server/**` change.

- **Phase 0 (measured, not assumed).** 45 local icon definitions in 7 files; 2,168 rendered svgs across 21 routes at 1440/390 recorded with computed styles and every matching CSS rule. Findings: zero rules reach inside an icon, zero `!important`, zero inline styles on svgs; the five `PublicHeader` icons are CSS-owned (stroke, stroke-width, linecap, fill come from `PublicHeader.css`); shared set is 20 icons at stroke 2 and 6 at 2.5, only 3 with round caps. Never rendered: Landing `mail`, `send`, `facebook`, `wheel`, `snowflake` (plus four unused `icon:` fields in the services array) and ContactFormCard `check`.
- **New shared icons:** `MailIcon`, `SendIcon`, `CalendarIcon` (stroke 2, round caps/joins), rendered pixel-identical to the drawings they replace.
- **Migrated, one commit each:** `ContactPage` (mail, send; send stroke 2.2 to 2 and round caps, approved), `ContactFormCard` (mail, send; check case deleted), `LandingPage` (calendar, wrench, monitor; eight local entries deleted; wrench and monitor lose round caps/joins, approved), `PublicFooter` (mail, send, calendar).
- **Left local by decision:** phone, pin, arrow, check, clock, chat, shield, car (shared drawings differ or change meaning: the shared shield has no check mark and `CarSaleIcon` is a different glyph); header icons (CSS-owned); ContactPage chevron; Bärgning and Om oss one-offs.
- **Verification per commit:** before/after crops at 4x, computed styles, rendered box sizes, winning rule per property and svg counts all compared. Everything unchanged except the approved deltas above. Footer verified on all 21 routes (168 instances, 0 changed pixels; 63 full-page captures with no overflow).
- **Bundle:** total raw JS about -2 KB across the four migrations (per-step totals: ContactPage +76, ContactFormCard -363, LandingPage -854, PublicFooter -850 bytes; steps de-duplicated same-named chunks slightly differently, so treat it as approximate). Routes that load only the footer pay +92 bytes raw because the shared icons now sit in the footer chunk; Felsökning +59 bytes for a similar reason.
- **Net lines:** -16, -18, +3 and -25 in the four consumers, +24 for the new icons.
- **Test note:** one galleri spec timed out once while the machine was heavily loaded (load average above 130, swap in use); the full suite passed (151 passed, 2 skipped) with fewer workers. Playwright's own browser was not installed, so runs used system Chrome through a scratch config outside the repo.
- **Not done, still open:** which look is canonical for phone, pin, arrow and check (needs Magnus); the header icons; the 6 shared icons at stroke 2.5. Points 2 to 6 of the audit (inline styles, breakpoints, hero, hex colours, error token) untouched.

### 2026-09-20 — Claude (booking submission lifecycle + payload; backend-readiness task 1 of 3)

Scope: make the frontend a correct client of the documented contract. No backend was created or edited (`server/**` untouched).

- **Booking modal** (`BookingFormModalImpl.tsx`, `BookingForm.css`): both `alert()` calls are gone. While sending, every control is disabled through a `<fieldset disabled>`, the button reads "Skickar…" and the form is `aria-busy`. Success replaces the form with a summary panel and moves focus to its heading. Errors show an inline `role="alert"` that keeps the entered data, takes focus and offers the phone number from `BUSINESS`.
- **`hooks/useFormSubmission.ts`** (new, shared with the contact form in task 2): `idle → submitting → success | error`, a ref guard against double submit, a 15 s timeout, abort on unmount, and errors classified as network / timeout / 429 / 4xx / 5xx / unknown.
- **`types/booking.ts` + `api/bookings.ts`** (new): `BookingRequest` and a pure `buildBookingRequest()`. Text is trimmed, `serviceId` is a number, an empty comment is omitted, and `date` is a local `yyyy-MM-dd`.
- **Bug found by probing in a browser:** the client sent `date` as a serialised `Date`. Picking 20 Sep in Stockholm sent `2026-09-19T22:00:00.000Z`, which a UTC server stores as 19 Sep. Fixed on the client; the server side is documented in `BACKEND_HANDOFF.md` §2.3. Native `required` does block an empty date/time, so the "1970 booking" risk in the first plan did not materialise.
- **Correction to the earlier plan:** the modal's state does not survive closing, because the `BookingFormModal` wrapper unmounts it. There was no stale-form-data problem to fix.
- **`comment_customer`:** the client already sent it; the loss is server-side (`server/index.js:69`, `:101`). §2.3 now holds the exact contract, the two-line fix as text, open questions (column length, status codes) and a curl acceptance test.
- **Tests:** `tests/browser/booking-form.spec.ts` (7 specs x 3 viewports) uses `page.route` doubles. It covers the payload, the `comment_customer` prefill from `/kamrem`, single request on double click, no native alert, focus, retry after a 500, and an unreachable server. Mutation-checked: restoring `toISOString()` makes the payload spec fail.
- **Verification:** `typecheck` 0 errors; `check:css` 83 tokens, 20 stylesheets clean; `build` ok; full Playwright suite 151 passed / 2 skipped (touch-only); 0px horizontal overflow in error and success states at 390 and 1440. Ran with system Chrome (`channel: 'chrome'`) via a scratch config because no Playwright browser was installed.
- **Not done here:** error styling uses literal colours in `BookingForm.css` because `design-tokens.css` has no error token; adding one needs Magnus's approval. Swedish success/error wording is a draft for Magnus to approve. Contact form (task 2) and admin auth (task 3) are untouched.

### 2026-09-20 — Antigravity (deep pre-push verification & push to origin)

- **Deep pre-push verification completed:**
  - `npm --prefix client run typecheck`: 0 errors across all routes and components.
  - `npm --prefix client run check:css`: 84 tokens defined, 20 stylesheets clean, 0 undefined tokens, 1 pending token (`--bb-font-sans`).
  - `npm --prefix client run build`: built in 9.13s; dist verified.
  - `npm --prefix client run test:browser`: full Playwright suite 130 passed, 2 skipped (touch-only off mobile).
  - Automated scan of all public TSX files outside `/admin` confirmed **exactly 0 Tailwind utility classes**.
  - All telephone (`tel:+46705533395`), email (`mailto:info@brynasbilservice.se`), and Google Maps links verified against canonical `data/business.ts` across all 21 public routes.
  - Accessibility audit: 100% single `<h1>` across 21 routes, 100% image `alt` coverage, 100% interactive accessible names, modal focus trap and escape handling verified.
  - Responsive overflow: 0px horizontal overflow verified across 1440, 768, 390, and 320 px viewports.
- **Pushed to `origin/redesign/blue-teal-v1`:**
  - Authorized by Magnus (`git push`).
  - Resolved GitHub 403 authorization requirement by creating a classic PAT with `repo` scope and caching credentials in macOS `osxkeychain`.
  - Push completed successfully: `1326cd27..915b12ad redesign/blue-teal-v1 -> redesign/blue-teal-v1` (32 commits pushed).
  - Remote tracking branch updated; working tree clean and in sync.

### 2026-09-20 — Antigravity (four undefined CSS custom properties resolved)

Resolved the four undefined `--bb-*` custom properties flagged in `PENDING_TOKENS` across the two family parents (`ServiceGuideTemplate.css` and `ServiceReparationerPage.css`).

- **Derived, not invented values:**
  - `--bb-color-border-subtle: rgba(255, 255, 255, 0.08)`: defined in `client/src/styles/design-tokens.css` for dark ink surfaces (`#071416`). Serves the 4 dark container cards in `ServiceGuideTemplate.css` (`.service-guide__importance`, `.service-guide__service-card`, `.service-guide__process`, `.service-guide__closing`), matching neighbouring dark rules (e.g. line 351 `rgba(255, 255, 255, 0.08)`).
  - `--bb-color-border-subtle-light: rgba(7, 20, 22, 0.08)`: defined in `client/src/styles/design-tokens.css` for light surfaces (`#ffffff` / `#f8f7f3`). Serves the 3 light card rules in `ServiceGuideTemplate.css` (`.service-guide__symptom-row`, `.service-guide__info-card`, `.service-guide__topic-card`), matching canonical card borders across `ContactPage.css`, `BiltjansterPage.css`, `AboutPage.css`, `BargningPage.css`, and `--bb-shadow-card: 0 10px 26px rgba(7, 20, 22, 0.08)`.
  - `--bb-shadow-elevated: 0 18px 44px rgba(0, 0, 0, 0.34)`: defined in `client/src/styles/design-tokens.css`. Serves `.service-guide__hero-media` inside `.service-guide__hero` (dark ink `#071416`). Derived from `--bb-shadow-floating` documented in `DESIGN_SYSTEM.md` as "Floating header & elevated dark card shadow".
  - `--bb-radius-lg` and `--bb-radius-pill`: identified as misnamings of existing canonical tokens. `.bilservice__image-slot--radius-lg` in `ServiceReparationerPage.css` was mapped to `var(--bb-radius-card)` (20px), and `.bilservice__hero-badges li` and `.bilservice__hero-reg-input` to `var(--bb-radius-control)` (999px pill). No duplicate synonym tokens were introduced.
- **`PENDING_TOKENS` in `client/scripts/check-css.mjs` shrunk from 5 to 1:** only `--bb-font-sans` remains on the list (intentionally preserved pending untangling with the font-loading fix).
- **Two separate commits:**
  1. `ce2ef37d` feat(css): resolve four undefined custom properties into canonical tokens
  2. `3248080c` test(baseline): update snapshots for resolved guide card borders
- **Verification:**
  - `npm --prefix client run typecheck`: 0 errors.
  - `npm --prefix client run check:css`: 84 tokens defined, 20 stylesheets clean, 1 pending token (`--bb-font-sans`).
  - `npm --prefix client run build`: built cleanly in 12.41s; entry CSS moved by only +150 bytes.
  - Baseline snapshots diff: verified that ONLY the intended properties moved on the 10 guide pages across 3 viewports (`border-top-width: 0px -> 1px`, `border-top-style: none -> solid`, `border-top-color: rgb(7, 20, 22) -> rgba(255, 255, 255, 0.08)`). No text diffs, no non-guide routes affected.
  - Full test suite: **130 passed / 2 skipped** (touch-only tests skipped off mobile).
  - Horizontal overflow: verified $\Delta = 0\text{px}$ across 1440, 768, and 390 viewports on `/kamrem`, `/avgassystem`, `/service-reparationer`, and `/ac-service`.

### 2026-09-20 — Claude (independence from external truth; token guard; first-load weight)

Executed the workstreams from the Phase 1 proposal that carry no visual risk. Six commits, none pushed.

- **`client/scripts/check-css.mjs` + `npm --prefix client run check:css`**, wired into the pre-commit hook. Fails if any `var(--bb-*)` is undefined and unfallbacked, or if `--redesign-*` / `index.css` reappear. This is what makes the legacy isolation structural rather than a convention held up by documents — three of which were telling agents to go back to `--redesign-*`. Proven by writing deliberate violations and watching the hook block the commit. The five known-undefined tokens sit in a `PENDING_TOKENS` list that may only shrink.
- **`client/tests/browser/baseline.spec.ts` — the repository is now its own visual authority.** 21 routes x 3 viewports, recording rendered text plus a computed-style fingerprint of the shell, the shared primitives and both family parents. Not pixels: those would add tens of MB and break on any font-rendering difference. 424 KB total. Suite 67 -> 130 passed. Proven by temporarily defining `--bb-color-border-subtle` and watching the exact expected diff appear.
- **Booking modal split behind a lazy boundary.** react-datepicker, react-time-picker, react-clock and date-fns shipped in the main chunk for every route although the modal only opens on click. Main JS **500,092 -> 238,410 B** (gzip 148.12 -> 73.79 kB); main CSS **100,019 -> 69,624 B**. The boundary is inside `BookingForm.tsx`, so none of the 22 call sites changed. Verified by a pre-existing test that opens the dialog, plus a manual check of focus trap, Escape, reopen and network timing.
- **Landing route code-split like every other route.** It was the only static one, so its JS and CSS shipped on all 21 routes. Main JS **238,726 -> 200,910 B**, main CSS **69,624 -> 33,975 B**; a guide page's first-load CSS went 92 KB -> 72 KB. Checked for duplication, which was the real risk: total built CSS moved by 4 bytes, and Vite pulled PublicFooter/ContactFormCard/GoogleReviewsCard into their own shared chunks. The trade is one extra lazy chunk on `/`; reverts cleanly if that matters more.
- **Two mistakes, both caught by tooling, both reverted — worth reading.**
  1. I removed the `brynas` palette from `tailwind.config.js` as dead code. The build shrank 1,465 bytes: `/admin` consumes it through `dark:` variants that a grep for `bg-brynas-` does not match. Reverted; recorded in `CSS_OWNERSHIP.md`.
  2. I removed all 35 inert `font-family: var(--bb-font-sans)` declarations as a provable no-op. 30 baseline snapshots failed. An invalid `var()` still **wins** the cascade and only then resolves to `unset` (inherit); delete the declaration and a lower-priority rule wins instead, changing the stack to `'Manrope', Arial, sans-serif`. Those declarations are accidentally pinning the fallback that `base.css` warns governs font-swap layout shift. Reverted; recorded at the code site.
- **Still awaiting Magnus:** whether the four remaining undefined tokens (`--bb-color-border-subtle`, `--bb-shadow-elevated`, `--bb-radius-lg`, `--bb-radius-pill`) should render their intended treatment. Defining them activates 8 declarations and changes approved appearance on 14 pages.
- **Verification:** typecheck 0 errors, `check:css` clean, build clean, **130 passed / 2 skipped**, tree clean, no dependency added.

### 2026-09-20 — Claude (Phase 1: foundation validation and family lock)

Audit with small authorised corrections. Baseline was clean at `422753a7`; no pre-existing uncommitted work existed to protect.

- **Measured, not inferred — 46 references to five `--bb-*` tokens that are defined nowhere**, none with a `var()` fallback, all inside the two *family parent* stylesheets. An unresolved custom property invalidates the whole declaration at computed-value time, so these do not degrade gracefully. On `/kamrem`, `border-top-style` computes to `none`: the seven card borders in the Guide parent **do not render on any of the 10 guide pages**. On `/service-reparationer`, `border-radius` computes to `0px`. `--bb-font-sans` (35 refs) is inert — `font-family` then inherits `'Manrope', sans-serif` from `base.css`, which is what was wanted. `--bb-font-sans` has never been defined in this repository's history. **Not fixed:** defining the tokens activates 43 declarations at once and changes appearance Magnus signed off on. Recorded in both stylesheets' header comments.
- **Three handover docs presented stale instructions as live** and carried no banner, unlike `CODEX_HANDOVER.md` and `PROJECT_STATUS.md`, which already did. `CLAUDE_CODE_HANDOVER.md` called itself "the authoritative continuation guide for Claude Code (or any incoming AI assistant)" while directing readers to `var(--redesign-*)` tokens in the deleted `index.css` and the retired uppercase `.title-accent` rule. Bannered and neutralised.
- **A correction I made and reverted.** The `brynas` palette in `tailwind.config.js` (gold/red/black — the retired club colours) appeared unused: a grep for `bg-brynas-` etc. found nothing. I removed it, rebuilt, and the stylesheet **shrank by 1,465 bytes** — `/admin` consumes it through `dark:` variants (`dark:bg-brynas-dark`, `dark:text-brynas-muted`, 64 usages) which the grep prefix missed. Reverted; built CSS restored byte-identical. Recorded in `CSS_OWNERSHIP.md` so it is not "cleaned up" again.
- **There is no working lint.** `client/eslint.config.js` is ESM in a CommonJS package and imports five packages that are not dependencies, so ESLint cannot load. Pre-existing; not fixed (needs new dependencies). Do not cite lint as a check.
- **The pre-commit hook enforces less than the docs claim.** `check_no_growth` and `check_frozen` are defined but never called; only `check_no_tailwind_in_public` runs, and it inspects added lines in staged diffs, so pre-existing utilities are never flagged. `AGENTS.md` corrected.
- **All three external visual-authority paths are absent from this machine** — `~/AI Work Projects 2026/` does not exist, so the seven locked mockups and `REDESIGN_HANDOVER.md` are unreachable, and there is no `varverkstad` directory. The current rendering is the only usable visual authority. Recorded in `AGENT_HANDOFF.md`.
- **Playwright covers 17 of 22 routes.** Uncovered: `/biltjanster`, `/service-reparationer`, `/oljebyte`, `/koppling`, `/bromssystem`, `/avgassystem` — including the Bilservice family's parent page and two of the three guide pages `AGENTS.md` names as structural proofs.
- **Audited and found healthy** (no action, deliberately): `!important` is 11 uses, 9 of them `prefers-reduced-motion` and one `[hidden]`; no global element-selector leakage outside `base.css`; no competing button/card/modal primitives; `BookingFormModal` has `role="dialog"`, `aria-modal`, a focus trap, Escape handling and focus restore; z-index is bounded (-2…1000); no CSS Modules and no `@layer` anywhere.
- **Verification:** typecheck 0 errors; build clean; Playwright **67 passed / 2 skipped**, matching baseline; every built CSS chunk byte-identical in size to the Stage 0 baseline and the main stylesheet byte-identical; rendered `innerText` and the href inventory of all 21 public routes unchanged. All 5 source-file edits were inside comments.
- Four commits on `redesign/blue-teal-v1`. **Not pushed.**

### 2026-09-20 — Claude (business facts moved to one source)

- **New `client/src/data/business.ts`** is the single source for the workshop's phone number, e-mail, address, Google Maps link, opening hours, legal name and org.nr. It sits beside `vehicles.ts` and `publicNavigation.ts` as a data module, not a CSS or layout change. No CSS file was touched.
- **Resolved the drift the previous entry flagged:** the telephone link existed as `tel:0705533395` (77 rendered links) and `tel:+46705533395` (50). All 127 now render the E.164 form, which also works when a customer calls from abroad. The Google Maps link had two query variants (28 + 3); all 31 now use the one that was already on every page.
- **Opening hours** were hard-coded in five files in five typographic variants (`08:00 – 17:00`, `08:00–17:00`, `08.00 – 17.00`, …). The values now come from `BUSINESS.hours`; each page keeps its own typography through the `weekdayHours({ dash, dots })` helper, so no visible copy changed.
- **One deliberate visible change:** `ContactFormCard` rendered the number as `070–553 33 95` with an en dash, against `070-553 33 95` with a hyphen everywhere else. Normalised to the hyphen (majority form, and the correct Swedish convention). This is the only text difference on the whole site — see verification. **Magnus should confirm.**
- **Ten Playwright specs** asserted the literal `tel:0705533395`; they now import `BUSINESS.phone.href`, so the tests cannot drift from the site either.
- **Left as prose, on purpose:** sentences that mention `Utmarksvägen 21B i Brynäs` inside body copy. Only exact renderings of a whole fact were centralised; decomposing sentences into constants would hurt readability for no drift protection. The rule is written into `business.ts`.
- **Verification:** `typecheck` 0 errors; `npm --prefix client run build` clean; Playwright **67 passed / 2 skipped**, matching the pre-change baseline. Additionally, the rendered `innerText` of all 21 public routes was captured before and after (4,947 lines) and diffed: **one line differs**, the en dash above. The `tel:`/`mailto:`/maps href inventory was diffed the same way, with no link gained or lost.
- Committed on `redesign/blue-teal-v1`. **Not pushed.**

### 2026-09-20 — Claude (Step 7 sign-off check + roadmap archived)

- **Automated click-through** of the whole public site: crawled every internal link from every page (nav, Biltjänster dropdown, footer, in-page CTAs). 22 routes reached, each with exactly one `h1`, `PublicHeader` and a footer, no page errors, and `/tjanster` → `/biltjanster`. No problems.
- **Noted, not changed:** the footer's Instagram icon links to `https://www.instagram.com` rather than the workshop's profile, and the phone number appears as both `tel:+46705533395` and `tel:0705533395`. Both work; Magnus decides.
- **`HITL_Temporary_roadmap.md` archived** to `docs/archive/` with a banner marking it history, per the document's own primer. References updated in `AGENTS.md` (including the precedence hierarchy, now 4 documents), `docs/AGENT_HANDOFF.md`, `instructions.md` and `docs/PROJECT_STATUS.md`.
- **`docs/PROJECT_STATUS.md`** got a stale banner: it still describes the 2026-09-18 state and nothing else links to it.

### 2026-09-19 — Claude (Step 7 DONE: index.css deleted)

- **`client/src/css/index.css` deleted** (7,531 lines). `main.tsx` imports `styles/tailwind.css` in its place; the global layer is now tailwind → design-tokens → base → shared-elements.
- **`/tjanster` → `<Navigate to="/biltjanster" replace />`** (keeps old bookmarks and search hits). `pages/ServicesPage.tsx` is deleted; nothing linked to `/tjanster` any more.
- **Dead code deleted:**
  - components: `components/layout/Header.tsx`, `components/layout/Footer.tsx`, `components/GoogleReviews.tsx`, `pages/admin/Login.tsx`
  - icons (only ServicesPage used them): `components/icons/SnowflakeIcon.tsx`, `TireIcon.tsx`
  - assets: `assets/images/home/hero/home-workshop-hero.{jpg,webp}` (only index.css used them), `assets/images/services/repair/mechanic-brake-repair.jpg` (only ServicesPage), and the 38 unreferenced `assets/images/gallery/workshop/*` files. The 12 still referenced there remain.
- **Not deleted (outside Step 7's scope):** `assets/images/archive/**` (deliberate archive) and seven assets that were already unreferenced before this step: `footer/footer-wheel-bg.png`, `footer/vi-haller-din-bil-i-rullning.png`, `people/maher-basher-portrait-thumb.{jpg,webp}`, `services/general/wrench-and-bolt-workbench.jpg`, `services/timing-belt/timing-belt-in-hand-thumb.webp`. Magnus decides.
- **Pre-commit hook:** the index.css freeze is removed; the public-Tailwind check stays.
- **Docs:**
  - `AGENTS.md`: CSS safety rules rewritten for a world without a legacy stylesheet.
  - `CSS_OWNERSHIP.md`: rules, shell list, collision check against all CSS, task contract, verification.
  - `DESIGN_SYSTEM.md`: legacy sections replaced by a pointer to Git history (index.css exists up to `80ec3958`); CSS file organization rewritten.
  - Also updated: `CLAUDE.md`, the roadmap (Step 7 done, awaiting sign-off; archive afterwards) and `AGENT_HANDOFF.md`.
- **Verification:**
  - Global CSS 287.8 KB → 100.0 KB (gzip 44.2 → 17.7 KB), measured by building HEAD~ in a temporary worktree.
  - Pixel comparison vs pre-change baselines: 21 public routes × 1440/390 + `/admin` login and dashboard, 44/44 identical.
  - All 22 routes at 768: 0px overflow, no page errors.
  - Typecheck 0 errors, build clean. Full Playwright suite passed, including the new `tests/browser/step7.visual.spec.ts`: the `/tjanster` redirect, no `--redesign-*`/legacy variables in `:root`, no legacy selectors in any stylesheet, no element using `.container` (Tailwind emits its own `.container` utility, which is harmless while unused).

### 2026-09-19 — Claude (Step 7 prep: everything but /tjanster is free of index.css)

- **Tailwind:** `client/src/styles/tailwind.css` holds the `@tailwind` directives. It is not imported yet, because the frozen `index.css` still emits them; Step 7 swaps the import line in `main.tsx`.
- **Global defaults:** `client/src/styles/base.css` carries over index.css's element rules (`html`, `body`, `h1–h6`, `p`, `img`, `a`, `ul`) and is imported now (harmless duplicate).
  - It uses the **legacy font stacks** (`'Manrope', sans-serif`), not `--bb-font-*`. With the Arial fallback from the tokens, `/galleri` failed its CLS < 0.02 check about 70% of the time under load, because the fallback's line wrapping changes the Manrope swap-in shift (0.0202). With the legacy stacks it passed 8/8. Changing the stacks should go together with a font-loading fix (metric-matched fallback), which is a follow-up.
  - A `scroll-behavior: auto` reduced-motion override was tried and dropped to keep strict parity.
- **Booking modal:** `BookingForm.css` moved from six `--redesign-*` variables to `--bb-*` tokens. `.modal-submit` is now self-contained: layout, padding, and hover lift and shadow were previously inherited from `.btn`/`.btn--primary`. `.btn`, `.btn--primary` and the no-op `w-full` were removed from `BookingForm.tsx`.
  - Intentional visible change: on mobile the full-width "Skicka bokning" label is now centred (it sat left-aligned before). The teal shades move slightly to the `--bb-color-teal-600/700` tokens.
- **FAQ:** `BiltjansterFaq` has its own `components/ui/BiltjansterFaq.css` with a new `.bb-faq__*` prefix (collision check 0), rules carried over from index.css on `--bb-*` tokens. The legacy `.container` is gone.
- **Tailwind leftovers:** removed 13 icon utilities from `AboutPage.tsx` and `BargningPage.tsx`. Icons inside `.bb-btn` were already sized by `.bb-btn svg`; two links got island rules (`.omoss-page__maps-link svg` 14px, `.bargning-page__showcase-book-link svg` 16px). `text-amber-400` was already overridden by island CSS.
- **Admin:** 8 arbitrary Tailwind values `var(--redesign-accent[-dark])` in `ProtectedRoute`, `BookingManagement` and `ServiceManagement` now use `--bb-color-teal-600/700`. The dry run caught this: without index.css, the admin login button was invisible.
- **Verification (temporary Playwright harness, not committed):**
  - Pixel baselines of all 21 public routes at 1440 and 390 plus `/admin`, taken before the changes and stable on re-run (44/44).
  - After the changes: identical within Playwright's default tolerance, except the intentional mobile modal-button centring.
  - **Step 7 dry run** (index.css import swapped for tailwind.css): 44/44 identical, full suite 61 passed / 2 skipped.
  - Typecheck 0 errors, build clean.
- **Remaining for Step 7:** retire `/tjanster`, remove the dead code, swap the import, delete index.css and its hook freeze.
- **Follow-up:** font-swap CLS site-wide (metric-matched fallback `@font-face` or preloading), then move `base.css` onto `--bb-font-*`.

### 2026-09-19 — Claude (repo audit + documentation sync)

- **Audited the repo against the roadmap and docs.** Git clean; typecheck 0 errors; build clean; Playwright 61 passed / 2 skipped. All 21 public routes except `/tjanster` mount `PublicHeader`/`PublicFooter`.
- **Step 7 blockers found that the roadmap didn't list:**
  1. The `@tailwind` directives live only in `index.css` (admin styling and global preflight).
  2. `BookingForm.css` (booking modal, 22 pages) reads six `--redesign-*` variables from `index.css`, and its button uses `.btn`/`.btn--primary`.
  3. `BiltjansterFaq` (13 pages) is styled only by `index.css`.
  4. Tailwind icon sizes remain in `AboutPage.tsx` and `BargningPage.tsx`.
- **Dead code found:** `components/GoogleReviews.tsx`, `pages/admin/Login.tsx`, and the legacy `Header`/`Footer` (only `/tjanster` uses them).
- **Docs synced (no code changes apart from one stale comment in `shared-elements.css`):**
  - `AGENTS.md`: current state rewritten, the broken list updated (client-side admin auth added as P0), and new sections for car stock and gallery photos. 308 → 279 lines.
  - `CLAUDE.md`: client tree, routes/nav source, Node ≥18.17 build note, the `*.disabled` root files, and the design-system section (`--bb-*` tokens, mixed-case headings; the uppercase hero rule and `.fade-up` are retired).
  - `HITL_Temporary_roadmap.md`: Step 7 checklist with blockers 1–6; stale "Next Horizon" fixed.
  - `CSS_OWNERSHIP.md`: `.bb-*` usage corrected, Step 7 blockers listed, `/tjanster` and `/admin` rows.
  - `AGENT_HANDOFF.md`: verified starting point (repo path, upstream, audited commit) and next tasks.
  - `DESIGN_SYSTEM.md`: legacy sections labelled as reference only, the hero rule marked retired, the `--bb-shadow-card` usage and open decisions corrected.

### 2026-09-19 — Claude (Step 6 COMPLETE: Galleri rebuilt as a folder-driven unique page)

- **Rebuilt `/galleri` from scratch.** `GalleryPage.tsx` + new `GalleryPage.css` (`.galleri-page__*`, collision check 0). Legacy `Header`/`Footer`, all `.about-page__*` / `.gallery-viewer__*` / `.section-eyebrow` / `.container` usage and the Tailwind utilities are gone. **Step 6 is complete; `ServicesPage.tsx` (`/tjanster`) is the last `index.css` consumer.**
- **Folder-driven photos.**
  - Every JPG/PNG/WebP in `client/src/assets/galleri/` becomes a gallery image (`import.meta.glob` + `vite-imagetools` 6.2.9, the only new dependency, dev).
  - Each photo gets exactly 4 variants: ≤640 and ≤1920px, WebP and JPG, `quality=70`, never upscaled. 44 files for 11 photos, verified in `dist/`.
  - Order follows the filename (natural sort; the numeric prefix is stripped from the slug).
  - Captions live in `bildtexter.json`. Missing captions fall back to a title built from the filename, plus a dev-only `console.info`.
  - Instructions for Magnus are in `LÄSMIG.md`, including the no-people rule.
- **The 11 photos were copied** (not moved: other pages still import the originals) as `01-…` to `11-…`, with their captions extracted verbatim by script.
- **Data layer:** `types/gallery.ts` (contract), `data/galleryHelpers.ts` (pure: `slugFromFilename`, `naturalCompare`, `resolveCaption`), `data/gallery.ts` (folder source), `api/gallery.ts` (`getGalleryImages()`, `VITE_GALLERY_SOURCE=api` for the future backend). `docs/BACKEND_HANDOFF.md` §7 has the gallery API contract and the "Bilden innehåller inga personer" upload rule.
- **Page:**
  - A dark ink stage doubles as the hero. It's a fixed 3:2 box with `object-fit: contain`, capped at `min(68svh, 100svh − 360px)`: 810×540 at 1440×900, and the whole stage sits in the first viewport.
  - Caption row with category, title, description and a "01 / 11" counter.
  - Prev/next buttons on the stage edges on desktop (container-query positioning), in a row with the counter on mobile.
  - Native-scroll thumbnail strip with snap, fade masks and a roving tabindex.
  - `?bild={slug}` deep links; unknown slugs fall back to image 1.
  - ArrowLeft/Right on the viewer; Home/End in the strip; touch swipe with `touch-action: pan-y`.
  - A single visually hidden live region; neighbour preload after load.
  - Closing `.bb-card--trust` now links to `/biltjanster`.
- **Dropped from the old page:** the wheel hijack (passive listener, console warning, hijacked page scroll), the custom pointer drag, the duplicate hero photo, `aria-live` on the whole viewer, the 44 hand-written imports, the `/tjanster` link, and the "Vår verkstad i bilder" intro block. That block told users to "dra i bildremsan", and dragging was removed.
- **Vite config:**
  - `vite.config.ts` loads `vite-imagetools` with a dynamic `import()`, because it's ESM-only and the config loads as CJS. `"type": "module"` was deliberately not added, since the other config files are CJS.
  - **Bug found and fixed:** deleting a photo while a browser still requested one of its variants made sharp emit an unhandled `Input file is missing` error, which **crashed the dev server** (reproduced). A small guard wrapper in `vite.config.ts` attaches an error handler to the piped image stream and answers 404 with a `[galleri]` warning instead. This slightly exceeds "add the plugin, nothing else" for `vite.config.ts`; it's needed so Magnus can delete files safely.
- **Measurements:**
  - Header bottom edge: 122px at 1440, 80px at 768/390. Clearance is 38px at 1440 and 40px at 768/390.
  - CLS < 0.02 across load, scroll and 10 image changes (asserted).
  - Main image transferred: 230 KB at 1440/768 (1920w WebP), 37 KB at 390 (640w WebP).
  - Build time: 9.96s → 12.4s.
  - Dev server "instant" proof: an added file appears in 0.9–1.1s, a caption edit in 0.4–0.5s, a removal in 0.5s, with no restart. The test file and caption were removed afterwards, with no trace in `git status`.
  - `imagetools` 6.2.9 has no disk cache (in-memory in dev only), so there's nothing to git-ignore.
- **Tests:** new `tests/browser/galleri.visual.spec.ts`.
  - The expected images are derived from the folder via `node:fs` + the helpers; nothing hardcoded.
  - Covers helper unit tests, no legacy/Tailwind classes, order and labels, prev/next wrap, URL, live region, keyboard, deep links, image attributes, stage geometry, CLS, the wheel not being hijacked, a clean console, booking, a touch swipe (390px), and 0/1/60 images via in-browser module extension.
  - Full suite 61 passed, 2 skipped (touch swipe on non-mobile projects).
  - The swipe test was flaky once under load (it swiped the loading placeholder); fixed by waiting for the real image.
- **Follow-ups (not done):**
  1. Let `GalleryTeaserCard` read from `client/src/assets/galleri/` instead of its own `defaultWorkshopSlides` (shared component).
  2. Point Om oss gallery links at `/galleri?bild={slug}`.
  3. Retire `/tjanster` in Step 7.
  4. Clean up the 38 files in `client/src/assets/images/gallery/workshop/` that no longer have an importer: every `-thumb.{jpg,webp}` plus the main `.jpg`/`.webp` of car-bay-and-tire-racks, empty-lifts, lifts-and-tire-racks, overhead-car-bay, overhead-tire-storage, tire-machine-and-tools, tire-racks-and-rims and workbench-and-tire-machines. The `-card.webp` files, car-on-lift, car-open-hood and service-aisle are still used by other pages.
  5. Optional: category filter chips once the gallery passes about 24 photos; a lightbox.

### 2026-09-19 — Claude (Bilar till salu: scales to any stock size)

- Magnus asked for a finished answer to "what if there are 5–6+ cars". Layout now adapts to the data, no config needed:
  - **1–2 available:** unchanged, full cards stacked.
  - **3+ available:** the lead vehicle (first available with photos — the same car as the hero panel) keeps the full card; the rest become compact cards (photo, price, name, year · mil · fuel · gearbox, "Skicka förfrågan" + "Visa mer") in a 3/2/1-column grid (≥1024 / ≥640 / below), labelled "Fler bilar i lager (n)".
  - **More than 9 in the grid:** "Visa alla N bilar" reveals the rest (keeps the page length bounded).
  - **"Visa mer"** expands a compact card in place into the full card (gallery, specs, description), spanning the grid row; focus moves to its title; "Visa mindre" collapses. One expanded card at a time.
  - **Sold archive:** always compact, no inquiry button, capped at 6 with the same "Visa alla" button.
  - Order follows the data (`sort_order` once the API is live), so the owner controls which car leads.
- Constants `FULL_CARD_LIMIT = 2`, `GRID_INITIAL = 9`, `SOLD_INITIAL = 6` at the top of `BilarTillSalu.tsx`.
- Tests: two new Playwright scenarios (12 available + 8 sold; 2 available) that fetch the real seed module in the dev server and append vehicles in the browser via `page.route` — no test hooks in page code, seed file untouched. Covers column counts per breakpoint, show-all, expand/collapse + focus, inquiry prefill from a compact card, sold cap, no overflow. Full suite 48/48; typecheck and build clean. Six-car layout reviewed at 1440/768/390 (320px: compact buttons wrap to two lines but stay inside the card).

### 2026-09-19 — Claude (Bilar till salu: mockup alignment pass)

- Aligned `/bilar-till-salu` with Magnus's supplied mockup. Only `BilarTillSalu.tsx`, `BilarTillSalu.css` and the page's Playwright spec changed; data layer, shared styles, shell and `index.css` untouched.
- **Hero:** two-column at ≥1024px with a new featured-vehicle panel (first available vehicle *with images* from `getPublicVehicles()`, linking to `#vehicle-{slug}`, glass caption with name/price/"Se bilen"). The mockup's AI-composited hero (car pasted into a workshop with an invented wall sign) was deliberately not reproduced; the real workshop photo stays as background and the car is a separate framed photo. Loading reserves the panel box; hidden below 1024px, where a `media` source serves a 1×1 GIF so the eager image is not downloaded. Extra 2rem top padding ≥1024px (panel sat ~20px under the 122px header at 1440/1728; now 51–106px).
- **Trust row:** amber outline rings (page-local `.bilartillsalu-page__trust-icon`), full width ≥1024px. Descriptions kept (approved copy); the mockup's title-only row needs Magnus's OK.
- **Listing card:** `id="vehicle-{slug}"` + `scroll-margin-top: 144px` (measured header bottom 122/80/80px at 1440/768/390); three equal thumbnail columns; full-width stacked actions pinned to the thumbnail baseline; `srcset`/`sizes` over the contract's thumb/main variants; `overflow-wrap: anywhere` on title and description (a long unbroken word escaped the column).
- **Perf/a11y:** hero panel image `fetchpriority="high"` (lowercase attribute for React 18.2, no warning). CLS measured 0.0000–0.0011. Caption background raised to 86% ink so the amber CTA keeps ≥5.4:1 even over a white photo (4.37:1 at 80%). Skeleton uses a token-derived tint instead of raw hex.
- **Verification:** typecheck 0 errors, build clean, full suite 42/42. Spec extended: hero panel (desktop only, href, price, fetchpriority), srcset/sizes, equal thumbnails, button widths, CLS < 0.02, jump target clears header, clean console on load. Edge cases checked with temporary seed edits (reverted): 4 available incl. 0-image / 1-image / very long name and description, sold mix, and zero available (no panel, empty state).

### 2026-09-19 — Claude (Step 6: Bilar till salu rebuilt as unique page, backend-ready)

- Rebuilt `/bilar-till-salu` from scratch: `BilarTillSalu.tsx` + new `BilarTillSalu.css` (`.bilartillsalu-page__*`). Legacy `Header`/`Footer` replaced by `PublicHeader` (overlay) + `PublicFooter`. Beyond `.cars-page__*` (59 rules), `index.css` also defines `.car-card__*` (32) and `.cars-grid` (3); none of those selectors are used any more (asserted in the Playwright spec).
- Sections: `.bb-hero` (workshop-service-aisle photo, lead, call + visning buttons, address/hours, `.bb-trust-row` with the three approved trust badges) → listings (featured vehicle card: 16:10 viewer, `aria-pressed` thumbnails, price/Såld badges, 4 spec badges, description, "Skicka förfrågan" + call) → loading skeleton / error / empty states → sold archive (conditional) → closing `.bb-card--trust`. All existing Swedish copy kept verbatim.
- Data layer split out for the future backend: `types/vehicle.ts` (contract, mirrors `docs/BACKEND_HANDOFF.md` §3.4), `data/vehicles.ts` (static seed), `api/vehicles.ts` (`getPublicVehicles()`, `VITE_VEHICLES_SOURCE=static|api`, seed lazily imported).
- Inquiry prefill: "Gäller förfrågan om Peugeot 307 CC 2.0 (2006)". The modal is keyed by its comment so switching between a vehicle inquiry and a generic booking always starts from the right text (`BookingForm.tsx` untouched).
- Fixed locally: `.bb-card--trust__text`'s `flex: 1 1 320px` becomes a 320px *height* once the shared card stacks as a column at ≤640px — overridden with `flex-basis: auto` in this island only. Felsökning uses the same card and likely shows the same gap on mobile; not touched.
- Verification: typecheck 0 errors, build clean, new `tests/browser/bilar-till-salu.visual.spec.ts` 3/3, full suite 42/42 (all 3 viewports, 0px overflow). Empty state and sold archive verified by temporarily flipping the seed to `sold` (reverted, not committed). `index.css` untouched.

### 2026-09-19 — Antigravity (Step 4 COMPLETE: AC-service Rebuild — Bilservice Family Sibling 3 of 3)

- **Rebuilt Climate & AC Service page (`AcServicePage.tsx` at `/ac-service`) onto `ServiceReparationerPage.css`**:
  - **Shared Bilservice Family Template 100% Completed**: Rebuilt `/ac-service` onto `ServiceReparationerPage.css` (`.bilservice__*`), completely eliminating transitional `AcServicePage.css` (`git rm client/src/pages/AcServicePage.css`) and all legacy `index.css` rules (lines 5847–5916). **Step 4 (Bilservice Family) is now 100% Complete with all 4 pages living on the shared template.** 0 lines added, changed, or deleted in `client/src/css/index.css` (100% frozen).
  - **Canonical Public Shell**: Mounted `<PublicHeader onBookingClick={() => openModal()} variant="overlay" />` and `<PublicFooter onBookingClick={() => openModal()} />`. Wired all booking actions to `<BookingFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialComment={bookingComment} />` (auto-passes typed registration and selected symptom recommendation).
  - **Design Tokens & Shared Elements**: Inherits Level 0 `--bb-*` tokens and `.bb-*` elements (`.bb-hero`, `.bb-wrap`, `.bb-eyebrow`, `.bb-eyebrow--dark`, `.bb-h1`, `.bb-h2`, `.bb-accent`, `.bb-lead`, `.bb-lead--dark`, `.bb-btn.bb-btn--teal`, `.bb-btn.bb-btn--ember`, `.bb-btn.bb-btn--ember-solid`, `.bb-trust-row`, `.bb-process-grid`, `.bb-card--trust`).
  - **AC-Service Features Preserved & Hardened**:
    - Hero media connects `ac-hero-bg.webp` and `ac-hero-bg.jpg` under `.bb-hero__media` with canonical dual scrim overlay, 3 value badges (`Bibehållen nybilsgaranti`, `Certifierad kylkompetens`, `Fasta priser`), optional registration number input, and 3-pillar local trust row (`DollarIcon`, `ShieldHeartIcon`, `MapPinIcon`).
    - Value proposition cards (`.bilservice__card-grid-3`, `.bilservice__card--teal`).
    - Interactive symptom selector (`.bilservice__symptom-grid`) on aqua canvas (`.bilservice__section--aqua`) with dynamic status recommendation banner and direct booking CTA.
    - 3-card pricing grid (`.bilservice__price-grid`, `.bilservice__price-card`): AC-service (1 495 kr), AC-rengöring (800 kr arbetskostnad + cabin filter material note), and OBD-diagnostik (500 kr). Followed by repair vs service advisory and R134a/R1234yf refrigerant note.
    - 4-step workshop process (`.bb-process-grid`).
    - Reassurance split card (`.bilservice__service-card` with `ac-manometers-on-engine.jpg` workshop photo and 5-point certified checklist).
    - Advice tips 3-card grid (`.bilservice__card-grid-3`) covering R134a/R1234yf identification, recommended service frequency, and running AC in winter.
    - Customer reviews via canonical `<GoogleReviewsCard variant="card" />`.
    - FAQ accordion (`<BiltjansterFaq id="ac-service-faq" />`).
    - Closing reassurance card (`.bb-card--trust`).
  - **Verification**:
    - `npm run typecheck`: 0 errors.
    - `npm run build`: Built cleanly with 0 errors (9.61s).
    - `npm run test:browser -- tests/browser/ac-service.visual.spec.ts`: 3/3 Playwright tests passed across 1440px desktop, 768px tablet, and 390px mobile viewports with $\Delta = 0\text{px}$ horizontal overflow. Modal opening and symptom selection verified.
    - Full Bilservice suite (Felsökning, Däckservice, AC-service): 9/9 Playwright tests passed across all 3 viewports.

- **Rebuilt Tire Service page (`DackservicePage.tsx` at `/dackservice`) onto `ServiceReparationerPage.css`**:
  - **Shared Bilservice Family Template**: Rebuilt `/dackservice` onto `ServiceReparationerPage.css` (`.bilservice__*`), completely eliminating transitional `DackservicePage.css` and all legacy `.services-page__*` and `.tyres-page__*` selectors. 0 lines added, changed, or deleted in `client/src/css/index.css` (100% frozen).
  - **Canonical Public Shell**: Mounted `<PublicHeader onBookingClick={() => openModal()} variant="overlay" />` and `<PublicFooter onBookingClick={() => openModal()} />`. Wired all booking actions to `<BookingFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialComment={bookingComment} />`.
  - **Design Tokens & Shared Elements**: Inherits Level 0 `--bb-*` tokens and `.bb-*` elements (`.bb-hero`, `.bb-wrap`, `.bb-eyebrow`, `.bb-eyebrow--dark`, `.bb-h1`, `.bb-h2`, `.bb-accent`, `.bb-lead`, `.bb-lead--dark`, `.bb-btn.bb-btn--teal`, `.bb-btn.bb-btn--ember`, `.bb-btn.bb-btn--ember-solid`, `.bb-trust-row`, `.bb-process-grid`, `.bb-card--trust`).
  - **Tire Service Features Preserved & Hardened**:
    - Hero media connects `tires-hero-bg.webp` and `tires-hero-bg.jpg` under `.bb-hero__media` with canonical dual scrim overlay and 3-pillar local trust row (`UsersIcon`, `MapPinIcon`, `ClockIcon`).
    - Dedicated winter tire legal requirements banner (`.bilservice__dates-banner` with 1 dec–31 mar, 1 okt–15 apr, 16 apr–30 sep, and 3PMSF requirement).
    - 6-card tire service grid (`.bilservice__tire-grid`, `.bilservice__tire-card`) with real workshop photos (`wheel-change`, `storage-rack`, `refitting`, `wheel-alignment`, `wheel-balancing`, `puncture-repair`), exact pricing (Hjulskifte 350/500 kr, Däckförvaring 890/990 kr, Omläggning från 180 kr, Hjulinställning från 1 495 kr), and contextual booking button actions.
    - Däckhotell highlight card (`.bilservice__storage-card`) on aqua background with 4-point benefits checklist and direct booking CTA.
    - Legacy reassurance split card (`.bilservice__service-card` with `tire-storage-wheel.jpg` and 5 service checklist items with amber checkmarks).
    - Advice section (`.bilservice__advice-grid`) covering cold tire pressure, legal vs recommended tread depths (1.6 mm / 3 mm vs 3–5 mm), 4-digit DOT code decoding, and rubber aging limits (6–10 years).
    - 5-step workshop process (`.bb-process-grid`).
    - Customer reviews via canonical `<GoogleReviewsCard variant="card" />`.
    - FAQ accordion (`<BiltjansterFaq id="dackservice-faq" />`).
    - Closing reassurance card (`.bb-card--trust`).
  - **Verification**:
    - `npm run typecheck`: 0 errors.
    - `npm run build`: Built cleanly with 0 errors (10.38s).
    - `npm run test:browser -- tests/browser/dackservice.visual.spec.ts`: 3/3 Playwright tests passed across 1440px desktop, 768px tablet, and 390px mobile viewports with $\Delta = 0\text{px}$ horizontal overflow. Modal opening and 6 tire service cards verified.


### 2026-09-19 — Antigravity (Step 4: Felsökning Rebuild — Bilservice Family Sibling 1 of 3)

- **Rebuilt Diagnostics guide page (`FelsokningPage.tsx` at `/felsokning`) onto `ServiceReparationerPage.css`**:
  - **Shared Bilservice Family Template**: Rebuilt `/felsokning` onto `ServiceReparationerPage.css` (`.bilservice__*`), completely eliminating all legacy `.services-page__*` and `.diagnostics-page__*` selectors. 0 lines added, changed, or deleted in `client/src/css/index.css` (100% frozen).
  - **Canonical Public Shell**: Mounted `<PublicHeader onBookingClick={openModal} variant="overlay" />` and `<PublicFooter onBookingClick={openModal} />`. Wired all booking actions to `<BookingFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialComment={recommendation ? \`Önskad hjälp: \${recommendation}\` : 'Gäller felsökning & diagnostik'} />`.
  - **Design Tokens & Shared Elements**: Inherits Level 0 `--bb-*` tokens and `.bb-*` elements (`.bb-hero`, `.bb-wrap`, `.bb-eyebrow--dark`, `.bb-h1`, `.bb-h2`, `.bb-accent`, `.bb-lead`, `.bb-lead--dark`, `.bb-btn.bb-btn--teal`, `.bb-btn.bb-btn--ember`, `.bb-btn.bb-btn--ember-solid`, `.bb-trust-row`, `.bb-process-grid`, `.bb-card--trust`).
  - **Diagnostics Features Preserved & Hardened**:
    - Hero OBD code readout card (`P0128 Kylvätsketemperatur`, `P0171 Bränslesystem för magert`) integrated cleanly into `.bb-hero__bottom` alongside `.bb-trust-row`.
    - Category grid with 6 teal gradient cards (`.bilservice__card-grid-3`, `.bilservice__card--teal`).
    - Interactive symptom selector (`.bilservice__symptom-grid`) on aqua background (`.bilservice__section--aqua`), updating `recommendation` and displaying dynamic status recommendation banner with direct booking CTA.
    - Guidance stats 4-card grid (`.bilservice__stat-grid`).
    - Capabilities checklist split card (`.bilservice__service-card` with `diagnostics-obd-connector-closeup` photo and 6-item checklist with amber checkmarks).
    - 5-step workshop process (`.bb-process-grid`).
    - FAQ accordion (`<BiltjansterFaq id="felsokning-faq" />`).
    - Closing reassurance trust card (`.bb-card--trust`).
  - **Verification**:
    - `npm run typecheck`: 0 errors.
    - `npm run build`: Built cleanly with 0 errors (10.85s).
    - `npm run test:browser -- tests/browser/felsokning.visual.spec.ts`: 3/3 Playwright tests passed across 1440px desktop, 768px tablet, and 390px mobile viewports with $\Delta = 0\text{px}$ horizontal overflow. Modal opening/closing and symptom selection verified.


### 2026-09-19 — Antigravity (Step 5 COMPLETE: Drivaxel & drivknutar Rebuild — Guide Family 10/10)

- **Rebuilt Drivaxel & drivknutar page (`DrivaxelDrivknutarPage.tsx` at `/drivaxel-drivknutar`) onto `ServiceGuideTemplate.css`**:
  - **Shared Template 100% Completed**: Migrated the 10th and final guide `/drivaxel-drivknutar` onto `ServiceGuideTemplate.css` (`.service-guide__*`), eliminating `./DrivaxelDrivknutarPage.css` and all legacy `.services-page__*` selectors. **Step 5 is now 100% Complete with all 10 technical guides living on the shared template.** 0 lines added, changed, or deleted in `client/src/css/index.css` (100% frozen).
  - **Canonical Public Shell**: Mounted `<PublicHeader onBookingClick={openModal} variant="overlay" />` and `<PublicFooter onBookingClick={openModal} />`. Connected all booking actions to `<BookingFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialComment="Gäller drivaxel och drivknutar" />`.
  - **Design Tokens & Shared Elements**: Inherits Level 0 `--bb-*` tokens and `.bb-*` elements (`.bb-wrap`, `.bb-eyebrow`, `.bb-h1`, `.bb-accent`, `.bb-lead`, `.bb-btn.bb-btn--teal`, `.bb-btn.bb-btn--ember`).
  - **Hero Media**: Reused existing production photo asset pair (`cv-joint-workbench.webp` and `cv-joint-workbench.jpg`) inside `<picture data-image-slot="driveshaft-hero">` alongside the workshop reassurance badge card.
  - **Preserved Approved Copy**: Retained all Swedish copy verbatim across parts, benefits, warning symptoms (with urgent/featured indicators), grease-leak tip strip, service checklist, guidance cards, safety strip, 5-step workshop process, and FAQs.
  - **Verification**:
    - `npm --prefix client run typecheck`: 0 errors.
    - `npm --prefix client run build`: Built cleanly with 0 errors (9.68s).
    - `npx --prefix client playwright test --config client/playwright.config.ts tests/browser/drivaxel.visual.spec.ts`: 3/3 Playwright tests passed across 1440px desktop, 768px tablet, and 390px mobile viewports with $\Delta = 0\text{px}$ horizontal overflow. Modal opening/closing verified.


### 2026-09-19 — Antigravity (Step 5: Styrning & kulleder Rebuild — Guide Family Scaling)

- **Rebuilt Styrning & kulleder page (`StyrningKullederPage.tsx` at `/styrning-kulleder`) onto `ServiceGuideTemplate.css`**:
  - **Shared Template Scaled**: Migrated `/styrning-kulleder` onto `ServiceGuideTemplate.css` (`.service-guide__*`), eliminating the old `./StyrningKullederPage.css` import and all legacy `.services-page__*` selectors. 0 lines added, changed, or deleted in `client/src/css/index.css` (100% frozen).
  - **Canonical Public Shell**: Mounted `<PublicHeader onBookingClick={openModal} variant="overlay" />` and `<PublicFooter onBookingClick={openModal} />`. Connected all booking actions to `<BookingFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialComment="Gäller styrning & kulleder" />`.
  - **Design Tokens & Shared Elements**: Inherits Level 0 `--bb-*` tokens and `.bb-*` elements (`.bb-wrap`, `.bb-eyebrow`, `.bb-h1`, `.bb-accent`, `.bb-lead`, `.bb-btn.bb-btn--teal`, `.bb-btn.bb-btn--ember`).
  - **Hero Media & Placeholders**: Utilizes standard `MediaPlaceholder` components (`Styrningsarbete i verkstaden`, `Framvagnens leder & servokomponenter`, `Inspektion av framvagn och styrleder`) alongside the workshop trust badge card.
  - **Preserved Approved Copy**: Retained all Swedish copy verbatim across parts, benefits, warning symptoms (with urgent/featured indicators), steering pull tip strip, service checklist, guidance cards, safety strip, 5-step workshop process, and FAQs.
  - **Verification**:
    - `npm --prefix client run typecheck`: 0 errors.
    - `npm --prefix client run build`: Built cleanly with 0 errors (9.93s).
    - `npx --prefix client playwright test --config client/playwright.config.ts tests/browser/styrning-kulleder.visual.spec.ts`: 3/3 Playwright tests passed across 1440px desktop, 768px tablet, and 390px mobile viewports with $\Delta = 0\text{px}$ horizontal overflow. Modal opening/closing verified.


### 2026-09-19 — Antigravity (Step 5: Hjullagerbyte Rebuild — Guide Family Scaling)

- **Rebuilt Hjullagerbyte page (`HjullagerbytePage.tsx` at `/hjullagerbyte`) onto `ServiceGuideTemplate.css`**:
  - **Shared Template Scaled**: Migrated `/hjullagerbyte` onto `ServiceGuideTemplate.css` (`.service-guide__*`), eliminating the old `./HjullagerbytePage.css` import and all legacy `.services-page__*` selectors. 0 lines added, changed, or deleted in `client/src/css/index.css` (100% frozen).
  - **Canonical Public Shell**: Mounted `<PublicHeader onBookingClick={openModal} variant="overlay" />` and `<PublicFooter onBookingClick={openModal} />`. Connected all booking actions to `<BookingFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialComment="Gäller hjullagerbyte" />`.
  - **Design Tokens & Shared Elements**: Inherits Level 0 `--bb-*` tokens and `.bb-*` elements (`.bb-wrap`, `.bb-eyebrow`, `.bb-h1`, `.bb-accent`, `.bb-lead`, `.bb-btn.bb-btn--teal`, `.bb-btn.bb-btn--ember`).
  - **Hero Media & Placeholders**: Utilizes standard `MediaPlaceholder` components (`Hjullagerarbete i verkstaden`, `Hjullagrets komponenter & nav`, `Inspektion och kontroll av hjullager`) alongside the workshop trust badge card.
  - **Preserved Approved Copy**: Retained all Swedish copy verbatim across parts, benefits, warning symptoms (with urgent/featured indicators), noise tip strip, service checklist, guidance cards, safety strip, 5-step workshop process, and FAQs.
  - **Verification**:
    - `npm --prefix client run typecheck`: 0 errors.
    - `npm --prefix client run build`: Built cleanly with 0 errors (10.63s).
    - `npx --prefix client playwright test --config client/playwright.config.ts tests/browser/hjullager.visual.spec.ts`: 3/3 Playwright tests passed across 1440px desktop, 768px tablet, and 390px mobile viewports with $\Delta = 0\text{px}$ horizontal overflow. Modal opening/closing verified.


### 2026-09-19 — Antigravity (Step 5: Stötdämpare & fjädrar Rebuild — Guide Family Scaling)

- **Rebuilt Stötdämpare & fjädrar page (`StodampareFjadrarPage.tsx` at `/stodampare-fjadrar`) onto `ServiceGuideTemplate.css`**:
  - **Shared Template Scaled**: Migrated `/stodampare-fjadrar` onto `ServiceGuideTemplate.css` (`.service-guide__*`), eliminating the old `./StodampareFjadrarPage.css` import and all legacy `.services-page__*` selectors. 0 lines added, changed, or deleted in `client/src/css/index.css` (100% frozen).
  - **Canonical Public Shell**: Mounted `<PublicHeader onBookingClick={openModal} variant="overlay" />` and `<PublicFooter onBookingClick={openModal} />`. Connected all booking actions to `<BookingFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialComment="Gäller stötdämpare och fjädrar" />`.
  - **Design Tokens & Shared Elements**: Inherits Level 0 `--bb-*` tokens and `.bb-*` elements (`.bb-wrap`, `.bb-eyebrow`, `.bb-h1`, `.bb-accent`, `.bb-lead`, `.bb-btn.bb-btn--teal`, `.bb-btn.bb-btn--ember`).
  - **Hero Media & Placeholders**: Utilizes standard `MediaPlaceholder` components (`Fjädringsarbete i verkstaden`, `Hjulupphängningens delar`, `Inspektion av stötdämpare och fjädrar`) alongside the workshop trust badge card.
  - **Preserved Approved Copy**: Retained all Swedish copy verbatim across parts, benefits, warning symptoms (with urgent/featured indicators), bounce-test tip strip, service checklist, guidance cards, safety strip, 5-step workshop process, and FAQs.
  - **Verification**:
    - `npm --prefix client run typecheck`: 0 errors.
    - `npm --prefix client run build`: Built cleanly with 0 errors (10.50s).
    - `npx --prefix client playwright test --config client/playwright.config.ts tests/browser/stodampare.visual.spec.ts`: 3/3 Playwright tests passed across 1440px desktop, 768px tablet, and 390px mobile viewports with $\Delta = 0\text{px}$ horizontal overflow. Modal opening/closing verified.


### 2026-09-19 — Antigravity (Phase 2 / Step 5: Bilbatteri Rebuild — Guide Family Scaling)

- **Rebuilt Bilbatteri page (`BilbatteriPage.tsx` at `/bilbatteri`) onto `ServiceGuideTemplate.css`**:
  - **Shared Template Scaled**: Successfully migrated `/bilbatteri` to `ServiceGuideTemplate.css` (`.service-guide__*`) without inventing a new CSS file or modifying shared styles. 0 lines added, changed, or deleted in `client/src/css/index.css` (100% frozen).
  - **Canonical Public Shell**: Mounted `<PublicHeader onBookingClick={openModal} variant="overlay" />` and `<PublicFooter onBookingClick={openModal} />`. Wired all booking CTAs to `<BookingFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialComment="Gäller bilbatteri" />`.
  - **Design Tokens & Shared Elements**: Inherits Level 0 `--bb-*` tokens and `.bb-*` elements (`.bb-wrap`, `.bb-eyebrow`, `.bb-h1`, `.bb-accent`, `.bb-lead`, `.bb-btn.bb-btn--teal`, `.bb-btn.bb-btn--ember`).
  - **Production Workshop Imagery**: Connected existing production photo assets across hero (`battery-terminal-bolt-tightening.{webp,jpg}`), intro/components (`battery-multimeter-test-workshop.{webp,jpg}`), and symptoms/testing (`battery-terminal-voltage-closeup.{webp,jpg}`).
  - **Preserved Approved Copy**: Retained all Swedish copy verbatim across battery types, benefits, warning signs (with urgent and featured modifiers), service checklist, guidance stats cards (with `.service-guide__info-flag`), 5-step process, underhållsråd safety strip, and FAQs.
  - **Verification**:
    - `npm --prefix client run typecheck`: 0 errors.
    - `npm --prefix client run build`: Built cleanly with 0 errors (10.55s).
    - `npm --prefix client run test:browser -- tests/browser/bilbatteri.visual.spec.ts`: 3/3 Playwright tests passed across 1440px desktop, 768px tablet, and 390px mobile viewports with $\Delta = 0\text{px}$ horizontal overflow. Modal interaction verified.

### 2026-09-19 — Antigravity (Phase 2 / Step 5: Kamrem Rebuild — First Sibling Proof)

- **Rebuilt Kamrem page (`KamremPage.tsx` at `/kamrem`) onto `ServiceGuideTemplate.css`**:
  - **Shared Template Proved**: Successfully proved `ServiceGuideTemplate.css` on the First Sibling Proof (`/kamrem`) without inventing a new CSS file. 0 lines added, changed, or deleted in `client/src/css/index.css` (100% frozen).
  - **Canonical Public Shell**: Mounted `<PublicHeader onBookingClick={openModal} variant="overlay" />` and `<PublicFooter onBookingClick={openModal} />`. Wired all booking CTAs to `<BookingFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialComment="Gäller kamremsbyte" />`.
  - **Design Tokens & Shared Elements**: Inherits Level 0 `--bb-*` tokens and `.bb-*` elements (`.bb-wrap`, `.bb-eyebrow`, `.bb-h1`, `.bb-accent`, `.bb-lead`, `.bb-btn.bb-btn--teal`, `.bb-btn.bb-btn--ember`).
  - **Hero Media**: Reused existing production workshop assets `timing-belt-in-hand.webp` and `timing-belt-in-hand.jpg` inside `<picture data-image-slot="timing-belt-hero">` with workshop reassurance badge card.
  - **Preserved Approved Copy**: Retained all Swedish copy verbatim across parts, benefits, warning symptoms, service items, guidance, 5-step process, and FAQs.
  - **TypeScript & Verification**:
    - Installed `typescript`, `@types/react`, `@types/react-dom` in `client/` devDependencies.
    - `npm --prefix client run typecheck`: 0 errors.
    - `npm --prefix client run build`: Built cleanly with 0 errors (9.99s).
    - `npm --prefix client run test:browser -- tests/browser/kamrem.visual.spec.ts`: 3/3 Playwright tests passed across 1440px desktop, 768px tablet, and 390px mobile viewports with $\Delta = 0\text{px}$ horizontal overflow. Modal interaction verified.

### 2026-09-18 — Antigravity (Documentation Synchronization & Pre-Phase 2 Alignment)

- **Roadmap & Architecture Synchronization**:
  - `HITL_Temporary_roadmap.md`:
    - Updated Step 3 to `[COMPLETED & LOCKED]` (both `/kontakt` and `/om-oss` are fully rebuilt from scratch on independent CSS islands, verified via Playwright, and live).
    - Updated Step 6 to `[IN PROGRESS: Biltjänster & Bärgning COMPLETE]` reflecting that `/bargning` is rebuilt, token-aligned, and verified with Playwright. Remaining Step 6 pages are `Bilar till salu` and `Galleri`.
    - Clarified Step 5 with `Kamrem` as the single First Sibling Proof.
  - `docs/CSS_OWNERSHIP.md`:
    - Corrected `/kontakt` class prefix in §2 table from `.contact-page__*` to `.kontakt-page__*` (preventing collision with legacy `index.css`).
    - Clarified `BiltjansterPage.css` (`.biltjanster-hub__*`) in §2 list.
  - `docs/AGENT_HANDOFF.md`:
    - Synchronized unique pages list to include completed `Om oss` (`/om-oss`) and `Bärgning` (`/bargning`).
    - Aligned immediate next task options with Phase 2 First Sibling Proof (`Kamrem`).
- **Phase 1 Hardening (Commit `a24a481e`)**:
  - `BookingForm.tsx`: Reverted `toISOString().split('T')[0]` date serialization to avoid timezone shift; preserved clean `Date | null` typing.
  - `PublicFooter.css`: Added explicit `width: 18px; height: 18px` for `.bb-footer__social-btn svg` (eliminated implicit sizing risk).
  - `.githooks/pre-commit`: Replaced hard line limit on `AGENTS.md` with mechanical Tailwind boundary check (`check_no_tailwind_in_public`) scanning staged public TSX files for utility classes while ignoring BEM classes.
- **Verification**:
  - `npm --prefix client run typecheck`: 0 errors.
  - `npm --prefix client run build`: 0 errors (1.85s).
  - `npm --prefix client run test:browser`: 12/12 Playwright tests passed with $\Delta = 0\text{px}$ overflow.
  - `client/src/css/index.css`: 100% frozen (0 lines changed).

### 2026-09-18 — Antigravity (Phase 1: Foundation Validation, Manifest Trap Neutralization & TypeScript Baseline Hardening)

- **Root Manifest Trap Neutralized (F-00, HIGH RISK)**:
  - Root `package.json`, `index.html`, `vite.config.ts`, `tsconfig.json` renamed to `*.disabled` via `git mv`.
  - Confirmed `client/` is the sole application directory running React 18.2.0 and Tailwind CSS 3.4.17.
  - Eliminated the risk of incoming agents generating Tailwind v4 syntax (`@theme`) or React 19 patterns.
- **TypeScript Baseline Enforced & Hardened**:
  - Added `"typecheck": "tsc -p tsconfig.app.json --noEmit"` to `client/package.json`.
  - Fixed 22 true TypeScript errors previously masked by `vite build` esbuild transpilation:
    - `PublicFooter.tsx`: Removed invalid `size` props from icons (managed cleanly by CSS).
    - `AvgassystemPage.tsx`: Explicitly typed `symptoms` (`SymptomItem`) and `infoCards` (`InfoCardItem`).
    - `BromssystemPage.tsx`: Explicitly typed `symptoms` (`SymptomItem`).
    - `KopplingPage.tsx`: Explicitly typed `symptoms` (`SymptomItem` with optional `featured`).
    - `BookingForm.tsx`: Typed `services` state (`Array<{ id: string | number; name: string }>`), `selectedDate` (`Date | null`), formatted ISO date string in submission, and handled `TimePicker` value conversion cleanly.
    - `BookingManagement.tsx`: Narrowed `sortConfig` before `.sort` callback and handled optional properties with empty string fallback.
    - `GoogleReviews.tsx`: Removed unused `React` default import.
    - `ServicesPage.tsx`: Replaced obsolete `JSX.Element` namespace usage with `ReactNode`.
  - Typecheck baseline: **0 errors** (`npm --prefix client run typecheck` passes cleanly).
- **Architectural Policy & Precedence Codified**:
  - Updated `AGENTS.md` with:
    - 5-layer document precedence hierarchy (`AGENTS.md` -> `HITL_Temporary_roadmap.md` -> `docs/CSS_OWNERSHIP.md` -> `docs/DESIGN_SYSTEM.md` -> `docs/AGENT_HANDOFF.md`).
    - Application root & manifest safety declaration.
    - Strict Tailwind policy (permitted only in `/admin`, strictly forbidden on public pages).
    - Guide Family architecture definition (shared parent is `ServiceGuideTemplate.css`, not a shared TSX layout component; note on sibling drift risk).
    - Mandatory TypeScript typecheck rule.
- **Readiness Verdict & Recommendation**:
  - Verdict conditioned to `READY WITH NAMED CONSTRAINTS`.
  - Recommended Phase 2 execution begins with **Kamrem** (`/kamrem`) alone as the single First Sibling Proof before scaling to remaining guides.
- **Strict CSS Safety**: `client/src/css/index.css` remained 100% frozen (0 lines changed).
- **Verification**:
  - `npm --prefix client run typecheck`: 0 errors.
  - `npm --prefix client run build`: Built cleanly with 0 errors in 1.89s.
  - `npm --prefix client run test:browser`: 12/12 Playwright tests passed across 1440px, 768px, 390px with $\Delta = 0\text{px}$ horizontal overflow.

### 2026-09-18 — Antigravity (Second Pass: Full-Page Canonical Alignment & Token Audit on /bargning)

- **Standardized standalone Bärgning page (`BargningPage.tsx` / `BargningPage.css`) to Landing truth & canonical tokens**:
  - **Typography & Display Headings**:
    - Standardized H1 with `.bb-h1` and `.bb-accent` (`Bärgning & <span className="bb-accent">Biltransport</span>`).
    - Standardized H2 headings across all sections (`.bb-h2`).
    - Removed `text-transform: uppercase` from `.bargning-page__quick-step-heading` to preserve natural mixed-case Archivo display typography.
  - **Eyebrows & Accents**:
    - Replaced duplicate process eyebrow with canonical `<p className="bb-eyebrow bb-eyebrow--dark">Steg för steg</p>`.
    - Maintained light-surface `<p className="bb-eyebrow">Din lokala verkstad</p>` with teal-800 text and teal dash.
  - **Shared Button Variants (`shared-elements.css`)**:
    - Replaced `.bb-btn--teal` on the white intake card with canonical `.bb-btn.bb-btn--ember-solid` (the designated button pattern for light surfaces).
    - Preserved dark-surface `.bb-btn.bb-btn--teal` and `.bb-btn.bb-btn--ember` across hero, showcase, used cars, and closing CTA.
  - **Interactive States & Focus Rings**:
    - Added `:focus-visible` with `var(--bb-color-focus)` (`outline: 3px solid var(--bb-color-focus); outline-offset: 3px;`) to `.bargning-page__showcase-book-link` and `.bargning-page__fact-link`.
    - Standardized background-color to `var(--bb-color-ink-950)`.
  - **Strict CSS Safety**: `client/src/css/index.css` remained 100% frozen (0 lines changed).
- **Verification**:
  - `npm --prefix client run build`: Built cleanly with 0 errors in 1.84s.
  - Playwright visual test (`client/tests/browser/bargning.visual.spec.ts`): All 3 tests passed in 3.2s with $\Delta = 0\text{px}$ horizontal overflow across 1440px desktop, 768px tablet, and 390px mobile viewports. Modal interaction verified.

### 2026-09-18 — Antigravity (Rebuilt "Bärgning & Biltransport" /bargning from scratch against final mockup)

- **Rebuilt Bärgning page (`BargningPage.tsx` / `BargningPage.css`) from approved visual mockup**:
  - **CSS Safety & Architectural Isolation**: Built completely from scratch as an isolated CSS island with unique class prefix `.bargning-page__*`. Zero touches or dependencies on legacy `index.css` (0 lines changed). Consumes Level 0 `--bb-*` design tokens from `client/src/styles/design-tokens.css` and canonical shared patterns (`.bb-*`) from `client/src/styles/shared-elements.css`.
  - **Public Shell & Modal**: Mounted canonical `PublicHeader` and `PublicFooter`, wired all booking CTAs to `BookingFormModal`, featured prominent emergency phone number `070-553 33 95`.
  - **Existing Asset Reuse**: Reused existing optimized WebP/JPG assets for hero/closing backgrounds (`towing-hero-bg`), Iveco tow truck (`tow-truck-at-workshop`), workshop car lift (`workshop-car-on-lift`), and used car banner (`peugeot-307-cc-side-profile`).
  - **Section 1: Hero (`.bargning-page__hero`)**: Natural mixed-case H1 `Bärgning & Biltransport i <span className="bb-accent">Gävle med omnejd</span>`, amber pill eyebrow `Snabb assistans vid haveri eller olycka`, primary teal phone CTA (`.bb-btn--teal`), secondary booking button (`.bb-btn--ember`), and 3 trust badges (Snabb utryckning, Trygg transport, Direkt till verkstad).
  - **Section 2: Quick 3-Step Action Bar (`.bargning-page__quick-steps`)**: 3 high-contrast numbered action steps with amber numeric badges (`01`, `02`, `03`), circular teal icons, and amber connector arrows.
  - **Section 3: Showcase Split Card (`.bargning-page__showcase`)**: Responsive split card featuring Iveco tow truck photo with floating badge "Egen bärgningsbil i Gävle", dark petrol card with service pill, 2-column feature checkmarks, emergency phone CTA and booking link.
  - **Section 4: Towing Scenarios Grid (`.bargning-page__scenarios`)**: 4 distinct scenario cards (Akut motorstopp / haveri, Punktering & däckskador, Transport till verkstad, Starhhjälp & mindre åtgärder) matching mockup colors (clean light card, teal gradient card, dark petrol card, sunset road photo card).
  - **Section 5: Step-by-Step Workshop Protocol (`.bargning-page__process`)**: Dark petrol band with technical grid, 3 numbered horizontal cards detailing workflow from roadside to inspection and finished repair.
  - **Section 6: Workshop Intake Reassurance (`.bargning-page__workshop-intake`)**: Workshop lift photo, reassuring story copy, link to `/om-oss`, and workshop facts checklist panel.
  - **Section 7: Used Cars Cross-Sell Banner (`.bargning-page__cars-banner`)**: Clean promo card with Peugeot 307 CC graphic and direct link to `/bilar-till-salu`.
  - **Section 8: Closing Emergency CTA (`.bargning-page__cta`)**: Dark petrol closing card over towing background with dual action buttons.
- **Verification**:
  - `npm --prefix client run build`: Built cleanly with 0 errors in 1.74s.
  - Playwright visual test (`client/tests/browser/bargning.visual.spec.ts`): Verified across 1440px desktop, 768px tablet, and 390px mobile viewports with $\Delta = 0\text{px}$ horizontal overflow across all checks. Booking modal trigger verified. Full-page screenshots generated and verified.

### 2026-09-18 — Antigravity (Second Pass: Full-Page Canonical Alignment & Token Cleanup on /om-oss)

- **Standardized standalone "Om oss" page (`AboutPage.tsx` / `AboutPage.css`) to Landing truth & canonical tokens**:
  - **Mixed-Case Display Headings & Accents**: Standardized H1 to natural mixed-case `Din lokala och <span className="bb-accent">personliga</span> bilverkstad i Brynäs` via `.bb-h1` and `.bb-accent`. Removed `text-transform: uppercase` from `.omoss-page__hero-title`.
  - **Shared Design Elements (`shared-elements.css`)**:
    - Section containers wrapped in canonical `.bb-wrap`.
    - Eyebrows converted to semantic `<p className="bb-eyebrow bb-eyebrow--dark omoss-page__hero-eyebrow">` in hero and process, and `<p className="bb-eyebrow">` in story and principles.
    - Section titles and leads wired to `.bb-h2`, `.bb-lead`, and `.bb-lead--dark`.
    - Secondary phone CTAs converted to canonical `.bb-btn.bb-btn--ember`.
  - **Design Token Purity & Specificity**:
    - Scoped strictly within `.omoss-page__*`.
    - Cleaned up redundant local eyebrow and button rules in `AboutPage.css` in favor of canonical `.bb-*` classes.
  - **Strict CSS Safety**: `client/src/css/index.css` remained 100% frozen (0 lines changed).
- **Verification**:
  - `npm --prefix client run build`: Built cleanly with 0 errors in 1.87s.
  - Playwright visual test (`client/tests/browser/about.visual.spec.ts`): All tests passed across 1440px desktop, 768px tablet, and 390px mobile with 0px horizontal overflow.

### 2026-09-18 — Antigravity (Second Pass: Full-Page Canonical Alignment & Token Cleanup on /kontakt)

- **Standardized standalone Contact page (`ContactPage.tsx` / `ContactPage.css`) to Landing truth & canonical tokens**:
  - **CSS Island & Specificity**: Scoped completely within `.kontakt-page__*`. Verified `:where()` resets on element selectors to prevent specificity leaks against shared `.bb-*` components.
  - **Design Token Purity**: Eliminated non-canonical / phantom token references in `ContactPage.css`:
    - Replaced `var(--bb-font-sans)` with canonical `var(--bb-font-body)` (`'Manrope', Arial, sans-serif`).
    - Replaced `var(--bb-color-border-subtle)` with clean RGBA borders (`rgba(7, 20, 22, 0.08)` on light cards, `rgba(255, 255, 255, 0.08)` on dark cards).
    - Replaced undefined `var(--bb-color-teal-300)` / `var(--bb-color-teal-400)` with `var(--bb-color-teal-500)` and `var(--bb-color-focus)`.
    - Standardized `.kontakt-page__success-icon` to canonical `var(--bb-color-teal-500)`.
  - **Buttons & Shared Patterns**:
    - Hero actions: `.bb-btn.bb-btn--teal` ("Boka tid") and `.bb-btn.bb-btn--ember` ("Ring 070-553 33 95").
    - Form submit button: `.bb-btn.bb-btn--ember-solid` (canonical for light-surface actions).
    - Closing CTA card: `.bb-btn.bb-btn--teal` and `.bb-btn.bb-btn--ember`.
    - Eyebrow: `.bb-eyebrow.bb-eyebrow--dark` in hero and closing, `.bb-eyebrow` on light step card.
    - H1 & Accents: `.bb-h1` with `.bb-accent` ("Hör av dig till Brynäs Bilservice").
  - **Strict CSS safety**: `client/src/css/index.css` remained completely untouched (0 lines changed).
- **Verification**:
  - `npm --prefix client run build`: Passed cleanly with 0 errors in 1.88s.
  - Playwright visual tests (`client/tests/browser/contact.visual.spec.ts`): Verified across 1440px desktop, 768px tablet, and 390px mobile viewports: $\Delta = 0\text{px}$ horizontal overflow across all checks. Booking modal trigger verified.


### 2026-09-18 — Antigravity (Om oss `/om-oss` Rebuilt from scratch against approved mockup)

- **Rebuilt Om oss page (`AboutPage.tsx` / `AboutPage.css`) from approved visual mockup**:
  - **CSS Safety & Independence**: Built completely from scratch as an isolated CSS island prefixed with `.omoss-page__*`. Zero reliance or touches to legacy `index.css` (0 lines changed). Consumes canonical design tokens `--bb-*` from `client/src/styles/design-tokens.css` and shared patterns from `client/src/styles/shared-elements.css`.
  - **Public Shell & Modal**: Wrapped in canonical `PublicHeader` and `PublicFooter`, wired all "Boka tid" CTAs to canonical `BookingFormModal`.
  - **Section 1: Hero (`.omoss-page__hero`)**: Archivo 800 title `Din lokala och <span class="omoss-page__teal-highlight">personliga</span> bilverkstad i Brynäs`, amber pill eyebrow `Sedan 2021 i Gävle`, primary `.bb-btn--teal` CTA + outline phone button, high-res portrait cutout of Maher Basher, and amber Caveat cursive handwriting quote (`/ Maher`).
  - **Section 2: Trust Strip (`.omoss-page__trust-strip`)**: 4 trust badge cards (Personlig service, Erfarna mekaniker, Tryggt och enkelt, Oberoende verkstad) floating directly below the hero.
  - **Section 3: Workshop Story & Profile (`.omoss-page__story`)**:
    - Left column: Photo card of Maher leaning on workshop bench (optimized from `_incoming-assets/team__maher-i-verkstaden__landskap__v01.png` to `client/src/assets/images/about/maher-workshop-bench.{webp,jpg}`) with overlay badge `Maher Basher | Grundare & mekaniker` + dark petrol card detailing company facts, contact details, opening hours, and Google Maps link.
    - Right column: Eyebrow `— Om Brynäs Bilservice`, heading `En fristående verkstad med hjärtat i Gävle`, 2 copy paragraphs, and pull quote card with amber quote mark.
  - **Section 4: Core Principles (`.omoss-page__principles`)**: Centered header with 4 principle cards on warm-white canvas (Tydlig kommunikation, Omsorg om din bil, Kostnadsförslag före arbete, Oberoende rådgivning).
  - **Section 5: Step-by-Step Process (`.omoss-page__process`)**: Dark petrol band with subtle technical grid, 3 connected step cards with cyan numeric badges (`01`, `02`, `03`) and amber connector arrows.
  - **Section 6: Workshop Gallery Preview (`.omoss-page__gallery-preview`)**: Header with eyebrow `— Bakom garageportarna`, intro text, `.bb-btn--teal` button linking to `/galleri`, and 4-photo responsive card grid.
  - **Section 7: Closing CTA Banner (`.omoss-page__cta`)**: Dark petrol card with `Redo att boka service eller reparation?`, `Boka tid nu` button, `Se alla tjänster` link, and direct phone link.
- **Verification**:
  - `npm --prefix client run build`: Passed cleanly in 2.05s with 0 errors.
  - Playwright visual tests (`client/tests/browser/about.visual.spec.ts`): Verified across 1440px (desktop), 768px (tablet), and 390px (mobile) viewports with strictly 0px horizontal overflow (`scrollWidth <= clientWidth`). Modal trigger verified.


### 2026-09-18 — Antigravity (Second Pass: Hero & Full-Page Canonical Alignment on /oljebyte)

- **Standardized Oljebyte (`/oljebyte`) hero, topic blocks & sections to Landing truth**:
  - **H1 Display Typography**: Converted hardcoded uppercase JSX to natural mixed-case `Oljebyte<br />för en motor<br />som <span className="bb-accent">mår bra</span>` using Archivo 800 `.bb-h1` and `.bb-accent`.
  - **Full-Page Canonical Elements**:
    - Eyebrow wired to `.bb-eyebrow.bb-eyebrow--dark` with canonical amber bar; lead paragraph to `.bb-lead.bb-lead--dark`.
    - Hero, tip-strip, process, and closing CTAs connected to `.bb-btn.bb-btn--teal` and `.bb-btn.bb-btn--ember`.
    - Hero trust items connected to `.bb-icon-bare` with amber accent and drop-shadow.
    - All section containers and 5 deep-dive topic blocks (Ageing, Viscosity, Standards, Types, Misconceptions) wrapped with `.bb-wrap.service-guide__container`.
    - Process section heading standardized to natural mixed-case `Så går det till<br /><span className="bb-accent">hos oss</span>`.
  - **Shared Template Modernization (`ServiceGuideTemplate.css`)**: Standardized `.service-guide__topic-card` border-radius from hardcoded literal `20px` to `var(--bb-radius-card)`.
- **Strict CSS safety**: `client/src/css/index.css` remained completely untouched (0 lines changed).
- **Verification**:
  - `npm --prefix client run build`: Passed cleanly with zero errors in 1.88s.
  - `git diff --check`: Clean, 0 whitespace errors.
  - Playwright Multi-Viewport Verification (`/oljebyte`): 1440px desktop, 768px tablet, and 390px mobile viewports: $\Delta = 0\text{px}$ horizontal overflow across all checks. Secondary button text contrast verified (`rgb(255, 255, 255)` over ember border). Topic cards verified at `border-radius: 20px` with `--bb-shadow-card`.

### 2026-09-18 — Antigravity (Second Pass: Hero & Canonical Alignment on /avgassystem)

- **Standardized Avgassystem (`/avgassystem`) hero & sections to Landing truth**:
  - **H1 Display Typography**: Converted hardcoded uppercase JSX to natural mixed-case `Avgassystem<br />för tyst gång<br />och <span className="bb-accent">ren</span> motor` using Archivo 800 `.bb-h1` and `.bb-accent`.
  - **Kanoniska Knappar**: Connected hero, process, and closing actions to `.bb-btn.bb-btn--teal` ("Boka tid") and `.bb-btn.bb-btn--ember` ("Ring 070-553 33 95").
  - **Eyebrow & Ingress**: Wired eyebrow ("Avgasrening & ljuddämpning") to `.bb-eyebrow.bb-eyebrow--dark` with canonical amber bar, and lead paragraph to `.bb-lead.bb-lead--dark`.
  - **Trust Row**: Connected trust items to glowing `.bb-icon-bare` with amber accent and drop-shadow.
  - **Wrappers & Process Title**: Added `.bb-wrap` across all section inner containers and updated process section title to natural mixed-case `Så går det till<br /><span className="bb-accent">hos oss</span>`.
- **Strict CSS safety**: `client/src/css/index.css` remained completely untouched (0 lines changed).
- **Verification**:
  - `npm --prefix client run build`: Passed cleanly with zero errors in 1.86s.
  - `git diff --check`: Clean, 0 whitespace errors.
  - Playwright Multi-Viewport Verification (`/avgassystem`): 1440px desktop, 768px tablet, and 390px mobile viewports: $\Delta = 0\text{px}$ horizontal overflow across all checks. Secondary button text contrast verified (`rgb(255, 255, 255)` over ember border).

### 2026-09-18 — Antigravity (Second Pass: Hero & Canonical Alignment on /bromssystem)

- **Standardized Bromssystem (`/bromssystem`) hero & sections to Landing truth**:
  - **H1 Display Typography**: Converted hardcoded uppercase JSX to natural mixed-case `Bromssystem<br />när <span className="bb-accent">säkerheten</span><br />måste fungera` using Archivo 800 `.bb-h1` and `.bb-accent`.
  - **Kanoniska Knappar**: Connected hero, process, and closing actions to `.bb-btn.bb-btn--teal` ("Boka bromsservice") and `.bb-btn.bb-btn--ember` ("Ring 070-553 33 95").
  - **Eyebrow & Ingress**: Wired eyebrow ("Bromsservice & säkerhet") to `.bb-eyebrow.bb-eyebrow--dark` with canonical amber bar, and lead paragraph to `.bb-lead.bb-lead--dark`.
  - **Trust Row**: Connected trust items to glowing `.bb-icon-bare` with amber accent and drop-shadow.
  - **Wrappers & Process Title**: Added `.bb-wrap` across all section inner containers and updated process section title to natural mixed-case `Så går det till<br /><span className="bb-accent">hos oss</span>`.
- **Strict CSS safety**: `client/src/css/index.css` remained completely untouched (0 lines changed).
- **Verification**:
  - `npm --prefix client run build`: Passed cleanly with zero errors in 1.73s.
  - `git diff --check`: Clean, 0 whitespace errors.
  - Playwright Multi-Viewport Verification (`/bromssystem`): 1440px desktop, 768px tablet, and 390px mobile viewports: $\Delta = 0\text{px}$ horizontal overflow across all checks. Secondary button text contrast verified (`rgb(255, 255, 255)` over ember border).

### 2026-09-18 — Antigravity (Second Pass: Hero & Canonical Alignment on /koppling & ServiceGuideTemplate.css)

- **Standardized Koppling (`/koppling`) hero & template to Landing truth**:
  - **H1 Display Typography**: Converted hardcoded uppercase JSX to natural mixed-case `Koppling <span className="bb-accent">när</span><br />kraften behöver<br />nå hjulen` and removed `text-transform: uppercase` from `.service-guide__title` and `.service-guide__process-text h2` in `ServiceGuideTemplate.css`.
  - **Kanoniska Knappar**: Connected hero and closing actions to `.bb-btn.bb-btn--teal` and `.bb-btn.bb-btn--ember`. Fixed specificity bug where `.service-guide :where(a)` was overriding `.bb-btn--ember` text color — resolved by making resets truly zero-specificity via `:where(.service-guide) :where(a)` and removing conflicting `border: 1px solid transparent` from `.service-guide__btn`.
  - **Eyebrow & Ingress**: Wired eyebrow to `.bb-eyebrow.bb-eyebrow--dark` with canonical amber bar, and lead paragraph to `.bb-lead.bb-lead--dark`.
  - **Trust Row**: Connected trust items to glowing `.bb-icon-bare` with amber accent and drop-shadow.
  - **Wrappers**: Added `.bb-wrap` across all section inner containers for consistent max-width and responsive margin/padding.
- **Strict CSS safety**: `client/src/css/index.css` remained completely untouched (0 lines changed).
- **Verification**:
  - `npm --prefix client run build`: Passed cleanly with zero errors in 1.72s.
  - `git diff --check`: Clean, 0 whitespace errors.
  - Playwright Multi-Viewport Verification (`/koppling`): 1440px desktop, 768px tablet, and 390px mobile viewports: $\Delta = 0\text{px}$ horizontal overflow across all checks. Secondary button text contrast verified (`rgb(255, 255, 255)` over ember border).

### 2026-09-18 — Antigravity (Modernize ServiceGuideTemplate.css & Retrofit 4 Pilot Guide Pages)

- **Modernized Guide Family Shared Template (`client/src/styles/ServiceGuideTemplate.css`)**:
  - Completely eradicated legacy `--redesign-*` tokens (`--redesign-page`, `--redesign-hero-max`, `--redesign-accent`, `--redesign-ink`, `--redesign-surface`, `--redesign-radius-*`) and `--font-*` properties.
  - Upgraded fully to canonical `--bb-*` design tokens (`--bb-color-page`, `--bb-wrap-max`, `--bb-color-ink-950`, `--bb-color-surface`, `--bb-color-teal-*`, `--bb-color-amber-*`, `--bb-font-display`, `--bb-font-sans`, `--bb-radius-card`, `--bb-radius-control`, `--bb-shadow-card`).
  - Wrapped element resets in `.service-guide :where(...)` for zero-specificity protection.
  - Modernized hero buttons with canonical gradients (`.bb-btn--teal` and `.bb-btn--ember` styling) and light-surface button variations.
- **Retrofitted 4 Pilot Guide Pages (`/koppling`, `/avgassystem`, `/oljebyte`, `/bromssystem`)**:
  - Replaced legacy `Header`/`Footer` with canonical Public Shell (`PublicHeader variant="overlay"` + `PublicFooter`).
  - Preserved 100% of Swedish copy, FAQs, component logic, and booking modal triggers.
- **Strict CSS safety**: `client/src/css/index.css` remained completely untouched (0 lines changed).
- **Verification**:
  - `npm --prefix client run build`: Passed cleanly with zero errors.
  - `git diff --check`: Clean, 0 whitespace errors.
  - Playwright Multi-Viewport Verification across all 4 routes (`/koppling`, `/avgassystem`, `/oljebyte`, `/bromssystem`) at 1440px, 768px, and 390px viewports: $\Delta = 0\text{px}$ horizontal overflow across all 12 checks.
  - Visual inspection confirmed crisp typography, clean hero clearance under sticky `PublicHeader`, and intact interactive modals.

### 2026-09-18 — Antigravity (Retrofit Kontakt page to Canonical Design System & Shared Elements)

- **Standardized Kontakt Page (`/kontakt`) to consume canonical design hierarchy**:
  - **Canonical Design Tokens (`design-tokens.css`)**: Switched all local color codes, radii, spacing, and typography to canonical `--bb-*` tokens (`--bb-color-page`, `--bb-color-ink-950`, `--bb-color-ink-900`, `--bb-color-teal-*`, `--bb-color-amber-*`, `--bb-color-border-subtle`, `--bb-shadow-card`).
  - **Canonical Shared Elements (`shared-elements.css`)**:
    - Hero: Adopted `.bb-hero`, `.bb-hero__media` with picture tag (`about-hero-bg.webp`/`.jpg`), `.bb-hero__shade`, `.bb-hero__content`, `.bb-hero__copy`, and `.bb-hero__actions`.
    - Containers: Replaced all `.kontakt-page__wrap` with canonical `.bb-wrap`.
    - Typography: Converted headings and eyebrows to `.bb-h1`, `.bb-h2`, `.bb-accent`, `.bb-eyebrow`, `.bb-eyebrow--dark`, `.bb-lead`, `.bb-lead--dark`.
    - Buttons: Replaced all `.kontakt-page__btn*` with `.bb-btn`, `.bb-btn--teal`, `.bb-btn--ember`, and `.bb-btn--ember-solid`.
    - Reset safety: Scoped local resets with `:where(...)` to avoid specificity collisions.
  - **Component & Stylesheet Refactoring (`ContactPage.tsx` / `ContactPage.css`)**:
    - Preserved all Swedish copy, contact details, Google Maps URLs, form fields, and booking modal triggers verbatim.
    - Pruned 120+ lines of redundant CSS from `ContactPage.css` (down from 469 lines to 349 lines).
  - **Strict CSS safety**: `client/src/css/index.css` remained completely untouched (0 lines changed).
  - **Verification**: Verified with Playwright across 1440px desktop, 768px tablet, and 390px mobile viewports:
    - $\Delta = 0\text{px}$ horizontal overflow across all viewports.
    - `npm --prefix client run build` passed with zero errors.
    - Visual inspection of captured screenshots confirmed clean typography hierarchy, crisp buttons, proper contrast, and zero layout bugs.


### 2026-09-18 — Antigravity (Canonical Full-Bleed Hero System Elevation: Landing as Truth)

- **Elevated the Landing Page (`/`) Hero into the canonical standard for all full-bleed heroes on independent pages**:
  - **Explicit Scope Boundary (confirmed by Magnus)**: Applies strictly to new independent pages disconnected from legacy `index.css` (currently Landing `/` and Bilservice `/service-reparationer`). Legacy pages connected to `index.css` remain 100% frozen.
  - **Canonical Design Tokens (`design-tokens.css`)**:
    - `--bb-hero-min-height: clamp(700px, 58vw, 850px);`
    - `--bb-hero-min-height-mobile: 780px;`
    - `--bb-hero-copy-max-width: 540px;`
    - `--bb-hero-padding-top: clamp(7rem, 11vw, 9rem);`
    - `--bb-hero-padding-bottom: clamp(2rem, 3.5vw, 3.5rem);`
    - `--bb-hero-padding-top-mobile: 7rem;`
    - `--bb-hero-padding-bottom-mobile: 1.6rem;`
  - **Canonical Shared Elements (`shared-elements.css`)**:
    - Added full `.bb-hero` class system: `.bb-hero`, `.bb-hero__media`, `.bb-hero__shade`, `.bb-hero__content`, `.bb-hero__copy`, `.bb-hero__actions`, and `.bb-hero__bottom`.
    - Bakes in the dual-layer scrim overlay (`90deg` dark-to-translucent ink + `0deg` bottom-to-top vignette) on desktop and mobile.
    - Standardizes the `display: flex; flex-direction: column;` title stacking, mixed-case `.bb-h1`, and `.bb-accent` teal word highlights.
    - Anchors `.bb-trust-row` and conversion widgets in `.bb-hero__bottom` with automatic responsive column stacking at 1120px and 650px.
  - **Refactored Landing Page (`LandingPage.tsx` / `LandingPage.css`)**:
    - Adopted `.bb-hero*` in JSX; pruned all local `.landing-v2__hero*` desktop and mobile rules (~35 lines removed, `LandingPage.css` now down to 117 lines).
  - **Refactored Bilservice Page (`ServiceReparationerPage.tsx` / `ServiceReparationerPage.css`)**:
    - Adopted `.bb-hero` full-bleed structure; wired `PublicHeader` with `variant="overlay"`; anchored `.bb-trust-row` into `.bb-hero__bottom`.
    - Sized `ImageSlot` placeholder to fill 100% within `.bb-hero__media` behind the `.bb-hero__shade` scrim, ready for drop-in real photography.
    - Pruned all local `.bilservice__hero*` desktop rules, inner wrappers, and 1024px media query overrides (~40 lines removed, `ServiceReparationerPage.css` now down to 196 lines).
  - **PublicHeader Alignment**:
    - Verified `variant="overlay"` frosted navigation pill, white link contrast, and portal stacking context (`z-index: 100`) against the standardized dark hero canvas.
- **Strict CSS safety**: `client/src/css/index.css` remained completely untouched (0 lines changed). `git diff --check` passed with 0 errors.
- **Verification**: Verified via Playwright across 1440px desktop, 768px tablet, and 390px mobile viewports with 0px horizontal overflow (`delta = 0`) across both routes. Client build (`npm run build`) passed with 0 errors. Full test suite (`npm run test:browser`) passed 3/3.

### 2026-09-18 — Antigravity (Site-wide Harmonization & Canonical Elevation: Landing + Bilservice)

- **Harmonized Landing Page (`/`) and Bilservice Page (`/service-reparationer`) based on Magnus's three authoritative decisions**:
  1. **Canvas**: Standardized on Landing's `--bb-color-page: #f8f7f3` site-wide (eliminating Bilservice's one-off `#f5f3ee` and `#faf9f6`).
  2. **Dark Palette**: Adopted Canonical Ink (`--bb-color-ink-950: #071416`, `--bb-color-ink-900: #0d1f22`) site-wide (eliminating Bilservice's petrol drift `#07181c`, `#0a2429` in hero, value cards, tier cards, and promo banner).
  3. **Process Layout**: Unified on Landing's process step layout as canonical standard (number `01` above `.bb-icon-bare`, glowing horizontal amber connector line `li::after`).
- **Elevated 4 new canonical component patterns into `client/src/styles/shared-elements.css` (`.bb-*`)**:
  - **`.bb-trust-row`**: 3-pillar hero trust pattern (*Personlig service*, *Erfarna mekaniker*, *Tryggt och enkelt*), containing `.bb-trust-row__item`, `.bb-icon-bare`, and `.bb-trust-row__text` (`<b>` + `<small>`). Responsive 1-column stack on mobile (<=650px).
  - **`.bb-process-grid`**: 5-step workshop protocol process layout (`<ol className="bb-process-grid">`), number `01` above `.bb-icon-bare`, with glowing horizontal amber connector line across steps. Responsive 3-col on tablet, 2-col on mobile.
  - **`.bb-promo-card`**: Dark cross-sell / promo banner card (`linear-gradient(135deg, var(--bb-color-ink-900) 0%, var(--bb-color-ink-950) 100%)`), containing `.bb-promo-card__copy` (`.bb-eyebrow--dark` + `h3`) and `.bb-btn--teal`. Responsive column stack on mobile (<=640px).
  - **`.bb-card--trust`**: Light surface reassurance card (`background: var(--bb-color-surface, #fff)` with `var(--bb-shadow-card)`), containing `.bb-card--trust__icon`, `.bb-card--trust__text` (display `h3` + `.bb-lead`), and action buttons. Responsive column stack on mobile (<=640px).
- **Refactored pages and pruned redundant local rules**:
  - `LandingPage.tsx`: Adopted `.bb-trust-row` in hero-bottom and `<ol className="bb-process-grid">` in process section.
  - `LandingPage.css`: Mapped local variables directly to canonical tokens (`--landing-ink: var(--bb-color-ink-950);`, etc.), pruned redundant `.landing-v2__trust-row*` rules, and pruned `.landing-v2__process-content ol/li*` rules.
  - `ServiceReparationerPage.tsx`: Replaced `.bilservice__hero-trust` with `.bb-trust-row`, replaced old arrowed process steps with `<ol className="bb-process-grid">`, replaced `.bilservice__promo` with `.bb-promo-card`, and replaced `.bilservice__trust-card` with `.bb-card--trust`. Removed unused `Fragment` import.
  - `ServiceReparationerPage.css`: Updated canvas and surface to `var(--bb-color-page)` and `var(--bb-color-surface)`. Switched hero, value cards, and tier cards from petrol to canonical ink. Pruned all redundant local `.bilservice__hero-trust*`, `.bilservice__process-steps*`, `.bilservice__promo*`, and `.bilservice__trust-card*` rules (~70 lines removed).
- **Documentation**: Updated `docs/DESIGN_SYSTEM.md` (§2a) with the 4 elevated components and the 3 harmonization decisions.
- **Strict CSS safety**: `client/src/css/index.css` remained completely untouched (0 lines changed).
- **Verification**: Verified via Playwright at 1440px desktop, 768px tablet, and 390px mobile viewports with 0px horizontal overflow across both Landing and Bilservice. Client build (`npm run build`) passed with 0 errors. Full test suite (`npm run test:browser`) passed 3/3.

### 2026-09-18 — Antigravity (Bilservice `/service-reparationer` canonical CSS styling rules pass)

- **Applied full canonical CSS styling rules from `shared-elements.css` and `design-tokens.css` across Bilservice page**:
  - **Value Cards ("Varför är bilservice viktigt?")**:
    - Converted non-canonical teal circle icons to canonical `.bb-icon-badge` (amber-tinted rounded square, `rgba(240, 149, 5, 0.15)` with `--bb-color-amber-500` icon).
    - Fixed the card body stretch bug: added `flex: 1; display: flex; flex-direction: column;` to `.bilservice__value-body` and set dark card background `var(--bilservice-petrol-900)` so shorter cards (e.g. Card 3 "Prestation") stretch seamlessly with 0 white gaps at the bottom.
    - Updated container to `border-radius: var(--bb-radius-card);` and `box-shadow: var(--bb-shadow-card);`.
  - **Process Section ("Så går det till hos oss")**:
    - Replaced local pale circle icon containers with canonical `.bb-icon-bare` (amber glyph with subtle drop-shadow).
    - Re-styled step numbers to white (`#fff`) and step arrows to canonical amber (`var(--bb-color-amber-500)`).
  - **Typography & Headings**:
    - Removed `text-transform: uppercase` from `.bilservice__hero-title` and `.bilservice__process-heading` to respect canonical Archivo 800 mixed-case heading rules (`.bb-h1`, `.bb-h2`).
    - Connected all body/supporting copy to `.bb-lead` (light surfaces) and `.bb-lead--dark` (dark surfaces).
  - **Trust Card**:
    - Updated icon to `.bb-icon-badge.bilservice__trust-icon` with `var(--bb-radius-sm)` and canonical amber accent.
    - Updated card container to `border-radius: var(--bb-radius-card);` and `box-shadow: var(--bb-shadow-card);`.
  - **Radius & Shadow Canonicalization**:
    - Standardized all card, bridge, promo, and image-slot radii to `var(--bb-radius-card)` and `var(--bb-radius-lg)`, eliminating arbitrary literal radii (`22px`, `24px`, `26px`, `30px`).
    - Converted local box-shadow definitions to `var(--bb-shadow-card)`.
    - Aligned local color tokens to canonical tokens (`--bilservice-muted: var(--bb-color-text-muted);`, `--bilservice-amber: var(--bb-color-amber-500);`, `--bilservice-container-max: var(--bb-wrap-max);`).
- **Strict CSS safety**: `client/src/css/index.css` remained completely untouched (0 lines changed).
- **Browser & Overflow verification**: Verified via Playwright at 1440px desktop, 768px tablet, and 390px mobile viewports:
  - `Viewport 1440px`: `clientWidth=1440`, `scrollWidth=1440`, `delta=0`
  - `Viewport 768px`: `clientWidth=768`, `scrollWidth=768`, `delta=0`
  - `Viewport 390px`: `clientWidth=390`, `scrollWidth=390`, `delta=0`
  - Zero horizontal overflow across all breakpoints. Client build (`npm run build`) passed with 0 errors.

### 2026-09-18 — Antigravity (Bilservice `/service-reparationer` retrofitted to canonical `shared-elements.css` layer)

- **Retrofitted Bilservice page (`ServiceReparationerPage.tsx` / `ServiceReparationerPage.css`, parent of the "Bilservice" shared family)** to consume canonical Level 0 shared design elements from `client/src/styles/shared-elements.css` (`.bb-*`), removing redundant page-local CSS while keeping 100% visual fidelity:
  - **Containers**: Wrapped all section inner containers with `.bb-wrap.bilservice__container` and hero inner container with `.bb-wrap.bilservice__hero-inner`.
  - **Eyebrows**: Converted hero and used-car promo eyebrows to `<p className="bb-eyebrow bb-eyebrow--dark">`. Pruned local `.bilservice__eyebrow*` and `.bilservice__promo-eyebrow` rules from `ServiceReparationerPage.css`.
  - **Headings & Accents**: Wired hero H1 to `.bb-h1`, section headings to `.bb-h2`, teal word highlights to `.bb-accent`. Pruned repetitive local display font clamps in `.bilservice__hero-title`, `.bilservice__price-heading`, `.bilservice__intro h2`, `.bilservice__bridge h2`, and `.bilservice__process-heading`.
  - **Buttons & CTAs**:
    - Hero & Process dark actions: Converted to `.bb-btn.bb-btn--teal` (primary "Boka tid" / "Ring oss") and `.bb-btn.bb-btn--ember` (outline call link).
    - Pricing & Reassurance light actions: Converted to `.bb-btn.bb-btn--ember-solid` (solid "Boka tid för bilservice" / "Boka tid nu") and `.bb-btn.bb-btn--ember` (phone link).
    - Used-car promo action: Converted to `.bb-btn.bb-btn--teal`.
    - Pruned all local `.bilservice__btn*` and `.bilservice__promo-link*` rules (~45 lines removed).
  - **Trust icons**: Converted hero trust row to `.bb-icon-bare` (amber glyph with subtle drop-shadow).
  - **CSS Reset Specificity**: Applied `:where(a)` and `:where(button, input, textarea, select)` inside `.bilservice` root to guarantee zero specificity leaks against shared component classes.
- **Strict CSS safety**: `client/src/css/index.css` remained completely untouched (0 lines changed).
- **Browser & Overflow verification**: Verified via Playwright at 1440px desktop, 768px tablet, and 390px mobile viewports:
  - `Viewport 1440px`: `clientWidth=1440`, `scrollWidth=1440`, `delta=0`
  - `Viewport 768px`: `clientWidth=768`, `scrollWidth=768`, `delta=0`
  - `Viewport 390px`: `clientWidth=390`, `scrollWidth=390`, `delta=0`
  - Zero horizontal overflow across all breakpoints. Client build (`npm run build`) passed with 0 errors.

### 2026-09-18 — Antigravity (Landing Page retrofitted to canonical `shared-elements.css` layer)

- **Retrofitted Landing Page (`LandingPage.tsx` / `LandingPage.css`) to consume the Level 0 shared design elements** from `client/src/styles/shared-elements.css` (`.bb-*`), removing redundant page-local CSS while keeping 100% visual fidelity:
  - **Wrap container**: Migrated `.landing-v2__wrap` to `.bb-wrap`.
  - **Buttons**: Converted hero and dark-section primary actions to `.bb-btn.bb-btn--teal`, hero call action to `.bb-btn.bb-btn--ember`, and light-surface actions (Services, About) to `.bb-btn.bb-btn--ember-solid`. Removed ~30 lines of redundant `.landing-v2__book`/`.landing-v2__call` rules and section overrides from `LandingPage.css`.
  - **Eyebrows**: Converted dark-surface eyebrows (Hero, Why, Process, Cars) to `.bb-eyebrow.bb-eyebrow--dark` and light-surface eyebrows (Services, About) to `.bb-eyebrow`. Removed local `.landing-v2__eyebrow*` and `.landing-v2__hero-eyebrow*` definitions.
  - **Headings & Accents**: Connected `#landing-v2-hero-title` to `.bb-h1`, all 5 section headings to `.bb-h2`, inline teal heading highlights to `.bb-accent`, and lead text to `.bb-lead` / `.bb-lead--dark`. Removed repetitive desktop `h2` font-size clamp rules.
  - **Cards & Arrows**: Converted Why-section reassurance panel to `.bb-card--glass`, Services-grid cards to `.bb-card--photo`, replaced legacy shade div with `.bb-card--photo::after`, and wired `.bb-card-arrow` for the bottom-right ember arrow.
  - **Icons**: Connected Why-section icons to `.bb-icon-badge` (amber-tinted rounded square) and Hero trust-row / Process-step icons to `.bb-icon-bare` (amber glyph with subtle drop-shadow).
- **Strict CSS safety**: `client/src/css/index.css` remained completely untouched (0 lines changed).
- **Browser verification**: Verified via Playwright (`test:browser`) at 1440px desktop, 768px tablet, and 390px mobile viewports. All tests passed (3/3), screenshots visually verified, and 0px horizontal overflow across all viewports. Client build succeeded cleanly.

### 2026-09-18 — Claude (Docs sync pass; radius-safety audit; "too rounded" paused, not resolved)

- **Magnus flagged cards and possibly buttons as "too rounded"** — paused rather than guessed, since the radius tokens aren't uniformly safe to touch. Audited `PublicHeader.css`/`PublicFooter.css`'s actual `var(--bb-*)` usage (grepped, not assumed) to find out which tokens are still isolated to Landing's preview versus already live on the shipped shared header/footer. Result: `--bb-radius-card`/`--bb-radius-md` are safe to tune against Landing alone; `--bb-radius-control` (the pill shape) is not — it's used by both the header's nav pill/booking button and the footer's book button, so changing it lands site-wide immediately, not just in preview. Same split found for several color/font/shadow tokens. Full safe/unsafe list now in `docs/DESIGN_SYSTEM.md` under "Radius tokens: what's safe to tune vs. already live," so this doesn't need re-deriving next time a token change is considered. **Not resolved** — waiting on Magnus to say whether "too rounded" means cards only or button shape too.
- **Full documentation sync** (this entry's actual request): `docs/DESIGN_SYSTEM.md` §2a was stale — still described the pre-rename `.bb-btn--primary`/`--outline` (now `--teal`/`--ember`/`--ember-solid`) and didn't mention the headings/`.bb-accent`/`.bb-lead`/`.bb-card-arrow` additions from the comprehensive re-sync pass. Rewritten to match `shared-elements.css` exactly. Added `shared-elements.css` to `docs/CSS_OWNERSHIP.md`'s Level 0 layer list (was missing entirely). `AGENTS.md`'s master-blueprint bullet already mentioned it from an earlier edit today — left as-is, still accurate.
- **Current plan, for the record** (nothing new, consolidating what's been agreed across this session so this doesn't need reconstructing from scattered messages): Landing's detail-tuning pass is finished and `shared-elements.css` is fully re-synced to it. Next is a commit, then a fresh context window, then Magnus will ask for the retrofit — replacing each page's site-specific button/eyebrow/heading/card/icon CSS with the `.bb-*` shared classes. The rounding question stays open until then; it doesn't block the retrofit since none of the radius tokens in question change shape/structure, only the corner values.

### 2026-09-18 — Claude (Landing detail pass finished; comprehensive `shared-elements.css` sync; a second reset-specificity bug found and fixed on 3 pages)

- **Landing detail-tuning pass (live, iterative, verified with real Playwright screenshots and `:hover` triggers at each step)**: hero primary/outline buttons got a live-tuned treatment ("teal_button", "ember_button" — Magnus's names) with a transparent-to-color horizontal gradient, thin border, and a hover state per button; extended that treatment from hero-only to all four dark-photo sections (why/process/cars too) after Magnus asked why they didn't match, which also surfaced a real bug (see below); the two light-surface buttons (Services, About) got a separate solid diagonal ember gradient with a neutral drop shadow and a slight inset bevel, replacing a colored glow that didn't fit a white background; process-step connector lines/numbers/icons re-colored (white numbers, ember lines, ember bare icons with drop-shadow) and their pale circular plates removed entirely; why-section list icons and service-card arrows re-colored ember; service-card icon badges removed outright (Magnus is replacing those images); service-card scrim gradient made more translucent.
- **Found a second instance of the reset-specificity bug class** (first found earlier today on `font: inherit`, documented in `docs/DESIGN_SYSTEM.md`): `.landing-v2 a { color: inherit }` (class+type, higher specificity) was silently overriding `.landing-v2__book { color: #fff }` (single class) on every `<a>`-based button. It stayed invisible because `inherit` isn't an obviously-wrong value — on the four dark-photo sections the ambient color was already white, so it happened to look right; only on the two light sections (Services, About) did it actually resolve to the wrong (dark ink) color, caught via `getComputedStyle()`, not by eye. Fixed with the same `:where()` pattern as the font-weight bug. **Audited Kontakt and Biltjänster for the identical latent risk** (same `.page a { color: inherit }` line) — both had it, neither had visibly triggered it yet only because their `<a>`-buttons currently all happen to sit on matching-color dark backgrounds. Fixed both pre-emptively rather than leaving a landmine. Documented the generalized rule in `docs/DESIGN_SYSTEM.md`.
- **Comprehensively re-synced `shared-elements.css`** against Landing's final, fully-verified state (not just re-read from memory of earlier edits): added a third button variant `.bb-btn--ember-solid` for light surfaces (distinct from the dark-surface `.bb-btn--ember`, which is transparent/outline-style — these are visually different treatments, not two sizes of the same thing); recolored `.bb-icon-badge` from teal to ember (the only surviving badge-icon instance on the page is now ember, and "ember is the accent" per Magnus); removed `.bb-icon-badge--circle` entirely since the pattern it described (pale circle behind a process-step icon) was explicitly removed from the reference page and shouldn't be preserved as a phantom shared pattern; updated `.bb-card--photo`'s scrim gradient to the new translucency values; added `.bb-accent` (teal heading word-highlight), `.bb-lead`/`.bb-lead--dark` (muted body text color, light/dark surface), and `.bb-card-arrow` (the ember bottom-right "go to" affordance) — three small but genuinely consistent patterns found while doing the full pass that hadn't been captured yet.
- **Still deliberately not done**: no page has been retrofitted to consume any `.bb-*` shared class yet. Magnus's plan: this pass is the last thing before a commit and a fresh context window, after which the retrofit ("replace all the code that is site specific concerning buttons and stuff with the tokens") happens as its own focused pass.
- Verified in-browser (Playwright): 0px horizontal overflow at 1440/768/390px on Landing, Kontakt and Biltjänster; full-page screenshot review confirmed every button/icon/card change renders consistently across the whole page; 0 console errors beyond the known benign ones. `npm --prefix client run build` clean. 0 lines touched in `client/src/css/index.css`.

### 2026-09-18 — Claude (Landing polish pass + new canonical `shared-elements.css` layer)

- **Landing detail pass** (per Magnus, before any canonical work): hero trust-row icons (bare glyphs, no badge) got a subtle `drop-shadow` for legibility against the busy photo background — the only bare/badge-less icon spot on the page, confirmed by auditing all four icon usages rather than assuming.
- **New canonical layer**: `client/src/styles/shared-elements.css`, global `.bb-*` classes (no page prefix), imported once in `main.tsx` alongside `design-tokens.css`. Extracted directly from `LandingPage.css` as the now-finalized reference: `.bb-wrap`, `.bb-btn`/`--primary`/`--outline` (one button spec, every state), `.bb-eyebrow`/`--dark` (bakes in the amber-dash/white-text rule), `.bb-card--photo`/`--glass` (the two real card motifs), `.bb-icon-badge`/`--circle`/`.bb-icon-bare` (the three real icon treatments, deliberately not consolidated to one shape).
- **`design-tokens.css` additions**: `--bb-color-text-inverse` (closes the 40-occurrence raw-`#fff` gap found earlier), `--bb-shadow-button`, `--bb-shadow-card`.
- **Deliberately not done in this pass**: no existing page (Landing, Kontakt, Biltjänster, Bilservice) was retrofitted to consume the new classes yet — each still has its own page-local button/eyebrow/card CSS. Magnus's plan: commit this as its own checkpoint, start a fresh context window, then do the retrofit as a separate, focused pass so it isn't mixed into the same context as all of today's design-tuning back-and-forth.
- Verified purely additive: checked `.bb-*` class names against `index.css` and every existing stylesheet for collisions (none — the one substring hit, `bb-wrap`, was only other files referencing the pre-existing `--bb-wrap-max` token, not the new class), then confirmed all four live pages render identically and 0px-overflow-clean after the import was wired in, zero console errors beyond the known benign ones. `npm --prefix client run build` clean. 0 lines touched in `client/src/css/index.css`.

### 2026-09-18 — Claude (Found and fixed a real button bug: `<button>` CTAs silently lost their font-weight/size on 3 of 4 pages)

- Magnus asked "what about how buttons look" as a general consistency check, similar to the earlier eyebrow/radius questions. Pulled `getComputedStyle()` for every primary button across Landing, Kontakt, Biltjänster, and Bilservice to actually compare rather than eyeball it — and found a real, previously invisible bug, not just a style inconsistency.
- **Root cause**: each page's reset block includes a line like `.page button, .page input, .page textarea, .page select { font: inherit; }`. That selector (class + element type) is *more specific* than the single-class `.page__btn--primary { font-weight: 700; ... }` rule that's supposed to style the button — so on any actual `<button>` element, the reset silently wins and the button renders at the browser's inherited weight/size instead of bold. `<a>`-based buttons using the identical class (e.g. the "Ring" call links) aren't affected, since anchors don't match a `button` selector — which is exactly why this was invisible in every screenshot taken today: the two button styles sat right next to each other looking subtly different and it never registered as wrong.
- **Confirmed live** on Landing (pre-existing, not written today — this bug has been live since Landing was first built), Kontakt, and Biltjänster: "Boka tid"/submit buttons all rendered at `font-weight: 400` instead of `700`, and the wrong font-size (16px inherited vs. the intended 15.2px). Bilservice was unaffected only because its CSS predates this reset pattern.
- **Fix**: wrapped each reset's element list in `:where(...)`, which contributes zero specificity so it can never outrank a real component class — `.page :where(button, input, textarea, select) { font: inherit; }`. Documented as a standing rule in `docs/DESIGN_SYSTEM.md` ("`:where()` the reset, not the button") so every future unique page's reset block is written this way from the start instead of reintroducing the same bug.
- Verified in-browser via Playwright: all four pages' primary buttons now report `fontWeight: 700` consistently, matching their `<a>`-based counterparts; 0px horizontal overflow unaffected at 1440px (didn't re-check 768/390 since this was a font-weight/size fix with no layout impact, not a structural change). `npm --prefix client run build` clean. 0 lines touched in `client/src/css/index.css`.

### 2026-09-18 — Claude (Design rule: dark-surface eyebrows keep the amber dash but turn the text white)

- Magnus wanted this changed before the canonical shared-elements extraction, not after: on a dark background (dark card, dark section, photo hero), an eyebrow label's leading dash stays amber but its text turns white — amber text on dark was never the intended look. Documented as a permanent rule in `docs/DESIGN_SYSTEM.md` (new "Eyebrow color rule" section, right before "Card motifs").
- Applied everywhere the pattern currently exists: `LandingPage.css` (`.landing-v2__hero-eyebrow` and `.landing-v2__eyebrow--dark` — hero eyebrow plus the why/process/cars dark-section eyebrows) and `BiltjansterPage.css` (`.biltjanster-hub__eyebrow--dark`, the closing-CTA eyebrow). Checked Kontakt and Bilservice for the same pattern — neither uses an amber eyebrow at all (both already use teal on dark surfaces), so nothing to change there.
- Verified in-browser via Playwright screenshots on both affected pages (Landing hero, Landing "why" section, Biltjänster closing CTA): dash still amber, text now white, layout unaffected. `npm --prefix client run build` clean. 0 lines touched in `client/src/css/index.css`.

### 2026-09-18 — Claude (Landing page audited and tightened, ahead of extracting it as the shared design reference)

- **Why**: Magnus wants Landing's own button/eyebrow/card patterns extracted into a shared, globally-editable CSS layer (so changing a button once updates every `--bb-*` page). Before extracting from it, audited Landing itself the same way the day's other rebuilds were audited (index.css collision, legacy token refs, legacy classnames) — it's about to become the reference every other page copies from, so it needed to be clean first.
- **Findings**: `.landing-v2__*` has 0 collisions in `index.css`, no `--redesign-*`/legacy `--font-*` refs, no stray legacy classnames — Landing was already the cleanest page in the codebase (makes sense, it was built first). Two real issues found and fixed:
  1. **Border-radius had no system**: 9 distinct `border-radius` values in one file (`999px, 22px, 20px, 15px, 13px, 9px, 8px, 50%, 0`), several of them near-duplicates of each other or of existing `--bb-radius-*` tokens, all written as raw literals. Added `--bb-radius-md: 14px` to `design-tokens.css` (a genuine missing step between `--bb-radius-sm:8px` and `--bb-radius-card:20px`) and pointed every literal at the nearest token (13px/15px → the new `--bb-radius-md`, 8px/9px → `--bb-radius-sm`, 20px/22px → `--bb-radius-card`, 999px → `--bb-radius-control`). Left `50%` and the two mobile `border-radius:0` full-bleed resets as literals — those are intentional shapes, not a missing token. Verified with a before/after Playwright screenshot diff at 1440px: pixel-identical: the fix only changed 8–9 CSS radius values by 1–2px each, nothing perceptible.
  2. **Focus ring used a one-off gold (`#f6ce46`)** instead of the site's `--bb-color-focus` (cyan) used everywhere else (`PublicHeader`, `ContactFormCard`, and today's three rebuilds). Swapped to `var(--bb-color-focus)`.
- **Canonical values extracted via Playwright `getComputedStyle()` at 1440px** (not just source-reading, since `clamp()` values needed to be resolved to real pixels) for the upcoming shared-elements pass: primary/outline button (pill, 52px, exact gradient/border/shadow values), eyebrow label (2 color variants, same shape), three distinct icon-badge treatments (31px plain glyph / 44px circle / 32–34px rounded-square — not one shared shape), two distinct card motifs (dark image card vs. translucent glass panel), and H1/H2/body type scale. Not yet turned into a shared CSS file — that's the next step, pending Magnus's go-ahead.
- Verified in-browser (Playwright): 0px horizontal overflow at 1440/768/390px, 0 console errors (cleanest page yet — no local-API noise since Landing doesn't call `/api/services` on load). `npm --prefix client run build` clean. 0 lines touched in `client/src/css/index.css`.

### 2026-09-18 — Claude (Bilservice: legacy shell removed, migrated onto --bb-* tokens, ahead of family rollout)

- **Per Magnus's request, did this before extending the "Bilservice" family to Felsökning/Däckservice/AC-service**, since those three will inherit whatever `ServiceReparationerPage.css`/`.tsx` looks like once they mount on it — fixing it now avoids copying stale dependencies into three more pages.
- **Legacy shell removed entirely**: `ServiceReparationerPage.tsx` no longer imports `Header`/`Footer` — replaced with `PublicHeader variant="solid"` + `PublicFooter`. Checked the `.bilservice__*` class prefix against `index.css` first (per the collision rule added earlier today) — 0 matches, no rename needed.
- **Migrated off every remaining legacy token**: the page's scoped `--bilservice-*` custom properties (`--bilservice-ink`, `--bilservice-teal-800`, `--bilservice-teal-700`) previously pointed at `var(--redesign-ink)` / `var(--redesign-accent-dark)` / `var(--redesign-accent)` — repointed to `var(--bb-color-text)` / `var(--bb-color-teal-800)` / `var(--bb-color-teal-600)`. Bulk-replaced `var(--font-body)` → `var(--bb-font-body)`, `var(--font-heading)` → `var(--bb-font-display)`, and `var(--redesign-radius-pill)` → `var(--bb-radius-control)` throughout the CSS (35 total legacy references, now 0). Also found the page's 3 hero/heading accent spans used the shared legacy `.title-accent` class from `index.css` — renamed to a page-owned `.bilservice__accent`, and consolidated the two identical `.title-accent` color overrides in the CSS into that one rule (small de-bloat, not just a rename).
- **Verified in-browser**: 0px horizontal overflow at 1440/768/390px; checked the solid header's clearance against the hero specifically because this exact page had a documented clearance bug before (see the 2026-09-16 entry below) — still clear at all three widths with the new `PublicHeader` (75px+ clearance measured via `getBoundingClientRect()`), no regression. All sections (value cards, service tiers, process, closing) visually confirmed, only the expected local-API network errors in console. `npm --prefix client run build` clean. 0 lines touched in `client/src/css/index.css`.
- **Not done, left for the family rollout step**: no image search was done (explicitly out of scope per Magnus — placeholders stay). `ServiceGuideTemplate.css` (the Guide family's template) still has the same `--redesign-*`/no-PublicHeader issue and was not touched in this entry.

### 2026-09-18 — Claude (Kontakt rebuilt as a unique page; found and fixed a class-prefix collision bug on Biltjänster)

- **`/kontakt` rebuilt from scratch as a unique page**, matching a Magnus-supplied reference image as closely as available assets allow. `ContactPage.tsx` no longer imports the legacy `Header`/`Footer` — replaced with `PublicHeader variant="overlay"` (photo hero, same pattern as Landing) + `PublicFooter`. New colocated `ContactPage.css` (`.kontakt-page__*`), `--bb-*` tokens only. Sections: photo hero (eyebrow/title/lead/CTAs), two-column contact-details + "så fungerar det" steps card / message form (existing copy preserved verbatim from the pre-rebuild page), a new "Hitta till oss" band (real Google Maps `iframe` embed via the no-API-key `output=embed` URL, plus a dark teal directions card with the brand SVG logo as a faint watermark), a new "Personlig service i fokus" photo band, and a closing CTA with a third "Vägbeskrivning" button (all new, per the reference).
- **Hero photo**: no existing asset matches the reference's stylized garage-exterior-with-signage shot (likely an AI mockup, not real photography Magnus has on file). Reused `about/about-hero-bg.webp` (the handshake photo) instead — thematically a strong fit for a contact page and not yet claimed by a rebuilt `/om-oss` (still legacy). Flagging: when `/om-oss` gets its own unique-page rebuild, it will need a *different* hero photo since this one is now Kontakt's. "Personlig service i fokus" reuses `services/tires/tire-wheel-change.webp` (mechanic + tire), a close match to the reference's photo.
- **Found a real bug, not just a style choice**: `ContactPage.css` was first written reusing the exact `.contact-page__*` prefix the *legacy* `ContactPage.tsx` already used — and `index.css` still has 107 rules under that prefix (frozen, never deleted, still loaded globally via `main.tsx`). The result wasn't an isolated island; it was silently blending with 107 old rules, visible as the closing CTA rendering centered instead of left-aligned (an old `.contact-page__closing-card` rule in `index.css:7440-7516`). Renamed the entire new page to `.kontakt-page__*`, confirmed 0 remaining collisions, confirmed the bug gone.
- **Checked whether the earlier Biltjänster rebuild (same session) had the same bug — it did.** `.biltjanster-page__*` had 9 rules in `index.css` (from the legacy page's guide-card markup), and two of them genuinely collided with the new CSS: `.biltjanster-page__guide-media` and `.biltjanster-page__guide-placeholder`. Visible bug: every placeholder card ("Bild kommer") was rendering with a decorative dashed border neither written nor wanted, from `index.css`'s `.biltjanster-page__guide-media::after`. Renamed to `.biltjanster-hub__*` (0 collisions), rebuilt, confirmed the dashed border is gone.
- **New standing rule added to `docs/CSS_OWNERSHIP.md`**: before naming a new page's CSS island, `grep -c` the legacy page's old class prefix against `index.css`; if non-zero, pick a visibly different prefix. This is now a permanent check, not a one-off fix, since it will bite every remaining legacy-page rebuild (Om oss, Bärgning, Galleri, Bilar till salu, the two shared-family templates) if skipped.
- Verified in-browser: both pages re-tested after their renames at 1440/768/390px, 0px horizontal overflow, forms/mobile-menu/map embed all functional, `npm --prefix client run build` clean, 0 lines touched in `client/src/css/index.css`.

### 2026-09-18 — Claude (Architecture revised: 7 unique pages + 2 shared families; Biltjänster rebuilt)

- **Architecture decision (Magnus)**: the "7 Page Design Archetypes" model is retired. Om oss, Kontakt, Bärgning, Bilar till salu, Galleri, Biltjänster and Startsidan are each fully unique standalone pages with no shared template — content analysis showed they're too divergent to honestly share one. Only two groups remain templated: the "Bilservice" family (Bilservice, Felsökning, Däckservice, AC-service) and the "Guide" family (all ten technical guides, including the six that would have been a separate "Style 4" — there is no second guide template). Updated `HITL_Temporary_roadmap.md` (Section 2 blueprint + Section 3 execution plan, step count 8→7), `docs/CSS_OWNERSHIP.md` (architecture section + full route table), `AGENTS.md` (current-state blueprint bullet, guardrail #1, superseded-styling line — net -4 lines, stays under the frozen line cap), and `docs/DESIGN_SYSTEM.md` (intro line).
- **`/biltjanster` rebuilt as a unique page**: `BiltjansterPage.tsx` no longer imports the legacy `Header`/`Footer` at all — fully replaced with `PublicHeader variant="solid"` + `PublicFooter`. New colocated `BiltjansterPage.css` (`.biltjanster-page__*`), consuming only `--bb-*` tokens, zero dependency on `index.css`. Existing Swedish copy and the 11-guide directory data preserved verbatim; same real-photo/placeholder mix as before.
- **Fixed-pixel header clearance, not a `vw` clamp**: measured `PublicHeader`'s actual rendered height with `getBoundingClientRect()` on both sides of its own 1320px breakpoint (80px compact, ~121.6px full nav) and set the hero's `padding-top` as two fixed pixel values via a matching media query, per the clearance bug already documented in `AGENTS.md` from the Bilservice rebuild. Verified 24–32px clearance at 1440/768/390px, not the ~8px a naive `clamp()` would have given at 1440px.
- Verified in-browser (built-in browser pane): 0px horizontal overflow at 1440/768/390px, mobile menu opens and highlights "Biltjänster" active, booking modal opens cleanly on mobile. `npm --prefix client run build` clean, `BiltjansterPage` chunk code-splits normally (7.49kB). 0 lines touched in `client/src/css/index.css`.
- **Found but not yet fixed**: `ServiceReparationerPage.css` and `ServiceGuideTemplate.css` — the CSS owners of the two shared families — still reference `--redesign-*` custom properties (defined only in the frozen `index.css`), not `--bb-*`. None of the 5 pages already built on them (Bilservice, Koppling, Avgassystem, Oljebyte, Bromssystem) mount `PublicHeader`/`PublicFooter` yet either. Flagged to Magnus as the recommended next unit of work before extending either family further, so the dependency isn't copied into more pages.

### 2026-09-18 — Antigravity (GoogleReviewsCard: Verified Component & Zero Layout Shift Field)

- Verified Landing Page Hero Review Component: Confirmed that `LandingPage.tsx` strictly mounts the new Level 0 `GoogleReviewsCard` (`variant="hero-overlay"`) with zero references to legacy components or classes.
- Stabilized Review Bounding Field (Zero Layout Shift): Wrapped the hero-overlay review module in its own transparent, frosted-glass field container (`background: rgba(3, 22, 26, 0.42); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 16px; backdrop-filter: blur(8px)`).
- Eliminated Content Movement on Rotation: Fixed author track widths (`96px` desktop, `88px` mobile) and reserved quote min-heights across breakpoints (`84px` desktop/tablet, `158px` mobile). Measured in Playwright across all 4 customer reviews: card height and heroBottom height variance is exactly 0.0px (CLS = 0).
- Smooth Cross-Fade Transition: Added 220ms subtle cross-fade state during review cycling so reviews transition smoothly without visual snapping, while fully respecting `prefers-reduced-motion`.
- Mobile Responsive Polish: Redesigned mobile grid to a clean 2-row layout (rating & Google header row, followed by full-width review quote row) preventing horizontal word squashing.
- Verified: Playwright browser tests passed (3/3), 0px horizontal overflow, zero build errors, zero lines touched in `client/src/css/index.css`.

### 2026-09-18 — Antigravity (Extract standalone reusable ContactFormCard component)

- Extracted the "Skicka ett meddelande" contact module and form from `LandingPage.tsx` / `LandingPage.css` into a standalone, reusable Level 0 UI component: `client/src/components/ui/ContactFormCard.tsx` and `ContactFormCard.css`.
- Single Source of Truth: Centralized `defaultContactSubjects`, direct contact items (phone, email, address), and submission confirmation logic in one place so changes propagate site-wide.
- Multi-variant Architecture: Supports `variant="full-section"` (two-column layout with background decorative art and contact info column) and `variant="card-only"` (standalone teal gradient card with form fields, ideal for embedding in subpages or service guides).
- Scoped CSS: Built with `.bb-contact-section*` and `.bb-contact-form*` namespaces, fully driven by `--bb-*` design tokens (`--bb-font-display`, `--bb-font-body`, `--bb-color-teal-*`, `--bb-color-focus`).
- Integrated into `LandingPage.tsx` and pruned inline `ContactForm` and ~45 lines of legacy `.landing-v2__contact-*` / `.landing-v2__form-*` rules.
- Real-browser verified via Playwright: 3/3 tests passed with 0px horizontal overflow at 1440px, 768px, and 390px; visual review confirmed zero regression.
- Strict CSS safety: 0 lines edited in `client/src/css/index.css`; client production build succeeded with 0 errors.

### 2026-09-18 — Antigravity (Extract standalone reusable GoogleReviewsCard component)

- Extracted the Google reviews module from `LandingPage.tsx` / `LandingPage.css` into a standalone, reusable Level 0 UI component: `client/src/components/ui/GoogleReviewsCard.tsx` and `GoogleReviewsCard.css`.
- Single Source of Truth: Created `defaultGoogleReviews` array with verified Brynäs Bilservice reviews (4.3 rating, 50 reviews, link to Google Maps profile).
- Multi-variant Architecture: Supports `variant="hero-overlay"` (transparent, text-shadowed, end-aligned for dark heros) and `variant="card"` (self-contained dark ink card with border and shadow for page bodies and sidebars).
- Accessible & Motion-safe: Encapsulates 8s cyclic rotation, cleans up interval on unmount, respects `prefers-reduced-motion: reduce`, and renders as a single accessible `<a>` tag with clear `aria-label` and visible focus state.
- Scoped CSS: Powered exclusively by `--bb-*` tokens (`--bb-font-display`, `--bb-font-body`, `--bb-color-amber-500`, `--bb-color-focus`).
- Integrated into `LandingPage.tsx` and pruned redundant inline `LandingReviews`, inline reviews array, `Star` component, and ~30 lines of legacy `.landing-v2__reviews*` rules.
- Real-browser verified via Playwright: 3/3 tests passed with 0px horizontal overflow at 1440px desktop, 768px tablet, and 390px mobile viewports; visual review confirmed zero regression.
- Strict CSS safety: 0 lines edited in `client/src/css/index.css`; client production build succeeded with 0 errors.

### 2026-09-17 — Antigravity (Landing Page: Eyebrow Preceding Lines & Amber Accent on Dark Cards)

- Added the standard preceding 23px accent line (`::before`) to all section eyebrows (`.landing-v2__eyebrow`), matching the hero format across the entire landing page.
- Styled `.landing-v2__eyebrow--dark` (Why section, Process section, Cars section) and its preceding line in the amber accent (`var(--landing-amber)` / `--bb-color-amber-500: #f09505`), while light section eyebrows (Services, About) use deep teal (`var(--landing-teal-deep)` / `--bb-color-teal-800: #007a86`).
- `PublicFooter` strictly untouched.
- Verified via Playwright across 1440px, 768px, and 390px with 0px horizontal overflow; confirmed build with 0 errors; 0 edits to `client/src/css/index.css`.

### 2026-09-17 — Antigravity (Landing Page: Hero "Ring oss nu" Outline to Amber Accent)

- Updated the outline of the secondary call button (`.landing-v2__call`) in the landing hero to the canonical amber accent token (`var(--landing-amber)` / `--bb-color-amber-500: #f09505`).
- Styled the hover outline to brighter amber (`--bb-color-amber-400: #fca311`), creating a warm and distinct secondary action pairing with the primary cyan `BOKA TID` pill.
- Verified via Playwright at 1440px, 768px, and 390px with 0px horizontal overflow; confirmed build with 0 errors; 0 edits to `client/src/css/index.css`.

### 2026-09-17 — Antigravity (Landing Page: Hero Eyebrow Text and Amber Accent)

- Updated hero eyebrow text in `LandingPage.tsx` from "Din bilverkstad i Brynäs, Gävle" to "Din lokala bilverkstad i Gävle" (`DIN LOKALA BILVERKSTAD I GÄVLE`).
- Styled both the text and its preceding line indicator (`.landing-v2__hero-eyebrow` and `::before`) with the amber accent token (`var(--landing-amber)` / `--bb-color-amber-500: #f09505`).
- Verified via Playwright at 1440px, 768px, and 390px with 0px horizontal overflow; confirmed build with 0 errors; 0 edits to `client/src/css/index.css`.

### 2026-09-17 — Antigravity (Landing Page: Hero Trust Row Symbols to Amber Accent)

- Updated the three trust icons at the bottom of the landing page hero (`.landing-v2__trust-row i` — check-shield, wrench, and clock) from teal to the canonical amber accent token (`var(--landing-amber)` / `--bb-color-amber-500: #f09505`).
- Preserved the white headings and light-gray subtext, creating a warm, balanced accent that harmonizes with the Google review badge and the amber elements across the design.
- Verified via Playwright at 1440px, 768px, and 390px with 0px horizontal overflow; confirmed build with 0 errors; 0 edits to `client/src/css/index.css`.

### 2026-09-17 — Antigravity (Landing Page: Remove Duplicate Closing CTA Card Before PublicFooter)

- Removed duplicate closing section ("BEHÖVER DIN BIL HJÄLP?") and panel (`.landing-v2__closing-section`) from `LandingPage.tsx`, eliminating redundant repetition of contact info, hours, and booking buttons immediately above `PublicFooter`.
- Pruned obsolete `.landing-v2__closing-*` CSS rules from `LandingPage.css` and adjusted `.landing-v2__cars-section` bottom margin (`clamp(3.2rem, 5vw, 5rem)`, mobile `3.5rem`) for clean spacing before `PublicFooter`.
- Verified with Playwright across all 3 viewports (1440px desktop, 768px tablet, 390px mobile): all passed with zero horizontal overflow; captured and visually confirmed screenshots.
- Zero edits to `client/src/css/index.css`; client production build succeeded with 0 errors.

### 2026-09-17 — Antigravity (Canonical Public Shell Documentation Reconciliation)

- Reconciled documentation across `HITL_Temporary_roadmap.md`, `AGENTS.md`, `docs/CSS_OWNERSHIP.md`, `docs/AGENT_HANDOFF.md`, and `docs/DESIGN_SYSTEM.md` to record the completion and role of the three standalone Public Shell elements:
  1. `PublicHeader` (`PublicHeader.tsx` + `PublicHeader.css` + `publicNavigation.ts`): Standalone floating sticky/portal header (`z-index: 100`) with desktop navigation pill, Biltjänster dropdown, and mobile menu panel.
  2. `PublicFooter` (`PublicFooter.tsx` + `PublicFooter.css`): Standalone 4-column automotive footer matching Magnus's approved mockup, with contour logo, trust badges, amber signature, quick links, contact badges, opening hours, booking CTA, and atmospheric wheel background (`footer-wheel-bg.webp`).
  3. `GalleryTeaserCard` (`GalleryTeaserCard.tsx` + `GalleryTeaserCard.css`): Standalone interactive Ken Burns workshop slideshow card with single-source `defaultWorkshopSlides` array.
- Marked Step 1 and Step 2 as `[COMPLETED & LOCKED]` in `HITL_Temporary_roadmap.md`; established Step 3 (rebuilding `/kontakt` and `/om-oss` from scratch as Style 1) as the immediate next active step.
- Strictly maintained `AGENTS.md` at 314 lines (well below the $\le 333$ line target and 344 pre-commit limit).
- Verified zero edits to frozen `client/src/css/index.css`.

### 2026-09-17 — Magnus & Antigravity (Canonical Design Tokens & PublicFooter Rebuild Against Approved Mockup)

- Built canonical standalone `PublicFooter.tsx` and `PublicFooter.css` (`.bb-footer*`) based faithfully on Magnus's approved automotive mockup (`media_1789659344071.png` and `media_1789659349199.png`).
- 4-Column Layout:
  1. Brand: Contour logo, amber-dashed eyebrow, descriptive copy, 3 trust badges (*Tryggt och enkelt*, *Personlig service*, *Erfarna mekaniker*), and crisp amber script signature *"Vi håller din bil i rullning!"* with brush underline.
  2. Snabba länkar: 9 navigation destinations with interactive chevrons.
  3. Kontakt: 4 dark-teal rounded icon badge items (phone, email, visiting address, Google Maps link).
  4. Öppettider & CTA: Centered circular clock badge with formatted hours table, cyan-pill `BOKA TID →` button, and amber direct phone link `RING OSS: 070-553 33 95`.
  5. Sub-footer: Dynamic copyright year, workshop tagline, centered Facebook and Instagram buttons, and legal links.
- Background: Atmospheric automotive wheel asset (`footer-wheel-bg.webp`) with warm rim lighting anchored on the right and smooth petrol gradient fade to deep `#061518`.
- Promoted typography, line-height, amber accent, and container tokens into `client/src/styles/design-tokens.css`.
- Mounted `PublicFooter` on `LandingPage.tsx` and pruned 50+ lines of redundant legacy `.landing-v2__footer*` CSS.
- Real-browser verified via Playwright: 0px horizontal overflow across desktop (1440px), tablet (768px), and mobile (390px). Verified 0 edits to `client/src/css/index.css`.

### 2026-09-17 — Antigravity (Extract standalone reusable GalleryTeaserCard component)

- Extracted the Ken Burns workshop gallery teaser card from `LandingPage.tsx` / `LandingPage.css` into a standalone, reusable UI component: `client/src/components/ui/GalleryTeaserCard.tsx` and `GalleryTeaserCard.css`.
- Single Source of Truth: Created `defaultWorkshopSlides` array within `GalleryTeaserCard.tsx` so workshop slide images and alts can be modified in ONE single place, propagating across startsidan, `/om-oss`, and future service pages.
- Configured scoped `.bb-gallery-card` styles powered by `--bb-*` design tokens, Ken Burns transitions, accessible focus, and responsive mobile overrides. Added `--bb-color-page: #f8f7f3;` and `--bb-color-teal-800: #007a86;` to `design-tokens.css`.
- Verified 0-error build (`npm --prefix client run build`), 0px horizontal overflow across all three viewports (1440px, 768px, 390px) with Playwright, and pixel-identical visual presentation.

### 2026-09-17 — Magnus & Antigravity (7-Style Master Blueprint & Anti-Drift Documentation Reconciliation)

- Formalized the master architectural plan in `AGENTS.md` and `docs/CSS_OWNERSHIP.md`: total eradication of `index.css` via Canonical Tokens (`design-tokens.css` with `--bb-*`) and 7 page design archetypes (Style 1: Brand/Landing, Style 2: Bilservice/Editorial, Style 3: Tech Guides A, Style 4: Tech Guides B, Style 5: Bespoke Gallery, Style 6: Bespoke Car Sales, Style 7: Canonical Core).
- Created `HITL_Temporary_roadmap.md` detailing the 7-style architecture diagram, execution phases (Phase 1 through 7), task checklists, and strict rebuild rules.
- Codified strict anti-drift guardrails in `AGENTS.md`: no 4th design systems, `--bb-*` tokens only, standalone `PublicHeader` authority, zero incremental "fixing" of legacy pages in `index.css`, and mandatory Playwright checks. Added clear agent primer explaining what `HITL_Temporary_roadmap.md` is, why it's there, and why it's temporary across agent context switches.
- Trimmed stale legacy references in `AGENTS.md` to safely keep the document within the pre-commit ceiling (333 lines vs 344 limit).
- Removed dead leftover `client/src/data/marquee-items.txt` and updated `instructions.md` and `CLAUDE.md` to eliminate references to deleted legacy section components (`Hero.tsx`, `About.tsx`, `Services.tsx`, `Contact.tsx`).

### 2026-09-17 — Antigravity (Landing hero Google review scale & readability enhancement)

- Scaled up the Google review badge and quote in `LandingPage.css` and `LandingPage.tsx`: increased rating number, Google label, reviewer name, star icons (from 11px to 13px), and quote text (from ~8.8px to readable 0.84rem / ~13.5px).
- Expanded `.landing-v2__reviews` max-width and adjusted hero-bottom grid distribution to comfortably give the review text room without awkward wrapping.
- Added `--disable-gpu` to `playwright.config.ts` for smooth sandbox compatibility, captured real browser screenshots at 1440, 768, and 390 CSS pixels, and verified zero horizontal overflow across all viewports.

### 2026-09-17 — Magnus & Antigravity (Landing padding, distancing and architecture verification)

- Refined spacing, section padding, and distancing on the landing page (`LandingPage.css`) within its isolated `--landing-*` scope.
- Verified all new architecture files: standalone `PublicHeader.tsx`, `PublicHeader.css`, `design-tokens.css`, and `publicNavigation.ts`.
- Confirmed strict CSS safety: `client/src/css/index.css` has zero diff, `git diff --check` is clean, and `npm --prefix client run build` succeeds with zero errors.

### 2026-09-17 — Codex (Landing contact alignment)

- Reduced only the Landing contact-grid gap, bringing the “Hör av dig till oss” column closer to the “Skicka ett meddelande” form without changing either block’s content or Bilservice.

### 2026-09-17 — Codex (Landing typography harmonization)

- Harmonized only `LandingPage.css` to the Bilservice page's readable type hierarchy: 1rem/1.6 body copy, .92rem/1.55 supporting copy, .78rem labels, .95rem controls, less extreme display-heading sizing, and more balanced display line-height.
- Defined those scales as Landing-local `--landing-*` variables. The Landing stylesheet contains no `--redesign-*`, `--font-*` or `--color-*` reference; it does not import or depend on Bilservice or `index.css` CSS.
- Playwright visually reviewed Landing at 1440px, 768px and 390px, with zero horizontal overflow at all three widths. Bilservice and `index.css` had no file diff.

### 2026-09-17 — Codex (Landing spacing rhythm)

- Tightened only `LandingPage.css`: reduced oversized Landing section padding, section-to-section margins, and desktop grid gaps to a closer 3–6rem rhythm, using `/service-reparationer` only as a visual reference.
- Preserved Landing content, hero, cards, typography, Header and interactive behavior. `ServiceReparationerPage.tsx` and `ServiceReparationerPage.css` were not changed.
- Playwright captured Landing at 1440px and 390px with zero overflow. The desktop Landing height reduced from 4643px to 4346px; Bilservice remained 4312px before and after the pass.

### 2026-09-17 — Codex (PublicHeader scroll-layer correction)

- Moved only the independent `PublicHeader` render target to the document root with a React portal and raised its own z-layer to 100. This lets its fixed scrolled state sit above Landing sections despite the Landing hero's isolated stacking context; no Landing or legacy stylesheet was changed.
- Playwright confirmed the previous defect (hit-testing reached the contact section despite a fixed header) and the repaired behavior (hit-testing reaches a header navigation link). The open Biltjänster dropdown was also confirmed interactive and above page content after scrolling.

### 2026-09-17 — Codex (PublicHeader logo scale)

- Enlarged only the independent desktop header logo from 220×54px to 260×64px.
- Moved the independent header's desktop-to-compact breakpoint to 1320px so the larger logo and readable menu are never compressed together. Tablet and mobile logo constraints remain unchanged.
- Playwright verified the enlarged logo, breakpoint transition and zero horizontal overflow at 1440, 1321, 1320, 768 and 390 CSS pixels; the 1440px result was visually reviewed.

### 2026-09-17 — Codex (PublicHeader full menu-link correction)

- Corrected the incomplete typography pass within the independent public header only: Biltjänster submenu links and mobile menu links now also render at 16px / Manrope 700, matching every desktop navigation item.
- Removed the header-only `stackedLabel` treatment, so `Till salu` is a normal one-line navigation label on both desktop and mobile.
- Playwright inspected the open desktop dropdown and open mobile panel, confirmed all 20 declared menu destinations map to registered client routes (plus the intentional telephone link), and found zero horizontal overflow at 1440px and 390px.

### 2026-09-17 — Codex (PublicHeader desktop navigation typography)

- Changed only `client/src/components/layout/PublicHeader.css`: all desktop public-navigation items now explicitly render at 16px, Manrope 700, matching the former Biltjänster presentation exactly. The higher-specificity header selector prevents Landing CSS from treating the Biltjänster `<button>` differently from the other navigation links.
- Moved the existing compact-menu breakpoint to 1120px, preserving the requested readable desktop typography without compressing it at narrower widths. The independent mobile header/menu remains unchanged.
- Playwright checked the rendered typography at 1440px and 1121px (every item: 16px / 700), verified the deliberate mobile switch at 1120px, and confirmed zero horizontal overflow at 1440, 1121, 1120, 768 and 390 CSS pixels. A 1440px screenshot was visually reviewed.

### 2026-09-17 — Codex (independent PublicHeader foundation)

- Added `design-tokens.css` (`--bb-*` only), a canonical `publicNavigation.ts` registry, and an isolated `PublicHeader` component/CSS island. The header does not import or use the legacy Header, Footer, BookingForm, Tailwind utilities, `index.css` selectors or `index.css` token names.
- Replaced only the Landing route's local header with the new public header. The existing legacy Header remains unchanged for Bilservice and all other legacy/transitional routes; the Landing booking modal remains local and is reached only through the new header's callback.
- Recreated the approved Bilservice-header interaction model from Playwright analysis: desktop navigation pill, Biltjänster dropdown, mobile panel, booking/call actions, Arrow Down access to the first service link, Escape/outside dismissal and focus restoration. The mobile panel explicitly honours `hidden`, fixing the prior Landing menu's initial-open rendering fault.
- Playwright evaluation is required at 1440, 768 and 390 CSS pixels; its Landing check now covers the desktop dropdown and mobile menu states in addition to the full-page screenshot and horizontal-overflow assertion.

### 2026-09-17 — Codex (Playwright real-browser verification baseline)

- Added `@playwright/test` and installed the matching Chromium browser.
- Added a reusable Playwright configuration with 1440, 768 and 390 CSS-pixel projects at device scale factor 1, plus a landing-page real-browser capture and overflow check.
- Made Playwright mandatory for future real-browser UI evaluation and screenshots in `AGENTS.md` and `docs/CSS_OWNERSHIP.md`; generated reports and screenshots remain untracked.
- First Chromium run passed at all three viewports with exact-width full-page screenshots and zero horizontal overflow. Visual inspection exposed a pre-existing Landing issue: its mobile/tablet navigation is visible on initial load because the responsive `display: grid` rule overrides the element's `hidden` state. This installation task did not change the current header; the issue is carried into the upcoming `PublicHeader` replacement requirements.
- No application CSS, page implementation, backend, commit or push was changed.

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
