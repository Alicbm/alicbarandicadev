import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

const CopyToast = () => {
  const { lang } = useLang()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let timer
    const show = () => {
      setVisible(true)
      clearTimeout(timer)
      timer = setTimeout(() => setVisible(false), 2500)
    }
    window.addEventListener('email-copied', show)
    return () => {
      window.removeEventListener('email-copied', show)
      clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -60, x: '-50%' }}
          animate={{ opacity: 1, y: 0,   x: '-50%' }}
          exit={{   opacity: 0, y: -60,  x: '-50%' }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          className="fixed left-1/2 z-[99999] flex items-center gap-3
                     px-5 py-3.5 rounded-2xl shadow-2xl"
          style={{
            top: '1.5rem',
            background: 'rgba(9,9,11,0.95)',
            border: '1px solid rgba(34,197,94,0.35)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(34,197,94,0.1)',
          }}
        >
          <span
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)' }}
          >
            <Check size={13} style={{ color: '#22c55e' }} strokeWidth={2.5} />
          </span>
          <div>
            <p className="text-white text-sm font-semibold leading-tight">
              {lang === 'es' ? '¡Correo copiado!' : 'Email copied!'}
            </p>
            <p className="text-zinc-500 text-xs leading-tight mt-0.5">
              alicbarandicamejia@gmail.com
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CopyToast
