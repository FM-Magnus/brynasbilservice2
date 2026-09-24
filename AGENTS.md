# AGENTS.md — Brynäs Bilservice

The one contract for every AI tool on this repo (Claude Code, Antigravity, Codex). `CLAUDE.md` and `GEMINI.md` only point here. **This file may not grow** (the pre-commit hook blocks it) — replace wording, don't append.

## Stage

Website for Brynäs Bilservice, a car workshop in Gävle. React 18 + Vite 4 + TypeScript in `client/`; Express + MySQL in `server/` (Johnny's). The rebuild and imagery are done: design tokens, shared patterns, 7 unique pages and two page families are in place. **Current work is final polish and launch fixes** — start with [`docs/STATUS.md`](docs/STATUS.md); image work follows [`docs/IMAGES.md`](docs/IMAGES.md).

## Which file wins

1. **The code** (`design-tokens.css`, `main.tsx`, `business.ts` …). If a doc disagrees with the code, the code is right — fix the doc.
2. **This file** — rules and boundaries.
3. [`docs/CSS_OWNERSHIP.md`](docs/CSS_OWNERSHIP.md) (who owns which CSS, write rules) and [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) (tokens and shared patterns).
4. [`docs/STATUS.md`](docs/STATUS.md) — what is true now, what's next, what's broken.
5. Topic references, each authoritative only for its topic: [`docs/IMAGES.md`](docs/IMAGES.md), [`docs/BACKEND.md`](docs/BACKEND.md) (production, API, database), `docs/ops/`.
6. [`docs/LOG.md`](docs/LOG.md) is history, never instructions. `docs/archive/` is never read unless asked.

## Hard rules — CSS and markup

Read [`docs/CSS_OWNERSHIP.md`](docs/CSS_OWNERSHIP.md) before any CSS task.
- Global CSS is exactly four files, loaded in `main.tsx`: `styles/tailwind.css`, `design-tokens.css`, `base.css`, `shared-elements.css`. Never add a fifth, never recreate `index.css`, never use `--redesign-*`/`--color-*` or legacy class prefixes.
- Tokens are `--bb-*` only, from `design-tokens.css`. Shared patterns are `.bb-*` in `shared-elements.css`. Everything else lives in the page's own CSS island (unique prefix) or its family file (`ServiceReparationerPage.css`, `ServiceGuideTemplate.css`).
- **No Tailwind utilities and no inline `style=` in public TSX** (Tailwind only under `/admin`).
- One pattern per job: tips are `<Tip>` (`.bb-tip`), hero trust items `.bb-trust-row`, guide sections `components/guide/`, booking `useBookingModal`. Never build a page-local copy of a shared pattern.
- A modifier that restyles a child must out-rank the base rule: write `.x.x--variant p`, not `.x--variant p` — an equal-specificity tie is decided silently by source order.
- New global tokens, shared patterns or changes to shared CSS need Magnus's approval first.
- Business facts (phone, address, hours, org.nr) come only from `client/src/data/business.ts`.

## Hard rules — ownership and git

- **Don't touch without explicit instruction:** `server/index.js`, `server/database/schema.sql`, `server/.htaccess`, `server/.env` (Johnny's), `server/package.json`. The frontend is `client/`; the repo root has no package of its own.
- Never push without Magnus's go-ahead. Never `git add -A` (files have gone missing from an iCloud-synced checkout before) — stage files by name. One logical change per commit. Never bypass the pre-commit hook.
- Don't copy text verbatim from competitor material or the commissioned copy file; write original Swedish.

## How Magnus works

- Ask when something is ambiguous — don't guess.
- **Measure → propose → implement.** Reading CSS is not evidence; measure in the browser.
- Never change Swedish copy, tokens or shared CSS without approval. Mark unconfirmed numbers "branschmässigt riktvärde".
- Show visible changes (before/after) before committing. Report honestly, including where an earlier claim was wrong.

## Roles

- **Claude Code, Antigravity and Codex** implement or review, one bounded task at a time, as the task brief says.
- A **review** is read-only unless the brief allows edits. It checks changes against `CSS_OWNERSHIP.md`, `check:css`, `typecheck` and Playwright, and reports findings with file:line.
- **Magnus** decides design, copy and scope. **Johnny** owns the server, database and deploy.

## Commands and guards

`npm --prefix client run dev | typecheck | check:css | build | test:browser` — dev server on :5173, API on :3000 (`cd server && npm run dev`). Building needs Node ≥ 18.17; never build on the production server. `vite build` does not typecheck — run `typecheck` too (0 errors). The stack is React 18 / Tailwind 3 / Vite 4: never generate React 19 or Tailwind v4 (`@theme`) code.

The pre-commit hook (`.githooks/pre-commit`) blocks: growth of `AGENTS.md`; `CLAUDE.md`/`GEMINI.md` that stop routing here (must start with the import line, max 12 lines, no `##` sections); a `docs/STATUS.md` over 120 lines; a failing `check:css` (unresolved `var(--bb-*)`, legacy tokens, inline `style=`); Tailwind utilities in public TSX. Playwright guards the header/hero clearance (`hero.spec.ts`), router-safe links (`internal-links.spec.ts`) and business facts (`business-facts.spec.ts`).

Verify every visible change in the browser at 1440, 768 and 390 px with zero horizontal overflow. Measurement scripts and traps: [`docs/audit-harness/README.md`](docs/audit-harness/README.md).

## End of a session

1. Update the parts of [`docs/STATUS.md`](docs/STATUS.md) that changed (replace, don't append).
2. Add one short bullet to today's dated entry at the top of [`docs/LOG.md`](docs/LOG.md) (one entry per day; start it if you are first).
3. If you changed a shared pattern, token or rule, update `DESIGN_SYSTEM.md` / `CSS_OWNERSHIP.md` in the same commit.

## Doc map

| File | For | Holds |
|---|---|---|
| `README.md` | people | Overview, running, building, everyday content changes |
| `AGENTS.md` | all AI tools | This contract |
| `CLAUDE.md`, `GEMINI.md` | Claude / Gemini-Antigravity | Pointers to this file |
| `docs/STATUS.md` | everyone | Current state, next steps, broken list, confirmed facts |
| `docs/IMAGES.md` | anyone doing imagery | Slot sizes, per-page status, photo brief, prompt library, markup |
| `docs/CSS_OWNERSHIP.md` | CSS work | Route → CSS owner, write rules, cascade rules |
| `docs/DESIGN_SYSTEM.md` | CSS/design work | Tokens, shared patterns, hero geometry, icons |
| `docs/BACKEND.md` | Johnny + agents | Production, current API, live DB, backend proposals |
| `docs/ops/` | deploy/server work | Deployment, SSH, admin panel, git recovery |
| `docs/LOG.md` | history | Dated work notes (rotated after ~2 weeks) |
| `docs/archive/` | history | Superseded handovers, old logs, the rebuild roadmap |
