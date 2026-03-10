import { useEffect, useRef, useState } from 'react'
import './Skills.css'

/* ── Data ──────────────────────────────────────────────────── */
const SKILLS = [
  {
    name: 'Java',
    icon: '☕',
    level: 'Expert',
    pct: 85,
    color: '#f89820',
    desc: 'Core Java, OOP, Collections, Streams, Multithreading',
  },
  {
    name: 'Spring',
    icon: '🌿',
    level: 'Expert',
    pct: 80,
    color: '#6db33f',
    desc: 'Spring Boot, Spring MVC, Spring Security, REST APIs',
  },
  {
    name: 'Hibernate',
    icon: '🗄️',
    level: 'Advanced',
    pct: 70,
    color: '#bcae79',
    desc: 'ORM mapping, HQL, Criteria API, lazy/eager loading',
  },
  {
    name: 'PostgreSQL',
    icon: '🐘',
    level: 'Advanced',
    pct: 83,
    color: '#336791',
    desc: 'Advanced queries, indexing, stored procedures, pgAdmin',
  },
  {
    name: 'MySQL',
    icon: '🐬',
    level: 'Advanced',
    pct: 82,
    color: '#00758f',
    desc: 'Schema design, joins, stored procs, performance tuning',
  },
  {
    name: 'React',
    icon: '⚛️',
    level: 'Expert',
    pct: 95,
    color: '#61dafb',
    desc: 'Hooks, Context, Redux, React Query, component architecture',
  },
  {
    name: 'Python',
    icon: '🐍',
    level: 'Intermediate',
    pct: 74,
    color: '#ffd43b',
    desc: 'Scripting, automation, Flask, data manipulation with Pandas',
  },
]

const TOOLS = [
  {
    name: 'Postman',
    icon: '📮',
    color: '#ff6c37',
    desc: 'API testing, collections, environment variables, mock servers',
    badge: 'API Testing',
  },
  {
    name: 'Maven',
    icon: '📦',
    color: '#c71a36',
    desc: 'Project builds, dependency management, lifecycle phases',
    badge: 'Build Tool',
  },
  {
    name: 'VS Code',
    icon: '💻',
    color: '#007acc',
    desc: 'Primary editor — extensions, debugging, integrated terminal',
    badge: 'Editor',
  },
  {
    name: 'Eclipse',
    icon: '🌑',
    color: '#2c2255',
    desc: 'Java development, Spring Tool Suite plugin, debugger',
    badge: 'IDE',
  },
]

/* ── Level badge colour map ────────────────────────────────── */
const LEVEL_COLOR = {
  Expert:       { bg: 'rgba(0,229,255,0.1)',  text: '#00e5ff',  border: 'rgba(0,229,255,0.25)'  },
  Advanced:     { bg: 'rgba(122,244,255,0.08)', text: '#7af4ff', border: 'rgba(122,244,255,0.2)' },
  Intermediate: { bg: 'rgba(255,107,53,0.1)', text: '#ff8c5a',  border: 'rgba(255,107,53,0.25)' },
}

/* ── Skill card ─────────────────────────────────────────────── */
function SkillCard({ name, icon, level, pct, color, desc, index, visible }) {
  const lc = LEVEL_COLOR[level] || LEVEL_COLOR.Intermediate
  return (
    <div
      className="sk__card"
      style={{ '--accent': color, '--idx': index }}
      data-visible={visible}
    >
      {/* top row */}
      <div className="sk__card-top">
        <div className="sk__icon" style={{ '--accent': color }}>
          <span>{icon}</span>
        </div>
        <span
          className="sk__level"
          style={{ background: lc.bg, color: lc.text, border: `1px solid ${lc.border}` }}
        >
          {level}
        </span>
      </div>

      <h4 className="sk__name">{name}</h4>
      <p className="sk__desc">{desc}</p>

      {/* progress bar */}
      <div className="sk__bar-wrap">
        <div className="sk__bar-track">
          <div
            className="sk__bar-fill"
            style={{
              '--pct': `${pct}%`,
              '--color': color,
              width: visible ? `${pct}%` : '0%',
            }}
          />
        </div>
        <span className="sk__bar-pct">{pct}%</span>
      </div>
    </div>
  )
}

/* ── Tool card ──────────────────────────────────────────────── */
function ToolCard({ name, icon, color, desc, badge, index, visible }) {
  return (
    <div
      className="sk__tool-card"
      style={{ '--accent': color, '--idx': index }}
      data-visible={visible}
    >
      <div className="sk__tool-icon" style={{ '--accent': color }}>
        <span>{icon}</span>
      </div>
      <div className="sk__tool-body">
        <div className="sk__tool-top">
          <h4 className="sk__tool-name">{name}</h4>
          <span className="sk__tool-badge">{badge}</span>
        </div>
        <p className="sk__tool-desc">{desc}</p>
      </div>
      <div className="sk__tool-glow" aria-hidden="true" />
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   Skills section
   ════════════════════════════════════════════════════════════ */
export default function Skills() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="skills"
      className={`sk${visible ? ' sk--visible' : ''}`}
      ref={ref}
    >
      {/* background grid pattern */}
      <div className="sk__bg-pattern" aria-hidden="true" />

      <div className="sk__inner">

        {/* ── Section header ──── */}
        <div className="sk__header">
          <span className="sk__eyebrow">02 / Skills &amp; Tools</span>
          <h2 className="sk__heading">
            What I work<br />
            <em>with every day</em>
          </h2>
          <div className="sk__heading-bar" />
        </div>

        {/* ════ SKILLS DIVISION ════ */}
        <div className="sk__division">
          <div className="sk__division-label">
            <span className="sk__division-icon">⚡</span>
            <span>Technical Skills</span>
            <div className="sk__division-line" />
            <span className="sk__division-count">{SKILLS.length} technologies</span>
          </div>

          <div className="sk__cards-grid">
            {SKILLS.map((s, i) => (
              <SkillCard key={s.name} {...s} index={i} visible={visible} />
            ))}
          </div>
        </div>

        {/* ════ TOOLS DIVISION ════ */}
        <div className="sk__division">
          <div className="sk__division-label">
            <span className="sk__division-icon">🔧</span>
            <span>Tools &amp; Environment</span>
            <div className="sk__division-line" />
            <span className="sk__division-count">{TOOLS.length} tools</span>
          </div>

          <div className="sk__tools-grid">
            {TOOLS.map((t, i) => (
              <ToolCard key={t.name} {...t} index={i} visible={visible} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
