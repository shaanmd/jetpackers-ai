'use client'

import { useState, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, ChevronRight, ArrowLeft, RotateCcw } from 'lucide-react'
import Link from 'next/link'
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient'

// ─── Types ────────────────────────────────────────────────────────────────────

type Answer = 'A' | 'B' | 'C' | 'D'
type Step = 'intro' | number | 'email' | 'result'

// ─── Quiz data ─────────────────────────────────────────────────────────────────

const questions = [
  {
    num: 1,
    text: 'When you hear the word "Algorithm," what\'s the first thing that comes to mind?',
    options: [
      { key: 'A' as Answer, text: 'A fancy way of saying "I\'m being spied on by my toaster."' },
      { key: 'B' as Answer, text: 'That thing that keeps showing me targeted ads for orthotic sneakers I\'m old enough to need.' },
      { key: 'C' as Answer, text: 'The secret sauce that decides what I see on social media.' },
      { key: 'D' as Answer, text: "Wasn't that a dance move from a Flashdance montage?" },
    ],
  },
  {
    num: 2,
    text: 'You need to write a polite but firm letter to your insurance company (or your kid\'s school principal). How do you handle it?',
    options: [
      { key: 'A' as Answer, text: 'I sit down with a cup of tea and my "serious" voice, drafting it manually for an hour.' },
      { key: 'B' as Answer, text: 'I write a "venting" version and ask AI to "clean this up so I don\'t sound like a Karen."' },
      { key: 'C' as Answer, text: 'I give the AI the specific policy details and tell it to write a 3-paragraph letter in a "professional but assertive" tone.' },
      { key: 'D' as Answer, text: 'I just keep putting it off and hope the problem goes away, like my leg warmers did.' },
    ],
  },
  {
    num: 3,
    text: 'If AI were a character from a classic 80s/90s show, which one is it?',
    options: [
      { key: 'A' as Answer, text: "The Terminator: It's coming for our jobs and eventually our dignity." },
      { key: 'B' as Answer, text: 'B1 or B2 (Bananas in Pyjamas): It\'s trying its best, but it\'s goofy and needs a lot of direction.' },
      { key: 'C' as Answer, text: 'K.I.T.T. (Knight Rider): A sleek, helpful partner that makes me look cooler than I am.' },
      { key: 'D' as Answer, text: "ALF: It's crashed into my life, it's eating all my data, and I'm not sure if I should keep it." },
    ],
  },
  {
    num: 4,
    text: 'How do you feel about deepfakes (AI-generated photos/videos)?',
    options: [
      { key: 'A' as Answer, text: 'Total "Stranger Danger." I\'m looking for the grainy VHS quality so I know it\'s real.' },
      { key: 'B' as Answer, text: "I can usually tell because the hands look like a bunch of sausages or the teeth are weird." },
      { key: 'C' as Answer, text: "I'm aware of the risks, but I'm more interested in how to use the tech for my own branding." },
      { key: 'D' as Answer, text: "If it can make me look like I'm in a Cold Chisel music video, I'm sold." },
    ],
  },
  {
    num: 5,
    text: "What's your AI comfort level right now?",
    options: [
      { key: 'A' as Answer, text: "The Breakfast Club: I'm stuck in detention and I don't want to be here." },
      { key: 'B' as Answer, text: 'Muriel\'s Wedding: "You\'re terrible, AI!"... but also, I kind of want to be friends.' },
      { key: 'C' as Answer, text: 'Kath & Kim: It\'s "noice, unusual, and different," and I\'m ready to make it my own.' },
      { key: 'D' as Answer, text: "Footrot Flats: I'm just sticking with the Dog — he's more reliable than a robot." },
    ],
  },
  {
    num: 6,
    text: 'Which AI tool are you most curious about mastering?',
    options: [
      { key: 'A' as Answer, text: 'Image Generation: Making cool graphics so I never have to use clip art again.' },
      { key: 'B' as Answer, text: 'Data & Organisation: Having it sort my digital mess so I can find my 1994 tax returns.' },
      { key: 'C' as Answer, text: 'AI Assistants: A virtual helper to handle my scheduling, do jobs for me, make websites or widgets.' },
      { key: 'D' as Answer, text: 'Prompt Engineering: Learning how to talk to the machine so it listens to me.' },
    ],
  },
  {
    num: 7,
    text: 'When someone mentions "The Cloud," you think:',
    options: [
      { key: 'A' as Answer, text: "It's where my photos go to disappear forever." },
      { key: 'B' as Answer, text: "A magical server farm where I pay $2.99 a month for extra storage." },
      { key: 'C' as Answer, text: "A decentralised network that powers all these AI models." },
      { key: 'D' as Answer, text: "I'm still more worried about acid rain." },
    ],
  },
]

