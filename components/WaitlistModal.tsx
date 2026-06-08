"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function WaitlistModal({ onClose }: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-[24px] overflow-hidden w-full max-w-sm sm:max-w-md"
        style={{ border: "3px solid #111111", boxShadow: "0px 8px 0px #111111" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors font-bold text-sm z-10"
          style={{ border: "2px solid #111111" }}
          aria-label="Close"
        >
          ✕
        </button>

        <div className="p-6 sm:p-8 flex flex-col">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-slime-lime text-deep-ink text-xs font-bold font-mono uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 self-start"
            style={{ border: "2px solid #111111" }}>
            ✦ Quest accepted
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-fredoka text-gray-900 leading-tight mb-2">
            You&apos;re on the list!
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-5">
            We&apos;ll personally notify you when Monstir drops. Get ready to turn chores into{" "}
            <span className="font-bold text-brand-purple">legendary adventures.</span>
          </p>

          {/* Hype meter */}
          <div className="bg-gray-100 rounded-full h-3 mb-1 overflow-hidden" style={{ border: "2px solid #111111" }}>
            <div className="h-full bg-slime-lime rounded-full" style={{ width: "72%" }} />
          </div>
          <p className="text-xs text-gray-400 font-mono mb-5">Hype meter: 72% almost there 🔥</p>

          <button
            onClick={onClose}
            className="w-full bg-brand-purple hover:bg-brand-purple-dark text-white font-bold text-base px-6 py-4 rounded-full transition-colors border-2 border-deep-ink"
          >
            Let&apos;s gooo! ⚔️
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
