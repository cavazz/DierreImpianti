import PageBanner    from '../components/PageBanner'
import Services      from '../components/Services'
import VideoCollage  from '../components/VideoCollage'

export default function Servizi() {
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
