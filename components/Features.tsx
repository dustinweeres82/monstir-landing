import Image from "next/image";

const features = [
  {
    image: "/monster-slime.png",
    imageAlt: "Slime monster",
    blend: false,
    unoptimized: true,
    title: "A game they actually care about",
    description: "Monsters, levels, and boss battles make chores feel like an adventure.",
  },
  {
    image: "/treasure-chest.png",
    imageAlt: "Treasure chest",
    blend: false,
    unoptimized: true,
    title: "Parents choose the rewards",
    description: "You pick the rewards that matter. Kids earn them through real effort.",
  },
  {
    image: "/evolve.png",
    imageAlt: "Evolving Monstir",
    blend: false,
    unoptimized: true,
    title: "Motivation that compounds",
    description: "Evolve your Monstir and unlock new forms. The more they do, the more they want to.",
  },
  {
    image: "/shield-lock.png",
    imageAlt: "Shield with lock",
    blend: false,
    unoptimized: true,
    title: "You're in control",
    description: "Approve every chore, set the rules, and manage allowance with ease.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-brand-purple-light">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((f) => (
            <div key={f.title} className="flex flex-col items-center text-center gap-4">
              <Image
                src={f.image}
                alt={f.imageAlt}
                width={110}
                height={110}
                unoptimized={f.unoptimized}
                className={`object-contain${f.blend ? " mix-blend-multiply" : ""}`}
              />
              <div>
                <h3 className="font-bold font-fredoka text-gray-900 text-lg leading-tight mb-2">
                  {f.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
