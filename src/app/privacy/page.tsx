import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Jetpackers AI',
  description: 'Jetpackers AI privacy policy. How we collect, use, and protect your information.',
}

export default function PrivacyPage() {
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
            color: 'var(--text-primary)',
            letterSpacing: '-0.5px',
            marginBottom: 8,
          }}
        >
          Privacy Policy
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-footer)', marginBottom: 40 }}>
          Last updated: March 2026
        </p>

        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: 16 }}>
          Jetpackers AI (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your
          privacy. This policy explains how we collect, use, disclose, and safeguard your
          information when you use our website at jetpackersai.com and related services.
        </p>

        <h2
          id="information-we-collect"
          className="orbitron"
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginTop: 40,
            marginBottom: 12,
          }}
        >
          Information we collect
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: 16 }}>
          We may collect information that you provide directly to us, including:
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
          <li>Name and email address when you subscribe to our newsletter or join a waitlist</li>
          <li>Any information you submit via contact forms or when you sign up for workshops or
            products</li>
          <li>Communications you send to us</li>
        </ul>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: 16 }}>
          We may also automatically collect certain information when you visit our website, such as
          your IP address, browser type, device type, and pages visited. We may use cookies and
          similar technologies for this purpose (see Cookies below).
        </p>

        <h2
          id="how-we-use-your-information"
          className="orbitron"
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginTop: 40,
            marginBottom: 12,
          }}
        >
          How we use your information
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: 16 }}>
          We use the information we collect to:
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
          <li>Send you newsletters, updates, and marketing communications (where you have opted in)</li>
          <li>Respond to your enquiries and provide support</li>
          <li>Improve our website, content, and services</li>
          <li>Comply with legal obligations and protect our rights</li>
        </ul>

        <h2
          id="cookies"
          className="orbitron"
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginTop: 40,
            marginBottom: 12,
          }}
        >
          Cookies
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: 16 }}>
          We use cookies and similar technologies to remember your preferences (including cookie
          consent), to understand how you use our site, and to improve your experience. You can
          control or delete cookies through your browser settings. Refusing cookies may affect how
          the website works for you.
        </p>

        <h2
          className="orbitron"
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginTop: 40,
            marginBottom: 12,
          }}
        >
          Sharing your information
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: 16 }}>
          We do not sell your personal information. We may share your information with trusted
          service providers who assist us in operating our website and delivering services (e.g.
          email delivery, analytics). We require these parties to protect your information and use
          it only for the purposes we specify. We may also disclose information where required by
          law or to protect our rights and safety.
        </p>

        <h2
          className="orbitron"
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginTop: 40,
            marginBottom: 12,
          }}
        >
          Data retention and security
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: 16 }}>
          We retain your information only for as long as necessary to fulfil the purposes set out
          in this policy or as required by law. We take reasonable technical and organisational
          measures to protect your personal information against unauthorised access, loss, or
          misuse.
        </p>

        <h2
          className="orbitron"
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginTop: 40,
            marginBottom: 12,
          }}
        >
          Your rights
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: 16 }}>
          Depending on your location, you may have the right to access, correct, or delete your
          personal information, or to object to or restrict certain processing. You can unsubscribe
          from our emails at any time using the link in each email. For other requests, please
          contact us using the details below.
        </p>

        <h2
          className="orbitron"
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginTop: 40,
            marginBottom: 12,
          }}
        >
          Changes to this policy
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: 16 }}>
          We may update this privacy policy from time to time. We will post the updated version on
          this page and update the &quot;Last updated&quot; date. Your continued use of our
          website after changes constitutes acceptance of the updated policy.
        </p>

        <h2
          className="orbitron"
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginTop: 40,
            marginBottom: 12,
          }}
        >
          Contact
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: 16 }}>
          For questions about this privacy policy or our data practices, contact us at Jetpackers AI
          (Shaan Mocke & Deb Prattley) via our website or Substack at{' '}
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
