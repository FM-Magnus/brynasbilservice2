# Brynäs Bilservice redesign handoff

## Start here (updated 2026-09-20, end of a long session)

- **Repo / branch:** `/Users/magnusolsson/repos/brynasbilservice2`, branch `redesign/blue-teal-v1` (remote `origin` = `FM-Magnus/brynasbilservice2`). **Nothing from 2026-09-20 is pushed**: about 26 commits are ahead of origin (`git rev-list --count origin/redesign/blue-teal-v1..HEAD`). Never push without Magnus's explicit go-ahead.
- **State of the checks at the last commit:** `typecheck` 0 errors, `check:css` clean (86 tokens, 1 pending), `build` ok, Playwright **155 passed / 4 skipped** (`npm --prefix client run test:browser`). If the machine is loaded, use `--workers=3`.
- **Commands:** `npm --prefix client run dev | typecheck | check:css | build | test:browser`. The dev server normally already runs on :5173.
- **Guards that will stop a bad commit:** the pre-commit hook runs `check:css`, which now fails on (1) an unresolved `var(--bb-*)`, (2) the deleted legacy layer (`--redesign-*`, `index.css`), (3) inline `style=` in public TSX; the hook also blocks Tailwind utilities in public TSX and any growth of `AGENTS.md`. `tests/browser/hero.spec.ts` guards hero/header clearance. Do not bypass the hook.
- **How Magnus wants to work (learned this session):** ask when anything is ambiguous, do not guess; **measure first, propose at a gate, then implement**; never change Swedish copy, tokens or shared CSS without approval; show every visible change (before/after images) before committing; one logical change per commit; report honestly, including costs and where an earlier claim of yours turned out wrong. He is protective of the repo's externally rated canonical CSS/token structure and fears bloat and “AI slop”.
- **Proving a change:** `docs/audit-harness/` has the read-only scripts (hero heights, all-element before/after invariants, icon pixel diffs, CSS-winner audit) and a list of measurement traps. Read its README before measuring anything.
- **Read next:** [`AGENTS.md`](../AGENTS.md) (contract), [`CSS_OWNERSHIP.md`](CSS_OWNERSHIP.md) (route → CSS owner map, write rules), [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) (tokens, patterns, §2b icons, §2c hero geometry), [`SESSION_LOG_CURRENT.md`](SESSION_LOG_CURRENT.md) (newest entries first), [`BACKEND_HANDOFF.md`](BACKEND_HANDOFF.md).

## What the 2026-09-20 session finished (all committed)

- **Booking form:** lifecycle (`hooks/useFormSubmission.ts`: in-flight lock, timeout, inline success/error, no `alert()`), local `yyyy-MM-dd` date (a UTC timestamp was storing Swedish bookings a day early), typed payload, `tests/browser/booking-form.spec.ts`. Server side still to do: `BACKEND_HANDOFF.md` §2.3.
- **Icons (audit point 1):** 29 shared icons, all stroke 2; local duplicates removed (phone, pin, arrow, check, mail, send, calendar, wrench, monitor). Still local by decision: header icons (CSS-owned), Landing chat/shield/clock/car, ContactPage chevron, one-offs in Bärgning (4) and Om oss (6). Rules: `DESIGN_SYSTEM.md` §2b.
- **Inline styles (audit point 2):** all 27 moved into `ServiceReparationerPage.css` (family owner), proved pixel-identical; guard added to `check:css`. Near-duplicate values kept on purpose: `--pad` 64 vs `--pad-lg` 72px, `--wide` 78 vs `--wide-sm` 75ch, `--intro` 0.5 vs `--intro-tight` 0.4rem (a design decision for Magnus).
- **Hero (audit point 4), steps 1–2 of 3:** header-derived clearance, smaller H1 (max 48px), tighter gaps. Status per page in `DESIGN_SYSTEM.md` §2c.

## Where to pick up (in this order unless Magnus says otherwise)

