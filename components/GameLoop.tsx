import Image from "next/image";

const steps = [
  {
    number: 1,
    image: "/clipboard.png",
    imageAlt: "Checklist",
    blend: true,
    title: "Do chores",
    description: "You set the chores. Kids complete them. You approve.",
  },
  {
    number: 2,
    image: "/xp-badge.png",
    imageAlt: "XP badge",
    blend: true,
    title: "Earn XP & real rewards",
    description: "Kids earn XP and real rewards for each approved chore.",
  },
  {
    number: 3,
    image: "/robot.png",
    imageAlt: "Monstir robot character",
    blend: true,
    title: "Power up your Monstir",
    description: "Use XP to level up, evolve, and unlock powerful abilities.",
  },
  {
    number: 4,
    image: "/monster-slime.png",
    imageAlt: "Boss monster",
    blend: false,
    title: "Battle the weekly boss",
    description: "Defeat the boss to unlock new forms and epic rewards.",
  },
];

export default function GameLoop() {
  return (
    <section id="how-it-works" className="pt-5 pb-20 md:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-center text-3xl font-bold font-fredoka text-gray-900 mb-16 flex items-center justify-center gap-3">
          <span className="text-brand-purple">✦</span>
          The Monstir game loop
          <span className="text-brand-purple">✦</span>
        </h2>

        {/* Steps row — arrows are siblings between step divs */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center">
          {steps.map((step, i) => (
            <>
              {/* Step */}
              <div
                key={step.number}
                className="flex flex-col items-center text-center gap-3 flex-1 px-2"
              >
                <span className="w-9 h-9 rounded-full bg-brand-purple-light flex items-center justify-center text-brand-purple font-black text-lg shrink-0">
                  {step.number}
                </span>
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  width={140}
                  height={140}
                  unoptimized
                  className={`object-contain w-[140px] h-[140px] md:w-24 md:h-24${step.blend ? " mix-blend-multiply" : ""}`}
                />
                <h3 className="font-bold font-fredoka text-gray-900 text-lg md:text-base">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-[180px] md:max-w-[150px]">
                  {step.description}
                </p>
              </div>

              {/* Arrow between steps */}
              {i < steps.length - 1 && (
                <div
                  key={`arrow-${i}`}
                  className="hidden md:flex items-start justify-center shrink-0 pt-10 px-1"
                >
                  <Image
                    src="/arrow-dots.png"
                    alt=""
                    width={90}
                    height={40}
                    className="opacity-70"
                    unoptimized
                  />
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </section>
  );
}
