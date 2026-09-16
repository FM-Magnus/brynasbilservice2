# Claude Code Handover — Brynäs Bilservice

Updated **2026-09-16** by Codex / Antigravity.
This document is the authoritative continuation guide for Claude Code (or any incoming AI assistant) to seamlessly continue development on Brynäs Bilservice.

---

## 1. Quick Start & Repo Reality

- **Repository Path:** `/Users/magnusolsson/Documents/REPOS/brynasbilservice_repo`
- **Active Working Branch:** `redesign/blue-teal-v1`
- **Current Git State:** Ahead of `origin/redesign/blue-teal-v1` by local commits. Working tree is clean.
- **Strict Push Rule:** **NEVER run `git push` without Magnus's explicit prior approval in the chat.**
- **Frontend App:** `client/` (React 18, Vite 4, TypeScript, Tailwind CSS 3).
  - Build command: `npm --prefix client run build` (verified: 0 errors, 0 warnings).
  - Dev server: `npm --prefix client run dev` (running on `http://localhost:5173/`).
  - **Scaffolding Warning:** Root-level `package.json`, `vite.config.ts`, and `index.html` are orphaned legacy scaffolding. Never run commands or install packages in the repo root; all frontend work lives in `client/`.
- **Backend App:** `server/` (Node Express + MySQL via `mysql2`).
  - **Ownership Boundary:** Owned exclusively by Johnny. **Do NOT touch or modify anything in `server/`.**
- **Overflow Standard:** Strict **0 px horizontal overflow** across 1440px desktop, 768px tablet, and 390px mobile viewports.

---

## 2. Hard CSS & Architectural Rules

1. **NEVER modify `client/src/css/index.css`:**
   - The pre-commit hook blocks every staged change, including additions, deletions, rewrites and cleanup attempts.
   - Existing pages may keep consuming it unchanged. New/redesigned pages use the exact owned island listed in `docs/CSS_OWNERSHIP.md`; do not assume every route has a colocated file.
2. **Typography System:**
   - Headings: **Archivo 800** (uppercase with `.title-accent` in `var(--redesign-accent)`).
   - Body & UI Controls: **Manrope** (400–500 body, 600–700 buttons/badges).
3. **Site-Wide Hero Rule:**
   - All page heroes share `min-height: clamp(640px, calc(100svh - 60px), 760px)`, `display: flex; align-items: center;`.
   - Text layout: `.container` set to full width `var(--redesign-hero-max)`, with an inner content wrapper (e.g. `.about-page__hero-content`, `.tyres-page__hero-content`) capped at `max-width: 680px` aligned to the left.
   - Backgrounds: set via `image-set()` with WebP primary and JPG fallback.
   - Darkening gradient: standard overlay on `::before` (`background: linear-gradient(90deg, rgba(5, 10, 11, 0.92) 0%, rgba(5, 10, 11, 0.80) 35%, rgba(5, 10, 11, 0.48) 65%, rgba(5, 10, 11, 0.20) 100%); opacity: 0.85; pointer-events: none; z-index: 1;`), with `.container` at `position: relative; z-index: 2;` for clickable controls.
4. **Asset Intake Convention:**
   - Incoming files arrive in `_incoming-assets/incoming/`.
   - Optimized production pairs live in `client/src/assets/images/<category>/` (< 120 KB WebP with JPG fallback).
   - Originals are archived into `_incoming-assets/` subfolders (`01_blue_tone_bakgrunder/`, `02_kundinteraktion/`, etc.).
   - `_incoming-assets/incoming/` MUST be left clean (only `.gitkeep`).

---

## 3. Work Completed in This Session (2026-09-16)

### 1. Däckservice Hero Background (`/dackservice`)
- Optimized production pair: `client/src/assets/images/services/tires/tires-hero-bg.{webp,jpg}` (48.7 KB WebP, 96.7 KB JPG fallback).
- Created colocated `DackservicePage.css` with `image-set()` and overlay gradient (`opacity: 0.85`).
- Fixed alignment: wrapped hero text in `.tyres-page__hero-content` (`max-width: 680px`) within full-width container (`max-width: var(--redesign-hero-max)`), ensuring exact left-alignment matching the other pages.
- Original archived to `_incoming-assets/01_blue_tone_bakgrunder/heros/HERO-BG_DACK.webp`.

### 2. AC-service Hero Background (`/ac-service`)
- Optimized production pair: `client/src/assets/images/services/ac/ac-hero-bg.{webp,jpg}` (55.7 KB WebP, 108.3 KB JPG fallback).
- Created colocated `AcServicePage.css` with `image-set()` and overlay gradient (`opacity: 0.85`).
- Removed old inline 4:3 `<img>` element from `AcServicePage.tsx` hero so the background renders cleanly.
- Original archived to `_incoming-assets/01_blue_tone_bakgrunder/heros/HERO-BG_AC.webp`.

### 3. Om oss Hero Background (`/om-oss`)
- Optimized production pair: `client/src/assets/images/about/about-hero-bg.{webp,jpg}` (55.0 KB WebP, 110.1 KB JPG fallback).
- Created colocated `AboutPage.css` with `image-set()` and overlay gradient (`opacity: 0.85`).
- Removed obsolete right-column card so the handshake and workshop visual render open and balanced.
- Original archived to `_incoming-assets/02_kundinteraktion/BG HERO OM OSS.webp`.

### 4. Bärgning Hero Background (`/bargning`)
- Optimized production pair: `client/src/assets/images/services/towing/towing-hero-bg.{webp,jpg}` (66.8 KB WebP, 109.4 KB JPG fallback).
- Created colocated `BargningPage.css` with `image-set()`.

---

## 4. Current Route Map & Key Pages

| Route | Page Component | Hero Background Status |
|---|---|---|
| `/` | `App.tsx` / `Hero.tsx` | Production `home-workshop-hero.{webp,jpg}` |
| `/om-oss` | `AboutPage.tsx` | **Dedicated** `about-hero-bg.{webp,jpg}` via `AboutPage.css` |
| `/ac-service` | `AcServicePage.tsx` | **Dedicated** `ac-hero-bg.{webp,jpg}` via `AcServicePage.css` |
| `/bargning` | `BargningPage.tsx` | **Dedicated** `towing-hero-bg.{webp,jpg}` via `BargningPage.css` |
| `/dackservice` | `DackservicePage.tsx` | **Dedicated** `tires-hero-bg.{webp,jpg}` via `DackservicePage.css` |
| `/galleri` | `GalleryPage.tsx` | Interactive workshop gallery with 11 reviewed photos |
| `/biltjanster` | `BiltjansterPage.tsx` | Service hub with linked cards to all 11 service guides |
| `/felsokning` | `FelsokningPage.tsx` | Real diagnostics photography & OBD code readout |
| `/bilar-till-salu` | `BilarTillSalu.tsx` | Vehicle gallery & inspection badges |
| `/kontakt` | `ContactPage.tsx` | Contact card, map directions, verified hours & request form |

---

## 5. Verification Checklist for Incoming Agent

Before making any changes or responding to the user:
1. `git status` — Ensure working directory is clean.
2. `npm --prefix client run build` — Verify TypeScript and asset pipeline build cleanly.
3. Check `AGENTS.md`, `docs/CSS_OWNERSHIP.md` and `docs/PROJECT_STATUS.md` for constraints and copy caveats.
4. Respect `.githooks/pre-commit`: never change `client/src/css/index.css`, and log new work in `docs/SESSION_LOG_CURRENT.md` rather than growing `AGENTS.md`.
5. Never run `git push` without explicit user permission.
