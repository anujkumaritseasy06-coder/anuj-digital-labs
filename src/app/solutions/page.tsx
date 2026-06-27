import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import TrustSignals from "@/components/TrustSignals";

export const metadata: Metadata = {
  title: "Solutions | Anuj Digital Labs",
  description:
    "Explore the service areas offered by Anuj Digital Labs — Android app development, web development, AI-powered utilities, business productivity software, and digital automation tools.",
  openGraph: {
    title: "Solutions | Anuj Digital Labs",
    description:
      "Android development, web platforms, AI tools, and business software — service areas offered by Anuj Digital Labs.",
    url: "https://anujdigitallabs.com/solutions",
    siteName: "Anuj Digital Labs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solutions | Anuj Digital Labs",
    description:
      "Android development, web platforms, AI tools, and business software by Anuj Digital Labs.",
  },
};

const serviceAreas = [
  {
    id: "android-development",
    title: "Android App Development",
    description:
      "We build native Android applications designed for real-world use — responsive, stable, and built to Google Play standards. From simple utility apps to multi-feature platforms, we focus on apps that work reliably on the wide range of devices Android users carry.",
    features: [
      "Native Android development (Kotlin / Java)",
      "Material Design 3 UI implementation",
      "Offline-capable and battery-efficient apps",
      "Google Play Store submission and compliance",
      "Long-term maintenance and update support",
    ],
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.523 15.341c-.347 0-.628-.281-.628-.628s.281-.628.628-.628.628.281.628.628-.281.628-.628.628m-11.046 0c-.347 0-.628-.281-.628-.628s.281-.628.628-.628.628.281.628.628-.281.628-.628.628M17.67 10.062l1.734-3.003a.36.36 0 00-.131-.492.36.36 0 00-.492.131L17.04 9.725A11.063 11.063 0 0012 8.547c-1.791 0-3.473.425-4.941 1.177L5.22 6.698a.36.36 0 00-.492-.131.36.36 0 00-.131.492l1.734 3.003C3.972 11.549 2.304 13.875 2 16.6h20c-.304-2.725-1.972-5.051-4.33-6.538" />
      </svg>
    ),
    accent: "#10b981",
    accentLight: "rgba(16,185,129,0.12)",
    border: "rgba(16,185,129,0.2)",
    number: "01",
  },
  {
    id: "web-development",
    title: "Web Development",
    description:
      "We develop modern web applications and websites using current technologies and best practices. Whether you need a marketing site, a web application, or a customer-facing portal, we build experiences that are fast, accessible, and maintainable.",
    features: [
      "Responsive, mobile-first design",
      "Modern frameworks (Next.js, React)",
      "SEO and Core Web Vitals optimization",
      "API integrations and backend services",
      "Hosting setup and ongoing maintenance",
    ],
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
    accent: "#3b82f6",
    accentLight: "rgba(59,130,246,0.12)",
    border: "rgba(59,130,246,0.2)",
    number: "02",
  },
  {
    id: "ai-powered-utilities",
    title: "AI-Powered Utilities",
    description:
      "We build practical tools that apply AI and machine learning in straightforward, useful ways — automating repetitive tasks, surfacing useful insights, and making software smarter without unnecessary complexity.",
    features: [
      "Natural language processing integrations",
      "Intelligent automation workflows",
      "Data analysis and summarization tools",
      "AI-assisted content and document processing",
      "Responsible AI with privacy-conscious design",
    ],
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    accent: "#a78bfa",
    accentLight: "rgba(167,139,250,0.12)",
    border: "rgba(167,139,250,0.2)",
    number: "03",
  },
  {
    id: "business-productivity-software",
    title: "Business Productivity Software",
    description:
      "We develop custom software that helps organizations work more efficiently — tools for task management, reporting, workflow coordination, and internal operations. Built to fit actual workflows rather than forcing teams to adapt to generic solutions.",
    features: [
      "Custom workflow and task management tools",
      "Internal dashboards and reporting systems",
      "Team collaboration features",
      "Role-based access and user management",
      "Data export and integration capabilities",
    ],
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
      </svg>
    ),
    accent: "#06b6d4",
    accentLight: "rgba(6,182,212,0.12)",
    border: "rgba(6,182,212,0.2)",
    number: "04",
  },
  {
    id: "digital-automation-tools",
    title: "Digital Automation Tools",
    description:
      "We build tools that automate repetitive digital tasks — reducing manual effort and helping teams focus on work that matters. From scheduled jobs and data pipelines to notification systems and integrations, we approach automation pragmatically.",
    features: [
      "Scheduled task and job automation",
      "Third-party API and webhook integrations",
      "Data processing and transformation pipelines",
      "Automated reporting and notification systems",
      "Custom scripting and workflow orchestration",
    ],
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    accent: "#f59e0b",
    accentLight: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.2)",
    number: "05",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          badge="What We Do"
          title="Our"
          highlight="Solutions"
          description="Service areas where we build practical, reliable software. Each area reflects a focused set of capabilities developed through real project work."
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Solutions" },
          ]}
        />

        {/* Services grid */}
        <section
          aria-label="Service areas"
          className="py-20 px-4 sm:px-6 lg:px-8"
          style={{ background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 60%, #ffffff 100%)" }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="space-y-8">
              {serviceAreas.map((service, idx) => (
                <article
                  key={service.id}
                  id={service.id}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 group`}
                  style={{
                    background: service.accentLight,
                    borderColor: service.border,
                    boxShadow: `0 2px 16px rgba(0,0,0,0.04)`,
                  }}
                >
                  {/* Number + icon */}
                  <div className="lg:col-span-1 flex items-center gap-3 lg:flex-col lg:items-start lg:gap-2">
                    <span
                      className="text-[11px] font-black tracking-widest"
                      style={{ color: service.accent }}
                    >
                      {service.number}
                    </span>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${service.accent}18`,
                        border: `1px solid ${service.border}`,
                        color: service.accent,
                      }}
                    >
                      {service.icon}
                    </div>
                  </div>

                  {/* Title + description */}
                  <div className="lg:col-span-6">
                    <h2 className="text-xl font-bold text-slate-800 mb-3">{service.title}</h2>
                    <p className="text-slate-600 text-[15px] leading-relaxed">{service.description}</p>
                  </div>

                  {/* Features list */}
                  <div className="lg:col-span-5">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
                      What&apos;s included
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((f, fi) => (
                        <li key={fi} className="flex items-start gap-2 text-[14px] text-slate-600">
                          <svg
                            className="w-4 h-4 mt-0.5 flex-shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            style={{ color: service.accent }}
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Trust signals */}
        <div style={{ background: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #020617 100%)" }}>
          <TrustSignals />
        </div>

        {/* CTA strip */}
        <section
          aria-label="Call to action"
          className="py-16 px-4 sm:px-6 lg:px-8 text-center"
          style={{ background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}
        >
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-4">
              Have a project in mind?
            </h2>
            <p className="text-slate-500 text-[15px] leading-relaxed mb-8">
              Tell us what you&apos;re building and we&apos;ll discuss how we can help.
            </p>
            <Link
              href="/contact"
              id="solutions-cta"
              className="inline-flex items-center gap-2 text-sm font-bold px-7 py-3.5 rounded-xl text-white transition-all duration-300 hover:-translate-y-px"
              style={{
                background: "linear-gradient(135deg, #059669, #10b981)",
                boxShadow: "0 0 24px rgba(16,185,129,0.3)",
              }}
            >
              Get in Touch
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
