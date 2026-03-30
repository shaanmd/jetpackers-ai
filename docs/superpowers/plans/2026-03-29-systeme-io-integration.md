# systeme.io Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire up systeme.io as the contact/automation hub for Jetpackers AI — tagging quiz completers, newsletter signups, and Stripe buyers so the right email sequences fire automatically.

**Architecture:** A shared `src/lib/systemeio.ts` helper handles all systeme.io API calls. The existing `/api/contact` route is enhanced to accept and apply tags. A new `/api/stripe/webhook` route verifies Stripe payment events and applies the `vibe-along-paid` tag. Quiz and newsletter entry points are updated to pass the correct tags.

**Tech Stack:** Next.js 16 App Router, TypeScript, systeme.io REST API v2, Stripe SDK (webhook verification), Jest + ts-jest (tests)

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `src/lib/systemeio.ts` | systeme.io API helpers: create/update contact, apply tags |
| Modify | `src/app/api/contact/route.ts` | Accept `tags[]` in request body, delegate to systemeio helpers |
| Create | `src/app/api/stripe/webhook/route.ts` | Verify Stripe signature, apply `vibe-along-paid` tag |
| Modify | `src/app/quiz/QuizClient.tsx` | Pass `quiz-completed` + persona tag on quiz submit |
| Modify | `src/app/coming-soon/page.tsx` | Pass `newsletter` tag on footer newsletter submit |
| Create | `src/__tests__/lib/systemeio.test.ts` | Unit tests for systeme.io helpers |
| Create | `src/__tests__/api/stripe-webhook.test.ts` | Unit tests for webhook handler logic |
| Create | `jest.config.js` | Jest config for Next.js + TypeScript |
| Modify | `package.json` | Add jest, ts-jest, @types/jest, stripe dev deps |

---

## Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install Stripe SDK and Jest dependencies**

```bash
npm install stripe
npm install --save-dev jest jest-environment-node ts-jest @types/jest
```

- [ ] **Step 2: Verify installation**

```bash
npx jest --version
```
Expected: prints a version number (e.g. `29.x.x`)

- [ ] **Step 3: Create jest.config.js**

```js
// jest.config.js
const nextJest = require('next/jest')
const createJestConfig = nextJest({ dir: './' })

module.exports = createJestConfig({
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/__tests__/**/*.test.ts'],
})
```

- [ ] **Step 4: Add test script to package.json**

Open `package.json` and add `"test": "jest"` to the `scripts` section:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "test": "jest"
}
```

- [ ] **Step 5: Create test directories**

```bash
mkdir -p src/__tests__/lib src/__tests__/api
```

- [ ] **Step 6: Commit**

```bash
git add jest.config.js package.json package-lock.json
git commit -m "chore: add stripe sdk and jest test setup"
```

---

## Task 2: systeme.io Helper Library

**Files:**
- Create: `src/lib/systemeio.ts`
- Create: `src/__tests__/lib/systemeio.test.ts`

The systeme.io API base URL is `https://api.systeme.io/api`. Auth is via `X-API-Key` header.

- Creating a contact: `POST /contacts` with body `{ email, firstName?, fields?, tags? }` where `tags` is `[{ name: string }]`. Returns 201 on success, 422 if contact already exists.
- Getting a contact by email: `GET /contacts?email={email}` — returns `{ items: [{ id, email, ... }] }`.
- Adding a tag to a contact: `POST /contacts/{id}/tags` with body `{ name: string }`. Returns 201.

- [ ] **Step 1: Write the failing tests**

Create `src/__tests__/lib/systemeio.test.ts`:

