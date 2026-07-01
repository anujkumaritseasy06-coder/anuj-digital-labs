import { Metadata } from 'next';
import { getPublishedApps } from '@/lib/db';
import ClientAppGallery from '@/app/apps/ClientAppGallery';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Our Apps | Anuj Digital Labs',
  description: 'Explore our portfolio of premium Android applications designed to boost productivity, health, and business.',
  openGraph: {
    title: 'Our Apps | Anuj Digital Labs',
    description: 'Explore our portfolio of premium Android applications designed to boost productivity, health, and business.',
    url: 'https://anujdigitallabs.com/apps',
    siteName: 'Anuj Digital Labs',
    images: [
      {
        url: '/og-apps.jpg',
        width: 1200,
        height: 630,
        alt: 'Anuj Digital Labs Apps',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Apps | Anuj Digital Labs',
    description: 'Explore our portfolio of premium Android applications designed to boost productivity, health, and business.',
    images: ['/og-apps.jpg'],
  },
};

// Next.js 15+ syntax for revalidation (force static rendering with periodic revalidation)
export const revalidate = 3600;

export default async function AppsPage() {
  const adminApps = await getPublishedApps();
  const apps = adminApps.map(app => ({
    id: app.id,
    name: app.name,
    category: app.category,
    status: app.releaseStatus,
    bannerUrl: app.bannerUrl,
    playStoreUrl: app.playStoreUrl,
    websiteUrl: app.websiteUrl,
    updatedAt: app.updatedAt,
    featured: app.featured,
    themeColor: app.themeColor,
    hoverColor: app.hoverColor,
  }));

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-slate-950">
        {/* Premium Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none opacity-50" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
              Software <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">Excellence</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Discover our portfolio of meticulously crafted applications. Built for performance, designed for humans, and engineered to solve real-world problems.
            </p>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="pb-32 px-6">
          <div className="max-w-7xl mx-auto">
            <ClientAppGallery apps={apps} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
