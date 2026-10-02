# Owner-review backend handoff — 2026-10-02

**Reviewer:** Johnny. **State:** implemented on `codex/repo-audit-2026-10-02`, uncommitted and not deployed. This is for a controlled review on `labb.fenrirmedia.se/brynasbilservice/`, pending the gates below.

## Request path

Browser → same-origin `/brynasbilservice/api/*` proxy → Express → MySQL for bookings/admin sessions; Express → Gmail SMTP for contact messages. In development Vite proxies `/api` to `127.0.0.1:3000`. The frontend build keeps the production base path `/brynasbilservice/`.

## Endpoint contract

| Method/path | Access | Result |
|---|---|---|
| `GET /api/health` | Public | `200 {"status":"ready"}` after `SELECT 1`; `500` otherwise. |
| `GET /api/public/actions` | Public | `200 {"version":1,"actions":{...}}`, no cache. |
| `GET /api/services` | Public | Existing service list. |
| `GET /api/available-dates` | Public | Existing date list. |
| `POST /api/contact` | Public, 5/15 min/IP | `202 {"status":"accepted"}` only after SMTP accepts the configured recipient; `422` field errors, `429` limit, `503` mail unavailable. |
| `POST /api/bookings` | Public, 10/15 min/IP | `201 {"status":"pending","bookingId":42}` after customer+booking transaction commits; never means appointment confirmed. |
| `POST /api/admin/login` | Public, 5/15 min/IP | Session cookie and JSON `username`, `displayName`, `csrfToken`; invalid credentials `401`. |
| `GET /api/admin/me` | Session | Current admin and CSRF token; `401` if signed out. |
| `POST /api/admin/logout` | Session + CSRF | `204`, destroys server session. |
| `GET/PUT/DELETE /api/admin/bookings` | Session; CSRF on writes | List/update/soft delete. Booking detail route is `:id` for writes. |
| `GET/POST/PUT/DELETE /api/admin/services` | Session; CSRF on writes | Existing service management (`:id` for writes). |
| `GET /api/admin/customers` | Session | Existing customer list. |

Example contact request: `{"name":"Anna","email":"anna@example.test","phone":"0700000000","subject":"Övrigt","message":"Test"}`. Example booking request: `{"customerName":"Anna","customerEmail":"anna@example.test","customerPhone":"0700000000","serviceId":3,"date":"2026-10-20","time":"09:30","comment_customer":"Gäller bil X"}`. Errors have `{"error":{"code":"VALIDATION_FAILED","message":"Check the form fields","fields":{"email":"Enter a valid email address"}}}`. Body cap is 16 KiB; form data is not logged.

## CTA policy

Edit `server/config/public-actions.json`, validate with `node -e "console.log(require('./lib/publicActions').readPublicActions())"` from `server/`, then reload the page. The server reads and validates the file on every `/api/public/actions` request; no Express restart is needed for this file. Keys are stable intents `book`, `contact`, `call`, `email`, `directions`; values are those same five kinds. For example, changing `"book":"book"` to `"book":"call"` routes booking buttons to a native `tel:` link and labels them “Ring oss” throughout the site. Changing `"contact":"contact"` to `"contact":"call"` replaces both form submit buttons with call links; the entered form is not sent. The browser supplies the phone/email/map targets from `client/src/data/business.ts`; the server cannot inject a URL or silently change displayed business facts. The config request is once per page load. If unavailable, the client uses its built-in intent defaults; booking/contact still need their APIs to succeed before showing success. Reload after an edit. Vehicle-inquiry context is included when a booking intent changes to contact/email; a native call has no way to transmit text.

## Config and migration

`server/env.example` lists names only: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `PORT`, `NODE_ENV`, `SESSION_SECRET` (32+ characters), `PUBLIC_ORIGIN`, `SESSION_COOKIE_PATH`, optional `TRUST_PROXY_HOPS`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `CONTACT_TO`, optional `PUBLIC_ACTIONS_FILE`. For the proposed Gmail SMTP path use `smtp.gmail.com:465`; set `CONTACT_TO` to `brynasbilservice@gmail.com`. Johnny must supply the Gmail account and approved sender privately. No password belongs in Git or chat. A separate review/test mailbox is still to be chosen before live-delivery proof.

1. Inspect the **live table structure only**, never copy customer rows. Compare `customers`, `services`, `bookings` to the queries in `server/app.js`, especially `bookings.service`, `time`, `comment_customer`, `available` and the `status` enum. The checked-in `schema.sql` is known to differ from live.
2. Back up the schema, review `server/database/migrations/001_admin_auth.sql`, apply only its two additive tables (`admin_users`, `admin_sessions`) on a disposable DB first, then on the approved review DB.
3. Create an admin user with `npm run create-admin` on the controlled server terminal (private DB env already configured). The script prompts for a password; it does not print a hash. Test login, `/me`, CSRF rejection, logout.
4. Rollback: stop the new app/revert client build and server code; preserve existing bookings and customer data. Drop the two new tables only if Johnny confirms no review sessions/accounts need retention. Do not reverse the booking `comment_customer` data insertion by deleting rows.

## Review deployment and smoke checks

The documented CentOS 7/Node 16 host cannot run this maintained Node 22+ dependency set. Johnny must confirm a supported runtime and reconcile the live proxy port/path before deploying. Build the client off-server (`npm --prefix client run build`). Set `PUBLIC_ORIGIN` to the exact HTTPS origin, `SESSION_COOKIE_PATH=/brynasbilservice`, and `TRUST_PROXY_HOPS` only after checking the reverse-proxy chain. Never copy the example env over a live `.env`.

On the review URL, check `/api/health`, `/api/public/actions`, Kontakt and Landing submissions into the **test** mailbox (including SMTP rejection), booking submission with a fake person and vehicle comment, admin listing/status update/logout, 401 without session, CSRF rejection, and 1440/768/390 layouts. Check the browser Network tab: contact `202` means SMTP acceptance, booking `201` means a saved pending request. Confirm real Gmail delivery separately; an SMTP accept is not a guarantee of inbox placement. Check server logs for mail/DB error codes; they must not contain request bodies or customer details. Do not use real customer data in tests.

## Review checklist and open decisions

- `server/index.js`, `server/app.js`, `server/lib/*`: pool, validation, transaction, Gmail transport, rate limits, session/CSRF and proxy assumptions.
- `server/database/migrations/001_admin_auth.sql`, `server/scripts/create-admin.js`: live schema compatibility and account lifecycle.
- `server/config/public-actions.json`, `client/src/api/publicActions.ts`, `client/src/components/ui/PublicAction.tsx`: policy behavior, safe targets and fallback.
- `client/src/api/contact.ts`, `client/src/hooks/useContactForm.ts`, Kontakt/Landing forms, booking modal, admin client: truthful status and request payloads.
- Tests: 8 backend tests pass, including a real local SMTP capture/rejection path; browser tests cover contact and policy. MySQL persistence is tested with a SQL fixture, **not a disposable database**. The review server and real Gmail inbox are **not yet verified**.
- Dependency audit: no production advisories; one high-severity development-only `brace-expansion` advisory remains for routine dependency review.

Decisions before public collection: supported server runtime and proxy, verified Gmail sender and review mailbox, privacy notice, retention/deletion process for contact and booking data, and Johnny's approval of schema/deployment. No production readiness claim is made by this branch.
