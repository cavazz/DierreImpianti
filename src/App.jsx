import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { lazy, Suspense } from 'react'
import Navbar          from './components/Navbar'
import Hero            from './components/Hero'
import ServicesTeaser  from './components/ServicesTeaser'
import Footer          from './components/Footer'
import CookieBanner    from './components/CookieBanner'
import ScrollProgress  from './components/ScrollProgress'
import Cursor          from './components/Cursor'
import { usePageMeta } from './hooks/usePageMeta'

const About          = lazy(() => import('./components/About'))
const Contact        = lazy(() => import('./components/Contact'))
const Servizi        = lazy(() => import('./pages/Servizi'))
const Privacy        = lazy(() => import('./pages/Privacy'))
const Cookie         = lazy(() => import('./pages/Cookie'))
const Accessibilita  = lazy(() => import('./pages/Accessibilita'))
const TerminiServizio = lazy(() => import('./pages/TerminiServizio'))
const NotFound       = lazy(() => import('./pages/NotFound'))

function PageFallback() {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      </div>
    </div>
  )
}

/* ── Page transition wrapper ────────────────────────── */
function Page({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0,  transition: { duration: 0.4,  ease: [0.25, 0.46, 0.45, 0.94] } }}
      exit={{    opacity: 0, y: -8, transition: { duration: 0.22, ease: [0.55, 0,    1,    0.45] } }}
    >
      {children}
    </motion.div>
  )
}

function HomePage() {
  usePageMeta({
    title: 'Dierre Impianti | Impianti Elettrici · Padova',
    description: 'Dierre Impianti - Impianti elettrici, fotovoltaico, domotica, antenne, climatizzazione, reti dati e automazioni. Oltre 20 anni di esperienza nella provincia di Padova.',
  })
  return <Page><Hero /><ServicesTeaser /></Page>
}

/* ── Routes with AnimatePresence ────────────────────── */
function AppRoutes() {
  const location = useLocation()
  return (
    <Suspense fallback={<PageFallback />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"              element={<HomePage />} />
          <Route path="/servizi"       element={<Page><Servizi /></Page>} />
          <Route path="/chi-siamo"     element={<Page><About /></Page>} />
          <Route path="/contatti"      element={<Page><Contact /></Page>} />
          <Route path="/privacy"       element={<Page><Privacy /></Page>} />
          <Route path="/cookie"        element={<Page><Cookie /></Page>} />
          <Route path="/accessibilita" element={<Page><Accessibilita /></Page>} />
          <Route path="/termini"       element={<Page><TerminiServizio /></Page>} />
          <Route path="*"              element={<Page><NotFound /></Page>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  )
}

/* ── App ─────────────────────────────────────────────── */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollProgress />
      <Cursor />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <AppRoutes />
      </main>
      <Footer />
      <CookieBanner />
    </BrowserRouter>
  )
}
