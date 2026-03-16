'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      className="px-5 md:px-10 py-7 flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left"
      style={{ borderTop: '1px solid var(--border)', color: 'var(--text-footer)' }}
    >
      <Link
        href="/"
        className="orbitron"
        style={{
          fontWeight: 700,
          fontSize: 15,
          color: '#F0ECF8',
          textDecoration: 'none',
          letterSpacing: '0.05em',
        }}
      >
        <span style={{ color: 'var(--pink)' }}>JETPACKERS</span>
        <span style={{ color: 'var(--teal)' }}>.AI</span>
      </Link>
      <div style={{ fontSize: 12 }}>
        © 2026 They Promised Us Jetpacks · Shaan Mocke &amp; Deb Prattley
      </div>
      <div style={{ display: 'flex', gap: 20 }}>
        <Link href="/privacy" className="footer-link">
          Privacy
        </Link>
        <Link href="/terms" className="footer-link">
          Terms
        </Link>
      </div>
    </footer>
  )
}
