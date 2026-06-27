import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import AppCard from '@/components/AppCard';
import { getPublishedApps } from '@/lib/db';
import type { PublicAppEntry } from '@/types/admin';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Our Apps | Anuj Digital Labs',
  description:
    'Explore software products built by Anuj Digital Labs — Android apps, web tools, and AI-powered utilities designed with usability and reliability in mind.',
  openGraph: {
    title: 'Our Apps | Anuj Digital Labs',
    description:
      'Browse Android apps, web tools, and utilities built by Anuj Digital Labs.',
    url: 'https://anujdigitallabs.com/apps',
    siteName: 'Anuj Digital Labs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Apps | Anuj Digital Labs',
    description:
      'Android apps, web tools, and AI-powered utilities by Anuj Digital Labs.',
  },
};

/** Empty state shown when no apps have been published */
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-32 px-4">
      <div
        className="w-24 h-24 rounded-3xl flex items-center justify-center mb-8 animate-pulse-glow"
        style={{
          background: 'rgba(16,185,129,0.08)',
          border: '1px solid rgba(16,185,129,0.18)',
        }}
        aria-hidden="true"
      >
        <svg className="w-12 h-12 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4}
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </div>

      <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
        Products Coming Soon
      </h2>
      <p className="text-slate-400 text-base max-w-lg leading-relaxed mb-10">
        We&apos;re currently developing our first set of products. Check back soon, or subscribe
        to our updates to be notified when something new launches.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <a
          href="/updates"
          id="empty-state-updates-link"
          className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-xl text-white transition-all duration-200 hover:-translate-y-px"
          style={{
            background: 'linear-gradient(135deg, #059669, #10b981)',
            boxShadow: '0 0 18px rgba(16,185,129,0.28)',
          }}
        >
          View Latest Updates
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
        <a
          href="/contact"
          id="empty-state-contact-link"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors duration-200"
        >
          Get in Touch
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function AppsPage() {
  const adminApps = getPublishedApps();

  // Map AdminApp → PublicAppEntry
  const apps: PublicAppEntry[] = adminApps.map((a) => ({
    id: a.id,
    slug: a.slug || a.id,
    name: a.name,
    shortDescription: a.shortDescription,
    fullDescription: a.fullDescription || '',
    tagline: a.tagline || '',
    category: a.category,
    platform: a.platform,
    version: a.version || '',
    keyFeatures: a.keyFeatures,
    benefits: a.benefits || [],
    howItWorks: a.howItWorks || [],
    status: a.releaseStatus,
    iconUrl: a.iconUrl || undefined,
    bannerUrl: a.bannerUrl || undefined,
    screenshots: a.screenshots || [],
    playStoreUrl: a.playStoreUrl || undefined,
    websiteUrl: a.websiteUrl || undefined,
    learnMoreHref: a.learnMoreHref || undefined,
    privacyPolicyUrl: a.privacyPolicyUrl || undefined,
    supportUrl: a.supportUrl || undefined,
    themeColor: a.themeColor || '#10b981',
    faqs: a.faqs || [],
    changelog: a.changelog || [],
    seoTitle: a.seoTitle || a.name,
    seoDescription: a.seoDescription || a.shortDescription,
    ogImageUrl: a.ogImageUrl || undefined,
    updatedAt: a.updatedAt,
    featured: a.featured || false,
  }));

  const featuredApps = apps.filter((a) => a.featured);
  const availableApps = apps.filter((a) => a.status === 'available' && !a.featured);
  const comingSoonApps = apps.filter((a) => a.status === 'coming-soon');

  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          badge="Software Products"
          title="Our"
          highlight="Apps"
          description="Software we've built — Android apps, web tools, and AI-powered utilities. Each product is designed with usability and reliability as core priorities."
          breadcrumb={[
            { label: 'Home', href: '/' },
            { label: 'Our Apps' },
          ]}
        />

        {/* Dark premium app showcase section */}
        <div
          className="min-h-[60vh] py-20 px-4 sm:px-6 lg:px-8"
          style={{
            background: 'linear-gradient(180deg, #020617 0%, #0a0f1e 40%, #0d1526 100%)',
          }}
        >
          {/* Subtle dot grid */}
          <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" aria-hidden="true" />

          <div className="max-w-7xl mx-auto relative">
            {apps.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-20">
                {/* Featured apps */}
                {featuredApps.length > 0 && (
                  <section aria-label="Featured apps">
                    <div className="flex items-center gap-3 mb-8">
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                        style={{
                          background: 'rgba(251,191,36,0.1)',
                          color: '#fbbf24',
                          border: '1px solid rgba(251,191,36,0.25)',
                        }}
                      >
                        ⭐ Featured
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {featuredApps.map((app, i) => (
                        <div
                          key={app.id}
                          className="animate-fade-in-scale"
                          style={{ animationDelay: `${i * 120}ms`, animationFillMode: 'forwards' }}
                        >
                          <AppCard app={app} index={i} />
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Available apps */}
                {availableApps.length > 0 && (
                  <section aria-label="Available apps">
                    <div className="flex items-center gap-3 mb-8">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
                      <h2 className="text-lg font-bold text-white tracking-tight">Available Now</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {availableApps.map((app, i) => (
                        <div
                          key={app.id}
                          className="animate-fade-in-scale"
                          style={{ animationDelay: `${i * 120}ms`, animationFillMode: 'forwards' }}
                        >
                          <AppCard app={app} index={i} />
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Coming soon apps */}
                {comingSoonApps.length > 0 && (
                  <section aria-label="Coming soon apps">
                    <div className="flex items-center gap-3 mb-8">
                      <span className="w-2 h-2 rounded-full bg-amber-400" aria-hidden="true" />
                      <h2 className="text-lg font-bold text-white tracking-tight">In Development</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {comingSoonApps.map((app, i) => (
                        <div
                          key={app.id}
                          className="animate-fade-in-scale"
                          style={{ animationDelay: `${i * 120}ms`, animationFillMode: 'forwards' }}
                        >
                          <AppCard app={app} index={i} />
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
