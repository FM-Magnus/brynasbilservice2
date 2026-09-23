# Redesign — Fas 0

Inventering utförd av Codex 2026-09-10 och därefter accepterad av Magnus som Fas 0-baslinje. Ingen applikationskällkod ändrades. Underlaget är de sju designbilder som Magnus uttryckligen bekräftat, överlämningen och aktuell kod. Godkännandet gäller baslinjecommitten och är inte ett godkännande att börja implementera Fas 1.

## Verifierat utgångsläge

| Kontroll | Resultat |
|---|---|
| Repo | `/Users/magnusolsson/Documents/REPOS/brynasbilservice_repo` |
| Aktiv branch | `redesign/blue-teal-v1` (fanns redan) |
| Branch upstream | Ingen; avsiktligt för den lokala baslinjen och inte ett hinder |
| HEAD | `1f8ab37b`, samma commit som lokal `main` och lokalt lagrad `origin/main` |
| Arbetsyta vid start | Ren |
| Origin | `https://github.com/FM-Magnus/brynasbilservice2.git` |
| Historisk remote | `johnny-archive`, inte pushmål |
| Build | `cd client && npm run build` passerade; Vite 4.5.14 |
| Buildvarning | JavaScript-chunk 563,09 kB, över Vites 500 kB-gräns |
| Git-nätverk | Ingen fetch/push; jämförelsen gäller lokala refs |

`redesign/blue-teal-v1` är den avsedda redesigngrenen och var redan aktiv på den verifierade utgångscommitten `1f8ab37b`. Ingen branch skapades eller byttes under Fas 0. Grenen har avsiktligt ingen upstream och inget pushmål konfigurerades.

Fas 0 muterade dokumentation och uttryckligen godkända artefakter: rapporten och nio skärmbilder skapades, `AGENTS.md` uppdaterades och den levererade hero-bilden flyttades till projektets bildkatalog. Builden skrev genererade, ignorerade filer under `client/dist/`. Ingen applikationskällkod, backendkod eller deploymentkonfiguration ändrades.

Två befintliga Vite-processer använder port 5173: IPv6 `::1` hör till den äldre kopian i `AI Work Projects 2026/brynasbilservice2/client`, medan IPv4 `127.0.0.1` hör till detta repo. Baslinjen togs därför på **http://127.0.0.1:5173/**. Inga processer startades eller stoppades.

## Källor och deras roll

- Överlämning: `/Users/magnusolsson/AI Work Projects 2026/MOCKUPS FÖR BBIL/REDESIGN_HANDOVER.md`.
- Samtliga sju bilder nedan: katalogen `LOCKED DESIGN` intill överlämningen.
- Vår Verkstad: `/Users/magnusolsson/Documents/varverkstad-2026-09-09`. README, 00, 01, 02, 03, 05, 06, 07, 08 och 09 lästa. Desktophero och den bild som benämns mobilmeny granskade visuellt.
- Projektets `AGENTS.md`, `CLAUDE.md`, `instructions.md`, senaste lokala designloggen samt berörda komponenter och styling lästa.

Företagsuppgifter och funktion hämtas från Brynäs-koden. Det betyder **kodverifierat**, inte att uppgifterna nyligen bekräftats av verksamheten. Recensionsdata är uttryckligen undantagna: de är kända placeholders.

Vår Verkstad-paketet beskriver Sora, blått `#0036ff`, stora radier, numrerade tjänsterader och responsiva layouter. Det är referensens egenskaper, inte beslut för Brynäs. Dess rekommendationer, fokusregler och responsiva antaganden får inte behandlas som uppmätta Brynäs-fakta. Filen `mobile-390-menu-open.png` visar kontaktinnehåll och en flytande ringknapp, inte en öppen meny; den styrker därför inte dokumentets påstådda menybeteende. Paketet anger också både 16:7 och 1400 × 680 för hero, vilket inte är samma proportion. Använd inte dessa värden som exakta mått.

Brynäs-bilderna styr varmvit omgivning, turkos/blå accent, stark öppen sans-serif, mörka fotografiska ytor, rundning och komposition. Exakt typsnitt kan inte fastställas från rasterbilderna. Hero/Om oss använder en dovare turkos än flera senare sektioner; en sammanhängande accentfamilj ska prövas visuellt, inte ersättas med referenssajtens elektriska blå.

## Alla sju designreferenser

