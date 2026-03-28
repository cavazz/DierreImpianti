import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { lazy, Suspense, useState } from 'react'
import SplashScreen    from './components/SplashScreen'
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

function SkeletonBlock({ className = '' }) {
  return (
    <div
      className={`rounded-lg bg-white/[0.04] relative overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </div>
  )
}

function PageFallback() {
  return (
    <div className="min-h-screen bg-dark pt-24 pb-16 px-5 md:px-12" aria-hidden="true">
      {/* Hero skeleton */}
      <div className="max-w-4xl mx-auto pt-20 mb-20 space-y-5">
        <SkeletonBlock className="h-4 w-24 mb-8" />
        <SkeletonBlock className="h-14 w-3/4" />
        <SkeletonBlock className="h-14 w-1/2" />
        <SkeletonBlock className="h-5 w-full max-w-lg mt-6" />
        <SkeletonBlock className="h-5 w-4/5 max-w-lg" />
        <div className="flex gap-3 pt-4">
          <SkeletonBlock className="h-12 w-40 rounded-full" />
          <SkeletonBlock className="h-12 w-32 rounded-full" />
        </div>
      </div>
      {/* Cards skeleton */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-white/[0.06] p-6 space-y-4">
            <SkeletonBlock className="h-10 w-10 rounded-xl" />
            <SkeletonBlock className="h-5 w-2/3" />
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-4/5" />
          </div>
        ))}
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
    path: '/',
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
  const [splashDone, setSplashDone] = useState(false)

  return (
    <BrowserRouter>
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
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
