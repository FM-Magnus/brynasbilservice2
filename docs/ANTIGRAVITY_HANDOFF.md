# Antigravity handoff — Brynäs Bilservice Biltjänster

> **SUPERSEDED — historical record only (banner added 2026-09-20).** This file predates the Step 6/7 rebuild and its styling instructions are no longer true: `client/src/css/index.css` was deleted on 2026-09-19, the `--redesign-*` tokens no longer exist, and the uppercase `.title-accent` heading rule is retired. The pre-commit hook no longer freezes `index.css` either; it only blocks Tailwind utilities in public TSX.
>
> The current contract is [`AGENTS.md`](../AGENTS.md), with [`docs/CSS_OWNERSHIP.md`](CSS_OWNERSHIP.md) for the route → CSS-owner map and [`docs/DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) for tokens and patterns. Do not follow the styling instructions below.


Updated 2026-09-16. Migration to Antigravity 2 / Flash 3.8.

## READ THIS FIRST — the two files that must never bloat again

`client/src/css/index.css` became a multi-thousand-line dependency layer because many sessions added page CSS directly into it. It is now **completely frozen**: do not add, delete, move, rename, reformat or clean any rule. Existing pages may keep using it unchanged.

- **Every new page or component gets its own CSS file**, colocated next to its `.tsx` (e.g. `client/src/pages/NewPage.tsx` + `client/src/pages/NewPage.css`), imported directly in that component (`import './NewPage.css'`). Do not add new rules to `client/src/css/index.css`.
- Design tokens (`var(--redesign-accent)`, `var(--space-4)`, etc.) are defined once in `index.css` and load globally — they work from any file, so this costs nothing.
- Working precedent already in the codebase: `client/src/components/BookingForm.css`, imported directly in `BookingForm.tsx`.
- Full detail and route ownership: [`docs/CSS_OWNERSHIP.md`](CSS_OWNERSHIP.md) and [`docs/DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md#css-file-organization).

**This is enforced, not just requested.** The pre-commit hook blocks every staged change to `client/src/css/index.css` and any growth of `AGENTS.md`. If it refuses a commit, **do not bypass it** without Magnus's explicit approval. Put page CSS in its owned island and session notes in `docs/SESSION_LOG_CURRENT.md`. The hook activates via `client/package.json`'s `postinstall` script.

This is a work-in-progress website. Magnus has not final-approved any public page copy yet. Treat all supplied copy, intervals, prices, service claims and image choices as draft until Magnus explicitly approves them.

## Start here

1. Work in `/Users/magnusolsson/Documents/REPOS/brynasbilservice_repo`.
2. Read `AGENTS.md`, `docs/AGENT_HANDOFF.md` and `docs/PROJECT_STATUS.md` before editing.
3. The real application is under `client/`. The root Vite/React files are orphan scaffolding.
4. Preserve the current worktree and never touch Johnny-owned backend/deployment files.
5. Before editing, run:

```bash
git status --short --branch
```

## Current handover state — 2026-09-16

- Local branch: `redesign/blue-teal-v1`, with unpublished local commits. Always verify the live ahead count and newest commit with Git rather than relying on this handoff snapshot.
- Claude finished a full layout & imagery pass across all 11 pages under the Biltjänster dropdown (plan: [`docs/BILTJANSTER_LAYOUT_PLAN.md`](BILTJANSTER_LAYOUT_PLAN.md); results: `AGENTS.md` Current state, `docs/SESSION_LOG_CURRENT.md`, and `docs/PROJECT_STATUS.md`'s per-page table). Every page received a distinct card/grid treatment; several guides also received real photos selected from `_incoming-assets/`. No body copy was deleted.
- Do not assume a clean worktree from this document. Preserve every existing change, run `git status --short --branch` first, and do not commit or push unless Magnus explicitly asks.
- Read `_incoming-assets/README.md` before working with images. Do not add raw source files directly to `client/src/assets/images/`. **Verify a candidate image's actual content before trusting its filename** — two files in the root were found this session with swapped/wrong content vs. their name (see `AGENTS.md`).

## Product and technical context

- Product: Swedish public website for Brynäs Bilservice in Gävle, with booking modal, service pages and a protected admin area.
- Frontend: React 18, TypeScript, Vite 4, Tailwind CSS 3, React Router, Archivo headings and Manrope body text.
- Build: `npm --prefix client run build`.
- Visual system: warm-white page surround, dark ink used only for contained cards, teal accent token (`var(--redesign-accent)`), rounded cards, generous spacing. Do not introduce yellow, gold, amber or red accents; yellow is allowed only in the landing-page Google field.
- Existing interactions: use `BookingFormModal` with local `isModalOpen` state; phone links use `tel:0705533395`.
- Shared FAQ: `client/src/components/ui/BiltjansterFaq.tsx`. Use it for every new Biltjänster page.
- Image policy: use existing local images or a clearly labelled CSS/markup placeholder. Raw photography, blue-tone backgrounds and layout graphics first go in `_incoming-assets/`; read its README before selecting anything. Do not download, generate or invent photographic assets.

## Image inventory

Most named/categorized `_incoming-assets/` subfolders are now empty — their contents were already promoted to production over past sessions (see `_incoming-assets/README.md`'s "Befordrade produktionsbilder" section for the full mapping). What's left is mostly loose, unsorted files at the root of `_incoming-assets/`. Confirmed this session: **no matching photos exist** for Koppling, Bromssystem, Stötdämpare och fjädrar, Hjullagerbyte, Avgassystem or Styrning och kulleder — don't assume a photo can be found for these without re-checking. Always visually verify a candidate before trusting its filename (see above). Before integrating anything, ask Magnus which page/placement it should serve, export an intentional WebP/JPG pair, and only then add it to `client/src/assets/images/`. Never import directly from `_incoming-assets/`.

## Current information architecture

Desktop Biltjänster dropdown order:

1. Våra tjänster → `/biltjanster`
2. Bilservice → `/service-reparationer#bilservice`
3. Oljebyte → `/oljebyte`
4. Kamrem → `/kamrem`
5. Koppling → `/koppling`
6. Bromssystem → `/bromssystem`
7. Bilbatteri → `/bilbatteri`
8. Stötdämpare och fjädrar → `/stodampare-fjadrar`
9. Hjullagerbyte → `/hjullagerbyte`
10. Avgassystem → `/avgassystem`
11. Drivaxel och drivknutar → `/drivaxel-drivknutar`
12. Styrning och kulleder → `/styrning-kulleder`

Mobile Biltjänster links to `/biltjanster`; do not create a second nested mobile accordion.

The standalone main-navigation entry `Felsökning` routes to `/felsokning` immediately after Biltjänster. It is a draft service entry with a CSS-only future-image placeholder.

## Page status and reusable pattern

All 11 pages under the Biltjänster dropdown are built and, as of the 2026-09-16 layout pass, each has its **own distinct card/grid treatment** rather than one repeated template — see `docs/PROJECT_STATUS.md` for current page state, `AGENTS.md` for stable constraints, and `docs/SESSION_LOG_CURRENT.md` for new work notes. Reference `BilbatteriPage.tsx` and `KamremPage.tsx` for rich image-led layouts; several other routes now use the isolated `ServiceGuideTemplate.css` family, so check `docs/CSS_OWNERSHIP.md` before assuming a page still belongs to the legacy `services-page__*` system.

If asked to touch one of these pages again: read its `.tsx`, then use `docs/CSS_OWNERSHIP.md` to identify the only CSS file you may edit. Do not assume every page has a colocated file. Do not flatten a distinct treatment or delete body copy.

**Never modify `index.css`** (see [`docs/CSS_OWNERSHIP.md`](CSS_OWNERSHIP.md)). Use only the owned colocated or shared island listed for the route. Design tokens (`var(--redesign-accent)` etc.) remain available without editing their legacy definitions. Keep dark styling contained; never make the entire viewport dark.

## Content and uncertainty rules

- Copy is draft by default. Do not describe it as approved.
- Preserve the supplied meaning; do not add business claims, services, prices, routes or technical promises.
- Do not publish unconfirmed capabilities (for example DSG/automated transmission work) as facts.
- If any route purpose, ownership boundary, technical claim, wording, image choice or design decision is unclear, ask Magnus one concise question before editing that item. Continue only with independently clear work and report deferred items.
- Do not copy sentences from the Vår Verkstad reference or other external sources.

## Allowed work and protected areas

Normal page work should stay inside:

- `client/src/pages/<page>.tsx`
- the exact CSS island listed for the route in [`docs/CSS_OWNERSHIP.md`](CSS_OWNERSHIP.md); never edit `client/src/css/index.css`
- `docs/PROJECT_STATUS.md` when page status changes
- `docs/SESSION_LOG_CURRENT.md` for a concise factual session note

Do not modify `server/`, `.env` files, database schema, `.htaccess`, deployment configuration, root scaffolding, dependencies, lockfiles, Git remotes or branches unless Magnus gives explicit new authority.

## Verification for every page

After implementation:

```bash
git diff --check
npm --prefix client run build
```

Browser-check the page at 1440, 768 and 390 CSS pixels when exact viewport tooling is available. Confirm:

- one H1;
- no horizontal overflow;
- booking button opens the existing modal;
- phone links use `tel:0705533395`;
- FAQ expands accessibly;
- no unintended yellow or full-width dark section;
- placeholder is clearly replaceable;
- only intended files changed.

Do not commit or push automatically. If Magnus requests a commit, inspect the exact file list first and stage explicit paths only. If he requests a push, perform a separate clean-worktree and remote verification before pushing.

## Documentation rhythm

At the end of each implementation session, prepend a factual dated entry to `docs/SESSION_LOG_CURRENT.md` and update the relevant row in `docs/PROJECT_STATUS.md`. Do not append to `AGENTS.md`. Do not rewrite README, CLAUDE or instructions for ordinary page copy/image work; touch them only when project structure or working instructions change. Consult `_incoming-assets/README.md` when handling images.

## Suggested Antigravity task brief

All 11 Biltjänster pages are built and laid out; there is no "next page" to build. Likely next work, in rough priority order:

1. Fact-check the draft technical claims flagged `WIP; not approved` across `docs/PROJECT_STATUS.md`'s Biltjänster rows with Magnus/the workshop.
2. Revisit the 6 pages with no available photo (Koppling, Bromssystem, Stötdämpare och fjädrar, Hjullagerbyte, Avgassystem, Styrning och kulleder) if Magnus supplies new source material to `_incoming-assets/`.
3. See `AGENTS.md`'s "What is broken / incomplete" section for open items outside Biltjänster.

```text
Read AGENTS.md, docs/AGENT_HANDOFF.md, docs/PROJECT_STATUS.md and this handoff first, plus `_incoming-assets/README.md` before touching any image. If anything is uncertain, ask Magnus before editing that item. Edit only the allowed paths, browser-check 1440/768/390, run git diff --check and npm --prefix client run build, update the documentation, and report exact evidence. Do not commit, push or touch backend/deployment files.
```
