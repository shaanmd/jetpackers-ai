import Link from 'next/link'
import type { Metadata } from 'next'

const outfit = "var(--font-outfit), 'Outfit', sans-serif"
const dmSans = "var(--font-dm), 'DM Sans', sans-serif"

export const metadata: Metadata = {
  title: 'You're in! | Jetpackers AI',
  description: 'Your Vinyl & Vibe-Along spot is confirmed.',
}

export default function PaymentSuccessPage() {
  return (
    <div style={{ fontFamily: dmSans, color: '#1A1A2E', background: '#1A1A2E', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Nav */}
      <nav
        style={{
          background: '#1A1A2E',
          padding: '16px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link href="/coming-soon" style={{ textDecoration: 'none' }}>
          <div style={{ fontFamily: outfit, fontWeight: 800, fontSize: 22, color: 'white' }}>
            Jetpackers<span style={{ color: '#00D4AA' }}>AI</span>
          </div>
        </Link>
      </nav>

      {/* Confirmation */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 40px',
        }}
      >
        <div style={{ maxWidth: 560, textAlign: 'center' }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00D4AA 0%, #00B894 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 28px',
              fontSize: 36,
            }}
          >
            &#10003;
          </div>
          <h1
            style={{
              fontFamily: outfit,
              fontWeight: 800,
              fontSize: 'clamp(32px, 6vw, 48px)',
              color: 'white',
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            You&apos;re in!
          </h1>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.7,
              color: '#9999BB',
              marginBottom: 12,
            }}
          >
            Your spot on the{' '}
            <strong style={{ color: '#E91E8C' }}>Vinyl &amp; Vibe-Along</strong>{' '}
            is confirmed.
          </p>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              color: '#9999BB',
              marginBottom: 40,
            }}
          >
            Check your inbox for a confirmation email with all the details.
            We can&apos;t wait to vibe with you!
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <Link
              href="/coming-soon"
              className="btn-primary"
              style={{ textDecoration: 'none', textAlign: 'center' }}
            >
              Back to Home
            </Link>
            <Link
              href="/quiz"
              className="btn-secondary"
              style={{ textDecoration: 'none', textAlign: 'center', color: 'inherit' }}
            >
              Take the Quiz
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '24px 40px',
          textAlign: 'center',
          fontSize: 12,
          color: '#5A5A72',
        }}
      >
        &copy; 2025 Jetpackers AI. All rights reserved.
      </footer>
    </div>
  )
}
