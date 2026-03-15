import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Phone, Mail, ShieldCheck, BadgeCheck, Zap, ClipboardCheck, Star, Headphones, ArrowUpRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PageBanner from './PageBanner'
import TiltCard from './TiltCard'

const stats = [
  { n: '20+',  label: 'Anni di esperienza',   note: 'Dal 2003 nel settore' },
  { n: '500+', label: 'Progetti realizzati',   note: 'Civile e industriale' },
  { n: '10',   label: 'Settori di intervento', note: 'Soluzione completa' },
  { n: '100%', label: 'Lavori garantiti',       note: 'La nostra priorità' },
]

const values = [
  { icon: ShieldCheck,    title: 'Certificati e qualificati', desc: 'Installatori con abilitazioni e certificazioni aggiornate, sempre conformi alla normativa.' },
  { icon: BadgeCheck,     title: 'Garanzia totale',           desc: 'Ogni lavoro eseguito è coperto da garanzia completa su materiali e manodopera.' },
  { icon: Zap,            title: 'Interventi rapidi',         desc: 'Puntualità e risposta veloce. Ogni richiesta viene gestita con massima priorità.' },
  { icon: ClipboardCheck, title: 'Conformità normativa',      desc: 'Rispetto rigoroso di tutte le normative CEI vigenti su ogni tipologia di impianto.' },
  { icon: Star,           title: 'Materiali di qualità',      desc: 'Solo prodotti certificati di prima scelta da fornitori selezionati.' },
  { icon: Headphones,     title: 'Assistenza post-vendita',   desc: 'Supporto tecnico continuativo dopo ogni intervento. Non ti lasciamo mai solo.' },
]

