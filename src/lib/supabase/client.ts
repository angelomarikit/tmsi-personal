import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export const supabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY,
)

let client: SupabaseClient | null = null

export function getSupabaseClient(): SupabaseClient | null {
  if (!supabaseConfigured) return null
  if (!client) {
    client = createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_ANON_KEY,
    )
  }
  return client
}