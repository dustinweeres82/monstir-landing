// Blog content for the Monstir marketing site.
// Copy is lifted verbatim from the design prototype — real, on-brand, parent-first.

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export type PostMeta = {
  slug: string;
  category: Category;
  emoji: string;
  /** Pastel cover tint (hex) */
  tint: string;
  date: string;
  read: string;
  title: string;
  excerpt: string;
};

export type Post = PostMeta & { blocks: Block[] };

export const CATEGORIES = [
  "All",
  "Parenting",
  "Allowance",
  "Comparisons",
  "Research",
  "Guides",
  "Product",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const FEATURED_SLUG = "why-every-chore-chart-dies-by-week-three";

export const POSTS: Post[] = [
  {
    slug: "why-every-chore-chart-dies-by-week-three",
    category: "Parenting",
    emoji: "📉",
    tint: "#FFF0F0",
    date: "Jul 18, 2026",
    read: "6 min",
    title: "Why Every Chore Chart Dies by Week Three",
    excerpt:
      "It is not your kids. It is not you. It is the chart. A look at why the fridge-magnet system fails — and what to build instead.",
    blocks: [
      {
        type: "p",
        text: "Every chore chart starts the same way: a fresh printout, a pack of stickers, and a family meeting where everyone agrees that this time it'll stick. By week three it's a curling square of paper nobody looks at. If that's happened in your house, you're not disorganized and your kids aren't lazy. The chart was never built to survive.",
      },
      { type: "h2", text: "A chart is a to-do list in a costume" },
      {
        type: "p",
        text: "A chore chart is a static list. It looks the same on Monday as it does on Saturday — nothing to discover, nothing that changes, no reason to walk back over and check it. Adults abandon static to-do lists too. We just don't tape ours to the fridge and expect a seven-year-old to stay loyal to it for a year.",
      },
      { type: "h2", text: "Week one is a sugar high" },
      {
        type: "p",
        text: 'The first week always works, and that\'s the trap. The novelty of a new system does the motivating — not the system itself. Once the shine wears off there\'s no engine underneath. Stickers don\'t add up to anything a kid actually wants, and "you did it" stops meaning much by the tenth time.',
      },
      { type: "quote", text: "A sticker is a promise the fridge can't keep." },
      { type: "h2", text: "What actually keeps kids coming back" },
      {
        type: "p",
        text: "The systems kids don't quit tend to share a few traits — the same ones that make games hard to put down:",
      },
      {
        type: "list",
        items: [
          "Something changes. Progress you can see, not just a box that gets ticked.",
          "Stakes that reset. A fresh reason to show up this week, not last week's leftovers.",
          "Rewards that stack. Effort that visibly adds up toward something real.",
          "A reason to return. A moment worth coming back for — ideally with the whole family.",
        ],
      },
      { type: "h2", text: "Build for month six, not week one" },
      {
        type: "p",
        text: "Any system can win week one. The real question is whether it's still running in month six. That's the whole idea behind Monstir: chores feed a monster your kid is actually raising, effort turns into real allowance you can track in a ledger, and every Sunday the family fights a boss together. The chore isn't the reward — it's the move that powers the game. That's a loop built to last past week three.",
      },
    ],
  },
  {
    slug: "best-chore-apps-for-kids-2026",
    category: "Comparisons",
    emoji: "📱",
    tint: "#EAF3FB",
    date: "Jul 14, 2026",
    read: "9 min",
    title: "Best Chore Apps for Kids in 2026 (An Honest Comparison)",
    excerpt:
      "We lined up the big chore apps side by side — the good, the clunky, and the ones that quietly charge you. Including where Monstir fits.",
    blocks: [
      {
        type: "p",
        text: 'There are more chore apps than ever, and most of the "best of" lists ranking them are affiliate pages in disguise. Here\'s an honest look at the field in 2026 — what each type does well, where it gets clunky, and yes, where Monstir fits.',
      },
      { type: "h2", text: "The three kinds of chore app" },
      {
        type: "p",
        text: "Most apps fall into one of three buckets: allowance-and-banking apps that attach a debit card to chores, task-manager apps that are really shared to-do lists, and game-first apps that turn chores into play. Which is right depends on the problem you're actually trying to solve.",
      },
      { type: "h2", text: "What to watch for" },
      {
        type: "list",
        items: [
          "Monthly fees that quietly outrun the allowance itself.",
          "Real money loaded onto a kid's card before they're ready for it.",
          "Setups so elaborate the parent quits before the kid does.",
          '"Rewards" that are just points with nowhere to go.',
        ],
      },
      { type: "h2", text: "Where Monstir fits" },
      {
        type: "p",
        text: "Monstir is game-first with a parent-controlled ledger. There's no debit card and no real money in the app — it tracks what you owe and you pay however you like. It's built for families who want the engagement of a game without handing a nine-year-old a bank account.",
      },
    ],
  },
  {
    slug: "how-much-allowance-should-i-give-my-kid",
    category: "Allowance",
    emoji: "💰",
    tint: "#FFF9E6",
    date: "Jul 9, 2026",
    read: "7 min",
    title: "How Much Allowance Should I Give My Kid?",
    excerpt:
      'The age-by-age breakdown, the "hybrid" model most families land on, and how to stop doing the mental math every week.',
    blocks: [
      {
        type: "p",
        text: '"How much allowance should I give?" is one of the most-Googled questions in this whole category. The honest answer is: it depends — but there are sane starting points.',
      },
      { type: "h2", text: "A rough age-by-age starting point" },
      {
        type: "p",
        text: "A common rule of thumb is about a dollar per year of age per week, adjusted for your budget and what the money is meant to cover. A six-year-old might get a few dollars; a twelve-year-old handling small expenses might get more. The number matters less than the consistency.",
      },
      { type: "h2", text: "The hybrid model most families land on" },
      {
        type: "p",
        text: "The setup that tends to stick is a hybrid: a small baseline just for being part of the household, plus earning chores on top that are genuinely optional and genuinely paid. Base chores build responsibility; earning chores teach that extra effort pays. Monstir is built around exactly this split.",
      },
      { type: "h2", text: "Stop doing the weekly math" },
      {
        type: "p",
        text: "The hardest part of allowance isn't the amount — it's remembering to pay it and tracking what's owed. That's the quiet job Monstir's ledger does in the background so you never have to reconstruct the week from memory.",
      },
    ],
  },
  {
    slug: "should-you-pay-kids-for-chores-research",
    category: "Research",
    emoji: "🔬",
    tint: "#F0F7F0",
    date: "Jul 2, 2026",
    read: "8 min",
    title: "Should You Pay Kids for Chores? What the Research Actually Says",
    excerpt:
      'Base chores vs. earning chores, the "crowding out" worry, and what studies really found about money and motivation.',
    blocks: [
      {
        type: "p",
        text: "Paying kids for chores feels either obviously right or obviously wrong depending on who you ask. The research is more nuanced than either camp admits.",
      },
      { type: "h2", text: 'The "crowding out" worry' },
      {
        type: "p",
        text: "The classic concern is that paying for a task can crowd out the internal motivation to do it — that once money is attached, the willingness to help for its own sake fades. Studies have found this effect is real, but mostly for things people would happily do for free. Scrubbing a toilet was never on that list.",
      },
      { type: "h2", text: "Base chores vs. earning chores" },
      {
        type: "p",
        text: "The distinction the research points toward: some contributions should be unpaid, simply because you live here. Others — bigger, optional jobs — are reasonable to pay for, and paying for them teaches a real lesson about work and money. Separating the two protects intrinsic motivation while still letting kids earn.",
      },
      { type: "h2", text: "The practical takeaway" },
      {
        type: "p",
        text: "Don't pay for everything, and don't pay for nothing. Keep a small set of expected, unpaid chores, and let extra effort earn on top. That's the model Monstir defaults to — and the one most researchers would nod along with.",
      },
    ],
  },
  {
    slug: "what-is-a-chore-app-and-how-does-it-work",
    category: "Guides",
    emoji: "❓",
    tint: "#EAE4FF",
    date: "Jun 26, 2026",
    read: "5 min",
    title: "What Is a Chore App and How Does It Work?",
    excerpt:
      "A plain-English explainer: what these apps do, who they are for, and the five things to look for before you download one.",
    blocks: [
      {
        type: "p",
        text: 'If you\'ve never used one, "chore app" can mean a lot of different things. Here\'s the plain-English version.',
      },
      { type: "h2", text: "What a chore app actually does" },
      {
        type: "p",
        text: "At its simplest, a chore app moves the family chore chart off the fridge and onto a phone. Parents assign tasks, kids mark them done, and the app keeps track. The better ones add structure on top: approval steps, allowance tracking, reminders, and — in game-first apps — rewards that make kids want to take part.",
      },
      { type: "h2", text: "Who it's for" },
      {
        type: "p",
        text: "Chore apps help most in households with more than one kid, with allowance in the mix, or where the paper chart has already died a few times. If a simple whiteboard is genuinely working for you, you may not need one.",
      },
      { type: "h2", text: "Five things to look for" },
      {
        type: "list",
        items: [
          "A parent approval step, so rewards are earned, not self-granted.",
          "Allowance tracking that doesn't require a debit card.",
          "Setup you can finish in one sitting.",
          "Something that keeps kids coming back on their own.",
          "A privacy policy that doesn't sell your family's data.",
        ],
      },
    ],
  },
  {
    slug: "turning-sunday-into-a-family-boss-battle",
    category: "Product",
    emoji: "⚔️",
    tint: "#FFF0E6",
    date: "Jun 20, 2026",
    read: "5 min",
    title: "Turning Sunday Into a Family Boss Battle",
    excerpt:
      "How one weekly ritual — a monster the whole family fights together — turns a week of chores into something kids look forward to.",
    blocks: [
      {
        type: "p",
        text: "Most chore systems are all input and no payoff. Monstir's Sunday boss battle is the payoff — a weekly ritual the whole family shows up for.",
      },
      { type: "h2", text: "Why a weekly rhythm works" },
      {
        type: "p",
        text: "Kids respond to seasons and stakes. A week of chores that quietly powers up a monster, ending in a Sunday battle the family fights together, gives the effort a shape and a finish line. It feels less like a task list and more like a sports season: same rhythm, new stakes every week.",
      },
      { type: "h2", text: "The reveal is the point" },
      {
        type: "p",
        text: 'Win the battle and you unlock new forms, relics, and collectibles — and the reveal is always a surprise. That uncertainty is deliberate. It\'s the difference between "I have to do my chores" and "I want to see what we get this week."',
      },
    ],
  },
  {
    slug: "the-allowance-ledger-how-monstir-tracks-what-you-owe",
    category: "Product",
    emoji: "📒",
    tint: "#FEF3D7",
    date: "Jun 12, 2026",
    read: "4 min",
    title: "The Allowance Ledger: How Monstir Tracks What You Owe",
    excerpt:
      "No in-app payments, no debit cards — just a running tally of what each kid earned and what you have paid. Here is how it works.",
    blocks: [
      {
        type: "p",
        text: "Monstir tracks allowance without ever touching real money. Here's how the ledger works, and why we built it that way.",
      },
      { type: "h2", text: "A running tally, not a bank" },
      {
        type: "p",
        text: "Every chore you approve adds to a child's earned balance. The app shows exactly what each kid has earned and what you've paid out — no mental math, no forgotten weeks. When you pay, you mark it paid. That's the whole mechanism.",
      },
      { type: "h2", text: "No cards, no in-app payments" },
      {
        type: "p",
        text: "There's no real money in the app and no debit card. You pay your kid however works for your family — cash, e-transfer, whatever. The ledger just makes sure everyone agrees on the number.",
      },
    ],
  },
];

export const POST_METAS: PostMeta[] = POSTS.map((p) => ({
  slug: p.slug,
  category: p.category,
  emoji: p.emoji,
  tint: p.tint,
  date: p.date,
  read: p.read,
  title: p.title,
  excerpt: p.excerpt,
}));

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getRelated(slug: string, count = 3): PostMeta[] {
  return POST_METAS.filter((p) => p.slug !== slug).slice(0, count);
}
