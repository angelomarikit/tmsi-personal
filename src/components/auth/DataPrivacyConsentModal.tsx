type Props = {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  busy?: boolean
}

export function DataPrivacyConsentModal({ open, onClose, onConfirm, busy }: Props) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className="max-w-md rounded-xl border border-gold/40 bg-ivory p-6 shadow-xl"
        role="dialog"
        aria-modal="true"
      >
        <h2 className="font-display text-lg font-semibold text-forest">Data privacy consent</h2>
        <p className="mt-3 text-sm text-ink/85">
          TLPS will use your details only to process membership and contact you about your application
          and member updates, in line with applicable privacy laws.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-full px-4 py-2 text-sm text-ink/80">
            Cancel
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={onConfirm}
            className="btn-gloss-green rounded-full px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            {busy ? 'Submitting…' : 'Confirm & submit'}
          </button>
        </div>
      </div>
    </div>
  )
}