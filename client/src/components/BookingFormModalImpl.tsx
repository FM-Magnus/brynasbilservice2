import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from '../api/axiosConfig';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale/sv';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { buildBookingRequest, submitBooking } from '../api/bookings';
import { BUSINESS } from '../data/business';
import { useFormSubmission } from '../hooks/useFormSubmission';
import type { SubmissionErrorKind } from '../hooks/useFormSubmission';
import './BookingForm.css'; // Import custom styles for modal

export interface BookingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialComment?: string;
}

const submissionErrorMessages: Record<SubmissionErrorKind, string> = {
  network: 'Vi når inte servern just nu. Kontrollera din internetanslutning och försök igen.',
  timeout: 'Det tog för lång tid att skicka bokningen. Försök igen.',
  'rate-limit': 'Det har skickats många förfrågningar på kort tid. Vänta en stund och försök igen.',
  rejected: 'Bokningen kunde inte skickas. Kontrollera uppgifterna och försök igen.',
  server: 'Något gick fel hos oss. Försök igen om en stund.',
  unknown: 'Något gick fel. Försök igen.',
};

const BookingFormModalImpl: React.FC<BookingFormModalProps> = ({ isOpen, onClose, initialComment = '' }) => {
  const [services, setServices] = useState<Array<{ id: string | number; name: string }>>([]);
  const [servicesState, setServicesState] = useState<'loading' | 'ready' | 'failed'>('loading');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerComment, setCustomerComment] = useState('');
  const { status, errorKind, isSubmitting, submit } = useFormSubmission();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const handleClose = useCallback(() => {
    onCloseRef.current();
  }, []);

  useEffect(() => {
    if (isOpen) {
      axios.get('/api/services')
        .then(response => {
          setServices(response.data);
          setServicesState('ready');
        })
        .catch(error => {
          console.error('Error fetching services:', error);
          setServicesState('failed');
        });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && initialComment) setCustomerComment((current) => current || initialComment);
  }, [initialComment, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);
    const getFocusableElements = () => Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ) ?? [],
    ).filter(element => !element.hasAttribute('hidden'));

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) {
        event.preventDefault();
        dialogRef.current?.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && (activeElement === firstElement || !dialogRef.current?.contains(activeElement))) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && (activeElement === lastElement || !dialogRef.current?.contains(activeElement))) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;

      window.requestAnimationFrame(() => {
        const trigger = returnFocusRef.current;
        const fallback = document.getElementById('nav-toggle');
        const triggerIsVisible = trigger?.isConnected
          && !trigger.hasAttribute('disabled')
          && !trigger.closest('[hidden]')
          && trigger.getClientRects().length > 0;
        if (triggerIsVisible) {
          trigger.focus();
        } else {
          fallback?.focus();
        }
      });
    };
  }, [handleClose, isOpen]);

  // Announce the outcome by moving focus to it: a live region that is inserted
  // together with its content is often not read out, a focused heading/alert is.
  useEffect(() => {
    if (status === 'error') errorRef.current?.focus();
    if (status === 'success') successHeadingRef.current?.focus();
  }, [status]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    void submit((signal) => submitBooking(
      buildBookingRequest({
        customerName,
        customerEmail,
        customerPhone,
        serviceId: selectedService,
        date: selectedDate,
        time: selectedTime,
        comment: customerComment,
      }),
      signal,
    ));
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && !isSubmitting) handleClose();
  };

  const selectedServiceName = services.find(service => String(service.id) === selectedService)?.name;

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        ref={dialogRef}
        className="modal-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        tabIndex={-1}
      >
        <div className="modal-header">
          <h2 id="booking-modal-title" className="modal-title">Boka en tid</h2>
          <button ref={closeButtonRef} type="button" className="modal-close" onClick={handleClose} aria-label="Stäng bokningsformuläret">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        {status === 'success' ? (
          <div className="modal-success">
            <h3 ref={successHeadingRef} tabIndex={-1} className="modal-success__title">
              Tack! Din bokningsförfrågan är skickad
            </h3>
            <p className="modal-success__text">
              Vi har tagit emot din förfrågan och återkommer för att bekräfta tiden.
            </p>
            <dl className="modal-success__summary">
              {selectedServiceName && (
                <div>
                  <dt>Tjänst</dt>
                  <dd>{selectedServiceName}</dd>
                </div>
              )}
              {selectedDate && (
                <div>
                  <dt>Önskad tid</dt>
                  <dd>{format(selectedDate, 'EEEE d MMMM', { locale: sv })} kl. {selectedTime}</dd>
                </div>
              )}
            </dl>
            <button type="button" className="modal-submit" onClick={handleClose}>
              Stäng
            </button>
          </div>
        ) : (
        <form onSubmit={handleSubmit} className="modal-form" aria-busy={isSubmitting}>
          <fieldset className="booking-form__fieldset" disabled={isSubmitting}>
            <div className="booking-form__schedule">
              <div className="booking-form__field">
                <label className="modal-label" htmlFor="booking-date">
                  Datum
                </label>
                <DatePicker
                  id="booking-date"
                  selected={selectedDate}
                  onChange={(date: Date | null) => setSelectedDate(date)}
                  locale={sv}
                  dateFormat="EEEE, dd/MM" // Update format to include day of the week
                  className="modal-input"
                  placeholderText="Välj ett datum"
                  required
                />
              </div>

              <div className="booking-form__field">
                <label className="modal-label" htmlFor="booking-time">
                  Tid
                </label>
                <TimePicker
                  id="booking-time"
                  onChange={(val) => setSelectedTime(val ? String(val) : '')}
                  value={selectedTime}
                  clockIcon={null}
                  disableClock={true}
                  format="HH:mm"
                  className="modal-input"
                  required
                />
              </div>
            </div>

            <div className="booking-form__field">
              <label className="modal-label" htmlFor="booking-service">
                Service
              </label>
              <select
                id="booking-service"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="modal-input"
                required
              >
                <option value="">Välj en service du vill ha utfört</option>
                {services.map(service => (
                  <option key={service.id} value={service.id}>{service.name}</option>
                ))}
              </select>
              {/* Without services the required select can never be filled, so the
                  form cannot be sent; say so instead of leaving an empty list. */}
              {(servicesState === 'failed' || (servicesState === 'ready' && services.length === 0)) && (
                <div className="modal-error" role="alert">
                  <p className="modal-error__title">Tjänsterna kunde inte hämtas just nu.</p>
                  <p>
                    Ring oss på <a href={BUSINESS.phone.href}>{BUSINESS.phone.display}</a> så bokar vi tiden åt dig.
                  </p>
                </div>
              )}
            </div>

            <div className="booking-form__field">
              <label className="modal-label" htmlFor="booking-name">
                Namn
              </label>
              <input
                id="booking-name"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Ange för- och efternamn"
                className="modal-input"
                required
              />
            </div>

            <div className="booking-form__field">
              <label className="modal-label" htmlFor="booking-email">
                E-post <span className="modal-required">*</span>
              </label>
              <input
                id="booking-email"
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="Ange din e-postadress"
                className="modal-input"
                required
              />
            </div>

            <div className="booking-form__field">
              <label className="modal-label" htmlFor="booking-phone">
                Telefon <span className="modal-required">*</span>
              </label>
              <input
                id="booking-phone"
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Ange ditt telefonnummer"
                className="modal-input"
                required
              />
            </div>

            <div className="booking-form__field">
              <label className="modal-label" htmlFor="booking-comment">
                Kommentar
              </label>
              <textarea
                id="booking-comment"
                value={customerComment}
                onChange={(e) => setCustomerComment(e.target.value)}
                placeholder="Skriv eventuella kommentarer här (valfritt)"
                className="modal-input"
                rows={3}
              />
            </div>
            {status === 'error' && errorKind && (
              <div ref={errorRef} className="modal-error" role="alert" tabIndex={-1}>
                <p className="modal-error__title">Din bokning har inte skickats.</p>
                <p>
                  {submissionErrorMessages[errorKind]} Du kan också ringa oss på{' '}
                  <a href={BUSINESS.phone.href}>{BUSINESS.phone.display}</a>.
                </p>
              </div>
            )}
            <div className="booking-form__footer">
              <div className="booking-form__required-note">
                Fält märkt med * är obligatoriska
              </div>
              <button type="submit" className="modal-submit">
                {isSubmitting ? 'Skickar…' : 'Skicka bokning'}
              </button>
            </div>
          </fieldset>
          <div className="booking-form__sr-only" role="status">
            {isSubmitting ? 'Skickar din bokning' : ''}
          </div>
        </form>
        )}
      </div>
    </div>
  );
};

export default BookingFormModalImpl;
