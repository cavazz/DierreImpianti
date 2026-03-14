import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Cookie } from 'lucide-react'

const KEY = 'dierre-cookies'

export default function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(KEY)) {
      const t = setTimeout(() => setShow(true), 1800)
      return () => clearTimeout(t)
    }
  }, [])

  const accept = () => { localStorage.setItem(KEY, 'all'); setShow(false) }
  const reject = () => { localStorage.setItem(KEY, 'min'); setShow(false) }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Preferenze cookie"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0,   opacity: 1 }}
          exit={{    y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 26, stiffness: 240 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-[99]">

          <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.14)] border border-border p-5">

            <div className="flex items-start gap-3 mb-4">
              <div className="icon-box-sm flex-shrink-0 mt-0.5" aria-hidden="true">
                <Cookie size={15} className="text-accent"/>
              </div>
              <div>
                <p className="font-display font-700 text-text-p text-sm mb-1">Cookie</p>
                <p className="text-text-s text-xs leading-relaxed">
                  Utilizziamo cookie tecnici necessari al funzionamento del sito.{' '}
                  <Link to="/cookie" onClick={reject}
                    className="text-accent hover:text-accent-h underline transition-colors">
                    Cookie Policy
                  </Link>
                  {' · '}
                  <Link to="/privacy" onClick={reject}
                    className="text-accent hover:text-accent-h underline transition-colors">
                    Privacy
                  </Link>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={reject}
                className="flex-1 py-2.5 rounded-full text-text-s text-xs font-semibold border border-border hover:border-border-2 hover:bg-bg transition-all duration-200">
                Solo necessari
              </button>
              <button
                onClick={accept}
                className="flex-1 btn-primary !py-2.5 !text-xs">
                Accetta tutti
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
