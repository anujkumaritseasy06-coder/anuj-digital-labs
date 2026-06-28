import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Data Deletion Request | Anuj Digital Labs",
  description:
    "Request deletion of your personal data or account associated with Anuj Digital Labs applications. Learn how to submit a data deletion request through our official support channel.",
  openGraph: {
    title: "Data Deletion Request | Anuj Digital Labs",
    description:
      "Learn how to request deletion of your account or personal data from Anuj Digital Labs applications and services.",
    url: "https://anujdigitallabs.com/data-deletion",
    siteName: "Anuj Digital Labs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Deletion Request | Anuj Digital Labs",
    description:
      "Submit a request to delete your account or personal data from Anuj Digital Labs apps.",
  },
};

const steps = [
  {
    id: "step-identify",
    number: "01",
    title: "Identify the App",
    description:
      "Note the exact name of the Anuj Digital Labs application from which you want your data deleted. You can find this in your Google Play Library or in the app's About section.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "step-email",
    number: "02",
    title: "Send Your Request",
    description:
      "Email us at anujvibedeveloper@gmail.com with the subject line \"Data Deletion Request\". Include the app name, the email address or account identifier associated with your data, and a brief description of your request.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "step-verify",
    number: "03",
    title: "Verification",
    description:
      "We may ask you to confirm your identity or account details before processing the request. This step is necessary to ensure we are deleting the correct account and to prevent unauthorized deletion requests.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M9 12l2 2 4-4M21 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s9 4.477 9 10z"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "step-process",
    number: "04",
    title: "Processing",
    description:
      "Once verified, we will process your deletion request in accordance with applicable data protection laws and our internal policies. We will confirm once the deletion is complete.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const whatGetsDeleted = [
  {
    label: "Account data",
    detail: "Username, email, and profile information stored by the application.",
  },
  {
    label: "User-generated content",
    detail: "Any data, records, or content you created within the app (where applicable).",
  },
  {
    label: "Usage data",
    detail: "Analytics and behavioral data linked to your account identifier, where technically feasible.",
  },
  {
    label: "Preferences and settings",
    detail: "Any stored preferences or configurations tied to your account.",
  },
];

const whatMayBeRetained = [
  {
    label: "Legally required records",
    detail: "Information we are required by law to retain, such as transactional records or compliance logs.",
  },
  {
    label: "Anonymized aggregated data",
    detail: "Statistical or aggregated data that cannot reasonably be linked back to you.",
  },
  {
    label: "Backup copies",
    detail: "Copies in backup systems may persist for a limited period before being overwritten during routine backup cycles.",
  },
];

export default function DataDeletionPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          badge="Data Privacy"
          title="Data Deletion"
          highlight="Request"
          description="You have the right to request deletion of your personal data and account from our applications. Here's how to submit that request."
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Data Deletion Request" }]}
        />

        {/* Overview */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" aria-labelledby="deletion-overview-heading">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Left */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold mb-6">
                  Your Right to Deletion
                </div>
                <h2 id="deletion-overview-heading" className="text-3xl sm:text-4xl font-bold text-slate-900 mb-5 tracking-tight leading-tight">
                  We Respect Your Right to{" "}
                  <span className="gradient-text">Data Privacy</span>
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    If you have used an Anuj Digital Labs application and wish
                    to have your account or personal data deleted, you can
                    submit a request through our official support email address.
                  </p>
                  <p>
                    We process all deletion requests in accordance with
                    applicable data protection laws, including the Information
                    Technology Act of India and, where applicable, international
                    regulations such as the GDPR.
                  </p>
                  <p>
                    There is no automated self-service deletion system at this
                    time. All requests are handled manually to ensure accuracy
                    and to verify the identity of the requester.
                  </p>
                </div>

                {/* Important note */}
                <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5">
                  <div className="flex items-start gap-3">
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true">
                      <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div>
                      <p className="text-amber-800 font-semibold text-sm mb-1">Please Note</p>
                      <p className="text-amber-700/80 text-sm leading-relaxed">
                        Data deletion is <strong>irreversible</strong>. Once your
                        data has been deleted, it cannot be recovered. Please
                        ensure you have exported any data you may need before
                        submitting a deletion request (where the app provides an
                        export feature).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Contact card */}
              <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-400/10 rounded-full -translate-y-20 translate-x-20 blur-2xl pointer-events-none" aria-hidden="true" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-5">
                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-emerald-400" aria-hidden="true">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-blue-200/60 text-xs font-semibold uppercase tracking-widest mb-2">Submit Your Request To</p>
                  <p className="text-2xl font-bold text-white mb-1">Support Email</p>
                  <a
                    href="mailto:anujvibedeveloper@gmail.com?subject=Data%20Deletion%20Request"
                    id="data-deletion-email"
                    className="text-emerald-400 hover:text-emerald-300 font-semibold text-lg transition-colors break-all"
                  >
                    anujvibedeveloper@gmail.com
                  </a>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-white/60 text-xs mb-3 uppercase tracking-wider font-semibold">Email Subject Line</p>
                    <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 font-mono text-sm text-white">
                      Data Deletion Request
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    <p className="text-white/60 text-xs uppercase tracking-wider font-semibold">Include in Your Email</p>
                    {[
                      "App name (exact name from Play Store)",
                      "Account identifier (email or username)",
                      "Type of data to delete",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2 text-sm text-blue-100/80">
                        <svg className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                        </svg>
                        {item}
                      </div>
                    ))}
                  </div>

                  <a
                    href="mailto:anujvibedeveloper@gmail.com?subject=Data%20Deletion%20Request"
                    className="mt-6 block text-center py-3 px-6 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm transition-all duration-200 shadow-lg hover:-translate-y-0.5"
                  >
                    Send Deletion Request
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50" aria-labelledby="deletion-steps-heading">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 id="deletion-steps-heading" className="text-3xl font-bold text-slate-900 tracking-tight mb-4">
                How the Process Works
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">
                Here&apos;s a step-by-step overview of what happens after you
                submit a data deletion request.
              </p>
            </div>

            <ol className="relative" aria-label="Deletion process steps">
              {/* Vertical connector line */}
              <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-blue-800 via-blue-300 to-transparent hidden sm:block" aria-hidden="true" />

              <div className="space-y-8">
                {steps.map((step) => (
                  <li key={step.id} id={step.id} className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-800 text-white flex items-center justify-center flex-shrink-0 shadow-md z-10">
                      {step.icon}
                    </div>
                    <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">
                          Step {step.number}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </li>
                ))}
              </div>
            </ol>
          </div>
        </section>

        {/* What Gets Deleted vs Retained */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" aria-labelledby="deletion-scope-heading">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 id="deletion-scope-heading" className="text-3xl font-bold text-slate-900 tracking-tight mb-4">
                Scope of Deletion
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">
                Understanding what data may be deleted and what may be retained
                for legal or technical reasons.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* What gets deleted */}
              <div className="bg-white border border-emerald-200 rounded-2xl p-7 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
                      <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">What May Be Deleted</h3>
                </div>
                <div className="space-y-4">
                  {whatGetsDeleted.map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <p className="text-slate-800 font-semibold text-sm">{item.label}</p>
                        <p className="text-slate-500 text-xs mt-0.5">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What may be retained */}
              <div className="bg-white border border-amber-200 rounded-2xl p-7 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
                      <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">What May Be Retained</h3>
                </div>
                <div className="space-y-4">
                  {whatMayBeRetained.map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={1.8} />
                      </svg>
                      <div>
                        <p className="text-slate-800 font-semibold text-sm">{item.label}</p>
                        <p className="text-slate-500 text-xs mt-0.5">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-xs text-slate-400 leading-relaxed border-t border-slate-100 pt-4">
                  Retained data will not be used for any purpose beyond legal
                  compliance and will be deleted as soon as retention is no
                  longer required.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-100" aria-label="Related pages">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-slate-500 text-sm mb-5 font-medium uppercase tracking-wide">
              Related
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { href: "/privacy-policy", label: "Privacy Policy" },
                { href: "/terms-of-service", label: "Terms of Service" },
                { href: "/support", label: "App Support" },
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
