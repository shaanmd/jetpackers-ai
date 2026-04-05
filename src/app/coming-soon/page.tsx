'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useContact } from '@/hooks/useContact'

const outfit = "var(--font-outfit), 'Outfit', sans-serif"
const dmSans = "var(--font-dm), 'DM Sans', sans-serif"

function QuizCta({ center = true }: { center?: boolean }) {
  return (
    <div style={{ marginTop: 36, display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: center ? 'center' : 'flex-start' }}>
      <Link href="/quiz" className="btn-primary" style={{ textDecoration: 'none', textAlign: 'center' }}>
        Take Your AI Personality Quiz &rarr;
      </Link>
    </div>
  )
}

function SignUpCta({ center = true }: { center?: boolean }) {
  return (
    <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column' as const, alignItems: center ? 'center' : 'flex-start', gap: 12 }}>
      <p style={{ fontSize: 15, color: '#5A5A72', fontStyle: 'italic', margin: 0 }}>
        Ready to sign up now? Skip the quiz and grab your spot.
      </p>
      <Link
        href="/sign-up"
        className="btn-primary"
        style={{ textDecoration: 'none', textAlign: 'center' }}
      >
        Sign up for the Vibe-Along &rarr;
      </Link>
    </div>
  )
}

function FooterNewsletter() {
  const [email, setEmail] = useState('')
  const { submit, status } = useContact()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    await submit({ email, source: 'newsletter' })
  }

  if (status === 'success') {
    return (
      <p style={{ fontSize: 14, color: '#00D4AA', marginTop: 16 }}>
        You&apos;re in! Check your inbox.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 16, display: 'flex', gap: 8, maxWidth: 380 }} className="footer-newsletter">
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          flex: 1,
          padding: '10px 14px',
          borderRadius: 10,
          border: '1px solid rgba(255,255,255,0.15)',
          background: 'rgba(255,255,255,0.06)',
          color: 'white',
          fontSize: 14,
          outline: 'none',
          fontFamily: dmSans,
        }}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary"
        style={{ padding: '10px 20px', fontSize: 13, flexShrink: 0 }}
      >
        {status === 'loading' ? 'Joining\u2026' : 'Subscribe'}
      </button>
    </form>
  )
}

