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
    case 2: { // Domotica — icosaedro wireframe
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
      animate.push(t => { arcMats.forEach(({ mat: m, phase }) => { m.opacity = 0.4 + 0.6 * Math.abs(Math.sin(t * 4 + phase)) }) })
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
    if (w === 0 || h === 0) return

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

    // Loop animazione
    let rafId
    const startTime = performance.now()
    const loop = () => {
      rafId = requestAnimationFrame(loop)
      const t = (performance.now() - startTime) / 1000
      animate.forEach(fn => fn(t))
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
      window.removeEventListener('resize', onResize)
    }
  }, [serviceIndex, color])

  // Cleanup finale al unmount
  useEffect(() => {
    return () => {
      const { renderer, controls, scene } = stateRef.current
      if (renderer) {
        renderer.domElement.remove()
        renderer.dispose()
        controls?.dispose()
        if (scene) disposeScene(scene)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="md:h-[500px] h-[300px]"
      style={{ width: '100%', maxWidth: 600, cursor: 'grab' }}
      onMouseDown={e => { e.currentTarget.style.cursor = 'grabbing' }}
      onMouseUp={e => { e.currentTarget.style.cursor = 'grab' }}
    />
  )
}
