import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '../context/LanguageContext'

const revealUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

const About = () => {
  const { t, lang } = useLang()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="bg-zinc-50 overflow-hidden py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-start">

          {/* ── LEFT: Story ── */}
          <div>
            <motion.span
              variants={revealUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={0}
              className="section-label"
              style={{ color: '#2563eb' }}
            >
              {t.about.label}
            </motion.span>

            <motion.h2
              variants={revealUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={1}
              className="font-display font-extrabold text-[clamp(2rem,4vw,3rem)] text-zinc-900 leading-tight mt-2"
            >
              {t.about.title}
              <br />
              <span className="text-gradient">{t.about.title2}</span>
            </motion.h2>

            {/* Quote */}
            <motion.figure
              variants={revealUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={2}
              className="mt-8 mb-1"
            >
              <div className="relative pl-5" style={{ borderLeft: '2px solid rgba(37,99,235,0.28)' }}>
                {/* Decorative large " */}
                <span
                  className="absolute font-display font-black leading-none select-none pointer-events-none"
                  style={{
                    top: '-1.6rem', left: '0.6rem',
                    fontSize: '5rem', lineHeight: 1,
                    color: 'rgba(37,99,235,0.08)',
                  }}
                >
                  &ldquo;
                </span>
                <p className="relative z-10 font-display font-semibold italic text-zinc-600 leading-relaxed"
                  style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)' }}>
                  {t.about.quote}
                </p>
                <figcaption className="mt-3.5 flex items-center gap-2.5">
                  <div className="w-5 h-px" style={{ background: 'rgba(37,99,235,0.35)' }} />
                  <span className="text-zinc-400 text-[11px] font-semibold tracking-[0.18em] uppercase">
                    {t.about.quote_author}
                  </span>
                </figcaption>
              </div>
            </motion.figure>

            <div className="mt-8 flex flex-col gap-5">
              {[t.about.p1, t.about.p2, t.about.p3].map((para, i) => (
                <motion.p
                  key={i}
                  variants={revealUp}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  custom={3 + i}
                  className="text-zinc-600 text-base lg:text-[17px] leading-relaxed"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Tech pills */}
            <motion.div
              variants={revealUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={7}
              className="flex flex-wrap gap-2 mt-8"
            >
              {['React', 'Node.js', 'TypeScript', 'Python', 'PostgreSQL', 'FastAPI'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-zinc-100 text-zinc-700 text-xs font-semibold rounded-full
                             tracking-wide border border-zinc-200
                             hover:bg-brand-600 hover:text-white hover:border-brand-600
                             transition-all duration-200 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Timeline ── */}
          <div>
            <motion.h3
              variants={revealUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={1}
              className="font-display font-bold text-xl text-zinc-900 mb-8"
            >
              {t.about.exp_title}
            </motion.h3>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-brand-500 via-brand-500/40 to-transparent" />

              <div className="flex flex-col gap-0">
                {t.about.experiences.map((exp, i) => (
                  <motion.div
                    key={i}
                    variants={revealUp}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    custom={2 + i}
                    className="relative pl-12 pb-8 last:pb-0 group"
                  >
                    {/* Dot */}
                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-white border-2 border-brand-500
                                    flex items-center justify-center z-10 shadow-sm
                                    group-hover:bg-brand-600 group-hover:border-brand-600 transition-all duration-300">
                      <span className="w-2 h-2 rounded-full bg-brand-500 group-hover:bg-white transition-colors duration-300" />
                    </div>

                    {/* Card */}
                    <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm
                                    hover:border-brand-500/30 hover:shadow-md transition-all duration-300">
                      <span className="text-brand-500 text-xs font-bold tracking-wider uppercase">
                        {exp.year}
                      </span>
                      <h4 className="font-display font-bold text-zinc-900 text-base mt-1 leading-snug">
                        {exp.role}
                      </h4>
                      <p className="text-brand-500 text-sm font-semibold mt-0.5">{exp.org}</p>
                      <p className="text-zinc-500 text-sm leading-relaxed mt-2">{exp.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
