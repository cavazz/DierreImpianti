import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function disposeScene(scene) {
  const disposed = new Set()
  scene.traverse(obj => {
    if (obj.geometry && !disposed.has(obj.geometry)) { obj.geometry.dispose(); disposed.add(obj.geometry) }
    if (obj.material) {
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
      mats.forEach(m => { if (!disposed.has(m)) { m.dispose(); disposed.add(m) } })
    }
  })
}

function stdMat(color, hex, opts = {}) {
  return new THREE.MeshStandardMaterial({
    color: hex, emissive: color, emissiveIntensity: 0.55,
    metalness: 0.75, roughness: 0.25, ...opts,
  })
}

function glowSphere(scene, color, radius = 1.6) {
  const geo = new THREE.SphereGeometry(radius, 16, 16)
  const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.04, side: THREE.BackSide })
  scene.add(new THREE.Mesh(geo, mat))
}

function floatParticles(scene, hex, count = 160, spread = 9) {
  const geo = new THREE.BufferGeometry()
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * spread
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  scene.add(new THREE.Points(geo, new THREE.PointsMaterial({ color: hex, size: 0.025, transparent: true, opacity: 0.35 })))
}

// ─────────────────────────────────────────────────────────────────────────────
// SCENE BUILDERS — uno per servizio
// ─────────────────────────────────────────────────────────────────────────────

