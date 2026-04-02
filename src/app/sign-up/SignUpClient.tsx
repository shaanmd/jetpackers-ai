'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const STRIPE_URL = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_URL ?? '#'
const MAX_SPOTS = 6

type PersonaKey = 'A' | 'B' | 'C' | 'D'

interface PersonaContent {
  badge: string
  badgeColor: string
  borderColor: string
  headline: string
  sub: string
  calloutEmoji: string
  calloutTitle: string
  calloutBody: string
}

const PERSONA_CONTENT: Record<PersonaKey, PersonaContent> = {
  A: {
    badge: '📺 You\'re a Classic Hit',
    badgeColor: '#0D9488',
    borderColor: '#0D9488',
    headline: 'AI that works with your brain, not instead of it.',
    sub: "You value the human touch — and that's not going away. This session puts you firmly in the driver's seat. You decide what AI does for you.",
    calloutEmoji: '📺',
    calloutTitle: 'Built around your expertise',
    calloutBody:
      'As a Classic Hit, you have high standards and hard-won expertise. This session shows you how to use AI as a research partner — one that sharpens your thinking without replacing it.',
  },
  B: {
    badge: '💍 You\'re a Practical Pioneer',
    badgeColor: '#EC4899',
    borderColor: '#EC4899',
    headline: 'Stop drowning in admin. Start getting your time back.',
    sub: "You're ready to make the leap, and we're here to make it painless. No theory — just the shortcuts that actually free up your day.",
    calloutEmoji: '💍',
    calloutTitle: 'Results you can use on Monday',
    calloutBody:
      "As a Practical Pioneer, you want results you can use on Monday morning. This session hands you the everyday AI shortcuts that take the 'messy' off your plate — so you can spend your time on what actually matters.",
  },
  C: {
    badge: '💅 You\'re a Power Player',
    badgeColor: '#C084FC',
    borderColor: '#C084FC',
    headline: "You see the opportunity. Now let's make it real.",
    sub: "You don't need a tech background. You need three hours, a glass of wine, and your favourite 80s album.",
    calloutEmoji: '💅',
    calloutTitle: 'Built for where you are right now',
    calloutBody:
      "As a Power Player, you don't just want to dabble. You want to command AI. This session gives you the foundation to do exactly that: real prompts, real tools, and something you built yourself to show for it.",
  },
  D: {
    badge: '🐕 You\'re a Footrot Flats Traditionalist',
    badgeColor: '#F59E0B',
    borderColor: '#F59E0B',
    headline: 'Get the boring stuff handled. Then get back outside.',
    sub: "You don't want to live in front of a screen. Neither do we. This session finds you the one or two tools that quietly do the work — so you barely have to think about them.",
    calloutEmoji: '🐕',
    calloutTitle: 'Set it up once. Then forget it.',
    calloutBody:
      "As a Footrot Flats Traditionalist, your ideal AI is one you set up once and never think about again. We'll find your 'set and forget' setup — the tools that handle the life admin so you can get back to what you actually love.",
  },
}

const VALID_KEYS: PersonaKey[] = ['A', 'B', 'C', 'D']

function isPersonaKey(v: string | null): v is PersonaKey {
  return v !== null && (VALID_KEYS as string[]).includes(v)
}

type WaitlistStatus = 'idle' | 'loading' | 'success' | 'error'

