import { createOrUpdateContact } from '@/lib/systemeio'

const mockFetch = jest.fn()
global.fetch = mockFetch

beforeEach(() => {
  mockFetch.mockReset()
  process.env.SYSTEME_IO_API_KEY = 'test-api-key'
})

describe('createOrUpdateContact', () => {
  it('creates a new contact', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, status: 201 })

    await createOrUpdateContact('test@example.com')

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.systeme.io/api/contacts',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ 'X-API-Key': 'test-api-key' }),
        body: expect.stringContaining('"test@example.com"'),
      })
    )
  })

  it('succeeds silently when contact already exists (422)', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 422 })

    await expect(createOrUpdateContact('test@example.com')).resolves.toBeUndefined()
    expect(mockFetch).toHaveBeenCalledTimes(1)
  })

  it('throws if API returns a non-422 error', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 500, text: async () => 'Server error' })

    await expect(createOrUpdateContact('test@example.com')).rejects.toThrow('systeme.io error: 500')
  })
})
