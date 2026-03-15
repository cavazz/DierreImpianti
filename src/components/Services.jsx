import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Zap, Sun, Radio, Home, Wind, Network, Settings2, ShieldCheck, Flame, CloudLightning, Plus, Minus, ArrowUpRight } from 'lucide-react'

const services = [
  { icon: Zap,            n: '01', title: 'Impianti Elettrici',  tags: 'Civile · Industriale · Manutenzione', desc: 'Progettazione e realizzazione di impianti elettrici civili e industriali. Adeguamento normativo, messa a norma e manutenzione programmata.' },
  { icon: Sun,            n: '02', title: 'Fotovoltaico',         tags: 'Civile · Industriale · Accumulo',     desc: 'Installazione di impianti fotovoltaici residenziali e industriali con sistemi di accumulo energetico per massima autonomia.' },
  { icon: Home,           n: '03', title: 'Domotica',             tags: 'Smart Home · Controllo Remoto',       desc: 'Sistemi domotici integrati per il controllo di luci, clima, sicurezza e automazioni gestibili da qualsiasi dispositivo.' },
  { icon: ShieldCheck,    n: '04', title: 'Sicurezza & TVCC',     tags: 'Allarmi · Telecamere · Accessi',      desc: 'Sistemi di allarme, videosorveglianza TVCC e controllo accessi per abitazioni, uffici e capannoni industriali.' },
  { icon: Radio,          n: '05', title: 'Antenne',              tags: 'Digitale · Satellite · Sky',          desc: 'Installazione di antenne digitali terrestri, satellitari e Sky. Installatori Sky autorizzati per ogni tipo di struttura.' },
  { icon: Flame,          n: '06', title: 'Antincendio',          tags: 'Rilevazione · Segnalazione · CEI',    desc: 'Progettazione e installazione di impianti di rilevazione e segnalazione incendio conformi alle normative CEI vigenti.' },
  { icon: Wind,           n: '07', title: 'Climatizzazione',      tags: 'Split · Canalizzati · VRF',           desc: 'Installazione e manutenzione di sistemi di condizionamento per residenziale, commerciale e industriale.' },
  { icon: Network,        n: '08', title: 'Reti Dati',            tags: 'LAN · Wi-Fi · Fibra Ottica',          desc: 'Cablaggio strutturato, Wi-Fi professionale e infrastrutture in fibra ottica per ogni tipo di ambiente.' },
  { icon: Settings2,      n: '09', title: 'Automazioni',          tags: 'Cancelli · Tapparelle · Accessi',     desc: 'Automazione di cancelli, barriere, tapparelle e sistemi di controllo accessi, integrabile con impianti domotici.' },
  { icon: CloudLightning, n: '10', title: 'Parafulmine',          tags: 'LPS · CEI 81 · Verifiche',            desc: 'Progettazione e installazione di sistemi di protezione contro i fulmini (LPS). Verifiche periodiche secondo CEI 81.' },
]

