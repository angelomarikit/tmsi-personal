import { useAuth } from '@/contexts/AuthContext'
import { siteIdentity } from '@/data/site-content'
import { getSupabaseClient } from '@/lib/supabase/client'
import { fetchAnnouncements } from '@/lib/supabase/queries'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type MembershipRow = {
  reference_code: string | null
  category_code: string | null
  status: string | null
  submitted_at: string | null
}

export function MemberDashboardPage() {
  const { session, signOut } = useAuth()
  const [membership, setMembership] = useState<MembershipRow | null>(null)
  const [announcements, setAnnouncements] = useState<
    { id: string; title: string; body: string | null; event_date: string | null }[]
  >([])

  useEffect(() => {
    const supabase = getSupabaseClient()
    if (!supabase || !session?.user) return

    void supabase
      .from('tlps_membership_applications')
      .select('reference_code, category_code, status, submitted_at')
      .eq('applicant_id', session.user.id)
      .order('submitted_at', { ascending: false })
      .limit(1)
      .maybeSingle()
      .then(({ data }) => setMembership(data))

    void fetchAnnouncements().then(setAnnouncements)
  }, [session?.user?.id])

  const name = session?.user?.user_metadata?.full_name ?? siteIdentity.shortName

  return (
    <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[240px_1fr]">
      <aside className="rounded-xl border border-gold/30 bg-forest p-4 text-white">
        <h2 className="font-display text-lg font-semibold text-gold">TLPS Member Portal</h2>
        <nav className="mt-4 space-y-1 text-sm">
          <Link to="/dashboard" className="block rounded-lg bg-gold/20 px-3 py-2">
            Dashboard
          </Link>
          <Link to="/membership" className="block rounded-lg px-3 py-2 hover:bg-white/10">
            My membership
          </Link>
          <Link to="/books" className="block rounded-lg px-3 py-2 hover:bg-white/10">
            My downloads
          </Link>
          <button
            type="button"
            onClick={() => void signOut()}
            className="mt-4 w-full rounded-lg px-3 py-2 text-left hover:bg-white/10"
          >
            Logout
          </button>
        </nav>
      </aside>

      <div>
        <div className="flex flex-wrap items-start gap-4 rounded-xl border border-gold/25 bg-white p-6 shadow-sm">
          <img
            src="/assets/hero/portrait.png"
            alt=""
            className="h-20 w-20 rounded-full border border-gold/30 object-cover"
          />
          <div>
            <h1 className="font-display text-2xl font-semibold text-forest">Welcome, {name}!</h1>
            {membership ? (
              <dl className="mt-2 grid gap-1 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-ink/60">Reference</dt>
                  <dd className="font-medium">{membership.reference_code}</dd>
                </div>
                <div>
                  <dt className="text-ink/60">Category</dt>
                  <dd className="font-medium">{membership.category_code}</dd>
                </div>
                <div>
                  <dt className="text-ink/60">Status</dt>
                  <dd className="font-medium capitalize">{membership.status}</dd>
                </div>
              </dl>
            ) : (
              <p className="mt-2 text-sm text-ink/75">
                No membership on file.{' '}
                <Link to="/membership/apply" className="text-forest underline">
                  Apply now
                </Link>
              </p>
            )}
          </div>
        </div>

        <section className="mt-8 rounded-xl border border-gold/25 bg-cream/40 p-5">
          <h2 className="font-display text-lg font-semibold text-forest">Announcements</h2>
          <ul className="mt-3 space-y-3 text-sm">
            {announcements.length === 0 ? (
              <li className="text-ink/70">No announcements yet.</li>
            ) : (
              announcements.map((a) => (
                <li key={a.id} className="rounded-lg border border-gold/15 bg-white p-3">
                  <p className="font-semibold text-forest">{a.title}</p>
                  {a.body ? <p className="mt-1 text-ink/85">{a.body}</p> : null}
                </li>
              ))
            )}
          </ul>
        </section>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Quick href="/essays" label="My essays" />
          <Quick href="/books" label="Books & PDFs" />
          <Quick href="/support" label="Support mission" />
        </div>
      </div>
    </div>
  )
}

function Quick({ href, label }: { href: string; label: string }) {
  return (
    <Link
      to={href}
      className="rounded-xl border border-gold/25 bg-white px-4 py-6 text-center text-sm font-semibold text-forest shadow-sm hover:bg-cream/50"
    >
      {label}
    </Link>
  )
}