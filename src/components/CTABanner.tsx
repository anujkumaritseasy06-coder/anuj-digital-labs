"use client";

import Link from "next/link";
import { useMultiScrollReveal } from "@/hooks/useScrollReveal";

const stats = [
  { value: "5+", label: "Service Categories" },
  { value: "100%", label: "Client-Focused" },
  { value: "∞", label: "Scalability" },
  { value: "24/7", label: "Support Ready" },
];

export default function CTABanner() {
  const containerRef = useMultiScrollReveal();

  return (
    <section
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #060d1a 0%, #0a0f1a 100%)" }}
      aria-label="Call to action"
      ref={containerRef}
    >
      {/* Animated aurora background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: "conic-gradient(from 0deg at 50% 60%, #1e3a8a22, #10b98122, #8b5cf622, #1e3a8a22)",
            filter: "blur(80px)",
          }}
        />
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #10b981, transparent)" }} />
        <div className="absolute inset-0 dot-grid opacity-25" />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[
          { size: 80, top: "15%", left: "8%", color: "rgba(59,130,246,0.06)", delay: "0s" },
          { size: 50, top: "70%", left: "5%", color: "rgba(16,185,129,0.06)", delay: "2s" },
          { size: 120, top: "20%", right: "6%", color: "rgba(139,92,246,0.06)", delay: "1s" },
          { size: 60, top: "65%", right: "8%", color: "rgba(245,158,11,0.06)", delay: "3s" },
        ].map((shape, i) => (
          <div
            key={i}
            className="absolute rounded-2xl border rotate-45 animate-float-slow"
            style={{
              width: shape.size,
              height: shape.size,
              top: shape.top,
              left: shape.left,
              right: (shape as { right?: string }).right,
              borderColor: shape.color.replace("0.06", "0.15"),
              background: shape.color,
              animationDelay: shape.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-8 reveal"
          style={{
            background: "rgba(16,185,129,0.1)",
            border: "1px solid rgba(16,185,129,0.25)",
            color: "#6ee7b7",
            boxShadow: "0 0 20px rgba(16,185,129,0.08)",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
          Ready to Start?
        </div>

        {/* Headline */}
        <h2
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6 reveal"
          style={{ transitionDelay: "100ms" }}
        >
          Turn Your Idea Into a{" "}
          <span
            className="block sm:inline"
            style={{
              background: "linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #3b82f6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Digital Reality
          </span>
        </h2>

        {/* Sub */}
        <p
          className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-12 max-w-2xl mx-auto reveal"
          style={{ transitionDelay: "200ms" }}
        >
          Whether you need an Android app, a web platform, an AI-powered tool,
          or a complete business system — we&apos;re ready to build it with you.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 reveal"
          style={{ transitionDelay: "300ms" }}
        >
          <Link
            href="/contact"
            id="cta-banner-primary"
            className="inline-flex items-center gap-2.5 px-10 py-4 rounded-full font-bold text-white text-lg transition-all duration-300 hover:-translate-y-1 group"
            style={{
              background: "linear-gradient(135deg, #059669, #10b981, #06b6d4)",
              boxShadow: "0 0 40px rgba(16,185,129,0.4), 0 0 100px rgba(16,185,129,0.15)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 60px rgba(16,185,129,0.6), 0 0 140px rgba(16,185,129,0.25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 40px rgba(16,185,129,0.4), 0 0 100px rgba(16,185,129,0.15)";
            }}
          >
            Get a Free Consultation
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          <Link
            href="/about"
            id="cta-banner-secondary"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            Learn About Us
          </Link>
        </div>

        {/* Stats row */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto reveal"
          style={{ transitionDelay: "400ms" }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="text-3xl font-extrabold mb-1"
                style={{
                  background: "linear-gradient(135deg, #10b981, #06b6d4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </div>
              <div className="text-slate-500 text-xs font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Contact note */}
        <p
          className="mt-10 text-slate-600 text-sm reveal"
          style={{ transitionDelay: "500ms" }}
        >
          Email us directly at{" "}
          <a
            href="mailto:anujvibedeveloper@gmail.com"
            className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium underline underline-offset-2"
          >
            anujvibedeveloper@gmail.com
          </a>
          {" "}— we respond within one business day.
        </p>
      </div>
    </section>
  );
}
