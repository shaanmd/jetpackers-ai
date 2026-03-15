import { useState } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient'

type Status = 'idle' | 'loading' | 'success' | 'error'

export const useWaitlist = () => {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  const joinWaitlist = async (email: string) => {
    if (!email) return
    setStatus('loading')
    setMessage('')

    if (!isSupabaseConfigured()) {
      setStatus('error')
      setMessage(
        'Waitlist is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local in the project root and restart the dev server.'
      )
      return
    }

    const { error } = await supabase.from('waitlist').insert([{ email }])

    if (error) {
      if ((error as { code?: string }).code === '23505') {
        setStatus('success')
        setMessage("You're already on the list! We'll be in touch soon.")
      } else {
        setStatus('error')
        setMessage(error.message || 'Oops! Something went wrong. Please try again.')
      }
    } else {
      setStatus('success')
      setMessage("Thanks for joining! We'll notify you as soon as we launch.")
    }
  }

  return { joinWaitlist, status, message }
}