| Bild / fil | Designroll | Mappning och avgränsning |
|---|---|---|
| 1 — `exec-6d85f013-3d20-4b66-8884-5c004604cd82.png` | Header, hero, tidig kontakt | `Header`, `Hero`, `GoogleReviews`; kontakt omformas i senare fas. Telefon/adress i bilden avviker från kod. Formuläret är en ny funktion. |
| 2 — `exec-12fdaa72-b86a-42dd-ab98-e38cb51424c0.png` | FAQ och footer | Ny FAQ-sektion samt befintlig `Footer`. Integritetslänk saknar nuvarande route; inget tomt länkmål ska uppfinnas. |
| 3 — `exec-19b06bc4-5b0d-40fb-9a92-1684d59b7113.png` | Hitta oss / karta / öppettider | Befintlig `Contact` kan bli denna sektion. Kartlänk finns; inbäddad karta saknas. Den illustrerade kartan är inte verifierad geografi. |
| 4 — `exec-79ece2de-7cdd-47ff-8914-7f7a35c746e7.png` | Fotografisk boknings-CTA | Befintlig `CTABanner`. Bilden visar telefon som sekundär CTA; nuvarande komponent har Facebook. Båda kontaktvägarna måste mappas innan en ersätts. |
| 5 — `exec-94663624-5a72-450f-bcd6-e8cb7ae8aa0d.png` | Utvald bil på startsidan | Ny semantisk startsidessektion behövs om bilden avser startsidan. Återanvänd data och bilder från `BilarTillSalu`; behåll undersida och trebildsgalleri. |
| 6 — `exec-a992d87a-db25-475d-afb6-0a1e5e9c9160.png` | Tjänster, process, trygghetsrad | `Services`, `ServiceList`, `WhyUs`, ny process. Bildens fyra tjänster får inte ersätta hela verkliga utbudet. |
| 7 — `exec-afb1248b-8fde-4274-97ff-554108c67955.png` | Om oss | Befintlig `About`, dess verkstadsbilder och kvalitetsinformation. Befintligt Ken Burns-beteende och telefon-CTA behöver ett uttryckligt mål innan de ersätts med stillbild/”Läs mer”. |

## Baslinje och kontroller

| Vy | Bildmått | Sidbredd / horisontell scroll | Observation |
|---|---|---|---|
| Desktop | 1440 × 1000; helsida 1440 × 7034 | 1440 / ingen sidscroll observerad | Fast mörk header; gul/röd accent; fullbred mörk hero; text och recensioner i två kolumner. |
| Tablet | 768 × 1000; helsida 768 × 6872 | 768 / ingen sidscroll observerad | Mobilmeny aktiverad; hero och recensioner staplas; diagramstaplar döljs. |
| Mobil | 390 × 844; helsida 390 × 8283 | 390 / ingen sidscroll observerad | Staplade CTA; kompakt rubrik; betydande mörk tomyta nedanför recensioner. |

Måttet avser dokumentets scrollbredd; det bevisar inte att varje enskilt element är fritt från klippning. `body` använder redan `overflow-x: hidden`. Alla 29 `.fade-up`-element aktiverades genom scroll innan slutliga helsidesbilder togs. Hero-recensioner och About-slideshow är tidsberoende, så innehållet kan skilja mellan bilderna.

Sparade bilder:

- [Desktop hero](captures/desktop-1440-hero.png) och [helsida](captures/desktop-1440-full.png).
- [Tablet hero](captures/tablet-768-hero.png) och [helsida](captures/tablet-768-full.png).
- [Mobil hero](captures/mobile-390-hero.png), [helsida](captures/mobile-390-full.png), [öppen meny](captures/mobile-390-menu-open.png), [bokningsmodal](captures/mobile-390-booking.png) och [bilsida](captures/mobile-390-cars.png).

Kontrollerade beteenden:

- Mobilmenyn öppnas. Escape stänger den inte. Länkval stänger den.
- Bokning från mobilmenyn öppnar modalens fält; stängknappen tar bort modalen. Menyn stängs inte automatiskt när bokningen öppnas.
- `GET /api/services` gav `AxiosError: Network Error`; tjänsteväljaren blev tom. Ingen bokning skickades. API, tillgängliga tider och databas är inte verifierade.
- Mobilmodalens övre del inklusive stängkontrollen hamnar utanför den synliga vyn. Programmatisk knappaktivering fungerade, men det är inte ett godkänt manuellt mobilflöde.
- Bilsidans ”Bild 2” byter huvudbild. Navigation från bilsidan till `/#om-oss` fungerar lokalt och stänger mobilmenyn.
- Initial startsideskontroll gav inga fångade console-varningar/fel. Backendfelet ovan tillkom när bokningen öppnades.
- Mobilens hero-CTA är cirka 37,6 px höga och menyknappen 40 px: under planerade 44–48 px.
- Buildscriptet kör Vite, inte separat TypeScript-typkontroll. Buildresultatet ska inte beskrivas som en fullständig typ- eller funktionstestning.

