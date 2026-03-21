import { NextRequest, NextResponse } from 'next/server'

const SYSTEME_API = 'https://api.systeme.io/api'

export async function POST(req: NextRequest) {
  const apiKey = process.env.SYSTEME_IO_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Systeme.io API key is not configured' },
      { status: 500 }
    )
  }

  let body: { email: string; name?: string; source?: string }
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
    // Build contact fields
    const fields: { slug: string; value: string }[] = []
    if (body.source) {
      fields.push({ slug: 'source', value: body.source })
    }

    const contactPayload: Record<string, unknown> = { email: email.trim() }
    if (name) contactPayload.firstName = name.trim()
    if (fields.length > 0) contactPayload.fields = fields

    const res = await fetch(`${SYSTEME_API}/contacts`, {
      method: 'POST',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactPayload),
    })

    // 422 usually means contact already exists — that's fine
    if (res.ok || res.status === 422) {
      return NextResponse.json({ success: true })
    }

    const errorData = await res.text()
    console.error('Systeme.io API error:', res.status, errorData)
    return NextResponse.json(
      { error: 'Failed to create contact', detail: errorData },
      { status: res.status }
    )
  } catch (err) {
    console.error('Systeme.io request failed:', err)
    return NextResponse.json(
      { error: 'Failed to reach systeme.io' },
      { status: 502 }
    )
  }
}
