# CSS ownership and migration policy

This is the operational CSS map for Brynäs Bilservice. It is intentionally explicit so smaller coding models can follow it without interpreting architectural intent.

## Non-negotiable rules

The legacy `client/src/css/index.css` was **deleted in Step 7 (2026-09-19)**. The rebuild is complete.

- Never recreate a global catch-all stylesheet, and never reintroduce `--redesign-*`, `--color-*` or legacy class systems.
- Global CSS is exactly: `styles/tailwind.css`, `styles/design-tokens.css`, `styles/base.css`, `styles/shared-elements.css` (loaded in that order in `main.tsx`). Adding a fifth global file needs Magnus's approval.
- Every page, family and shared component owns its CSS island, imported by its `.tsx`, with a unique class prefix.
- If a task seems to require a new global rule, token or shared pattern, stop and propose it to Magnus first.

## Public shell and shared components

- `client/src/styles/design-tokens.css` owns the `--bb-*` tokens. Everything consumes these; there are no other token sets.
- `client/src/data/publicNavigation.ts` is the navigation source for `PublicHeader`.
- `client/src/components/layout/PublicHeader.tsx` / `PublicHeader.css` and `PublicFooter.tsx` / `PublicFooter.css` are the only header and footer. The legacy `Header.tsx`/`Footer.tsx` were deleted in Step 7.
- `client/src/components/ui/GalleryTeaserCard.tsx` / `.css`: Ken Burns workshop slideshow card (`defaultWorkshopSlides`).
- `client/src/components/ui/GoogleReviewsCard.tsx` / `.css`: Google reviews (`defaultGoogleReviews`, `.bb-reviews-card*`).
- `client/src/components/ui/ContactFormCard.tsx` / `.css`: contact module (`defaultContactSubjects`, `.bb-contact-section*`, `.bb-contact-form*`).
- `client/src/components/ui/BiltjansterFaq.tsx` / `.css`: FAQ accordion (`.bb-faq__*`).
- `client/src/components/BookingForm.tsx` / `.css`: booking modal (`.modal-*`). Pages open it through callbacks; vehicle inquiries pass `initialComment`.

## The Rebuild Architecture (Master Blueprint)

**Revised 2026-09-18**: The site is not a symmetrical set of 7 style archetypes. Most pages are too divergent in content and purpose to honestly share a template. The entire site was rebuilt away from the legacy `index.css` (deleted 2026-09-19) into a canonical design token layer at the top, **7 fully unique standalone pages**, and **2 shared service-page families** (the only groups where the pages are genuinely the same kind of content):

1. **Top: Canonical Design Layer & Shell**:
   - `client/src/styles/design-tokens.css` owns the `--bb-*` canonical tokens (colors, Archivo display/Manrope body type scales, radii, spacing, shadows).
   - `client/src/styles/shared-elements.css` owns global `.bb-*` pattern classes below the token layer (buttons, eyebrow, headings, card motifs, icon badges) — see `docs/DESIGN_SYSTEM.md` §2a. Loaded globally in `client/src/main.tsx` together with `design-tokens.css`, and used by all rebuilt pages.
   - `client/src/data/publicNavigation.ts` + `PublicHeader.tsx` / `PublicHeader.css` (free-standing navigation element) + `PublicFooter.tsx` / `PublicFooter.css` (canonical standalone global footer).
   - `client/src/components/ui/GalleryTeaserCard.tsx` / `GalleryTeaserCard.css` (reusable standalone workshop teaser card).
   - `client/src/components/ui/GoogleReviewsCard.tsx` / `GoogleReviewsCard.css` (reusable standalone Google reviews card/overlay).
   - `client/src/components/ui/ContactFormCard.tsx` / `ContactFormCard.css` (reusable standalone contact module and form card).
   - `client/src/components/BookingForm.tsx` / `BookingForm.css` (booking modal, `.modal-*`, on `--bb-*` tokens) and `client/src/components/ui/BiltjansterFaq.tsx` / `BiltjansterFaq.css` (FAQ accordion, `.bb-faq__*`), both independent of `index.css` since 2026-09-19.
   - `client/src/styles/base.css` (global element defaults) and `client/src/styles/tailwind.css` (Tailwind directives; preflight global, utilities for `/admin` only), both imported in `main.tsx`.

