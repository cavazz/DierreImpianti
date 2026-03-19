import { useEffect } from 'react'

const DEFAULT_TITLE       = 'Dierre Impianti | Impianti Elettrici · Padova'
const DEFAULT_DESCRIPTION = 'Dierre Impianti - Impianti elettrici, fotovoltaico, domotica, antenne, climatizzazione, reti dati e automazioni. Provincia di Padova.'

function setMeta(selector, attr, value) {
  const el = document.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

export function usePageMeta({ title, description }) {
  useEffect(() => {
    document.title = title

    setMeta('meta[name="description"]',         'content', description)
    setMeta('meta[property="og:title"]',        'content', title)
    setMeta('meta[property="og:description"]',  'content', description)
    setMeta('meta[name="twitter:title"]',       'content', title)
    setMeta('meta[name="twitter:description"]', 'content', description)

    return () => {
      document.title = DEFAULT_TITLE
      setMeta('meta[name="description"]',         'content', DEFAULT_DESCRIPTION)
      setMeta('meta[property="og:title"]',        'content', DEFAULT_TITLE)
      setMeta('meta[property="og:description"]',  'content', DEFAULT_DESCRIPTION)
      setMeta('meta[name="twitter:title"]',       'content', DEFAULT_TITLE)
      setMeta('meta[name="twitter:description"]', 'content', DEFAULT_DESCRIPTION)
    }
  }, [title, description])
}
