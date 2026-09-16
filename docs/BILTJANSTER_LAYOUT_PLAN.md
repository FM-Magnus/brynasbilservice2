# Biltjänster page layout & imagery pass — working plan

Agreed with Magnus on 2026-09-16. This is the brief for a long, mostly-autonomous
session bringing every page under the `Biltjänster` nav dropdown up to the visual
bar the more complete pages already hit, with more layout variation page to page.

## Scope — exactly these 11 pages

The `Biltjänster` dropdown in `client/src/components/layout/Header.tsx:24-71`, in order:

1. `/biltjanster` — hub (`BiltjansterPage.tsx`)
2. `/service-reparationer#bilservice` — Bilservice (`ServiceReparationerPage.tsx`)
3. `/oljebyte` — Oljebyte (`OljebytePage.tsx`)
4. `/kamrem` — Kamrem (`KamremPage.tsx`)
5. `/koppling` — Koppling (`KopplingPage.tsx`)
6. `/bromssystem` — Bromssystem (`BromssystemPage.tsx`)
7. `/bilbatteri` — Bilbatteri (`BilbatteriPage.tsx`)
8. `/stodampare-fjadrar` — Stötdämpare och fjädrar (`StodampareFjadrarPage.tsx`)
9. `/hjullagerbyte` — Hjullagerbyte (`HjullagerbytePage.tsx`)
10. `/avgassystem` — Avgassystem (`AvgassystemPage.tsx`)
11. `/drivaxel-drivknutar` — Drivaxel och drivknutar (`DrivaxelDrivknutarPage.tsx`)
12. `/styrning-kulleder` — Styrning och kulleder (`StyrningKullederPage.tsx`)

(`Felsökning` is a separate top-level nav item, not under this dropdown — out of scope.)

## Goal

Most of these pages share one generic `services-page__guide` template — same hero
shape, same card grids, mostly dashed-box placeholders. Bring them up to the bar
Kamrem's precision-grid hero and Bilbatteri's hero-media/intro-media/service-media
photo layout already hit, and **don't make them all look like each other** — vary
hero composition, media placement (left/right alternating, full-bleed vs boxed),
and card treatments the way Kamrem/Bilbatteri/AC/Dackservice already differ.

## Order of work

1. Bilbatteri and Kamrem are the reference bar (richest existing layouts) — don't
   rework them, use them as the style reference.
2. Bilservice, Oljebyte, and Drivaxel och drivknutar got a hero photo in the prior
   session but are otherwise still the generic shell — bring their surrounding
   sections up too.
3. The six fully generic, placeholder-only pages: Koppling, Bromssystem,
   Stötdämpare och fjädrar, Hjullagerbyte, Avgassystem, Styrning och kulleder.
4. Finish with the `/biltjanster` hub's 6 remaining placeholder cards.

## Image sourcing rules

- Only **copy** from `_incoming-assets/` into `client/src/assets/images/...`.
  Never move or delete originals there.
- **Visually verify every candidate image before trusting its filename.** This
  session already found two root files with swapped/wrong content vs. their name
  (`bilservice__servicebok-och-bilnyckel...` is actually a CV-joint photo;
  `drivaxel__drivknut-pa-arbetsbank...` is actually a wrench/bolt macro).
- Don't force a mismatched or already-used-elsewhere photo onto a page. **If no
  genuinely fitting image exists, leave the existing `.services-page__image-placeholder`
  box** — it's a deliberate branded state, not a broken one.
- Resize/compress to this session's established conventions: hero-slot images
  ~1400px wide, card/thumbnail images ~640-900px wide, WebP primary + JPG fallback
  via `<picture>`, roughly 40-150KB per WebP depending on size/complexity.

## Layout rules

- New CSS goes in a colocated `<PageName>.css` file per page (create one if it
  doesn't exist yet), imported directly in the component. **Never add lines to
  `client/src/css/index.css`** — `.githooks/pre-commit` blocks any commit that
  grows it past its last-committed size. Editing existing lines (e.g. deleting a
  dead placeholder rule) is fine as long as net line count doesn't increase.
- Reuse existing design tokens (`var(--redesign-accent)`, `var(--redesign-ink)`,
  `var(--redesign-radius-card)`, Archivo/Manrope via existing classes) — vary
  composition and imagery, not the underlying color/type system.
- Keep the site-wide hero rule intact: uppercase heading with `.title-accent`
  span, hero container `min-height: clamp(640px, calc(100svh - 60px), 760px)`
  (or the page's existing equivalent).
- Verify 0px horizontal overflow at ~1440px, ~768px, and ~390px for every page touched.

## Process guardrails (non-negotiable, from CLAUDE.md)

- Never touch `server/`, root `package.json`/`vite.config.ts`/`tsconfig.json`/
  `index.html` (orphan scaffolding), or `.env`.
- Never run `git push` — stay strictly local on `redesign/blue-teal-v1`.
- After each page (or small logical group): `npm --prefix client run build`,
  check in the browser preview (desktop + mobile, console errors, network
  requests for new images), then `git commit` with a descriptive message.
- Update `AGENTS.md` — "Current state" and a short session-log entry — after each
  commit or small batch, per the file's own "How to update this file" section.
  Archive older session-log entries into `docs/SESSION_LOG_ARCHIVE.md` first if
  approaching the 450-line cap.
- Work through the full list continuously without stopping for routine
  layout/image decisions. Flag unverified/draft technical claims with the
  existing `FACT TO CONFIRM` / `DRAFT GUIDANCE` code-comment convention. Only
  stop and ask if something is destructive, ambiguous in a way that changes
  scope, or genuinely blocked.
