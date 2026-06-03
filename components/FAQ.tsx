"use client";

import Image from "next/image";
import { useState } from "react";


const faqs = [
  {
    icon: "👾",
    question: "What is Monstir?",
    answer:
      "Monstir is a fun and rewarding app that helps kids build healthy habits by completing everyday tasks. Kids earn rewards, care for their Monstir, and watch it grow and evolve over time!",
  },
  {
    icon: "⭐",
    question: "How does Monstir work?",
    answer:
      "Parents set up chores and rewards. Kids complete chores to earn XP, which they use to level up their Monstir and unlock rewards. Every week there's a boss battle. Defeat it to earn epic prizes!",
  },
  {
    icon: "🛡️",
    question: "Is Monstir safe for kids?",
    answer:
      "Absolutely. Parents control everything: chores, rewards, approvals, and screen time. Kids can't make purchases or contact anyone outside the app. Your data is never sold.",
  },
  {
    icon: "👥",
    question: "Can multiple children use Monstir?",
    answer:
      "Yes! You can add as many kids as you need under one parent account. Each child gets their own Monstir, XP, and progress.",
  },
  {
    icon: "🪙",
    question: "What kind of rewards can kids earn?",
    answer:
      "You choose! Screen time, a trip to the movies, a new toy, extra allowance. Anything goes. You set the reward and the XP cost.",
  },
  {
    icon: "🔒",
    question: "Do you share or sell personal data?",
    answer:
      "Never. We collect only what's needed to run the app and never sell data to third parties. Full details are in our Privacy Policy.",
  },
  {
    icon: "❤️",
    question: "How much does Monstir cost?",
    answer:
      "Monstir is free to download with a free tier available. A premium plan unlocks unlimited chores, rewards, and boss battles. Pricing details coming soon.",
  },
  {
    icon: "📱",
    question: "What devices is Monstir available on?",
    answer:
      "Monstir will be available on iOS and Android. Sign up for the waitlist to get early access when we launch.",
  },
];

function FAQItem({
  icon,
  question,
  answer,
}: {
  icon: string;
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="bg-white rounded-[18px] overflow-hidden"
      style={{ border: "3px solid #111111", boxShadow: "0px 6px 0px #111111" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-7 py-5 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="w-10 h-10 rounded-xl bg-brand-yellow/30 flex items-center justify-center text-xl shrink-0">
          {icon}
        </span>
        <span className="flex-1 font-bold font-fredoka text-gray-900 text-lg">{question}</span>
        <span className="w-10 h-10 flex items-center justify-center shrink-0 transition-transform duration-200" style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}>
          <Image src="/arrow_icon.png" alt="" width={12} height={12} unoptimized className="object-contain" />
        </span>
      </button>
      {open && (
        <div className="px-7 pb-6 pl-[82px] text-gray-900 text-base leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-center text-3xl font-bold font-fredoka text-gray-900 mb-12">
          Frequently asked questions
        </h2>

        <div className="flex flex-col gap-[16px] mb-12">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} {...faq} />
          ))}
        </div>

        {/* Still have questions banner */}
        <div className="relative bg-brand-purple-light rounded-3xl px-6 py-6 flex items-center gap-4">
          {/* Deco stars */}
          <Image src="/deco-star.png" alt="" width={16} height={16} className="absolute top-4 left-32 opacity-40 mix-blend-multiply" />
          <Image src="/deco-star.png" alt="" width={12} height={12} className="absolute bottom-5 left-56 opacity-30 mix-blend-multiply" />
          <Image src="/deco-star.png" alt="" width={14} height={14} className="absolute top-5 right-56 opacity-40 mix-blend-multiply" />
          <Image src="/deco-star.png" alt="" width={10} height={10} className="absolute bottom-4 right-36 opacity-30 mix-blend-multiply" />

          {/* Character */}
          <div className="hidden sm:flex shrink-0 items-center">
            <Image
              src="/monster-slime.png"
              alt=""
              width={100}
              height={100}
              unoptimized
              className="object-contain"
            />
          </div>

          {/* Copy */}
          <div className="flex-1">
            <p className="font-bold font-fredoka text-gray-900 text-2xl leading-tight">Still have questions?</p>
            <p className="text-gray-600 text-sm mt-1">We&apos;re here to help!</p>
          </div>

          {/* CTA */}
          <a
            href="https://www.instagram.com/monstirapp"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-brand-purple hover:bg-brand-purple-dark text-white font-bold text-sm px-6 py-3 rounded-full transition-colors whitespace-nowrap border-2 border-deep-ink"
          >
            DM us
          </a>
        </div>
      </div>
    </section>
  );
}
