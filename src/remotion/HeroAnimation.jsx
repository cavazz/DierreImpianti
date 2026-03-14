import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion'

const PERIOD = 120
const SEGMENTS = [
  { x1:-20,  y1:200,  x2:380,  y2:200,  delay:0  },{ x1:380,  y1:200,  x2:380,  y2:80,   delay:8  },
  { x1:380,  y1:80,   x2:720,  y2:80,   delay:16 },{ x1:720,  y1:80,   x2:720,  y2:320,  delay:24 },
  { x1:720,  y1:320,  x2:1020, y2:320,  delay:30 },{ x1:1100, y1:-20,  x2:1100, y2:180,  delay:10 },
  { x1:1100, y1:180,  x2:1380, y2:180,  delay:18 },{ x1:1380, y1:180,  x2:1380, y2:420,  delay:26 },
  { x1:1380, y1:420,  x2:1600, y2:420,  delay:34 },{ x1:1600, y1:420,  x2:1600, y2:240,  delay:40 },
  { x1:1600, y1:240,  x2:1940, y2:240,  delay:46 },{ x1:200,  y1:520,  x2:200,  y2:740,  delay:5  },
  { x1:200,  y1:740,  x2:560,  y2:740,  delay:13 },{ x1:560,  y1:740,  x2:560,  y2:560,  delay:21 },
  { x1:560,  y1:560,  x2:860,  y2:560,  delay:29 },{ x1:1940, y1:620,  x2:1680, y2:620,  delay:15 },
  { x1:1680, y1:620,  x2:1680, y2:800,  delay:23 },{ x1:1680, y1:800,  x2:1440, y2:800,  delay:31 },
  { x1:1440, y1:800,  x2:1440, y2:640,  delay:38 },{ x1:1440, y1:640,  x2:1200, y2:640,  delay:44 },
  { x1:300,  y1:900,  x2:700,  y2:900,  delay:12 },{ x1:700,  y1:900,  x2:700,  y2:1100, delay:20 },
  { x1:900,  y1:1100, x2:900,  y2:920,  delay:28 },{ x1:900,  y1:920,  x2:1160, y2:920,  delay:35 },
  { x1:1160, y1:920,  x2:1160, y2:1100, delay:42 },
]
const NODES = [
  {cx:380,cy:200},{cx:720,cy:80},{cx:720,cy:320},{cx:1100,cy:180},{cx:1380,cy:180},
  {cx:1380,cy:420},{cx:1600,cy:420},{cx:200,cy:740},{cx:560,cy:740},{cx:560,cy:560},
  {cx:1680,cy:620},{cx:1680,cy:800},{cx:1440,cy:800},{cx:1440,cy:640},{cx:700,cy:900},
  {cx:900,cy:920},{cx:1160,cy:920},
]

function segLen(s){ return Math.sqrt((s.x2-s.x1)**2+(s.y2-s.y1)**2) }

function Seg({ seg, frame }) {
  const len = segLen(seg)
  const P   = Math.min(len * 0.3, 120)
  const raw = (frame - seg.delay*2 + 999*PERIOD) % PERIOD
  const off = -(raw/PERIOD)*len
  return (
    <g>
      <line x1={seg.x1} y1={seg.y1} x2={seg.x2} y2={seg.y2} stroke="rgba(0,153,255,0.18)" strokeWidth="1"/>
      <line x1={seg.x1} y1={seg.y1} x2={seg.x2} y2={seg.y2}
        stroke="rgba(0,212,255,0.95)" strokeWidth="1.8"
        strokeDasharray={`${P} ${len-P}`} strokeDashoffset={off}
        style={{filter:'drop-shadow(0 0 5px rgba(0,212,255,1))'}}/>
    </g>
  )
}

function Node({ node, frame }) {
  const p = Math.sin(frame*0.06 + node.cx*0.003)*0.5+0.5
  const r = 2.8 + p*1.8
  return (
    <g>
      <circle cx={node.cx} cy={node.cy} r={r+8} fill="rgba(0,153,255,0.05)"/>
      <circle cx={node.cx} cy={node.cy} r={r} fill="rgba(0,212,255,0.95)" opacity={0.4+p*0.55}
        style={{filter:'drop-shadow(0 0 6px rgba(0,212,255,1))'}}/>
    </g>
  )
}

function Pulse({ frame, cx, cy, start }) {
  const e = (frame-start+9999)%150, p = e/150
  const r = p*600
  const op = interpolate(p,[0,0.4,1],[0.3,0.12,0],{extrapolateRight:'clamp'})
  return <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(0,153,255,0.5)" strokeWidth="1" opacity={op}/>
}

export function HeroAnimation() {
  const frame = useCurrentFrame()
  return (
    <AbsoluteFill style={{background:'transparent'}}>
      <svg viewBox="0 0 1920 1080" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        {SEGMENTS.map((s,i)=><Seg key={i} seg={s} frame={frame}/>)}
        {NODES.map((n,i)=><Node key={i} node={n} frame={frame}/>)}
        <Pulse frame={frame} cx={960} cy={540} start={0}/>
        <Pulse frame={frame} cx={960} cy={540} start={75}/>
        <Pulse frame={frame} cx={380} cy={200} start={30}/>
        <Pulse frame={frame} cx={1440} cy={800} start={60}/>
      </svg>
    </AbsoluteFill>
  )
}
