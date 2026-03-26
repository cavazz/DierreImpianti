import { motion } from 'framer-motion'

/**
 * LogoImage — usa /logo.svg (silhouette bianca su trasparente).
 * Il className controlla la dimensione (es. h-9, h-10, h-12).
 * Il colore si adatta via CSS filter per contesti chiari/scuri.
 */
export default function LogoImage({ className = '', style = {} }) {
  return (
    <motion.img
      src="/logo.svg"
      alt="Dierre Impianti"
      className={`block w-auto object-contain select-none flex-shrink-0 ${className}`}
      draggable={false}
      loading="eager"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.93 }}
      transition={{ type: 'spring', stiffness: 400, damping: 24 }}
      style={{
        cursor: 'pointer',
        filter: 'brightness(0) invert(1) drop-shadow(0 0 8px rgba(255,255,255,0.35))',
        ...style,
      }}
    />
  )
}
