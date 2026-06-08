const faqs = [
  {
    question: "How much does Monstir cost?",
    answer: "Monstir is free for one child and one monster, forever. Paid plans unlock multiple children, the full monster roster, and advanced ledger features. New monster releases are one-time purchases available to all users. Pricing details at launch.",
  },
  {
    question: "Can multiple children use Monstir?",
    answer: "Yes. Each child gets their own profile, monster, and chore list under a single parent account. The free plan supports one child; paid plans unlock multiple kids. Chore rotation between siblings is built in so no one always gets stuck with the dishes.",
  },
  {
    question: "How does the allowance ledger work?",
    answer: "Every chore you approve adds to your child's earned balance. The app tracks what they've earned and what you've paid out. You pay your kid however works for your family: cash, e-transfer, whatever. Monstir never processes real money.",
  },
  {
    question: "What is the Sunday boss battle?",
    answer: "Every week a new boss appears. The family battles it together, and the outcome is determined by chores completed during the week. Win to unlock collectibles, relics, and new monster forms. Every reveal is a surprise. That's the point. We designed it to feel like a sports season: same rhythm, new stakes every week.",
  },
  {
    question: "What devices is Monstir available on?",
    answer: "iOS and Android at launch. Both parent and child use the same app. A PIN-gated switcher separates the parent view from the kid view, so there's no need for separate accounts or devices.",
  },
  {
    question: "When does Monstir launch?",
    answer: "We're currently running a closed alpha with a small group of families. Wider access rolls out through the waitlist. Earliest access goes to families who sign up first. Join below and we'll reach out directly.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-brand-purple font-bold mb-3">Questions</p>
          <h2 className="text-5xl md:text-6xl font-bold font-fredoka text-deep-ink">Frequently asked</h2>
        </div>

        <div className="border-t border-gray-200">
          {faqs.map((faq) => (
            <details key={faq.question} className="group border-b border-gray-200">
              <summary className="flex items-center justify-between gap-6 py-7 cursor-pointer list-none font-fredoka font-bold text-xl md:text-2xl text-deep-ink select-none [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span className="w-8 h-8 shrink-0 rounded-full bg-brand-purple-light border-2 border-brand-purple flex items-center justify-center text-brand-purple font-bold text-lg transition-all duration-200 group-open:rotate-45 group-open:bg-brand-purple group-open:text-white">
                  +
                </span>
              </summary>
              <p className="pb-7 text-[18px] text-gray-500 leading-relaxed max-w-[680px]">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
