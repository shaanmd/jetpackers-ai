'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const CONSENT_KEY = 'jetpackers-cookie-consent'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const accepted = localStorage.getItem(CONSENT_KEY)
    if (!accepted) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'var(--dark)',
        color: 'rgba(255,255,255,0.9)',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        flexWrap: 'wrap',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
      }}
    >
      <p
        style={{
          fontSize: 14,
          lineHeight: 1.5,
          margin: 0,
          flex: '1 1 280px',
        }}
      >
        We use cookies to improve your experience and to remember your preferences. By continuing,
        you accept our use of cookies.{' '}
        <Link
          href="/privacy#cookies"
          style={{
            color: 'var(--teal)',
            textDecoration: 'underline',
          }}
        >
          Learn more
        </Link>
      </p>
      <button
        type="button"
        onClick={accept}
        className="btn-primary"
        style={{ flexShrink: 0 }}
      >
        Accept
      </button>
    </div>
  )
}
