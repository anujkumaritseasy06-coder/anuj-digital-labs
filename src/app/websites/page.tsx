import React from 'react';
import { getPublishedWebsites } from '@/lib/websites-db';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientGallery from './ClientGallery';

export const metadata = {
  title: 'Websites | Anuj Digital Labs',
  description: 'Explore our portfolio of premium websites and digital experiences.',
};

export const dynamic = 'force-dynamic';

export default async function WebsitesPage() {
  const websites = await getPublishedWebsites();

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
              Website <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">Showcase</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              A curated collection of premium websites. We don't just build sites; we craft digital experiences that leave a lasting impression.
            </p>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="pb-32 px-6">
          <div className="max-w-7xl mx-auto relative z-10">
            <ClientGallery websites={websites} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
