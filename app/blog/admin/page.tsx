import type { Metadata } from "next";
import BlogAdmin from "@/components/blog/BlogAdmin";

export const metadata: Metadata = {
  title: "Blog admin",
  robots: { index: false, follow: false },
};

// Owner-only review queue. The real gate is the `admin` edge function (email
// allowlist); this page just renders the sign-in + queue UI.
export default function BlogAdminPage() {
  return (
    <main className="mx-auto max-w-3xl px-6">
      <BlogAdmin />
    </main>
  );
}
