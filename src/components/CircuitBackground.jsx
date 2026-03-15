import { useEffect, useRef } from 'react'

const A = '56,189,248' // rgb di #38bdf8

// Percorsi definiti come coordinate percentuali [x%, y%]
// Stile PCB: solo tratti orizzontali e verticali (no diagonali)
const RAW = [
  // Fascia alta
  [[5,12],[20,12],[20,28],[38,28],[38,12],[58,12],[58,32],[78,32],[78,18],[95,18]],
  // Fascia media alta
  [[0,38],[14,38],[14,24],[32,24],[32,48],[52,48],[52,34],[72,34],[72,52],[100,52]],
  // Fascia media bassa
  [[8,62],[24,62],[24,48],[44,48],[44,68],[64,68],[64,58],[84,58],[84,72],[100,72]],
  // Connettore bordo sinistro
  [[0,22],[10,22],[10,45],[0,45]],
  // Connettore bordo destro
  [[100,30],[90,30],[90,50],[100,50]],
  // Zona alta centrale — componenti verticali
  [[38,0],[38,20],[55,20],[55,8],[72,8],[72,26]],
  // Fascia bassa
  [[5,82],[22,82],[22,68],[42,68],[42,85],[62,85],[62,75],[82,75],[82,88],[98,88]],
  // Connettori verticali extra
  [[58,55],[58,78],[75,78],[75,100]],
  [[28,72],[28,100]],
  // Piccolo loop top-right
  [[72,0],[72,15],[88,15],[88,5],[100,5]],
]

// Capacitori: [indice_percorso, t (0..1 lungo il percorso)]
const CAPS = [
  [0, 0.30],[0, 0.72],
  [1, 0.42],[1, 0.78],
  [2, 0.38],[2, 0.68],
  [5, 0.55],
  [6, 0.35],[6, 0.65],
  [9, 0.50],
]

// Resistori: [indice_percorso, t]
const RESISTORS = [
  [0, 0.55],
  [1, 0.25],
  [2, 0.52],
  [6, 0.50],
]

function segLen(a, b) { return Math.hypot(b[0]-a[0], b[1]-a[1]) }

function totalLen(pts) {
  let l = 0
  for (let i = 1; i < pts.length; i++) l += segLen(pts[i-1], pts[i])
  return l
}

function pointAt(pts, d) {
  let rem = d
  for (let i = 1; i < pts.length; i++) {
    const sl = segLen(pts[i-1], pts[i])
    if (rem <= sl + 1e-9) {
      const t = Math.min(rem / sl, 1)
      return [pts[i-1][0] + t*(pts[i][0]-pts[i-1][0]), pts[i-1][1] + t*(pts[i][1]-pts[i-1][1])]
    }
    rem -= sl
  }
  return pts[pts.length - 1]
}

function dirAt(pts, d) {
  let rem = d
  for (let i = 1; i < pts.length; i++) {
    const sl = segLen(pts[i-1], pts[i])
    if (rem <= sl + 1e-9) {
      const dx = pts[i][0]-pts[i-1][0], dy = pts[i][1]-pts[i-1][1]
      const l = Math.hypot(dx, dy) || 1
      return [dx/l, dy/l]
    }
    rem -= sl
  }
  const n = pts.length
  const dx = pts[n-1][0]-pts[n-2][0], dy = pts[n-1][1]-pts[n-2][1]
  const l = Math.hypot(dx, dy) || 1
  return [dx/l, dy/l]
}

