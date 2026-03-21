'use client'

import Link from 'next/link'

const outfit = "var(--font-outfit), 'Outfit', sans-serif"
const dmSans = "var(--font-dm), 'DM Sans', sans-serif"

function TripleCta() {
  return (
    <div style={{ marginTop: 36, textAlign: 'center' }}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          borderRadius: 6,
          overflow: 'hidden',
          border: '2px solid #E91E8C',
          flexWrap: 'wrap',
        }}
      >
        <Link
          href="/quiz"
          style={{
            padding: '13px 20px',
            fontFamily: outfit,
            fontWeight: 600,
            fontSize: 14,
            background: '#E91E8C',
            color: 'white',
            textDecoration: 'none',
          }}
        >
          Take the Quiz
        </Link>
        <div style={{ background: 'rgba(255,255,255,0.25)', width: 1, alignSelf: 'stretch' }} />
        <Link
          href="/quiz"
          style={{
            padding: '13px 20px',
            fontFamily: outfit,
            fontWeight: 600,
            fontSize: 14,
            background: '#E91E8C',
            color: 'white',
            textDecoration: 'none',
          }}
        >
          Get the Newsletter
        </Link>
        <div style={{ background: 'rgba(255,255,255,0.25)', width: 1, alignSelf: 'stretch' }} />
        <Link
          href="/quiz"
          style={{
            padding: '13px 20px',
            fontFamily: outfit,
            fontWeight: 600,
            fontSize: 14,
            background: '#E91E8C',
            color: 'white',
            textDecoration: 'none',
          }}
        >
          Join the Vinyl &amp; Vibe-Along Waitlist
        </Link>
      </div>
    </div>
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
          style={{
            background: '#E91E8C',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: 6,
            fontFamily: outfit,
            fontWeight: 600,
            fontSize: 14,
            cursor: 'pointer',
            textDecoration: 'none',
          }}
        >
          Take the Quiz
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
        <p style={{ fontSize: 15, color: '#00D4AA', fontStyle: 'italic' }}>
          Curious enough to ask questions. Brave enough to press the buttons.
        </p>
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
            <span style={{ color: '#00D4AA', fontSize: 18 }}>✓</span>
            {item}
          </div>
        ))}
      </div>

      {/* Newsletter note */}
      <div
        style={{
          background: '#F0FDFB',
          borderTop: '1px solid #00D4AA',
          padding: '28px 40px',
          textAlign: 'center',
          fontSize: 14,
          color: '#1A1A2E',
        }}
      >
        <p style={{ marginBottom: 16 }}>
          Take the quiz and you&apos;ll be signed up for our free newsletter: AI basics, real
          examples, and new tools straight to your inbox.
        </p>
        <Link
          href="/quiz"
          style={{
            display: 'inline-block',
            background: '#E91E8C',
            color: 'white',
            border: 'none',
            padding: '14px 28px',
            borderRadius: 6,
            fontFamily: outfit,
            fontWeight: 600,
            fontSize: 15,
            cursor: 'pointer',
            textDecoration: 'none',
          }}
        >
          Take the Quiz
        </Link>
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
            <div
              style={{
                borderRadius: 12,
                overflow: 'hidden',
                height: 260,
              }}
            >
              <img
                src="/vibe-a-long.jpg"
                alt="Woman looking sceptically at a laptop"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 12,
                }}
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

      {/* Two ways to get started */}
      <div style={{ background: 'white' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '72px 40px' }}>
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
            Here&apos;s what we&apos;ve got for you
          </div>
          <h2
            style={{
              fontFamily: outfit,
              fontWeight: 800,
              fontSize: 'clamp(28px, 4vw, 40px)',
              marginBottom: 8,
            }}
          >
            Two ways to get started
          </h2>
          <div className="value-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 40 }}>
            <div
              style={{
                background: '#F9F9FB',
                border: '1px solid #E2E2ED',
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
              <span
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
                }}
              >
                $67 NZD · 6 spots only
              </span>
            </div>
            <div
              style={{
                background: '#F9F9FB',
                border: '1px solid #E2E2ED',
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
              <span
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
                }}
              >
                Free
              </span>
            </div>
          </div>
          <TripleCta />
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
          <TripleCta />
        </div>
      </div>

      {/* Pricing */}
      <div style={{ background: 'white' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '72px 40px' }}>
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
            How much does it cost?
          </div>
          <h2
            style={{
              fontFamily: outfit,
              fontWeight: 800,
              fontSize: 'clamp(28px, 4vw, 40px)',
              marginBottom: 8,
            }}
          >
            Simple pricing
          </h2>
          <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 40 }}>
            <div
              style={{
                border: '2px solid #E91E8C',
                borderRadius: 12,
                padding: 32,
              }}
            >
              <span
                style={{
                  background: '#E91E8C',
                  color: 'white',
                  fontSize: 11,
                  fontWeight: 600,
                  fontFamily: outfit,
                  letterSpacing: 1,
                  textTransform: 'uppercase' as const,
                  padding: '4px 10px',
                  borderRadius: 4,
                  marginBottom: 12,
                  display: 'inline-block',
                }}
              >
                Introductory price
              </span>
              <div
                style={{
                  fontFamily: outfit,
                  fontWeight: 800,
                  fontSize: 22,
                  color: '#1A1A2E',
                  marginBottom: 6,
                }}
              >
                Vinyl &amp; Vibe-Along
              </div>
              <div
                style={{
                  fontFamily: outfit,
                  fontWeight: 800,
                  fontSize: 36,
                  color: '#E91E8C',
                  marginBottom: 16,
                }}
              >
                $67 <span style={{ fontSize: 16, color: '#5A5A72', fontWeight: 400 }}>NZD</span>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: '#5A5A72' }}>
                A 3-hour online session, small group, max 6 people. We show you the ropes and you
                build something useful. Vinyl grooves in the background.
              </p>
            </div>
            <div
              style={{
                border: '1px solid #E2E2ED',
                borderRadius: 12,
                padding: 32,
              }}
            >
              <div
                style={{
                  fontFamily: outfit,
                  fontWeight: 800,
                  fontSize: 22,
                  color: '#1A1A2E',
                  marginBottom: 6,
                }}
              >
                The Newsletter
              </div>
              <div
                style={{
                  fontFamily: outfit,
                  fontWeight: 800,
                  fontSize: 36,
                  color: '#00D4AA',
                  marginBottom: 16,
                }}
              >
                Free
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: '#5A5A72' }}>
                AI basics, real examples, new tools and a few laughs.
              </p>
            </div>
          </div>
          <TripleCta />
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
                    background: '#E91E8C',
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
          <TripleCta />
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
            <div style={{ textAlign: 'left' }}>
              <TripleCta />
            </div>
          </div>
          <div
            style={{
              background: '#E2E2ED',
              borderRadius: 12,
              height: 320,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#5A5A72',
              fontSize: 13,
            }}
          >
            Photo: Shaan &amp; Deb
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
          Take our 2-minute quiz to find out your AI persona, get your mitts on our newsletter and
          join the Vinyl &amp; Vibe-Along waitlist.
        </p>
        <TripleCta />
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
      <footer style={{ background: '#1A1A2E', padding: '48px 40px' }}>
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
              They Promised Us Jetpacks · AI Education for Gen X Women
            </div>
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' as const }}>
            <Link href="/quiz" style={{ color: '#9999BB', fontSize: 14, textDecoration: 'none' }}>
              Newsletter
            </Link>
            <Link href="/privacy" style={{ color: '#9999BB', fontSize: 14, textDecoration: 'none' }}>
              Privacy
            </Link>
            <Link href="/terms" style={{ color: '#9999BB', fontSize: 14, textDecoration: 'none' }}>
              Terms
            </Link>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <a
              href="https://www.facebook.com/jetpackersAI/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                color: '#9999BB',
                textDecoration: 'none',
              }}
              aria-label="Facebook"
            >
              f
            </a>
            <a
              href="#"
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                color: '#9999BB',
                textDecoration: 'none',
              }}
              aria-label="Instagram"
            >
              ig
            </a>
            <a
              href="https://www.youtube.com/@jetpackersAI"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                color: '#9999BB',
                textDecoration: 'none',
              }}
              aria-label="YouTube"
            >
              yt
            </a>
            <a
              href="#"
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                color: '#9999BB',
                textDecoration: 'none',
              }}
              aria-label="Substack"
            >
              ss
            </a>
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
            © 2025 Jetpackers AI. All rights reserved.
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
    </div>
  )
}
