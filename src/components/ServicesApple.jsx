import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SERVICES } from '../data/services'
import ServicesApple3D from './ServicesApple3D'

// ── Pill con descrizione interna (accordion) ──
function PillItem({ svc, isActive, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className="w-full text-left overflow-hidden transition-all duration-300"
      style={{
        background: isActive ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.03)',
        border: isActive ? `1px solid ${svc.color}55` : '1px solid rgba(255,255,255,0.08)',
        borderRadius: isActive ? 20 : 100,
        padding: isActive ? '14px 20px 18px' : '10px 20px',
      }}
    >
      {/* Header pill: cerchio + titolo */}
      <div className="flex items-center gap-3">
        <span
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold transition-all duration-300"
          style={{
            background: isActive ? svc.color : 'transparent',
            border: isActive ? 'none' : '1.5px solid rgba(255,255,255,0.3)',
            color: isActive ? '#000' : 'rgba(255,255,255,0.5)',
          }}
        >
          {isActive ? '−' : '+'}
        </span>
        <span
          className="text-[15px] font-medium transition-colors duration-200"
          style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.6)' }}
        >
          {svc.title}
        </span>
      </div>

      {/* Descrizione espansa dentro la pill */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="desc"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p
              className="text-[13px] leading-relaxed mt-3 pl-10"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              {svc.desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export default function ServicesApple() {
  const [active, setActive] = useState(0)

  const prev = useCallback(() => setActive(i => Math.max(0, i - 1)), [])
  const next = useCallback(() => setActive(i => Math.min(SERVICES.length - 1, i + 1)), [])

  return (
    <section className="bg-black min-h-screen flex items-center py-20 relative">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-0">

          {/* ── LEFT: frecce + pill list ── */}
          <div className="flex gap-4 md:gap-6 flex-shrink-0 md:w-[380px]">

            {/* Frecce (solo desktop) */}
            <div className="hidden md:flex flex-col justify-center gap-3">
              <motion.button
                onClick={prev}
                disabled={active === 0}
                aria-label="Servizio precedente"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  background: active === 0 ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: active === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.7)',
                  cursor: active === 0 ? 'not-allowed' : 'pointer',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 11L3 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11 7H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </motion.button>
              <motion.button
                onClick={next}
                disabled={active === SERVICES.length - 1}
                aria-label="Servizio successivo"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  background: active === SERVICES.length - 1 ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: active === SERVICES.length - 1 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.7)',
                  cursor: active === SERVICES.length - 1 ? 'not-allowed' : 'pointer',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 7h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </motion.button>
            </div>

            {/* Pill list accordion */}
            <div className="flex-1 flex flex-col gap-2">
              {SERVICES.map((svc, i) => (
                <PillItem
                  key={svc.title}
                  svc={svc}
                  isActive={active === i}
                  onClick={() => setActive(i)}
                />
              ))}
            </div>
          </div>

          {/* ── RIGHT: canvas Three.js ── */}
          <div className="flex-1 flex items-center justify-center md:pl-10 mt-8 md:mt-0">
            <ServicesApple3D serviceIndex={active} color={SERVICES[active].color} />
          </div>

        </div>
      </div>
    </section>
  )
}
