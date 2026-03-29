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
