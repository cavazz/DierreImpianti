import { useScroll, useSpring, motion } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 inset-x-0 h-[2px] z-[200] origin-left pointer-events-none"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #f5c430 0%, #38bdf8 100%)',
      }}
    />
  )
}