/* Ticker strip */
function Ticker() {
  const items = services.flatMap(s => [s.title, '·'])
  return (
    <div className="bg-dark border-y border-white/8 py-4 overflow-hidden" aria-hidden="true">
      <div className="flex gap-0">
        <ul className="ticker-wrap animate-marquee flex-shrink-0" role="list">
          {items.map((t, i) => (
            <li key={i} className={`px-5 flex-shrink-0 text-[11px] font-bold tracking-[0.15em] uppercase whitespace-nowrap ${t === '·' ? 'text-accent' : 'text-white/30'}`}>
              {t}
            </li>
          ))}
        </ul>
        <ul className="ticker-wrap animate-marquee2 flex-shrink-0" aria-hidden="true" role="list">
          {items.map((t, i) => (
            <li key={i} className={`px-5 flex-shrink-0 text-[11px] font-bold tracking-[0.15em] uppercase whitespace-nowrap ${t === '·' ? 'text-accent' : 'text-white/30'}`}>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* Accordion row */
function Row({ s, index, active, setActive }) {
  const isOpen   = active === index
  const Icon     = s.icon
  const ref      = useRef(null)
  const inView   = useInView(ref, { once: true, margin: '-40px' })
  const navigate = useNavigate()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="border-b border-border last:border-b-0">

      <button
        onClick={() => setActive(isOpen ? null : index)}
        aria-expanded={isOpen}
        aria-controls={`svc-panel-${index}`}
        id={`svc-btn-${index}`}
        className="w-full flex items-center gap-4 md:gap-8 py-5 md:py-6 text-left group transition-all duration-200 hover:bg-surface -mx-5 md:-mx-12 lg:-mx-20 px-5 md:px-12 lg:px-20 focus-visible:bg-surface">

        {/* Number */}
        <span className={`font-display font-900 text-[11px] tracking-[0.1em] tabular-nums flex-shrink-0 transition-colors duration-200 ${isOpen ? 'text-accent' : 'text-text-xs group-hover:text-text-s'}`}>
          {s.n}
        </span>

        {/* Icon */}
        <span className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${isOpen ? 'bg-accent/15' : 'bg-surface group-hover:bg-accent/8'}`}
          aria-hidden="true">
          <Icon size={16} className={`transition-colors duration-200 ${isOpen ? 'text-accent' : 'text-text-s group-hover:text-accent'}`}/>
        </span>

        {/* Title + tags */}
        <div className="flex-1 min-w-0">
          <p className={`font-display font-700 leading-tight transition-colors duration-200 ${isOpen ? 'text-accent' : 'text-text-p'}`}
            style={{ fontSize: 'clamp(0.975rem, 2vw, 1.15rem)' }}>
            {s.title}
          </p>
          <p className="text-text-xs text-[11px] font-medium tracking-wide mt-0.5 hidden sm:block">{s.tags}</p>
        </div>

        {/* Toggle */}
        <span className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${isOpen ? 'bg-accent border-accent text-white' : 'border-border text-text-s group-hover:border-accent/30 group-hover:text-accent'}`}
          aria-hidden="true">
          {isOpen ? <Minus size={14}/> : <Plus size={14}/>}
        </span>
      </button>

      {/* Expandable panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="panel"
            id={`svc-panel-${index}`}
            role="region"
            aria-labelledby={`svc-btn-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden">
            <div className="pb-7 pl-[calc(1rem+36px+2rem)] md:pl-[calc(2rem+36px+2rem)] lg:pl-[calc(5rem+36px+2rem)] pr-14">
              <p className="text-text-s leading-relaxed mb-5" style={{ fontSize: '0.9375rem' }}>{s.desc}</p>
              <button
                onClick={() => { navigate('/contatti'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                className="inline-flex items-center gap-1.5 text-accent hover:text-accent-h font-display font-700 text-[0.875rem] transition-colors">
                Richiedi informazioni
                <ArrowUpRight size={14} aria-hidden="true"/>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Services() {
  const [active, setActive] = useState(null)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <>
      <Ticker/>

      <section id="servizi" aria-labelledby="svc-title" className="bg-bg">
        <div className="container-xl section-pad">

          {/* Header */}
          <motion.header
            ref={ref}
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 pb-10 border-b border-border">

            <div>
              <span className="label">Cosa facciamo</span>
              <h2 id="svc-title"
                className="font-display font-black text-text-p"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', letterSpacing: '-0.035em', lineHeight: 1.08 }}>
                10 servizi.<br/>Un solo partner.
              </h2>
            </div>

            <p className="text-text-s text-base leading-relaxed md:max-w-xs md:text-right">
              Dalla progettazione alla manutenzione, ogni impianto è realizzato con cura e competenza.
            </p>
          </motion.header>

          {/* Accordion */}
          <div role="list" aria-label="Elenco servizi">
            {services.map((s, i) => (
              <div key={s.title} role="listitem">
                <Row s={s} index={i} active={active} setActive={setActive}/>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
