import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { ArrowUpRight, Phone } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import LogoImage from './LogoImage'

const links = [
  { label: 'Servizi',   href: '/servizi',   type: 'route' },
  { label: 'Chi Siamo', href: '/chi-siamo', type: 'route' },
  { label: 'Contatti',  href: '/contatti',  type: 'route' },
]

/* ── Hamburger ──────────────────────────────────────── */
function Burger({ open, onClick }) {
  const btnCtrl = useAnimation()
  const ln1Ctrl = useAnimation()
  const ln2Ctrl = useAnimation()
  const ln3Ctrl = useAnimation()
  const mounted = useRef(false)

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return }

    if (open) {
      ln1Ctrl.start({ rotate: 45,  y:  7, transition: { duration: 0.48, ease: [0.76, 0, 0.24, 1] } })
      ln2Ctrl.start({ opacity: 0, scaleX: 0, transition: { duration: 0.22 } })
      ln3Ctrl.start({ rotate: -45, y: -7, transition: { duration: 0.48, ease: [0.76, 0, 0.24, 1] } })
    } else {
      const spring = { type: 'spring', stiffness: 210, damping: 24, mass: 0.9 }
      ln1Ctrl.start({ rotate: 0, y: 0, transition: spring })
      ln3Ctrl.start({ rotate: 0, y: 0, transition: spring })
      ln2Ctrl.start({
        opacity: 1, scaleX: 1,
        transition: { duration: 0.28, delay: 0.14, ease: [0.25, 0.46, 0.45, 0.94] },
      })
      btnCtrl.start({ scale: 1, transition: { duration: 0 } })
    }
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.button
      onClick={onClick}
      animate={btnCtrl}
      whileTap={{ scale: 0.88 }}
      aria-label={open ? 'Chiudi menu' : 'Apri menu'}
      aria-expanded={open}
      className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-lg z-[60]"
      style={{ color: open ? '#38bdf8' : 'rgba(240,244,248,0.75)' }}>
      <motion.span animate={ln1Ctrl} initial={{ rotate: 0, y: 0 }}
        className="block w-5 h-[1.5px] bg-current rounded-full origin-center"/>
      <motion.span animate={ln2Ctrl} initial={{ opacity: 1, scaleX: 1 }}
        className="block w-5 h-[1.5px] bg-current rounded-full"/>
      <motion.span animate={ln3Ctrl} initial={{ rotate: 0, y: 0 }}
        className="block w-5 h-[1.5px] bg-current rounded-full origin-center"/>
    </motion.button>
  )
}

