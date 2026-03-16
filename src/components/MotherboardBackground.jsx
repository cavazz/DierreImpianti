// Circuito elettronico generico — sfondo PCB stilizzato
// Componenti: IC DIP, IC SMD, resistori, condensatori, transistor, tracce, vias
const A = '56,189,248'
const c = v => `rgba(${A},${v})`

// DIP IC package (corpo rettangolare + pin su entrambi i lati)
function DipIC({ x, y, w = 36, h = 56, pins = 8, label = '' }) {
  const pinSpacing = h / (pins / 2 + 1)
  const leftPins  = Array.from({ length: pins / 2 }, (_, i) => y + pinSpacing * (i + 1))
  const rightPins = [...leftPins].reverse()
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={c(0.11)} strokeWidth="1.2" rx="2"/>
      {/* Notch orientamento */}
      <path d={`M ${x + w/2 - 6} ${y} A 6 6 0 0 1 ${x + w/2 + 6} ${y}`} fill="none" stroke={c(0.1)} strokeWidth="1"/>
      {/* Pin sinistri */}
      {leftPins.map((py, i) => (
        <g key={`l${i}`}>
          <line x1={x - 10} y1={py} x2={x} y2={py} stroke={c(0.09)} strokeWidth="1.2"/>
          <rect x={x - 13} y={py - 2} width="4" height="4" fill={c(0.08)}/>
        </g>
      ))}
      {/* Pin destri */}
      {rightPins.map((py, i) => (
        <g key={`r${i}`}>
          <line x1={x + w} y1={py} x2={x + w + 10} y2={py} stroke={c(0.09)} strokeWidth="1.2"/>
          <rect x={x + w + 9} y={py - 2} width="4" height="4" fill={c(0.08)}/>
        </g>
      ))}
      {label && (
        <text x={x + w/2} y={y + h/2 + 3} textAnchor="middle" fontFamily="monospace"
          fontSize="7" fill={c(0.13)} letterSpacing="0.5">{label}</text>
      )}
    </g>
  )
}

// SMD IC (rettangolo con pad su due lati)
function SmdIC({ x, y, w = 30, h = 20, pads = 4, label = '' }) {
  const padSpacing = h / (pads + 1)
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={c(0.11)} strokeWidth="1.2" rx="1"/>
      {Array.from({ length: pads }, (_, i) => {
        const py = y + padSpacing * (i + 1)
        return (
          <g key={i}>
            <rect x={x - 7} y={py - 2.5} width="7" height="5" fill="none" stroke={c(0.09)} strokeWidth="0.8"/>
            <rect x={x + w} y={py - 2.5} width="7" height="5" fill="none" stroke={c(0.09)} strokeWidth="0.8"/>
          </g>
        )
      })}
      {label && (
        <text x={x + w/2} y={y + h/2 + 3} textAnchor="middle" fontFamily="monospace"
          fontSize="5.5" fill={c(0.12)}>{label}</text>
      )}
    </g>
  )
}

// Condensatore elettrolitico (cerchio con +)
function ElecCap({ x, y, r = 9 }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="none" stroke={c(0.11)} strokeWidth="1.2"/>
      <line x1={x - r/2} y1={y - 2} x2={x + r/2} y2={y - 2} stroke={c(0.1)} strokeWidth="1"/>
      <line x1={x} y1={y - r/2 - 1} x2={x} y2={y - 2 - (r/2 - 1)} stroke={c(0.1)} strokeWidth="1"/>
    </g>
  )
}

// Condensatore SMD (rettangolino)
function SmdCap({ x, y, w = 8, h = 5 }) {
  return <rect x={x - w/2} y={y - h/2} width={w} height={h} fill="none" stroke={c(0.1)} strokeWidth="0.9" rx="0.5"/>
}

// Resistore SMD
function SmdRes({ x, y, w = 10, h = 5 }) {
  return (
    <g>
      <rect x={x - w/2} y={y - h/2} width={w} height={h} fill="none" stroke={c(0.1)} strokeWidth="0.9" rx="0.5"/>
      <line x1={x - w/2 - 4} y1={y} x2={x - w/2} y2={y} stroke={c(0.08)} strokeWidth="0.8"/>
      <line x1={x + w/2} y1={y} x2={x + w/2 + 4} y2={y} stroke={c(0.08)} strokeWidth="0.8"/>
    </g>
  )
}

