# Images — how a page gets its pictures

This is the working guide for the current stage: filling image slots one page at a time. Rules for code live in `AGENTS.md`; this file covers the image workflow only.

## The loop (one page at a time)

1. **Inventory the page.** List its image slots and measure each one in the browser (snippet below) — never guess the size from the CSS.
2. **Spec each slot.** Choose a camera preset and a grade from the Drive library (below), write the scene brief, give the exact export size. Put a finished prompt in chat for Magnus.
3. **Magnus generates and grades** (GPT Imagegen + Pixelmator) and drops the finished `.jpg` + `.webp` in `_incoming-assets/IMPLEMENT/`.
4. **Look at the file before using it** — filenames lie (two intake files once had each other's content). Check dimensions with `sips -g pixelWidth -g pixelHeight`.
5. **Wire it in** (naming and markup below), then verify at 1440 / 768 / 390: no console errors, no horizontal overflow, text readable over the image.
6. **Commit** one page per commit. Update the slot table below and [`STATUS.md`](STATUS.md).

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

Below 1024 px the intro and symptom slots stack to one column (min-height 320 / 260 px), so no wide crop is needed. Bilservice-family slots (`.bilservice__image-slot`) are not measured yet — measure before specifying.

## Per-page status

"Placeholder" = still shows `MediaPlaceholder` / `ImageSlot`. Planned hero swaps use the object close-up brief (prompts written 2026-09-22).

| Page | Hero | Other slots | Planned |
|---|---|---|---|
| Koppling | ✓ | ✓ ✓ | swap hero to object close-up |
| Oljebyte | ✓ | ✓ | swap hero to fresh oil-filter close-up |
| Stötdämpare & fjädrar | ✓ (mechanic, `--pos-left`) | ✓ ✓ | optional swap to object close-up |
| Bilbatteri | ✓ | ✓ ✓ | — |
| Drivaxel & drivknutar | ✓ (the reference image) | 2 placeholders | — |
| Kamrem | ✓ | 2 placeholders | — |
| Avgassystem | ✓ | 2 placeholders | swap hero to new-exhaust close-up |
| Bromssystem | none (dark fallback) | 2 placeholders | new disc/caliper close-up |
| Hjullagerbyte | none | 2 placeholders | new hub-unit close-up |
| Styrning & kulleder | none | 2 placeholders | new ball-joint close-up |
| Service-reparationer | `ImageSlot` placeholder | servicebook/keys slot + one 4:3 slot per value card (all placeholders) | whole page open — measure first |
| Biltjänster | CSS-only | guide cards without a photo show a placeholder | — |
| Bilar till salu | ✓ | conditional placeholders when a car lacks photos | — |

## Photo brief (what works on this site)

- **Hero:** the subject in the **right ~60 %**, the left ~40 % dark and out of focus — the headline sits there under the gradient. Let dark teal and a touch of ember live in that left shadow so it looks intended, not underexposed.
- **Object close-ups beat mechanic shots** for heroes: a part on a bench or at an angle (Drivaxel is the reference). They look better and don't need a person to be rendered right.
- **Show quality, not damage.** Heroes use new or freshly fitted parts. Wear, rust and grime belong only where the section is *about* the problem (symptom lists, the old-vs-new comparison).
- **Crop:** the hero crops from the right by default (`object-position: center right`). If the subject sits left of centre, add `.service-guide__hero-bg--pos-left` — decide by looking at the image.
- **No people in `/galleri`.** Maher's real likeness only with his OK.

## Prompt library and reference files

The camera presets and grade presets live on **Google Drive, `My Drive/## FOR AGENTS_BRYNASBIL/`** (canonical; the old repo copy is in `archive/`). A prompt = reference handling + scene brief + one camera preset + one grade + output size.

- **Grade by role:** *Hard* for heroes/backgrounds under an overlay; *Medium* for people; *Small* for factual detail and object close-ups.
- **Reference files** Magnus attaches, recognised by filename prefix:
  - `env_ref_*` — the real workshop: locality, light, ambience. Not composition.
  - `char_ref_*` — identity of a person (Maher's portrait: `char_ref_maher-portrait.jpg` on the Drive).
  - `env_subject_*` — what a real part looks like (downloaded catalog photo). Form and material only; not angle, lighting or colour of aftermarket parts. Skip it for simple shapes (a coil spring) and avoid watermarked or branded images.

## Files and markup

- **Location:** `client/src/assets/images/services/<topic>/<topic>-<subject>-<role>.{webp,jpg}` — e.g. `services/suspension/suspension-mechanic-wrench-workshop-hero`. Always both formats.
- **WebP:** `sips` cannot write WebP here; use `cwebp -q 90 in.jpg -o out.webp`. `sips -r -90` rotates counter-clockwise.
- **Markup:** `<picture><source srcSet={webp} type="image/webp" /><img src={jpg} alt="…" loading="lazy" /></picture>` inside the slot. Swedish alt text that says what is in the picture. No inline `style=`.
- **Intake:** finished exports come from `_incoming-assets/IMPLEMENT/`. Don't pull from the other intake subfolders unless Magnus points at a file ([`_incoming-assets/README.md`](../_incoming-assets/README.md)).
- **Gallery** photos go straight into `client/src/assets/galleri/` (see `LÄSMIG.md` there); **car photos** are wired in `client/src/data/vehicles.ts`.
