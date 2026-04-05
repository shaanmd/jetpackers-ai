'use client'

import { FormEvent, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { useContact } from '@/hooks/useContact'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function EmailCapture() {
  const { submit, status, message } = useContact()
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState(false)

  const isInvalid = touched && (!email || !emailRegex.test(email))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!email || !emailRegex.test(email)) return
    await submit({ email: email.trim(), source: 'waitlist-vinyl' })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full"
    >
      <div
        className="rounded-2xl px-4 py-4 sm:px-5 sm:py-5"
        style={{
          background: 'var(--bg-card)',
          border: '1.5px solid rgba(236,72,153,0.2)',
          boxShadow: '0 2px 16px rgba(236,72,153,0.06)',
        }}
      >
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <p className="orbitron text-[17px] font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                🚀 You&apos;re in!
              </p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {message || "You're on the list. We'll be in touch with AI tips, early access, and updates - not just course dates."}
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              layout
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 items-stretch"
            >
              <div className="flex-1 min-w-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched(true)}
                  placeholder="your@email.com"
                  className="w-full rounded-md px-3.5 py-3 text-sm placeholder:text-[var(--text-footer)] outline-none transition-colors"
                  style={{
                    border: isInvalid
                      ? '1.5px solid #DC2626'
                      : '1.5px solid var(--border)',
                    background: 'var(--bg)',
                    color: 'var(--text-primary)',
                  }}
                />
                {isInvalid && (
                  <p className="mt-1 text-xs text-[#DC2626]">
                    Please enter a valid email address.
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold whitespace-nowrap transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: 'var(--pink)',
                  color: 'white',
                  boxShadow: '0 0 16px rgba(236,72,153,0.2)',
                }}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Joining…
                  </>
                ) : (
                  'Join the Waitlist'
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
      {status === 'error' && message && (
        <p className="mt-2 text-xs text-[#DC2626] text-center sm:text-left">{message}</p>
      )}
    </motion.div>
  )
}
