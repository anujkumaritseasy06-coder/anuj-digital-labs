/**
 * OrgProfile.tsx
 * A factual organization profile section.
 *
 * IMPORTANT: This component contains NO fabricated statistics.
 * Do not add: employee count, founding year, office locations,
 * funding rounds, partnerships, or customer counts.
 */

const pillars = [
  {
    id: "pillar-software",
    title: "Software Development",
    description:
      "Anuj Digital Labs is focused on building software products — Android applications, web platforms, AI-powered utilities, and business productivity tools.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    color: "text-blue-400",
    bg: "rgba(59,130,246,0.08)",
    border: "rgba(59,130,246,0.2)",
  },
  {
    id: "pillar-usability",
    title: "Usability & Reliability",
    description:
      "Products are designed with the end user in mind. Usability, performance, and reliability are treated as first-class requirements, not optional enhancements.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 12l2 2 4-4M21 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s9 4.477 9 10z" />
      </svg>
    ),
    color: "text-emerald-400",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.2)",
  },
  {
    id: "pillar-improvement",
    title: "Continuous Improvement",
    description:
      "Maintaining and improving existing products is a priority alongside building new ones. Software is treated as a living system, not a one-time delivery.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "text-cyan-400",
    bg: "rgba(6,182,212,0.08)",
    border: "rgba(6,182,212,0.2)",
  },
];

export default function OrgProfile() {
  return (
    <section id="org-profile" aria-label="About the organization" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left: text block */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{
                background: "rgba(59,130,246,0.08)",
                border: "1px solid rgba(59,130,246,0.18)",
                color: "#93c5fd",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-blue-400" aria-hidden="true" />
              Who We Are
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight mb-5">
              A Software-First{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #06b6d4, #10b981)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Organization
              </span>
            </h2>

            <div className="space-y-4 text-slate-400 text-[15px] leading-relaxed">
              <p>
                Anuj Digital Labs is an independent software development organization. We design and
                build digital products — including Android applications, web platforms, AI-powered
                tools, and custom business software.
              </p>
              <p>
                Our work is guided by a consistent focus on product quality. We care about how
                software behaves under real-world conditions — not just how it looks in a demo.
                Usability, stability, and maintainability are embedded in how we approach every
                project.
              </p>
              <p>
                We operate with a long-term perspective. Products we build are actively maintained,
                updated, and improved over time. We don&apos;t consider a project finished at launch.
              </p>
            </div>
          </div>

          {/* Right: pillar cards */}
          <div className="flex flex-col gap-4">
            {pillars.map((pillar) => (
              <div
                key={pillar.id}
                id={pillar.id}
                className="flex items-start gap-4 p-5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: pillar.bg,
                  border: `1px solid ${pillar.border}`,
                }}
              >
                {/* Icon */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${pillar.color}`}
                  style={{ background: pillar.bg, border: `1px solid ${pillar.border}` }}
                >
                  {pillar.icon}
                </div>
                {/* Text */}
                <div>
                  <h3 className="text-white font-bold text-[15px] mb-1.5">{pillar.title}</h3>
                  <p className="text-slate-400 text-[13.5px] leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
