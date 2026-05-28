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
        const pointerActive = i === 3 || i === 5;
        const tx = pointerActive ? x * GYRO_FACTOR[i] : 0;
        const ty = (pointerActive ? y * GYRO_FACTOR[i] : 0) - sy * SCROLL_FACTOR[i];
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

    const onMouseMove = (e: MouseEvent) => {
      pointerRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointerRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
      schedule();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchstart", onFirstTouch, { once: true, passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchstart", onFirstTouch);
      window.removeEventListener("deviceorientation", onOrientation);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 -mt-16 md:min-h-screen"
      style={{ background: "linear-gradient(to bottom, #b8d8f0 0%, #cce5f5 40%, #dff0f8 100%)" }}
    >
      {/* ── Parallax layers — desktop only ── */}

      {/* Layer 0: background landscape */}
      <div
        ref={el => { layerRefs.current[0] = el; }}
        className="hidden md:block absolute will-change-transform pointer-events-none"
        style={{ inset: "-372px -170px -61px -500px", overflow: "hidden", filter: "blur(3px)" }}
      >
        <img src="/hero/hero-bg.png" alt="" className="w-full h-full object-cover object-top" />
      </div>

      {/* Layer 3: phone */}
      <div
        ref={el => { layerRefs.current[3] = el; }}
        className="hero-phone hidden md:block absolute will-change-transform pointer-events-none"
      >
        <img src="/hero/hero-phone.png" alt="Monstir app showing The Junk Giant boss battle" className="w-full h-auto" />
      </div>

      {/* Layer 1: ground strip */}
      <div
        ref={el => { layerRefs.current[1] = el; }}
        className="hidden md:block absolute will-change-transform pointer-events-none"
        style={{ left: 0, right: 0, bottom: -210 }}
      >
        <img src="/hero/hero-ground.png" alt="" className="w-full h-auto" />
      </div>

      {/* Layer 5: BITBOT */}
      <div
        ref={el => { layerRefs.current[5] = el; }}
        className="hero-bitbot hidden md:block absolute will-change-transform pointer-events-none"
      >
        <img src="/hero/hero-bitbot.png" alt="BITBOT" className="w-full h-auto" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-[30px] md:px-4 flex flex-col md:flex-row md:items-center md:min-h-screen">
        <div
          ref={copyRef}
          className="flex flex-col gap-3 md:gap-6 md:max-w-md will-change-transform pt-[100px] md:pt-16 pb-6 md:pb-12"
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-gray-800">
              Chore time. Boss time.
            </span>
          </div>

          <h1 className="text-5xl md:text-5xl lg:text-6xl font-bold font-fredoka leading-tight">
            Turn chores into <span className="text-brand-purple italic">adventures.</span>
          </h1>

          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
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

      {/* Mobile-only: phone + BITBOT below text */}
      <div className="md:hidden relative w-full mt-10 pb-16">
        <img
          src="/hero/hero-phone.png"
          alt="Monstir app"
          className="w-full hero-float"
        />
        <img
          src="/hero/hero-bitbot.png"
          alt="BITBOT"
          className="absolute w-[65%] hero-float-delay"
          style={{ bottom: "0", right: "-16px" }}
        />
      </div>
    </section>
  );
}
