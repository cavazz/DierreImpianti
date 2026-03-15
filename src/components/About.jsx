import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Phone, Mail } from 'lucide-react'

const values = [
  'Installatori certificati e qualificati',
  'Garanzia su tutti i lavori eseguiti',
  'Interventi rapidi e puntuali',
  'Rispetto delle normative vigenti',
  'Materiali di prima qualità',
  'Assistenza tecnica post-vendita',
]

export default function About() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="chi-siamo" aria-labelledby="about-title" className="bg-bg">
      <div className="container-xl section-pad">

        {/* Header — mirrors Services header style */}
        <motion.header
          ref={ref}
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 pb-10 border-b border-border">
          <div>
            <span className="label">Chi Siamo</span>
            <h2 id="about-title"
              className="font-display font-black text-text-p"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', letterSpacing: '-0.035em', lineHeight: 1.08 }}>
              Professionalità<br/>dal 2003.
            </h2>
          </div>
          <p className="text-text-s text-base leading-relaxed md:max-w-xs md:text-right">
            Dalla progettazione alla manutenzione, un'unica impresa di fiducia nella provincia di Padova.
          </p>
        </motion.header>

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── Left: editorial story ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}>

            {/* Big display number */}
            <div className="mb-10" aria-hidden="true">
              <span
                className="font-display font-black leading-none select-none"
                style={{ fontSize: 'clamp(7rem, 18vw, 13rem)', color: '#f59e0b', letterSpacing: '-0.06em', lineHeight: 0.85 }}>
                20
              </span>
              <p className="text-text-s text-sm font-medium tracking-wide mt-3">
                anni di esperienza nel settore
              </p>
            </div>

            <p className="text-text-p text-base leading-relaxed mb-5" style={{ fontSize: '1.0625rem' }}>
              <strong className="font-display font-700">Dierre Impianti</strong> è l'impresa di{' '}
              <strong className="font-display font-700">Dainese Roberto</strong>, fondata nell'aprile 2003
              con l'obiettivo di fornire progettazione, realizzazione e manutenzione di impianti
              tecnologici nella provincia di Padova.
            </p>
            <p className="text-text-s text-base leading-relaxed mb-12">
              Dalla sede di <strong className="text-text-p font-medium">Piove di Sacco</strong> offriamo
              un servizio completo: dall'impianto elettrico civile al fotovoltaico industriale, dalla
              domotica alla sicurezza. Chiarezza e professionalità dalla progettazione all'assistenza post-vendita.
            </p>

            {/* Values list — editorial rows, no cards */}
            <div role="list" aria-label="I nostri valori">
              {values.map((v, i) => (
                <ValueRow key={v} text={v} index={i} inView={inView}/>
              ))}
            </div>
          </motion.div>

          {/* ── Right: company info ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:sticky lg:top-24 flex flex-col gap-0">

            {/* Company block */}
            <div className="pb-8 mb-8 border-b border-border">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-9 h-9 rounded-md bg-accent flex items-center justify-center flex-shrink-0"
                  aria-hidden="true">
                  <span className="text-white font-display font-black text-xs tracking-tighter">DR</span>
                </span>
                <div>
                  <p className="font-display font-700 text-text-p text-sm leading-tight">Dierre Impianti</p>
                  <p className="text-text-s text-xs">di Dainese Roberto</p>
                </div>
              </div>
              <dl className="space-y-0">
                {[
                  ['P.IVA',       '05181630285'],
                  ['Fondazione',  'Aprile 2003'],
                  ['Sede',        'Piove di Sacco (PD)'],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between py-3.5 border-b border-border last:border-0">
                    <dt className="text-text-xs text-[11px] font-bold uppercase tracking-[0.15em]">{k}</dt>
                    <dd className="text-text-p text-sm font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Contacts */}
            <address className="not-italic space-y-0">
              {[
                { Icon: Phone,  label: 'Telefono', value: '+39 347 317 7613',                                           href: 'tel:+393473177613',            ext: false },
                { Icon: Mail,   label: 'Email',    value: 'info@dierreimpianti.it',                                     href: 'mailto:info@dierreimpianti.it', ext: false },
                { Icon: MapPin, label: 'Indirizzo', value: 'Via Madonna Della Mercede 6\n35028 Piove di Sacco (PD)',    href: 'https://maps.google.com/?q=Via+Madonna+Della+Mercede+6+Piove+di+Sacco+PD', ext: true },
              ].map(({ Icon, label, value, href, ext }) => (
                <a
                  key={label}
                  href={href}
                  {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-start gap-4 py-4 border-b border-border last:border-0 group hover:bg-surface -mx-5 md:-mx-12 lg:-mx-20 px-5 md:px-12 lg:px-20 transition-colors duration-150">
                  <span className="w-8 h-8 rounded-lg bg-surface group-hover:bg-accent/10 flex items-center justify-center flex-shrink-0 transition-colors duration-150 mt-0.5"
                    aria-hidden="true">
                    <Icon size={14} className="text-accent"/>
                  </span>
                  <div>
                    <p className="text-text-xs text-[10px] font-bold uppercase tracking-[0.15em] mb-0.5">{label}</p>
                    <p className="text-text-p text-sm font-medium leading-relaxed whitespace-pre-line group-hover:text-accent transition-colors duration-150">
                      {value}
                      {ext && <span className="sr-only"> (apre Google Maps in una nuova scheda)</span>}
                    </p>
                  </div>
                </a>
              ))}
            </address>

            {/* Hours */}
            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-text-xs text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Orari di Lavoro</p>
              <dl>
                {[
                  ['Lunedì – Venerdì', '8:00 – 18:00', false],
                  ['Sabato',           '8:00 – 12:00', false],
                  ['Domenica',         'Chiuso',        true ],
                ].map(([d, h, closed]) => (
                  <div key={d} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                    <dt className="text-text-s text-sm">{d}</dt>
                    <dd className={`text-sm font-semibold tabular-nums ${closed ? 'text-text-xs' : 'text-text-p'}`}>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Availability pill */}
            <div className="mt-8 flex items-center gap-2.5" role="status" aria-label="Disponibile per nuovi lavori">
              <div className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-60"/>
                <span className="relative rounded-full h-2 w-2 bg-emerald-500"/>
              </div>
              <span className="text-text-s text-xs font-medium">Disponibile per nuovi lavori</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ValueRow({ text, index, inView }) {
  const ref = useRef(null)
  const rv  = useInView(ref, { once: true, margin: '-20px' })
  return (
    <motion.div
      ref={ref}
      role="listitem"
      initial={{ opacity: 0, x: -12 }}
      animate={(inView || rv) ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.1 + index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex items-center gap-4 py-3.5 border-b border-border last:border-0">
      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" aria-hidden="true"/>
      <span className="text-text-s text-sm font-medium">{text}</span>
    </motion.div>
  )
}
