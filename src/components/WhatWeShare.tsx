'use client'

const themes = [
  {
    number: '01',
    title: 'Prompting Basics',
    desc: 'System prompts, voice setting, role prompting, one-shot vs conversation. The foundation everything else builds on.',
  },
  {
    number: '02',
    title: 'Practice Efficiency',
    desc: 'Referral letters from dot points, discharge instructions, SOAP note formatting, invoice descriptions that clients understand.',
  },
  {
    number: '03',
    title: 'Knowledge Management',
    desc: 'SOP libraries, protocol extraction, locum onboarding packs, CPD summaries. Your practice handbook - finally written.',
  },
  {
    number: '04',
    title: 'Client Communication',
    desc: 'Difficult conversations (euthanasia, cost declines, complaints), jargon translation, FAQ generation. AI as your communication coach.',
  },
  {
    number: '05',
    title: 'CPD and Learning',
    desc: 'Perplexity for literature searches, paper summaries, quiz generation from your own notes. AI as your study partner.',
  },
  {
    number: '06',
    title: 'Vibe Coding',
    desc: 'Build your own practice website or web app with zero coding experience. Brief AI like a project manager. No developers needed.',
  },
  {
    number: '07',
    title: 'Audio and Video',
    desc: 'Consult transcription, podcast summaries, voice memo to Substack draft. Your spoken words, captured and useful.',
  },
  {
    number: '08',
    title: 'Governance and Safety',
    desc: 'What not to put in free AI tools, a simple use policy you can implement, how to check for hallucinations.',
  },
  {
    number: '09',
    title: 'Personalise Your AI',
    desc: 'Custom GPTs, Claude Projects, Gemini Gems, NotebookLM as an educator. AI that knows your practice, your voice, your way.',
  },
]

export default function WhatWeShare() {
  return (
    <section
      id="what-we-share"
      style={{ padding: '7rem 4rem', maxWidth: '1100px', margin: '0 auto' }}
    >
      <div
        style={{
          fontFamily: 'var(--font-exo)',
          fontSize: '0.68rem',
          fontWeight: 600,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#06B6D4',
          marginBottom: '1rem',
        }}
      >
        What We Share
      </div>

      <h2
        style={{
          fontFamily: 'var(--font-exo)',
          fontSize: 'clamp(1.6rem, 3vw, 2.6rem)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          maxWidth: '600px',
          marginBottom: '0.8rem',
        }}
      >
        Nine themes. All free. All practical.
      </h2>

      <p
        style={{
          fontSize: '0.95rem',
          color: 'rgba(240,246,255,0.78)',
          marginBottom: '3.5rem',
          maxWidth: '520px',
          lineHeight: 1.7,
        }}
      >
        Shaan and Deb work on all of this together. Every theme is joint - one voice, two perspectives, one shared mission.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.2rem',
        }}
      >
        {themes.map((theme) => (
          <div
            key={theme.number}
            style={{
              background: 'rgba(15,32,64,0.5)',
              border: '1px solid rgba(6,182,212,0.1)',
              borderRadius: '6px',
              padding: '2rem',
              transition: 'all 0.25s',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(6,182,212,0.3)'
              e.currentTarget.style.background = 'rgba(15,32,64,0.85)'
              e.currentTarget.style.transform = 'translateY(-3px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(6,182,212,0.1)'
              e.currentTarget.style.background = 'rgba(15,32,64,0.5)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-exo)',
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                color: '#06B6D4',
                marginBottom: '0.6rem',
                opacity: 0.7,
              }}
            >
              {theme.number}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-exo)',
                fontSize: '1.05rem',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                marginBottom: '0.7rem',
              }}
            >
              {theme.title}
            </div>
            <p
              style={{
                fontSize: '0.83rem',
                color: 'rgba(240,246,255,0.78)',
                lineHeight: 1.65,
              }}
            >
              {theme.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
