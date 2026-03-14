import { useRef, useState, useId } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react'

const infoItems = [
  { Icon: Phone,  label: 'Telefono', value: '+39 347 317 7613',                                           href: 'tel:+393473177613',            ext: false },
  { Icon: Mail,   label: 'Email',    value: 'info@dierreimpianti.it',                                     href: 'mailto:info@dierreimpianti.it', ext: false },
  { Icon: MapPin, label: 'Sede',     value: 'Via Madonna Della Mercede 6\n35028 Piove di Sacco (PD)',     href: 'https://maps.google.com/?q=Via+Madonna+Della+Mercede+6+Piove+di+Sacco+PD', ext: true },
]

const inputCls = [
  'w-full px-4 py-3.5 rounded-lg text-sm font-sans',
  'bg-white/5 border border-white/12 text-white',
  'focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30',
  'placeholder:text-white/25',
  'transition-all duration-200',
  'min-h-[52px]',
].join(' ')

function Field({ id, label, required, children }) {
  return (
    <div>
      <label htmlFor={id}
        className="block text-[10px] font-bold uppercase tracking-[0.18em] text-white/40 mb-2">
        {label}{required && <span className="text-accent ml-1" aria-hidden="true">*</span>}
        {required && <span className="sr-only"> (obbligatorio)</span>}
      </label>
      {children}
    </div>
  )
}

export default function Contact() {
  const uid    = useId()
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const set = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    const subject = encodeURIComponent(`Richiesta preventivo da ${form.name}`)
    const body    = encodeURIComponent(
      `Nome: ${form.name}\nTelefono: ${form.phone || '—'}\nEmail: ${form.email}\n\nMessaggio:\n${form.message}`
    )
    window.location.href = `mailto:info@dierreimpianti.it?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section id="contatti" aria-labelledby="contact-title" className="bg-dark">
      <div ref={ref} className="container-xl section-pad">

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 pb-10 border-b border-white/8">
          <div>
            <span className="label-dark">Contatti</span>
            <h2 id="contact-title"
              className="font-display font-black text-white"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', letterSpacing: '-0.035em', lineHeight: 1.08 }}>
              Parliamo del tuo<br/>prossimo progetto.
            </h2>
          </div>
          <p className="text-white/40 text-base leading-relaxed md:max-w-xs md:text-right">
            Preventivo gratuito e senza impegno.<br/>Risposta rapida garantita.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── Left: contact info ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}>

            <address className="not-italic space-y-0 mb-12">
              {infoItems.map(({ Icon, label, value, href, ext }) => (
                <a
                  key={label}
                  href={href}
                  {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-start gap-4 py-5 border-b border-white/8 last:border-0 group transition-colors duration-150">
                  <span className="w-9 h-9 rounded-lg border border-white/12 group-hover:border-accent/40 group-hover:bg-accent/10 flex items-center justify-center flex-shrink-0 transition-all duration-150 mt-0.5"
                    aria-hidden="true">
                    <Icon size={14} className="text-accent"/>
                  </span>
                  <div>
                    <p className="text-white/35 text-[10px] font-bold uppercase tracking-[0.15em] mb-1">{label}</p>
                    <p className="text-white/70 text-sm font-medium leading-relaxed whitespace-pre-line group-hover:text-white transition-colors duration-150">
                      {value}
                      {ext && <span className="sr-only"> (apre Google Maps in una nuova scheda)</span>}
                    </p>
                  </div>
                </a>
              ))}
            </address>

            {/* Hours */}
            <div>
              <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Orari di Lavoro</p>
              <dl>
                {[
                  ['Lunedì – Venerdì', '8:00 – 18:00', false],
                  ['Sabato',           '8:00 – 12:00', false],
                  ['Domenica',         'Chiuso',        true ],
                ].map(([d, h, closed]) => (
                  <div key={d} className="flex justify-between items-center py-3.5 border-b border-white/8 last:border-0">
                    <dt className="text-white/50 text-sm">{d}</dt>
                    <dd className={`text-sm font-semibold tabular-nums ${closed ? 'text-white/25' : 'text-white/80'}`}>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>

          {/* ── Right: form ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}>

            <div className="border border-white/10 rounded-2xl p-7 md:p-10"
              style={{ background: 'rgba(255,255,255,0.04)' }}>
              {sent ? (
                <div className="flex flex-col items-center gap-5 py-16 text-center"
                  role="alert" aria-live="polite">
                  <div className="w-16 h-16 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle size={30} className="text-emerald-400" aria-hidden="true"/>
                  </div>
                  <div>
                    <h3 className="font-display font-700 text-white text-xl mb-2">Ottimo!</h3>
                    <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto">
                      Si è aperta la tua app email. Invia il messaggio per completare la richiesta di preventivo.
                    </p>
                  </div>
                  <button
                    onClick={() => setSent(false)}
                    className="text-accent hover:text-accent-h font-semibold text-sm underline underline-offset-2 transition-colors">
                    Invia un altro messaggio
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate aria-label="Modulo di richiesta preventivo">
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field id={`${uid}-name`} label="Nome e Cognome" required>
                        <input
                          id={`${uid}-name`}
                          type="text" name="name" value={form.name} onChange={set}
                          required placeholder="Il tuo nome e cognome"
                          className={inputCls} autoComplete="name"/>
                      </Field>
                      <Field id={`${uid}-phone`} label="Telefono">
                        <input
                          id={`${uid}-phone`}
                          type="tel" name="phone" value={form.phone} onChange={set}
                          placeholder="Numero di telefono"
                          className={inputCls} autoComplete="tel"/>
                      </Field>
                    </div>

                    <Field id={`${uid}-email`} label="Email" required>
                      <input
                        id={`${uid}-email`}
                        type="email" name="email" value={form.email} onChange={set}
                        required placeholder="Il tuo indirizzo email"
                        className={inputCls} autoComplete="email"/>
                    </Field>

                    <Field id={`${uid}-msg`} label="Messaggio" required>
                      <textarea
                        id={`${uid}-msg`}
                        name="message" value={form.message} onChange={set}
                        required rows={5}
                        placeholder="Descrivi il tuo progetto o la tua richiesta..."
                        className={`${inputCls} resize-none min-h-[140px]`}/>
                    </Field>

                    <button type="submit" className="btn-primary w-full">
                      <span>Invia Richiesta</span>
                      <Send size={15} aria-hidden="true"/>
                    </button>

                    <p className="text-white/25 text-xs text-center leading-relaxed">
                      Dati protetti ai sensi del GDPR.{' '}
                      <a href="/privacy" className="underline hover:text-white/50 transition-colors">
                        Privacy Policy
                      </a>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
