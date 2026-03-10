import { useEffect, useRef, useState } from 'react'
import './About.css'

/* ── Skills with proficiency ────────────────────────────────── */
const SKILLS = [
  { name: 'React.js',         pct: 95, tag: 'Frontend' },
  { name: 'Java',             pct: 90, tag: 'Backend'  },
  { name: 'Javascript',       pct: 88, tag: 'Language' },
  { name: 'Python',           pct: 82, tag: 'Design'   },
  { name: 'PostgreSQL',       pct: 80, tag: 'Database' },
  { name: "Rest API's",       pct: 75, tag: 'Infra'    },
]

/* ── Tab panels ─────────────────────────────────────────────── */
const TABS = ['Skills', 'Experience', 'Education']

const EXPERIENCE = [
  {
    role: 'Full Stack Developer',
    company: 'Stackly',
    period: '2025-DEC — Present',
    desc: "Building web applications using Python-Django and REST API's . Creating stunning UI using React JS, also making it as Responsive across all devices.",
  },
  {
    role: 'Frontend Developer',
    company: 'Speed Trust - Karunai Illam',
    period: '2025-Apr — 2025-July',
    desc: "Creating simple website using HTML and CSS for developing the Children's trust to collect funds, Learnt creating a Responsive website that work on all devices.",
  },
  {
    role: 'Trainee',
    company: 'Self paced',
    period: '2025-Jan — 2025-Apr',
    desc: 'Developed responsive website that reflects Youtube - clone',
  },
]

const EDUCATION = [
  {
    degree: 'B.E. Computer Science & Engineering',
    school: 'Hindusthan Institute of Technology, Coimbatore',
    period: '2021 — 2025',
    desc: 'Graduated with 7.6 cgpa. Specialised in software engineering, data structures, and web technologies. Final year project on real-time collaborative projects.',
  },
  {
    degree: 'Higher Secondary ',
    school: 'Bharathi Matrice Higher Secondary School',
    period: '2020 — 2021',
    desc: 'Scored 87.6%. Active in science exhibitions and coding clubs.',
  },
]

/* ── Stat counters ──────────────────────────────────────────── */
const STATS = [
  { value: 1,  suffix: '+', label: 'Years Experience' },
  { value: 8, suffix: '+', label: 'Projects Delivered' },
  { value: 2, suffix: '+', label: 'Happy Clients' },
  { value: 6, suffix: '',  label: 'Tech Stack' },
]

/* ── Animated counter hook ──────────────────────────────────── */
function useCounter(target, active) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = 0
    const step = Math.ceil(target / 50)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(start)
    }, 28)
    return () => clearInterval(timer)
  }, [target, active])
  return count
}

/* ── Skill bar component ────────────────────────────────────── */
function SkillBar({ name, pct, tag, active }) {
  return (
    <div className="about__skill">
      <div className="about__skill-head">
        <span className="about__skill-name">{name}</span>
        <div className="about__skill-meta">
          <span className="about__skill-tag">{tag}</span>
          <span className="about__skill-pct">{pct}%</span>
        </div>
      </div>
      <div className="about__skill-track">
        <div
          className="about__skill-fill"
          style={{ '--pct': `${pct}%`, '--delay': active ? '0.1s' : '0s' }}
          data-active={active}
        />
      </div>
    </div>
  )
}

/* ── Timeline item ──────────────────────────────────────────── */
function TimelineItem({ title, subtitle, period, desc, index }) {
  return (
    <div className="about__timeline-item" style={{ '--idx': index }}>
      <div className="about__timeline-dot" />
      <div className="about__timeline-body">
        <div className="about__timeline-top">
          <div>
            <h4 className="about__timeline-title">{title}</h4>
            <p className="about__timeline-sub">{subtitle}</p>
          </div>
          <span className="about__timeline-period">{period}</span>
        </div>
        <p className="about__timeline-desc">{desc}</p>
      </div>
    </div>
  )
}

