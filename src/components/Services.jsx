import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap, Sun, Radio, Home, Wind, Network, Settings2, ShieldCheck, Flame, CloudLightning } from 'lucide-react'

const services = [
  {
    icon: Zap,
    num: '01',
    title: 'Impianti Elettrici',
    tags: 'Civile · Industriale · Manutenzione',
    desc: 'Progettazione e realizzazione di impianti elettrici civili e industriali. Adeguamento normativo e manutenzione programmata.',
  },
  {
    icon: Sun,
    num: '02',
    title: 'Fotovoltaico',
    tags: 'Civile · Industriale · Accumulo',
    desc: 'Impianti fotovoltaici residenziali e industriali con sistemi di accumulo energetico per massima autonomia.',
  },
  {
    icon: Home,
    num: '03',
    title: 'Domotica',
    tags: 'Smart Home · Controllo Remoto',
    desc: 'Sistemi domotici integrati per luci, clima, sicurezza e automazioni gestibili da qualsiasi dispositivo.',
  },
  {
    icon: ShieldCheck,
    num: '04',
    title: 'Sicurezza & TVCC',
    tags: 'Allarmi · Telecamere · Accessi',
    desc: 'Sistemi di allarme, videosorveglianza TVCC e controllo accessi per abitazioni, uffici e capannoni.',
  },
  {
    icon: Radio,
    num: '05',
    title: 'Antenne',
    tags: 'Digitale · Satellite · Sky',
    desc: 'Installazione antenne digitali, satellitari e Sky. Installatori Sky autorizzati per ogni tipo di struttura.',
  },
  {
    icon: Flame,
    num: '06',
    title: 'Antincendio',
    tags: 'Rilevazione · Segnalazione · CEI',
    desc: 'Progettazione e installazione di impianti di rilevazione incendio conformi alle normative vigenti.',
  },
  {
    icon: Wind,
    num: '07',
    title: 'Climatizzazione',
    tags: 'Split · Canalizzati · VRF',
    desc: 'Installazione e manutenzione di sistemi di condizionamento per residenziale, commerciale e industriale.',
  },
  {
    icon: Network,
    num: '08',
    title: 'Reti Dati',
    tags: 'LAN · Wi-Fi · Fibra Ottica',
    desc: 'Cablaggio strutturato, Wi-Fi professionale e fibra ottica per ogni tipo di ambiente e utilizzo.',
  },
  {
    icon: Settings2,
    num: '09',
    title: 'Automazioni',
    tags: 'Cancelli · Tapparelle · Accessi',
    desc: 'Automazione di cancelli, barriere e tapparelle integrabile con impianti domotici per massimo comfort.',
  },
  {
    icon: CloudLightning,
    num: '10',
    title: 'Parafulmine',
    tags: 'LPS · CEI 81 · Verifiche',
    desc: 'Progettazione LPS e installazione sistemi di protezione contro i fulmini con verifiche periodiche CEI 81.',
  },
]

function ServiceCard({ s, index }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const Icon   = s.icon

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 4) * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="card card-interactive p-6 flex flex-col gap-4 group"
      aria-label={`Servizio: ${s.title}`}>

      {/* Top row: icon + number */}
      <div className="flex items-start justify-between">
        <div className="icon-box group-hover:bg-accent/15 transition-colors duration-250">
          <Icon size={20} className="text-accent" aria-hidden="true"/>
        </div>
        <span className="font-display font-700 text-[0.6875rem] tracking-[0.1em] text-text-xs"
          aria-hidden="true">{s.num}</span>
      </div>

      {/* Text */}
      <div className="flex-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-s mb-2">{s.tags}</p>
        <h3 className="font-display font-700 text-text-p mb-2.5 leading-snug"
          style={{ fontSize: '1.0625rem' }}>{s.title}</h3>
        <p className="text-text-s text-sm leading-relaxed">{s.desc}</p>
      </div>

      {/* Bottom accent */}
      <div className="flex items-center gap-2 pt-4 border-t border-border">
        <span className="w-0 group-hover:w-5 h-0.5 bg-accent rounded-full transition-all duration-300 ease-out"
          aria-hidden="true"/>
        <span className="text-text-s group-hover:text-accent text-xs font-semibold transition-colors duration-200">
          Scopri il servizio
        </span>
      </div>
    </motion.article>
  )
}

export default function Services() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="servizi" aria-labelledby="svc-title" className="section-pad bg-bg">
      <div className="container-xl">

        {/* Section header */}
        <motion.header
          ref={ref}
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-18">
          <span className="label">I Nostri Servizi</span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <h2 id="svc-title"
              className="font-display font-black text-text-p"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', letterSpacing: '-0.03em', lineHeight: 1.12 }}>
              Un unico partner<br/>per ogni impianto.
            </h2>
            <p className="text-text-s text-base leading-relaxed md:max-w-xs md:text-right">
              Dalla progettazione alla manutenzione, copriamo ogni esigenza tecnica.
            </p>
          </div>
        </motion.header>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
          role="list" aria-label="Elenco servizi">
          {services.map((s, i) => (
            <div key={s.title} role="listitem">
              <ServiceCard s={s} index={i}/>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="text-center mt-12 text-text-s text-sm">
          Hai un'esigenza specifica?{' '}
          <button
            onClick={() => document.querySelector('#contatti')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-accent hover:text-accent-h font-bold underline underline-offset-2 transition-colors">
            Contattaci per una soluzione su misura
          </button>
        </motion.p>
      </div>
    </section>
  )
}
