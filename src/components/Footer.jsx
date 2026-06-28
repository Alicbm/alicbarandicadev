import { motion } from 'framer-motion'
import { Mail, ArrowUpRight } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

/* ── Inline SVGs ────────────────────────────────────────────── */
const LinkedInSvg = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const GitHubSvg = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

/* ── Footer ─────────────────────────────────────────────────── */
const Footer = () => {
  const { t, lang } = useLang()
  const year = new Date().getFullYear()

  const navLinks = [
    { href: '#about', label: t.nav.about },
    { href: '#stack', label: t.nav.stack },
    { href: '#projects', label: t.nav.projects },
    { href: '#process', label: t.nav.process },
    { href: '#pricing', label: t.nav.pricing },
    { href: '#contact', label: t.nav.contact },
  ]

  const socials = [
    {
      Icon: ({ size }) => <Mail size={size} />,
      href: 'mailto:alicbarandicamejia@gmail.com',
      label: 'Email',
    },
    {
      Icon: LinkedInSvg,
      href: 'https://www.linkedin.com/in/alic-barandica/',
      label: 'LinkedIn',
    },
    {
      Icon: GitHubSvg,
      href: 'https://github.com/alicbm',
      label: 'GitHub',
    },
  ]

  return (
    <footer className="bg-[#09090B] relative overflow-hidden">
      {/* Noise texture */}
      <div className="noise-texture absolute inset-0 pointer-events-none select-none" style={{ zIndex: 0 }} />

      {/* ══════════════════════════════════════════
          PRE-FOOTER CTA ZONE
      ══════════════════════════════════════════ */}
      <div className="relative border-t border-zinc-800/60 pt-24 pb-20 px-6 sm:px-10 lg:px-16 xl:px-24 overflow-hidden">

        {/* Watermark text — "AB" huge behind */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <span
            className="font-display font-black text-white leading-none"
            style={{
              fontSize: 'clamp(18rem, 35vw, 480px)',
              opacity: 0.022,
              letterSpacing: '-0.04em',
              userSelect: 'none',
            }}
          >
            AB
          </span>
        </div>

        {/* Blue glow under CTA */}
        <div
          className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[600px] h-[250px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.12) 0%, transparent 70%)' }}
        />

        {/* Animated top gradient border */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(to right, transparent 0%, rgba(37,99,235,0.5) 30%, rgba(124,58,237,0.5) 70%, transparent 100%)',
          }}
        />

        {/* CTA content */}
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">

            {/* Left: Heading */}
            <div className="max-w-xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-zinc-500 text-sm font-bold uppercase tracking-widest mb-3"
              >
                {lang === 'es' ? '— Empecemos' : '— Let\'s begin'}
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true }}
                className="font-display font-black text-white leading-[0.9] tracking-tight"
                style={{ fontSize: 'clamp(3rem, 7vw, 7rem)' }}
              >
                {lang === 'es' ? (
                  <>¿Tienes un<br /><span className="text-gradient">proyecto?</span></>
                ) : (
                  <>Have a<br /><span className="text-gradient">project?</span></>
                )}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-zinc-500 text-base leading-relaxed mt-5 max-w-sm"
              >
                {lang === 'es'
                  ? 'Primera consulta gratis. Sin compromisos. Solo cuéntame tu idea.'
                  : 'First consultation free. No strings attached. Just tell me your idea.'}
              </motion.p>
            </div>

            {/* Right: CTA actions */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col gap-4"
            >
              {/* Primary CTA */}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full
                           font-semibold text-base text-white transition-shadow duration-300
                           hover:shadow-[0_8px_32px_rgba(37,99,235,0.55)]"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  boxShadow: '0 3px 16px rgba(37,99,235,0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
                }}
              >
                {lang === 'es' ? 'Escribirme ahora' : 'Message me now'}
                <ArrowUpRight
                  size={17}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                />
              </motion.a>

              {/* Email direct */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText('alicbarandicamejia@gmail.com').catch(() => {})
                  window.dispatchEvent(new CustomEvent('email-copied'))
                }}
                className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors duration-200
                           text-center lg:text-left cursor-pointer"
              >
                alicbarandicamejia@gmail.com
              </button>

              {/* Social row */}
              <div className="flex gap-3 lg:justify-end">
                {socials.map(({ Icon, href, label }) => {
                  const isEmail = label === 'Email'
                  const sharedClass = "w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:border-brand-500/50 hover:text-brand-400 hover:bg-brand-500/10 transition-all duration-300"
                  if (isEmail) {
                    return (
                      <button
                        key={label}
                        aria-label={label}
                        onClick={() => {
                          navigator.clipboard.writeText('alicbarandicamejia@gmail.com').catch(() => {})
                          window.dispatchEvent(new CustomEvent('email-copied'))
                        }}
                        className={sharedClass}
                      >
                        <Icon size={16} />
                      </button>
                    )
                  }
                  return (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={sharedClass}
                    >
                      <Icon size={16} />
                    </a>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          BOTTOM FOOTER BAR
      ══════════════════════════════════════════ */}
      <div className="border-t border-zinc-800/50 px-6 sm:px-10 lg:px-16 xl:px-24 py-8">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Left: brand + nav links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <span className="font-display font-extrabold text-xl text-white tracking-tight">AB</span>
            <div className="flex flex-wrap justify-center sm:justify-start gap-x-5 gap-y-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-zinc-600 text-xs hover:text-zinc-400 transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: copyright + scroll to top */}
          <div className="flex items-center gap-5">
            <p className="text-zinc-700 text-xs">
              © {year} Alic Barandica
            </p>

            {/* Scroll to top */}
            <button
              onClick={scrollToTop}
              className="group w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800
                         flex items-center justify-center text-zinc-500
                         hover:border-brand-500/50 hover:text-brand-400 hover:bg-brand-500/10
                         transition-all duration-300"
              aria-label="Scroll to top"
            >
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                className="group-hover:-translate-y-0.5 transition-transform duration-200"
              >
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
