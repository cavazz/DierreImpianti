/**
 * EnergyWaves — oscilloscope-style sine waves, pure SVG + CSS.
 * Zero canvas, zero JS animation loop → near-zero perf cost.
 */

const WAVES = [
  // { cy, amplitude, period, opacity, duration, delay, color }
  { cy: 28,  a: 55, p: 520, op: 0.22, dur: '9s',  del: '0s',    c: '#00d4ff' },
  { cy: 52,  a: 40, p: 380, op: 0.14, dur: '7s',  del: '-2.5s', c: '#0099ff' },
  { cy: 72,  a: 65, p: 620, op: 0.10, dur: '12s', del: '-5s',   c: '#00d4ff' },
]

// Build a sine-wave SVG path for a given viewport height percentage
function wavePath(cyPct, amplitude, period, totalWidth) {
  // start at 3× width so the scroll loop is seamless
  const W = totalWidth
  const cy = cyPct // percentage string used in SVG — we use a 100×100 viewBox
  const a  = amplitude / 10 // scale amplitude to the 0–100 viewBox

  let d = `M -${period / 5} ${cy}`
  let x = -period / 5
  while (x < W + period) {
    // one full period via two cubic beziers
    d += ` C ${x + period / 4} ${cy - a}, ${x + period / 4} ${cy - a}, ${x + period / 2} ${cy}`
    d += ` C ${x + 3 * period / 4} ${cy + a}, ${x + 3 * period / 4} ${cy + a}, ${x + period} ${cy}`
    x += period
  }
  return d
}

export default function EnergyWaves() {
  // viewBox: 0 0 1000 100  (wide, thin strip scaled to the container)
  const VW = 1000

  return (
    <>
      {/* Inject keyframes once */}
      <style>{`
        @keyframes waveScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-${VW / 3}px); }
        }
      `}</style>

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${VW} 100`}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <filter id="wglow" x="-20%" y="-200%" width="140%" height="500%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {WAVES.map((w, i) => (
          <path
            key={i}
            d={wavePath(w.cy, w.a, w.p, VW * 3)}
            stroke={w.c}
            strokeWidth="0.6"
            fill="none"
            opacity={w.op}
            filter="url(#wglow)"
            style={{
              animation: `waveScroll ${w.dur} ${w.del} linear infinite`,
              willChange: 'transform',
            }}
          />
        ))}

        {/* Static faint horizontal "voltage reference" lines */}
        {[20, 50, 80].map(y => (
          <line key={y} x1="0" y1={y} x2={VW} y2={y}
            stroke="#0099ff" strokeWidth="0.3" opacity="0.07"
            strokeDasharray="4 12" />
        ))}
      </svg>
    </>
  )
}