export default function CircuitBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let W = 1, H = 1

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // Converti [x%,y%] → px
    const px = ([x, y]) => [x * W / 100, y * H / 100]

    // Crea dots animati
    const dots = []
    RAW.forEach((_, pi) => {
      const n = 2 + Math.floor(Math.random() * 2)
      for (let j = 0; j < n; j++) {
        dots.push({
          pi,
          t: j / n + Math.random() * 0.05,
          speed: 0.00022 + Math.random() * 0.00018,
        })
      }
    })

    const drawCapacitor = (x, y, dx, dy) => {
      const px_ = -dy, py_ = dx
      const plate = 7, gap = 3.5
      ctx.strokeStyle = `rgba(${A},0.45)`
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(x - px_*plate - dx*gap, y - py_*plate - dy*gap)
      ctx.lineTo(x + px_*plate - dx*gap, y + py_*plate - dy*gap)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x - px_*plate + dx*gap, y - py_*plate + dy*gap)
      ctx.lineTo(x + px_*plate + dx*gap, y + py_*plate + dy*gap)
      ctx.stroke()
    }

    const drawResistor = (x, y, dx, dy) => {
      const px_ = -dy, py_ = dx
      const w = 10, h = 4.5
      ctx.strokeStyle = `rgba(${A},0.4)`
      ctx.lineWidth = 1.5
      ctx.strokeRect(x - dx*w - px_*h, y - dy*w - py_*h, dx*w*2 + px_*h*2, dy*w*2 + py_*h*2)
      // Se il rettangolo è degenerato (traccio orizzontale/verticale), disegna manualmente
      ctx.beginPath()
      ctx.moveTo(x - dx*w - px_*h, y - dy*w - py_*h)
      ctx.lineTo(x + dx*w - px_*h, y + dy*w - py_*h)
      ctx.lineTo(x + dx*w + px_*h, y + dy*w + py_*h)
      ctx.lineTo(x - dx*w + px_*h, y - dy*w + py_*h)
      ctx.closePath()
      ctx.stroke()
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      const paths = RAW.map(def => def.map(px))

      // Trace
      ctx.lineWidth = 1.2
      paths.forEach(pts => {
        ctx.beginPath()
        pts.forEach(([x,y], i) => i === 0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y))
        ctx.strokeStyle = `rgba(${A},0.065)`
        ctx.stroke()
      })

      // Via (nodi ai corner)
      paths.forEach(pts => {
        pts.forEach(([x,y], i) => {
          if (i === 0 || i === pts.length - 1) return
          ctx.beginPath()
          ctx.arc(x, y, 3, 0, Math.PI*2)
          ctx.fillStyle = `rgba(${A},0.20)`
          ctx.fill()
          ctx.beginPath()
          ctx.arc(x, y, 5.5, 0, Math.PI*2)
          ctx.strokeStyle = `rgba(${A},0.09)`
          ctx.lineWidth = 1
          ctx.stroke()
        })
      })

      // Condensatori
      CAPS.forEach(([pi, t]) => {
        const pts = paths[pi]
        if (!pts) return
        const len = totalLen(pts)
        const [x, y] = pointAt(pts, t * len)
        const [dx, dy] = dirAt(pts, t * len)
        drawCapacitor(x, y, dx, dy)
      })

      // Resistori
      RESISTORS.forEach(([pi, t]) => {
        const pts = paths[pi]
        if (!pts) return
        const len = totalLen(pts)
        const [x, y] = pointAt(pts, t * len)
        const [dx, dy] = dirAt(pts, t * len)
        drawResistor(x, y, dx, dy)
      })

      // Dots animati con glow
      dots.forEach(dot => {
        dot.t = (dot.t + dot.speed) % 1
        const pts = paths[dot.pi]
        const len = totalLen(pts)
        const d = dot.t * len

        const [x, y] = pointAt(pts, d)

        // Scia
        const TAIL = 12
        for (let i = TAIL; i >= 1; i--) {
          const td = ((dot.t - (i / TAIL) * 0.055) % 1 + 1) % 1
          const [tx, ty] = pointAt(pts, td * len)
          ctx.beginPath()
          ctx.arc(tx, ty, 1.2, 0, Math.PI*2)
          ctx.fillStyle = `rgba(${A},${(1 - i/TAIL) * 0.3})`
          ctx.fill()
        }

        // Glow esterno
        const grd = ctx.createRadialGradient(x, y, 0, x, y, 12)
        grd.addColorStop(0,   `rgba(${A},0.65)`)
        grd.addColorStop(0.35,`rgba(${A},0.20)`)
        grd.addColorStop(1,   `rgba(${A},0)`)
        ctx.beginPath()
        ctx.arc(x, y, 12, 0, Math.PI*2)
        ctx.fillStyle = grd
        ctx.fill()

        // Core luminoso
        ctx.beginPath()
        ctx.arc(x, y, 2.5, 0, Math.PI*2)
        ctx.fillStyle = `rgba(${A},1)`
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}
