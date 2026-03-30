import Stripe from 'stripe'

jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({}))
})

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: { send: jest.fn().mockResolvedValue({ id: 'email-123' }) },
  })),
}))

import { handleCheckoutCompleted } from '@/app/api/stripe/webhook/route'

const mockCreateOrUpdateContact = jest.fn()

jest.mock('@/lib/systemeio', () => ({
  createOrUpdateContact: (...args: unknown[]) => mockCreateOrUpdateContact(...args),
}))

beforeEach(() => {
  mockCreateOrUpdateContact.mockReset()
  process.env.RESEND_API_KEY = 'test-resend-key'
  process.env.RESEND_FROM_EMAIL = 'test@sdvetstudio.com'
})

describe('handleCheckoutCompleted', () => {
  it('creates/updates contact on payment', async () => {
    const session = {
      customer_details: { email: 'buyer@example.com', name: 'Jane Smith' },
    } as Stripe.Checkout.Session

    await handleCheckoutCompleted(session)

    expect(mockCreateOrUpdateContact).toHaveBeenCalledWith('buyer@example.com')
  })

  it('does nothing if customer email is missing', async () => {
    const session = { customer_details: null } as Stripe.Checkout.Session

    await handleCheckoutCompleted(session)

    expect(mockCreateOrUpdateContact).not.toHaveBeenCalled()
  })
})
