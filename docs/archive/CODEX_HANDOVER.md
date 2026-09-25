# Codex Handover — Brynäs Bilservice (Updated 2026-09-22)

> **VÄLKOMMEN TILLBAKA CODEX!**  
> Detta dokument är skrivet specifikt för dig. Du har varit borta ett tag medan projektet genomgick en total arkitektonisk ombyggnad (Steg 1–7 i redesign-färdplanen). Nu är basen helt stabil och fri från det gamla `index.css`.
> 
> Din styrka är att hitta buggar, regressioner, död kod, arkitektoniska glapp och specifika kantfall. Detta dokument ger dig **100 % kontext** om var repot står idag, hur Magnus arbetar, vilka hårda regler som gäller, samt en prioriterad lista över var du kan sätta tänderna i projektet.

---

## 1. HÖGSTA AUKTORITET & AVTAL (MÅSTE FÖLJAS)

Dokumenthierarki i repot:
1. **`AGENTS.md`** — Det operativa avtalet som trumfar ALLT. Läs alltid detta först.
2. **`docs/CSS_OWNERSHIP.md`** — Kartan över vilken sida som äger vilken CSS och vilka klassprefix som är reserverade.
3. **`docs/DESIGN_SYSTEM.md`** — Kanoniska design-tokens (`--bb-*`), delade mönster (`.bb-*`), ikonregler (§2b) och hero-geometri (§2c).
4. **`docs/AGENT_HANDOFF.md`** — Löpande handoff och versionsstatus.
5. **`docs/audit-harness/README.md`** — Mätverktyg och skript för att bevisa ändringar innan/efter.

### Hårda arbetsregler för Magnus
- **Fråga alltid vid minsta oklarhet.** Gissa eller välj aldrig tolkning i tysthet.
- **Mät först, föreslå vid en grind (gate), invänta godkännande, implementera sedan.** Inga kodändringar innan Magnus godkänt förslaget.
- **Ändra ALDRIG svensk text.** Företagsfakta (telefon, öppettider, adress, org.nr) kommer ENBART från `client/src/data/business.ts`.
- **Visa visuella före/efter-skärmdumpar från Playwright innan commit.**
- **En logisk ändring per commit.** Kör aldrig bypass på pre-commit hooken.
- **PUSHA ALDRIG** utan Magnus explicita instruktion ("git push då").
- **Kör ALDRIG `git add -A` eller `git add .`** (stagea endast explicita filsökvägar).
- **Spårade raderade bilder (`" D"`) i git status tillhör arkivet och får INTE röras eller återställas.**

### Tekniska säkerhetsregler
- **`client/` är den ENDA applikationsmappen** (React 18.3.1, Tailwind 3.4.19, Vite 4.5.14, TypeScript 7.0.2). Root-filer (`package.json.disabled`, `vite.config.ts.disabled`) är döda orphans. Rör dem inte.
- **Inga Tailwind-utilities i publik TSX.** Tailwind är ENDAST tillåtet under `/admin` (`client/src/components/admin/`). Pre-commit hooken blockerar utilities i publik TSX.
- **Inga inline `style=` i publik TSX.** Alla stilar ska ligga i sidans CSS-ö. Pre-commit hooken blockerar inline-stilar.
- **Global CSS är EXAKT 4 filer** (laddas i `client/src/main.tsx` i denna ordning):
  1. `styles/tailwind.css` (Tailwind preflight och admin)
  2. `styles/design-tokens.css` (alla `--bb-*` tokens)
  3. `styles/base.css` (grundläggande HTML-elementdefaults)
  4. `styles/shared-elements.css` (delade `.bb-*` mönster: knappar, kort, trust-rad, hjälte m.m.)
- **Tokens är endast `--bb-*`.** Inga `--redesign-*` eller `--color-*`.
- **Rör ALDRIG:**
  - `server/**` (ägs av Johnny, Magnus bror)
  - `AGENTS.md` (får inte växa, vaktas av pre-commit hook)
  - `client/playwright.config.ts`

---

## 2. REPO-REALITET & NULÄGE (2026-09-22)

- **Branch:** `redesign/blue-teal-v1`
- **Senaste commit:** `5c75511f` (ny hero på landing, ren SVG-vektorlogo i header/footer, ny hero på Avgassystem).
- **Rebuild Steg 7 är klar:** Det gamla 7 531 raders monstret `client/src/css/index.css` raderades 2026-09-19. Global CSS minskade från 287.8 KB till 100.0 KB (44.2 → 17.7 KB gzip).
- **Alla sidor är oberoende CSS-öar:**
  - **7 unika sidor:** Startsidan (`.landing-v2__*`), Om oss (`.omoss-page__*`), Kontakt (`.kontakt-page__*`), Bärgning (`.bargning-page__*`), Bilar till salu (`.bilartillsalu-page__*`), Galleri (`.galleri-page__*`), Biltjänster hub (`.biltjanster-hub__*`).
  - **Bilservice-familjen (`ServiceReparationerPage.css`, `.bilservice__*`):** Bilservice (`/service-reparationer`, owner), Felsökning, Däckservice, AC-service.
  - **Guide-familjen (`styles/ServiceGuideTemplate.css`, `.service-guide__*`):** 10 tekniska guider (Koppling, Avgassystem, Oljebyte, Bromssystem, Kamrem, Bilbatteri, Stötdämpare & fjädrar, Hjullagerbyte, Styrning & kulleder, Drivaxel & drivknutar). *Obs: Ingen delad TSX-layoutkomponent – varje guide är en fristående TSX som delar stylesheet.*
