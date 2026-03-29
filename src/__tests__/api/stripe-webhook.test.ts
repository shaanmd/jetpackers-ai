import Stripe from 'stripe'

jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({}))
})

// We test the core logic in isolation — not the Next.js route handler itself
import { handleCheckoutCompleted } from '@/app/api/stripe/webhook/route'

const mockApplyTags = jest.fn()
const mockCreateOrUpdateContact = jest.fn()

jest.mock('@/lib/systemeio', () => ({
  createOrUpdateContact: (...args: unknown[]) => mockCreateOrUpdateContact(...args),
  applyTags: (...args: unknown[]) => mockApplyTags(...args),
}))

beforeEach(() => {
  mockCreateOrUpdateContact.mockReset()
  mockApplyTags.mockReset()
  mockCreateOrUpdateContact.mockResolvedValue('contact-789')
})

describe('handleCheckoutCompleted', () => {
  it('creates/updates contact and applies vibe-along-paid tag', async () => {
    const session = {
      customer_details: { email: 'buyer@example.com' },
    } as Stripe.Checkout.Session

    await handleCheckoutCompleted(session)

    expect(mockCreateOrUpdateContact).toHaveBeenCalledWith('buyer@example.com')
    expect(mockApplyTags).toHaveBeenCalledWith('contact-789', ['vibe-along-paid'])
  })

  it('does nothing if customer email is missing', async () => {
    const session = { customer_details: null } as Stripe.Checkout.Session

    await handleCheckoutCompleted(session)

    expect(mockCreateOrUpdateContact).not.toHaveBeenCalled()
    expect(mockApplyTags).not.toHaveBeenCalled()
  })
})
