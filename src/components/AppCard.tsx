'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useCallback } from 'react';
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

// ── Status + Platform config ──────────────────────────────────────────────────

const STATUS_CONFIG = {
  available: {
    label: 'Available',
    dot: '#10b981',
    bg: 'rgba(16,185,129,0.12)',
    text: '#34d399',
    border: 'rgba(16,185,129,0.3)',
  },
  'coming-soon': {
    label: 'Coming Soon',
    dot: '#f59e0b',
    bg: 'rgba(245,158,11,0.1)',
    text: '#fbbf24',
    border: 'rgba(245,158,11,0.25)',
  },
} as const;

const PLATFORM_CONFIG: Record<string, { bg: string; text: string; border: string }> = {
  Android: { bg: 'rgba(34,197,94,0.1)', text: '#4ade80', border: 'rgba(34,197,94,0.25)' },
  Web: { bg: 'rgba(59,130,246,0.1)', text: '#60a5fa', border: 'rgba(59,130,246,0.25)' },
  'Android & Web': { bg: 'rgba(139,92,246,0.1)', text: '#a78bfa', border: 'rgba(139,92,246,0.25)' },
};

// ── Particle component ────────────────────────────────────────────────────────

function Particle({ x, y, delay, color }: { x: number; y: number; delay: number; color: string }) {
  return (
    <span
      aria-hidden="true"
      className="absolute w-1 h-1 rounded-full opacity-0 pointer-events-none animate-particle-drift"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        background: color,
        animationDelay: `${delay}s`,
        animationDuration: `${2.5 + delay}s`,
      }}
    />
  );
}

// ── Main Card ─────────────────────────────────────────────────────────────────

interface AppCardProps {
  app: PublicAppEntry;
  index?: number;
}

