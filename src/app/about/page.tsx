import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About Us | Anuj Digital Labs",
  description:
    "Learn about Anuj Digital Labs — our mission, vision, core values, and the digital products we build. We specialize in Android apps, AI tools, web development, and business software.",
  openGraph: {
    title: "About Us | Anuj Digital Labs",
    description:
      "Anuj Digital Labs builds reliable, secure, and user-focused digital products. Explore our mission, vision, and core values.",
    url: "https://anujdigitallabs.com/about",
    siteName: "Anuj Digital Labs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Anuj Digital Labs",
    description:
      "We build Android apps, web platforms, AI tools, and business software. Learn who we are and what drives us.",
  },
};

const coreValues = [
  {
    id: "innovation",
    title: "Innovation",
    description:
      "We embrace emerging technologies and creative thinking to build solutions that are ahead of their time — not just functional, but forward-looking.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "bg-amber-50 text-amber-600 border-amber-100",
    dot: "bg-amber-400",
  },
  {
    id: "simplicity",
    title: "Simplicity",
    description:
      "We believe the best software is software that gets out of the way. Clean interfaces, clear logic, and minimal friction are central to how we design.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M4 6h16M4 12h8m-8 6h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    color: "bg-blue-50 text-blue-600 border-blue-100",
    dot: "bg-blue-400",
  },
  {
    id: "reliability",
    title: "Reliability",
    description:
      "Dependable software is non-negotiable. We build with stability and robustness in mind so the products we deliver work when they need to most.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M9 12l2 2 4-4M21 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s9 4.477 9 10z"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    dot: "bg-emerald-400",
  },
  {
    id: "privacy",
    title: "Privacy",
    description:
      "We treat user data with respect. Our products are built with data minimization principles, transparent practices, and secure storage as first-class concerns.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "bg-violet-50 text-violet-600 border-violet-100",
    dot: "bg-violet-400",
  },
  {
    id: "user-centric",
    title: "User-Centric Design",
    description:
      "Everything we build is designed around the people who will use it. Real usability, thoughtful accessibility, and genuine empathy guide every design decision.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    color: "bg-pink-50 text-pink-600 border-pink-100",
    dot: "bg-pink-400",
  },
  {
    id: "continuous-improvement",
    title: "Continuous Improvement",
    description:
      "We don't ship and forget. We iterate, listen to users, refine our products, and consistently raise the standard of what we deliver.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "bg-teal-50 text-teal-600 border-teal-100",
    dot: "bg-teal-400",
  },
];

