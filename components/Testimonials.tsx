"use client";

import { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    quote: "I was skeptical about the real money piece at first, but it's been a total game changer. No more bribing.",
    name: "Michael R.",
    role: "Dad of 2",
    emoji: "👨",
    monsterEmoji: "👾",
  },
  {
    quote: "Finally an app that motivates without feeling like another video game.",
    name: "David K.",
    role: "Dad of 1",
    emoji: "👨‍💼",
    monsterEmoji: "🤖",
  },
  {
    quote: "The rewards are actually things he cares about. He's saving up for bigger things now!",
    name: "Amanda L.",
    role: "Mom of 3",
    emoji: "👩",
    monsterEmoji: "🔥",
  },
];

function TestimonialCard({
  t,
  index,
}: {
  t: (typeof testimonials)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 120}ms` }}
      className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="text-yellow-400">★</span>
        ))}
      </div>
      <p className="text-gray-800 font-semibold leading-relaxed mb-5 text-sm">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
            {t.emoji}
          </div>
          <div>
            <p className="font-black text-sm text-gray-900">{t.name}</p>
            <p className="text-xs text-gray-500">{t.role}</p>
          </div>
        </div>
        <span className="text-3xl">{t.monsterEmoji}</span>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-center text-3xl font-bold font-fredoka text-gray-900 mb-12 flex items-center justify-center gap-2">
          Parents love it. Kids are obsessed. ♡
        </h2>

        {/* Desktop: all 3 animated in */}
        <div className="hidden md:grid grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>

        {/* Mobile: carousel */}
        <div className="md:hidden">
          <div className="flex items-center gap-4">
            <button onClick={prev} className="shrink-0 w-10 h-10 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center text-gray-500">‹</button>
            <div className="flex-1">
              <TestimonialCard key={current} t={testimonials[current]} index={0} />
            </div>
            <button onClick={next} className="shrink-0 w-10 h-10 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center text-gray-500">›</button>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-brand-purple" : "bg-gray-300"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
