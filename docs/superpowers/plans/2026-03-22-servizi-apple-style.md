# Servizi Apple-Style Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sostituire l'accordion dei servizi con un layout interattivo stile Apple: pill a sinistra, descrizione animata, canvas Three.js interattivo a destra.

**Architecture:** `Services.jsx` viene svuotato dell'accordion e delega a `ServicesApple.jsx` (layout e logica pill) che include `ServicesApple3D.jsx` (canvas Three.js con una scena procedurale per servizio). Il canvas viene riutilizzato tra le scene, solo la geometria/materiale viene fatto dispose e ricreato.

**Tech Stack:** React, Framer Motion, Three.js (`npm install three`), Tailwind CSS, `three/examples/jsm/controls/OrbitControls.js`

---

## File Map

| File | Azione | Responsabilità |
|---|---|---|
| `src/components/ServicesApple.jsx` | CREA | Layout Apple: pill list, card descrizione, container canvas, logica stato |
| `src/components/ServicesApple3D.jsx` | CREA | Canvas Three.js, scene 8 servizi, dispose, OrbitControls, mouse parallax |
| `src/components/Services.jsx` | MODIFICA | Rimuovi header accordion + accordion, aggiungi `<ServicesApple />` |
| `src/components/ServicesTeaser.jsx` | MODIFICA | Rimuovi Climatizzazione e Antincendio dalla lista pillole |
| `src/pages/Servizi.jsx` | MODIFICA | Aggiorna meta description SEO |

---

## Task 1: Installa Three.js e prepara struttura dati servizi

**Files:**
- Modify: `src/components/Services.jsx`
- Create: `src/components/ServicesApple.jsx` (solo scaffold)

- [ ] **Step 1: Installa Three.js**

```bash
cd D:/Alberto/Programmi/dierreimpianti
npm install three
```

Verifica che `package.json` contenga `"three"` nelle dipendenze.

- [ ] **Step 2: Aggiorna Services.jsx — rimuovi header e accordion, monta ServicesApple**

Sostituisci l'intero contenuto di `src/components/Services.jsx` con:

```jsx
import ServicesApple from './ServicesApple'

export default function Services() {
  return <ServicesApple />
}
```

- [ ] **Step 3: Crea scaffold ServicesApple.jsx con i dati dei servizi**

Crea `src/components/ServicesApple.jsx`:

```jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ServicesApple3D from './ServicesApple3D'

export const SERVICES = [
  {
    n: '01', title: 'Impianti Elettrici',
    tags: 'Civile · Industriale · Manutenzione',
    desc: 'Progettazione e realizzazione di impianti elettrici civili e industriali. Adeguamento normativo, messa a norma e manutenzione programmata.',
    color: '#3b82f6',
  },
  {
    n: '02', title: 'Fotovoltaico',
    tags: 'Civile · Industriale · Accumulo',
    desc: 'Installazione di impianti fotovoltaici residenziali e industriali con sistemi di accumulo energetico per massima autonomia.',
    color: '#f59e0b',
  },
  {
    n: '03', title: 'Domotica',
    tags: 'Smart Home · Controllo Remoto',
    desc: 'Sistemi domotici integrati per il controllo di luci, clima, sicurezza e automazioni gestibili da qualsiasi dispositivo.',
    color: '#10b981',
  },
  {
    n: '04', title: 'Sicurezza & TVCC',
    tags: 'Allarmi · Telecamere · Accessi',
    desc: 'Sistemi di allarme, videosorveglianza TVCC e controllo accessi per abitazioni, uffici e capannoni industriali.',
    color: '#ef4444',
  },
  {
    n: '05', title: 'Antenne',
    tags: 'Digitale · Satellite · Sky',
    desc: 'Installazione di antenne digitali terrestri, satellitari e Sky. Installatori Sky autorizzati per ogni tipo di struttura.',
    color: '#8b5cf6',
  },
  {
    n: '06', title: 'Reti Dati',
    tags: 'LAN · Wi-Fi · Fibra Ottica',
    desc: 'Cablaggio strutturato, Wi-Fi professionale e infrastrutture in fibra ottica per ogni tipo di ambiente.',
    color: '#22c55e',
  },
  {
    n: '07', title: 'Automazioni',
    tags: 'Cancelli · Tapparelle · Accessi',
    desc: 'Automazione di cancelli, barriere, tapparelle e sistemi di controllo accessi, integrabile con impianti domotici.',
    color: '#eab308',
  },
  {
    n: '08', title: 'Parafulmine',
    tags: 'LPS · CEI 81 · Verifiche',
    desc: 'Progettazione e installazione di sistemi di protezione contro i fulmini (LPS). Verifiche periodiche secondo CEI 81.',
    color: '#a78bfa',
  },
]

export default function ServicesApple() {
  const [active, setActive] = useState(0)

  return (
    <section className="bg-black min-h-screen flex items-center py-20">
      <div className="w-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-0">
        {/* placeholder — completato nei task successivi */}
        <div className="text-white">scaffold ok — task 2 e 3 completeranno</div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Avvia dev server e verifica che non ci siano errori**

```bash
npm run dev
```

Apri `http://localhost:5173/servizi`. Deve apparire "scaffold ok" su sfondo nero senza errori in console.

