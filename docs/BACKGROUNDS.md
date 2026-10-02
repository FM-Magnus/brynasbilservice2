# Backgrounds — how photos sit behind bands, cards and CTAs

Magnus's design decisions for card and band backgrounds, written down so the unfixed pages can follow them. **Authoritative for this topic only**: `AGENTS.md`, `CSS_OWNERSHIP.md`, `DESIGN_SYSTEM.md` and the code win over it. Image workflow and file naming: [`IMAGES.md`](IMAGES.md). Last updated 2026-10-02.

## How to use this file

1. **Magnus decides every slot, one at a time.** Propose a treatment from this file for the slot's type, show before/after at 1440, 768 and 390 px, and wait. Never apply a treatment to several slots or pages in one go.
2. **If no entry fits, ask.** Do not invent a new treatment.
3. **Not every card gets a photo.** Plain cards are deliberate (see "Kept plain"). A page needs a mix, not a photo on everything.
4. **Measure, don't judge.** White text on the final background (text hidden, brightest 5% of pixels) must reach 4.5:1 for body text and 3:1 for large text. Check overflow at 1440, 768, 390.
5. **Just enough.** Use the lowest overlay that passes. When Magnus changes a value, replace it here (don't append).
6. **Page-local for now.** Each treatment is written in the page's own CSS island with the page's prefix. The glass effect exists twice (Om oss, Bärgning): a shared pattern needs Magnus's approval before it spreads (`AGENTS.md`).

Image sources (git-ignored, outside the repo): `_incoming-assets/IMPLEMENT/backgrounds/custom/` (curated, **prefer these**, with 11 cards in wide/square/tall) and `…/backgrounds/` (generic dark / amber / white). Both have a `MANIFEST.md`. Copy a file into `client/src/assets/images/<area>/` only when a slot uses it. The custom set shows faces and invented licence plates (`KLP 482`, `TYK 07K`, `RRR 997`, `PBR 997`): **Maher must approve before they are used.**

## Treatments

### A. Faint photo behind a dark band
- **For:** a dark band (ink-950 gradient) with a centred or right-aligned heading and a row of steps/cards.
- **Values:** photo fills the band at `opacity: .2–.22`, `object-fit: cover`, `z-index: -1` inside an `isolation: isolate` band. The base dark gradient stays.
- **Used:** Landing "Så går det till" (`.landing-v2__process-photo`, `technical-work`, 22%, focus 70% centre); Bärgning "Från vägkant till färdig reparation" (`.bargning-page__process-photo`, `tow-truck-workshop-evening`, 20%, focus 60% down).
- **Measured:** 9–13:1 (target 4.5). **Don't:** no grid mesh on dark bands, it was removed (Om oss, Bärgning).

### B. Photo faded in from the text, one side only
- **For:** a light text section with room on one side.
- **Values:** photo inside the text's own container (same width as the content), `width: 72%`, right-aligned, `mask-image: linear-gradient(90deg, transparent 0%, #000 46%)`. Top and bottom stay hard. Hidden at ≤900px (the text spans the width).
- **Used:** Landing "Trygg bilservice i Gävle" (`.landing-v2__why-photo`, `customer-woman-volvo`, focus 78% centre).
- **Don't:** do not let it follow the viewport edge; do not fade top/bottom.

### C. Photo under a warm-white veil (light band)
- **Values:** `linear-gradient(rgba(248,247,243,.62) …)` over the photo, plus the page-colour edge fades already on the band.
- **Used:** Om oss "Därför väljer kunder oss" (`.omoss-page__principles-shade`, `handover-key`). Contrast of the small teal eyebrow is 4.4–4.5:1: raise the veil if the eyebrow ever fails.

### D. Dark veil over a photo (closing CTA card)
- **Values:** `rgba(7,20,22,.38)` over the photo, text left-aligned, headline `text-shadow: 0 2px 10px rgba(0,0,0,.55)`, paragraph `0 1px 8px rgba(0,0,0,.6)`. Measured 6.6–8.4:1.
- **Used:** Om oss "Redo att boka service eller reparation?" (`.omoss-page__cta-card`, `tabletop-tools`).

### E. Mid-teal veil with a darker ramp behind the copy (CTA card)
- **Values (≥1025px):** top layer `rgba(7,20,22,.6) 0% → .38 36% → 0 64%`; below it teal-700 `rgba(4,119,132,.7) 0% → .5 40% → .3 70% → .4 100%`. ≤1024px: dark `.55 → .42 → .2`, teal `.7 → .6 → .38`. Content left-aligned and vertically centred.
- **Used:** Bärgning "Behöver du bärgning?" (`.bargning-page__cta-card`). Measured 5.6–9.9:1.

### F. "Stained glass" buttons and cards
- **Values (buttons):** `backdrop-filter: blur(10px) saturate(1.4)`, inset top highlight `0 1px 0 rgba(255,255,255,.28)`, tinted fill (teal `.34`, white `.12`, amber `.3`) and a light border; hover raises the fill. Written `.card .bb-btn.x` so it out-ranks `.bb-btn`.
- **Values (step cards):** `blur(12px) saturate(1.4)`, `linear-gradient(160deg, rgba(10,178,193,.2), rgba(12,43,48,.5))`, border `rgba(127,220,224,.28)`, inset highlight `.22`.
- **Used:** Om oss closing-card buttons (`AboutPage.css`); Bärgning process cards (`BargningPage.css`). Text on them 12–17:1.
- **Needs:** Magnus's OK before this becomes a shared `.bb-*` pattern.

### G. Stepped card row (white → dark teal → near black → photo)
- **Used:** Bärgning "När behöver du bärgning?" (`.bargning-page__scenario-card--light | --winter | --dark | --photo`). One direction across the four cards, same icon/title/text on each; the last (and now the second) card is a photo under a dark ramp: wet-road card `rgba(7,20,22,0) → .35 30% → .62 55% → .74`, winter card teal-tinted `rgba(12,43,48,.5) → .78 45% → .88`.

### H. Clean photo, no overlay
- **For:** the main service photo of a page. **Used:** Bärgning showcase card (`towing-mechanic-strap-showcase`, square 800). Only the small location pill sits on it. Magnus rejected the ramp-and-winch crop here (2026-10-02).

### I. Hero: left-edge ramp
- **Values (≥651px):** `linear-gradient(90deg, rgba(0,0,0,.74) 0%, .58 20%, .3 40%, .08 56%, 0 66%)` on the shade layer's `::before` (Om oss hero), on top of the shared `.bb-shade-copy-left`. Phones keep the vertical shade. One hero can need this when its photo is bright behind the copy.

### J. Alignment rhythm
- Vary the heading block between bands: **centred → right → left** on consecutive dark bands (Om oss process band right-aligned, closing card left-aligned, Bärgning process band right-aligned, CTA left-aligned). Right-aligned blocks end exactly at the content's right edge (the `.bb-wrap` edge), never at the viewport edge.

## Kept plain (no photo), on purpose
Confirm with Magnus before adding a photo to any of these:
- Landing: the service row (icon, title, text), the trust strip, the contact card.
- Om oss: the four principle cards, the story text, the facts card (dark, two-column grid), the trust strip.
- Bärgning: scenario card 1 (white) and card 3 (near black), the intake card, the used-cars banner, the hero card text.
- Every card on the pages not yet worked through: unfixed until Magnus names the slot.

## Still open
- A shared pattern for F (and possibly A, B) is awaiting approval; today the effects are page-local.
- No dark photos yet for cooler, exhaust sensor, timing belt or wheel suspension (four originals were copies of other cards).
- Slots on Däckservice, AC-service, Bilservice, Felsökning, Reparationer, the ten guides, Biltjänster, Bilar till salu, Galleri and Kontakt have not been assigned a treatment.
