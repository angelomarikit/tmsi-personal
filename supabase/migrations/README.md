# Supabase migrations — manual execution

Full checklist: [`../../INSTRUCTIONS.md`](../../INSTRUCTIONS.md) (Instruction 2).

Create a **new** Supabase project for this personal site, then run [`001_tlps_core.sql`](./001_tlps_core.sql) in the SQL Editor.

After applying:

1. Create `.env` in `web/` from `.env.example`
2. In Authentication → Providers, enable Email
3. Set your staff account: `update public.profiles set is_staff = true where id = '<your-user-uuid>';`

Reply **"SQL applied"** when done so we can verify live forms.