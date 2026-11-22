import { useAuth } from '@/contexts/AuthContext'
import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

export function ProtectedRoute({
  children,
  staffOnly,
}: {
  children: ReactNode
  staffOnly?: boolean
}) {
  const { session, loading, isStaff, configured } = useAuth()

  if (!configured) return <Navigate to="/login" replace />
  if (loading) return <p className="p-8 text-center text-sm">Loading…</p>
  if (!session) return <Navigate to="/login" replace />
  if (staffOnly && !isStaff) return <Navigate to="/dashboard" replace />

  return children
}