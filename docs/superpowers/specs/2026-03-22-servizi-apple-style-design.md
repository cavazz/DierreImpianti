# Design — Sezione Servizi stile Apple

**Data:** 2026-03-22
**Progetto:** Dierre Impianti — dierreimpianti
**Stato:** Approvato dall'utente

---

## Obiettivo

Riprogettare la sezione Servizi nella pagina `/servizi` ispirandosi al layout Apple "Esplora il design" (MacBook Pro spec page). Layout immersivo su sfondo nero, pill interattive a sinistra, immagini 3D interattive a destra.

---

## Cosa viene rimosso

Da `src/components/Services.jsx`:
- Label `"Cosa facciamo"`
- Heading `"10 servizi. Un solo partner."`
- Descrizione a destra dell'header
- Accordion a 10 voci con espansione

---

## Servizi (8 — ridotti da 10)

Rimossi: **Climatizzazione** e **Antincendio**

| # | Servizio | Tags | Descrizione |
|---|---|---|---|
| 01 | Impianti Elettrici | Civile · Industriale · Manutenzione | Progettazione e realizzazione di impianti elettrici civili e industriali. Adeguamento normativo, messa a norma e manutenzione programmata. |
| 02 | Fotovoltaico | Civile · Industriale · Accumulo | Installazione di impianti fotovoltaici residenziali e industriali con sistemi di accumulo energetico per massima autonomia. |
| 03 | Domotica | Smart Home · Controllo Remoto | Sistemi domotici integrati per il controllo di luci, clima, sicurezza e automazioni gestibili da qualsiasi dispositivo. |
| 04 | Sicurezza & TVCC | Allarmi · Telecamere · Accessi | Sistemi di allarme, videosorveglianza TVCC e controllo accessi per abitazioni, uffici e capannoni industriali. |
| 05 | Antenne | Digitale · Satellite · Sky | Installazione di antenne digitali terrestri, satellitari e Sky. Installatori Sky autorizzati per ogni tipo di struttura. |
| 06 | Reti Dati | LAN · Wi-Fi · Fibra Ottica | Cablaggio strutturato, Wi-Fi professionale e infrastrutture in fibra ottica per ogni tipo di ambiente. |
| 07 | Automazioni | Cancelli · Tapparelle · Accessi | Automazione di cancelli, barriere, tapparelle e sistemi di controllo accessi, integrabile con impianti domotici. |
| 08 | Parafulmine | LPS · CEI 81 · Verifiche | Progettazione e installazione di sistemi di protezione contro i fulmini (LPS). Verifiche periodiche secondo CEI 81. |

---

## Layout — Desktop

```
┌─────────────────────────────────────────────────────────────┐
│  [sfondo nero totale — bg-black]                             │
│                                                              │
│  [↑]  [ ● Impianti Elettrici    ]         │                  │
│       [   card descrizione scura ]         │  [Three.js]     │
│       [ + Fotovoltaico           ]         │  [canvas]       │
│       [ + Domotica               ]         │  [drag=rotate]  │
│       [ + Sicurezza & TVCC       ]         │                  │
│  [↓]  [ + Antenne                ]         │                  │
└─────────────────────────────────────────────────────────────┘
```

## Layout — Mobile (< 768px)

Layout impilato verticalmente:
1. Lista pill a larghezza piena (scroll verticale)
2. Quando pill attiva: card descrizione espansa sotto la pill (accordion)
3. Canvas Three.js sotto la descrizione, altezza fissa `300px`, touch-drag per ruotare
4. Frecce ↑↓ nascoste (non servono su mobile, si scrolla)

---

## Comportamento interattivo

- **Click pill** → cerchio riempito (da `+` a `●`), card descrizione slide-in sopra con Framer Motion
- **Frecce ↑↓** (solo desktop, a sinistra della pill list) per navigare
- **Cambio servizio** → canvas Three.js: opacity fade-out scena corrente, fade-in nuova scena
- **Mouse drag sul canvas** → rotazione 3D (OrbitControls)
- **Mouse move sul container** → lieve parallax/tilt dell'intera scena

---

## Implementazione Three.js — 8 scene procedurali

Tutte le scene usano `BufferGeometry` + `ShaderMaterial` per il glow. L'animazione è **procedurale** tramite `requestAnimationFrame` (aggiornamento manuale di `uniforms` e `mesh.rotation`), **non** `AnimationMixer` (che richiede clip da GLTF/FBX).

| Servizio | Scena 3D | Colore glow |
|---|---|---|
| Impianti Elettrici | Fulmine geometrico con particelle elettriche | `#3b82f6` |
| Fotovoltaico | Array esagonale con glow solare | `#f59e0b` |
| Domotica | Casa wireframe con nodi connessi fluttuanti | `#10b981` |
| Sicurezza & TVCC | Scudo 3D con scan laser animato | `#ef4444` |
| Antenne | Parabolica con onde radio in espansione | `#8b5cf6` |
| Reti Dati | Grafo di nodi connessi con linee fibra | `#22c55e` |
| Automazioni | Ingranaggi meccanici interlocked | `#eab308` |
| Parafulmine | Rod con archi elettrici animati | `#a78bfa` |

### Import Three.js da specificare

```js
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
```

### Dispose al cambio scena

Ad ogni cambio servizio, prima di creare la nuova scena:
```js
scene.traverse(obj => {
  if (obj.geometry) obj.geometry.dispose()
  if (obj.material) {
    if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose())
    else obj.material.dispose()
  }
})
renderer.renderLists.dispose()
controls.dispose()
```
Il `renderer` NON viene distrutto — viene riutilizzato tra le scene.

---

## Componenti e integrazione

**File interessati:**

| File | Azione |
|---|---|
| `src/components/ServicesApple.jsx` | **NUOVO** — layout Apple completo (pill, descrizione, container canvas) |
| `src/components/ServicesApple3D.jsx` | **NUOVO** — canvas Three.js con scene per servizio |
| `src/components/Services.jsx` | **MODIFICATO** — rimosso header accordion; renderizza `<ServicesApple />` |
| `src/components/ServicesTeaser.jsx` | **MODIFICATO** — rimossi Climatizzazione e Antincendio dalla lista pillole |
| `src/pages/Servizi.jsx` | **MODIFICATO** — aggiornata meta description SEO (rimuovere "climatizzazione" e "antincendio") |

**Wiring:** `Servizi.jsx` continua a importare `<Services />`. `Services.jsx` viene svuotato dell'accordion e renderizza direttamente `<ServicesApple />`.

---

## Dipendenze

- `three` — **NON presente**, va installato: `npm install three`
- `framer-motion` — già presente
- Nessun'altra dipendenza esterna
