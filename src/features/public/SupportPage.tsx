import { QrDonationPanel } from '@/components/institutional/QrDonationPanel'
import { SectionHero } from '@/components/institutional/SectionHero'
import { siteIdentity, supportTiles } from '@/data/site-content'

export function SupportPage() {
  return (
    <>
      <SectionHero
        title="Support My Mission"
        subtitle="A voluntary contribution for writings, teachings, publications, and humanitarian programs"
      />
      <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6">
        <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-ink/90">
          Your support helps share the Luminarian Philosophy, advance Transcendentalism-PH, produce
          books and learning materials, expand TMSI-LAPS and TLPS programs, and continue community and
          humanitarian initiatives.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {supportTiles.map((t) => (
            <div
              key={t}
              className="rounded-xl border border-gold/25 bg-white px-4 py-4 text-center text-sm font-medium text-forest shadow-sm"
            >
              {t}
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl border border-gold/25 bg-cream/40 p-6">
            <h2 className="font-display text-lg font-semibold text-forest">How to give</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-ink/90">
              <li>Scan the Metrobank QR or use InstaPay / QR Ph.</li>
              <li>Keep your reference number and screenshot.</li>
              <li>Email proof to {siteIdentity.emailReceipts} for acknowledgment.</li>
            </ol>
            <p className="mt-4 font-serif-body text-sm italic text-ink/80">
              Thank you for being part of the Mission of Light.
            </p>
          </div>
          <QrDonationPanel />
        </div>
      </div>
    </>
  )
}