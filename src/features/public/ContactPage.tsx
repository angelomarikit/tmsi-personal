import { SectionHero } from '@/components/institutional/SectionHero'
import { contactSubjects, siteIdentity } from '@/data/site-content'
import { submitContactInquiry } from '@/lib/supabase/contact-submit'
import { supabaseConfigured } from '@/lib/supabase/client'
import { SERVICE_UNAVAILABLE_MESSAGE, userFacingError } from '@/lib/user-facing-message'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { toast } from 'sonner'

export function ContactPage() {
  const [busy, setBusy] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!supabaseConfigured) {
      toast.error(SERVICE_UNAVAILABLE_MESSAGE)
      return
    }
    const data = new FormData(e.currentTarget)
    if (String(data.get('website')).trim()) return

    setBusy(true)
    try {
      await submitContactInquiry({
        fullName: String(data.get('fullName') ?? ''),
        email: String(data.get('email') ?? ''),
        mobile: String(data.get('mobile') ?? ''),
        subject: String(data.get('subject') ?? ''),
        message: String(data.get('message') ?? ''),
      })
      toast.success('Message sent — thank you for reaching out.')
      e.currentTarget.reset()
    } catch (err) {
      toast.error(userFacingError(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <SectionHero title="Contact Me" subtitle={siteIdentity.heroQuoteSub} />
      <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          <aside className="rounded-xl border border-gold/25 bg-white p-5 shadow-sm">
            <h2 className="font-display text-lg font-semibold text-forest">Contact information</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex gap-2">
                <Mail className="h-4 w-4 shrink-0 text-forest" aria-hidden />
                <a href={`mailto:${siteIdentity.emailPrimary}`} className="underline">
                  {siteIdentity.emailPrimary}
                </a>
              </li>
              <li className="flex gap-2">
                <Phone className="h-4 w-4 shrink-0 text-forest" aria-hidden />
                <span>{siteIdentity.phones.join(' | ')}</span>
              </li>
              <li className="flex gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-forest" aria-hidden />
                <span>{siteIdentity.city}</span>
              </li>
            </ul>
          </aside>

          <div className="rounded-xl border border-gold/30 bg-cream/30 p-6 shadow-sm">
            <h2 className="font-display text-lg font-semibold text-forest">Send me a message</h2>
            <form className="mt-4 space-y-3" onSubmit={onSubmit}>
              <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
              <Field label="Full name *" name="fullName" required />
              <Field label="Email *" name="email" type="email" required />
              <Field label="Mobile" name="mobile" />
              <fieldset>
                <legend className="text-xs font-medium text-forest">Subject *</legend>
                <select
                  name="subject"
                  required
                  className="mt-1 w-full rounded-lg border border-gold/30 bg-white px-3 py-2 text-sm"
                >
                  <option value="">Select subject</option>
                  {contactSubjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </fieldset>
              <fieldset>
                <legend className="text-xs font-medium text-forest">Your message *</legend>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="mt-1 w-full rounded-lg border border-gold/30 bg-white px-3 py-2 text-sm"
                  placeholder="Type your message here…"
                />
              </fieldset>
              <button
                type="submit"
                disabled={busy}
                className="btn-gloss-green flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white disabled:opacity-60"
              >
                <Send className="h-4 w-4" aria-hidden />
                {busy ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </div>

          <aside className="rounded-xl border border-gold/25 bg-white p-5 shadow-sm">
            <h2 className="font-display text-lg font-semibold text-forest">For inquiries about</h2>
            <ul className="mt-3 list-inside list-disc text-sm text-ink/85">
              {contactSubjects.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
}) {
  return (
    <fieldset>
      <legend className="text-xs font-medium text-forest">{label}</legend>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-1 w-full rounded-lg border border-gold/30 bg-white px-3 py-2 text-sm"
      />
    </fieldset>
  )
}