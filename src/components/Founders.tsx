'use client'

const founders = [
  {
    role: 'Co-Founder · Brisbane, Australia',
    name: 'Dr Shaan Mocke',
    bio: 'BVSc, MANZCVS Equine Dentistry, Postgrad Dip Animal Biomechanical Medicine. Founder of Vet Align (mobile equine). Before vet school, 25 years in tech — including a decade building knowledge management systems for a major commercial law firm.',
    tags: ['Equine Dentistry', 'Biomechanical Medicine', 'Knowledge Systems', 'Vibe Coding'],
  },
  {
    role: 'Co-Founder · New Zealand',
    name: 'Dr Deb Prattley',
    bio: 'Veterinarian, osteopath, and rehabilitation specialist. Co-founder of SD Vet Studio. Deep clinical expertise and a direct connection to the New Zealand veterinary community — including active engagement with the NZVA\'s newly forming AI committee.',
    tags: ['Rehabilitation', 'Osteopathy', 'Senior Dog Mobility', 'NZVA AI Committee'],
  },
]

export default function Founders() {
  return (
    <section
      id="about"
      style={{ padding: '7rem 4rem', maxWidth: '1100px', margin: '0 auto' }}
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
        Who We Are
      </div>

      <h2
        style={{
          fontFamily: 'var(--font-exo)',
          fontSize: 'clamp(1.6rem, 3vw, 2.6rem)',
          fontWeight: 800,
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          maxWidth: '700px',
          marginBottom: '1.5rem',
        }}
      >
        A friendship that started with{' '}
        <em style={{ fontStyle: 'italic', fontWeight: 300, color: '#06B6D4' }}>
          horses
        </em>{' '}
        — and became something more.
      </h2>

      <p
        style={{
          fontSize: '1.05rem',
          color: 'rgba(240,246,255,0.85)',
          maxWidth: '620px',
          lineHeight: 1.8,
          marginBottom: '3rem',
        }}
      >
        Back in 2013, Deb was treating Shaan&apos;s horses in Auckland when Shaan
        told her she wanted to go to veterinary school. At 41. Deb, a vet who had
        followed her own winding path, was one of the first people to hear that dream
        out loud.
        <br />
        <br />
        More than a decade later, both running solo practices on opposite sides of the
        Tasman, they started co-working over Zoom —{' '}
        <strong style={{ color: '#f0f6ff', fontWeight: 500 }}>
          because solo practice is lonely.
        </strong>{' '}
        They shared how they were each using AI in their businesses. Then they shared
        with a few other vets. The response was the same every time:{' '}
        <em style={{ color: '#f0f6ff' }}>this is exactly what we need.</em>
        <br />
        <br />
        So they decided to reach more people.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {founders.map((f) => (
          <div
            key={f.name}
            style={{
              background: 'rgba(15,32,64,0.7)',
              border: '1px solid rgba(6,182,212,0.12)',
              borderRadius: '8px',
              padding: '2.5rem',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(6,182,212,0.35)'
              e.currentTarget.style.transform = 'translateY(-4px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(6,182,212,0.12)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-exo)',
                fontSize: '0.62rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#06B6D4',
                marginBottom: '0.5rem',
              }}
            >
              {f.role}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-exo)',
                fontSize: '1.35rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                marginBottom: '1rem',
              }}
            >
              {f.name}
            </div>
            <p
              style={{
                fontSize: '0.88rem',
                color: 'rgba(240,246,255,0.82)',
                lineHeight: 1.72,
              }}
            >
              {f.bio}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.5rem' }}>
              {f.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'var(--font-exo)',
                    fontSize: '0.62rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#06B6D4',
                    background: 'rgba(6,182,212,0.12)',
                    padding: '0.28rem 0.65rem',
                    borderRadius: '2px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
