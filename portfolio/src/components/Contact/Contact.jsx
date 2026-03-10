import { useEffect, useRef, useState } from 'react'
import './Contact.css'

/* ── Contact info items ─────────────────────────────────────── */
const INFO = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.6"/>
        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.6"/>
      </svg>
    ),
    label: 'Location',
    value: 'Tamil Nadu, India',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.6"/>
      </svg>
    ),
    label: 'Email',
    value: 'dineshmaruthai24@gmail.com',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Availability',
    value: 'Mon – Fri, 7pm – 9pm IST',
  },
]

/* ── Form hook ──────────────────────────────────────────────── */
function useContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.email.trim())   e.email   = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email address'
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (!form.message.trim()) e.message = 'Message is required'
    else if (form.message.trim().length < 20) e.message = 'At least 20 characters please'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return
    setStatus('sending')
    // Simulate API call
    setTimeout(() => setStatus('sent'), 2000)
  }

  return { form, errors, status, handleChange, handleSubmit }
}

/* ════════════════════════════════════════════════════════════
   Contact section
   ════════════════════════════════════════════════════════════ */
export default function Contact() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)
  const { form, errors, status, handleChange, handleSubmit } = useContactForm()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.08 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="contact"
      className={`ct${visible ? ' ct--visible' : ''}`}
      ref={ref}
    >
      <div className="ct__bg-blob ct__bg-blob--1" aria-hidden="true" />
      <div className="ct__bg-blob ct__bg-blob--2" aria-hidden="true" />

      <div className="ct__inner">

        {/* ── Section header ──── */}
        <div className="ct__header">
          <span className="ct__eyebrow">04 / Contact</span>
          <h2 className="ct__heading">
            Let's build something<br />
            <em>great together</em>
          </h2>
          <div className="ct__heading-bar" />
        </div>

        {/* ── Two-column split ── */}
        <div className="ct__body">

          {/* ══ LEFT — 70% ══════════════════════════════════ */}
          <div className="ct__left">

            {/* Visual card / "image" panel */}
            <div className="ct__visual">

              {/* Decorative code window */}
              <div className="ct__visual-window">
                <div className="ct__visual-bar">
                  <span /><span /><span />
                  <span className="ct__visual-bar-title">dinesh.profile</span>
                </div>

                <div className="ct__visual-content">
                  {/* Avatar circle */}
                  <div className="ct__visual-avatar">
                    <div className="ct__visual-avatar-ring" />
                    <div className="ct__visual-avatar-inner">
                      <span>DM</span>
                    </div>
                  </div>

                  {/* Name & title block */}
                  <div className="ct__visual-info">
                    <h3>Dinesh Maruthai</h3>
                    <p>Full Stack Developer · Software Engineer · UI/UX Designer</p>
                  </div>

                  {/* Info grid */}
                  <div className="ct__visual-grid">
                    {INFO.map(({ icon, label, value }) => (
                      <div key={label} className="ct__info-item">
                        <div className="ct__info-icon">{icon}</div>
                        <div>
                          <span className="ct__info-label">{label}</span>
                          <span className="ct__info-value">{value}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Social links row */}
                  <div className="ct__visual-socials">
                    {[
                      { label: 'GitHub',   href: '#', path: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' },
                      { label: 'LinkedIn', href: '#', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                      { label: 'Twitter',  href: '#', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                    ].map(({ label, href, path }) => (
                      <a key={label} href={href} className="ct__social" aria-label={label}>
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d={path}/></svg>
                      </a>
                    ))}
                  </div>

                  {/* Availability badge */}
                  <div className="ct__available-badge">
                    <span className="ct__available-dot" />
                    Available for freelance &amp; full-time roles
                  </div>
                </div>
              </div>

              {/* Floating decorative chips */}
              <div className="ct__float-chip ct__float-chip--1">
                <span>🚀</span> Open to work
              </div>
              <div className="ct__float-chip ct__float-chip--2">
                <span>⚡</span> Fast response
              </div>
            </div>
          </div>

          {/* ══ RIGHT — 30% ═════════════════════════════════ */}
          <div className="ct__right">
            <div className="ct__form-wrap">
              <div className="ct__form-header">
                <h3>Send a message</h3>
                <p>Fill in the form and I'll get back to you within 24 hours.</p>
              </div>

              {status === 'sent' ? (
                <div className="ct__success">
                  <div className="ct__success-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="var(--clr-accent)" strokeWidth="1.6"/>
                      <path d="M8 12l3 3 5-5" stroke="var(--clr-accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h4>Message sent!</h4>
                  <p>Thanks for reaching out, Dinesh will reply shortly.</p>
                </div>
              ) : (
                <form className="ct__form" onSubmit={handleSubmit} noValidate>

                  {/* Name */}
                  <div className={`ct__field${errors.name ? ' ct__field--error' : ''}`}>
                    <label htmlFor="ct-name">Your Name</label>
                    <input
                      id="ct-name"
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    {errors.name && <span className="ct__field-error">{errors.name}</span>}
                  </div>

                  {/* Email */}
                  <div className={`ct__field${errors.email ? ' ct__field--error' : ''}`}>
                    <label htmlFor="ct-email">Email Address</label>
                    <input
                      id="ct-email"
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    {errors.email && <span className="ct__field-error">{errors.email}</span>}
                  </div>

                  {/* Subject */}
                  <div className={`ct__field${errors.subject ? ' ct__field--error' : ''}`}>
                    <label htmlFor="ct-subject">Subject</label>
                    <input
                      id="ct-subject"
                      type="text"
                      name="subject"
                      placeholder="Project inquiry..."
                      value={form.subject}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    {errors.subject && <span className="ct__field-error">{errors.subject}</span>}
                  </div>

                  {/* Message */}
                  <div className={`ct__field${errors.message ? ' ct__field--error' : ''}`}>
                    <label htmlFor="ct-message">Message</label>
                    <textarea
                      id="ct-message"
                      name="message"
                      rows="5"
                      placeholder="Tell me about your project..."
                      value={form.message}
                      onChange={handleChange}
                    />
                    {errors.message && <span className="ct__field-error">{errors.message}</span>}
                  </div>

                  <button
                    type="submit"
                    className={`ct__submit${status === 'sending' ? ' ct__submit--sending' : ''}`}
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? (
                      <>
                        <span className="ct__spinner" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg viewBox="0 0 20 20" fill="none">
                          <path d="M2 10h14M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}