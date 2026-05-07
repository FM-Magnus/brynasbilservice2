import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import './css/index.css'
import App from './App.tsx'
import AdminDashboard from './pages/admin/Dashboard.tsx'
import { ProtectedRoute } from './components/admin/ProtectedRoute.tsx'

const basename = process.env.NODE_ENV === 'development' ? '/' : '/brynasbilservice'

// Default to dark theme unless the user has explicitly opted into light.
if (localStorage.getItem('theme') !== 'light') {
  document.documentElement.classList.add('dark')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
