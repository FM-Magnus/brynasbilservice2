# CSS ownership and migration policy

This is the operational CSS map for Brynäs Bilservice. It is intentionally explicit so smaller coding models can follow it without interpreting architectural intent.

## Non-negotiable rule

`client/src/css/index.css` is a frozen legacy dependency layer.

- NEVER add, delete, move, rename, reformat or clean rules in that file.
- Existing pages may continue consuming it unchanged.
- A rule that appears unused must remain in place.
- If a task seems to require editing it, stop before editing and report `BLOCKED`.
- Only Magnus may authorize a one-off bypass of the pre-commit lock.

Migration means building an independent CSS island until the legacy file becomes irrelevant. It does not mean extracting or deleting legacy rules.

## Redesign public shell

The redesign public shell is independent from the frozen legacy layer.

- `client/src/styles/design-tokens.css` owns the `--bb-*` canonical tokens for new public work. New public components must not consume `--redesign-*`, `--color-*` or any other custom property defined by `index.css`.
- `client/src/data/publicNavigation.ts` is the canonical navigation source for the new public header.
- `client/src/components/layout/PublicHeader.tsx` and `PublicHeader.css` own the new shared header. It must not import `Header.tsx`, use legacy selectors or Tailwind utilities, or rely on `index.css` layout/control rules.
- `client/src/components/layout/PublicFooter.tsx` and `PublicFooter.css` own the canonical shared footer matching the approved automotive mockup. It must not import legacy `Footer.tsx`, use legacy selectors or Tailwind utilities, or rely on `index.css` rules.
- `client/src/components/ui/GalleryTeaserCard.tsx` and `GalleryTeaserCard.css` own the reusable interactive Ken Burns workshop slideshow card with a single-source slide registry (`defaultWorkshopSlides`).
- `client/src/components/ui/GoogleReviewsCard.tsx` and `GoogleReviewsCard.css` own the standalone Google reviews UI component with single-source review registry (`defaultGoogleReviews`), cyclic rotation with smooth cross-fade, and stabilized transparent bounding field with zero layout shift (`.bb-reviews-card*`).
- `client/src/components/ui/ContactFormCard.tsx` and `ContactFormCard.css` own the standalone reusable contact module and form card (`.bb-contact-section*`, `.bb-contact-form*`) with single-source contact subjects (`defaultContactSubjects`) and multi-variant support (`full-section`, `card-only`).
- The legacy `Header.tsx`, `Footer.tsx` and `BookingForm.tsx` remain untouched until separately retired. A new page receives booking behaviour through callbacks or modals, mounting `PublicHeader` and `PublicFooter` directly.

## The Rebuild Architecture (Master Blueprint)

**Revised 2026-09-18**: The site is not a symmetrical set of 7 style archetypes. Most pages are too divergent in content and purpose to honestly share a template. The entire site is being rebuilt away from `index.css` into a canonical design token layer at the top, **7 fully unique standalone pages**, and **2 shared service-page families** (the only groups where the pages are genuinely the same kind of content):

1. **Top: Canonical Design Layer & Shell**:
   - `client/src/styles/design-tokens.css` owns the `--bb-*` canonical tokens (colors, Archivo display/Manrope body type scales, radii, spacing, shadows).
   - `client/src/styles/shared-elements.css` owns global `.bb-*` pattern classes below the token layer (buttons, eyebrow, headings, card motifs, icon badges) — see `docs/DESIGN_SYSTEM.md` §2a. Consumed by Startsidan (`/`); other pages pending retrofit.
   - `client/src/data/publicNavigation.ts` + `PublicHeader.tsx` / `PublicHeader.css` (free-standing navigation element) + `PublicFooter.tsx` / `PublicFooter.css` (canonical standalone global footer).
   - `client/src/components/ui/GalleryTeaserCard.tsx` / `GalleryTeaserCard.css` (reusable standalone workshop teaser card).
   - `client/src/components/ui/GoogleReviewsCard.tsx` / `GoogleReviewsCard.css` (reusable standalone Google reviews card/overlay).
   - `client/src/components/ui/ContactFormCard.tsx` / `ContactFormCard.css` (reusable standalone contact module and form card).

