'use client'

const products = [
  {
    tag: 'TOOLKIT',
    name: 'Vet AI Starter Kit',
    price: '$17',
    desc: '10 prompts, a clinic workflow, and your first vibe-coded tool. Everything a busy vet needs to start using AI tomorrow.',
    cta: 'Buy now',
    highlight: true,
    href: undefined,
  },
  {
    tag: 'RESOURCE',
    name: 'Veterinary Practice Handbook',
    price: 'Free',
    desc: 'A practical guide to AI implementation for vet practices. No jargon.',
    cta: 'Download free',
    highlight: false,
    href: undefined,
  },
  {
    tag: 'COURSE',
    name: 'Senior Dog Mobility Course',
    price: 'Coming soon',
    desc: '6-week online programme by Dr Deb and Dr Shaan. Evidence-based canine rehab.',
    cta: 'Join waitlist',
    highlight: false,
    href: undefined,
  },
  {
    tag: 'APP',
    name: 'Canine CCL App',
    price: 'Free beta',
    desc: '12-week post-surgery rehab guide with daily checklists and vet alerts.',
    cta: 'Try it free',
    highlight: false,
    href: undefined,
  },
  {
    tag: 'TOOL',
    name: 'VetRoute',
    price: 'Free',
    desc: 'Plan and share referral routes with your team and colleagues. Replace with your one-sentence description.',
    cta: 'Try VetRoute',
    highlight: false,
    href: 'https://vetroute.com',
  },
]

export default function Products() {
  return (
    <div
      id="products"
      className="mx-auto px-5 md:px-10 py-16 md:py-20"
      style={{ maxWidth: 1100 }}
    >
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
        Built for our own practices first
      </p>
      <div
        className="flex flex-col md:flex-row md:justify-between md:items-end gap-5 md:gap-6"
        style={{ marginBottom: 48 }}
      >
        <h2
          className="exo"
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: '-0.5px',
            color: 'var(--dark)',
          }}
        >
          We built everything
          <br />
          for ourselves first.
        </h2>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.7,
            color: 'var(--text-muted)',
            fontWeight: 300,
            maxWidth: 400,
          }}
        >
          Every product comes from a real problem we had in practice. If it works for
          us, it will work for you.
        </p>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ gap: 20 }}
      >
        {products.map((p) => (
          <div
            key={p.name}
            className={`product-card ${p.highlight ? 'highlight' : ''}`}
          >
            <span
              style={{
                display: 'inline-block',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: 'var(--teal)',
                background: 'var(--bg-teal-tint)',
                padding: '4px 10px',
                borderRadius: 4,
                marginBottom: 16,
                alignSelf: 'flex-start',
              }}
            >
              {p.tag}
            </span>
            {p.highlight && (
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: 'var(--teal)',
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                  marginBottom: 6,
                }}
              >
                Featured
              </div>
            )}
            <div
              className="exo"
              style={{
                fontSize: 21,
                fontWeight: 700,
                color: 'var(--dark)',
                marginBottom: 4,
              }}
            >
              {p.name}
            </div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--teal)',
                marginBottom: 14,
              }}
            >
              {p.price}
            </div>
            <div
              style={{
                fontSize: 14,
                lineHeight: 1.7,
                color: 'var(--text-muted)',
                marginBottom: 24,
                flex: 1,
              }}
            >
              {p.desc}
            </div>
            {p.href ? (
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="product-btn"
                style={{ textDecoration: 'none' }}
              >
                {p.cta}
              </a>
            ) : (
              <button type="button" className="product-btn">
                {p.cta}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
