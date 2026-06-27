"use client";

import { useRef } from "react";
import { useMultiScrollReveal } from "@/hooks/useScrollReveal";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  glowColor: string;
  number: string;
  tags: string[];
}

const services: Service[] = [
  {
    id: "android-dev",
    number: "01",
    title: "Android App Development",
    description:
      "Native Android applications built with Kotlin & Jetpack Compose — from Play Store strategy to production deployment. Fast, beautiful, and rock-solid.",
    tags: ["Kotlin", "Jetpack Compose", "Material 3", "Play Store"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" aria-hidden="true">
        <path d="M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M9 6h6M9 9h6M9 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    gradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
    glowColor: "rgba(59, 130, 246, 0.3)",
  },
  {
    id: "web-dev",
    number: "02",
    title: "Web Development",
    description:
      "Blazing-fast web apps with Next.js, React, and TypeScript. SEO-optimized, mobile-first, and crafted to convert visitors into customers.",
    tags: ["Next.js", "React", "TypeScript", "TailwindCSS"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    gradient: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
    glowColor: "rgba(139, 92, 246, 0.3)",
  },
  {
    id: "ai-solutions",
    number: "03",
    title: "AI Solutions",
    description:
      "Intelligent features that work — NLP, automation, smart recommendations, and AI-powered analytics integrated into your existing or new products.",
    tags: ["OpenAI", "Python", "ML APIs", "Automation"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    gradient: "linear-gradient(135deg, #10b981, #059669)",
    glowColor: "rgba(16, 185, 129, 0.3)",
  },
  {
    id: "business-software",
    number: "04",
    title: "Business Software",
    description:
      "Custom ERP, inventory, billing, CRM, and workflow tools built for your exact processes. Replace spreadsheets with software that actually works.",
    tags: ["ERP", "CRM", "Billing", "Workflow"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 8l3 3 2-2 3 3 2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
    glowColor: "rgba(245, 158, 11, 0.3)",
  },
  {
    id: "digital-tools",
    number: "05",
    title: "Digital Tools & Utilities",
    description:
      "Purpose-built micro-apps, calculators, dashboards, and productivity tools that solve specific problems elegantly and efficiently.",
    tags: ["Productivity", "Dashboards", "Utilities", "SaaS"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    gradient: "linear-gradient(135deg, #ec4899, #be185d)",
    glowColor: "rgba(236, 72, 153, 0.3)",
  },
];

/* ─── 3D Tilt Card ────────────────────────────────────────────────── */
function ServiceCard({ service, delay }: { service: Service; delay: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -10;
    const rotateY = ((x - cx) / cx) * 10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;
    card.style.transition = "transform 0.1s ease-out";
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    card.style.transition = "transform 0.5s ease-out";
  };

  return (
    <article
      id={`service-card-${service.id}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="reveal-scale group relative rounded-2xl p-7 cursor-default"
      style={{
        background: "rgba(15, 23, 42, 0.7)",
        border: "1px solid rgba(255, 255, 255, 0.07)",
        animationDelay: `${delay}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Ghost number */}
      <div
        className="absolute top-4 right-5 text-7xl font-black pointer-events-none select-none transition-all duration-300 group-hover:opacity-30"
        style={{ color: "rgba(255,255,255,0.04)", fontVariantNumeric: "tabular-nums", lineHeight: 1 }}
        aria-hidden="true"
      >
        {service.number}
      </div>

      {/* Top gradient bar */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: service.gradient }}
        aria-hidden="true"
      />

      {/* Icon */}
      <div
        className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white transition-transform duration-300 group-hover:scale-110"
        style={{ background: service.gradient, boxShadow: `0 8px 32px ${service.glowColor}` }}
      >
        {service.icon}
        {/* Icon inner glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `radial-gradient(circle at center, rgba(255,255,255,0.2), transparent 70%)` }} />
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors duration-300">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-slate-400 text-sm leading-relaxed mb-5">
        {service.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "rgba(148,163,184,0.9)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Hover bottom arrow */}
      <div
        className="mt-5 flex items-center gap-2 text-sm font-semibold text-emerald-400 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300"
      >
        Learn more
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </article>
  );
}

export default function Services() {
  const containerRef = useMultiScrollReveal();

  return (
    <section
      id="services"
      className="py-24 px-4 sm:px-6 lg:px-8 relative"
      style={{ background: "#060d1a" }}
      aria-label="Services section"
      ref={containerRef}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-60" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-emerald-300 text-sm font-semibold mb-5"
            style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}
          >
            What We Offer
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            Our Core{" "}
            <span className="gradient-text">Services</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            From mobile apps to AI-powered enterprise platforms — we deliver end-to-end
            digital solutions engineered to grow your business.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
