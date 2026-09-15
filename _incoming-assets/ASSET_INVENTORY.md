# Complete image inventory — 2026-09-15

This is the authoritative map for every image family in the Brynäs Bilservice
workspace. It separates sources, production assets, preserved legacy files and
documentation evidence so a thumbnail can never be mistaken for a main image.

## Rules that apply to every image

- `_incoming-assets/` is the local, Git-ignored **source bank**. It is never
  imported by React or CSS at runtime.
- `client/src/assets/images/` is the only production-image tree. A selected
  image gets a content-based name, a WebP primary export and a JPG fallback
  when the component uses `<picture>`.
- `-thumb` is reserved for a 640px thumbnail. It must never be used in a large
  viewer, hero or other main-image slot.
- `client/src/assets/images/archive/` preserves old tracked exports. Nothing in
  that tree is a live production import or an approved image choice.
- `_magnus/` and `docs/redesign-phase-0/captures/` are evidence/reference
  images, not website assets; they intentionally remain outside the production
  tree.

## Production tree

| Area | Canonical path | Format and role | Live code owner |
| --- | --- | --- | --- |
| Brand | `brand/brynas-bilservice-logo.svg` | Current vector logo | Header, Footer |
| Home | `home/hero/home-workshop-hero.{webp,jpg}` | 1920px hero pair | `index.css` `image-set()` |
| Gallery | `gallery/workshop/workshop-*.{webp,jpg}` | Eleven 1920px no-people workshop views | `GalleryPage.tsx`; selected hero on `AboutPage.tsx` |
| Gallery cards | `gallery/workshop/workshop-*-card.webp` | Six 1280px animated landing-page overview exports | `GalleryTeaserCard.tsx` |
| Gallery thumbnails | `gallery/workshop/workshop-*-thumb.{webp,jpg}` | Matching 640px thumbnails only | `GalleryPage.tsx`, `GalleryTeaserCard.tsx` |
| People | `people/maher-basher-portrait.{webp,jpg}` and `-thumb` pair | Owner portrait and its thumbnail | `AboutPage.tsx` |
| Services | `services/{ac,diagnostics,repair,timing-belt,tires,towing}/` | Selected page-specific imagery | Services and service-guide pages |
| Vehicles | `vehicles/peugeot-307-cc/` | 1920px photo pairs plus 640px picker thumbnails | `BilarTillSalu.tsx` |
| Public | `client/public/favicon.{ico,png}` | Browser favicon | `client/index.html` |

### Gallery workshop set — main viewer mapping

All eleven items were visually checked as workshop views without people and
exported from their 2304–2397px local source originals to 1920px production
WebP/JPG pairs. Each has a matching 640px thumbnail pair in the same folder.

| Production basename | Source-bank basename |
| --- | --- |
| `workshop-workbench-and-tire-machines` | `verkstad__arbetsbank-och-dackmaskiner__landskap__v01` |
| `workshop-car-open-hood` | `verkstad__bil-med-oppen-motorhuv__landskap__v01` |
| `workshop-lifts-and-tire-racks` | `verkstad__billyftar-och-dackstall__landskap__v01` |
| `workshop-car-bay-and-tire-racks` | `verkstad__bilplats-vid-dackstall__landskap__v01` |
| `workshop-empty-lifts` | `verkstad__bortre-billyftar__landskap__v01` |
| `workshop-overhead-tire-storage` | `verkstad__bred-oversikt-fran-lyft__landskap__v01` |
| `workshop-tire-machine-and-tools` | `verkstad__dackmaskiner-och-verktyg__landskap__v01` |
| `workshop-tire-racks-and-rims` | `verkstad__dackstall-och-falgar__landskap__v01` |
| `workshop-car-on-lift` | `verkstad__honda-pa-billyft__landskap__v01` |
| `workshop-overhead-car-bay` | `verkstad__oversikt-fran-lyft__landskap__v01` |
| `workshop-service-aisle` | `verkstad__servicegang-mot-kontor__landskap__v01` |

`GalleryPage.tsx` is the sole owner of the complete eleven-image viewer.
`GalleryTeaserCard.tsx` deliberately uses six broad 1280px `-card.webp` views:
`workshop-car-open-hood`, `workshop-empty-lifts`, `workshop-overhead-car-bay`,
`workshop-service-aisle`, `workshop-car-on-lift` and
`workshop-lifts-and-tire-racks`. Detail views of the tire machine and workbench
are intentionally excluded from the landing-page teaser.

## Source-bank taxonomy

| Folder | Content boundary |
| --- | --- |
| `01_blue_tone_bakgrunder/` | Reusable blue/teal creative backgrounds, including hero originals and smaller card treatments. |
| `02_kundinteraktion/` | Customer meetings, advice, handovers and human-led diagnostic scenes. |
| `03_verkstad_och_team/` | Workshop overviews, tools, Maher and other team photography. The eleven no-people gallery sources live in `verkstadsoversikter/`. |
| `04_tjanster/` | Service-specific imagery, grouped by service number and subject. |
| `05_bargning_och_transport/` | Towing and planned vehicle transport, separate from workshop imagery. |
| `06_bilar_till_salu/` | Preserved Peugeot listing originals. |
| `98_redo_att_valja/` | Explicit duplicates and page-ready references; duplicates are provenance only, never new asset candidates. |
| `incoming/` and `99_osorterat/` | Empty/intake-only staging locations. |

Source thumbnails use `__thumb.jpg`; their originals keep an orientation and
version suffix. Exact duplicates are marked `__duplicate` and have been checked
against the corresponding source file by checksum.

## Preserved legacy and reference images

- `client/src/assets/images/archive/` now groups old image exports by actual
  subject: `brand/`, `gallery-legacy/`, `home-heros/`, `services/`, `towing/`,
  `vehicles/` and `workshop/`. The former mixed flat gallery exports are in
  `archive/gallery-legacy/`; this includes the obsolete 640px teaser-only
  files and former reception/exterior exports. They are retained for
  provenance and are not referenced by code.
- `client/public/archive/legacy-icons.svg` is an unused legacy symbol sprite;
  the current website does not reference it.
- `_magnus/REVIEWS/` contains the real Google-review screenshot evidence noted
  in `AGENTS.md`; other `_magnus/` images are Magnus's design/reference files.
- `docs/redesign-phase-0/captures/` contains historical desktop, tablet and
  mobile review captures. These are documentation, not runtime assets.

## Verification contract

After any image change, verify all of the following:

1. No `src` or CSS reference points into `_incoming-assets/` or `archive/`.
2. Every selected main image has a non-thumbnail production export; every
   carousel/picker thumbnail has the corresponding full export.
3. Image imports resolve in `npm --prefix client run build`.
4. For visible UI, check successful image loading and 0px horizontal overflow
   at 1440px, 768px and 390px.
