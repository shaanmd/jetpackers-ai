# Sign-up Page Design

**Date:** 2026-04-01
**Route:** `/sign-up`

## Overview

A sales page that converts quiz-takers and direct traffic into paying attendees for the Vinyl & Vibe-Along session. The page has two rendering modes controlled by a `?persona=` URL param. The CTA links directly to the Stripe payment page.

A secondary change ships with this: the quiz result page CTA is updated from "Reserve My Spot" to "Sign Up Now" with the link changed from `/` to `/sign-up`.

---

## URL Param Behaviour

| Condition | Behaviour |
|---|---|
| `?persona=power-player` (or any valid persona slug) | Persona-aware mode: shows persona badge, swapped headline, persona callout box |
| No param / unrecognised value | Generic mode: outcome-focused headline, no persona elements |

The page is a standard Next.js Client Component that reads `useSearchParams()` on mount.

Valid persona keys (matching quiz result values in `QuizClient.tsx`):
- `C` — The Power Player
- `A` — The Classic Hit
- `B` — The Practical Pioneer
- `D` — The Footrot Flats Traditionalist

All four personas have tailored copy. Generic mode is only shown when no param is present (direct traffic).

The quiz result page passes the key as-is: `/sign-up?persona=C`

---

## Page Structure

Both modes share the same skeleton. Only the highlighted elements differ.

```
Nav
Hero                        ← headline + subtext differ by mode
Reassurance strip
[Persona callout box]       ← persona mode only
Fear-buster box
Outcomes list
Zero-tech promise box
Pricing card + CTA
Trust / bio section
```

### Nav
- Logo: `JetpackersAI` (teal accent on "AI")
- CTA button: "Sign Up Now →" (links to Stripe)

### Hero

All modes show the session details pill: `📅 12 April · ⏰ 12pm AEST / 2pm NZT · 🎧 Online · 6 spots`

**Generic (no param)**
- Headline: *From "what even is AI?" to building your own app in 3 hours.*
- Subtext: *A live online session for Gen X women. No tech experience needed. Just a laptop, a browser, and a little curiosity.*

**A — The Classic Hit** (📺)
- Badge: `📺 You're a Classic Hit`
- Headline: *AI that works with your brain, not instead of it.*
- Subtext: *You value the human touch — and that's not going away. This session puts you firmly in the driver's seat. You decide what AI does for you.*

**B — The Practical Pioneer** (💍)
- Badge: `💍 You're a Practical Pioneer`
- Headline: *Stop drowning in admin. Start getting your time back.*
- Subtext: *You're ready to make the leap, and we're here to make it painless. No theory — just the shortcuts that actually free up your day.*

**C — The Power Player** (💅)
- Badge: `💅 You're a Power Player`
- Headline: *You see the opportunity. Now let's make it real.*
- Subtext: *You don't need a tech background. You need three hours, a glass of wine, and your favourite 80s album.*

**D — The Footrot Flats Traditionalist** (🐕)
- Badge: `🐕 You're a Footrot Flats Traditionalist`
- Headline: *Get the boring stuff handled. Then get back outside.*
- Subtext: *You don't want to live in front of a screen. Neither do we. This session finds you the one or two tools that quietly do the work — so you barely have to think about them.*

### Reassurance strip
Three trust ticks (same in all modes):
- No coding experience needed
- Small group (max 6 women)
- You'll build something real

### Persona callout box (persona mode only)
Bordered card with persona emoji and tailored copy.

**A — The Classic Hit**
> "As a Classic Hit, you have high standards and hard-won expertise. This session shows you how to use AI as a research partner — one that sharpens your thinking without replacing it."

**B — The Practical Pioneer**
> "As a Practical Pioneer, you want results you can use on Monday morning. This session hands you the everyday AI shortcuts that take the 'messy' off your plate — so you can spend your time on what actually matters."

**C — The Power Player**
> "As a Power Player, you don't just want to dabble. You want to command AI. This session gives you the foundation to do exactly that: real prompts, real tools, and something you built yourself to show for it."

**D — The Footrot Flats Traditionalist**
> "As a Footrot Flats Traditionalist, your ideal AI is one you set up once and never think about again. We'll find your 'set and forget' setup — the tools that handle the life admin so you can get back to what you actually love."

### Fear-buster box
Addresses the primary objection ("I'm not technical enough"):
> "Worried you're not technical enough? **That's exactly why we built this.** Shaan and Deb are Gen X women who figured this out themselves. No computer science degree, no jargon. If you can Google something, you can do this."

### Outcomes list
Four items (same in both modes):
1. **Know how to write prompts that actually work.** No more vague results.
2. **Have built something real.** A web page or mini app you designed yourself.
3. **Understand the tools.** Gemini and other AI tools — what they're good for.
4. **Feel confident enough to keep going.** The goal is confidence to explore on your own.

### Zero-tech promise box
Dark card:
> **Zero tech experience required.** We start from scratch. The only thing you need is a laptop, a browser, and a willingness to press the buttons. Shaan will be right there if anything goes sideways.

### Pricing card
- Price: **$67 NZD**
- Note: "Introductory price, first cohort only"
- Scarcity: "⚡ Only 6 spots — filling fast"
- CTA: **"Sign Up Now →"** → links to Stripe payment URL
- Sub-note: "Secure checkout via Stripe · Instant confirmation email"

### Trust / bio
> **Shaan & Deb** are two Gen X vets who taught themselves AI from scratch. Shaan was a web designer and coding teacher. Deb tries every tool she can get her hands on. Neither of them had a roadmap. Now they're making one for you.

---

## Quiz CTA Change

In `src/app/quiz/QuizClient.tsx`, update the result screen CTA:
- Text: `"Reserve My Spot →"` → `"Sign Up Now →"`
- `href`: `/` → `/sign-up?persona=${persona}` where `persona` is the current `Answer` state value (`A`/`B`/`C`/`D`)

The persona slug is already known at quiz result time — it should be appended as a query param so the sign-up page can render in persona-aware mode.

---

## Implementation Notes

- New file: `src/app/sign-up/page.tsx` (Server Component shell with `<Suspense>`)
- New file: `src/app/sign-up/SignUpClient.tsx` (Client Component — reads `useSearchParams`)
- Stripe payment URL stored as `NEXT_PUBLIC_STRIPE_PAYMENT_URL` env var — **new, needs adding** to `.env.local` and Vercel
- No form on this page — CTA is a plain `<a href>` to Stripe
- All persona data (badge text, headline, subtext, callout copy) lives in a `PERSONA_CONTENT` map in the client component
- Styling follows existing design system: `#1A1A2E` dark, `#EC4899` pink, `#00D4AA` teal, DM Sans font

---

## Out of Scope

- Multiple cohort dates
- Countdown timer
- Email capture on this page (handled by quiz + newsletter flows)
- Additional persona pages for future cohorts
