import { Link } from 'react-router-dom'
import { Facebook, Phone, Mail, MapPin } from 'lucide-react'

const navLinks = [
  ['Home',      '#home'],
  ['Servizi',   '#servizi'],
  ['Chi Siamo', '#chi-siamo'],
  ['Contatti',  '#contatti'],
]

const services = [
  'Impianti Elettrici', 'Fotovoltaico',    'Domotica',
  'Sicurezza & TVCC',  'Antenne',          'Antincendio',
  'Climatizzazione',   'Reti Dati',        'Automazioni',
  'Parafulmine',
]

const legal = [
  ['Privacy Policy', '/privacy'],
  ['Cookie Policy',  '/cookie'],
  ['Accessibilità',  '/accessibilita'],
]

export default function Footer() {
  const go = h => document.querySelector(h)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="bg-dark" role="contentinfo" aria-label="Piè di pagina">
      <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-24">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 pt-16 pb-12 border-b border-white/8">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center flex-shrink-0"
                style={{ boxShadow: '0 4px 16px rgba(249,115,22,0.45)' }}
                aria-hidden="true">
                <span className="text-white font-display font-black text-sm tracking-tighter">DR</span>
              </div>
              <div>
                <p className="font-display font-700 text-white text-sm leading-tight">Dierre Impianti</p>
                <p className="text-white/40 text-[11px]">di Dainese Roberto</p>
              </div>
            </div>

            <p className="text-white/45 text-sm leading-relaxed mb-2">
              Impianti tecnologici professionali in provincia di Padova.
            </p>
            <p className="text-white/25 text-xs font-mono mb-6">P.IVA 05181630285</p>

            {/* Social */}
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dierre Impianti su Facebook (apre in una nuova scheda)"
              className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-white/12 text-white/40 hover:text-white hover:border-white/30 hover:bg-white/8 transition-all duration-200">
              <Facebook size={15} aria-hidden="true"/>
            </a>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-white/35 text-[10px] font-bold uppercase tracking-[0.2em] mb-5">Navigazione</p>
            <ul className="space-y-3" role="list">
              {navLinks.map(([l, h]) => (
                <li key={l}>
                  <button
                    onClick={() => go(h)}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-150 text-left cursor-pointer">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-white/35 text-[10px] font-bold uppercase tracking-[0.2em] mb-5">Servizi</p>
            <ul className="space-y-2.5" role="list">
              {services.map(s => (
                <li key={s}>
                  <span className="text-white/45 text-sm">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <p className="text-white/35 text-[10px] font-bold uppercase tracking-[0.2em] mb-5">Contatti</p>
            <address className="not-italic space-y-4">
              {[
                { Icon: Phone,  v: '+39 347 317 7613',                                        href: 'tel:+393473177613',            ext: false },
                { Icon: Mail,   v: 'info@dierreimpianti.it',                                  href: 'mailto:info@dierreimpianti.it', ext: false },
                { Icon: MapPin, v: 'Via Madonna Della Mercede 6\n35028 Piove di Sacco (PD)', href: 'https://maps.google.com/?q=Via+Madonna+Della+Mercede+6+Piove+di+Sacco+PD', ext: true },
              ].map(({ Icon, v, href, ext }) => (
                <div key={v} className="flex items-start gap-2.5">
                  <Icon size={13} className="text-accent mt-0.5 flex-shrink-0" aria-hidden="true"/>
                  <a
                    href={href}
                    {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-150 leading-relaxed whitespace-pre-line">
                    {v}
                    {ext && <span className="sr-only"> (apre Google Maps)</span>}
                  </a>
                </div>
              ))}
            </address>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="py-7 flex flex-col gap-4">

          {/* Legal row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/25 text-xs text-center sm:text-left">
              © {new Date().getFullYear()} Dierre Impianti di Dainese Roberto. Tutti i diritti riservati.
            </p>
            <nav aria-label="Link legali" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5">
              {legal.map(([l, to]) => (
                <Link key={to} to={to}
                  className="text-white/30 hover:text-white/70 text-xs transition-colors duration-150">
                  {l}
                </Link>
              ))}
            </nav>
          </div>

          {/* Credit — centered */}
          <div className="flex justify-center">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Sito realizzato da ACWebD"
              className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/8 hover:border-white/18 transition-all duration-250"
              style={{ background: 'rgba(255,255,255,0.04)' }}>
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inset-0 rounded-full bg-accent opacity-60"/>
                <span className="relative rounded-full h-2 w-2 bg-accent"/>
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 group-hover:text-white/55 transition-colors">
                Digital Experience by{' '}
                <span style={{
                  background: 'linear-gradient(90deg, #60a5fa, #c084fc)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  ACWebD
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
