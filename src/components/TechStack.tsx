"use client";

const TECH_ROW_1 = [
  "Android", "Kotlin", "Jetpack Compose", "React", "Next.js",
  "TypeScript", "Node.js", "Firebase", "TailwindCSS", "REST APIs",
  "Android", "Kotlin", "Jetpack Compose", "React", "Next.js",
  "TypeScript", "Node.js", "Firebase", "TailwindCSS", "REST APIs",
];

const TECH_ROW_2 = [
  "AI / ML", "Python", "OpenAI", "SQLite", "Room DB",
  "Google Play", "Cloud Storage", "GitHub", "Material Design", "Figma",
  "AI / ML", "Python", "OpenAI", "SQLite", "Room DB",
  "Google Play", "Cloud Storage", "GitHub", "Material Design", "Figma",
];

const ICONS: Record<string, string> = {
  "Android": "🤖", "Kotlin": "🔷", "Jetpack Compose": "🎨",
  "React": "⚛️", "Next.js": "▲", "TypeScript": "📘",
  "Node.js": "🟢", "Firebase": "🔥", "TailwindCSS": "🎨",
  "REST APIs": "🔌", "AI / ML": "🧠", "Python": "🐍",
  "OpenAI": "✨", "SQLite": "🗃️", "Room DB": "📦",
  "Google Play": "▶️", "Cloud Storage": "☁️", "GitHub": "🐙",
  "Material Design": "💎", "Figma": "🖌️",
};

function MarqueeRow({ items, direction }: { items: string[]; direction: "left" | "right" }) {
  return (
    <div className="overflow-hidden py-3 marquee-wrapper">
      <div className={direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}
        style={{ display: "flex", gap: "0", width: "max-content" }}>
        {items.map((tech, i) => (
          <div
            key={`${tech}-${i}`}
            className="flex items-center gap-2 mx-3 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 hover:scale-105"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(148, 163, 184, 0.9)",
            }}
          >
            <span>{ICONS[tech] || "⚡"}</span>
            {tech}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  return (
    <section
      className="py-16 overflow-hidden"
      style={{ background: "#0a0f1a", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
      aria-label="Technologies we use"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-slate-700" />
          <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest text-center whitespace-nowrap">
            Technologies We Work With
          </p>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-slate-700" />
        </div>
      </div>

      <MarqueeRow items={TECH_ROW_1} direction="left" />
      <MarqueeRow items={TECH_ROW_2} direction="right" />
    </section>
  );
}
