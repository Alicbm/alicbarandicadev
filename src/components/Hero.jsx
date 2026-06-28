import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import photoSrc from '../assets/photo.jpeg'

/* ── Process-matched accent palette ──────────────────────────── */
const C = {
  blue:   { bg: 'rgba(96,165,250,0.10)',  border: 'rgba(96,165,250,0.26)',  glow: 'rgba(96,165,250,0.18)',  text: '#60a5fa' },
  purple: { bg: 'rgba(167,139,250,0.10)', border: 'rgba(167,139,250,0.26)', glow: 'rgba(167,139,250,0.15)', text: '#a78bfa' },
  yellow: { bg: 'rgba(251,191,36,0.08)',  border: 'rgba(251,191,36,0.24)',  glow: 'rgba(251,191,36,0.12)',  text: '#fbbf24' },
  orange: { bg: 'rgba(251,146,60,0.10)',  border: 'rgba(251,146,60,0.26)',  glow: 'rgba(251,146,60,0.16)',  text: '#fb923c' },
  cyan:   { bg: 'rgba(34,211,238,0.08)',  border: 'rgba(34,211,238,0.20)',  glow: 'rgba(34,211,238,0.10)',  text: '#22d3ee' },
}

const glass = (color) => ({
  background: color.bg,
  border: `1px solid ${color.border}`,
  boxShadow: `0 8px 32px ${color.glow}`,
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
})

