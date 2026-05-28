"use client";

import Image from "next/image";
import { useState } from "react";

const navLinks = ["How it works", "Features", "Monsters", "Parents", "FAQs"];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-white/30">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center">
          <Image
            src="/logo-color.png"
            alt="Monstir"
            width={130}
            height={48}
            className="object-contain"
            priority
          />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-gray-600 font-semibold text-sm hover:text-brand-purple transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        <a
          href="#waitlist"
          className="hidden md:flex items-center gap-2 bg-brand-purple hover:bg-brand-purple-dark text-white font-bold text-sm px-5 py-2.5 rounded-full transition-colors"
        >
          <span>✦</span>
          Join the waitlist
        </a>

        <button
          className="md:hidden text-gray-600 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-gray-700 font-semibold text-base hover:text-brand-purple transition-colors"
              onClick={() => setOpen(false)}
            >
              {link}
            </a>
          ))}
          <a
            href="#waitlist"
            className="flex items-center justify-center gap-2 bg-brand-purple hover:bg-brand-purple-dark text-white font-bold text-sm px-5 py-3 rounded-full transition-colors mt-2"
            onClick={() => setOpen(false)}
          >
            <span>✦</span>
            Join the waitlist
          </a>
        </div>
      )}
    </nav>
  );
}
