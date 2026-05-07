# Logg — 3 maj 2026

## Sammanfattning
Idag lades en **oändlig scrollande marquee** till i hero-sektionen, direkt under knapparna. Innehållet styrs numera från en extern textfil för enkel redigering.

---

## Ändrade filer

### 1. `client/src/components/sections/Hero.tsx`
- **Marquee importerad**: `import { Marquee } from '../ui/Marquee'`
- **Marquee placerad**: Lades till längst ner i `<section className="hero">`, utanför `.hero__content` och `.container`, så den täcker **hela skärmens bredd**
- **Innehåll hämtas från textfil**: `import marqueeText from '../../data/marquee-items.txt?raw'`
  - Textfilen parsas: `marqueeText.split('\n').map(s => s.trim()).filter(Boolean)`

### 2. `client/src/css/index.css`
- **Nya marquee-stilar**:
  - `.marquee` — `overflow: hidden; white-space: nowrap;`
  - `.marquee__track` — `display: inline-block; white-space: nowrap; animation: marquee-scroll linear infinite;`
  - `.marquee__content` — Guldtext, heading-font, uppercase, liten storlek
  - `@keyframes marquee-scroll` — `translateX(0)` → `translateX(-50%)`
- **Hero-specifik placering** (`.hero__marquee`):
  - `position: absolute; bottom: 0; left: 0; right: 0; width: 100%;`
  - Halvgenomskinlig mörk bakgrund: `rgba(8, 8, 8, 0.6)`
  - Subtil guld kantlinje upptill: `rgba(240, 184, 0, 0.15)`
  - `backdrop-filter: blur(4px)`
  - `z-index: 2`

---

## Nya filer som lades till

| Fil | Beskrivning |
|-----|-------------|
| `client/src/components/ui/Marquee.tsx` | Reusable marquee-komponent. Tar `items: string[]`, `speed?: number` (sekunder per loop) och `className?: string`. Duplicerar innehållet internt för sömlös loop. |
| `client/src/data/marquee-items.txt` | Textfil med ett item per rad. Innehållet läses in i Hero.tsx och visas i marqueen. |

---

## Status
**Ocommitade ändringar** ligger i working tree. Inga ändringar är staged eller commitade.
