import { getSupabaseClient, supabaseConfigured } from '@/lib/supabase/client'
import type { Session } from '@supabase/supabase-js'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type AuthContextValue = {
  configured: boolean
  session: Session | null
  isStaff: boolean
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [isStaff, setIsStaff] = useState(false)
  const [loading, setLoading] = useState(true)

  const refreshStaff = useCallback(async () => {
    const supabase = getSupabaseClient()
    if (!supabase || !session?.user) {
      setIsStaff(false)
      return
    }
    const { data } = await supabase.rpc('current_user_is_staff')
    setIsStaff(Boolean(data))
  }, [session?.user?.id])

  useEffect(() => {
    const supabase = getSupabaseClient()
    if (!supabase) {
      setLoading(false)
      return
    }

    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next)
    })

    return () => sub.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    void refreshStaff()
  }, [refreshStaff])

  const signIn = useCallback(async (email: string, password: string) => {
    const supabase = getSupabaseClient()
    if (!supabase) throw new Error('Supabase is not configured')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }, [])

  const signUp = useCallback(async (email: string, password: string, fullName: string) => {
    const supabase = getSupabaseClient()
    if (!supabase) throw new Error('Supabase is not configured')
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    })
    if (error) throw error
  }, [])

  const signOut = useCallback(async () => {
    const supabase = getSupabaseClient()
    if (!supabase) return
    await supabase.auth.signOut()
    setIsStaff(false)
  }, [])

  const value = useMemo(
    (): AuthContextValue => ({
      configured: supabaseConfigured,
      session,
      isStaff,
      loading,
      signIn,
      signUp,
      signOut,
    }),
    [session, isStaff, loading, signIn, signUp, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}