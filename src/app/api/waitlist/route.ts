import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createOrUpdateContact } from '@/lib/systemeio'

const ADMIN_EMAILS = ['vet@vetalign.com.au', 'debprattley@hotmail.com']

function buildWaitlistConfirmation(name?: string): string {
  const greeting = name ? `Hi ${name.split(' ')[0]},` : 'Hi there,'
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.7; color: #1A1A2E; max-width: 600px; margin: 0 auto; padding: 24px;">

  <p>${greeting}</p>

  <p>You're on the waitlist for the next Jetpackers AI Vinyl &amp; Vibe-Along — and you'll be the first to know when a new cohort opens.</p>

  <p>Our sessions are small (max 6 people) so they fill fast. Being on this list means you get first dibs before we open it up publicly.</p>

  <p>In the meantime, we'll keep you in the loop with what's actually useful in the AI world — no hype, no jargon. Just the stuff that's worth knowing.</p>

  <p>Talk soon,<br>Shaan &amp; Deb</p>

</body>
</html>
  `.trim()
}

export async function POST(req: NextRequest) {
  let body: { email: string; name?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { email, name } = body
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
  }

  // Add to systeme.io (may silently 422 if already exists — that's fine)
  if (process.env.SYSTEME_IO_API_KEY) {
    try {
      await createOrUpdateContact(email, name)
    } catch (err) {
      console.error('[waitlist] systeme.io error:', err)
    }
  }

  const resendKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL
  if (resendKey && fromEmail) {
    const resend = new Resend(resendKey)
    const displayName = name || email

    await Promise.allSettled([
      resend.emails.send({
        from: fromEmail,
        to: email,
        subject: "You're on the waitlist — Jetpackers AI",
        html: buildWaitlistConfirmation(name),
      }),
      resend.emails.send({
        from: fromEmail,
        to: ADMIN_EMAILS,
        subject: `New waitlist signup: ${displayName}`,
        html: `<p>New waitlist signup on Jetpackers AI (cohort is full).</p><p><strong>Email:</strong> ${email}${name ? `<br><strong>Name:</strong> ${name}` : ''}</p>`,
      }),
    ])
  } else {
    console.warn('[waitlist] Resend not configured — skipping emails')
  }

  return NextResponse.json({ success: true })
}
