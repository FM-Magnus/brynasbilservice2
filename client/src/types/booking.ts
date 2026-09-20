/**
 * Booking contract — the body of `POST /api/bookings`.
 *
 * Source of truth for the server side is `docs/BACKEND_HANDOFF.md` §2.2 and the
 * API table in `AGENTS.md`. Change this file and those two together.
 */
export interface BookingRequest {
  customerName: string
  customerEmail: string
  customerPhone: string
  /** Numeric id of a row from `GET /api/services`. */
  serviceId: number
  /**
   * The calendar day the customer picked, as `yyyy-MM-dd` in local time.
   * Never a JSON-serialised `Date`: that is a UTC timestamp, and a customer
   * in Sweden who picks 20 Sep would send `2026-09-19T22:00:00.000Z`, which a
   * UTC server stores as 19 Sep.
   */
  date: string
  /** 24-hour `HH:mm`. */
  time: string
  /**
   * Free text from the customer, e.g. `Gäller förfrågan om Peugeot 307 CC (2006)`.
   * Omitted when empty. The snake_case key is the existing server contract.
   */
  comment_customer?: string
}

/** Raw values held by the booking form before they become a `BookingRequest`. */
export interface BookingFormValues {
  customerName: string
  customerEmail: string
  customerPhone: string
  serviceId: string | number
  date: Date | null
  time: string
  comment: string
}
