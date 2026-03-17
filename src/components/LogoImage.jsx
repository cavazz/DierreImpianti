import { motion } from 'framer-motion'

// Wrapper variants
const wrap = {
  rest:  { scale: 1,    boxShadow: '0 0 0 0px rgba(56,189,248,0)' },
  hover: { scale: 1.05, boxShadow: '0 0 0 2.5px rgba(56,189,248,0.75), 0 0 22px rgba(56,189,248,0.28)',
           transition: { type: 'spring', stiffness: 380, damping: 22 } },
  tap:   { scale: 0.95, boxShadow: '0 0 0 3px rgba(245,196,48,0.9), 0 0 18px rgba(245,196,48,0.35)',
           transition: { duration: 0.1 } },
}

// Shimmer sweep
const shine = {
  rest:  { x: '-130%', skewX: '-18deg' },
  hover: { x: '230%',  skewX: '-18deg',
           transition: { duration: 0.52, ease: [0.4, 0, 0.2, 1] } },
}

export default function LogoImage({ className = '' }) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl bg-white inline-flex items-center py-1.5 px-3 select-none ${className}`}
      variants={wrap}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      style={{ cursor: 'pointer' }}
    >
      {/* Shimmer */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-10"
        variants={shine}
        style={{
          background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.72) 50%, transparent 80%)',
          width: '45%',
        }}
      />

      {/* Logo originale */}
      <picture className="h-full relative z-10">
        <source srcSet="/logo.webp" type="image/webp" />
        <img
          src="/logo.png"
          alt="Dierre Impianti"
          className="h-full w-auto object-contain"
          draggable={false}
        />
      </picture>
    </motion.div>
  )
}
