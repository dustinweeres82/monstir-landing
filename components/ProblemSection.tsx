export default function ProblemSection() {
  const problems = [
    { emoji: "😮", text: "The chart gets ignored after week two" },
    { emoji: "😩", text: "Remembering to pay allowance is another job" },
    { emoji: "🤨", text: "Kids do the bare minimum until they quit" },
  ];

  return (
    <section className="bg-[#111111] py-20 px-6 text-white text-center">
      <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-4">
        The Problem With Chore Charts
      </p>
      <h2 className="text-4xl md:text-5xl font-bold font-fredoka mb-10">
        Does this sound familiar?
      </h2>

      <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto mb-10">
        {problems.map(({ emoji, text }) => (
          <div
            key={text}
            className="flex items-center gap-3 px-6 py-4 rounded-full border border-gray-600 text-white font-semibold text-sm md:text-base"
          >
            <span className="text-xl">{emoji}</span>
            {text}
          </div>
        ))}
      </div>

      <p className="text-slime-lime font-bold font-fredoka text-2xl md:text-3xl">
        Monstir makes the chores the game. ✦
      </p>
    </section>
  );
}
