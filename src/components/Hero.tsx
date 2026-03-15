'use client'

const founders = [
  {
    initials: 'SM',
    name: 'Dr Shaan Mocke',
    role: 'Equine & Rehabilitation Vet · Vet Align',
  },
  {
    initials: 'DP',
    name: 'Dr Deb Prattley',
    role: 'Small Animal Vet · Practice Owner',
  },
]

export default function Hero() {
  return (
    <div
      id="about"
      className="mx-auto px-5 md:px-10 py-14 md:py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-16"
      style={{ maxWidth: 1100 }}
    >
      <div>
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 2,
            color: 'var(--teal)',
            textTransform: 'uppercase',
            marginBottom: 20,
          }}
        >
          AI education for veterinarians
        </p>
        <h1
          className="exo"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-1px',
            marginBottom: 24,
            color: 'var(--dark)',
          }}
        >
          Not experts.
          <br />
          Just two vets who use{' '}
          <em style={{ color: 'var(--teal)', fontStyle: 'italic' }}>AI every day</em>
          {' '}— and want to help you do the same.
        </h1>
        <p
          style={{
            fontSize: 17,
            lineHeight: 1.75,
            color: 'var(--text-muted)',
            marginBottom: 36,
            fontWeight: 300,
          }}
        >
          We are passionate about AI improving the lives of vets. Leaving on time,
          having a second brain, loving your job again. If we can help even a few
          people do that, our job is done.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="https://vetaihub.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ textDecoration: 'none', textAlign: 'center' }}
          >
            Follow on Substack — free
          </a>
          <a
            href="#about"
            className="btn-secondary"
            style={{ textDecoration: 'none', textAlign: 'center' }}
          >
            Our story
          </a>
        </div>
      </div>

      <div
        style={{
          background: 'var(--bg-warm)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: 36,
        }}
      >
        <p
          className="exo"
          style={{
            fontSize: 21,
            fontWeight: 600,
            lineHeight: 1.45,
            fontStyle: 'italic',
            color: 'var(--dark)',
            marginBottom: 28,
          }}
        >
          &quot;We want vets to <span style={{ color: 'var(--teal)' }}>leave on time</span>, to have a second brain, to{' '}
          <span style={{ color: 'var(--teal)' }}>love their jobs again</span>.&quot;
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {founders.map((f) => (
            <div
              key={f.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: 'var(--bg-teal-tint)',
                  border: '2px solid var(--teal)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-exo), sans-serif',
                  fontWeight: 700,
                  fontSize: 13,
                  color: 'var(--teal)',
                  flexShrink: 0,
                }}
              >
                {f.initials}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--dark)' }}>
                  {f.name}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-footer)', marginTop: 2 }}>
                  {f.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