- **Konsoliderade ikoner:** 29 delade SVG-ikoner i `client/src/components/icons/`, alla med `strokeWidth={2}` och `currentColor`.
- **Bokningsformulär:** Komplett in-flight livscykel i `client/src/hooks/useFormSubmission.ts` (låsning vid inskickning, timeout, inline felmeddelanden, inga `alert()`, lokal `yyyy-MM-dd` datumhantering för att undvika UTC-dagskifte).
- **Logotyp:** Ny ren vektoriserad SVG utan heltäckande bakgrund i `client/src/assets/images/brand/brynas-bilservice-logo.svg`, renderas perfekt i `PublicHeader` och `PublicFooter`.
- **Hero-geometri (Steg 1–3 klara):** Header-derived clearance-tokens, H1-storlek begränsad till max 48px, och alla 10 guider använder nu den delade `.bb-trust-row` från `shared-elements.css`.

---

## 3. VERIFIERINGSKOMMANDON (MÅSTE KÖRAS)

Innan du föreslår eller commitar något, kör alltid:
```bash
npm --prefix client run typecheck   # Skall ge 0 fel (tsc -p tsconfig.app.json --noEmit)
npm --prefix client run check:css   # Skall vara rent (kontrollerar var(--bb-*), förbjuder inline styles, etc.)
npm --prefix client run build       # Skall bygga felfritt (Vite production build)
```
För webbläsartester med Playwright:
```bash
# På denna Mac (Intel 2018): begränsa till 3 workers för att inte överbelasta minnet
npm --prefix client run test:browser -- --workers=3
```
Nuvarande teststatus: **155 passed / 4 skipped** över 19 testfiler. (Skips är touch-tester utanför mobil och desktop-width matrix i `hero.spec.ts`).

---

## 4. AUDIT BACKLOG & VAR CODEX KAN HITTA FEL

Här är de öppna punkterna där din förmåga att hitta inkonsekvenser, buggar och förbättringsmöjligheter behövs som mest:

### 1. Breakpoint-fragmentering (Audit punkt 3 — Ej påbörjad)
* Det finns **16 olika media query-värden** spridda i CSS-öarna.
* Särskilt problematiska är nästan-dubbletter:
  * `640px` vs `650px` (används om vartannat för mobilstapling).
  * `1100px` vs `1120px`.
  * `1320px` vs `1321px` (`PublicHeader` byter storlek vid 1321px medan `--bb-wrap-max` är 1320px).
* **Uppgift för Codex:** Granska dessa brytpunkter, identifiera var de orsakar layout-glapp eller hopp, och föreslå en harmonisering till de kanoniska tokens/standardbrytpunkterna.

### 2. Hårdkodade färgkoder (Audit punkt 5 — Ej påbörjad)
* Det finns fortfarande hårdkodade hex-färger som inte använder `--bb-*`-tokens:
  * Ca 25 st i `ServiceReparationerPage.css`.
  * Ca 25 st i `ServiceGuideTemplate.css`.
  * Ca 30 st i `PublicFooter.css`.
  * Ca 26 st i `ContactFormCard.css`.
* **Uppgift för Codex:** Analysera vilka som är legitima engångsfall (t.ex. rgba-skuggor eller fotomasker) och vilka som är "färgläckage" som borde kopplas till `--bb-color-ink-*`, `--bb-color-teal-*` eller `--bb-color-amber-*`.

### 3. Saknad Error-State Token (Audit punkt 6 — Ej påbörjad)
* Det finns ingen token för felstatus i designsystemet (`--bb-color-error` saknas).
* Bokningsformuläret och valideringsrutor använder hårdkodade röda/rosa färger.
* **Uppgift för Codex:** Identifiera alla ställen där felmeddelanden renderas och föreslå en standardiserad `--bb-color-error-*` token-struktur.

### 4. Den sista odefinierade token: `--bb-font-sans`
* Det finns **33 deklarationer** i `ServiceGuideTemplate.css` som refererar till `var(--bb-font-sans)`.
* Denna token finns inte i `design-tokens.css` och ligger på undantagslistan i `scripts/check-css.mjs`.
* Den råkar "hålla upp" fallback-fonten, men är tekniskt sett en bugg.
* **Uppgift för Codex:** Hjälp till att reda ut hur font-fallbacken ska harmoniseras med `--bb-font-body` (`Manrope`) och `--bb-font-display` (`Archivo`) utan att bryta textradbrytningar.

