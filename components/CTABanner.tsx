"use client";

import Image from "next/image";
import { useState } from "react";

export default function CTABanner() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="waitlist" className="bg-slime-lime pt-20 pb-14 overflow-visible relative">
      {/* Treasure chest hanging over the top */}
      <div className="absolute -top-14 left-8 md:left-16 pointer-events-none select-none">
        <Image src="/treasure-chest.png" alt="" width={130} height={130} unoptimized className="object-contain" />
      </div>

      <Image src="/deco-star.png" alt="" width={24} height={24} className="absolute top-5 left-10 opacity-40 select-none mix-blend-multiply" />
      <Image src="/deco-star.png" alt="" width={18} height={18} className="absolute bottom-5 right-32 opacity-30 select-none mix-blend-multiply" />

      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
        {/* Copy */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold font-fredoka text-deep-ink leading-tight">
            Chores today.
            <br />
            Legends tomorrow.
          </h2>
          <p className="text-deep-ink/70 font-semibold mt-2 text-sm">
            Join thousands of families building better habits and raising epic Monstirs!
          </p>
        </div>

        {/* Email form */}
        {status === "success" ? (
          <p className="font-bold text-deep-ink text-lg">🎉 You&apos;re on the list!</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-5 py-3 rounded-full bg-white text-gray-900 placeholder-gray-400 font-semibold text-sm outline-none focus:ring-2 focus:ring-white w-full sm:w-60 shadow-sm border-2 border-deep-ink"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex items-center justify-center gap-2 bg-brand-purple hover:bg-brand-purple-dark text-white font-bold text-sm px-6 py-3 rounded-full transition-colors whitespace-nowrap shadow-md border-2 border-deep-ink disabled:opacity-60"
            >
              <span>✦</span>
              {status === "loading" ? "Joining…" : "Join the waitlist"}
            </button>
            {status === "error" && <p className="text-red-600 text-xs mt-1">Something went wrong — try again.</p>}
          </form>
        )}

        {/* Slime right */}
        <div className="shrink-0 hidden md:block">
          <Image src="/monster-slime.png" alt="" width={110} height={110} unoptimized className="object-contain" />
        </div>
      </div>
    </section>
  );
}
