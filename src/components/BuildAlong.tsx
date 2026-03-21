'use client'

import { useState } from 'react'
import { useContact } from '@/hooks/useContact'

export default function BuildAlong() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const { submit, status } = useContact()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    await submit({ email, name, source: 'buildalong' })
  }

  return (
    <section
      id="buildalong"
      className="px-5 md:px-10 py-16 md:py-20"
      style={{ background: 'var(--bg-warm)' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 2,
            color: 'var(--teal)',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}
        >
          LIVE WORKSHOP
        </p>
        <h2
          className="exo"
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: '-0.5px',
            color: 'var(--dark)',
            marginBottom: 20,
          }}
        >
          BuildAlong — build your first product live with us.
        </h2>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.7,
            color: 'var(--text-muted)',
            fontWeight: 300,
            maxWidth: 560,
            margin: '0 auto 36px',
          }}
        >
          A hands-on online workshop where we vibe code a real product together — a
          web app, a website, or an AI tool — in one session. No experience needed.
          Just show up and build.
        </p>
        {status === 'success' ? (
          <p
            style={{
              color: 'var(--teal)',
              fontWeight: 500,
              fontSize: 16,
            }}
          >
            You are on the list. We will be in touch soon.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-3"
            style={{ maxWidth: 520, margin: '0 auto' }}
          >
            <input
              className="waitlist-input"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ flex: '1 1 140px', minWidth: 0 }}
              aria-label="Your name"
            />
            <input
              className="waitlist-input"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ flex: '1 1 180px', minWidth: 0 }}
              aria-label="Email address"
            />
            <button
              type="submit"
              className="btn-primary"
              disabled={status === 'loading'}
              style={{ flexShrink: 0 }}
            >
              {status === 'loading' ? 'Joining…' : 'Join the waitlist'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
