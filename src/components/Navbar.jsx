import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Phone } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const links = [
  { label: 'Servizi',   href: '#servizi' },
  { label: 'Chi Siamo', href: '#chi-siamo' },
  { label: 'Contatti',  href: '#contatti' },
]

/* Hamburger animato — 3 linee che diventano X */
function Burger({ open, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.88 }}
      aria-label={open ? 'Chiudi menu' : 'Apri menu'}
      aria-expanded={open}
      className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-lg z-[60]"
      style={{ color: open ? '#f59e0b' : 'rgba(240,240,240,0.75)' }}>
      <motion.span
        animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.28, ease: [0.76, 0, 0.24, 1] }}
        className="block w-5 h-[1.5px] bg-current rounded-full origin-center"/>
      <motion.span
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.18 }}
        className="block w-5 h-[1.5px] bg-current rounded-full"/>
      <motion.span
        animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.28, ease: [0.76, 0, 0.24, 1] }}
        className="block w-5 h-[1.5px] bg-current rounded-full origin-center"/>
    </motion.button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome   = location.pathname === '/'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 64)
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [location])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])

  const go = useCallback(href => {
    setOpen(false)
    if (!isHome) {
      navigate('/')
      setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 150)
      return
    }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }, [isHome, navigate])

  return (
    <>
      <a href="#main-content" className="skip-link">Vai al contenuto</a>

      {/* ── Header fisso ── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-400 ${
          scrolled
            ? 'border-b border-white/6'
            : ''
        }`}
        style={scrolled ? { background: 'rgba(8,8,8,0.92)', backdropFilter: 'blur(16px)' } : {}}>

        <nav
          className="max-w-7xl mx-auto px-5 md:px-12 lg:px-20 flex items-center justify-between h-[60px] md:h-[64px]"
          aria-label="Navigazione principale">

          {/* Logo */}
          <motion.button
            onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="flex items-center gap-2.5 group"
            aria-label="Dierre Impianti – home"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}>
            <span
              className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 transition-shadow duration-300 group-hover:shadow-[0_0_12px_rgba(245,158,11,0.5)]"
              style={{ background: '#f59e0b' }}
              aria-hidden="true">
              <span className="text-dark font-display font-black text-xs tracking-tighter">DR</span>
            </span>
            <span className="font-display font-700 text-[0.875rem] tracking-tight text-text-p">
              Dierre Impianti
            </span>
          </motion.button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {links.map(l => (
              <li key={l.label} className="relative group">
                <button
                  onClick={() => go(l.href)}
                  className="text-[0.8125rem] font-semibold text-text-s hover:text-text-p transition-colors duration-200 py-1">
                  {l.label}
                </button>
                {/* Animated underline */}
                <span className="absolute -bottom-0.5 left-0 w-0 group-hover:w-full h-px bg-accent transition-all duration-300 ease-out"/>
              </li>
            ))}
          </ul>

          {/* CTA + Burger */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => go('#contatti')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden sm:inline-flex items-center gap-1.5 font-display font-700 text-[0.8125rem] px-4 py-2.5 rounded-md transition-all duration-200 bg-accent text-dark hover:bg-accent-h">
              Preventivo Gratuito
              <ArrowUpRight size={14} aria-hidden="true"/>
            </motion.button>

            <Burger open={open} onClick={() => setOpen(o => !o)}/>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile menu — full-screen con reveal circolare ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="fullscreen"
            role="dialog"
            aria-label="Menu mobile"
            aria-modal="true"
            initial={{ clipPath: 'circle(0px at calc(100% - 40px) 30px)' }}
            animate={{ clipPath: 'circle(200% at calc(100% - 40px) 30px)' }}
            exit={{ clipPath: 'circle(0px at calc(100% - 40px) 30px)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 flex flex-col md:hidden overflow-hidden"
            style={{ background: '#080808' }}>

            {/* Amber glow superiore */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 80% 40% at 50% -10%, rgba(245,158,11,0.09) 0%, transparent 70%)' }}/>

            {/* Top bar con logo + bottone chiudi */}
            <div className="flex items-center justify-between px-5 h-[60px] border-b border-white/5 relative z-10 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0"
                  style={{ background: '#f59e0b' }} aria-hidden="true">
                  <span className="text-dark font-display font-black text-[9px]">DR</span>
                </span>
                <span className="font-display font-700 text-text-p text-sm">Dierre Impianti</span>
              </div>
              <Burger open={open} onClick={() => setOpen(false)}/>
            </div>

            {/* Links — centrati verticalmente, grandi, con prefisso numerico */}
            <nav className="flex-1 flex flex-col justify-center px-7 gap-0 relative z-10" aria-label="Menu principale">
              {links.map((l, i) => (
                <motion.button
                  key={l.label}
                  onClick={() => go(l.href)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 + 0.2, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="group flex items-baseline gap-4 py-5 text-left w-full border-b border-white/5 last:border-0">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-text-xs group-hover:text-accent transition-colors duration-200 flex-shrink-0 w-5">
                    0{i + 1}
                  </span>
                  <span
                    className="font-display font-black text-white/25 group-hover:text-white transition-colors duration-250"
                    style={{ fontSize: 'clamp(1.9rem, 7vw, 2.6rem)', letterSpacing: '-0.03em' }}>
                    {l.label}
                  </span>
                </motion.button>
              ))}
            </nav>

            {/* Bottom — CTA + telefono */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.38, ease: 'easeOut' }}
              className="px-7 pt-5 pb-8 border-t border-white/5 relative z-10 flex-shrink-0 space-y-3">
              <button
                onClick={() => go('#contatti')}
                className="btn-primary w-full">
                Preventivo Gratuito
              </button>
              <a
                href="tel:+393473177613"
                className="flex items-center justify-center gap-2 text-text-s hover:text-accent transition-colors duration-200 text-sm font-medium py-1">
                <Phone size={13} aria-hidden="true"/>
                +39 347 317 7613
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
