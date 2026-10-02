import axios from 'axios'

const adminClient = axios.create({
  baseURL: import.meta.env.DEV ? '' : '/brynasbilservice',
  withCredentials: true,
})

let csrfToken = ''

export function setAdminCsrfToken(token: string) {
  csrfToken = token
}

adminClient.interceptors.request.use((config) => {
  const method = (config.method || 'get').toLowerCase()
  if (csrfToken && !['get', 'head', 'options'].includes(method)) {
    config.headers.set('X-CSRF-Token', csrfToken)
  }
  return config
})

export type AdminSession = {
  username: string
  displayName: string
  csrfToken: string
}

export default adminClient
