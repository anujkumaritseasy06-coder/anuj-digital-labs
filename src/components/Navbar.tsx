"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/",          label: "Home",     isHash: false },
  { href: "/about",     label: "About",    isHash: false },
  { href: "/apps",      label: "Our Apps", isHash: false },
  { href: "/solutions", label: "Solutions",isHash: false },
  { href: "/faq",       label: "FAQ",      isHash: false },
  { href: "/support",   label: "Support",  isHash: false },
  { href: "/contact",   label: "Contact",  isHash: false },
];


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node))
        setMobileOpen(false);
    };
    if (mobileOpen) document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [mobileOpen]);

  /* Hash links (/#services) are never "active" — they're scroll anchors */
  const isActive = (href: string, isHash: boolean) => {
    if (isHash) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(4, 9, 20, 0.96)" : "rgba(4, 9, 20, 0.55)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.07)"
            : "1px solid rgba(255,255,255,0.04)",
          boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.45)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-[68px]">

            {/* ── Logo ── */}
            <Link
              href="/"
              id="nav-logo"
              className="flex items-center gap-3.5 flex-shrink-0 group"
              aria-label="Anuj Digital Labs"
            >
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-xl opacity-100 blur-lg"
                  style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.5), rgba(6,182,212,0.5))" }}
                  aria-hidden="true"
                />
                <div className="relative w-full h-full transform scale-105">
                  <svg viewBox="0 0 40 40" fill="none" className="w-full h-full drop-shadow-lg">
                    {/* Background Plate */}
                    <rect width="40" height="40" rx="12" fill="url(#nav-lg-bg)" />
                    <rect width="40" height="40" rx="12" fill="url(#nav-lg-glass)" />
                    <rect width="39" height="39" x="0.5" y="0.5" rx="11.5" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    
                    <defs>
                      <linearGradient id="nav-lg-bg" x1="0" y1="0" x2="40" y2="40">
                        <stop offset="0%" stopColor="#0f172a" />
                        <stop offset="100%" stopColor="#020617" />
                      </linearGradient>
                      <linearGradient id="nav-lg-glass" x1="0" y1="0" x2="0" y2="40">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                      </linearGradient>
                      <linearGradient id="nav-lg-accent" x1="8" y1="12" x2="32" y2="28">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="50%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                      <filter id="nav-lg-glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>
                    
                    {/* The "M" / Mountain Icon */}
                    <path
                      d="M8.5 27.5 L14.5 13 L20 23 L25.5 13 L31.5 27.5"
                      stroke="url(#nav-lg-accent)" 
                      strokeWidth="3"
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      fill="none"
                      filter="url(#nav-lg-glow)"
                    />
                    
                    {/* Glowing Core Dot */}
                    <circle cx="20" cy="19.5" r="3.5" fill="#ffffff" />
                    <circle cx="20" cy="19.5" r="3.5" fill="#ffffff" filter="url(#nav-lg-glow)" opacity="0.8" />
                  </svg>
                </div>
              </div>
              
              <div className="flex flex-col justify-center">
                <p className="font-extrabold text-[16px] leading-tight tracking-tight flex items-center gap-1.5 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  Anuj
                  <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Digital Labs</span>
                </p>
                <p className="text-emerald-400/80 text-[11px] font-semibold mt-0.5 tracking-[0.03em] uppercase">
                  Smart Digital Solutions
                </p>
              </div>
            </Link>

            {/* ── Desktop nav ── */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map(({ href, label, isHash }) => {
                const active = isActive(href, isHash);
                return (
                  <Link
                    key={href}
                    href={href}
                    id={`nav-${label.toLowerCase()}`}
                    className="relative px-4 py-2.5 text-[13.5px] font-medium rounded-lg group transition-colors duration-200"
                    style={{ color: active ? "#f1f5f9" : "rgba(148,163,184,0.75)" }}
                    onMouseEnter={(e) => {
                      if (!active)
                        (e.currentTarget as HTMLElement).style.color = "#f1f5f9";
                    }}
                    onMouseLeave={(e) => {
                      if (!active)
                        (e.currentTarget as HTMLElement).style.color = "rgba(148,163,184,0.75)";
                    }}
                  >
                    {/* Hover background */}
                    <span
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
                      style={{ background: "rgba(255,255,255,0.05)" }}
                      aria-hidden="true"
                    />

                    <span className="relative z-10">{label}</span>

                    {/* Active: single clean bottom line — no box */}
                    {active && (
                      <span
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-5 rounded-full pointer-events-none"
                        style={{
                          background: "linear-gradient(90deg, #10b981, #06b6d4)",
                          boxShadow: "0 0 10px rgba(16,185,129,0.7)",
                        }}
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ── Right: CTA ── */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Subtle "open" status */}
              <span
                className="flex items-center gap-1.5 text-[11.5px] font-medium px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(16,185,129,0.07)",
                  border: "1px solid rgba(16,185,129,0.16)",
                  color: "#6ee7b7",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
                  aria-hidden="true"
                />
                Available
              </span>

              <Link
                href="/contact"
                id="nav-cta-contact"
                className="inline-flex items-center gap-2 text-[13.5px] font-bold px-5 py-2.5 rounded-xl text-white transition-all duration-300 hover:-translate-y-px"
                style={{
                  background: "linear-gradient(135deg, #059669, #10b981)",
                  boxShadow: "0 0 18px rgba(16,185,129,0.32), inset 0 1px 0 rgba(255,255,255,0.12)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 28px rgba(16,185,129,0.55), inset 0 1px 0 rgba(255,255,255,0.12)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 18px rgba(16,185,129,0.32), inset 0 1px 0 rgba(255,255,255,0.12)";
                }}
              >
                Get Started
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* ── Mobile burger ── */}
            <button
              id="mobile-menu-toggle"
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200"
              style={{
                background: mobileOpen ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.05)",
                border: mobileOpen ? "1px solid rgba(16,185,129,0.22)" : "1px solid rgba(255,255,255,0.07)",
              }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <svg
                style={{ width: 18, height: 18, transition: "transform 0.25s ease", transform: mobileOpen ? "rotate(90deg)" : "none" }}
                className="text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* ── Mobile dropdown ── */}
        <div
          ref={drawerRef}
          className="lg:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: mobileOpen ? "480px" : "0",
            opacity: mobileOpen ? 1 : 0,
          }}
        >
          <div
            className="mx-4 mb-4 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(6, 12, 24, 0.98)",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <div className="p-2 space-y-0.5">
              {navLinks.map(({ href, label, isHash }) => {
                const active = isActive(href, isHash);
                return (
                  <Link
                    key={href}
                    href={href}
                    id={`mobile-nav-${label.toLowerCase()}`}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150"
                    style={{
                      color: active ? "#a7f3d0" : "rgba(148,163,184,0.85)",
                      background: active ? "rgba(16,185,129,0.08)" : "transparent",
                    }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                    {active && (
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: "#10b981", boxShadow: "0 0 6px #10b981" }}
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
            <div
              className="p-3 pt-0"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              <Link
                href="/contact"
                id="mobile-nav-cta"
                className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white"
                style={{
                  background: "linear-gradient(135deg, #059669, #10b981)",
                  boxShadow: "0 0 16px rgba(16,185,129,0.3)",
                }}
                onClick={() => setMobileOpen(false)}
              >
                Get Started
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