const whatWeBuild = [
  {
    id: "android-apps",
    title: "Android Applications",
    description:
      "Native Android apps crafted for real-world use — from consumer utilities to enterprise tools. We prioritize performance, intuitive UX, and Play Store compliance from day one.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden="true">
        <path d="M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2z"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M9 6h6M9 9h6M9 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    accent: "from-blue-500 to-blue-700",
    light: "bg-blue-50 text-blue-700",
  },
  {
    id: "ai-utilities",
    title: "AI-Based Utilities",
    description:
      "Practical AI tools that solve everyday problems — intelligent automation, smart data processing, NLP-powered features, and decision-support systems built responsibly.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: "from-emerald-500 to-teal-600",
    light: "bg-emerald-50 text-emerald-700",
  },
  {
    id: "business-software",
    title: "Business Management Software",
    description:
      "Custom-built platforms for inventory, billing, CRM, field operations, and internal workflows — designed to match how your organization actually works.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 8l3 3 2-2 3 3 2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: "from-orange-500 to-amber-600",
    light: "bg-orange-50 text-orange-700",
  },
  {
    id: "productivity-tools",
    title: "Productivity Tools",
    description:
      "Focused utilities and tools that help individuals and teams work smarter — calculators, trackers, dashboards, and purpose-built micro-apps.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: "from-pink-500 to-rose-600",
    light: "bg-pink-50 text-pink-700",
  },
  {
    id: "web-apps",
    title: "Custom Web Applications",
    description:
      "Modern, performant web applications built with Next.js, React, and cloud-native backends — designed for speed, scalability, and excellent SEO.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    accent: "from-indigo-500 to-purple-600",
    light: "bg-indigo-50 text-indigo-700",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <PageHero
          badge="About Anuj Digital Labs"
          title="We Build Software That"
          highlight="Matters"
          description="A software development organization dedicated to creating thoughtful, reliable digital products for real people and real businesses."
          breadcrumb={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        />

        {/* Company Introduction */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" aria-labelledby="intro-heading">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold mb-6">
                  Who We Are
                </div>
                <h2 id="intro-heading" className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
                  A Team Focused on{" "}
                  <span className="gradient-text">Quality Software</span>
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    Anuj Digital Labs is a software development organization
                    focused on creating high-quality Android applications, web
                    platforms, AI-powered tools, and productivity solutions.
                  </p>
                  <p>
                    We specialize in building digital products that solve genuine
                    problems — applications that are fast, reliable, secure, and
                    genuinely useful. Whether it&apos;s a business management
                    system for a growing organization or a productivity tool for
                    everyday users, we approach every project with the same
                    commitment to quality and craft.
                  </p>
                  <p>
                    We work across the full software development lifecycle — from
                    product ideation and UI/UX design, through engineering and
                    testing, to deployment and long-term maintenance.
                  </p>
                </div>
              </div>

              {/* Right: Attribute cards */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "📱", label: "Android Apps", desc: "Native, performant, Play Store ready" },
                  { icon: "🌐", label: "Web Platforms", desc: "Modern, fast, SEO-optimized" },
                  { icon: "🤖", label: "AI Tools", desc: "Practical, responsible, useful" },
                  { icon: "🏢", label: "Business Software", desc: "Custom-fit for your operations" },
                ].map(({ icon, label, desc }) => (
                  <div key={label} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-blue-200 hover:bg-blue-50/30 transition-colors duration-200">
                    <span className="text-3xl mb-3 block" aria-hidden="true">{icon}</span>
                    <p className="font-semibold text-slate-900 text-sm mb-1">{label}</p>
                    <p className="text-slate-500 text-xs">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50" aria-labelledby="mission-vision-heading">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <h2 id="mission-vision-heading" className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Mission &amp; Vision
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mission */}
              <div id="about-mission" className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 rounded-3xl p-8 lg:p-10 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-400/10 rounded-full -translate-y-20 translate-x-20 blur-2xl pointer-events-none" aria-hidden="true" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mb-6">
                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-emerald-400" aria-hidden="true">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-300 text-xs font-semibold mb-4 uppercase tracking-wider">
                    Our Mission
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 leading-snug">
                    Build Reliable, Innovative Digital Products
                  </h3>
                  <p className="text-blue-100/80 leading-relaxed">
                    Our mission is to build reliable, secure, user-friendly, and
                    innovative digital products that solve real-world problems.
                    We measure our success not just by the software we ship, but
                    by the genuine value it delivers to the people who use it.
                  </p>
                </div>
              </div>

              {/* Vision */}
              <div id="about-vision" className="relative bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 shadow-sm overflow-hidden">
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-50 rounded-full translate-y-20 translate-x-20 pointer-events-none" aria-hidden="true" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6">
                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-blue-700" aria-hidden="true">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold mb-4 uppercase tracking-wider">
                    Our Vision
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-snug">
                    Empower Everyone Through Modern Technology
                  </h3>
                  <p className="text-slate-500 leading-relaxed">
                    Our long-term vision is to empower individuals and businesses
                    through modern technology and intelligent software solutions.
                    We envision a world where powerful digital tools are accessible
                    to organizations of every size — enabling them to operate
                    efficiently, make informed decisions, and grow sustainably.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" aria-labelledby="values-heading">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-semibold mb-4">
                What Guides Us
              </div>
              <h2 id="values-heading" className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
                Our Core Values
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto text-lg leading-relaxed">
                These principles shape every decision we make — from how we write
                code to how we communicate with the people we work with.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreValues.map((value) => (
                <article
                  key={value.id}
                  id={`value-${value.id}`}
                  className="group bg-white rounded-2xl p-7 border border-slate-200 hover:border-transparent hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 ${value.color} group-hover:scale-110 transition-transform duration-300`}>
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* What We Build */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50" aria-labelledby="builds-heading">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold mb-4">
                Our Products &amp; Services
              </div>
              <h2 id="builds-heading" className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
                What We Build
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto text-lg leading-relaxed">
                We specialize in five areas of software development, each
                approached with the same commitment to quality and craft.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whatWeBuild.map((item, i) => (
                <div
                  key={item.id}
                  id={`build-${item.id}`}
                  className="group bg-white rounded-2xl p-7 border border-slate-200 hover:border-transparent hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} aria-hidden="true" />
                  <div className={`w-14 h-14 rounded-xl ${item.light} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-800 transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    #{String(i + 1).padStart(2, "0")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Strip */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white" aria-label="Call to action">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Interested in Working Together?
            </h2>
            <p className="text-slate-500 mb-8 text-lg">
              We&apos;d love to hear about your project. Reach out via our contact
              page and let&apos;s start a conversation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/contact"
                id="about-cta-contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-800 hover:bg-blue-700 text-white font-semibold transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 group"
              >
                Get in Touch
                <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="/"
                id="about-cta-home"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-slate-300 text-slate-600 font-semibold hover:border-blue-300 hover:text-blue-700 transition-all duration-200"
              >
                Back to Home
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
