import { siteIdentity } from '@/data/site-content'

type QrDonationPanelProps = {
  compact?: boolean
}

export function QrDonationPanel({ compact }: QrDonationPanelProps) {
  return (
    <div
      className={
        compact
          ? 'rounded-xl border border-gold/30 bg-white p-4 shadow-sm'
          : 'rounded-xl border border-gold/35 bg-white p-6 shadow-md'
      }
    >
      <h3 className="font-display text-lg font-semibold text-forest">
        {compact ? 'Support the Mission' : 'Make a Donation'}
      </h3>
      <p className="mt-2 text-sm text-ink/85">
        Donate via Metrobank InstaPay / QR Ph. Account: Raul Cardona (ending 2357).
      </p>
      <img
        src="/assets/payment/metrobank-qr.jpg"
        alt="Metrobank InstaPay QR code for Raul Cardona"
        className="mx-auto mt-4 max-h-48 w-auto rounded-lg border border-gold/20"
      />
      <p className="mt-3 text-xs text-ink/70">
        Email receipt to{' '}
        <a href={`mailto:${siteIdentity.emailReceipts}`} className="text-forest underline">
          {siteIdentity.emailReceipts}
        </a>
      </p>
    </div>
  )
}