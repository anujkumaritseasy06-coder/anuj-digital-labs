"use client";

import { useMultiScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    id: "discovery",
    number: "01",
    title: "Discovery",
    description:
      "We learn your business, goals, and users. Deep requirement analysis, competitive research, and a clear product blueprint before a single line of code is written.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden="true">
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.4)",
  },
  {
    id: "design",
    number: "02",
    title: "Design",
    description:
      "Wireframes, UI prototypes, and user flows — reviewed and refined with you until every screen feels exactly right before development begins.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden="true">
        <path d="M12 19l7-7 3 3-7 7-3-3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 2l7.586 7.586" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="11" cy="11" r="2" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.4)",
  },
  {
    id: "build",
    number: "03",
    title: "Build",
    description:
      "Clean, well-structured code with regular check-ins and deliverables. You see real progress every step of the way — no black boxes.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="8 6 2 12 8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "#10b981",
    glow: "rgba(16,185,129,0.4)",
  },
  {
    id: "launch",
    number: "04",
    title: "Launch & Support",
    description:
      "Rigorous testing, Play Store submission or web deployment, and post-launch support to ensure your product performs perfectly in the real world.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.4)",
  },
];

export default function ProcessSection() {
  const containerRef = useMultiScrollReveal();

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0d1628 0%, #060d1a 100%)" }}
      aria-labelledby="process-heading"
      ref={containerRef}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-5"
          style={{ background: "radial-gradient(ellipse, #3b82f6, transparent)" }} />
        <div className="absolute inset-0 dot-grid opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-5"
            style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", color: "#93c5fd" }}
          >
            Our Workflow
          </div>
          <h2 id="process-heading" className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            How We{" "}
            <span className="gradient-text">Work</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            A proven, transparent process that takes your idea from concept
            to a polished, production-ready product — with zero guesswork.
          </p>
        </div>

        {/* Desktop step timeline */}
        <div className="hidden lg:block">
          {/* Connector line */}
          <div className="relative flex items-start justify-between mb-16">
            {/* Background connector */}
            <div
              className="absolute top-10 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-px"
              style={{ background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #10b981, #f59e0b)" }}
              aria-hidden="true"
            >
              {/* Moving dot on line */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white"
                style={{ animation: "float-slow 4s ease-in-out infinite", left: "50%" }}
                aria-hidden="true"
              />
            </div>

            {steps.map((step, i) => (
              <div
                key={step.id}
                id={`process-${step.id}`}
                className="reveal-scale flex flex-col items-center text-center w-1/4 px-4"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Circle icon */}
                <div
                  className="relative w-20 h-20 rounded-full flex items-center justify-center mb-5 text-white z-10 transition-transform duration-300 hover:scale-110 cursor-default"
                  style={{
                    background: `radial-gradient(circle at 35% 35%, ${step.color}dd, ${step.color}88)`,
                    boxShadow: `0 0 0 4px rgba(${step.color === "#3b82f6" ? "59,130,246" : step.color === "#8b5cf6" ? "139,92,246" : step.color === "#10b981" ? "16,185,129" : "245,158,11"},0.15), 0 0 40px ${step.glow}`,
                  }}
                >
                  {step.icon}
                  {/* Step number badge */}
                  <div
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white"
                    style={{ background: step.color, boxShadow: `0 0 12px ${step.glow}` }}
                  >
                    {i + 1}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile vertical layout */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, i) => (
            <div
              key={step.id}
              className="reveal flex gap-5"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Left: icon + line */}
              <div className="flex flex-col items-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white flex-shrink-0"
                  style={{
                    background: `radial-gradient(circle at 35% 35%, ${step.color}dd, ${step.color}88)`,
                    boxShadow: `0 0 20px ${step.glow}`,
                  }}
                >
                  {step.icon}
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 w-px mt-3" style={{ background: `linear-gradient(180deg, ${step.color}40, transparent)` }} />
                )}
              </div>

              {/* Right: content */}
              <div className="pb-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-black" style={{ color: step.color }}>
                    STEP {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom tagline */}
        <div className="mt-12 text-center reveal">
          <p className="text-slate-500 text-sm">
            Every project follows this process — for <span className="text-emerald-400 font-semibold">consistent quality</span> and <span className="text-blue-400 font-semibold">zero surprises</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
