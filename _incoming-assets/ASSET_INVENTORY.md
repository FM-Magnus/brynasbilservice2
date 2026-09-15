# Asset inventory — 2026-09-15

This local inventory records the image-library cleanup. It distinguishes the
source bank from files imported by the React client.

## Production imports

| Area | Canonical asset set | Code owner |
| --- | --- | --- |
| Brand | `client/src/assets/images/brand/brynas-bilservice-logo.svg` | Header and Footer |
| Home hero | `client/src/assets/images/home/hero/home-workshop-hero.webp` + `.jpg` | `index.css` via `image-set()` |
| Gallery | `client/src/assets/images/gallery/workshop-{mechanical-bay,tire-storage,customer-reception,exterior}.{webp,jpg}` | AboutPage and GalleryPage |
| Gallery teaser | `client/src/assets/images/gallery/workshop-{lifts,tire-machine,workbench,car-lift}-thumb.{webp,jpg}` | GalleryTeaserCard |
| Maher | `client/src/assets/images/people/maher-basher-portrait.{webp,jpg}` | AboutPage |
| Service imagery | `client/src/assets/images/services/{repair,diagnostics,ac,tires,towing,timing-belt}/` | ServicesPage and relevant service pages |
| Peugeot listing | `client/src/assets/images/vehicles/peugeot-307-cc/` | BilarTillSalu, including full WebP/JPG and thumbnail pairs |

## Preserved originals and explicit duplicates

- The original home-hero JPEG is in `01_blue_tone_bakgrunder/heros/original/`.
- The three 4032×3024 Peugeot originals are in
  `06_bilar_till_salu/bildserier/peugeot-307-cc/original/`.
- All local source thumbnails use `__thumb.jpg` and are derivatives only.
- `98_redo_att_valja/dubletter/` contains three provenance-only duplicates;
  none is an independent candidate.

## Non-production archive

`client/src/assets/images/archive/` contains 14 legacy, non-imported web
exports, grouped by subject. They remain tracked so this cleanup never deletes
previously versioned assets, but they must not be treated as approved imagery.
