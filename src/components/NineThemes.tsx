'use client'

const themes = [
  { num: '01', title: 'Prompting Basics', desc: 'Getting the most from any AI tool. The foundations every vet needs.' },
  { num: '02', title: 'Practice Efficiency', desc: 'Cut admin time. Discharge summaries, referral letters, SOPs in minutes.' },
  { num: '03', title: 'Knowledge Management', desc: 'Turn CPD articles into 5-point summaries. Build your own protocol library.' },
  { num: '04', title: 'Client Communication', desc: 'Difficult conversations, FAQs, complaint responses — drafted in seconds.' },
  { num: '05', title: 'CPD and Learning', desc: 'Use AI to explain papers, create quiz questions, summarise podcasts.' },
  { num: '06', title: 'Vibe Coding', desc: 'Build your first AI tool with no coding experience. Really.' },
  { num: '07', title: 'Audio and Video', desc: 'Transcribe consult recordings, summarise videos, turn voice memos into drafts.' },
  { num: '08', title: 'Governance and Safety', desc: 'What not to put in a free AI tool. A simple AI use policy in under an hour.' },
  { num: '09', title: 'Personalise Your AI', desc: 'Custom GPTs, Gems, skills. Your own AI that knows your practice.' },
]

export default function NineThemes() {
  return (
    <div
      id="nine-themes"
      className="px-5 md:px-10 py-16 md:py-20"
      style={{ background: 'var(--bg-warm)' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
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
          What we cover
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
            Nine themes.
            <br />
            All free. All practical.
          </h2>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.7,
              color: 'var(--text-muted)',
              fontWeight: 300,
              maxWidth: 420,
            }}
          >
            Every theme is practical — no theory, no jargon, just things you can use
            this week in your practice.
          </p>
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{
            gap: 1,
            background: 'var(--border)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          {themes.map((t) => (
            <div key={t.num} className="theme-card">
              <div
                style={{
                  fontFamily: 'var(--font-exo), sans-serif',
                  fontSize: 11,
                  fontWeight: 700,
                  color: 'var(--teal)',
                  letterSpacing: 1,
                  marginBottom: 10,
                }}
              >
                {t.num}
              </div>
              <div
                className="exo"
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: 'var(--dark)',
                  marginBottom: 8,
                }}
              >
                {t.title}
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--text-muted)' }}>
                {t.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
