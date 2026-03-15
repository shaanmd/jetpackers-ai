export default function MissionQuote() {
  return (
    <section
      style={{
        padding: '6rem 4rem',
        background: 'linear-gradient(135deg, rgba(6,182,212,0.06) 0%, transparent 60%)',
        borderTop: '1px solid rgba(6,182,212,0.1)',
        borderBottom: '1px solid rgba(6,182,212,0.1)',
      }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
        <p
          style={{
            fontFamily: 'var(--font-exo)',
            fontSize: 'clamp(1.4rem, 3.2vw, 2.6rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            lineHeight: 1.38,
            letterSpacing: '-0.01em',
            color: '#f0f6ff',
            marginBottom: '2rem',
          }}
        >
          &ldquo;We want vets to{' '}
          <strong style={{ fontWeight: 800, fontStyle: 'normal', color: '#06B6D4' }}>
            leave on time
          </strong>
          , to have a{' '}
          <strong style={{ fontWeight: 800, fontStyle: 'normal', color: '#06B6D4' }}>
            second brain
          </strong>
          , to{' '}
          <strong style={{ fontWeight: 800, fontStyle: 'normal', color: '#06B6D4' }}>
            love their jobs again
          </strong>
          . If we can help even a few people do that — our job is done. If we can help more, we would be so happy.&rdquo;
        </p>
        <div
          style={{
            fontSize: '0.75rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(240,246,255,0.70)',
          }}
        >
          Dr Shaan &amp; Dr Deb · SynAIpseVet
        </div>
      </div>
    </section>
  )
}
