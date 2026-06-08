const features = [
  {
    emoji: "✅",
    emojiColor: "bg-green-500",
    title: "Approval queue",
    description: "Every chore needs your sign-off before any reward is earned. You're the boss, not the app. No sneaky self-approvals.",
  },
  {
    emoji: "💰",
    emojiColor: "bg-brand-purple-light",
    title: "Real allowance ledger",
    description: "Track exactly what each child has earned and what you've paid out. No mental math. Just pay what the app says.",
  },
  {
    emoji: "⚙️",
    emojiColor: "bg-brand-purple-light",
    title: "You set the rules",
    description: "You choose the chores, the values, and what each one is worth. The game works around your family, not the other way.",
  },
  {
    emoji: "👨‍👩‍👧‍👦",
    emojiColor: "bg-brand-purple-light",
    title: "Multiple kids, no chaos",
    description: "Each child has their own profile and monster. Chore rotation and fair splitting between siblings are built right in.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-brand-purple">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-mono uppercase tracking-widest text-white/60 font-bold mb-3">
            For Parents
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-fredoka text-white leading-tight mb-4 max-w-xl">
            Built for parents who&apos;ve tried everything else
          </h2>
          <p className="text-white/70 text-[18px] max-w-md">
            You&apos;re not getting a new chore chart. You&apos;re getting a system kids actually want to use, and a ledger that tells you exactly what you owe.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-[#F7F5F0] rounded-2xl p-6 flex flex-col gap-4"
              style={{ border: "3px solid #111111", boxShadow: "0px 6px 0px #111111" }}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${f.emojiColor}`}>
                {f.emoji}
              </div>
              <div>
                <h3 className="font-bold font-fredoka text-gray-900 text-[24px] mb-2">{f.title}</h3>
                <p className="text-gray-500 text-[18px] leading-relaxed">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
