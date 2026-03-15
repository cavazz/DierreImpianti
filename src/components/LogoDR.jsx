import { motion } from 'framer-motion'

// Tre archi concentrici (come nel logo originale): blu, giallo, blu
// 270° di apertura, gap di 90° sul lato destro
const ARCS = [
  { r: 28, color: '#38bdf8', w: 4.5, speed: 3.6, delay: 0.0 },
  { r: 20, color: '#f5c430', w: 4.5, speed: 2.8, delay: 0.65 },
  { r: 12, color: '#38bdf8', w: 3.5, speed: 2.2, delay: 1.30 },
]

// Arco di 270°, gap centrato a destra (angolo 0°)
// start: 45° clockwise → end: -45° (315°) → sweep counterclockwise (large arc)
function arc(r) {
  const cx = 32, cy = 32, k = 0.70711 // sin/cos 45°
  const x = +(cx + r * k).toFixed(2)
  const y1 = +(cy + r * k).toFixed(2)  // punto start (basso-destra)
  const y2 = +(cy - r * k).toFixed(2)  // punto end (alto-destra)
  return { d: `M ${x} ${y1} A ${r} ${r} 0 1 0 ${x} ${y2}`, ex: x, ey1: y2, ey2: y1 }
}

export default function LogoDR({ className = '' }) {
  return (
    <svg
      viewBox="0 0 315 64"
      className={className}
      aria-label="Dierre Impianti"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="dr-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="dr-glow-y" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {ARCS.map(({ r, color, w, speed, delay }) => {
        const { d, ex, ey1, ey2 } = arc(r)
        const len = (270 / 360) * 2 * Math.PI * r
        const seg = +(len * 0.28).toFixed(1)
        const gap = +(len - seg).toFixed(1)
        const isYellow = color === '#f5c430'

        return (
          <g key={r}>
            {/* Traccia dim */}
            <path
              d={d}
              stroke={color}
              strokeWidth={w}
              fill="none"
              strokeLinecap="round"
              opacity={0.18}
            />

            {/* Segmento luminoso che scorre lungo l'arco */}
            <motion.path
              d={d}
              stroke={color}
              strokeWidth={w}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${seg} ${gap}`}
              animate={{ strokeDashoffset: [0, -len] }}
              transition={{
                duration: speed,
                repeat: Infinity,
                ease: 'linear',
                delay,
              }}
              filter={`url(#${isYellow ? 'dr-glow-y' : 'dr-glow'})`}
            />

            {/* Puntini pulsanti alle estremità dell'arco */}
            <motion.circle
              cx={ex} cy={ey1} r={2.5} fill={color}
              animate={{ opacity: [0.25, 1, 0.25] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay }}
            />
            <motion.circle
              cx={ex} cy={ey2} r={2.5} fill={color}
              animate={{ opacity: [0.25, 1, 0.25] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.9 }}
            />
          </g>
        )
      })}

      {/* Nome azienda */}
      <text
        x="72"
        y="41"
        fontFamily="Poppins, system-ui, sans-serif"
        fontWeight="900"
        fontSize="21"
        fill="#f0f4f8"
        letterSpacing="1.5"
      >
        DIERRE IMPIANTI
      </text>
    </svg>
  )
}
