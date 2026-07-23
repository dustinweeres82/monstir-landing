"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { useCallback, useEffect, useMemo, useState } from "react";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://vxdoxtbuwfoghlugfpjp.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "sb_publishable_vmWTTJK1Mb2koko7ZJ-Xwg_iaBwhvyG";
const INK = "#111111";

type Block =
  | { type: "p" | "h2" | "quote"; text: string }
  | { type: "list"; items: string[] };

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  emoji: string;
  tint: string;
  read: string;
  body: Block[];
  status: "draft" | "approved" | "scheduled" | "published" | "rejected";
  scheduled_for: string | null;
  published_at: string | null;
  review_note: string | null;
  source: string;
  created_at: string;
};

let _sb: SupabaseClient | null = null;
function sb() {
  if (!_sb) {
    _sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true },
    });
  }
  return _sb;
}

async function adminCall(action: string, extra: Record<string, unknown> = {}) {
  const { data, error } = await sb().functions.invoke("admin", {
    body: { action, ...extra },
  });
  if (error) {
    // Surface the function's JSON error message when present.
    let msg = error.message;
    try {
      const ctx = (error as { context?: Response }).context;
      if (ctx) msg = JSON.stringify(await ctx.json());
    } catch {
      /* ignore */
    }
    throw new Error(msg);
  }
  return data;
}

const STATUS_STYLE: Record<string, { bg: string; label: string }> = {
  draft: { bg: "#FFE9A8", label: "NEEDS REVIEW" },
  scheduled: { bg: "#C8BCFF", label: "SCHEDULED" },
  published: { bg: "#D9F7D6", label: "PUBLISHED" },
  rejected: { bg: "#FFD7C8", label: "REJECTED" },
  approved: { bg: "#C8BCFF", label: "APPROVED" },
};

