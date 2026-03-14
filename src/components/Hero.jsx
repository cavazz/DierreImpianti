import { motion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } } }
const up = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } } }

export default function Hero() {
  const go = id => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      aria-label="Intestazione"
      className="relative min-h-screen flex flex-col bg-dark overflow-hidden">

      {/* Subtle noise grain overlay */}
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundSize: '200px 200px' }}/>

      {/* Orange accent top-left corner */}
      <div aria-hidden="true" className="absolute top-0 left-0 w-1 h-32 bg-accent"/>

      {/* Main content — fills remaining height after navbar */}
      <div className="flex-1 flex flex-col justify-center container-xl pt-24 pb-16 md:pt-28">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-20 items-center min-h-[70vh]">

          {/* ── Left: big typographic statement ── */}
          <motion.div variants={stagger} initial="hidden" animate="show"
            className="flex flex-col justify-center py-8 lg:py-0 lg:border-r lg:border-white/8 lg:pr-20">

            <motion.div variants={up} className="mb-8 lg:mb-10">
              <span className="inline-flex items-center gap-2 text-white/35 text-[11px] font-bold tracking-[0.2em] uppercase">
                <MapPin size={11} aria-hidden="true" className="text-accent"/>
                Piove di Sacco · Padova
              </span>
            </motion.div>

            <motion.h1 variants={up}
              className="font-display font-black text-white leading-[0.92] tracking-[-0.04em] mb-8 lg:mb-12"
              style={{ fontSize: 'clamp(3.5rem, 9vw, 7.5rem)' }}>
              Impianti<br/>
              di qualità<br/>
              <span style={{ color: '#F97316' }}>superiore.</span>
            </motion.h1>

            {/* Thin decorative line */}
            <motion.div variants={up} aria-hidden="true"
              className="w-12 h-px bg-accent mb-8 lg:mb-12"/>

            <motion.div variants={up} className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => go('#servizi')} className="btn-primary">
                Scopri i Servizi
              </button>
              <button onClick={() => go('#contatti')} className="btn-ghost-light">
                Preventivo Gratuito
              </button>
            </motion.div>
          </motion.div>

          {/* ── Right: statement + details ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col justify-center gap-10 lg:gap-12 py-8 lg:py-0">

            <p className="font-display font-600 leading-snug text-white/50"
              style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)' }}>
              Professionisti degli impianti elettrici, fotovoltaico,
              domotica, sicurezza e automazioni dal 2003.
            </p>

            {/* Stats bar */}
            <div className="grid grid-cols-3 gap-0">
              {[
                ['2003',  'Anno di fondazione'],
                ['500+',  'Progetti completati'],
                ['100%',  'Lavori garantiti'],
              ].map(([n, l], i) => (
                <div key={l} className={`py-5 ${i > 0 ? 'border-l border-white/8 pl-6' : ''}`}>
                  <p className="font-display font-black text-white mb-1"
                    style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>{n}</p>
                  <p className="text-white/35 text-[11px] font-medium leading-snug tracking-wide">{l}</p>
                </div>
              ))}
            </div>

            {/* Trust checklist */}
            <ul className="space-y-2.5" role="list" aria-label="Punti di forza">
              {[
                'Installatori certificati e qualificati',
                'Preventivo gratuito senza impegno',
                'Rispetto delle normative vigenti',
              ].map(t => (
                <li key={t} className="flex items-center gap-3">
                  <span aria-hidden="true" className="w-4 h-4 rounded-full border border-accent/40 flex items-center justify-center flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"/>
                  </span>
                  <span className="text-white/45 text-sm font-medium">{t}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom border */}
      <div aria-hidden="true" className="h-px bg-white/8"/>

      {/* Scroll cue */}
      <motion.button
        onClick={() => go('#servizi')}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        aria-label="Vai ai servizi"
        className="absolute bottom-6 right-8 hidden md:flex items-center gap-2 text-white/25 hover:text-white/60 transition-colors text-[11px] font-bold tracking-[0.2em] uppercase">
        Scorri
        <ArrowRight size={12} aria-hidden="true"/>
      </motion.button>
    </section>
  )
}
