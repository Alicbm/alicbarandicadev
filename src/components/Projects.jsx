import { useRef, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, MoveRight, Sparkles, ExternalLink, Zap } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

const TECH_TAGS = ['React', 'Framer Motion', 'Tailwind CSS']

// ao(): ajusta la opacidad de un string rgba existente
const ao = (rgba, op) => rgba.replace(/[\d.]+\)$/, `${op})`)

const REAL_PROJECTS = [
  {
    id: 'restaurante',
    featured: true,
    reversed: false,
    es: {
      name: 'Marea Restaurante',
      industry: 'Restaurantes & Gastronomía',
      desc: 'Experiencia digital de alta gama para restaurante de mariscos en Santa Marta. Diseño gourmet dark, menú PDF visual y galería inmersiva con lightbox.',
      features: ['Menú PDF interactivo', 'Galería con lightbox', 'Reservas por WhatsApp', 'Diseño dark gourmet'],
    },
    en: {
      name: 'Marea Restaurant',
      industry: 'Restaurants & Food',
      desc: 'High-end digital experience for a seafood restaurant in Santa Marta. Dark gourmet design, visual PDF menu and immersive lightbox gallery.',
      features: ['Interactive PDF menu', 'Lightbox gallery', 'WhatsApp reservations', 'Dark gourmet design'],
    },
    accent: '#D4A943',
    glow: 'rgba(212,169,67,0.22)',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80&fit=crop',
    previewUrl: 'marea.co',
    num: '01',
  },
  {
    id: 'gym',
    featured: false,
    es: {
      name: 'Titan Gym',
      industry: 'Fitness & Gimnasios',
      desc: 'Página de alto impacto para gimnasio urbano con diseño gráfico agresivo. Planes de membresía, horarios de clases y captación de nuevos socios.',
      features: ['Planes de membresía', 'Horarios de clases', 'Perfil de entrenadores'],
    },
    en: {
      name: 'Titan Gym',
      industry: 'Fitness & Gyms',
      desc: 'High-impact page for urban gym with aggressive graphic design. Membership plans, class schedules and new member acquisition.',
      features: ['Membership plans', 'Class schedules', 'Trainer profiles'],
    },
    accent: '#F97316',
    glow: 'rgba(249,115,22,0.18)',
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80&fit=crop',
    previewUrl: 'titangym.co',
    num: '02',
  },
  {
    id: 'dentista',
    featured: false,
    es: {
      name: 'Dr. Andrés Vega',
      industry: 'Salud & Odontología',
      desc: 'Clínica odontológica con presencia digital profesional. Galería antes/después, testimonios verificados y citas directas por WhatsApp.',
      features: ['Casos antes/después', 'Citas por WhatsApp', 'Testimonios verificados'],
    },
    en: {
      name: 'Dr. Andrés Vega',
      industry: 'Health & Dentistry',
      desc: 'Dental clinic with professional digital presence. Before/after gallery, verified testimonials and direct WhatsApp appointments.',
      features: ['Before/after cases', 'WhatsApp booking', 'Verified testimonials'],
    },
    accent: '#22D3EE',
    glow: 'rgba(34,211,238,0.15)',
    img: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80&fit=crop',
    previewUrl: 'drvega.co',
    num: '03',
  },
  {
    id: 'turismo',
    featured: false,
    es: {
      name: 'Kolumbia Tours',
      industry: 'Turismo & Hospitalidad',
      desc: 'Agencia de turismo local con catálogo de tours, galería de destinos colombianos y reservas integradas por WhatsApp.',
      features: ['Catálogo de tours', 'Galería de destinos', 'Reservas integradas'],
    },
    en: {
      name: 'Kolumbia Tours',
      industry: 'Tourism & Hospitality',
      desc: 'Local tourism agency with tour catalog, Colombian destinations gallery and integrated WhatsApp bookings.',
      features: ['Tour catalog', 'Destinations gallery', 'Integrated bookings'],
    },
    accent: '#4ADE80',
    glow: 'rgba(74,222,128,0.12)',
    img: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=800&q=80&fit=crop',
    previewUrl: 'kolumbiatours.co',
    num: '04',
  },
  {
    id: 'fotografo',
    featured: false,
    es: {
      name: 'Andrés Mora Fotografía',
      industry: 'Fotografía & Arte',
      desc: 'Portafolio editorial oscuro con colecciones de series fotográficas, lightbox de alta resolución y modo galería cinematográfico.',
      features: ['Colecciones con lightbox', 'Modo galería', 'Cotización de servicios'],
    },
    en: {
      name: 'Andrés Mora Photography',
      industry: 'Photography & Art',
      desc: 'Dark editorial portfolio with photo series collections, high-resolution lightbox and cinematic gallery mode.',
      features: ['Lightbox collections', 'Gallery mode', 'Service quoting'],
    },
    accent: '#C9A96E',
    glow: 'rgba(201,169,110,0.14)',
    img: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80&fit=crop',
    previewUrl: 'andresmora.photo',
    num: '05',
  },
  {
    id: 'maquinaria',
    featured: true,
    reversed: true,
    es: {
      name: 'MaquiParts',
      industry: 'Industria & Comercio B2B',
      desc: 'Catálogo B2B para distribuidor de repuestos de maquinaria pesada. Panel de filtros avanzado estilo Mercado Libre, cotización por WhatsApp y catálogo PDF imprimible.',
      features: ['Catálogo filtrable', 'Panel estilo Mercado Libre', 'Cotización WA directa', 'Catálogo PDF imprimible'],
    },
    en: {
      name: 'MaquiParts',
      industry: 'Industry & B2B Commerce',
      desc: 'B2B catalog for heavy machinery parts distributor. Mercado Libre-style advanced filter panel, WhatsApp quoting and printable PDF catalog.',
      features: ['Filterable catalog', 'Mercado Libre-style filters', 'Direct WA quoting', 'Printable PDF catalog'],
    },
    accent: '#FFC300',
    glow: 'rgba(255,195,0,0.16)',
    img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&q=80&fit=crop',
    previewUrl: 'maquiparts.co',
    num: '06',
  },
]

const revealUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

/* ── Browser mockup ──────────────────────────────────────────────── */
const BrowserMockup = ({ img, url, accent, imgRef }) => (
  <div style={{
    borderRadius: 10,
    overflow: 'hidden',
    boxShadow: '0 16px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)',
  }}>
    <div style={{ background: '#161616', padding: '7px 10px', display: 'flex', alignItems: 'center', gap: 5 }}>
      {['#FF5F57', '#FEBC2E', '#28C840'].map((c, i) => (
        <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: c, flexShrink: 0 }} />
      ))}
      <div style={{
        flex: 1, marginLeft: 7, background: '#1e1e1e', borderRadius: 4,
        padding: '3px 8px', display: 'flex', alignItems: 'center', gap: 4,
      }}>
        <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" opacity="0.5">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace' }}>{url}</span>
      </div>
    </div>
    <div style={{ overflow: 'hidden', position: 'relative', aspectRatio: '16/9' }}>
      <img
        ref={imgRef}
        src={img}
        alt=""
        loading="lazy"
        style={{
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'top',
          display: 'block',
          transform: 'scale(1)',
          transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          willChange: 'transform',
        }}
      />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
        pointerEvents: 'none',
      }} />
    </div>
  </div>
)

/* ── Featured card (horizontal: info + browser) ──────────────────
   Paleta: near-black fijo, igual que Pricing/Process.
   Accent color → solo en: línea top, badge, número, tags, CTA.
   Glow hover: opacity transition (compositor GPU, sin repaint).
   ──────────────────────────────────────────────────────────────── */
