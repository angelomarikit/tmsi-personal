import { SectionHero } from '@/components/institutional/SectionHero'
import { useAuth } from '@/contexts/AuthContext'
import { SERVICE_UNAVAILABLE_MESSAGE, userFacingError } from '@/lib/user-facing-message'
import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export function LoginPage() {
  const { signIn, configured, isStaff, session } = useAuth()
  const navigate = useNavigate()
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (session) navigate(isStaff ? '/admin' : '/dashboard', { replace: true })
  }, [session, isStaff, navigate])

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!configured) {
      toast.error(SERVICE_UNAVAILABLE_MESSAGE)
      return
    }
    const data = new FormData(e.currentTarget)
    setBusy(true)
    try {
      await signIn(String(data.get('email')), String(data.get('password')))
      toast.success('Signed in')
      navigate('/dashboard')
    } catch (err) {
      toast.error(userFacingError(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <SectionHero title="TLPS Member Login" subtitle="Access your member portal" />
      <form
        onSubmit={onSubmit}
        className="mx-auto mb-12 max-w-md rounded-xl border border-gold/30 bg-white p-6 shadow-sm"
      >
        <Input label="Email" name="email" type="email" required />
        <Input label="Password" name="password" type="password" required className="mt-4" />
        <button
          type="submit"
          disabled={busy}
          className="btn-gloss-green mt-6 w-full rounded-full py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          Sign in
        </button>
        <p className="mt-4 text-center text-sm">
          No account?{' '}
          <Link to="/register" className="text-forest underline">
            Register
          </Link>
        </p>
      </form>
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
        className="mt-1 w-full rounded-lg border border-gold/30 px-3 py-2 text-sm"
      />
    </label>
  )
}