const SYSTEME_API = 'https://api.systeme.io/api'

function getApiKey(): string {
  const key = process.env.SYSTEME_IO_API_KEY
  if (!key) throw new Error('SYSTEME_IO_API_KEY is not set')
  return key
}

/**
 * Creates a contact in systeme.io, or silently succeeds if the contact already exists.
 */
export async function createOrUpdateContact(
  email: string,
  firstName?: string
): Promise<void> {
  const apiKey = getApiKey()

  const body: Record<string, unknown> = { email }
  if (firstName) body.firstName = firstName

  const res = await fetch(`${SYSTEME_API}/contacts`, {
    method: 'POST',
    headers: { 'X-API-Key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const responseText = await res.text()
  console.log(`[systemeio] status=${res.status}`)
  console.log(`[systemeio] body=${responseText.slice(0, 300)}`)

  // 422 = contact already exists, that's fine
  if (res.ok || res.status === 422) return

  throw new Error(`systeme.io error: ${res.status} — ${responseText}`)
}
