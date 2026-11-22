import { getSupabaseClient } from '@/lib/supabase/client'

export type DbEssay = {
  slug: string
  title: string
  excerpt: string | null
  category: string | null
  published_at: string | null
  featured: boolean | null
}

export async function fetchPublishedEssays(): Promise<DbEssay[] | null> {
  const supabase = getSupabaseClient()
  if (!supabase) return null
  const { data, error } = await supabase
    .from('essays')
    .select('slug, title, excerpt, category, published_at, featured')
    .eq('published', true)
    .order('published_at', { ascending: false })
  if (error || !data?.length) return null
  return data
}

export async function fetchAnnouncements(limit = 5) {
  const supabase = getSupabaseClient()
  if (!supabase) return []
  const { data } = await supabase
    .from('announcements')
    .select('id, title, body, event_date')
    .eq('published', true)
    .order('event_date', { ascending: false })
    .limit(limit)
  return data ?? []
}