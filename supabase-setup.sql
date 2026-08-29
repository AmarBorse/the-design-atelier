-- Run this once in the Supabase dashboard: SQL Editor → New query → paste
-- all of this → Run. Safe to re-run — every statement uses "if not exists"
-- or "drop policy if exists" first, so running it twice by accident won't
-- error out or duplicate anything.

-- ------------------------------------------------------------------
-- Tables
-- ------------------------------------------------------------------

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  title text not null,
  location text,
  panels jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.journals (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date text,
  excerpt text,
  file text,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------------
-- Row Level Security
--
-- Public can read both tables (the live site fetches directly from the
-- visitor's browser, unauthenticated). Only a signed-in user can write —
-- that's the actual security boundary, not the anon key in supabase.ts,
-- which is meant to be public.
-- ------------------------------------------------------------------

alter table public.projects enable row level security;
alter table public.journals enable row level security;

drop policy if exists "Public can read projects" on public.projects;
create policy "Public can read projects" on public.projects
  for select using (true);

drop policy if exists "Authenticated can write projects" on public.projects;
create policy "Authenticated can write projects" on public.projects
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "Public can read journals" on public.journals;
create policy "Public can read journals" on public.journals
  for select using (true);

drop policy if exists "Authenticated can write journals" on public.journals;
create policy "Authenticated can write journals" on public.journals
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ------------------------------------------------------------------
-- Realtime
--
-- Lets Projects.tsx / Journals.tsx / Admin.tsx receive live updates via
-- postgres_changes subscriptions instead of only seeing data on page load.
-- ------------------------------------------------------------------

alter publication supabase_realtime add table public.projects;
alter publication supabase_realtime add table public.journals;

-- ------------------------------------------------------------------
-- Storage — run this AFTER creating the "project-images" bucket by hand
-- in the dashboard (Storage → New bucket → name it exactly
-- "project-images" → toggle "Public bucket" ON). These policies then
-- control who can upload/change/delete objects in it; the bucket's own
-- "Public" toggle already covers read access.
-- ------------------------------------------------------------------

drop policy if exists "Public can view project images" on storage.objects;
create policy "Public can view project images" on storage.objects
  for select using (bucket_id = 'project-images');

drop policy if exists "Authenticated can upload project images" on storage.objects;
create policy "Authenticated can upload project images" on storage.objects
  for insert with check (bucket_id = 'project-images' and auth.role() = 'authenticated');

drop policy if exists "Authenticated can update project images" on storage.objects;
create policy "Authenticated can update project images" on storage.objects
  for update using (bucket_id = 'project-images' and auth.role() = 'authenticated');

drop policy if exists "Authenticated can delete project images" on storage.objects;
create policy "Authenticated can delete project images" on storage.objects
  for delete using (bucket_id = 'project-images' and auth.role() = 'authenticated');
