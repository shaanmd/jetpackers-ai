# Sign-up Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `/sign-up` — a persona-aware sales page — and fix the quiz CTA, plus debug systeme.io contact creation.

**Architecture:** Two new files for the sign-up page (`page.tsx` shell + `SignUpClient.tsx` client component that reads `?persona=`). All persona copy lives in a `PERSONA_CONTENT` map in the client. Quiz CTA is a one-line fix. systeme.io debug adds response-body logging so we can see exactly what the API returns.

**Tech Stack:** Next.js 15 App Router, TypeScript, inline CSS (matching existing pattern in this codebase — no Tailwind component classes for new sections), `useSearchParams` hook.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/app/sign-up/page.tsx` | Create | Server Component shell; wraps client in `<Suspense>` (required for `useSearchParams`) |
| `src/app/sign-up/SignUpClient.tsx` | Create | Client Component; renders full page, reads `?persona=` param |
| `src/app/quiz/QuizClient.tsx` | Modify (line ~590) | Change CTA text and href |
| `src/lib/systemeio.ts` | Modify | Add response-body logging so we can see what systeme.io actually returns |

---

### Task 1: Scaffold the sign-up route

**Files:**
- Create: `src/app/sign-up/page.tsx`
- Create: `src/app/sign-up/SignUpClient.tsx` (empty shell)

- [ ] **Step 1: Create the server component shell**

`src/app/sign-up/page.tsx`:
```tsx
import { Suspense } from 'react'
import SignUpClient from './SignUpClient'

export const metadata = {
  title: 'Sign Up | Jetpackers AI',
  description:
    'Join Shaan & Deb for a 3-hour live session on 12 April. No tech experience needed.',
}

export default function SignUpPage() {
  return (
    <Suspense>
      <SignUpClient />
    </Suspense>
  )
}
```

- [ ] **Step 2: Create an empty SignUpClient placeholder**

`src/app/sign-up/SignUpClient.tsx`:
```tsx
'use client'

export default function SignUpClient() {
  return <div>Sign up page coming soon</div>
}
```

- [ ] **Step 3: Verify the route renders**

Run the dev server (`npm run dev`) and open http://localhost:3000/sign-up. Expected: page renders with "Sign up page coming soon".

- [ ] **Step 4: Commit**

```bash
git add src/app/sign-up/page.tsx src/app/sign-up/SignUpClient.tsx
git commit -m "feat: scaffold /sign-up route"
```

---

### Task 2: Build SignUpClient — persona data and structure

**Files:**
- Modify: `src/app/sign-up/SignUpClient.tsx`

- [ ] **Step 1: Replace placeholder with full component**

`src/app/sign-up/SignUpClient.tsx`:
```tsx
'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const STRIPE_URL = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_URL ?? '#'

type PersonaKey = 'A' | 'B' | 'C' | 'D'

interface PersonaContent {
  badge: string
  badgeColor: string
  borderColor: string
  headline: string
  sub: string
  calloutEmoji: string
  calloutTitle: string
  calloutBody: string
}

const PERSONA_CONTENT: Record<PersonaKey, PersonaContent> = {
  A: {
    badge: '📺 You\'re a Classic Hit',
    badgeColor: '#0D9488',
    borderColor: '#0D9488',
    headline: 'AI that works with your brain, not instead of it.',
    sub: "You value the human touch — and that's not going away. This session puts you firmly in the driver's seat. You decide what AI does for you.",
    calloutEmoji: '📺',
    calloutTitle: 'Built around your expertise',
    calloutBody:
      'As a Classic Hit, you have high standards and hard-won expertise. This session shows you how to use AI as a research partner — one that sharpens your thinking without replacing it.',
  },
  B: {
    badge: '💍 You\'re a Practical Pioneer',
    badgeColor: '#EC4899',
    borderColor: '#EC4899',
    headline: 'Stop drowning in admin. Start getting your time back.',
    sub: "You're ready to make the leap, and we're here to make it painless. No theory — just the shortcuts that actually free up your day.",
    calloutEmoji: '💍',
    calloutTitle: 'Results you can use on Monday',
    calloutBody:
      "As a Practical Pioneer, you want results you can use on Monday morning. This session hands you the everyday AI shortcuts that take the 'messy' off your plate — so you can spend your time on what actually matters.",
  },
  C: {
    badge: '💅 You\'re a Power Player',
    badgeColor: '#C084FC',
    borderColor: '#C084FC',
    headline: "You see the opportunity. Now let's make it real.",
    sub: "You don't need a tech background. You need three hours, a glass of wine, and your favourite 80s album.",
    calloutEmoji: '💅',
    calloutTitle: 'Built for where you are right now',
    calloutBody:
      "As a Power Player, you don't just want to dabble. You want to command AI. This session gives you the foundation to do exactly that: real prompts, real tools, and something you built yourself to show for it.",
  },
  D: {
    badge: '🐕 You\'re a Footrot Flats Traditionalist',
    badgeColor: '#F59E0B',
    borderColor: '#F59E0B',
    headline: 'Get the boring stuff handled. Then get back outside.',
    sub: "You don't want to live in front of a screen. Neither do we. This session finds you the one or two tools that quietly do the work — so you barely have to think about them.",
    calloutEmoji: '🐕',
    calloutTitle: 'Set it up once. Then forget it.',
    calloutBody:
      "As a Footrot Flats Traditionalist, your ideal AI is one you set up once and never think about again. We'll find your 'set and forget' setup — the tools that handle the life admin so you can get back to what you actually love.",
  },
}

