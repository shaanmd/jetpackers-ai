'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { EmailCapture } from './EmailCapture'

const struggles = [
  'AI lies, hallucinates and steals your stuff',
  "It writes so badly everyone will know you didn't write it yourself",
  'The whole thing feels fake',
  "Buuuut you'd secretly like to try it and have no idea where to start",
]

const features = [
  '3 hours of live, hands-on AI learning',
  'Zero jargon — we speak real world, not Silicon Valley',
  'Real tools you can use at work or at home the next day',
  'Small group — we\'ll be building stuff together with you, not giving lectures',
  'Replay included so you can revisit anytime',
]

const steps = [
  {
    title: 'Take the Quiz',
    desc: 'Find out your AI persona and grab your spot on the Vinyl & Vibe-Along waitlist.',
  },
  {
    title: 'Join the Waitlist',
    desc: "We'll save your spot and keep you posted on when the next Vinyl & Vibe-Along opens up.",
  },
  {
    title: 'Start Learning',
    desc: "We'll add you to our newsletter, recommend our favourite AI software and send some easy tips to get you started straight away.",
  },
]

export default function ComingSoonPage() {
  return (
    <div
      className="min-h-screen synthwave-grid"
      style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}
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
          background: 'radial-gradient(circle, rgba(107,33,168,0.07) 0%, transparent 70%)',
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
          background: 'radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)',
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
          <div className="orbitron text-sm font-bold tracking-widest" style={{ color: 'var(--text-primary)' }}>
            <span style={{ color: 'var(--pink)' }}>Jetpackers</span>
            <span style={{ color: 'var(--teal)' }}>AI</span>
          </div>
          <Link
            href="/quiz"
            className="orbitron inline-flex w-fit items-center rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
            style={{
              border: '1.5px solid var(--pink)',
              background: 'rgba(236,72,153,0.08)',
              color: 'var(--pink)',
              letterSpacing: '0.2em',
              textDecoration: 'none',
            }}
          >
            Take the Quiz
          </Link>
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
            AI Education for Gen X Women
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
            AI{' '}
            <span
              style={{
                color: 'var(--pink)',
                textShadow: '0 0 20px rgba(236,72,153,0.25)',
              }}
            >
              Curious?
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-3 text-[16px] leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            Come and hang out with other Gen X women who want to have fun learning AI.
            Dig out your Abba LP and your legwarmers, and we&apos;ll take you from complete
            beginner to confident vibe coder.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 text-[14px] italic"
            style={{ color: 'var(--teal)' }}
          >
            Curious enough to ask questions. Brave enough to press the buttons.
          </motion.p>

          {/* Proof strip */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="mb-6 flex flex-col gap-2 rounded-xl p-4"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
            }}
          >
            {[
              'Catch up to the latest tech without having to be techie',
              'Join other Gen X women in a supportive AI learning space',
              'Have a bunch of laughs doing it',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-[14px]" style={{ color: 'var(--text-primary)' }}>
                <span style={{ color: 'var(--teal)', flexShrink: 0 }}>✓</span>
                {item}
              </div>
            ))}
          </motion.div>

          {/* Newsletter note + Email capture */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mb-6 rounded-xl p-4 md:p-5"
            style={{
              background: 'rgba(13,148,136,0.04)',
              border: '1px solid rgba(13,148,136,0.15)',
            }}
          >
            <p className="mb-4 text-[14px] leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              Take the quiz and you&apos;ll be signed up for our free newsletter: AI basics, real examples, and new tools straight to your inbox.
            </p>
            <Link
              href="/quiz"
              className="inline-block rounded-md px-5 py-2.5 text-sm font-semibold transition-all"
              style={{
                background: 'var(--pink)',
                color: 'white',
                textDecoration: 'none',
                boxShadow: '0 0 16px rgba(236,72,153,0.2)',
              }}
            >
              Take the Quiz
            </Link>
          </motion.div>

          {/* Sound familiar? */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mb-6 rounded-xl p-5 md:p-6"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
            }}
          >
            <h2
              className="orbitron mb-4"
              style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', fontWeight: 700 }}
            >
              Sound familiar?
            </h2>
            <ul className="space-y-3">
              {struggles.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-3 text-[14px] leading-relaxed"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: 'var(--pink)',
                      flexShrink: 0,
                      marginTop: 6,
                    }}
                  />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Stakes */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.38 }}
            className="mb-6 rounded-xl p-5 text-center"
            style={{
              background: 'rgba(107,33,168,0.06)',
              border: '1px solid rgba(107,33,168,0.15)',
            }}
          >
            <p className="text-[15px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              AI is here to stay. It&apos;s not up to taking over the world yet, but it&apos;s not going anywhere.{' '}
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                Instead of feeling left behind, pour a glass of wine (or top up your HRT) and let us help you catch up.
              </span>
            </p>
          </motion.div>

          {/* Two ways to get started */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-6"
          >
            <p
              className="mb-2 text-[11px] font-semibold uppercase tracking-widest"
              style={{ color: 'var(--teal)' }}
            >
              Here&apos;s what we&apos;ve got for you
            </p>
            <h2
              className="orbitron mb-4"
              style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', fontWeight: 700 }}
            >
              Two ways to get started
            </h2>

            <div className="flex flex-col gap-4">
              {/* Vinyl & Vibe-Along card */}
              <div
                className="rounded-xl p-5"
                style={{
                  background: 'var(--bg-card)',
                  border: '1.5px solid rgba(236,72,153,0.25)',
                  boxShadow: '0 2px 16px rgba(236,72,153,0.06)',
                }}
              >
                <h3
                  className="orbitron mb-2"
                  style={{ fontSize: '1.1rem', fontWeight: 700 }}
                >
                  Vinyl &amp; Vibe-Along
                </h3>
                <p className="mb-3 text-[14px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  A small group of women dig out their favourite background albums, get together online
                  and we show you the ropes. You&apos;ll be surprised at how easy it is to build cool
                  and useful stuff in a really short time.
                </p>
                <p className="mb-3 text-[13px] italic" style={{ color: 'var(--pink)' }}>
                  You&apos;ll get the vibes, promise.
                </p>
                <span
                  className="orbitron inline-block rounded px-3 py-1 text-[12px] font-bold"
                  style={{ background: 'rgba(236,72,153,0.08)', color: 'var(--pink)' }}
                >
                  $67 NZD · 6 spots only
                </span>
              </div>

              {/* Newsletter card */}
              <div
                className="rounded-xl p-5"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                }}
              >
                <h3
                  className="orbitron mb-2"
                  style={{ fontSize: '1.1rem', fontWeight: 700 }}
                >
                  The Newsletter
                </h3>
                <p className="mb-3 text-[14px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  We explain the AI basics, show examples of what it can do, and help you keep up to speed with new tricks and tools.
                </p>
                <p className="mb-3 text-[13px] italic" style={{ color: 'var(--pink)' }}>
                  Great with your morning coffee.
                </p>
                <span
                  className="orbitron inline-block rounded px-3 py-1 text-[12px] font-bold"
                  style={{ background: 'rgba(13,148,136,0.08)', color: 'var(--teal)' }}
                >
                  Free
                </span>
              </div>
            </div>
          </motion.div>

          {/* We get it */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.42 }}
            className="mb-6 rounded-xl p-5 md:p-6"
            style={{
              background: 'rgba(107,33,168,0.04)',
              border: '1px solid rgba(107,33,168,0.15)',
            }}
          >
            <p
              className="mb-2 text-[11px] font-semibold uppercase tracking-widest"
              style={{ color: 'var(--teal)' }}
            >
              We get it
            </p>
            <h2
              className="orbitron mb-4"
              style={{ fontSize: 'clamp(1.1rem, 3vw, 1.3rem)', fontWeight: 700 }}
            >
              We&apos;ve been here before.
            </h2>
            <p className="mb-4 text-[14px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              When we were growing up we had cassette tapes (wound back in with pencils when they
              went haywire) and the VHS. A walkman was cool. Mobile phones and computers were on a
              futuristic par with those jetpacks they promised us. Well, we got AI instead. And while
              it seems overwhelming, when you look back we&apos;ve made it through a whole lot of
              different technological advances, and this is just the latest one. We can do this too.
            </p>
            <div
              className="rounded-lg p-4"
              style={{
                background: 'rgba(13,148,136,0.04)',
                borderLeft: '3px solid var(--teal)',
              }}
            >
              <p className="text-[14px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Shaan was a web designer and teacher of coding in a previous life. Now she&apos;s an
                avid AI user (and a vet!) who can whip up cool apps in a blink. Deb (also a vet)
                learned coding basics at the turn of the century and is more tech friendly than tech
                pro, but she tries out all the tools to find out just how much a normal person can do.
              </p>
            </div>
          </motion.div>

          {/* Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.44 }}
            className="mb-6"
          >
            <p
              className="mb-2 text-[11px] font-semibold uppercase tracking-widest"
              style={{ color: 'var(--teal)' }}
            >
              How much does it cost?
            </p>
            <h2
              className="orbitron mb-4"
              style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', fontWeight: 700 }}
            >
              Simple pricing
            </h2>

            <div className="flex flex-col gap-4">
              <div
                className="rounded-xl p-5"
                style={{
                  border: '2px solid var(--pink)',
                  background: 'var(--bg-card)',
                }}
              >
                <span
                  className="orbitron mb-2 inline-block rounded px-2 py-1 text-[10px] font-bold uppercase tracking-widest"
                  style={{ background: 'rgba(236,72,153,0.08)', color: 'var(--pink)' }}
                >
                  Introductory price
                </span>
                <h3
                  className="orbitron mb-1"
                  style={{ fontSize: '1.1rem', fontWeight: 700 }}
                >
                  Vinyl &amp; Vibe-Along
                </h3>
                <p
                  className="orbitron mb-3"
                  style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--pink)' }}
                >
                  $67 <span className="text-[14px] font-normal" style={{ color: 'var(--text-muted)' }}>NZD</span>
                </p>
                <p className="text-[14px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  A 3-hour online session, small group, max 6 people. We show you the ropes and you
                  build something useful. Vinyl grooves in the background.
                </p>
              </div>

              <div
                className="rounded-xl p-5"
                style={{
                  border: '1px solid var(--border)',
                  background: 'var(--bg-card)',
                }}
              >
                <h3
                  className="orbitron mb-1"
                  style={{ fontSize: '1.1rem', fontWeight: 700 }}
                >
                  The Newsletter
                </h3>
                <p
                  className="orbitron mb-3"
                  style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--teal)' }}
                >
                  Free
                </p>
                <p className="text-[14px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  AI basics, real examples, new tools and a few laughs.
                </p>
              </div>
            </div>
          </motion.div>

          {/* How it works */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.46 }}
            className="mb-6 rounded-xl p-5 md:p-6"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
            }}
          >
            <p
              className="mb-2 text-[11px] font-semibold uppercase tracking-widest"
              style={{ color: 'var(--teal)' }}
            >
              Getting started
            </p>
            <h2
              className="orbitron mb-5"
              style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', fontWeight: 700 }}
            >
              How it works
            </h2>
            <div className="space-y-5">
              {steps.map((step, i) => (
                <div key={step.title} className="flex items-start gap-4">
                  <div
                    className="orbitron flex items-center justify-center rounded-full text-[14px] font-bold"
                    style={{
                      width: 36,
                      height: 36,
                      flexShrink: 0,
                      background: 'var(--pink)',
                      color: 'white',
                    }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <h3
                      className="orbitron mb-1 text-[15px] font-bold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-[14px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Who we are */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.48 }}
            className="mb-6 rounded-xl p-4 md:p-5"
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
            <h2
              className="orbitron mb-3"
              style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', fontWeight: 700 }}
            >
              Two Gen X women who want to share the love.
            </h2>
            <p className="mb-3 text-[13px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Two Gen X women. We happen to be vets, but we&apos;re primarily experts in figuring things out.
              We lived through the analog-to-digital morph, and we&apos;re doing it again with AI.
              This isn&apos;t for the generation that grew up with an iPad, it&apos;s for those of us who remember
              the pre-internet world and are developing the wrinkles to prove we can conquer what&apos;s next.
            </p>
            <p className="mb-3 text-[13px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              We used to make websites the long way, learning HTML from big fat textbooks and typing
              into a scary looking terminal on a chunky IBM computer. Now we can whip up useful software
              tools like websites and apps, research in a jiffy and streamline our work tasks because
              we&apos;ve learned how to make AI work for us.
            </p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:gap-6">
              {[
                { initials: 'DS', name: 'Shaan Mocke', role: 'Vet · Small Business Owner · Early Adopter' },
                { initials: 'DD', name: 'Deb Prattley', role: 'Vet · Small Business Owner · Early Adopter' },
              ].map((f) => (
                <div key={f.name} className="flex items-center gap-2.5">
                  <div
                    className="flex items-center justify-center rounded-full text-[11px] font-bold"
                    style={{
                      width: 36,
                      height: 36,
                      flexShrink: 0,
                      background: 'rgba(107,33,168,0.08)',
                      border: '1.5px solid var(--purple)',
                      color: 'var(--purple)',
                    }}
                  >
                    {f.initials}
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold" style={{ color: 'var(--text-primary)' }}>{f.name}</div>
                    <div className="text-[11px]" style={{ color: 'var(--text-footer)' }}>{f.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quiz CTA */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="mb-6 rounded-xl p-4 md:p-5"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid rgba(107,33,168,0.2)',
            }}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-widest" style={{ color: 'var(--purple)' }}>
                  Not sure where to start?
                </p>
                <p className="text-[14px] font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Take our 2-minute quiz to find out your AI persona
                </p>
                <p className="mt-0.5 text-[12px]" style={{ color: 'var(--text-muted)' }}>
                  Get your mitts on our newsletter and join the Vinyl &amp; Vibe-Along waitlist.
                </p>
              </div>
              <Link
                href="/quiz"
                className="orbitron shrink-0 rounded-lg px-4 py-2.5 text-center text-[12px] font-bold uppercase tracking-widest transition-all"
                style={{
                  background: 'rgba(107,33,168,0.08)',
                  border: '1.5px solid var(--purple)',
                  color: 'var(--purple)',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                Take the Quiz →
              </Link>
            </div>
          </motion.div>

          {/* Email capture */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.52 }}
          >
            <EmailCapture />
            <p className="mt-3 text-[11px]" style={{ color: 'var(--text-footer)' }}>
              No spam. You&apos;ll hear from us with AI tips, tools, early access, and updates from the Jetpackers community.
            </p>
          </motion.div>
        </section>

        {/* SynAIpseVET callout */}
        <div
          className="mt-8 rounded-lg px-4 py-3 text-center text-[13px]"
          style={{ background: 'rgba(13,148,136,0.06)', border: '1px solid rgba(13,148,136,0.15)' }}
        >
          <span style={{ color: 'var(--text-muted)' }}>Work in the vet industry? We built something just for you. </span>
          <a
            href="https://synaipse.vet"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--teal)', fontWeight: 600, textDecoration: 'none' }}
          >
            SynAIpseVET
          </a>
          <span style={{ color: 'var(--text-muted)' }}> brings AI tools designed specifically for veterinary professionals.</span>
        </div>

        {/* Footer */}
        <footer
          className="mt-10 flex flex-col items-start justify-between gap-3 pt-4 text-[11px] sm:flex-row sm:items-center"
          style={{ borderTop: '1px solid var(--border)', color: 'var(--text-footer)' }}
        >
          <p>
            <span style={{ color: 'var(--pink)' }}>They Promised Us Jetpacks</span>{' '}
            · AI Education for Gen X Women
          </p>
          <p>Shaan &amp; Deb</p>
          <div className="flex gap-4">
            <a href="/privacy" className="footer-link">Privacy</a>
            <a href="/terms" className="footer-link">Terms</a>
          </div>
        </footer>
      </main>
    </div>
  )
}
