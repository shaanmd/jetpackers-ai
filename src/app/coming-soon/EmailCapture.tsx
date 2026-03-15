'use client'

import { FormEvent, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { useWaitlist } from '@/hooks/useWaitlist'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function EmailCapture() {
  const { joinWaitlist, status, message } = useWaitlist()
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState(false)

  const isInvalid = touched && (!email || !emailRegex.test(email))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!email || !emailRegex.test(email)) return
    await joinWaitlist(email.trim())
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
          background: 'rgba(26,23,48,0.95)',
          border: '1.5px solid rgba(236,72,153,0.3)',
          boxShadow: '0 8px 32px rgba(236,72,153,0.1)',
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
              <p className="orbitron text-[17px] font-semibold text-white mb-1">
                🚀 You&apos;re in!
              </p>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {message || "You're on the list. We'll be in touch with AI tips, early access, and updates — not just course dates."}
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
                  className="w-full rounded-md px-3.5 py-3 text-sm text-white placeholder:text-[rgba(255,255,255,0.4)] outline-none transition-colors"
                  style={{
                    border: isInvalid
                      ? '1.5px solid #FCA5A5'
                      : '1.5px solid rgba(255,255,255,0.15)',
                    background: 'rgba(255,255,255,0.05)',
                  }}
                />
                {isInvalid && (
                  <p className="mt-1 text-xs text-[#FCA5A5]">
                    Please enter a valid email address.
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold text-white whitespace-nowrap transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: 'var(--pink)',
                  boxShadow: '0 0 20px rgba(236,72,153,0.35)',
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
        <p className="mt-2 text-xs text-[#FCA5A5] text-center sm:text-left">{message}</p>
      )}
    </motion.div>
  )
}
