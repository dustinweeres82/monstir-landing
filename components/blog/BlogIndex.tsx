"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CATEGORIES, FEATURED_SLUG, type Category, type PostMeta } from "@/lib/blog";

const INK = "#111111";
const CARD = "border-[2.5px] border-deep-ink bg-soft-cream";
const CARD_INTERACTIVE =
  "shadow-[0px_6px_0px_#111111] transition-all hover:-translate-y-0.5 hover:shadow-[0px_8px_0px_#111111] active:translate-y-1 active:shadow-[0px_2px_0px_#111111]";

function CoverEmoji({
  emoji,
  tint,
  size,
  className = "",
}: {
  emoji: string;
  tint: string;
  size: number;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ background: tint }}
    >
      <span style={{ fontSize: size, lineHeight: 1 }}>{emoji}</span>
    </div>
  );
}

export default function BlogIndex({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Category>("All");

  const q = query.toLowerCase().trim();
  const showFeatured = active === "All" && q === "";

  const filtered = useMemo(
    () =>
      posts.filter(
        (p) =>
          (active === "All" || p.category === active) &&
          (q === "" ||
            `${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(q)),
      ),
    [posts, active, q],
  );

  const featured = posts.find((p) => p.slug === FEATURED_SLUG);
  const grid = showFeatured
    ? filtered.filter((p) => p.slug !== FEATURED_SLUG)
    : filtered;

  return (
    <main className="mx-auto max-w-[1120px] px-6 pb-20 pt-9">
      {/* Hero */}
      <section
        className="relative flex items-end justify-between gap-6 overflow-hidden rounded-[24px] bg-brand-purple px-8 pt-11 sm:px-11"
        style={{ border: `2.5px solid ${INK}`, boxShadow: `0px 6px 0px ${INK}` }}
      >
        <div className="max-w-[600px] pb-11">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-slime-lime">
            ✦ The Monstir Blog
          </span>
          <h1 className="mt-3.5 font-fredoka text-4xl font-bold leading-[1.02] text-white sm:text-5xl">
            Field notes for families done with chore charts.
          </h1>
          <p className="mt-4 text-lg font-semibold leading-relaxed text-[#EAE4FF]">
            Honest takes on allowance, chores, and raising kids who actually want
            to pitch in — from the team building Monstir.
          </p>
        </div>
        <Image
          src="/robot.png"
          alt=""
          width={230}
          height={230}
          unoptimized
          priority
          className="hidden h-auto w-[230px] shrink-0 self-end md:block"
        />
      </section>

      {/* Search + filters */}
      <section className="mt-7 flex flex-col gap-4">
        <div
          className="flex max-w-[460px] items-center gap-3 rounded-full bg-white px-5 py-3"
          style={{ border: `2px solid ${INK}`, boxShadow: `0px 3px 0px ${INK}` }}
        >
          <span className="text-lg leading-none">🔍</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the blog…"
            aria-label="Search the blog"
            className="flex-1 bg-transparent text-[15px] font-semibold text-deep-ink outline-none placeholder-gray-400"
          />
        </div>
        <div className="flex flex-wrap gap-2.5">
          {CATEGORIES.map((c) => {
            const on = c === active;
            return (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full px-4 py-2 font-fredoka text-[13px] font-bold text-deep-ink transition-transform active:translate-y-0.5 ${
                  on ? "bg-slime-lime" : "bg-white"
                }`}
                style={{
                  border: `2px solid ${INK}`,
                  boxShadow: on ? `0px 3px 0px ${INK}` : "none",
                }}
              >
                {c}
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      {showFeatured && featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className={`mt-8 flex overflow-hidden rounded-[20px] ${CARD} ${CARD_INTERACTIVE}`}
        >
          <div
            className="relative hidden w-[38%] shrink-0 items-center justify-center sm:flex"
            style={{
              background: featured.tint,
              borderRight: `2.5px solid ${INK}`,
            }}
          >
            <span style={{ fontSize: 120, lineHeight: 1 }}>{featured.emoji}</span>
            <span
              className="absolute left-[18px] top-[18px] rounded-full bg-slime-lime px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-deep-ink"
              style={{ border: `2px solid ${INK}` }}
            >
              ★ Featured
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-3.5 p-8 sm:px-10">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-purple">
              {featured.category}
            </span>
            <h2 className="font-fredoka text-3xl font-bold leading-tight text-deep-ink sm:text-[38px]">
              {featured.title}
            </h2>
            <p className="text-[17px] font-semibold leading-relaxed text-gray-500">
              {featured.excerpt}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-3.5">
              <span className="font-mono text-xs text-gray-400">
                {featured.date}
              </span>
              <span className="h-1 w-1 rounded-full bg-gray-300" />
              <span className="font-mono text-xs text-gray-400">
                {featured.read} read
              </span>
              <span className="ml-1.5 font-fredoka text-sm font-bold text-brand-purple">
                Read article →
              </span>
            </div>
          </div>
        </Link>
      )}

      {/* Grid */}
      {grid.length > 0 ? (
        <section className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {grid.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className={`flex flex-col overflow-hidden rounded-2xl ${CARD} ${CARD_INTERACTIVE}`}
            >
              <CoverEmoji
                emoji={p.emoji}
                tint={p.tint}
                size={58}
                className="h-[140px]"
              />
              <div
                className="flex flex-1 flex-col gap-2.5 p-[18px]"
                style={{ borderTop: `2.5px solid ${INK}` }}
              >
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-brand-purple">
                  {p.category}
                </span>
                <h3 className="font-fredoka text-xl font-semibold leading-tight text-deep-ink">
                  {p.title}
                </h3>
                <p className="text-sm font-semibold leading-relaxed text-gray-500">
                  {p.excerpt}
                </p>
                <div className="mt-auto flex items-center gap-2.5 pt-2">
                  <span className="font-mono text-[11px] text-gray-400">
                    {p.date}
                  </span>
                  <span className="h-[3px] w-[3px] rounded-full bg-gray-300" />
                  <span className="font-mono text-[11px] text-gray-400">
                    {p.read}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </section>
      ) : (
        <section
          className="mt-10 rounded-2xl bg-white px-5 py-16 text-center"
          style={{ border: "2px dashed #C0BEB8" }}
        >
          <div className="text-5xl">🔎</div>
          <p className="mb-1.5 mt-3.5 font-fredoka text-2xl font-semibold text-deep-ink">
            No posts found
          </p>
          <p className="font-semibold text-gray-500">
            Try a different word or category.
          </p>
        </section>
      )}

      <Newsletter />
    </main>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      className="relative mt-14 flex flex-wrap items-center justify-between gap-10 overflow-hidden rounded-[24px] bg-brand-purple p-12"
      style={{ border: `2.5px solid ${INK}`, boxShadow: `0px 6px 0px ${INK}` }}
    >
      <span className="pointer-events-none absolute right-9 top-7 text-3xl opacity-90">
        ✦
      </span>
      <span className="pointer-events-none absolute bottom-8 left-[46%] text-xl opacity-60">
        ✦
      </span>
      <div className="min-w-[300px] max-w-[560px] flex-1">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-slime-lime">
          ✦ Field Notes
        </span>
        <h2 className="mt-3.5 font-fredoka text-4xl font-bold leading-tight text-white">
          One useful email, twice a month.
        </h2>
        <p className="mt-3.5 max-w-[460px] text-[17px] font-semibold leading-relaxed text-[#EAE4FF]">
          Posts on chores, allowance, and Monstir updates — landing in your inbox
          before they hit the blog.
        </p>
        <div className="mt-5 flex items-center gap-3.5">
          <Image
            src="/monster-slime.png"
            alt=""
            width={60}
            height={60}
            unoptimized
            className="h-[60px] w-[60px] object-contain"
          />
          <span className="font-fredoka text-[15px] font-semibold text-white">
            Straight from the team building Monstir.
          </span>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-3.5 rounded-[20px] bg-soft-cream p-[26px] sm:w-[360px]"
        style={{ border: `2.5px solid ${INK}`, boxShadow: `0px 6px 0px ${INK}` }}
      >
        <label
          htmlFor="newsletter-email"
          className="font-mono text-xs font-bold uppercase tracking-widest text-gray-400"
        >
          Your email
        </label>
        <input
          id="newsletter-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          placeholder="you@family.com"
          className="rounded-full bg-white px-5 py-4 text-[15px] font-semibold text-deep-ink outline-none placeholder-gray-400 focus:ring-2 focus:ring-brand-purple"
          style={{ border: `2px solid ${INK}`, boxShadow: `0px 3px 0px ${INK}` }}
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "done"}
          className="rounded-full bg-slime-lime px-5 py-4 font-fredoka text-[17px] font-bold text-deep-ink transition-transform active:translate-y-0.5 disabled:opacity-100"
          style={{ border: `3px solid ${INK}`, boxShadow: `0px 6px 0px ${INK}` }}
        >
          {status === "done"
            ? "✓ You're on the list!"
            : status === "loading"
              ? "Subscribing…"
              : "Subscribe"}
        </button>
        <span className="text-center text-[12.5px] font-semibold leading-snug text-gray-500">
          {status === "error"
            ? "Something went wrong, try again."
            : "🔒 No spam, no data selling. Unsubscribe anytime."}
        </span>
      </form>
    </section>
  );
}
