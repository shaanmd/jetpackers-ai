import { NextRequest, NextResponse } from 'next/server'
import { createOrUpdateContact } from '@/lib/systemeio'

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
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('systeme.io request failed:', err)
    return NextResponse.json({ error: 'Failed to reach systeme.io' }, { status: 502 })
  }
}
