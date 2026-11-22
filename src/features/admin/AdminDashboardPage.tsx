import { useAuth } from '@/contexts/AuthContext'
import { getSupabaseClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type Stats = {
  members: number
  essays: number
  inquiries: number
  pendingApps: number
}

export function AdminDashboardPage() {
  const { signOut } = useAuth()
  const [stats, setStats] = useState<Stats>({ members: 0, essays: 0, inquiries: 0, pendingApps: 0 })

  useEffect(() => {
    const supabase = getSupabaseClient()
    if (!supabase) return

    void (async () => {
      const [m, e, c, p] = await Promise.all([
        supabase
          .from('tlps_membership_applications')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'approved'),
        supabase.from('essays').select('id', { count: 'exact', head: true }),
        supabase.from('contact_inquiries').select('id', { count: 'exact', head: true }),
        supabase
          .from('tlps_membership_applications')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'submitted'),
      ])
      setStats({
        members: m.count ?? 0,
        essays: e.count ?? 0,
        inquiries: c.count ?? 0,
        pendingApps: p.count ?? 0,
      })
    })()
  }, [])

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-semibold text-forest">Website Admin Dashboard</h1>
        <button type="button" onClick={() => void signOut()} className="text-sm text-forest underline">
          Logout
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="TLPS members (approved)" value={stats.members} />
        <Stat label="Published essays" value={stats.essays} />
        <Stat label="Contact inquiries" value={stats.inquiries} />
        <Stat label="Pending applications" value={stats.pendingApps} />
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AdminTile to="/admin/membership" title="TLPS applications" />
        <AdminTile to="/admin/essays" title="Manage essays" />
        <AdminTile to="/admin/inquiries" title="Contact inquiries" />
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-gold/25 bg-white p-4 text-center shadow-sm">
      <p className="text-2xl font-semibold text-forest">{value}</p>
      <p className="mt-1 text-xs text-ink/70">{label}</p>
    </div>
  )
}

function AdminTile({ to, title }: { to: string; title: string }) {
  return (
    <Link
      to={to}
      className="rounded-xl border border-gold/30 bg-forest px-4 py-8 text-center text-sm font-semibold text-gold-light shadow-sm hover:bg-emerald-institutional"
    >
      {title}
    </Link>
  )
}