## Innehållsparitet och målstruktur

Nuvarande ordning: Header → Hero → About → Services → ServiceList → WhyUs → EV → CTA → Contact → Footer. Bokningsmodalen styrs från `App` och separat på bilsidan.

Föreslagen målstruktur att besluta inför respektive flytt:

1. Header + hero (bild 1).
2. Tidig direktkontakt (bild 1; befintliga kontaktvägar tills formulärfunktionen är beslutad).
3. Om oss (bild 7).
4. Tjänster → process → trygghetsrad som sammanhängande grupp (bild 6).
5. Komplett tjänsteutbud och EV-information.
6. Utvald bil med väg till bilsidan (bild 5).
7. Fotografisk CTA (bild 4).
8. Hitta oss, öppettider och karta/kartlänk (bild 3).
9. FAQ och footer (bild 2).

Detta förslag prioriterar bild 6:s inbördes ordning. Överlämningens tidigare arkitektur placerar trygghetsraden före About och processen före tjänsterna. Skillnaden är dokumenterad och kräver ett sidordningsbeslut före Fas 2–5; ingen flytt görs i Fas 1.

| Befintlig källa | Innehåll som ska överleva |
|---|---|
| `Hero.tsx` | Exakt hero-copy, bokningscallback, telefonlänk, recensionsplacering. Magnus har beslutat att marqueen tas bort i redesignen. |
| `Services.tsx` | Bilservice/reparation, felsökning/diagnostik, AC, däck/däckhotell, bärgning/transport och bilar till salu. Sex erbjudanden, sex nuvarande bilder. |
| `ServiceList.tsx` | Samtliga 19 poster enligt listan nedan. |
| `About.tsx` | Grundat 2021, oberoende verkstad, EV-kompetens, godkännande vid tillägg, sex kvalitets-/arbetsprinciper och tre Ken Burns-bilder. Befintliga marknadspåståenden behöver verksamhetskontroll före lansering. |
| `WhyUs.tsx` | Personlig service, snabb service, schyssta priser och ärlighet; fyra innehållspunkter måste mappas om tre visuella platser används. |
| `EV.tsx` | Högvoltskompetens, märkeslistan samt Däckleader/Autobutler-information. Ingen exakt EV-mockup finns; använd det gemensamma formspråket. |
| `Contact.tsx` + `Footer.tsx` | Utmarksvägen 21B, 802 91 Gävle; 070-553 33 95; info@brynasbilservice.se; Maps och Facebook; timmar; företags- och förvaltaruppgifter. |
| `BilarTillSalu.tsx` | Peugeot 307 CC 2.0, 2006, 141 147 km, 39 900 kr, besiktningsuppgifter, tre bilder och såld-/tomlägen. Dagens UI visar avrundat 14 115 mil; mockupen använder km. |
| `BookingForm.tsx` | Befintliga fält, validering, payload, endpoints och callbacks. Formulärets brister ska redovisas separat från layoutförändringarna. |

De 19 tjänsteposterna: bilservice/oljebyte; bromsbyte/kontroll; däckbyte/montering; hjulinställning/balansering; AC-service/reparation; motorservice/motorbyten; felsökning/diagnostik; kamrem; koppling; elarbete/elsystem; avgassystem; besiktning/förkontroll; batteri; dragkrok; däckhotell; elbilsservice; högvoltssystem/diagnostik; växellådsreparationer; begagnade bilar.

## Konflikter och beroenden

