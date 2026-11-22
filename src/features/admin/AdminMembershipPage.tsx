import { getSupabaseClient } from '@/lib/supabase/client'
import { userFacingError } from '@/lib/user-facing-message'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

type AppRow = {
  id: string
  reference_code: string | null
  full_name: string
  email: string
  category_code: string
  status: string
  submitted_at: string | null
}

export function AdminMembershipPage() {
  const [rows, setRows] = useState<AppRow[]>([])

  async function load() {
    const supabase = getSupabaseClient()
    if (!supabase) return
    const { data } = await supabase
      .from('tlps_membership_applications')
      .select('id, reference_code, full_name, email, category_code, status, submitted_at')
      .order('submitted_at', { ascending: false })
    setRows((data as AppRow[]) ?? [])
  }

  useEffect(() => {
    void load()
  }, [])

  async function setStatus(id: string, status: 'approved' | 'rejected') {
    const supabase = getSupabaseClient()
    if (!supabase) return
    const { error } = await supabase.from('tlps_membership_applications').update({ status }).eq('id', id)
    if (error) {
      toast.error(userFacingError(error))
      return
    }
    toast.success(`Marked as ${status}`)
    void load()
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Link to="/admin" className="text-sm text-forest underline">
        ← Dashboard
      </Link>
      <h1 className="font-display mt-4 text-2xl font-semibold text-forest">TLPS applications</h1>
      <div className="mt-6 overflow-x-auto rounded-xl border border-gold/25 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-gold/20 bg-cream/50">
            <tr>
              <th className="px-4 py-3">Reference</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-gold/10">
                <td className="px-4 py-3 font-mono text-xs">{r.reference_code}</td>
                <td className="px-4 py-3">
                  <div>{r.full_name}</div>
                  <div className="text-xs text-ink/60">{r.email}</div>
                </td>
                <td className="px-4 py-3">{r.category_code}</td>
                <td className="px-4 py-3 capitalize">{r.status}</td>
                <td className="px-4 py-3">
                  {r.status === 'submitted' ? (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="rounded-full bg-forest px-3 py-1 text-xs text-white"
                        onClick={() => void setStatus(r.id, 'approved')}
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        className="rounded-full border border-gold/40 px-3 py-1 text-xs"
                        onClick={() => void setStatus(r.id, 'rejected')}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    '—'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}