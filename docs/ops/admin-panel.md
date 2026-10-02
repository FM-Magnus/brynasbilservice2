# Admin panel

The `/admin` route shows a login form until `GET /api/admin/me` confirms a server session. It then shows bookings and services. This branch replaces the old browser-only credentials and fixed bearer token; it is not deployed. Do not use the old demo credentials. Johnny creates accounts after reviewing and applying `server/database/migrations/001_admin_auth.sql` on an approved database.

`POST /api/admin/login` verifies a bcrypt password, rotates the session and returns a CSRF token. The browser keeps the token in memory and sends it on admin writes. The session ID is in an httpOnly, SameSite=Strict cookie, Secure in production. `POST /api/admin/logout` destroys the server session. Bookings can be listed, filtered, status-updated and soft-deleted; services can be listed and edited. Customer data is visible only through the protected admin API.

Johnny's account, cookie/proxy, migration, smoke-test and rollback checklist is in [backend-owner-review.md](backend-owner-review.md). The implemented endpoint contract is in [BACKEND.md](../BACKEND.md).
