"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

/**
 * FAQ data — add new questions by appending to this array.
 * No page code changes required.
 */
const faqs = [
  {
    id: "what-does-adl-do",
    question: "What does Anuj Digital Labs do?",
    answer:
      "Anuj Digital Labs is a software development organization. We design and build digital products including Android applications, modern web platforms, AI-powered utilities, and custom business software. Our focus is on practical, reliable software that solves real problems.",
  },
  {
    id: "how-contact-support",
    question: "How can I contact support?",
    answer:
      "You can reach us through our Support page or by emailing anujvibedeveloper@gmail.com. For app-specific support, please include the app name and a description of the issue so we can assist you more quickly. We aim to respond to all inquiries within a reasonable timeframe.",
  },
  {
    id: "where-download-apps",
    question: "Where can I download your apps?",
    answer:
      "Our Android apps are distributed through the Google Play Store. You can find links to available apps on our Our Apps page. Apps that are still in development will show a 'Coming Soon' status and will be listed once they are published.",
  },
  {
    id: "how-report-bugs",
    question: "How do I report a bug or issue?",
    answer:
      "Bug reports can be submitted through our Support page or by emailing anujvibedeveloper@gmail.com. Please include: the app name and version, a description of what happened, the steps to reproduce the issue, and your device model and Android version if applicable. Detailed reports help us address issues faster.",
  },
  {
    id: "do-apps-receive-updates",
    question: "Do your applications receive updates?",
    answer:
      "Yes. Active maintenance and iterative improvement are core parts of how we operate. We release updates to fix bugs, improve performance, and add features based on user feedback. Update frequency varies by product. You can follow our Latest Updates page for release announcements.",
  },
  {
    id: "how-businesses-collaborate",
    question: "How can businesses collaborate with Anuj Digital Labs?",
    answer:
      "If you're interested in commissioning software, partnering on a product, or exploring a collaboration, please reach out through our Contact page. Describe your project or idea and we'll get back to you to discuss whether it's a good fit.",
  },
  {
    id: "what-platforms-supported",
    question: "What platforms do you develop for?",
    answer:
      "We currently develop for Android (native) and the web (browser-based applications and websites). Some products may be available on both platforms. Platform availability for each product is listed on the Our Apps page.",
  },
  {
    id: "is-data-secure",
    question: "How do you handle user data and privacy?",
    answer:
      "We take privacy seriously. Our applications are designed to collect only the data necessary for their function, store it securely, and handle it transparently. Each app has its own Privacy Policy which you can review before use. You can also visit our Privacy Policy page for our general data practices.",
  },
  {
    id: "free-or-paid",
    question: "Are your apps free or paid?",
    answer:
      "Pricing varies by product. Details about pricing, free tiers, or in-app purchases are available on each app's Play Store listing and on the Our Apps page. We aim to be transparent about what users get for free versus what requires payment.",
  },
];

/** Single accordion item */
function FaqItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      id={`faq-${faq.id}`}
      className="rounded-xl overflow-hidden transition-all duration-200"
      style={{
        border: isOpen ? "1px solid rgba(16,185,129,0.25)" : "1px solid #e2e8f0",
        background: isOpen ? "rgba(16,185,129,0.02)" : "#ffffff",
        boxShadow: isOpen ? "0 4px 20px rgba(16,185,129,0.06)" : "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      <button
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 rounded-xl"
      >
        <span
          className="text-[15px] font-semibold pr-4 transition-colors duration-200"
          style={{ color: isOpen ? "#059669" : "#1e293b" }}
        >
          {faq.question}
        </span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300"
          style={{
            background: isOpen ? "rgba(16,185,129,0.12)" : "#f1f5f9",
            color: isOpen ? "#10b981" : "#64748b",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
          aria-hidden="true"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v12M6 12h12" />
          </svg>
        </span>
      </button>

      <div
        id={`faq-answer-${faq.id}`}
        role="region"
        aria-label={faq.question}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? "400px" : "0px" }}
      >
        <p className="px-6 pb-5 text-slate-600 text-[14.5px] leading-relaxed">
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          badge="Help & Information"
          title="Frequently Asked"
          highlight="Questions"
          description="Answers to common questions about Anuj Digital Labs, our products, support, and how to work with us."
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "FAQ" },
          ]}
        />

        <section
          aria-label="Frequently asked questions"
          className="py-20 px-4 sm:px-6 lg:px-8"
          style={{ background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)" }}
        >
          <div className="max-w-3xl mx-auto">
            {/* Intro */}
            <p className="text-slate-500 text-[15px] text-center mb-10">
              Can&apos;t find what you&apos;re looking for? Visit our{" "}
              <Link href="/support" className="text-emerald-600 hover:text-emerald-700 font-medium underline underline-offset-2 transition-colors">
                Support page
              </Link>{" "}
              or{" "}
              <Link href="/contact" className="text-emerald-600 hover:text-emerald-700 font-medium underline underline-offset-2 transition-colors">
                contact us directly
              </Link>
              .
            </p>

            {/* Accordion */}
            <div className="space-y-3">
              {faqs.map((faq) => (
                <FaqItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openId === faq.id}
                  onToggle={() => toggle(faq.id)}
                />
              ))}
            </div>

            {/* Bottom CTA */}
            <div
              className="mt-14 rounded-2xl p-8 text-center"
              style={{
                background: "linear-gradient(135deg, rgba(16,185,129,0.06), rgba(59,130,246,0.06))",
                border: "1px solid rgba(16,185,129,0.15)",
              }}
            >
              <h2 className="text-xl font-bold text-slate-800 mb-2">Still have questions?</h2>
              <p className="text-slate-500 text-[14.5px] mb-6">
                We&apos;re happy to help. Reach out and we&apos;ll get back to you.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/contact"
                  id="faq-contact-cta"
                  className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-xl text-white transition-all duration-200 hover:-translate-y-px"
                  style={{
                    background: "linear-gradient(135deg, #059669, #10b981)",
                    boxShadow: "0 0 20px rgba(16,185,129,0.25)",
                  }}
                >
                  Contact Us
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/support"
                  id="faq-support-link"
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors"
                >
                  Visit Support
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
