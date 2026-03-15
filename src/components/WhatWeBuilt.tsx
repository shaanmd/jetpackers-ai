'use client'

const products = [
  {
    status: 'Live · Private Beta',
    statusColor: '#06B6D4',
    title: 'VetRoute',
    desc: 'A standalone web app for mobile vets. Plot your appointments on a map, optimise your driving route, stop losing 40 minutes to inefficient scheduling. Built for Vet Align. Now in private beta.',
  },
  {
    status: 'Live',
    statusColor: '#4ade80',
    title: 'Veterinary Practice Handbook',
    desc: 'A living AI-assisted knowledge base for your practice. SOPs, protocols, onboarding materials — all in one place, always up to date. Because every law firm has an intranet. Vet practices never do.',
  },
  {
    status: 'In Development',
    statusColor: '#fbbf24',
    title: 'Senior Dog Mobility Course',
    desc: 'A 6-week online course for dog owners managing senior pet mobility. Built with Dr Deb\'s clinical expertise. Designed to give owners real tools, not just reassurance.',
  },
  {
    status: 'In Development',
    statusColor: '#fbbf24',
    title: 'Canine Cruciate Ligament App',
    desc: 'A decision-support tool for vets and owners navigating CCL diagnosis and treatment options. Evidence-based, clear, and built for real clinical conversations.',
  },
]

export default function WhatWeBuilt() {
  return (
    <section
      id="built"
      style={{
        padding: '7rem 4rem',
        maxWidth: '1100px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-exo)',
          fontSize: '0.68rem',
          fontWeight: 600,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#06B6D4',
          marginBottom: '1rem',
        }}
      >
        What We&apos;ve Built
      </div>

      <h2
        style={{
          fontFamily: 'var(--font-exo)',
          fontSize: 'clamp(1.6rem, 3vw, 2.6rem)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          maxWidth: '600px',
          marginBottom: '0.8rem',
        }}
      >
        We built everything for our own practices first.
      </h2>

      <p
        style={{
          fontSize: '0.95rem',
          color: 'rgba(240,246,255,0.78)',
          marginBottom: '3.5rem',
          maxWidth: '520px',
          lineHeight: 1.7,
        }}
      >
        If it works for us, we share it. That&apos;s the whole model.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {products.map((p) => (
          <div
            key={p.title}
            style={{
              background: 'rgba(15,32,64,0.5)',
              borderLeft: `3px solid ${p.statusColor}`,
              borderRadius: '0 6px 6px 0',
              border: '1px solid rgba(6,182,212,0.1)',
              borderLeftWidth: '3px',
              borderLeftColor: p.statusColor,
              padding: '2rem 2.5rem',
              display: 'grid',
              gridTemplateColumns: '1fr 3fr',
              gap: '2rem',
              alignItems: 'start',
              transition: 'all 0.25s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(15,32,64,0.85)'
              e.currentTarget.style.transform = 'translateX(4px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(15,32,64,0.5)'
              e.currentTarget.style.transform = 'translateX(0)'
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-exo)',
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: p.statusColor,
                  marginBottom: '0.5rem',
                }}
              >
                {p.status}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-exo)',
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  letterSpacing: '-0.01em',
                }}
              >
                {p.title}
              </div>
            </div>
            <p
              style={{
                fontSize: '0.88rem',
                color: 'rgba(240,246,255,0.80)',
                lineHeight: 1.72,
                margin: 0,
              }}
            >
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
