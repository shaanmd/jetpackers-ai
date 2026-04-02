import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

const MAX_SPOTS = 6

export async function GET() {
  const { count, error } = await supabase
    .from('paid_signups')
    .select('*', { count: 'exact', head: true })

  if (error) {
    console.error('[spots] Supabase error:', error.message)
    // Fail open — don't block signups if DB is unreachable
    return NextResponse.json({ count: 0, soldOut: false, spotsLeft: MAX_SPOTS })
  }

  const taken = count ?? 0
  return NextResponse.json({
    count: taken,
    soldOut: taken >= MAX_SPOTS,
    spotsLeft: Math.max(0, MAX_SPOTS - taken),
  })
}
