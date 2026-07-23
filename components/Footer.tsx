import Image from "next/image";

const footerLinks = {
  App: ["Features", "How it works", "Safety", "Download"],
  Parents: ["Parental controls", "Safety", "FAQ"],
  Company: ["About us", "Careers", "Blog", "Contact"],
};

export default function Footer() {
  return (
    <footer className="relative bg-white border-t border-gray-100 pt-20 pb-8 overflow-visible">
{/* Monster peeking bottom-right */}
      <div className="absolute bottom-0 right-6 md:right-16 pointer-events-none select-none">
        <Image
          src="/monster-slime.png"
          alt=""
          width={90}
          height={90}
          unoptimized
          className="object-contain opacity-70"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 flex flex-col items-start">
            {/* B&W logo — swap src to /logo-bw.png once downloaded from Figma */}
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logomark.png"
                alt="Monstir"
                width={88}
                height={88}
                className="object-contain mix-blend-multiply shrink-0"
              />
              <p className="text-sm text-gray-500 font-semibold leading-snug">
                Chores today.<br />Legends tomorrow.
              </p>
            </div>
            <div className="flex gap-3 mt-4">
              {[
                { label: "TikTok", icon: "♩" },
                { label: "Instagram", icon: "◻" },
                { label: "YouTube", icon: "▶" },
                { label: "X", icon: "✕" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-brand-purple hover:text-white transition-colors text-sm font-bold"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-bold font-fredoka text-base text-gray-900 mb-3">{section}</h4>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href={link === "Blog" ? "/blog" : "#"}
                      className="text-sm text-gray-500 hover:text-brand-purple transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-bold font-fredoka text-base text-gray-900 mb-3">Stay in the loop</h4>
            <p className="text-xs text-gray-500 mb-3">Tips, updates and more!</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 min-w-0 px-3 py-2 border-2 border-deep-ink rounded-full text-xs outline-none focus:ring-2 focus:ring-brand-purple"
              />
              <button className="w-8 h-8 rounded-full bg-brand-purple text-white flex items-center justify-center shrink-0 hover:bg-brand-purple-dark transition-colors border-2 border-deep-ink">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2024 Monstir. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-purple transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-purple transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