1. **Hero step 3, the compact trust row in the guides** (`.service-guide__trust-row`: 148px stack, items `max-width: 220px`, three to six items). Approved as a lever but postponed. Without it most guides stay at 96–105% of a 1280×720 screen; the agreed target for the Standard hero type is about 85%. Show before/after images before committing. Then re-run `docs/audit-harness/hero/` and update §2c. Known outliers: AC-service (CTA row and lead wrap; 125%) and the image-driven heroes (Kamrem, Om oss, Bilar till salu) whose height comes from the image or side column, not the text. Mobile hero tokens are unchanged. The phone-button label has six copy variants (a copy decision for Magnus).
2. **Audit points not started:** (3) 16 distinct media-query values, including near-duplicates 640/650, 1100/1120, 1320/1321 (the header changes size at 1321px); (5) hard-coded hex colours (about 25 in each family parent, 30 in the footer, 26 in `ContactFormCard.css`), audit which are legitimate one-offs; (6) there is no error-state token (the booking modal uses literal colours).
3. **Contact form sends nothing** (`ContactFormCard.tsx` shows “Tack” with no request; no `/api/contact`). Plan: an `api/contact.ts` adapter following the `VITE_*_SOURCE` pattern, a proposed contract in `BACKEND_HANDOFF.md`, and an honest fallback (phone and e-mail) until the endpoint exists. Reuses `useFormSubmission`. Needs Magnus's decision.
4. **Admin auth, client half** (P0, blocked on the backend for go-live): `api/adminClient.ts` (cookie-based, central 401 handling), an admin session hook, `AdminLogin.tsx`, the admin route lazy-loaded so credentials leave the entry chunk, no `localStorage` token. Build against `BACKEND_HANDOFF.md` §2.1; do not deploy before the server side exists. Also open: a 404 route and error boundary; ESLint config is broken.
5. **Images:** `_incoming-assets/` is empty. A page-by-page read-and-assess pass (one page card per page: purpose, copy check, slot inventory with aspect ratios, findings) followed by one deduplicated shot list for Magnus was proposed but not started. Proposed source-file naming: `<route-slug>__<role>__<motiv>__<orientering>__vNN.<ext>` (role: hero, intro, detail, card, process or any; orientation: landskap, portratt, kvadrat), optional flat `MANIFEST.csv` with a one-line description and yes/no columns for people and number plates. Names do not prove content; look at every image.
6. **Small leftovers:** round caps on the 22 shared icons that use butt caps; shared equivalents for Landing's four local icons; the six-way phone-label copy variants.
7. **Push:** ask Magnus.

## Traps that already cost time

- Measure with transitions disabled and lazy images forced to load (`docs/audit-harness/README.md`).
- Reading the CSS is not evidence. Twice this session a conclusion from reading CSS was wrong once measured (a single token would not shrink the heroes; “no size prop” was not universal across icons).
- Moving styles into a class can lose to specificity or to a later media rule; mutation-check it.
- Snapshots in `tests/browser/baseline-snapshots/` are computed-style fingerprints; a hero H1 change legitimately updates them, but read the diff first.

## The rebuild is finished (2026-09-19)

All 7 roadmap steps are done and the plan is archived at [`archive/HITL_Temporary_roadmap.md`](archive/HITL_Temporary_roadmap.md) — history, not instructions.

- **Legacy `client/src/css/index.css` is deleted.** Global CSS is exactly four files loaded in `client/src/main.tsx`, in order: `styles/tailwind.css`, `styles/design-tokens.css`, `styles/base.css`, `styles/shared-elements.css`. Do not add a fifth without Magnus's approval, and never reintroduce `--redesign-*` or legacy class systems. Global CSS went from 287.8 KB to 100.0 KB (44.2 → 17.7 KB gzip).
- **7 unique pages**, one CSS island each: Startsidan (`.landing-v2__*`), Om oss (`.omoss-page__*`), Kontakt (`.kontakt-page__*`), Bärgning (`.bargning-page__*`), Biltjänster (`.biltjanster-hub__*`), Bilar till salu (`.bilartillsalu-page__*`), Galleri (`.galleri-page__*`).
- **2 families:** Bilservice (`ServiceReparationerPage.css`, `.bilservice__*`) with Bilservice/Felsökning/Däckservice/AC-service; Guide (`styles/ServiceGuideTemplate.css`, `.service-guide__*`) with all 10 technical guides.
- **Shared components, each with its own stylesheet:** `PublicHeader`, `PublicFooter`, `BookingForm` (`.modal-*`), `BiltjansterFaq` (`.bb-faq__*`), `GalleryTeaserCard`, `GoogleReviewsCard`, `ContactFormCard`.
- **`/tjanster` is a redirect** to `/biltjanster`; the legacy `Header`/`Footer`, `ServicesPage` and `GoogleReviews.tsx` are gone.
- **Tailwind** is allowed only under `/admin`; the pre-commit hook blocks utilities in public TSX.

## Content Magnus edits without a developer

- **Cars:** `client/src/data/vehicles.ts` (add an entry, or `status: 'sold'`). The page reads it through `api/vehicles.ts`; `VITE_VEHICLES_SOURCE=api` switches to the future backend.
- **Gallery:** drop or delete an image in `client/src/assets/galleri/`; captions in `bildtexter.json`; Swedish instructions in `LÄSMIG.md` there. `VITE_GALLERY_SOURCE=api` switches to the future backend.
- **Business facts:** phone, e-mail, address, Google Maps link, opening hours, legal name and org.nr all live in `client/src/data/business.ts`. Change a value there and it updates everywhere, including the Playwright assertions.
- All of these need a build and deploy to reach the live site.

