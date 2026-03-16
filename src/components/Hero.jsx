import { motion } from 'framer-motion'
import { MapPin, ChevronDown, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import CircuitBackground from './CircuitBackground'
import MotherboardBackground from './MotherboardBackground'

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } } }
const up = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } } }

export default function Hero() {
  const navigate = useNavigate()
  const go = id => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      aria-label="Intestazione"
      className="relative min-h-screen flex flex-col bg-dark overflow-hidden">

      {/* Radial glow — top center */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 55% at 50% -5%, rgba(56,189,248,0.07) 0%, transparent 65%)' }}/>

      {/* Sfondi */}
      <MotherboardBackground />
      <CircuitBackground />

      {/* ── Vignetta centrale — scurisce il circuito dietro al testo ── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-[1]"
        style={{ background: 'radial-gradient(ellipse 75% 80% at 50% 50%, rgba(13,21,32,0.72) 0%, transparent 100%)' }}/>

      {/* ── Contenuto + pulsanti centrati ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center container-xl py-28">
        <motion.div
          variants={stagger} initial="hidden" animate="show"
          className="flex flex-col items-center text-center max-w-3xl w-full mx-auto">

          {/* Location badge */}
          <motion.div variants={up} className="mb-8">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-bold tracking-[0.18em] uppercase cursor-default"
              style={{ border: '1px solid rgba(56,189,248,0.22)', background: 'rgba(56,189,248,0.06)', color: '#38bdf8' }}>
              <MapPin size={10} aria-hidden="true"/>
              Piove di Sacco · Padova · Dal 2003
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={up}
            className="font-display font-black text-text-p leading-[0.9] tracking-[-0.04em] mb-5"
            style={{ fontSize: 'clamp(3rem, 9.5vw, 7.5rem)' }}>
            Impianti<br/>
            <span className="gradient-text">tecnologici</span><br/>
            eccellenti.
          </motion.h1>

          {/* Glowing separator */}
          <motion.div variants={up} aria-hidden="true" className="my-7 h-px w-20"
            style={{ background: 'linear-gradient(90deg, transparent, #f5c430, #38bdf8, transparent)' }}/>

          {/* Subtitle */}
          <motion.p variants={up}
            className="text-text-s text-base md:text-lg leading-relaxed mb-10 max-w-lg">
            Elettricità, fotovoltaico, domotica, sicurezza e automazioni.
            Qualità certificata nella provincia di Padova.
          </motion.p>

          {/* ── CTA buttons ── */}
          <motion.div variants={up} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => go('#servizi')}
              className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2">
              Scopri i Servizi
              <ArrowRight size={16} aria-hidden="true"/>
            </button>
            <button
              onClick={() => { navigate('/contatti'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="btn-ghost-light w-full sm:w-auto">
              Preventivo Gratuito
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom border */}
      <div aria-hidden="true" className="h-px relative z-10" style={{ background: 'rgba(255,255,255,0.05)' }}/>

      {/* Scroll cue */}
      <motion.button
        onClick={() => go('#servizi')}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        aria-label="Vai ai servizi"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-text-xs hover:text-accent transition-colors duration-200 z-10 cursor-pointer">
        <span className="text-[10px] font-bold tracking-[0.22em] uppercase">Scorri</span>
        <ChevronDown size={14} aria-hidden="true" className="animate-bounce"/>
      </motion.button>
    </section>
  )
}
