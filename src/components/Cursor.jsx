import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const x  = useMotionValue(-100)
  const y  = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 650, damping: 38, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 650, damping: 38, mass: 0.35 })

  const [hovered, setHovered] = useState(false)
  const [show,    setShow]    = useState(false)
  const [ready,   setReady]   = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setReady(true)
    document.documentElement.style.cursor = 'none'

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!show) setShow(true)
    }

    const onOver = (e) => {
      setHovered(
        !!e.target.closest('a, button, [role="button"], [role="link"], input, textarea, select')
      )
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.documentElement.style.cursor = ''
    }
  }, [x, y, show])

  if (!ready) return null

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{
        width:           hovered ? 30 : 9,
        height:          hovered ? 30 : 9,
        opacity:         show ? 1 : 0,
        backgroundColor: hovered ? 'rgba(56,189,248,0)'    : 'rgba(56,189,248,0.85)',
        borderWidth:     hovered ? 1.5                     : 0,
        borderColor:     'rgba(56,189,248,0.8)',
        borderStyle:     'solid',
        boxShadow:       hovered
          ? '0 0 16px rgba(56,189,248,0.25)'
          : '0 0 10px rgba(56,189,248,0.35)',
      }}
      transition={{ type: 'spring', stiffness: 320, damping: 28, mass: 0.5 }}
    />
  )
}
