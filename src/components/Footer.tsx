"use client";

import Link from "next/link";

const footerLinks = {
  company: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/solutions", label: "Solutions" },
    { href: "/apps", label: "Our Apps" },
    { href: "/updates", label: "Latest Updates" },
    { href: "/faq", label: "FAQ" },
    { href: "/support", label: "Support" },
    { href: "/contact", label: "Contact" },
  ],
  services: [
    { href: "/solutions#android-development", label: "Android App Development" },
    { href: "/solutions#web-development", label: "Web Development" },
    { href: "/solutions#ai-powered-utilities", label: "AI Solutions" },
    { href: "/solutions#business-productivity-software", label: "Business Software" },
    { href: "/solutions#digital-automation-tools", label: "Digital Automation" },
  ],
  legal: [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-of-service", label: "Terms of Service" },
    { href: "/data-deletion", label: "Data Deletion Request" },
  ],
};

/** Reusable footer link item */
function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-center text-slate-400 hover:text-emerald-300 text-[15px] transition-all duration-200"
      >
        <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-200 text-emerald-400 mr-0 group-hover:mr-1">
          ›
        </span>
        {label}
      </Link>
    </li>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="site-footer"
      className="bg-slate-900 text-slate-300"
      aria-label="Site footer"
    >
      {/* ── CTA Banner ────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #020617 0%, #060d1a 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* Aurora ambient glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute inset-0 opacity-25"
            style={{
              background:
                "conic-gradient(from 120deg at 50% 70%, #1e3a8a22, #10b98122, #8b5cf622, #1e3a8a22)",
              filter: "blur(60px)",
            }}
          />
          <div
            className="absolute top-0 left-1/3 w-80 h-80 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }}
          />
          <div
            className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #10b981, transparent)" }}
          />
          <div className="absolute inset-0 dot-grid opacity-20" />
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {[
            { size: 60, top: "20%", left: "5%", color: "rgba(59,130,246,0.08)", delay: "0s" },
            { size: 40, bottom: "20%", left: "8%", color: "rgba(16,185,129,0.07)", delay: "1.5s" },
            { size: 80, top: "15%", right: "5%", color: "rgba(139,92,246,0.07)", delay: "0.8s" },
            { size: 50, bottom: "15%", right: "7%", color: "rgba(245,158,11,0.07)", delay: "2.5s" },
          ].map((s, i) => (
            <div
              key={i}
              className="absolute rounded-xl border rotate-45 animate-float-slow"
              style={{
                width: s.size,
                height: s.size,
                top: (s as { top?: string }).top,
                left: (s as { left?: string }).left,
                bottom: (s as { bottom?: string }).bottom,
                right: (s as { right?: string }).right,
                borderColor: s.color.replace("0.07", "0.2").replace("0.08", "0.2"),
                background: s.color,
                animationDelay: s.delay,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-6"
            style={{
              background: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.25)",
              color: "#6ee7b7",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            Let&apos;s Build Something Great
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-5">
            Have a Project{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #10b981, #06b6d4, #3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              in Mind?
            </span>
          </h2>

          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Whether you need an Android app, a web platform, an AI tool, or custom
            business software — we&apos;re ready to build it.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              id="footer-cta-contact"
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full font-bold text-white text-base transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "linear-gradient(135deg, #059669, #10b981, #06b6d4)",
                boxShadow: "0 0 30px rgba(16,185,129,0.4), 0 0 80px rgba(16,185,129,0.12)",
              }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Get in Touch
            </Link>
            <Link
              href="/about"
              id="footer-cta-about"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-white text-base transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main Footer ───────────────────────────────────────────────────── */}
      <div
        className="relative border-t border-slate-800/50"
        style={{ background: "rgba(4, 9, 20, 0.6)", backdropFilter: "blur(20px)" }}
      >
        {/* Ambient glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-900/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

            {/* ── Brand Column ─────────────────────────────────────────────── */}
            <div className="lg:col-span-4 pr-0 lg:pr-8">
              <Link
                href="/"
                id="footer-logo"
                className="flex items-center gap-3.5 mb-6 group"
                aria-label="Anuj Digital Labs — home"
              >
                <div className="relative w-11 h-11 flex items-center justify-center flex-shrink-0">
                  <div
                    className="absolute inset-0 rounded-xl opacity-100 blur-lg"
                    style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.5), rgba(6,182,212,0.5))" }}
                    aria-hidden="true"
                  />
                  <div className="relative w-full h-full transform scale-105">
                    <svg viewBox="0 0 40 40" fill="none" className="w-full h-full drop-shadow-lg" aria-hidden="true">
                      <rect width="40" height="40" rx="12" fill="url(#footer-lg-bg)" />
                      <rect width="40" height="40" rx="12" fill="url(#footer-lg-glass)" />
                      <rect width="39" height="39" x="0.5" y="0.5" rx="11.5" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                      <defs>
                        <linearGradient id="footer-lg-bg" x1="0" y1="0" x2="40" y2="40">
                          <stop offset="0%" stopColor="#0f172a" />
                          <stop offset="100%" stopColor="#020617" />
                        </linearGradient>
                        <linearGradient id="footer-lg-glass" x1="0" y1="0" x2="0" y2="40">
                          <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
                          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                        </linearGradient>
                        <linearGradient id="footer-lg-accent" x1="8" y1="12" x2="32" y2="28">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="50%" stopColor="#06b6d4" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                        <filter id="footer-lg-glow" x="-20%" y="-20%" width="140%" height="140%">
                          <feGaussianBlur stdDeviation="2" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                      </defs>
                      <path
                        d="M8.5 27.5 L14.5 13 L20 23 L25.5 13 L31.5 27.5"
                        stroke="url(#footer-lg-accent)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        filter="url(#footer-lg-glow)"
                      />
                      <circle cx="20" cy="19.5" r="3.5" fill="#ffffff" />
                      <circle cx="20" cy="19.5" r="3.5" fill="#ffffff" filter="url(#footer-lg-glow)" opacity="0.8" />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="font-extrabold text-[17px] leading-tight tracking-tight flex items-center gap-1.5 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                    Anuj
                    <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                      Digital Labs
                    </span>
                  </p>
                  <p className="text-emerald-400/80 text-[12px] font-semibold mt-0.5 tracking-[0.03em] uppercase">
                    Smart Digital Solutions
                  </p>
                </div>
              </Link>

              <p className="text-slate-400 text-[14px] leading-relaxed mb-8 max-w-sm">
                We build Android apps, websites, AI tools, and business software
                that help organizations thrive in the digital era.
              </p>

              {/* Website link (only confirmed real link) */}
              <div className="space-y-3">
                <a
                  href="https://anujdigitallabs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-website-link"
                  className="group inline-flex items-center gap-2.5 text-[13.5px] font-medium text-slate-400 hover:text-cyan-400 transition-colors duration-200"
                >
                  <span
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-110"
                    style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)" }}
                  >
                    <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                    </svg>
                  </span>
                  anujdigitallabs.com
                </a>

                {/* Contact note pointing to /contact page */}
                <Link
                  href="/contact"
                  id="footer-contact-link"
                  className="group inline-flex items-center gap-2.5 text-[13.5px] font-medium text-slate-400 hover:text-emerald-400 transition-colors duration-200"
                >
                  <span
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-110"
                    style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}
                  >
                    <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  Use the Contact page to reach us
                </Link>

                {/* Location */}
                <div className="inline-flex items-center gap-2.5 text-[13.5px] font-medium text-slate-500">
                  <span
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(148,163,184,0.08)", border: "1px solid rgba(148,163,184,0.12)" }}
                  >
                    <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  India — Operating Globally
                </div>
              </div>
            </div>

            {/* ── Company Links ──────────────────────────────────────────── */}
            <div className="lg:col-span-2">
              <h3 className="text-white font-bold text-[15px] mb-6 tracking-wide flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" aria-hidden="true" />
                Company
              </h3>
              <ul className="space-y-3.5" aria-label="Company links">
                {footerLinks.company.map((link) => (
                  <FooterLink key={link.label} href={link.href} label={link.label} />
                ))}
              </ul>
            </div>

            {/* ── Services Links ─────────────────────────────────────────── */}
            <div className="lg:col-span-3">
              <h3 className="text-white font-bold text-[15px] mb-6 tracking-wide flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
                Services
              </h3>
              <ul className="space-y-3.5" aria-label="Services links">
                {footerLinks.services.map((link) => (
                  <FooterLink key={link.label} href={link.href} label={link.label} />
                ))}
              </ul>
            </div>

            {/* ── Legal Links ────────────────────────────────────────────── */}
            <div className="lg:col-span-3">
              <h3 className="text-white font-bold text-[15px] mb-6 tracking-wide flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500" aria-hidden="true" />
                Legal &amp; Policies
              </h3>
              <ul className="space-y-3.5" aria-label="Legal links">
                {footerLinks.legal.map((link) => (
                  <FooterLink key={link.label} href={link.href} label={link.label} />
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* ── Bottom Bar ────────────────────────────────────────────────── */}
        <div className="relative border-t border-slate-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
            <p>
              &copy; {currentYear} Anuj Digital Labs. All rights reserved.
            </p>
            <nav aria-label="Footer legal navigation">
              <ul className="flex items-center gap-4">
                <li>
                  <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors duration-200">
                    Privacy
                  </Link>
                </li>
                <li aria-hidden="true">·</li>
                <li>
                  <Link href="/terms-of-service" className="hover:text-slate-300 transition-colors duration-200">
                    Terms
                  </Link>
                </li>
                <li aria-hidden="true">·</li>
                <li>
                  <Link href="/sitemap.xml" className="hover:text-slate-300 transition-colors duration-200">
                    Sitemap
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
