import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Anuj Digital Labs",
  description:
    "Get in touch with Anuj Digital Labs for Android app development, web projects, AI tools, or business software inquiries. We welcome partnerships, project discussions, and support requests.",
  openGraph: {
    title: "Contact Us | Anuj Digital Labs",
    description:
      "Reach out to Anuj Digital Labs for project inquiries, partnerships, or support. We'd love to hear from you.",
    url: "https://anujdigitallabs.com/contact",
    siteName: "Anuj Digital Labs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Anuj Digital Labs",
    description:
      "Reach out to Anuj Digital Labs for Android apps, web projects, AI tools, or business software inquiries.",
  },
};

const contactInfo = [
  {
    id: "contact-email-info",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Business Email",
    value: "anujvibedeveloper@gmail.com",
    href: "mailto:anujvibedeveloper@gmail.com",
    description: "For project inquiries and business discussions",
  },
  {
    id: "contact-website-info",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    label: "Official Website",
    value: "anujdigitallabs.com",
    href: "https://anujdigitallabs.com",
    description: "Visit our official web presence",
  },
  {
    id: "contact-location-info",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    label: "Region",
    value: "India",
    href: null,
    description: "Operating remotely across projects",
  },
];

const inquiryTypes = [
  {
    id: "inquiry-project",
    icon: "💡",
    title: "New Project",
    desc: "Have a product idea or a development requirement? We'd love to explore it with you.",
  },
  {
    id: "inquiry-partnership",
    icon: "🤝",
    title: "Partnership",
    desc: "Looking to collaborate, integrate, or explore a mutual business opportunity.",
  },
  {
    id: "inquiry-support",
    icon: "🔧",
    title: "Support",
    desc: "Questions or issues with an existing project or product we've built.",
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <PageHero
          badge="Get in Touch"
          title="Let's Build Something"
          highlight="Together"
          description="Whether you have a project in mind, a business question, or just want to explore possibilities — we're ready to listen."
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        />

        {/* Main Content */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" aria-labelledby="contact-main-heading">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

              {/* Left: Info Panel (2/5) */}
              <aside className="lg:col-span-2 space-y-8">
                {/* Intro note */}
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl mt-0.5" aria-hidden="true">📬</span>
                    <div>
                      <h2 id="contact-main-heading" className="text-base font-bold text-blue-900 mb-2">
                        We Welcome Your Inquiry
                      </h2>
                      <p className="text-blue-700/80 text-sm leading-relaxed">
                        Anuj Digital Labs is open to business inquiries,
                        partnership proposals, and support requests. Use the form
                        or reach out directly via email — we aim to respond
                        within one business day.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Details */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                    Contact Details
                  </h3>
                  <div className="space-y-4">
                    {contactInfo.map(({ id, icon, label, value, href, description }) => (
                      <div key={id} id={id} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0">
                          {icon}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-0.5">
                            {label}
                          </p>
                          {href ? (
                            <a
                              href={href}
                              target={href.startsWith("http") ? "_blank" : undefined}
                              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                              className="text-slate-900 font-medium text-sm hover:text-blue-700 transition-colors duration-200"
                            >
                              {value}
                            </a>
                          ) : (
                            <p className="text-slate-900 font-medium text-sm">{value}</p>
                          )}
                          <p className="text-slate-400 text-xs mt-0.5">{description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inquiry types */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                    Types of Inquiries
                  </h3>
                  <div className="space-y-3">
                    {inquiryTypes.map(({ id, icon, title, desc }) => (
                      <div key={id} id={id} className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-100 rounded-xl">
                        <span className="text-xl flex-shrink-0 mt-0.5" aria-hidden="true">{icon}</span>
                        <div>
                          <p className="text-slate-900 font-semibold text-sm">{title}</p>
                          <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Response time note */}
                <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" aria-hidden="true" />
                  <p className="text-emerald-700 text-xs font-medium">
                    We typically respond within 1 business day.
                  </p>
                </div>
              </aside>

              {/* Right: Form (3/5) */}
              <div className="lg:col-span-3">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Also find us section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50" aria-labelledby="find-us-heading">
          <div className="max-w-3xl mx-auto text-center">
            <h2 id="find-us-heading" className="text-2xl font-bold text-slate-900 mb-3">
              Also Find Us Online
            </h2>
            <p className="text-slate-500 mb-8">
              Connect with Anuj Digital Labs on professional platforms and follow our work.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {[
                {
                  id: "contact-social-github",
                  label: "GitHub",
                  href: "https://github.com/anujdigitallabs",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  ),
                  bg: "bg-slate-800 hover:bg-slate-700",
                },
                {
                  id: "contact-social-linkedin",
                  label: "LinkedIn",
                  href: "https://linkedin.com/company/anujdigitallabs",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                  bg: "bg-blue-700 hover:bg-blue-600",
                },
                {
                  id: "contact-social-twitter",
                  label: "Twitter / X",
                  href: "https://twitter.com/anujdigitallabs",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                  bg: "bg-black hover:bg-slate-800",
                },
              ].map(({ id, label, href, icon, bg }) => (
                <a
                  key={id}
                  id={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Anuj Digital Labs on ${label}`}
                  className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-full ${bg} text-white text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-md`}
                >
                  {icon}
                  {label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
