import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { SERVICES } from '../data/services'

function ImageWithSkeleton({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <>
      {!loaded && (
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(110deg, #111827 30%, #1e293b 50%, #111827 70%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.6s infinite',
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        onLoad={() => setLoaded(true)}
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease' }}
      />
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// DESKTOP — identico Apple "Guardalo da vicino"
// Grande card arrotondata, foto full-bleed con zoom, pill sovrapposti a sx
// ─────────────────────────────────────────────────────────────────────────────

function DesktopServices() {
  const [active, setActive] = useState(0)
  const prev = useCallback(() => setActive(i => Math.max(0, i - 1)), [])
  const next = useCallback(() => setActive(i => Math.min(SERVICES.length - 1, i + 1)), [])

  return (
    <section style={{ background: '#000', padding: '96px 0 112px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px' }}>

        {/* Titolo sopra la card */}
        <h2 style={{
          fontSize: 'clamp(40px, 4.5vw, 56px)',
          fontWeight: 700,
          color: '#f5f5f7',
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          marginBottom: 32,
        }}>
          Guardalo da vicino.
        </h2>

        {/* ── CARD GRANDE — foto full + pill overlay ── */}
        <div style={{
          position: 'relative',
          borderRadius: 20,
          overflow: 'hidden',
          height: 660,
          background: '#111',
        }}>

          {/* FOTO — zoom punch in entrata + Ken Burns continuo stile Apple */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1,  scale: 1   }}
              exit={{    opacity: 0               }}
              transition={{
                opacity: { duration: 0.45, ease: 'easeOut' },
                scale:   { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
              }}
              style={{ position: 'absolute', inset: 0 }}
            >
              {/* Ken Burns: slow zoom continuo mentre la foto è visibile */}
              <ImageWithSkeleton
                src={SERVICES[active].photo}
                alt={SERVICES[active].title}
                className="ken-burns"
              />
            </motion.div>
          </AnimatePresence>

          {/* Gradiente laterale sinistro per leggibilità pill */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.38) 42%, transparent 68%)',
          }} />

          {/* ── CONTROLLI SOVRAPPOSTI — frecce + pill ── */}
          <div style={{
            position: 'absolute',
            left: 28,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12,
          }}>

            {/* Colonna frecce ↑ ↓ */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 4 }}>
              {[
                { fn: prev, dis: active === 0,                   path: 'M3 7.5L6 4.5l3 3' },
                { fn: next, dis: active === SERVICES.length - 1, path: 'M3 4.5L6 7.5l3-3' },
              ].map(({ fn, dis, path }, idx) => (
                <button
                  key={idx}
                  onClick={fn}
                  disabled={dis}
                  aria-label={idx === 0 ? 'Precedente' : 'Successivo'}
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: dis ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.14)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    color: dis ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.88)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: dis ? 'not-allowed' : 'pointer',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d={path} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              ))}
            </div>

            {/* Colonna pill — layout animation stile Apple */}
            <LayoutGroup>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {SERVICES.map((svc, i) => {
                const isActive = i === active
                return (
                  <motion.button
                    key={svc.n}
                    layout
                    onClick={() => setActive(i)}
                    style={{
                      textAlign: 'left',
                      cursor: 'pointer',
                      background: isActive ? 'rgba(18,18,18,0.9)' : 'rgba(18,18,18,0.65)',
                      backdropFilter: 'blur(22px)',
                      WebkitBackdropFilter: 'blur(22px)',
                      border: isActive
                        ? `1px solid rgba(255,255,255,0.18)`
                        : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: isActive ? 16 : 100,
                      padding: isActive ? '13px 16px 15px' : '8px 14px',
                      maxWidth: isActive ? 310 : undefined,
                      overflow: 'hidden',
                    }}
                    transition={{ layout: { duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] } }}
                  >
                    {/* Header pill */}
                    <motion.div layout="position" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{
                        width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                        background: isActive ? svc.color : 'rgba(255,255,255,0.16)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 13, fontWeight: 800, lineHeight: 1,
                        color: isActive ? '#000' : 'rgba(255,255,255,0.75)',
                        transition: 'background 0.3s, color 0.3s',
                      }}>
                        {isActive ? '−' : '+'}
                      </span>
                      <span style={{
                        fontSize: 14, fontWeight: isActive ? 600 : 500,
                        color: isActive ? '#fff' : 'rgba(255,255,255,0.8)',
                        whiteSpace: 'nowrap',
                        transition: 'color 0.2s',
                      }}>
                        {svc.title}
                      </span>
                    </motion.div>

                    {/* Descrizione espansa */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          key="desc"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
                          style={{ overflow: 'hidden' }}
                        >
                          <p style={{
                            fontSize: 13,
                            color: 'rgba(255,255,255,0.6)',
                            lineHeight: 1.62,
                            marginTop: 10,
                            paddingLeft: 32,
                            maxWidth: 270,
                          }}>
                            <strong style={{ color: '#fff', fontWeight: 600 }}>{svc.title}.</strong>
                            {' '}{svc.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                )
              })}
              </div>
            </LayoutGroup>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE — grande card con foto, pill orizzontali in basso, zoom su cambio
// ─────────────────────────────────────────────────────────────────────────────

function MobileServices() {
  const [active, setActive] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const pillsRef = useRef(null)
  const svc = SERVICES[active]

  // Auto-scroll pill attivo al centro
  useEffect(() => {
    const container = pillsRef.current
    if (!container) return
    const chip = container.children[active]
    if (!chip) return
    container.scrollTo({
      left: chip.offsetLeft - container.offsetWidth / 2 + chip.offsetWidth / 2,
      behavior: 'smooth',
    })
  }, [active])

  const selectService = (i) => {
    setExpanded(i === active ? !expanded : true)
    setActive(i)
  }

  return (
    <section style={{ background: '#000', padding: '72px 0 80px' }}>
      <div style={{ padding: '0 16px' }}>

        {/* Titolo */}
        <h2 style={{
          fontSize: 'clamp(36px, 9vw, 52px)',
          fontWeight: 700, color: '#f5f5f7',
          letterSpacing: '-0.03em', lineHeight: 1.05,
          marginBottom: 24,
        }}>
          Guardalo<br />da vicino.
        </h2>

        {/* ── CARD ── */}
        <div style={{
          position: 'relative',
          borderRadius: 18,
          overflow: 'hidden',
          height: 'clamp(320px, 70vw, 500px)',
          background: '#111',
        }}>

          {/* FOTO — zoom punch + Ken Burns stile Apple */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1,  scale: 1   }}
              exit={{    opacity: 0               }}
              transition={{
                opacity: { duration: 0.4, ease: 'easeOut' },
                scale:   { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
              }}
              style={{ position: 'absolute', inset: 0 }}
            >
              <ImageWithSkeleton src={svc.photo} alt={svc.title} className="ken-burns" />
            </motion.div>
          </AnimatePresence>

          {/* Gradiente basso */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.82) 100%)',
          }} />

          {/* Numero + tags in alto a sinistra */}
          <div style={{
            position: 'absolute', top: 16, left: 16,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{
              fontSize: 11, fontWeight: 700, color: svc.color,
              letterSpacing: '0.12em',
              background: `${svc.color}20`,
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              padding: '4px 10px', borderRadius: 20,
              border: `1px solid ${svc.color}30`,
            }}>
              {svc.n}
            </span>
          </div>

          {/* Titolo + frecce sovrapposti in basso */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '0 20px 20px',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`title-${active}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
                  {svc.tags}
                </p>
                <h3 style={{
                  fontSize: 'clamp(24px, 6vw, 34px)',
                  fontWeight: 700, color: '#fff',
                  letterSpacing: '-0.025em', lineHeight: 1.1, margin: 0,
                }}>
                  {svc.title}
                </h3>
              </motion.div>
            </AnimatePresence>

            {/* Frecce ↑ ↓ */}
            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
              {[
                { fn: () => setActive(i => Math.max(0, i - 1)), dis: active === 0, path: 'M3 7.5L6 4.5l3 3' },
                { fn: () => setActive(i => Math.min(SERVICES.length - 1, i + 1)), dis: active === SERVICES.length - 1, path: 'M3 4.5L6 7.5l3-3' },
              ].map(({ fn, dis, path }, idx) => (
                <button
                  key={idx} onClick={fn} disabled={dis}
                  style={{
                    width: 34, height: 34, borderRadius: '50%',
                    background: dis ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.16)',
                    backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    color: dis ? 'rgba(255,255,255,0.2)' : '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: dis ? 'not-allowed' : 'pointer',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d={path} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── PILL ORIZZONTALI scorribili ── */}
        <div
          ref={pillsRef}
          style={{
            display: 'flex', gap: 6,
            overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none',
            padding: '16px 0 4px',
            WebkitOverflowScrolling: 'touch',
          }}
          className="scrollbar-hide"
        >
          {SERVICES.map((s, i) => (
            <button
              key={s.n}
              onClick={() => selectService(i)}
              style={{
                flexShrink: 0,
                display: 'flex', alignItems: 'center', gap: 8,
                background: i === active ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
                border: i === active ? `1px solid ${s.color}55` : '1px solid rgba(255,255,255,0.08)',
                borderRadius: 100,
                padding: '8px 14px',
                cursor: 'pointer',
                transition: 'all 0.25s',
              }}
            >
              <span style={{
                width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                background: i === active ? s.color : 'rgba(255,255,255,0.14)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 800,
                color: i === active ? '#000' : 'rgba(255,255,255,0.6)',
              }}>
                {i === active ? '−' : '+'}
              </span>
              <span style={{
                fontSize: 13, fontWeight: 500,
                color: i === active ? '#fff' : 'rgba(255,255,255,0.55)',
                whiteSpace: 'nowrap',
              }}>
                {s.title}
              </span>
            </button>
          ))}
        </div>

        {/* ── DESCRIZIONE espansa (sotto i pill) ── */}
        <AnimatePresence mode="wait">
          {expanded && (
            <motion.div
              key={active}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 14,
                padding: '16px 18px',
                marginTop: 10,
              }}>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.62)', lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ color: '#fff' }}>{svc.title}.</strong>{' '}{svc.desc}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────────────────────────────────────

export default function ServicesApple() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const handler = e => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return isMobile ? <MobileServices /> : <DesktopServices />
}
