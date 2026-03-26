import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SERVICES } from '../data/services'

gsap.registerPlugin(ScrollTrigger)

export default function ServicesTeaser() {
  const sectionRef = useRef(null)
  const navigate   = useNavigate()

  const goServizi  = () => { navigate('/servizi');  window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const goContatti = () => { navigate('/contatti'); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header — label + headline slide up
      gsap.from('.st-header', {
        opacity: 0, y: 28, duration: 0.72,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.st-header',
          start: 'top 88%',
          once: true,
        },
      })

      // Pills — stagger fade-in
      gsap.from('.st-pill', {
        opacity: 0, y: 14, duration: 0.5,
        ease: 'power2.out',
        stagger: 0.045,
        scrollTrigger: {
          trigger: '.st-pills',
          start: 'top 88%',
          once: true,
        },
      })

      // CTA row
      gsap.from('.st-cta', {
        opacity: 0, y: 16, duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.st-cta',
          start: 'top 92%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} aria-labelledby="teaser-title" className="bg-bg">
      <div className="container-xl section-pad">

        {/* ── Header ── */}
        <div className="st-header mb-10 md:mb-14">
          <span className="label">Parliamo del tuo prossimo progetto</span>
          <h2
            id="teaser-title"
            className="font-display font-black text-text-p mb-4"
            style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Scopri i nostri servizi<br className="hidden sm:block"/> e scegli quello che fa per te.
          </h2>
          <p className="text-text-s text-sm md:text-base leading-relaxed max-w-md">
            Che si tratti di casa o azienda, seguiamo ogni lavoro dall'inizio alla fine.
            Dall'impianto elettrico alla domotica, dal fotovoltaico alla sicurezza.
          </p>
        </div>

        {/* ── Pillole servizi ── */}
        <div className="st-pills flex flex-wrap gap-2 md:gap-2.5 mb-10 md:mb-12" aria-hidden="true">
          {SERVICES.map((s) => {
            const Icon = s.icon
            return (
              <span
                key={s.title}
                className="st-pill inline-flex items-center gap-2 px-3.5 py-2 rounded-full
                           border border-border bg-surface
                           text-text-s text-[0.78rem] md:text-[0.8125rem] font-medium">
                <Icon size={13} className="text-accent flex-shrink-0" aria-hidden="true"/>
                {s.title}
              </span>
            )
          })}
        </div>

        {/* ── CTA ── */}
        <div className="st-cta flex flex-col sm:flex-row gap-3">
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
        </div>

      </div>
    </section>
  )
}
