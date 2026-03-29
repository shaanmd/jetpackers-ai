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
