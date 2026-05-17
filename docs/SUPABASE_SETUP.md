# Supabase setup — espace candidat

The candidate space (`/fr/espace-candidat/` + `/en/candidate-space/`) is backed by **one Supabase table** with row-level security. No backend code, no server endpoints — the browser talks directly to Supabase REST.

**Time required**: ~10 minutes total.

---

## 1. Create the project (Supabase, 3 min)

1. Go to [supabase.com](https://supabase.com) → **Sign in with GitHub** (free tier)
2. **New project**:
   - Name: `gss-congo`
   - Database password: generate + save in a password manager (you won't need it daily — Supabase Studio uses your dashboard auth)
   - Region: **Frankfurt (eu-central-1)** — closest to both Tunisia and Kinshasa
3. Wait for provisioning (~90s)
4. Once live, project dashboard → **Settings** → **API**:
   - Copy `Project URL` → `PUBLIC_SUPABASE_URL`
   - Copy `anon` `public` key → `PUBLIC_SUPABASE_ANON_KEY`

⚠️ The `service_role` key on the same page is a **secret**. Never put it in `PUBLIC_*` vars. Never paste it in client code. The anon key is the public one.

---

## 2. Run the schema (Supabase SQL editor, 2 min)

In your project dashboard → **SQL Editor** → **New query** → paste the block below → **Run**.

```sql
-- ─── Candidates table ─────────────────────────────────────────────
create table if not exists public.candidates (
  id uuid primary key default gen_random_uuid(),

  -- Reference is auto-generated. Format: CAND-XXXXXX (6 random hex chars).
  -- ~16M permutations — collision risk negligible for thousands of candidates.
  reference text unique not null default
    'CAND-' || upper(substring(md5(random()::text || clock_timestamp()::text), 1, 6)),

  -- Applicant data (matches src/lib/candidate.ts SubmitInput shape)
  email      text  not null check (email ~* '^[^@]+@[^@]+\.[^@]+$'),
  full_name  text  not null,
  phone      text  not null,
  type       text  not null check (type in ('individuel','equipe','diplomatique')),
  company    text,
  message    text,
  locale     text  not null default 'fr' check (locale in ('fr','en')),

  -- Status tracking
  current_step text not null default 'dossier'
    check (current_step in ('dossier','entretien','formation','affectation')),
  status_history jsonb not null default '[]'::jsonb,

  -- Timestamps
  applied_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Index for fast email lookups in the RPC
create index if not exists candidates_email_lower_idx
  on public.candidates (lower(email));

-- ─── Auto-update updated_at on row change ─────────────────────────
create or replace function public.bump_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists candidates_bump_updated_at on public.candidates;
create trigger candidates_bump_updated_at
before update on public.candidates
for each row execute function public.bump_updated_at();

-- ─── Status history append on current_step change ─────────────────
create or replace function public.append_status_history()
returns trigger language plpgsql as $$
begin
  if new.current_step is distinct from old.current_step then
    new.status_history = old.status_history ||
      jsonb_build_array(jsonb_build_object(
        'step', new.current_step,
        'set_at', now()
      ));
  end if;
  return new;
end;
$$;

drop trigger if exists candidates_append_history on public.candidates;
create trigger candidates_append_history
before update on public.candidates
for each row execute function public.append_status_history();

-- ─── RLS: deny by default, allow anon INSERT, deny anon SELECT ────
alter table public.candidates enable row level security;

drop policy if exists "candidates_insert_anon" on public.candidates;
create policy "candidates_insert_anon"
  on public.candidates for insert
  to anon, authenticated
  with check (true);

drop policy if exists "candidates_select_blocked" on public.candidates;
create policy "candidates_select_blocked"
  on public.candidates for select
  to anon
  using (false);

-- ─── Lookup RPC: secured definer, requires ref + email match ──────
create or replace function public.get_candidate(p_ref text, p_email text)
returns table (
  reference text,
  full_name text,
  current_step text,
  status_history jsonb,
  applied_at timestamptz,
  updated_at timestamptz
)
language sql
security definer
set search_path = public
as $$
  select c.reference, c.full_name, c.current_step, c.status_history,
         c.applied_at, c.updated_at
  from public.candidates c
  where c.reference = upper(p_ref)
    and lower(c.email) = lower(p_email)
  limit 1;
$$;

-- Grant execute on the RPC to anon (RLS-bypassed via SECURITY DEFINER)
grant execute on function public.get_candidate(text, text) to anon, authenticated;
```

After the run, you should see a green "Success. No rows returned." message.

---

## 3. Plug the keys into the site (1 min)

**For Vercel (test deploy + production)**:
1. vercel.com → Project `gss-congo` → **Settings** → **Environment Variables**
2. Add `PUBLIC_SUPABASE_URL` = `https://xxxxxxxx.supabase.co` — tick **Production**
3. Add `PUBLIC_SUPABASE_ANON_KEY` = `eyJhbGc...` (the anon key, long JWT) — tick **Production**
4. Trigger a redeploy (`vercel --prod --yes` from local OR redeploy button in dashboard)

**For local dev**:
1. Copy `.env.example` → `.env`
2. Paste the same values
3. `pnpm dev`

---

## 4. Verify (3 min)

1. Open `https://gss-congo.vercel.app/fr/centre-de-formation/`
2. Fill in the inscription form with a test email you control
3. Submit
4. You should be redirected to `/fr/merci/?ref=CAND-ABC123`
5. The page shows the reference number
6. Click "l'espace candidat →" — `/fr/espace-candidat/?ref=CAND-ABC123` should auto-load and show the 4-step status with "Dossier" highlighted as current
7. In Supabase Studio → **Table editor** → `candidates` — your test row should be visible

If any step fails:
- Open browser DevTools → Network tab, look for the `candidates` POST request
- 401 / 403 → RLS policy didn't apply (re-run the SQL)
- 500 → check the response body for the SQL error
- 200 but no redirect → check the form's `redirect` hidden input got updated (Console: `document.querySelector('input[name="redirect"]').value`)

---

## 5. Daily ops for Bechir — updating candidate status

Bechir updates candidate progress directly in Supabase Studio:

1. supabase.com/dashboard → project `gss-congo` → **Table editor** → `candidates`
2. Find the candidate row (by reference or email)
3. Click the `current_step` cell → change from `dossier` → `entretien` (or whichever step they've reached)
4. Press Enter / click save
5. The trigger automatically appends an entry to `status_history` with the timestamp
6. The candidate sees the new step next time they visit `/fr/espace-candidat/`

**Pro tip**: optionally include a free-text `note` when bumping status. To add notes, edit the `status_history` jsonb directly in Studio:
```json
[
  { "step": "entretien", "set_at": "2026-06-12T09:00:00Z", "note": "RDV pris pour le 18 juin à 10h" }
]
```
The note shows up in the candidate's history view.

---

## 6. Notifications (optional — for later)

Two options when you want Bechir to be auto-emailed on every new application:

**Option A** — Supabase Database Webhook to Web3Forms (zero extra service)
- Studio → **Database** → **Webhooks** → **Create**
- Trigger: `INSERT` on `candidates`
- Target URL: a Web3Forms webhook (or any URL that converts to email)

**Option B** — Resend / Loops / SendGrid via Supabase Edge Function (more control)
- Write a small TypeScript Edge Function triggered by DB webhook
- Sends formatted email to Bechir + a confirmation copy to the applicant

For now, the existing Web3Forms POST still fires on the form's native submit, so Bechir keeps getting the email regardless of Supabase status.

---

## 7. Backup + export

Supabase free tier doesn't include automated daily backups. For a small candidate table this is fine, but every 2-3 months:

- Studio → **Database** → **Backups** → **Manual backup** (export `.sql`)
- Or: SQL Editor → `select * from candidates;` → click **Download CSV**

Drop the file into your secure storage of choice. 5 minutes once a quarter.

---

## What's NOT in this setup

- No login/auth for candidates — just ref + email is enough for the lookup
- No admin UI inside the site — Bechir uses Supabase Studio directly (cleaner than building a 2nd admin page)
- No automated status transitions — every step bump is manual (intentional: GSS controls the pace)
- No CV upload via Supabase — the careers form (separate from inscription) still uses Web3Forms multipart for CV files

If any of these become a real need later, they're additive — no schema migration required.
