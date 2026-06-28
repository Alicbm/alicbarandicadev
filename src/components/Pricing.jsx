import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '../context/LanguageContext'

/* ── Check icon ─────────────────────────────────────────────── */
const Check = ({ color }) => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    className="group-hover:translate-x-1 transition-transform duration-200">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
)

/* ── Pricing Card ────────────────────────────────────────────── */
const PricingCard = ({ plan, index }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const featured = plan.featured
  const accent = featured ? '#60a5fa' : '#a78bfa'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-3xl flex flex-col overflow-hidden"
      style={{
        background: featured
          ? 'linear-gradient(155deg, #0d1520 0%, #090d14 100%)'
          : 'linear-gradient(155deg, #111113 0%, #0c0c0f 100%)',
        border: `1px solid ${featured ? 'rgba(96,165,250,0.32)' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: featured
          ? '0 32px 80px rgba(37,99,235,0.18), 0 0 0 1px rgba(96,165,250,0.08)'
          : '0 8px 32px rgba(0,0,0,0.4)',
      }}
    >
      {/* Top ambient glow */}
      <div className="absolute top-0 left-0 right-0 h-56 pointer-events-none" style={{
        background: `radial-gradient(ellipse at 50% 0%, ${featured ? 'rgba(37,99,235,0.18)' : 'rgba(124,58,237,0.10)'} 0%, transparent 70%)`,
      }} />

      {/* Animated top border */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: `linear-gradient(to right, transparent 0%, ${accent}70 50%, transparent 100%)`,
      }} />

      <div className="relative z-10 p-8 lg:p-10 flex flex-col h-full">

        {/* Badge + optional "featured" star */}
        <div className="flex items-center justify-between mb-7">
          <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full"
            style={{
              color: accent,
              background: `${accent}14`,
              border: `1px solid ${accent}30`,
            }}>
            {featured && (
              <span className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: accent, boxShadow: `0 0 6px ${accent}` }} />
            )}
            {plan.badge}
          </span>
          {featured && (
            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
              ★ Recomendado
            </span>
          )}
        </div>

        {/* Name + description */}
        <h3 className="font-display font-black text-white leading-tight mb-3"
          style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.1rem)' }}>
          {plan.name}
        </h3>
        <p className="text-zinc-500 text-sm leading-relaxed mb-8">{plan.desc}</p>

        {/* Price */}
        <div className="mb-8">
          <div className="flex items-end gap-2.5 flex-wrap">
            <span className="font-display font-black leading-none"
              style={{
                fontSize: 'clamp(2.6rem, 4.5vw, 3.8rem)',
                color: featured ? accent : '#ffffff',
              }}>
              {plan.price}
            </span>
            {plan.currency && (
              <span className="font-bold text-zinc-400 text-base mb-1.5">{plan.currency}</span>
            )}
          </div>
          <p className="text-zinc-600 text-xs mt-1.5 tracking-widest uppercase">{plan.period}</p>
        </div>

        {/* Divider */}
        <div className="h-px mb-7" style={{ background: `linear-gradient(to right, ${accent}22, transparent)` }} />

        {/* Features list */}
        <ul className="flex flex-col gap-3.5 flex-1 mb-7">
          {plan.included.map((feat, i) => (
            <li key={i} className="flex items-center gap-3 text-zinc-300 text-sm">
              <span className="flex-shrink-0 w-[22px] h-[22px] rounded-full flex items-center justify-center"
                style={{ background: `${accent}18`, border: `1px solid ${accent}28` }}>
                <Check color={accent} />
              </span>
              {feat}
            </li>
          ))}
        </ul>

        {/* Info note */}
        {plan.note && (
          <div className="mb-7 flex items-start gap-2.5 p-4 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#52525b" strokeWidth="2"
              className="flex-shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <circle cx="12" cy="16" r="0.5" fill="#52525b" />
            </svg>
            <p className="text-zinc-600 text-xs leading-relaxed">{plan.note}</p>
          </div>
        )}

        {/* CTA */}
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="group inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl font-bold text-sm transition-all duration-300"
          style={featured ? {
            background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
            color: '#ffffff',
            boxShadow: '0 8px 28px rgba(37,99,235,0.40)',
          } : {
            background: 'rgba(124,58,237,0.12)',
            color: '#a78bfa',
            border: '1px solid rgba(124,58,237,0.28)',
          }}
        >
          {plan.cta}
          <Arrow />
        </motion.a>
      </div>
    </motion.div>
  )
}

/* ── Payment step ────────────────────────────────────────────── */
const PaymentStep = ({ step, index, total }) => (
  <div className="flex flex-col items-center relative flex-1">
    {index < total - 1 && (
      <div className="absolute top-[27px] left-1/2 right-0 h-px hidden sm:block"
        style={{ background: 'rgba(255,255,255,0.07)' }} />
    )}
    <div className="w-14 h-14 rounded-2xl flex items-center justify-center z-10 mb-4 flex-shrink-0"
      style={step.highlight ? {
        background: 'rgba(37,99,235,0.16)',
        border: '1px solid rgba(96,165,250,0.38)',
        boxShadow: '0 4px 20px rgba(37,99,235,0.22)',
      } : {
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
      {step.highlight
        ? <span className="font-display font-black text-sm" style={{ color: '#60a5fa' }}>{step.icon}</span>
        : <span className="text-xl leading-none">{step.icon}</span>
      }
    </div>
    <p className="font-bold text-white text-xs text-center mb-1">{step.title}</p>
    <p className="text-zinc-600 text-[10px] text-center max-w-[80px] leading-snug">{step.desc}</p>
  </div>
)

/* ── Main Section ────────────────────────────────────────────── */
const Pricing = () => {
  const { t } = useLang()
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: true, margin: '-80px' })
  const p = t.pricing

  const revealUp = {
    hidden: { opacity: 0, y: 32 },
    visible: (i = 0) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
    }),
  }

  return (
    <section id="pricing" className="bg-zinc-950 pt-10 pb-32 overflow-hidden relative">
      {/* Dot texture */}
      <div className="noise-texture absolute inset-0 pointer-events-none select-none" style={{ zIndex: 0 }} />

      {/* Ambient glows */}
      <div className="absolute left-1/4 top-0 w-[500px] h-[400px] pointer-events-none" style={{
        background: 'radial-gradient(ellipse, rgba(37,99,235,0.07) 0%, transparent 70%)', zIndex: 0,
      }} />
      <div className="absolute right-1/4 bottom-0 w-[400px] h-[300px] pointer-events-none" style={{
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 70%)', zIndex: 0,
      }} />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24" style={{ zIndex: 10 }}>

        {/* ── Header ── */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.span
            variants={revealUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}
            className="section-label justify-center" style={{ color: '#60a5fa' }}>
            {p.label}
          </motion.span>
          <motion.h2
            variants={revealUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}
            className="font-display font-black text-white leading-[0.9] mt-2"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}>
            {p.title}<br />
            <span className="text-gradient">{p.title2}</span>
          </motion.h2>
          <motion.p
            variants={revealUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={2}
            className="text-zinc-500 text-base lg:text-lg mt-5 max-w-xl mx-auto leading-relaxed">
            {p.subtitle}
          </motion.p>
        </div>

        {/* ── Pricing Cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {p.plans.map((plan, i) => (
            <PricingCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>

        {/* ── Payment Process ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}>

          {/* Header */}
          <div className="px-8 lg:px-12 pt-10 pb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] mb-2" style={{ color: '#60a5fa' }}>
                {p.payment_label}
              </p>
              <h3 className="font-display font-black text-white text-2xl lg:text-3xl">
                {p.payment_title}
              </h3>
            </div>
            <p className="text-zinc-500 text-sm max-w-xs leading-relaxed sm:text-right">
              {p.payment_subtitle}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px mx-8 lg:mx-12" style={{ background: 'rgba(255,255,255,0.06)' }} />

          {/* Steps — vertical timeline on mobile, horizontal on sm+ */}
          <div className="px-6 lg:px-10 py-8">

            {/* Mobile: vertical timeline */}
            <div className="flex flex-col sm:hidden">
              {p.payment_steps.map((step, i) => (
                <div key={i} className="flex items-start gap-4 relative">
                  {i < p.payment_steps.length - 1 && (
                    <div className="absolute left-5 top-10 bottom-0 w-px"
                      style={{ background: 'rgba(255,255,255,0.06)' }} />
                  )}
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 z-10"
                    style={step.highlight ? {
                      background: 'rgba(37,99,235,0.18)',
                      border: '1px solid rgba(96,165,250,0.40)',
                      boxShadow: '0 0 14px rgba(37,99,235,0.20)',
                    } : {
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}>
                    {step.highlight
                      ? <span className="font-display font-black text-[11px]" style={{ color: '#60a5fa' }}>{step.icon}</span>
                      : <span className="text-base leading-none">{step.icon}</span>
                    }
                  </div>
                  <div className="pb-6 pt-1.5">
                    <p className="font-bold text-white text-sm leading-none mb-1">{step.title}</p>
                    <p className="text-zinc-600 text-xs leading-snug">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: horizontal */}
            <div className="hidden sm:flex items-start gap-2">
              {p.payment_steps.map((step, i) => (
                <PaymentStep key={i} step={step} index={i} total={p.payment_steps.length} />
              ))}
            </div>

          </div>
        </motion.div>

        {/* ── Affiliate Program ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(16,185,129,0.05) 0%, rgba(5,150,105,0.03) 100%)',
            border: '1px solid rgba(16,185,129,0.18)',
          }}>

          {/* Animated top border */}
          <div className="h-px" style={{
            background: 'linear-gradient(to right, transparent 0%, rgba(16,185,129,0.6) 40%, rgba(96,165,250,0.5) 70%, transparent 100%)',
          }} />

          <div className="px-8 lg:px-12 py-10 flex flex-col lg:flex-row lg:items-start gap-10">

            {/* Left: text + CTA */}
            <div className="flex-1">
              <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full mb-6"
                style={{
                  color: '#10b981',
                  background: 'rgba(16,185,129,0.12)',
                  border: '1px solid rgba(16,185,129,0.28)',
                }}>
                💰 {p.affiliate_badge}
              </span>

              <h3 className="font-display font-black text-white leading-tight mb-3"
                style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)' }}>
                {p.affiliate_title}
              </h3>
              <p className="text-zinc-400 text-base leading-relaxed mb-4 max-w-md">
                {p.affiliate_subtitle}
              </p>
              <p className="text-zinc-600 text-sm italic mb-8 flex items-center gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                {p.affiliate_note}
              </p>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300"
                style={{
                  background: 'rgba(16,185,129,0.15)',
                  color: '#10b981',
                  border: '1px solid rgba(16,185,129,0.30)',
                  boxShadow: '0 4px 20px rgba(16,185,129,0.12)',
                }}>
                {p.affiliate_cta}
                <Arrow />
              </motion.a>
            </div>

            {/* Right: commission tier cards */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 lg:w-80">
              {p.affiliate_tiers.map((tier, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
                  viewport={{ once: true }}
                  className="flex-1 lg:flex-none rounded-2xl p-6"
                  style={{
                    background: `${tier.color}0E`,
                    border: `1px solid ${tier.color}25`,
                  }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{tier.icon}</span>
                    <span className="text-zinc-400 text-xs font-semibold">{tier.type}</span>
                  </div>
                  <div className="flex items-end gap-1.5 mb-2">
                    <span className="font-display font-black text-2xl leading-none"
                      style={{ color: tier.color }}>
                      {tier.commission}
                    </span>
                    {tier.currency && (
                      <span className="text-zinc-500 text-sm font-bold mb-0.5">{tier.currency}</span>
                    )}
                  </div>
                  <p className="text-zinc-600 text-xs leading-snug">{tier.note}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Pricing
