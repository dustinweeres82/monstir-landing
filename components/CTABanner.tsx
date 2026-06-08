"use client";

import { useState } from "react";
import WaitlistModal from "./WaitlistModal";

export default function CTABanner() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [showModal, setShowModal] = useState(false);

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
      setShowModal(true);
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
    <section id="waitlist" className="bg-slime-lime py-16 px-6">
      <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
        <h2 className="text-4xl md:text-5xl font-bold font-fredoka text-deep-ink leading-tight">
          Chores today.
          <br />
          Legends tomorrow.
        </h2>
        <p className="text-deep-ink/70 font-semibold text-sm">
          Be among the first families to raise their Monstir.
        </p>

        {status === "success" ? (
          <p className="text-deep-ink font-bold text-lg">You&apos;re on the list!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-md">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-5 py-3 rounded-xl bg-white text-gray-900 placeholder-gray-400 font-semibold text-sm outline-none focus:ring-2 focus:ring-brand-purple w-full shadow-sm border border-gray-200"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex items-center justify-center gap-2 bg-brand-purple hover:bg-brand-purple-dark text-white font-bold text-sm px-8 py-3 rounded-full transition-colors shadow-md border-2 border-deep-ink disabled:opacity-60 w-full max-w-xs"
            >
              <span>✦</span>
              {status === "loading" ? "Joining…" : "Join the waitlist"}
            </button>
            {status === "error" && <p className="text-red-600 text-xs">Something went wrong, try again.</p>}
          </form>
        )}

        <p className="text-deep-ink/60 text-sm">
          Questions?{" "}
          <a href="https://www.instagram.com/monstirapp" target="_blank" rel="noopener noreferrer" className="underline font-semibold">
            DM us on Instagram
          </a>
        </p>
      </div>
    </section>

    {showModal && <WaitlistModal onClose={() => setShowModal(false)} />}
    </>
  );
}
