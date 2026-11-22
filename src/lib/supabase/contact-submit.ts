import { getSupabaseClient } from '@/lib/supabase/client'

export type ContactPayload = {
  fullName: string
  email: string
  mobile: string
  subject: string
  message: string
}

export async function submitContactInquiry(payload: ContactPayload) {
  const supabase = getSupabaseClient()
  if (!supabase) throw new Error('Supabase is not configured')

  const { error } = await supabase.from('contact_inquiries').insert({
    full_name: payload.fullName.trim(),
    email: payload.email.trim(),
    mobile: payload.mobile.trim() || null,
    subject: payload.subject.trim(),
    message: payload.message.trim(),
    status: 'new',
  })

  if (error) throw new Error(error.message)
}