const VALID_KEYS: PersonaKey[] = ['A', 'B', 'C', 'D']

function isPersonaKey(v: string | null): v is PersonaKey {
  return v !== null && (VALID_KEYS as string[]).includes(v)
}

export default function SignUpClient() {
  const params = useSearchParams()
  const rawPersona = params.get('persona')
  const persona = isPersonaKey(rawPersona) ? rawPersona : null
  const p = persona ? PERSONA_CONTENT[persona] : null

  const headline = p ? p.headline : 'From "what even is AI?" to building your own app in 3 hours.'
  const sub = p
    ? p.sub
    : 'A live online session for Gen X women. No tech experience needed. Just a laptop, a browser, and a little curiosity.'

  return (
    <div style={{ fontFamily: 'var(--font-dm), sans-serif', background: 'var(--bg)', minHeight: '100vh', color: 'var(--text-primary)' }}>

      {/* Nav */}
      <nav style={{ background: '#1A1A2E', padding: '14px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: 18, color: 'white', textDecoration: 'none' }}>
          Jetpackers<span style={{ color: 'var(--teal)' }}>AI</span>
        </Link>
        <a href={STRIPE_URL} className="btn-primary" style={{ fontSize: 14, padding: '10px 20px', textDecoration: 'none' }}>
          Sign Up Now →
        </a>
      </nav>

      {/* Hero */}
      <div style={{ background: '#1A1A2E', padding: '40px 32px 32px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: 'rgba(0,212,170,0.12)', border: '1px solid rgba(0,212,170,0.3)', color: '#00D4AA', fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', padding: '6px 14px', borderRadius: 20, marginBottom: 16 }}>
          Vinyl &amp; Vibe-Along · 12 April
        </div>

        {p && (
          <div style={{ display: 'inline-block', background: `${p.badgeColor}26`, border: `1px solid ${p.badgeColor}66`, color: p.badgeColor, fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', padding: '6px 14px', borderRadius: 20, marginBottom: 16, marginLeft: 8 }}>
            {p.badge}
          </div>
        )}

        <h1 style={{ fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 800, color: 'white', lineHeight: 1.15, marginBottom: 12 }}>
          {headline}
        </h1>
        <p style={{ fontSize: 15, color: '#9999BB', lineHeight: 1.7, maxWidth: 500, margin: '0 auto 20px' }}>
          {sub}
        </p>

        <div style={{ display: 'inline-flex', gap: 16, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 20px', fontSize: 13, color: '#CCCCDD', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ color: '#00D4AA', fontWeight: 600 }}>📅 12 April</span>
          <span style={{ color: '#00D4AA', fontWeight: 600 }}>⏰ 12pm AEST · 2pm NZT</span>
          <span style={{ color: '#00D4AA', fontWeight: 600 }}>🎧 Online · 6 spots</span>
        </div>
      </div>

      {/* Reassurance strip */}
      <div style={{ background: 'white', borderBottom: '1px solid #E2E2ED', padding: '18px 32px', display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
        {['No coding experience needed', 'Small group (max 6 women)', "You'll build something real"].map((item) => (
          <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 500 }}>
            <span style={{ color: 'var(--teal)', fontSize: 16 }}>✓</span> {item}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 680, margin: '0 auto', padding: 32 }}>

        {/* Persona callout — only shown when persona param is present */}
        {p && (
          <div style={{ background: 'white', border: `2px solid ${p.borderColor}`, borderRadius: 12, padding: '20px 24px', marginBottom: 24, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ fontSize: 36, flexShrink: 0 }}>{p.calloutEmoji}</div>
            <div>
              <h3 style={{ fontWeight: 800, fontSize: 16, color: 'var(--text-primary)', marginBottom: 4 }}>{p.calloutTitle}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{p.calloutBody}</p>
            </div>
          </div>
        )}

        {/* Fear buster */}
        <div style={{ background: '#FFF5FB', borderLeft: '3px solid var(--pink)', borderRadius: '0 10px 10px 0', padding: '16px 20px', marginBottom: 24 }}>
          <p style={{ fontSize: 14, lineHeight: 1.7 }}>
            Worried you&apos;re not technical enough?{' '}
            <strong style={{ color: 'var(--pink)' }}>That&apos;s exactly why we built this.</strong>{' '}
            Shaan and Deb are Gen X women who figured this out themselves. No computer science degree, no jargon. If you can Google something, you can do this.
          </p>
        </div>

        {/* Outcomes */}
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 12 }}>
          By the end of the session you will
        </div>
        <ul style={{ listStyle: 'none', marginBottom: 24 }}>
          {[
            { icon: '✍️', strong: 'Know how to write prompts that actually work.', rest: " No more vague results. You'll know how to ask AI the right way to get what you need." },
            { icon: '🛠️', strong: 'Have built something real.', rest: ' A web page or mini app you designed yourself. Not a template. Something that does something useful for you.' },
            { icon: '🧠', strong: 'Understand the tools.', rest: " We'll walk through Gemini and other AI tools so you know what they're good for (and what they're not)." },
            { icon: '💪', strong: 'Feel confident enough to keep going.', rest: " The goal isn't one session, it's giving you the confidence to explore on your own." },
          ].map(({ icon, strong, rest }) => (
            <li key={strong} style={{ padding: '12px 0', borderBottom: '1px solid #E2E2ED', fontSize: 14, display: 'flex', gap: 12, alignItems: 'flex-start', lineHeight: 1.5 }}>
              <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{icon}</span>
              <div><strong>{strong}</strong>{rest}</div>
            </li>
          ))}
        </ul>

        {/* Zero-tech promise */}
        <div style={{ background: '#1A1A2E', borderRadius: 12, padding: '20px 24px', marginBottom: 24, textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: '#9999BB', lineHeight: 1.7 }}>
            <strong style={{ color: 'white' }}>Zero tech experience required.</strong>{' '}
            We start from scratch. The only thing you need is a laptop, a browser, and a willingness to press the buttons. Shaan will be right there if anything goes sideways.
          </p>
        </div>

        {/* Pricing card */}
        <div style={{ background: 'white', border: '2px solid var(--pink)', borderRadius: 14, padding: 24, marginBottom: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 6 }}>Introductory price, first cohort only</div>
          <div style={{ fontSize: 42, fontWeight: 800, color: 'var(--pink)' }}>
            $67 <span style={{ fontSize: 18, color: 'var(--text-muted)', fontWeight: 400 }}>NZD</span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>3-hour live session · Sunday 12 April · Online</div>
          <div style={{ background: 'rgba(233,30,140,0.08)', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, color: 'var(--pink)', display: 'inline-block', marginBottom: 16 }}>
            ⚡ Only 6 spots — filling fast
          </div>
          <a href={STRIPE_URL} className="btn-primary" style={{ display: 'block', fontSize: 16, fontWeight: 800, textDecoration: 'none', textAlign: 'center', marginBottom: 10 }}>
            Sign Up Now →
          </a>
          <div style={{ fontSize: 12, color: 'var(--text-footer)' }}>Secure checkout via Stripe · Instant confirmation email</div>
        </div>

        {/* Trust / bio */}
        <div style={{ background: 'var(--bg)', borderRadius: 10, padding: '16px 20px', marginBottom: 24 }}>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>
            <strong>Shaan &amp; Deb</strong> are two Gen X vets who taught themselves AI from scratch. Shaan was a web designer and coding teacher. Deb tries every tool she can get her hands on. Neither of them had a roadmap. Now they&apos;re making one for you.
          </p>
        </div>

      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify all four personas render**

Open the following URLs and confirm the persona badge, headline, sub text, and callout box all look correct:
- http://localhost:3000/sign-up (generic — no badge or callout)
- http://localhost:3000/sign-up?persona=A (Classic Hit — teal badge)
- http://localhost:3000/sign-up?persona=B (Practical Pioneer — pink badge)
- http://localhost:3000/sign-up?persona=C (Power Player — purple badge)
- http://localhost:3000/sign-up?persona=D (Footrot Flats Traditionalist — amber badge)

- [ ] **Step 3: Commit**

```bash
git add src/app/sign-up/SignUpClient.tsx
git commit -m "feat: build persona-aware /sign-up page"
```

---

### Task 3: Fix quiz CTA

**Files:**
- Modify: `src/app/quiz/QuizClient.tsx` (line ~590)

- [ ] **Step 1: Update the CTA link**

Find this block (around line 584–595):
```tsx
<p className="mb-1 text-[12px] font-semibold uppercase tracking-widest"
   style={{ color: 'var(--pink)' }}>
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
```

Replace the `<Link>` element with:
```tsx
<Link
  href={`/sign-up?persona=${persona}`}
  className="btn-primary inline-block text-center text-[14px]"
  style={{ textDecoration: 'none' }}
>
  Sign Up Now →
</Link>
```

- [ ] **Step 2: Verify**

Complete the quiz at http://localhost:3000/quiz. On the result screen:
- Button text reads "Sign Up Now →"
- Clicking it navigates to `/sign-up?persona=C` (or whichever persona you scored)
- The sign-up page shows the matching persona badge and callout

- [ ] **Step 3: Commit**

```bash
git add src/app/quiz/QuizClient.tsx
git commit -m "fix: quiz CTA now links to /sign-up with persona param"
```

---

### Task 4: Debug systeme.io — add response body logging

The symptom: `/api/contact` returns HTTP 200 but contacts aren't consistently appearing in the systeme.io dashboard. We need to see the actual API response body to diagnose.

**Files:**
- Modify: `src/lib/systemeio.ts`

- [ ] **Step 1: Add response body logging**

Replace the current `createOrUpdateContact` implementation in `src/lib/systemeio.ts`:

```typescript
const SYSTEME_API = 'https://api.systeme.io/api'

function getApiKey(): string {
  const key = process.env.SYSTEME_IO_API_KEY
  if (!key) throw new Error('SYSTEME_IO_API_KEY is not set')
  return key
}

/**
 * Creates a contact in systeme.io, or silently succeeds if the contact already exists.
 */
export async function createOrUpdateContact(
  email: string,
  firstName?: string
): Promise<void> {
  const apiKey = getApiKey()

  const body: Record<string, unknown> = { email }
  if (firstName) body.firstName = firstName

  const res = await fetch(`${SYSTEME_API}/contacts`, {
    method: 'POST',
    headers: { 'X-API-Key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const responseText = await res.text()
  console.log(`[systemeio] POST /contacts status=${res.status} body=${responseText}`)

  // 422 = contact already exists, that's fine
  if (res.ok || res.status === 422) return

  throw new Error(`systeme.io error: ${res.status} — ${responseText}`)
}
```

- [ ] **Step 2: Test the endpoint via curl and check Vercel logs**

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"email":"test-debug@example.com","name":"Debug Test"}'
```

Expected response: `{"success":true}`

Then check the terminal running the dev server. You should see a line like:
```
[systemeio] POST /contacts status=200 body={"id":12345,"email":"test-debug@example.com",...}
```

If status is anything other than 200 or 422, or if the body contains an error, that's the bug.

- [ ] **Step 3: Commit**

```bash
git add src/lib/systemeio.ts
git commit -m "debug: log systeme.io API response body for diagnostics"
```

- [ ] **Step 4: Deploy to Vercel and check runtime logs**

```bash
git push
```

After deploying, sign up with a test email on the live site. In Vercel dashboard, go to the project → Logs → filter for `[systemeio]` to see the real API response in production.

---

## Environment Variables Checklist

Before deploying, ensure these are set in both `.env.local` and Vercel project settings:

| Variable | Status | Notes |
|---|---|---|
| `SYSTEME_IO_API_KEY` | Set | Verify it's the current key (not rotated) |
| `RESEND_API_KEY` | Set | |
| `RESEND_FROM_EMAIL` | Set | `jetpackersai@sdvetstudio.com` |
| `NEXT_PUBLIC_STRIPE_PAYMENT_URL` | **Missing** | Add the Stripe payment link before deploying |

To add `NEXT_PUBLIC_STRIPE_PAYMENT_URL` to `.env.local`:
```
NEXT_PUBLIC_STRIPE_PAYMENT_URL=https://buy.stripe.com/YOUR_LINK_HERE
```
