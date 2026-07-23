import Image from "next/image";
import Link from "next/link";

export default function BlogFooter() {
  return (
    <footer className="bg-white" style={{ borderTop: "2px solid #111111" }}>
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-5 px-6 py-8">
        <div className="flex items-center gap-3.5">
          <Image
            src="/logomark.png"
            alt="Monstir"
            width={36}
            height={36}
            className="h-9 w-auto object-contain"
          />
          <span className="font-fredoka text-base font-semibold text-deep-ink">
            Chores today. Legends tomorrow.
          </span>
        </div>
        <nav className="flex items-center gap-[22px]">
          <Link
            href="/"
            className="text-sm font-bold text-deep-ink hover:text-brand-purple"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="text-sm font-bold text-deep-ink hover:text-brand-purple"
          >
            Blog
          </Link>
          <a
            href="https://www.instagram.com/monstirapp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold text-deep-ink hover:text-brand-purple"
          >
            Instagram
          </a>
        </nav>
      </div>
      <div
        className="px-6 py-4 text-center font-mono text-xs text-gray-400"
        style={{ borderTop: "1px solid #E5E3DC" }}
      >
        © 2026 Monstir · Made for families
      </div>
    </footer>
  );
}
