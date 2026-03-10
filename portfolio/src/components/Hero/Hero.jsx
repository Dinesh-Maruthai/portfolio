import { useState, useEffect, useRef } from 'react'
import './Hero.css'

/* ── Roles that cycle in the animated text ─────────────── */
const ROLES = [
  'Full Stack Developer',
  'Software Engineer',
  'UI/UX Designer',
]

/* ── Typing speed constants (ms) ───────────────────────── */
const TYPE_SPEED   = 65
const DELETE_SPEED = 35
const PAUSE_AFTER  = 1800
const PAUSE_BEFORE = 400

export default function Hero() {
  const [displayText, setDisplayText]   = useState('')
  const [roleIndex, setRoleIndex]       = useState(0)
  const [isDeleting, setIsDeleting]     = useState(false)
  const [isPaused, setIsPaused]         = useState(false)
  const [heroVisible, setHeroVisible]   = useState(false)
  const heroRef = useRef(null)

  /* ── Intersection Observer — trigger entrance animation ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeroVisible(true) },
      { threshold: 0.1 }
    )
    if (heroRef.current) observer.observe(heroRef.current)
    return () => observer.disconnect()
  }, [])

  /* ── Typewriter effect ──────────────────────────────────── */
  useEffect(() => {
    if (isPaused) return

    const current = ROLES[roleIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        /* typing forward */
        setDisplayText(current.slice(0, displayText.length + 1))

        if (displayText.length + 1 === current.length) {
          setIsPaused(true)
          setTimeout(() => {
            setIsPaused(false)
            setIsDeleting(true)
          }, PAUSE_AFTER)
        }
      } else {
        /* deleting */
        setDisplayText(current.slice(0, displayText.length - 1))

        if (displayText.length - 1 === 0) {
          setIsPaused(true)
          setTimeout(() => {
            setIsPaused(false)
            setIsDeleting(false)
            setRoleIndex((prev) => (prev + 1) % ROLES.length)
          }, PAUSE_BEFORE)
        }
      }
    }, isDeleting ? DELETE_SPEED : TYPE_SPEED)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, isPaused, roleIndex])

  /* ── Particle / dot grid background ─────────────────────── */
  const dots = Array.from({ length: 24 })

  return (
    <section
      className={`hero${heroVisible ? ' hero--visible' : ''}`}
      ref={heroRef}
    >
      {/* ── Ambient blobs ─────────────────────────── */}
      <div className="hero__blob hero__blob--1" aria-hidden="true" />
      <div className="hero__blob hero__blob--2" aria-hidden="true" />
      <div className="hero__blob hero__blob--3" aria-hidden="true" />

      {/* ── Dot grid ──────────────────────────────── */}
      <div className="hero__grid" aria-hidden="true">
        {dots.map((_, i) => (
          <span key={i} className="hero__dot" style={{ '--i': i }} />
        ))}
      </div>

      {/* ── Nav ───────────────────────────────────── */}
      <nav className="hero__nav">
        <div className="hero__logo">
          <span className="hero__logo-bracket">&lt;</span>
          DM
          <span className="hero__logo-bracket">/&gt;</span>
        </div>
        <ul className="hero__nav-links">
          {['About', 'Work', 'Skills', 'Contact'].map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`} className="hero__nav-link">
                {item}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="hero__nav-cta">Hire Me</a>
      </nav>

      {/* ── Main content ──────────────────────────── */}
      <div className="hero__content">

        {/* Left column */}
        <div className="hero__left">

          {/* Greeting badge */}
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            Available for work
          </div>

          {/* Name */}
          <h1 className="hero__name">
            <span className="hero__name-line hero__name-line--1">Dinesh</span>
            <span className="hero__name-line hero__name-line--2">Maruthai</span>
          </h1>

          {/* Animated role */}
          <div className="hero__role-wrapper" aria-live="polite" aria-label="Current role">
            <span className="hero__role-prefix">I&apos;m a&nbsp;</span>
            <span className="hero__role-text">
              {displayText}
              <span className="hero__cursor" aria-hidden="true" />
            </span>
          </div>

          {/* Description */}
          <p className="hero__desc">
            Crafting digital experiences that sit at the intersection of
            performance&nbsp;&amp; pixel-perfect design. Turning ideas into
            elegant, scalable products.
          </p>

          {/* CTA row */}
          <div className="hero__cta-row">
            <a href="#work" className="hero__btn hero__btn--primary">
              View My Work
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor"
                  strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#contact" className="hero__btn hero__btn--ghost">
              Get In Touch
            </a>
          </div>

          {/* Social links */}
          <div className="hero__socials">
            {[
              { label: 'GitHub',   href: '#', icon: <GithubIcon /> },
              { label: 'LinkedIn', href: '#', icon: <LinkedinIcon /> },
              { label: 'Twitter',  href: '#', icon: <TwitterIcon /> },
            ].map(({ label, href, icon }) => (
              <a key={label} href={href} className="hero__social-link"
                aria-label={label} title={label}>
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Right column — avatar card */}
        <div className="hero__right">
          <div className="hero__avatar-card">
            <div className="hero__avatar-ring" />
            <div className="hero__avatar-img">
              <span className="hero__avatar-initials">DM</span>
            </div>

            {/* Floating stat chips */}
            <div className="hero__chip hero__chip--exp">
              <strong>5+</strong>
              <span>Years Exp.</span>
            </div>
            <div className="hero__chip hero__chip--projects">
              <strong>80+</strong>
              <span>Projects</span>
            </div>
            <div className="hero__chip hero__chip--stack">
              <strong>React</strong>
              <span>Node · Next</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ──────────────────────── */}
      <div className="hero__scroll">
        <span className="hero__scroll-line" />
        <span className="hero__scroll-label">scroll</span>
      </div>
    </section>
  )
}

/* ── Inline SVG icons ─────────────────────────────────────── */
function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}
