# Lighthouse (mobile) — lokal mätning, 2026-10-02

Branch `perf/lighthouse-1` (från `redesign/blue-teal-v1`, inte pushad). Steg 1 mätning, steg 2 egna typsnitt, steg 3 hero-bilder. Bara lokala siffror: se "Begränsningar".

## Mätmetod

`npm --prefix client run build`, sedan `npx vite preview --port 4173 --base /brynasbilservice/` i `client/`. **`--base` krävs:** `vite preview` läser konfigen med kommandot `serve`, så utan flaggan blir basen `/` och alla `/brynasbilservice/assets/...` ger 404 (Lighthouse svarar då `NO_FCP`). `npx lighthouse@12` (inte i `package.json`), `--only-categories=performance --form-factor=mobile` (standardens simulerade throttling), headless Chrome, 3 körningar per sida, **median**. Rå-JSON ligger i scratchpad, inte i repot. Sidor: `/`, `/om-oss`, `/oljebyte`, `/felsokning` samt `/hjullagerbyte` (CLS-sidan).

## Resultat (median av 3)

Performance-poäng / FCP s / LCP s / TBT ms / CLS / Speed Index s.

| Sida | Före (steg 1) | Efter steg 2 (typsnitt) | Efter steg 3 (hero) |
|---|---|---|---|
| `/` | 84 / 2,44 / 3,98 / 0 / 0,000 / 2,44 | 89 / 1,66 / 3,68 / 0 / 0,000 / 1,66 | 88 / 1,66 / 3,83 / 0 / 0,000 / 1,66 |
| `/om-oss` | 91 / 1,96 / 3,16 / 0 / 0,001 / 1,96 | 90 / 1,66 / 3,54 / 0 / 0,000 / 1,66 | 89 / 1,66 / 3,69 / 0 / 0,000 / 1,66 |
| `/oljebyte` | 90 / 1,81 / 3,46 / 0 / 0,000 / 1,81 | 91 / 1,51 / 3,46 / 0 / 0,000 / 1,51 | **95** / 1,59 / **2,79** / 0 / 0,000 / 1,59 |
| `/felsokning` | 98 / 1,74 / 2,27 / 0 / 0,015 / 1,74 | 97 / 1,44 / 2,56 / 0 / 0,015 / 1,44 | 95 / 1,52 / 2,93 / 0 / 0,015 / 1,52 |
| `/hjullagerbyte` | 84 / 2,39 / 3,98 / 0 / 0,006 / 2,39 | 88 / 1,52 / 3,83 / 0 / 0,000 / 1,52 | **95** / 1,59 / **2,86** / 0 / 0,000 / 1,59 |

LCP-elementet är alltid hero-bilden (`picture > img` i `.bb-hero__media` eller `.service-guide__hero-bg`). TBT är 0 överallt.

**Läsning:**
- **Steg 2** sänker FCP med 0,3–0,9 s på alla sidor (ingen extern CSS-/typsnittskedja mot Google, filerna förladdas) och höjer poängen på Landning och Hjullagerbyte. LCP rör sig inte (den styrs av hero-bilden).
- **Steg 3** hjälper där en 3000 px-bild nu skalas ned: guiderna får LCP −0,7 till −1,0 s och poäng 91→95 (Oljebyte), 88→95 (Hjullagerbyte). Landning och Om oss har redan separata telefonbilder, och där ger `fetchpriority` ingen mätbar vinst (skillnaden +0,15 s ligger inom körning-till-körning-spridningen, se nedan).
- **Felsökning** gick från 98 till 95. Mätbruset är stort (baslinjens tre körningar gav LCP 2,27 / 3,68 / 2,27 s) och steg 3-körningarna var stabila på 2,93 s. En kontrollvariant utan srcset (bara `fetchpriority`) gav LCP 3,53 s, så srcset hjälper; jag tror inte att steg 3 försämrade sidan, men siffran är **inte** bättre än baslinjens medianer. Mät om mot produktion.
- **CLS på `/hjullagerbyte`:** Lighthouse gav 0,006 före och 0,000 efter; en egen mätning (CDP, 4× CPU, långsam 4G, 390 px, 5 körningar, `PerformanceObserver`) gav 0,000 både före och efter. **0,12-värdet från STATUS gick inte att återskapa lokalt**, så jag kan inte påstå att det är åtgärdat, bara att inget byte syns när typsnitten ligger lokalt och förladdas.

## Vad som gjordes

