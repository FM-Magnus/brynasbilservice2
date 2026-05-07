# Brynäs Bilservice Server

Express API backend for Brynäs Bilservice. Written in JavaScript (not TypeScript).

## Getting Started

```bash
npm install
npm run dev    # uses nodemon, restarts on file changes
```

## Environment Variables

Create a `.env` file in `server/`:

```bash
DB_HOST=localhost
DB_USER=fenrirm_brynasbilservice
DB_PASSWORD=<your-password>
DB_NAME=fenrirm_brynasbilservice
PORT=3000
```

Locally, use port `3000`. In production, the server runs on port **3001**
(port 3000 is occupied by another process on the VPS).

## Production Notes

- The server runs on **Node.js 16** in production (CentOS 7, glibc too old
  for Node 18+). Avoid using APIs not available in Node 16.
- PM2 manages the process. See [docs/deployment.md](../docs/deployment.md).
- Static files are served by Apache, not Express. The `express.static`
  middleware only applies when running the server standalone.

## API Routes

### Public

- `GET /api/services` — list all services
- `GET /api/available-dates` — available booking dates
- `POST /api/bookings` — submit a new booking

### Admin (requires `Authorization: Bearer <token>`)

- `GET /api/admin/bookings` — all bookings (joined with customers/services)
- `PUT /api/admin/bookings/:id` — update booking status
- `DELETE /api/admin/bookings/:id` — delete booking
- `GET /api/admin/services` — all services
- `POST /api/admin/services` — create service
- `PUT /api/admin/services/:id` — update service
- `DELETE /api/admin/services/:id` — delete service
- `GET /api/admin/customers` — all customers