const Reveal = ({ children, delay = 0 }) => (
  <div style={{ overflow: 'hidden', display: 'block' }}>
    <motion.div
      initial={{ y: '105%' }}
      animate={{ y: 0 }}
      transition={{ duration: 1.05, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  </div>
)

const Hero = () => {
  const { t, lang } = useLang()

  return (
    <section id="hero" className="relative h-dvh bg-[#09090B] flex flex-col">

      {/* Full-width dot grid — sits below photo, visible on dark left area */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)',
        backgroundSize: '28px 28px', zIndex: 0,
      }} />

      {/* ════════════════════════════════════════
          PHOTO — full width on mobile, right 65% on desktop
      ════════════════════════════════════════ */}
      <div className="absolute right-0 top-0 h-full w-full sm:w-[65%] pointer-events-none" style={{ zIndex: 1 }}>
        <img
          src={photoSrc}
          alt=""
          className="w-full h-full object-cover object-[center_top]"
          style={{ filter: 'grayscale(75%) brightness(0.44) contrast(1.12)' }}
          onError={(e) => { e.target.style.display = 'none' }}
        />
        {/* Mobile: left + bottom dark overlay so text is readable over full-width photo */}
        <div className="absolute inset-0 sm:hidden" style={{
          background: 'linear-gradient(to right, rgba(9,9,11,0.97) 0%, rgba(9,9,11,0.82) 40%, rgba(9,9,11,0.30) 100%)',
        }} />
        <div className="absolute inset-0 sm:hidden" style={{
          background: 'linear-gradient(to top, rgba(9,9,11,1) 0%, rgba(9,9,11,0.55) 28%, transparent 58%)',
        }} />
        {/* Desktop: left-fade gradient */}
        <div className="absolute inset-0 hidden sm:block" style={{
          background: 'linear-gradient(to left, rgba(9,9,11,0.02) 0%, rgba(9,9,11,0.38) 28%, rgba(9,9,11,0.90) 60%, rgba(9,9,11,1) 78%)',
        }} />
        {/* Top/bottom vignette (all sizes) */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(9,9,11,0.85) 0%, transparent 16%, transparent 68%, rgba(9,9,11,1) 100%)',
        }} />
      </div>

      {/* ════════════════════════════════════════
          AMBIENT — orbs + rings + dot grid
      ════════════════════════════════════════ */}
      <div className="absolute pointer-events-none" style={{
        left: '38%', top: '12%', width: 500, height: 500,
        borderRadius: '50%', zIndex: 2, transform: 'translateX(-50%)',
        background: 'radial-gradient(circle, rgba(37,99,235,0.10) 0%, transparent 68%)',
      }} />
      <svg className="absolute pointer-events-none"
        style={{ left: '18%', top: '5%', opacity: 0.12, zIndex: 2 }}
        width="340" height="340" viewBox="0 0 340 340" fill="none">
        <circle cx="170" cy="170" r="155" stroke="rgba(37,99,235,0.55)" strokeWidth="1" />
        <circle cx="170" cy="170" r="115" stroke="rgba(37,99,235,0.35)" strokeWidth="1" />
        <circle cx="170" cy="170" r="75"  stroke="rgba(37,99,235,0.20)" strokeWidth="1" />
      </svg>
      <div className="absolute right-0 top-0 bottom-0 w-[54%] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.028) 1px, transparent 1px)',
        backgroundSize: '32px 32px', zIndex: 2,
      }} />

      {/* ════════════════════════════════════════
          FLOATING CARDS — Process section accent palette
      ════════════════════════════════════════ */}

      {/* 1 ─ DISPONIBLE (emerald — availability is always green) */}
      <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.1, duration: 0.65 }}
        className="absolute hidden lg:block" style={{ right: '36%', top: '20%', zIndex: 20 }}>
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="rounded-2xl px-4 py-3.5"
          style={{
            background: 'rgba(16,185,129,0.10)', border: '1px solid rgba(16,185,129,0.28)',
            boxShadow: '0 8px 32px rgba(16,185,129,0.16)', backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: '#10b981', boxShadow: '0 0 6px rgba(16,185,129,0.9)' }} />
            <span className="text-xs font-extrabold tracking-wide" style={{ color: '#10b981' }}>
              {lang === 'es' ? 'Disponible' : 'Available'}
            </span>
          </div>
          <p className="text-zinc-400 text-[11px] leading-tight">
            {lang === 'es' ? 'Acepto proyectos nuevos' : 'Open to new projects'}
          </p>
        </motion.div>
      </motion.div>

      {/* 2 ─ FULLSTACK (blue #60a5fa) */}
      <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute hidden lg:block" style={{ right: '13%', top: '28%', zIndex: 20 }}>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="rounded-xl px-5 py-3.5" style={glass(C.blue)}
        >
          <p className="font-display font-extrabold text-xl leading-none" style={{ color: C.blue.text }}>
            Fullstack
          </p>
          <p className="text-zinc-500 text-[11px] mt-1.5">Developer</p>
        </motion.div>
      </motion.div>

      {/* 3 ─ ECONOMISTA + DEV (purple #a78bfa) */}
      <motion.div initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.5, duration: 0.65 }}
        className="absolute hidden md:block" style={{ right: '29%', top: '50%', zIndex: 20 }}>
        <motion.div
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="rounded-2xl px-4 py-3.5" style={glass(C.purple)}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest mb-1"
            style={{ color: `${C.purple.text}AA` }}>
            {lang === 'es' ? 'Combinación única' : 'Unique profile'}
          </p>
          <p className="text-white text-sm font-bold">
            {lang === 'es' ? 'Economista + Dev' : 'Economist + Dev'}
          </p>
        </motion.div>
      </motion.div>

      {/* 4 ─ STACK (yellow #fbbf24) */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.7, duration: 0.65 }}
        className="absolute hidden lg:block" style={{ right: '6%', top: '54%', zIndex: 20 }}>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="rounded-2xl px-4 py-3.5" style={glass(C.yellow)}
        >
          <p className="text-[10px] font-extrabold uppercase tracking-widest mb-2"
            style={{ color: `${C.yellow.text}BB` }}>
            Stack
          </p>
          <div className="flex items-center gap-2">
            {['devicon-react-original colored', 'devicon-nodejs-plain colored', 'devicon-python-plain colored'].map((ic, i) => (
              <i key={i} className={ic} style={{ fontSize: '1.1rem' }} />
            ))}
            <span className="text-zinc-500 text-xs ml-0.5">+16</span>
          </div>
        </motion.div>
      </motion.div>

      {/* 5 ─ 4+ AÑOS (orange #fb923c) */}
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.9, duration: 0.65 }}
        className="absolute hidden lg:block" style={{ right: '37%', bottom: '22%', zIndex: 20 }}>
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="rounded-2xl px-5 py-4" style={glass(C.orange)}
        >
          <p className="font-display font-black text-3xl leading-none" style={{ color: C.orange.text }}>
            4+
          </p>
          <p className="text-zinc-500 text-[11px] mt-1.5 tracking-wide">
            {lang === 'es' ? 'Años de experiencia' : 'Years experience'}
          </p>
        </motion.div>
      </motion.div>

      {/* 6 ─ SANTA MARTA (cyan — evoca el Mar Caribe) */}
      <motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3.1, duration: 0.65 }}
        className="absolute hidden lg:block" style={{ right: '7%', bottom: '20%', zIndex: 20 }}>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="rounded-xl px-4 py-3" style={glass(C.cyan)}
        >
          <div className="flex items-center gap-2">
            <span className="text-base">🪗</span>
            <div>
              <p className="text-white text-xs font-bold">De Valledupar</p>
              <p className="text-zinc-500 text-[10px]">para el Mundo</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ════════════════════════════════════════
          MAIN CONTENT
      ════════════════════════════════════════ */}
      <div
        className="relative flex flex-col flex-1 w-full max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24"
        style={{ zIndex: 10 }}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="flex items-center justify-between pt-16 sm:pt-20 lg:pt-24 pb-2"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/35 bg-emerald-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(74,222,128,0.8)]" />
            <span className="text-emerald-400 text-[11px] font-bold uppercase tracking-[0.14em]">
              {t.hero.available}
            </span>
          </div>
          <span className="hidden sm:block text-[11px] text-zinc-600 tracking-widest uppercase">
            De Colombia para el Mundo
          </span>
        </motion.div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="w-full lg:max-w-[54%]">

            <Reveal delay={0.45}>
              <h1 className="font-display font-black tracking-[-0.03em] text-white leading-[0.85]"
                style={{ fontSize: 'clamp(4.5rem, 12vw, 120px)' }}>
                ALIC
              </h1>
            </Reveal>

            <Reveal delay={0.65}>
              <h1 className="font-display font-black tracking-[-0.03em] leading-[0.85] -mt-[0.02em]"
                style={{ fontSize: 'clamp(2.8rem, 8.4vw, 122px)' }}>
                <span className="text-white">BARAN</span>
                <span className="text-gradient">DICA</span>
              </h1>
            </Reveal>

            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="h-px bg-white/10 origin-left mt-4 mb-4" />

            <Reveal delay={1.35}>
              <p className="font-display font-semibold text-white/75 leading-snug"
                style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.25rem)' }}>
                {t.hero.tagline}
              </p>
            </Reveal>
            <Reveal delay={1.48}>
              <p className="font-display font-semibold text-brand-400 leading-snug"
                style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.25rem)' }}>
                {t.hero.tagline2}
              </p>
            </Reveal>

            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.65, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="text-zinc-500 text-sm leading-relaxed mt-3 max-w-[340px]">
              {t.hero.description}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.82, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-3 mt-4">

              {/* Primary CTA */}
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full
                           font-semibold text-sm text-white transition-shadow duration-300
                           hover:shadow-[0_6px_28px_rgba(37,99,235,0.52)]"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  boxShadow: '0 2px 14px rgba(37,99,235,0.32), inset 0 1px 0 rgba(255,255,255,0.15)',
                }}
              >
                {t.hero.cta_primary}
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </motion.a>

              {/* Secondary CTA */}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full
                           font-semibold text-sm text-zinc-400 hover:text-white transition-colors duration-300"
                style={{
                  border: '1px solid rgba(255,255,255,0.13)',
                  background: 'rgba(255,255,255,0.04)',
                }}
              >
                {t.hero.cta_secondary}
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-250" />
              </motion.a>

            </motion.div>

            {/* Stats — data panel */}
            {/* <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0, duration: 0.7 }}
              className="mt-10 pb-16">
              <div className="inline-flex rounded-2xl overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {[
                  { value: '4+',   label: t.hero.stat1_label, color: C.orange },
                  { value: '20+',  label: t.hero.stat2_label, color: C.blue   },
                  { value: '100%', label: t.hero.stat3_label, color: C.purple  },
                ].map((s, i) => (
                  <div key={i}
                    className={`px-6 py-5${i > 0 ? ' border-l border-white/[0.08]' : ''}`}>
                    <p className="font-display font-black leading-none"
                      style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', color: s.color.text }}>
                      {s.value}
                    </p>
                    <p className="text-zinc-500 text-[11px] mt-1.5 leading-snug max-w-[80px]">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div> */}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
        className="absolute bottom-6 left-[50%] -translate-x-1/2" style={{ zIndex: 10 }}>
        <div className="w-5 h-8 rounded-full border-2 border-zinc-700 flex items-start justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2 bg-zinc-600 rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
