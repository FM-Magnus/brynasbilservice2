# Admin Panel Documentation

## Overview

The admin panel provides authorized users with the ability to manage bookings
and services for Brynäs Bilservice. It lives at a single URL — `/admin` — and
handles authentication inline (no separate login page).

## Accessing the Admin Panel

Navigate to `/admin` (e.g. `https://labb.fenrirmedia.se/brynasbilservice/admin`).

If you are not logged in, a login form is shown on the same page. After
successful authentication, the dashboard replaces the form without a URL change.

**Credentials (demo):**

- Username: `admin`
- Password: `admin123`

**Security (P0):** these credentials are checked only in the browser, and the server accepts the fixed token `admin-secret-token` from anyone. See [`docs/BACKEND.md`](../BACKEND.md) §2.1 and the "Broken" list in [`docs/STATUS.md`](../STATUS.md). Since 2026-09-24 the check loads only when `/admin` is opened, not in the public entry bundle.

## Features

### Booking Management

- View all bookings in a sortable table
- Search bookings by customer name or service
- Filter bookings by status (Pending, Confirmed, Completed, Cancelled)
- Update booking status via dropdown
- Delete bookings (a soft delete: the server sets `status='erased'`, and erased bookings are hidden from the list)

Each booking shows: customer name, service, date, time, status, and actions.

### Service Management

- View all services
- Search services by name or description
- Add, edit, and delete services
- Each service has: name, description, price (SEK)

## Authentication Flow

1. User navigates to `/admin`
2. `ProtectedRoute` checks `localStorage` for `isAdminLoggedIn` and `adminToken`
3. If not authenticated → login form is rendered inline
4. User submits credentials → validated client-side (demo) → tokens stored in `localStorage`
5. Component state updates → dashboard renders immediately (no redirect)
6. All subsequent API requests include `Authorization: Bearer <token>` header
7. Logout clears `localStorage` and reloads the page → login form reappears

There is no `/admin/login` or `/admin/dashboard` URL. Everything lives at `/admin`.

## API Endpoints

All admin endpoints require `Authorization: Bearer admin-secret-token`.

### Bookings

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/api/admin/bookings` | Retrieve all bookings (joined with customers and services) |
| PUT | `/api/admin/bookings/:id` | Update booking status |
| DELETE | `/api/admin/bookings/:id` | Delete a booking |

### Services

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/api/admin/services` | Retrieve all services |
| POST | `/api/admin/services` | Create a new service |
| PUT | `/api/admin/services/:id` | Update an existing service |
| DELETE | `/api/admin/services/:id` | Delete a service |

### Customers

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/api/admin/customers` | Retrieve all customers |

## Key Components

| Component | File | Purpose |
| --------- | ---- | ------- |
| `ProtectedRoute` | `client/src/components/admin/ProtectedRoute.tsx` | Auth gate — shows login or children |
| `AdminDashboard` | `client/src/pages/admin/Dashboard.tsx` | Tab layout for bookings/services |
| `BookingManagement` | `client/src/components/admin/BookingManagement.tsx` | Booking CRUD |
| `ServiceManagement` | `client/src/components/admin/ServiceManagement.tsx` | Service CRUD |
