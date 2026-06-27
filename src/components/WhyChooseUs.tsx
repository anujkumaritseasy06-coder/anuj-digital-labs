"use client";

import { useMultiScrollReveal } from "@/hooks/useScrollReveal";

const pillars = [
  {
    id: "reliable",
    title: "Reliable Delivery",
    description: "High standards of quality and consistency. Every project is delivered well-documented, tested, and built to last.",
    gradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
    glow: "rgba(59,130,246,0.3)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden="true">
        <path d="M9 12l2 2 4-4M21 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s9 4.477 9 10z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "secure",
    title: "Security-First",
    description: "Data encryption, secure auth, and privacy-by-design. Security is embedded into every layer — never an afterthought.",
    gradient: "linear-gradient(135deg, #10b981, #059669)",
    glow: "rgba(16,185,129,0.3)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "user-focused",
    title: "User-Focused Design",
    description: "Intuitive interfaces, accessible UX, and designs that real users love. Every interaction is intentional.",
    gradient: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
    glow: "rgba(139,92,246,0.3)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "modern-tech",
    title: "Modern Technology",
    description: "Latest frameworks, cloud-native architecture, and AI capabilities to give your product a real competitive edge.",
    gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
    glow: "rgba(245,158,11,0.3)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="8 6 2 12 8 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "scalable",
    title: "Scalable Solutions",
    description: "Software architected to grow with you — startup to enterprise. Our solutions scale smoothly as your needs evolve.",
    gradient: "linear-gradient(135deg, #ec4899, #be185d)",
    glow: "rgba(236,72,153,0.3)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="17 6 23 6 23 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "transparent",
    title: "Transparent Process",
    description: "Clear communication, honest timelines, and full visibility into your project at every stage. No surprises.",
    gradient: "linear-gradient(135deg, #06b6d4, #0891b2)",
    glow: "rgba(6,182,212,0.3)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  const containerRef = useMultiScrollReveal();

  return (
    <section
      id="why-us"
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #080f1e 0%, #0d1628 100%)" }}
      aria-label="Why choose us"
      ref={containerRef}
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }} />
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #10b981, transparent)" }} />
        <div className="absolute inset-0 dot-grid opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-5"
            style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", color: "#6ee7b7" }}
          >
            Our Strengths
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            Why Choose{" "}
            <span className="gradient-text">Anuj Digital Labs?</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            We combine deep technical expertise with a genuine commitment to your success —
            delivering software that impresses, performs, and scales.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.id}
              id={`pillar-${pillar.id}`}
              className="reveal-scale group relative rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                transitionDelay: `${i * 80}ms`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.border = `1px solid ${pillar.glow.replace("0.3", "0.5")}`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${pillar.glow}, inset 0 0 30px ${pillar.glow.replace("0.3","0.03")}`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.border = "1px solid rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-white transition-transform duration-300 group-hover:scale-110"
                style={{ background: pillar.gradient, boxShadow: `0 8px 24px ${pillar.glow}` }}
              >
                {pillar.icon}
              </div>

              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors duration-300">
                {pillar.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA — glassmorphism panel */}
        <div
          className="reveal relative rounded-3xl p-8 lg:p-12 overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8"
          style={{
            background: "rgba(16, 185, 129, 0.06)",
            border: "1px solid rgba(16, 185, 129, 0.15)",
            boxShadow: "0 0 80px rgba(16, 185, 129, 0.06), inset 0 0 40px rgba(16,185,129,0.02)",
          }}
        >
          {/* Glow accent */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle, #10b981, transparent)" }} aria-hidden="true" />

          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Ready to build something{" "}
              <span className="text-glow-emerald" style={{ color: "#10b981" }}>extraordinary?</span>
            </h3>
            <p className="text-slate-400 text-lg">
              Tell us about your project — we&apos;ll respond within one business day.
            </p>
          </div>
          <a
            href="/contact"
            id="why-us-cta"
            className="flex-shrink-0 inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white transition-all duration-300 hover:-translate-y-1 group"
            style={{
              background: "linear-gradient(135deg, #059669, #10b981)",
              boxShadow: "0 0 30px rgba(16,185,129,0.4)",
            }}
          >
            Start a Project
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
