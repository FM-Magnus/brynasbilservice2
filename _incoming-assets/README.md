# Bildinkorg — Brynäs Bilservice

Den här mappen är den **lokala, Git-ignorerade källbildbanken**. Lägg original,
utkast och bilder som ska bedömas här. Produktionskod importerar aldrig härifrån:
först när Magnus valt en bild och den exporterats för webben får den en permanent
plats i `client/src/assets/images/`.

## Börja här

Lägg nytt, osorterat material direkt i `incoming/`. Du behöver inte döpa om,
beskära eller välja kategori först. När materialet ska användas granskar agenten
filerna, parar ihop format och thumbnails, byter till sökbara namn och flyttar
dem till rätt ämnesmapp.

En agent får aldrig rensa `incoming/` bara för att den har påbörjat en granskning.
Filer flyttas först när motiv och ämnesmapp är tydliga. Råfilerna blir kvar i
bildbanken tills Magnus har valt bild och placering; först därefter skapas en
avsiktlig webbexport för `client/src/assets/images/`. `incoming/` är tom efter
inventeringen 2026-09-15; det är avsiktligt och gör den redo för nytt material.

## Sorteringsprincip

Sortera efter **vad bilden visar**, inte den första sidan där den råkar kunna
användas. Då kan en framtida agent hitta en bild av exempelvis kundmottagning
för både startsidan, Om oss och en service-CTA utan att behöva leta igenom varje
enskild sidmapp.

| Mapp | För vad |
| --- | --- |
| `incoming/` | Enda avlämningsmappen för nytt, osorterat material. Lägg aldrig färdiga webbutgåvor här. |
| `00_layoutgrafik/` | Icke-fotografiska grafiska tillgångar för layouten: ikoner, mönster/texturer, dekorativa former och återanvändbara UI-detaljer. |
| `01_blue_tone_bakgrunder/` | Återanvändbara blå-/tealtonade bakgrunder. `heros` är breda och har lugn yta för text; `kort_och_sektioner` är för mindre, beskurna ytor. |
| `02_kundinteraktion/` | Riktig mänsklig kontakt: bokning/inlämning, rådgivning och återlämning. Används för att skapa förtroende snarare än som teknisk servicebild. |
| `03_verkstad_och_team/` | Mekaniker i arbete, verkstadsöversikter, verktyg/arbetsstationer och lokalen utifrån. |
| `04_tjanster/` | Bildmaterial för varje enskild tjänst. Här ligger servicearbete, delar och relevanta detaljbilder. |
| `05_bargning_och_transport/` | Håll bärgning separat: akut bärgningssituation, planerad biltransport och vinter/släpkärra är olika berättelser och olika sidbehov. |
| `06_bilar_till_salu/` | Bilannonser: exteriör, interiör/detaljer och bildserier. |
| `98_redo_att_valja/` | Kandidater som redan är beskurna eller tydligt avsedda för en specifik sida, men ännu inte är produktionsbilder. |
| `99_osorterat/` | Endast en kort mellanlandning. Sortera vidare när motivet är känt. |

## Filnamn

Använd beskrivande, sökbara namn utan mellanslag:

`motiv__situation-eller-vy__orientering__v01.jpg`

Exempel:

- `kundmote__inlamning-vid-reception__landskap__v01.jpg`
- `diagnostik__skanner-vid-bil__landskap__v01.jpg`
- `bargning__lastning-pa-flakbil__landskap__v01.jpg`
- `blue-bg__teal-verkstad-bokeh__landskap__v01.jpg`

Skriv `landskap`, `portratt` eller `kvadrat` i namnet. Behåll originalet här;
gör först senare en namngiven, komprimerad `.webp` plus `.jpg`-fallback för den
valda användningen i den riktiga frontendens bildmapp. Lokala granskningsbilder
har suffixet `__thumb.jpg`; de ersätter aldrig originalet. Exakta dubbletter
ligger i `98_redo_att_valja/dubletter/` med suffixet `__duplicate` och får inte
väljas som separata bilder.

## Snabb vägledning för Bärgning

- `bargsituationer/`: säker bärgning vid vägkant, vinschning eller assistans.
- `biltransport/`: lastning, säkring och transport på flakbil — inte akut.
- `vinter_och_slapskor/`: väglag, släpkärra eller säsongsmiljö.

Välj hellre lugna, tydliga och säkra situationer än dramatiska olycksbilder.

## Befordrade produktionsbilder (Promoted to Production)

