"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const INK = "#111111";

export default function BlogWaitlistModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    // Lock body scroll while open
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      // Reuse the landing page's waitlist endpoint — no second backend path.
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (typeof document === "undefined") return null;

  const done = status === "done";

  return createPortal(
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-6"
      style={{ background: "rgba(17,17,17,0.55)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-soft-cream rounded-[24px] px-8 pt-9 pb-7"
        style={{ border: `2.5px solid ${INK}`, boxShadow: `0px 8px 0px ${INK}` }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Join the waitlist"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white font-bold text-deep-ink"
          style={{ border: `2px solid ${INK}`, boxShadow: `0px 2px 0px ${INK}` }}
        >
          ✕
        </button>

        {done ? (
          <div className="flex flex-col items-center text-center">
            <Image
              src="/robot.png"
              alt=""
              width={120}
              height={120}
              unoptimized
              className="mb-2 h-auto w-[120px] object-contain"
            />
            <h2 className="font-fredoka text-3xl font-bold leading-tight text-deep-ink">
              You&apos;re on the list! 🎉
            </h2>
            <p className="mt-3 mb-6 text-base font-semibold leading-relaxed text-gray-500">
              We&apos;ll reach out directly when your spot opens up. Earliest
              access goes to families who sign up first.
            </p>
            <button
              onClick={onClose}
              className="w-full rounded-full bg-slime-lime px-6 py-4 font-fredoka text-lg font-bold text-deep-ink"
              style={{
                border: `3px solid ${INK}`,
                boxShadow: `0px 6px 0px ${INK}`,
              }}
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-4">
              <Image
                src="/robot.png"
                alt=""
                width={64}
                height={64}
                unoptimized
                className="h-auto w-16 object-contain"
              />
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-brand-purple">
                  ✦ Alpha now open
                </span>
                <h2 className="mt-1 font-fredoka text-[28px] font-bold leading-tight text-deep-ink">
                  Join the waitlist
                </h2>
              </div>
            </div>

            <p className="mt-4 text-[15px] font-semibold leading-relaxed text-gray-500">
              Be among the first families to raise their Monstir. We&apos;ll
              email you when your spot is ready.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="rounded-full bg-white px-6 py-4 text-[15px] font-semibold text-deep-ink outline-none placeholder-gray-400 focus:ring-2 focus:ring-brand-purple"
                style={{
                  border: `2px solid ${INK}`,
                  boxShadow: `0px 3px 0px ${INK}`,
                }}
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="you@family.com"
                className="rounded-full bg-white px-6 py-4 text-[15px] font-semibold text-deep-ink outline-none placeholder-gray-400 focus:ring-2 focus:ring-brand-purple"
                style={{
                  border: `2px solid ${INK}`,
                  boxShadow: `0px 3px 0px ${INK}`,
                }}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-full bg-slime-lime px-6 py-4 font-fredoka text-lg font-bold text-deep-ink transition-transform active:translate-y-0.5 disabled:opacity-60"
                style={{
                  border: `3px solid ${INK}`,
                  boxShadow: `0px 6px 0px ${INK}`,
                }}
              >
                {status === "loading" ? "Joining…" : "✦ Join the waitlist"}
              </button>
              {status === "error" && (
                <p className="text-center text-xs font-semibold text-red-600">
                  Something went wrong, try again.
                </p>
              )}
            </form>

            <div className="mt-[18px] flex flex-wrap justify-center gap-x-4 gap-y-2 text-[13px] font-bold text-gray-500">
              <span>✓ Free to start</span>
              <span>✓ No credit card</span>
              <span>✓ iOS &amp; Android</span>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
