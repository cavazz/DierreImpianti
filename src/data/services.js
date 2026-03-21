import { Zap, Sun, Home, ShieldCheck, Radio, Network, Settings2, CloudLightning } from 'lucide-react'

export const SERVICES = [
  { n: '01', title: 'Impianti Elettrici', icon: Zap,            tags: 'Civile · Industriale · Manutenzione', desc: 'Progettazione e realizzazione di impianti elettrici civili e industriali. Adeguamento normativo, messa a norma e manutenzione programmata.', color: '#3b82f6' },
  { n: '02', title: 'Fotovoltaico',       icon: Sun,            tags: 'Civile · Industriale · Accumulo',     desc: 'Installazione di impianti fotovoltaici residenziali e industriali con sistemi di accumulo energetico per massima autonomia.', color: '#f59e0b' },
  { n: '03', title: 'Domotica',           icon: Home,           tags: 'Smart Home · Controllo Remoto',       desc: 'Sistemi domotici integrati per il controllo di luci, clima, sicurezza e automazioni gestibili da qualsiasi dispositivo.', color: '#10b981' },
  { n: '04', title: 'Sicurezza & TVCC',   icon: ShieldCheck,    tags: 'Allarmi · Telecamere · Accessi',      desc: 'Sistemi di allarme, videosorveglianza TVCC e controllo accessi per abitazioni, uffici e capannoni industriali.', color: '#ef4444' },
  { n: '05', title: 'Antenne',            icon: Radio,          tags: 'Digitale · Satellite · Sky',          desc: 'Installazione di antenne digitali terrestri, satellitari e Sky. Installatori Sky autorizzati per ogni tipo di struttura.', color: '#8b5cf6' },
  { n: '06', title: 'Reti Dati',          icon: Network,        tags: 'LAN · Wi-Fi · Fibra Ottica',          desc: 'Cablaggio strutturato, Wi-Fi professionale e infrastrutture in fibra ottica per ogni tipo di ambiente.', color: '#22c55e' },
  { n: '07', title: 'Automazioni',        icon: Settings2,      tags: 'Cancelli · Tapparelle · Accessi',     desc: 'Automazione di cancelli, barriere, tapparelle e sistemi di controllo accessi, integrabile con impianti domotici.', color: '#eab308' },
  { n: '08', title: 'Parafulmine',        icon: CloudLightning, tags: 'LPS · CEI 81 · Verifiche',            desc: 'Progettazione e installazione di sistemi di protezione contro i fulmini (LPS). Verifiche periodiche secondo CEI 81.', color: '#a78bfa' },
]
