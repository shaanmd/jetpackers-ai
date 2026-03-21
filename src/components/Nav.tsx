'use client'

import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { href: '#what-we-do', label: 'What we do' },
  { href: '#nine-themes', label: 'Nine themes' },
  { href: '#products', label: 'Products' },
  { href: 'https://vetroute.com', label: 'VetRoute', external: true },
]

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Main bar */}
      <div
        className="flex items-center justify-between px-5 md:px-10"
        style={{ height: 64 }}
      >
        <Link
          href="/"
          className="exo"
          style={{
            fontWeight: 700,
            fontSize: 20,
            letterSpacing: '-0.5px',
            color: 'var(--dark)',
            textDecoration: 'none',
          }}
        >
          Syn<span style={{ color: 'var(--teal)' }}>AI</span>pseVet
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex" style={{ gap: 32 }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="nav-link"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Desktop CTA */}
          <a
            href="https://vetaihub.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden md:inline-block"
            style={{ fontSize: 13, padding: '9px 18px', textDecoration: 'none' }}
          >
            Follow on Substack
          </a>

          {/* Hamburger button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                display: 'block',
                width: 22,
                height: 2,
                background: 'var(--dark)',
                transition: 'transform 0.2s',
                transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: 22,
                height: 2,
                background: 'var(--dark)',
                transition: 'opacity 0.2s',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: 'block',
                width: 22,
                height: 2,
                background: 'var(--dark)',
                transition: 'transform 0.2s',
                transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="md:hidden"
          style={{
            background: 'rgba(255,255,255,0.98)',
            borderTop: '1px solid var(--border)',
            padding: '8px 20px 20px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="nav-link"
              style={{
                padding: '14px 0',
                borderBottom: '1px solid var(--border)',
                fontSize: 16,
              }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://vetaihub.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ textDecoration: 'none', marginTop: 16, textAlign: 'center' }}
            onClick={() => setMenuOpen(false)}
          >
            Follow on Substack
          </a>
        </div>
      )}
    </nav>
  )
}
