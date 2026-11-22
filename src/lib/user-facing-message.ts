export const SERVICE_UNAVAILABLE_MESSAGE =
  'This feature requires Supabase. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.'

export function userFacingError(err: unknown): string {
  if (err instanceof Error) return err.message
  return 'Something went wrong. Please try again.'
}