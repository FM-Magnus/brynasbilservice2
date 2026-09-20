import { format } from 'date-fns'
import type { BookingFormValues, BookingRequest } from '../types/booking'
import axiosInstance from './axiosConfig'

/**
 * Turns the form's raw values into the `POST /api/bookings` body: trimmed
 * text, a numeric service id, a local `yyyy-MM-dd` date and no empty comment.
 * Pure, so it can be reasoned about without a browser.
 */
export function buildBookingRequest(values: BookingFormValues): BookingRequest {
  const serviceId = Number(values.serviceId)
  if (!values.date || !Number.isFinite(serviceId) || values.serviceId === '') {
    throw new Error('Booking form is missing a date or a service.')
  }

  const request: BookingRequest = {
    customerName: values.customerName.trim(),
    customerEmail: values.customerEmail.trim(),
    customerPhone: values.customerPhone.trim(),
    serviceId,
    date: format(values.date, 'yyyy-MM-dd'),
    time: values.time,
  }

  const comment = values.comment.trim()
  if (comment) request.comment_customer = comment

  return request
}

export async function submitBooking(request: BookingRequest, signal?: AbortSignal): Promise<void> {
  await axiosInstance.post('/api/bookings', request, { signal })
}
