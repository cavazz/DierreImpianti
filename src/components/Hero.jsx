import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, ChevronDown, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import CircuitBackground    from './CircuitBackground'
import MotherboardBackground from './MotherboardBackground'

export default function Hero() {
  const navigate   = useNavigate()
  const sectionRef = useRef(null)

  const goServizi  = () => { navigate('/servizi');  window.scrollTo({ top: 0 }) }
  const goContatti = () => { navigate('/contatti'); window.scrollTo({ top: 0 }) }

  // ── GSAP entrance timeline ──────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Badge scale-in
      tl.from('.hero-badge', {
        opacity: 0, scale: 0.86, duration: 0.6,
        ease: 'expo.out',
      }, 0.15)

      // Headline — mask reveal per linea (stagger)
      tl.from('.hero-line', {
        yPercent: 112, duration: 0.92,
        ease: 'expo.out', stagger: 0.1,
      }, 0.28)

      // Glowing separator scaleX
      tl.from('.hero-sep', {
        scaleX: 0, opacity: 0, duration: 0.62,
        ease: 'expo.out', transformOrigin: 'center',
      }, 0.82)

      // Subtitle fade-up
      tl.from('.hero-sub', {
        opacity: 0, y: 22, duration: 0.72,
        ease: 'power2.out',
      }, 0.9)

      // CTA buttons
      tl.from('.hero-cta', {
        opacity: 0, y: 18, duration: 0.65,
        ease: 'power2.out',
      }, 1.0)

      // Scroll cue
      tl.from('.hero-scroll', {
        opacity: 0, duration: 0.55,
      }, 1.55)

      // Scroll cue icon — bounce loop GSAP (più morbido di CSS animate-bounce)
      gsap.to('.hero-scroll-icon', {
        y: 5, repeat: -1, yoyo: true,
        duration: 0.72, ease: 'power1.inOut',
        delay: 2.1,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-label="Intestazione"
      className="relative min-h-[100svh] flex flex-col bg-dark overflow-hidden"
    >

      {/* Radial glow top */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 55% at 50% -5%, rgba(56,189,248,0.07) 0%, transparent 65%)' }}/>

      <MotherboardBackground />
      <CircuitBackground />

      {/* Vignetta centrale */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-[1]"
        style={{ background: 'radial-gradient(ellipse 75% 80% at 50% 50%, rgba(13,21,32,0.72) 0%, transparent 100%)' }}/>

      {/* ── Contenuto ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center container-xl pt-20 pb-14 md:py-28">
        <div className="flex flex-col items-center text-center max-w-3xl w-full mx-auto">

          {/* Location badge */}
          <div className="hero-badge mb-5 md:mb-8">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full
                         text-[10px] md:text-[11px] font-bold tracking-[0.18em] uppercase cursor-default"
              style={{ border: '1px solid rgba(56,189,248,0.22)', background: 'rgba(56,189,248,0.06)', color: '#38bdf8' }}>
              <MapPin size={10} aria-hidden="true"/>
              Piove di Sacco · Padova · Dal 2003
            </span>
          </div>

          {/* ── Headline — mask wrapper per ogni linea ── */}
          <h1
            className="font-display font-black text-text-p tracking-[-0.04em] mb-4 md:mb-5"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 6.5rem)', lineHeight: 0.92 }}
          >
            <div className="overflow-hidden" style={{ paddingBottom: '0.06em' }}>
              <span className="hero-line block">Impianti</span>
            </div>
            <div className="overflow-hidden" style={{ paddingBottom: '0.06em' }}>
              <span className="hero-line block gradient-text">tecnologici</span>
            </div>
            <div className="overflow-hidden" style={{ paddingBottom: '0.06em' }}>
              <span className="hero-line block">eccellenti.</span>
            </div>
          </h1>

          {/* Glowing separator */}
          <div
            aria-hidden="true"
            className="hero-sep my-5 md:my-7 h-px w-16 md:w-20"
            style={{ background: 'linear-gradient(90deg, transparent, #f5c430, #38bdf8, transparent)' }}
          />

          {/* Subtitle */}
          <p className="hero-sub text-text-s text-sm md:text-lg leading-relaxed mb-8 md:mb-10 max-w-sm md:max-w-lg">
            Impianti elettrici, fotovoltaico, domotica e sicurezza.
            Progettiamo e installiamo a Padova dal 2003.
          </p>

          {/* CTA */}
          <div className="hero-cta flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <motion.button
              onClick={goServizi}
              whileHover={{ scale: 1.03, filter: 'brightness(1.06)' }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2"
              style={{ transition: 'filter 0.2s, transform 0.15s' }}>
              Scopri i Servizi
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
      </div>

      {/* Bottom separator */}
      <div aria-hidden="true" className="h-px relative z-10" style={{ background: 'rgba(255,255,255,0.05)' }}/>

      {/* Scroll cue */}
      <button
        onClick={goServizi}
        aria-label="Vai ai servizi"
        className="hero-scroll absolute bottom-4 md:bottom-7 left-1/2 -translate-x-1/2
                   flex flex-col items-center gap-1.5 text-text-xs hover:text-accent
                   transition-colors duration-200 z-10 cursor-pointer"
      >
        <span className="text-[10px] font-bold tracking-[0.22em] uppercase">Scorri</span>
        <ChevronDown size={14} aria-hidden="true" className="hero-scroll-icon"/>
      </button>
    </section>
  )
}
