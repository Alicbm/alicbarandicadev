import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '../context/LanguageContext'

/* ── Step meta data (bilingual, 4 steps) ────────────────────── */
const STEP_META = {
  es: [
    {
      phase: 'Descubrimiento',
      duration: '1 día',
      deliverables: ['Brief del proyecto', 'Objetivos definidos', 'Timeline estimado'],
      tools: ['Google Meet', 'Notion', 'WhatsApp'],
      accent: '#60a5fa',
    },
    {
      phase: 'Planificación',
      duration: '1–2 días',
      deliverables: ['Sitemap completo', 'Propuesta técnica', 'Presupuesto detallado'],
      tools: ['Notion', 'Miro', 'Figma'],
      accent: '#a78bfa',
    },
    {
      phase: 'Diseño & Build',
      duration: '4–10 días',
      deliverables: ['Prototipo visual aprobado', 'Código responsive limpio', 'SEO técnico'],
      tools: ['Figma', 'VS Code', 'React', 'Git'],
      accent: '#fbbf24',
    },
    {
      phase: 'Lanzamiento',
      duration: '1–2 días',
      deliverables: ['Deploy en producción', 'Manual de uso', 'Soporte 30 días'],
      tools: ['Vercel', 'GitHub', 'Google Analytics'],
      accent: '#fb923c',
    },
  ],
  en: [
    {
      phase: 'Discovery',
      duration: '1 day',
      deliverables: ['Project brief', 'Defined goals', 'Estimated timeline'],
      tools: ['Google Meet', 'Notion', 'WhatsApp'],
      accent: '#60a5fa',
    },
    {
      phase: 'Planning',
      duration: '1–2 days',
      deliverables: ['Full sitemap', 'Technical proposal', 'Detailed budget'],
      tools: ['Notion', 'Miro', 'Figma'],
      accent: '#a78bfa',
    },
    {
      phase: 'Design & Build',
      duration: '4–10 days',
      deliverables: ['Approved visual prototype', 'Clean responsive code', 'Technical SEO'],
      tools: ['Figma', 'VS Code', 'React', 'Git'],
      accent: '#fbbf24',
    },
    {
      phase: 'Launch',
      duration: '1–2 days',
      deliverables: ['Production deploy', 'User manual', '30-day support'],
      tools: ['Vercel', 'GitHub', 'Google Analytics'],
      accent: '#fb923c',
    },
  ],
}

const revealUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

