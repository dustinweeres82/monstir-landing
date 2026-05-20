"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const items = [
  // left column
  { src: "/deco-star.png",         size: 36,  x:  3,  y:  4,  speed: 0.10, opacity: 0.75 },
  { src: "/deco-heart.png",        size: 28,  x:  6,  y: 14,  speed: 0.18, opacity: 0.55 },
  { src: "/deco-squiggle.png",     size: 44,  x:  2,  y: 26,  speed: 0.13, opacity: 0.45 },
  { src: "/deco-star.png",         size: 22,  x:  8,  y: 38,  speed: 0.22, opacity: 0.60 },
  { src: "/deco-heart-bubble.png", size: 52,  x:  4,  y: 50,  speed: 0.15, opacity: 0.50 },
  { src: "/deco-star.png",         size: 30,  x:  7,  y: 63,  speed: 0.20, opacity: 0.65 },
  { src: "/deco-squiggle.png",     size: 38,  x:  3,  y: 75,  speed: 0.12, opacity: 0.40 },
  { src: "/deco-heart.png",        size: 24,  x:  6,  y: 87,  speed: 0.25, opacity: 0.55 },

  // right column
  { src: "/deco-heart-bubble.png", size: 48,  x: 91,  y:  7,  speed: 0.16, opacity: 0.55 },
  { src: "/deco-star.png",         size: 26,  x: 94,  y: 18,  speed: 0.21, opacity: 0.70 },
  { src: "/deco-squiggle.png",     size: 42,  x: 89,  y: 31,  speed: 0.14, opacity: 0.45 },
  { src: "/deco-heart.png",        size: 32,  x: 93,  y: 44,  speed: 0.19, opacity: 0.60 },
  { src: "/deco-star.png",         size: 40,  x: 88,  y: 57,  speed: 0.11, opacity: 0.65 },
  { src: "/deco-heart-bubble.png", size: 36,  x: 95,  y: 70,  speed: 0.23, opacity: 0.50 },
  { src: "/deco-squiggle.png",     size: 28,  x: 90,  y: 82,  speed: 0.17, opacity: 0.40 },
  { src: "/deco-star.png",         size: 20,  x: 92,  y: 93,  speed: 0.26, opacity: 0.60 },
];

export default function ParallaxDecorations() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        refs.current.forEach((el, i) => {
          if (el) {
            el.style.transform = `translateY(${scrollY * items[i].speed}px)`;
          }
        });
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {items.map((item, i) => (
        <div
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          className="absolute will-change-transform"
          style={{ left: `${item.x}%`, top: `${item.y}%` }}
        >
          <Image
            src={item.src}
            alt=""
            width={item.size}
            height={item.size}
            className="object-contain mix-blend-multiply select-none"
            style={{ opacity: item.opacity }}
          />
        </div>
      ))}
    </div>
  );
}