2. **The 7 unique, standalone pages** — each owns its own bespoke design and its own colocated CSS island. No shared page template between them.
   - `Startsidan` (`/`) — `LandingPage.tsx` + `LandingPage.css` (`.landing-v2__*`). Complete.
   - `Om oss` (`/om-oss`) — `AboutPage.tsx` + `AboutPage.css` (`.omoss-page__*`). Complete. Rebuilt from approved mockup with zero dependency on `index.css`.
   - `Kontakt` (`/kontakt`) — `ContactPage.tsx` + `ContactPage.css` (`.kontakt-page__*`). Complete. Rebuilt from approved mockup with zero dependency on `index.css`, mounts `PublicHeader` (overlay) + `PublicFooter`.
   - `Bärgning` (`/bargning`) — `BargningPage.tsx` + `BargningPage.css` (`.bargning-page__*`). Complete. Rebuilt from approved mockup with zero dependency on `index.css`, mounts `PublicHeader` + `PublicFooter`.
   - `Bilar till salu` (`/bilar-till-salu`) — `BilarTillSalu.tsx` + `BilarTillSalu.css` (`.bilartillsalu-page__*`). Complete. Zero dependency on `index.css`, mounts `PublicHeader` (overlay) + `PublicFooter`. Stock data lives outside the page in `client/src/data/vehicles.ts` behind `client/src/api/vehicles.ts` (backend-ready; see `docs/BACKEND_HANDOFF.md`).
   - `Galleri` (`/galleri`) — `GalleryPage.tsx` + `GalleryPage.css` (`.galleri-page__*`). Complete. Zero dependency on `index.css`, mounts `PublicHeader` (overlay) + `PublicFooter`. Photos are folder-driven: `client/src/assets/galleri/` via `client/src/data/gallery.ts` → `client/src/api/gallery.ts` (see `LÄSMIG.md` in that folder).
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
| `/felsokning` | Bilservice family | Complete — on `--bb-*` tokens & `.bilservice__*` family styles, mounts `PublicHeader` (overlay) + `PublicFooter` | `ServiceReparationerPage.css` |
| `/dackservice` | Bilservice family | Complete — on `--bb-*` tokens & `.bilservice__*` family styles, mounts `PublicHeader` (overlay) + `PublicFooter` | `ServiceReparationerPage.css` |
| `/ac-service` | Bilservice family | Complete — on `--bb-*` tokens & `.bilservice__*` family styles, mounts `PublicHeader` (overlay) + `PublicFooter` | `ServiceReparationerPage.css` |
| `/koppling` | Guide family | Complete — on `--bb-*` tokens & `.bb-*` shared elements, mounts `PublicHeader` (overlay) + `PublicFooter` (Second Pass verified) | `ServiceGuideTemplate.css` |
| `/avgassystem` | Guide family | Complete — on `--bb-*` tokens & `.bb-*` shared elements, mounts `PublicHeader` (overlay) + `PublicFooter` (Second Pass verified) | `ServiceGuideTemplate.css` |
| `/oljebyte` | Guide family | Complete — on `--bb-*` tokens & `.bb-*` shared elements, mounts `PublicHeader` (overlay) + `PublicFooter` (Second Pass verified) | `ServiceGuideTemplate.css` |
| `/bromssystem` | Guide family | Complete — on `--bb-*` tokens & `.bb-*` shared elements, mounts `PublicHeader` (overlay) + `PublicFooter` (Second Pass verified) | `ServiceGuideTemplate.css` |
| `/kamrem` | Guide family | Complete — on `--bb-*` tokens & `.bb-*` shared elements, mounts `PublicHeader` (overlay) + `PublicFooter` (First Sibling Proof verified) | `ServiceGuideTemplate.css` |
| `/bilbatteri` | Guide family | Complete — on `--bb-*` tokens & `.bb-*` shared elements, mounts `PublicHeader` (overlay) + `PublicFooter` | `ServiceGuideTemplate.css` |
| `/stodampare-fjadrar` | Guide family | Complete — on `--bb-*` tokens & `.bb-*` shared elements, mounts `PublicHeader` (overlay) + `PublicFooter` | `ServiceGuideTemplate.css` |
| `/hjullagerbyte` | Guide family | Complete — on `--bb-*` tokens & `.bb-*` shared elements, mounts `PublicHeader` (overlay) + `PublicFooter` | `ServiceGuideTemplate.css` |
| `/styrning-kulleder` | Guide family | Complete — on `--bb-*` tokens & `.bb-*` shared elements, mounts `PublicHeader` (overlay) + `PublicFooter` | `ServiceGuideTemplate.css` |
| `/drivaxel-drivknutar` | Guide family | Complete — on `--bb-*` tokens & `.bb-*` shared elements, mounts `PublicHeader` (overlay) + `PublicFooter` | `ServiceGuideTemplate.css` |
| `/bargning` | Unique | Complete | `BargningPage.css` (`.bargning-page__*`), mounts `PublicHeader` + `PublicFooter` |
| `/galleri` | Unique | Complete | `GalleryPage.css` (`.galleri-page__*`), mounts `PublicHeader` (overlay) + `PublicFooter` |
| `/bilar-till-salu` | Unique | Complete | `BilarTillSalu.css` (`.bilartillsalu-page__*`), mounts `PublicHeader` (overlay) + `PublicFooter` |
| `/biltjanster` | Unique | Complete | `BiltjansterPage.css` (`.biltjanster-hub__*`), mounts `PublicHeader` + `PublicFooter` |
| `/tjanster` | Redirect | Retired in Step 7 — `<Navigate to="/biltjanster" replace />` in `main.tsx` | — |
| `/admin` | Admin | Internal utility | Tailwind utilities (`styles/tailwind.css`) |

