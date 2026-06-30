import React from 'react';
import { getPublishedWebsites } from '@/lib/websites-db';
import WebsiteCard from '@/components/WebsiteCard';
import { PageHero } from '@/components/PageHero';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Websites | Anuj Digital Labs',
  description: 'Explore our portfolio of premium, award-winning websites and digital experiences.',
};

export const dynamic = 'force-dynamic';

export default async function WebsitesPage() {
  const websites = await getPublishedWebsites();

  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero 
          title="Web Experience Portfolio"
          description="A curated collection of premium, award-winning websites. We don't just build sites; we craft digital experiences that leave a lasting impression."
          badge="Premium Websites"
          breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Websites' }]}
        />

        <div
          className="min-h-[60vh] py-20 px-4 sm:px-6 lg:px-8 relative"
          style={{
            background: 'linear-gradient(180deg, #020617 0%, #0a0f1e 40%, #0d1526 100%)',
          }}
        >
          <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" aria-hidden="true" />

          <div className="max-w-7xl mx-auto relative z-10">
            {websites.length === 0 ? (
              <div className="text-center py-20 text-slate-400">
                <p className="text-xl">No websites published yet.</p>
                <p className="text-sm mt-2 text-slate-500">Check back soon for our latest work.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {websites.map(website => (
                  <WebsiteCard key={website.id} website={website} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
