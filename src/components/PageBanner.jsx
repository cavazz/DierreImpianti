import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'

export default function PageBanner({ label, title, subtitle }) {
  const navigate   = useNavigate()
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.from('.pb-back', {
        opacity: 0, x: -14, duration: 0.4,
        ease: 'power2.out',
      }, 0.1)

      tl.from('.pb-label', {
        opacity: 0, y: 10, duration: 0.45,
        ease: 'power2.out',
      }, 0.22)

      tl.from('.pb-title', {
        opacity: 0, y: 22, duration: 0.62,
        ease: 'expo.out',
      }, 0.3)

      tl.from('.pb-sub', {
        opacity: 0, y: 14, duration: 0.5,
        ease: 'power2.out',
      }, 0.48)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-dark overflow-hidden pt-16" aria-hidden="false">
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
        <button
          onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="pb-back inline-flex items-center gap-2 text-text-xs hover:text-accent text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-200 mb-8 group">
          <motion.span whileHover={{ x: -3 }} transition={{ duration: 0.2 }}>
            <ArrowLeft size={12} aria-hidden="true"/>
          </motion.span>
          Home
        </button>

        <div>
          <span className="pb-label label">{label}</span>
          <h1
            className="pb-title font-display font-black text-text-p leading-[1.0] tracking-[-0.035em]"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}>
            {title}
          </h1>
          {subtitle && (
            <p className="pb-sub text-text-s text-base leading-relaxed mt-4 max-w-lg">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Bottom border */}
      <div className="h-px" style={{ background: 'rgba(255,255,255,0.05)' }} aria-hidden="true"/>
    </section>
  )
}
