import { useEffect, useRef, useState } from 'react'
import './Work.css'

/* ── Project data ───────────────────────────────────────────── */
const PROJECTS = [
  {
    id: '01',
    title: 'NGO Website',
    category: 'Full Stack',
    tags: ['React', 'Django', 'PostgreSQL', 'Rest API','Razorpay'],
    desc: 'A high-performance NGO website with real-time inventory, payment gateway integration, and an admin analytics dashboard.',
    accent: '#00e5ff',
    featured: true,
    links: { live: 'https://karunaiillam.speedtrust.org', code: '#' },
  },
  {
    id: '02',
    title: 'JOB Portal Saas Product',
    category: 'Backend',
    tags: ['Django', 'REST API', 'MySQL', 'Celery', 'Redis'],
    desc: 'End-to-end job portal system covering job listings, applications, employer management, and candidate profiles.',
    accent: '#6db33f',
    featured: true,
    links: { live: 'https://jobportal.stacklycloud.com/', code: '#' },
  },
  {
    id: '03',
    title: 'Real-Time Chat App',
    category: 'Full Stack',
    tags: ['React', 'Node.js', 'WebSocket', 'Redis'],
    desc: 'Scalable messaging platform with rooms, direct messages, online presence, and file-sharing support.',
    accent: '#ff6b35',
    featured: false,
    links: { live: '#', code: '#' },
  },
  {
    id: '04',
    title: 'Portfolio Analytics Dashboard',
    category: 'Frontend',
    tags: ['React', 'Python', 'Recharts', 'REST API'],
    desc: 'Interactive data dashboard for visualising portfolio metrics, KPIs, and financial trends with drill-down filtering.',
    accent: '#ffd43b',
    featured: false,
    links: { live: '#', code: '#' },
  },
  {
    id: '05',
    title: 'Task & Project Tracker',
    category: 'Full Stack',
    tags: ['React', 'Spring Boot', 'Maven', 'PostgreSQL'],
    desc: 'Kanban-style project manager with drag-and-drop cards, sprint planning, team roles, and deadline notifications.',
    accent: '#bc8af2',
    featured: false,
    links: { live: '#', code: '#' },
  },
  {
    id: '06',
    title: 'REST API Gateway',
    category: 'Backend',
    tags: ['Java', 'Spring', 'Postman', 'Docker'],
    desc: 'Centralised API gateway with rate limiting, JWT authentication, request routing, and auto-generated Swagger docs.',
    accent: '#f89820',
    featured: false,
    links: { live: '#', code: '#' },
  },
]

const FILTERS = ['All', 'Full Stack', 'Frontend', 'Backend']

/* ── Project card ───────────────────────────────────────────── */
function ProjectCard({ id, title, category, tags, desc, accent, featured, links, index, visible }) {
  return (
    <div
      className={`wk__card${featured ? ' wk__card--featured' : ''}`}
      style={{ '--accent': accent, '--idx': index }}
      data-visible={visible}
    >
      {/* mock browser / code preview */}
      <div className="wk__card-preview">
        <div className="wk__preview-bar">
          <span /><span /><span />
        </div>
        <div className="wk__preview-body">
          <div className="wk__preview-code">
            <span style={{ color: '#61dafb' }}>const</span>
            <span style={{ color: '#fff' }}> {title.replace(/\s/g, '')} </span>
            <span style={{ color: accent }}>=</span>
            <span style={{ color: '#e5c07b' }}> {'{'}</span>
            <br />
            &nbsp;&nbsp;<span style={{ color: '#98c379' }}>stack</span>
            <span style={{ color: '#fff' }}>: </span>
            <span style={{ color: '#e5c07b' }}>[{tags.map(t => `"${t}"`).join(', ')}]</span>
            <br />
            <span style={{ color: '#e5c07b' }}>{'}'}</span>
          </div>
          {/* decorative lines */}
          <div className="wk__preview-lines">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="wk__preview-line"
                style={{ width: `${50 + Math.sin(i * 1.3) * 30}%`, opacity: 0.08 + i * 0.02 }} />
            ))}
          </div>
        </div>
        {featured && <div className="wk__featured-badge">Featured</div>}
      </div>

      {/* card body */}
      <div className="wk__card-body">
        <div className="wk__card-top">
          <span className="wk__card-id">{id}</span>
          <span className="wk__card-cat">{category}</span>
        </div>

        <h3 className="wk__card-title">{title}</h3>
        <p className="wk__card-desc">{desc}</p>

        <div className="wk__card-tags">
          {tags.map(t => (
            <span key={t} className="wk__tag">{t}</span>
          ))}
        </div>

        <div className="wk__card-links">
          <a href={links.live} className="wk__link wk__link--live" aria-label="Live demo">
            <svg viewBox="0 0 20 20" fill="none">
              <path d="M10 3a7 7 0 100 14A7 7 0 0010 3z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 3c-1.5 2-2.5 4.4-2.5 7s1 5 2.5 7M10 3c1.5 2 2.5 4.4 2.5 7s-1 5-2.5 7M3 10h14" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            Live Demo
          </a>
          <a href={links.code} className="wk__link wk__link--code" aria-label="Source code">
            <svg viewBox="0 0 20 20" fill="none">
              <path d="M7 6L3 10l4 4M13 6l4 4-4 4M11 4l-2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Source
          </a>
        </div>
      </div>

      <div className="wk__card-glow" aria-hidden="true" />
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   Work section
   ════════════════════════════════════════════════════════════ */
export default function Work() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.08 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const filtered = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter)

  return (
    <section
      id="work"
      className={`wk${visible ? ' wk--visible' : ''}`}
      ref={ref}
    >
      <div className="wk__bg-blob" aria-hidden="true" />

      <div className="wk__inner">

        {/* header */}
        <div className="wk__header">
          <span className="wk__eyebrow">03 / Work</span>
          <h2 className="wk__heading">
            Selected<br />
            <em>projects</em>
          </h2>
          <div className="wk__heading-bar" />
        </div>

        {/* filter pills */}
        <div className="wk__filters" role="group" aria-label="Filter projects">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`wk__filter${activeFilter === f ? ' wk__filter--active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* grid */}
        <div className="wk__grid">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              {...project}
              index={i}
              visible={visible}
            />
          ))}
        </div>

        {/* bottom CTA */}
        <div className="wk__footer">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="wk__more-btn">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            View All on GitHub
          </a>
        </div>

      </div>
    </section>
  )
}
