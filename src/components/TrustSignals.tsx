/**
 * TrustSignals.tsx
 * Displays four design principles as a visual credibility section.
 * These represent organizational values — not certifications or awards.
 */

const principles = [
  {
    id: "secure-development",
    title: "Secure Development",
    description:
      "Security considerations are part of our development process from the beginning, not an afterthought.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        />
      </svg>
    ),
    color: "text-emerald-400",
    glow: "rgba(16,185,129,0.15)",
    border: "rgba(16,185,129,0.2)",
    bg: "rgba(16,185,129,0.06)",
  },
  {
    id: "privacy-focused",
    title: "Privacy Focused",
    description:
      "We collect only what's necessary, handle data transparently, and design with user privacy as a core principle.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    ),
    color: "text-cyan-400",
    glow: "rgba(6,182,212,0.15)",
    border: "rgba(6,182,212,0.2)",
    bg: "rgba(6,182,212,0.06)",
  },
  {
    id: "regular-updates",
    title: "Regular Updates",
    description:
      "Our software is actively maintained. We release updates to improve functionality, fix issues, and keep products current.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
    color: "text-blue-400",
    glow: "rgba(59,130,246,0.15)",
    border: "rgba(59,130,246,0.2)",
    bg: "rgba(59,130,246,0.06)",
  },
  {
    id: "user-centric-design",
    title: "User-Centric Design",
    description:
      "Every interface decision is made with the end user in mind — clarity, usability, and accessibility are non-negotiable.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    color: "text-violet-400",
    glow: "rgba(139,92,246,0.15)",
    border: "rgba(139,92,246,0.2)",
    bg: "rgba(139,92,246,0.06)",
  },
];

export default function TrustSignals() {
  return (
    <section id="trust-signals" aria-label="Our design principles" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{
              background: "rgba(16,185,129,0.08)",
              border: "1px solid rgba(16,185,129,0.18)",
              color: "#6ee7b7",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
            Our Design Principles
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
            Built with{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #10b981, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Integrity
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            These principles guide every product decision we make — from architecture to the final user interaction.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {principles.map((p) => (
            <div
              key={p.id}
              id={p.id}
              className="relative flex flex-col gap-4 p-6 rounded-2xl group transition-all duration-300 hover:-translate-y-1"
              style={{
                background: p.bg,
                border: `1px solid ${p.border}`,
                boxShadow: `0 4px 20px ${p.glow}`,
              }}
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${p.color}`}
                style={{
                  background: p.bg,
                  border: `1px solid ${p.border}`,
                }}
              >
                {p.icon}
              </div>

              {/* Text */}
              <div>
                <h3 className="text-white font-bold text-[15px] mb-2">{p.title}</h3>
                <p className="text-slate-400 text-[13.5px] leading-relaxed">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
