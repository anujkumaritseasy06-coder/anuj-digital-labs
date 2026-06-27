"use client";

import { useMultiScrollReveal } from "@/hooks/useScrollReveal";

const values = [
  {
    id: "accessible",
    label: "Accessible",
    description: "Built for everyone, regardless of ability or device.",
    icon: "♿",
    color: "#3b82f6",
  },
  {
    id: "innovative",
    label: "Innovative",
    description: "We embrace emerging tech to build forward-thinking solutions.",
    icon: "💡",
    color: "#f59e0b",
  },
  {
    id: "useful",
    label: "Truly Useful",
    description: "Every feature ships to solve a real problem for real people.",
    icon: "🎯",
    color: "#10b981",
  },
];

export default function Vision() {
  const containerRef = useMultiScrollReveal();

  return (
    <section
      id="vision"
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #060d1a 0%, #0a1020 100%)" }}
      aria-label="Company vision and mission"
      ref={containerRef}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }}
        />
        <div
          className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #10b981, transparent)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── Left: Text ── */}
          <div className="reveal-left">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-6"
              style={{
                background: "rgba(59,130,246,0.1)",
                border: "1px solid rgba(59,130,246,0.2)",
                color: "#93c5fd",
              }}
            >
              Our Mission
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-6">
              <span className="text-white">Building a More </span>
              <span
                style={{
                  background: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #10b981 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Connected
              </span>
              <span className="text-white"> Digital World</span>
            </h2>

            <p className="text-slate-300 text-lg leading-relaxed mb-5">
              At Anuj Digital Labs, our mission is to make powerful digital
              technology accessible to every organization — from growing startups
              to established enterprises.
            </p>

            <p className="text-slate-400 leading-relaxed mb-8">
              We believe well-crafted software transforms how businesses operate,
              teams collaborate, and people experience the digital world. We don&apos;t
              just build software — we build solutions that deliver lasting value.
            </p>

            {/* Value chips */}
            <div className="flex flex-wrap gap-3 mb-8">
              {["Quality Code", "Clear Communication", "Long-term Thinking", "User Empathy"].map(
                (chip) => (
                  <span
                    key={chip}
                    className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 cursor-default"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(148,163,184,0.9)",
                    }}
                  >
                    {chip}
                  </span>
                )
              )}
            </div>

            <a
              href="/contact"
              id="vision-cta"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-white transition-all duration-300 hover:-translate-y-1 group"
              style={{
                background: "linear-gradient(135deg, #1e3a8a, #1d4ed8)",
                boxShadow: "0 0 30px rgba(59,130,246,0.3), 0 8px 30px rgba(30,58,138,0.4)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 50px rgba(59,130,246,0.5), 0 8px 40px rgba(30,58,138,0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 30px rgba(59,130,246,0.3), 0 8px 30px rgba(30,58,138,0.4)";
              }}
            >
              Work With Us
              <svg
                className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* ── Right: 3D dark card ── */}
          <div className="relative reveal-right">
            {/* Outer glow */}
            <div
              className="absolute inset-0 rounded-3xl blur-2xl opacity-20 -z-10"
              style={{
                background: "linear-gradient(135deg, #1e3a8a, #10b981)",
                transform: "scale(1.06)",
              }}
              aria-hidden="true"
            />

            {/* Main glass card */}
            <div
              className="relative rounded-3xl p-8 lg:p-10 text-white overflow-hidden"
              style={{
                background: "linear-gradient(145deg, #0f2460 0%, #0f172a 60%, #082030 100%)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Interior ambient orbs */}
              <div
                className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-20 pointer-events-none"
                style={{ background: "radial-gradient(circle, #10b981, transparent)" }}
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full opacity-15 pointer-events-none"
                style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }}
                aria-hidden="true"
              />

              {/* Logo mark */}
              <div className="relative z-10 mb-7">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
                    <path
                      d="M8 28 L14 12 L20 24 L26 12 L32 28"
                      stroke="#10b981"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <circle cx="20" cy="20" r="2.5" fill="#ffffff" opacity="0.7" />
                  </svg>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="relative z-10 mb-8">
                <div
                  className="text-5xl font-serif leading-none mb-2"
                  style={{ color: "rgba(16,185,129,0.3)" }}
                  aria-hidden="true"
                >
                  &ldquo;
                </div>
                <p
                  className="text-xl lg:text-2xl font-semibold leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.9)" }}
                >
                  We exist to empower organizations with technology that is not
                  just functional, but truly transformative.
                </p>
              </blockquote>

              {/* Values */}
              <div className="relative z-10 space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                  Core Values
                </p>
                {values.map((value) => (
                  <div
                    key={value.id}
                    id={`vision-value-${value.id}`}
                    className="flex items-start gap-4 rounded-xl p-3.5 transition-all duration-200 hover:scale-[1.01] cursor-default"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <span className="text-2xl flex-shrink-0" aria-hidden="true">{value.icon}</span>
                    <div>
                      <p className="font-bold text-white text-sm">{value.label}</p>
                      <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{value.description}</p>
                    </div>
                    <div
                      className="ml-auto w-2 h-2 rounded-full flex-shrink-0 mt-1"
                      style={{ background: value.color, boxShadow: `0 0 8px ${value.color}` }}
                      aria-hidden="true"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge 1 */}
            <div
              className="absolute -bottom-5 -left-5 rounded-2xl px-5 py-4 shadow-2xl animate-float z-20"
              style={{
                background: "linear-gradient(135deg, #059669, #10b981)",
                boxShadow: "0 0 30px rgba(16,185,129,0.4)",
              }}
              aria-hidden="true"
            >
              <div className="flex items-center gap-2">
                <span className="text-white text-xl">✓</span>
                <div>
                  <p className="text-white font-bold text-sm leading-none">Quality First</p>
                  <p className="text-emerald-100 text-xs mt-0.5">always</p>
                </div>
              </div>
            </div>

            {/* Floating badge 2 */}
            <div
              className="absolute -top-4 -right-4 rounded-xl px-4 py-2.5 shadow-xl animate-float-delayed z-20"
              style={{
                background: "rgba(15,23,42,0.95)",
                border: "1px solid rgba(59,130,246,0.3)",
                boxShadow: "0 0 20px rgba(59,130,246,0.2)",
              }}
              aria-hidden="true"
            >
              <p className="text-blue-400 text-xs font-bold">🚀 Shipping</p>
              <p className="text-white text-xs font-semibold">Production-ready</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
