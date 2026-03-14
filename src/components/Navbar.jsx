import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const links = [
  { label: 'Home',      href: '#home' },
  { label: 'Servizi',   href: '#servizi' },
  { label: 'Chi Siamo', href: '#chi-siamo' },
  { label: 'Contatti',  href: '#contatti' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome   = location.pathname === '/'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 56)
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [location])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])

  const scrollTo = useCallback(href => {
    setOpen(false)
    if (!isHome) {
      navigate('/')
      setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 150)
      return
    }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }, [isHome, navigate])

  const solid = scrolled || open

  return (
    <>
      {/* Skip link for keyboard users */}
      <a href="#main-content" className="skip-link">Vai al contenuto principale</a>

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          solid
            ? 'bg-white/97 backdrop-blur-md border-b border-border shadow-[0_2px_20px_rgba(0,0,0,0.06)]'
            : 'bg-transparent'
        }`}
        role="banner">

        <nav className="max-w-7xl mx-auto px-5 md:px-12 flex items-center justify-between h-16 md:h-[70px]"
          aria-label="Navigazione principale">

          {/* Logo */}
          <button
            onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
            aria-label="Dierre Impianti – torna alla home">
            <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
              style={{ boxShadow: '0 4px 14px rgba(249,115,22,0.4)' }}>
              <span className="text-white font-black text-sm font-display leading-none tracking-tighter">DR</span>
            </div>
            <div className="hidden sm:block text-left">
              <p className={`font-display font-700 text-[0.9375rem] leading-tight transition-colors duration-300 ${solid ? 'text-text-p' : 'text-white'}`}>
                Dierre Impianti
              </p>
              <p className={`text-[11px] leading-none transition-colors duration-300 ${solid ? 'text-text-s' : 'text-white/55'}`}>
                di Dainese Roberto
              </p>
            </div>
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {links.map(l => (
              <li key={l.label}>
                <button
                  onClick={() => scrollTo(l.href)}
                  className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 group
                    ${solid ? 'text-text-s hover:text-text-p hover:bg-bg' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
                  {l.label}
                  <span className={`absolute bottom-1 left-4 right-4 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left
                    ${solid ? 'bg-accent' : 'bg-white/40'}`}/>
                </button>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => scrollTo('#contatti')}
              className={`hidden sm:flex btn-primary !py-2.5 !px-5 !text-sm`}>
              Preventivo Gratuito
            </button>

            <button
              onClick={() => setOpen(o => !o)}
              aria-label={open ? 'Chiudi menu' : 'Apri menu di navigazione'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={`md:hidden w-10 h-10 flex items-center justify-center rounded-xl border transition-all duration-200
                ${solid ? 'border-border text-text-s hover:bg-bg hover:text-text-p' : 'border-white/20 text-white/80 hover:bg-white/10 hover:text-white'}`}>
              {open ? <X size={18} aria-hidden="true"/> : <Menu size={18} aria-hidden="true"/>}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-dark-2/40 backdrop-blur-[2px] md:hidden"
              onClick={() => setOpen(false)}
              aria-hidden="true"/>

            <motion.div
              key="drawer"
              id="mobile-menu"
              role="dialog"
              aria-label="Menu di navigazione"
              aria-modal="true"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-full bg-white md:hidden flex flex-col"
              style={{ boxShadow: '-8px 0 40px rgba(0,0,0,0.12)' }}>

              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-border">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center"
                    style={{ boxShadow: '0 3px 10px rgba(249,115,22,0.4)' }}>
                    <span className="text-white font-black text-xs font-display">DR</span>
                  </div>
                  <span className="text-text-p font-display font-700 text-sm">Dierre Impianti</span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Chiudi menu"
                  className="w-9 h-9 flex items-center justify-center rounded-xl text-text-s hover:bg-bg hover:text-text-p transition-all duration-150">
                  <X size={18} aria-hidden="true"/>
                </button>
              </div>

              {/* Drawer links */}
              <nav className="flex-1 px-4 py-5 flex flex-col gap-1" aria-label="Navigazione mobile">
                {links.map(l => (
                  <button
                    key={l.label}
                    onClick={() => scrollTo(l.href)}
                    className="text-left px-4 py-3.5 rounded-xl text-text-p font-semibold text-base hover:bg-bg hover:text-accent transition-all duration-150">
                    {l.label}
                  </button>
                ))}
              </nav>

              {/* Drawer CTA */}
              <div className="px-5 pb-8 pt-4 border-t border-border">
                <button
                  onClick={() => scrollTo('#contatti')}
                  className="btn-primary w-full">
                  Richiedi Preventivo Gratuito
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
