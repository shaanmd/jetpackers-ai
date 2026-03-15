import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const isConfigured =
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://example.supabase.co' &&
  supabaseAnonKey !== 'public-anon-key'

if (!isConfigured) {
  // eslint-disable-next-line no-console
  console.warn(
    'Supabase env vars are missing or placeholder. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local at the project root (not in src/) and restart the dev server.'
  )
}

export const supabase: SupabaseClient = createClient(
  supabaseUrl || 'https://example.supabase.co',
  supabaseAnonKey || 'public-anon-key'
)

export const isSupabaseConfigured = (): boolean => !!isConfigured

