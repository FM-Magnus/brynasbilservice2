import { useCallback, useState } from 'react'
import { BookingFormModal } from '../components/BookingForm'

/**
 * The booking modal's open state and pre-filled comment, shared by every public page.
 *
 * - `openBooking` opens with the page's `defaultComment`. It takes no arguments,
 *   so it can be handed straight to `onClick` without the click event ending up
 *   as the comment.
 * - `openBookingWith(comment)` opens with a comment for one trigger, e.g. a
 *   service card or a vehicle inquiry.
 * - Render `bookingModal` once per page. The dialog unmounts when closed, so
 *   every open starts from an empty form plus the comment.
 */
export function useBookingModal(defaultComment = '') {
  const [booking, setBooking] = useState({ isOpen: false, comment: defaultComment })

  const openBooking = useCallback(() => setBooking({ isOpen: true, comment: defaultComment }), [defaultComment])
  const openBookingWith = useCallback((comment: string) => setBooking({ isOpen: true, comment }), [])
  const closeBooking = useCallback(() => setBooking((current) => ({ ...current, isOpen: false })), [])

  const bookingModal = (
    <BookingFormModal isOpen={booking.isOpen} onClose={closeBooking} initialComment={booking.comment || undefined} />
  )

  return { openBooking, openBookingWith, closeBooking, bookingModal }
}
