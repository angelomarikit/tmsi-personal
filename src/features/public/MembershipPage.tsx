import { SectionHero } from '@/components/institutional/SectionHero'
import { membershipCategories, siteIdentity } from '@/data/site-content'
import { formatPhp } from '@/lib/utils'
import { CheckCircle2, FileDown } from 'lucide-react'
import { Link } from 'react-router-dom'

const benefits = [
  'Digital membership certificate',
  'TLPS member ID card (when applicable)',
  'Community updates and philosophical forums',
  'Networking with Luminarians worldwide',
  'Priority access to selected programs',
]

const steps = [
  'Download or complete the online application form.',
  'Attach ID photo, signature, and credentials if required.',
  'Submit online or email transcendentalism65@gmail.com.',
  'Pay membership fee (if applicable) and upload proof.',
  'Receive digital credentials after registrar approval.',
]

export function MembershipPage() {
  return (
    <>
      <SectionHero
        title="The Luminarian Philosophical Society (TLPS)"
        subtitle="A community of seekers, thinkers, and practitioners of the Luminarian Philosophy"
      />
      <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          <section className="rounded-xl border border-gold/25 bg-white p-5 shadow-sm">
            <h2 className="font-display text-lg font-semibold text-forest">Membership Categories</h2>
            <ul className="mt-4 space-y-3">
              {membershipCategories.map((c) => (
                <li key={c.code} className="rounded-lg border border-gold/15 p-3 text-sm">
                  <p className="font-semibold text-forest">{c.title}</p>
                  <p className="text-xs text-ink/75">{c.subtitle}</p>
                  <p className="mt-1 text-xs font-medium text-gold">
                    {c.fee === 0 ? 'FREE' : formatPhp(c.fee)} — {c.note}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-gold/25 bg-white p-5 shadow-sm">
            <h2 className="font-display text-lg font-semibold text-forest">Membership Benefits</h2>
            <ul className="mt-4 space-y-2">
              {benefits.map((b) => (
                <li key={b} className="flex gap-2 text-sm text-ink/90">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-forest" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
            <Link
              to="/membership/apply"
              className="btn-gloss-green mt-6 flex w-full justify-center rounded-full py-3 text-sm font-semibold text-white"
            >
              Apply for TLPS Membership Now →
            </Link>
            <a
              href="/assets/books/tlps-membership-form.pdf"
              download
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-gold/40 py-2.5 text-sm font-semibold text-forest"
            >
              <FileDown className="h-4 w-4" aria-hidden />
              Download Application Form (PDF)
            </a>
          </section>

          <section className="rounded-xl border border-gold/25 bg-cream/50 p-5 shadow-sm">
            <h2 className="font-display text-lg font-semibold text-forest">How to Apply</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-ink/90">
              {steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <p className="mt-4 text-xs text-ink/70">Questions? {siteIdentity.emailPrimary}</p>
          </section>
        </div>
      </div>
    </>
  )
}