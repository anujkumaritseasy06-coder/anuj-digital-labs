import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface LegalPageLayoutProps {
  badge: string;
  title: string;
  highlight: string;
  description: string;
  breadcrumbLabel: string;
  effectiveDate: string;
  lastUpdated: string;
  sections: Section[];
  contactEmail?: string;
  contactNote?: string;
}

export default function LegalPageLayout({
  badge,
  title,
  highlight,
  description,
  breadcrumbLabel,
  effectiveDate,
  lastUpdated,
  sections,
  contactEmail = "anujvibedeveloper@gmail.com",
  contactNote,
}: LegalPageLayoutProps) {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          badge={badge}
          title={title}
          highlight={highlight}
          description={description}
          breadcrumb={[{ label: "Home", href: "/" }, { label: breadcrumbLabel }]}
        />

        <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12">

              {/* Sidebar TOC */}
              <aside className="lg:w-64 flex-shrink-0">
                <div className="lg:sticky lg:top-28">
                  {/* Meta info */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6">
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Effective Date</p>
                        <p className="text-sm text-slate-700 font-medium">{effectiveDate}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Last Updated</p>
                        <p className="text-sm text-slate-700 font-medium">{lastUpdated}</p>
                      </div>
                    </div>
                  </div>

                  {/* Table of contents */}
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                    <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-3">On This Page</p>
                    <nav aria-label="Table of contents">
                      <ol className="space-y-2">
                        {sections.map((section, i) => (
                          <li key={section.id}>
                            <a
                              href={`#${section.id}`}
                              className="flex items-start gap-2 text-sm text-blue-700/70 hover:text-blue-800 transition-colors duration-150 group"
                            >
                              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-semibold mt-0.5 group-hover:bg-blue-200 transition-colors">
                                {i + 1}
                              </span>
                              <span className="leading-tight">{section.title}</span>
                            </a>
                          </li>
                        ))}
                      </ol>
                    </nav>
                  </div>

                  {/* Contact shortcut */}
                  <div className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
                    <p className="text-xs font-semibold text-emerald-700 mb-2">Questions?</p>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="text-sm text-emerald-700 hover:text-emerald-600 underline underline-offset-2 break-all"
                    >
                      {contactEmail}
                    </a>
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <article className="flex-1 min-w-0 prose-slate max-w-none">
                <div className="space-y-12">
                  {sections.map((section, i) => (
                    <section
                      key={section.id}
                      id={section.id}
                      aria-labelledby={`heading-${section.id}`}
                      className="scroll-mt-28"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="w-8 h-8 rounded-lg bg-blue-800 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                          {i + 1}
                        </span>
                        <h2
                          id={`heading-${section.id}`}
                          className="text-xl sm:text-2xl font-bold text-slate-900"
                        >
                          {section.title}
                        </h2>
                      </div>
                      <div className="pl-11 text-slate-600 leading-relaxed space-y-4">
                        {section.content}
                      </div>
                    </section>
                  ))}
                </div>

                {/* Bottom contact note */}
                {contactNote && (
                  <div className="mt-16 p-6 bg-slate-50 border border-slate-200 rounded-2xl">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
                        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
                          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-slate-700 font-semibold mb-1">Contact Us</p>
                        <p className="text-slate-500 text-sm leading-relaxed mb-2">{contactNote}</p>
                        <a
                          href={`mailto:${contactEmail}`}
                          className="text-blue-700 font-medium text-sm hover:text-blue-600 transition-colors"
                        >
                          {contactEmail}
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Back links */}
                <div className="mt-10 pt-8 border-t border-slate-200 flex flex-wrap gap-4">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Home
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-700 transition-colors"
                  >
                    Contact Us
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
