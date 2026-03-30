# systeme.io Integration Design

**Date:** 2026-03-29
**Project:** Jetpackers AI — Vibe-Along course
**Scope:** Tag-based CRM, email automations, Stripe webhook

---

## Overview

Wire up systeme.io as the single source of truth for contact management, email automations, and (eventually) course hosting. Contacts enter via three entry points — quiz, newsletter signup, or Stripe payment — and are tagged appropriately. Tags drive all automations automatically.

Course hosting inside systeme.io (uploading videos, PDFs, lesson pages) is out of scope for this phase.

---

## Tags

All tags are created in the systeme.io dashboard. A contact can hold multiple tags simultaneously.

| Tag | Applied when |
|-----|-------------|
| `quiz-completed` | Contact finishes the quiz and submits their email |
| `persona-classic-hit` | Quiz result = A (The Classic Hit) |
| `persona-practical-pioneer` | Quiz result = B (The Practical Pioneer) |
| `persona-power-player` | Quiz result = C (The Power Player) |
| `persona-traditionalist` | Quiz result = D (The Footrot Flats Traditionalist) |
| `newsletter` | Contact signs up via the footer newsletter form |
| `vibe-along-paid` | Stripe payment confirmed via webhook |

---

## Automations

### Automation 1: Nurture Sequence
- **Trigger:** `quiz-completed` tag applied
- **Exit condition:** `vibe-along-paid` tag applied (systeme.io stops the sequence)
- **Behaviour after Day 21:** Contact rolls into regular newsletter broadcasts with no separate sequence

| Delay | Email | Notes |
|-------|-------|-------|
| Immediately | "Here's your AI persona" | Their result, warm welcome, soft intro to Vibe-Along |
| Day 3 | "What can you actually do with AI?" | Educational, low-pressure, links back to course page |
| Day 7 | "Real women, real results" | Social proof, what the session looks like |
| Day 14 | "The Vibe-Along is coming up…" | Urgency/scarcity (6 spots), direct CTA to buy |
| Day 21 | "Still curious?" | Final nudge before evergreen newsletter rhythm |

---

### Automation 2: Onboarding (Post-Payment)
- **Trigger:** `vibe-along-paid` tag applied
- **Course date:** Saturday 12 April 2026, 12pm AEST / 2pm NZT

| Timing | Email | Content |
|--------|-------|---------|
| Immediately | Confirmation — you're in! | Date/time, what to expect, Zoom link coming soon |
| 9 April | Pre-course prep | What to have ready (laptop, headphones, browser), Zoom link |
| 11 April | Almost time! | Zoom link, practical checklist, get excited |
| 12 April morning | See you today! | Zoom link, start time reminder |
| 13 April | Thank you + next steps | Recording link (if sharing), newsletter invite, next session discount |

---

### Automation 3: Newsletter Welcome
- **Trigger:** `newsletter` tag applied
- **Condition:** Only fires if contact does NOT already have `quiz-completed` (avoids double-welcoming quiz takers)

| Delay | Email |
|-------|-------|
| Immediately | Welcome to the newsletter — what to expect, first tip |
| Ongoing | Regular broadcast emails written and sent manually from systeme.io |

---

## Code Changes

### 1. Enhance `/api/contact`
**File:** `src/app/api/contact/route.ts`

Currently accepts `{ email, name, source }` and maps source to a systeme.io field. Needs to also accept an optional `tags` array and apply each tag to the contact via the systeme.io API (`POST /api/contacts/{id}/tags` or equivalent).

### 2. Enhance quiz submission
**File:** `src/app/quiz/QuizClient.tsx`

Currently sends `{ email, source: 'quiz-completed' }`. Needs to also send:
- Tag: `quiz-completed`
- Tag: the persona tag derived from the result (e.g. `persona-power-player`)

Persona → tag mapping:
- A → `persona-classic-hit`
- B → `persona-practical-pioneer`
- C → `persona-power-player`
- D → `persona-traditionalist`

### 3. New Stripe Webhook
**File:** `src/app/api/stripe/webhook/route.ts` (new)

Listens for Stripe `checkout.session.completed` events:
1. Verify webhook signature using `STRIPE_WEBHOOK_SECRET`
2. Extract `customer_details.email` from the event
3. Call systeme.io API to create/update contact
4. Apply tag: `vibe-along-paid`

**Environment variables needed:**
- `STRIPE_WEBHOOK_SECRET` — from Stripe dashboard
- `SYSTEME_IO_API_KEY` — already exists

**Stripe dashboard config:**
- Add webhook endpoint: `https://yourdomain.com/api/stripe/webhook`
- Event to listen for: `checkout.session.completed`

### 4. Newsletter signup tag
**File:** `src/app/coming-soon/page.tsx` (FooterNewsletter component)

Currently calls `/api/contact` with `source: 'newsletter'`. Add `tags: ['newsletter']` to the request body.

---

## Data Flow Summary

```
Quiz completed
  → /api/contact { email, tags: ['quiz-completed', 'persona-X'] }
  → systeme.io contact created/updated with tags
  → Nurture automation starts

Newsletter signup
  → /api/contact { email, tags: ['newsletter'] }
  → systeme.io contact created/updated with tag
  → Newsletter welcome automation starts (if not already quiz-completed)

Stripe payment
  → Stripe fires checkout.session.completed
  → /api/stripe/webhook
  → systeme.io contact updated with tag: vibe-along-paid
  → Nurture automation stops
  → Onboarding automation starts

Supabase (unchanged)
  → Quiz answers + persona stored as backup
```

---

## Out of Scope (This Phase)
- systeme.io course hosting (videos, PDFs, lesson pages) — future phase
- Stripe refund handling
- Multiple course dates / cohort management
