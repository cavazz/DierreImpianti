import { useRef, useState, useId } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react'

const inputCls = [
  'w-full px-4 py-3.5 rounded-lg text-sm font-sans',
  'bg-white/4 border border-white/8 text-text-p',
  'focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20',
  'placeholder:text-text-xs',
  'transition-all duration-200',
  'min-h-[52px]',
].join(' ')

function Field({ id, label, required, children }) {
  return (
    <div>
      <label htmlFor={id}
        className="block text-[10px] font-bold uppercase tracking-[0.18em] text-text-xs mb-2">
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
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 pb-10 border-b border-white/6">
          <div>
            <span className="label-dark">Contatti</span>
            <h2 id="contact-title"
              className="font-display font-black text-text-p"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', letterSpacing: '-0.035em', lineHeight: 1.08 }}>
              Parliamo del tuo<br/>prossimo progetto.
            </h2>
          </div>
          <p className="text-text-s text-base leading-relaxed md:max-w-xs md:text-right">
            Preventivo gratuito e senza impegno.<br/>Risposta rapida garantita.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── Left: contact info ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}>

            {/* Numero in evidenza */}
            <a href="tel:+393473177613"
              className="group flex items-center gap-4 mb-10 p-5 rounded-2xl transition-all duration-200"
              style={{ border: '1px solid rgba(245,158,11,0.2)', background: 'rgba(245,158,11,0.04)' }}>
              <span className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(245,158,11,0.14)' }} aria-hidden="true">
                <Phone size={20} className="text-accent"/>
              </span>
              <div>
                <p className="text-text-xs text-[10px] font-bold uppercase tracking-[0.18em] mb-1">Chiamaci direttamente</p>
                <p className="font-display font-black text-text-p group-hover:text-accent transition-colors duration-150"
                  style={{ fontSize: 'clamp(1.4rem, 3vw, 1.75rem)', letterSpacing: '-0.02em' }}>
                  +39 347 317 7613
                </p>
              </div>
            </a>

            {/* Email + Indirizzo */}
            <address className="not-italic space-y-0 mb-10">
              {[
                { Icon: Mail,   label: 'Email', value: 'info@dierreimpianti.it',                                   href: 'mailto:info@dierreimpianti.it', ext: false },
                { Icon: MapPin, label: 'Sede',  value: 'Via Madonna Della Mercede 6\n35028 Piove di Sacco (PD)',   href: 'https://maps.google.com/?q=Via+Madonna+Della+Mercede+6+Piove+di+Sacco+PD', ext: true },
              ].map(({ Icon, label, value, href, ext }) => (
                <a
                  key={label}
                  href={href}
                  {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-start gap-4 py-5 border-b border-white/6 last:border-0 group transition-colors duration-150">
                  <span className="w-9 h-9 rounded-lg border border-white/8 group-hover:border-accent/25 group-hover:bg-accent/6 flex items-center justify-center flex-shrink-0 transition-all duration-150 mt-0.5"
                    aria-hidden="true">
                    <Icon size={14} className="text-accent"/>
                  </span>
                  <div>
                    <p className="text-text-xs text-[10px] font-bold uppercase tracking-[0.15em] mb-1">{label}</p>
                    <p className="text-text-s text-sm font-medium leading-relaxed whitespace-pre-line group-hover:text-text-p transition-colors duration-150">
                      {value}
                      {ext && <span className="sr-only"> (apre Google Maps in una nuova scheda)</span>}
                    </p>
                  </div>
                </a>
              ))}
            </address>

            {/* Availability */}
            <div className="flex items-center gap-2.5" role="status" aria-label="Disponibile per nuovi lavori">
              <div className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-60"/>
                <span className="relative rounded-full h-2 w-2 bg-emerald-500"/>
              </div>
              <span className="text-text-s text-sm font-medium">Disponibile per nuovi lavori</span>
            </div>
          </motion.div>

          {/* ── Right: form ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}>

            <div className="border border-white/7 rounded-2xl p-7 md:p-10"
              style={{ background: 'rgba(255,255,255,0.025)' }}>
              {sent ? (
                <div className="flex flex-col items-center gap-5 py-16 text-center"
                  role="alert" aria-live="polite">
                  <div className="w-16 h-16 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle size={30} className="text-emerald-400" aria-hidden="true"/>
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
                        <input id={`${uid}-name`} type="text" name="name" value={form.name} onChange={set}
                          required placeholder="Il tuo nome e cognome" className={inputCls} autoComplete="name"/>
                      </Field>
                      <Field id={`${uid}-phone`} label="Telefono">
                        <input id={`${uid}-phone`} type="tel" name="phone" value={form.phone} onChange={set}
                          placeholder="Numero di telefono" className={inputCls} autoComplete="tel"/>
                      </Field>
                    </div>

                    <Field id={`${uid}-email`} label="Email" required>
                      <input id={`${uid}-email`} type="email" name="email" value={form.email} onChange={set}
                        required placeholder="Il tuo indirizzo email" className={inputCls} autoComplete="email"/>
                    </Field>

                    <Field id={`${uid}-msg`} label="Messaggio" required>
                      <textarea id={`${uid}-msg`} name="message" value={form.message} onChange={set}
                        required rows={5} placeholder="Descrivi il tuo progetto o la tua richiesta..."
                        className={`${inputCls} resize-none min-h-[140px]`}/>
                    </Field>

                    <button type="submit" className="btn-primary w-full">
                      <span>Invia Richiesta</span>
                      <Send size={15} aria-hidden="true"/>
                    </button>

                    <p className="text-text-xs text-xs text-center leading-relaxed">
                      Dati protetti ai sensi del GDPR.{' '}
                      <a href="/privacy" className="underline hover:text-text-s transition-colors">Privacy Policy</a>
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
