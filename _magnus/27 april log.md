# Logg — 27 april

## Sammanfattning
Idag gjordes en större designuppdatering av Brynäs Bilservice-webbplatsen. Fokus låg på nytt visuellt uttryck, ny logotyp, omstrukturering av hero-sektionen, nya tjänster och uppdaterad navigation.

---

## Ändrade filer

### 1. `client/src/components/layout/Header.tsx`
- **Ny logotyp**: Bytte från `logo1.jpg` till `LOGOTYP_NY.svg`
- **Ny navigation**: Delade upp "Kontakt & Öppettider" i två separata länkar:
  - "Om oss" (`#om-oss`)
  - "Kontakt" (`#kontakt`)
- **Infobar flyttad hit**: Info-baren (röd tidigare) flyttades från Hero till Header
  - Desktop-variant: Alla 5 punkter (Alla bilmärken, Snabb service, Konkurrenskraftiga priser, Måndag–Fredag 08–16, Utmarksvägen 21B, 802 91 Gävle)
  - Mobil-variant: Endast 2 punkter (Mån-Fre 8-16, Utmarksvägen 21B, Gävle)
- **Ny komponent**: `InfoItem` exporteras för återanvändning

### 2. `client/src/components/layout/Footer.tsx`
- **Ny logotyp**: Bytte från `logo2.jpg` till `LOGOTYP_NY.svg`

### 3. `client/src/components/sections/Hero.tsx`
- **Borttaget**: Röd info-stripe (flyttad till Header)
- **Borttaget**: Importer och komponent för `InfoItem`, samt ikoner (CheckIcon, ClockIcon, MapPinIcon, BoltIcon, DollarIcon)
- **Textfärger**: "Din bil" och "det bästa" fick klassen `text-white` för vit färg
- **Layout**: `padding-top` justerad i CSS (se nedan)

### 4. `client/src/components/sections/Services.tsx`
- **Nya tjänster tillagda**:
  1. **Felsökning & Diagnostik** — med MonitorIcon
  2. **AC-Service** — med ny `SnowflakeIcon`, bild: `sakar_works.jpg`
  3. **Bärgning & Transport** — med ny `TruckIcon`, länkar till `#kontakt`
- **Omfördelade tjänster**: Däckservice och Bilar till salu flyttades i ordningen
- **CTA-text uppdaterad**: Vissa knappar fick versaler:
  - "BOKA TID" (AC-Service)
  - "KONTAKTA OSS" (Bärgning & Transport)
  - "SE VÅRA BILAR" (Bilar till salu)
- **Rubrik**: "Våra" fick klassen `text-white`

### 5. `client/src/css/index.css`
- **Nya CSS-variabler**:
  - `--color-text: #FFFFFF`
  - `--color-background: #080808`
- **Hamburgermeny**: Omgjord till guld/mörkt tema (`var(--color-gold-dark)` border, `var(--color-gold)` streck)
- **Hero**:
  - Bakgrundsbild bytt till `Hero_Background_V3.jpg`
  - `.hero__red-stripe`: Bakgrund ändrad till `var(--color-dark)` med vit border-top (istället för rött)
  - `.hero__content`: `padding-top: 155px` (desktop), `125px` (mobil)
- **Desktop-cropping** (ny media query `@media (min-width: 769px)`):
  - `min-height: 95svh` på hero
  - `min-height: calc(95svh - 100px)` på inner
- **Info-bar responsivitet**:
  - `.info-bar-desktop { display: flex }`
  - `.info-bar-mobile { display: none }`
  - Omvänt i mobil (`@media max-width: 1024px`)

---

## Nya filer som lades till

| Fil | Beskrivning |
|-----|-------------|
| `client/src/assets/images/Hero_Background_V3.jpg` | Ny hero-bakgrund |
| `client/src/assets/images/Hero_Bakground_warmer.jpg` | Alternativ hero-bakgrund (varmare ton) |
| `client/src/assets/images/LOGOTYP_NY.svg` | Ny logotyp (används i header & footer) |
| `client/src/assets/images/new_old_logo.png` | Gammal logotyp backup? |
| `client/src/assets/images/sakar_works.jpg` | Bild för AC-Service |
| `client/src/components/icons/SnowflakeIcon.tsx` | Ikon för AC-Service |
| `client/src/components/icons/TruckIcon.tsx` | Ikon för Bärgning & Transport |
| `_magnus/Hero_Background_V3.jpg` | Kopia av hero-bakgrund |
| `_magnus/i1.png` | (fanns sedan tidigare?) |

---

## Övriga nya filer (ej relaterade till kodändringar)
- `Hero_Bakground_warmer.jpg` (rot)
- `LOGOTYP_NY.svg` (rot)
- `New_old_logo.png` (rot)
- `logo1-c66a10e4@0.5x.png` (rot)
- `server/public/` (ny katalog — eventuellt bygg-output?)

---

## Status
**Ocommitade ändringar** ligger i working tree. Inga ändringar är staged eller commitade.