## Class-prefix collision check (mandatory before naming a new CSS island)

Two stylesheets matching the same class makes a page render with a mix of both — found live on `/kontakt` (2026-09-18), when a legacy prefix was reused. `index.css` is gone, but the rule still applies between islands. **Before writing a new prefix**, confirm it's unused:

```bash
grep -rn "\.<new-prefix>" client/src --include=*.css
```

It must return nothing. Prefixes in use include `.landing-v2__`, `.omoss-page__`, `.kontakt-page__`, `.bargning-page__`, `.biltjanster-hub__`, `.bilartillsalu-page__`, `.galleri-page__`, `.bilservice__`, `.service-guide__`, `.public-header`, `.bb-footer__`, `.bb-*` (shared) and `.modal-*` (booking).

## Required task contract

Every CSS task must state exact write paths before editing:

```text
ALLOWED WRITES:
- client/src/pages/ExamplePage.tsx
- client/src/pages/ExamplePage.css

FORBIDDEN WRITES:
- client/src/styles/* (global layer — only with explicit approval)
- AGENTS.md
- server/**
- every path not listed above

STOP CONDITION:
If another path is required, report BLOCKED before editing it.
```

## Verification

For a page or shared-island change:

1. Confirm `git diff --name-only` contains only approved paths.
2. Run `git diff --check`.
3. Run `npm --prefix client run typecheck` and `npm --prefix client run build`.
4. Use Playwright for every real-browser UI evaluation. Check 1440, 768 and 390 CSS pixels when UI changed; capture screenshots, verify zero horizontal overflow and exercise the affected interactions.
5. Write the dated work note to `docs/SESSION_LOG_CURRENT.md`, not `AGENTS.md`.
