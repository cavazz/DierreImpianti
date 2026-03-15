import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * TiltCard — mouse-tracking 3-D tilt with cursor-following glow.
 * Drop-in wrapper: <TiltCard className="...">content</TiltCard>
 */
export default function TiltCard({ children, className = '', style = {}, strength = 14 }) {
  const ref = useRef(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)

  const springCfg = { stiffness: 220, damping: 22, mass: 0.6 }
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [strength, -strength]), springCfg)
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-strength, strength]), springCfg)

  function onMove(e) {
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const nx = (e.clientX - left) / width - 0.5
    const ny = (e.clientY - top)  / height - 0.5
    rawX.set(nx)
    rawY.set(ny)
    glowX.set(((nx + 0.5) * 100))
    glowY.set(((ny + 0.5) * 100))
  }

  function onLeave() {
    rawX.set(0)
    rawY.set(0)
    glowX.set(50)
    glowY.set(50)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        ...style,
      }}
      className={className}
    >
      {/* cursor-following glow */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-[inherit] pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) =>
              `radial-gradient(circle at ${x}% ${y}%, rgba(245,196,48,0.13) 0%, rgba(56,189,248,0.08) 40%, transparent 70%)`
          ),
        }}
      />
      {children}
    </motion.div>
  )
}
