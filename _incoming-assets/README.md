# Bildinkorg — Brynäs Bilservice

Den här mappen är en **tillfällig, lokal bildbank**. Lägg original, utkast och
bilder som ska bedömas här. Bildfilerna ignoreras av Git med avsikt; först när
en bild är vald och exporterad för webben ska den få en permanent plats i
`client/src/assets/images/`.

## Sorteringsprincip

Sortera efter **vad bilden visar**, inte den första sidan där den råkar kunna
användas. Då kan en framtida agent hitta en bild av exempelvis kundmottagning
för både startsidan, Om oss och en service-CTA utan att behöva leta igenom varje
enskild sidmapp.

| Mapp | För vad |
| --- | --- |
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
valda användningen i den riktiga frontendens bildmapp.

## Snabb vägledning för Bärgning

- `bargsituationer/`: säker bärgning vid vägkant, vinschning eller assistans.
- `biltransport/`: lastning, säkring och transport på flakbil — inte akut.
- `vinter_och_slapskor/`: väglag, släpkärra eller säsongsmiljö.

Välj hellre lugna, tydliga och säkra situationer än dramatiska olycksbilder.