Följande material från inkorgen har optimerats och satts i produktion i frontendens repository:
- **Maher-porträtt**: Bevarat råoriginal finns i `03_verkstad_och_team/` och den exakta dubbletten i `98_redo_att_valja/dubletter/`. Produktionsparet är `client/src/assets/images/people/maher-basher-portrait.webp` + `.jpg` och används på `/om-oss`.
- **Verkstadsbilder för galleri och teaser**: De elva människofria källbilderna i `03_verkstad_och_team/verkstadsoversikter/` har befordrats till `client/src/assets/images/gallery/workshop/`. Varje motiv har ett 1920px WebP/JPG-par för huvudvy och ett matchande 640px `-thumb` WebP/JPG-par för carousel. Sex breda verkstadsvyer har dessutom särskilda 1280px `-card.webp`-exporter för den stora, animerade `GalleryTeaserCard` på startsidan; detaljbilder av däckmaskin och arbetsbänk används inte där.
- **Startsideshero**: Originalet finns under `01_blue_tone_bakgrunder/heros/original/`; den aktiva, komprimerade WebP/JPG-paret finns i `client/src/assets/images/home/hero/` och laddas med CSS `image-set()`.
- **Peugeot 307 CC**: De tre 4032×3024-originalen finns under `06_bilar_till_salu/bildserier/peugeot-307-cc/original/`. Optimerade WebP/JPG-versioner och `-thumb`-par finns i `client/src/assets/images/vehicles/peugeot-307-cc/`.
- **Kamrem**: Källbilden `04_tjanster/04_kamrem/kamrem__tandrem-i-hand__kvadrat__v01.jpeg` är exporterad som `client/src/assets/images/services/timing-belt/timing-belt-in-hand.webp` med JPG-fallback och en 640px WebP-thumbnail. Produktionsparet används i den bilddrivna heron på `/kamrem`.
- **Bilbatteri** (2026-09-15): Tre bilder — två inskickade direkt i chatten (en handske-/momentnyckelbild och en multimeter-närbild) och en tredje redan i `incoming/` — är sorterade till `04_tjanster/07_bilbatteri_och_el/` som `bilbatteri__brynas-handske-momentnyckel-polbult__landskap__v01`, `bilbatteri__multimeter-spanningstest-verkstad__landskap__v01` och `bilbatteri__polspanning-narbild-multimeter__landskap__v01` (JPG+WebP-par). Exporterade som produktionspar i `client/src/assets/images/services/battery/` (`battery-terminal-bolt-tightening`, `battery-multimeter-test-workshop`, `battery-terminal-voltage-closeup`) och används i hero, intro och service-sektionerna på `/bilbatteri`.
- **Felsökning** (2026-09-15): Två bilder från `04_tjanster/02_felsokning_och_diagnostik/` (`diagnostik__mekaniker-vid-diagnoslaptop__landskap__v01`, `diagnostik__obd-lasar-i-motorutrymme__landskap__v01`) är exporterade som `client/src/assets/images/services/diagnostics/diagnostics-mechanic-laptop-workshop` och `diagnostics-obd-connector-closeup` (skalade till 1920px, JPG+WebP). Används i intro- och service-sektionerna på `/felsokning`; den befintliga `vehicle-diagnostics-laptop.jpg`-heron fick samtidigt en matchande `.webp`-export.

## Aktuell struktur och inventering — 2026-09-15 (uppdaterad efter Bilbatteri-tillskott)

| Område | Bildfiler | Kommentar |
| --- | ---: | --- |
| `01_blue_tone_bakgrunder/` | 8 | Hero- och kortbakgrunder, med original och thumbnails. |
| `02_kundinteraktion/` | 10 | Råbilder och thumbnails för rådgivning, kundmöten och felsökning. |
| `03_verkstad_och_team/` | 41 | Verkstadsbilder, Maher-porträtt och thumbnails. |
| `04_tjanster/` | ~36 | Bilservice, felsökning, oljebyte, kamrem, drivaxel, bilbatteri (nytt), däck och AC. |
| `05_bargning_och_transport/` | 24 | Biltransport och dess thumbnails. |
| `06_bilar_till_salu/` | 6 | Bevarade Peugeot-original. |
| `98_redo_att_valja/` | 4 | Kontaktkarta samt tydligt namngivna dubbletter. |

`incoming/` är tömd igen efter att de tre Bilbatteri-bilderna sorterades in i `04_tjanster/07_bilbatteri_och_el/` (se "Befordrade produktionsbilder" ovan).

Produktionsmappen är innehållsbaserad: `brand/`, `home/`, `gallery/workshop/`,
`people/`, `services/` och `vehicles/`. `client/src/assets/images/archive/` samlar
äldre, spårade men oimporterade webbexporter efter motiv — inklusive äldre
gallerifiler och varumärkesvarianter — för proveniens. Inget i `archive/` är
godkänt för runtime eller publicering. Se `ASSET_INVENTORY.md` för den kompletta
produktionskartan och källmappningen.