/* ── Stat chip ──────────────────────────────────────────────── */
function StatChip({ value, suffix, label, active }) {
  const count = useCounter(value, active)
  return (
    <div className="about__stat">
      <span className="about__stat-value">
        {count}<span className="about__stat-suffix">{suffix}</span>
      </span>
      <span className="about__stat-label">{label}</span>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   About component
   ════════════════════════════════════════════════════════════ */
export default function About() {
  const [activeTab, setActiveTab] = useState('Skills')
  const [visible, setVisible]     = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.12 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      className={`about${visible ? ' about--visible' : ''}`}
      ref={ref}
    >
      {/* ── Decorative line ─────── */}
      <div className="about__deco-line" aria-hidden="true" />

      <div className="about__inner">

        {/* ── Section header ──────── */}
        <div className="about__header">
          <span className="about__eyebrow">01 / About Me</span>
          <h2 className="about__heading">
            The person<br />
            <em>behind the code</em>
          </h2>
          <div className="about__heading-bar" />
        </div>

        {/* ── Main grid ───────────── */}
        <div className="about__grid">

          {/* ── Left — bio + stats ── */}
          <div className="about__bio-col">

            <div className="about__avatar-wrap">
              <div className="about__avatar">
                <span className="about__avatar-initials">DM</span>
              </div>
              <div className="about__avatar-glow" aria-hidden="true" />
              {/* Status badge */}
              <div className="about__status">
                <span className="about__status-dot" />
                Open to opportunities
              </div>
            </div>

            <div className="about__bio-text">
              <p>
                Hey! I'm <strong>Dinesh Maruthai</strong>, a passionate Full Stack
                Developer based in Tamil Nadu, India. With over 5 years of
                professional experience, I specialise in building performant,
                accessible, and visually compelling web applications.
              </p>
              <p>
                I thrive at the intersection of engineering and design — turning
                complex problems into elegant digital solutions. Whether it's
                architecting a scalable backend or crafting a smooth micro-interaction,
                I care deeply about every detail.
              </p>
              <p>
                When I'm not coding, you'll find me exploring open-source projects,
                hiking trails, or experimenting with 3D design tools.
              </p>
            </div>

            {/* Personal info grid */}
            <ul className="about__info-grid">
              {[
                { label: 'Name',     value: 'Dinesh Maruthai' },
                { label: 'Location', value: 'Tamil Nadu, India' },
                { label: 'Email',    value: 'dineshmaruthai24@gmail.com' },
      
                { label: 'Freelance',value: 'Available' },
                { label: 'Languages',value: 'Tamil, English' },
              ].map(({ label, value }) => (
                <li key={label} className="about__info-item">
                  <span className="about__info-label">{label}</span>
                  <span className="about__info-value">{value}</span>
                </li>
              ))}
            </ul>

            {/* Download CV */}
            <a href="#" className="about__cv-btn" download>
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M10 3v10M5 8l5 5 5-5M3 17h14"
                  stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download CV
            </a>

            {/* Stats row */}
            <div className="about__stats">
              {STATS.map((s) => (
                <StatChip key={s.label} {...s} active={visible} />
              ))}
            </div>
          </div>

          {/* ── Right — tabbed panel ── */}
          <div className="about__panel-col">

            {/* Tab nav */}
            <div className="about__tabs" role="tablist">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={activeTab === tab}
                  className={`about__tab${activeTab === tab ? ' about__tab--active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
              <div
                className="about__tab-slider"
                style={{
                  '--tab-idx': TABS.indexOf(activeTab),
                  '--tab-count': TABS.length,
                }}
              />
            </div>

            {/* Tab panels */}
            <div className="about__tab-content">

              {activeTab === 'Skills' && (
                <div className="about__skills-panel">
                  {SKILLS.map((s, i) => (
                    <SkillBar key={s.name} {...s} active={visible} />
                  ))}

                  {/* Tech badge cloud */}
                  <div className="about__tech-cloud">
                    {[
                      'React','Next.js','TypeScript','Node.js','Express',
                      'PostgreSQL','MongoDB','Docker','Figma','TailwindCSS',
                      'GraphQL','Redis',
                    ].map((t) => (
                      <span key={t} className="about__tech-badge">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'Experience' && (
                <div className="about__timeline">
                  {EXPERIENCE.map((exp, i) => (
                    <TimelineItem
                      key={exp.company}
                      title={exp.role}
                      subtitle={exp.company}
                      period={exp.period}
                      desc={exp.desc}
                      index={i}
                    />
                  ))}
                </div>
              )}

              {activeTab === 'Education' && (
                <div className="about__timeline">
                  {EDUCATION.map((edu, i) => (
                    <TimelineItem
                      key={edu.school}
                      title={edu.degree}
                      subtitle={edu.school}
                      period={edu.period}
                      desc={edu.desc}
                      index={i}
                    />
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}