# Instructions — Paramadhara personal site (`web/`)

Follow these steps in order when setting up, pushing to GitHub, and going live.

---

## Instruction 1 — Run the site locally

1. Install [Node.js](https://nodejs.org/) (LTS).
2. Open PowerShell:

```powershell
cd "D:\personal luminar raul\web"
npm install
npm run dev
```

3. Open the URL shown in the terminal (usually `http://localhost:5173`).
4. Public pages work without Supabase. Membership apply, contact, login, and admin need Instruction 2.

---

## Instruction 2 — Connect Supabase (new project)

1. Create a **new** project at [supabase.com](https://supabase.com) (do not reuse TMSI's project).
2. In the dashboard, open **SQL Editor** → **New query**.
3. Paste and run the full script: `supabase/migrations/001_tlps_core.sql`
4. Copy **Project URL** and **anon public** key from **Settings → API**.
5. Create local env file:

```powershell
cd "D:\personal luminar raul\web"
copy .env.example .env
```

6. Edit `.env` and set:

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbG...
```

7. In **Authentication → Providers**, enable **Email**.
8. Register a test user (site **Member Login** or **Register**), then in SQL Editor run (replace the UUID):

```sql
update public.profiles set is_staff = true where id = 'YOUR_USER_UUID';
```

9. Restart `npm run dev` and test contact form, membership apply, and `/admin`.

More detail: `supabase/migrations/README.md`.

---

## Instruction 3 — GitHub (`git add`, `commit`, `push`)

Install [Git](https://git-scm.com/download/win) first.

| Command | Meaning |
|---------|---------|
| `git init` | Turn this folder into a git project (once) |
| `git add .` | Select all changed files to save |
| `git add FILENAME` | Select one file only |
| `git status` | See what is selected |
| `git commit -m "note"` | Save snapshot on your PC |
| `git push` | Upload to GitHub |

---

### 3.1 First time — upload to GitHub

**A.** On GitHub, create an empty repository: [github.com/new](https://github.com/new)  
(Do **not** add README, .gitignore, or license.)

**B.** In PowerShell, run these commands one block at a time.  
Replace `YOUR_USERNAME` and `YOUR_REPO` with your GitHub username and repo name.

```powershell
cd "D:\personal luminar raul\web"

git init
git branch -M main

git add .
git status
```

If `.env` appears under "Changes to be committed", run:

```powershell
git reset .env
```

Then continue:

```powershell
git commit -m "Initial commit: Paramadhara personal site"

git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

When GitHub asks for a password, use a [Personal Access Token](https://github.com/settings/tokens), not your GitHub account password.

If you see `remote origin already exists`:

```powershell
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

---

### 3.2 Every time you change files (usual workflow)

```powershell
cd "D:\personal luminar raul\web"

git add .
git status
git commit -m "Describe what you changed"
git push
```

**Example — update one file:**

```powershell
git add src/features/public/HomePage.tsx
git commit -m "Update homepage"
git push
```

**Do not commit:** `.env` (passwords/keys). `node_modules/` and `dist/` are already ignored.

---

## Instruction 4 — Deploy (after GitHub)

1. Connect the GitHub repo to **Vercel**, **Netlify**, or **Cloudflare Pages**.
2. Settings:
   - **Root directory:** repo root (if you only pushed the `web` folder contents).
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
3. Add environment variables on the host (same as `.env`):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy and open the production URL.

---

## Instruction 5 — Build for production (local check)

```powershell
cd "D:\personal luminar raul\web"
npm run build
npm run preview
```

---

## Troubleshooting

| Issue | Action |
|--------|--------|
| Forms say service unavailable | Complete Instruction 2; restart dev server |
| `.env` in `git status` | Run `git reset .env`; never `git add .env` |
| `remote origin already exists` | `git remote set-url origin https://github.com/USER/REPO.git` |
| Push rejected | `git pull origin main --rebase` then `git push` |
| Admin pages 403 | Run staff `update` SQL in Instruction 2 step 8 |