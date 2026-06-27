"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Particle canvas ─────────────────────────────────────────────── */
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number; alpha: number;
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener("mousemove", onMouse);
    canvas.addEventListener("mouseleave", () => {
      mouse.current = { x: -9999, y: -9999 };
    });

    // Performance: fewer particles + squared distance fast-reject
    const count = window.innerWidth < 768 ? 32 : 50;
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.2,
    }));

    let raf: number;
    const LINK_DIST = 100;
    const LINK_DIST_SQ = LINK_DIST * LINK_DIST;
    const MOUSE_PUSH = 90;
    const MOUSE_PUSH_SQ = MOUSE_PUSH * MOUSE_PUSH;

    const draw = () => {
      // Skip when tab is hidden
      if (document.hidden) {
        raf = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update + draw dots
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dSq = dx * dx + dy * dy;
        if (dSq < MOUSE_PUSH_SQ && dSq > 0) {
          const dist = Math.sqrt(dSq);
          const force = (MOUSE_PUSH - dist) / MOUSE_PUSH;
          p.vx += (dx / dist) * force * 0.5;
          p.vy += (dy / dist) * force * 0.5;
        }
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.vx += (Math.random() - 0.5) * 0.03;
        p.vy += (Math.random() - 0.5) * 0.03;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16,185,129,${p.alpha})`;
        ctx.fill();
      }

      // Draw connecting lines — squared fast-reject
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dSq = dx * dx + dy * dy;
          if (dSq < LINK_DIST_SQ) {
            const opacity = (1 - Math.sqrt(dSq) / LINK_DIST) * 0.2;
            ctx.strokeStyle = `rgba(99,179,237,${opacity})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-70"
      aria-hidden="true"
    />
  );
}

/* ─── Typewriter ──────────────────────────────────────────────────── */
const PHRASES = [
  "Android Applications",
  "AI-Powered Tools",
  "Web Platforms",
  "Business Software",
  "Digital Solutions",
];

function Typewriter() {
  const [display, setDisplay] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = PHRASES[phraseIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < phrase.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), 65);
    } else if (!deleting && charIdx === phrase.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), 38);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % PHRASES.length);
    }
    setDisplay(phrase.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, phraseIdx]);

  return (
    <span className="text-emerald-400 text-glow-emerald">
      {display}
      <span className="animate-blink text-emerald-300">|</span>
    </span>
  );
}

