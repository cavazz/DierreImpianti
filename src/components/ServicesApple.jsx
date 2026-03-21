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