1. **Typsnitt (`542cfdb5`):** Google Fonts-länkarna ut ur `index.html`; `client/src/assets/fonts/` med Archivo 800 (14 KB) och Manrope som en variabel fil för 400–700 (24 KB), latin-delmängd (täcker å ä ö), OFL-licenser bredvid. `@font-face` med `font-display: swap` i `base.css`, familjenamnen exakt `Archivo` och `Manrope`. Båda filerna förladdas i `index.html` (Vite skriver om länkarna till hashade filer). Inga anrop till Google längre (mätt: 0 externa förfrågningar).
2. **Hero-bilder (`0c55b565`):** första hero-bilden på varje publik sida har `fetchpriority="high"` (`data/heroImgAttrs.ts`; gemener, eftersom React 18 inte känner `fetchPriority`). Ingen hero var lazy sedan tidigare; bilder längre ned är oförändrat lazy. Guider, Felsökning, Reparationer och Bilservice får `srcset`/`sizes="100vw"` med 828 och 1400 px WebP bredvid originalet (`data/heroSrcSet.ts`, `vite-imagetools` via `import.meta.glob`); bildspelssidor och sidor med telefonbild väljer fortfarande fil i JS.

Kontroller före varje commit: `typecheck` 0 fel, `check:css` rent, build, Playwright (`pw.config.ts`, `--workers=3`) 235 godkända, 32 överhoppade, 0 röda, inga baseline-snapshots uppdaterade. Webbläsarkontroll vid 1440/768/390 px: inget horisontellt överflöde, rätt bildbredd vald per skärm (390 px@3x → 1400 px-kopian), inga konsolvarningar.

## Vad som stoppades och varför

- **Storleksjusterade fallback-typsnitt** (`size-adjust`/`ascent-override` på lokal Arial, namn som `Manrope Fallback` i stackarna) prövades och **togs bort**. Ett tredje familjenamn i stacken ändrar det beräknade `font-family`-värdet, och `baseline.spec` låser det: 69 tester blev röda. Du bad om att de värdena inte skulle ändras och baslinjer får inte uppdateras. De första steg 2-siffrorna jag tog var med fallback; alla siffror ovan är tagna om utan. Att lägga till dem kräver ett beslut om att uppdatera baslinjen, tillsammans med att reda ut `--bb-font-sans`/stackarna (se kommentarerna i `base.css` och `ServiceGuideTemplate.css`).
- **`<source media>` istället för `useIsPhone`-växling** för telefonbilderna rörde hook-strukturen (bildspelets antal bilder) och lämnades.

## Vad som återstår

Det som bestämmer LCP är nu inte bildens storlek (hämtningen tar under 0,1 s i mätningen) utan **upptäckten**: sidan är klientrenderad, så hero-bilden begärs först efter HTML → JS → render (LCP-uppdelning, `/oljebyte`: TTFB 13 %, laddningsfördröjning 26 %, rendering 58 %).
1. **Förrendering/SSG** av de publika sidorna så att hero-`<img>` finns i HTML:en och kan förladdas. Största kvarvarande vinsten, kräver ett separat beslut (byggkedja, Johnnys deploy).
2. **Tailwind-utilities ut ur publika CSS** (C2 i [`CSS_AUDIT_2026-10-02.md`](CSS_AUDIT_2026-10-02.md): −3,35 KB gzip på alla routes; kräver Magnus godkännande, `/admin` måste verifieras).
3. **Komprimering och cache hos Johnny** (utkast nedan).
4. Storleksjusterad fallback (ovan) och telefonkrop för de underdimensionerade guide-heroerna (Koppling, Kamrem, Drivaxel).
5. Mät om mot produktion med riktig Lighthouse (PageSpeed Insights) efter deploy.

### Utkast till förfrågan till Johnny

> Hej Johnny! Vi mäter sajten i Lighthouse (mobil) och två saker ligger på servern. (1) **Komprimering:** kan Apache/Passenger svara med gzip eller brotli (`mod_deflate`/`mod_brotli`) för `text/html`, `text/css`, `application/javascript`, `image/svg+xml` och `font/woff2`? (woff2 är redan komprimerat och kan hoppas över.) (2) **Cache:** filerna i `/brynasbilservice/assets/` har hashade namn och kan få `Cache-Control: public, max-age=31536000, immutable`; `index.html` ska ha `no-cache` så att nya versioner syns direkt. (3) Okända adresser svarar i dag 200 (soft 404), vilket Lighthouse också kan anmärka på. Säg till om något av detta går emot hur `.htaccess` är tänkt att fungera, så anpassar vi på vår sida.

## Begränsningar

- **Lokala siffror saknar serverns komprimering** (vite preview skickar okomprimerat) och kör mot localhost utan verklig nätlatens; den riktiga mätningen görs mot produktionsservern. Lighthouse simulerar throttlingen, och körning-till-körning-spridningen är upp till ±0,5 s LCP (Felsökning, Om oss), så skillnader under ~0,3 s ska inte läsas som verkliga.
- Tre körningar per sida och steg; ingen mätning av andra routes än de fem.
