import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAppBySlug, getRelatedApps } from '@/lib/db';
import type { PublicAppEntry } from '@/types/admin';
import {
  AppDetailHero,
  AppScreenshots,
  AppFeatures,
  AppBenefits,
  AppHowItWorks,
  AppTechnology,
  AppFAQ,
  AppChangelog,
  AppDownloadCTA,
  RelatedApps,
} from './AppDetailClient';

export const dynamic = 'force-dynamic';

// ── Dynamic metadata ──────────────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const app = getAppBySlug(slug);
  if (!app) return { title: 'App Not Found' };

  const title = app.seoTitle || `${app.name} | Anuj Digital Labs`;
  const description = app.seoDescription || app.shortDescription;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://anujdigitallabs.com/apps/${app.slug}`,
      siteName: 'Anuj Digital Labs',
      type: 'website',
      ...(app.ogImageUrl || app.iconUrl
        ? { images: [{ url: app.ogImageUrl || app.iconUrl!, width: 1200, height: 630, alt: app.name }] }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(app.ogImageUrl || app.iconUrl
        ? { images: [app.ogImageUrl || app.iconUrl!] }
        : {}),
    },
    alternates: {
      canonical: `/apps/${app.slug}`,
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function AppDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const adminApp = getAppBySlug(slug);
  if (!adminApp) notFound();

  // Map AdminApp → PublicAppEntry
  const app: PublicAppEntry = {
    id: adminApp.id,
    slug: adminApp.slug || adminApp.id,
    name: adminApp.name,
    shortDescription: adminApp.shortDescription,
    fullDescription: adminApp.fullDescription || '',
    tagline: adminApp.tagline || '',
    category: adminApp.category,
    platform: adminApp.platform,
    version: adminApp.version || '',
    keyFeatures: adminApp.keyFeatures,
    benefits: adminApp.benefits || [],
    howItWorks: adminApp.howItWorks || [],
    status: adminApp.releaseStatus,
    iconUrl: adminApp.iconUrl || undefined,
    bannerUrl: adminApp.bannerUrl || undefined,
    screenshots: adminApp.screenshots || [],
    playStoreUrl: adminApp.playStoreUrl || undefined,
    websiteUrl: adminApp.websiteUrl || undefined,
    learnMoreHref: adminApp.learnMoreHref || undefined,
    privacyPolicyUrl: adminApp.privacyPolicyUrl || undefined,
    supportUrl: adminApp.supportUrl || undefined,
    themeColor: adminApp.themeColor || '#10b981',
    faqs: adminApp.faqs || [],
    changelog: adminApp.changelog || [],
    seoTitle: adminApp.seoTitle || adminApp.name,
    seoDescription: adminApp.seoDescription || adminApp.shortDescription,
    ogImageUrl: adminApp.ogImageUrl || undefined,
    updatedAt: adminApp.updatedAt,
    featured: adminApp.featured || false,
  };

  // Related apps from same category
  const relatedAdminApps = getRelatedApps(adminApp.category, adminApp.id, 3);
  const relatedApps: PublicAppEntry[] = relatedAdminApps.map((a) => ({
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
    themeColor: a.themeColor || '#10b981',
    faqs: a.faqs || [],
    changelog: a.changelog || [],
    seoTitle: a.seoTitle || a.name,
    seoDescription: a.seoDescription || a.shortDescription,
    updatedAt: a.updatedAt,
    featured: a.featured || false,
  }));

  // Schema.org structured data for the app
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: app.name,
    description: app.shortDescription,
    applicationCategory: app.category,
    operatingSystem: app.platform,
    url: `https://anujdigitallabs.com/apps/${app.slug}`,
    ...(app.iconUrl ? { image: app.iconUrl } : {}),
    ...(app.version ? { softwareVersion: app.version } : {}),
    ...(app.playStoreUrl ? { downloadUrl: app.playStoreUrl } : {}),
    author: {
      '@type': 'Organization',
      name: 'Anuj Digital Labs',
      url: 'https://anujdigitallabs.com',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <>
      {/* Inject structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <main
        id="main-content"
        style={{ background: '#020617', color: '#fff' }}
      >
        {/* 1. Hero */}
        <AppDetailHero app={app} />

        {/* 2. Screenshots */}
        <AppScreenshots app={app} />

        {/* 3. Features */}
        <AppFeatures app={app} />

        {/* 4. Why This App / Benefits */}
        <AppBenefits app={app} />

        {/* 5. How It Works */}
        <AppHowItWorks app={app} />

        {/* 6. Technology strip */}
        <AppTechnology app={app} />

        {/* 7. FAQ */}
        <AppFAQ app={app} />

        {/* 8. Changelog */}
        <AppChangelog app={app} />

        {/* 9. Download CTA */}
        <AppDownloadCTA app={app} />

        {/* 10. Related Apps */}
        <RelatedApps apps={relatedApps} />
      </main>

      <Footer />
    </>
  );
}
