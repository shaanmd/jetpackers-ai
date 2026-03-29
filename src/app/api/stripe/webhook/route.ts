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
