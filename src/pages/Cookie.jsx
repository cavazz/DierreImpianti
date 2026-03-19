import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta'

const S = ({ title, children }) => (
  <section className="mb-10">
    <h2 className="text-text-p text-xl font-semibold mb-4 tracking-tight">{title}</h2>
    <div className="text-text-s text-[0.9375rem] leading-relaxed space-y-3">{children}</div>
  </section>
)
const A = ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-h underline transition-colors">{children}</a>

export default function Cookie() {
  usePageMeta({
    title: 'Cookie Policy · Dierre Impianti',
    description: 'Informativa sui cookie di Dierre Impianti. Scopri quali cookie utilizziamo e come gestire le tue preferenze.',
  })
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-bg pt-28 pb-20 px-5 md:px-12">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-text-s hover:text-accent text-sm font-medium mb-10 transition-colors">
          <ArrowLeft size={15}/> Torna alla home
        </Link>
        <header className="mb-12">
          <p className="label mb-3">Informativa</p>
          <h1 className="text-text-p text-4xl md:text-5xl font-bold tracking-tight mb-4">Cookie Policy</h1>
          <p className="text-text-s text-sm">Ultimo aggiornamento: 13 marzo 2026 · Versione 1.0</p>
          <p className="text-text-s text-sm mt-1">
            Titolare: <strong className="text-text-p">Dierre Impianti di Dainese Roberto</strong> ·{' '}
            <a href="mailto:info@dierreimpianti.it" className="text-accent hover:text-accent-h underline">info@dierreimpianti.it</a> ·{' '}
            <a href="tel:3473177613" className="text-accent hover:text-accent-h underline">347.317.7613</a>
          </p>
        </header>

        <div className="border-t border-white/6 pt-10">
          <S title="1. Cosa sono i cookie">
            <p>I cookie sono piccoli file di testo che i siti web salvano nel browser quando li visiti. Permettono al sito di ricordare le tue azioni e preferenze nel tempo, senza doverle reinserire ad ogni visita.</p>
          </S>

          <S title="2. Cookie utilizzati da questo sito">
            <div className="overflow-x-auto rounded-xl p-4" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.025)' }}>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/6">
                    {['Nome / Origine','Tipo','Durata','Scopo'].map(h => (
                      <th key={h} className="text-left py-2 pr-3 text-text-p font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['dierre-cookies','Tecnico / Preferenza','12 mesi','Memorizza la scelta sui cookie dell\'utente'],
                    ['Google Fonts (fonts.googleapis.com)','Tecnico (terza parte)','Sessione','Caricamento font tipografici'],
                    ['Unsplash (images.unsplash.com)','Tecnico (terza parte)','Sessione','Caricamento immagini dei servizi'],
                  ].map(([n,t,d,s]) => (
                    <tr key={n} className="border-b border-white/5 align-top">
                      <td className="py-2.5 pr-3 font-mono text-xs text-text-p/80 break-all">{n}</td>
                      <td className="py-2.5 pr-3">{t}</td>
                      <td className="py-2.5 pr-3 whitespace-nowrap">{d}</td>
                      <td className="py-2.5">{s}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-text-s/60 text-xs">Il sito non utilizza cookie di profilazione né cookie pubblicitari.</p>
          </S>

          <S title="3. Cookie tecnici (sempre attivi)">
            <p>Sono necessari al funzionamento del sito e non richiedono il consenso dell'utente (art. 122, co. 1, D.Lgs. 196/2003). Includono la memorizzazione delle preferenze cookie selezionate dall'utente.</p>
          </S>

          <S title="4. Cookie di terze parti">
            <p>Il sito carica risorse esterne che possono impostare cookie propri indipendentemente dalla nostra gestione:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong className="text-text-p">Google Fonts</strong> — tipografia. Policy: <A href="https://policies.google.com/privacy">policies.google.com/privacy</A></li>
              <li><strong className="text-text-p">Unsplash</strong> — immagini. Policy: <A href="https://unsplash.com/privacy">unsplash.com/privacy</A></li>
            </ul>
          </S>

          <S title="5. Gestione e revoca del consenso">
            <p>Puoi modificare le tue preferenze cookie in qualsiasi momento:</p>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li>Eliminando i cookie dal browser (questo rifarà apparire il banner alla prossima visita)</li>
              <li>Tramite le impostazioni del tuo browser:</li>
            </ul>
            <div className="ml-4 mt-2 space-y-1">
              {[
                ['Google Chrome','https://support.google.com/chrome/answer/95647'],
                ['Mozilla Firefox','https://support.mozilla.org/it/kb/Gestione-dei-cookie'],
                ['Apple Safari','https://support.apple.com/it-it/guide/safari/sfri11471/mac'],
                ['Microsoft Edge','https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie'],
              ].map(([browser, url]) => (
                <p key={browser}><A href={url}>{browser}</A></p>
              ))}
            </div>
          </S>

          <S title="6. Riferimenti normativi">
            <p>Questa policy è redatta ai sensi di:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Regolamento UE 2016/679 (GDPR)</li>
              <li>D.Lgs. 196/2003 (Codice Privacy) come modificato dal D.Lgs. 101/2018</li>
              <li>Provvedimento del Garante del 10 giugno 2021 sui cookie</li>
            </ul>
            <p>Per informazioni sul trattamento dei dati personali consulta la <Link to="/privacy" className="text-accent hover:text-accent-h underline">Privacy Policy</Link>.</p>
          </S>
        </div>
      </div>
    </div>
  )
}