function buildScene(index, color) {
  const scene = new THREE.Scene()
  const hex   = parseInt(color.replace('#', ''), 16)
  const tc    = new THREE.Color(color)

  scene.add(new THREE.AmbientLight(0xffffff, 0.25))
  const key = new THREE.PointLight(hex, 3, 12); key.position.set(2, 3, 2); scene.add(key)
  const fill = new THREE.PointLight(0xffffff, 0.5, 10); fill.position.set(-3, -1, 3); scene.add(fill)

  glowSphere(scene, tc)
  floatParticles(scene, hex)

  const animate = []

  switch (index) {

    // ── 0 · IMPIANTI ELETTRICI — fulmine + ring orbiting ──────────────────
    case 0: {
      // Fulmine con ExtrudeGeometry
      const bolt = new THREE.Shape()
      bolt.moveTo( 0.18,  1.4)
      bolt.lineTo(-0.1,   0.12)
      bolt.lineTo( 0.22,  0.12)
      bolt.lineTo(-0.18, -1.4)
      bolt.lineTo( 0.1,  -0.12)
      bolt.lineTo(-0.22, -0.12)
      bolt.closePath()
      const boltGeo = new THREE.ExtrudeGeometry(bolt, { depth: 0.14, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 2 })
      boltGeo.center()
      const boltMat = stdMat(tc, hex, { emissiveIntensity: 0.9 })
      const boltMesh = new THREE.Mesh(boltGeo, boltMat)
      boltMesh.rotation.z = Math.PI   // punta verso il basso
      scene.add(boltMesh)

      // Ring orbit
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.3, 0.012, 8, 120),
        new THREE.MeshBasicMaterial({ color: hex, transparent: true, opacity: 0.6 })
      )
      ring.rotation.x = Math.PI / 2.8
      scene.add(ring)

      // Secondario ring
      const ring2 = new THREE.Mesh(
        new THREE.TorusGeometry(0.9, 0.008, 8, 80),
        new THREE.MeshBasicMaterial({ color: hex, transparent: true, opacity: 0.35 })
      )
      ring2.rotation.x = Math.PI / 2.8
      ring2.rotation.y = Math.PI / 3
      scene.add(ring2)

      animate.push(t => {
        ring.rotation.z  = t * 0.55
        ring2.rotation.z = -t * 0.35
        boltMesh.position.y = Math.sin(t * 1.8) * 0.08
        boltMat.emissiveIntensity = 0.7 + 0.4 * Math.abs(Math.sin(t * 2.2))
      })
      break
    }

    // ── 1 · FOTOVOLTAICO — grid pannelli solari + sole ───────────────────
    case 1: {
      const group = new THREE.Group()
      const cols = 4, rows = 3
      const cW = 0.38, cH = 0.30, gap = 0.045
      const totalW = cols * (cW + gap) - gap
      const totalH = rows * (cH + gap) - gap

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cellGeo = new THREE.BoxGeometry(cW, cH, 0.028)
          const cellMat = new THREE.MeshStandardMaterial({
            color: 0x0d1b2a, emissive: tc, emissiveIntensity: 0.25 + Math.random() * 0.2,
            metalness: 0.9, roughness: 0.1,
          })
          const cell = new THREE.Mesh(cellGeo, cellMat)
          cell.position.set(c * (cW + gap) - totalW / 2 + cW / 2, r * (cH + gap) - totalH / 2 + cH / 2, 0)
          group.add(cell)

          // Bordo luminoso
          const edges = new THREE.LineSegments(
            new THREE.EdgesGeometry(cellGeo),
            new THREE.LineBasicMaterial({ color: hex, transparent: true, opacity: 0.25 })
          )
          edges.position.copy(cell.position)
          group.add(edges)
        }
      }
      group.rotation.x = -0.28; group.rotation.y = 0.18
      scene.add(group)

      // Sole
      const sunGeo = new THREE.CircleGeometry(0.22, 32)
      const sunMat = new THREE.MeshBasicMaterial({ color: hex, transparent: true, opacity: 0.95 })
      const sun = new THREE.Mesh(sunGeo, sunMat)
      sun.position.set(1.05, 0.9, 0.4)
      scene.add(sun)

      // Raggi sole
      const raysGroup = new THREE.Group()
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2
        const from = new THREE.Vector3(Math.cos(a) * 0.28, Math.sin(a) * 0.28, 0)
        const to   = new THREE.Vector3(Math.cos(a) * 0.46, Math.sin(a) * 0.46, 0)
        raysGroup.add(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([from, to]),
          new THREE.LineBasicMaterial({ color: hex, transparent: true, opacity: 0.6 })
        ))
      }
      raysGroup.position.copy(sun.position)
      scene.add(raysGroup)

      animate.push(t => {
        group.rotation.y = 0.18 + Math.sin(t * 0.45) * 0.12
        group.rotation.x = -0.28 + Math.sin(t * 0.3) * 0.04
        raysGroup.rotation.z = t * 0.28
        sunMat.opacity = 0.75 + 0.25 * Math.abs(Math.sin(t * 1.4))
      })
      break
    }

    // ── 2 · DOMOTICA — smart hub + nodi orbitanti ────────────────────────
    case 2: {
      // Hub centrale: box arrotondato approssimato con sfera schiacciata
      const hubGeo = new THREE.SphereGeometry(0.55, 32, 32)
      const hubMat = stdMat(tc, hex, { wireframe: false, emissiveIntensity: 0.4 })
      const hub = new THREE.Mesh(hubGeo, hubMat)
      hub.scale.set(1, 0.7, 1)
      scene.add(hub)

      // Wireframe overlay
      const hubWire = new THREE.Mesh(
        new THREE.SphereGeometry(0.57, 12, 12),
        new THREE.MeshBasicMaterial({ color: hex, wireframe: true, transparent: true, opacity: 0.15 })
      )
      hubWire.scale.set(1, 0.7, 1)
      scene.add(hubWire)

      // Nodi orbitanti
      const nodeCount = 5
      const nodes = []
      for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2
        const r = 1.2 + (i % 2) * 0.25
        const nodeMesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.07 + (i % 2) * 0.03, 12, 12),
          new THREE.MeshStandardMaterial({ color: hex, emissive: tc, emissiveIntensity: 0.9 })
        )
        nodeMesh.position.set(Math.cos(angle) * r, Math.sin(angle * 0.5) * 0.3, Math.sin(angle) * r)
        scene.add(nodeMesh)
        nodes.push({ mesh: nodeMesh, angle, r, speed: 0.3 + i * 0.08, phase: i * 0.8 })
      }

      // Linee hub→nodo
      const lineMats = nodes.map(() => new THREE.LineBasicMaterial({ color: hex, transparent: true, opacity: 0.2 }))
      const lineGeos = nodes.map(({ mesh }) => {
        const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), mesh.position.clone()])
        scene.add(new THREE.Line(g, lineMats[nodes.indexOf({ mesh }) % lineMats.length]))
        return g
      })

      // WiFi rings
      const wifiRings = []
      for (let i = 0; i < 3; i++) {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(0.25 + i * 0.2, 0.01, 8, 40, Math.PI),
          new THREE.MeshBasicMaterial({ color: hex, transparent: true, opacity: 0.5 - i * 0.12 })
        )
        ring.position.set(0, 0.6 + i * 0.04, 0)
        ring.rotation.x = -Math.PI / 2
        scene.add(ring)
        wifiRings.push({ ring, phase: i * 0.4 })
      }

      animate.push(t => {
        hub.rotation.y = t * 0.2
        hubWire.rotation.y = -t * 0.15
        nodes.forEach(({ mesh, r, speed, phase }, i) => {
          const a = t * speed + phase
          mesh.position.set(Math.cos(a) * r, Math.sin(a * 0.4) * 0.3, Math.sin(a) * r)
          if (lineGeos[i]) {
            const pos = new Float32Array([0, 0, 0, mesh.position.x, mesh.position.y, mesh.position.z])
            lineGeos[i].setAttribute('position', new THREE.BufferAttribute(pos, 3))
          }
        })
        wifiRings.forEach(({ ring, phase }) => {
          ring.material.opacity = (0.4 + 0.35 * Math.abs(Math.sin(t * 1.5 + phase))) * (1 - phase * 0.3)
        })
      })
      break
    }

    // ── 3 · SICUREZZA & TVCC — scudo + laser scan ────────────────────────
    case 3: {
      // Scudo custom
      const shield = new THREE.Shape()
      shield.moveTo(0, 1.3)
      shield.bezierCurveTo( 0.9, 1.3,  1.1, 0.8,  1.1, 0.3)
      shield.bezierCurveTo( 1.1, -0.4, 0.6, -0.9,  0, -1.3)
      shield.bezierCurveTo(-0.6, -0.9,-1.1, -0.4, -1.1, 0.3)
      shield.bezierCurveTo(-1.1,  0.8,-0.9,  1.3,  0, 1.3)
      const shieldGeo = new THREE.ExtrudeGeometry(shield, { depth: 0.18, bevelEnabled: true, bevelSize: 0.04, bevelThickness: 0.04, bevelSegments: 2 })
      shieldGeo.center()
      const shieldMat = stdMat(tc, hex, { emissiveIntensity: 0.35 })
      const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat)
      scene.add(shieldMesh)

      // Check mark o "eye" al centro — usiamo un torus "occhio"
      const eyeMesh = new THREE.Mesh(
        new THREE.TorusGeometry(0.22, 0.04, 12, 40),
        new THREE.MeshBasicMaterial({ color: hex, transparent: true, opacity: 0.85 })
      )
      eyeMesh.position.z = 0.12
      shieldMesh.add(eyeMesh)

      // Pupilla
      const pupil = new THREE.Mesh(
        new THREE.SphereGeometry(0.09, 12, 12),
        new THREE.MeshBasicMaterial({ color: hex })
      )
      pupil.position.z = 0.14
      shieldMesh.add(pupil)

      // Scan plane
      const scanMat = new THREE.MeshBasicMaterial({ color: hex, transparent: true, opacity: 0.55, side: THREE.DoubleSide })
      const scan = new THREE.Mesh(new THREE.PlaneGeometry(3, 0.018), scanMat)
      scene.add(scan)

      animate.push(t => {
        shieldMesh.rotation.y = Math.sin(t * 0.5) * 0.3
        scan.position.y = Math.sin(t * 1.1) * 1.1
        scanMat.opacity = 0.3 + 0.4 * Math.abs(Math.sin(t * 1.1))
        pupil.material.opacity = 0.7 + 0.3 * Math.abs(Math.sin(t * 2))
      })
      break
    }

    // ── 4 · ANTENNE — disco parabolico + onde ────────────────────────────
    case 4: {
      // Profilo parabolico
      const profile = []
      for (let i = 0; i <= 20; i++) {
        const x = (i / 20) * 1.2
        const y = x * x * 0.55   // parabola y = 0.55x²
        profile.push(new THREE.Vector2(x, y - 0.4))
      }
      const dishGeo = new THREE.LatheGeometry(profile, 40)
      const dishMat = stdMat(tc, hex, { side: THREE.DoubleSide, emissiveIntensity: 0.3 })
      const dish = new THREE.Mesh(dishGeo, dishMat)
      dish.rotation.x = Math.PI / 2.2    // inclinato verso l'alto
      scene.add(dish)

      // Braccio
      const arm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.025, 0.025, 1.5, 8),
        stdMat(tc, hex, { emissiveIntensity: 0.2 })
      )
      arm.position.y = -0.9
      scene.add(arm)

      // Onde segnale
      const waves = []
      for (let i = 0; i < 4; i++) {
        const wMesh = new THREE.Mesh(
          new THREE.TorusGeometry(0.35 + i * 0.32, 0.01, 8, 60),
          new THREE.MeshBasicMaterial({ color: hex, transparent: true, opacity: 0.45 - i * 0.08 })
        )
        wMesh.position.set(0, 0.25, 0)
        wMesh.rotation.x = Math.PI / 2.2
        scene.add(wMesh)
        waves.push({ mesh: wMesh, phase: i * 0.45 })
      }

      animate.push(t => {
        dish.rotation.z = Math.sin(t * 0.35) * 0.15
        waves.forEach(({ mesh, phase }) => {
          mesh.material.opacity = (0.38 - mesh.geometry.parameters.radius * 0.05) *
            (0.5 + 0.5 * Math.abs(Math.sin(t * 1.5 + phase)))
        })
      })
      break
    }

    // ── 5 · RETI DATI — network sfera ───────────────────────────────────
    case 5: {
      const group = new THREE.Group()
      const nodeCount = 12
      const radius = 1.1
      const nodeMat = new THREE.MeshStandardMaterial({ color: hex, emissive: tc, emissiveIntensity: 0.8 })
      const nodes = []

      // Posiziona nodi su superficie sfera (fibonacci lattice)
      for (let i = 0; i < nodeCount; i++) {
        const phi   = Math.acos(1 - 2 * (i + 0.5) / nodeCount)
        const theta = Math.PI * (1 + Math.sqrt(5)) * i
        const pos = new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.cos(phi),
          radius * Math.sin(phi) * Math.sin(theta)
        )
        const size = i < 3 ? 0.1 : 0.06
        const node = new THREE.Mesh(new THREE.SphereGeometry(size, 10, 10), nodeMat.clone())
        node.position.copy(pos)
        group.add(node)
        nodes.push(pos)
      }

      // Collega con linee i nodi vicini
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          if (nodes[i].distanceTo(nodes[j]) < 1.0) {
            const lineMat = new THREE.LineBasicMaterial({ color: hex, transparent: true, opacity: 0.22 })
            group.add(new THREE.Line(
              new THREE.BufferGeometry().setFromPoints([nodes[i], nodes[j]]),
              lineMat
            ))
          }
        }
      }

      // Wireframe sfera di riferimento
      group.add(new THREE.Mesh(
        new THREE.SphereGeometry(radius, 14, 14),
        new THREE.MeshBasicMaterial({ color: hex, wireframe: true, transparent: true, opacity: 0.06 })
      ))

      scene.add(group)

      animate.push(t => {
        group.rotation.y = t * 0.22
        group.rotation.x = Math.sin(t * 0.14) * 0.15
      })
      break
    }

    // ── 6 · AUTOMAZIONI — tre ingranaggi ────────────────────────────────
    case 6: {
      function makeGear(r, teeth, thick = 0.18) {
        const shape = new THREE.Shape()
        const innerR = r * 0.6
        for (let i = 0; i < teeth * 2; i++) {
          const a = (i / (teeth * 2)) * Math.PI * 2
          const ro = i % 2 === 0 ? r + 0.15 : r
          if (i === 0) shape.moveTo(Math.cos(a) * ro, Math.sin(a) * ro)
          else shape.lineTo(Math.cos(a) * ro, Math.sin(a) * ro)
        }
        shape.closePath()
        const hole = new THREE.Path()
        for (let i = 0; i <= 32; i++) {
          const a = (i / 32) * Math.PI * 2
          if (i === 0) hole.moveTo(Math.cos(a) * innerR * 0.45, Math.sin(a) * innerR * 0.45)
          else hole.lineTo(Math.cos(a) * innerR * 0.45, Math.sin(a) * innerR * 0.45)
        }
        shape.holes.push(hole)
        return new THREE.ExtrudeGeometry(shape, { depth: thick, bevelEnabled: false })
      }

      const gearMat = new THREE.MeshStandardMaterial({ color: hex, emissive: tc, emissiveIntensity: 0.35, metalness: 0.95, roughness: 0.15 })

      const g1 = new THREE.Mesh(makeGear(0.62, 10), gearMat); g1.position.set(-0.45, 0, 0)
      const g2 = new THREE.Mesh(makeGear(0.42,  7), gearMat); g2.position.set( 1.12, 0, 0)
      const g3 = new THREE.Mesh(makeGear(0.28,  5), gearMat); g3.position.set( 1.12, -0.78, 0)
      scene.add(g1, g2, g3)

      // Anello attorno
      const ringMesh = new THREE.Mesh(
        new THREE.TorusGeometry(1.6, 0.01, 8, 100),
        new THREE.MeshBasicMaterial({ color: hex, transparent: true, opacity: 0.25 })
      )
      ringMesh.rotation.x = Math.PI / 2
      scene.add(ringMesh)

      animate.push(t => {
        g1.rotation.z =  t * 0.45
        g2.rotation.z = -t * 0.45 * (10 / 7)
        g3.rotation.z =  t * 0.45 * (10 / 5)
        ringMesh.rotation.z = t * 0.1
      })
      break
    }

    // ── 7 · PARAFULMINE — antenna + scarica elettrica ───────────────────
    case 7: {
      // Edificio stilizzato
      const buildingGeo = new THREE.BoxGeometry(1.0, 0.9, 0.5)
      const buildingMat = new THREE.MeshStandardMaterial({ color: 0x111111, emissive: tc, emissiveIntensity: 0.05, metalness: 0.6, roughness: 0.5 })
      const building = new THREE.Mesh(buildingGeo, buildingMat)
      building.position.y = -0.6
      scene.add(building)

      // Aste
      const rod = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.05, 1.8, 8),
        stdMat(tc, hex, { metalness: 1, emissiveIntensity: 0.7 })
      )
      rod.position.y = 0.45
      scene.add(rod)

      // Punta
      const tip = new THREE.Mesh(
        new THREE.ConeGeometry(0.04, 0.22, 8),
        stdMat(tc, hex, { emissiveIntensity: 0.9 })
      )
      tip.position.y = 1.45
      scene.add(tip)

      // Archi elettrici (rigenerati)
      const arcGroup = new THREE.Group()
      scene.add(arcGroup)
      let lastRegen = 0

      function buildArcs() {
        arcGroup.clear()
        for (let j = 0; j < 4; j++) {
          const pts = []
          const dx = (Math.random() - 0.5) * 0.5
          for (let i = 0; i <= 18; i++) {
            const frac = i / 18
            pts.push(new THREE.Vector3(
              dx * Math.sin(frac * Math.PI) + (Math.random() - 0.5) * 0.3 * Math.sin(frac * Math.PI),
              1.45 - frac * 1.6,
              (Math.random() - 0.5) * 0.3 * Math.sin(frac * Math.PI)
            ))
          }
          const arcMat = new THREE.LineBasicMaterial({ color: hex, transparent: true, opacity: 0.7 - j * 0.12 })
          arcGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), arcMat))
        }
      }
      buildArcs()

      animate.push(t => {
        if (t - lastRegen > 0.18) { buildArcs(); lastRegen = t }
        arcGroup.children.forEach((line, i) => {
          line.material.opacity = (0.6 - i * 0.1) * (0.4 + 0.6 * Math.abs(Math.sin(t * 5 + i)))
        })
        building.rotation.y = Math.sin(t * 0.3) * 0.1
      })
      break
    }
  }

  return { scene, animate }
}

