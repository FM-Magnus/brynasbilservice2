import { useState } from 'react'
import { useLanguage } from '../../context/useLanguage'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { t } = useLanguage()
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAdminLoggedIn') === 'true' && !!localStorage.getItem('adminToken')
  })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('adminToken', 'admin-secret-token')
      localStorage.setItem('isAdminLoggedIn', 'true')
      setIsAuthenticated(true)
    } else {
      setError(t('loginError') || 'Invalid username or password')
    }
  }

  if (isAuthenticated) {
    return <>{children}</>
  }

  return (
    <div className="admin-login min-h-screen flex items-center justify-center bg-gray-50 dark:bg-brynas-black py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="admin-login__card max-w-md w-full space-y-8">
        <h2 className="admin-login__title mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          {t('adminDashboard')}
        </h2>
        <form className="admin-login__form mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">{t('customer')}</label>
              <input
                id="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-brynas-dark-3 dark:bg-brynas-dark-2 placeholder-gray-500 dark:placeholder-brynas-muted text-gray-900 dark:text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={t('customer')}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">{t('password')}</label>
              <input
                id="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-brynas-dark-3 dark:bg-brynas-dark-2 placeholder-gray-500 dark:placeholder-brynas-muted text-gray-900 dark:text-white rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={t('password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {error && <div className="admin-login__error text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="admin-login__submit group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-brynas-gold dark:text-brynas-black dark:hover:bg-brynas-gold-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {t('confirmed')}
          </button>
        </form>
      </div>
    </div>
  )
}