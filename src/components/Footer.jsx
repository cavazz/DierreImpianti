import { Link } from 'react-router-dom'
import { Facebook, Phone, Mail, MapPin } from 'lucide-react'

const navLinks = [
  ['Servizi',   '#servizi'],
  ['Chi Siamo', '#chi-siamo'],
  ['Contatti',  '#contatti'],
]

const services = [
  'Impianti Elettrici', 'Fotovoltaico',   'Domotica',
  'Sicurezza & TVCC',  'Antenne',         'Antincendio',
  'Climatizzazione',   'Reti Dati',       'Automazioni',
  'Parafulmine',
]

const legal = [
  ['Privacy Policy', '/privacy'],
  ['Cookie Policy',  '/cookie'],
]

export default function Footer() {
  const go = h => document.querySelector(h)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="bg-dark border-t border-white/8" role="contentinfo" aria-label="Piè di pagina">
      <div className="container-xl">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pt-16 pb-12 border-b border-white/8">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-8 rounded-md bg-accent flex items-center justify-center flex-shrink-0"
                aria-hidden="true">
                <span className="text-white font-display font-black text-xs tracking-tighter">DR</span>
              </span>
              <div>
                <p className="font-display font-700 text-white text-sm leading-tight">Dierre Impianti</p>
                <p className="text-white/35 text-[11px]">di Dainese Roberto</p>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-2">
              Impianti tecnologici professionali nella provincia di Padova.
            </p>
            <p className="text-white/20 text-xs font-mono mb-7">P.IVA 05181630285</p>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dierre Impianti su Facebook (apre in una nuova scheda)"
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/12 text-white/35 hover:text-white hover:border-white/25 transition-all duration-200">
              <Facebook size={14} aria-hidden="true"/>
            </a>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-white/25 text-[10px] font-bold uppercase tracking-[0.2em] mb-5">Navigazione</p>
            <ul className="space-y-3" role="list">
              {navLinks.map(([l, h]) => (
                <li key={l}>
                  <button
                    onClick={() => go(h)}
                    className="text-white/45 hover:text-white text-sm transition-colors duration-150 text-left">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-white/25 text-[10px] font-bold uppercase tracking-[0.2em] mb-5">Servizi</p>
            <ul className="space-y-2.5" role="list">
              {services.map(s => (
                <li key={s}>
                  <span className="text-white/40 text-sm">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <p className="text-white/25 text-[10px] font-bold uppercase tracking-[0.2em] mb-5">Contatti</p>
            <address className="not-italic space-y-4">
              {[
                { Icon: Phone,  v: '+39 347 317 7613',                                         href: 'tel:+393473177613',            ext: false },
                { Icon: Mail,   v: 'info@dierreimpianti.it',                                   href: 'mailto:info@dierreimpianti.it', ext: false },
                { Icon: MapPin, v: 'Via Madonna Della Mercede 6\n35028 Piove di Sacco (PD)',   href: 'https://maps.google.com/?q=Via+Madonna+Della+Mercede+6+Piove+di+Sacco+PD', ext: true },
              ].map(({ Icon, v, href, ext }) => (
                <div key={v} className="flex items-start gap-2.5">
                  <Icon size={13} className="text-accent mt-0.5 flex-shrink-0" aria-hidden="true"/>
                  <a
                    href={href}
                    {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="text-white/45 hover:text-white text-sm transition-colors duration-150 leading-relaxed whitespace-pre-line">
                    {v}
                    {ext && <span className="sr-only"> (apre Google Maps)</span>}
                  </a>
                </div>
              ))}
            </address>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="py-7 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <p className="text-white/20 text-xs">
              © {new Date().getFullYear()} Dierre Impianti di Dainese Roberto
            </p>
            <nav aria-label="Link legali" className="flex items-center gap-5">
              {legal.map(([l, to]) => (
                <Link key={to} to={to}
                  className="text-white/25 hover:text-white/55 text-xs transition-colors duration-150">
                  {l}
                </Link>
              ))}
            </nav>
          </div>

          {/* Credit */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Sito realizzato da ACWebD"
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/8 hover:border-white/16 transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.03)' }}>
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="animate-ping absolute inset-0 rounded-full bg-accent opacity-50"/>
              <span className="relative rounded-full h-1.5 w-1.5 bg-accent"/>
            </span>
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/25 group-hover:text-white/45 transition-colors">
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
    </footer>
  )
}
