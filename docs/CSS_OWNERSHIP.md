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
- The legacy `Header.tsx`, Footer and BookingForm remain untouched until separately migrated. A new page may receive booking behaviour through a callback, but the new header must not import the legacy booking component.

## The 7-Style Rebuild Architecture (Master Blueprint)

The entire site is being rebuilt away from `index.css` into a canonical design token layer at the top, 4 shared design templates, and 2 unique standalone pages (7 design types total):

1. **Top: Canonical Design Layer & Shell**:
   - `client/src/styles/design-tokens.css` owns the `--bb-*` canonical tokens (colors, Archivo display/Manrope body type scales, radii, spacing, shadows).
   - `client/src/data/publicNavigation.ts` + `PublicHeader.tsx` / `PublicHeader.css` (free-standing navigation element) + upcoming `PublicFooter`.

2. **Style 1: Brand & Conversion Hub (Parent: Startsidan `/`)**:
   - *Parent*: `LandingPage.tsx` + `LandingPage.css` (`.landing-v2__*`).
   - *Children to be built brand-new on this archetype*: `Om oss` (`/om-oss`) and `Kontakt` (`/kontakt`).

3. **Style 2: Major Service & Editorial Hub (Parent: Bilservice `/service-reparationer`)**:
   - *Parent*: `ServiceReparationerPage.tsx` + `ServiceReparationerPage.css` (`.bilservice__*`).
   - *Children to be built on this archetype*: `Felsökning` (`/felsokning`), `Däckservice` (`/dackservice`), `AC-service` (`/ac-service`).

4. **Style 3: Technical Service Guides — Group A**:
   - *Template*: `ServiceGuideTemplate.css` (`.service-guide__*`).
   - *Current pages*: `Koppling` (`/koppling`), `Avgassystem` (`/avgassystem`), `Oljebyte` (`/oljebyte`), `Bromssystem` (`/bromssystem`).

5. **Style 4: Technical Service Guides — Group B**:
   - *Template*: New distinct guide template for the remaining technical service pages, providing visual variety while reusing shared components.
   - *Pages*: `Kamrem` (`/kamrem`), `Bilbatteri` (`/bilbatteri`), `Stötdämpare & fjädrar` (`/stodampare-fjadrar`), `Hjullagerbyte` (`/hjullagerbyte`), `Styrning & kulleder` (`/styrning-kulleder`), `Drivaxel & drivknutar` (`/drivaxel-drivknutar`).

6. **Style 5: Unique Workshop Gallery (`/galleri`)**:
   - Bespoke image-first showcase and workshop storytelling design.

7. **Style 6: Unique Vehicle Sales (`/bilar-till-salu`)**:
   - Bespoke automotive inventory design with vehicle specs, gallery viewer, and inquiry flow.

## Active Status of Routes During Rebuilding

| Route | Architecture Group | Status | CSS Owner |
| --- | --- | --- | --- |
| `/` | Style 1 (Parent) | Complete / Active | `LandingPage.css` + `PublicHeader.css` |
| `/om-oss` | Style 1 (Child) | Transitional -> Rebuild to Style 1 | Legacy transitional (`AboutPage.css`) |
| `/kontakt` | Style 1 (Child) | Transitional -> Rebuild to Style 1 | Legacy dependent |
| `/service-reparationer` | Style 2 (Parent) | Complete / Needs PublicHeader | `ServiceReparationerPage.css` |
| `/felsokning` | Style 2 (Child) | Transitional -> Rebuild to Style 2 | Legacy dependent |
| `/dackservice` | Style 2 (Child) | Transitional -> Rebuild to Style 2 | Legacy transitional (`DackservicePage.css`) |
| `/ac-service` | Style 2 (Child) | Transitional -> Rebuild to Style 2 | Legacy transitional (`AcServicePage.css`) |
| `/koppling` | Style 3 | Complete / Needs PublicHeader | `ServiceGuideTemplate.css` |
| `/avgassystem` | Style 3 | Complete / Needs PublicHeader | `ServiceGuideTemplate.css` |
| `/oljebyte` | Style 3 | Complete / Needs PublicHeader | `ServiceGuideTemplate.css` |
| `/bromssystem` | Style 3 | Complete / Needs PublicHeader | `ServiceGuideTemplate.css` |
| `/kamrem` | Style 4 | Transitional -> Rebuild to Style 4 | Legacy dependent |
| `/bilbatteri` | Style 4 | Transitional -> Rebuild to Style 4 | Legacy dependent |
| `/stodampare-fjadrar` | Style 4 | Transitional -> Rebuild to Style 4 | Legacy transitional (`StodampareFjadrarPage.css`) |
| `/hjullagerbyte` | Style 4 | Transitional -> Rebuild to Style 4 | Legacy transitional (`HjullagerbytePage.css`) |
| `/styrning-kulleder` | Style 4 | Transitional -> Rebuild to Style 4 | Legacy transitional (`StyrningKullederPage.css`) |
| `/drivaxel-drivknutar` | Style 4 | Transitional -> Rebuild to Style 4 | Legacy transitional (`DrivaxelDrivknutarPage.css`) |
| `/bargning` | Transitional | Specialized service | Legacy transitional (`BargningPage.css`) |
| `/galleri` | Style 5 (Unique) | Transitional -> Bespoke rebuild | Legacy dependent |
| `/bilar-till-salu` | Style 6 (Unique) | Transitional -> Dedicated rebuild | Legacy dependent |
| `/biltjanster` | Hub | Transitional directory | Legacy dependent |
| `/admin` | Admin | Internal utility | Admin local |

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
