import { useEffect } from 'react'

const SITE_URL             = 'https://www.dierreimpianti.it'
const DEFAULT_TITLE        = 'Dierre Impianti | Impianti Elettrici · Padova'
const DEFAULT_DESCRIPTION  = 'Dierre Impianti - Impianti elettrici, fotovoltaico, domotica, antenne, climatizzazione, reti dati e automazioni. Provincia di Padova.'
const DEFAULT_PATH         = '/'

function setMeta(selector, attr, value) {
  const el = document.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

function setCanonical(path) {
  let link = document.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    document.head.appendChild(link)
  }
  link.href = `${SITE_URL}${path}`
}

export function usePageMeta({ title, description, path = DEFAULT_PATH }) {
  useEffect(() => {
    document.title = title

    setMeta('meta[name="description"]',         'content', description)
    setMeta('meta[property="og:title"]',        'content', title)
    setMeta('meta[property="og:description"]',  'content', description)
    setMeta('meta[property="og:url"]',          'content', `${SITE_URL}${path}`)
    setMeta('meta[name="twitter:title"]',       'content', title)
    setMeta('meta[name="twitter:description"]', 'content', description)
    setCanonical(path)

    return () => {
      document.title = DEFAULT_TITLE
      setMeta('meta[name="description"]',         'content', DEFAULT_DESCRIPTION)
      setMeta('meta[property="og:title"]',        'content', DEFAULT_TITLE)
      setMeta('meta[property="og:description"]',  'content', DEFAULT_DESCRIPTION)
      setMeta('meta[property="og:url"]',          'content', `${SITE_URL}${DEFAULT_PATH}`)
      setMeta('meta[name="twitter:title"]',       'content', DEFAULT_TITLE)
      setMeta('meta[name="twitter:description"]', 'content', DEFAULT_DESCRIPTION)
      setCanonical(DEFAULT_PATH)
    }
  }, [title, description, path])
}
