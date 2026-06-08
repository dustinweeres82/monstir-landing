const cards = [
  {
    emoji: "🔒",
    title: "Parents verify everything",
    description: "No chore earns a reward without your approval. The approval queue is always one tap away.",
  },
  {
    emoji: "🚫",
    title: "We never sell your data",
    description: "No ads, no data brokers, no third-party sharing. Your family's data belongs to your family.",
  },
  {
    emoji: "🧒",
    title: "COPPA compliant",
    description: "Kids cannot sign up independently. Every child account is created and managed by a parent.",
  },
  {
    emoji: "💳",
    title: "No real money in the app",
    description: "The ledger tracks what's owed. You pay your kid directly. No in-app payments. No debit cards.",
  },
];

export default function SafeSection() {
  return (
    <section className="py-20 bg-[#F7F5F0]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-mono uppercase tracking-widest text-brand-purple font-bold mb-3">
            Built for Families
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-fredoka text-deep-ink leading-tight">
            Safe. Private.<br />Parent-first.
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c) => (
            <div
              key={c.title}
              className="bg-white rounded-2xl p-6 flex flex-col items-center text-center gap-4"
              style={{ border: "3px solid #111111", boxShadow: "0px 6px 0px #111111" }}
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-purple-light flex items-center justify-center text-2xl">
                {c.emoji}
              </div>
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
