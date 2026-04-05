export default function BuildAlong() {
  return (
    <section
      id="buildalong"
      className="px-5 md:px-10 py-16 md:py-20"
      style={{ background: 'var(--bg-warm)' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 2,
            color: 'var(--teal)',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}
        >
          LIVE WORKSHOP
        </p>
        <h2
          className="exo"
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: '-0.5px',
            color: 'var(--dark)',
            marginBottom: 20,
          }}
        >
          BuildAlong - build your first product live with us.
        </h2>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.7,
            color: 'var(--text-muted)',
            fontWeight: 300,
            maxWidth: 560,
            margin: '0 auto 36px',
          }}
        >
          A hands-on online workshop where we vibe code a real product together - a
          web app, a website, or an AI tool - in one session. No experience needed.
          Just show up and build.
        </p>
        <a
          href="https://buy.stripe.com/14AfZh7Lzd7q2Bja7m6EU00"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ display: 'inline-block', textDecoration: 'none' }}
        >
          Sign up now
        </a>
      </div>
    </section>
  )
}
