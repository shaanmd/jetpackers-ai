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
    if (!lookup.ok) {
      const detail = await lookup.text()
      throw new Error(`systeme.io error looking up contact: ${lookup.status} — ${detail}`)
    }
    const data = await lookup.json()
    if (!data.items || data.items.length === 0) {
      throw new Error(`systeme.io: contact not found after 422 for email ${email}`)
    }
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
    tags.map(async (tag) => {
      const res = await fetch(`${SYSTEME_API}/contacts/${contactId}/tags`, {
        method: 'POST',
        headers: { 'X-API-Key': apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: tag }),
      })
      if (!res.ok) {
        console.warn(`systeme.io: failed to apply tag "${tag}" to contact ${contactId} (${res.status})`)
      }
    })
  )
}
