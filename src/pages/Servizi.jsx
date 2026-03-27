import PageBanner    from '../components/PageBanner'
import Services      from '../components/Services'
import VideoCollage  from '../components/VideoCollage'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Servizi() {
  usePageMeta({
    title: 'Servizi · Dierre Impianti | Elettrico, Fotovoltaico, Domotica Padova',
    description: 'Impianti elettrici, fotovoltaico, domotica, antenne, reti dati, automazioni e parafulmine. Servizi professionali nella provincia di Padova.',
    path: '/servizi',
  })
  return (
    <>
      <PageBanner
        label="Cosa facciamo"
        title="I nostri servizi"
        subtitle="Dall'impianto elettrico alla domotica, dal fotovoltaico alla sicurezza. Tutto ciò che ti serve per casa o azienda, realizzato con cura e competenza certificata."
      />
      <Services />
      <VideoCollage />
    </>
  )
}
