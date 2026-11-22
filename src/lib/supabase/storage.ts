import { getSupabaseClient } from '@/lib/supabase/client'

export async function uploadMembershipFile(path: string, file: File, bucket = 'membership-documents') {
  const supabase = getSupabaseClient()
  if (!supabase) throw new Error('Supabase is not configured')
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    upsert: true,
    contentType: file.type || undefined,
  })
  if (error) throw new Error(error.message)
  return path
}