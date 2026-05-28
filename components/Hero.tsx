"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

// Per-layer: gyro max px offset, scroll translateY multiplier
const GYRO_FACTOR = [5, 10, 18, 28, 38, 52];
const SCROLL_FACTOR = [0.04, 0.08, 0.14, 0.20, 0.28, 0.38];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null, null, null]);
  const copyRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    let ticking = false;

    const apply = () => {
      const { x, y } = pointerRef.current;
      const sy = scrollRef.current;

      layerRefs.current.forEach((el, i) => {
        if (!el) return;
        const tx = x * GYRO_FACTOR[i];
        const ty = y * GYRO_FACTOR[i] - sy * SCROLL_FACTOR[i];
        el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      });

      if (copyRef.current) {
        const progress = Math.min(sy / 400, 1);
        copyRef.current.style.transform = `translateY(${sy * -0.05}px)`;
        copyRef.current.style.opacity = String(1 - progress * 0.3);
      }

      ticking = false;
    };

    const schedule = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    };

    const onScroll = () => {
      scrollRef.current = window.scrollY;
      schedule();
    };

    const onOrientation = (e: DeviceOrientationEvent) => {
      pointerRef.current.x = Math.max(-1, Math.min(1, (e.gamma ?? 0) / 25));
      pointerRef.current.y = Math.max(-1, Math.min(1, ((e.beta ?? 45) - 45) / 25));
      schedule();
    };

    const addGyroListener = () => {
      window.addEventListener("deviceorientation", onOrientation, { passive: true });
    };

    const onFirstTouch = async () => {
      if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === "function"
      ) {
        try {
          const perm = await (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission();
          if (perm === "granted") addGyroListener();
        } catch {
          // permission denied
        }
      } else {
        addGyroListener();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchstart", onFirstTouch, { once: true, passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", onFirstTouch);
      window.removeEventListener("deviceorientation", onOrientation);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 -mt-16 min-h-screen"
      style={{ background: "linear-gradient(to bottom, #b8d8f0 0%, #cce5f5 40%, #dff0f8 100%)" }}
    >
      {/* ── Parallax layers (full-width, absolutely stacked) ── */}

      {/* Layer 0: background landscape */}
      <div
        ref={el => { layerRefs.current[0] = el; }}
        className="absolute will-change-transform pointer-events-none"
        style={{ inset: "-372px -170px -61px -500px", overflow: "hidden", filter: "blur(3px)" }}
      >
        <img src="/hero/hero-bg.png" alt="" className="w-full h-auto" />
      </div>

      {/* Layer 3: phone */}
      <div
        ref={el => { layerRefs.current[3] = el; }}
        className="hero-phone absolute will-change-transform pointer-events-none"
      >
        <img src="/hero/hero-phone.png" alt="Monstir app showing The Junk Giant boss battle" className="w-full h-auto" />
      </div>

      {/* Layer 1: ground strip — above phone */}
      <div
        ref={el => { layerRefs.current[1] = el; }}
        className="absolute will-change-transform pointer-events-none"
        style={{ left: 0, right: 0, bottom: -210 }}
      >
        <img src="/hero/hero-ground.png" alt="" className="w-full h-auto" />
      </div>

      {/* Layer 5: BITBOT — closest layer, moves most */}
      <div
        ref={el => { layerRefs.current[5] = el; }}
        className="hero-bitbot absolute will-change-transform pointer-events-none"
      >
        <img src="/hero/hero-bitbot.png" alt="BITBOT" className="w-full h-auto" />
      </div>

      {/* ── Copy overlay (left side) ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center min-h-screen">
        <div
          ref={copyRef}
          className="flex flex-col gap-6 max-w-md will-change-transform pt-16 pb-12"
        >
          <div className="flex items-center gap-2">
            <Image src="/deco-star.png" alt="" width={20} height={20} className="mix-blend-multiply" />
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-gray-800">
              Chore time. Boss time.
            </span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold font-fredoka leading-tight">
            Turn chores into <span className="text-brand-purple italic">adventures.</span>
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

        </div>
      </div>
    </section>
  );
}