export default function ComingSoonPage() {
  return (
    <div style={{ fontFamily: dmSans, color: '#1A1A2E', background: '#F9F9FB' }}>
      {/* Nav */}
      <nav
        style={{
          background: '#1A1A2E',
          padding: '16px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ fontFamily: outfit, fontWeight: 800, fontSize: 22, color: 'white' }}>
          Jetpackers<span style={{ color: '#00D4AA' }}>AI</span>
        </div>
        <Link
          href="/quiz"
          className="btn-primary"
          style={{ padding: '10px 20px', fontSize: 14, textDecoration: 'none' }}
        >
          Take Your AI Personality Quiz &rarr;
        </Link>
      </nav>

      {/* Hero */}
      <section style={{ background: '#1A1A2E', padding: '80px 40px', textAlign: 'center' }}>
        <h1
          style={{
            fontFamily: outfit,
            fontWeight: 800,
            fontSize: 'clamp(52px, 8vw, 88px)',
            color: 'white',
            lineHeight: 1,
            marginBottom: 24,
          }}
        >
          AI <span style={{ color: '#E91E8C' }}>Curious?</span>
        </h1>
        <p
          style={{
            fontSize: 18,
            lineHeight: 1.7,
            color: '#9999BB',
            maxWidth: 620,
            margin: '0 auto 20px',
          }}
        >
          Come and hang out with other Gen X women who want to have fun learning AI. Dig out your
          Abba LP and your legwarmers, and we&apos;ll take you from complete beginner to confident
          vibe coder.
        </p>
        <p style={{ fontSize: 15, color: '#00D4AA', fontStyle: 'italic', marginBottom: 8 }}>
          Curious enough to ask questions. Brave enough to press the buttons.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
          <Link
            href="/quiz"
            className="btn-primary"
            style={{ textDecoration: 'none', textAlign: 'center', padding: '16px 32px', fontSize: 16 }}
          >
            Take Your AI Personality Quiz &rarr;
          </Link>
        </div>
      </section>

      {/* Proof strip */}
      <div
        style={{
          background: 'white',
          padding: '28px 40px',
          display: 'flex',
          justifyContent: 'center',
          gap: 48,
          flexWrap: 'wrap',
          borderBottom: '1px solid #E2E2ED',
        }}
      >
        {[
          'Catch up to the latest tech without having to be techie',
          'Join other Gen X women in a supportive AI learning space',
          'Have a bunch of laughs doing it',
        ].map((item) => (
          <div
            key={item}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 15,
              fontWeight: 500,
              color: '#1A1A2E',
            }}
          >
            <span style={{ color: '#00D4AA', fontSize: 18 }}>&#10003;</span>
            {item}
          </div>
        ))}
      </div>

      {/* Sound familiar */}
      <div style={{ background: '#F9F9FB' }}>
        <div style={{ padding: '72px 40px', maxWidth: 900, margin: '0 auto' }}>
          <div className="struggle-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>
            <div>
              <h2
                style={{
                  fontFamily: outfit,
                  fontWeight: 800,
                  fontSize: 'clamp(28px, 4vw, 40px)',
                  lineHeight: 1.2,
                }}
              >
                Sound familiar?
              </h2>
              <ul style={{ listStyle: 'none', marginTop: 24, padding: 0 }}>
                {[
                  'AI lies, hallucinates and steals your stuff',
                  "It writes so badly everyone will know you didn't write it yourself",
                  'The whole thing feels fake',
                  "Buuuut you'd secretly like to try it and have no idea where to start",
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      padding: '14px 0',
                      borderBottom: '1px solid #E2E2ED',
                      fontSize: 16,
                      lineHeight: 1.6,
                      color: '#1A1A2E',
                      paddingLeft: 24,
                      position: 'relative' as const,
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute' as const,
                        left: 0,
                        top: 22,
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: '#E91E8C',
                        display: 'inline-block',
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ borderRadius: 12, overflow: 'hidden', marginTop: 20 }}>
              <img
                src="/vibe-a-long.jpg"
                alt="Woman looking sceptically at a laptop with Vibe-Along bottle and JetpackersAI posters"
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 12 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stakes */}
      <div style={{ background: '#1A1A2E', padding: '48px 40px', textAlign: 'center' }}>
        <p
          style={{
            fontSize: 18,
            lineHeight: 1.8,
            color: '#9999BB',
            maxWidth: 660,
            margin: '0 auto',
          }}
        >
          AI is here to stay. It&apos;s not up to taking over the world yet, but it&apos;s not going
          anywhere.{' '}
          <strong style={{ color: 'white' }}>
            Instead of feeling left behind, pour a glass of wine (or top up your HRT) and let us
            help you catch up.
          </strong>
        </p>
      </div>

      {/* What you get */}
      <div style={{ background: 'white' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '72px 40px' }}>
          <h2
            style={{
              fontFamily: outfit,
              fontWeight: 800,
              fontSize: 'clamp(28px, 4vw, 40px)',
              marginBottom: 8,
            }}
          >
            Current Offers
          </h2>
          <div className="value-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 40 }}>
            <div
              style={{
                background: '#F9F9FB',
                border: '2px solid #E91E8C',
                borderRadius: 12,
                padding: 28,
              }}
            >
              <h3
                style={{
                  fontFamily: outfit,
                  fontWeight: 800,
                  fontSize: 20,
                  marginBottom: 10,
                  color: '#1A1A2E',
                }}
              >
                Vinyl &amp; Vibe-Along
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: '#5A5A72' }}>
                A small group of women dig out their favourite background albums, get together online
                and we show you the ropes. You&apos;ll be surprised at how easy it is to build cool
                and useful stuff in a really short time.
              </p>
              <p style={{ fontSize: 14, color: '#E91E8C', fontStyle: 'italic', marginTop: 10 }}>
                You&apos;ll get the vibes, promise.
              </p>
              <Link
                href="/sign-up"
                style={{
                  display: 'inline-block',
                  marginTop: 12,
                  background: '#E91E8C',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: 4,
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: outfit,
                  textDecoration: 'none',
                }}
              >
                Find Out More
              </Link>
            </div>
            <div
              style={{
                background: '#F9F9FB',
                border: '2px solid #00D4AA',
                borderRadius: 12,
                padding: 28,
              }}
            >
              <h3
                style={{
                  fontFamily: outfit,
                  fontWeight: 800,
                  fontSize: 20,
                  marginBottom: 10,
                  color: '#1A1A2E',
                }}
              >
                The Newsletter
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: '#5A5A72' }}>
                We explain the AI basics, show examples of what it can do, and help you keep up to
                speed with new tricks and tools.
              </p>
              <p style={{ fontSize: 14, color: '#E91E8C', fontStyle: 'italic', marginTop: 10 }}>
                Great with your morning coffee.
              </p>
              <a
                href="#newsletter"
                style={{
                  display: 'inline-block',
                  marginTop: 12,
                  background: '#00D4AA',
                  color: '#1A1A2E',
                  padding: '4px 12px',
                  borderRadius: 4,
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: outfit,
                  textDecoration: 'none',
                }}
              >
                Free - Sign Up Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* We get it */}
      <div style={{ background: '#1A1A2E' }}>
        <div style={{ padding: '72px 40px', maxWidth: 780, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: outfit,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 3,
              textTransform: 'uppercase' as const,
              color: '#00D4AA',
              marginBottom: 16,
            }}
          >
            We get it
          </div>
          <h2
            style={{
              fontFamily: outfit,
              fontWeight: 800,
              fontSize: 'clamp(28px, 4vw, 40px)',
              color: 'white',
              marginBottom: 24,
            }}
          >
            We&apos;ve been here before.
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.8,
              color: '#9999BB',
              marginBottom: 32,
            }}
          >
            When we were growing up we had cassette tapes (wound back in with pencils when they went
            haywire) and the VHS. A walkman was cool. Mobile phones and computers were on a futuristic
            par with those jetpacks they promised us. Well, we got AI instead. And while it seems
            overwhelming, when you look back we&apos;ve made it through a whole lot of different
            technological advances, and this is just the latest one. We can do this too.
          </p>
          <div
            style={{
              background: 'rgba(255,255,255,0.06)',
              borderLeft: '3px solid #00D4AA',
              borderRadius: '0 8px 8px 0',
              padding: '20px 24px',
              fontSize: 15,
              lineHeight: 1.7,
              color: '#CCCCDD',
              marginBottom: 32,
            }}
          >
            Shaan was a web designer and teacher of coding in a previous life. Now she&apos;s an avid
            AI user (and a vet!) who can whip up cool apps in a blink. Deb (also a vet) learned
            coding basics at the turn of the century and is more tech friendly than tech pro, but she
            tries out all the tools to find out just how much a normal person can do.
          </div>
          <QuizCta />
        </div>
      </div>

      {/* Video */}
      <div style={{ background: '#F9F9FB', padding: '72px 40px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' as const }}>
          <div
            style={{
              fontFamily: outfit,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 3,
              textTransform: 'uppercase' as const,
              color: '#00D4AA',
              marginBottom: 16,
            }}
          >
            See what it&apos;s all about
          </div>
          <h2
            style={{
              fontFamily: outfit,
              fontWeight: 800,
              fontSize: 'clamp(28px, 4vw, 40px)',
              marginBottom: 32,
            }}
          >
            Watch us in action
          </h2>
          <div
            style={{
              position: 'relative' as const,
              paddingBottom: '56.25%',
              height: 0,
              overflow: 'hidden',
              borderRadius: 12,
              boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/qsR98PwFvtM"
              title="Jetpackers AI"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute' as const,
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: 12,
              }}
            />
          </div>
        </div>
      </div>

      {/* How it works */}
      <div style={{ background: '#F9F9FB' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '72px 40px' }}>
          <div
            style={{
              fontFamily: outfit,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 3,
              textTransform: 'uppercase' as const,
              color: '#00D4AA',
              marginBottom: 16,
            }}
          >
            Getting started
          </div>
          <h2
            style={{
              fontFamily: outfit,
              fontWeight: 800,
              fontSize: 'clamp(28px, 4vw, 40px)',
              marginBottom: 8,
            }}
          >
            How it works
          </h2>
          <div style={{ marginTop: 40 }}>
            {[
              {
                title: 'Take the Quiz',
                desc: 'Find out your AI persona and we will sign you up to our FREE newsletter.',
              },
              {
                title: 'Join the Vinyl & Vibe-Along',
                desc: "Our next session is 12th April where we take you from zero to hero - you'll get to vibe code your own web app.",
              },
              {
                title: 'Keep Learning',
                desc: "Our newsletter will keep you up to date with our favourite AI software and what you can do with it. And coming soon we have a Bust-Your-Bills session where we'll show you how we've plugged our money leaks and saved $$ with AI.",
              },
            ].map((step, i) => (
              <div
                key={step.title}
                style={{
                  display: 'flex',
                  gap: 24,
                  marginBottom: 40,
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #EC4899 0%, #A855F7 100%)',
                    color: 'white',
                    fontFamily: outfit,
                    fontWeight: 800,
                    fontSize: 18,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: outfit,
                      fontWeight: 800,
                      fontSize: 18,
                      color: '#1A1A2E',
                      marginBottom: 6,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: '#5A5A72' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quiz intro teaser */}
      <div style={{ background: '#F9F9FB', padding: '64px 40px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ fontFamily: outfit, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' as const, color: '#00D4AA', marginBottom: 16 }}>
            Vibe Check &middot; 7 Questions
          </div>
          <h2 style={{ fontFamily: outfit, fontWeight: 800, fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.15, marginBottom: 20 }}>
            Is AI Your New Bestie{' '}
            <span style={{ background: 'linear-gradient(135deg, #EC4899 0%, #A855F7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              or a Total Narcissist?
            </span>
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: '#5A5A72', marginBottom: 24 }}>
            Breakfast Club meets The Jetsons. Seven questions to find out what kind of AI woman you really are - complete with your very own 80s/90s spirit guide. No wrong answers. Results that tell you something useful.
          </p>
          <div style={{ background: 'white', border: '1px solid #E2E2ED', borderRadius: 10, padding: '16px 20px', marginBottom: 28, fontSize: 14, lineHeight: 1.7, color: '#1A1A2E' }}>
            🎬 <strong>Did you know?</strong> In the 80s, we were promised flying cars and robot maids. We didn&apos;t get Rosie from The Jetsons, but we did get ChatGPT. It can&apos;t vacuum your lounge, but it can write a 4-week meal plan in four seconds.{' '}
            <em style={{ color: '#00D4AA' }}>Progress? We think so.</em>
          </div>
          <Link href="/quiz" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
            Take Your AI Personality Quiz &rarr;
          </Link>
        </div>
      </div>

      {/* Who we are */}
      <div style={{ background: 'white' }}>
        <div className="exp-grid" style={{ maxWidth: 900, margin: '0 auto', padding: '72px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
          <div>
            <div
              style={{
                fontFamily: outfit,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 3,
                textTransform: 'uppercase' as const,
                color: '#00D4AA',
                marginBottom: 16,
              }}
            >
              Who we are
            </div>
            <h2
              style={{
                fontFamily: outfit,
                fontWeight: 800,
                fontSize: 28,
                marginBottom: 20,
              }}
            >
              Two Gen X women who want to share the love.
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: '#5A5A72', marginBottom: 16 }}>
              Two Gen X women. We happen to be vets, but we&apos;re primarily experts in figuring
              things out. We lived through the analog-to-digital morph, and we&apos;re doing it again
              with AI. This isn&apos;t for the generation that grew up with an iPad, it&apos;s for
              those of us who remember the pre-internet world and are developing the wrinkles to prove
              we can conquer what&apos;s next.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: '#5A5A72', marginBottom: 16 }}>
              We used to make websites the long way, learning HTML from big fat textbooks and typing
              into a scary looking terminal on a chunky IBM computer. Now we can whip up useful
              software tools like websites and apps, research in a jiffy and streamline our work tasks
              because we&apos;ve learned how to make AI work for us.
            </p>
            <SignUpCta center={false} />
          </div>
          <div style={{ borderRadius: 12, overflow: 'hidden' }}>
            <img
              src="/team-photo.jpg"
              alt="Illustration of Shaan and Deb with an AI robot"
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 12 }}
            />
          </div>
        </div>
      </div>

      {/* Quiz CTA */}
      <div style={{ background: '#1A1A2E', padding: '72px 40px', textAlign: 'center' }}>
        <h2
          style={{
            fontFamily: outfit,
            fontWeight: 800,
            fontSize: 32,
            color: 'white',
            marginBottom: 12,
          }}
        >
          Not sure where to start?
        </h2>
        <p style={{ fontSize: 16, color: '#9999BB', marginBottom: 28 }}>
          Take our 2-minute quiz to find out your AI persona and
          join the Vinyl &amp; Vibe-Along waitlist.
        </p>
        <QuizCta />
      </div>

      {/* Vet callout */}
      <div
        style={{
          background: '#F0FDFB',
          borderTop: '3px solid #00D4AA',
          padding: 40,
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: 16,
            color: '#1A1A2E',
            lineHeight: 1.7,
            maxWidth: 600,
            margin: '0 auto',
          }}
        >
          Work in the vet industry? We built something just for you.{' '}
          <strong style={{ color: '#00D4AA' }}>SynAIpse VET</strong> brings AI tools designed
          specifically for veterinary professionals.
        </p>
      </div>

      {/* Footer */}
      <footer id="newsletter" style={{ background: '#1A1A2E', padding: '48px 40px' }}>
        <div
          style={{
            maxWidth: 900,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'start',
            flexWrap: 'wrap' as const,
            gap: 32,
          }}
        >
          <div>
            <div style={{ fontFamily: outfit, fontWeight: 800, fontSize: 20, color: 'white' }}>
              Jetpackers<span style={{ color: '#00D4AA' }}>AI</span>
            </div>
            <div style={{ fontSize: 12, color: '#5A5A72', marginTop: 6 }}>
              They Promised Us Jetpacks &middot; AI Education for Gen X Women
            </div>
            <p style={{ fontSize: 13, color: '#9999BB', marginTop: 12, maxWidth: 320 }}>
              Free AI tips, real examples, and new tools straight to your inbox. No spam.
            </p>
            <FooterNewsletter />
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' as const }}>
            <Link href="/quiz" style={{ color: '#9999BB', fontSize: 14, textDecoration: 'none' }}>
              Quiz
            </Link>
            <Link href="/privacy" style={{ color: '#9999BB', fontSize: 14, textDecoration: 'none' }}>
              Privacy
            </Link>
            <Link href="/terms" style={{ color: '#9999BB', fontSize: 14, textDecoration: 'none' }}>
              Terms
            </Link>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { href: 'https://www.facebook.com/jetpackersAI/', label: 'Facebook', text: 'f', size: 14, external: true },
              { href: '#', label: 'Instagram', text: 'ig', size: 11, external: false },
              { href: 'https://www.youtube.com/@jetpackersAI', label: 'YouTube', text: 'yt', size: 11, external: true },
              { href: '#', label: 'Substack', text: 'ss', size: 10, external: false },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.external ? '_blank' : undefined}
                rel={s.external ? 'noopener noreferrer' : undefined}
                aria-label={s.label}
                className="social-icon"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #EC4899 0%, #A855F7 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: s.size,
                  fontWeight: 700,
                  color: 'white',
                  textDecoration: 'none',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 2px 10px rgba(236, 72, 153, 0.3)',
                }}
              >
                {s.text}
              </a>
            ))}
          </div>
          <div
            style={{
              width: '100%',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              paddingTop: 24,
              marginTop: 8,
              fontSize: 12,
              color: '#5A5A72',
            }}
          >
            &copy; 2025 Jetpackers AI. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Responsive styles */}
      <style jsx>{`
        @media (max-width: 640px) {
          .struggle-grid,
          .value-grid,
          .pricing-grid,
          .exp-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      <style jsx global>{`
        .social-icon:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 18px rgba(236, 72, 153, 0.45), 0 0 30px rgba(168, 85, 247, 0.15) !important;
        }
        @media (max-width: 640px) {
          .footer-newsletter {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}