// ─────────────────────────────────────────────────────────────────────────────
// RENDERER INIT
// ─────────────────────────────────────────────────────────────────────────────

function initRenderer(mount, stateRef, isMobile) {
  if (stateRef.current.renderer) return
  const w = mount.offsetWidth  || 600
  const h = mount.offsetHeight || 500
  const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))
  renderer.setSize(w, h)
  renderer.setClearColor(0x000000, 0)
  mount.appendChild(renderer.domElement)

  const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100)
  camera.position.set(0, 0, 4)

  let controls = null
  if (!isMobile) {
    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping  = true
    controls.dampingFactor  = 0.05
    controls.enableZoom     = false
    controls.enablePan      = false
    controls.autoRotate     = false
  }

  stateRef.current = { renderer, camera, controls }
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function ServicesApple3D({ serviceIndex, color, isMobile = false }) {
  const mountRef = useRef(null)
  const stateRef = useRef({})
  const rafRef   = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    initRenderer(mount, stateRef, isMobile)

    const { renderer, camera, controls } = stateRef.current
    if (!renderer) return

    if (stateRef.current.scene) {
      disposeScene(stateRef.current.scene)
      renderer.renderLists.dispose()
    }

    const { scene, animate } = buildScene(serviceIndex, color)
    stateRef.current.scene = scene

    cancelAnimationFrame(rafRef.current)
    const t0 = performance.now()

    const loop = () => {
      rafRef.current = requestAnimationFrame(loop)
      const t = (performance.now() - t0) / 1000

      // Auto-rotation su mobile
      if (isMobile) scene.rotation.y = t * 0.18

      animate.forEach(fn => fn(t))
      controls?.update()
      renderer.render(scene, camera)
    }
    loop()

    const onResize = () => {
      const w = mount.offsetWidth, h = mount.offsetHeight
      if (!w || !h) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', onResize) }
  }, [serviceIndex, color, isMobile])

  useEffect(() => () => {
    const { renderer, controls, scene } = stateRef.current
    if (renderer) {
      renderer.domElement.remove(); renderer.dispose()
      controls?.dispose()
      if (scene) disposeScene(scene)
      stateRef.current = {}
    }
  }, [])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div
        ref={mountRef}
        style={{ width: '100%', height: '100%', cursor: isMobile ? 'default' : 'grab' }}
        onMouseDown={e => { if (!isMobile) e.currentTarget.style.cursor = 'grabbing' }}
        onMouseUp={e =>   { if (!isMobile) e.currentTarget.style.cursor = 'grab' }}
      />
    </div>
  )
}
