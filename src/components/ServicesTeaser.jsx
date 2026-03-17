import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Zap, Sun, Radio, Home, Wind,
  Network, Settings2, ShieldCheck, Flame, CloudLightning,
  ArrowRight,
} from 'lucide-react'

const services = [
  { icon: Zap,            title: 'Impianti Elettrici' },
  { icon: Sun,            title: 'Fotovoltaico'        },
  { icon: Home,           title: 'Domotica'            },
  { icon: ShieldCheck,    title: 'Sicurezza & TVCC'    },
  { icon: Radio,          title: 'Antenne'             },
  { icon: Flame,          title: 'Antincendio'         },
  { icon: Wind,           title: 'Climatizzazione'     },
  { icon: Network,        title: 'Reti Dati'           },
  { icon: Settings2,      title: 'Automazioni'         },
  { icon: CloudLightning, title: 'Parafulmine'         },
]

export default function ServicesTeaser() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const navigate = useNavigate()

  const goServizi  = () => { navigate('/servizi');  window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const goContatti = () => { navigate('/contatti'); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return (
    <section aria-labelledby="teaser-title" className="bg-bg">
      <div className="container-xl section-pad">

        {/* ── Header ── */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-14">
          <span className="label">Parliamo del tuo prossimo progetto</span>
          <h2
            id="teaser-title"
            className="font-display font-black text-text-p mb-4"
            style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Scopri i nostri servizi<br className="hidden sm:block"/> e scegli quello che fa per te.
          </h2>
          <p className="text-text-s text-sm md:text-base leading-relaxed max-w-md">
            Dall'impianto elettrico alla domotica, dal fotovoltaico alla sicurezza.
            Tutto ciò che serve per casa o azienda.
          </p>
        </motion.div>

        {/* ── Pillole servizi — solo decorative ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="flex flex-wrap gap-2 md:gap-2.5 mb-10 md:mb-12"
          aria-hidden="true">
          {services.map((s) => {
            const Icon = s.icon
            return (
              <span
                key={s.title}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full
                           border border-border bg-surface
                           text-text-s text-[0.78rem] md:text-[0.8125rem] font-medium">
                <Icon size={13} className="text-accent flex-shrink-0" aria-hidden="true"/>
                {s.title}
              </span>
            )
          })}
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.32 }}
          className="flex flex-col sm:flex-row gap-3">
          <motion.button
            onClick={goServizi}
            whileHover={{ scale: 1.03, filter: 'brightness(1.06)' }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary inline-flex items-center justify-center gap-2 w-full sm:w-auto"
            style={{ transition: 'filter 0.2s, transform 0.15s' }}>
            Scopri tutti i servizi
            <ArrowRight size={16} aria-hidden="true"/>
          </motion.button>
          <motion.button
            onClick={goContatti}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-ghost-light w-full sm:w-auto">
            Preventivo Gratuito
          </motion.button>
        </motion.div>

      </div>
    </section>
  )
}
