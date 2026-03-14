import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { v: 20,  s: '+', label: 'Anni di Esperienza',   note: 'Dal 2003 nel settore' },
  { v: 500, s: '+', label: 'Progetti Realizzati',   note: 'Civile e industriale' },
  { v: 10,  s: '',  label: 'Settori di Intervento', note: 'Soluzione completa' },
  { v: 100, s: '%', label: 'Clienti Soddisfatti',   note: 'La nostra priorità' },
]

function Counter({ value, suffix, inView }) {
  const [c, setC] = useState(0)
  useEffect(() => {
    if (!inView) return
    let x = 0
    const step = value / (1400 / 16)
    const t = setInterval(() => {
      x += step
      if (x >= value) { setC(value); clearInterval(t) } else setC(Math.floor(x))
    }, 16)
    return () => clearInterval(t)
  }, [inView, value])
  return <>{c}{suffix}</>
}

export default function Stats() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 md:py-28 px-5 md:px-12 bg-bg relative" aria-label="Numeri aziendali">
      {/* Dividers */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0099ff]/15 to-transparent"/>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#0099ff]/15 to-transparent"/>

      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,80,220,0.07) 0%, transparent 70%)' }}/>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section label */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-12 md:mb-16">
          <span className="section-label">I Nostri Numeri</span>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative text-center rounded-2xl p-6 md:p-8 e-border e-bg group hover:border-[#0099ff]/25 transition-all duration-300">

              {/* Inner glow on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(ellipse at center, rgba(0,153,255,0.05) 0%, transparent 70%)' }}/>

              <p className="font-black text-text-p tracking-[-0.05em] mb-1 tabular-nums relative"
                style={{ fontSize: 'clamp(2.5rem,5.5vw,4.25rem)', textShadow: '0 0 24px rgba(0,153,255,0.35)' }}>
                <Counter value={s.v} suffix={s.s} inView={inView}/>
              </p>
              <p className="text-text-p text-sm font-semibold mb-1 relative">{s.label}</p>
              <p className="text-text-s text-xs relative">{s.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
