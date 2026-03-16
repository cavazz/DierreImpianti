import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Cookie, ShieldCheck, Type, ImageIcon, SlidersHorizontal } from 'lucide-react'

const KEY = 'dierre-cookies'

const CATS = [
  {
    id: 'necessary',
    Icon: ShieldCheck,
    label: 'Tecnici — sempre attivi',
    desc: 'Necessari al funzionamento del sito. Non disabilitabili.',
    locked: true,
  },
  {
    id: 'fonts',
    Icon: Type,
    label: 'Google Fonts',
    desc: 'Font tipografici da fonts.googleapis.com (sessione).',
    locked: false,
  },
  {
    id: 'images',
    Icon: ImageIcon,
    label: 'Immagini Unsplash',
    desc: 'Immagini dei servizi da images.unsplash.com (sessione).',
    locked: false,
  },
]

/* ── Variants ───────────────────────────────────────── */
const wrap = {
  hidden: { y: 80, opacity: 0, scale: 0.95 },
  visible: {
    y: 0, opacity: 1, scale: 1,
    transition: {
      type: 'spring', damping: 26, stiffness: 280,
      staggerChildren: 0.06, delayChildren: 0.04,
    },
  },
  exit: {
    y: 60, opacity: 0, scale: 0.97,
    transition: { duration: 0.22, ease: [0.32, 0, 0.67, 0] },
  },
}

const child = {
  hidden: { y: 10, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 30, stiffness: 360 } },
}

/* ── Toggle switch ──────────────────────────────────── */
function Toggle({ on, disabled, onChange }) {
  const active = disabled || on
  return (
    <button
      role="switch"
      aria-checked={on || disabled}
      disabled={disabled}
      onClick={onChange}
      className="relative flex-shrink-0 w-[38px] h-[22px] rounded-full transition-all duration-300"
      style={{
        background: active
          ? 'linear-gradient(135deg, #f5c430 0%, #38bdf8 100%)'
          : 'rgba(255,255,255,0.1)',
        border: `1px solid ${active ? 'transparent' : 'rgba(255,255,255,0.12)'}`,
        cursor: disabled ? 'default' : 'pointer',
        boxShadow: active ? '0 0 10px rgba(56,189,248,0.28)' : 'none',
      }}
      aria-label={disabled ? 'Sempre attivo' : undefined}
    >
      <span
        className="absolute top-[3px] w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300"
        style={{ left: active ? 'calc(100% - 19px)' : '3px' }}
      />
    </button>
  )
}