// ─── Persona data ──────────────────────────────────────────────────────────────

const personas: Record<
  Answer,
  {
    title: string
    subtitle: string
    vibe: string
    description: string
    goal: string
    goalDetail: string
    emoji: string
    color: string
  }
> = {
  A: {
    title: 'The Classic Hit',
    subtitle: 'The Judy Bailey / Anne Wills',
    vibe: 'Professional, composed, and slightly suspicious of "new-fangled" gadgets.',
    description:
      "You're the mother of the nation. You value the human touch and high standards. You aren't against AI, but you aren't about to let a robot write your Christmas cards or take over your brain.",
    goal: 'AI as Research Assistant',
    goalDetail:
      'Learning how to use AI as a research assistant — not a replacement — so you can stay informed without losing your soul to the machine.',
    emoji: '📺',
    color: '#0D9488',
  },
  B: {
    title: 'The Practical Pioneer',
    subtitle: 'The Muriel Heslop',
    vibe: '"You\'re terrible, Muriel!"... but also, you\'re doing it!',
    description:
      "You're ready to leave the old life behind and try something new, even if it feels a bit awkward at first. You use AI for the \"messy\" stuff — fixing your tone, brainstorming dinner, or sorting out a chaotic inbox.",
    goal: 'Everyday AI Shortcuts',
    goalDetail: 'Mastering "Everyday AI" shortcuts that give you back two hours of your life every day.',
    emoji: '💍',
    color: '#EC4899',
  },
  C: {
    title: 'The Power Player',
    subtitle: 'The Jilly Stewart (Gloss)',
    vibe: 'High stakes, high tech, and big shoulder-pad energy.',
    description:
      "You see the opportunity and you're grabbing it with both hands. You don't just want to \"use\" AI; you want to command it. You're interested in the pro features — image generation, data analysis, and building your own digital empire.",
    goal: 'Advanced Prompt Engineering',
    goalDetail: "You want to be the one showing everyone else how it's done.",
    emoji: '💅',
    color: '#C084FC',
  },
  D: {
    title: 'The Footrot Flats Traditionalist',
    subtitle: 'The Wal & Dog',
    vibe: 'Cheeky, reliable, and prefers the great outdoors to a glowing screen.',
    description:
      "You're a bit of a tech-rebel. If it doesn't help you in the \"real world,\" you aren't interested. You're nostalgic for the days of analogue, but you're curious if this AI stuff can make your life admin disappear so you can get back to what you love.",
    goal: 'Zero-Friction AI',
    goalDetail:
      'Finding the one or two "set and forget" tools that work in the background so you don\'t have to think about tech at all.',
    emoji: '🐕',
    color: '#F59E0B',
  },
}

// ─── Scoring ──────────────────────────────────────────────────────────────────

function getPersona(answers: Record<number, Answer>): Answer {
  const counts: Record<Answer, number> = { A: 0, B: 0, C: 0, D: 0 }
  Object.values(answers).forEach((a) => { counts[a]++ })
  const max = Math.max(...Object.values(counts))
  for (const key of ['C', 'B', 'A', 'D'] as Answer[]) {
    if (counts[key] === max) return key
  }
  return 'A'
}

// ─── Constants ────────────────────────────────────────────────────────────────

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// ─── Component ────────────────────────────────────────────────────────────────

