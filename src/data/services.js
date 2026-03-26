import { Zap, Sun, Home, ShieldCheck, Radio, Network, Settings2, CloudLightning } from 'lucide-react'

// foto: sostituire con immagini reali dei lavori Dierre Impianti
export const SERVICES = [
  {
    n: '01', title: 'Impianti Elettrici', icon: Zap,
    tags: 'Civile · Industriale · Manutenzione',
    desc: 'Progettazione e realizzazione di impianti elettrici civili e industriali. Adeguamento normativo, messa a norma e manutenzione programmata.',
    color: '#3b82f6',
    photo: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=85&w=1200&auto=format&fit=crop',
  },
  {
    n: '02', title: 'Fotovoltaico', icon: Sun,
    tags: 'Civile · Industriale · Accumulo',
    desc: 'Installazione di impianti fotovoltaici residenziali e industriali con sistemi di accumulo energetico per massima autonomia.',
    color: '#f59e0b',
    photo: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=85&w=1200&auto=format&fit=crop',
  },
  {
    n: '03', title: 'Domotica', icon: Home,
    tags: 'Smart Home · Controllo Remoto',
    desc: 'Sistemi domotici integrati per il controllo di luci, clima, sicurezza e automazioni gestibili da qualsiasi dispositivo.',
    color: '#10b981',
    photo: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=85&w=1200&auto=format&fit=crop',
  },
  {
    n: '04', title: 'Sicurezza & TVCC', icon: ShieldCheck,
    tags: 'Allarmi · Telecamere · Accessi',
    desc: 'Sistemi di allarme, videosorveglianza TVCC e controllo accessi per abitazioni, uffici e capannoni industriali.',
    color: '#ef4444',
    photo: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=85&w=1200&auto=format&fit=crop',
  },
  {
    n: '05', title: 'Antenne', icon: Radio,
    tags: 'Digitale · Satellite · Sky',
    desc: 'Installazione di antenne digitali terrestri, satellitari e Sky. Installatori Sky autorizzati per ogni tipo di struttura.',
    color: '#8b5cf6',
    photo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=85&w=1200&auto=format&fit=crop',
  },
  {
    n: '06', title: 'Reti Dati', icon: Network,
    tags: 'LAN · Wi-Fi · Fibra Ottica',
    desc: 'Cablaggio strutturato, Wi-Fi professionale e infrastrutture in fibra ottica per ogni tipo di ambiente.',
    color: '#22c55e',
    photo: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=85&w=1200&auto=format&fit=crop',
  },
  {
    n: '07', title: 'Automazioni', icon: Settings2,
    tags: 'Cancelli · Tapparelle · Accessi',
    desc: 'Automazione di cancelli, barriere, tapparelle e sistemi di controllo accessi, integrabile con impianti domotici.',
    color: '#eab308',
    photo: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=85&w=1200&auto=format&fit=crop',
  },
]