/* ── Banner ─────────────────────────────────────────── */
export default function CookieBanner() {
  const [show,     setShow]     = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [prefs,    setPrefs]    = useState({ fonts: true, images: true })

  useEffect(() => {
    if (!localStorage.getItem(KEY)) {
      const t = setTimeout(() => setShow(true), 1800)
      return () => clearTimeout(t)
    }
  }, [])

  const save = (data) => { localStorage.setItem(KEY, JSON.stringify(data)); setShow(false) }

  const acceptAll  = ()  => save({ necessary: true, fonts: true,        images: true })
  const rejectAll  = ()  => save({ necessary: true, fonts: false,       images: false })
  const saveCustom = ()  => save({ necessary: true, ...prefs })
  const toggle     = (id) => setPrefs(p => ({ ...p, [id]: !p[id] }))

  return (
    <AnimatePresence>
      {show && (
        /* ── Centered-bottom positioner ── */
        <div className="fixed bottom-0 left-0 right-0 flex justify-center items-end
                        px-4 pb-4 md:pb-6 z-[99] pointer-events-none">

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Preferenze cookie"
            variants={wrap}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-[560px] pointer-events-auto"
            style={{ position: 'relative' }}
          >
            {/* Ambient glow */}
            <div
              aria-hidden="true"
              className="absolute -inset-5 rounded-3xl opacity-[0.16] blur-2xl pointer-events-none"
              style={{ background: 'linear-gradient(135deg, #f5c430 0%, #38bdf8 100%)' }}
            />

            {/* Gradient border */}
            <div
              className="relative rounded-2xl p-px"
              style={{
                background: 'linear-gradient(135deg, rgba(245,196,48,0.42) 0%, rgba(56,189,248,0.42) 100%)',
              }}
            >
              {/* Glass card */}
              <div
                className="relative rounded-[15px] overflow-hidden px-5 py-5"
                style={{
                  background: 'rgba(10,17,28,0.93)',
                  backdropFilter: 'blur(28px)',
                  WebkitBackdropFilter: 'blur(28px)',
                }}
              >
                {/* Radial inner lights */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: [
                      'radial-gradient(ellipse 55% 45% at 100% 0%,   rgba(56,189,248,0.07) 0%, transparent 65%)',
                      'radial-gradient(ellipse 50% 40% at 0%   100%, rgba(245,196,48,0.055) 0%, transparent 65%)',
                    ].join(', '),
                  }}
                />

                {/* ── Header row ── */}
                <motion.div variants={child} className="flex items-start gap-3 mb-4">
                  <motion.div
                    whileHover={{ rotate: [0, -8, 8, -4, 0] }}
                    transition={{ duration: 0.5 }}
                    aria-hidden="true"
                    className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(245,196,48,0.13) 0%, rgba(56,189,248,0.13) 100%)',
                      border: '1px solid rgba(245,196,48,0.22)',
                      boxShadow: '0 0 14px rgba(245,196,48,0.1)',
                    }}
                  >
                    <Cookie size={16} style={{ color: '#f5c430' }} />
                  </motion.div>

                  <div>
                    <p
                      className="font-display font-bold text-sm leading-tight mb-0.5"
                      style={{
                        background: 'linear-gradient(90deg, #f5c430 0%, #38bdf8 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      Preferenze Cookie
                    </p>
                    <p className="text-[11.5px] leading-relaxed" style={{ color: 'rgba(138,164,192,0.8)' }}>
                      Usiamo cookie tecnici e di terze parti.{' '}
                      <Link
                        to="/cookie" onClick={rejectAll}
                        style={{ color: '#38bdf8' }}
                        className="hover:opacity-75 transition-opacity"
                      >
                        Cookie Policy
                      </Link>
                      <span style={{ color: 'rgba(138,164,192,0.35)' }}> · </span>
                      <Link
                        to="/privacy" onClick={rejectAll}
                        style={{ color: '#38bdf8' }}
                        className="hover:opacity-75 transition-opacity"
                      >
                        Privacy
                      </Link>
                    </p>
                  </div>
                </motion.div>

                {/* ── Expandable preferences ── */}
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      key="prefs"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div
                        className="mb-4 rounded-xl divide-y overflow-hidden"
                        style={{
                          border: '1px solid rgba(255,255,255,0.07)',
                          background: 'rgba(255,255,255,0.02)',
                          divideColor: 'rgba(255,255,255,0.06)',
                        }}
                      >
                        {CATS.map(({ id, Icon, label, desc, locked }, i) => (
                          <motion.div
                            key={id}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.06, type: 'spring', damping: 30, stiffness: 360 }}
                            className="flex items-center gap-3 px-4 py-3"
                            style={{
                              borderBottom: i < CATS.length - 1
                                ? '1px solid rgba(255,255,255,0.06)'
                                : 'none',
                            }}
                          >
                            <div
                              className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                              style={{
                                background: 'rgba(56,189,248,0.07)',
                                border: '1px solid rgba(56,189,248,0.14)',
                              }}
                            >
                              <Icon size={13} style={{ color: '#38bdf8' }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className="text-[11.5px] font-semibold font-display leading-tight"
                                style={{ color: locked ? 'rgba(240,244,248,0.5)' : '#f0f4f8' }}
                              >
                                {label}
                              </p>
                              <p className="text-[11px] leading-snug mt-0.5" style={{ color: 'rgba(138,164,192,0.6)' }}>
                                {desc}
                              </p>
                            </div>
                            <Toggle
                              on={locked ? true : prefs[id]}
                              disabled={locked}
                              onChange={() => toggle(id)}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── Actions row ── */}
                <motion.div variants={child} className="flex items-center gap-2">

                  {/* Personalizza */}
                  <motion.button
                    onClick={() => setExpanded(e => !e)}
                    whileHover={{ scale: 1.025 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', damping: 28, stiffness: 400 }}
                    aria-expanded={expanded}
                    className="flex items-center gap-1.5 flex-shrink-0 py-[10px] px-3.5
                               rounded-xl text-[11.5px] font-semibold font-display transition-all duration-200"
                    style={{
                      color:      expanded ? '#38bdf8' : 'rgba(240,244,248,0.55)',
                      background: expanded ? 'rgba(56,189,248,0.09)' : 'rgba(255,255,255,0.04)',
                      border:    `1px solid ${expanded ? 'rgba(56,189,248,0.28)' : 'rgba(255,255,255,0.09)'}`,
                    }}
                  >
                    <motion.span
                      animate={{ rotate: expanded ? 90 : 0 }}
                      transition={{ type: 'spring', damping: 26, stiffness: 320 }}
                      className="flex items-center"
                    >
                      <SlidersHorizontal size={12} />
                    </motion.span>
                    Personalizza
                  </motion.button>

                  {/* Solo necessari / Salva */}
                  <motion.button
                    onClick={expanded ? saveCustom : rejectAll}
                    whileHover={{ scale: 1.025 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', damping: 28, stiffness: 400 }}
                    className="flex-1 py-[10px] px-3 rounded-xl text-[11.5px] font-semibold
                               font-display transition-all duration-200"
                    style={{
                      color: 'rgba(240,244,248,0.65)',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background    = 'rgba(255,255,255,0.09)'
                      e.currentTarget.style.borderColor   = 'rgba(255,255,255,0.18)'
                      e.currentTarget.style.color         = 'rgba(240,244,248,0.88)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background    = 'rgba(255,255,255,0.05)'
                      e.currentTarget.style.borderColor   = 'rgba(255,255,255,0.1)'
                      e.currentTarget.style.color         = 'rgba(240,244,248,0.65)'
                    }}
                  >
                    {expanded ? 'Salva scelte' : 'Solo necessari'}
                  </motion.button>

                  {/* Accetta tutti */}
                  <motion.button
                    onClick={acceptAll}
                    whileHover={{ scale: 1.025, filter: 'brightness(1.1)' }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', damping: 28, stiffness: 400 }}
                    className="flex-1 py-[10px] px-3 rounded-xl text-[11.5px] font-bold font-display"
                    style={{
                      color: '#0d1520',
                      background: 'linear-gradient(135deg, #f5c430 0%, #38bdf8 100%)',
                      boxShadow: '0 4px 20px rgba(56,189,248,0.26), 0 1px 4px rgba(245,196,48,0.16)',
                    }}
                  >
                    Accetta tutti
                  </motion.button>

                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
