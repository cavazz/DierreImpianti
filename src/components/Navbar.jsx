import { useEffect, useCallback, useRef, useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { ArrowUpRight, Phone } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const links = [
  { label: 'Servizi',   href: '/servizi' },
  { label: 'Chi Siamo', href: '/chi-siamo' },
  { label: 'Contatti',  href: '/contatti' },
]

/* ── Easing curves ── */
const EXPO    = [0.16, 1, 0.3, 1]       // expo out — veloce poi morbido
const SNAP    = [0.76, 0, 0.24, 1]      // snap — F1 like
const SMOOTH  = [0.4, 0, 0.2, 1]        // material smooth

/* ── Variants menu overlay ── */
const overlayVariants = {
  open: (origin) => ({
    clipPath: `circle(200% at ${origin})`,
    transition: { duration: 0.7, ease: SNAP },
  }),
  closed: (origin) => ({
    clipPath: `circle(0px at ${origin})`,
    transition: { duration: 0.55, ease: SNAP, when: 'afterChildren' },
  }),
}

/* ── Variants separatori (scaleX) ── */
const ruleVariants = {
  open:   (i) => ({ scaleX: 1,   transition: { duration: 0.6,  ease: EXPO, delay: 0.18 + i * 0.06 } }),
  closed: (i) => ({ scaleX: 0,   transition: { duration: 0.25, ease: SMOOTH, delay: i * 0.03 } }),
}

/* ── Variants numero e testo ── */
const numVariants = {
  open:   (i) => ({ opacity: 1, x: 0,          transition: { duration: 0.4,  ease: EXPO,   delay: 0.26 + i * 0.08 } }),
  closed: (i) => ({ opacity: 0, x: -12,         transition: { duration: 0.2,  ease: SMOOTH, delay: i * 0.03 } }),
}
const textVariants = {
  open:   (i) => ({ y: '0%',   transition: { duration: 0.65, ease: EXPO,   delay: 0.28 + i * 0.09 } }),
  closed: (i) => ({ y: '110%', transition: { duration: 0.25, ease: SMOOTH, delay: i * 0.03 } }),
}

/* ── Variants bottom CTA ── */
const botVariants = {
  open:   { opacity: 1, y: 0,  transition: { duration: 0.5,  ease: EXPO,   delay: 0.58 } },
  closed: { opacity: 0, y: 16, transition: { duration: 0.2,  ease: SMOOTH } },
}

export default function Navbar() {
  const [open, setOpen]         = useState(false)
  const [origin, setOrigin]     = useState('calc(100% - 48px) 40px')
  const [scrolled, setScrolled] = useState(false)
  const [prevScrolled, setPrev] = useState(false)
  const location                = useLocation()
  const navigate                = useNavigate()
  const menuBtnRef              = useRef(null)

  useEffect(() => { setOpen(false) }, [location])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])

  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY > 60
      setScrolled(curr => { if (curr !== s) setPrev(curr); return s })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openMenu = useCallback(() => {
    if (menuBtnRef.current) {
      const r = menuBtnRef.current.getBoundingClientRect()
      setOrigin(`${Math.round(r.left + r.width / 2)}px ${Math.round(r.top + r.height / 2)}px`)
    }
    setOpen(true)
  }, [])

  const go = useCallback((href) => {
    setOpen(false)
    navigate(href)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [navigate])

  const scaleAnim = scrolled && !prevScrolled ? [0.94, 1.02, 1] : 1

  return (
    <>
      <a href="#main-content" className="skip-link">Vai al contenuto</a>

      {/* ══════════ NAVBAR BAR ══════════ */}
      <motion.header
        className="fixed top-0 inset-x-0 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: 1, y: 0,
          backgroundColor: scrolled ? 'rgba(4,6,14,0.98)' : 'rgba(0,0,0,0)',
          scaleY: scaleAnim,
          boxShadow: scrolled
            ? '0 1px 0 rgba(245,196,48,0.18), 0 8px 48px rgba(0,0,0,0.8)'
            : '0 0 0 rgba(0,0,0,0)',
        }}
        transition={{
          opacity:         { duration: 0.4, ease: 'easeOut' },
          y:               { duration: 0.45, ease: EXPO },
          backgroundColor: { duration: 0.35 },
          scaleY:          { duration: 0.45, ease: EXPO },
          boxShadow:       { duration: 0.35 },
        }}
        style={{ transformOrigin: 'top center' }}
      >
        <div
          className="max-w-7xl mx-auto px-5 md:px-12 flex items-center justify-between"
          style={{ height: scrolled ? '62px' : '80px', transition: `height 0.4s cubic-bezier(${SMOOTH})` }}
        >
          {/* LOGO */}
          <button onClick={() => go('/')} aria-label="Dierre Impianti – home"
            className="flex items-center gap-3 flex-shrink-0">
            <img src="/logo.svg" alt="" aria-hidden="true" draggable={false}
              style={{
                height: scrolled ? '40px' : '52px',
                width: 'auto', display: 'block',
                filter: 'brightness(0) invert(1)',
                transition: `height 0.4s cubic-bezier(${SMOOTH})`,
              }}
            />
            <div className="flex flex-col leading-none" style={{ gap: 3 }}>
              <span style={{
                fontFamily: 'Poppins, sans-serif', fontWeight: 900,
                fontSize: scrolled ? '1.35rem' : '1.65rem',
                letterSpacing: '-0.03em', color: '#fff', lineHeight: 1,
                transition: `font-size 0.4s cubic-bezier(${SMOOTH})`,
              }}>Dierre</span>
              <span style={{
                fontFamily: 'Poppins, sans-serif', fontWeight: 700,
                fontSize: '0.62rem', letterSpacing: '0.28em',
                textTransform: 'uppercase', lineHeight: 1,
                background: 'linear-gradient(90deg, #f5c430, #38bdf8)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Impianti</span>
            </div>
          </button>

          {/* LINKS desktop */}
          <LayoutGroup id="nav">
            <nav className="hidden md:flex items-center gap-1" aria-label="Navigazione principale">
              {links.map(l => {
                const active = location.pathname === l.href
                return (
                  <button key={l.label} onClick={() => go(l.href)}
                    className="relative px-5 py-2 rounded-lg select-none font-semibold"
                    style={{
                      fontSize: '0.92rem',
                      color: active ? '#fff' : 'rgba(255,255,255,0.58)',
                      transition: 'color 0.2s',
                    }}
                  >
                    {active && (
                      <motion.span layoutId="nav-active" className="absolute inset-0 rounded-lg"
                        style={{ background: 'rgba(245,196,48,0.1)', border: '1px solid rgba(245,196,48,0.25)' }}
                        transition={{ type: 'spring', stiffness: 420, damping: 38 }}
                      />
                    )}
                    <span className="relative z-10">{l.label}</span>
                  </button>
                )
              })}
            </nav>
          </LayoutGroup>

          {/* CTA + HAMBURGER */}
          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <motion.button onClick={() => go('/contatti')}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="hidden md:inline-flex items-center gap-2 font-black rounded-full select-none"
              style={{
                fontSize: '0.78rem',
                padding: scrolled ? '8px 20px' : '10px 24px',
                letterSpacing: '0.02em',
                background: 'linear-gradient(110deg, #f5c430 0%, #f0a500 40%, #38bdf8 100%)',
                color: '#04080f',
                boxShadow: '0 0 32px rgba(245,196,48,0.28)',
                transition: `padding 0.4s cubic-bezier(${SMOOTH})`,
              }}
            >
              Preventivo gratuito
              <ArrowUpRight size={13} strokeWidth={2.8} aria-hidden="true" />
            </motion.button>

            {/* Mobile MENU button */}
            <motion.button
              ref={menuBtnRef}
              onClick={() => open ? setOpen(false) : openMenu()}
              aria-label={open ? 'Chiudi menu' : 'Apri menu'}
              aria-expanded={open}
              className="md:hidden flex items-center select-none"
              animate={{
                backgroundColor: open ? 'rgba(245,196,48,0.12)' : 'rgba(255,255,255,0.07)',
                borderColor: open ? 'rgba(245,196,48,0.45)' : 'rgba(255,255,255,0.15)',
              }}
              whileTap={{ scale: 0.94 }}
              transition={{ duration: 0.22, ease: SMOOTH }}
              style={{
                gap: 10, paddingLeft: 14, paddingRight: 14,
                height: 42, borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              {/* MENU ↔ CLOSE slide verticale */}
              <div style={{ overflow: 'hidden', height: 13 }}>
                <motion.div
                  animate={{ y: open ? -13 : 0 }}
                  transition={open
                    ? { duration: 0.3,  ease: SNAP }
                    : { duration: 0.32, ease: EXPO, delay: 0.08 }
                  }
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  {['Menu', 'Close'].map((w, i) => (
                    <span key={w} style={{
                      display: 'block', height: 13, lineHeight: '13px',
                      fontFamily: 'Poppins, sans-serif', fontWeight: 800,
                      fontSize: '0.58rem', letterSpacing: '0.24em',
                      textTransform: 'uppercase',
                      color: i === 0 ? 'rgba(255,255,255,0.82)' : '#f5c430',
                    }}>{w}</span>
                  ))}
                </motion.div>
              </div>

              {/* Icona 3 linee → X
                  Contenitore h=14px. Centro geometrico = 7px.
                  Linea 1: top=0  → centro a 1px → delta verso centro = +6px
                  Linea 2: top=6  → centro a 7px → è già al centro
                  Linea 3: top=12 → centro a 13px → delta verso centro = -6px       */}
              <div style={{ width: 20, height: 14, position: 'relative', flexShrink: 0 }}>

                {/* Linea 1 */}
                <motion.span
                  animate={{
                    rotate: open ? 45  : 0,
                    y:      open ?  6  : 0,
                    scaleX: open ? 1.1 : 1,
                    backgroundColor: open ? '#f5c430' : '#ffffff',
                  }}
                  transition={open
                    ? { duration: 0.32, ease: SNAP }
                    : { type: 'spring', stiffness: 320, damping: 26 }
                  }
                  style={{
                    position: 'absolute', top: 0, left: 0,
                    width: 20, height: 2, borderRadius: 2,
                    transformOrigin: '50% 50%',
                  }}
                />

                {/* Linea centrale */}
                <motion.span
                  animate={{
                    opacity: open ? 0 : 1,
                    scaleX:  open ? 0 : 1,
                  }}
                  transition={open
                    ? { duration: 0.15, ease: SMOOTH }
                    // riappare DOPO che le altre hanno cominciato a tornare
                    : { duration: 0.28, ease: EXPO, delay: 0.14 }
                  }
                  style={{
                    position: 'absolute', top: 6, left: 0,
                    width: 20, height: 2, borderRadius: 2,
                    background: '#fff', transformOrigin: '50% 50%',
                  }}
                />

                {/* Linea 3 */}
                <motion.span
                  animate={{
                    rotate: open ? -45 : 0,
                    y:      open ?  -6 : 0,
                    scaleX: open ? 1.1 : 1,
                    backgroundColor: open ? '#f5c430' : '#ffffff',
                  }}
                  transition={open
                    ? { duration: 0.32, ease: SNAP }
                    : { type: 'spring', stiffness: 320, damping: 26 }
                  }
                  style={{
                    position: 'absolute', top: 12, left: 0,
                    width: 20, height: 2, borderRadius: 2,
                    transformOrigin: '50% 50%',
                  }}
                />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Accent line */}
        <motion.div
          animate={{ scaleX: scrolled ? 1 : 0, opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.55, ease: EXPO }}
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(245,196,48,0.55) 30%, rgba(56,189,248,0.55) 70%, transparent 100%)',
            transformOrigin: 'center',
          }}
        />
      </motion.header>

      {/* ══════════ MOBILE MENU ══════════ */}
      <AnimatePresence>
        {open && (
          <motion.aside
            key="mobile-nav"
            role="dialog" aria-label="Menu mobile" aria-modal="true"
            custom={origin}
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-[55] flex flex-col md:hidden"
            style={{ background: '#020408' }}
          >
            {/* Glows */}
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{
              background: [
                'radial-gradient(ellipse 70% 40% at 20% 10%, rgba(245,196,48,0.07) 0%, transparent 60%)',
                'radial-gradient(ellipse 60% 50% at 80% 90%, rgba(56,189,248,0.07) 0%, transparent 60%)',
              ].join(', '),
            }} />

            {/* Top bar */}
            <div className="flex-shrink-0 flex items-center justify-between px-5 h-[68px]">
              <div className="flex items-center gap-3">
                <img src="/logo.svg" alt="Dierre Impianti" draggable={false}
                  style={{ height: 34, width: 'auto', filter: 'brightness(0) invert(1) opacity(0.4)' }} />
                <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 700, fontSize: '0.82rem', fontFamily: 'Poppins, sans-serif' }}>
                  Dierre Impianti
                </span>
              </div>
              <motion.button onClick={() => setOpen(false)} whileTap={{ scale: 0.88 }}
                aria-label="Chiudi menu"
                className="flex items-center justify-center rounded-xl"
                style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {/* Mini X */}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <line x1="1" y1="1" x2="13" y2="13" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="13" y1="1" x2="1" y2="13" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </motion.button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 flex flex-col justify-center px-6" aria-label="Menu principale">
              {links.map((l, i) => {
                const active = location.pathname === l.href
                return (
                  <div key={l.label} className="relative">
                    {/* Separatore animato */}
                    <motion.div
                      className="h-px"
                      custom={i}
                      variants={ruleVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      style={{ background: 'rgba(255,255,255,0.07)', transformOrigin: 'left' }}
                    />

                    {/* Ghost number */}
                    <span aria-hidden="true"
                      className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none font-black leading-none"
                      style={{
                        fontSize: 'clamp(5rem, 24vw, 9rem)', fontFamily: 'Poppins, sans-serif',
                        color: active ? '#f5c430' : '#fff',
                        opacity: active ? 0.08 : 0.03, letterSpacing: '-0.05em',
                      }}
                    >
                      {i + 1}
                    </span>

                    <button onClick={() => go(l.href)}
                      className="group relative z-10 w-full flex items-center justify-between py-6 text-left"
                    >
                      <div className="flex items-center gap-5">
                        {/* Numero */}
                        <motion.span
                          className="font-mono font-black tabular-nums"
                          custom={i}
                          variants={numVariants}
                          initial="closed"
                          animate="open"
                          exit="closed"
                          style={{ fontSize: '9px', letterSpacing: '0.32em', color: active ? '#f5c430' : 'rgba(255,255,255,0.2)' }}
                        >
                          0{i + 1}
                        </motion.span>

                        {/* Testo con mask reveal */}
                        <div style={{ overflow: 'hidden', paddingBottom: '0.06em' }}>
                          <motion.span
                            className="block font-black"
                            custom={i}
                            variants={textVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            style={{
                              fontSize: 'clamp(2.2rem, 9vw, 3.2rem)',
                              letterSpacing: '-0.04em', lineHeight: 0.9,
                              fontFamily: 'Poppins, sans-serif',
                              color: active ? '#f5c430' : 'rgba(255,255,255,0.92)',
                            }}
                          >
                            {l.label}
                          </motion.span>
                        </div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, x: -4 }}
                        whileHover={{ opacity: 0.5, x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowUpRight size={18} style={{ color: '#f5c430' }} aria-hidden="true" />
                      </motion.div>
                    </button>
                  </div>
                )
              })}

              {/* Ultimo separatore */}
              <motion.div
                className="h-px"
                custom={links.length}
                variants={ruleVariants}
                initial="closed"
                animate="open"
                exit="closed"
                style={{ background: 'rgba(255,255,255,0.07)', transformOrigin: 'left' }}
              />
            </nav>

            {/* Bottom CTA */}
            <motion.div
              variants={botVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex-shrink-0 px-6 pt-4 pb-12 space-y-3"
            >
              <button onClick={() => go('/contatti')} className="btn-primary w-full rounded-full">
                Preventivo Gratuito
              </button>
              <a href="tel:+393473177613"
                className="flex items-center justify-center gap-2 text-sm font-medium py-1"
                style={{ color: 'rgba(240,244,248,0.28)' }}
              >
                <Phone size={13} aria-hidden="true" />
                +39 347 317 7613
              </a>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
