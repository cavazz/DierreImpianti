import { useEffect, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

/* ── Touch ripple ─────────────────────────────────────────── */
function Ripple({ id, x, y, onDone }) {
  return (
    <motion.div
      key={id}
      aria-hidden="true"
      className="fixed pointer-events-none z-[9999] rounded-full"
      style={{ left: x, top: y, translateX: '-50%', translateY: '-50%' }}
      initial={{ width: 0, height: 0, opacity: 0.7 }}
      animate={{ width: 80, height: 80, opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onAnimationComplete={onDone}
      sx={{
        border: '2px solid rgba(245,196,48,0.8)',
        boxShadow: '0 0 12px rgba(245,196,48,0.4)',
      }}
    />
  )
}

/* ── Desktop cursor ───────────────────────────────────────── */
function DesktopCursor() {
  const x  = useMotionValue(-100)
  const y  = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 650, damping: 38, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 650, damping: 38, mass: 0.35 })

  const [hovered, setHovered] = useState(false)
  const [show,    setShow]    = useState(false)

  useEffect(() => {
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

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{
        width:           hovered ? 32 : 10,
        height:          hovered ? 32 : 10,
        opacity:         show ? 1 : 0,
        backgroundColor: hovered ? 'rgba(245,196,48,0)'    : 'rgba(245,196,48,0.9)',
        borderWidth:     hovered ? 2                       : 0,
        borderColor:     'rgba(245,196,48,0.85)',
        borderStyle:     'solid',
        boxShadow:       hovered
          ? '0 0 18px rgba(245,196,48,0.35)'
          : '0 0 12px rgba(245,196,48,0.5)',
      }}
      transition={{ type: 'spring', stiffness: 320, damping: 28, mass: 0.5 }}
    />
  )
}

/* ── Touch ripple manager ─────────────────────────────────── */
function TouchRipples() {
  const [ripples, setRipples] = useState([])

  const addRipple = useCallback((e) => {
    const touch = e.changedTouches[0]
    if (!touch) return
    const id = Date.now() + Math.random()
    setRipples(prev => [...prev, { id, x: touch.clientX, y: touch.clientY }])
  }, [])

  const removeRipple = useCallback((id) => {
    setRipples(prev => prev.filter(r => r.id !== id))
  }, [])

  useEffect(() => {
    window.addEventListener('touchstart', addRipple, { passive: true })
    return () => window.removeEventListener('touchstart', addRipple)
  }, [addRipple])

  return (
    <>
      {ripples.map(r => (
        <motion.div
          key={r.id}
          aria-hidden="true"
          className="fixed pointer-events-none z-[9999] rounded-full"
          style={{
            left: r.x,
            top: r.y,
            translateX: '-50%',
            translateY: '-50%',
            border: '2px solid rgba(245,196,48,0.85)',
            boxShadow: '0 0 14px rgba(245,196,48,0.4)',
          }}
          initial={{ width: 0, height: 0, opacity: 0.8 }}
          animate={{ width: 72, height: 72, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          onAnimationComplete={() => removeRipple(r.id)}
        />
      ))}
    </>
  )
}

/* ── Main export ──────────────────────────────────────────── */
export default function Cursor() {
  const [inputType, setInputType] = useState(null) // 'mouse' | 'touch' | null

  useEffect(() => {
    const hasFine  = window.matchMedia('(pointer: fine)').matches
    const hasCoarse = window.matchMedia('(pointer: coarse)').matches

    if (hasFine && !hasCoarse) setInputType('mouse')
    else if (hasCoarse)        setInputType('touch')
    else                       setInputType('mouse')
  }, [])

  if (inputType === 'mouse')  return <DesktopCursor />
  if (inputType === 'touch')  return <TouchRipples />
  return null
}
