# Backgrounds — how photos sit behind bands, cards and CTAs

Magnus's design decisions for card and band backgrounds, written down so the unfixed pages can follow them. **Authoritative for this topic only**: `AGENTS.md`, `CSS_OWNERSHIP.md`, `DESIGN_SYSTEM.md` and the code win over it. Image workflow and file naming: [`IMAGES.md`](IMAGES.md). Last updated 2026-10-02.

## How to use this file

1. **Magnus decides every slot, one at a time.** Propose a treatment from this file for the slot's type, show before/after at 1440, 768 and 390 px, and wait. Never apply a treatment to several slots or pages in one go.
2. **If no entry fits, ask.** Do not invent a new treatment.
3. **Not every card gets a photo.** Plain cards are deliberate (see "Kept plain"). A page needs a mix, not a photo on everything.
4. **Measure, don't judge.** White text on the final background (text hidden, brightest 5% of pixels) must reach 4.5:1 for body text and 3:1 for large text. Check overflow at 1440, 768, 390.
5. **Just enough.** Use the lowest overlay that passes. When Magnus changes a value, replace it here (don't append).
6. **Page-local for now.** Each treatment is written in the page's own CSS island with the page's prefix. The glass effect exists twice (Om oss, Bärgning): a shared pattern needs Magnus's approval before it spreads (`AGENTS.md`).

**Starting in a fresh context window:** read, in order, `AGENTS.md`, this file, `docs/CSS_OWNERSHIP.md`, `docs/IMAGES.md`, then the three reference pages in the code (`pages/landing/LandingPage.*`, `pages/AboutPage.*`, `pages/BargningPage.*`). Work on branch `redesign/blue-teal-v1` (`design/card-backgrounds` was merged into it 2026-10-02): one slot per round, one commit per page, nothing pushed or merged without Magnus's go-ahead.

Image sources (git-ignored, outside the repo): `_incoming-assets/IMPLEMENT/backgrounds/`, one flat folder (WebP only, 56 images: generic dark/amber/white cards, 11 curated `custom` real-workshop scenes — **prefer these where a topic matches** — and 25 teal full-frame cards). Start from its `MANIFEST.md`, the agent index (choose by topic, tone and copy side; motif, suits, notes, used on). Copy a file into `client/src/assets/images/<area>/` only when a slot uses it. The custom set shows faces and invented licence plates (`KLP 482`, `TYK 07K`, `RRR 997`, `PBR 997`): **Maher must approve before they are used.**

## Missing material: the gap log

When no image in the sets fits a slot (wrong topic, tone or shape, or only a duplicate card exists), **do not force a mediocre image.** Propose the slot without a photo (or with the closest match, clearly labelled as second best) and add one row to the table below, so Magnus can produce the right material later. Rows are replaced when the material arrives (move it to "Delivered" with the file name).

Each row: **page / slot** · **slot type and tone** (dark band, light card, hero ...) · **shape and size** at 1440 and 390 (measured in the browser, not guessed) · **motif wanted** (what it should show, the real workshop where possible) · **closest existing** (and why it is not enough) · **priority** (H/M/L) · **source of need** (which page or message).

| Page / slot | Type, tone | Shape and size | Motif wanted | Closest existing (why not enough) | Prio |
|---|---|---|---|---|---|
| *(seed, from the card inventory; slots not measured yet)* Bromssystem cards | dark + light card | wide / square | brake disc and caliper, pads, brake fluid check | none: no brake card in any tone | H |
| Bilbatteri cards | dark + light card | wide / square | battery on a bench, terminals, tester | none | H |
| Styrning & kulleder cards | dark + light card | wide / square | tie rod end, ball joint, steering rack | none | M |
| Oljebyte cards | dark + light card | wide / square | oil filter, oil pouring, drain plug | none | M |
| Hjullagerbyte cards | dark + light card | wide / square | hub and bearing on the bench | none | M |
| Kamrem cards (dark/amber) | dark / amber card | wide / square | timing belt and tensioner | `card-dark-engine-work` (an engine bay, not a belt); white timing-belt card exists | M |
| Kylare / cooling (dark, amber) | dark / amber card | wide / square | radiator and hoses | white cooler-hose exists; the amber/dark "cooler" original was a copy of the AC card | M |
| Avgas och sensor (dark, amber) | dark / amber card | wide / square | exhaust pipe, lambda sensor | the "exhaust_and_sensor" original was a copy of the AC card | M |
| Hjulupphängning (dark) | dark card | wide / square | strut, spring, control arm | white suspension card exists; the dark original was a copy of the engine-work card | M |
| Real-workshop people shots | any | wide | Maher with a customer, in the actual workshop (no invented plates) | custom cards show invented plates `KLP 482`, `TYK 07K`, `RRR 997`, `PBR 997`, which Maher must approve | M |
| Phone-sized crops of heroes | hero | 1200×2000 | portrait versions for Reparationer, Hjullager, GAT, Bromssystem, Oljebyte | the wide hero cropped (Oljebyte's can is cut at the top on phones) | M |

### Delivered
*(none yet)*

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
- **Used:** Om oss "Redo att boka service eller reparation?" (`.omoss-page__cta-card`, `tabletop-tools`); Kontakt "Behöver du hjälp med din bil?" (`.kontakt-page__closing-card`, custom `technical-work-suspension`: wide-1400 above 650px, tall-600 on phones where the veil is `.46` because `.38` measured 4.45:1). Measured 5.2–14.9:1. Buttons stay the plain shared ones (no glass).

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

## Round on `design/backgrounds-freestyle` (2026-10-02, Magnus gave free hands; unpushed, unmerged)

Page-local CSS only (family files `ServiceReparationerPage.css`, `ServiceGuideTemplate.css`, page islands); no shared CSS or tokens touched. Every slot measured per element (weakest text, 4.5:1 for body, taken with the text hidden) at 1440/768/390, no overflow, full Playwright green. Photos are from `_incoming-assets/IMPLEMENT/backgrounds/` (generic sets plus the eight teal full-frame cards added today; no faces).

| Page / slot | Photo | Treatment | Weakest text |
|---|---|---|---|
| Bilservice, tier cards 01 / 02 / 03 | `bright-workshop-sedan` / `brake-parts` (teal veil) / `steering-suspension` | photo under the card's own colour, light → mid → dark kept | 7.7 / 5.0 / 11.7:1 |
| Bilservice, AC, Reparationer "Så går det till" bands | tools / amber gauges / engine work | A at 24% (15% on phones) | 6.3:1 or better |
| Closing trust cards: Bilservice, Felsökning (light), Reparationer, AC (dark) | spark plugs, diagnostic tablet / under the lift, amber gauges | B/C light (white veil .87–.97) and D dark (left-heavy veil) | 4.8 / 12:1 or better |
| Däckservice, tyre storage card | `white-tyre` | white veil from the left | 4.5:1 |
| Biltjänster closing band | amber spark plugs | A, amber | 14.6:1 |
| Bilar till salu closing card | key handover (hands only) | light veil | 4.7:1 |
| All ten guides + GAT: importance, service and closing cards | tools, engine work, under the lift | D, same on every guide (neutral motifs) | 9.7:1 or better |

Also today: Landing's GAT dealer line is one unit (`nowrap`) and the contact heading gets 40 px more room below 900 px.

**Not done:** Däckservice and AC price cards (dark, with icon art), Galleri closing card, Kontakt/Om oss/Landing (already worked), per-guide topic photos (no oil, battery, brake-system or steering motifs in the sets; the guide cards use neutral workshop images, a gap-log item).

### K. Object on the page (white cards, no veil)
- **For:** the `white-*` cards (clutch, driveshaft, timing belt, suspension, spark plugs, air filter, cooler hose, diagnosis, AC, handover key, tyre) and `teal-light-*` on a section whose background is the page colour `--bb-color-page` (#f8f7f3) or white. Text on the left, the object on the right looks as if it lies on the page itself (prototype 2026-10-03, tested on clutch, key and tyre).
- **Values:** an `<img>` absolutely placed right (`right: 0; top: 0; height: 100%; width: 60–70%; object-fit: cover; object-position: right center`), `mix-blend-mode: multiply` so the image's pale floor takes the page colour, `filter: brightness(1.18) contrast(1.15) saturate(.7)` to lift the blue-grey of the left side to near white (it measures about (226,240,243), not white), and `mask-image: linear-gradient(90deg, transparent 0, #000 40%)` to dissolve the left edge. Brightness 1.10 without the desaturation leaves a faint blue haze.
- **Contrast:** the text sits where the mask is transparent, so it is plain text on the page colour: no veil to tune and the object stays fully visible. Measure the text anyway.
- **Do:** keep the host section a clean page-colour band, one per page (it is the white band that gets the photo, like Landing "Trygg bilservice"). Mirror (object left, text right) with `scaleX(-1)` on the image only when the object is symmetric; the flip reverses labels and plates, so not for the handover key or tyre.
- **Don't:** use it on an aqua (`--bilservice-aqua-100`) or dark section: multiply tints the photo and the effect is lost. The right edge of the image is a hard cut: let it end at the container edge or add a short right fade (`linear-gradient(90deg, transparent 0, #000 40%, #000 92%, transparent 100%)`).

### L–N. More recipes (starting values, **not yet measured on a page**: test, record the measured values here, then use)
- **L. Teal-to-amber blend over a dark photo (CTA bands):** two stacked veils, `linear-gradient(120deg, rgba(4,96,108,.72) 0%, rgba(4,96,108,.3) 55%, rgba(240,149,5,.16) 100%)` over the photo, white copy. Keep the amber at or below .2 so it reads as warmth, not as a stain.
- **M. Split card, hard edge:** card as a two-column grid, one half a clean colour (dark, teal gradient or white), the other half the photo (`object-fit: cover`, no veil) with a 1–2 px edge, stacked on phones with the photo on top (Bärgning's service card and used-cars banner already do it).
- **N. Top-to-bottom dissolve on a white band:** photo at the bottom of a page-colour band, `mask-image: linear-gradient(180deg, transparent 0, #000 55%)`, text at the top; same `multiply` rule as K for `white-*` images.

## Reference philosophy and the clean budget (read before touching a page)

Landing, Om oss and Bärgning are the reference (looked at 2026-10-03). What they do:

- **One photo-treated surface per section, never a wall of photos.** Between photo bands there is always a calm one: Landing's service row (icons only), Om oss's story text, facts card and statistics, Bärgning's white dealer card and used-cars banner text.
- **Photos sit on feature surfaces:** hero, a band that introduces a step (process band, treatment A at 15–24%), a closing CTA (D/E), the one white band per page that gets a photo faded in from one side (B/C: Landing "Trygga bilservice", Om oss "Därför väljer kunder oss"), or a split card with the photo as a hard-edged half (Bärgning's service card and used-cars banner).
- **Solid-colour cards carry the reading:** the amber quote (Om oss), the teal form card (Landing), the dark facts card, ledgers, FAQ, tips, forms. Their colour is the decoration.
- **Stepped rows keep a clean member:** Bärgning's scenario row is pale, mid teal, dark photo, dark photo (never four photos in a row).

**Clean budget (binding for autonomous rounds):**
1. In any card group (row or grid) at most half the cards carry a photo; the rest stay clean (solid colour or gradient only).
2. Always clean, never a photo: forms and their notices, FAQ items, tips (`.bb-tip`), ledgers and price lists, tables, legal/fact cards, any card with a long paragraph or more than one list, the contact/direct-contact cards, review cards, step cards that already have an icon row.
3. At most 2 photo-treated surfaces per screen height and no two touching each other; between two photo surfaces put a clean one.
4. The same photo never twice on a page, and the same treatment at most twice per page.
5. Variety: alternate light, mid and dark; at least one amber or teal-gradient surface per long page; mix directions (fade from the left, from the right, top to bottom).
6. A "visible" photo is the point: if the veil needed for 4.5:1 makes the photo disappear (it should still read as a motif at 1440 px), use a clean card instead.

## Kept plain (no photo), on purpose
Confirm with Magnus before adding a photo to any of these:
- Landing: the service row (icon, title, text), the trust strip, the contact card.
- Om oss: the four principle cards, the story text, the facts card (dark, two-column grid), the trust strip.
- Kontakt: Direktkontakt card, "Så fungerar det", the form card and notice, the map, "Hitta till oss" (already has the entrance photo), the "Personlig service i fokus" band (already a photo, non-curated `tire-wheel-change`).
- Bärgning: scenario card 1 (white) and card 3 (near black), the intake card, the used-cars banner, the hero card text.
- Every card on the pages not yet worked through: unfixed until Magnus names the slot.

## Still open
- A shared pattern for F (and possibly A, B) is awaiting approval; today the effects are page-local.
- No dark photos yet for cooler, exhaust sensor, timing belt or wheel suspension (four originals were copies of other cards).
- Slots on Däckservice, AC-service, Bilservice, Felsökning, Reparationer, the ten guides, Biltjänster, Bilar till salu and Galleri have not been assigned a treatment.
