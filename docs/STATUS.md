# Status — Brynäs Bilservice

> **Replace, don't append.** This file is the current state and nothing else. Update the parts that changed at the end of a session; history goes in [`LOG.md`](LOG.md). If this file and the code disagree, the code is right — fix this file.

**Last updated:** 2026-09-24 (Claude Code — audits, Phases 1–6 of the optimization plan).

## Where things stand

- **Stage:** the rebuild and imagery are done (7 unique pages, the Bilservice and Guide families, shared tokens and patterns). Current work is **final polish and launch fixes**, following the optimization plan below.
- **Imagery:** every guide and service page has its slots filled with WebP+JPG pairs; per-page detail in [`IMAGES.md`](IMAGES.md). Optional hero swaps (Koppling, Stötdämpare) are listed there. Every production image is imported somewhere, except three kept on purpose: the black logo variant, `landing-why-reassurance-handshake-v2.jpg` and the Maher portrait. `images/workshop/` holds fixed exports for other pages; `assets/galleri/` drives `/galleri` only.
- **Heroes:** Landing, Om oss, Felsökning, Däckservice, AC-service, Bärgning and Kontakt share `--bb-hero-matched-height` (730px desktop, 701–778px tablet, 686px phones) and are equal from 360 to 1920px. On phones: no trust points (every page), a compact 94px review card, "Ring oss nu" on the hero phone buttons, and Kontakt's second hero paragraph is hidden. At 320px Om oss, Däckservice and Kontakt still come out taller.
- **Google reviews:** the hero-overlay card sits in the heroes of Landing, Om oss, Bilservice, Felsökning, Däckservice and Kontakt; AC-service shows the card lower on the page. Fixed height, so rotating reviews never resize a hero.
- **Routing:** every route is lazy, wrapped in `RouteErrorBoundary` (a reload prompt instead of a blank page when a chunk fails), with a `*` route to a 404 page. Internal links all use `<Link>`, so they work under the production basename; `internal-links.spec.ts` guards this.
- **Business facts:** org.nr, legal name and address come only from `client/src/data/business.ts` (org.nr 559343-5307, confirmed against the company registers); `business-facts.spec.ts` guards this. The footer menu is `publicNavigation`.
- **Contact forms** (Kontakt and the Landing card) open a pre-filled e-mail to info@brynasbilservice.se via `client/src/api/contact.ts` until a `/api/contact` endpoint exists.
- **Booking modal:** shows a notice with the phone number if services can't be loaded.
- **CSS and types:** every dark-surface eyebrow is white with an amber dash (guides and Biltjänster included), every H1 is mixed case, no unused selectors remain (except `.bb-footer__dot`, kept for the legal links), pages no longer re-import the global stylesheets, and TypeScript runs with `strict`.
- **Performance (lab, 2026-09-24, phone on slow 4G with 4× CPU, production build):** FCP about 2.3 s everywhere; guide LCP 3.5–3.9 s, set by the hero image arriving (47–81 KB WebP). The hero request starts about 2.2–2.3 s in whether or not the image has `loading="lazy"` (7 of 10 guides do): the page is rendered by JavaScript, so the image can't be requested before its code runs. Removing `lazy` would not help. CLS is 0 to 0.016 except Hjullagerbyte (see Next up).
- **Repo:** the app is `client/` (no root package); `_magnus/` is local only (git-ignored). Branch `redesign/blue-teal-v1`, remote `origin` = `FM-Magnus/brynasbilservice2`. Local commits ahead of `origin` are normal; push only on Magnus's go-ahead. Run `git status -sb` rather than trusting this line.
- **Checks (2026-09-24):** `check:css` clean (1 pending token: `--bb-font-sans`), typecheck (`strict`) and production build pass. Playwright: 200 passed, 10 skipped at 1440/768/390. `booking-form.spec.ts` is intermittently flaky (about 3 failures in 105 runs, one different test each time, predating today's changes).

## Next up — optimization plan (in this order unless Magnus says otherwise)

**Before anything else (open from 2026-09-24):**
- **Re-run the full suite.** The last full run (200 passed) was before `703c2cde` and `ebfdf9b8`. Those two are verified by other means: the built CSS is byte-identical, and typecheck passes with `strict`. The final run couldn't happen because the long-running dev server on :5173 broke ("Invalid hook call": two copies of React after Vite re-bundled its dependencies). Restart it with `npm --prefix client run dev -- --force`, then run `npm --prefix client run test:browser`.
- **Merge the booking-form flake fix.** A separate Claude session in worktree `.claude/worktrees/hopeful-ramanujan-df378a` (branch `claude/hopeful-ramanujan-df378a`, based on `b165217c`) has an uncommitted fix: `openClockOnFocus={false}` on the TimePicker in `BookingFormModalImpl.tsx`. It is not committed or merged yet. Take only that change into this branch, not its STATUS/LOG edits, and confirm with `--repeat-each=10` on `booking-form.spec.ts`.
- The three audits of 2026-09-24 (docs, structure, code) were reported in chat only. Their findings are in today's [`LOG.md`](LOG.md) entry and have been worked into this file.

Phases 1–6 are done (production fixes, facts and data, documentation, assets and repo hygiene, performance baseline, CSS consistency). Remaining:

1. **Phase 4 leftover — the inert deploy workflow** in `client/.github/workflows/` (GitHub never runs it from there): label or remove it — Johnny's call.
2. **Performance follow-up (from Phase 5):** Hjullagerbyte shifts its hero lead and buttons by CLS 0.12 on phones at about 2.9 s (Google's "good" limit is 0.1), most likely when the Google web font swaps in; the other guides stay at or below 0.016. The durable fix is self-hosting Archivo and Manrope with matched fallback metrics — a separate change.
3. **Phase 7 — structure (separate review).** A `useBookingModal` hook or page shell (booking wiring repeated in 18 pages), a shared guide layout, one contact form component, route lists in tests derived from `main.tsx`.
4. **Content gaps:** Bromssystem, Felsökning, Däckservice and Service-reparationer have no `.bb-tip`.
5. **Deferred idea:** the "Schomaher" mascot on `.bb-tip` — waiting for the mascot art and Maher's sign-off (plan in the 2026-09-22 entry of [`LOG.md`](LOG.md)).

## Broken or incomplete

1. **Admin auth is browser-only (P0 security).** `admin`/`admin123` is checked in the browser (now in a lazy chunk that loads only on `/admin`), and the server accepts the fixed token `admin-secret-token` from anyone ([`BACKEND.md`](BACKEND.md) §2.1). Johnny's.
2. **`comment_customer` isn't saved** by the server; vehicle inquiries depend on it ([`BACKEND.md`](BACKEND.md) §2.3). `comment_admin` can't be saved either.
3. **No privacy page.** The footer's Integritetspolicy and Cookies links were removed until one exists; the site collects booking data.
4. **No deploy automation**, and `server/.htaccess` vs `docs/ops/deployment.md` disagree on port/`RewriteBase` — Johnny's call. The server answers unknown addresses with status 200, so the 404 page is a "soft 404".
5. **`schema.sql` ≠ live database** — the live DB is the truth ([`BACKEND.md`](BACKEND.md)).
6. **Google reviews are hard-coded** (`defaultGoogleReviews` in `GoogleReviewsCard.tsx`) and will drift from the live profile.
7. **Footer Instagram button** points at instagram.com's front page — needs the workshop's account or removal.
8. **Not there yet:** ESLint config is broken; booking against a real API is unverified locally; two `console.log`s print bookings in `components/admin/BookingManagement.tsx`.
9. **Unconfirmed copy, flagged in code:** Felsökning "1–2 tim" (`DRAFT GUIDANCE`); AC-service frequency (`DRAFT GUIDANCE`) and refrigerant capability (`FACT TO CONFIRM`). Numeric claims on guide pages carry "branschmässigt riktvärde".

## Facts Magnus has confirmed

- The owner is **Maher**. Old customers call him "Shomaher" after his first workshop; reviews naming him are genuine.
- Google rating **4,3 from 50 reviews** is real data.
- Org.nr **559343-5307** (company registers). Opening hours, phone, address, org.nr: only in `client/src/data/business.ts` — never hard-code them. (hitta.se lists "Utmarksvägen 21" without the B; not yet checked with Magnus.)
- Public copy is Swedish and not final-approved; don't change it without asking.

## Open decisions and cautions

- **Waiting on Magnus:** the Instagram account.
- **Waiting on Johnny:** server-side admin auth, saving `comment_customer`, a `/api/contact` endpoint, the `.htaccess` conflict and the deploy method.
- **Research documents** (Magnus's Drive, `> RESEARCH OUTPUTS/BBilservice/`): an IA/trust spec written for Astro (its IA and trust chapters transfer, the tech doesn't) and a Gävle competitor analysis. Their facts about Brynäs are wrong in places (owner name, opening hours) — verify with Magnus before using any.
- **Paused design review** against that spec: the headline gap (company-presenting nav vs. symptom-based `/problem/*` entry points) is not addressed. The repeated 3-step "Så fungerar det" block is still an open observation.
- **Unused dependencies:** `classnames`, `@types/axios` (remove with approval).