2. **The 7 unique, standalone pages** — each owns its own bespoke design and its own colocated CSS island. No shared page template between them.
   - `Startsidan` (`/`) — `LandingPage.tsx` + `LandingPage.css` (`.landing-v2__*`). Complete.
   - `Om oss` (`/om-oss`) — `AboutPage.tsx` + `AboutPage.css` (`.omoss-page__*`). Complete. Rebuilt from approved mockup with zero dependency on `index.css`.
   - `Kontakt` (`/kontakt`) — `ContactPage.tsx` + `ContactPage.css` (`.kontakt-page__*`). Complete. Rebuilt from approved mockup with zero dependency on `index.css`, mounts `PublicHeader` (overlay) + `PublicFooter`.
   - `Bärgning` (`/bargning`) — `BargningPage.tsx` + `BargningPage.css` (`.bargning-page__*`). Complete. Rebuilt from approved mockup with zero dependency on `index.css`, mounts `PublicHeader` + `PublicFooter`.
   - `Bilar till salu` (`/bilar-till-salu`) — `BilarTillSalu.tsx` + dedicated CSS.
   - `Galleri` (`/galleri`) — `GalleryPage.tsx` + dedicated CSS.
   - `Biltjänster` (`/biltjanster`) — `BiltjansterPage.tsx` + `BiltjansterPage.css` (`.biltjanster-hub__*`). Complete. The service-catalog overview/index page; links out to every page in both families below.

3. **"Bilservice" family (shared template)** — major service-hub pages, all structurally the same kind of page:
   - *Owner*: `ServiceReparationerPage.tsx` + `ServiceReparationerPage.css` (`.bilservice__*`).
   - *Pages on this template*: `Bilservice` (`/service-reparationer`), `Felsökning` (`/felsokning`), `Däckservice` (`/dackservice`), `AC-service` (`/ac-service`).

4. **"Guide" family (shared template)** — technical repair-guide pages, all structurally the same kind of page. There is only one guide template; the remaining six guides join the same one already proven on the first four, not a second template.
   - *Owner*: `ServiceGuideTemplate.css` (`.service-guide__*`).
   - *Pages on this template*: `Koppling` (`/koppling`), `Avgassystem` (`/avgassystem`), `Oljebyte` (`/oljebyte`), `Bromssystem` (`/bromssystem`), `Kamrem` (`/kamrem`), `Bilbatteri` (`/bilbatteri`), `Stötdämpare & fjädrar` (`/stodampare-fjadrar`), `Hjullagerbyte` (`/hjullagerbyte`), `Styrning & kulleder` (`/styrning-kulleder`), `Drivaxel & drivknutar` (`/drivaxel-drivknutar`).

## Active Status of Routes During Rebuilding

