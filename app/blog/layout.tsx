import type { Metadata } from "next";
import BlogShell from "@/components/blog/BlogShell";

export const metadata: Metadata = {
  title: {
    template: "%s · Monstir Blog",
    default: "The Monstir Blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BlogShell>{children}</BlogShell>;
}
