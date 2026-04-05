import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About | Jetpackers AI',
  description:
    'Meet Shaan and Deb - two vets, one big idea. We built JetpackersAI because Gen X women don\'t need AI explained from scratch.',
}

export default function AboutPage() {
  return (
    <main
      className="min-h-screen synthwave-grid"
      style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}
    >
      {/* Nav bar */}
      <div
        style={{
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg-card)',
        }}
      >
        <div
          className="mx-auto flex max-w-4xl items-center justify-between px-5 md:px-10"
          style={{ height: 56 }}
        >
          <Link
            href="/"
            className="orbitron text-sm font-bold tracking-widest"
            style={{ color: 'var(--text-primary)', textDecoration: 'none' }}
          >
            <span style={{ color: 'var(--pink)' }}>Jetpackers</span>
            <span style={{ color: 'var(--teal)' }}>AI</span>
          </Link>
          <Link
            href="/"
            className="text-[13px] font-medium"
            style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
          >
            &larr; Home
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-5 pb-20 pt-12 md:px-10 md:pt-16">
        {/* Hero */}
        <p
          className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em]"
          style={{ color: 'var(--teal)' }}
        >
          The Jetpackers
        </p>
        <h1
          className="orbitron mb-4"
          style={{
            fontSize: 'clamp(1.6rem, 4.5vw, 2.6rem)',
            fontWeight: 800,
            lineHeight: 1.1,
          }}
        >
          <span style={{ color: 'var(--text-muted)' }}>Two vets.</span>
          <br />
          <span style={{ color: 'var(--pink)' }}>One big idea.</span>
        </h1>
        <p
          className="mb-10 max-w-xl text-[16px] leading-relaxed"
          style={{ color: 'var(--text-muted)' }}
        >
          We built JetpackersAI because Gen X women don&apos;t need AI explained from scratch.
          We just needed someone to show us what&apos;s actually useful - without the Silicon Valley hype.
        </p>

        {/* Team photo */}
        <div className="mb-14 overflow-hidden rounded-2xl" style={{ border: '1px solid var(--border)' }}>
          <Image
            src="/team-photo.jpg"
            alt="Shaan and Deb - the Jetpackers AI team"
            width={1376}
            height={768}
            className="w-full"
            style={{ display: 'block' }}
            priority
          />
        </div>

        {/* Founder cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Shaan */}
          <div
            className="rounded-2xl p-5 md:p-6"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="overflow-hidden rounded-full" style={{ width: 56, height: 56, flexShrink: 0 }}>
                <Image
                  src="/shaan-photo.jpg"
                  alt="Shaan Mocke"
                  width={112}
                  height={112}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h2
                  className="orbitron text-[15px] font-bold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Shaan Mocke
                </h2>
                <p className="text-[11px]" style={{ color: 'var(--text-footer)' }}>
                  BVSc &middot; MANZCVS &middot; ABMPA
                </p>
                <p className="text-[11px]" style={{ color: 'var(--text-footer)' }}>
                  Brisbane, Australia
                </p>
              </div>
            </div>

            <div
              className="mb-4 rounded-lg p-3"
              style={{
                background: 'rgba(13,148,136,0.05)',
                borderLeft: '3px solid var(--teal)',
              }}
            >
              <p className="text-[13px] italic" style={{ color: 'var(--teal)' }}>
                Programmer by training. Vet by choice. Builder by compulsion.
              </p>
            </div>

            <div className="space-y-3 text-[14px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              <p>
                Before vet school, Shaan was writing code for a corporate law firm in New Zealand.
                She has a programmer&apos;s brain and a vet&apos;s hands - a surprisingly useful
                combination for figuring out what AI can actually do.
              </p>
              <p>
                She qualified from Massey in 2018 and spent years doing equine dentistry and animal
                rehabilitation before relocating to Brisbane, where she runs a mobile equine and canine
                practice specialising in biomechanical medicine.
              </p>
              <p>
                She&apos;s been playing with AI tools since before most people could spell ChatGPT.
                Her natural habitat is somewhere between building a thing and explaining that thing to
                someone who didn&apos;t ask to know how it worked. Classic tinkerer.
              </p>
              <p>
                South African by birth, Kiwi by upbringing, Australian by recent decision. Trail runner,
                triathlete, dog sports competitor. Her border collie Piper has opinions about all of it.
                Currently between horses. She maintains this is temporary.
              </p>
            </div>

            {/* Social links */}
            <div className="mt-5 flex gap-3">
              <a
                href="https://linkedin.com/in/shaan-mocke"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium"
                style={{
                  background: 'rgba(107,33,168,0.06)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                }}
              >
                <span style={{ fontWeight: 700, fontSize: 11 }}>in</span> LinkedIn
              </a>
              <a
                href="https://instagram.com/dr_shaan_vet"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium"
                style={{
                  background: 'rgba(107,33,168,0.06)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                }}
              >
                @dr_shaan_vet
              </a>
            </div>
          </div>

          {/* Deb */}
          <div
            className="rounded-2xl p-5 md:p-6"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="overflow-hidden rounded-full" style={{ width: 56, height: 56, flexShrink: 0 }}>
                <Image
                  src="/deb-photo.jpg"
                  alt="Deb Prattley"
                  width={112}
                  height={112}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h2
                  className="orbitron text-[15px] font-bold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Deb Prattley
                </h2>
                <p className="text-[11px]" style={{ color: 'var(--text-footer)' }}>
                  BVSc &middot; PhD &middot; MOst &middot; CCRP
                </p>
                <p className="text-[11px]" style={{ color: 'var(--text-footer)' }}>
                  Manawatu, New Zealand
                </p>
              </div>
            </div>

            <div
              className="mb-4 rounded-lg p-3"
              style={{
                background: 'rgba(13,148,136,0.05)',
                borderLeft: '3px solid var(--teal)',
              }}
            >
              <p className="text-[13px] italic" style={{ color: 'var(--teal)' }}>
                PhD. Osteopath. Lifestyle block chaos coordinator.
              </p>
            </div>

            <div className="space-y-3 text-[14px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              <p>
                Deb graduated from Massey vet school &ldquo;last century&rdquo; - her words, not ours.
                Since then she&apos;s collected a Masters from Glasgow, a PhD from Massey, a Masters in
                Osteopathy from Unitec, and a list of certifications that runs longer than most
                people&apos;s entire CVs.
              </p>
              <p>
                She does veterinary rehabilitation and osteopathy across the Manawatu and surrounding
                regions - dogs, cats, horses, and anything else that needs to move better. She lives
                on a lifestyle block with horses, dogs, and some sheep.
              </p>
              <p>
                She came to AI the way most of us do: too much to do, not enough hours in the day. But
                once she committed, she got strategic fast. That PhD brain doesn&apos;t waste time.
              </p>
              <p>
                She is the proof that you don&apos;t need to be a tech person. You just need to be
                curious enough to press the buttons.
              </p>
            </div>
          </div>
        </div>

        {/* SynAIpseVET callout */}
        <div
          className="mt-10 rounded-lg px-4 py-3 text-center text-[13px]"
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
          <span style={{ color: 'var(--text-muted)' }}> brings AI tools built specifically for veterinary professionals.</span>
        </div>

        {/* Footer */}
        <footer
          className="mt-10 flex flex-col items-start justify-between gap-3 pt-4 text-[11px] sm:flex-row sm:items-center"
          style={{ borderTop: '1px solid var(--border)', color: 'var(--text-footer)' }}
        >
          <p>
            <span style={{ color: 'var(--pink)' }}>They Promised Us Jetpacks</span>{' '}
            &middot; AI Education for Gen X Women
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="footer-link">Privacy</Link>
            <Link href="/terms" className="footer-link">Terms</Link>
          </div>
        </footer>
      </div>
    </main>
  )
}
