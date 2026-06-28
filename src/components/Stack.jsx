import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '../context/LanguageContext'

/* ── Marquee data ─────────────────────────────────────────── */
const ALL_TECHS = [
  { name: 'React',        icon: 'devicon-react-original colored',      level: 'Expert'   },
  { name: 'TypeScript',   icon: 'devicon-typescript-plain colored',     level: 'Advanced' },
  { name: 'Node.js',      icon: 'devicon-nodejs-plain colored',         level: 'Advanced' },
  { name: 'Python',       icon: 'devicon-python-plain colored',         level: 'Advanced' },
  { name: 'PostgreSQL',   icon: 'devicon-postgresql-plain colored',     level: 'Advanced' },
  { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-plain colored',    level: 'Expert'   },
  { name: 'FastAPI',      icon: 'devicon-fastapi-plain colored',        level: 'Advanced' },
  { name: 'MySQL',        icon: 'devicon-mysql-plain colored',          level: 'Advanced' },
  { name: 'Git',          icon: 'devicon-git-plain colored',            level: 'Expert'   },
  { name: 'Figma',        icon: 'devicon-figma-plain colored',          level: 'Mid'      },
  { name: 'JavaScript',   icon: 'devicon-javascript-plain colored',     level: 'Expert'   },
  { name: 'HTML5',        icon: 'devicon-html5-plain colored',          level: 'Expert'   },
  { name: 'CSS3',         icon: 'devicon-css3-plain colored',           level: 'Expert'   },
  { name: 'GitHub',       icon: 'devicon-github-original',              level: 'Expert'   },
  { name: 'Express',      icon: 'devicon-express-original',             level: 'Advanced' },
  { name: 'Vite',         icon: 'devicon-vitejs-plain colored',         level: 'Advanced' },
]

const LEVEL_COLORS = {
  Expert:   { dot: '#4ade80', label: 'Expert'   },
  Advanced: { dot: '#60a5fa', label: 'Advanced' },
  Mid:      { dot: '#a78bfa', label: 'Mid'      },
}

/* ── Category data ─────────────────────────────────────────── */
const CATEGORIES = [
  {
    key: 'frontend',
    icon: 'devicon-react-original colored',
    accent: '#60a5fa',
    accentBg: 'rgba(37,99,235,0.09)',
    border: 'rgba(37,99,235,0.22)',
    techs: [
      { name: 'HTML5',        icon: 'devicon-html5-plain colored'         },
      { name: 'CSS3',         icon: 'devicon-css3-plain colored'          },
      { name: 'JavaScript',   icon: 'devicon-javascript-plain colored'    },
      { name: 'TypeScript',   icon: 'devicon-typescript-plain colored'    },
      { name: 'React',        icon: 'devicon-react-original colored'      },
      { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-plain colored'   },
    ],
  },
  {
    key: 'backend',
    icon: 'devicon-nodejs-plain colored',
    accent: '#4ade80',
    accentBg: 'rgba(74,222,128,0.07)',
    border: 'rgba(74,222,128,0.2)',
    techs: [
      { name: 'Node.js', icon: 'devicon-nodejs-plain colored'  },
      { name: 'Python',  icon: 'devicon-python-plain colored'  },
      { name: 'FastAPI', icon: 'devicon-fastapi-plain colored' },
      { name: 'Express', icon: 'devicon-express-original'      },
    ],
  },
  {
    key: 'database',
    icon: 'devicon-postgresql-plain colored',
    accent: '#a78bfa',
    accentBg: 'rgba(124,58,237,0.08)',
    border: 'rgba(124,58,237,0.22)',
    techs: [
      { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored'  },
      { name: 'MySQL',      icon: 'devicon-mysql-plain colored'       },
      { name: 'TypeORM',    icon: 'devicon-typescript-plain colored'  },
      { name: 'Sequelize',  icon: 'devicon-sequelize-plain colored'   },
    ],
  },
  {
    key: 'tools',
    icon: 'devicon-git-plain colored',
    accent: '#fb923c',
    accentBg: 'rgba(251,146,60,0.07)',
    border: 'rgba(251,146,60,0.2)',
    techs: [
      { name: 'Git',    icon: 'devicon-git-plain colored'    },
      { name: 'GitHub', icon: 'devicon-github-original'      },
      { name: 'VS Code',icon: 'devicon-vscode-plain colored' },
      { name: 'Vite',   icon: 'devicon-vitejs-plain colored' },
      { name: 'Figma',  icon: 'devicon-figma-plain colored'  },
    ],
  },
]

const CATEGORY_LABELS = {
  es: { frontend: 'Frontend', backend: 'Backend', database: 'Bases de datos', tools: 'Herramientas' },
  en: { frontend: 'Frontend', backend: 'Backend', database: 'Databases',       tools: 'Tools'        },
}

/* ── Marquee item ──────────────────────────────────────────── */
const MarqueeItem = ({ tech }) => {
  const cfg = LEVEL_COLORS[tech.level] || LEVEL_COLORS.Mid
  return (
    <div
      className="flex items-center gap-3 pl-4 pr-5 py-3 flex-shrink-0 rounded-xl"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.055), rgba(255,255,255,0.02))',
        border: '1px solid rgba(255,255,255,0.09)',
      }}
    >
      {/* Icon box */}
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      >
        <i className={tech.icon} style={{ fontSize: '1.1rem' }} />
      </div>
      {/* Name */}
      <span className="text-zinc-200 text-sm font-semibold whitespace-nowrap">{tech.name}</span>
      {/* Level dot */}
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: cfg.dot, boxShadow: `0 0 5px ${cfg.dot}` }}
      />
    </div>
  )
}

