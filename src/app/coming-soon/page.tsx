'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { EmailCapture } from './EmailCapture'

const features = [
  '3 hours of live, hands-on AI learning',
  'Zero jargon — we speak real world, not Silicon Valley',
  'Real tools you can use at work or at home the next day',
  'Small group — we\'ll be building stuff together with you, not giving lectures',
  'Replay included so you can revisit anytime',
]

export default function ComingSoonPage() {
  return (
    <div
      className="min-h-screen synthwave-grid"
      style={{ background: 'var(--bg)', color: '#F0ECF8' }}
    >
      {/* Ambient glow orbs */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: '-120px',
          right: '-80px',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(107,33,168,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          bottom: '-100px',
          left: '-60px',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <main
        className="relative mx-auto flex min-h-screen max-w-2xl flex-col px-5 pb-16 pt-10 md:px-10 md:pt-14"
        style={{ zIndex: 1 }}
      >
        {/* Top bar */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="orbitron text-sm font-bold tracking-widest" style={{ color: '#F0ECF8' }}>
            <span style={{ color: 'var(--pink)' }}>Jetpackers</span>
            <span style={{ color: 'var(--teal)' }}>AI</span>
          </div>
          <span
            className="orbitron inline-flex w-fit items-center rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
            style={{
              border: '1.5px solid var(--pink)',
              background: 'rgba(236,72,153,0.1)',
              color: 'var(--pink)',
              letterSpacing: '0.2em',
            }}
          >
            Join the Waitlist
          </span>
        </div>

        {/* Hero */}
        <section className="flex flex-1 flex-col">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.28em]"
            style={{ color: 'var(--teal)' }}
          >
            AI Education to Ignite Gen X Women
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="orbitron mb-5"
            style={{
              fontSize: 'clamp(1.6rem, 4.5vw, 2.4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            They Promised Us{' '}
            <span
              style={{
                color: 'var(--pink)',
                textShadow: '0 0 24px rgba(236,72,153,0.5)',
              }}
            >
              Jetpacks.
            </span>
            <br />
            <span style={{ color: 'var(--teal)' }}>We got AI instead.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-6 text-[16px] leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            We were promised jetpacks, flying cars, robot assistants. We got AI.{' '}
            <span style={{ color: '#F0ECF8', fontWeight: 500 }}>
              Turns out, it&apos;s better.
            </span>{' '}
            Dr Deb &amp; Dr Shaan teach Gen X women to use the tools everyone&apos;s
            talking about — no 22-year-old bro energy required.
          </motion.p>

          {/* Vibe-A-Long course card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="mb-6 rounded-2xl p-5 md:p-6"
            style={{
              background: 'var(--bg-card)',
              border: '1.5px solid rgba(236,72,153,0.35)',
              boxShadow: '0 0 40px rgba(236,72,153,0.08)',
            }}
          >
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span
                className="orbitron rounded px-2 py-1 text-[10px] font-bold uppercase tracking-widest"
                style={{ background: 'rgba(236,72,153,0.15)', color: 'var(--pink)' }}
              >
                Waitlist Open
              </span>
              <span
                className="rounded px-2 py-1 text-[10px] font-semibold uppercase tracking-widest"
                style={{ background: 'rgba(13,148,136,0.15)', color: 'var(--teal)' }}
              >
                Weekend Session · Date TBA
              </span>
            </div>

            <h2
              className="orbitron mb-1"
              style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', fontWeight: 700, color: '#F0ECF8' }}
            >
              Vibe-A-Long
            </h2>
            <p className="mb-4 text-[13px]" style={{ color: 'var(--text-muted)' }}>
              A 3-hour live session with Dr Shaan &amp; Dr Deb — build real AI skills in a single weekend session.
            </p>

            <ul className="mb-4 space-y-2">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-[13px]" style={{ color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--teal)', marginTop: 1, flexShrink: 0 }}>→</span>
                  {f}
                </li>
              ))}
            </ul>

            <div
              className="rounded-xl p-4"
              style={{ background: 'rgba(107,33,168,0.15)', border: '1px solid rgba(107,33,168,0.3)' }}
            >
              <p className="mb-1 text-[12px] font-semibold uppercase tracking-widest" style={{ color: 'var(--teal)' }}>
                Reserve your spot
              </p>
              <p className="text-[13px]" style={{ color: 'var(--text-muted)' }}>
                Date and time dropping soon. Join the list and we&apos;ll email you the moment it&apos;s live — early birds get first access and best pricing.
              </p>
            </div>
          </motion.div>

          {/* Email capture */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <EmailCapture />
            <p className="mt-3 text-[11px]" style={{ color: 'var(--text-footer)' }}>
              No spam. You&apos;ll hear from us with AI tips, tools, early access, and updates from the Jetpackers community.
            </p>
          </motion.div>

          {/* Quiz CTA */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.48 }}
            className="mt-5 rounded-xl p-4 md:p-5"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid rgba(107,33,168,0.4)',
            }}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-widest" style={{ color: '#C084FC' }}>
                  Not sure where to start?
                </p>
                <p className="text-[14px] font-semibold" style={{ color: '#F0ECF8' }}>
                  Find out what kind of AI woman you are 🎬
                </p>
                <p className="mt-0.5 text-[12px]" style={{ color: 'var(--text-muted)' }}>
                  7 questions. Breakfast Club meets The Jetsons. Free.
                </p>
              </div>
              <Link
                href="/quiz"
                className="orbitron shrink-0 rounded-lg px-4 py-2.5 text-center text-[12px] font-bold uppercase tracking-widest transition-all"
                style={{
                  background: 'rgba(192,132,252,0.15)',
                  border: '1.5px solid #C084FC',
                  color: '#C084FC',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                Take the Quiz →
              </Link>
            </div>
          </motion.div>

          {/* About strip */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-8 rounded-xl p-4 md:p-5"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
            }}
          >
            <p
              className="mb-3 text-[11px] font-semibold uppercase tracking-widest"
              style={{ color: 'var(--teal)' }}
            >
              Who we are
            </p>
            <p className="mb-3 text-[13px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Two Gen X women. We happen to be vets, but we&apos;re primarily experts in figuring things out.
              We lived through the analog-to-digital morph, and we&apos;re doing it again with AI.
              This isn&apos;t for the generation that grew up with an iPad — it&apos;s for those of us who remember
              the pre-internet world and are developing the wrinkles to prove we can conquer what&apos;s next.
            </p>
            <p className="mb-3 text-[13px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              The AI conversation is dominated by people who weren&apos;t alive when Top Gun came out the{' '}
              <em style={{ color: '#F0ECF8' }}>first</em> time.{' '}
              <span style={{ color: '#F0ECF8', fontWeight: 500 }}>We built this for women like us.</span>
            </p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:gap-6">
              {[
                { initials: 'DS', name: 'Dr Shaan Mocke', role: 'Vet · Small Business Owner · Early Adopter' },
                { initials: 'DD', name: 'Dr Deb Prattley', role: 'Vet · Small Business Owner · Early Adopter' },
              ].map((f) => (
                <div key={f.name} className="flex items-center gap-2.5">
                  <div
                    className="flex items-center justify-center rounded-full text-[11px] font-bold"
                    style={{
                      width: 36,
                      height: 36,
                      flexShrink: 0,
                      background: 'rgba(107,33,168,0.25)',
                      border: '1.5px solid var(--purple)',
                      color: '#C084FC',
                    }}
                  >
                    {f.initials}
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold" style={{ color: '#F0ECF8' }}>{f.name}</div>
                    <div className="text-[11px]" style={{ color: 'var(--text-footer)' }}>{f.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer
          className="mt-10 flex flex-col items-start justify-between gap-3 pt-4 text-[11px] sm:flex-row sm:items-center"
          style={{ borderTop: '1px solid var(--border)', color: 'var(--text-footer)' }}
        >
          <p>
            <span style={{ color: 'var(--pink)' }}>They Promised Us Jetpacks</span>{' '}
            · AI Education to Ignite Gen X Women
          </p>
          <p>Dr Shaan Mocke &amp; Dr Deb Prattley</p>
          <div className="flex gap-4">
            <a href="/privacy" className="footer-link">Privacy</a>
            <a href="/terms" className="footer-link">Terms</a>
          </div>
        </footer>
      </main>
    </div>
  )
}
