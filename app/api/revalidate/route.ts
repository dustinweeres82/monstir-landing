import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// On-demand revalidation for the blog. The Supabase scheduler (pg_cron) calls
// this right after it flips a post scheduled -> published, so the new post is
// live within seconds instead of waiting for the ISR backstop.
//
//   POST /api/revalidate
//   header: x-revalidate-secret: <BLOG_REVALIDATE_SECRET>
//   body:   { "slug": "some-post" }   // optional; omit to refresh the index only
//
// Set BLOG_REVALIDATE_SECRET in the site's env and store the same value in the
// Supabase Vault so the cron job can send it.

export async function POST(req: NextRequest) {
  const secret = process.env.BLOG_REVALIDATE_SECRET;
  const provided =
    req.headers.get("x-revalidate-secret") ??
    new URL(req.url).searchParams.get("secret");

  if (!secret || provided !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let slug: string | undefined;
  try {
    const body = await req.json();
    if (body && typeof body.slug === "string") slug = body.slug;
  } catch {
    // no/invalid body is fine — just refresh the index + all articles
  }

  revalidatePath("/blog");
  revalidatePath("/blog/[slug]", "page");
  if (slug) revalidatePath(`/blog/${slug}`);

  return NextResponse.json({ revalidated: true, slug: slug ?? null });
}
