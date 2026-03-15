import { motion } from 'framer-motion'
import { MapPin, ChevronDown } from 'lucide-react'

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } } }
const up = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } } }

export default function Hero() {
  const go = id => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      aria-label="Intestazione"
      className="relative min-h-screen flex flex-col bg-dark overflow-hidden">

      {/* Amber radial glow — top center */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 55% at 50% -5%, rgba(245,158,11,0.07) 0%, transparent 65%)' }}/>

      {/* Subtle grid lines */}
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(245,158,11,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,1) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}/>

      {/* Main content — centered */}
      <div className="flex-1 flex flex-col items-center justify-center container-xl pt-24 pb-24">

        <motion.div variants={stagger} initial="hidden" animate="show"
          className="flex flex-col items-center text-center max-w-4xl w-full mx-auto">

          {/* Location badge */}
          <motion.div variants={up} className="mb-10">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-bold tracking-[0.18em] uppercase"
              style={{ border: '1px solid rgba(245,158,11,0.22)', background: 'rgba(245,158,11,0.06)', color: '#f59e0b' }}>
              <MapPin size={10} aria-hidden="true"/>
              Piove di Sacco · Padova · Dal 2003
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={up}
            className="font-display font-black text-text-p leading-[0.9] tracking-[-0.04em] mb-6"
            style={{ fontSize: 'clamp(3.6rem, 9.5vw, 7.5rem)' }}>
            Impianti<br/>
            <span style={{ color: '#f59e0b' }}>tecnologici</span><br/>
            eccellenti.
          </motion.h1>

          {/* Glowing separator */}
          <motion.div variants={up} aria-hidden="true" className="my-8 h-px w-20"
            style={{ background: 'linear-gradient(90deg, transparent, #f59e0b, transparent)' }}/>

          {/* Subtitle */}
          <motion.p variants={up}
            className="text-text-s text-lg leading-relaxed mb-10 max-w-lg">
            Elettricità, fotovoltaico, domotica, sicurezza e automazioni.
            Qualità certificata nella provincia di Padova.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={up} className="flex flex-col sm:flex-row gap-3 mb-16">
            <button onClick={() => go('#servizi')} className="btn-primary">
              Scopri i Servizi
            </button>
            <button onClick={() => go('#contatti')} className="btn-ghost-light">
              Preventivo Gratuito
            </button>
          </motion.div>

          {/* Stats bar */}
          <motion.div variants={up}
            className="w-full grid grid-cols-3 rounded-xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
            {[
              ['2003', 'Anno di fondazione'],
              ['500+', 'Progetti completati'],
              ['100%', 'Lavori garantiti'],
            ].map(([n, l], i) => (
              <div key={l} className="py-7 px-4 text-center"
                style={i > 0 ? { borderLeft: '1px solid rgba(255,255,255,0.06)' } : {}}>
                <p className="font-display font-black mb-1.5"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#f59e0b' }}>{n}</p>
                <p className="text-text-xs text-[11px] font-medium tracking-wide uppercase">{l}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom border */}
      <div aria-hidden="true" className="h-px" style={{ background: 'rgba(255,255,255,0.05)' }}/>

      {/* Scroll cue */}
      <motion.button
        onClick={() => go('#servizi')}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        aria-label="Vai ai servizi"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-text-xs hover:text-text-s transition-colors duration-200">
        <span className="text-[10px] font-bold tracking-[0.22em] uppercase">Scorri</span>
        <ChevronDown size={14} aria-hidden="true" className="animate-bounce"/>
      </motion.button>
    </section>
  )
}
