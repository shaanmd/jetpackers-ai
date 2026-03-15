import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Use | Jetpackers AI',
  description: 'Jetpackers AI terms of use. Rules and conditions for using our website and services.',
}

export default function TermsPage() {
  return (
    <main style={{ minHeight: '100vh' }}>
      <div
        style={{
          maxWidth: 720,
          margin: '0 auto',
          padding: '48px 24px 80px',
        }}
      >
        <Link
          href="/"
          className="footer-link"
          style={{ display: 'inline-block', marginBottom: 32, fontSize: 14 }}
        >
          ← Back to Jetpackers AI
        </Link>

        <h1
          className="orbitron"
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: '#F0ECF8',
            letterSpacing: '-0.5px',
            marginBottom: 8,
          }}
        >
          Terms of Use
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-footer)', marginBottom: 40 }}>
          Last updated: March 2026
        </p>

        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: 16 }}>
          Welcome to Jetpackers AI. These Terms of Use (&quot;Terms&quot;) govern your access to and
          use of the Jetpackers AI website and related services. By using our site, you agree to these
          Terms. If you do not agree, please do not use our website.
        </p>

        <h2
          className="orbitron"
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: '#F0ECF8',
            marginTop: 40,
            marginBottom: 12,
          }}
        >
          Use of the website
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: 16 }}>
          You may use our website for lawful purposes only. You agree not to:
        </p>
        <ul
          style={{
            listStyle: 'disc',
            paddingLeft: 24,
            fontSize: 15,
            lineHeight: 1.75,
            color: 'var(--text-muted)',
            marginBottom: 16,
          }}
        >
          <li>Use the site in any way that violates applicable laws or regulations</li>
          <li>Attempt to gain unauthorised access to our systems, other users&apos; accounts, or
            any data</li>
          <li>Transmit viruses, malware, or other harmful code</li>
          <li>Scrape, harvest, or collect data from the site by automated means without our
            permission</li>
          <li>Use the site to harass, defame, or harm others</li>
        </ul>

        <h2
          className="orbitron"
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: '#F0ECF8',
            marginTop: 40,
            marginBottom: 12,
          }}
        >
          Content and intellectual property
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: 16 }}>
          The content on this website (including text, graphics, logos, and design) is owned by
          Jetpackers AI or its licensors and is protected by copyright and other intellectual property
          laws. You may not copy, modify, distribute, or create derivative works from our content
          without our prior written consent. You may view and share links for personal,
          non-commercial use.
        </p>

        <h2
          className="orbitron"
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: '#F0ECF8',
            marginTop: 40,
            marginBottom: 12,
          }}
        >
          Products and services
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: 16 }}>
          Descriptions of products, courses, tools, and workshops on this site are for
          information only. Purchase or participation may be subject to additional terms and
          payment conditions. We reserve the right to modify, suspend, or discontinue any
          offering at any time.
        </p>

        <h2
          className="orbitron"
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: '#F0ECF8',
            marginTop: 40,
            marginBottom: 12,
          }}
        >
          Disclaimer
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: 16 }}>
          Our website and content are provided &quot;as is&quot;. We do not guarantee that the
          site will be uninterrupted, error-free, or free of viruses. The educational and
          professional content we provide is for general information and does not constitute
          veterinary, legal, or other professional advice. You should seek appropriate professional
          advice for your specific situation.
        </p>

        <h2
          className="orbitron"
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: '#F0ECF8',
            marginTop: 40,
            marginBottom: 12,
          }}
        >
          Limitation of liability
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: 16 }}>
          To the fullest extent permitted by law, Jetpackers AI and its founders shall not be liable
          for any indirect, incidental, special, consequential, or punitive damages, or any loss
          of profits or data, arising from your use of or inability to use our website or services.
          Our total liability shall not exceed the amount you have paid to us in the twelve months
          preceding the claim, if any.
        </p>

        <h2
          className="orbitron"
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: '#F0ECF8',
            marginTop: 40,
            marginBottom: 12,
          }}
        >
          Links to third parties
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: 16 }}>
          Our website may contain links to third-party sites (e.g. Substack, external tools). We
          are not responsible for the content or practices of those sites. Your use of
          third-party sites is at your own risk and subject to their terms and policies.
        </p>

        <h2
          className="orbitron"
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: '#F0ECF8',
            marginTop: 40,
            marginBottom: 12,
          }}
        >
          Changes to these terms
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: 16 }}>
          We may update these Terms from time to time. We will post the updated version on this
          page and update the &quot;Last updated&quot; date. Your continued use of the website
          after changes constitutes acceptance of the updated Terms.
        </p>

        <h2
          className="orbitron"
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: '#F0ECF8',
            marginTop: 40,
            marginBottom: 12,
          }}
        >
          Governing law and contact
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: 16 }}>
          These Terms are governed by the laws of New Zealand. For any questions about these
          Terms, please contact Jetpackers AI (Dr Shaan Mocke & Dr Deb Prattley) via our website or
          Substack at{' '}
          <a
            href="https://vetaihub.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            style={{ color: 'var(--teal)' }}
          >
            vetaihub.substack.com
          </a>
          .
        </p>
      </div>
    </main>
  )
}