## Longer-term stages (unchanged in intent)

1. **Asset and media tranche:** replace the remaining placeholder slots (19 `MediaPlaceholder` across seven guides, six `ImageSlot` on `/service-reparationer`) with optimized WebP/JPG `<picture>` elements; see “Images” above.
2. **Backend wiring and handoff:** Johnny executes `docs/BACKEND_HANDOFF.md` (session auth, `comment_customer`, vehicle CRUD and uploads). The frontend halves are described above.

## Other open follow-ups

1. **P0 security:** admin auth is client-side only; credentials ship in the public bundle and the server accepts a fixed token. `admin123` is in pushed git history and must be rotated. Plan: `BACKEND_HANDOFF.md` §2.1. Johnny owns `server/`.
2. **Font-swap layout shift** site-wide: add a metric-matched fallback `@font-face`, then move `styles/base.css` onto `--bb-font-*` (it deliberately uses the legacy stacks today). This is also what blocks resolving `--bb-font-sans`.
3. `GalleryTeaserCard` still has its own six-image list; it could read `assets/galleri/` instead.
4. Om oss gallery links could deep-link as `/galleri?bild={slug}`.
5. Footer Instagram icon points at `instagram.com`, not the workshop profile; Magnus must supply the URL or drop the icon.
6. Server side (Johnny): `comment_customer` not saved, `schema.sql` out of sync, `.htaccess` port/RewriteBase mismatch.

## Authority and references

Apply sources in this order when they conflict:

1. Magnus's current explicit instruction and approval.
2. The seven locked Brynäs design mockups and supplied Brynäs assets.
3. The approved implementation on this branch and its Phase 0/1A/1B records.
4. `AGENTS.md` for repository, ownership, production and API constraints.
5. `REDESIGN_HANDOVER.md` for planning context; where it conflicts with the seven locked mockups, all seven mockups are authoritative.
6. The Vår Verkstad reference only for general inspiration. Do not copy its layout, content, assets, dimensions, colours, claims or interaction rules into Brynäs.
7. Any remaining assumption must be identified and confirmed before implementation.

Locked mockups (all are required references):

- `/Users/magnusolsson/AI Work Projects 2026/MOCKUPS FÖR BBIL/LOCKED DESIGN/exec-6d85f013-3d20-4b66-8884-5c004604cd82.png` — header, hero, reviews and early contact.
- `/Users/magnusolsson/AI Work Projects 2026/MOCKUPS FÖR BBIL/LOCKED DESIGN/exec-12fdaa72-b86a-42dd-ab98-e38cb51424c0.png` — FAQ and footer.
- `/Users/magnusolsson/AI Work Projects 2026/MOCKUPS FÖR BBIL/LOCKED DESIGN/exec-19b06bc4-5b0d-40fb-9a92-1684d59b7113.png` — find-us, map and opening hours.
- `/Users/magnusolsson/AI Work Projects 2026/MOCKUPS FÖR BBIL/LOCKED DESIGN/exec-79ece2de-7cdd-47ff-8914-7f7a35c746e7.png` — photographic booking CTA.
- `/Users/magnusolsson/AI Work Projects 2026/MOCKUPS FÖR BBIL/LOCKED DESIGN/exec-94663624-5a72-450f-bcd6-e8cb7ae8aa0d.png` — featured vehicle.
- `/Users/magnusolsson/AI Work Projects 2026/MOCKUPS FÖR BBIL/LOCKED DESIGN/exec-a992d87a-db25-475d-afb6-0a1e5e9c9160.png` — services, process and reassurance row.
- `/Users/magnusolsson/AI Work Projects 2026/MOCKUPS FÖR BBIL/LOCKED DESIGN/exec-afb1248b-8fde-4274-97ff-554108c67955.png` — About section.

The planning handover is `/Users/magnusolsson/AI Work Projects 2026/MOCKUPS FÖR BBIL/REDESIGN_HANDOVER.md`. The Vår Verkstad reference is `/Users/magnusolsson/Documents/varverkstad-2026-09-09`. Neither its files nor the locked mockups may be copied into this repository. A cloud-based agent must receive them as attachments because these local paths will not exist in its environment.