export default function SignUpClient() {
  const params = useSearchParams()
  const rawPersona = params.get('persona')
  const persona = isPersonaKey(rawPersona) ? rawPersona : null
  const p = persona ? PERSONA_CONTENT[persona] : null

  const headline = p ? p.headline : 'From "what even is AI?" to building your own app in 3 hours.'
  const sub = p
    ? p.sub
    : 'A live online session for Gen X women. No tech experience needed. Just a laptop, a browser, and a little curiosity.'

  // Spot tracking
  const [spotsLeft, setSpotsLeft] = useState<number | null>(null)
  const [soldOut, setSoldOut] = useState(false)

  // Waitlist form
  const [waitlistEmail, setWaitlistEmail] = useState('')
  const [waitlistStatus, setWaitlistStatus] = useState<WaitlistStatus>('idle')

  useEffect(() => {
    fetch('/api/spots')
      .then(r => r.json())
      .then(data => {
        setSpotsLeft(data.spotsLeft)
        setSoldOut(data.soldOut)
      })
      .catch(() => {
        // Fail open — show sign up if spots can't be checked
        setSpotsLeft(MAX_SPOTS)
        setSoldOut(false)
      })
  }, [])

  async function handleWaitlist(e: React.FormEvent) {
    e.preventDefault()
    if (!waitlistEmail) return
    setWaitlistStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: waitlistEmail }),
      })
      if (res.ok) {
        setWaitlistStatus('success')
      } else {
        setWaitlistStatus('error')
      }
    } catch {
      setWaitlistStatus('error')
    }
  }

  const spotsLabel =
    spotsLeft === null
      ? '⚡ Only 6 spots — filling fast'
      : spotsLeft === 0
      ? '🔴 This cohort is full'
      : spotsLeft === 1
      ? '🔥 1 spot left!'
      : spotsLeft <= 3
      ? `🔥 Only ${spotsLeft} spots left!`
      : `⚡ ${spotsLeft} of 6 spots remaining`

  return (
    <div style={{ fontFamily: 'var(--font-dm), sans-serif', background: 'var(--bg)', minHeight: '100vh', color: 'var(--text-primary)' }}>

      {/* Nav */}
      <nav style={{ background: '#1A1A2E', padding: '14px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: 18, color: 'white', textDecoration: 'none' }}>
          Jetpackers<span style={{ color: 'var(--teal)' }}>AI</span>
        </Link>
        {!soldOut && (
          <a href={STRIPE_URL} className="btn-primary" style={{ fontSize: 14, padding: '10px 20px', textDecoration: 'none' }}>
            Sign Up Now →
          </a>
        )}
      </nav>

      {/* Hero */}
      <div style={{ background: '#1A1A2E', padding: '40px 32px 32px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: 'rgba(0,212,170,0.12)', border: '1px solid rgba(0,212,170,0.3)', color: '#00D4AA', fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', padding: '6px 14px', borderRadius: 20, marginBottom: 16 }}>
          Vinyl &amp; Vibe-Along · 12 April
        </div>

        {p && (
          <div style={{ display: 'inline-block', background: `${p.badgeColor}26`, border: `1px solid ${p.badgeColor}66`, color: p.badgeColor, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', padding: '6px 14px', borderRadius: 20, marginBottom: 16, marginLeft: 8 }}>
            {p.badge}
          </div>
        )}

        <h1 style={{ fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 800, color: 'white', lineHeight: 1.15, marginBottom: 12 }}>
          {headline}
        </h1>
        <p style={{ fontSize: 15, color: '#9999BB', lineHeight: 1.7, maxWidth: 500, margin: '0 auto 20px' }}>
          {sub}
        </p>

        <div style={{ display: 'inline-flex', gap: 16, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 20px', fontSize: 13, color: '#CCCCDD', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ color: '#00D4AA', fontWeight: 600 }}>📅 12 April</span>
          <span style={{ color: '#00D4AA', fontWeight: 600 }}>⏰ 12pm AEST · 2pm NZT</span>
          <span style={{ color: '#00D4AA', fontWeight: 600 }}>🎧 Online · 6 spots</span>
        </div>
      </div>

      {/* Reassurance strip */}
      <div style={{ background: 'white', borderBottom: '1px solid #E2E2ED', padding: '18px 32px', display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
        {['No coding experience needed', 'Small group (max 6 women)', "You'll build something real"].map((item) => (
          <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 500 }}>
            <span style={{ color: 'var(--teal)', fontSize: 16 }}>✓</span> {item}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 680, margin: '0 auto', padding: 32 }}>

        {/* Persona callout */}
        {p && (
          <div style={{ background: 'white', border: `2px solid ${p.borderColor}`, borderRadius: 12, padding: '20px 24px', marginBottom: 24, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ fontSize: 36, flexShrink: 0 }}>{p.calloutEmoji}</div>
            <div>
              <h3 style={{ fontWeight: 800, fontSize: 16, color: 'var(--text-primary)', marginBottom: 4 }}>{p.calloutTitle}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{p.calloutBody}</p>
            </div>
          </div>
        )}

        {/* Fear buster */}
        <div style={{ background: '#FFF5FB', borderLeft: '3px solid var(--pink)', borderRadius: '0 10px 10px 0', padding: '16px 20px', marginBottom: 24 }}>
          <p style={{ fontSize: 14, lineHeight: 1.7 }}>
            Worried you&apos;re not technical enough?{' '}
            <strong style={{ color: 'var(--pink)' }}>That&apos;s exactly why we built this.</strong>{' '}
            Shaan and Deb are Gen X women who figured this out themselves. No computer science degree, no jargon. If you can Google something, you can do this.
          </p>
        </div>

        {/* Outcomes */}
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 12 }}>
          By the end of the session you will
        </div>
        <ul style={{ listStyle: 'none', marginBottom: 24 }}>
          {[
            { icon: '✍️', strong: 'Know how to write prompts that actually work.', rest: " No more vague results. You'll know how to ask AI the right way to get what you need." },
            { icon: '🛠️', strong: 'Have built something real.', rest: ' A web page or mini app you designed yourself. Not a template. Something that does something useful for you.' },
            { icon: '🧠', strong: 'Understand the tools.', rest: " We'll walk through Gemini and other AI tools so you know what they're good for (and what they're not)." },
            { icon: '💪', strong: 'Feel confident enough to keep going.', rest: " The goal isn't one session, it's giving you the confidence to explore on your own." },
          ].map(({ icon, strong, rest }) => (
            <li key={strong} style={{ padding: '12px 0', borderBottom: '1px solid #E2E2ED', fontSize: 14, display: 'flex', gap: 12, alignItems: 'flex-start', lineHeight: 1.5 }}>
              <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{icon}</span>
              <div><strong>{strong}</strong>{rest}</div>
            </li>
          ))}
        </ul>

        {/* Zero-tech promise */}
        <div style={{ background: '#1A1A2E', borderRadius: 12, padding: '20px 24px', marginBottom: 24, textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: '#9999BB', lineHeight: 1.7 }}>
            <strong style={{ color: 'white' }}>Zero tech experience required.</strong>{' '}
            We start from scratch. The only thing you need is a laptop, a browser, and a willingness to press the buttons. Shaan will be right there if anything goes sideways.
          </p>
        </div>

        {/* Pricing card */}
        <div style={{ background: 'white', border: `2px solid ${soldOut ? '#E2E2ED' : 'var(--pink)'}`, borderRadius: 14, padding: 24, marginBottom: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 6 }}>
            {soldOut ? 'This cohort is now full' : 'Introductory price, first cohort only'}
          </div>
          <div style={{ fontSize: 42, fontWeight: 800, color: soldOut ? 'var(--text-muted)' : 'var(--pink)' }}>
            $67 <span style={{ fontSize: 18, color: 'var(--text-muted)', fontWeight: 400 }}>NZD</span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>3-hour live session · Sunday 12 April · Online</div>

          <div style={{ background: soldOut ? 'rgba(0,0,0,0.05)' : 'rgba(233,30,140,0.08)', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, color: soldOut ? 'var(--text-muted)' : 'var(--pink)', display: 'inline-block', marginBottom: 16 }}>
            {spotsLabel}
          </div>

          {soldOut ? (
            /* Waitlist form */
            waitlistStatus === 'success' ? (
              <div style={{ background: 'rgba(0,212,170,0.08)', border: '1px solid rgba(0,212,170,0.3)', borderRadius: 10, padding: '16px 20px', color: '#0D9488', fontWeight: 600, fontSize: 15 }}>
                You&apos;re on the waitlist! We&apos;ll let you know when the next cohort opens.
              </div>
            ) : (
              <form onSubmit={handleWaitlist} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 4 }}>
                  Join the waitlist and we&apos;ll contact you first when the next cohort opens.
                </p>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={waitlistEmail}
                  onChange={e => setWaitlistEmail(e.target.value)}
                  style={{ padding: '12px 16px', borderRadius: 10, border: '1px solid #E2E2ED', fontSize: 15, width: '100%', boxSizing: 'border-box' }}
                />
                <button
                  type="submit"
                  disabled={waitlistStatus === 'loading'}
                  className="btn-primary"
                  style={{ fontSize: 16, fontWeight: 800, border: 'none', cursor: 'pointer' }}
                >
                  {waitlistStatus === 'loading' ? 'Joining...' : 'Join the Waitlist →'}
                </button>
                {waitlistStatus === 'error' && (
                  <p style={{ fontSize: 13, color: '#E91E8C' }}>Something went wrong — please try again.</p>
                )}
              </form>
            )
          ) : (
            <>
              <a href={STRIPE_URL} className="btn-primary" style={{ display: 'block', fontSize: 16, fontWeight: 800, textDecoration: 'none', textAlign: 'center', marginBottom: 10 }}>
                Sign Up Now →
              </a>
              <div style={{ fontSize: 12, color: 'var(--text-footer)' }}>Secure checkout via Stripe · Instant confirmation email</div>
            </>
          )}
        </div>

        {/* Trust / bio */}
        <div style={{ background: 'var(--bg)', borderRadius: 10, padding: '16px 20px', marginBottom: 24 }}>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>
            <strong>Shaan &amp; Deb</strong> are two Gen X vets who taught themselves AI from scratch. Shaan was a web designer and coding teacher. Deb tries every tool she can get her hands on. Neither of them had a roadmap. Now they&apos;re making one for you.
          </p>
        </div>

      </div>
    </div>
  )
}