- [ ] **Step 5: Commit**

```bash
git add src/components/Services.jsx src/components/ServicesApple.jsx
git commit -m "feat: scaffold ServicesApple, installa three.js"
```

---

## Task 2: Layout Apple — pill list, descrizione animata, frecce navigazione

**Files:**
- Modify: `src/components/ServicesApple.jsx` (completa il layout)

- [ ] **Step 1: Sostituisci il corpo di ServicesApple.jsx con il layout completo**

```jsx
import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ServicesApple3D from './ServicesApple3D'
import { SERVICES } from './ServicesApple'  // stessa lista dati

// ── Pill singola ──
function Pill({ svc, isActive, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className="flex items-center gap-3 px-5 py-3 rounded-full text-left transition-colors duration-200"
      style={{
        background: isActive ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
        border: isActive ? `1px solid ${svc.color}44` : '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Cerchio icona */}
      <span
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold transition-all duration-300"
        style={{
          background: isActive ? svc.color : 'transparent',
          border: isActive ? `none` : '1.5px solid rgba(255,255,255,0.3)',
          color: isActive ? '#000' : 'rgba(255,255,255,0.5)',
        }}
      >
        {isActive ? '−' : '+'}
      </span>
      <span
        className="text-[15px] font-medium transition-colors duration-200"
        style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.6)' }}
      >
        {svc.title}
      </span>
    </motion.button>
  )
}

// ── Card descrizione (appare sopra la pill attiva) ──
function DescCard({ svc }) {
  return (
    <motion.div
      key={svc.title}
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="rounded-2xl p-5 mb-3"
      style={{ background: 'rgba(30,30,30,0.95)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
        <span className="font-semibold text-white">{svc.title}. </span>
        {svc.desc}
      </p>
    </motion.div>
  )
}

export default function ServicesApple() {
  const [active, setActive] = useState(0)

  const prev = useCallback(() => setActive(i => Math.max(0, i - 1)), [])
  const next = useCallback(() => setActive(i => Math.min(SERVICES.length - 1, i + 1)), [])

  return (
    <section className="bg-black min-h-screen flex items-center py-20">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-0">

          {/* ── LEFT: frecce + pill list ── */}
          <div className="flex gap-4 md:gap-6 flex-shrink-0 md:w-[360px]">

            {/* Frecce (solo desktop) */}
            <div className="hidden md:flex flex-col justify-center gap-3">
              <motion.button
                onClick={prev}
                disabled={active === 0}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  background: active === 0 ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: active === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.7)',
                  cursor: active === 0 ? 'not-allowed' : 'pointer',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 11L3 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11 7H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </motion.button>
              <motion.button
                onClick={next}
                disabled={active === SERVICES.length - 1}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  background: active === SERVICES.length - 1 ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: active === SERVICES.length - 1 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.7)',
                  cursor: active === SERVICES.length - 1 ? 'not-allowed' : 'pointer',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 7h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </motion.button>
            </div>

            {/* Pill list con card descrizione */}
            <div className="flex-1 flex flex-col gap-2">
              {SERVICES.map((svc, i) => (
                <div key={svc.title}>
                  {/* Card descrizione SOPRA la pill attiva */}
                  <AnimatePresence>
                    {active === i && <DescCard svc={svc} />}
                  </AnimatePresence>
                  <Pill svc={svc} isActive={active === i} onClick={() => setActive(i)} />
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: canvas Three.js ── */}
          <div className="flex-1 flex items-center justify-center md:pl-10">
            <ServicesApple3D serviceIndex={active} color={SERVICES[active].color} />
          </div>

        </div>
      </div>
    </section>
  )
}
```

