import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, toggle, t } = useLang()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#about', label: t.nav.about },
    { href: '#stack', label: t.nav.stack },
    { href: '#projects', label: t.nav.projects },
    { href: '#process', label: t.nav.process },
    { href: '#pricing', label: t.nav.pricing },
    { href: '#contact', label: t.nav.contact },
  ]

  const handleLink = () => setMenuOpen(false)

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
        className={`fixed top-6 right-4 sm:right-6 z-50 flex items-center gap-1.5 px-4 py-2.5 rounded-full
                    transition-all duration-400 border
                    ${scrolled
            ? 'bg-zinc-900/95 backdrop-blur-xl border-zinc-700/60 shadow-2xl shadow-black/30'
            : 'bg-white/5 backdrop-blur-sm border-white/10'
          }`}
      >
        <a
          href="#hero"
          className="text-white font-display font-bold text-base tracking-tight mr-1 hover:text-brand-400 transition-colors"
        >
          AB
        </a>

        <span className="h-4 w-px bg-white/20 mx-0.5 hidden md:block" />

        <div className="hidden md:flex items-center gap-0">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] lg:text-[13px] font-medium text-white/65 hover:text-white
                         px-2 lg:px-2.5 py-1.5 rounded-full
                         hover:bg-white/8 transition-all duration-200 whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </div>

        <span className="h-4 w-px bg-white/20 mx-0.5 hidden md:block" />

        <button
          onClick={toggle}
          className="text-xs font-bold px-3 py-1.5 rounded-full text-white
                     transition-all duration-200 min-w-[36px] text-center"
          style={{
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            boxShadow: '0 2px 10px rgba(37,99,235,0.35)',
          }}
        >
          {lang === 'es' ? 'EN' : 'ES'}
        </button>

        <button
          className="md:hidden ml-1 text-white/70 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[5.5rem] right-4 sm:right-6 z-40 bg-zinc-900/98 backdrop-blur-xl
                       border border-zinc-700/50 rounded-2xl p-2.5 shadow-2xl shadow-black/60"
            style={{
              width: 'min(calc(100vw - 2rem), 280px)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
            }}
          >
            <div className="grid grid-cols-1 gap-0.5">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLink}
                  className="text-sm font-semibold text-white/65 hover:text-white
                             hover:bg-white/6 px-4 py-3 rounded-xl
                             transition-all duration-150 text-center"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px my-2 mx-1" style={{ background: 'rgba(255,255,255,0.06)' }} />

            {/* Language toggle */}
            <button
              onClick={() => { toggle(); setMenuOpen(false) }}
              className="w-full text-xs font-bold px-4 py-2.5 rounded-xl text-center
                         transition-all duration-150 text-white/70 hover:text-white hover:bg-white/5"
            >
              {lang === 'es' ? '🌐 Switch to English' : '🌐 Cambiar a Español'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
