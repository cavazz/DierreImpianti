import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, ShieldCheck, Clock, CheckCircle2, Star, Headphones, MapPin, Phone, Mail, CalendarDays } from 'lucide-react'

const values = [
  { icon: Award,        text: 'Installatori certificati e qualificati' },
  { icon: ShieldCheck,  text: 'Garanzia su tutti i lavori eseguiti' },
  { icon: Clock,        text: 'Interventi rapidi e puntuali' },
  { icon: CheckCircle2, text: 'Rispetto delle normative vigenti' },
  { icon: Star,         text: 'Materiali di prima qualità' },
  { icon: Headphones,   text: 'Assistenza tecnica post-vendita' },
]

const contacts = [
  {
    icon: MapPin,
    label: 'Sede',
    value: 'Via Madonna Della Mercede 6\n35028 Piove di Sacco (PD)',
    href: 'https://maps.google.com/?q=Via+Madonna+Della+Mercede+6+Piove+di+Sacco+PD',
    external: true,
  },
  {
    icon: Phone,
    label: 'Telefono',
    value: '+39 347 317 7613',
    href: 'tel:+393473177613',
    external: false,
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@dierreimpianti.it',
    href: 'mailto:info@dierreimpianti.it',
    external: false,
  },
]

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }
const fadeLeft  = { hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.25,0.46,0.45,0.94] } } }
const fadeRight = { hidden: { opacity: 0, x:  20 }, show: { opacity: 1, x: 0, transition: { duration: 0.65, delay: 0.15, ease: [0.25,0.46,0.45,0.94] } } }
const fadeUp    = { hidden: { opacity: 0, y: 12  }, show: { opacity: 1, y: 0, transition: { duration: 0.5,  ease: [0.25,0.46,0.45,0.94] } } }

export default function About() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="chi-siamo" aria-labelledby="about-title" className="section-pad bg-surface">
      <div className="absolute inset-x-0 top-0 divider" aria-hidden="true"/>

      <div ref={ref} className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* ── Left: story ── */}
          <motion.div variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}>

            <motion.span variants={fadeLeft} className="label">Chi Siamo</motion.span>

            <motion.h2
              variants={fadeLeft}
              id="about-title"
              className="font-display font-black text-text-p mb-5"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Oltre 20 anni<br/>al tuo servizio.
            </motion.h2>

            {/* Founded badge */}
            <motion.div variants={fadeLeft} className="mb-7">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.08em]"
                style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)', color: '#EA6C00' }}>
                <CalendarDays size={12} aria-hidden="true"/>
                Fondati nell'Aprile 2003
              </span>
            </motion.div>

            <motion.p variants={fadeLeft} className="text-text-s text-base leading-relaxed mb-5">
              <strong className="text-text-p font-semibold">Dierre Impianti</strong> è l'impresa di{' '}
              <strong className="text-text-p font-semibold">Dainese Roberto</strong>, nata nell'aprile
              2003 con l'obiettivo di fornire progettazione, realizzazione e manutenzione di impianti
              tecnologici nella provincia di Padova.
            </motion.p>

            <motion.p variants={fadeLeft} className="text-text-s text-base leading-relaxed mb-10">
              Dalla sede di <strong className="text-text-p font-medium">Piove di Sacco</strong> offriamo
              un servizio completo: dall'impianto elettrico civile al fotovoltaico industriale, dalla
              domotica alla sicurezza.{' '}
              <strong className="text-text-p font-medium">Chiarezza e professionalità dalla progettazione
              all'assistenza post-vendita.</strong>
            </motion.p>

            {/* Values */}
            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
              role="list" aria-label="I nostri valori">
              {values.map(({ icon: Icon, text }) => (
                <motion.div
                  key={text}
                  variants={fadeUp}
                  role="listitem"
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-bg border border-border group hover:border-accent/30 hover:bg-accent/[0.03] transition-all duration-200">
                  <div className="icon-box-sm group-hover:bg-accent/12 transition-colors duration-200"
                    aria-hidden="true">
                    <Icon size={14} className="text-accent"/>
                  </div>
                  <span className="text-text-s text-sm font-medium">{text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: contact card ── */}
          <motion.div
            variants={fadeRight} initial="hidden" animate={inView ? 'show' : 'hidden'}
            className="flex flex-col gap-4 lg:sticky lg:top-24">

            {/* Main info card */}
            <div className="card p-7 md:p-8">

              {/* Company header */}
              <div className="flex items-center gap-4 mb-7">
                <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center flex-shrink-0"
                  style={{ boxShadow: '0 4px 18px rgba(249,115,22,0.45)' }}
                  aria-hidden="true">
                  <span className="text-white font-display font-black text-sm tracking-tighter">DR</span>
                </div>
                <div>
                  <p className="font-display font-700 text-text-p text-base leading-tight">Dierre Impianti</p>
                  <p className="text-text-s text-sm">di Dainese Roberto</p>
                </div>
              </div>

              <div className="divider mb-7" aria-hidden="true"/>

              {/* Contact list */}
              <address className="not-italic space-y-5">
                {contacts.map(({ icon: Icon, label, value, href, external }) => (
                  <div key={label} className="flex items-start gap-3.5">
                    <div className="icon-box-sm mt-0.5" aria-hidden="true">
                      <Icon size={14} className="text-accent"/>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-s mb-1">{label}</p>
                      <a
                        href={href}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="text-text-p text-sm font-medium leading-relaxed whitespace-pre-line hover:text-accent transition-colors duration-200">
                        {value}
                        {external && <span className="sr-only"> (apre Google Maps in una nuova scheda)</span>}
                      </a>
                    </div>
                  </div>
                ))}
              </address>

              <div className="divider my-7" aria-hidden="true"/>

              {/* Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2" role="status" aria-label="Stato: disponibile per nuovi lavori">
                  <div className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-60"/>
                    <span className="relative rounded-full h-2 w-2 bg-emerald-500"/>
                  </div>
                  <span className="text-text-s text-xs font-medium">Disponibile per nuovi lavori</span>
                </div>
                <span className="text-text-xs text-xs font-display font-600">Dal 2003</span>
              </div>
            </div>

            {/* Info row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="card px-5 py-4 text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-s mb-1.5">P.IVA</p>
                <p className="text-text-p text-sm font-mono font-semibold">05181630285</p>
              </div>
              <div className="card px-5 py-4 text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-s mb-1.5">Fondazione</p>
                <p className="text-text-p text-sm font-semibold">Aprile 2003</p>
              </div>
            </div>

            {/* Hours */}
            <div className="card px-6 py-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-s mb-4">Orari di Lavoro</p>
              <dl>
                {[
                  ['Lunedì – Venerdì', '8:00 – 18:00', false],
                  ['Sabato',           '8:00 – 12:00', false],
                  ['Domenica',         'Chiuso',        true ],
                ].map(([d, h, closed]) => (
                  <div key={d} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                    <dt className="text-text-s text-sm">{d}</dt>
                    <dd className={`text-sm font-semibold ${closed ? 'text-text-xs' : 'text-text-p'}`}>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
