import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "App Support | Anuj Digital Labs",
  description:
    "Get support for Anuj Digital Labs applications. Report bugs, request features, ask technical questions, or submit general inquiries through our official support channel.",
  openGraph: {
    title: "App Support | Anuj Digital Labs",
    description:
      "Contact Anuj Digital Labs for technical support, bug reports, feature requests, and general inquiries about our apps and services.",
    url: "https://anujdigitallabs.com/support",
    siteName: "Anuj Digital Labs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "App Support | Anuj Digital Labs",
    description:
      "Contact us for technical issues, bug reports, feature requests, or general inquiries.",
  },
};

const supportTopics = [
  {
    id: "support-technical",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Technical Issues",
    description:
      "Experiencing a crash, unexpected behavior, or a feature not working as intended? Share the details — app name, device model, Android/OS version, and a description of the issue — so we can investigate promptly.",
    color: "bg-blue-50 text-blue-700 border-blue-100",
    gradient: "from-blue-500 to-blue-700",
  },
  {
    id: "support-bugs",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M12 2a4 4 0 00-4 4v2H6a2 2 0 00-2 2v2c0 1.1.9 2 2 2h.2l.8 6a2 2 0 002 2h6a2 2 0 002-2l.8-6H18a2 2 0 002-2v-2a2 2 0 00-2-2h-2V6a4 4 0 00-4-4z"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 8H5M19 8h-3M8 16H5M19 16h-3"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: "Bug Reports",
    description:
      "Found a reproducible bug? We appreciate detailed bug reports. Include steps to reproduce, expected vs actual behavior, and your device/app version. Clear reports help us fix issues faster.",
    color: "bg-red-50 text-red-700 border-red-100",
    gradient: "from-red-500 to-rose-600",
  },
  {
    id: "support-features",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Feature Requests",
    description:
      "Have an idea that would make one of our apps more useful? We genuinely consider user feedback when planning improvements. Describe the feature, why it would be useful, and how you envision it working.",
    color: "bg-amber-50 text-amber-700 border-amber-100",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: "support-account",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Account-Related Questions",
    description:
      "Questions about your account, data associated with an app, or requests to delete your data? We&apos;ll guide you through the process. You can also visit our Data Deletion Request page for specific deletion requests.",
    color: "bg-violet-50 text-violet-700 border-violet-100",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    id: "support-general",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "General Inquiries",
    description:
      "Questions about our products, services, or organization that don&apos;t fit the above categories? Feel free to reach out. We&apos;re happy to answer any reasonable inquiry.",
    color: "bg-teal-50 text-teal-700 border-teal-100",
    gradient: "from-teal-500 to-emerald-500",
  },
];

const helpfulTips = [
  {
    tip: "Include the exact app name and version number from the app&apos;s settings or Play Store listing.",
  },
  {
    tip: "Mention your device model and Android/OS version (found in device Settings → About Phone).",
  },
  {
    tip: "Describe step-by-step what you did before the issue occurred.",
  },
  {
    tip: "Include any error messages exactly as they appear on screen.",
  },
  {
    tip: "If reporting a bug, let us know whether it happens every time or intermittently.",
  },
];

export default function SupportPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          badge="App Support"
          title="How Can We"
          highlight="Help You?"
          description="Whether you&apos;re facing a technical issue, want to report a bug, or have a question — we&apos;re here to help."
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Support" }]}
        />

        {/* Support Topics Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" aria-labelledby="support-topics-heading">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold mb-4">
                Support Areas
              </div>
              <h2 id="support-topics-heading" className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
                We Can Help With
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto text-lg leading-relaxed">
                Reach out for any of the following — we respond to all inquiries
                submitted through our official support email.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {supportTopics.map((topic) => (
                <article
                  key={topic.id}
                  id={topic.id}
                  className="group bg-white rounded-2xl p-7 border border-slate-200 hover:border-transparent hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${topic.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} aria-hidden="true" />
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 ${topic.color} group-hover:scale-105 transition-transform duration-300`}>
                    {topic.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-800 transition-colors duration-200">
                    {topic.title}
                  </h3>
                  <p
                    className="text-slate-500 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: topic.description }}
                  />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How to Contact Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50" aria-labelledby="contact-support-heading">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left: contact method */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-semibold mb-6">
                  How to Reach Us
                </div>
                <h2 id="contact-support-heading" className="text-3xl font-bold text-slate-900 mb-5 tracking-tight">
                  Submit Your Support Request
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  All support requests should be sent to our official support
                  email address. Please include as much detail as possible about
                  your issue or question so we can assist you effectively.
                </p>

                {/* Email card */}
                <a
                  href="mailto:contact@anujdigitallabs.com"
                  id="support-email-link"
                  className="group flex items-center gap-4 bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-md transition-all duration-200 mb-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-800 text-white flex items-center justify-center flex-shrink-0 group-hover:bg-blue-700 transition-colors">
                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Support Email</p>
                    <p className="text-blue-800 font-semibold text-sm group-hover:text-blue-600 transition-colors">
                      contact@anujdigitallabs.com
                    </p>
                    <p className="text-slate-400 text-xs mt-0.5">Click to open your email client</p>
                  </div>
                  <svg className="w-4 h-4 text-slate-300 group-hover:text-blue-500 ml-auto transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                {/* Response expectations */}
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-blue-800 font-semibold text-sm mb-1">Response Expectations</p>
                      <p className="text-blue-700/70 text-sm leading-relaxed">
                        We aim to respond to all support inquiries within a
                        reasonable timeframe, typically within a few business
                        days. Response times may vary depending on inquiry
                        volume and complexity. We do not guarantee same-day
                        responses.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/contact"
                    id="support-to-contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-blue-800 hover:bg-blue-700 text-white font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Go to Contact Page
                  </Link>
                  <Link
                    href="/data-deletion"
                    id="support-to-data-deletion"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-slate-300 text-slate-600 font-semibold text-sm hover:border-blue-300 hover:text-blue-700 transition-all duration-200"
                  >
                    Data Deletion Request
                  </Link>
                </div>
              </div>

              {/* Right: helpful tips */}
              <div>
                <div className="bg-white border border-slate-200 rounded-2xl p-7">
                  <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-emerald-600" aria-hidden="true">
                      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Tips for a Faster Resolution
                  </h3>
                  <ol className="space-y-4">
                    {helpfulTips.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <p
                          className="text-slate-600 text-sm leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: item.tip }}
                        />
                      </li>
                    ))}
                  </ol>

                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <p className="text-xs text-slate-400 leading-relaxed">
                      For app-specific issues, checking the app&apos;s Play Store
                      listing for any known issues or recent update notes may
                      also be helpful before contacting support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100" aria-label="Related pages">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-slate-500 text-sm mb-5 font-medium uppercase tracking-wide">Related Pages</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { href: "/privacy-policy", label: "Privacy Policy" },
                { href: "/terms-of-service", label: "Terms of Service" },
                { href: "/data-deletion", label: "Data Deletion Request" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 text-sm font-medium hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
