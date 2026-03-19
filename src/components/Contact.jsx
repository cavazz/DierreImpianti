import { useRef, useState, useId } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail, MapPin, Send, CheckCircle, Clock, Loader2 } from 'lucide-react'
import emailjs from '@emailjs/browser'
import PageBanner from './PageBanner'
import TiltCard from './TiltCard'
import { usePageMeta } from '../hooks/usePageMeta'

const inputCls = [
  'w-full px-4 py-3.5 rounded-lg text-sm font-sans',
  'bg-white/[0.04] border border-white/8 text-text-p',
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

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const EMAILJS_OK  = SERVICE_ID && !SERVICE_ID.startsWith('service_xxx')

export default function Contact() {
  const uid    = useId()
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [form, setForm]       = useState({ name: '', email: '', phone: '', message: '' })

  usePageMeta({
    title: 'Contatti · Dierre Impianti | Preventivo Gratuito Padova',
    description: 'Richiedi un preventivo gratuito a Dierre Impianti. Impianti elettrici, fotovoltaico e domotica nella provincia di Padova. Risposta entro 24 ore.',
  })

  const set = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (EMAILJS_OK) {
      try {
        await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          {
            from_name:  form.name,
            from_email: form.email,
            phone:      form.phone || '—',
            message:    form.message,
          },
          PUBLIC_KEY,
        )
        setSent(true)
      } catch {
        setError('Invio non riuscito. Puoi contattarci direttamente al +39 347 317 7613.')
      } finally {
        setLoading(false)
      }
    } else {
      // Fallback mailto se EmailJS non è configurato
      const subject = encodeURIComponent(`Richiesta preventivo da ${form.name}`)
      const body    = encodeURIComponent(
        `Nome: ${form.name}\nTelefono: ${form.phone || '—'}\nEmail: ${form.email}\n\nMessaggio:\n${form.message}`
      )
      window.location.href = `mailto:info@dierreimpianti.it?subject=${subject}&body=${body}`
      setLoading(false)
      setSent(true)
    }
  }

  return (
    <>
      <PageBanner
        label="Contatti"
        title={"Parliamo del tuo\nprossimo progetto."}
        subtitle="Preventivo gratuito e senza impegno. Risposta garantita entro 24 ore."
      />

      <section id="contatti" aria-labelledby="contact-title" className="bg-dark">
        <div ref={ref} className="container-xl section-pad">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* ── Left: contact info ── */}
            <motion.div
              initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}>

              <span className="label mb-6">Scrivici o chiamaci</span>
              <h2 id="contact-title"
                className="font-display font-black text-text-p leading-[1.05] tracking-[-0.035em] mb-10"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
                Siamo a tua<br/>
                <span className="gradient-text">disposizione.</span>
              </h2>

              {/* Phone — hero card */}
              <TiltCard
                className="group relative rounded-2xl mb-8 overflow-hidden cursor-pointer"
                style={{ border: '1px solid rgba(56,189,248,0.2)', background: 'rgba(56,189,248,0.04)' }}
                strength={8}
              >
                <a href="tel:+393473177613" className="relative z-10 flex items-center gap-4 p-5 block">
                  <span className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(56,189,248,0.14)' }} aria-hidden="true">
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
              </TiltCard>

              {/* Email + Indirizzo */}
              <address className="not-italic mb-8">
                {[
                  { Icon: Mail,   label: 'Email', value: 'info@dierreimpianti.it',                                 href: 'mailto:info@dierreimpianti.it', ext: false },
                  { Icon: MapPin, label: 'Sede',  value: 'Via Madonna Della Mercede 6\n35028 Piove di Sacco (PD)', href: 'https://maps.google.com/?q=Via+Madonna+Della+Mercede+6+Piove+di+Sacco+PD', ext: true },
                ].map(({ Icon, label, value, href, ext }) => (
                  <a key={label} href={href}
                    {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="flex items-start gap-4 py-5 border-b last:border-0 group transition-colors duration-150"
                    style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    <span className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-150"
                      style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.15)' }}
                      aria-hidden="true">
                      <Icon size={14} className="text-accent"/>
                    </span>
                    <div>
                      <p className="text-text-xs text-[10px] font-bold uppercase tracking-[0.15em] mb-1">{label}</p>
                      <p className="text-text-s text-sm font-medium leading-relaxed whitespace-pre-line group-hover:text-text-p transition-colors duration-150">
                        {value}
                        {ext && <span className="sr-only"> (apre Google Maps)</span>}
                      </p>
                    </div>
                  </a>
                ))}
              </address>

              {/* Orari */}
              <div className="mb-8 pt-2">
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
              initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}>

              <div className="rounded-2xl p-7 md:p-10"
                style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.025)' }}>

                {/* gradient top-left corner accent */}
                <div aria-hidden="true" className="absolute top-0 left-0 w-24 h-px pointer-events-none"
                  style={{ background: 'linear-gradient(90deg, rgba(245,196,48,0.5), transparent)' }}/>
                <div aria-hidden="true" className="absolute top-0 left-0 h-16 w-px pointer-events-none"
                  style={{ background: 'linear-gradient(180deg, rgba(245,196,48,0.5), transparent)' }}/>

                {sent ? (
                  <div className="flex flex-col items-center gap-5 py-16 text-center"
                    role="alert" aria-live="polite">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.25)' }}>
                      <CheckCircle size={30} className="text-emerald-400" aria-hidden="true"/>
                    </div>
                    <div>
                      <h3 className="font-display font-700 text-text-p text-xl mb-2">Ottimo!</h3>
                      <p className="text-text-s text-sm leading-relaxed max-w-xs mx-auto">
                        Messaggio ricevuto! Ti risponderemo entro 24 ore.
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

                      {error && (
                        <p role="alert" className="text-red-400 text-sm text-center py-2 px-4 rounded-lg"
                          style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                          {error}
                        </p>
                      )}

                      <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed">
                        {loading
                          ? <><Loader2 size={15} className="animate-spin" aria-hidden="true"/><span>Invio in corso…</span></>
                          : <><span>Invia Richiesta</span><Send size={15} aria-hidden="true"/></>
                        }
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
    </>
  )
}
