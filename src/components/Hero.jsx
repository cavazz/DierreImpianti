import { motion } from 'framer-motion'
import { MapPin, ChevronDown, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import CircuitBackground    from './CircuitBackground'
import MotherboardBackground from './MotherboardBackground'

/* ── Shared easing ─────────────────────────────────── */
const EASE_EXPO = [0.76, 0, 0.24, 1]

/* Fade-up variant for smaller elements */
const up = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1, delayChildren: 0.55 } },
}

/* ── Masked text line ──────────────────────────────── */
function MaskLine({ children, delay, className, style }) {
  return (
    <div className="overflow-hidden" style={{ paddingBottom: '0.06em' }}>
      <motion.span
        className={`block ${className ?? ''}`}
        initial={{ y: '108%' }}
        animate={{ y: '0%' }}
        transition={{ delay, duration: 0.88, ease: EASE_EXPO }}
        style={style}
      >
        {children}
      </motion.span>
    </div>
  )
}

/* ── Component ─────────────────────────────────────── */
export default function Hero() {
  const navigate = useNavigate()
  const go = id => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      aria-label="Intestazione"
      className="relative min-h-screen flex flex-col bg-dark overflow-hidden">

      {/* Radial glow — top */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 55% at 50% -5%, rgba(56,189,248,0.07) 0%, transparent 65%)' }}/>

      <MotherboardBackground />
      <CircuitBackground />

      {/* Vignetta centrale */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-[1]"
        style={{ background: 'radial-gradient(ellipse 75% 80% at 50% 50%, rgba(13,21,32,0.72) 0%, transparent 100%)' }}/>

      {/* ── Contenuto ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center container-xl py-28">
        <div className="flex flex-col items-center text-center max-w-3xl w-full mx-auto">

          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-8">
            <span
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                         text-[11px] font-bold tracking-[0.18em] uppercase cursor-default"
              style={{ border: '1px solid rgba(56,189,248,0.22)', background: 'rgba(56,189,248,0.06)', color: '#38bdf8' }}>
              <MapPin size={10} aria-hidden="true"/>
              Piove di Sacco · Padova · Dal 2003
            </span>
          </motion.div>

          {/* ── Headline — mask-reveal per linea ── */}
          <h1
            className="font-display font-black text-text-p tracking-[-0.04em] mb-5"
            style={{ fontSize: 'clamp(3rem, 9.5vw, 7.5rem)', lineHeight: 0.9 }}>
            <MaskLine delay={0.28}>Impianti</MaskLine>
            <MaskLine delay={0.38} className="gradient-text">tecnologici</MaskLine>
            <MaskLine delay={0.48}>eccellenti.</MaskLine>
          </h1>

          {/* Glowing separator */}
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.72, duration: 0.6, ease: EASE_EXPO }}
            className="my-7 h-px w-20 origin-center"
            style={{ background: 'linear-gradient(90deg, transparent, #f5c430, #38bdf8, transparent)' }}/>

          {/* Staggered lower content */}
          <motion.div variants={stagger} initial="hidden" animate="show"
            className="flex flex-col items-center w-full">

            {/* Subtitle */}
            <motion.p variants={up}
              className="text-text-s text-base md:text-lg leading-relaxed mb-10 max-w-lg">
              Elettricità, fotovoltaico, domotica, sicurezza e automazioni.
              Qualità certificata nella provincia di Padova.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={up} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <motion.button
                onClick={() => go('#servizi')}
                whileHover={{ scale: 1.03, filter: 'brightness(1.06)' }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2"
                style={{ transition: 'filter 0.2s, transform 0.15s' }}>
                Scopri i Servizi
                <ArrowRight size={16} aria-hidden="true"/>
              </motion.button>
              <motion.button
                onClick={() => { navigate('/contatti'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-ghost-light w-full sm:w-auto">
                Preventivo Gratuito
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom separator */}
      <div aria-hidden="true" className="h-px relative z-10" style={{ background: 'rgba(255,255,255,0.05)' }}/>

      {/* Scroll cue */}
      <motion.button
        onClick={() => go('#servizi')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        aria-label="Vai ai servizi"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center
                   gap-1.5 text-text-xs hover:text-accent transition-colors duration-200 z-10 cursor-pointer">
        <span className="text-[10px] font-bold tracking-[0.22em] uppercase">Scorri</span>
        <ChevronDown size={14} aria-hidden="true" className="animate-bounce"/>
      </motion.button>
    </section>
  )
}
