'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { PublicAppEntry } from '@/types/admin';

// ── Platform icons ────────────────────────────────────────────────────────────

function AndroidIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.523 15.341c-.347 0-.628-.281-.628-.628s.281-.628.628-.628.628.281.628.628-.281.628-.628.628m-11.046 0c-.347 0-.628-.281-.628-.628s.281-.628.628-.628.628.281.628.628-.281.628-.628.628M17.67 10.062l1.734-3.003a.36.36 0 00-.131-.492.36.36 0 00-.492.131L17.04 9.725A11.063 11.063 0 0012 8.547c-1.791 0-3.473.425-4.941 1.177L5.22 6.698a.36.36 0 00-.492-.131.36.36 0 00-.131.492l1.734 3.003C3.972 11.549 2.304 13.875 2 16.6h20c-.304-2.725-1.972-5.051-4.33-6.538" />
    </svg>
  );
}

function WebIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="10" strokeWidth={1.8} />
      <path strokeLinecap="round" strokeWidth={1.8} d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  );
}

// ── Hero Section ──────────────────────────────────────────────────────────────

export function AppDetailHero({ app }: { app: PublicAppEntry }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const themeColor = app.themeColor || '#10b981';

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const hero = heroRef.current;
    const icon = iconRef.current;
    if (!hero || !icon) return;
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    icon.style.transform = `translate(${x * 15}px, ${y * 10}px) rotate(${x * 4}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (iconRef.current) iconRef.current.style.transform = '';
  }, []);

  const isAvailable = app.status === 'available';

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={`${app.name} hero section`}
    >
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 20% 30%, ${themeColor}18 0%, transparent 60%),
              radial-gradient(ellipse 60% 80% at 80% 70%, #3b82f620 0%, transparent 60%),
              radial-gradient(ellipse 100% 100% at 50% 50%, #020617 60%, #0a0f1e 100%)
            `,
          }}
        />
        {/* Aurora orbs */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20 animate-mesh-shift"
          style={{
            background: `radial-gradient(circle, ${themeColor} 0%, transparent 70%)`,
            top: '-10%',
            left: '-5%',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-15 animate-float-slow"
          style={{
            background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
            bottom: '10%',
            right: '10%',
          }}
        />
        {/* Grid */}
        <div className="absolute inset-0 hero-grid opacity-30" />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[
          { size: 80, x: '8%', y: '15%', opacity: 0.06, delay: '0s', color: themeColor },
          { size: 60, x: '85%', y: '20%', opacity: 0.08, delay: '1.5s', color: '#3b82f6' },
          { size: 100, x: '75%', y: '70%', opacity: 0.05, delay: '3s', color: themeColor },
          { size: 40, x: '15%', y: '75%', opacity: 0.1, delay: '2s', color: '#06b6d4' },
          { size: 55, x: '50%', y: '10%', opacity: 0.06, delay: '0.5s', color: '#8b5cf6' },
        ].map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full border animate-float"
            style={{
              width: s.size,
              height: s.size,
              left: s.x,
              top: s.y,
              borderColor: s.color,
              opacity: s.opacity,
              animationDelay: s.delay,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8 animate-fade-in" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/apps" className="hover:text-slate-300 transition-colors">Apps</Link>
              <span>/</span>
              <span className="text-slate-300">{app.name}</span>
            </nav>

            {/* Badges row */}
            <div className="flex flex-wrap gap-2 mb-6 animate-fade-in delay-100">
              {/* Category */}
              <span
                className="text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                style={{ background: `${themeColor}15`, color: themeColor, border: `1px solid ${themeColor}30` }}
              >
                {app.category}
              </span>
              {/* Status */}
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                style={app.status === 'available'
                  ? { background: 'rgba(16,185,129,0.12)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)' }
                  : { background: 'rgba(245,158,11,0.1)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.25)' }
                }
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: app.status === 'available' ? '#10b981' : '#f59e0b' }}
                  aria-hidden="true"
                />
                {app.status === 'available' ? 'Available' : 'Coming Soon'}
              </span>
              {/* Version */}
              {app.version && (
                <span className="text-[11px] font-mono font-semibold px-3 py-1.5 rounded-full text-slate-400"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  v{app.version}
                </span>
              )}
              {/* Platform */}
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full text-slate-300"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {(app.platform === 'Android' || app.platform === 'Android & Web') ? (
                  <AndroidIcon className="w-3.5 h-3.5 text-green-400" />
                ) : (
                  <WebIcon className="w-3.5 h-3.5 text-blue-400" />
                )}
                {app.platform}
              </span>
            </div>

            {/* App name */}
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-4 animate-fade-in-up delay-200"
              style={{ letterSpacing: '-0.04em', lineHeight: '1.0' }}
            >
              {app.name}
            </h1>

            {/* Tagline */}
            {app.tagline && (
              <p
                className="text-xl sm:text-2xl font-semibold mb-4 animate-fade-in-up delay-300"
                style={{ color: themeColor }}
              >
                {app.tagline}
              </p>
            )}

            {/* Description */}
            <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-xl animate-fade-in-up delay-400">
              {app.shortDescription}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-500">
              {isAvailable && app.playStoreUrl && (
                <a
                  href={app.playStoreUrl}
                  id="detail-download-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl text-white font-bold text-base transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${themeColor}cc, ${themeColor})`,
                    boxShadow: `0 8px 32px ${themeColor}50`,
                  }}
                >
                  <AndroidIcon className="w-5 h-5" />
                  Get on Play Store
                </a>
              )}
              {app.websiteUrl && (
                <a
                  href={app.websiteUrl}
                  id="detail-website-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-semibold text-base text-white transition-all duration-200 hover:-translate-y-px"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <WebIcon className="w-5 h-5 text-blue-400" />
                  Visit Website
                </a>
              )}
              {!isAvailable && (
                <span
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-bold text-base text-amber-400"
                  style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)' }}
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" aria-hidden="true" />
                  Coming Soon
                </span>
              )}
            </div>
          </div>

          {/* Right — large app icon */}
          <div className="flex items-center justify-center">
            <div
              ref={iconRef}
              className="relative"
              style={{ transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)' }}
            >
              {/* Outer glow rings */}
              <div
                className="absolute inset-0 rounded-[40px] opacity-30 animate-pulse-glow"
                style={{ boxShadow: `0 0 80px 20px ${themeColor}` }}
                aria-hidden="true"
              />
              <div
                className="absolute -inset-8 rounded-[56px] border opacity-10 animate-rotate-slow"
                style={{ borderColor: themeColor }}
                aria-hidden="true"
              />
              <div
                className="absolute -inset-16 rounded-[72px] border opacity-5 animate-rotate-slow-reverse"
                style={{ borderColor: '#3b82f6' }}
                aria-hidden="true"
              />

              {/* Main icon */}
              <div
                className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-[40px] overflow-hidden animate-detail-hero-float"
                style={{
                  boxShadow: `0 32px 80px ${themeColor}50, 0 8px 32px rgba(0,0,0,0.6)`,
                  border: `2px solid ${themeColor}30`,
                }}
              >
                {app.iconUrl ? (
                  <Image
                    src={app.iconUrl}
                    alt={`${app.name} app icon`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 192px, 256px"
                    priority
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${themeColor}30, ${themeColor}10)` }}
                  >
                    <svg className="w-24 h-24" viewBox="0 0 24 24" fill="none" stroke={themeColor} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce" aria-hidden="true">
          <span className="text-slate-600 text-[11px] uppercase tracking-widest">Scroll</span>
          <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}

// ── Screenshots Section ───────────────────────────────────────────────────────

export function AppScreenshots({ app }: { app: PublicAppEntry }) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const themeColor = app.themeColor || '#10b981';

  if (!app.screenshots || app.screenshots.length === 0) return null;

  return (
    <section
      className="py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0f1e 0%, #060b18 100%)' }}
      aria-labelledby="screenshots-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <span className="text-[11px] font-bold uppercase tracking-widest mb-3 block" style={{ color: themeColor }}>
            Gallery
          </span>
          <h2 id="screenshots-heading" className="text-4xl sm:text-5xl font-black text-white" style={{ letterSpacing: '-0.03em' }}>
            See It in Action
          </h2>
        </div>
      </div>

      {/* Horizontal scroll gallery */}
      <div className="flex gap-5 screenshots-scroll overflow-x-auto pb-4 px-8">
        {app.screenshots.map((src, i) => (
          <button
            key={i}
            id={`screenshot-${i}`}
            className="screenshot-snap flex-shrink-0 relative group overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            style={{
              width: 280,
              height: 500,
              boxShadow: `0 8px 32px rgba(0,0,0,0.5)`,
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            onClick={() => setLightbox(src)}
            aria-label={`View screenshot ${i + 1} of ${app.name}`}
          >
            <Image
              src={src}
              alt={`${app.name} screenshot ${i + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="280px"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'rgba(0,0,0,0.4)' }}>
              <span
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: themeColor }}
              >
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(20px)' }}
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot lightbox"
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center text-white transition-colors hover:bg-white/10"
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="relative max-w-sm w-full rounded-3xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: '90vh', aspectRatio: '9/16' }}
          >
            <Image
              src={lightbox}
              alt="Screenshot enlarged"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 90vw, 400px"
            />
          </div>
        </div>
      )}
    </section>
  );
}