**Nota:** `SERVICES` va esportato dal file dati e importato sia qui che in `ServicesApple3D.jsx`. Nella versione finale, estrai `SERVICES` in un file separato `src/data/services.js` per evitare dipendenze circolari.

- [ ] **Step 2: Estrai SERVICES in file dati separato**

Crea `src/data/services.js`:

```js
export const SERVICES = [
  { n: '01', title: 'Impianti Elettrici', tags: 'Civile · Industriale · Manutenzione', desc: 'Progettazione e realizzazione di impianti elettrici civili e industriali. Adeguamento normativo, messa a norma e manutenzione programmata.', color: '#3b82f6' },
  { n: '02', title: 'Fotovoltaico', tags: 'Civile · Industriale · Accumulo', desc: 'Installazione di impianti fotovoltaici residenziali e industriali con sistemi di accumulo energetico per massima autonomia.', color: '#f59e0b' },
  { n: '03', title: 'Domotica', tags: 'Smart Home · Controllo Remoto', desc: 'Sistemi domotici integrati per il controllo di luci, clima, sicurezza e automazioni gestibili da qualsiasi dispositivo.', color: '#10b981' },
  { n: '04', title: 'Sicurezza & TVCC', tags: 'Allarmi · Telecamere · Accessi', desc: 'Sistemi di allarme, videosorveglianza TVCC e controllo accessi per abitazioni, uffici e capannoni industriali.', color: '#ef4444' },
  { n: '05', title: 'Antenne', tags: 'Digitale · Satellite · Sky', desc: 'Installazione di antenne digitali terrestri, satellitari e Sky. Installatori Sky autorizzati per ogni tipo di struttura.', color: '#8b5cf6' },
  { n: '06', title: 'Reti Dati', tags: 'LAN · Wi-Fi · Fibra Ottica', desc: 'Cablaggio strutturato, Wi-Fi professionale e infrastrutture in fibra ottica per ogni tipo di ambiente.', color: '#22c55e' },
  { n: '07', title: 'Automazioni', tags: 'Cancelli · Tapparelle · Accessi', desc: 'Automazione di cancelli, barriere, tapparelle e sistemi di controllo accessi, integrabile con impianti domotici.', color: '#eab308' },
  { n: '08', title: 'Parafulmine', tags: 'LPS · CEI 81 · Verifiche', desc: 'Progettazione e installazione di sistemi di protezione contro i fulmini (LPS). Verifiche periodiche secondo CEI 81.', color: '#a78bfa' },
]
```

Aggiorna gli import in `ServicesApple.jsx`:
```js
import { SERVICES } from '../data/services'
```

- [ ] **Step 3: Crea ServicesApple3D.jsx con placeholder**