export default function AppCard({ app, index = 0 }: AppCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const status = STATUS_CONFIG[app.status];
  const platform = PLATFORM_CONFIG[app.platform] ?? PLATFORM_CONFIG['Web'];
  const themeColor = app.themeColor || '#10b981';
  const detailHref = `/apps/${app.slug}`;

  // ── 3D Tilt Handler ──────────────────────────────────────────────────────

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const card = cardRef.current;
    const inner = innerRef.current;
    const spotlight = spotlightRef.current;
    if (!card || !inner || !spotlight) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -9;
    const rotY = ((x - cx) / cx) * 9;

    inner.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px)`;
    spotlight.style.left = `${x}px`;
    spotlight.style.top = `${y}px`;
    spotlight.style.opacity = '1';
  }, []);

  const handleMouseLeave = useCallback(() => {
    const inner = innerRef.current;
    const spotlight = spotlightRef.current;
    if (inner) inner.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    if (spotlight) spotlight.style.opacity = '0';
  }, []);

  // Stagger animation delay based on card index
  const staggerDelay = `${index * 100}ms`;

  const particleColors = [themeColor, '#06b6d4', '#3b82f6'];

  return (
    <article
      ref={cardRef}
      id={`app-card-${app.id}`}
      className="relative premium-app-card rounded-3xl overflow-hidden cursor-pointer group"
      style={{
        background: 'rgba(8, 14, 26, 0.85)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
        animationDelay: staggerDelay,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={`${app.name} — ${status.label}`}
    >
      {/* Spotlight radial gradient that follows cursor */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="absolute pointer-events-none rounded-full opacity-0 transition-opacity duration-300"
        style={{
          width: '280px',
          height: '280px',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, ${themeColor}18 0%, transparent 70%)`,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Animated gradient border glow (shows on hover) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${themeColor}22 0%, transparent 50%, ${themeColor}11 100%)`,
        }}
      />

      {/* Top accent glow line */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${themeColor} 50%, transparent 100%)`,
          boxShadow: `0 0 12px ${themeColor}60`,
        }}
      />

      {/* Floating particles (visible on hover) */}
      {particleColors.map((color, i) => (
        <Particle
          key={i}
          x={20 + i * 30}
          y={80 - i * 10}
          delay={i * 0.8}
          color={color}
        />
      ))}

      {/* 3D Inner wrapper */}
      <div
        ref={innerRef}
        className="relative flex flex-col h-full"
        style={{ transition: 'transform 0.15s cubic-bezier(0.16,1,0.3,1)' }}
      >
        {/* ── Card Header with icon ─────────────────────────────────── */}
        <div className="p-6 pb-0">
          <div className="flex items-start justify-between gap-4 mb-5">
            {/* App icon */}
            <div className="relative flex-shrink-0">
              <div
                className="relative w-16 h-16 rounded-2xl overflow-hidden card-icon-float"
                style={{
                  boxShadow: `0 8px 24px ${themeColor}40, 0 2px 8px rgba(0,0,0,0.4)`,
                  border: `1px solid ${themeColor}30`,
                }}
              >
                {app.iconUrl ? (
                  <Image
                    src={app.iconUrl}
                    alt={`${app.name} icon`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${themeColor}30, ${themeColor}10)` }}
                  >
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke={themeColor} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Badges column */}
            <div className="flex flex-col items-end gap-2 flex-1 min-w-0">
              {/* Status badge */}
              <span
                className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide flex-shrink-0"
                style={{ background: status.bg, color: status.text, border: `1px solid ${status.border}` }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: status.dot }} aria-hidden="true" />
                {status.label}
              </span>

              {/* Platform badge */}
              <span
                className="inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                style={{ background: platform.bg, color: platform.text, border: `1px solid ${platform.border}` }}
              >
                {(app.platform === 'Android' || app.platform === 'Android & Web') ? (
                  <AndroidIcon className="w-3 h-3" />
                ) : (
                  <WebIcon className="w-3 h-3" />
                )}
                {app.platform}
              </span>
            </div>
          </div>

          {/* Category pill */}
          <div className="mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              {app.category}
            </span>
          </div>

          {/* App name */}
          <h3
            className="text-2xl font-extrabold text-white mb-1.5 leading-tight tracking-tight"
            style={{ letterSpacing: '-0.02em' }}
          >
            {app.name}
          </h3>

          {/* Tagline if available */}
          {app.tagline && (
            <p className="text-sm font-medium mb-2" style={{ color: themeColor }}>
              {app.tagline}
            </p>
          )}

          {/* Short description */}
          <p className="text-slate-400 text-[13px] leading-relaxed mb-5">
            {app.shortDescription}
          </p>
        </div>

        {/* ── Divider ──────────────────────────────────────────────── */}
        <div className="mx-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} />

        {/* ── Key features ─────────────────────────────────────────── */}
        <div className="px-6 py-4 flex-1">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
            Key Features
          </p>
          <ul className="space-y-2">
            {app.keyFeatures.slice(0, 5).map((feature, i) => {
              // Extract just the feature title (before •)
              const title = feature.split('•')[0].trim();
              return (
                <li key={i} className="flex items-start gap-2.5 text-[12px] text-slate-300">
                  <span
                    className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: `${themeColor}20`, border: `1px solid ${themeColor}40` }}
                    aria-hidden="true"
                  >
                    <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke={themeColor}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="leading-relaxed">{title}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ── Version + Last updated ────────────────────────────────── */}
        {app.version && (
          <div className="px-6 pb-2">
            <span className="text-[11px] text-slate-600 font-mono">v{app.version}</span>
          </div>
        )}

        {/* ── Action buttons ────────────────────────────────────────── */}
        <div
          className="flex items-center gap-3 px-6 py-4 mt-auto"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          {/* Download / Play Store */}
          {app.playStoreUrl ? (
            <a
              href={app.playStoreUrl}
              id={`app-playstore-${app.id}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 text-[12px] font-bold px-4 py-2.5 rounded-xl text-white transition-all duration-200 hover:-translate-y-0.5 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${themeColor}dd, ${themeColor})`,
                boxShadow: `0 4px 16px ${themeColor}40`,
              }}
            >
              <AndroidIcon className="w-3.5 h-3.5" />
              Download
            </a>
          ) : app.status === 'coming-soon' ? (
            <span
              className="inline-flex items-center gap-2 text-[12px] font-semibold px-4 py-2.5 rounded-xl text-slate-400"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" aria-hidden="true" />
              Coming Soon
            </span>
          ) : null}

          {/* Learn More */}
          <Link
            href={detailHref}
            id={`app-learn-${app.id}`}
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold ml-auto transition-all duration-200 hover:gap-2.5"
            style={{ color: themeColor }}
            onClick={(e) => e.stopPropagation()}
          >
            Learn More
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Whole-card click → detail page */}
      <Link href={detailHref} className="absolute inset-0 z-0" tabIndex={-1} aria-hidden="true" />
    </article>
  );
}