export default function QuizClient() {
  const [step, setStep] = useState<Step>('intro')
  const [answers, setAnswers] = useState<Record<number, Answer>>({})
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [persona, setPersona] = useState<Answer>('A')

  const currentQ = typeof step === 'number' ? questions[step] : null
  const progress =
    typeof step === 'number'
      ? ((step + 1) / questions.length) * 100
      : step === 'email' || step === 'result'
      ? 100
      : 0

  const handleAnswer = (key: Answer) => {
    if (typeof step !== 'number') return
    const newAnswers = { ...answers, [step]: key }
    setAnswers(newAnswers)
    const next = step < questions.length - 1 ? step + 1 : 'email'
    setTimeout(() => setStep(next), 220)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!email || !emailRegex.test(email)) return

    const p = getPersona(answers)
    setPersona(p)
    setSubmitStatus('loading')

    if (isSupabaseConfigured()) {
      const formattedAnswers = Object.fromEntries(
        Object.entries(answers).map(([idx, val]) => [`q${parseInt(idx) + 1}`, val])
      )
      const { error } = await supabase.from('quiz_results').insert([{
        email: email.trim(),
        answers: formattedAnswers,
        persona: personas[p].title,
      }])
      if (error) console.warn('Quiz save error:', error.message)
    }

    setSubmitStatus('success')
    setStep('result')
  }

  const restart = () => {
    setStep('intro')
    setAnswers({})
    setEmail('')
    setTouched(false)
    setSubmitStatus('idle')
  }

  // ─── Ambient layout wrapper ──────────────────────────────────────────────────

  return (
    <div className="min-h-screen synthwave-grid" style={{ background: 'var(--bg)', color: 'var(--text-primary)' }}>
      <div
        aria-hidden="true"
        style={{
          position: 'fixed', top: '-120px', right: '-80px', width: 500, height: 500,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(107,33,168,0.07) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'fixed', bottom: '-100px', left: '-60px', width: 400, height: 400,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }}
      />

      <main
        className="relative mx-auto flex min-h-screen max-w-2xl flex-col px-5 pb-16 pt-10 md:px-10 md:pt-14"
        style={{ zIndex: 1 }}
      >
        {/* Top bar */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="orbitron text-sm font-bold tracking-widest"
            style={{ color: 'var(--text-primary)', textDecoration: 'none' }}
          >
            <span style={{ color: 'var(--pink)' }}>Jetpackers</span>
            <span style={{ color: 'var(--teal)' }}>AI</span>
          </Link>

          {typeof step === 'number' && (
            <div className="flex items-center gap-3">
              <span className="text-xs" style={{ color: 'var(--text-footer)' }}>
                {step + 1} / {questions.length}
              </span>
              <div
                className="overflow-hidden rounded-full"
                style={{ width: 80, height: 4, background: 'rgba(107,33,168,0.12)' }}
              >
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full rounded-full"
                  style={{ background: 'var(--pink)' }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">

          {/* ── INTRO ─────────────────────────────────────────────────────────── */}
          {step === 'intro' && (
            <motion.section
              key="intro"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="flex flex-1 flex-col justify-center"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: 'var(--teal)' }}>
                Vibe Check · 7 Questions
              </p>
              <h1
                className="orbitron mb-4"
                style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontWeight: 800, lineHeight: 1.15 }}
              >
                Is AI Your New Bestie{' '}
                <span style={{ color: 'var(--pink)', textShadow: '0 0 20px rgba(236,72,153,0.25)' }}>
                  or a Total Narcissist?
                </span>
              </h1>
              <p className="mb-6 text-[15px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Breakfast Club meets The Jetsons. Seven questions to find out what kind of AI woman you really are — complete with your very own 80s/90s spirit guide. No wrong answers. Results that tell you something useful.
              </p>
              <div
                className="mb-8 rounded-2xl p-4"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              >
                <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  🎬{' '}
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Did you know?</span>{' '}
                  In the 80s, we were promised flying cars and robot maids. We didn&apos;t get Rosie from The Jetsons, but we did get ChatGPT. It can&apos;t vacuum your lounge, but it can write a 4-week meal plan in four seconds.{' '}
                  <em style={{ color: 'var(--teal)' }}>Progress? We think so.</em>
                </p>
              </div>
              <button
                onClick={() => setStep(0)}
                className="btn-primary self-start"
                style={{ fontSize: 15, padding: '14px 32px' }}
              >
                Let&apos;s go →
              </button>
            </motion.section>
          )}

          {/* ── QUESTIONS ─────────────────────────────────────────────────────── */}
          {typeof step === 'number' && currentQ && (
            <motion.section
              key={`q-${step}`}
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -32 }}
              transition={{ duration: 0.28 }}
              className="flex flex-1 flex-col"
            >
              <p
                className="mb-2 text-xs font-semibold uppercase tracking-widest"
                style={{ color: 'var(--teal)' }}
              >
                Question {currentQ.num}
              </p>
              <h2
                className="mb-6 font-semibold leading-snug"
                style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: 'var(--text-primary)' }}
              >
                {currentQ.text}
              </h2>

              <div className="flex flex-col gap-3">
                {currentQ.options.map((opt) => {
                  const selected = answers[step] === opt.key
                  return (
                    <motion.button
                      key={opt.key}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(opt.key)}
                      className="w-full rounded-xl p-4 text-left transition-colors"
                      style={{
                        background: selected ? 'rgba(236,72,153,0.06)' : 'var(--bg-card)',
                        border: selected ? '1.5px solid var(--pink)' : '1px solid var(--border)',
                        boxShadow: selected ? '0 0 12px rgba(236,72,153,0.08)' : '0 1px 3px rgba(0,0,0,0.04)',
                      }}
                    >
                      <span
                        className="orbitron mr-3 text-sm font-bold"
                        style={{ color: selected ? 'var(--pink)' : 'var(--purple)' }}
                      >
                        {opt.key}
                      </span>
                      <span className="text-[14px]" style={{ color: selected ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                        {opt.text}
                      </span>
                    </motion.button>
                  )
                })}
              </div>

              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="mt-6 flex items-center gap-1 self-start text-[13px]"
                  style={{ color: 'var(--text-footer)', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <ArrowLeft size={14} /> Back
                </button>
              )}
            </motion.section>
          )}

          {/* ── EMAIL GATE ────────────────────────────────────────────────────── */}
          {step === 'email' && (
            <motion.section
              key="email"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="flex flex-1 flex-col justify-center"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: 'var(--teal)' }}>
                Almost there!
              </p>
              <h2
                className="orbitron mb-2"
                style={{ fontSize: 'clamp(1.3rem, 3.5vw, 1.7rem)', fontWeight: 700 }}
              >
                Your AI Persona{' '}
                <span style={{ color: 'var(--pink)', textShadow: '0 0 20px rgba(236,72,153,0.4)' }}>
                  Awaits.
                </span>
              </h2>
              <p className="mb-6 text-[15px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Pop in your email to unlock your results. We&apos;ll also keep you in the loop on the Vibe-A-Long course — early access, best pricing, and no bro-energy required.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                <div className="min-w-0 flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouched(true)}
                    placeholder="your@email.com"
                    className="w-full rounded-xl px-4 py-3.5 text-sm placeholder:text-[var(--text-footer)] outline-none transition-colors"
                    style={{
                      background: 'var(--bg-card)',
                      color: 'var(--text-primary)',
                      border:
                        touched && !emailRegex.test(email)
                          ? '1.5px solid #DC2626'
                          : '1.5px solid var(--border)',
                    }}
                  />
                  {touched && !emailRegex.test(email) && (
                    <p className="mt-1 text-xs text-[#DC2626]">Please enter a valid email.</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitStatus === 'loading' ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Loading…</>
                  ) : (
                    <>Show Me My Results <ChevronRight size={16} /></>
                  )}
                </button>
              </form>

              <p className="mt-3 text-[11px]" style={{ color: 'var(--text-footer)' }}>
                No spam. Just AI stuff that matters to Gen X women.
              </p>

              <button
                onClick={() => setStep(questions.length - 1)}
                className="mt-4 flex items-center gap-1 self-start text-[13px]"
                style={{ color: 'var(--text-footer)', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <ArrowLeft size={14} /> Back to last question
              </button>
            </motion.section>
          )}

          {/* ── RESULT ────────────────────────────────────────────────────────── */}
          {step === 'result' && (
            <motion.section
              key="result"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="flex flex-1 flex-col"
            >
              {(() => {
                const p = personas[persona]
                return (
                  <>
                    <p
                      className="mb-3 text-xs font-semibold uppercase tracking-[0.28em]"
                      style={{ color: 'var(--teal)' }}
                    >
                      🏆 Your AI Persona
                    </p>

                    {/* Persona card */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35, delay: 0.1 }}
                      className="mb-5 rounded-2xl p-5 md:p-7"
                      style={{
                        background: 'var(--bg-card)',
                        border: `1.5px solid ${p.color}`,
                        boxShadow: `0 0 40px ${p.color}25`,
                      }}
                    >
                      <div className="mb-4 flex items-start gap-4">
                        <span className="text-5xl leading-none">{p.emoji}</span>
                        <div>
                          <h2
                            className="orbitron mb-0.5"
                            style={{
                              fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
                              fontWeight: 800,
                              color: p.color,
                              textShadow: `0 0 20px ${p.color}55`,
                            }}
                          >
                            {p.title}
                          </h2>
                          <p className="text-[12px]" style={{ color: 'var(--text-footer)' }}>
                            {p.subtitle}
                          </p>
                        </div>
                      </div>

                      <p
                        className="mb-3 text-[14px] font-medium italic leading-relaxed"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        &ldquo;{p.vibe}&rdquo;
                      </p>
                      <p className="mb-5 text-[14px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        {p.description}
                      </p>

                      <div
                        className="rounded-xl p-4"
                        style={{
                          background: 'rgba(107,33,168,0.06)',
                          border: '1px solid rgba(107,33,168,0.15)',
                        }}
                      >
                        <p
                          className="mb-1 text-[11px] font-semibold uppercase tracking-widest"
                          style={{ color: 'var(--teal)' }}
                        >
                          Your AI Goal
                        </p>
                        <p className="font-semibold" style={{ color: 'var(--text-primary)', fontSize: 14 }}>
                          {p.goal}
                        </p>
                        <p className="mt-1 text-[13px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                          {p.goalDetail}
                        </p>
                      </div>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.25 }}
                      className="mb-6 rounded-xl p-4 md:p-5"
                      style={{
                        background: 'rgba(236,72,153,0.05)',
                        border: '1px solid rgba(236,72,153,0.2)',
                      }}
                    >
                      <p
                        className="mb-1 text-[12px] font-semibold uppercase tracking-widest"
                        style={{ color: 'var(--pink)' }}
                      >
                        Ready to make it real?
                      </p>
                      <p className="mb-3 text-[13px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        The Vibe-A-Long is a 3-hour live session with Shaan &amp; Deb — built for exactly where you are. Date dropping soon. Be first to know.
                      </p>
                      <Link
                        href="/"
                        className="btn-primary inline-block text-center text-[14px]"
                        style={{ textDecoration: 'none' }}
                      >
                        Reserve My Spot →
                      </Link>
                    </motion.div>

                    {/* Retake */}
                    <button
                      onClick={restart}
                      className="flex items-center gap-1.5 self-start text-[13px]"
                      style={{
                        color: 'var(--text-footer)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <RotateCcw size={13} /> Retake the quiz
                    </button>
                  </>
                )
              })()}
            </motion.section>
          )}

        </AnimatePresence>

        {/* Footer */}
        <footer
          className="mt-10 flex flex-col items-start justify-between gap-3 pt-4 text-[11px] sm:flex-row sm:items-center"
          style={{ borderTop: '1px solid var(--border)', color: 'var(--text-footer)' }}
        >
          <p>
            <span style={{ color: 'var(--pink)' }}>They Promised Us Jetpacks</span>{' '}
            · AI education for GenX women
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="footer-link">Privacy</Link>
            <Link href="/terms" className="footer-link">Terms</Link>
          </div>
        </footer>
      </main>
    </div>
  )
}
