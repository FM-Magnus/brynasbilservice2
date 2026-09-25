# Images — how a page gets its pictures

This is the working guide for the current stage: filling image slots one page at a time. Rules for code live in `AGENTS.md`; this file covers the image workflow only.

## The loop (one page at a time)

1. **Inventory the page.** List its image slots and measure each one in the browser (snippet below) — never guess the size from the CSS.
2. **Spec each slot.** Choose a camera preset and a grade from the Drive library (below), write the scene brief, and give the exact export size.
3. **Create or select the image.** Magnus can supply Pixelmator exports in `_incoming-assets/IMPLEMENT/`; when authorized, Codex can generate and optimize the image directly. Reuse a suitable production asset before generating another one.
4. **Look at the file before using it** — filenames lie (two intake files once had each other's content). Check dimensions with `sips -g pixelWidth -g pixelHeight`.
5. **Wire it in** (naming and markup below), then verify at 1440 / 768 / 390: no console errors, no horizontal overflow, text readable over the image.
6. **Update** the slot table below and [`STATUS.md`](STATUS.md). Commit and push only on Magnus's go-ahead.

Measure a slot (run in the browser console, or through the preview tool, at 1440 wide; containers stop growing at ~1440):
```js
const r = document.querySelector('.service-guide__symptoms-media').getBoundingClientRect();
[Math.round(r.width), Math.round(r.height)]
```
Export at **2× the measured size** for sharp retina rendering.

## Guide-family slot sizes (measured 2026-09-22)

| Slot | Class | Rendered max | Export at least | Shape |
|---|---|---|---|---|
| Hero (full-bleed) | `.service-guide__hero-bg` | full width | 2400 × 1350 | ~16:9 landscape |
| Intro / components | `.service-guide__intro-media` | 525 × 374 | 1100 × 800 | ~1.4 landscape |
| Symptoms / inspection | `.service-guide__symptoms-media` | 526 × 984 | 1100 × 2050 | ~0.53 tall portrait |

Kamrem uses a scoped landscape modifier for its wide belt-inspection photo: `.service-guide__symptoms-media--landscape`. At 1440 px the image box is about 526 × 420; its 1672 × 941 export has sufficient pixels for the cropped view. Other guide pages retain the portrait slot above.

Below 1024 px the intro and symptom slots stack to one column (min-height 320 / 260 px), so no wide crop is needed.

## Service-reparationer slot sizes (measured 2026-09-23)

| Slot | Rendered at 1440 / 768 / 390 | Production export | Shape |
|---|---|---|---|
| Hero | 1440 × 647 / 768 × 630 / 390 × 780 | 2560 × 1440 | Wide landscape; overlays crop it at narrow widths |
| Servicebook and keys | 566 × 319 / 660 × 372 / 310 × 174 | 1400 × 788 | 16:9 landscape |
| Four value cards | 284 × 213 / 322 × 242 / 310 × 233 | 800 × 600 each | 4:3 landscape |

## Felsökning slot sizes (measured 2026-09-23)

| Slot | Rendered at 1440 / 768 / 390 | Production export | Shape |
|---|---|---|---|
| Hero | 1440 × 735 / 768 × 633 / 390 × 836 | 2880 × 1470 | Wide landscape with text area on the left |
| Intro / engine bay | 566 × 425 / 660 × 495 / 310 × 233 | 1320 × 990 | 4:3 landscape |
| Service card / OBD | 451 × 338 / 607 × 455 / 259 × 194 | 1214 × 910 | 4:3 landscape |

## Per-page status

"Placeholder" = still shows `MediaPlaceholder` / `ImageSlot`. Planned hero swaps use the object close-up brief (prompts written 2026-09-22).

| Page | Hero | Other slots | Planned |
|---|---|---|---|
| Koppling | ✓ | ✓ ✓ | swap hero to object close-up |
| Oljebyte | ✓ | ✓ ✓ | — |
| Stötdämpare & fjädrar | ✓ (mechanic, `--pos-left`) | ✓ ✓ | optional swap to object close-up |
| Bilbatteri | ✓ | ✓ ✓ | — |
| Drivaxel & drivknutar | ✓ (the reference image) | ✓ ✓ | — |
| Kamrem | ✓ | ✓ ✓ (landscape inspection crop) | — |
| Avgassystem | ✓ | ✓ ✓ | — |
| Bromssystem | ✓ | ✓ ✓ | — |
| Hjullagerbyte | ✓ | ✓ ✓ | — |
| Styrning & kulleder | ✓ | ✓ ✓ | — |
| Service-reparationer | ✓ | ✓ servicebook/keys + ✓ four value cards | — |
| Felsökning | ✓ new diagnostics hero | ✓ engine-bay tablet + ✓ OBD detail | — |
| Biltjänster | CSS-only | ✓ all 11 guide cards have photos | — |
| Bilar till salu | ✓ | conditional placeholders when a car lacks photos | — |
| Landing | ✓ `home/landing-v2/landing-cockpit-steering-hero` | ✓ why (`landing-why-reassurance-handshake-v2`), process (`landing-customer-interaction-background`), car for sale; the service area is vector icons, no photo | — |
| Om oss | ✓ `about/about-hero-maher-customers` (Maher with customers outside; no overlay — Maher sits under the headline at desktop and is cropped out on phones, a left-extended version is wanted) | ✓ workshop and tyre photos (`about/`, `workshop/`, `services/tires/`) | extend hero left |
| Däckservice | ✓ `services/tires/tires-hero-bg` | ✓ six tyre cards (colour grade in page CSS, files unchanged), storage | — |
| AC-service | ✓ `services/ac/ac-hero-bg` | ✓ `ac-manometers-on-engine` (JPG only, no WebP) | — |
| Bärgning | ✓ | ✓ tow truck, workshop, car for sale | — |
| Kontakt | ✓ `about/about-hero-bg` | — | — |
| Galleri | folder-driven | every photo in `client/src/assets/galleri/` (see `LÄSMIG.md`) | — |

## Photo brief (what works on this site)

- **Hero:** the subject in the **right ~60 %**, the left ~40 % dark and out of focus — the headline sits there under the gradient. Let dark teal and a touch of ember live in that left shadow so it looks intended, not underexposed.
- **Object close-ups beat mechanic shots** for heroes: a part on a bench or at an angle (Drivaxel is the reference). They look better and don't need a person to be rendered right.
- **Show quality, not damage.** Heroes use new or freshly fitted parts. Wear, rust and grime belong only where the section is *about* the problem (symptom lists, the old-vs-new comparison).
- **Crop:** the hero crops from the right by default (`object-position: center right`). If the subject sits left of centre, add `.service-guide__hero-bg--pos-left` — decide by looking at the image.
- **No people in `/galleri`.** Maher's real likeness only with his OK.

## Prompt library and reference files

The camera presets and grade presets live on **Google Drive, `My Drive/## FOR AGENTS_BRYNASBIL/`** (canonical; the old repo copy is in `archive/`). A prompt = reference handling + scene brief + one camera preset + one grade + output size.

- **Grade by role:** *Hard* for heroes/backgrounds under an overlay; *Medium* for people; *Small* for factual detail and object close-ups.
- **Reference files** in the Drive folder, recognised by filename prefix:
  - `env_ref_*` — the real workshop: locality, light, ambience. Not composition.
  - `char_ref_*` — identity of a person (Maher's portrait: `char_ref_maher-portrait.jpg` on the Drive).
  - `env_subject_*` — what a real part looks like (downloaded catalog photo). Form and material only; not angle, lighting or colour of aftermarket parts. Skip it for simple shapes (a coil spring) and avoid watermarked or branded images.

## Files and markup

- **Location:** `client/src/assets/images/services/<topic>/<topic>-<subject>-<role>.{webp,jpg}` for service and guide pages; Landing uses `home/landing-v2/landing-<subject>.{webp,jpg}` — e.g. `services/suspension/suspension-mechanic-wrench-workshop-hero`. Always both formats.
- **WebP:** `sips` cannot write WebP here; use `cwebp -q 90 in.jpg -o out.webp`. `sips -r -90` rotates counter-clockwise.
- **Markup:** `<picture><source srcSet={webp} type="image/webp" /><img src={jpg} alt="…" loading="lazy" /></picture>` inside the slot. Swedish alt text that says what is in the picture. No inline `style=`.
- **Intake:** finished exports come from `_incoming-assets/IMPLEMENT/`. Don't pull from the other intake subfolders unless Magnus points at a file ([`_incoming-assets/README.md`](../_incoming-assets/README.md)).
- **Gallery** photos go straight into `client/src/assets/galleri/` (see `LÄSMIG.md` there); that folder drives `/galleri` and the Landing page's `GalleryDockStrip` (via `getGalleryImages()`) and nothing else. `client/src/assets/images/workshop/` holds fixed exports of some of the same workshop photos for other pages (Om oss, Bärgning, Bilar till salu); renaming or removing a `/galleri` photo never affects them. **Car photos** are wired in `client/src/data/vehicles.ts`.
