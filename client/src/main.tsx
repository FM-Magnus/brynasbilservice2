import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import './css/index.css'
import './styles/design-tokens.css'
import './styles/shared-elements.css'
import App from './App.tsx'
import { ProtectedRoute } from './components/admin/ProtectedRoute.tsx'

// Every route below `/` is code-split: each page's JS only downloads when a
// visitor actually navigates there, instead of every page shipping in one
// bundle on every page load. See docs/DESIGN_SYSTEM.md#js-code-splitting.
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard.tsx'))
const BilarTillSalu = lazy(() => import('./pages/BilarTillSalu.tsx'))
const ServicesPage = lazy(() => import('./pages/ServicesPage.tsx'))
const ServiceReparationerPage = lazy(() => import('./pages/ServiceReparationerPage.tsx'))
const BiltjansterPage = lazy(() => import('./pages/BiltjansterPage.tsx'))
const FelsokningPage = lazy(() => import('./pages/FelsokningPage.tsx'))
const OljebytePage = lazy(() => import('./pages/OljebytePage.tsx'))
const KamremPage = lazy(() => import('./pages/KamremPage.tsx'))
const KopplingPage = lazy(() => import('./pages/KopplingPage.tsx'))
const BromssystemPage = lazy(() => import('./pages/BromssystemPage.tsx'))
const BilbatteriPage = lazy(() => import('./pages/BilbatteriPage.tsx'))
const StodampareFjadrarPage = lazy(() => import('./pages/StodampareFjadrarPage.tsx'))
const HjullagerbytePage = lazy(() => import('./pages/HjullagerbytePage.tsx'))
const AvgassystemPage = lazy(() => import('./pages/AvgassystemPage.tsx'))
const DrivaxelDrivknutarPage = lazy(() => import('./pages/DrivaxelDrivknutarPage.tsx'))
const StyrningKullederPage = lazy(() => import('./pages/StyrningKullederPage.tsx'))
const DackservicePage = lazy(() => import('./pages/DackservicePage.tsx'))
const AcServicePage = lazy(() => import('./pages/AcServicePage.tsx'))
const BargningPage = lazy(() => import('./pages/BargningPage.tsx'))
const AboutPage = lazy(() => import('./pages/AboutPage.tsx'))
const ContactPage = lazy(() => import('./pages/ContactPage.tsx'))
const GalleryPage = lazy(() => import('./pages/GalleryPage.tsx'))

function RouteFallback() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--redesign-page)',
      }}
      aria-busy="true"
      aria-label="Laddar sidan"
    />
  )
}

const basename = import.meta.env.DEV ? '/' : '/brynasbilservice'

// Default to dark theme unless the user has explicitly opted into light.
if (localStorage.getItem('theme') !== 'light') {
  document.documentElement.classList.add('dark')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <LanguageProvider>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/om-oss" element={<AboutPage />} />
            <Route path="/galleri" element={<GalleryPage />} />
            <Route path="/tjanster" element={<ServicesPage />} />
            <Route path="/service-reparationer" element={<ServiceReparationerPage />} />
            <Route path="/biltjanster" element={<BiltjansterPage />} />
            <Route path="/felsokning" element={<FelsokningPage />} />
            <Route path="/oljebyte" element={<OljebytePage />} />
            <Route path="/kamrem" element={<KamremPage />} />
            <Route path="/koppling" element={<KopplingPage />} />
            <Route path="/bromssystem" element={<BromssystemPage />} />
            <Route path="/bilbatteri" element={<BilbatteriPage />} />
            <Route path="/stodampare-fjadrar" element={<StodampareFjadrarPage />} />
            <Route path="/hjullagerbyte" element={<HjullagerbytePage />} />
            <Route path="/avgassystem" element={<AvgassystemPage />} />
            <Route path="/drivaxel-drivknutar" element={<DrivaxelDrivknutarPage />} />
            <Route path="/styrning-kulleder" element={<StyrningKullederPage />} />
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
        </Suspense>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
