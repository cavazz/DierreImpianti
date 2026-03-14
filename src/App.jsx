import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import Privacy from './pages/Privacy'
import Cookie from './pages/Cookie'
import Accessibilita from './pages/Accessibilita'

function HomePage() {
  return (<><Hero /><Services /><About /><Contact /></>)
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookie" element={<Cookie />} />
          <Route path="/accessibilita" element={<Accessibilita />} />
        </Routes>
      </main>
      <Footer />
      <CookieBanner />
    </BrowserRouter>
  )
}