1. **Marquee saknas i mockupen.** Magnus har nu beslutat att den tas bort i Fas 1; ingen kod är ännu ändrad. Dess öppettidstext säger måndag–fredag 08–16, medan öppettidstabellen anger tisdag–fredag och förfrågan på måndag/lördag. Telefonens svarstider kan vara en separat uppgift; anta inte att allt betyder samma sak.
2. **Hero-fotot är inte samma.** Aktiv CSS använder `HERO_BG_V7.jpg`, en verkstadsvy. Mockupen visar ratt/instrumentpanel. Magnus tillhandahöll därefter `background_hero.jpg` (2528 × 1686); bilden har granskats och visar ratt/instrumentpanel utan inbränd webbtext. På hans uttryckliga uppdrag flyttades den oförändrad från reporoten till `client/src/assets/images/background_hero.jpg`. Den är ännu inte inkopplad. `BILDER TILL WEB/exec-bbb86962-e1bc-4055-9491-df71ef8db1fa.png` granskades: det är en mekaniker/bromsbild som kan vara relevant senare, inte hero-fotot. Endast Magnus levererade hero-bild har flyttats in; ingen bild genererades eller redigerades.
3. **Globala tokens har stor räckvidd.** Att bara byta `--color-gold`, `--font-heading`, `.btn` och `.container` påverkar alla sektioner, modal och bilsida. Fas 1 bör definiera nya semantiska tokens centralt men aktivera dem endast i header/hero tills övriga sektioner migreras.
4. **Mörkt läge är inte ett fungerande publikt temaval.** `main.tsx` sätter `.dark`, men publika färger är mörka redan i `:root`. `ThemeSwitcher` används bara i admin. Varmvit hero-omgivning kan ges lokalt i Fas 1 utan att ändra admin eller lagrad temapreferens; resten av sidan får sitt utseende i senare faser.
5. **Typsnittsvariabler saknas.** HTML laddar Exo 2 och Barlow, Tailwind har fontklasser, men `--font-heading` och `--font-body` definieras inte. Browsern visar system-sans i hero/brödtext. Förslag: explicit system-sans med vikt 800–900 som första dependencyfria visuella prov; separat fontval om det inte räcker mot mockupen.
6. **Header återanvänds på bilsidan.** Flytande header får inte bli vit text på en ljus sida eller överlappa bilsidans rubrik. Föreslå ett frivilligt presentationsläge på befintlig Header, valt från App; samma menydata och callbacks återanvänds.
7. **Recensioner är placeholders.** Layout och accent kan justeras, men data får inte framställas som verifierade. Alla recensioner ligger dessutom i tillgänglighetsträdet fast bara en är visuellt aktiv. JavaScript-rotationen saknar reduced-motion-kontroll.
8. **Befintliga tjänste-CTA är trasiga.** Fyra länkar pekar på `#booking-form`; inget element har det id:t och länkarna öppnar inte modalen. Dokumentera nu, koppla till befintlig callback i tjänstefasen efter avgränsning.
9. **Tillgängligheten är ofullständig.** Menyn saknar Escape-hantering, scrollås och fokusåterställning. Bokningsmodalen saknar dialogsemantik/fokuslås och har mobilklippning. Ken Burns har reduced-motion-stöd; marqueen och recensionsrotationen saknar motsvarande fullständigt stöd. `About` nästlar en h2 inuti en annan h2. Dessa är befintliga brister.
10. **Produktionsbasväg behöver separat verifiering.** Router använder `/brynasbilservice` i produktion men flera vanliga ankarlänkar börjar med `/`. Lokala navigationstester bevisar inte att länkarna fungerar under produktionsprefixet. Ingen deploy/serverändring ingår.
11. **Nya funktioner behöver beslut.** Kontaktformulärets mottagning saknas, FAQ-svar behöver verifieras, ”Läs mer om oss” saknar egen route, ”Se bilen” behöver ett konkret mål och kartbilden får inte användas som faktisk karta. Inga dummyflöden införs.

## Exakt föreslagen fillista för Fas 1

Basförslaget behöver fem befintliga kodfiler:

| Fil | Planerad ändring |
|---|---|
| `client/src/css/index.css` | Centrala semantiska redesign-tokens; avgränsade regler för header, hero, CTA och recensionernas presentation; 1440/768/390; fokus, rörelser och bildbeskärning. Ersätt berörda befintliga regler, lägg inte på en konkurrerande stylesheet. |
| `client/src/components/layout/Header.tsx` | Tre visuella zoner, valbart heroläge, samma logo/meny/callbacks; förbättra menyknapp och tangentbordsbeteende inom headerns ansvar. |
| `client/src/components/sections/Hero.tsx` | Rundad ram med varmvit omgivning, tydliga tre rubrikrader, befintlig copy och actions; ta bort marquee enligt Magnus beslut. |
| `client/src/components/GoogleReviews.tsx` | Accentfärg via semantisk variabel med befintlig färg som fallback; reduced-motion för rotationen, utan att byta recensionsdata. |
| `client/src/App.tsx` | Endast välja heroläge på befintlig Header. Inga sektionsflyttar eller ändringar i modalens state. |