| Route | Architecture Group | Status | CSS Owner |
| --- | --- | --- | --- |
| `/` | Unique | Complete / Active | `LandingPage.css` + `PublicHeader.css` + `PublicFooter.css` + `GalleryTeaserCard.css` + `GoogleReviewsCard.css` + `ContactFormCard.css` |
| `/om-oss` | Unique | Complete | `AboutPage.css` (`.omoss-page__*`), mounts `PublicHeader` + `PublicFooter` + `GalleryTeaserCard` |
| `/kontakt` | Unique | Complete | `ContactPage.css` (`.kontakt-page__*`), mounts `PublicHeader` (overlay) + `PublicFooter` |
| `/service-reparationer` | Bilservice family (owner) | Complete — on `--bb-*` tokens & `shared-elements.css` (`.bb-*`), mounts `PublicHeader`/`PublicFooter` | `ServiceReparationerPage.css` (`.bilservice__*`) |
| `/felsokning` | Bilservice family | Transitional -> Rebuild on family template | Legacy dependent |
| `/dackservice` | Bilservice family | Transitional -> Rebuild on family template | Legacy transitional (`DackservicePage.css`) |
| `/ac-service` | Bilservice family | Transitional -> Rebuild on family template | Legacy transitional (`AcServicePage.css`) |
| `/koppling` | Guide family | Complete — on `--bb-*` tokens & `.bb-*` shared elements, mounts `PublicHeader` (overlay) + `PublicFooter` (Second Pass verified) | `ServiceGuideTemplate.css` |
| `/avgassystem` | Guide family | Complete — on `--bb-*` tokens & `.bb-*` shared elements, mounts `PublicHeader` (overlay) + `PublicFooter` (Second Pass verified) | `ServiceGuideTemplate.css` |
| `/oljebyte` | Guide family | Complete — on `--bb-*` tokens & `.bb-*` shared elements, mounts `PublicHeader` (overlay) + `PublicFooter` (Second Pass verified) | `ServiceGuideTemplate.css` |
| `/bromssystem` | Guide family | Complete — on `--bb-*` tokens & `.bb-*` shared elements, mounts `PublicHeader` (overlay) + `PublicFooter` (Second Pass verified) | `ServiceGuideTemplate.css` |
| `/kamrem` | Guide family | Complete — on `--bb-*` tokens & `.bb-*` shared elements, mounts `PublicHeader` (overlay) + `PublicFooter` (First Sibling Proof verified) | `ServiceGuideTemplate.css` |
| `/bilbatteri` | Guide family | Transitional -> Migrate to ServiceGuideTemplate.css | Legacy dependent |
| `/stodampare-fjadrar` | Guide family | Transitional -> Migrate to ServiceGuideTemplate.css | Legacy transitional (`StodampareFjadrarPage.css`) |
| `/hjullagerbyte` | Guide family | Transitional -> Migrate to ServiceGuideTemplate.css | Legacy transitional (`HjullagerbytePage.css`) |
| `/styrning-kulleder` | Guide family | Transitional -> Migrate to ServiceGuideTemplate.css | Legacy transitional (`StyrningKullederPage.css`) |
| `/drivaxel-drivknutar` | Guide family | Transitional -> Migrate to ServiceGuideTemplate.css | Legacy transitional (`DrivaxelDrivknutarPage.css`) |
| `/bargning` | Unique | Complete | `BargningPage.css` (`.bargning-page__*`), mounts `PublicHeader` + `PublicFooter` |
| `/galleri` | Unique | Step 6: Rebuild as unique page | Legacy dependent |
| `/bilar-till-salu` | Unique | Step 6: Rebuild as unique page | Legacy dependent |
| `/biltjanster` | Unique | Complete | `BiltjansterPage.css` (`.biltjanster-hub__*`), mounts `PublicHeader` + `PublicFooter` |
| `/admin` | Admin | Internal utility | Admin local |

## Class-prefix collision check (mandatory before naming a new page's CSS island)

Every legacy page rebuilt so far (`ContactPage.tsx`, `AboutPage.tsx`, the guide pages before their template rebuilds, etc.) already has a same-named BEM block living in `index.css` — e.g. `.contact-page__*` had 107 rules in `index.css` before the `/kontakt` rebuild. `index.css` stays loaded globally for every route (`main.tsx` imports it unconditionally), so reusing a legacy page's own old class prefix for its "isolated" rebuild silently collides with those frozen rules instead of avoiding them — the page renders using an unpredictable mix of both stylesheets, not a clean island. Found live on the `/kontakt` rebuild (2026-09-18): the closing CTA rendered centered because `index.css:7440-7516`'s old `.contact-page__closing*` rules were still matching.

**Before writing a new page's first class name**, run `grep -c "\.<old-prefix>__" client/src/css/index.css` for whatever prefix the page's *legacy* markup used. If it's non-zero, pick a visibly different prefix for the rebuild (e.g. `/kontakt` moved from `contact-page__*` to `kontakt-page__*`) — do not reuse the old name just because the route or component name matches.

## Required task contract

Every CSS task must state exact write paths before editing:

```text
ALLOWED WRITES:
- client/src/pages/ExamplePage.tsx
- client/src/pages/ExamplePage.css

FORBIDDEN WRITES:
- client/src/css/index.css
- AGENTS.md
- server/**
- every path not listed above

STOP CONDITION:
If another path is required, report BLOCKED before editing it.
```

## Verification

For a page or shared-island change:

1. Confirm `git diff --name-only` contains only approved paths.
2. Confirm `client/src/css/index.css` has no diff.
3. Run `git diff --check`.
4. Run `npm --prefix client run build`.
5. Use Playwright for every real-browser UI evaluation. Check 1440, 768 and 390 CSS pixels when UI changed; capture screenshots, verify zero horizontal overflow and exercise the affected interactions.
6. Write the dated work note to `docs/SESSION_LOG_CURRENT.md`, not `AGENTS.md`.
