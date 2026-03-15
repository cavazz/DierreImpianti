import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function PageBanner({ label, title, subtitle }) {
  const navigate = useNavigate()

  return (
    <section className="relative bg-dark overflow-hidden pt-16" aria-hidden="false">
      {/* Glow top */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(56,189,248,0.08) 0%, transparent 70%)' }}
        aria-hidden="true"/>
      {/* Subtle horizontal line top */}
      <div className="absolute top-16 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.15), transparent)' }}
        aria-hidden="true"/>

      <div className="container-xl py-14 md:py-18">
        {/* Back button */}
        <motion.button
          onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 text-text-xs hover:text-accent text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-200 mb-8 group">
          <motion.span whileHover={{ x: -3 }} transition={{ duration: 0.2 }}>
            <ArrowLeft size={12} aria-hidden="true"/>
          </motion.span>
          Home
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}>
          <span className="label">{label}</span>
          <h1
            className="font-display font-black text-text-p leading-[1.0] tracking-[-0.035em]"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}>
            {title}
          </h1>
          {subtitle && (
            <p className="text-text-s text-base leading-relaxed mt-4 max-w-lg">{subtitle}</p>
          )}
        </motion.div>
      </div>

      {/* Bottom border */}
      <div className="h-px" style={{ background: 'rgba(255,255,255,0.05)' }} aria-hidden="true"/>
    </section>
  )
}
