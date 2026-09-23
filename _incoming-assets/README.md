# Bildinkorg — Brynäs Bilservice

Den här mappen (`_incoming-assets/`) är den **lokala, Git-ignorerade källbildbanken**. Den fungerar som en platt avlämningsmapp där Magnus lägger in färdiga bildtillgångar inför agentkörningar.

---

## Grundregler för kodagenter

> **Hela bildflödet (mått per slot, namngivning, promptbibliotek, markup) står i [`docs/IMAGES.md`](../docs/IMAGES.md).** Den här filen gäller bara själva inkorgen.

1. **Mappar är Magnus sak:**
   Färdiga exporter att implementera läggs i `IMPLEMENT/`. Övriga undermappar (t.ex. `__UNDER CONSTRUCTION__/`) är Magnus arbetsyta — agenter skapar, flyttar eller sorterar inga mappar här och hämtar bara filer som Magnus pekar ut.

2. **Bilder flyttas ENDAST vid aktiv kodimplementation:**
   Bilder i `_incoming-assets/` ska ligga kvar här tills en specifik kodprompt (en prompt som faktiskt implementerar en sida eller komponent) begär att bilden ska användas i koden.
   * **Ingen spekulativ migrering:** Agenter får **aldrig** städa, flytta, kopiera eller "försortera" bilder in i `client/src/assets/images/` under allmänna underhålls- eller städkörningar.
   * Endast när koden aktivt kopplas mot bilden flyttas/exporteras den in i frontendkoden.

3. **Arbetsgång vid implementation:**
   När en prompt ger instruktion om att bygga eller uppdatera en sida med bild:
   1. Hitta och granska aktuell bildfil direkt i `_incoming-assets/`.
   2. Ge bilden ett tydligt, beskrivande produktionsnamn (`kategori-motiv-orientering`).
   3. Skapa optimerade webbformat (WebP med JPG-fallback via `<picture>` eller CSS `image-set()`).
   4. Placera produktionsbilderna i rätt målkatalog under `client/src/assets/images/` (t.ex. `services/`, `home/`, `about/`).
   5. Koppla in bilden i TSX/CSS-koden.

---

## Namnkonvention för produktionsexport

Använd beskrivande, gemena namn med bindestreck för filer som exporteras till `client/src/assets/images/`:

`kategori-specifikt-motiv-vy.{webp,jpg}`

Exempel:
- `client/src/assets/images/services/clutch/clutch-mechanic-under-car.webp`
- `client/src/assets/images/home/landing-v2/landing-sundown-hero.webp`
- `client/src/assets/images/about/about-hero-bg.webp`

---

## Befordrade produktionsbilder (Historik)

Följande källmaterial har tidigare optimerats och satts i produktion:
- **Maher-porträtt**: `client/src/assets/images/people/maher-basher-portrait.webp` + `.jpg` (används på `/om-oss`).
- **Verkstadsbilder för galleri och teaser**: Elva källbilder i `client/src/assets/images/gallery/workshop/` (1920px huvudvy, 640px `-thumb`, 1280px `-card` för teaser).
- **Startsideshero**: Komprimerat WebP/JPG-par i `client/src/assets/images/home/landing-v2/landing-sundown-hero.{webp,jpg}`.
- **Peugeot 307 CC**: Optimerade WebP/JPG-versioner och `-thumb`-par i `client/src/assets/images/vehicles/peugeot-307-cc/`.
- **Kamrem**: `client/src/assets/images/services/timing-belt/timing-belt-in-hand.webp` + `.jpg`.
- **Bilbatteri**: `client/src/assets/images/services/battery/` (`battery-terminal-bolt-tightening`, `battery-multimeter-test-workshop`, `battery-terminal-voltage-closeup`).
- **Felsökning**: `client/src/assets/images/services/diagnostics/` (`diagnostics-mechanic-laptop-workshop`, `diagnostics-obd-connector-closeup`).
- **Däckservice**: `client/src/assets/images/services/tires/` (6 workshop-kort för hjulskifte, förvaring, omläggning, hjulinställning, balansering, punkteringslagning).
- **Hero-bakgrunder**: AC-service, Bärgning, Om oss och Däckservice hero-bakgrunder.
