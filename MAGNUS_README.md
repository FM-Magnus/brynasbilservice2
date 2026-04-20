# Brynäs Bilservice — Projektöversikt

> Denna README är skriven för att du och din bror ska förstå projektet, dess struktur och alla design- och kodbeslut som fattats under utvecklingen.

---

## 1. Projektstruktur

Projektet är ett **monorepo** med två huvuddelar:

```
brynasbilservice/
├── client/          ← React/Vite frontend (det du ser i webbläsaren)
│   ├── src/
│   │   ├── components/    ← Alla React-komponenter
│   │   ├── css/           ← All CSS i EN fil: index.css
│   │   ├── data/          ← Datafiler (t.ex. marquee-items.txt)
│   │   ├── pages/         ← Sidkomponenter (admin)
│   │   └── assets/images/ ← Bilder som används i sajten
│   ├── public/        ← Statiska filer (favicon, icons.svg)
│   └── dist/          ← Bygg-output (genereras automatiskt)
│
├── server/          ← Node.js backend (bokningssystemet)
│   ├── database/    ← SQL-schema
│   ├── public/      ← Serverad statik (kopieras från client/dist vid deploy)
│   └── index.js     ← Serverns startfil
│
├── docs/            ← Dokumentation (deployment, SSH, admin-panel)
├── _magnus/         ← Dina design-instruktionsbilder (INSTRUKTION1.png etc.)
└── .github/workflows/  ← Automatisk deploy till server
```

### Viktigt: Var koden ligger
- **All styling** finns i `client/src/css/index.css` (enda CSS-filen)
- **Alla komponenter** finns i `client/src/components/`
- **Alla bilder** finns i `client/src/assets/images/`
- **Hero-bakgrund**: `HERO_BG_V7.jpg`
- **Logotyp**: `LOGOTYP_NY.svg`

---

## 2. Teknisk stack

| Del | Teknik |
|-----|--------|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS 3 + Custom CSS |
| Backend | Node.js + Express |
| Databas | MySQL (schema i `server/database/schema.sql`) |
| Deploy | GitHub Actions → SSH till server |

---

## 3. Bygga och köra lokalt

### Frontend (client)
```bash
cd client
npm install       # installerar dependencies (behövs bara första gången)
npm run dev       # startar utvecklingsserver
npm run build     # bygger produktion till client/dist/
```

### Backend (server)
```bash
cd server
npm install
npm start         # startar servern
```

---

## 4. Färgsystem & Design

Alla färger definieras som CSS-variabler i början av `index.css`:

```css
--color-black: #080808          /* Huvudbakgrund */
--color-dark: #161410           /* Sekundär bakgrund */
--color-gold: #F0B800           /* Accent/CTA */
--color-gold-light: #FFD54F     /* Ljusare guld */
--color-red: #CC1417            /* Branding/marquee */
--color-white: #FFFFFF          /* Text */
--color-text-muted: #A0A0A0     /* Sekundär text */
--color-grey: #808080           /* Tertiär text */
```

### Typografi
- **Rubriker**: Exo 2 (Google Fonts), weight 800, uppercase
- **Brödtext**: Barlow (Google Fonts), weight 400–600

---

## 5. Sektioner på sajten (top till bottom)

| Sektion | Komponent | Fil |
|---------|-----------|-----|
| **Header** | Header | `components/layout/Header.tsx` |
| **Marquee** | Marquee | `components/ui/Marquee.tsx` |
| **Hero** | Hero | `components/sections/Hero.tsx` |
| **Google Reviews** | GoogleReviews | `components/GoogleReviews.tsx` |
| **Tjänster** | Services | `components/sections/Services.tsx` |
| **Om oss** | About | `components/sections/About.tsx` |
| **Tjänstelista** | ServiceList | `components/sections/ServiceList.tsx` |
| **Elbilar** | EV | `components/sections/EV.tsx` |
| **Redo att boka?** | CTABanner | `components/sections/CTABanner.tsx` |
| **Kontakt** | Contact | `components/sections/Contact.tsx` |
| **Footer** | Footer | `components/layout/Footer.tsx` |

### Admin-panel
- `/admin` — Dashboard (bokningshantering)
- `/admin/login` — Inloggning

---

## 6. Vad som har gjorts under denna session

### Design & Layout
- ✅ **Hero-marquee** — Röd scrollande textband överst i hero med tjänster
- ✅ **Header info-borttagning** — Röd/grå info-stripe borttagen för renare övergång
- ✅ **Google Reviews i hero** — Sammanfattning (4,3/5, 50 recensioner) + roterande individuella recensioner
- ✅ **Mobil-typografi** — Hero-typografi sätter standard för hela mobil-siten
- ✅ **Servicekort i mobil** — Horisontella rader utan bilder
- ✅ **Gradient-linjer** — Röd→guld övergångar mellan sektioner
- ✅ **CTA-banner** — "Redo att boka service?" med Facebook-knapp

### Spacing & Justeringar
- ✅ EV-sektion → CTA: ökat space + gradient-linje i botten av CTA
- ✅ CTA → Kontakt: generöst space
- ✅ Hero fyller hela mobilskärmen (`100svh`)
- ✅ Google Reviews synliga i mobil utan att trycka ut text

### Städning
- ✅ Borttaget: 10 oanvända bilder, .DS_Store-filer, backup-mapp, SSH-nycklar
- ✅ Skapat: root `.gitignore`
- ✅ Alla referenser i koden intakta (inga brutna länkar)

---

