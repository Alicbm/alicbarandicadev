import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

/* ── Inline SVGs for brand icons (Lucide doesn't have these) ── */
const LinkedInSvg = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const GitHubSvg = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const WhatsAppSvg = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.12.553 4.107 1.52 5.83L0 24l6.335-1.52A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.814 9.814 0 0 1-5.007-1.364l-.36-.213-3.726.977.997-3.645-.234-.375A9.81 9.81 0 0 1 2.182 12c0-5.42 4.398-9.818 9.818-9.818 5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z" />
  </svg>
)

/* ── Reveal animation ──────────────────────────────────────── */
const revealUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

/* ── Contact links data ─────────────────────────────────────── */
const getContactLinks = (t, lang) => [
  {
    key: 'email',
    IconComp: ({ size }) => <Mail size={size} />,
    label: t.contact.email_label,
    value: 'alicbarandicamejia@gmail.com',
    href: 'mailto:alicbarandicamejia@gmail.com',
    description: t.contact.availability_desc,
    iconColor: '#f97316',
    accentBg: 'rgba(249,115,22,0.09)',
    accentBorder: 'rgba(249,115,22,0.25)',
    hoverBorder: 'rgba(249,115,22,0.45)',
  },
  {
    key: 'whatsapp',
    featured: true,                       // <- tarjeta destacada
    IconComp: WhatsAppSvg,
    label: 'WHATSAPP',
    value: '+57 317 282 3206',
    href: 'https://wa.me/573172823206',
    description: lang === 'es' ? 'Respondo en menos de 1 hora' : 'I respond in less than 1 hour',
    badge: lang === 'es' ? 'Respuesta inmediata' : 'Instant reply',
    iconColor: '#25D366',
    accentBg: 'rgba(37,211,102,0.08)',
    cardBg: 'rgba(37,211,102,0.04)',
    accentBorder: 'rgba(37,211,102,0.3)',
    hoverBorder: 'rgba(37,211,102,0.6)',
  },
  {
    key: 'linkedin',
    IconComp: LinkedInSvg,
    label: t.contact.linkedin_label,
    value: '/in/alic-barandica',
    href: 'https://www.linkedin.com/in/alic-barandica/',
    description: lang === 'es' ? 'Conecta profesionalmente' : 'Connect professionally',
    iconColor: '#60a5fa',
    accentBg: 'rgba(37,99,235,0.09)',
    accentBorder: 'rgba(37,99,235,0.22)',
    hoverBorder: 'rgba(37,99,235,0.5)',
  },
  {
    key: 'github',
    IconComp: GitHubSvg,
    label: t.contact.github_label,
    value: '@alicbm',
    href: 'https://github.com/alicbm',
    description: lang === 'es' ? 'Mira mi código' : 'Check my code',
    iconColor: '#a78bfa',
    accentBg: 'rgba(167,139,250,0.09)',
    accentBorder: 'rgba(167,139,250,0.4)',
    hoverBorder: 'rgba(167,139,250,0.60)',
  },
]

const Contact = () => {
  const { t, lang } = useLang()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const contactLinks = getContactLinks(t, lang)
  const [emailCopied, setEmailCopied] = useState(false)

  const handleEmailClick = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText('alicbarandicamejia@gmail.com').catch(() => {})
    setEmailCopied(true)
    window.dispatchEvent(new CustomEvent('email-copied'))
    setTimeout(() => setEmailCopied(false), 2500)
  }

  return (
    <section id="contact" className="bg-zinc-50 py-28 lg:py-36 overflow-hidden relative">
      {/* Subtle top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

      <div ref={ref} className="max-w-6xl mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* ── LEFT: Text ── */}
          <div>
            <motion.span
              variants={revealUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}
              className="section-label" style={{ color: '#2563eb' }}
            >
              {t.contact.label}
            </motion.span>

            <motion.h2
              variants={revealUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}
              className="font-display font-extrabold text-zinc-900 leading-tight mt-2"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              {t.contact.title}
              <br />
              <span className="text-gradient">{t.contact.title2}</span>
            </motion.h2>

            <motion.p
              variants={revealUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={2}
              className="text-zinc-500 text-base lg:text-[17px] leading-relaxed mt-6 max-w-md"
            >
              {t.contact.subtitle}
            </motion.p>

            {/* Availability badge */}
            <motion.div
              variants={revealUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={3}
              className="mt-8 inline-flex items-center gap-3 px-5 py-3.5 rounded-2xl
                         bg-emerald-50 border border-emerald-200"
            >
              <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0" />
              <div>
                <p className="text-emerald-800 font-bold text-sm">{t.contact.availability}</p>
                <p className="text-emerald-600 text-xs mt-0.5">{t.contact.availability_desc}</p>
              </div>
            </motion.div>

            {/* Decorative quote */}
            <motion.blockquote
              variants={revealUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={4}
              className="mt-10 pl-4 border-l-2 border-brand-500"
            >
              <p className="text-zinc-400 text-sm italic leading-relaxed">
                {lang === 'es'
                  ? '"La primera conversación siempre es gratis. Cuéntame tu idea."'
                  : '"The first conversation is always free. Tell me your idea."'}
              </p>
            </motion.blockquote>
          </div>

          {/* ── RIGHT: Contact links ── */}
          <div className="flex flex-col gap-4">
            {contactLinks.map((link, i) => {
              const isEmail = link.key === 'email'
              const copied = isEmail && emailCopied
              return (
              <motion.a
                key={link.key}
                href={isEmail ? undefined : link.href}
                target={!isEmail ? '_blank' : undefined}
                rel="noopener noreferrer"
                onClick={isEmail ? handleEmailClick : undefined}
                variants={revealUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                custom={5 + i}
                whileHover={{ x: copied ? 0 : 5, transition: { duration: 0.2 } }}
                className="group relative flex items-center gap-5 p-5 rounded-2xl shadow-sm
                           transition-all duration-300 hover:shadow-md cursor-pointer"
                style={{
                  background: copied ? 'rgba(34,197,94,0.04)' : link.featured ? link.cardBg : 'white',
                  border: `1px solid ${copied ? 'rgba(34,197,94,0.35)' : link.accentBorder}`,
                }}
                onMouseEnter={(e) => { if (!copied) e.currentTarget.style.borderColor = link.hoverBorder }}
                onMouseLeave={(e) => { if (!copied) e.currentTarget.style.borderColor = link.accentBorder }}
              >
                {/* Badge exclusivo para WhatsApp */}
                {link.featured && (
                  <div className="absolute top-3 right-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                    style={{
                      background: 'rgba(37,211,102,0.12)',
                      border: '1px solid rgba(37,211,102,0.28)',
                    }}>
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                        style={{ background: '#25D366' }} />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5"
                        style={{ background: '#25D366' }} />
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-wider"
                      style={{ color: '#16a34a' }}>
                      {link.badge}
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: link.accentBg }}
                >
                  <span style={{ color: link.iconColor }}>
                    <link.IconComp size={22} />
                  </span>
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider">
                    {link.label}
                  </p>
                  <p className="text-zinc-900 font-bold text-base mt-0.5 truncate">{link.value}</p>
                  <p className="text-sm mt-0.5" style={{ color: link.featured ? '#16a34a' : '#a1a1aa' }}>
                    {link.description}
                  </p>
                </div>

                {/* Arrow */}
                <ArrowRight
                  size={18}
                  className="text-zinc-300 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0"
                  style={{ color: link.featured ? 'rgba(37,211,102,0.5)' : undefined }}
                />
              </motion.a>
            )})}

          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
