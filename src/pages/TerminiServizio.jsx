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
const B = ({ children }) => <strong className="text-text-p font-medium">{children}</strong>

export default function TerminiServizio() {
  usePageMeta({
    title: 'Termini di Servizio · Dierre Impianti',
    description: 'Termini e condizioni di utilizzo del sito web di Dierre Impianti di Dainese Roberto.',
  })

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-bg pt-28 pb-20 px-5 md:px-12">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-text-s hover:text-accent text-sm font-medium mb-10 transition-colors">
          <ArrowLeft size={15}/> Torna alla home
        </Link>
        <header className="mb-12">
          <p className="label mb-3">Condizioni d'uso</p>
          <h1 className="text-text-p text-4xl md:text-5xl font-bold tracking-tight mb-4">Termini di Servizio</h1>
          <p className="text-text-s text-sm">
            Ultimo aggiornamento: 19 marzo 2026 · Versione 1.0<br/>
            Titolare: <B>Dierre Impianti di Dainese Roberto</B> · P.IVA 05181630285
          </p>
        </header>

        <div className="border-t border-white/6 pt-10">

          <S title="1. Oggetto e Accettazione">
            <p>
              Il presente documento disciplina le condizioni di utilizzo del sito web
              <B> www.dierreimpianti.it</B> (di seguito "Sito"), gestito da{' '}
              <B>Dierre Impianti di Dainese Roberto</B>, con sede in Via Madonna Della
              Mercede 6, 35028 Piove di Sacco (PD), P.IVA 05181630285.
            </p>
            <p>
              L'accesso e l'utilizzo del Sito comportano l'accettazione integrale dei
              presenti Termini. Se non accetti queste condizioni, ti invitiamo a non
              utilizzare il Sito.
            </p>
          </S>

          <S title="2. Finalità del Sito">
            <p>
              Il Sito ha scopo informativo e promozionale: illustra le attività e i
              servizi offerti da Dierre Impianti e fornisce un canale di contatto per
              richiedere informazioni o preventivi. <B>Il Sito non costituisce un negozio
              online</B> né consente la conclusione di contratti in via telematica.
            </p>
          </S>

          <S title="3. Proprietà Intellettuale">
            <p>
              Tutti i contenuti presenti sul Sito — testi, grafica, loghi, immagini,
              codice sorgente, animazioni — sono di proprietà di Dierre Impianti di
              Dainese Roberto o dei rispettivi titolari dei diritti e sono protetti dalla
              normativa italiana ed europea sul diritto d'autore (L. 633/1941, Direttiva
              UE 2019/790).
            </p>
            <p>
              È vietata la riproduzione, distribuzione, modifica o utilizzo commerciale
              di qualsiasi contenuto senza previa autorizzazione scritta del titolare.
            </p>
          </S>

          <S title="4. Utilizzo Consentito">
            <p>L'utente si impegna a utilizzare il Sito esclusivamente per scopi leciti e
              in conformità alle presenti condizioni. In particolare è vietato:</p>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li>Trasmettere contenuti illeciti, offensivi o lesivi di diritti di terzi</li>
              <li>Tentare di accedere in modo non autorizzato ai sistemi o ai dati del Sito</li>
              <li>Utilizzare strumenti automatici (bot, scraper) senza autorizzazione</li>
              <li>Inviare comunicazioni non richieste (spam) tramite il modulo di contatto</li>
              <li>Riprodurre il design o il codice del Sito per fini commerciali</li>
            </ul>
          </S>

          <S title="5. Esclusione di Garanzie">
            <p>
              Il Sito è fornito <B>"così com'è"</B>. Dierre Impianti non garantisce che il
              Sito sia sempre disponibile, privo di errori o virus. Ci riserviamo il
              diritto di sospendere, modificare o interrompere il Sito in qualsiasi
              momento senza preavviso.
            </p>
            <p>
              Le informazioni sui servizi hanno carattere indicativo: caratteristiche,
              tempistiche e prezzi definitivi sono concordati direttamente con il cliente
              in sede di sopralluogo o preventivo.
            </p>
          </S>

          <S title="6. Limitazione di Responsabilità">
            <p>
              Nei limiti consentiti dalla legge applicabile, Dierre Impianti non è
              responsabile per:
            </p>
            <ul className="list-disc list-inside space-y-1.5 ml-2">
              <li>Danni diretti o indiretti derivanti dall'utilizzo o dall'impossibilità di utilizzo del Sito</li>
              <li>Contenuti di siti web esterni raggiungibili tramite link presenti sul Sito</li>
              <li>Interruzioni del servizio dovute a cause di forza maggiore o a terze parti</li>
            </ul>
          </S>

          <S title="7. Link a Siti Esterni">
            <p>
              Il Sito può contenere link a siti web di terze parti (es. Google Maps,
              Instagram). Tali link sono forniti a titolo informativo: Dierre Impianti
              non ha controllo su quei siti e non è responsabile dei loro contenuti o
              delle loro politiche sulla privacy.
            </p>
          </S>

          <S title="8. Privacy e Cookie">
            <p>
              Il trattamento dei dati personali degli utenti è descritto nella{' '}
              <Link to="/privacy" className="text-accent hover:text-accent-h underline">Privacy Policy</Link>.
              Le informazioni sull'utilizzo dei cookie sono disponibili nella{' '}
              <Link to="/cookie" className="text-accent hover:text-accent-h underline">Cookie Policy</Link>.
            </p>
          </S>

          <S title="9. Legge Applicabile e Foro Competente">
            <p>
              I presenti Termini sono regolati dalla legge italiana. Per qualsiasi
              controversia derivante dall'utilizzo del Sito è competente in via esclusiva
              il Foro di <B>Padova</B>, salvo diversa disposizione inderogabile di legge
              a tutela del consumatore.
            </p>
          </S>

          <S title="10. Modifiche ai Termini">
            <p>
              Dierre Impianti si riserva il diritto di modificare i presenti Termini in
              qualsiasi momento. Le modifiche saranno pubblicate su questa pagina con
              aggiornamento della data in cima. L'utilizzo continuato del Sito dopo la
              pubblicazione delle modifiche costituisce accettazione delle stesse.
            </p>
          </S>

          <S title="11. Contatti">
            <p>
              Per qualsiasi domanda relativa ai presenti Termini:<br/>
              <B>Dierre Impianti di Dainese Roberto</B><br/>
              Via Madonna Della Mercede 6, 35028 Piove di Sacco (PD)<br/>
              Email:{' '}
              <a href="mailto:info@dierreimpianti.it" className="text-accent hover:text-accent-h underline">
                info@dierreimpianti.it
              </a><br/>
              Tel:{' '}
              <a href="tel:+393473177613" className="text-accent hover:text-accent-h underline">
                +39 347 317 7613
              </a>
            </p>
          </S>

        </div>
      </div>
    </div>
  )
}