## 7. Viktiga filer att känna till

| Fil | Vad den gör |
|-----|-------------|
| `client/src/css/index.css` | **All** styling — desktop-first med mobil-overrides |
| `client/src/App.tsx` | Huvudkomponenten, renderar alla sektioner |
| `client/src/components/GoogleReviews.tsx` | Google Reviews med animationer |
| `client/src/data/marquee-items.txt` | Textinnehåll till hero-marquee |
| `client/vite.config.ts` | Vite-konfig (base: './' för relativ paths) |
| `.github/workflows/deploy.yml` | Automatisk deploy vid push till main |
| `.htaccess` | Apache-rewrite-regler (ligger i root och server/) |

---

## 8. Konventioner & Regler

### CSS-struktur
- **Desktop-first**: Standardregler gäller desktop
- **Mobil-overrides**: `@media (max-width: 1024px)`, `@media (max-width: 768px)`, `@media (max-width: 480px)`
- **Enda CSS-filen**: All styling i `client/src/css/index.css` — lägg INTE till nya CSS-filer

### Breakpoints
| Breakpoint | Användning |
|------------|------------|
| `768px` | Huvudmobil-breakpoint — de flesta overrides |
| `480px` | Extra små skärmar — kompakta justeringar |
| `1024px` | Tablet — grid-kolumner etc. |

### Komponentstruktur
- Layout-komponenter: `components/layout/` (Header, Footer)
- Sektioner: `components/sections/` (Hero, About, Services, etc.)
- UI-komponenter: `components/ui/` (Button, Marquee, SectionHeader)
- Ikoner: `components/icons/` (varje ikon som egen .tsx-fil)

---

## 9. Bilder som används (alla ligger i `client/src/assets/images/`)

| Bild | Används i |
|------|-----------|
| `HERO_BG_V7.jpg` | Hero-bakgrund (CSS) |
| `LOGOTYP_NY.svg` | Header + Footer |
| `sakar_works.jpg` | About-sektionen |
| `mech_inspects_brakes2.jpg` | Services-sektionen |
| `service_tiles.jpg` | Services-sektionen |
| `trailer_in_winter.jpg` | Services-sektionen |
| `workshop_with_tires_on_shelves.jpg` | Services-sektionen |

---

## 10. Deploy-process

1. Du pushar till `main` på GitHub
2. GitHub Actions kör `.github/workflows/deploy.yml`
3. Bygger client → `client/dist/`
4. Kopierar `server/` + `client/dist/` till servern via SSH
5. Startar om servern med PM2

### Viktigt vid deploy
- **`.env`** på servern innehåller databaslösenord och backas upp automatiskt
- **`.htaccess`** kopieras från repo-root till servern
- **Client-dist** deployas till serverns `public/`-mapp

---

## 11. Full ändringshistorik

### 3 maj 2026 — Dagens session (senaste)
- ✅ **Hero-marquee** — Röd scrollande textband med tjänster, styrs av `client/src/data/marquee-items.txt`
- ✅ **Header info-borttagning** — Röd info-stripe borttagen för renare övergång
- ✅ **Google Reviews i hero** — Sammanfattning + roterande individuella recensioner
- ✅ **Mobil-typografi** — Hero-typografi sätter standard för hela mobil-siten
- ✅ **Servicekort i mobil** — Horisontella rader utan bilder
- ✅ **Gradient-linjer** — Röd→guld mellan sektioner (hero↔reviews, EV↔CTA, CTA↔kontakt)
- ✅ **CTA-banner** — "Redo att boka service?" med Facebook-knapp
- ✅ **EV-sektion** — Elbils-märken i grid, duplicerad text borttagen
- ✅ **Spacing** — Generöst space mellan sektioner i mobil
- ✅ **Städning** — 10 oanvända bilder bort, .DS_Store, backup, SSH-nycklar bort
- ✅ **Google Reviews storlek** — Större text för läsbarhet i mobil
- ✅ **Hero-layout** — Text + reviews disponerar hela skärmens höjd i mobil
- ✅ **Marquee-centrering** — Texten centrerad vertikalt i bandet

### 27 april 2026 — Stor designuppdatering
- ✅ **Ny logotyp** — `LOGOTYP_NY.svg` i header och footer (ersatte logo1.jpg / logo2.jpg)
- ✅ **Ny navigation** — "Kontakt & Öppettider" delad i "Om oss" + "Kontakt"
- ✅ **Info-bar** — Flyttad från Hero till Header (desktop: 5 punkter, mobil: 2 punkter)
- ✅ **Nya tjänster** — Felsökning & Diagnostik, AC-Service (SnowflakeIcon), Bärgning & Transport (TruckIcon)
- ✅ **Hero-bakgrund** — Bytt till `Hero_Background_V3.jpg`
- ✅ **Hamburgermeny** — Guld/mörkt tema
- ✅ **Nya ikoner** — `SnowflakeIcon.tsx`, `TruckIcon.tsx`
- ✅ **Nya bilder** — `LOGOTYP_NY.svg`, `Hero_Background_V3.jpg`, `sakar_works.jpg`

---

## 12. Kontakt & Support

Om något går snett:
1. Kolla att `npm run build` i `client/` går igenom utan fel
2. Kolla att `npm start` i `server/` startar utan fel
3. Kolla GitHub Actions-loggar om deploy misslyckas
4. Kolla att `.env` finns på servern med rätt databasuppgifter

---

*Skrivet för Brynäs Bilservice — din lokala verkstad i Gävle.*
