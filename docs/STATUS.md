# Status — Brynäs Bilservice

> **Replace, don't append.** This file is the current state and nothing else. Update the parts that changed at the end of a session; history goes in [`LOG.md`](LOG.md). If this file and the code disagree, the code is right — fix this file.

**Last updated:** 2026-09-24 (Codex — Antigravity handover).

## Where things stand

- **Google reviews (2026-09-24):** the shared hero-overlay card appears inside the heroes on `/om-oss`, `/service-reparationer`, `/felsokning`, `/dackservice`, and `/kontakt`, as on Landing. The lower-page placements were removed. Page-owned CSS keeps review text readable against the dark overlay. The image Magnus sent was a crop of Däckservice's existing hero, not a new asset to integrate.

- **Felsökning hero (2026-09-24):** removed the decorative P0128/P0171 code panel, leaving the photo and trust row visible. CSS check, typecheck, build, focused visual/hero tests and route baselines pass at 1440/768/390.

- **Design direction (2026-09-24):** public cards, menus and controls use slightly rounded, almost square corners through the canonical radius tokens. Circular icon and status shapes remain round. All style baselines pass.
- **Landing reviews (2026-09-24):** the hero review bar has room for its rating, Google subtitle and review text; it sits slightly higher and is taller. Landing visual and hero checks pass at 1440/768/390 with no horizontal overflow.

- **Stage:** the rebuild is finished (7 unique pages, the Bilservice and Guide families, shared tokens and patterns). Day-to-day work is **adding imagery page by page** — see [`IMAGES.md`](IMAGES.md) for the per-page slot table and the workflow.
- **Imagery progress (2026-09-23):** all ten guide pages have their image slots filled with WebP+JPG pairs. `/service-reparationer` has a photo hero, servicebook photo and four value-card photos; all 11 `/biltjanster` guide cards have photos. `/felsokning` now uses new hero, engine-bay diagnostic and OBD-detail images. Conditional car-listing placeholders remain tied to vehicles without real photos. Optional hero swaps for Koppling and Stötdämpare are listed in [`IMAGES.md`](IMAGES.md).
- **Repo:** `/Users/magnusolsson/repos/brynasbilservice_repo`, branch `redesign/blue-teal-v1`, remote `origin` = `FM-Magnus/brynasbilservice2`. Local commits ahead of `origin` are normal; push only on Magnus's go-ahead. Run `git status -sb` rather than trusting this line.
- **Current checks (2026-09-24):** `check:css` clean (90 tokens, 1 pending: `--bb-font-sans`), typecheck and production build pass. The full Playwright suite passes: 170 passed, 4 skipped at 1440/768/390. Five stale desktop text baselines from earlier work were reviewed and refreshed. One mobile booking-time test returned `03:00` instead of `09:30` on the first full run; three focused repeats and the full rerun passed. If it recurs, inspect `booking-form.spec.ts` time-picker input timing.
- **Recent verification:** the header shows desktop navigation through 1001px with no horizontal overflow at checked widths. The six hero review placements were browser-checked at 1440/768/390. `test-results/` is generated output and is not committed.
- **Recent shared changes:** compact desktop navigation through 1001px; mobile menu at 1000px and below (2026-09-23). Full-bleed guide hero, canonical `.bb-tip` and symptom-row gradient tokens (2026-09-22). Details: [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) §1, §2a, §2c.

## Next up (in this order unless Magnus says otherwise)

