import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'

const videos = [
  { id: 1, src: '/videos/video1.mp4', label: 'Impianto Fotovoltaico' },
  { id: 2, src: '/videos/video2.mp4', label: 'Wallbox'               },
  { id: 3, src: '/videos/video3.mp4', label: 'Pulizia Fotovoltaico'  },
  { id: 4, src: '/videos/video4.mp4', label: 'Automazioni'           },
]

/* ─── Slide fullscreen (desktop) ────────────────────────────────────────────── */
function Slide({ v, index, total }) {
  const vidRef = useRef(null)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-20%' })

  useEffect(() => {
    if (!vidRef.current) return
    if (inView) vidRef.current.play().catch(() => {})
    else { vidRef.current.pause(); vidRef.current.currentTime = 0 }
  }, [inView])

  return (
    <div
      ref={ref}
      className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center overflow-hidden"
      style={{ background: '#07101b' }}>

      {/* Numero gigante sfondo */}
      <span
        className="absolute font-display font-black text-white select-none pointer-events-none"
        style={{
          fontSize: 'clamp(18rem, 38vw, 52rem)',
          opacity: 0.03,
          letterSpacing: '-0.06em',
          lineHeight: 1,
          zIndex: 0,
        }}>
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Video portrait centrato */}
      <div
        className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl h-[clamp(260px,60vh,480px)] md:h-[min(90vh,800px)]"
        style={{ aspectRatio: '9/16', maxWidth: 'calc(100vw - 48px)', zIndex: 1 }}>

        <video
          ref={vidRef}
          src={v.src}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient basso */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(4,9,18,0.9) 0%, transparent 55%)' }}
        />

        {/* Label sul video */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-6">
          <p className="font-display font-black text-white leading-tight"
            style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', letterSpacing: '-0.02em' }}>
            {v.label}
          </p>
        </div>
      </div>

      {/* Contatore top-right — sotto la navbar (60px mobile, 80px desktop) */}
      <div className="absolute top-[72px] md:top-[88px] right-6 md:right-10 flex items-center gap-3" style={{ zIndex: 2 }}>
        <span className="font-mono text-xs text-white/40 tracking-widest">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      {/* Label top-left — sotto la navbar */}
      <div className="absolute top-[72px] md:top-[88px] left-6 md:left-10" style={{ zIndex: 2 }}>
        <span className="font-mono text-[10px] text-white/25 tracking-[0.2em] uppercase">
          I nostri lavori
        </span>
      </div>
    </div>
  )
}

/* ─── Card mobile ───────────────────────────────────────────────────────────── */
function MobileCard({ v, index }) {
  const ref    = useRef(null)
  const vidRef = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-60px' })

  useEffect(() => {
    if (!vidRef.current) return
    if (inView) vidRef.current.play().catch(() => {})
    else { vidRef.current.pause(); vidRef.current.currentTime = 0 }
  }, [inView])

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-2xl flex-shrink-0"
      style={{ height: '300px', aspectRatio: '9/16' }}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}>

      <div className="absolute inset-0 bg-[#0b1320]" />

      <video
        ref={vidRef}
        src={v.src}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 1 }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 2, background: 'linear-gradient(to top, rgba(6,11,20,0.9) 0%, transparent 60%)' }}
      />

      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4" style={{ zIndex: 3 }}>
        <p className="font-display font-700 text-white text-sm leading-tight">{v.label}</p>
      </div>
    </motion.div>
  )
}

/* ─── Sezione principale ────────────────────────────────────────────────────── */
export default function VideoCollage() {
  const sectionRef = useRef(null)
  const headerRef  = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })

  /* Scroll hijack: mappa scrollYProgress → translateX della strip */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const rawX = useTransform(
    scrollYProgress,
    [0, 1],
    ['0vw', `${-(videos.length - 1) * 100}vw`]
  )
  /* Spring leggero per morbidezza */
  const x = useSpring(rawX, { stiffness: 120, damping: 30, mass: 0.8 })

  /* Barra di progresso */
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <>
      {/* ── Header (fuori dallo scroll hijack) ── */}
      <section className="bg-[#07101b]">
        <div className="container-xl section-pad pb-0">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}>
            <span className="label">I nostri lavori</span>
            <h2
              className="font-display font-black text-white"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', letterSpacing: '-0.035em', lineHeight: 1.08 }}>
              Dal cantiere<br />al risultato.
            </h2>
            <p className="text-white/40 text-sm md:text-base leading-relaxed mt-4 max-w-sm">
              Guarda come lavoriamo, dal sopralluogo alla consegna dell'impianto finito.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Scroll hijack orizzontale — tutti i dispositivi ── */}
      <section
        ref={sectionRef}
        className="relative"
        style={{ height: `${videos.length * 100}vh` }}>

        {/* Sticky viewport */}
        <div className="sticky top-0 h-screen overflow-hidden">

          {/* Strip orizzontale */}
          <motion.div
            className="flex h-full"
            style={{ x, width: `${videos.length * 100}vw` }}>
            {videos.map((v, i) => (
              <Slide key={v.id} v={v} index={i} total={videos.length} />
            ))}
          </motion.div>

          {/* Barra progresso in basso */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-white/10 rounded-full overflow-hidden" style={{ zIndex: 10 }}>
            <motion.div
              className="h-full bg-accent rounded-full origin-left"
              style={{ width: progressWidth }}
            />
          </div>

          {/* Freccia scroll hint */}
          <motion.div
            className="absolute bottom-6 right-10 flex items-center gap-2 text-white/25 text-xs font-mono tracking-widest"
            style={{ zIndex: 10 }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}>
            SCROLL
            <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
              <path d="M0 5h18M14 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </motion.div>
        </div>
      </section>

    </>
  )
}
