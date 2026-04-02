import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'
import { createOrUpdateContact } from '@/lib/systemeio'
import { supabase } from '@/lib/supabaseClient'

const ADMIN_EMAILS = ['vet@vetalign.com.au', 'debprattley@hotmail.com']

const MEET_LINK = 'https://meet.google.com/qpv-ranp-dri'
const MEET_PHONE = '(AU) +61 2 9051 3953 PIN: 932 139 808#'

function buildConfirmationEmail(name: string | null): string {
  const greeting = name ? `Hi ${name.split(' ')[0]},` : 'Hi there,'
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.7; color: #1A1A2E; max-width: 600px; margin: 0 auto; padding: 24px;">

  <p>${greeting}</p>

  <p>Thanks for signing up for our Vinyl and Vibe-Along!</p>

  <p>We're excited about showing you how to get started using AI. It has so many uses, ranging from being a souped-up search engine to being your filing clerk or creating your own personal software. Like everything though, what you get out depends on what you put in.</p>

  <p>During the Vibe-Along session we'll get you writing your own prompts. We'll start with some basics so that you can ease in and get the hang of it, and discover the variety of things AI can do for you. Then we want to help you create your own web page or web app (a web app does something for you, like a meal planner or writing editor). If you have any ideas about what you'd like to make, please email us! We'll pick the most fun ideas for the group to do.</p>

  <p>Many AI-based programmes have free usage plans, but you can use up the free amounts pretty quickly. For the Vibe-Along, one of the programmes we'd like to use is Gemini, which is owned by Google. You can go to <a href="https://gemini.google.com">Gemini subscriptions</a>, and click on Google AI Pro. This is a paid subscription BUT you get a month for free, and you can cancel before the end of the month. You will have to make a Google account to sign in, if you don't already have one. If you need help, please shout and we'll take you through it.</p>

  <p><strong>📅 Sunday 12 April · 12:00–15:30 AEST (2:00–5:30 NZT)</strong></p>

  <p><strong>Join us online:</strong><br>
  <a href="${MEET_LINK}">${MEET_LINK}</a><br>
  Or dial in: ${MEET_PHONE}</p>

  <p>See you in the nearby future!</p>
  <p>Shaan &amp; Deb</p>

  <hr style="border: none; border-top: 1px solid #E2E2ED; margin: 24px 0;">

  <p><strong>Your to-do list:</strong></p>
  <ul>
    <li>Reply to this email and tell us what you'd like to have included in the Vibe-Along</li>
    <li>Sign up for Google and the Google AI Pro account</li>
    <li>Dig out that 80s background music!! Not compulsory, but fun 😊</li>
  </ul>

</body>
</html>
  `.trim()
}

/**
 * Core logic exported for unit testing.
 */
export async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session
): Promise<void> {
  const email = session.customer_details?.email
  if (!email) return

  const name = session.customer_details?.name ?? null

  await createOrUpdateContact(email)

  // Record paid signup for spot tracking
  const { error: dbError } = await supabase
    .from('paid_signups')
    .upsert({ email, name }, { onConflict: 'email' })
  if (dbError) console.error('[webhook] paid_signups insert error:', dbError.message)

  const resendKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL
  if (resendKey && fromEmail) {
    const resend = new Resend(resendKey)
    await Promise.allSettled([
      resend.emails.send({
        from: fromEmail,
        to: email,
        subject: "You're in! Vinyl & Vibe-Along — 12 April",
        html: buildConfirmationEmail(name),
      }),
      resend.emails.send({
        from: fromEmail,
        to: ADMIN_EMAILS,
        subject: `New Vibe-Along signup: ${name || email}`,
        html: `<p>New paid signup for the Vinyl &amp; Vibe-Along.</p><p><strong>Email:</strong> ${email}${name ? `<br><strong>Name:</strong> ${name}` : ''}</p>`,
      }),
    ])
  } else {
    console.warn('Resend not configured — skipping confirmation email')
  }
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

  const stripeKey = process.env.STRIPE_SECRET_KEY
  if (!stripeKey) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  }
  const stripe = new Stripe(stripeKey, { apiVersion: '2026-03-25.dahlia' })

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
