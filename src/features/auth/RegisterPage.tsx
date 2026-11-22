import { SectionHero } from '@/components/institutional/SectionHero'
import { useAuth } from '@/contexts/AuthContext'
import { SERVICE_UNAVAILABLE_MESSAGE, userFacingError } from '@/lib/user-facing-message'
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

export function RegisterPage() {
  const { signUp, configured } = useAuth()
  const [busy, setBusy] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!configured) {
      toast.error(SERVICE_UNAVAILABLE_MESSAGE)
      return
    }
    const data = new FormData(e.currentTarget)
    const password = String(data.get('password'))
    const confirm = String(data.get('confirmPassword'))
    if (password !== confirm) {
      toast.error('Passwords do not match')
      return
    }
    setBusy(true)
    try {
      await signUp(String(data.get('email')), password, String(data.get('fullName')))
      toast.success('Account created — check your email if confirmation is required')
      e.currentTarget.reset()
    } catch (err) {
      toast.error(userFacingError(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <SectionHero title="Create member account" />
      <form
        onSubmit={onSubmit}
        className="mx-auto mb-12 max-w-md rounded-xl border border-gold/30 bg-white p-6 shadow-sm"
      >
        <Field label="Full name" name="fullName" required />
        <Field label="Email" name="email" type="email" required className="mt-4" />
        <Field label="Password" name="password" type="password" required className="mt-4" />
        <Field label="Confirm password" name="confirmPassword" type="password" required className="mt-4" />
        <button
          type="submit"
          disabled={busy}
          className="btn-gloss-green mt-6 w-full rounded-full py-3 text-sm font-semibold text-white"
        >
          Register
        </button>
        <p className="mt-4 text-center text-sm">
          <Link to="/login" className="text-forest underline">
            Back to login
          </Link>
        </p>
      </form>
    </>
  )
}

function Field({
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
        className="mt-1 w-full rounded-lg border border-gold/30 px-3 py-2 text-sm"
      />
    </label>
  )
}