/* ─── 3D Floating mockup card ─────────────────────────────────────── */
function FloatingCard() {
  return (
    <div className="hidden lg:block absolute right-8 xl:right-16 top-1/2 -translate-y-1/2 w-80 xl:w-96 animate-float-slow">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20 blur-xl" aria-hidden="true" />

      {/* Glass card */}
      <div className="relative glass-panel rounded-2xl p-6 neon-border-blue">
        {/* Top bar */}
        <div className="flex items-center gap-2 mb-5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
          <div className="ml-auto flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live Preview
          </div>
        </div>

        {/* Mock code lines */}
        <div className="space-y-2 font-mono text-xs mb-5">
          {[
            { color: "text-blue-400", text: "const app = new DigitalLabs()" },
            { color: "text-emerald-400", text: "  .buildAndroid()" },
            { color: "text-cyan-400", text: "  .addAI(model='gpt')" },
            { color: "text-purple-400", text: "  .deployToCloud()" },
            { color: "text-slate-500", text: "  .scale(∞)" },
          ].map((line, i) => (
            <div
              key={i}
              className={`${line.color} opacity-0 animate-fade-in`}
              style={{ animationDelay: `${i * 300 + 500}ms`, animationFillMode: "forwards" }}
            >
              {line.text}
            </div>
          ))}
        </div>

        {/* Progress bars */}
        <div className="space-y-3">
          {[
            { label: "Android", pct: 95, color: "from-blue-500 to-blue-400" },
            { label: "Web", pct: 90, color: "from-purple-500 to-purple-400" },
            { label: "AI", pct: 85, color: "from-emerald-500 to-cyan-400" },
          ].map((bar) => (
            <div key={bar.label}>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>{bar.label}</span>
                <span>{bar.pct}%</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${bar.color} rounded-full`}
                  style={{ width: `${bar.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Status */}
        <div className="mt-5 flex items-center gap-2 text-xs text-slate-400 border-t border-white/5 pt-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          All systems operational
        </div>
      </div>

      {/* Floating badge */}
      <div className="absolute -bottom-14 -left-5 glass-panel rounded-xl px-4 py-3 neon-border-emerald animate-float">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 text-lg">✓</span>
          <div>
            <p className="text-white text-xs font-bold">Delivered</p>
            <p className="text-slate-400 text-xs">on time, every time</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Orbiting rings decoration ───────────────────────────────────── */
function OrbitRings() {
  return (
    <div className="absolute right-64 xl:right-80 top-1/2 -translate-y-1/2 hidden xl:block" aria-hidden="true">
      <div className="relative w-48 h-48 opacity-10">
        <div className="absolute inset-0 border border-blue-400 rounded-full animate-rotate-slow" />
        <div className="absolute inset-4 border border-emerald-400 rounded-full animate-rotate-slow-reverse" />
        <div className="absolute inset-8 border border-cyan-400 rounded-full animate-rotate-slow" style={{ animationDuration: "15s" }} />
      </div>
    </div>
  );
}

/* ─── Main Hero ───────────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #020617 0%, #0f172a 40%, #1a1040 70%, #0d2550 100%)" }}
      aria-label="Hero section"
    >
      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Grid overlay */}
      <div className="absolute inset-0 hero-grid opacity-40" aria-hidden="true" />

      {/* Ambient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)" }} />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.10) 0%, transparent 70%)" }} />
        <div className="absolute top-1/3 left-1/2 w-80 h-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)" }} />
      </div>

      <OrbitRings />
      <FloatingCard />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="max-w-2xl xl:max-w-3xl">

          {/* Eyebrow badge */}
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-8 animate-fade-in"
            style={{
              background: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.25)",
              boxShadow: "0 0 20px rgba(16,185,129,0.1)",
            }}
          >
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" aria-hidden="true" />
            <span className="text-emerald-300 text-sm font-semibold tracking-wide">
              Software &amp; Digital Innovation
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[1.05] tracking-tight mb-6 animate-fade-in-up">
            <span className="text-white">We Build</span>
            <br />
            <Typewriter />
          </h1>

          {/* Sub-description */}
          <p
            className="text-lg sm:text-xl text-slate-300/80 leading-relaxed mb-10 max-w-xl animate-fade-in-up delay-200"
            style={{ animationFillMode: "both" }}
          >
            Anuj Digital Labs crafts high-quality Android apps, AI-powered
            tools, modern websites, and business software — built to impress,
            built to last.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 mb-14 animate-fade-in-up delay-300"
            style={{ animationFillMode: "both" }}
          >
            <a
              href="#services"
              id="hero-cta-explore"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-bold text-base text-white transition-all duration-300 hover:-translate-y-1 group"
              style={{
                background: "linear-gradient(135deg, #059669, #10b981, #06b6d4)",
                boxShadow: "0 0 30px rgba(16,185,129,0.4), 0 0 80px rgba(16,185,129,0.15)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 50px rgba(16,185,129,0.6), 0 0 120px rgba(16,185,129,0.25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 30px rgba(16,185,129,0.4), 0 0 80px rgba(16,185,129,0.15)";
              }}
            >
              Explore Our Solutions
              <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="/contact"
              id="hero-cta-contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base text-white transition-all duration-300 hover:-translate-y-1 glass-panel-light"
              style={{ border: "1px solid rgba(255,255,255,0.15)" }}
            >
              Start a Project
            </a>
          </div>

          {/* Trust indicators */}
          <div
            className="flex flex-wrap items-center gap-5 animate-fade-in-up delay-500"
            style={{ animationFillMode: "both" }}
          >
            {[
              { icon: "🔒", text: "Enterprise Security" },
              { icon: "⚡", text: "High Performance" },
              { icon: "📱", text: "Cross-Platform" },
              { icon: "🤖", text: "AI-Ready" },
            ].map(({ icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 text-sm text-slate-400/80 px-3 py-1.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <span>{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave — seamless into TechStack dark bg */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className="w-full h-16 lg:h-20">
          <path d="M0 80V40C360 0 720 80 1080 40C1260 10 1380 80 1440 60V80H0Z" fill="#0a0f1a" />
        </svg>
      </div>
    </section>
  );
}
