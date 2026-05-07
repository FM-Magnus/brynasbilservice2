import { useState, useEffect, useMemo } from 'react'
import axiosInstance from '../../api/axiosConfig'
import { useLanguage } from '../../context/useLanguage'
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Booking {
  id: number
  customer_id: number // Added customer_id field
  customer_name: string
  service_name: string
  service_price: number // Added service_price field
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'erased'
  created_at: string
  customer_email?: string
  customer_phone?: string
  comment_customer?: string
  comment_admin?: string
}

export function BookingManagement() {
  const { t } = useLanguage()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('adminToken')
        const response = await axiosInstance.get('/api/admin/bookings', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        setBookings(response.data.map((booking: Booking) => ({
          ...booking,
          service_price: booking.service_price // Map service_price from response
        })))
        setLoading(false)
      } catch (error) {
        setError('Failed to fetch bookings')
        setLoading(false)
        console.error(error)
      }
    }

    fetchBookings()
  }, [])



  // Initialize sortConfig with default sorting on 'date' and 'time'
  const [sortConfig, setSortConfig] = useState<{ key: keyof Booking; direction: 'asc' | 'desc' } | null>({
    key: 'date',
    direction: 'asc',
  });

  const sortedBookings = useMemo(() => {
    let filtered = bookings.filter(b => b.status !== 'erased');

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(b =>
        b.customer_name.toLowerCase().includes(term) ||
        b.service_name.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(b => b.status === statusFilter);
    }

    if (!sortConfig) return filtered;

    const sorted = [...filtered].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;

      if (sortConfig.key === 'date') {
        if (a.time < b.time) return -1;
        if (a.time > b.time) return 1;
      }

      return 0;
    });

    return sorted;
  }, [bookings, sortConfig, searchTerm, statusFilter]);

  const updateBookingStatus = async (id: number, status: Booking['status']) => {
    try {
      const token = localStorage.getItem('adminToken')
      await axiosInstance.put(`/api/admin/bookings/${id}`, { status }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      // Update locally
      setBookings(bookings.map(booking => 
        booking.id === id ? {...booking, status} : booking
      ))
    } catch (error) {
      setError('Failed to update booking status')
      console.error(error)
    }
  }

  const confirmDelete = (id: number) => {
    setDeleteConfirmId(id)
  }

  const deleteBooking = async () => {
    if (deleteConfirmId === null) return
    try {
      const token = localStorage.getItem('adminToken')
      await axiosInstance.delete(`/api/admin/bookings/${deleteConfirmId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setBookings(bookings.filter(booking => booking.id !== deleteConfirmId))
    } catch (error) {
      setError('Failed to delete booking')
      console.error(error)
    } finally {
      setDeleteConfirmId(null)
    }
  }

  const openModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  // Add debugging logs to verify sorting behavior
  console.log('Sort Config:', sortConfig);
  console.log('Sorted Bookings:', sortedBookings);

  const handleSort = (key: keyof Booking) => {
    setSortConfig((prev) => {
      if (prev && prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const getSortIcon = (key: keyof Booking) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 inline ml-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 inline ml-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    );
  };

  if (loading) {
    return <div className="p-6">{t('loading')}...</div>
  }

  return (
    <div className="booking-management bg-white dark:bg-brynas-dark-2 shadow overflow-hidden sm:rounded-lg transition-colors">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          {t('bookingManagement')}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-brynas-muted">
          {t('viewManageBookings')}
        </p>
      </div>
      
      {/* Search and Filter Controls */}
      <div className="px-4 py-3 bg-gray-50 dark:bg-brynas-dark-3 border-t border-gray-200 dark:border-brynas-dark-3 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                className="p-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 dark:border-brynas-dark-3 dark:bg-brynas-dark dark:text-white rounded-md text-black"
                placeholder={t('searchBookings')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none block w-full pl-4 py-4 pr-12 text-base border-gray-300 dark:border-brynas-dark-3 dark:bg-brynas-dark dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-black"
            >
              <option value="all">{t('allStatuses')}</option>
              <option value="pending">{t('pending')}</option>
              <option value="confirmed">{t('confirmed')}</option>
              <option value="completed">{t('completed')}</option>
              <option value="cancelled">{t('cancelled')}</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-red-400">!</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {t('failedToFetch')} {t('bookingManagement')}
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="border-t border-gray-200 dark:border-brynas-dark-3">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-brynas-dark-3">
          <thead className="bg-gray-50 dark:bg-brynas-dark-3">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('customer_name')}
              >
                {t('customer')}
                {getSortIcon('customer_name')}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('service_name')}
              >
                {t('service')}
                {getSortIcon('service_name')}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('date')}
              >
                {t('date')}
                {getSortIcon('date')}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('time')}
              >
                {t('time')}
                {getSortIcon('time')}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('status')}
              >
                {t('status')}
                {getSortIcon('status')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-brynas-dark-2 divide-y divide-gray-200 dark:divide-brynas-dark-3">
            {sortedBookings.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-brynas-muted">
                  {t('noBookingsFound')}
                </td>
              </tr>
            ) : (
              sortedBookings.map((booking) => {
                let formattedDate = '';

                try {
                  const parsedDate = new Date(booking.date)
                  formattedDate = format(parsedDate, 'EEEE, dd/MM', { locale: sv })
                } catch (error) {
                  console.error('Error parsing date or time:', error)
                }

                // Validate and format time value
                const isValidTime = (time: string) => /^\d{2}:\d{2}(:\d{2})?$/.test(time);
                const formattedTime = booking.time && isValidTime(booking.time) 
                  ? format(new Date(`1970-01-01T${booking.time}`), 'HH:mm', { locale: sv }) 
                  : t('invalidTime');

                return (
                  <tr key={booking.id} onClick={() => openModal(booking)} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-brynas-dark-3">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{booking.customer_name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-200">{booking.service_name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-200">{formattedDate || t('invalidDate')}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-brynas-muted">{formattedTime || t('invalidTime')}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative inline-block">
                      <select
                        value={booking.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => updateBookingStatus(booking.id, e.target.value as Booking['status'])}
                        className="appearance-none pl-4 py-2 pr-10 text-sm rounded-md border-gray-300 dark:border-brynas-dark-3 dark:bg-brynas-dark shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900 dark:text-white bg-white"
                      >
                        <option value="pending">{t('pending')}</option>
                        <option value="confirmed">{t('confirmed')}</option>
                        <option value="completed">{t('completed')}</option>
                        <option value="cancelled">{t('cancelled')}</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(booking);
                        }}
                        className="text-yellow-500 hover:text-yellow-700 ml-4"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                      onClick={(e) => {
                        e.stopPropagation();
                        confirmDelete(booking.id);
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for displaying booking details */}
      <Transition.Root show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={closeModal}>
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white dark:bg-brynas-dark-2 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div>
                  <div className="mt-3 sm:mt-5">
                    <Dialog.Title as="h3" className="mb-4 uppercase text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      {t('bookingDetails')}
                    </Dialog.Title>
                    <div className="mt-2">
                      {selectedBooking && (
                        <div className="text-sm text-gray-500 dark:text-brynas-muted">



                          <div className='mb-4 flex'>
                            <div className="mb-4 w-1/2 pr-6">
                              <div className="uppercase text-gray-500">{t('bookingId')}</div>
                              <div className="p-2 rounded-md dark:text-white hover:bg-slate-200 dark:hover:bg-gray-800">{selectedBooking.id}</div>
                            </div>
                            <div className="mb-4 w-1/2 pr-2">
                              <div className="uppercase text-gray-500">{t('createdAt')}</div>
                              <div className="p-2 rounded-md dark:text-white hover:bg-slate-200 dark:hover:bg-gray-800">{format(new Date(selectedBooking.created_at), 'EEEE, dd/MM HH:mm', { locale: sv })}</div>
                            </div>
                          </div>



                          <div className='mb-4 flex'>
                          <div className="mb-4 w-1/2 pr-6">
                            <div className="uppercase text-gray-500">{t('customer')}</div>
                            <div className="p-2 rounded-md dark:text-white hover:bg-slate-200 dark:hover:bg-gray-800">{selectedBooking.customer_name}</div>
                          </div>
                          <div className="mb-4 w-1/2 pr-2">
                            <div className="uppercase text-gray-500">{t('phone')}</div>
                            {/* <div className="p-2 rounded-md dark:text-white hover:bg-slate-200 dark:hover:bg-gray-800">{selectedBooking.customer_phone || t('notAvailable')}</div> */}
                            <div className="p-2 rounded-md dark:text-white hover:bg-slate-200 dark:hover:bg-gray-800">{selectedBooking.customer_phone ? <a href={`tel:${selectedBooking.customer_phone}`}>{selectedBooking.customer_phone}</a> : t('notAvailable')}</div>                            
                          </div>
                          </div>



                          <div className="mb-4 pr-2">
                            <div className="uppercase text-gray-500">{t('email')}</div>
                            <div className="p-2 rounded-md dark:text-white hover:bg-slate-200 dark:hover:bg-gray-800">{selectedBooking.customer_email ? <a href={`mailto:${selectedBooking.customer_email}`} className="text-brynas-gold hover:text-brynas-gold-light underline">{selectedBooking.customer_email}</a> : t('notAvailable')}</div>
                          </div>



                          <div className='mb-4 flex'>
                            <div className="mb-4 w-1/2 pr-6">
                              <div className="uppercase text-gray-500">{t('service')}</div>
                              <div className="p-2 rounded-md dark:text-white hover:bg-slate-200 dark:hover:bg-gray-800">{selectedBooking.service_name || t('notAvailable')}</div>
                            </div>
                            <div className="mb-4 w-1/2 pr-2">
                              <div className="uppercase text-gray-500">{t('status')}</div>
                              <div className="relative inline-block mt-1">
                                <select
                                  value={selectedBooking.status}
                                  onChange={(e) => {
                                    const newStatus = e.target.value as Booking['status'];
                                    updateBookingStatus(selectedBooking.id, newStatus);
                                    setSelectedBooking({ ...selectedBooking, status: newStatus });
                                  }}
                                  className="appearance-none pl-4 py-2 pr-10 text-sm rounded-md border-gray-300 dark:border-brynas-dark-3 dark:bg-brynas-dark shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900 dark:text-white bg-white"
                                >
                                  <option value="pending">{t('pending')}</option>
                                  <option value="confirmed">{t('confirmed')}</option>
                                  <option value="completed">{t('completed')}</option>
                                  <option value="cancelled">{t('cancelled')}</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>



                          <div className='mb-4 flex'>
                            <div className="mb-4 w-1/2 pr-6">
                              <div className="uppercase text-gray-500">{t('date')}</div>
                              <div className="p-2 rounded-md dark:text-white hover:bg-slate-200 dark:hover:bg-gray-800">{format(new Date(selectedBooking.date), 'EEEE, dd/MM', { locale: sv })}</div>
                            </div>
                            <div className="mb-4 w-1/2 pr-2">
                              <div className="uppercase text-gray-500">{t('time')}</div>
                              <div className="p-2 rounded-md dark:text-white hover:bg-slate-200 dark:hover:bg-gray-800">{selectedBooking.time}</div>
                            </div>
                          </div>

                          <div className="mb-4">
                            <div className="uppercase text-gray-500">{t('customerComment')}</div>
                            <textarea
                              value={selectedBooking.comment_customer || ''}
                              readOnly
                              className="w-full p-2 rounded-md border border-gray-300 dark:border-brynas-dark-3 dark:bg-brynas-dark dark:text-white text-sm"
                              rows={3}
                            />
                          </div>

                          <div className="mb-4">
                            <div className="uppercase text-gray-500">{t('adminComment')}</div>
                            <textarea
                              value={selectedBooking.comment_admin || ''}
                              readOnly
                              className="w-full p-2 rounded-md border border-gray-300 dark:border-brynas-dark-3 dark:bg-brynas-dark dark:text-white text-sm"
                              rows={3}
                            />
                          </div>
                          </div>                          





                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 dark:bg-brynas-gold dark:text-brynas-black text-base font-medium text-white hover:bg-indigo-700 dark:hover:bg-brynas-gold-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    onClick={closeModal}
                  >
                    {t('close')}
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Delete confirmation modal */}
      <Transition.Root show={deleteConfirmId !== null} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setDeleteConfirmId(null)}>
          <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/40" />
          </Transition.Child>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-150" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-sm rounded-lg bg-white dark:bg-brynas-dark-2 p-6 shadow-xl">
                <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">{t('confirmDelete')}</Dialog.Title>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{t('confirmDeleteMessage')}</p>
                <div className="mt-5 flex justify-end gap-3">
                  <button onClick={() => setDeleteConfirmId(null)} className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-brynas-dark-3">{t('cancel')}</button>
                  <button onClick={deleteBooking} className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">{t('delete')}</button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}