```typescript
import { createOrUpdateContact, applyTags } from '@/lib/systemeio'

const mockFetch = jest.fn()
global.fetch = mockFetch

beforeEach(() => {
  mockFetch.mockReset()
  process.env.SYSTEME_IO_API_KEY = 'test-api-key'
})

describe('createOrUpdateContact', () => {
  it('creates a new contact and returns the id', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 201,
      json: async () => ({ id: 'contact-123', email: 'test@example.com' }),
    })

    const id = await createOrUpdateContact('test@example.com')

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.systeme.io/api/contacts',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ 'X-API-Key': 'test-api-key' }),
        body: expect.stringContaining('"test@example.com"'),
      })
    )
    expect(id).toBe('contact-123')
  })

  it('fetches existing contact id when creation returns 422', async () => {
    mockFetch
      .mockResolvedValueOnce({ ok: false, status: 422 })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ items: [{ id: 'contact-456', email: 'test@example.com' }] }),
      })

    const id = await createOrUpdateContact('test@example.com')

    expect(mockFetch).toHaveBeenCalledTimes(2)
    expect(mockFetch).toHaveBeenNthCalledWith(
      2,
      'https://api.systeme.io/api/contacts?email=test%40example.com',
      expect.objectContaining({ headers: expect.objectContaining({ 'X-API-Key': 'test-api-key' }) })
    )
    expect(id).toBe('contact-456')
  })

  it('throws if API returns non-422 error', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 500, text: async () => 'Server error' })

    await expect(createOrUpdateContact('test@example.com')).rejects.toThrow('systeme.io error: 500')
  })
})

describe('applyTags', () => {
  it('posts each tag to the contact tags endpoint', async () => {
    mockFetch.mockResolvedValue({ ok: true, status: 201 })

    await applyTags('contact-123', ['quiz-completed', 'persona-power-player'])

    expect(mockFetch).toHaveBeenCalledTimes(2)
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.systeme.io/api/contacts/contact-123/tags',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ name: 'quiz-completed' }),
      })
    )
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.systeme.io/api/contacts/contact-123/tags',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ name: 'persona-power-player' }),
      })
    )
  })

  it('does nothing when tags array is empty', async () => {
    await applyTags('contact-123', [])
    expect(mockFetch).not.toHaveBeenCalled()
  })
})
```

- [ ] **Step 2: Run the tests to confirm they fail**

```bash
npx jest src/__tests__/lib/systemeio.test.ts --no-coverage
```
Expected: FAIL — `Cannot find module '@/lib/systemeio'`

- [ ] **Step 3: Create `src/lib/systemeio.ts`**

```typescript
const SYSTEME_API = 'https://api.systeme.io/api'

function getApiKey(): string {
  const key = process.env.SYSTEME_IO_API_KEY
  if (!key) throw new Error('SYSTEME_IO_API_KEY is not set')
  return key
}

/**
 * Creates a contact in systeme.io or fetches the existing contact's ID.
 * Returns the systeme.io contact ID.
 */
export async function createOrUpdateContact(
  email: string,
  firstName?: string
): Promise<string> {
  const apiKey = getApiKey()

  const body: Record<string, unknown> = { email }
  if (firstName) body.firstName = firstName

  const res = await fetch(`${SYSTEME_API}/contacts`, {
    method: 'POST',
    headers: { 'X-API-Key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (res.ok) {
    const data = await res.json()
    return data.id as string
  }

  if (res.status === 422) {
    // Contact already exists — fetch it by email
    const lookup = await fetch(
      `${SYSTEME_API}/contacts?email=${encodeURIComponent(email)}`,
      { headers: { 'X-API-Key': apiKey } }
    )
    const data = await lookup.json()
    return data.items[0].id as string
  }

  const detail = await res.text()
  throw new Error(`systeme.io error: ${res.status} — ${detail}`)
}

/**
 * Applies one or more tags to a contact by ID.
 * Tags that already exist on the contact are silently ignored by systeme.io.
 */
export async function applyTags(contactId: string, tags: string[]): Promise<void> {
  if (tags.length === 0) return
  const apiKey = getApiKey()

  await Promise.all(
    tags.map((tag) =>
      fetch(`${SYSTEME_API}/contacts/${contactId}/tags`, {
        method: 'POST',
        headers: { 'X-API-Key': apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: tag }),
      })
    )
  )
}
```

