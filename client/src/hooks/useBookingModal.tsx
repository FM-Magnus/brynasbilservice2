import { useCallback, useEffect, useState } from 'react'
import { BookingFormModal } from '../components/BookingForm'
import { publicActionHref, usePublicAction } from '../api/publicActions'

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
  const kind = usePublicAction('book')

  const openBookingWith = useCallback((comment: string) => {
    if (kind === 'book') setBooking({ isOpen: true, comment })
    else window.location.href = publicActionHref(kind, comment)
  }, [kind])
  const openBooking = useCallback(() => openBookingWith(defaultComment), [defaultComment, openBookingWith])
  const closeBooking = useCallback(() => setBooking((current) => ({ ...current, isOpen: false })), [])
  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ comment?: string }>).detail
      setBooking({ isOpen: true, comment: detail?.comment || defaultComment })
    }
    window.addEventListener('bb:request-booking', handler)
    return () => window.removeEventListener('bb:request-booking', handler)
  }, [defaultComment])

  const bookingModal = (
    <BookingFormModal isOpen={booking.isOpen} onClose={closeBooking} initialComment={booking.comment || undefined} />
  )

  return { openBooking, openBookingWith, closeBooking, bookingModal }
}
