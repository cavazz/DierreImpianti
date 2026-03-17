import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar          from './components/Navbar'
import Hero            from './components/Hero'
import ServicesTeaser  from './components/ServicesTeaser'
import About           from './components/About'
import Contact         from './components/Contact'
import Footer          from './components/Footer'
import CookieBanner    from './components/CookieBanner'
import ScrollProgress  from './components/ScrollProgress'
import Cursor          from './components/Cursor'
import Privacy         from './pages/Privacy'
import Cookie          from './pages/Cookie'
import Accessibilita   from './pages/Accessibilita'
import Servizi         from './pages/Servizi'

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
  return <Page><Hero /><ServicesTeaser /></Page>
}

/* ── Routes with AnimatePresence ────────────────────── */
function AppRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"              element={<HomePage />} />
        <Route path="/servizi"       element={<Page><Servizi /></Page>} />
        <Route path="/chi-siamo"     element={<Page><About /></Page>} />
        <Route path="/contatti"      element={<Page><Contact /></Page>} />
        <Route path="/privacy"       element={<Page><Privacy /></Page>} />
        <Route path="/cookie"        element={<Page><Cookie /></Page>} />
        <Route path="/accessibilita" element={<Page><Accessibilita /></Page>} />
      </Routes>
    </AnimatePresence>
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
