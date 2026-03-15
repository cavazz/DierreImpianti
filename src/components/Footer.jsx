import { Link } from 'react-router-dom'
import { Facebook, Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function Footer() {
  const go   = h => document.querySelector(h)?.scrollIntoView({ behavior: 'smooth' })
  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark border-t border-white/6" role="contentinfo" aria-label="Piè di pagina">
      <div className="container-xl">

        {/* ── Main grid: 3 colonne ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 pt-16 pb-14 border-b border-white/6">

          {/* Col 1 — Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: '#f59e0b' }}
                aria-hidden="true">
                <span className="text-dark font-display font-black text-xs">DR</span>
              </span>
              <div>
                <p className="font-display font-700 text-text-p text-sm leading-tight">Dierre Impianti</p>
                <p className="text-text-xs text-[11px]">s.n.c. di Dainese Roberto</p>
              </div>
            </div>

            <p className="text-text-s text-sm leading-relaxed mb-5">
              Professionisti degli impianti tecnologici nella provincia di Padova dal 2003.
            </p>

            <p className="text-text-xs text-xs font-mono mb-7">P.IVA 05181630285</p>

            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dierre Impianti su Facebook (apre in una nuova scheda)"
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 text-text-xs hover:text-accent hover:border-accent/30 transition-all duration-200">
              <Facebook size={14} aria-hidden="true"/>
            </a>
          </div>

          {/* Col 2 — Navigazione + Legale */}
          <div>
            <p className="text-text-xs text-[10px] font-bold uppercase tracking-[0.2em] mb-5">Navigazione</p>
            <ul className="space-y-3 mb-10" role="list">
              {[
                ['Servizi',   '#servizi'],
                ['Chi Siamo', '#chi-siamo'],
                ['Contatti',  '#contatti'],
              ].map(([l, h]) => (
                <li key={l}>
                  <button
                    onClick={() => go(h)}
                    className="text-text-s hover:text-text-p text-sm transition-colors duration-150 text-left">
                    {l}
                  </button>
                </li>
              ))}
            </ul>

            <p className="text-text-xs text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Legale</p>
            <ul className="space-y-2.5" role="list">
              {[
                ['Privacy Policy',  '/privacy'],
                ['Cookie Policy',   '/cookie'],
                ['Accessibilità',   '/accessibilita'],
              ].map(([l, to]) => (
                <li key={to}>
                  <Link to={to}
                    className="text-text-s hover:text-text-p text-sm transition-colors duration-150">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contatti */}
          <div>
            <p className="text-text-xs text-[10px] font-bold uppercase tracking-[0.2em] mb-5">Contatti</p>

            {/* Numero in evidenza */}
            <a href="tel:+393473177613"
              className="group flex items-center gap-3.5 mb-7 p-4 rounded-xl transition-all duration-200"
              style={{ border: '1px solid rgba(245,158,11,0.18)', background: 'rgba(245,158,11,0.04)' }}>
              <span className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(245,158,11,0.14)' }}>
                <Phone size={16} className="text-accent" aria-hidden="true"/>
              </span>
              <div>
                <p className="text-text-xs text-[10px] font-bold uppercase tracking-widest mb-0.5">Chiama ora</p>
                <p className="font-display font-700 text-text-p text-base group-hover:text-accent transition-colors leading-tight">
                  +39 347 317 7613
                </p>
              </div>
            </a>

            <address className="not-italic space-y-4">
              <a href="mailto:info@dierreimpianti.it"
                className="flex items-center gap-3 text-text-s hover:text-text-p transition-colors duration-150">
                <Mail size={13} className="text-accent flex-shrink-0" aria-hidden="true"/>
                <span className="text-sm">info@dierreimpianti.it</span>
              </a>
              <a href="https://maps.google.com/?q=Via+Madonna+Della+Mercede+6+Piove+di+Sacco+PD"
                target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-3 text-text-s hover:text-text-p transition-colors duration-150">
                <MapPin size={13} className="text-accent flex-shrink-0 mt-0.5" aria-hidden="true"/>
                <span className="text-sm leading-relaxed">
                  Via Madonna Della Mercede 6<br/>
                  35028 Piove di Sacco (PD)
                  <span className="sr-only"> (apre Google Maps)</span>
                </span>
              </a>
              <div className="flex items-start gap-3 text-text-s">
                <Clock size={13} className="text-accent flex-shrink-0 mt-0.5" aria-hidden="true"/>
                <div className="text-sm leading-relaxed">
                  <p>Lun–Ven: 8:00 – 18:00</p>
                  <p>Sabato: 8:00 – 12:00</p>
                </div>
              </div>
            </address>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-xs text-xs">
            © {year} Dierre Impianti s.n.c. di Dainese Roberto
          </p>

          {/* Credit */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Sito realizzato da ACWebD"
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/7 hover:border-white/14 transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.02)' }}>
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="animate-ping absolute inset-0 rounded-full bg-accent opacity-40"/>
              <span className="relative rounded-full h-1.5 w-1.5 bg-accent"/>
            </span>
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-text-xs group-hover:text-text-s transition-colors">
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
