import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const links = [
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

  const solid = scrolled || open

  return (
    <>
      <a href="#main-content" className="skip-link">Vai al contenuto</a>

      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          solid
            ? 'bg-white/96 backdrop-blur-md border-b border-border'
            : 'bg-transparent'
        }`}>

        <nav className="max-w-7xl mx-auto px-5 md:px-12 lg:px-20 flex items-center justify-between h-[60px] md:h-[64px]"
          aria-label="Navigazione principale">

          {/* Logo */}
          <button
            onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="flex items-center gap-3 group"
            aria-label="Dierre Impianti – home">
            <span className="w-8 h-8 rounded-md flex items-center justify-center bg-accent flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
              aria-hidden="true">
              <span className="text-white font-display font-black text-xs tracking-tighter">DR</span>
            </span>
            <span className={`font-display font-700 text-[0.875rem] tracking-tight transition-colors duration-300 ${solid ? 'text-text-p' : 'text-white'}`}>
              Dierre Impianti
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {links.map(l => (
              <li key={l.label}>
                <button
                  onClick={() => go(l.href)}
                  className={`text-[0.8125rem] font-semibold transition-colors duration-200 hover:text-accent ${
                    solid ? 'text-text-s' : 'text-white/60'
                  }`}>
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => go('#contatti')}
              className={`hidden sm:inline-flex items-center gap-1.5 font-display font-700 text-[0.8125rem] px-4 py-2.5 rounded-md transition-all duration-200 ${
                solid
                  ? 'bg-accent text-white hover:bg-accent-h'
                  : 'bg-white text-accent hover:bg-white/90'
              }`}>
              Preventivo Gratuito
              <ArrowUpRight size={14} aria-hidden="true"/>
            </button>

            <button
              onClick={() => setOpen(o => !o)}
              aria-label={open ? 'Chiudi menu' : 'Apri menu'}
              aria-expanded={open}
              className={`md:hidden w-9 h-9 flex items-center justify-center rounded-md border transition-all duration-200 ${
                solid
                  ? 'border-border text-text-s hover:text-text-p hover:bg-surface'
                  : 'border-white/20 text-white/70 hover:text-white hover:bg-white/10'
              }`}>
              {open ? <X size={17}/> : <Menu size={17}/>}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="bg"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/25 md:hidden"
              onClick={() => setOpen(false)}/>
            <motion.div
              key="panel"
              role="dialog" aria-label="Menu mobile" aria-modal="true"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white md:hidden flex flex-col"
              style={{ boxShadow: '-4px 0 32px rgba(0,0,0,0.1)' }}>

              <div className="flex items-center justify-between px-6 h-[60px] border-b border-border">
                <span className="font-display font-700 text-[0.875rem] text-text-p">Menu</span>
                <button onClick={() => setOpen(false)} aria-label="Chiudi"
                  className="w-8 h-8 flex items-center justify-center rounded-md text-text-s hover:bg-surface hover:text-text-p transition-all">
                  <X size={17}/>
                </button>
              </div>

              <nav className="flex-1 flex flex-col px-4 py-4 gap-0.5">
                {links.map(l => (
                  <button key={l.label} onClick={() => go(l.href)}
                    className="text-left px-4 py-3.5 rounded-md text-text-p font-semibold text-base hover:bg-surface hover:text-accent transition-all duration-150">
                    {l.label}
                  </button>
                ))}
              </nav>

              <div className="px-5 pb-8 pt-4 border-t border-border">
                <button onClick={() => go('#contatti')}
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