1. **Antigravity handover:** continue with Magnus's next small layout or imagery instruction. Start from `AGENTS.md`, this file, `CSS_OWNERSHIP.md` and, for image work, [`IMAGES.md`](IMAGES.md). The known empty service and guide slots are filled; optional hero swaps are listed in `IMAGES.md`. Measure and review one page at a time at 1440/768/390. Keep existing booking, contact and review behavior intact. No push is authorized.
2. **Content gaps found 2026-09-22:** Bromssystem has no `.bb-tip`; Felsökning, Däckservice and Service-reparationer have none either (the component is ready).
3. **Hero height outliers** — measured before the full-bleed change; re-measure with `docs/audit-harness/hero/` before deciding anything ([`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) §2c).
4. **Audit points not started:** 16 distinct media-query values (near-duplicates 640/650, 1100/1120, 1320/1321); remaining hard-coded hex in the Bilservice family, footer and `ContactFormCard.css`; no error-state token.
5. **Contact form sends nothing** (see "Broken" below) — needs a Magnus decision.
6. **Admin auth, client half** — build against [`BACKEND.md`](BACKEND.md) §2.1; don't deploy before the server side exists.
7. **Deferred idea:** the "Schomaher" mascot on `.bb-tip` ("TIPS FRÅN SCHOMAHER") — waiting for the mascot art and Maher's sign-off. Plan in the 2026-09-22 entry of [`LOG.md`](LOG.md).

## Broken or incomplete

1. **Admin auth is browser-only (P0 security).** `admin`/`admin123` ships in the public bundle and the server accepts the fixed token `admin-secret-token` from anyone. Fix before any upload feature ships ([`BACKEND.md`](BACKEND.md) §2.1).
2. **`comment_customer` isn't saved** by the server; vehicle inquiries depend on it ([`BACKEND.md`](BACKEND.md) §2.3). `comment_admin` is shown in the admin modal but can't be saved.
3. **Contact form sends nothing** — `ContactFormCard.tsx` shows "Tack" without a request; there is no `/api/contact`. It must not claim success once real traffic arrives.
4. **No deploy automation** (deliberately), and `server/.htaccess` vs `docs/ops/deployment.md` disagree on port/`RewriteBase` — Johnny's call ([`BACKEND.md`](BACKEND.md), "Production").
5. **`schema.sql` ≠ live database** — the live DB is the truth ([`BACKEND.md`](BACKEND.md)).
6. **Google reviews are hard-coded** (`defaultGoogleReviews` in `GoogleReviewsCard.tsx`) and will drift from the live profile.
7. **Not there yet:** no 404 route, no error boundary, ESLint config is broken, booking against a real API is unverified locally.
8. **Unconfirmed copy, flagged in code:** Felsökning "1–2 tim" (`DRAFT GUIDANCE`); AC-service frequency (`DRAFT GUIDANCE`) and refrigerant capability (`FACT TO CONFIRM`). Numeric claims on guide pages carry "branschmässigt riktvärde".

## Facts Magnus has confirmed

- The owner is **Maher**. Old customers call him "Shomaher" after his first workshop; reviews naming him are genuine.
- Google rating **4,3 from 50 reviews** is real data.
- Opening hours, phone, address, org.nr: only in `client/src/data/business.ts` — never hard-code them.
- Public copy is Swedish and not final-approved; don't change it without asking.

## Open decisions and cautions

- **Unresolved:** Magnus has not approved the proposed Gemini/Antigravity-specific scope addition to `AGENTS.md`; the current `AGENTS.md` remains the contract. Local commits are ahead of `origin/redesign/blue-teal-v1`; no push has been requested.

- **Research documents** (Magnus's Drive, `> RESEARCH OUTPUTS/BBilservice/`): an IA/trust spec written for Astro (its IA and trust chapters transfer, the tech doesn't) and a Gävle competitor analysis. Their facts about Brynäs are wrong in places (owner name, opening hours) — verify with Magnus before using any.
- **Paused design review** against that spec: the headline gap (company-presenting nav vs. symptom-based `/problem/*` entry points) is not addressed. The repeated 3-step "Så fungerar det" block is still an open observation. Next suggestion not presented yet.
- **Hygiene backlog (needs Magnus first):** the 2.1 MB unused `client/src/assets/images/archive/home-heros/`; root `*.disabled` files and orphan root `package-lock.json`; unused deps `classnames`, `@types/axios`; two `console.log`s printing bookings in `components/admin/BookingManagement.tsx`; ~18 exports unused outside their file; page boilerplate (`isModalOpen` in 18 pages).
