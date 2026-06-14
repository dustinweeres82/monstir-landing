const cards = [
  {
    emoji: "🐲",
    title: "Pick your monster",
    description: "Choose from 5 monster lines. Every one evolves through 8 stages, with rare and legendary forms unlocked through effort.",
  },
  {
    emoji: "⬆️",
    title: "Level up & evolve",
    description: "Chores are the only path to XP. The more you do, the stronger your Monstir gets. Evolution is earned, not bought.",
  },
  {
    emoji: "🏆",
    title: "Battle every Sunday",
    description: "The whole family fights the weekly boss together. Win and unlock new forms, relics, and collectibles. The reveal is always a surprise.",
  },
];

export default function ForKids() {
  return (
    <section className="py-20 bg-slime-lime">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-mono uppercase tracking-widest text-brand-purple font-bold mb-3">
            For Kids
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-fredoka text-deep-ink leading-tight mb-4 max-w-xl">
            Now your kids will beg you to do the chores.
          </h2>
          <p className="text-deep-ink/70 text-[18px] max-w-md">
            Not a checklist with stickers. A real game with monsters to raise, bosses to defeat, and trophies to hunt.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {cards.map((c) => (
            <div
              key={c.title}
              className="bg-[#F7F5F0] rounded-2xl p-6 flex flex-col gap-4"
              style={{ border: "3px solid #111111", boxShadow: "0px 6px 0px #111111" }}
            >
              <span className="text-4xl">{c.emoji}</span>
              <div>
                <h3 className="font-bold font-fredoka text-gray-900 text-[24px] mb-2">{c.title}</h3>
                <p className="text-gray-500 text-[18px] leading-relaxed">{c.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
