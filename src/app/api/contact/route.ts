import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createOrUpdateContact } from '@/lib/systemeio'

const ADMIN_EMAILS = ['vet@vetalign.com.au', 'debprattley@hotmail.com']

function buildNewsletterConfirmation(name?: string): string {
  const greeting = name ? `Hi ${name.split(' ')[0]},` : 'Hi there,'
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.7; color: #1A1A2E; max-width: 600px; margin: 0 auto; padding: 24px;">

  <p>${greeting}</p>

  <p>You're on the list! Welcome to Jetpackers AI.</p>

  <p>We're two Gen X women who taught ourselves AI from scratch — no computer science degree, no jargon. We share what's actually useful: the tools, the shortcuts, and the things worth knowing.</p>

  <p>If you're curious about getting started with AI (but don't want to spend hours wading through tech content), you're in the right place.</p>

  <p>We also run live online sessions called <strong>Vinyl &amp; Vibe-Alongs</strong> — small group workshops where you learn by doing, with good music on in the background. Our next one is <strong>Sunday 12 April</strong>. If you'd like a spot, <a href="https://www.jetpackersai.com/sign-up">grab one here</a> before they go.</p>

  <p>Talk soon,<br>Shaan &amp; Deb</p>

</body>
</html>
  `.trim()
}

export async function POST(req: NextRequest) {
  if (!process.env.SYSTEME_IO_API_KEY) {
    return NextResponse.json({ error: 'Systeme.io API key is not configured' }, { status: 500 })
  }

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

  try {
    await createOrUpdateContact(email, name)
  } catch (err) {
    console.error('systeme.io request failed:', err)
    return NextResponse.json({ error: 'Failed to reach systeme.io' }, { status: 502 })
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
        subject: "You're on the list! Jetpackers AI",
        html: buildNewsletterConfirmation(name),
      }),
      resend.emails.send({
        from: fromEmail,
        to: ADMIN_EMAILS,
        subject: `New newsletter signup: ${displayName}`,
        html: `<p>New newsletter signup on Jetpackers AI.</p><p><strong>Email:</strong> ${email}${name ? `<br><strong>Name:</strong> ${name}` : ''}</p>`,
      }),
    ])
  } else {
    console.warn('Resend not configured — skipping emails')
  }

  return NextResponse.json({ success: true })
}