function fmt(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function localNow(): string {
  // yyyy-MM-ddThh:mm for <input type="datetime-local">, in local time.
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

function PreviewBlocks({ body }: { body: Block[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      {body.map((b, i) => {
        if (b.type === "h2")
          return (
            <h4 key={i} className="mt-2 font-fredoka text-lg font-semibold text-deep-ink">
              {b.text}
            </h4>
          );
        if (b.type === "quote")
          return (
            <p key={i} className="rounded-lg bg-[#EAE4FF] px-3 py-2 font-fredoka text-sm font-semibold" style={{ borderLeft: `4px solid #7B3FF2` }}>
              “{b.text}”
            </p>
          );
        if (b.type === "list")
          return (
            <ul key={i} className="flex flex-col gap-1">
              {b.items.map((it, j) => (
                <li key={j} className="flex gap-2 text-sm text-[#2A2A2A]">
                  <span className="text-brand-purple">✦</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          );
        return (
          <p key={i} className="text-sm leading-relaxed text-[#2A2A2A]">
            {b.text}
          </p>
        );
      })}
    </div>
  );
}

function PostCard({
  post,
  onChanged,
}: {
  post: Post;
  onChanged: () => void;
}) {
  const [open, setOpen] = useState(post.status === "draft");
  const [when, setWhen] = useState(localNow());
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState<null | string>(null);
  const [err, setErr] = useState<string | null>(null);
  const st = STATUS_STYLE[post.status] ?? STATUS_STYLE.draft;

  const act = async (label: string, fn: () => Promise<void>) => {
    setBusy(label);
    setErr(null);
    try {
      await fn();
      onChanged();
    } catch (e) {
      setErr(String((e as Error).message ?? e));
    } finally {
      setBusy(null);
    }
  };

  const reviewable = post.status === "draft" || post.status === "rejected";

  return (
    <div
      className="rounded-2xl bg-soft-cream"
      style={{ border: `2.5px solid ${INK}`, boxShadow: `0px 4px 0px ${INK}` }}
    >
      <div className="flex flex-wrap items-center gap-3 p-4">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl text-2xl"
          style={{ background: post.tint, border: `2px solid ${INK}` }}
        >
          {post.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className="rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest"
              style={{ background: st.bg, border: `1.5px solid ${INK}` }}
            >
              {st.label}
            </span>
            <span className="font-mono text-[11px] text-gray-500">
              {post.category} · {post.read} · {post.source}
            </span>
          </div>
          <h3 className="truncate font-fredoka text-lg font-semibold text-deep-ink">
            {post.title}
          </h3>
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-deep-ink"
          style={{ border: `2px solid ${INK}` }}
        >
          {open ? "Hide" : "Preview"}
        </button>
      </div>

      {post.status === "scheduled" && (
        <p className="px-4 pb-1 font-mono text-xs text-gray-600">
          Goes live: <strong>{fmt(post.scheduled_for)}</strong> (auto-publishes within ~2 min of that time)
        </p>
      )}
      {post.status === "published" && (
        <p className="px-4 pb-1 font-mono text-xs text-gray-600">
          Published: <strong>{fmt(post.published_at)}</strong>
        </p>
      )}
      {post.review_note && (
        <p className="px-4 pb-1 text-xs text-red-600">Note: {post.review_note}</p>
      )}

      {open && (
        <div className="mx-4 mb-3 rounded-xl bg-white p-3" style={{ border: `2px solid ${INK}` }}>
          <p className="mb-2 text-sm font-semibold text-gray-500">{post.excerpt}</p>
          <PreviewBlocks body={post.body} />
        </div>
      )}

      {reviewable && (
        <div
          className="flex flex-wrap items-end gap-2 p-4"
          style={{ borderTop: `2px solid ${INK}` }}
        >
          <button
            disabled={!!busy}
            onClick={() => act("now", () => adminCall("approve_blog_post", { slug: post.slug }).then(() => {}))}
            className="rounded-full bg-slime-lime px-4 py-2 font-fredoka text-sm font-bold text-deep-ink disabled:opacity-60"
            style={{ border: `2.5px solid ${INK}`, boxShadow: `0px 3px 0px ${INK}` }}
          >
            {busy === "now" ? "Publishing…" : "✓ Publish now"}
          </button>

          <div className="flex items-end gap-1.5">
            <label className="flex flex-col text-[10px] font-bold uppercase tracking-widest text-gray-500">
              Schedule for
              <input
                type="datetime-local"
                value={when}
                onChange={(e) => setWhen(e.target.value)}
                className="rounded-lg bg-white px-2 py-1.5 text-sm text-deep-ink"
                style={{ border: `2px solid ${INK}` }}
              />
            </label>
            <button
              disabled={!!busy}
              onClick={() =>
                act("sched", () =>
                  adminCall("approve_blog_post", {
                    slug: post.slug,
                    scheduled_for: new Date(when).toISOString(),
                  }).then(() => {}),
                )
              }
              className="rounded-full bg-brand-purple px-4 py-2 font-fredoka text-sm font-bold text-white disabled:opacity-60"
              style={{ border: `2.5px solid ${INK}`, boxShadow: `0px 3px 0px ${INK}` }}
            >
              {busy === "sched" ? "Scheduling…" : "Schedule"}
            </button>
          </div>

          <div className="ml-auto flex items-end gap-1.5">
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Reject reason (optional)"
              className="rounded-full bg-white px-3 py-2 text-xs text-deep-ink"
              style={{ border: `2px solid ${INK}` }}
            />
            <button
              disabled={!!busy}
              onClick={() =>
                act("reject", () =>
                  adminCall("reject_blog_post", { slug: post.slug, note }).then(() => {}),
                )
              }
              className="rounded-full bg-white px-4 py-2 font-fredoka text-sm font-bold text-red-600 disabled:opacity-60"
              style={{ border: `2.5px solid ${INK}` }}
            >
              ✕ Reject
            </button>
          </div>

          {err && <p className="w-full text-xs font-semibold text-red-600">{err}</p>}
        </div>
      )}
    </div>
  );
}

export default function BlogAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [linkSent, setLinkSent] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      const res = await adminCall("list_blog_drafts");
      setPosts((res?.result?.posts ?? []) as Post[]);
    } catch (e) {
      setErr(String((e as Error).message ?? e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const client = sb();
    client.auth.getSession().then(({ data }) => {
      const ok = !!data.session;
      setAuthed(ok);
      if (ok) load();
    });
    // Catches the session established after the Google OAuth redirect returns.
    const { data: sub } = client.auth.onAuthStateChange((_e, session) => {
      const ok = !!session;
      setAuthed(ok);
      if (ok) load();
    });
    return () => sub.subscription.unsubscribe();
  }, [load]);

  const signInWithMagicLink = async () => {
    setErr(null);
    if (!email) {
      setErr("Enter your email above first.");
      return;
    }
    const { error } = await sb().auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/blog/admin`,
        shouldCreateUser: false,
      },
    });
    if (error) {
      setErr(error.message);
      return;
    }
    setLinkSent(true);
  };

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    const { error } = await sb().auth.signInWithPassword({ email, password });
    if (error) {
      setErr(error.message);
      return;
    }
    setAuthed(true);
    load();
  };

  const signOut = async () => {
    await sb().auth.signOut();
    setAuthed(false);
    setPosts([]);
  };

  const groups = useMemo(() => {
    const order = ["draft", "rejected", "scheduled", "published", "approved"];
    const by: Record<string, Post[]> = {};
    for (const p of posts) (by[p.status] ??= []).push(p);
    return order.filter((s) => by[s]?.length).map((s) => ({ status: s, items: by[s] }));
  }, [posts]);

  if (authed === null) {
    return <p className="py-20 text-center font-semibold text-gray-500">Loading…</p>;
  }

  if (!authed) {
    return (
      <div className="mx-auto max-w-sm py-16">
        <h1 className="mb-2 font-fredoka text-3xl font-bold text-deep-ink">Blog admin</h1>
        <p className="mb-6 text-sm font-semibold text-gray-500">
          Owner sign-in. Drafts submitted by Pip land here for your review.
        </p>

        {linkSent ? (
          <div
            className="rounded-2xl bg-white p-5 text-center"
            style={{ border: `2px solid ${INK}`, boxShadow: `0px 3px 0px ${INK}` }}
          >
            <p className="font-fredoka text-lg font-bold text-deep-ink">Check your email 📬</p>
            <p className="mt-1 text-sm font-semibold text-gray-500">
              We sent a sign-in link to <strong>{email}</strong>. Open it in this browser and
              you&apos;ll land back here signed in.
            </p>
            <button
              onClick={() => setLinkSent(false)}
              className="mt-3 text-xs font-bold text-brand-purple underline"
            >
              Use a different email
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <input
              type="email"
              required
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-deep-ink outline-none"
              style={{ border: `2px solid ${INK}`, boxShadow: `0px 3px 0px ${INK}` }}
            />
            <button
              onClick={signInWithMagicLink}
              className="rounded-full bg-slime-lime px-5 py-3 font-fredoka font-bold text-deep-ink"
              style={{ border: `3px solid ${INK}`, boxShadow: `0px 4px 0px ${INK}` }}
            >
              ✉️ Email me a sign-in link
            </button>

            <div className="my-1 flex items-center gap-3 text-xs font-semibold text-gray-400">
              <span className="h-px flex-1 bg-gray-300" /> or password{" "}
              <span className="h-px flex-1 bg-gray-300" />
            </div>
            <form onSubmit={signIn} className="flex flex-col gap-3">
              <input
                type="password"
                placeholder="Password (if you've set one)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-deep-ink outline-none"
                style={{ border: `2px solid ${INK}`, boxShadow: `0px 3px 0px ${INK}` }}
              />
              <button
                type="submit"
                className="rounded-full bg-white px-5 py-3 font-fredoka font-bold text-deep-ink"
                style={{ border: `2px solid ${INK}` }}
              >
                Sign in with password
              </button>
            </form>
            {err && <p className="text-center text-xs font-semibold text-red-600">{err}</p>}
          </div>
        )}
      </div>
    );
  }

  const pending = posts.filter((p) => p.status === "draft").length;

  return (
    <div className="py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-fredoka text-3xl font-bold text-deep-ink">Blog review queue</h1>
          <p className="text-sm font-semibold text-gray-500">
            {pending} awaiting review · {posts.length} total
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={load}
            className="rounded-full bg-white px-4 py-2 text-sm font-bold text-deep-ink"
            style={{ border: `2px solid ${INK}` }}
          >
            ↻ Refresh
          </button>
          <button
            onClick={signOut}
            className="rounded-full bg-white px-4 py-2 text-sm font-bold text-gray-500"
            style={{ border: `2px solid ${INK}` }}
          >
            Sign out
          </button>
        </div>
      </div>

      {err && <p className="mb-4 text-sm font-semibold text-red-600">{err}</p>}
      {loading && <p className="font-semibold text-gray-500">Loading drafts…</p>}
      {!loading && posts.length === 0 && (
        <p className="rounded-2xl bg-white p-8 text-center font-semibold text-gray-500" style={{ border: `2px dashed #C0BEB8` }}>
          Nothing in the queue yet. When Pip submits a draft it&apos;ll appear here.
        </p>
      )}

      <div className="flex flex-col gap-8">
        {groups.map((g) => (
          <section key={g.status}>
            <h2 className="mb-3 font-mono text-xs font-bold uppercase tracking-widest text-gray-500">
              {STATUS_STYLE[g.status]?.label ?? g.status} ({g.items.length})
            </h2>
            <div className="flex flex-col gap-3">
              {g.items.map((p) => (
                <PostCard key={p.id} post={p} onChanged={load} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