- [ ] **Step 4: Run the tests to confirm they pass**

```bash
npx jest src/__tests__/lib/systemeio.test.ts --no-coverage
```
Expected: PASS — all 4 tests green

- [ ] **Step 5: Commit**

```bash
git add src/lib/systemeio.ts src/__tests__/lib/systemeio.test.ts
git commit -m "feat: add systeme.io helper library with create/update contact and tag support"
```

---

## Task 3: Enhance `/api/contact` to Accept Tags

**Files:**
- Modify: `src/app/api/contact/route.ts`

- [ ] **Step 1: Replace the contents of `src/app/api/contact/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createOrUpdateContact, applyTags } from '@/lib/systemeio'

export async function POST(req: NextRequest) {
  if (!process.env.SYSTEME_IO_API_KEY) {
    return NextResponse.json({ error: 'Systeme.io API key is not configured' }, { status: 500 })
  }

  let body: { email: string; name?: string; source?: string; tags?: string[] }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { email, name, tags = [] } = body
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
  }

  try {
    const contactId = await createOrUpdateContact(email, name)
    if (tags.length > 0) {
      await applyTags(contactId, tags)
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('systeme.io request failed:', err)
    return NextResponse.json({ error: 'Failed to reach systeme.io' }, { status: 502 })
  }
}
```

- [ ] **Step 2: Run all tests to confirm nothing broke**

```bash
npx jest --no-coverage
```
Expected: PASS — all existing tests still green

- [ ] **Step 3: Commit**

```bash
git add src/app/api/contact/route.ts
git commit -m "feat: enhance /api/contact to accept and apply systeme.io tags"
```

---

## Task 4: Update Newsletter Signup to Pass Tag

**Files:**
- Modify: `src/app/coming-soon/page.tsx`

- [ ] **Step 1: Update the `submit` call in `FooterNewsletter`**

In `src/app/coming-soon/page.tsx`, find the `handleSubmit` function inside `FooterNewsletter` (around line 43). Change:

```typescript
await submit({ email, source: 'newsletter' })
```

to:

```typescript
await submit({ email, source: 'newsletter', tags: ['newsletter'] })
```

- [ ] **Step 2: Update `src/hooks/useContact.ts` to accept and forward tags**

Replace the `ContactOptions` interface and `submit` function signature:

```typescript
import { useState } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient'

type Status = 'idle' | 'loading' | 'success' | 'error'

interface ContactOptions {
  email: string
  name?: string
  source: string
  tags?: string[]
}

export const useContact = () => {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  const submit = async ({ email, name, source, tags }: ContactOptions) => {
    if (!email) return
    setStatus('loading')
    setMessage('')

    // 1. Primary: systeme.io (via server-side API route)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), name: name?.trim(), source, tags }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        console.warn('Systeme.io error:', data)
      }
    } catch (err) {
      console.warn('Systeme.io request failed:', err)
    }

    // 2. Backup: Supabase
    if (isSupabaseConfigured()) {
      try {
        await supabase.from('waitlist').insert([{ email: email.trim() }])
      } catch (err) {
        console.warn('Supabase backup insert failed:', err)
      }
    }

    setStatus('success')
    setMessage("Thanks for joining! We'll be in touch soon.")
  }

  return { submit, status, message }
}
```

- [ ] **Step 3: Run the dev server and manually verify**

```bash
npm run dev
```

Navigate to `http://localhost:3000/coming-soon`, scroll to the footer newsletter form, submit an email. Check the network tab — the POST to `/api/contact` should include `"tags":["newsletter"]` in the request body.

- [ ] **Step 4: Commit**

```bash
git add src/app/coming-soon/page.tsx src/hooks/useContact.ts
git commit -m "feat: pass newsletter tag to systeme.io on footer newsletter signup"
```

---

## Task 5: Update Quiz Submission to Pass Persona Tags

**Files:**
- Modify: `src/app/quiz/QuizClient.tsx`

- [ ] **Step 1: Add the persona → tag mapping constant**