const FeaturedCard = ({ project, lang }) => {
  const wrapRef = useRef(null)
  const glowRef = useRef(null)
  const imgRef  = useRef(null)
  const btnRef  = useRef(null)
  const inView  = useInView(wrapRef, { once: true, margin: '-60px' })
  const p = project[lang]

  // glow hover: sombra pintada una vez, solo anima opacity
  const glowShadow = `0 40px 100px ${ao(project.glow, 0.28)}, 0 0 0 1px ${ao(project.glow, 0.22)}`

  const onEnter = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = '1'
    if (imgRef.current)  imgRef.current.style.transform = 'scale(1.06)'
    if (btnRef.current) {
      btnRef.current.style.background = project.accent
      btnRef.current.style.color = '#0a0a0a'
    }
  }, [project.accent])

  const onLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = '0'
    if (imgRef.current)  imgRef.current.style.transform = 'scale(1)'
    if (btnRef.current) {
      btnRef.current.style.background = 'transparent'
      btnRef.current.style.color = project.accent
    }
  }, [project.accent])

  return (
    <div ref={wrapRef} onMouseEnter={onEnter} onMouseLeave={onLeave} className="relative">
      {/* Glow exterior — opacity transition = compositor GPU, cero repaint */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{ boxShadow: glowShadow, opacity: 0, transition: 'opacity 0.4s ease' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl"
        style={{
          background: 'linear-gradient(155deg, #0d1117 0%, #080c10 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
        }}
      >
        {/* Línea top 1px — firma visual del portafolio */}
        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{
          background: `linear-gradient(to right, transparent, ${project.accent}55 45%, ${project.accent}55 55%, transparent)`,
        }} />

        {/* Glow radial sutil (no NOISE_SVG) */}
        <div className="absolute top-0 left-0 right-0 h-64 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 40% 0%, ${ao(project.glow, 0.1)} 0%, transparent 65%)` }} />

        <div className="relative grid lg:grid-cols-2">
          {/* Info */}
          <div className={`p-10 lg:p-14 flex flex-col justify-center ${project.reversed ? 'lg:order-2' : ''}`}>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="font-display font-black text-[10px] tracking-[0.28em] uppercase"
                style={{ color: project.accent, opacity: 0.6 }}>
                {project.num} / 06
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] px-3 py-1 rounded-full"
                style={{
                  color: project.accent,
                  background: ao(project.glow, 0.12),
                  border: `1px solid ${ao(project.glow, 0.35)}`,
                }}>
                {p.industry}
              </span>
            </div>

            <h3 className="font-display font-extrabold text-white leading-tight mb-4"
              style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.6rem)' }}>
              {p.name}
            </h3>

            <p className="text-zinc-500 text-sm leading-relaxed mb-7 max-w-md">{p.desc}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {p.features.map((f, i) => (
                <span key={i} className="text-[11px] px-3 py-1.5 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    color: 'rgba(255,255,255,0.5)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}>
                  {f}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 mb-9">
              {TECH_TAGS.map((tag, i) => (
                <span key={i} className="text-[10px] font-mono px-2.5 py-1 rounded"
                  style={{
                    background: ao(project.glow, 0.1),
                    color: project.accent,
                    border: `1px solid ${ao(project.glow, 0.28)}`,
                  }}>
                  {tag}
                </span>
              ))}
            </div>

            <a
              ref={btnRef}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold"
              style={{
                background: 'transparent',
                color: project.accent,
                border: `1.5px solid ${ao(project.glow, 0.45)}`,
                transition: 'background 0.3s ease, color 0.3s ease',
              }}
            >
              <ExternalLink size={14} />
              {lang === 'es' ? 'Ver proyecto' : 'View project'}
            </a>
          </div>

          {/* Browser mockup */}
          <div className={`p-8 lg:p-12 flex items-center ${project.reversed ? 'lg:order-1' : ''}`}>
            <div className="w-full">
              <BrowserMockup img={project.img} url={project.previewUrl} accent={project.accent} imgRef={imgRef} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/* ── Regular project card (vertical: browser top, info bottom) ───
   Mismo lenguaje visual que FeaturedCard pero compacto.
   ──────────────────────────────────────────────────────────────── */
const ProjectCard = ({ project, lang, index }) => {
  const wrapRef = useRef(null)
  const glowRef = useRef(null)
  const imgRef  = useRef(null)
  const inView  = useInView(wrapRef, { once: true, margin: '-60px' })
  const p = project[lang]

  const glowShadow = `0 28px 64px ${ao(project.glow, 0.22)}, 0 0 0 1px ${ao(project.glow, 0.18)}`

  const onEnter = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = '1'
    if (imgRef.current)  imgRef.current.style.transform = 'scale(1.06)'
  }, [])

  const onLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = '0'
    if (imgRef.current)  imgRef.current.style.transform = 'scale(1)'
  }, [])

  return (
    <div ref={wrapRef} onMouseEnter={onEnter} onMouseLeave={onLeave} className="relative">
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{ boxShadow: glowShadow, opacity: 0, transition: 'opacity 0.35s ease' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl flex flex-col h-full"
        style={{
          background: 'linear-gradient(155deg, #111113 0%, #0c0c0f 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
        }}
      >
        {/* Línea top 1px en accent */}
        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{
          background: `linear-gradient(to right, transparent, ${project.accent}50 50%, transparent)`,
        }} />

        {/* Glow radial sutil */}
        <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${ao(project.glow, 0.09)} 0%, transparent 70%)` }} />

        {/* Browser mockup */}
        <div className="relative p-5 pb-0">
          <BrowserMockup img={project.img} url={project.previewUrl} accent={project.accent} imgRef={imgRef} />
        </div>

        {/* Info */}
        <div className="relative p-6 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <span className="font-display font-black text-[10px] tracking-[0.24em] uppercase"
              style={{ color: project.accent, opacity: 0.55 }}>
              {project.num} / 06
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full"
              style={{
                color: project.accent,
                background: ao(project.glow, 0.1),
                border: `1px solid ${ao(project.glow, 0.28)}`,
              }}>
              {p.industry}
            </span>
          </div>

          <h3 className="font-display font-extrabold text-white leading-tight mb-3"
            style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.3rem)' }}>
            {p.name}
          </h3>

          <p className="text-zinc-500 text-xs leading-relaxed mb-4 flex-1">{p.desc}</p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {p.features.map((f, i) => (
              <span key={i} className="text-[10px] px-2.5 py-1 rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  color: 'rgba(255,255,255,0.4)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}>
                {f}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="flex gap-1.5 flex-wrap">
              {TECH_TAGS.map((tag, i) => (
                <span key={i} className="text-[9px] font-mono px-2 py-0.5 rounded"
                  style={{
                    background: ao(project.glow, 0.09),
                    color: project.accent,
                    border: `1px solid ${ao(project.glow, 0.22)}`,
                  }}>
                  {tag}
                </span>
              ))}
            </div>
            <a href="#" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold shrink-0 ml-3"
              style={{ color: project.accent }}>
              {lang === 'es' ? 'Ver' : 'View'}
              <ArrowRight size={11} />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/* ── "Nos encontraste por una razón" CTA card ───────────────────── */
const ReasonCard = ({ lang }) => {
  const glowRef = useRef(null)
  const btnRef  = useRef(null)

  const onEnter = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = '1'
    if (btnRef.current) {
      btnRef.current.style.background = '#60a5fa'
      btnRef.current.style.color = '#0a0a0a'
    }
  }, [])

  const onLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = '0'
    if (btnRef.current) {
      btnRef.current.style.background = 'transparent'
      btnRef.current.style.color = '#60a5fa'
    }
  }, [])

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="flex-none relative rounded-3xl overflow-hidden"
      style={{
        width: 'clamp(360px, 50vw, 600px)',
        height: 'clamp(380px, 50vh, 520px)',
        background: 'linear-gradient(155deg, #0d1117 0%, #080c10 100%)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
      }}
    >
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          boxShadow: '0 32px 80px rgba(96,165,250,0.14), 0 0 0 1px rgba(96,165,250,0.18)',
          opacity: 0,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Línea top brand blue */}
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(96,165,250,0.55) 50%, transparent)' }} />

      {/* Grid de puntos */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, rgba(96,165,250,0.06) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      {/* Glow radial */}
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%)' }} />

      <div className="relative h-full flex flex-col justify-between p-10 lg:p-12">
        <div className="flex items-center gap-2.5">
          <div className="relative flex">
            <span className="w-2 h-2 rounded-full bg-brand-400" />
            <span className="absolute inset-0 w-2 h-2 rounded-full bg-brand-400 animate-ping opacity-60" />
          </div>
          <span className="text-brand-400 text-[10px] font-bold uppercase tracking-[0.22em]">
            {lang === 'es' ? 'Disponible para nuevos proyectos' : 'Available for new projects'}
          </span>
        </div>

        <div>
          <h3 className="font-display font-extrabold text-white leading-[0.92] mb-5"
            style={{ fontSize: 'clamp(2rem, 3.8vw, 3.2rem)' }}>
            {lang === 'es'
              ? <>Nos encontraste<br />por una razón.</>
              : <>You found us<br />for a reason.</>}
          </h3>
          <p className="text-zinc-500 text-sm leading-relaxed" style={{ maxWidth: 360 }}>
            {lang === 'es'
              ? 'Si tu negocio o industria no aparece arriba, eso no cambia nada. Construyo páginas para cualquier sector — desde cero, con código limpio y diseño que convierte visitantes en clientes.'
              : "If your business or industry isn't listed above, that doesn't change a thing. I build pages for any sector — from scratch, with clean code and design that turns visitors into clients."}
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <a
            ref={btnRef}
            href="#contact"
            className="self-start inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-bold"
            style={{
              background: 'transparent',
              color: '#60a5fa',
              border: '1.5px solid rgba(96,165,250,0.38)',
              transition: 'background 0.3s ease, color 0.3s ease',
            }}
          >
            {lang === 'es' ? 'Cuéntame tu idea' : 'Tell me your idea'}
            <ArrowRight size={14} />
          </a>
          <div className="flex items-center gap-2 flex-wrap">
            {TECH_TAGS.map((tag, i) => (
              <span key={i} className="text-[9px] font-mono text-zinc-600 px-2 py-0.5 rounded"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── "Quiero ser el primero" card ───────────────────────────────── */
const FirstClientCard = ({ lang, cta }) => {
  const cardRef = useRef(null)
  const iconRef = useRef(null)

  const onEnter = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.borderColor = 'rgba(96,165,250,0.4)'
      cardRef.current.style.background = 'rgba(96,165,250,0.04)'
    }
    if (iconRef.current) {
      iconRef.current.style.background = 'rgba(96,165,250,0.18)'
      iconRef.current.style.transform = 'scale(1.08)'
    }
  }, [])

  const onLeave = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.borderColor = 'rgba(255,255,255,0.1)'
      cardRef.current.style.background = 'transparent'
    }
    if (iconRef.current) {
      iconRef.current.style.background = 'rgba(96,165,250,0.08)'
      iconRef.current.style.transform = 'scale(1)'
    }
  }, [])

  return (
    <a
      ref={cardRef}
      href="#contact"
      className="flex-none rounded-3xl flex flex-col items-center justify-center gap-6 text-center"
      style={{
        width: 'clamp(240px, 28vw, 320px)',
        height: 'clamp(380px, 50vh, 520px)',
        border: '1.5px dashed rgba(255,255,255,0.1)',
        background: 'transparent',
        transition: 'border-color 0.35s ease, background 0.35s ease',
        cursor: 'pointer',
        textDecoration: 'none',
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        ref={iconRef}
        className="w-14 h-14 rounded-2xl flex items-center justify-center"
        style={{
          background: 'rgba(96,165,250,0.08)',
          border: '1px solid rgba(96,165,250,0.2)',
          transition: 'background 0.35s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <Zap size={22} className="text-brand-400" />
      </div>
      <div className="px-6">
        <p className="font-display font-bold text-white text-base mb-2">{cta}</p>
        <p className="text-zinc-500 text-xs leading-relaxed">
          {lang === 'es'
            ? 'Condiciones especiales para los primeros clientes del portafolio'
            : 'Special conditions for the first portfolio clients'}
        </p>
      </div>
      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-400">
        {lang === 'es' ? 'Hablemos' : "Let's talk"}
        <ArrowRight size={12} />
      </div>
    </a>
  )
}

/* ── Main section ────────────────────────────────────────────────── */
const Projects = () => {
  const { t, lang } = useLang()
  const headerRef = useRef(null)
  const ctaRef    = useRef(null)
  const inView    = useInView(headerRef, { once: true, margin: '-80px' })
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' })
  const constraintsRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  const featuredFirst = REAL_PROJECTS[0]
  const regular       = REAL_PROJECTS.slice(1, -1)
  const featuredLast  = REAL_PROJECTS[REAL_PROJECTS.length - 1]

  return (
    <section id="projects" className="bg-zinc-950 py-20 overflow-hidden relative">
      <div className="noise-texture absolute inset-0 pointer-events-none select-none" style={{ zIndex: 0 }} />

      {/* ── HEADER ── */}
      <div ref={headerRef} className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-xl">
            <motion.span
              variants={revealUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}
              className="section-label" style={{ color: '#60a5fa' }}>
              {t.projects.label}
            </motion.span>
            <motion.h2
              variants={revealUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}
              className="font-display font-extrabold text-white leading-tight mt-2"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              {t.projects.title}
            </motion.h2>
            <motion.p
              variants={revealUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={2}
              className="text-zinc-400 text-base mt-4 leading-relaxed">
              {t.projects.subtitle}
            </motion.p>
          </div>

          <motion.div
            variants={revealUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={3}
            className="flex flex-col gap-4 lg:items-end">
            <div className="inline-flex items-center gap-2 border border-brand-500/30 bg-brand-500/8 rounded-full px-5 py-2.5">
              <Sparkles size={13} className="text-brand-400 flex-shrink-0" />
              <span className="text-zinc-300 text-sm">
                {t.projects.special_text}
                <a href="#contact" className="text-brand-400 font-bold hover:underline">{t.projects.special_link}</a>
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── REAL PROJECTS GRID ── */}
      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-col gap-6">
          <FeaturedCard project={featuredFirst} lang={lang} />

          <div className="grid md:grid-cols-2 gap-6">
            {regular.map((p, i) => (
              <ProjectCard key={p.id} project={p} lang={lang} index={i} />
            ))}
          </div>

          <FeaturedCard project={featuredLast} lang={lang} />
        </div>
      </div>

      {/* ── SEPARADOR + HEADER CTA ── */}
      <div ref={ctaRef} className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 mt-24 mb-12">
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={ctaInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 origin-left"
          style={{ height: 1, background: 'linear-gradient(to right, rgba(96,165,250,0.3), rgba(255,255,255,0.04) 60%, transparent)' }}
        />

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-label" style={{ color: '#60a5fa' }}>
              {lang === 'es' ? '¿Y si no está tu sector?' : 'What if your sector is missing?'}
            </span>
            <h3 className="font-display font-extrabold text-white leading-tight mt-2"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>
              {lang === 'es' ? 'Hay algo aquí para ti.' : "There's something here for you."}
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={ctaInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-2 text-zinc-600 text-xs font-medium tracking-wide shrink-0">
            <MoveRight size={14} />
            {lang === 'es' ? 'Arrastra para explorar' : 'Drag to explore'}
          </motion.div>
        </div>
      </div>

      {/* ── CARRUSEL CTA ── */}
      <div ref={constraintsRef} className="overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={constraintsRef}
          dragElastic={0.08}
          dragMomentum
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          className="flex gap-5 select-none"
          style={{
            paddingLeft: 'max(1.5rem, calc((100vw - 1400px)/2 + 6rem))',
            paddingRight: 'max(1.5rem, calc((100vw - 1400px)/2 + 6rem))',
            cursor: isDragging ? 'grabbing' : 'grab',
            width: 'max-content',
          }}
          whileDrag={{ cursor: 'grabbing' }}
        >
          <ReasonCard lang={lang} />
          <FirstClientCard lang={lang} cta={t.projects.cta} />
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
