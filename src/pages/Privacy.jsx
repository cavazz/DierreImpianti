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
const B = ({ children }) => <strong className="text-text-p font-medium">{children}</strong>

export default function Privacy() {
  usePageMeta({
    title: 'Privacy Policy · Dierre Impianti',
    description: 'Informativa sulla privacy di Dierre Impianti. Scopri come trattiamo i tuoi dati personali nel rispetto del GDPR.',
    path: '/privacy',
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
          <h1 className="text-text-p text-4xl md:text-5xl font-bold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-text-s text-sm">Ultimo aggiornamento: 13 marzo 2026 · Versione 1.0</p>
        </header>

        <div className="border-t border-white/6 pt-10">
          <S title="1. Titolare del Trattamento">
            <p>Il Titolare del trattamento è:<br/>
              <B>Dierre Impianti di Dainese Roberto</B><br/>
              Via Madonna Della Mercede 6, 35028 Piove di Sacco (PD)<br/>
              Tel: <a href="tel:3473177613" className="text-accent hover:text-accent-h underline">347.317.7613</a><br/>
              Email: <a href="mailto:info@dierreimpianti.it" className="text-accent hover:text-accent-h underline">info@dierreimpianti.it</a><br/>
              Sito web: <A href="https://www.dierreimpianti.it">www.dierreimpianti.it</A>
            </p>
          </S>

          <S title="2. Dati Raccolti">
            <p>Raccogliamo le seguenti categorie di dati:</p>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li><B>Dati di contatto:</B> nome, cognome, email, numero di telefono — forniti volontariamente tramite il modulo di contatto</li>
              <li><B>Contenuto dei messaggi:</B> il testo della richiesta o del preventivo</li>
              <li><B>Dati tecnici di navigazione:</B> indirizzo IP, browser, dispositivo (solo con consenso analitico)</li>
              <li><B>Preferenze:</B> le impostazioni dei cookie, salvate localmente nel dispositivo dell'utente</li>
            </ul>
            <p>Non raccogliamo dati sensibili (categorie particolari ex art. 9 GDPR) né dati relativi a minori di 14 anni.</p>
          </S>

          <S title="3. Finalità e Base Giuridica">
            <div className="overflow-x-auto rounded-xl p-4" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.025)' }}>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/6">
                    <th className="text-left py-2 pr-4 text-text-p font-medium">Finalità</th>
                    <th className="text-left py-2 pr-4 text-text-p font-medium">Base Giuridica</th>
                    <th className="text-left py-2 text-text-p font-medium">Conservazione</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Risposta alle richieste di contatto','Interesse legittimo (art. 6.1.f GDPR)','12 mesi'],
                    ['Elaborazione preventivi','Esecuzione precontrattuale (art. 6.1.b GDPR)','24 mesi'],
                    ['Cookie tecnici/preferenze','Interesse legittimo','Sessione / 12 mesi'],
                    ['Cookie analitici (opzionale)','Consenso (art. 6.1.a GDPR)','26 mesi'],
                  ].map(([f,b,c]) => (
                    <tr key={f} className="border-b border-white/5">
                      <td className="py-2.5 pr-4">{f}</td>
                      <td className="py-2.5 pr-4">{b}</td>
                      <td className="py-2.5">{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </S>

          <S title="4. Modalità di Trattamento">
            <p>I dati sono trattati con strumenti informatici adottando misure di sicurezza adeguate (art. 32 GDPR) per prevenire accessi non autorizzati, perdita o divulgazione non consentita.</p>
            <p>I dati del modulo di contatto <B>non vengono ceduti a terze parti</B> e sono accessibili esclusivamente al titolare per rispondere alla richiesta.</p>
          </S>

          <S title="5. Diritti dell'Interessato">
            <p>Ai sensi degli artt. 15-22 del GDPR hai diritto di:</p>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li><B>Accesso</B> — conoscere i dati che trattiamo su di te (art. 15)</li>
              <li><B>Rettifica</B> — correggere dati inesatti (art. 16)</li>
              <li><B>Cancellazione</B> — richiedere l'eliminazione dei dati (art. 17)</li>
              <li><B>Limitazione</B> — limitare il trattamento in certi casi (art. 18)</li>
              <li><B>Portabilità</B> — ricevere i dati in formato strutturato (art. 20)</li>
              <li><B>Opposizione</B> — opporti al trattamento per interesse legittimo (art. 21)</li>
              <li><B>Revoca del consenso</B> — in qualsiasi momento, senza pregiudicare la liceità del trattamento pregresso</li>
            </ul>
            <p>Per esercitare i tuoi diritti scrivi a <a href="mailto:info@dierreimpianti.it" className="text-accent hover:text-accent-h underline">info@dierreimpianti.it</a>. Risponderemo entro 30 giorni.</p>
            <p>Hai inoltre il diritto di proporre reclamo al <A href="https://www.garanteprivacy.it">Garante per la Protezione dei Dati Personali</A>.</p>
          </S>

          <S title="6. Trasferimento dei Dati Extra-UE">
            <p>I dati non vengono trasferiti in paesi extra-UE. Il sito utilizza risorse esterne (Google Fonts, Unsplash CDN) che potrebbero comportare trasferimenti di dati verso gli USA; tali fornitori aderiscono a meccanismi di adeguatezza riconosciuti dalla Commissione Europea.</p>
          </S>

          <S title="7. Modifiche">
            <p>Ci riserviamo di aggiornare questa informativa. La data di "Ultimo aggiornamento" in cima alla pagina indica la versione corrente. Modifiche sostanziali saranno comunicate tramite avviso sul sito.</p>
          </S>
        </div>
      </div>
    </div>
  )
}
