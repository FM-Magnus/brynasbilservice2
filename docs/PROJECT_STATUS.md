# Brynäs Bilservice — current project status

Updated 2026-09-14. The website is a work in progress; Magnus confirmed that **no page copy is final-approved yet**. Routes, page content and image use below were checked against `client/src/`; production behaviour was not checked. See [AGENTS.md](../AGENTS.md) for the session log and [AGENT_HANDOFF.md](AGENT_HANDOFF.md) for design history and preservation rules.

For the Antigravity 2 / Flash 3.8 migration, use the task-specific [Antigravity handoff](ANTIGRAVITY_HANDOFF.md) alongside the repository instructions.

## Purpose and stack

The repository contains Brynäs Bilservice's public website, booking and admin frontend, and an Express API. Magnus directs the product and frontend; Johnny owns the server, database and deployment decisions.

- Active frontend: `client/` — React 18, TypeScript, Vite 4, Tailwind CSS 3, React Router, Archivo/Manrope and shared teal CSS tokens. Build with `npm --prefix client run build`.
- Backend: `server/` — JavaScript, Express 4 and MySQL through `mysql2`. Production is documented as Node 16 on the VPS; its current behaviour was not checked for this dashboard.
- The root React/Vite configuration is orphaned scaffolding. Run and build the frontend from `client/`, not the repository root.

## Public pages and content work

Every route in this table exists in `client/src/main.tsx`. Text is present in the source, but **all page copy remains work in progress and unapproved**. “Local JPG” means an existing repository image is in use, not that it is the final approved export. `/admin` is a separate protected frontend route.

| Menu area | Route | Current purpose / progress | Copy | Image | Next content task |
| --- | --- | --- | --- | --- | --- |
| Start | `/` | Implemented landing page with hero, contact, process, about and service preview | WIP; not approved | Local hero/workshop JPGs | Confirm final copy and hero export |
| Om oss | `/om-oss` | Implemented workshop, facts, process and gallery page | WIP; not approved | Local workshop JPGs | Confirm copy and photo selection |
| Biltjänster → Våra tjänster | `/biltjanster` | Current default page with moved repair and diagnostics cards | WIP; not approved | Two local service JPGs | Develop this page and decide future service entries |
| Biltjänster → Bilservice | `/service-reparationer#bilservice` | Long-form Bilservice guide with service levels, process and pricing CTA | WIP; not approved | Marked hero image placeholder | Provide and approve a Bilservice hero image |
| Biltjänster → Oljebyte | `/oljebyte` | Expanded draft guide with customer-focused service content first; technical deep-dive sections grouped at the bottom under “Mer info” | WIP; not approved or technically fact-checked | Marked hero image placeholder | Fact-check the technical and service-specific claims with Magnus/workshop; provide and approve a hero image |
| Biltjänster → Kamrem | `/kamrem` | Expanded customer guide covering system parts, benefits, warning signs, service scope, draft guidance, safety note, shared process and FAQ | WIP; draft intervals and technical guidance are not fact-checked | Marked hero image placeholder | Fact-check draft intervals, component claims and timing with the workshop; provide a hero image |
| Biltjänster → Koppling | `/koppling` | Expanded customer guide covering what the clutch does, benefits, warning signs, service scope, draft guidance, shared process and FAQ | WIP; draft intervals, timing and technical guidance are not fact-checked | Marked hero image placeholder | Fact-check draft technical claims and timing with the workshop; provide a hero image |
| Biltjänster → Bromssystem | `/bromssystem` | Expanded customer guide covering system parts, benefits, warning signs, service scope, draft guidance, shared process and FAQ | WIP; draft technical guidance is not fact-checked | Marked hero image placeholder | Fact-check draft intervals, component claims and timing with the workshop; provide a hero image |
| Biltjänster → Bilbatteri | `/bilbatteri` | Expanded customer guide covering battery types (standard, EFB, AGM), benefits, warning signs, service scope, guidance, maintenance note, shared process and FAQ | WIP; draft intervals and technical guidance are not fact-checked | Marked hero image placeholder | Fact-check draft intervals and technical claims with the workshop; provide a hero image |
| Biltjänster → Stötdämpare och fjädrar | `/stodampare-fjadrar` | Expanded customer guide covering shock absorbers, springs, strut assemblies, benefits, warning signs, service checklist, guidance, broken spring safety note, shared process and FAQ | WIP; draft intervals and technical guidance are not fact-checked | Marked hero image placeholder | Fact-check draft intervals and technical claims with the workshop; provide a hero image |
| Biltjänster → Hjullagerbyte | `/hjullagerbyte` | Expanded customer guide covering wheel bearings, nav units, ABS sensors, benefits, warning signs, service checklist, guidance, safety note, shared process and FAQ | WIP; draft intervals and technical guidance are not fact-checked | Marked hero image placeholder | Fact-check draft intervals and technical claims with the workshop; provide a hero image |
| Biltjänster → Avgassystem | `/avgassystem` | Expanded customer guide covering exhaust components, silencers, catalytic converter, lambda sensors, benefits, warning signs, service checklist, guidance, safety note, shared process and FAQ | WIP; draft intervals and technical guidance are not fact-checked | Marked hero image placeholder | Fact-check draft intervals and technical claims with the workshop; provide a hero image |
| Biltjänster → Drivaxel och drivknutar | `/drivaxel-drivknutar` | Expanded customer guide covering driveshafts, CV joints, boots, benefits, warning signs, service checklist, guidance, safety note, shared process and FAQ | WIP; draft intervals and technical guidance are not fact-checked | Marked hero image placeholder | Fact-check draft intervals and technical claims with the workshop; provide a hero image |
| Biltjänster → Styrning och kulleder | `/styrning-kulleder` | Expanded customer guide covering ball joints, tie rods, power steering (hydraulic & EPS), benefits, warning signs, service checklist, guidance, safety note, shared process and FAQ | WIP; draft intervals and technical guidance are not fact-checked | Marked hero image placeholder | Fact-check draft intervals and technical claims with the workshop; provide a hero image |
| Additional service catalogue | `/tjanster` | Existing five-category catalogue, still linked from the landing page and Om oss | WIP; not approved | Five local service JPGs | Decide its long-term relationship to `/biltjanster` |
| Däck | `/dackservice` | Implemented tyre service with statutory winter tire dates (1 dec–31 mar, 1 okt–15 apr, 16 apr–30 sep, 3PMSF), enriched maintenance prose (legal depths 1.6/3mm, safety 3–5mm/4mm, DOT code 6–10y), removed Däckkollen card, 6 service cards & pricing intact | WIP; not approved | One local JPG reused as marked placeholder | Supply service-specific photos and confirm copy/prices |
| AC | `/ac-service` | Implemented AC-service page with 3 enriched symptom cards, hero compressor damage note ("why not to wait"), pricing frequency guidance (annual check vs biannual full service with DRAFT GUIDANCE caveat), 3 pricing cards & R134a/R1234yf note intact | WIP; not approved | Local service JPG | Confirm copy, equipment capabilities (R134a/R1234yf) and photo selection |
| Bärgning | `/bargning` | Implemented towing/transport page | WIP; not approved | Local service JPG | Confirm copy and photo selection |
| Till salu | `/bilar-till-salu` | Implemented vehicle listing and gallery | WIP; not approved | Three local vehicle JPGs | Confirm listing details and image selection before publication |
| Kontakt | `/kontakt` | Implemented contact details, hours and enquiry form | WIP; not approved | No page photo in component | Confirm copy and form handling with the relevant owner |

