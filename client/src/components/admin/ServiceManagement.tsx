import { useState, useEffect } from 'react'
import axiosInstance from '../../api/axiosConfig'
import { useLanguage } from '../../context/useLanguage'
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { DialogBackdrop, DialogTitle } from '@headlessui/react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Service {
  id: number
  name: string
  description: string
  price_starting: number | null
  price_hourly: number
  created_at: string
}

export function ServiceManagement() {
  const { t } = useLanguage()
  const [services, setServices] = useState<Service[]>([])
  const [filteredServices, setFilteredServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [currentService, setCurrentService] = useState<Service | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem('adminToken')
        const response = await axiosInstance.get('/api/admin/services', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        setServices(response.data)
        setFilteredServices(response.data)
        setLoading(false)
      } catch (error) {
        setError('Failed to fetch services')
        setLoading(false)
        console.error(error)
      }
    }

    fetchServices()
  }, [])

  useEffect(() => {
    // Filter services based on search term
    const filterServices = () => {
      if (searchTerm) {
        const filtered = services.filter(service => 
          service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredServices(filtered)
      } else {
        setFilteredServices(services)
      }
    }
    
    filterServices()
  }, [services, searchTerm])

  const handleEdit = (service: Service) => {
    setCurrentService(service)
    setIsEditing(true)
  }

  const confirmDelete = (id: number) => {
    setDeleteConfirmId(id)
  }

  const executeDelete = async () => {
    if (deleteConfirmId === null) return
    try {
      const token = localStorage.getItem('adminToken')
      await axiosInstance.delete(`/api/admin/services/${deleteConfirmId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setServices(services.filter(service => service.id !== deleteConfirmId))
    } catch (error) {
      setError('Failed to delete service')
      console.error(error)
    } finally {
      setDeleteConfirmId(null)
    }
  }

  const handleSave = async () => {
    try {
      if (!currentService) return
      
      const token = localStorage.getItem('adminToken')
      
      if (currentService.id) {
        // Update existing service
        await axiosInstance.put(`/api/admin/services/${currentService.id}`, currentService, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        // Update locally
        setServices(services.map(service => 
          service.id === currentService.id ? currentService : service
        ))
      } else {
        // Add new service
        const response = await axiosInstance.post('/api/admin/services', currentService, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        // Add locally
        setServices([...services, {...currentService, id: response.data.id}])
      }
      
      setIsEditing(false)
      setCurrentService(null)
    } catch (error) {
      setError('Failed to save service')
      console.error(error)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setCurrentService(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentService) return
    
    const { name, value } = e.target
    setCurrentService({
      ...currentService,
      [name]: (name === 'price_hourly' || name === 'price_starting') ? (value === '' ? null : parseFloat(value)) : value
    })
  }

  const handleAddNew = () => {
    setCurrentService({
      id: 0,
      name: '',
      description: '',
      price_starting: null,
      price_hourly: 0,
      created_at: new Date().toISOString()
    })
    setIsEditing(true)
  }

  const openModal = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  if (loading) {
    return <div className="p-6">{t('loading')}...</div>
  }

  return (
    <div className="service-management bg-white dark:bg-brynas-dark-2 shadow overflow-hidden sm:rounded-lg transition-colors">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              {t('serviceManagement')}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-brynas-muted">
              {t('manageServices')}
            </p>
          </div>
          <button
            onClick={handleAddNew}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-brynas-gold dark:text-brynas-black dark:hover:bg-brynas-gold-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {t('addNewService')}
          </button>
        </div>
        
        {/* Search Control */}
        <div className="mt-4">
          <div className="relative rounded-md shadow-sm">
            <input
              type="text"
              className="p-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 dark:border-brynas-dark-3 dark:bg-brynas-dark dark:text-white rounded-md"
              placeholder={t('searchServices')}
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
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-red-400">!</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {t('failedToFetch')} {t('serviceManagement')}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {isEditing ? (
        <div className="px-4 py-5 sm:p-6 border-t border-gray-200 dark:border-brynas-dark-3">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('serviceName')}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={currentService?.name || ''}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-brynas-dark-3 dark:bg-brynas-dark dark:text-white rounded-md text-black"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="price_starting" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('priceStarting')}
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="price_starting"
                  id="price_starting"
                  value={currentService?.price_starting ?? ''}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-brynas-dark-3 dark:bg-brynas-dark dark:text-white rounded-md text-black"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="price_hourly" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('priceHourly')}
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="price_hourly"
                  id="price_hourly"
                  value={currentService?.price_hourly || ''}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-brynas-dark-3 dark:bg-brynas-dark dark:text-white rounded-md text-black"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('description')}
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={currentService?.description || ''}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 dark:border-brynas-dark-3 dark:bg-brynas-dark dark:text-white rounded-md text-black"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-brynas-dark-3 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-brynas-dark hover:bg-gray-50 dark:hover:bg-brynas-dark-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t('cancel')}
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-brynas-gold dark:text-brynas-black dark:hover:bg-brynas-gold-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {t('save')}
            </button>
          </div>
        </div>
      ) : (
        <div className="border-t border-gray-200 dark:border-brynas-dark-3">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-brynas-dark-3">
            <thead className="bg-gray-50 dark:bg-brynas-dark-3">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('service')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('description')}
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('priceStarting')}
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('priceHourly')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-brynas-dark-2 divide-y divide-gray-200 dark:divide-brynas-dark-3">
              {filteredServices.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-brynas-muted">
                    {t('noServicesFound')}
                  </td>
                </tr>
              ) : (
                filteredServices.map((service) => {
                  return (
                    <tr key={service.id} onClick={() => openModal(service)} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-brynas-dark-3">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{service.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-gray-200 max-w-xs truncate">{service.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm text-gray-900 dark:text-gray-200">{service.price_starting != null ? `${service.price_starting}` : '—'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm text-gray-900 dark:text-gray-200">{service.price_hourly != null ? `${service.price_hourly}` : '—'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(service);
                          }}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-brynas-gold dark:hover:text-brynas-gold-light mr-4"
                          title={t('editService')}
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            confirmDelete(service.id);
                          }}
                          className="text-red-600 hover:text-red-900"
                          title={t('deleteService')}
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Modal for displaying service details */}
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
              <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
                  <div className="mt-3 text-left sm:mt-5">
                    <DialogTitle as="h3" className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      {t('serviceDetails')}
                    </DialogTitle>
                    <div className="mt-2">
                      {selectedService && (
                        <div className="text-sm text-gray-500 dark:text-brynas-muted">


                          <div className='mb-4 flex'>
                            <div className="mb-4 w-full">
                              <div className="uppercase text-gray-500">{t('serviceName')}</div>
                              <div className="p-2 rounded-md dark:text-white hover:bg-slate-200 dark:hover:bg-gray-800">{selectedService.name}</div>
                            </div>
                          </div>

                          <div className='mb-4 flex'>
                            <div className="mb-4 w-full">
                              <div className="uppercase text-gray-500">{t('description')}</div>
                              <div className="p-2 rounded-md dark:text-white hover:bg-slate-200 dark:hover:bg-gray-800">{selectedService.description}</div>
                            </div>
                          </div>


                          <div className='mb-4 flex'>
                            <div className="mb-4 w-1/2 pr-6">
                              <div className="uppercase text-gray-500">{t('priceStarting')}</div>
                              <div className="p-2 rounded-md dark:text-white hover:bg-slate-200 dark:hover:bg-gray-800">{selectedService.price_starting ? selectedService.price_starting : "-"}</div>
                            </div>
                            <div className="mb-4 w-1/2">
                              <div className="uppercase text-gray-500">{t('priceHourly')}</div>
                              <div className="p-2 rounded-md dark:text-white hover:bg-slate-200 dark:hover:bg-gray-800">{selectedService.price_hourly ? selectedService.price_hourly : "-"}</div>
                            </div>
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
                  <button onClick={executeDelete} className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">{t('delete')}</button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}