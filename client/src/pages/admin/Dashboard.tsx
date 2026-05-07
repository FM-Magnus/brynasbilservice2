import { useState } from 'react'
import { BookingManagement } from '../../components/admin/BookingManagement'
import { ServiceManagement } from '../../components/admin/ServiceManagement'
import { useLanguage } from '../../context/useLanguage'
import ThemeSwitcher from '../../components/ThemeSwitcher'

export default function AdminDashboard() {
  const { t, language, setLanguage } = useLanguage()
  const [activeTab, setActiveTab] = useState<'bookings' | 'services'>('bookings')

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn')
    localStorage.removeItem('adminToken')
    window.location.reload()
  }

  return (
    <div className="admin-shell min-h-screen bg-gray-100 dark:bg-brynas-black transition-colors">
      {/* Navigation */}
      <nav className="admin-nav bg-indigo-600 dark:bg-brynas-black dark:border-b-2 dark:border-brynas-red text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold">{t('adminDashboard')}</h1>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      activeTab === 'bookings'
                        ? 'bg-indigo-700 text-white dark:bg-brynas-red'
                        : 'text-indigo-200 hover:text-white dark:text-brynas-muted dark:hover:text-white'
                    }`}
                  >
                    {t('bookings')}
                  </button>
                  <button
                    onClick={() => setActiveTab('services')}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      activeTab === 'services'
                        ? 'bg-indigo-700 text-white dark:bg-brynas-red'
                        : 'text-indigo-200 hover:text-white dark:text-brynas-muted dark:hover:text-white'
                    }`}
                  >
                    {t('services')}
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <ThemeSwitcher />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as 'sv' | 'en')}
                  className="mr-4 px-3 py-2 text-sm font-medium text-white bg-transparent border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                >
                  <option value="sv">SV</option>
                  <option value="en">EN</option>
                </select>
                <button
                  onClick={handleLogout}
                  className="ml-4 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  {t('logout')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {activeTab === 'bookings' && <BookingManagement />}
            {activeTab === 'services' && <ServiceManagement />}
          </div>
        </div>
      </main>
    </div>
  )
}