> **Checked 2026-09-20: none of these three paths exist on this machine.** `~/AI Work Projects 2026/` is absent entirely (so all seven locked mockups and `REDESIGN_HANDOVER.md` are unreachable), and no `varverkstad-2026-09-09` directory exists anywhere under `~`. Until Magnus restores them, authority level 2 cannot be consulted and **the current rendering of the branch is the only usable visual authority** (level 3). An agent asked not to change approved appearance should verify that by diffing the rendered output before and after its change, not by comparing against a mockup it cannot open.


## Approved visual direction

Use a warm-white page surround, dark photographic cards, rounded corners, strong open sans-serif headlines, and a restrained turquoise/blue accent family. Preserve the Brynäs character; do not substitute Vår Verkstad's electric blue or reproduce that product. The supplied hero photo is already in `client/src/assets/images/background_hero.jpg` and is connected. The hero marquee is intentionally removed.

## Completed work

Phases 0 through 4 (baseline capture → header/hero/reviews → booking modal → About section → Services/ServiceList/WhyUs/EV → the full Biltjänster guide set) are done and approved. Session-by-session records live in [`SESSION_LOG_CURRENT.md`](SESSION_LOG_CURRENT.md) and [`SESSION_LOG_ARCHIVE.md`](SESSION_LOG_ARCHIVE.md); `AGENTS.md` is now a bounded startup contract and its embedded legacy log is frozen. `docs/redesign-phase-0/README.md` still holds the original Phase 0 mockup-to-component mapping.

## Architecture and preservation rules

- The frontend lives in `client/`; use `cd client && npm run build`. Do not use or edit the root Vite/React scaffolding.
- The legacy `client/src/css/index.css` was deleted (2026-09-19). Global CSS is the four files in `client/src/styles/`; every page and shared component owns its island. See [`CSS_OWNERSHIP.md`](CSS_OWNERSHIP.md) before any CSS work.
- `client/src/main.tsx` provides routing and `LanguageProvider`, and loads the four global stylesheets. Every public route is lazy-loaded; `/tjanster` redirects to `/biltjanster`; `/admin` is protected. Production uses the `/brynasbilservice` basename, which remains unverified.
- `Biltjänster` is the shared header dropdown. Its default route is `/biltjanster` (`Våra tjänster`), followed by `/service-reparationer#bilservice` (`Bilservice`) and the current service-guide destinations. The default route is now a linked service-guide hub; Bilservice owns the long-form service guide and its closing vehicle/reassurance blocks. The standalone `Felsökning` link follows Biltjänster in the main navigation. Keep future Biltjänster entries simple and add them only after an explicit route/content decision.
- `client/src/App.tsx` mounts `client/src/pages/landing/LandingPage.tsx` for the start route. `LandingPage` owns the isolated page composition and its local booking-modal state: floating header → sunset hero with rotating Google review link → contact/form → reassurance → services → five-step process → gallery/about → used-car CTA → closing contact → footer. It does not use the former home-section composition; preserve the current public functionality and order unless a later approved phase says otherwise.
- Reuse existing Brynäs content, images, telephone/email/address, service data, booking callbacks and real vehicle data. Do not replace business facts with mockup text or invent routes, maps, FAQ answers, form recipients or dummy flows.
- Do not change `server/index.js`, `server/database/schema.sql`, `server/.htaccess`, `server/.env`, deployment files, or root project configs. Johnny owns backend/server decisions.

## Known limitations and unverified items

- Google review data is real Brynäs Bilservice data confirmed by Magnus (4,3 / 50 recensioner and the linked Google Maps profile), but it is hardcoded and can become stale over time.
- The booking client is correct against its documented contract but has only been tested against Playwright route doubles, never a real backend. `comment_customer` is not saved by the server; do not change payloads/endpoints without backend approval.
- Backend/database behaviour, production deployment, production basename navigation, external business facts and opening hours remain unverified.
- Deployment automation is intentionally absent from canonical history. `.htaccess` and deployment documentation disagree; do not resolve this without Magnus and Johnny.


## Startup checklist

1. Read this file and `AGENTS.md`; then `docs/CSS_OWNERSHIP.md` before any CSS work.
2. Record the actual worktree state (`git status -sb`) — do not assume it is clean or synced, and never push without Magnus's explicit approval.
3. For a page change, edit only that route's island plus its TSX; state the allowed write paths first (task contract in `CSS_OWNERSHIP.md`).
4. Preserve business data: prices, opening hours, phone, address, review figures and vehicle facts come from Magnus, never from a model's guess.
5. Verify with Playwright at 1440, 768 and 390 px (zero horizontal overflow), plus `npm --prefix client run typecheck` and `build`.
6. Write a dated entry in `docs/SESSION_LOG_CURRENT.md`. Commit when the work is verified; never push without explicit approval.
