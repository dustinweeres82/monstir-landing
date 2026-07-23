-- ============================================================================
-- blog_posts — reference schema (the CONTRACT the marketing site reads against)
-- ============================================================================
-- The Supabase session owns the real migration; this file documents the
-- MINIMUM the Next.js site depends on. Align the migration to these column
-- names/types and the anon-read policy, or tell the frontend the deltas.
--
-- The site reads with the PUBLIC anon (publishable) key — there is no
-- service-role key in the marketing repo. So published rows MUST be readable
-- by anon via RLS. Drafts/scheduled rows must NOT be anon-readable; they are
-- reached only through the owner-gated admin edge function.
-- ============================================================================

create table if not exists public.blog_posts (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  excerpt       text not null,
  category      text not null
                  check (category in ('Parenting','Allowance','Comparisons',
                                      'Research','Guides','Product')),
  emoji         text not null,
  tint          text not null,                    -- pastel cover hex, e.g. '#FFF0F0'
  read          text not null,                    -- e.g. '6 min'
  body          jsonb not null,                   -- block array (see grammar below)
  status        text not null default 'draft'
                  check (status in ('draft','approved','scheduled','published','rejected')),
  scheduled_for timestamptz,                       -- set at approval time
  published_at  timestamptz,                       -- set by the cron when it publishes
  review_note   text,                              -- reject reason
  source        text not null default 'pip',       -- 'pip' | 'seed' | ...
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists blog_posts_published_idx
  on public.blog_posts (published_at desc)
  where status = 'published';

-- body jsonb grammar — validate this in submit-blog-draft; the renderer maps
-- each block to a fixed, safe element (no HTML/MDX is ever executed):
--   { "type": "p",     "text": "string" }
--   { "type": "h2",    "text": "string" }
--   { "type": "quote", "text": "string" }
--   { "type": "list",  "items": ["string", ...] }

-- ---------------------------------------------------------------------------
-- RLS: anon may read ONLY published rows. Everything else is admin-only.
-- ---------------------------------------------------------------------------
alter table public.blog_posts enable row level security;

drop policy if exists "blog_posts anon read published" on public.blog_posts;
create policy "blog_posts anon read published"
  on public.blog_posts
  for select
  to anon, authenticated
  using (status = 'published');

-- ---------------------------------------------------------------------------
-- Scheduler (owned by the Supabase session — sample for reference).
-- Every few minutes: publish approved posts whose time has come, then ping the
-- site's on-demand revalidation so they go live within seconds.
-- ---------------------------------------------------------------------------
-- select cron.schedule('publish-blog-posts', '*/5 * * * *', $$
--   with due as (
--     update public.blog_posts
--        set status = 'published',
--            published_at = coalesce(published_at, now()),
--            updated_at = now()
--      where status = 'scheduled'
--        and scheduled_for <= now()
--      returning slug
--   )
--   select net.http_post(
--     url     := 'https://monstirapp.com/api/revalidate',
--     headers := jsonb_build_object(
--                  'content-type', 'application/json',
--                  'x-revalidate-secret', (select decrypted_secret from vault.decrypted_secrets where name = 'blog_revalidate_secret')
--                ),
--     body    := jsonb_build_object('slug', slug)
--   ) from due;
-- $$);
