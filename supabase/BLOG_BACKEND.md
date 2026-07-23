# Blog backend — wiring notes

The blog reads published posts from Supabase (`blog_posts`) and falls back to the
static seed in [`lib/blog.ts`](../lib/blog.ts) until the table is live. Pip
submits **drafts only**; you approve + schedule; a cron publishes; the site is
pinged to revalidate. This file is the contract between the Next.js repo and the
Supabase backend.

## What's already built (this repo)

- **Read layer** [`lib/blog-data.ts`](../lib/blog-data.ts) — DB-first with seed
  fallback. Uses the public anon key; depends on the anon-read RLS policy below.
- **ISR + on-demand revalidation** — `/blog` and `/blog/[slug]` are ISR
  (10-min backstop). [`app/api/revalidate/route.ts`](../app/api/revalidate/route.ts)
  flips new posts live within seconds when the cron calls it.
- **Schema contract** [`blog_posts.schema.sql`](./blog_posts.schema.sql) — the
  columns + RLS the site depends on.
- **Seed** [`seed_blog_posts.sql`](./seed_blog_posts.sql) — the 7 launch posts as
  `published` rows (idempotent upsert on slug).
- **Env** — `.env.local` has the public read config; `BLOG_REVALIDATE_SECRET` is
  left commented so the revalidate route stays locked until you set it.

## Still to build (the admin UI — this repo, blocked on your contract)

I'll build `/blog/admin` (owner-gated, `noindex`) — list drafts, live preview
with the real article renderer, **Approve + schedule** (date/time picker),
**Reject** with a note — reusing the self-hosted `vendor/supabase.js` + Supabase
auth (same pattern as `/reset-password`). **To build it I need the admin edge
function contract:** function name/URL and the request/response JSON for
`list_blog_drafts`, `approve_blog_post(slug, scheduled_for)`,
`reject_blog_post(slug, note)`, plus how the owner authenticates (which
account / how the JWT is passed).

## Content grammar (give this to Pip; validate in `submit-blog-draft`)

`body` is a JSON block array — **not** MDX/HTML, so nothing agent-authored is
ever executed:

```json
[
  { "type": "p",     "text": "string" },
  { "type": "h2",    "text": "string" },
  { "type": "quote", "text": "string" },
  { "type": "list",  "items": ["string", "..."] }
]
```

A draft row also needs: `slug` (unique kebab-case), `title`, `excerpt`,
`category` (one of Parenting/Allowance/Comparisons/Research/Guides/Product),
`emoji`, `tint` (pastel hex), `read` (e.g. `"6 min"`). `submit-blog-draft` must
force `status='draft'` regardless of input.

## Switch-on checklist

1. **Apply the migration** (your `blog_posts` table + RLS; align to
   `blog_posts.schema.sql`).
2. **Run** `seed_blog_posts.sql` (SQL Editor) to load the 7 existing posts.
3. **Set `BLOG_REVALIDATE_SECRET`** in the site env (Vercel + `.env.local`) and
   store the same value in Supabase Vault as `blog_revalidate_secret`.
4. **Deploy** `submit-blog-draft` and extend the admin function with the three
   blog actions above.
5. **Schedule** the publish cron (sample in `blog_posts.schema.sql`).
6. **Send me the admin function contract** → I finish `/blog/admin`.
7. Optional: set `BLOG_SOURCE=db` once you want to stop falling back to the seed.

Until steps 1–2 are done the blog keeps serving the static seed, so nothing
breaks in the meantime.
