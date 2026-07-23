import Image from "next/image";
import Link from "next/link";
import WaitlistButton from "./WaitlistButton";

export default function BlogHeader() {
  return (
    <header
      className="sticky top-0 z-50 bg-white"
      style={{ borderBottom: "2px solid #111111" }}
    >
      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-4 px-6 py-3.5">
        <div className="flex items-center gap-3.5">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-color.png"
              alt="Monstir"
              width={120}
              height={44}
              priority
              className="h-[30px] w-auto object-contain"
            />
          </Link>
          <span
            className="font-sans text-[13px] font-black uppercase tracking-wide text-deep-ink"
            style={{ borderLeft: "2px solid #111111", paddingLeft: "14px" }}
          >
            Blog
          </span>
        </div>

        <nav className="flex items-center gap-5 sm:gap-[22px]">
          <Link
            href="/"
            className="hidden text-sm font-bold text-deep-ink hover:text-brand-purple sm:inline"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="hidden text-sm font-bold text-deep-ink hover:text-brand-purple sm:inline"
          >
            Blog
          </Link>
          <WaitlistButton />
        </nav>
      </div>
    </header>
  );
}
