# Antigravity handoff — Brynäs Bilservice Biltjänster

Updated 2026-09-14 for migration to Antigravity 2 / Flash 3.8.

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

Observed handoff state: branch `redesign/blue-teal-v1`, latest commit `39417357 feat: expand Biltjanster service guides`, tracking `origin/redesign/blue-teal-v1`, three commits ahead at handoff time. Do not push unless Magnus explicitly asks for it.

## Product and technical context

- Product: Swedish public website for Brynäs Bilservice in Gävle, with booking modal, service pages and a protected admin area.
- Frontend: React 18, TypeScript, Vite 4, Tailwind CSS 3, React Router, Archivo headings and Manrope body text.
- Build: `npm --prefix client run build`.
- Visual system: warm-white page surround, dark ink used only for contained cards, teal accent token (`var(--redesign-accent)`), rounded cards, generous spacing. Do not introduce yellow, gold, amber or red accents; yellow is allowed only in the landing-page Google field.
- Existing interactions: use `BookingFormModal` with local `isModalOpen` state; phone links use `tel:0705533395`.
- Shared FAQ: `client/src/components/ui/BiltjansterFaq.tsx`. Use it for every new Biltjänster page.
- Image policy: use existing local images or a clearly labelled CSS/markup placeholder. Do not download, generate or invent photographic assets.

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

## Page status and reusable pattern

Completed long-form guides:

- `/service-reparationer#bilservice` — Bilservice guide.
- `/oljebyte` — Oljebyte guide with technical material under `Mer info`.
- `/bromssystem` — expanded Bromssystem guide.
- `/koppling` — expanded Koppling guide.

The remaining service destinations are shells awaiting their own supplied copy. The next likely pages are `/kamrem`, `/bilbatteri`, `/stodampare-fjadrar`, `/hjullagerbyte`, `/avgassystem`, `/drivaxel-drivknutar` and `/styrning-kulleder`.

For a supplied service page, follow the established structure:

1. Hero with one H1, concise draft lead, booking button, phone link and replaceable image placeholder.
2. “Vad är/What is …?” explanatory introduction.
3. Customer benefits in readable cards.
4. Warning signs or symptoms.
5. “Det här kan vi hjälpa dig med” in one contained dark card.
6. “Mer info” for technical or interval guidance; keep the page background warm white.
7. Shared five-step “Så går det till hos oss” process.
8. `BiltjansterFaq` with the page’s supplied questions and answers.
9. Contained pricing/booking CTA.

Use existing CSS patterns from `BromssystemPage.tsx` and `index.css`, but scope new selectors to the page (for example `.clutch-page__…`). Keep dark styling contained; never make the entire viewport dark.

## Content and uncertainty rules

- Copy is draft by default. Do not describe it as approved.
- Preserve the supplied meaning; do not add business claims, services, prices, routes or technical promises.
- Do not publish unconfirmed capabilities (for example DSG/automated transmission work) as facts.
- If any route purpose, ownership boundary, technical claim, wording, image choice or design decision is unclear, ask Magnus one concise question before editing that item. Continue only with independently clear work and report deferred items.
- Do not copy sentences from the Vår Verkstad reference or other external sources.

## Allowed work and protected areas

Normal page work should stay inside:

- `client/src/pages/<page>.tsx`
- `client/src/css/index.css`
- `docs/PROJECT_STATUS.md` when page status changes
- `AGENTS.md` for a concise factual session note

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

At the end of each implementation session, append a factual dated entry to `AGENTS.md` and update the relevant row in `docs/PROJECT_STATUS.md`. Do not rewrite README, CLAUDE or instructions for ordinary page copy/image work; touch them only when project structure or working instructions change.

## Suggested Antigravity task brief

```text
Build the next Biltjänster page at <route> using the existing Bilservice, Oljebyte, Bromssystem and Koppling pages as design references.

Use the supplied Swedish text as draft copy only. Preserve its meaning, add no unconfirmed claims, use the shared BiltjansterFaq, keep the warm-white page background with contained dark cards, reuse the booking modal and tel:0705533395, and leave a clearly labelled hero image placeholder.

Read AGENTS.md, docs/AGENT_HANDOFF.md and docs/PROJECT_STATUS.md first. If anything is uncertain, ask Magnus before editing that item. Inspect, edit only the allowed paths, browser-check 1440/768/390, run git diff --check and npm --prefix client run build, update the documentation, and report exact evidence. Do not commit, push or touch backend/deployment files.
```
