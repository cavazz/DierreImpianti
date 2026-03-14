import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, Mail } from 'lucide-react'

const S = ({ title, children }) => (
  <section className="mb-10">
    <h2 className="text-text-p text-xl font-semibold mb-4 tracking-tight">{title}</h2>
    <div className="text-text-s text-[0.9375rem] leading-relaxed space-y-3">{children}</div>
  </section>
)

const ok = [
  'Struttura HTML5 semantica (nav, main, header, footer, section, article)',
  'Testo alternativo su tutte le immagini informative',
  'Contrasto del testo superiore al rapporto minimo 4.5:1 (WCAG AA)',
  'Navigazione completa tramite tastiera',
  'Focus visibile su tutti gli elementi interattivi',
  'Attributi ARIA su componenti interattivi (aria-label, aria-expanded, aria-modal)',
  'Lingua della pagina dichiarata: lang="it"',
  'Gerarchia degli heading logica e coerente (h1 → h2)',
  'Etichette <label> associate a tutti gli input del modulo (for/id)',
  'Messaggi di stato accessibili agli screen reader',
]

const limits = [
  "L'animazione del circuito elettrico nella hero è puramente decorativa e non trasmette informazioni essenziali — è ignorata dagli screen reader (aria-hidden)",
  "Gli effetti canvas (archi elettrici) sono decorativi e non esposti all'albero di accessibilità",
  "Le animazioni di scroll (Framer Motion) rispettano prefers-reduced-motion dove supportato",
]

export default function Accessibilita() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-bg pt-28 pb-20 px-5 md:px-12">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-text-s hover:text-accent text-sm font-medium mb-10 transition-colors">
          <ArrowLeft size={15}/> Torna alla home
        </Link>
        <header className="mb-12">
          <p className="text-electric text-[11px] font-semibold tracking-[0.2em] uppercase mb-3">Dichiarazione</p>
          <h1 className="text-text-p text-4xl md:text-5xl font-bold tracking-tight mb-4">Accessibilità</h1>
          <p className="text-text-s text-sm">
            <strong className="text-text-p">Dierre Impianti di Dainese Roberto</strong> ·
            Via Madonna Della Mercede 6, 35028 Piove di Sacco (PD) ·{' '}
            <a href="mailto:info@dierreimpianti.it" className="text-accent hover:text-electric underline">info@dierreimpianti.it</a>
          </p>
          <p className="text-text-s text-sm mt-1">Ultimo aggiornamento: 13 marzo 2026</p>
        </header>

        <div className="border-t border-[#0099ff]/12 pt-10">
          <S title="Stato di conformità">
            <p>Il sito web <strong className="text-text-p">www.dierreimpianti.it</strong> è <strong className="text-text-p">parzialmente conforme</strong> alle Web Content Accessibility Guidelines (WCAG) 2.1 Livello AA. Le non conformità note sono elencate di seguito.</p>
          </S>

          <S title="Caratteristiche di accessibilità implementate">
            <ul className="space-y-2.5">
              {ok.map(t => (
                <li key={t} className="flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0 mt-0.5"/>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </S>

          <S title="Limitazioni note">
            <ul className="space-y-2.5">
              {limits.map(t => (
                <li key={t} className="flex items-start gap-2.5">
                  <AlertCircle size={15} className="text-amber-400 flex-shrink-0 mt-0.5"/>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </S>

          <S title="Tecnologie utilizzate">
            <p>Il sito è realizzato con: HTML5 semantico, CSS3, JavaScript (React 18), ARIA. Testato con Google Chrome + ChromeVox, Firefox + NVDA, Safari + VoiceOver (macOS/iOS) e navigazione solo da tastiera.</p>
          </S>

          <S title="Segnalazione problemi">
            <p>Se riscontri un problema di accessibilità scrivici: descrivici l'ostacolo incontrato e risponderemo entro 5 giorni lavorativi.</p>
            <a href="mailto:info@dierreimpianti.it?subject=Segnalazione%20accessibilit%C3%A0"
              className="inline-flex items-center gap-2.5 mt-2 px-5 py-3 rounded-xl e-border e-bg text-accent text-sm font-medium hover:border-[#0099ff]/30 transition-all duration-200">
              <Mail size={15}/> info@dierreimpianti.it
            </a>
          </S>

          <S title="Normativa di riferimento">
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Direttiva UE 2016/2102 sull'accessibilità dei siti web degli enti pubblici</li>
              <li>Legge 9 gennaio 2004, n. 4 (Legge Stanca) e successive modifiche</li>
              <li>Standard WCAG 2.1, W3C Recommendation 5 giugno 2018</li>
            </ul>
          </S>
        </div>
      </div>
    </div>
  )
}
