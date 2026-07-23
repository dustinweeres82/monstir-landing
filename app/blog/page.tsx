import type { Metadata } from "next";
import BlogIndex from "@/components/blog/BlogIndex";
import { getPublishedPostMetas } from "@/lib/blog-data";

// ISR: time-based backstop; on-demand revalidation (via /api/revalidate) makes
// newly-published posts appear within seconds of the scheduler flipping them.
export const revalidate = 600;

const title = "The Monstir Blog — Field notes for families done with chore charts";
const description =
  "Honest takes on allowance, chores, and raising kids who actually want to pitch in — from the team building Monstir.";

export const metadata: Metadata = {
  title: "The Monstir Blog",
  description,
  alternates: { canonical: "https://monstirapp.com/blog" },
  openGraph: {
    title,
    description,
    url: "https://monstirapp.com/blog",
    siteName: "Monstir",
    type: "website",
    images: [
      {
        url: "https://monstirapp.com/meta-image.png",
        width: 1200,
        height: 630,
        alt: "The Monstir Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://monstirapp.com/meta-image.png"],
  },
};

export default async function BlogPage() {
  const posts = await getPublishedPostMetas();
  return <BlogIndex posts={posts} />;
}