/* ── Step Card ─────────────────────────────────────────────── */
const StepCard = ({ step, meta, index }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative group flex flex-col"
    >
      <div
        className="relative rounded-2xl p-6 flex flex-col gap-5 h-full overflow-hidden border
                   transition-all duration-400 group-hover:-translate-y-2"
        style={{
          background: 'linear-gradient(160deg, #111113 0%, #0c0c0f 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* Top border glow on hover */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
          style={{ background: `linear-gradient(to right, transparent, ${meta.accent}80, transparent)` }}
        />
        {/* Accent glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${meta.accent}12 0%, transparent 70%)` }}
        />

        {/* Phase tag + step number */}
        <div className="flex items-start justify-between relative z-10">
          <span
            className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full"
            style={{
              color: meta.accent,
              background: `${meta.accent}14`,
              border: `1px solid ${meta.accent}30`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: meta.accent, boxShadow: `0 0 6px ${meta.accent}` }}
            />
            {meta.phase}
          </span>

          <span
            className="font-display font-black text-5xl leading-none select-none"
            style={{ color: `${meta.accent}18`, WebkitTextStroke: `1px ${meta.accent}28` }}
          >
            {step.num}
          </span>
        </div>

        {/* Title & desc */}
        <div className="relative z-10">
          <h3 className="font-display font-bold text-white text-xl leading-tight mb-3">
            {step.title}
          </h3>
          <p className="text-zinc-500 text-sm leading-relaxed">{step.desc}</p>
        </div>

        {/* Divider */}
        <div className="h-px relative z-10" style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.06), transparent)' }} />

        {/* Deliverables */}
        <div className="relative z-10">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] mb-3" style={{ color: `${meta.accent}CC` }}>
            Entregables
          </p>
          <ul className="flex flex-col gap-2">
            {meta.deliverables.map((d, i) => (
              <li key={i} className="flex items-center gap-2 text-zinc-400 text-xs">
                <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: meta.accent }} />
                {d}
              </li>
            ))}
          </ul>
        </div>

        {/* Duration + Tools */}
        <div className="relative z-10 mt-auto pt-5 border-t border-zinc-800/60 flex flex-col gap-4">
          {/* Duration */}
          <div
            className="self-start flex items-center gap-2 text-xs font-bold rounded-xl px-3.5 py-2"
            style={{ color: meta.accent, background: `${meta.accent}12`, border: `1px solid ${meta.accent}28` }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            {meta.duration}
          </div>
          {/* Tools */}
          <div className="flex flex-wrap gap-2">
            {meta.tools.map((tool) => (
              <span
                key={tool}
                className="text-[10px] font-semibold text-zinc-500 rounded-lg px-2.5 py-1.5"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Main Section ─────────────────────────────────────────── */
const Process = () => {
  const { t, lang } = useLang()
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: true, margin: '-80px' })
  const meta = STEP_META[lang]

  return (
    <section id="process" className="bg-zinc-950 py-24 lg:py-36 overflow-hidden relative">
      {/* Noise texture */}
      <div className="noise-texture absolute inset-0 pointer-events-none select-none" style={{ zIndex: 0 }} />
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          zIndex: 0,
        }}
      />
      {/* Blue glow top center */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.07) 0%, transparent 70%)', zIndex: 0 }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24" style={{ zIndex: 10 }}>

        {/* ── Header ── */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <motion.span
              variants={revealUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}
              className="section-label" style={{ color: '#60a5fa' }}
            >
              {t.process.label}
            </motion.span>
            <motion.h2
              variants={revealUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}
              className="font-display font-extrabold text-white leading-tight mt-1"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)' }}
            >
              {t.process.title}
            </motion.h2>
          </div>
          <div className="flex flex-col gap-3 lg:text-right">
            <motion.p
              variants={revealUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={2}
              className="text-zinc-400 text-base lg:text-[17px] max-w-xs leading-relaxed"
            >
              {t.process.subtitle}
            </motion.p>
            <motion.div
              variants={revealUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={3}
              className="inline-flex items-center gap-2 self-start lg:self-end px-4 py-2.5 rounded-xl
                         border border-zinc-800 bg-zinc-900/60 text-sm font-medium text-zinc-400"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              {lang === 'es' ? 'Páginas web: 7–15 días · Software: según alcance' : 'Web pages: 7–15 days · Software: varies by scope'}
            </motion.div>
          </div>
        </div>

        {/* ── 4-step grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
          {t.process.steps.map((step, i) => (
            <StepCard key={i} step={step} meta={meta[i]} index={i} />
          ))}
        </div>

        {/* ── Bottom CTA bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6
                     border border-zinc-800/60 rounded-2xl px-8 py-7"
          style={{ background: 'rgba(255,255,255,0.015)' }}
        >
          <div>
            <p className="font-display font-bold text-white text-lg">
              {lang === 'es' ? '¿Listo para empezar?' : 'Ready to get started?'}
            </p>
            <p className="text-zinc-500 text-sm mt-1">
              {lang === 'es'
                ? 'La primera consulta es gratis. Sin compromisos.'
                : 'First consultation is free. No strings attached.'}
            </p>
          </div>
          <a
            href="#contact"
            className="flex-shrink-0 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold
                       rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/30 hover:-translate-y-0.5"
          >
            {lang === 'es' ? 'Hablemos' : "Let's talk"}
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Process
