import { DataPrivacyConsentModal } from '@/components/auth/DataPrivacyConsentModal'
import { SectionHero } from '@/components/institutional/SectionHero'
import { QrDonationPanel } from '@/components/institutional/QrDonationPanel'
import { membershipCategories } from '@/data/site-content'
import { submitTlpsMembership } from '@/lib/supabase/tlps-membership-submit'
import { supabaseConfigured } from '@/lib/supabase/client'
import { SERVICE_UNAVAILABLE_MESSAGE, userFacingError } from '@/lib/user-facing-message'
import { formatPhp } from '@/lib/utils'
import { Send } from 'lucide-react'
import { useRef, useState, type FormEvent } from 'react'
import { toast } from 'sonner'

const interestOptions = [
  'Philosophical study',
  'Meditation / self-awareness',
  'Community service',
]

export function MembershipApplyPage() {
  const formRef = useRef<HTMLFormElement>(null)
  const [category, setCategory] = useState('advocate')
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [submittedRef, setSubmittedRef] = useState<string | null>(null)

  const fee = membershipCategories.find((c) => c.code === category)?.fee ?? 0

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!supabaseConfigured) {
      toast.error(SERVICE_UNAVAILABLE_MESSAGE)
      return
    }
    setPrivacyOpen(true)
  }

  async function confirmSubmit() {
    const form = formRef.current
    if (!form) return
    const data = new FormData(form)
    const interests = interestOptions.filter((o) => data.get(`interest_${o}`) === 'on')

    setBusy(true)
    try {
      const idPhoto = data.get('idPhoto')
      const signature = data.get('signature')
      const receipt = data.get('paymentReceipt')

      const result = await submitTlpsMembership({
        categoryCode: category,
        fullName: String(data.get('fullName') ?? ''),
        preferredName: String(data.get('preferredName') ?? ''),
        applicationDate: String(data.get('applicationDate') ?? ''),
        email: String(data.get('email') ?? ''),
        mobile: String(data.get('mobile') ?? ''),
        cityProvinceCountry: String(data.get('cityProvinceCountry') ?? ''),
        occupation: String(data.get('occupation') ?? ''),
        referral: String(data.get('referral') ?? ''),
        interests,
        statement: String(data.get('statement') ?? ''),
        dateOfBirth: String(data.get('dateOfBirth') ?? ''),
        gender: String(data.get('gender') ?? ''),
        address: String(data.get('address') ?? ''),
        education: String(data.get('education') ?? ''),
        declarationAccepted: data.get('declaration') === 'on',
        privacyAccepted: data.get('privacy') === 'on',
        paymentReference: String(data.get('paymentReference') ?? ''),
        paymentDate: String(data.get('paymentDate') ?? ''),
        password: String(data.get('password') ?? '') || undefined,
        idPhoto: idPhoto instanceof File && idPhoto.size ? idPhoto : undefined,
        signature: signature instanceof File && signature.size ? signature : undefined,
        paymentReceipt: receipt instanceof File && receipt.size ? receipt : undefined,
      })
      setSubmittedRef(result.referenceCode)
      setPrivacyOpen(false)
      toast.success('Application submitted', { description: `Reference: ${result.referenceCode}` })
      form.reset()
    } catch (err) {
      toast.error(userFacingError(err))
    } finally {
      setBusy(false)
    }
  }

  if (submittedRef) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="font-display text-2xl font-semibold text-forest">Application received</h1>
        <p className="mt-4 text-sm text-ink/85">Your reference code is:</p>
        <p className="mt-2 font-mono text-lg font-semibold text-forest">{submittedRef}</p>
        <p className="mt-4 text-sm text-ink/75">
          We will verify your application and email you when your membership is approved.
        </p>
      </div>
    )
  }

  return (
    <>
      <SectionHero title="TLPS Online Membership Application" />
      <form ref={formRef} onSubmit={onSubmit} className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          <fieldset className="rounded-xl border border-gold/25 bg-white p-5 shadow-sm">
            <legend className="font-display text-lg font-semibold text-forest">Membership category</legend>
            <ul className="mt-4 space-y-2">
              {membershipCategories.map((c) => (
                <li key={c.code}>
                  <label className="flex cursor-pointer gap-2 rounded-lg border border-gold/15 p-3 text-sm hover:bg-cream/40">
                    <input
                      type="radio"
                      name="categoryPicker"
                      checked={category === c.code}
                      onChange={() => setCategory(c.code)}
                    />
                    <span>
                      <span className="font-semibold text-forest">{c.title}</span>
                      <span className="block text-xs text-ink/75">
                        {c.fee === 0 ? 'FREE' : formatPhp(c.fee)}
                      </span>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>

          <div className="space-y-4 rounded-xl border border-gold/25 bg-cream/30 p-5 shadow-sm lg:col-span-1">
            <h2 className="font-display text-lg font-semibold text-forest">Applicant information</h2>
            <Input label="Full name (as on certificate) *" name="fullName" required />
            <Input label="Preferred name / title (optional)" name="preferredName" />
            <div className="grid gap-3 sm:grid-cols-2">
              <Input label="Application date" name="applicationDate" type="date" />
              <Input label="Date of birth *" name="dateOfBirth" type="date" required />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input label="Gender *" name="gender" required />
              <Input label="Mobile *" name="mobile" required />
            </div>
            <Input label="Email *" name="email" type="email" required />
            <Input label="Address *" name="address" required />
            <Input label="City / province / country *" name="cityProvinceCountry" required />
            <Input label="Occupation (optional)" name="occupation" />
            <Input label="How did you hear about TLPS? (optional)" name="referral" />
            <label className="block text-sm">
              <span className="text-xs font-medium text-forest">Educational background</span>
              <textarea name="education" rows={2} className="mt-1 w-full rounded-lg border border-gold/30 px-3 py-2 text-sm" />
            </label>
            <label className="block text-sm">
              <span className="text-xs font-medium text-forest">Statement of purpose *</span>
              <textarea
                name="statement"
                required
                rows={3}
                className="mt-1 w-full rounded-lg border border-gold/30 px-3 py-2 text-sm"
                placeholder="Why do you wish to join TLPS?"
              />
            </label>
            <fieldset>
              <legend className="text-xs font-medium text-forest">Interests (optional)</legend>
              {interestOptions.map((o) => (
                <label key={o} className="mt-1 flex gap-2 text-sm">
                  <input type="checkbox" name={`interest_${o}`} />
                  {o}
                </label>
              ))}
            </fieldset>
            <label className="block text-sm">
              <span className="text-xs font-medium text-forest">Create portal password (optional, min 8)</span>
              <input name="password" type="password" minLength={8} className="mt-1 w-full rounded-lg border border-gold/30 px-3 py-2 text-sm" />
            </label>
            <label className="block text-sm">
              <span className="text-xs font-medium text-forest">ID photo (JPG/PNG)</span>
              <input name="idPhoto" type="file" accept="image/jpeg,image/png" className="mt-1 text-sm" />
            </label>
            <label className="block text-sm">
              <span className="text-xs font-medium text-forest">Signature image</span>
              <input name="signature" type="file" accept="image/jpeg,image/png" className="mt-1 text-sm" />
            </label>
          </div>

          <div className="space-y-4">
            {fee > 0 ? (
              <div className="rounded-xl border border-gold/25 bg-white p-4">
                <h3 className="font-display font-semibold text-forest">Payment ({formatPhp(fee)})</h3>
                <QrDonationPanel compact />
                <Input label="Payment reference *" name="paymentReference" className="mt-3" />
                <Input label="Payment date *" name="paymentDate" type="date" className="mt-2" />
                <label className="mt-2 block text-sm">
                  <span className="text-xs font-medium text-forest">Upload receipt</span>
                  <input name="paymentReceipt" type="file" accept="image/*,application/pdf" className="mt-1 text-sm" />
                </label>
              </div>
            ) : (
              <p className="rounded-xl border border-gold/20 bg-white p-4 text-sm text-ink/85">
                Advocate membership is free of charge. No payment upload is required.
              </p>
            )}

            <label className="flex gap-2 text-sm">
              <input type="checkbox" name="declaration" required />
              <span>I confirm the information provided is accurate and I will participate respectfully.</span>
            </label>
            <label className="flex gap-2 text-sm">
              <input type="checkbox" name="privacy" required />
              <span>I agree TLPS may use these details to process my application.</span>
            </label>

            <button
              type="submit"
              className="btn-gloss-green flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white"
            >
              <Send className="h-4 w-4" aria-hidden />
              Submit application
            </button>
          </div>
        </div>
      </form>

      <DataPrivacyConsentModal
        open={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        onConfirm={() => void confirmSubmit()}
        busy={busy}
      />
    </>
  )
}

function Input({
  label,
  name,
  type = 'text',
  required,
  className,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  className?: string
}) {
  return (
    <label className={`block text-sm ${className ?? ''}`}>
      <span className="text-xs font-medium text-forest">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-1 w-full rounded-lg border border-gold/30 bg-white px-3 py-2 text-sm"
      />
    </label>
  )
}