```jsx
// src/components/ServicesApple3D.jsx
export default function ServicesApple3D({ serviceIndex, color }) {
  return (
    <div
      style={{
        width: '100%', maxWidth: 600, height: 500,
        background: `radial-gradient(circle at 50% 50%, ${color}22, #000 70%)`,
        borderRadius: 24,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'rgba(255,255,255,0.3)', fontSize: 14,
      }}
    >
      Three.js canvas — Task 3
    </div>
  )
}
```

- [ ] **Step 4: Verifica layout nel browser**

```bash
npm run dev
```

Apri `/servizi`. Devi vedere: sfondo nero, lista pill a sinistra, click su una pill → descrizione card animata appare sopra, frecce up/down desktop, placeholder colorato a destra.

- [ ] **Step 5: Commit**

```bash
git add src/components/ServicesApple.jsx src/components/ServicesApple3D.jsx src/data/services.js
git commit -m "feat: layout Apple pill list con descrizione animata"
```

---

## Task 3: Three.js — canvas e scene procedurali per 8 servizi

**Files:**
- Modify: `src/components/ServicesApple3D.jsx` (implementazione completa)

- [ ] **Step 1: Sostituisci ServicesApple3D.jsx con implementazione Three.js completa**

```jsx
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// ── Scene builder per ogni servizio ──
function buildScene(index, color) {
  const scene = new THREE.Scene()
  const hex = parseInt(color.replace('#', ''), 16)
  const threeColor = new THREE.Color(color)

  // Luce ambiente
  scene.add(new THREE.AmbientLight(0xffffff, 0.3))
  const pointLight = new THREE.PointLight(hex, 2, 10)
  pointLight.position.set(2, 3, 2)
  scene.add(pointLight)

  // Particelle di sfondo (comuni a tutte le scene)
  const particleGeo = new THREE.BufferGeometry()
  const count = 200
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * 10
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const particleMat = new THREE.PointsMaterial({ color: hex, size: 0.03, transparent: true, opacity: 0.4 })
  scene.add(new THREE.Points(particleGeo, particleMat))

  let mainMesh = null
  const animate = []  // funzioni da chiamare in ogni frame: (time) => void

  switch (index) {
    case 0: { // Impianti Elettrici — fulmine + ring di particelle
      const geo = new THREE.ConeGeometry(0.15, 1.8, 6)
      const mat = new THREE.MeshStandardMaterial({ color: hex, emissive: threeColor, emissiveIntensity: 0.6, metalness: 0.8, roughness: 0.2 })
      mainMesh = new THREE.Mesh(geo, mat)
      mainMesh.rotation.z = Math.PI
      scene.add(mainMesh)
      // Ring orbiting
      const ringGeo = new THREE.TorusGeometry(1.2, 0.015, 8, 80)
      const ringMat = new THREE.MeshStandardMaterial({ color: hex, emissive: threeColor, emissiveIntensity: 1 })
      const ring = new THREE.Mesh(ringGeo, ringMat)
      ring.rotation.x = Math.PI / 2.5
      scene.add(ring)
      animate.push(t => { ring.rotation.z = t * 0.5; mainMesh.position.y = Math.sin(t * 1.5) * 0.1 })
      break
    }
    case 1: { // Fotovoltaico — esagoni array
      const group = new THREE.Group()
      const hexGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.04, 6)
      const hexMat = new THREE.MeshStandardMaterial({ color: hex, emissive: threeColor, emissiveIntensity: 0.4, metalness: 0.9, roughness: 0.1 })
      const positions2 = [[-0.6, 0, 0], [0.6, 0, 0], [0, 0, 0.6], [0, 0, -0.6], [-0.3, 0, 0.5], [0.3, 0, -0.5]]
      positions2.forEach(([x, y, z]) => {
        const m = new THREE.Mesh(hexGeo, hexMat); m.position.set(x, y, z); group.add(m)
      })
      group.rotation.x = -0.4
      scene.add(group)
      mainMesh = group
      animate.push(t => { group.rotation.y = t * 0.3 })
      break
    }
    case 2: { // Domotica — icosaedro wireframe + nodi
      const geo = new THREE.IcosahedronGeometry(1, 1)
      const mat = new THREE.MeshStandardMaterial({ color: hex, emissive: threeColor, emissiveIntensity: 0.5, wireframe: true })
      mainMesh = new THREE.Mesh(geo, mat)
      scene.add(mainMesh)
      animate.push(t => { mainMesh.rotation.x = t * 0.2; mainMesh.rotation.y = t * 0.3 })
      break
    }
    case 3: { // Sicurezza & TVCC — ottaedro + scan plane
      const geo = new THREE.OctahedronGeometry(0.9)
      const mat = new THREE.MeshStandardMaterial({ color: hex, emissive: threeColor, emissiveIntensity: 0.5, metalness: 0.8, roughness: 0.2 })
      mainMesh = new THREE.Mesh(geo, mat)
      scene.add(mainMesh)
      // Scan plane
      const planeGeo = new THREE.PlaneGeometry(2.5, 0.02)
      const planeMat = new THREE.MeshBasicMaterial({ color: hex, transparent: true, opacity: 0.6, side: THREE.DoubleSide })
      const plane = new THREE.Mesh(planeGeo, planeMat)
      scene.add(plane)
      animate.push(t => {
        mainMesh.rotation.y = t * 0.4
        plane.position.y = Math.sin(t * 1.2) * 0.9
        planeMat.opacity = 0.3 + 0.3 * Math.abs(Math.sin(t * 1.2))
      })
      break
    }
    case 4: { // Antenne — cilindro + tori onde
      const geo = new THREE.CylinderGeometry(0.05, 0.12, 2, 12)
      const mat = new THREE.MeshStandardMaterial({ color: hex, emissive: threeColor, emissiveIntensity: 0.5, metalness: 0.9 })
      mainMesh = new THREE.Mesh(geo, mat)
      scene.add(mainMesh)
      const tori = []
      for (let i = 0; i < 3; i++) {
        const t2 = new THREE.Mesh(
          new THREE.TorusGeometry(0.4 + i * 0.35, 0.012, 8, 60),
          new THREE.MeshBasicMaterial({ color: hex, transparent: true, opacity: 0.5 - i * 0.12 })
        )
        t2.rotation.x = Math.PI / 2; t2.position.y = 0.6 + i * 0.1; scene.add(t2); tori.push({ mesh: t2, phase: i })
      }
      animate.push(t => { tori.forEach(({ mesh, phase }) => { mesh.scale.setScalar(1 + 0.15 * Math.sin(t * 2 + phase)) }) })
      break
    }
    case 5: { // Reti Dati — sfere nodi con linee
      const group = new THREE.Group()
      const nodeGeo = new THREE.SphereGeometry(0.08, 12, 12)
      const nodeMat = new THREE.MeshStandardMaterial({ color: hex, emissive: threeColor, emissiveIntensity: 0.7 })
      const nodes = []
      for (let i = 0; i < 10; i++) {
        const m = new THREE.Mesh(nodeGeo, nodeMat)
        m.position.set((Math.random() - 0.5) * 2.5, (Math.random() - 0.5) * 2.5, (Math.random() - 0.5) * 1.5)
        group.add(m); nodes.push(m)
      }
      // Linee connessione
      for (let i = 0; i < nodes.length - 1; i++) {
        const points = [nodes[i].position, nodes[i + 1].position]
        const lineMat = new THREE.LineBasicMaterial({ color: hex, transparent: true, opacity: 0.3 })
        group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), lineMat))
      }
      scene.add(group); mainMesh = group
      animate.push(t => { group.rotation.y = t * 0.2; group.rotation.x = Math.sin(t * 0.15) * 0.2 })
      break
    }
    case 6: { // Automazioni — due ingranaggi
      const gear = (r, teeth) => {
        const shape = new THREE.Shape()
        for (let i = 0; i < teeth; i++) {
          const a = (i / teeth) * Math.PI * 2
          const a2 = ((i + 0.4) / teeth) * Math.PI * 2
          const a3 = ((i + 0.6) / teeth) * Math.PI * 2
          if (i === 0) shape.moveTo(Math.cos(a) * r, Math.sin(a) * r)
          shape.lineTo(Math.cos(a) * r, Math.sin(a) * r)
          shape.lineTo(Math.cos(a2) * (r + 0.18), Math.sin(a2) * (r + 0.18))
          shape.lineTo(Math.cos(a3) * (r + 0.18), Math.sin(a3) * (r + 0.18))
        }
        shape.closePath()
        return new THREE.ExtrudeGeometry(shape, { depth: 0.15, bevelEnabled: false })
      }
      const mat = new THREE.MeshStandardMaterial({ color: hex, emissive: threeColor, emissiveIntensity: 0.4, metalness: 0.9, roughness: 0.2 })
      const g1 = new THREE.Mesh(gear(0.6, 10), mat); g1.position.x = -0.4; scene.add(g1)
      const g2 = new THREE.Mesh(gear(0.4, 7), mat); g2.position.x = 1.15; scene.add(g2)
      mainMesh = g1
      animate.push(t => { g1.rotation.z = t * 0.5; g2.rotation.z = -t * 0.5 * (10 / 7) })
      break
    }
    case 7: { // Parafulmine — rod + archi elettrici
      const rodGeo = new THREE.CylinderGeometry(0.04, 0.04, 2.4, 8)
      const rodMat = new THREE.MeshStandardMaterial({ color: hex, emissive: threeColor, emissiveIntensity: 0.6, metalness: 1 })
      mainMesh = new THREE.Mesh(rodGeo, rodMat)
      mainMesh.position.y = 0.2
      scene.add(mainMesh)
      // Archi — linee ondulate
      const arcMats = []
      for (let j = 0; j < 3; j++) {
        const points = []
        for (let i = 0; i <= 20; i++) {
          const t2 = i / 20
          points.push(new THREE.Vector3(
            (Math.random() - 0.5) * 0.6 * Math.sin(t2 * Math.PI),
            -0.5 - t2 * 1.2,
            (Math.random() - 0.5) * 0.6 * Math.sin(t2 * Math.PI)
          ))
        }
        const arcMat = new THREE.LineBasicMaterial({ color: hex, transparent: true, opacity: 0.7 })
        arcMats.push({ mat: arcMat, phase: j * 0.3 })
        scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), arcMat))
      }
      animate.push(t => { arcMats.forEach(({ mat, phase }) => { mat.opacity = 0.4 + 0.6 * Math.abs(Math.sin(t * 4 + phase)) }) })
      break
    }
  }

  return { scene, animate }
}

