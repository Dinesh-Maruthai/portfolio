import { useEffect, useRef, useState } from 'react'
import './HireMe.css'

const PERKS = [
  { icon: '⚡', text: 'Fast Delivery' },
  { icon: '🎯', text: 'Clean Code'   },
  { icon: '🔒', text: 'NDA Friendly' },
  { icon: '🔄', text: 'Agile Process'},
]

export default function HireMe() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      className={`hm${visible ? ' hm--visible' : ''}`}
      ref={ref}
      aria-label="Hire Me"
    >
      {/* Animated background gradient */}
      <div className="hm__bg" aria-hidden="true" />

      {/* Moving marquee strip */}
      <div className="hm__marquee-wrap" aria-hidden="true">
        <div className="hm__marquee">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="hm__marquee-item">
              AVAILABLE FOR WORK <span className="hm__marquee-dot">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="hm__inner">
        <div className="hm__content">

          {/* Left side */}
          <div className="hm__left">
            <span className="hm__badge">
              <span className="hm__badge-dot" /> Currently Available
            </span>
            <h2 className="hm__heading">
              Ready to bring your<br />
              <em>vision to life?</em>
            </h2>
            <p className="hm__sub">
              Whether it's a product MVP, a scalable backend, or a pixel-perfect UI —
              let's collaborate and build something remarkable together.
            </p>

            <div className="hm__perks">
              {PERKS.map(({ icon, text }) => (
                <div key={text} className="hm__perk">
                  <span className="hm__perk-icon">{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <div className="hm__cta-row">
              <a href="#contact" className="hm__btn hm__btn--primary">
                Hire Me Now
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor"
                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#work" className="hm__btn hm__btn--ghost">
                See My Work
              </a>
            </div>
          </div>

          {/* Right side — rate card */}
          <div className="hm__right">
            <div className="hm__rate-card">
              <div className="hm__rate-card-glow" aria-hidden="true" />

              <div className="hm__rate-top">
                <span className="hm__rate-label">Starting from</span>
                <div className="hm__rate-price">
                  <span className="hm__rate-currency">₹</span>
                  <span className="hm__rate-amount">1,999</span>
                  <span className="hm__rate-unit">/ day</span>
                </div>
              </div>

              <ul className="hm__rate-list">
                {[
                  'Full Stack Web Applications',
                  'REST API Design',
                  
                  'Code Review & Consulting',
                  'Performance Optimisation',
                ].map(item => (
                  <li key={item}>
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8l3 3 7-7" stroke="var(--clr-accent)"
                        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <a href="#contact" className="hm__rate-cta">
                Get a Free Quote →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
