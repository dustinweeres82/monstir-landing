const steps = [
  {
    number: 1,
    emoji: "📋",
    title: "Do chores",
    description: "You set the chores. Kids complete them in real life. You approve in the app.",
  },
  {
    number: 2,
    emoji: "⭐",
    title: "Earn XP & money",
    description: "Every approved chore earns XP for the game and real allowance in the ledger.",
  },
  {
    number: 3,
    emoji: "⚡",
    title: "Power up",
    description: "Use XP to level up, evolve your Monstir, and unlock rare and legendary new forms.",
  },
  {
    number: 4,
    emoji: "⚔️",
    title: "Battle the boss",
    description: "Every Sunday, the whole family fights the weekly boss. Win epic rewards together.",
  },
];

export default function GameLoop() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-mono uppercase tracking-widest text-brand-purple font-bold mb-3">
            How it works
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-fredoka text-gray-900 mb-3">
            The Monstir loop
          </h2>
          <p className="text-gray-500 text-[18px] max-w-sm">
            Four steps. One monster. One Sunday boss battle. Repeat every week forever.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative bg-[#F7F5F0] rounded-2xl p-6 flex flex-col gap-4"
              style={{ border: "3px solid #111111", boxShadow: "0px 6px 0px #111111" }}
            >
              {/* Number badge */}
              <span className="w-8 h-8 rounded-full bg-brand-purple flex items-center justify-center text-white font-black text-sm shrink-0 self-start">
                {step.number}
              </span>

              {/* Emoji */}
              <span className="text-4xl">{step.emoji}</span>

              {/* Text */}
              <div>
                <h3 className="font-bold font-fredoka text-gray-900 text-[24px] mb-1">{step.title}</h3>
                <p className="text-[18px] text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
