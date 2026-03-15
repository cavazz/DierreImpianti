import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import LogoImage from './LogoImage'

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
  </svg>
)

export default function Footer() {
  const navigate = useNavigate()
  const year = new Date().getFullYear()

  const goHome = () => { navigate('/'); window.scrollTo({ top: 0 }) }
  const goServizi = () => {
    if (window.location.pathname !== '/') {
      navigate('/')
      setTimeout(() => document.querySelector('#servizi')?.scrollIntoView({ behavior: 'smooth' }), 150)
    } else {
      document.querySelector('#servizi')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-dark border-t border-white/6" role="contentinfo" aria-label="Piè di pagina">
      <div className="container-xl">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 pt-16 pb-14 border-b border-white/6">

          {/* Col 1 — Brand + Social */}
          <div>
            {/* Logo */}
            <button onClick={goHome} aria-label="Torna alla home" className="mb-5 block">
              <LogoImage className="h-10" />
            </button>

            <p className="text-text-s text-sm leading-relaxed mb-3">
              Professionisti degli impianti tecnologici nella provincia di Padova dal 2003.
            </p>

            <p className="text-text-xs text-xs font-mono mb-8">P.IVA 05181630285</p>

            {/* Social */}
            <p className="text-text-xs text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Seguici</p>
            <div className="flex items-center gap-3">
              <motion.a
                href="https://www.instagram.com/dierreimpianti/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Dierre Impianti su Instagram"
                className="relative w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden"
                style={{ border: '1.5px solid rgba(255,255,255,0.1)' }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                initial={false}
              >
                {/* Gradient bg on hover */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                  }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                />
                {/* Glow ring */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  initial={{ boxShadow: 'none' }}
                  whileHover={{ boxShadow: '0 0 20px rgba(220,39,67,0.5), 0 0 40px rgba(188,24,136,0.25)' }}
                  transition={{ duration: 0.25 }}
                />
                <motion.span
                  className="relative z-10"
                  style={{ color: 'rgba(240,244,248,0.6)' }}
                  whileHover={{ color: '#ffffff' }}
                  transition={{ duration: 0.2 }}
                >
                  <InstagramIcon />
                </motion.span>
              </motion.a>
            </div>
          </div>

          {/* Col 2 — Navigazione + Legale */}
          <div>
            <p className="text-text-xs text-[10px] font-bold uppercase tracking-[0.2em] mb-5">Navigazione</p>
            <ul className="space-y-3 mb-10" role="list">
              <li>
                <button onClick={goServizi}
                  className="text-text-s hover:text-text-p text-sm transition-colors duration-150 text-left">
                  Servizi
                </button>
              </li>
              <li>
                <Link to="/chi-siamo" className="text-text-s hover:text-text-p text-sm transition-colors duration-150">
                  Chi Siamo
                </Link>
              </li>
              <li>
                <Link to="/contatti" className="text-text-s hover:text-text-p text-sm transition-colors duration-150">
                  Contatti
                </Link>
              </li>
            </ul>

            <p className="text-text-xs text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Legale</p>
            <ul className="space-y-2.5" role="list">
              {[
                ['Privacy Policy',  '/privacy'],
                ['Cookie Policy',   '/cookie'],
                ['Accessibilità',   '/accessibilita'],
              ].map(([l, to]) => (
                <li key={to}>
                  <Link to={to} className="text-text-s hover:text-text-p text-sm transition-colors duration-150">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contatti */}
          <div>
            <p className="text-text-xs text-[10px] font-bold uppercase tracking-[0.2em] mb-5">Contatti</p>

            <a href="tel:+393473177613"
              className="group flex items-center gap-3.5 mb-7 p-4 rounded-xl transition-all duration-200"
              style={{ border: '1px solid rgba(56,189,248,0.18)', background: 'rgba(56,189,248,0.04)' }}>
              <span className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(56,189,248,0.14)' }}>
                <Phone size={16} className="text-accent" aria-hidden="true"/>
              </span>
              <div>
                <p className="text-text-xs text-[10px] font-bold uppercase tracking-widest mb-0.5">Chiama ora</p>
                <p className="font-display font-700 text-text-p text-base group-hover:text-accent transition-colors leading-tight">
                  +39 347 317 7613
                </p>
              </div>
            </a>

            <address className="not-italic space-y-4">
              <a href="mailto:info@dierreimpianti.it"
                className="flex items-center gap-3 text-text-s hover:text-text-p transition-colors duration-150">
                <Mail size={13} className="text-accent flex-shrink-0" aria-hidden="true"/>
                <span className="text-sm">info@dierreimpianti.it</span>
              </a>
              <a href="https://maps.google.com/?q=Via+Madonna+Della+Mercede+6+Piove+di+Sacco+PD"
                target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-3 text-text-s hover:text-text-p transition-colors duration-150">
                <MapPin size={13} className="text-accent flex-shrink-0 mt-0.5" aria-hidden="true"/>
                <span className="text-sm leading-relaxed">
                  Via Madonna Della Mercede 6<br/>
                  35028 Piove di Sacco (PD)
                  <span className="sr-only"> (apre Google Maps)</span>
                </span>
              </a>
              <div className="flex items-start gap-3 text-text-s">
                <Clock size={13} className="text-accent flex-shrink-0 mt-0.5" aria-hidden="true"/>
                <div className="text-sm leading-relaxed">
                  <p>Lun–Ven: 8:00 – 18:00</p>
                  <p>Sabato: 8:00 – 12:00</p>
                </div>
              </div>
            </address>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-xs text-xs">
            © {year} Dierre Impianti s.n.c. di Dainese Roberto
          </p>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Sito realizzato da ACWebD"
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/7 hover:border-white/14 transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.02)' }}>
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="animate-ping absolute inset-0 rounded-full bg-accent opacity-40"/>
              <span className="relative rounded-full h-1.5 w-1.5 bg-accent"/>
            </span>
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-text-xs group-hover:text-text-s transition-colors">
              Digital Experience by{' '}
              <span style={{
                background: 'linear-gradient(90deg, #60a5fa, #c084fc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>ACWebD</span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}