// ── Dispose scena ──
function disposeScene(scene) {
  scene.traverse(obj => {
    if (obj.geometry) obj.geometry.dispose()
    if (obj.material) {
      if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose())
      else obj.material.dispose()
    }
  })
}

// ── Componente ──
export default function ServicesApple3D({ serviceIndex, color }) {
  const mountRef = useRef(null)
  const stateRef = useRef({})

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const w = mount.clientWidth
    const h = mount.clientHeight

    // Crea renderer UNA VOLTA
    if (!stateRef.current.renderer) {
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(w, h)
      renderer.setClearColor(0x000000, 0)
      mount.appendChild(renderer.domElement)

      const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100)
      camera.position.set(0, 0, 4)

      const controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.dampingFactor = 0.05
      controls.enableZoom = false
      controls.enablePan = false

      stateRef.current = { renderer, camera, controls }
    }

    const { renderer, camera, controls } = stateRef.current

    // Dispose scena precedente
    if (stateRef.current.scene) {
      disposeScene(stateRef.current.scene)
      renderer.renderLists.dispose()
    }

    // Costruisci nuova scena
    const { scene, animate } = buildScene(serviceIndex, color)
    stateRef.current.scene = scene

    // Parallax mouse
    let mx = 0, my = 0
    const onMouse = e => {
      const rect = mount.getBoundingClientRect()
      mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      my = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    }
    mount.addEventListener('mousemove', onMouse)

    // Loop animazione
    let rafId
    const startTime = performance.now()
    const loop = () => {
      rafId = requestAnimationFrame(loop)
      const t = (performance.now() - startTime) / 1000
      animate.forEach(fn => fn(t))
      camera.position.x += (mx * 0.3 - camera.position.x) * 0.05
      camera.position.y += (-my * 0.2 - camera.position.y) * 0.05
      camera.lookAt(0, 0, 0)
      controls.update()
      renderer.render(scene, camera)
    }
    loop()

    // Resize
    const onResize = () => {
      const w2 = mount.clientWidth
      const h2 = mount.clientHeight
      camera.aspect = w2 / h2
      camera.updateProjectionMatrix()
      renderer.setSize(w2, h2)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      mount.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
    }
  }, [serviceIndex, color])

  // Cleanup finale
  useEffect(() => {
    return () => {
      if (stateRef.current.renderer) {
        stateRef.current.renderer.dispose()
        stateRef.current.controls?.dispose()
        if (stateRef.current.scene) disposeScene(stateRef.current.scene)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', maxWidth: 600, height: 500, cursor: 'grab' }}
      onMouseDown={e => e.currentTarget.style.cursor = 'grabbing'}
      onMouseUp={e => e.currentTarget.style.cursor = 'grab'}
    />
  )
}
```

- [ ] **Step 2: Verifica nel browser**

```bash
npm run dev
```

Apri `/servizi`. Verifica:
- Canvas Three.js visibile a destra con scena 3D animata
- Click pill → scena cambia con nuova geometria
- Mouse drag → rotazione 3D
- Mouse move → parallax sottile
- Nessun errore in console

- [ ] **Step 3: Commit**

```bash
git add src/components/ServicesApple3D.jsx
git commit -m "feat: 8 scene Three.js procedurali con OrbitControls e parallax"
```

---

## Task 4: Cleanup — ServicesTeaser, meta SEO, mobile

**Files:**
- Modify: `src/components/ServicesTeaser.jsx`
- Modify: `src/pages/Servizi.jsx`

- [ ] **Step 1: Aggiorna ServicesTeaser.jsx — rimuovi Climatizzazione e Antincendio**

In `src/components/ServicesTeaser.jsx`, sostituisci l'import della lista locale con `SERVICES` da `src/data/services.js`:

```jsx
import { SERVICES } from '../data/services'
```

Rimuovi la definizione locale `const services = [...]` e usa `SERVICES` al posto di `services` nel JSX (il campo `title` e `icon` sono gli stessi — ma `icon` non è in `SERVICES`).

**Nota:** `ServicesTeaser.jsx` usa icone Lucide. Aggiungi campo `icon` a `SERVICES` in `src/data/services.js`:

```js
import { Zap, Sun, Home, ShieldCheck, Radio, Network, Settings2, CloudLightning } from 'lucide-react'

export const SERVICES = [
  { n: '01', title: 'Impianti Elettrici', icon: Zap,         tags: 'Civile · Industriale · Manutenzione', desc: '...', color: '#3b82f6' },
  { n: '02', title: 'Fotovoltaico',       icon: Sun,         tags: 'Civile · Industriale · Accumulo',     desc: '...', color: '#f59e0b' },
  { n: '03', title: 'Domotica',           icon: Home,        tags: 'Smart Home · Controllo Remoto',       desc: '...', color: '#10b981' },
  { n: '04', title: 'Sicurezza & TVCC',   icon: ShieldCheck, tags: 'Allarmi · Telecamere · Accessi',      desc: '...', color: '#ef4444' },
  { n: '05', title: 'Antenne',            icon: Radio,       tags: 'Digitale · Satellite · Sky',          desc: '...', color: '#8b5cf6' },
  { n: '06', title: 'Reti Dati',          icon: Network,     tags: 'LAN · Wi-Fi · Fibra Ottica',          desc: '...', color: '#22c55e' },
  { n: '07', title: 'Automazioni',        icon: Settings2,   tags: 'Cancelli · Tapparelle · Accessi',     desc: '...', color: '#eab308' },
  { n: '08', title: 'Parafulmine',        icon: CloudLightning, tags: 'LPS · CEI 81 · Verifiche',         desc: '...', color: '#a78bfa' },
]
```

*(Sostituisci `'...'` con le descrizioni complete già definite nel Task 1 Step 3)*

Aggiorna `ServicesTeaser.jsx` per usare `SERVICES` invece della lista locale.

- [ ] **Step 2: Aggiorna meta SEO in Servizi.jsx**

In `src/pages/Servizi.jsx` riga 9, aggiorna la description:

```jsx
description: 'Impianti elettrici, fotovoltaico, domotica, antenne, reti dati, automazioni e parafulmine. Servizi professionali nella provincia di Padova.',
```

- [ ] **Step 3: Verifica mobile**

Riduci il browser a `< 768px`. Verifica:
- Pill list a larghezza piena, verticale
- Click pill → descrizione espansa sotto (accordion)
- Canvas Three.js sotto, altezza ~300px
- Touch drag funzionante (OrbitControls gestisce touch di default)
- Frecce ↑↓ non visibili

Il div mount in `ServicesApple3D.jsx` deve avere altezza fissa su mobile. Aggiorna lo style del div:

```jsx
<div
  ref={mountRef}
  style={{ width: '100%', maxWidth: 600, height: 500, cursor: 'grab' }}
  className="md:h-[500px] h-[300px]"
  ...
/>
```

Rimuovi `height: 500` dallo style inline (prevale className Tailwind su mobile).

- [ ] **Step 4: Lint check**

```bash
npm run lint
```

Correggi eventuali warning.

- [ ] **Step 5: Commit finale**

```bash
git add src/components/ServicesTeaser.jsx src/pages/Servizi.jsx src/data/services.js
git commit -m "feat: cleanup SEO, ServicesTeaser aggiornato, 8 servizi definitivi"
```
