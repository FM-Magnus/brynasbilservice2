import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import './css/index.css'
import App from './App.tsx'
import AdminDashboard from './pages/admin/Dashboard.tsx'
import { ProtectedRoute } from './components/admin/ProtectedRoute.tsx'
import BilarTillSalu from './pages/BilarTillSalu.tsx'
import ServicesPage from './pages/ServicesPage.tsx'
import ServiceReparationerPage from './pages/ServiceReparationerPage.tsx'
import BiltjansterPage from './pages/BiltjansterPage.tsx'
import DackservicePage from './pages/DackservicePage.tsx'
import AcServicePage from './pages/AcServicePage.tsx'
import BargningPage from './pages/BargningPage.tsx'
import AboutPage from './pages/AboutPage.tsx'
import ContactPage from './pages/ContactPage.tsx'

const basename = import.meta.env.DEV ? '/' : '/brynasbilservice'

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
          <Route path="/om-oss" element={<AboutPage />} />
          <Route path="/tjanster" element={<ServicesPage />} />
          <Route path="/service-reparationer" element={<ServiceReparationerPage />} />
          <Route path="/biltjanster" element={<BiltjansterPage />} />
          <Route path="/dackservice" element={<DackservicePage />} />
          <Route path="/ac-service" element={<AcServicePage />} />
          <Route path="/bargning" element={<BargningPage />} />
          <Route path="/kontakt" element={<ContactPage />} />
          <Route path="/bilar-till-salu" element={<BilarTillSalu />} />
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