// ── Features Section ──────────────────────────────────────────────────────────

export function AppFeatures({ app }: { app: PublicAppEntry }) {
  const themeColor = app.themeColor || '#10b981';

  if (!app.keyFeatures || app.keyFeatures.length === 0) return null;

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ background: 'linear-gradient(180deg, #060b18 0%, #080e1c 100%)' }}
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[11px] font-bold uppercase tracking-widest mb-3 block" style={{ color: themeColor }}>
            Capabilities
          </span>
          <h2 id="features-heading" className="text-4xl sm:text-5xl font-black text-white" style={{ letterSpacing: '-0.03em' }}>
            Everything You Need
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {app.keyFeatures.map((feature, i) => {
            const [title, ...rest] = feature.split('•').map((s) => s.trim());
            const bullets = rest.filter(Boolean);
            return (
              <div
                key={i}
                id={`feature-card-${i}`}
                className="feature-card-3d p-6 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                {/* Feature number */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-sm font-black"
                  style={{ background: `${themeColor}20`, color: themeColor, border: `1px solid ${themeColor}30` }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-white font-bold text-lg mb-2 leading-tight">{title}</h3>
                {bullets.length > 0 && (
                  <ul className="space-y-1 mt-3">
                    {bullets.slice(0, 3).map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-slate-400 text-[13px]">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: themeColor }} aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Benefits / Why This App ───────────────────────────────────────────────────

export function AppBenefits({ app }: { app: PublicAppEntry }) {
  const themeColor = app.themeColor || '#10b981';

  if (!app.benefits || app.benefits.length === 0) return null;

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ background: 'linear-gradient(180deg, #080e1c 0%, #060b18 100%)' }}
      aria-labelledby="benefits-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[11px] font-bold uppercase tracking-widest mb-3 block" style={{ color: themeColor }}>
            Why Choose It
          </span>
          <h2 id="benefits-heading" className="text-4xl sm:text-5xl font-black text-white" style={{ letterSpacing: '-0.03em' }}>
            Built for Results
          </h2>
          {app.fullDescription && (
            <p className="text-slate-400 text-lg leading-relaxed mt-4 max-w-2xl mx-auto">
              {app.fullDescription}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {app.benefits.map((benefit, i) => (
            <div
              key={i}
              id={`benefit-card-${i}`}
              className="group p-7 rounded-2xl transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div
                className="text-3xl mb-5 w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${themeColor}15`, border: `1px solid ${themeColor}25` }}
              >
                {benefit.icon}
              </div>
              <h3 className="text-white font-bold text-xl mb-2">{benefit.title}</h3>
              <p className="text-slate-400 text-[14px] leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── How It Works ─────────────────────────────────────────────────────────────

export function AppHowItWorks({ app }: { app: PublicAppEntry }) {
  const themeColor = app.themeColor || '#10b981';

  if (!app.howItWorks || app.howItWorks.length === 0) return null;

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ background: 'linear-gradient(180deg, #060b18 0%, #080e1c 100%)' }}
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[11px] font-bold uppercase tracking-widest mb-3 block" style={{ color: themeColor }}>
            Getting Started
          </span>
          <h2 id="how-it-works-heading" className="text-4xl sm:text-5xl font-black text-white" style={{ letterSpacing: '-0.03em' }}>
            How It Works
          </h2>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px hidden sm:block"
            style={{ background: `linear-gradient(180deg, transparent, ${themeColor}40 20%, ${themeColor}40 80%, transparent)` }}
            aria-hidden="true"
          />

          <div className="space-y-10">
            {app.howItWorks.map((step, i) => (
              <div
                key={i}
                id={`step-${i}`}
                className="relative flex items-start gap-6 group"
              >
                {/* Step number circle */}
                <div
                  className="relative flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-base font-black z-10 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${themeColor}30, ${themeColor}15)`,
                    border: `2px solid ${themeColor}50`,
                    color: themeColor,
                  }}
                >
                  {step.icon || String(i + 1).padStart(2, '0')}
                </div>

                {/* Content */}
                <div
                  className="flex-1 p-6 rounded-2xl transition-all duration-300 group-hover:-translate-y-0.5"
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: `${themeColor}90` }}>
                      Step {i + 1}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-[14px] leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Technology Section ────────────────────────────────────────────────────────

export function AppTechnology({ app }: { app: PublicAppEntry }) {
  const themeColor = app.themeColor || '#10b981';

  const techBadges = [
    { label: app.platform, icon: app.platform.includes('Android') ? '🤖' : '🌐', color: themeColor },
    { label: 'Offline Support', icon: '📴', color: '#06b6d4' },
    { label: 'Privacy First', icon: '🔒', color: '#8b5cf6' },
    { label: 'Fast & Lightweight', icon: '⚡', color: '#f59e0b' },
  ];

  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8"
      style={{ background: 'rgba(5,10,20,0.8)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      aria-label="Technology highlights"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-4 justify-center">
          {techBadges.map((badge, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: `${badge.color}10`,
                border: `1px solid ${badge.color}25`,
              }}
            >
              <span className="text-lg">{badge.icon}</span>
              {badge.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FAQ Section ───────────────────────────────────────────────────────────────

export function AppFAQ({ app }: { app: PublicAppEntry }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const themeColor = app.themeColor || '#10b981';

  if (!app.faqs || app.faqs.length === 0) return null;

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ background: 'linear-gradient(180deg, #080e1c 0%, #060b18 100%)' }}
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[11px] font-bold uppercase tracking-widest mb-3 block" style={{ color: themeColor }}>
            FAQs
          </span>
          <h2 id="faq-heading" className="text-4xl sm:text-5xl font-black text-white" style={{ letterSpacing: '-0.03em' }}>
            Questions Answered
          </h2>
        </div>

        <div className="space-y-3">
          {app.faqs.map((faq, i) => (
            <div
              key={i}
              id={`faq-item-${i}`}
              className="rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${openIndex === i ? themeColor + '40' : 'rgba(255,255,255,0.07)'}`, transition: 'border-color 0.3s' }}
            >
              <button
                className="w-full flex items-center justify-between gap-4 p-5 text-left transition-colors duration-200"
                style={{ background: openIndex === i ? `${themeColor}08` : 'rgba(255,255,255,0.02)' }}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="text-white font-semibold text-[15px] leading-snug">{faq.question}</span>
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    background: openIndex === i ? themeColor : 'rgba(255,255,255,0.06)',
                    transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                  aria-hidden="true"
                >
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>
              {openIndex === i && (
                <div
                  id={`faq-answer-${i}`}
                  className="px-5 pb-5 animate-faq-slide-down"
                >
                  <p className="text-slate-400 text-[14px] leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Changelog Section ─────────────────────────────────────────────────────────

export function AppChangelog({ app }: { app: PublicAppEntry }) {
  const themeColor = app.themeColor || '#10b981';

  if (!app.changelog || app.changelog.length === 0) return null;

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ background: 'linear-gradient(180deg, #060b18 0%, #080e1c 100%)' }}
      aria-labelledby="changelog-heading"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[11px] font-bold uppercase tracking-widest mb-3 block" style={{ color: themeColor }}>
            Release History
          </span>
          <h2 id="changelog-heading" className="text-4xl sm:text-5xl font-black text-white" style={{ letterSpacing: '-0.03em' }}>
            Changelog
          </h2>
        </div>

        <div className="relative space-y-8">
          {app.changelog.map((entry, i) => (
            <div
              key={i}
              id={`changelog-v${entry.version.replace(/\./g, '-')}`}
              className="relative pl-8"
              style={{ borderLeft: `2px solid ${i === 0 ? themeColor : 'rgba(255,255,255,0.08)'}` }}
            >
              {/* Dot */}
              <div
                className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2"
                style={{
                  background: i === 0 ? themeColor : '#0a0f1e',
                  borderColor: i === 0 ? themeColor : 'rgba(255,255,255,0.15)',
                }}
                aria-hidden="true"
              />

              <div
                className="p-6 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="flex items-center flex-wrap gap-3 mb-4">
                  <span
                    className="text-[11px] font-black px-3 py-1.5 rounded-full font-mono"
                    style={{ background: i === 0 ? `${themeColor}20` : 'rgba(255,255,255,0.05)', color: i === 0 ? themeColor : '#64748b' }}
                  >
                    v{entry.version}
                  </span>
                  {i === 0 && (
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                      style={{ background: `${themeColor}20`, color: themeColor }}>
                      Latest
                    </span>
                  )}
                  <span className="text-slate-500 text-[12px] ml-auto">{entry.date}</span>
                </div>

                {entry.whatsNew.length > 0 && (
                  <div className="mb-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">What&apos;s New</p>
                    <ul className="space-y-1">
                      {entry.whatsNew.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-[13px] text-slate-300">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: themeColor }} aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {entry.bugFixes.length > 0 && (
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">Bug Fixes</p>
                    <ul className="space-y-1">
                      {entry.bugFixes.map((fix, j) => (
                        <li key={j} className="flex items-start gap-2 text-[13px] text-slate-400">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-slate-500" aria-hidden="true" />
                          {fix}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Download CTA Section ──────────────────────────────────────────────────────

export function AppDownloadCTA({ app }: { app: PublicAppEntry }) {
  const themeColor = app.themeColor || '#10b981';
  const isAvailable = app.status === 'available';

  return (
    <section
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #080e1c 0%, #020617 100%)' }}
      aria-labelledby="download-cta-heading"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${themeColor}15 0%, transparent 70%)`,
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        {app.iconUrl && (
          <div
            className="w-20 h-20 rounded-3xl overflow-hidden mx-auto mb-8 card-icon-float"
            style={{
              boxShadow: `0 12px 40px ${themeColor}50`,
              border: `2px solid ${themeColor}40`,
            }}
          >
            <Image
              src={app.iconUrl}
              alt={`${app.name} icon`}
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <h2
          id="download-cta-heading"
          className="text-5xl sm:text-6xl font-black text-white mb-4"
          style={{ letterSpacing: '-0.04em' }}
        >
          {isAvailable ? 'Get Started Today' : 'Coming Soon'}
        </h2>

        <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          {isAvailable
            ? `Download ${app.name} and experience the difference.`
            : `${app.name} is currently in development. Be the first to know when it launches.`}
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          {isAvailable && app.playStoreUrl && (
            <a
              href={app.playStoreUrl}
              id="cta-download-btn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-5 rounded-2xl text-white font-bold text-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${themeColor}cc, ${themeColor})`,
                boxShadow: `0 12px 40px ${themeColor}50`,
              }}
            >
              <AndroidIcon className="w-6 h-6" />
              Download on Play Store
            </a>
          )}

          {app.websiteUrl && (
            <a
              href={app.websiteUrl}
              id="cta-website-btn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-5 rounded-2xl font-semibold text-lg text-white transition-all duration-200 hover:-translate-y-px"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <WebIcon className="w-5 h-5 text-blue-400" />
              Open Website
            </a>
          )}
        </div>

        {/* Supporting links */}
        <div className="flex flex-wrap gap-6 justify-center mt-10">
          {app.privacyPolicyUrl && (
            <a href={app.privacyPolicyUrl} target="_blank" rel="noopener noreferrer"
              className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
              Privacy Policy
            </a>
          )}
          {app.supportUrl && (
            <a href={app.supportUrl} target="_blank" rel="noopener noreferrer"
              className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
              Support
            </a>
          )}
          <Link href="/apps" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
            ← Back to All Apps
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Related Apps Section ──────────────────────────────────────────────────────

export function RelatedApps({ apps }: { apps: PublicAppEntry[] }) {
  if (!apps || apps.length === 0) return null;

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ background: 'linear-gradient(180deg, #020617 0%, #0a0f1e 100%)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
      aria-labelledby="related-apps-heading"
    >
      <div className="max-w-7xl mx-auto">
        <h2 id="related-apps-heading" className="text-3xl font-black text-white mb-10 text-center" style={{ letterSpacing: '-0.02em' }}>
          More Apps You May Like
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app, i) => (
            <Link
              key={app.id}
              href={`/apps/${app.slug}`}
              id={`related-app-${app.id}`}
              className="group flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
              aria-label={`View ${app.name}`}
            >
              <div
                className="relative w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0"
                style={{ border: `1px solid ${app.themeColor}30` }}
              >
                {app.iconUrl ? (
                  <Image
                    src={app.iconUrl}
                    alt={`${app.name} icon`}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: `${app.themeColor}15` }}
                  >
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke={app.themeColor} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-[15px] group-hover:text-emerald-400 transition-colors">{app.name}</p>
                <p className="text-slate-500 text-xs mt-0.5">{app.category}</p>
                <p className="text-slate-400 text-[12px] mt-1 leading-snug line-clamp-2">{app.shortDescription}</p>
              </div>
              <svg className="w-4 h-4 text-slate-600 group-hover:text-slate-300 transition-colors flex-shrink-0"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
