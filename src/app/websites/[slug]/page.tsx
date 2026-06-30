import { notFound } from 'next/navigation';
import { getWebsiteBySlug } from '@/lib/websites-db';
import PremiumBadge from '@/components/PremiumBadge';
import ScoreCard from '@/components/ScoreCard';
import CTABanner from '@/components/CTABanner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleCanvas from '@/components/ParticleCanvas';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const website = await getWebsiteBySlug(slug);
  if (!website) return { title: 'Not Found' };
  return {
    title: `${website.seoTitle || website.name} | Anuj Digital Labs`,
    description: website.seoDescription || website.shortDescription,
    openGraph: { images: website.ogImageUrl ? [website.ogImageUrl] : [] },
  };
}

export default async function WebsiteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const website = await getWebsiteBySlug(slug);
  if (!website) notFound();

  const mockBrowserBar = (
    <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/80 backdrop-blur-md border-b border-white/10 rounded-t-2xl">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
      </div>
      <div className="mx-auto px-4 py-1 rounded-md bg-white/5 text-[10px] text-slate-400 font-mono text-center min-w-[200px]">
        {website.websiteUrl ? new URL(website.websiteUrl).hostname : `${website.slug}.com`}
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#020617] text-slate-300 relative overflow-hidden">
        
        {/* Background Grid */}
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 20%, rgba(0,0,0,0.1) 80%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 20%, rgba(0,0,0,0.1) 80%, rgba(0,0,0,0) 100%)'
          }}
        />

        {/* Particles */}
        <div className="absolute inset-0 z-0 opacity-60">
          <ParticleCanvas />
        </div>

        {/* Ambient background glow based on themeColor */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-[100%] blur-[120px] opacity-20 pointer-events-none z-0"
          style={{ background: `radial-gradient(ellipse, ${website.themeColor} 0%, transparent 70%)` }}
        />

      {/* ── HERO SECTION ── */}
      <section className="relative z-10 min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8">

        
        <div className="relative z-10 text-center max-w-4xl mx-auto mb-16">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border text-white"
                  style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
              {website.category}
            </span>
            {website.badges.map(b => b !== 'None' && <PremiumBadge key={b} type={b} />)}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6" style={{ textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            {website.name}
          </h1>
          
          {website.tagline && (
            <p className="text-xl md:text-3xl font-medium mb-8" style={{ color: website.themeColor }}>
              {website.tagline}
            </p>
          )}

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            {website.shortDescription}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {website.websiteUrl && (
              <a href={website.websiteUrl} target="_blank" rel="noopener noreferrer" 
                 className="px-8 py-4 rounded-xl font-bold text-slate-900 transition-all hover:-translate-y-1 hover:shadow-2xl hover:scale-105"
                 style={{ background: website.themeColor, boxShadow: `0 0 20px ${website.themeColor}50` }}>
                Visit Live Website
              </a>
            )}
            {website.caseStudyUrl && (
              <a href={website.caseStudyUrl} target="_blank" rel="noopener noreferrer"
                 className="px-8 py-4 rounded-xl font-bold text-white bg-white/10 border border-white/20 transition-all hover:bg-white/20 hover:-translate-y-1">
                Read Case Study
              </a>
            )}
          </div>
        </div>

        {/* Hero Mockup */}
        <div className="relative z-10 w-full max-w-6xl mx-auto perspective-1000 group">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8)] transition-transform duration-1000 ease-out transform rotate-x-[5deg] group-hover:rotate-x-0">
            {mockBrowserBar}
            <div className="w-full bg-slate-900 aspect-[16/9] relative">
              {website.thumbnailUrl ? (
                <img src={website.thumbnailUrl} alt={website.name} className="w-full h-full object-cover object-top" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-700">Preview not available</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECT OVERVIEW ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 prose prose-invert prose-emerald max-w-none">
            <h2 className="text-3xl font-bold text-white mb-6">Project Overview</h2>
            <div className="text-slate-300 leading-relaxed text-lg whitespace-pre-wrap">
              {website.fullDescription || website.shortDescription}
            </div>
          </div>
          <div className="space-y-10">
            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Client</h3>
              <p className="text-white font-medium text-lg">{website.clientName || 'Confidential'}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Timeline</h3>
              <p className="text-white font-medium text-lg">{website.completionDate} • {website.projectDuration}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {website.techStack.map(tech => (
                  <span key={tech} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white/5 border border-white/10 text-white">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PERFORMANCE SCORES ── */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-16">Industry-Leading Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            <ScoreCard 
              score={website.scores.performance} 
              label="Performance" 
              type="performance"
              description="Lightning-fast load times and optimized Core Web Vitals for a superior user experience." 
            />
            <ScoreCard 
              score={website.scores.accessibility} 
              label="Accessibility" 
              type="accessibility"
              description="WCAG-compliant design that ensures your website is usable by everyone, everywhere." 
            />
            <ScoreCard 
              score={website.scores.bestPractices} 
              label="Best Practices" 
              type="best-practices"
              description="Built with modern standards, clean code, and industry best practices you can rely on." 
            />
            <ScoreCard 
              score={website.scores.seo} 
              label="SEO" 
              type="seo"
              description="Search engine optimized to improve visibility, drive traffic, and grow your online presence." 
            />
          </div>
        </div>
      </section>

      {/* ── KEY FEATURES ── */}
      {website.features && website.features.length > 0 && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Key Features</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Powerful capabilities built into the core experience.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {website.features.map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 transition-all hover:bg-white/10 hover:-translate-y-1">
                <div className="text-4xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── DESIGN SYSTEM ── */}
      {(website.designProcess?.colors.length > 0 || website.designProcess?.typography.length > 0) && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Design Language</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">The visual foundation of {website.name}.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Colors */}
            {website.designProcess.colors.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-white mb-8">Color Palette</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {website.designProcess.colors.map((color, i) => (
                    <div key={i} className="space-y-3">
                      <div className="w-full aspect-square rounded-2xl border border-white/10 shadow-lg" style={{ background: color.hex }} />
                      <div>
                        <p className="text-white font-medium text-sm">{color.name}</p>
                        <p className="text-slate-500 font-mono text-xs uppercase">{color.hex}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Typography */}
            {website.designProcess.typography.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-white mb-8">Typography</h3>
                <div className="space-y-6">
                  {website.designProcess.typography.map((type, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                      <p className="text-3xl text-white mb-2" style={{ fontFamily: type.family }}>Aa</p>
                      <p className="text-white font-medium text-lg mb-1">{type.family}</p>
                      <p className="text-slate-500 text-sm">Used for: {type.usage}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── GALLERY ── */}
      {(website.gallery.desktopScreenshots.length > 0 || website.gallery.mobileScreenshots.length > 0) && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white/[0.02] border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Interface Gallery</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">Responsive layouts crafted for every device.</p>
            </div>
            
            {/* Desktop */}
            {website.gallery.desktopScreenshots.length > 0 && (
              <div className="mb-20">
                <h3 className="text-xl font-semibold text-slate-400 mb-8 px-2">Desktop View</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {website.gallery.desktopScreenshots.map((img, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      {mockBrowserBar}
                      <img src={img} alt={`Desktop screenshot ${i + 1}`} className="w-full object-cover bg-slate-900 aspect-video" />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Mobile/Tablet grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {website.gallery.tabletScreenshots.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-slate-400 mb-8 px-2">Tablet View</h3>
                  <div className="grid grid-cols-2 gap-6">
                    {website.gallery.tabletScreenshots.map((img, i) => (
                      <div key={i} className="rounded-2xl overflow-hidden border-4 border-slate-800 shadow-2xl">
                        <img src={img} alt={`Tablet screenshot ${i + 1}`} className="w-full object-cover bg-slate-900 aspect-[3/4]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {website.gallery.mobileScreenshots.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-slate-400 mb-8 px-2">Mobile View</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {website.gallery.mobileScreenshots.map((img, i) => (
                      <div key={i} className="rounded-[2rem] overflow-hidden border-[6px] border-slate-800 shadow-2xl">
                        <img src={img} alt={`Mobile screenshot ${i + 1}`} className="w-full object-cover bg-slate-900 aspect-[9/19.5]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <CTABanner />
      </main>
      <Footer />
    </>
  );
}
