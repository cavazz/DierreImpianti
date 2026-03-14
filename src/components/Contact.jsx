import { useRef, useState, useId } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail, MapPin, Send, CheckCircle, Clock } from 'lucide-react'

const infoItems = [
  { icon: Phone,  label: 'Telefono', value: '+39 347 317 7613',                                    href: 'tel:+393473177613',            external: false },
  { icon: Mail,   label: 'Email',    value: 'info@dierreimpianti.it',                              href: 'mailto:info@dierreimpianti.it', external: false },
  { icon: MapPin, label: 'Sede',     value: 'Via Madonna Della Mercede 6\n35028 Piove di Sacco (PD)', href: 'https://maps.google.com/?q=Via+Madonna+Della+Mercede+6+Piove+di+Sacco+PD', external: true },
]

const hours = [
  ['Lunedì – Venerdì', '8:00 – 18:00', false],
  ['Sabato',           '8:00 – 12:00', false],
  ['Domenica',         'Chiuso',        true ],
]

const inputCls = [
  'w-full px-4 py-3.5 rounded-2xl text-sm text-text-p font-sans',
  'bg-bg border border-border',
  'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15',
  'placeholder:text-text-s/50',
  'transition-all duration-200',
  'min-h-[52px]',
].join(' ')

function Field({ id, label, required, children }) {
  return (
    <div>
      <label htmlFor={id}
        className="block text-[10px] font-bold uppercase tracking-[0.18em] text-text-s mb-2">
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
  const inView = useInView(ref, { once: true, margin: '-80px' })
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
    <section id="contatti" aria-labelledby="contact-title" className="section-pad bg-bg">
      <div className="absolute inset-x-0 top-0 divider" aria-hidden="true"/>

      <div ref={ref} className="container-xl">

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-18">
          <span className="label">Contatti</span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <h2
              id="contact-title"
              className="font-display font-black text-text-p"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', letterSpacing: '-0.03em', lineHeight: 1.12 }}>
              Parliamo del tuo<br/>prossimo progetto.
            </h2>
            <p className="text-text-s text-base leading-relaxed md:max-w-xs md:text-right">
              Preventivo gratuito e senza impegno.<br/>Risposta rapida garantita.
            </p>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* ── Left: info ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-3">

            {infoItems.map(({ icon: Icon, label, value, href, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="card card-interactive flex items-start gap-4 p-5 group no-underline">
                <div className="icon-box group-hover:bg-accent/14 transition-colors duration-200" aria-hidden="true">
                  <Icon size={18} className="text-accent"/>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-s mb-1">{label}</p>
                  <p className="text-text-p text-sm font-medium leading-relaxed whitespace-pre-line group-hover:text-accent transition-colors duration-200">
                    {value}
                    {external && <span className="sr-only"> (apre Google Maps)</span>}
                  </p>
                </div>
              </a>
            ))}

            {/* Hours */}
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={13} className="text-accent" aria-hidden="true"/>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-s">Orari</p>
              </div>
              <dl>
                {hours.map(([d, h, closed]) => (
                  <div key={d} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                    <dt className="text-text-s text-sm">{d}</dt>
                    <dd className={`text-sm font-semibold ${closed ? 'text-text-xs' : 'text-text-p'}`}>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>

          {/* ── Right: form ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="lg:col-span-3">

            <div className="card p-6 md:p-9">
              {sent ? (
                /* Success state */
                <div className="flex flex-col items-center gap-5 py-16 text-center" role="alert" aria-live="polite">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center"
                    style={{ border: '2px solid rgba(16,185,129,0.25)' }}>
                    <CheckCircle size={30} className="text-emerald-500" aria-hidden="true"/>
                  </div>
                  <div>
                    <h3 className="font-display font-700 text-text-p text-xl mb-2">Ottimo!</h3>
                    <p className="text-text-s text-sm leading-relaxed max-w-xs mx-auto">
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
                          placeholder="Il tuo numero di telefono"
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

                    <p className="text-text-xs text-xs text-center leading-relaxed">
                      Dati protetti ai sensi del GDPR.{' '}
                      <a href="/privacy" className="underline hover:text-accent transition-colors">
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
