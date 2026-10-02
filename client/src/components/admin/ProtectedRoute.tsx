import { createContext, useContext, useEffect, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import adminClient, { setAdminCsrfToken } from '../../api/adminClient'
import type { AdminSession } from '../../api/adminClient'
import { useLanguage } from '../../context/useLanguage'

type AdminContextValue = { logout: () => Promise<void> }
const AdminContext = createContext<AdminContextValue | null>(null)

export function useAdminSession(): AdminContextValue {
  const session = useContext(AdminContext)
  if (!session) throw new Error('Admin session is unavailable')
  return session
}

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { t } = useLanguage()
  const [session, setSession] = useState<AdminSession | null>(null)
  const [checking, setChecking] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    adminClient.get<AdminSession>('/api/admin/me')
      .then(({ data }) => {
        if (!active) return
        setAdminCsrfToken(data.csrfToken)
        setSession(data)
      })
      .catch(() => { if (active) setAdminCsrfToken('') })
      .finally(() => { if (active) setChecking(false) })
    return () => { active = false }
  }, [])

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    try {
      const { data } = await adminClient.post<AdminSession>('/api/admin/login', { username, password })
      setAdminCsrfToken(data.csrfToken)
      setSession(data)
      setPassword('')
    } catch {
      setError(t('loginError') || 'Inloggningen misslyckades')
    }
  }

  const logout = async () => {
    await adminClient.post('/api/admin/logout')
    setAdminCsrfToken('')
    setSession(null)
  }

  if (checking) return <div className="admin-login" role="status">Kontrollerar inloggning…</div>
  if (session) return <AdminContext.Provider value={{ logout }}>{children}</AdminContext.Provider>

  return (
    <div className="admin-login min-h-screen flex items-center justify-center bg-gray-50 dark:bg-brynas-black py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="admin-login__card max-w-md w-full space-y-8">
        <h2 className="admin-login__title mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          {t('adminDashboard')}
        </h2>
        <form className="admin-login__form mt-8 space-y-6" onSubmit={(event) => { void handleLogin(event) }}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Användarnamn</label>
              <input
                id="username" type="text" required autoComplete="username"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-brynas-dark-3 dark:bg-brynas-dark-2 placeholder-gray-500 dark:placeholder-brynas-muted text-gray-900 dark:text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Användarnamn" value={username} onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Lösenord</label>
              <input
                id="password" type="password" required autoComplete="current-password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-brynas-dark-3 dark:bg-brynas-dark-2 placeholder-gray-500 dark:placeholder-brynas-muted text-gray-900 dark:text-white rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Lösenord" value={password} onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>
          {error && <div className="admin-login__error text-red-500 text-sm" role="alert">{error}</div>}
          <button type="submit" className="admin-login__submit group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-[var(--bb-color-teal-600)] dark:hover:bg-[var(--bb-color-teal-700)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Logga in
          </button>
        </form>
      </div>
    </div>
  )
}
