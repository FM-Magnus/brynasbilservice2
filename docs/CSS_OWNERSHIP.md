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

## Fully isolated page families

| Route | TSX owner | CSS owner | Required prefix |
| --- | --- | --- | --- |
| `/` | `client/src/pages/landing/LandingPage.tsx` | `client/src/pages/landing/LandingPage.css` | `.landing-v2__*` |
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
5. Browser-check 1440, 768 and 390 CSS pixels when UI changed; verify zero horizontal overflow and the affected interactions.
6. Write the dated work note to `docs/SESSION_LOG_CURRENT.md`, not `AGENTS.md`.
