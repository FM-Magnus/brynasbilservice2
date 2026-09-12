import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from '../api/axiosConfig';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { sv } from 'date-fns/locale/sv';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import './BookingForm.css'; // Import custom styles for modal

export const BookingFormModal: React.FC<{ isOpen: boolean; onClose: () => void; initialComment?: string }> = ({ isOpen, onClose, initialComment = '' }) => {
  const [services, setServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerComment, setCustomerComment] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
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
        .then(response => setServices(response.data))
        .catch(error => console.error('Error fetching services:', error));
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const bookingData = {
      customerName,
      customerEmail,
      customerPhone,
      serviceId: selectedService,
      date: selectedDate,
      time: selectedTime,
      comment_customer: customerComment,
    };

    axios.post('/api/bookings', bookingData)
      .then(() => {
        alert('Bokning skickad!');
        onClose();
      })
      .catch(error => {
        console.error('Error submitting booking:', error);
        alert('Ett fel inträffade. Försök igen.');
      });
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) handleClose();
  };

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
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="booking-form__schedule">
            <div className="booking-form__field">
              <label className="modal-label" htmlFor="booking-date">
                Datum
              </label>
              <DatePicker
                id="booking-date"
                selected={selectedDate ? new Date(selectedDate) : null}
                onChange={(date) => setSelectedDate(date)}
                locale={sv}
                dateFormat="EEEE, dd/MM" // Update format to include day of the week
                className="modal-input w-full"
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
                onChange={setSelectedTime}
                value={selectedTime}
                clockIcon={null}
                disableClock={true}
                format="HH:mm"
                className="modal-input w-full"
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
              className="modal-input w-full"
              required
            >
              <option value="">Välj en service du vill ha utfört</option>
              {services.map(service => (
                <option key={service.id} value={service.id}>{service.name}</option>
              ))}
            </select>
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
              className="modal-input w-full"
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
              className="modal-input w-full"
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
              className="modal-input w-full"
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
              className="modal-input w-full"
              rows={3}
            />
          </div>
          <div className="booking-form__footer">
            <div className="booking-form__required-note">
              Fält märkt med * är obligatoriska
            </div>
            <button type="submit" className="modal-submit btn btn--primary">
              Skicka bokning
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
