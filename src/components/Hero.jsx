import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, CheckCircle } from 'lucide-react'
import EnergyWaves from './EnergyWaves'
import { HeroAnimation } from '../remotion/HeroAnimation'

const Player = lazy(() =>
  import('@remotion/player').then(m => ({ default: m.Player }))
)

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const trust = [
  'Installatori certificati',
  'Preventivo gratuito',
  'Garanzia su tutti i lavori',
  'Dal 2003',
]

export default function Hero() {
  const scrollTo = id => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      aria-label="Presentazione Dierre Impianti"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#0F172A' }}>

      {/* Subtle dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}/>

      {/* Top gradient glow */}
      <div aria-hidden="true" className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(249,115,22,0.12) 0%, transparent 60%)',
      }}/>

      {/* Energy waves */}
      <EnergyWaves aria-hidden="true"/>

      {/* Circuit animation */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ opacity: 0.45 }}>
        <Suspense fallback={null}>
          <Player
            component={HeroAnimation}
            inputProps={{ isDark: true }}
            durationInFrames={300}
            fps={30}
            compositionWidth={1920}
            compositionHeight={1080}
            style={{ width: '100%', height: '100%', background: 'transparent' }}
            loop autoPlay controls={false}
            showVolumeControls={false}
            clickToPlay={false}
            doubleClickToFullscreen={false}
          />
        </Suspense>
      </div>

      {/* Bottom vignette */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, rgba(15,23,42,0.3) 0%, transparent 30%, transparent 65%, rgba(15,23,42,0.95) 100%)',
      }}/>

      {/* ─── Content ─── */}
      <motion.div
        variants={stagger} initial="hidden" animate="show"
        className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 text-center flex flex-col items-center">

        {/* Location badge */}
        <motion.div variants={fadeUp} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.18em] uppercase"
            style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.25)', color: '#FB923C' }}>
            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-accent"/>
            Piove di Sacco · Provincia di Padova · Dal 2003
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="font-display font-black tracking-[-0.045em] text-white leading-[1.05] mb-7"
          style={{ fontSize: 'clamp(2.6rem, 8.5vw, 6.25rem)' }}>
          Professionisti<br/>
          degli impianti<br/>
          <span style={{ color: '#F97316' }}>tecnologici.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          className="max-w-2xl mx-auto mb-10 leading-relaxed font-sans"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'rgba(255,255,255,0.55)' }}>
          Impianti elettrici, fotovoltaico, domotica, sicurezza, antenne, climatizzazione,
          reti dati e automazioni. Qualità certificata in provincia di Padova.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-12 w-full sm:w-auto">
          <button onClick={() => scrollTo('#servizi')} className="btn-primary w-full sm:w-auto">
            Scopri i Servizi
          </button>
          <button onClick={() => scrollTo('#contatti')} className="btn-ghost-white w-full sm:w-auto">
            Richiedi Preventivo Gratuito
          </button>
        </motion.div>

        {/* Trust badges */}
        <motion.ul
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5"
          role="list"
          aria-label="Punti di forza">
          {trust.map(t => (
            <li key={t} className="flex items-center gap-2">
              <CheckCircle size={14} className="text-accent flex-shrink-0" aria-hidden="true"/>
              <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.55)' }}>{t}</span>
            </li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo('#servizi')}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        aria-label="Scorri verso i servizi"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer transition-opacity hover:opacity-70"
        style={{ color: 'rgba(255,255,255,0.3)' }}>
        <span className="text-[10px] font-bold tracking-[0.25em] uppercase font-display">Scorri</span>
        <motion.div aria-hidden="true" animate={{ y: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={14}/>
        </motion.div>
      </motion.button>
    </section>
  )
}