`AGENTS.md` uppdateras efter fasen. Ingen ändring behövs i `Button.tsx`, `main.tsx`, admin, backend, root-konfigurationer eller deployment för detta basförslag. Den riktiga SVG-logotypen återanvänds oförändrad.

Hero-asset är nu vald: `client/src/assets/images/background_hero.jpg`, redan flyttad enligt Magnus instruktion. Fas 1 kopplar in den från befintlig CSS. Om annat typsnitt behövs tillkommer avgränsat `client/index.html` och eventuella fontfiler efter att valet konkretiserats. Dessa tillägg är inte godkända genom denna rapport.

Modalens mobilklippning bör få en separat avgränsad korrigering i `BookingForm.css`; det ligger utanför basförslagets fem filer och ändrar inte API-kontraktet. Utan den åtgärden kan Fas 1:s fullständiga mobilbokningskriterium inte godkännas.

## Minsta implementeringssekvens och acceptans

1. Marquee och hero-original är beslutade. Bekräfta Fas 1:s fillista samt om modalens befintliga mobilfel ska korrigeras separat. Behåll befintlig redesignbranch.
2. Definiera tokens och begränsa användningen till berörda komponenter. Behåll läsbarheten i ännu ej migrerade sektioner.
3. Anpassa Header och Hero, bevara text/CTA, ge recensionerna samma accentfamilj. Ingen ny dependency eller V2-komponent.
4. Verifiera vyerna nedan, granska diff och build, presentera bilder. Invänta Magnus visuella godkännande innan commit och nästa fas. Ingen push utan uppdrag.

| Kontroll | Godkänt när |
|---|---|
| 1440 × 1000 | Varmvit omgivning, ca 24–32 px yttre marginal, mörkt rundat herokort, logotyp/vit navigationspill/separat bokningspill i tre zoner. Tre avsiktliga rubrikrader, recensioner på bilden till höger, inga överlapp. Radier ca 28–40 px prövas mot bild 1. |
| 768 × 1000 | Meny växlar innan innehåll kolliderar. Hero, CTA och recensioner får avsiktlig stapling. Bildbeskärningen fungerar utan att texten klipps eller ökar horisontell sidbredd. |
| 390 × 844 | 16–20 px ungefärlig sidmarginal, läsbar rubrik/copy, CTA och meny minst 44 px (helst 48). Inget tvång att pressa allt till en skärm. Även långa recensioner ryms. |
| Interaktion | Header/hero öppnar samma bokningsmodal; meny kan användas med tangentbord, stängas med Escape och återställa fokus. Telefonnummer och lokala navigationsmål bevaras; bilsidans header fungerar fortsatt. |
| Rörelse | Reduced-motion stoppar ny rörelse och recensionsrotation; marqueen tas bort enligt Magnus beslut. |
| Kontrast | Normal text minst 4,5:1, stor text minst 3:1; fokus tydligt på vit navigationspill och mörk bild. En faktisk kontroll görs mot slutliga färger/bildutsnitt. |
| Regression | Sektioner under hero har samma innehåll, ordning och presentation inom fasens avgränsning; modal/API-payloads och admin är oförändrade. Kända modalproblem redovisas tills åtgärdade. |
| Leverans | `client/npm run build` passerar, nya fel saknas i konsolen, diff utan orelaterad CSS/kod, desktop/tablet/mobilbilder presenteras för granskning. |

## Beslut kvar efter Fas 0

Magnus har beslutat att informationsraden tas bort och har levererat hero-originalet, som flyttats till bildkatalogen enligt hans uppdrag. Ingen layoutimplementation har påbörjats. Fas 1 väntar på uttryckligt godkännande; det befintliga mobilfelet i bokningsmodalen behöver en separat avgränsning. Övriga beslut (sidordning, kontaktformulär, karta, FAQ, ny bilsektion och sekundära CTA) tas inför respektive fas.

Följande är fortfarande uttryckligen overifierat: externa verksamhetsuppgifter och påståenden, backend/API/databasbeteende, navigation under produktionsbasnamnet `/brynasbilservice`, deploymentmiljön, verkliga Google-recensioner och slutlig tillgänglighet över webbläsare och brytpunkter.