export default function About() {
  const storyRef = useRef(null)
  const valRef   = useRef(null)
  const ctaRef   = useRef(null)
  const storyIn  = useInView(storyRef, { once: true, margin: '-60px' })
  const valIn    = useInView(valRef,   { once: true, margin: '-60px' })
  const ctaIn    = useInView(ctaRef,   { once: true, margin: '-60px' })
  const navigate = useNavigate()

  return (
    <>
      <PageBanner
        label="Chi Siamo"
        title={"Professionalità\ndal 2003."}
        subtitle="Dalla progettazione alla manutenzione, un'unica impresa di fiducia nella provincia di Padova."
      />

      {/* ── Stats strip ── */}
      <section aria-label="Numeri aziendali" className="bg-dark border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="container-xl py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x" style={{ '--tw-divide-opacity': 1, borderColor: 'rgba(255,255,255,0.06)' }}>
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                className="text-center px-6 py-2"
                style={i > 0 ? { borderLeft: '1px solid rgba(255,255,255,0.06)' } : {}}
              >
                <p className="font-display font-black leading-none mb-1 gradient-text"
                  style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', filter: 'drop-shadow(0 0 14px rgba(56,189,248,0.28))' }}>
                  {s.n}
                </p>
                <p className="text-text-p text-[0.8125rem] font-semibold mb-0.5">{s.label}</p>
                <p className="text-text-xs text-[11px]">{s.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature statement (Apple large-type) ── */}
      <section className="bg-bg overflow-hidden">
        <div className="container-xl py-24 md:py-36 text-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="section-label mb-10">La nostra filosofia</span>
            <h2
              className="font-display font-black text-text-p mx-auto leading-[1.0] tracking-[-0.04em]"
              style={{ fontSize: 'clamp(2.4rem, 6.5vw, 5.2rem)', maxWidth: '18ch' }}
            >
              Ogni impianto{' '}
              <span className="gradient-text">è un'opera</span>
              {' '}fatta per durare.
            </h2>
            <p className="text-text-s mt-8 mx-auto leading-relaxed"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', maxWidth: '56ch' }}>
              Non installiamo soltanto cavi e componenti. Costruiamo infrastrutture tecnologiche
              che resistono al tempo, rispettano le normative e superano le aspettative.
            </p>
          </motion.div>

          {/* Floating accent line */}
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            aria-hidden="true"
            className="mx-auto mt-16 h-px"
            style={{
              maxWidth: 320,
              background: 'linear-gradient(90deg, transparent, #f5c430, #38bdf8, transparent)',
              transformOrigin: 'center',
            }}
          />
        </div>
      </section>

      {/* ── Storia + Contatti ── */}
      <section id="chi-siamo" aria-labelledby="about-title" className="bg-dark">
        <div ref={storyRef} className="container-xl section-pad">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

            {/* ── Sinistra: storia ── */}
            <motion.div
              initial={{ opacity: 0, x: -28 }} animate={storyIn ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}>

              <span className="label mb-6">La nostra storia</span>

              <h2 id="about-title"
                className="font-display font-black text-text-p leading-[1.05] tracking-[-0.035em] mb-8"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
                Vent'anni di<br/>
                <span className="gradient-text">eccellenza</span> sul campo.
              </h2>

              <p className="text-text-s leading-relaxed mb-5" style={{ fontSize: '1.0625rem' }}>
                <strong className="text-text-p font-semibold">Dierre Impianti</strong> è l'impresa di{' '}
                <strong className="text-text-p font-semibold">Dainese Roberto</strong>, fondata nell'aprile 2003
                con l'obiettivo di fornire progettazione, realizzazione e manutenzione di impianti
                tecnologici nella provincia di Padova.
              </p>
              <p className="text-text-s leading-relaxed mb-10" style={{ fontSize: '1rem' }}>
                Dalla sede di <strong className="text-text-p font-medium">Piove di Sacco</strong> offriamo
                un servizio completo: dall'impianto elettrico civile al fotovoltaico industriale, dalla
                domotica alla sicurezza. Chiarezza e professionalità dalla progettazione all'assistenza post-vendita.
              </p>

              {/* Founder 3-D tilt card */}
              <TiltCard
                className="group relative rounded-2xl p-6 mb-10 cursor-default overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
                strength={10}
              >
                <div className="relative z-10 flex items-center gap-5">
                  {/* Avatar */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 font-display font-black text-dark text-lg select-none"
                    style={{ background: 'linear-gradient(135deg, #f5c430 0%, #38bdf8 100%)' }}
                    aria-hidden="true">
                    DR
                  </div>
                  <div>
                    <p className="font-display font-700 text-text-p text-base leading-tight">Dainese Roberto</p>
                    <p className="text-text-s text-sm mt-0.5">Titolare · Dierre Impianti s.n.c.</p>
                    <p className="text-text-xs text-[11px] font-mono mt-1">Dal 2003</p>
                  </div>
                </div>
                {/* subtle bg glow at bottom-right */}
                <div aria-hidden="true" className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)' }}/>
              </TiltCard>

              <button
                onClick={() => { navigate('/contatti'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                className="btn-primary">
                Richiedi un preventivo
                <ArrowUpRight size={15} aria-hidden="true"/>
              </button>
            </motion.div>

            {/* ── Destra: dati + contatti + orari ── */}
            <motion.div
              initial={{ opacity: 0, x: 28 }} animate={storyIn ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="lg:sticky lg:top-24 flex flex-col gap-0">

              {/* Dati aziendali */}
              <div className="pb-8 mb-8 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                <p className="text-text-xs text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Dati aziendali</p>
                <dl>
                  {[
                    ['P.IVA',      '05181630285'],
                    ['Fondazione', 'Aprile 2003'],
                    ['Sede',       'Piove di Sacco (PD)'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between py-3.5 border-b last:border-0"
                      style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                      <dt className="text-text-xs text-[11px] font-bold uppercase tracking-[0.15em]">{k}</dt>
                      <dd className="text-text-p text-sm font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Contatti */}
              <address className="not-italic">
                {[
                  { Icon: Phone,  label: 'Telefono', value: '+39 347 317 7613',           href: 'tel:+393473177613', ext: false },
                  { Icon: Mail,   label: 'Email',    value: 'info@dierreimpianti.it',       href: 'mailto:info@dierreimpianti.it', ext: false },
                  { Icon: MapPin, label: 'Indirizzo', value: 'Via Madonna Della Mercede 6\n35028 Piove di Sacco (PD)', href: 'https://maps.google.com/?q=Via+Madonna+Della+Mercede+6+Piove+di+Sacco+PD', ext: true },
                ].map(({ Icon, label, value, href, ext }) => (
                  <a key={label} href={href}
                    {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="flex items-start gap-4 py-4 border-b last:border-0 group hover:bg-white/[0.025] -mx-5 md:-mx-12 lg:-mx-20 px-5 md:px-12 lg:px-20 transition-colors duration-150"
                    style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-150"
                      style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.15)' }}
                      aria-hidden="true">
                      <Icon size={14} className="text-accent"/>
                    </span>
                    <div>
                      <p className="text-text-xs text-[10px] font-bold uppercase tracking-[0.15em] mb-0.5">{label}</p>
                      <p className="text-text-p text-sm font-medium leading-relaxed whitespace-pre-line group-hover:text-accent transition-colors duration-150">
                        {value}
                        {ext && <span className="sr-only"> (apre Google Maps)</span>}
                      </p>
                    </div>
                  </a>
                ))}
              </address>

              {/* Orari */}
              <div className="mt-8 pt-8 border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                <p className="text-text-xs text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Orari di lavoro</p>
                <dl>
                  {[
                    ['Lunedì – Venerdì', '8:00 – 18:00', false],
                    ['Sabato',           '8:00 – 12:00', false],
                    ['Domenica',         'Chiuso',        true ],
                  ].map(([d, h, closed]) => (
                    <div key={d} className="flex justify-between items-center py-3 border-b last:border-0"
                      style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                      <dt className="text-text-s text-sm">{d}</dt>
                      <dd className={`text-sm font-semibold tabular-nums ${closed ? 'text-text-xs' : 'text-text-p'}`}>{h}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Disponibilità */}
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

      {/* ── Valori — 3D tilt grid ── */}
      <section ref={valRef} className="bg-bg" aria-label="I nostri valori">
        <div className="container-xl section-pad-sm">

          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={valIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-14">
            <span className="section-label">Perché sceglierci</span>
            <h2 className="font-display font-black text-text-p leading-[1.05] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)' }}>
              Il nostro impegno<br/>
              <span className="gradient-text">verso di te.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                animate={valIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.07 }}
              >
                <TiltCard
                  className="group relative p-6 rounded-2xl h-full overflow-hidden cursor-default"
                  style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.025)' }}
                  strength={12}
                >
                  <div className="relative z-10">
                    {/* Gradient icon badge */}
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 relative overflow-hidden"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div aria-hidden="true" className="absolute inset-0"
                        style={{ background: 'linear-gradient(135deg, rgba(245,196,48,0.18) 0%, rgba(56,189,248,0.18) 100%)' }}/>
                      <Icon size={18} className="relative z-10" style={{ color: '#38bdf8' }}/>
                    </div>
                    <h3 className="font-display font-700 text-text-p text-sm leading-tight mb-2">{title}</h3>
                    <p className="text-text-s text-xs leading-relaxed">{desc}</p>
                  </div>
                  {/* corner accent line */}
                  <div aria-hidden="true" className="absolute top-0 left-0 w-16 h-px"
                    style={{ background: 'linear-gradient(90deg, rgba(245,196,48,0.5), transparent)' }}/>
                  <div aria-hidden="true" className="absolute top-0 left-0 h-12 w-px"
                    style={{ background: 'linear-gradient(180deg, rgba(245,196,48,0.5), transparent)' }}/>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA band ── */}
      <section ref={ctaRef} className="bg-dark" aria-label="Chiamata all'azione">
        <div className="container-xl py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={ctaIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(245,196,48,0.08) 0%, rgba(56,189,248,0.08) 100%)', border: '1px solid rgba(255,255,255,0.07)' }}>

            {/* Glow blobs */}
            <div aria-hidden="true" className="absolute -top-24 -left-16 w-72 h-72 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(245,196,48,0.12) 0%, transparent 70%)' }}/>
            <div aria-hidden="true" className="absolute -bottom-20 -right-16 w-72 h-72 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)' }}/>

            <div className="relative z-10 text-center py-16 px-6">
              <span className="section-label">Pronto a iniziare?</span>
              <h2 className="font-display font-black text-text-p leading-[1.05] tracking-[-0.03em] mb-5"
                style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.2rem)' }}>
                Raccontaci il tuo progetto.<br/>
                <span className="gradient-text">Troviamo la soluzione insieme.</span>
              </h2>
              <p className="text-text-s mb-10 mx-auto" style={{ maxWidth: '50ch', fontSize: '1.0625rem' }}>
                Sopralluogo gratuito, preventivo senza impegno, risposta entro 24 ore.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => { navigate('/contatti'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                  className="btn-primary">
                  Richiedi il preventivo
                  <ArrowUpRight size={15} aria-hidden="true"/>
                </button>
                <a href="tel:+393473177613" className="btn-outline-dark">
                  <Phone size={14} aria-hidden="true"/>
                  +39 347 317 7613
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
