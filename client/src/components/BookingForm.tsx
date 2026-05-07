import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { sv } from 'date-fns/locale/sv';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import './BookingForm.css'; // Import custom styles for modal

export const BookingFormModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [services, setServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerComment, setCustomerComment] = useState('');

  useEffect(() => {
    if (isOpen) {
      axios.get('/api/services')
        .then(response => setServices(response.data))
        .catch(error => console.error('Error fetching services:', error));
    }
  }, [isOpen]);

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

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close text-gray-500" onClick={onClose}>&times;</button>
        <form onSubmit={handleSubmit} className="modal-form">
          <h2 className="modal-title">Boka en tid</h2>
          
          <div className='flex gap-4 mb-4 w-full'>
            <div className='w-1/2'>
              <label className="modal-label">
                Datum
              </label>
              <DatePicker
                selected={selectedDate ? new Date(selectedDate) : null}
                onChange={(date) => setSelectedDate(date)}
                locale={sv}
                dateFormat="EEEE, dd/MM" // Update format to include day of the week
                className="modal-input w-full"
                placeholderText="Välj ett datum"
                required
              />
            </div>

            <div className='w-1/2'>
              <label className="modal-label">
                Tid
              </label>
              <TimePicker
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

          <div className='mb-4 w-full'>
            <div>
              <label className="modal-label w-full">
                Service
              </label> 
            </div>
            <div>    
              <select
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
          </div>

          <div className='mb-4 w-full'>
            <div>
              <label className="modal-label w-full">
                Namn
              </label>
            </div>            
            <div>            
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Ange för- och efternamn"
                className="modal-input w-full"
                required
              />
            </div>
          </div>

          <div className='mb-4 w-full'>
            <div>
              <label className="modal-label">
                E-post <span className="text-red-500">*</span>
              </label>
            </div>
            <div>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder='Ange din e-postadress'
                className="modal-input w-full"
                required
              />
            </div>
          </div>

          <div className='mb-4 w-full'>
            <div>
              <label className="modal-label">
                Telefon <span className="text-red-500">*</span>
              </label>
            </div>
            <div>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder='Ange ditt telefonnummer'
                className="modal-input w-full"
                required
              />
            </div>
          </div>

          <div className='mb-4 w-full'>
            <div>
              <label className="modal-label">
                Kommentar
              </label>
            </div>
            <div>
              <textarea
                value={customerComment}
                onChange={(e) => setCustomerComment(e.target.value)}
                placeholder='Skriv eventuella kommentarer här (valfritt)'
                className="modal-input w-full"
                rows={3}
              />
            </div>
          </div>
          <div className="flex w-full justify-end gap-2 items-baseline">
            <div className="text-sm text-gray-500">
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