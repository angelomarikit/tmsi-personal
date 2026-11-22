-- TLPS personal website — run manually in Supabase SQL Editor (new project)

create extension if not exists "pgcrypto";

-- Profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  mobile text,
  is_staff boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles read own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles update own"
  on public.profiles for update
  using (auth.uid() = id);

create policy "profiles staff read all"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles p where p.id = auth.uid() and p.is_staff = true
    )
  );

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.current_user_is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select is_staff from public.profiles where id = auth.uid()),
    false
  );
$$;

grant execute on function public.current_user_is_staff() to authenticated, anon;

-- TLPS membership applications
create table if not exists public.tlps_membership_applications (
  id uuid primary key default gen_random_uuid(),
  applicant_id uuid references auth.users (id) on delete set null,
  reference_code text unique,
  category_code text not null,
  status text not null default 'submitted',
  fee_amount numeric(12,2) not null default 0,
  full_name text not null,
  preferred_name text,
  application_date date,
  email text not null,
  mobile text not null,
  city_province_country text not null,
  occupation text,
  referral_source text,
  interests text[] default '{}',
  statement_of_purpose text,
  date_of_birth date,
  gender text,
  address text not null,
  education text,
  id_photo_path text,
  signature_path text,
  payment_reference text,
  payment_date date,
  payment_receipt_path text,
  submitted_at timestamptz,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.tlps_membership_applications enable row level security;

create policy "tlps apps insert public"
  on public.tlps_membership_applications for insert
  with check (true);

create policy "tlps apps read own"
  on public.tlps_membership_applications for select
  using (applicant_id is not null and applicant_id = auth.uid());

create policy "tlps apps staff all"
  on public.tlps_membership_applications for all
  using (public.current_user_is_staff())
  with check (public.current_user_is_staff());

-- Contact inquiries
create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  mobile text,
  subject text not null,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.contact_inquiries enable row level security;

create policy "contact insert anon"
  on public.contact_inquiries for insert
  with check (true);

create policy "contact staff read"
  on public.contact_inquiries for select
  using (public.current_user_is_staff());

-- Essays CMS
create table if not exists public.essays (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  body text,
  category text,
  published boolean not null default false,
  featured boolean not null default false,
  published_at date,
  created_at timestamptz not null default now()
);

alter table public.essays enable row level security;

create policy "essays public read published"
  on public.essays for select
  using (published = true);

create policy "essays staff write"
  on public.essays for all
  using (public.current_user_is_staff())
  with check (public.current_user_is_staff());

-- Announcements
create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text,
  event_date date,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.announcements enable row level security;

create policy "announcements public read"
  on public.announcements for select
  using (published = true);

create policy "announcements staff write"
  on public.announcements for all
  using (public.current_user_is_staff())
  with check (public.current_user_is_staff());

-- Storage buckets (create in dashboard if SQL fails)
insert into storage.buckets (id, name, public)
values
  ('membership-documents', 'membership-documents', false),
  ('payment-receipts', 'payment-receipts', false)
on conflict (id) do nothing;

create policy "membership docs upload"
  on storage.objects for insert
  with check (bucket_id in ('membership-documents', 'payment-receipts'));

create policy "membership docs staff read"
  on storage.objects for select
  using (
    bucket_id in ('membership-documents', 'payment-receipts')
    and public.current_user_is_staff()
  );