# Åtgärdslista efter benchmark – Brynäs Bilservice

> Arbetslista, inte regler. Bocka av punkter här i samma commit som ändringen. När allt under "Återstår" är gjort eller avfärdat: flytta filen till `docs/archive/` och ta bort raden i `STATUS.md`.

Senast uppdaterad: 29 september 2026
Rapport med skärmdumpar: https://claude.ai/artifact/4ispPhgJPx2J1YWLNkXZRY
Råmaterial (skärmdumpar, text och mått för 6 verkstäder + vår sajt): `_incoming-assets/BENCHMARK/` — ligger bara lokalt hos Magnus (mappen ignoreras av git).
Förebilder: Auto Stockholm, JA Car Center, Mattssons, Torsviks, Laga Bilen i Umeå, Gävle Fordonsteknik.

---

## Klart (pushat, ligger i `main`)

| # | Åtgärd | Commit |
|---|---|---|
| A1 | Egen titel och beskrivning per sida i Google (`data/pageMeta.ts`, test `page-meta.spec.ts`) | `71ec748e` |
| A2 | Strukturerad data: AutoRepair på alla sidor, FAQPage på de 13 sidorna med vanliga frågor | `d3e9404e` |
| A3 | `/tjanster` → `/biltjanster` – var redan löst, ingen åtgärd | – |
| B1 | Fast rad med Ring och Boka tid på mobil (under 768 px) | `2210aa3a`-serien |
| B2 | Startsidan: hero → tjänster → om oss → galleri → process → kontaktformulär | `6153ca40`-serien |
| B3 | "I korthet" under heron på de tio guiderna (arbetstid, pris, bilmärken) | `6153ca40`-serien |
| B5 | "Fler tjänster" – tre länkar längst ner på de tio guiderna | `6153ca40`-serien |
| – | Lazy-loading borttaget på sju guiders hero-bilder | `cf208017` |
| – | Mobilheader: större logotyp (195 px), menyknappen längst till höger | `2210aa3a`-serien |
| – | Ett delat bildspelsmönster `.bb-hero__slide` i stället för fyra kopior | `f2af14b0` |
| – | Delad toning `.bb-shade-copy-left`, token `--bb-color-ink-glass`, "I korthet" med `.bb-eyebrow` | `5d4d6cb5`-serien |

---

## Återstår

### Kräver svar från Maher

- [ ] **C1 – "Från"-priser** för de vanligaste jobben och en egen prissida. Idag syns priser bara på Däck och AC. När priserna finns: lägg dem på startsidans tjänstekort (komplement till B2) och i "I korthet" på guiderna.
- [ ] **C2 – Maher presenterar sig på startsidan**: namn, porträtt och ett kort stycke i jag-form. Auto Stockholm gör så och det är den tydligaste skillnaden mot kedjorna.
- [ ] **C4 – Svarslöfte** ("vi svarar inom X timmar") vid formuläret – bara om det går att hålla.
- [ ] **C4 – Besiktningsanmärkningar / "släcka tvåor"** som egen tjänst – bara om ni gör det.

**Frågor att ställa till Maher:**
1. Vilka "från"-priser kan vi visa för oljebyte, liten service, bromsbelägg fram, felsökning, kamrem och hjulskifte?
2. Åtgärdar ni anmärkningar från besiktningen?
3. Kan ni lova en svarstid på förfrågningar, och i så fall hur lång?
4. Vilken garanti ger ni på arbete och delar?
5. Vill Maher presentera sig själv på startsidan, med namn och ett kort stycke i jag-form?
6. Finns det lokala kopplingar att visa, till exempel företagskunder eller sponsring av en förening?

### Kräver Johnny

- [ ] **C3 – Omdömen i en egen sektion** (3–5 st + länk till Google). Idag är omdömena inskrivna i koden och blir inaktuella; att hämta dem automatiskt kräver serverarbete.
- [ ] Admin-inloggningen är bara skyddad i webbläsaren (P0-säkerhet).
- [ ] `comment_customer` sparas inte av servern.

### Mobilfasen (när desktop är klar)

- [x] **B4 – Kortare guider på mobil**: fäll ihop fördjupningar under "Läs mer" (t.ex. API/ACEA och oljetyper på Oljebyte, 11 957 px). Guiderna är 8 000–12 000 px på mobil; JA:s tjänstesidor är under 5 000 px. **Klart 2026-09-30:** enda guiden med den här sortens djupdykning var Oljebyte (de andra nio saknar `GuideTopic`-blocken helt) — intervall, viskositet, API/ACEA och oljetyper ligger nu bakom en ny delad `GuideReadMore` (`ServiceGuideSections.tsx` + `ServiceGuideTemplate.css`), fälld ihop under 900 px och öppen som förut däröver.
- [ ] **Mobilbilder 1200 × 2100 px** för hero på Start, Om oss, Kontakt och Bärgning (personerna faller ur bild i 390 px idag).

### Bilder från Magnus

- [ ] Nya hero-bilder för **Koppling** (1400 × 473, för liten), **Kamrem** (1400 × 1400, otydlig) och **Drivaxel** (1400 × 782).
- [ ] **Hjullagerbyte** och **Styrning** (1672 × 941) är i minsta laget för retina.
- [ ] **Kontakt, mössbilden** är 2400 × 1350 – gör om i 3000 × 1700 med mer luft ovanför huvudena.

**Leveransspec för hero-bilder:**
- Desktop 3000 × 1700 px (16:9 går bra), mobil 1200 × 2100 px.
- Bildens fokus (ansikten, händer, nyckel, verktyg) i högra halvan, y 30–66 %. Mallar: `_incoming-assets/GUIDES/` (lokalt hos Magnus).
- Vänstra 45 % lugnt och mörkt, inga färgstarka eller blickfångande föremål.
- Inga inbakade toningar, vinjetter eller korn – toning görs i CSS.
- JPG kvalitet 92–95, sRGB.

### Teknisk skuld (från egen granskning)

- [x] Toningarna i heron – delad `.bb-shade-copy-left` (Om oss, Kontakt).
- [x] Mobilens fasta rad – token `--bb-color-ink-glass`.
- [x] Etiketterna i "I korthet" använder `.bb-eyebrow`.
- [ ] Titlarna sätts med JavaScript. Tjänster som bara läser rå HTML (vissa länkförhandsvisningar) ser standardtiteln → förrendering vid bygget.

### Innan lansering

- [ ] **Integritetspolicy** – sajten tar emot bokningar. Claude kan skriva ett utkast.
- [ ] **Instagram-knappen** i sidfoten leder till Instagrams startsida – byt till verkstadens konto eller ta bort.
- [ ] Obekräftade uppgifter i koden: Felsökning "1–2 tim", AC-servicefrekvens och köldmedium.

---

## Hoppa över

- Andra verkstäders löften som ni inte har: fri lånebil, prisgaranti inom 25 km, Falck-assistans, 3 års garanti på delar, SWEDAC. Vilseledande om det inte stämmer.
- WhatsApp – bara om Maher faktiskt svarar där.
- Bokning med uppslag på registreringsnummer – betalt API och serverarbete (Johnny), kan komma senare.
- Allt teknikbyte från den första rapporten (Astro/Next, headless CMS, Tailwind, spårning på serversidan).
