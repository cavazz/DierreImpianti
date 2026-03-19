import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Home } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta'

export default function NotFound() {
  usePageMeta({
    title: 'Pagina non trovata · Dierre Impianti',
    description: 'La pagina che stai cercando non esiste. Torna alla home di Dierre Impianti.',
  })

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-5">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center max-w-lg"
      >
        {/* Error code */}
        <p
          className="font-display font-black text-text-xs select-none mb-6"
          style={{ fontSize: 'clamp(6rem, 20vw, 10rem)', letterSpacing: '-0.05em', lineHeight: 1, opacity: 0.12 }}
          aria-hidden="true"
        >
          404
        </p>

        <div className="-mt-6 relative z-10">
          <span className="label mb-4 inline-block">Pagina non trovata</span>
          <h1
            className="font-display font-black text-text-p leading-[1.05] tracking-[-0.035em] mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
          >
            Questa pagina<br />
            <span className="gradient-text">non esiste.</span>
          </h1>
          <p className="text-text-s text-base leading-relaxed mb-10 max-w-sm mx-auto">
            L'URL che hai seguito non corrisponde a nessuna pagina del sito.
            Forse è stato spostato o scritto in modo errato.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              <Home size={15} aria-hidden="true" />
              <span>Torna alla Home</span>
            </Link>
            <Link
              to="/contatti"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-text-s hover:text-text-p transition-colors duration-200"
              style={{ border: '1.5px solid rgba(255,255,255,0.1)' }}
            >
              <ArrowLeft size={14} aria-hidden="true" />
              <span>Contattaci</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