/* ── Navbar ─────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)
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

  const go = useCallback((href, type = 'scroll') => {
    setOpen(false)
    if (type === 'route') {
      navigate(href)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
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
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-400 ${scrolled ? 'border-b border-white/6' : ''}`}
        style={scrolled ? { background: 'rgba(13,21,32,0.92)', backdropFilter: 'blur(16px)' } : {}}>

        <nav
          className="max-w-7xl mx-auto px-5 md:px-12 lg:px-20 flex items-center justify-between h-[60px] md:h-[80px]"
          aria-label="Navigazione principale">

          {/* Logo */}
          <button
            onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            aria-label="Dierre Impianti – home">
            <LogoImage className="h-12 md:h-[60px]" />
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {links.map(l => (
              <li key={l.label} className="relative group">
                <button
                  onClick={() => go(l.href, l.type)}
                  className="text-[0.875rem] font-semibold text-text-s hover:text-text-p transition-colors duration-200 py-1">
                  {l.label}
                </button>
                <span className="absolute -bottom-0.5 left-0 w-0 group-hover:w-full h-px bg-accent transition-all duration-300 ease-out"/>
              </li>
            ))}
          </ul>

          {/* CTA + Burger */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => go('/contatti', 'route')}
              whileHover={{ scale: 1.03, filter: 'brightness(1.08)' }}
              whileTap={{ scale: 0.97 }}
              className="hidden sm:inline-flex items-center gap-1.5 font-display font-700 text-[0.875rem] px-5 py-3 rounded-md text-dark"
              style={{ background: 'linear-gradient(135deg, #f5c430 0%, #38bdf8 100%)', transition: 'filter 0.2s, transform 0.15s' }}>
              Preventivo Gratuito
              <ArrowUpRight size={14} aria-hidden="true"/>
            </motion.button>

            <Burger open={open} onClick={() => setOpen(o => !o)}/>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile fullscreen menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="fullscreen"
            role="dialog"
            aria-label="Menu mobile"
            aria-modal="true"
            initial={{ clipPath: 'circle(0px at calc(100% - 40px) 30px)' }}
            animate={{ clipPath: 'circle(200% at calc(100% - 40px) 30px)' }}
            exit={{    clipPath: 'circle(0px at calc(100% - 40px) 30px)' }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 flex flex-col md:hidden overflow-hidden"
            style={{ background: '#0d1520' }}>

            {/* Top glow */}
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{
              background: [
                'radial-gradient(ellipse 80% 35% at 50% -5%,  rgba(56,189,248,0.08) 0%, transparent 70%)',
                'radial-gradient(ellipse 60% 30% at 100% 110%, rgba(245,196,48,0.05) 0%, transparent 60%)',
              ].join(', '),
            }}/>

            {/* Decorative vertical line */}
            <motion.div
              aria-hidden="true"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.5, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="absolute left-7 top-[72px] bottom-[130px] w-px origin-top pointer-events-none"
              style={{ background: 'linear-gradient(180deg, rgba(56,189,248,0.18) 0%, rgba(245,196,48,0.08) 100%)' }}
            />

            {/* Top bar */}
            <div className="flex items-center justify-between px-5 h-[60px] border-b border-white/5 relative z-10 flex-shrink-0">
              <LogoImage className="h-8" />
              <Burger open={open} onClick={() => setOpen(false)}/>
            </div>

            {/* ── Nav links with mask-reveal ── */}
            <nav
              className="flex-1 flex flex-col justify-center px-7 relative z-10"
              aria-label="Menu principale">
              {links.map((l, i) => (
                <button
                  key={l.label}
                  onClick={() => go(l.href, l.type)}
                  className="group flex items-center gap-5 py-5 text-left w-full
                             border-b border-white/[0.06] last:border-0">

                  {/* Number — mask reveal */}
                  <div className="overflow-hidden flex-shrink-0 w-5">
                    <motion.span
                      initial={{ y: '130%' }}
                      animate={{ y: '0%' }}
                      transition={{ delay: 0.32 + i * 0.09, duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
                      className="block text-[10px] font-mono font-bold tracking-widest
                                 text-text-xs group-hover:text-accent transition-colors duration-200">
                      0{i + 1}
                    </motion.span>
                  </div>

                  {/* Title — mask reveal (core Lando animation) */}
                  <div className="overflow-hidden flex-1" style={{ paddingBottom: '0.05em' }}>
                    <motion.span
                      initial={{ y: '100%' }}
                      animate={{ y: '0%' }}
                      transition={{ delay: 0.26 + i * 0.09, duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
                      className="block font-display font-black
                                 text-white/20 group-hover:text-white transition-colors duration-[220ms]"
                      style={{ fontSize: 'clamp(2rem, 8.5vw, 2.9rem)', letterSpacing: '-0.03em' }}>
                      {l.label}
                    </motion.span>
                  </div>

                  {/* Arrow — mask reveal */}
                  <div className="overflow-hidden flex-shrink-0">
                    <motion.div
                      initial={{ y: '130%' }}
                      animate={{ y: '0%' }}
                      transition={{ delay: 0.55 + i * 0.09, duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200
                                 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight size={18} className="text-accent" aria-hidden="true"/>
                    </motion.div>
                  </div>
                </button>
              ))}
            </nav>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4, ease: 'easeOut' }}
              className="px-7 pt-5 pb-8 border-t border-white/5 relative z-10 flex-shrink-0 space-y-3">
              <button onClick={() => go('/contatti', 'route')} className="btn-primary w-full">
                Preventivo Gratuito
              </button>
              <a
                href="tel:+393473177613"
                className="flex items-center justify-center gap-2 text-text-s
                           hover:text-accent transition-colors duration-200 text-sm font-medium py-1">
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
