import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import WaitlistButton from "@/components/blog/WaitlistButton";
import type { Block } from "@/lib/blog";
import {
  getPublishedPost,
  getPublishedSlugs,
  getRelatedPublished,
} from "@/lib/blog-data";

const INK = "#111111";

// ISR: time-based backstop; /api/revalidate handles instant publishes. Allow
// slugs not known at build time (posts published later) to render on-demand.
export const revalidate = 600;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getPublishedSlugs()).map((slug) => ({ slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata(props: Params): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPublishedPost(slug);
  if (!post) return {};

  const url = `https://monstirapp.com/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: "Monstir",
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      images: [
        {
          url: "https://monstirapp.com/meta-image.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ["https://monstirapp.com/meta-image.png"],
    },
  };
}

function BodyBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return (
        <p
          className="my-2.5 text-lg font-medium leading-[1.7] text-[#2A2A2A]"
          style={{ textWrap: "pretty" }}
        >
          {block.text}
        </p>
      );
    case "h2":
      return (
        <h2 className="mb-1 mt-7 font-fredoka text-[29px] font-semibold leading-tight text-deep-ink">
          {block.text}
        </h2>
      );
    case "quote":
      return (
        <blockquote
          className="my-6 rounded-[14px] bg-[#EAE4FF] px-7 py-6"
          style={{
            border: `2.5px solid ${INK}`,
            borderLeft: `8px solid #7B3FF2`,
            boxShadow: `0px 4px 0px ${INK}`,
          }}
        >
          <span className="font-fredoka text-2xl font-semibold leading-snug text-deep-ink">
            “{block.text}”
          </span>
        </blockquote>
      );
    case "list":
      return (
        <ul className="my-3 flex flex-col gap-3">
          {block.items.map((it, i) => (
            <li
              key={i}
              className="flex gap-3 text-[17px] font-medium leading-relaxed text-[#2A2A2A]"
            >
              <span className="shrink-0 font-black text-brand-purple">✦</span>
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
  }
}

export default async function ArticlePage(props: Params) {
  const { slug } = await props.params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  const related = await getRelatedPublished(post.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: new Date(post.date).toISOString(),
    author: { "@type": "Organization", name: "The Monstir Team" },
    publisher: {
      "@type": "Organization",
      name: "Monstir",
      logo: {
        "@type": "ImageObject",
        url: "https://monstirapp.com/logomark.png",
      },
    },
    mainEntityOfPage: `https://monstirapp.com/blog/${post.slug}`,
  };

  return (
    <main className="mx-auto max-w-[760px] px-6 pb-20 pt-9">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/blog"
        className="inline-flex items-center gap-2 font-fredoka text-sm font-bold text-brand-purple hover:text-brand-purple-dark"
      >
        ← Back to the blog
      </Link>

      <div className="mt-5 flex items-center gap-3.5">
        <span
          className="rounded-full bg-[#ADE9DF] px-3.5 py-[7px] font-mono text-xs font-bold uppercase tracking-widest text-deep-ink"
          style={{ border: `2px solid ${INK}` }}
        >
          {post.category}
        </span>
        <span className="font-mono text-[13px] text-gray-400">
          {post.date} · {post.read} read
        </span>
      </div>

      <h1 className="mt-5 font-fredoka text-4xl font-bold leading-[1.05] text-deep-ink sm:text-[46px]">
        {post.title}
      </h1>

      <div
        className="mt-5 flex items-center gap-3 pb-6"
        style={{ borderBottom: `2px solid ${INK}` }}
      >
        <Image
          src="/robot.png"
          alt=""
          width={40}
          height={40}
          unoptimized
          className="h-10 w-10 rounded-full bg-white object-cover"
          style={{ border: `2px solid ${INK}` }}
        />
        <div className="flex flex-col">
          <span className="text-sm font-black text-deep-ink">
            The Monstir Team
          </span>
          <span className="text-[13px] font-semibold text-gray-500">
            Building the family chore game
          </span>
        </div>
      </div>

      {/* Cover */}
      <div
        className="mt-7 flex h-[260px] items-center justify-center rounded-[20px]"
        style={{
          background: post.tint,
          border: `2.5px solid ${INK}`,
          boxShadow: `0px 6px 0px ${INK}`,
        }}
      >
        <span style={{ fontSize: 130, lineHeight: 1 }}>{post.emoji}</span>
      </div>

      {/* Body */}
      <article className="mt-9 flex flex-col gap-2">
        {post.blocks.map((block, i) => (
          <BodyBlock key={i} block={block} />
        ))}
      </article>

      {/* End CTA */}
      <section
        className="mt-11 flex flex-wrap items-center gap-6 rounded-[20px] bg-soft-cream p-8"
        style={{ border: `2.5px solid ${INK}`, boxShadow: `0px 6px 0px ${INK}` }}
      >
        <Image
          src="/monster-slime.png"
          alt=""
          width={96}
          height={96}
          unoptimized
          className="h-24 w-24 shrink-0 object-contain"
        />
        <div className="min-w-[220px] flex-1">
          <h3 className="font-fredoka text-2xl font-bold leading-tight text-deep-ink">
            Build a chore system that lasts.
          </h3>
          <p className="mt-2 text-[15px] font-semibold text-gray-500">
            Monstir turns chores into a monster-raising adventure. Free to start.
          </p>
        </div>
        <WaitlistButton variant="cta" />
      </section>

      {/* Related */}
      <section className="mt-[52px]">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-gray-400">
          Keep reading
        </span>
        <div className="mt-4 grid grid-cols-1 gap-[18px] sm:grid-cols-3">
          {related.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="flex flex-col overflow-hidden rounded-[14px] bg-white shadow-[0px_4px_0px_#111111] transition-all hover:-translate-y-0.5 hover:shadow-[0px_6px_0px_#111111] active:translate-y-0.5 active:shadow-[0px_2px_0px_#111111]"
              style={{ border: `2px solid ${INK}` }}
            >
              <div
                className="flex h-[84px] items-center justify-center"
                style={{
                  background: p.tint,
                  borderBottom: `2px solid ${INK}`,
                }}
              >
                <span style={{ fontSize: 40 }}>{p.emoji}</span>
              </div>
              <div className="p-3.5">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-brand-purple">
                  {p.category}
                </span>
                <h4 className="mt-1.5 font-fredoka text-base font-semibold leading-tight text-deep-ink">
                  {p.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