// Transistor TO-92 (cerchio con 3 pin)
function Transistor({ x, y, r = 10 }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="none" stroke={c(0.11)} strokeWidth="1.2"/>
      <line x1={x}     y1={y + r} x2={x}     y2={y + r + 12} stroke={c(0.09)} strokeWidth="1"/>
      <line x1={x - 7} y1={y + r} x2={x - 7} y2={y + r + 12} stroke={c(0.09)} strokeWidth="1"/>
      <line x1={x + 7} y1={y + r} x2={x + 7} y2={y + r + 12} stroke={c(0.09)} strokeWidth="1"/>
    </g>
  )
}

// Via (piazzola passante)
function Via({ x, y }) {
  return (
    <g>
      <circle cx={x} cy={y} r="4" fill="none" stroke={c(0.1)} strokeWidth="1.2"/>
      <circle cx={x} cy={y} r="1.5" fill={c(0.09)}/>
    </g>
  )
}

// Cristallo oscillatore (rettangolo arrotondato con pin)
function Crystal({ x, y }) {
  return (
    <g>
      <rect x={x - 8} y={y - 18} width="16" height="36" fill="none" stroke={c(0.11)} strokeWidth="1.2" rx="4"/>
      <line x1={x} y1={y - 18} x2={x} y2={y - 28} stroke={c(0.09)} strokeWidth="1"/>
      <line x1={x} y1={y + 18} x2={x} y2={y + 28} stroke={c(0.09)} strokeWidth="1"/>
    </g>
  )
}

