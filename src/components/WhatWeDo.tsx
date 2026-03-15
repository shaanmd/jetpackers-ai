'use client'

export default function WhatWeDo() {
  return (
    <section
      id="what-we-do"
      className="mx-auto px-5 md:px-10 py-10 md:py-12"
      style={{
        maxWidth: 1100,
        borderBottom: '1px solid var(--border)',
      }}
    >
      <p
        style={{
          fontSize: 15,
          lineHeight: 1.7,
          color: 'var(--text-muted)',
          fontWeight: 300,
          textAlign: 'center',
          maxWidth: 560,
          margin: '0 auto',
        }}
      >
        We create free, practical AI education for vets — no theory, no jargon. Everything we share is something you can use this week in your practice.
      </p>
    </section>
  )
}
