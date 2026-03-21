'use client'

import { useState } from 'react'
import { useContact } from '@/hooks/useContact'

export default function Subscribe() {
  const [email, setEmail] = useState('')
  const { submit, status } = useContact()

  const handleSubmit = async () => {
    if (!email) return
    await submit({ email, source: 'newsletter' })
  }

  return (
    <div
      className="px-5 md:px-10 py-16 md:py-20"
      style={{
        background: 'var(--dark)',
        textAlign: 'center',
      }}
    >
      <h2
        className="exo"
        style={{
          fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
          fontWeight: 700,
          color: 'white',
          marginBottom: 12,
          letterSpacing: '-0.5px',
        }}
      >
        Free AI tips, straight to your inbox.
      </h2>
      <p
        style={{
          fontSize: 16,
          lineHeight: 1.7,
          color: 'rgba(255,255,255,0.55)',
          fontWeight: 300,
          maxWidth: 440,
          margin: '0 auto 36px',
        }}
      >
        Practical, not theoretical. Built for time-poor vets — written by vets, for
        the vet industry.
      </p>
      {status === 'success' ? (
        <p style={{ color: 'var(--teal)', fontWeight: 500, fontSize: 16 }}>
          You are in. Check your inbox.
        </p>
      ) : (
        <>
          <div
            className="flex flex-col sm:flex-row gap-3"
            style={{ maxWidth: 440, margin: '0 auto' }}
          >
            <input
              className="email-input"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="button"
              className="email-submit"
              disabled={status === 'loading'}
              onClick={handleSubmit}
            >
              {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
            </button>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 12 }}>
            No spam. Unsubscribe any time.
          </p>
        </>
      )}
    </div>
  )
}
