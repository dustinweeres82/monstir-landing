// Server-only read layer for the blog.
//
// Published posts are served from the Supabase `blog_posts` table once it
// exists; until then (or on any error) we fall back to the static seed in
// `lib/blog.ts`, so the blog always renders. Reads use the public anon key and
// depend on an RLS policy that lets anon SELECT rows where status='published'
// — there is no service-role key in this repo, by design.
//
// NOTE: import this only from Server Components / route handlers. `lib/blog.ts`
// stays client-safe (types + constants + seed); this file must not reach the
// client bundle.

import { createClient } from "@supabase/supabase-js";
import {
  POSTS as SEED_POSTS,
  POST_METAS as SEED_METAS,
  getPost as getSeedPost,
  getRelated as getSeedRelated,
  type Block,
  type Post,
  type PostMeta,
} from "@/lib/blog";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://vxdoxtbuwfoghlugfpjp.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "sb_publishable_vmWTTJK1Mb2koko7ZJ-Xwg_iaBwhvyG";

// "auto" (default): DB-first, fall back to seed on error OR when the table is
// empty/absent. "db": trust the DB even when empty (real cutover). "seed":
// ignore the DB entirely.
const BLOG_SOURCE = (process.env.BLOG_SOURCE ?? "auto") as "auto" | "db" | "seed";

const SELECT =
  "slug,title,excerpt,category,emoji,tint,read,body,published_at,scheduled_for";

type Row = {
  slug: string;
  title: string;
  excerpt: string;
  category: PostMeta["category"];
  emoji: string;
  tint: string;
  read: string;
  body: Block[];
  published_at: string | null;
  scheduled_for: string | null;
};

function client() {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function rowToMeta(r: Row): PostMeta {
  return {
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    category: r.category,
    emoji: r.emoji,
    tint: r.tint,
    read: r.read,
    date: formatDate(r.published_at ?? r.scheduled_for),
  };
}

/** Query published, due rows. Returns null to signal "fall back to seed". */
async function queryPublished(): Promise<Row[] | null> {
  if (BLOG_SOURCE === "seed") return null;
  try {
    const { data, error } = await client()
      .from("blog_posts")
      .select(SELECT)
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false });

    if (error) return null;
    if (!data || (data.length === 0 && BLOG_SOURCE === "auto")) return null;
    return data as Row[];
  } catch {
    return null;
  }
}

export async function getPublishedPostMetas(): Promise<PostMeta[]> {
  const rows = await queryPublished();
  return rows ? rows.map(rowToMeta) : SEED_METAS;
}

export async function getPublishedSlugs(): Promise<string[]> {
  if (BLOG_SOURCE === "seed") return SEED_POSTS.map((p) => p.slug);
  try {
    const { data, error } = await client()
      .from("blog_posts")
      .select("slug")
      .eq("status", "published");
    if (error || !data || (data.length === 0 && BLOG_SOURCE === "auto")) {
      return SEED_POSTS.map((p) => p.slug);
    }
    return data.map((r) => r.slug as string);
  } catch {
    return SEED_POSTS.map((p) => p.slug);
  }
}

export async function getPublishedPost(slug: string): Promise<Post | null> {
  if (BLOG_SOURCE !== "seed") {
    try {
      const { data, error } = await client()
        .from("blog_posts")
        .select(SELECT)
        .eq("slug", slug)
        .eq("status", "published")
        .lte("published_at", new Date().toISOString())
        .maybeSingle();
      if (!error && data) {
        const r = data as Row;
        return { ...rowToMeta(r), blocks: r.body };
      }
    } catch {
      // fall through to seed
    }
  }
  return getSeedPost(slug) ?? null;
}

export async function getRelatedPublished(
  slug: string,
  count = 3,
): Promise<PostMeta[]> {
  const rows = await queryPublished();
  if (!rows) return getSeedRelated(slug, count);
  return rows
    .filter((r) => r.slug !== slug)
    .slice(0, count)
    .map(rowToMeta);
}
