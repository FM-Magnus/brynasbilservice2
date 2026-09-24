/**
 * Booking modal — lazy boundary.
 *
 * The implementation pulls in react-datepicker, react-time-picker, react-clock
 * and a date-fns locale, plus ~150 rules of third-party CSS. Every public page
 * renders this modal (through `useBookingModal`), so before this split all of
 * that shipped in the main chunk and downloaded on every first page load —
 * including for the majority of visitors who never open the booking form.
 *
 * The boundary lives here rather than at the call sites, so pages never deal
 * with the lazy import. Nothing is fetched until `isOpen` first
 * becomes true; after that the chunk is cached by the browser and reopening is
 * instant. The fallback is deliberately null: the trigger is a user click on a
 * button that stays visible, and a spinner flashing behind an opening dialog is
 * worse than nothing.
 */
import { Suspense, lazy } from 'react'
import type { BookingFormModalProps } from './BookingFormModalImpl'

const BookingFormModalImpl = lazy(() => import('./BookingFormModalImpl'))

export function BookingFormModal({ isOpen, onClose, initialComment }: BookingFormModalProps) {
  if (!isOpen) return null

  return (
    <Suspense fallback={null}>
      <BookingFormModalImpl isOpen={isOpen} onClose={onClose} initialComment={initialComment} />
    </Suspense>
  )
}
