"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Hero() {
  const imageRef = useRef<HTMLDivElement>(null);
  const decoStarRef = useRef<HTMLDivElement>(null);
  const decoStar2Ref = useRef<HTMLDivElement>(null);
  const decoHeartRef = useRef<HTMLDivElement>(null);
  const decoHeartSmRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;

        // Main image: floats up at 0.25× scroll
        if (imageRef.current) {
          imageRef.current.style.transform = `translateY(${y * -0.25}px)`;
        }
        // Deco icons: different speeds for depth
        if (decoStarRef.current) {
          decoStarRef.current.style.transform = `translateY(${y * -0.15}px) rotate(${y * 0.04}deg)`;
        }
        if (decoStar2Ref.current) {
          decoStar2Ref.current.style.transform = `translateY(${y * -0.35}px) rotate(${y * -0.05}deg)`;
        }
        if (decoHeartRef.current) {
          decoHeartRef.current.style.transform = `translateY(${y * -0.20}px)`;
        }
        if (decoHeartSmRef.current) {
          decoHeartSmRef.current.style.transform = `translateY(${y * -0.10}px)`;
        }
        // Copy: subtle fade + slide out
        if (copyRef.current) {
          const progress = Math.min(y / 400, 1);
          copyRef.current.style.transform = `translateY(${y * -0.08}px)`;
          copyRef.current.style.opacity = String(1 - progress * 0.35);
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white pt-12 pb-0">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-8">
        {/* Left column */}
        <div
          ref={copyRef}
          className="flex-1 flex flex-col gap-6 max-w-xl will-change-transform"
          style={{ transformOrigin: "top left" }}
        >
          <div className="flex items-center gap-2">
            <Image src="/deco-star.png" alt="" width={20} height={20} className="mix-blend-multiply" />
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-gray-800">
              Chore time. Boss time.
            </span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold font-fredoka leading-tight">
            Getting kids
            <br />
            to do chores
            <br />
            <span className="text-brand-purple italic">without the fight.</span>
          </h1>

          <p className="text-lg text-gray-700 leading-relaxed">
            Kids complete chores,{" "}
            <span className="font-bold text-brand-purple">earn XP and real rewards</span>
            , power up their Monstir, and{" "}
            <span className="font-bold text-gray-900">battle the weekly boss</span>{" "}
            to unlock epic rewards.
          </p>

          <div>
            <a
              href="#waitlist"
              className="inline-flex items-center gap-2 bg-brand-purple hover:bg-brand-purple-dark text-white font-bold text-base px-7 py-4 rounded-full transition-colors shadow-lg shadow-brand-purple/30"
            >
              <span>✦</span>
              Join the waitlist
            </a>
          </div>

          <div className="flex items-start gap-4 mt-2">
            <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-amber-300 to-amber-500" />
            </div>
            <div>
              <div className="flex gap-0.5 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-sm text-gray-700 font-semibold leading-snug">
                &ldquo;My 8-year-old asked to do extra chores to beat the boss this week.&rdquo;
              </p>
              <p className="text-xs text-gray-500 mt-1">– Sarah M., mom of 2</p>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex-1 relative flex items-end justify-center">
          {/* Deco — each drifts at its own speed */}
          <div ref={decoStarRef} className="absolute top-8 left-4 select-none will-change-transform">
            <Image src="/deco-star.png" alt="" width={28} height={28} className="mix-blend-multiply" />
          </div>
          <div ref={decoStar2Ref} className="absolute top-28 right-8 select-none will-change-transform">
            <Image src="/deco-star.png" alt="" width={18} height={18} className="mix-blend-multiply opacity-60" />
          </div>
          <div ref={decoHeartRef} className="absolute top-6 right-24 select-none will-change-transform">
            <Image src="/deco-heart-bubble.png" alt="" width={48} height={48} className="mix-blend-multiply" />
          </div>
          <div ref={decoHeartSmRef} className="absolute bottom-32 left-8 select-none will-change-transform">
            <Image src="/deco-heart.png" alt="" width={28} height={28} className="mix-blend-multiply opacity-50" />
          </div>

          {/* Hero image */}
          <div ref={imageRef} className="relative z-10 will-change-transform w-full">
            <Image
              src="/hero.png"
              alt="Monstir app showing The Junk Giant boss battle with BITBOT"
              width={567}
              height={547}
              priority
              unoptimized
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