In `src/app/quiz/QuizClient.tsx`, after the `personas` constant (around line 150), add:

```typescript
const personaTagMap: Record<Answer, string> = {
  A: 'persona-classic-hit',
  B: 'persona-practical-pioneer',
  C: 'persona-power-player',
  D: 'persona-traditionalist',
}
```

- [ ] **Step 2: Update the `handleSubmit` function to send tags**

In the same file, find the `handleSubmit` function. Replace the `/api/contact` fetch call (around line 205) with:

```typescript
try {
  await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email.trim(),
      source: 'quiz-completed',
      tags: ['quiz-completed', personaTagMap[p]],
    }),
  })
} catch (err) {
  console.warn('Systeme.io request failed:', err)
}
```

- [ ] **Step 3: Run the dev server and manually verify**

```bash
npm run dev
```

Navigate to `http://localhost:3000/quiz`, complete all 7 questions, enter an email and submit. Check the network tab — the POST to `/api/contact` should include `"tags":["quiz-completed","persona-X"]` where X matches the dominant answer.

- [ ] **Step 4: Commit**

```bash
git add src/app/quiz/QuizClient.tsx
git commit -m "feat: send quiz-completed and persona tags to systeme.io on quiz submit"
```

---

## Task 6: Stripe Webhook Endpoint

**Files:**
- Create: `src/app/api/stripe/webhook/route.ts`
- Create: `src/__tests__/api/stripe-webhook.test.ts`

The Stripe webhook receives a raw POST body and a `Stripe-Signature` header. We use `stripe.webhooks.constructEvent(rawBody, signature, secret)` to verify it. The event type is `checkout.session.completed`. The customer's email is at `event.data.object.customer_details.email`.

- [ ] **Step 1: Write the failing tests**

Create `src/__tests__/api/stripe-webhook.test.ts`:

```typescript
import Stripe from 'stripe'

// We test the core logic in isolation — not the Next.js route handler itself
import { handleCheckoutCompleted } from '@/app/api/stripe/webhook/route'

const mockApplyTags = jest.fn()
const mockCreateOrUpdateContact = jest.fn()

jest.mock('@/lib/systemeio', () => ({
  createOrUpdateContact: (...args: unknown[]) => mockCreateOrUpdateContact(...args),
  applyTags: (...args: unknown[]) => mockApplyTags(...args),
}))

beforeEach(() => {
  mockCreateOrUpdateContact.mockReset()
  mockApplyTags.mockReset()
  mockCreateOrUpdateContact.mockResolvedValue('contact-789')
})

describe('handleCheckoutCompleted', () => {
  it('creates/updates contact and applies vibe-along-paid tag', async () => {
    const session = {
      customer_details: { email: 'buyer@example.com' },
    } as Stripe.Checkout.Session

    await handleCheckoutCompleted(session)

    expect(mockCreateOrUpdateContact).toHaveBeenCalledWith('buyer@example.com')
    expect(mockApplyTags).toHaveBeenCalledWith('contact-789', ['vibe-along-paid'])
  })

  it('does nothing if customer email is missing', async () => {
    const session = { customer_details: null } as Stripe.Checkout.Session

    await handleCheckoutCompleted(session)

    expect(mockCreateOrUpdateContact).not.toHaveBeenCalled()
    expect(mockApplyTags).not.toHaveBeenCalled()
  })
})
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
npx jest src/__tests__/api/stripe-webhook.test.ts --no-coverage
```
Expected: FAIL — `Cannot find module '@/app/api/stripe/webhook/route'`

- [ ] **Step 3: Create the webhook route**

Create `src/app/api/stripe/webhook/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createOrUpdateContact, applyTags } from '@/lib/systemeio'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2025-01-27.acacia',
})

/**
 * Core logic exported for unit testing.
 */
export async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session
): Promise<void> {
  const email = session.customer_details?.email
  if (!email) return

  const contactId = await createOrUpdateContact(email)
  await applyTags(contactId, ['vibe-along-paid'])
}

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  const rawBody = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    try {
      await handleCheckoutCompleted(session)
    } catch (err) {
      console.error('Failed to process checkout.session.completed:', err)
      return NextResponse.json({ error: 'Internal error processing event' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}
```