export default function MotherboardBackground() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1200 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ─── Tracce di alimentazione (spesse) ─── */}
      <line x1="80"  y1="100" x2="1120" y2="100" stroke={c(0.045)} strokeWidth="3"/>
      <line x1="80"  y1="800" x2="1120" y2="800" stroke={c(0.045)} strokeWidth="3"/>
      <line x1="100" y1="100" x2="100"  y2="800" stroke={c(0.04)}  strokeWidth="2.5"/>
      <line x1="1100" y1="100" x2="1100" y2="800" stroke={c(0.04)} strokeWidth="2.5"/>

      {/* ─── Tracce segnale (medie) ─── */}
      {[180,260,340,440,540,620,700,760].map((y, i) => (
        <line key={`th-${i}`} x1="80" y1={y} x2="1120" y2={y} stroke={c(0.028)} strokeWidth="1.2"/>
      ))}
      {[200,320,440,560,680,800,920,1040].map((x, i) => (
        <line key={`tv-${i}`} x1={x} y1="80" x2={x} y2="820" stroke={c(0.025)} strokeWidth="1"/>
      ))}

      {/* Tracce collegate a componenti */}
      <polyline points="260,180 260,280 320,280 320,340" fill="none" stroke={c(0.05)} strokeWidth="1.5"/>
      <polyline points="560,340 560,440 680,440 680,540" fill="none" stroke={c(0.05)} strokeWidth="1.5"/>
      <polyline points="800,260 920,260 920,340 1040,340" fill="none" stroke={c(0.045)} strokeWidth="1.4"/>
      <polyline points="200,540 200,620 320,620 320,700" fill="none" stroke={c(0.04)} strokeWidth="1.3"/>
      <polyline points="680,620 680,700 800,700 800,760" fill="none" stroke={c(0.04)} strokeWidth="1.3"/>
      <polyline points="440,180 440,260 560,260 560,340" fill="none" stroke={c(0.04)} strokeWidth="1.2"/>
      <polyline points="920,540 1040,540 1040,620" fill="none" stroke={c(0.04)} strokeWidth="1.2"/>

      {/* ─── IC DIP (vari) ─── */}
      <DipIC x={230} y={280} w={40} h={64} pins={8}  label="LM358"/>
      <DipIC x={500} y={360} w={40} h={80} pins={14} label="NE555"/>
      <DipIC x={860} y={240} w={40} h={96} pins={16} label="CD4017"/>
      <DipIC x={180} y={560} w={40} h={64} pins={8}  label="TL071"/>
      <DipIC x={640} y={550} w={40} h={80} pins={14} label="LM324"/>
      <DipIC x={980} y={480} w={40} h={64} pins={8}  label="UA741"/>

      {/* ─── IC SMD ─── */}
      <SmdIC x={400} y={180} w={28} h={24} pads={4} label="L7805"/>
      <SmdIC x={720} y={600} w={32} h={28} pads={4} label="LM317"/>
      <SmdIC x={900} y={680} w={28} h={20} pads={3} label="78L05"/>

      {/* ─── Condensatori elettrolitici ─── */}
      <ElecCap x={300} y={200} r={10}/>
      <ElecCap x={580} y={200} r={8}/>
      <ElecCap x={820} y={500} r={10}/>
      <ElecCap x={460} y={680} r={12}/>
      <ElecCap x={1060} y={620} r={9}/>
      <ElecCap x={150}  y={700} r={8}/>

      {/* ─── Condensatori SMD ─── */}
      {[
        [350,300],[420,300],[350,360],[420,360],
        [660,280],[720,280],[660,340],
        [950,360],[1010,360],
        [260,500],[330,500],
        [800,760],[860,760],
      ].map(([x,y],i) => <SmdCap key={`sc-${i}`} x={x} y={y}/>)}

      {/* ─── Resistori SMD ─── */}
      {[
        [280,440],[340,440],[280,480],[340,480],
        [580,480],[640,480],[580,520],
        [1000,260],[1060,260],[1000,300],
        [200,660],[260,660],
        [760,400],[820,400],[760,440],
        [520,700],[580,700],
      ].map(([x,y],i) => <SmdRes key={`sr-${i}`} x={x} y={y}/>)}

      {/* ─── Transistor ─── */}
      <Transistor x={460} y={520} r={10}/>
      <Transistor x={740} y={340} r={10}/>
      <Transistor x={1080} y={400} r={10}/>
      <Transistor x={360} y={740} r={9}/>
      <Transistor x={600} y={760} r={9}/>

      {/* ─── Cristalli oscillatori ─── */}
      <Crystal x={700} y={200}/>
      <Crystal x={160} y={400}/>

      {/* ─── Vias sparse ─── */}
      {[
        [200,180],[320,180],[440,260],[560,260],[680,260],[800,180],[920,180],[1040,180],
        [200,440],[320,440],[680,440],[800,440],[920,440],[1040,440],
        [200,700],[320,700],[440,700],[560,700],[920,700],[1040,700],
        [440,540],[560,540],[920,540],
        [130,340],[130,560],
      ].map(([x,y],i) => <Via key={`v-${i}`} x={x} y={y}/>)}

      {/* ─── Connettore (header 2×6) ─── */}
      {Array.from({length:2}, (_,row) => Array.from({length:6}, (_,col) => (
        <rect key={`hdr-${row}-${col}`}
          x={1060 + col * 14} y={740 + row * 14}
          width="10" height="10"
          fill="none" stroke={c(0.1)} strokeWidth="1" rx="1"
        />
      )))}

      {/* ─── Connettore alimentazione (barrel jack) ─── */}
      <circle cx={130} cy={200} r={14} fill="none" stroke={c(0.11)} strokeWidth="1.5"/>
      <circle cx={130} cy={200} r={6}  fill="none" stroke={c(0.09)} strokeWidth="1.2"/>

      {/* ─── Trasformatore/relè ─── */}
      <rect x={780} y={680} width={60} height={50} fill="none" stroke={c(0.1)} strokeWidth="1.2" rx="3"/>
      {/* bobine semplificate */}
      {[0,1,2,3].map(i => (
        <path key={`coil-${i}`}
          d={`M ${798 + i*4} 690 Q ${800 + i*4} 696 ${802 + i*4} 690`}
          fill="none" stroke={c(0.09)} strokeWidth="1"/>
      ))}
      {[0,1,2,3].map(i => (
        <path key={`coil2-${i}`}
          d={`M ${818 + i*4} 690 Q ${820 + i*4} 696 ${822 + i*4} 690`}
          fill="none" stroke={c(0.09)} strokeWidth="1"/>
      ))}

      {/* ─── Label riferimenti componenti ─── */}
      {[
        [235,276,'IC1'],[505,356,'IC2'],[865,236,'IC3'],
        [185,556,'IC4'],[645,546,'IC5'],[985,476,'IC6'],
        [297,195,'C1'],[575,195,'C2'],[462,675,'C3'],
        [465,512,'Q1'],[745,330,'Q2'],[1085,390,'Q3'],
      ].map(([x,y,lbl],i) => (
        <text key={`lbl-${i}`} x={x} y={y} fontFamily="monospace"
          fontSize="7" fill={c(0.1)} letterSpacing="0.3">{lbl}</text>
      ))}
    </svg>
  )
}
