import { getSupabaseClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type Inquiry = {
  id: string
  full_name: string
  email: string
  subject: string
  message: string
  created_at: string
  status: string
}

export function AdminInquiriesPage() {
  const [rows, setRows] = useState<Inquiry[]>([])

  useEffect(() => {
    const supabase = getSupabaseClient()
    if (!supabase) return
    void supabase
      .from('contact_inquiries')
      .select('id, full_name, email, subject, message, created_at, status')
      .order('created_at', { ascending: false })
      .then(({ data }) => setRows((data as Inquiry[]) ?? []))
  }, [])

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Link to="/admin" className="text-sm text-forest underline">
        ← Dashboard
      </Link>
      <h1 className="font-display mt-4 text-2xl font-semibold text-forest">Contact inquiries</h1>
      <ul className="mt-6 space-y-4">
        {rows.map((r) => (
          <li key={r.id} className="rounded-xl border border-gold/20 bg-white p-4 text-sm shadow-sm">
            <p className="font-semibold text-forest">
              {r.full_name} — {r.subject}
            </p>
            <p className="text-xs text-ink/60">
              {r.email} · {new Date(r.created_at).toLocaleString()}
            </p>
            <p className="mt-2 whitespace-pre-wrap text-ink/85">{r.message}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}