### 5. Kontaktformuläret skickar ingenting (Logisk bugg)
* `ContactFormCard.tsx` visar glatt "Tack för ditt meddelande!" men gör inget anrop, och det finns ingen `/api/contact` i backend.
* **Uppgift för Codex:** Granska felhantering och formulärlivscykel. Se förslaget i `docs/BACKEND_HANDOFF.md` för hur ett `api/contact.ts`-adapterlager kan byggas med fallback till telefon/e-post.

### 6. P0 Säkerhet i Admin (Klient-sidan)
* Admin-inloggningen kontrolleras i webbläsaren via hårdkodade uppgifter (`admin`/`admin123` i `ProtectedRoute.tsx`).
* Backend accepterar den fasta token `admin-secret-token` från vem som helst.
* Uppgifterna läcker i den publika JS-bunten.
* **Uppgift för Codex:** Se arkitekturförslaget i `docs/BACKEND_HANDOFF.md` §2.1 för att förbereda klienten med sessions-cookies och lazy loading av admin-rutten.

### 7. Hero Outliers (Skärmhöjd vid 1280×720)
* Målet för standardhjältar är ca 85 % av skärmhöjden vid 1280×720.
* Flera sidor sticker fortfarande ut:
  * **AC-service:** 125 % (CTA-rad och ingress radbryts kraftigt).
  * **Kamrem & Oljebyte:** 105 % (deras bildkolumn är 587px hög).
  * **Koppling, Bromssystem, Avgassystem:** 92–94 % (H1 radbryts till 3 rader).
* **Uppgift för Codex:** Identifiera exakt vilka element som bygger höjd och föreslå kirurgiska justeringar med hjälp av `docs/audit-harness/hero/`.

### 8. Ersättning av MediaPlaceholder-slots (Pågående bildtranche)
* Alla 19 bildslots i de 7 guidesidorna och 6 slots på Bilservice är uppmätta och dokumenterade i `_incoming-assets/ASSET_INVENTORY.md`.
* Avgassystem fick sin hero-bild idag (`exhaust-system-repair-underbody.{webp,jpg}`).
* De återstående 18 bildplatserna har fortfarande `<MediaPlaceholder />` och väntar på bilder från Magnus.

---

## 5. DOKUMENT OCH KODSTRUKTUR ATT KÄNNA TILL

```text
client/src/
├── api/                   # API-klienter (axiosConfig, vehicles, gallery)
├── assets/images/         # BILDTRÄD (brand, home, services, vehicles, gallery)
├── components/
│   ├── admin/             # Admin-panel (Tailwind TILLÅTET HÄR)
│   ├── icons/             # 29 delade SVG-ikoner (stroke-width 2, named exports)
│   ├── layout/            # PublicHeader, PublicFooter
│   └── ui/                # BiltjansterFaq, ContactFormCard, GalleryTeaserCard, GoogleReviewsCard
├── data/                  # business.ts (FÖRETAGSFAKTA), vehicles.ts, publicNavigation.ts
├── hooks/                 # useFormSubmission.ts
├── pages/                 # Alla 7 unika sidor + Bilservice-familjen + 10 guider
└── styles/
    ├── base.css           # Globala elementdefaults (h1-h6, body, p)
    ├── design-tokens.css  # ALLA --bb-* tokens
    ├── ServiceGuideTemplate.css # Delad CSS för Guide-familjen
    ├── shared-elements.css# Delade .bb-* klasser (knappar, trust-row, m.m.)
    └── tailwind.css       # Tailwind directives (endast admin)
```

---

## 6. SÅ HÄR RAPPORTERAR DU TILL MAGNUS

När du analyserar eller föreslår en ändring, använd alltid denna mall:

1. **Identifierat problem / Mätning:** Beskriv exakt vad som är fel eller avviker, med filnamn och radnummer. Ange vad du har mätt (med Playwright eller audit-harness).
2. **Förslag vid en grind (Gate):** Presentera förslaget tydligt.
3. **Task Contract:**
   ```text
   ALLOWED WRITES:
   - client/src/... (endast de filer som MÅSTE ändras)
   
   FORBIDDEN WRITES:
   - client/src/styles/* (global layer — endast med explicit godkännande)
   - AGENTS.md
   - server/**
   - alla andra sökvägar
   ```
4. **Vänta på Magnus godkännande:** Genomför inga ändringar förrän Magnus har svarat ja/kör.
5. **Verifiering:** Kör `typecheck`, `check:css`, `build` och ta Playwright-skärmdumpar före/efter.
6. **Loggbok:** Skriv alltid en daterad notis i `docs/SESSION_LOG_CURRENT.md` (nyast överst).

Nu har du full koll på läget. Välkommen att hjälpa Magnus att göra Brynäs Bilservice ännu mer felfritt och stabilt!