/* ── Marquee strip ─────────────────────────────────────────── */
const MarqueeStrip = ({ reverse = false }) => {
  const tripled = [...ALL_TECHS, ...ALL_TECHS, ...ALL_TECHS]
  return (
    <div className="overflow-hidden py-2">
      <motion.div
        animate={{ x: reverse ? ['-33.33%', '0%'] : ['0%', '-33.33%'] }}
        transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
        className="flex gap-3 w-max"
        style={{ willChange: 'transform' }}
      >
        {tripled.map((tech, i) => (
          <MarqueeItem key={i} tech={tech} />
        ))}
      </motion.div>
    </div>
  )
}

/* ── Reveal animation ─────────────────────────────────────── */
const revealUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

/* ── Category card ─────────────────────────────────────────── */
const CategoryCard = ({ cat, label, index }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.28 } }}
      className="relative rounded-2xl p-6 flex flex-col gap-5 group cursor-default overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, #111113 0%, #0c0c0f 100%)',
        border: `1px solid ${cat.border}`,
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 30% 0%, ${cat.accentBg} 0%, transparent 70%)` }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ background: `linear-gradient(to right, transparent, ${cat.accent}70, transparent)` }}
      />

      {/* Header */}
      <div className="flex items-center justify-between relative z-10">
        <div>
          <span
            className="text-[10px] font-extrabold uppercase tracking-[0.22em] block mb-1"
            style={{ color: cat.accent, opacity: 0.9 }}
          >
            {label}
          </span>
          <p className="text-zinc-600 text-xs">{cat.techs.length} tecnologías</p>
        </div>
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: cat.accentBg, border: `1px solid ${cat.border}` }}
        >
          <i className={cat.icon} style={{ fontSize: '1.4rem' }} />
        </div>
      </div>

      {/* Divider */}
      <div
        className="h-px relative z-10"
        style={{ background: `linear-gradient(to right, ${cat.border}, transparent)` }}
      />

      {/* Tech chips — compact flex-wrap */}
      <div className="flex flex-wrap gap-2 relative z-10">
        {cat.techs.map((tech, i) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.1 + i * 0.05 + 0.2, duration: 0.35 }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <i className={tech.icon} style={{ fontSize: '0.95rem' }} />
            <span className="text-zinc-300 text-xs font-medium whitespace-nowrap">{tech.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Bottom accent */}
      <div className="relative z-10 mt-auto pt-3 border-t border-zinc-800/50 flex items-center justify-between">
        <span className="text-zinc-700 text-[11px]">
          {index === 0 ? 'UI / UX' : index === 1 ? 'API / Server' : index === 2 ? 'Data / ORM' : 'DevTools'}
        </span>
        <div
          className="w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-150"
          style={{ background: cat.accent, boxShadow: `0 0 8px ${cat.accent}` }}
        />
      </div>
    </motion.div>
  )
}

/* ── Level legend ──────────────────────────────────────────── */
const Legend = ({ lang }) => (
  <div className="flex items-center gap-5">
    {Object.entries(LEVEL_COLORS).map(([key, cfg]) => (
      <div key={key} className="flex items-center gap-1.5">
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: cfg.dot, boxShadow: `0 0 5px ${cfg.dot}` }}
        />
        <span className="text-zinc-600 text-xs">{cfg.label}</span>
      </div>
    ))}
  </div>
)

/* ── Main Section ─────────────────────────────────────────── */
const Stack = () => {
  const { t, lang } = useLang()
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: true, margin: '-80px' })
  const labels = CATEGORY_LABELS[lang]

  return (
    <section id="stack" className="bg-zinc-950 py-24 lg:py-36 overflow-hidden relative">
      {/* Noise texture */}
      <div className="noise-texture absolute inset-0 pointer-events-none select-none" style={{ zIndex: 0 }} />
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 relative" style={{ zIndex: 1 }}>

        {/* ── Header ── */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <motion.span
              variants={revealUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}
              className="section-label" style={{ color: '#60a5fa' }}
            >
              {t.stack.label}
            </motion.span>
            <motion.h2
              variants={revealUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}
              className="font-display font-extrabold text-white leading-tight mt-1"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)' }}
            >
              {t.stack.title}
            </motion.h2>
          </div>
          <div className="flex flex-col gap-4 lg:items-end">
            <motion.p
              variants={revealUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={2}
              className="text-zinc-400 text-base lg:text-[17px] max-w-sm leading-relaxed lg:text-right"
            >
              {t.stack.subtitle}
            </motion.p>
            <motion.div
              variants={revealUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={3}
            >
              <Legend lang={lang} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Marquee band ── */}
      <div
        className="relative mb-16 border-y"
        style={{ borderColor: 'rgba(255,255,255,0.055)', background: 'rgba(255,255,255,0.015)' }}
      >
        {/* Edge fade masks */}
        <div
          className="absolute inset-y-0 left-0 w-28 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to right, #09090f, transparent)' }}
        />
        <div
          className="absolute inset-y-0 right-0 w-28 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to left, #09090f, transparent)' }}
        />

        {/* Label tag left side */}
        <div
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden lg:flex items-center gap-2"
        >
          <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-zinc-600">
            Tech Stack
          </span>
        </div>

        <div className="py-1 flex flex-col gap-3">
          <MarqueeStrip reverse={false} />
          <MarqueeStrip reverse={true} />
        </div>
      </div>

      {/* ── Bento category cards ── */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard
              key={cat.key}
              cat={cat}
              label={labels[cat.key]}
              index={i}
            />
          ))}
        </div>

        {/* ── Stats strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-wrap justify-center gap-8 lg:gap-16 border border-zinc-800/60 rounded-2xl px-8 py-7"
          style={{ background: 'rgba(255,255,255,0.015)' }}
        >
          {[
            { num: '19+', label: lang === 'es' ? 'Tecnologías' : 'Technologies' },
            { num: '4',   label: lang === 'es' ? 'Capas del stack' : 'Stack layers' },
            { num: '4+',  label: lang === 'es' ? 'Años de práctica' : 'Years of practice' },
            { num: '100%',label: lang === 'es' ? 'Proyectos responsive' : 'Responsive builds' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className="font-display font-black text-white text-3xl leading-none">{s.num}</p>
              <p className="text-zinc-500 text-xs mt-2">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Stack