- [ ] **Step 4: Run the tests to confirm they pass**

```bash
npx jest src/__tests__/api/stripe-webhook.test.ts --no-coverage
```
Expected: PASS — both tests green

- [ ] **Step 5: Add environment variables**

Create or update `.env.local` with:
```
STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
STRIPE_SECRET_KEY=sk_live_your_secret_key_here
```

> These values come from the Stripe dashboard (see Task 7).

- [ ] **Step 6: Run the full test suite**

```bash
npx jest --no-coverage
```
Expected: PASS — all tests green

- [ ] **Step 7: Commit**

```bash
git add src/app/api/stripe/webhook/route.ts src/__tests__/api/stripe-webhook.test.ts
git commit -m "feat: add stripe webhook endpoint to apply vibe-along-paid tag on payment"
```

---

## Task 7: Configure Stripe Dashboard Webhook

This task is done in the Stripe dashboard, not in code.

- [ ] **Step 1: Get your deployed URL**

Your webhook URL will be: `https://your-deployed-domain.com/api/stripe/webhook`

If testing locally, use the Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```
The CLI will print a webhook signing secret starting with `whsec_` — use this as `STRIPE_WEBHOOK_SECRET` in `.env.local`.

- [ ] **Step 2: Add webhook in Stripe dashboard**

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click **Add endpoint**
3. URL: `https://your-deployed-domain.com/api/stripe/webhook`
4. Events to listen for: select `checkout.session.completed`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_`) → set as `STRIPE_WEBHOOK_SECRET` in your production environment variables (Vercel, etc.)

- [ ] **Step 3: Get your Stripe Secret Key**

1. Go to Stripe Dashboard → Developers → API keys
2. Copy the **Secret key** (starts with `sk_live_` for production, `sk_test_` for test)
3. Set as `STRIPE_SECRET_KEY` in your production environment variables

- [ ] **Step 4: Trigger a test payment**

Use Stripe's test mode to complete a checkout via the payment link and confirm:
- The webhook fires in the Stripe dashboard (Developers → Webhooks → your endpoint → recent deliveries)
- The contact appears in systeme.io with the `vibe-along-paid` tag

---

## Task 8: Final Verification

- [ ] **Step 1: Run the full test suite one last time**

```bash
npx jest --no-coverage
```
Expected: PASS — all tests green

- [ ] **Step 2: Build to confirm no TypeScript errors**

```bash
npm run build
```
Expected: Build completes with no errors

- [ ] **Step 3: Smoke test all three entry points manually**

| Entry point | Action | Expected in systeme.io |
|-------------|--------|------------------------|
| Quiz | Complete quiz, submit email | Contact with `quiz-completed` + persona tag |
| Newsletter | Submit footer form | Contact with `newsletter` tag |
| Stripe (test mode) | Complete test payment | Contact with `vibe-along-paid` tag |

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete systeme.io integration — quiz, newsletter, and stripe webhook"
```

---

## systeme.io Dashboard Checklist (Manual Setup)

The following must be created inside systeme.io itself — these cannot be done via code:

- [ ] Create all 7 tags: `quiz-completed`, `persona-classic-hit`, `persona-practical-pioneer`, `persona-power-player`, `persona-traditionalist`, `newsletter`, `vibe-along-paid`
- [ ] Create Automation 1 (Nurture): trigger = `quiz-completed` tag, exit = `vibe-along-paid` tag, 5 emails over 21 days
- [ ] Create Automation 2 (Onboarding): trigger = `vibe-along-paid` tag, 5 emails from now to 13 April
- [ ] Create Automation 3 (Newsletter welcome): trigger = `newsletter` tag, condition = does NOT have `quiz-completed`
- [ ] Write and load email content for all sequences (see spec for copy brief per email)
