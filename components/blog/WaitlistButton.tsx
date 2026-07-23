"use client";

import { useWaitlist } from "./waitlist-context";

const INK = "#111111";

/** "✦ Join the waitlist" trigger. `variant` controls sizing. */
export default function WaitlistButton({
  variant = "pill",
  className = "",
  children = "✦ Join the waitlist",
}: {
  variant?: "pill" | "cta";
  className?: string;
  children?: React.ReactNode;
}) {
  const openWaitlist = useWaitlist();

  if (variant === "cta") {
    return (
      <button
        onClick={openWaitlist}
        className={`whitespace-nowrap rounded-full bg-slime-lime px-6 py-4 font-fredoka text-base font-bold text-deep-ink transition-transform active:translate-y-0.5 ${className}`}
        style={{ border: `3px solid ${INK}`, boxShadow: `0px 6px 0px ${INK}` }}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      onClick={openWaitlist}
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-slime-lime px-[18px] py-[9px] font-fredoka text-sm font-bold text-deep-ink transition-transform active:translate-y-0.5 ${className}`}
      style={{ border: `2.5px solid ${INK}`, boxShadow: `0px 3px 0px ${INK}` }}
    >
      {children}
    </button>
  );
}