The desktop Biltjänster dropdown currently orders **Våra tjänster → `/biltjanster`**, **Bilservice → `/service-reparationer#bilservice`**, **Oljebyte → `/oljebyte`**, **Kamrem → `/kamrem`**, **Koppling → `/koppling`**, **Bromssystem → `/bromssystem`**, **Bilbatteri → `/bilbatteri`**, **Stötdämpare och fjädrar → `/stodampare-fjadrar`**, **Hjullagerbyte → `/hjullagerbyte`**, **Avgassystem → `/avgassystem`**, **Drivaxel och drivknutar → `/drivaxel-drivknutar`**, then **Styrning och kulleder → `/styrning-kulleder`**. Mobile Biltjänster links to `/biltjanster`. The old `/tjanster` route remains reachable from page CTAs; its future role has not been decided.

## Copy and image handoff

Pages may retain clearly labelled placeholders while final photography is prepared. For future exports, use a descriptive pair such as `page-purpose.webp` and `page-purpose.jpg`: WebP is the intended primary format and JPG the compatibility fallback. Current components mainly import JPG directly, so supplying pairs does not by itself activate fallback delivery. Match the actual placement and crop when each asset is integrated; this dashboard sets no universal pixel dimensions. Keep business claims and prices subject to Magnus's approval.

## People and agent roles

| Role | Responsibility for this project |
| --- | --- |
| Magnus | Product decisions, approved copy, visual direction and frontend approval |
| Johnny | Server, database, deployment and production infrastructure |
| Codex | Scoped implementation, source-grounded checks and documentation; Git changes only when expressly requested |
| Claude | Design/content review and planning when tasked, under the same repository boundaries |
| Antigravity | Bounded visual/content iteration with a precise scope, under the same repository boundaries |
| Every agent | Read [AGENTS.md](../AGENTS.md) and [AGENT_HANDOFF.md](AGENT_HANDOFF.md) before edits, preserve uncommitted work, and leave Johnny-owned files untouched without explicit authority |

## Open boundaries

- Automatic deployment is not active in the current repository layout: the workflow file is under `client/.github/workflows/`, not the repository's `.github/workflows/`. Deployment behaviour has not been verified. Magnus and Johnny must agree on a production plan before enabling it.
- `server/.htaccess` and `docs/deployment.md` disagree on the API port and `RewriteBase`. Johnny owns resolution; neither document alone proves the live server configuration.
- The documented database schema differs from the previously inspected live database; local booking submission and production routing remain unverified. `comment_customer` is sent by the client but absent from the server's booking INSERT. Johnny owns backend follow-up.
- `/tjanster` and `/biltjanster` are both defined frontend routes with different content. Magnus must decide whether both remain in the final information architecture.

## Working rhythm

Inspect the current branch, worktree and relevant source; make one bounded change; browser-check UI changes at useful widths; run the client build and `git diff --check` when code changes; update the relevant handoff note. Commit only on an explicit request. Push only on an explicit request after checking the exact branch, changes and destination. Ask Magnus about uncertain facts or approval states before recording them as decisions.
