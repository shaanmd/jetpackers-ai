import { useState } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient'

type Status = 'idle' | 'loading' | 'success' | 'error'

interface ContactOptions {
  email: string
  name?: string
  source: string
}

export const useContact = () => {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  const submit = async ({ email, name, source }: ContactOptions) => {
    if (!email) return
    setStatus('loading')
    setMessage('')

    // 1. Primary: systeme.io (via server-side API route)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), name: name?.trim(), source }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        console.warn('Systeme.io error:', data)
      }
    } catch (err) {
      console.warn('Systeme.io request failed:', err)
    }

    // 2. Backup: Supabase
    if (isSupabaseConfigured()) {
      try {
        await supabase.from('waitlist').insert([{ email: email.trim() }])
      } catch (err) {
        console.warn('Supabase backup insert failed:', err)
      }
    }

    setStatus('success')
    setMessage("Thanks for joining! We'll be in touch soon.")
  }

  return { submit, status, message }
}
