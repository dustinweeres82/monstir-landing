"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function WaitlistModal({ onClose }: { onClose: () => void }) {
  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-[24px] p-8 max-w-sm w-full text-center"
        style={{ border: "3px solid #111111", boxShadow: "0px 8px 0px #111111" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors font-bold text-sm"
          style={{ border: "2px solid #111111" }}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Character */}
        <div className="flex justify-center -mt-2 mb-4">
          <Image
            src="/hero/hero-bitbot.png"
            alt="BITBOT"
            width={220}
            height={220}
            unoptimized
            className="object-contain hero-float"
          />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-slime-lime text-deep-ink text-xs font-bold font-mono uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
          style={{ border: "2px solid #111111" }}>
          ✦ Quest accepted
        </div>

        <h2 className="text-3xl font-bold font-fredoka text-gray-900 leading-tight mb-2">
          You&apos;re on the list!
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          BITBOT will personally notify you when Monstir drops. Get ready to turn chores into{" "}
          <span className="font-bold text-brand-purple">legendary adventures.</span>
        </p>

        {/* XP bar decoration */}
        <div className="bg-gray-100 rounded-full h-3 mb-1 overflow-hidden" style={{ border: "2px solid #111111" }}>
          <div className="h-full bg-slime-lime rounded-full transition-all duration-1000" style={{ width: "72%" }} />
        </div>
        <p className="text-xs text-gray-400 font-mono mb-6">Hype meter: 72% — almost there 🔥</p>

        <button
          onClick={onClose}
          className="w-full bg-brand-purple hover:bg-brand-purple-dark text-white font-bold text-sm px-6 py-3 rounded-full transition-colors border-2 border-deep-ink"
        >
          Let&apos;s gooo! ⚔️
        </button>
      </div>
    </div>
  );
}
