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

## Fully isolated page families

| Route | TSX owner | CSS owner | Required prefix |
| --- | --- | --- | --- |
| `/` | `client/src/pages/landing/LandingPage.tsx` | `LandingPage.css` plus `components/layout/PublicHeader.css` | `.landing-v2__*`, `.public-header__*` |
| `/service-reparationer` | `client/src/pages/ServiceReparationerPage.tsx` | `client/src/pages/ServiceReparationerPage.css` | `.bilservice__*` |
| `/koppling` | `client/src/pages/KopplingPage.tsx` | `client/src/styles/ServiceGuideTemplate.css` | `.service-guide__*` |
| `/avgassystem` | `client/src/pages/AvgassystemPage.tsx` | `client/src/styles/ServiceGuideTemplate.css` | `.service-guide__*` |
| `/oljebyte` | `client/src/pages/OljebytePage.tsx` | `client/src/styles/ServiceGuideTemplate.css` | `.service-guide__*` |
| `/bromssystem` | `client/src/pages/BromssystemPage.tsx` | `client/src/styles/ServiceGuideTemplate.css` | `.service-guide__*` |

`ServiceGuideTemplate.css` is one shared island for the explicitly listed guide family. Extend it only when the change is safe and useful for every consuming page, or when a narrowly named modifier preserves the other pages. Do not fork or duplicate it.

## Transitional page islands

These pages import a colocated CSS file but may still consume frozen global/legacy selectors. Extend only the owned file; leave `index.css` untouched.

| Route | Owned CSS island |
| --- | --- |
| `/om-oss` | `client/src/pages/AboutPage.css` |
| `/ac-service` | `client/src/pages/AcServicePage.css` |
| `/dackservice` | `client/src/pages/DackservicePage.css` |
| `/bargning` | `client/src/pages/BargningPage.css` |
| `/drivaxel-drivknutar` | `client/src/pages/DrivaxelDrivknutarPage.css` |
| `/stodampare-fjadrar` | `client/src/pages/StodampareFjadrarPage.css` |
| `/hjullagerbyte` | `client/src/pages/HjullagerbytePage.css` |
| `/styrning-kulleder` | `client/src/pages/StyrningKullederPage.css` |

## Legacy-dependent routes

Routes without an owned page stylesheet may keep their current styling unchanged. If one is redesigned, create a new colocated CSS island with a unique route-specific prefix; do not modify the legacy file.

This currently includes `/biltjanster`, `/felsokning`, `/kamrem`, `/bilbatteri`, `/tjanster`, `/bilar-till-salu`, `/galleri`, `/kontakt` and `/admin`.

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
