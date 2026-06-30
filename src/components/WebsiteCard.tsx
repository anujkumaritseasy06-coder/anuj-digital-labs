'use client';

import React, { useState, useRef, MouseEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { PublicWebsiteEntry } from '@/types/websites';
import PremiumBadge from './PremiumBadge';

export default function WebsiteCard({ website }: { website: PublicWebsiteEntry }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);
  const [glareOpacity, setGlareOpacity] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const maxRotation = 10; // degrees
    const rX = ((y - centerY) / centerY) * -maxRotation;
    const rY = ((x - centerX) / centerX) * maxRotation;

    setRotateX(rX);
    setRotateY(rY);

    // Glare position (percentage)
    setGlareX((x / rect.width) * 100);
    setGlareY((y / rect.height) * 100);
    setGlareOpacity(0.15);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlareOpacity(0);
  };

  return (
    <div
      className="group perspective-1000 relative"
      style={{ perspective: '1000px' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full rounded-3xl overflow-hidden transition-all duration-300 ease-out preserve-3d h-full flex flex-col"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          background: 'rgba(15,23,42,0.6)',
          border: '1px solid rgba(255,255,255,0.05)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0,0,0,0.3)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Glow behind card matching theme color */}
        <div 
          className="absolute -inset-2 rounded-[2rem] opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500 z-[-1]"
          style={{ background: website.themeColor }}
        />

        {/* Dynamic Glare */}
        <div
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 rounded-3xl mix-blend-overlay"
          style={{
            opacity: glareOpacity,
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.8) 0%, transparent 50%)`,
          }}
        />

        {/* Thumbnail Container */}
        <div className="relative h-64 w-full overflow-hidden shrink-0 bg-slate-900 border-b border-white/5">
          {website.thumbnailUrl ? (
            <img
              src={website.thumbnailUrl}
              alt={website.name}
              className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-700">No Image</div>
          )}
          
          {/* Top Overlays: Status and Badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10 translate-z-[20px]" style={{ transform: 'translateZ(20px)' }}>
            <div className="flex flex-col gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-black/50 backdrop-blur-md border border-white/10 text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
              {website.badges.map(badge => badge !== 'None' && (
                <PremiumBadge key={badge} type={badge} />
              ))}
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-white/10 backdrop-blur-md border border-white/20 text-white">
                {website.category}
              </span>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-6 flex-1 flex flex-col translate-z-[30px] relative z-10" style={{ transform: 'translateZ(30px)' }}>
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-white tracking-tight mb-1 group-hover:text-emerald-400 transition-colors">
              {website.name}
            </h3>
            <p className="text-sm font-medium" style={{ color: website.themeColor }}>
              {website.industry} {website.clientName && `• ${website.clientName}`}
            </p>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
            {website.shortDescription}
          </p>

          {/* Metrics Row */}
          <div className="grid grid-cols-3 gap-2 mb-6 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
            <div className="text-center">
              <div className="text-xs text-slate-500 mb-1">Performance</div>
              <div className="text-sm font-bold text-emerald-400">{website.scores?.performance ?? 0}</div>
            </div>
            <div className="text-center border-l border-white/[0.05]">
              <div className="text-xs text-slate-500 mb-1">SEO</div>
              <div className="text-sm font-bold text-emerald-400">{website.scores?.seo ?? 0}</div>
            </div>
            <div className="text-center border-l border-white/[0.05]">
              <div className="text-xs text-slate-500 mb-1">Security</div>
              <div className="text-sm font-bold text-emerald-400">{website.scores?.security ?? 0}</div>
            </div>
          </div>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {website.techStack.slice(0, 4).map((tech, i) => (
              <span key={i} className="px-2 py-1 rounded-md text-[10px] font-medium text-slate-300 bg-white/[0.05] border border-white/10">
                {tech}
              </span>
            ))}
            {website.techStack.length > 4 && (
              <span className="px-2 py-1 rounded-md text-[10px] font-medium text-slate-500 bg-white/[0.02] border border-white/5">
                +{website.techStack.length - 4}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-auto">
            <Link 
              href={`/websites/${website.slug}`}
              className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all bg-white/10 hover:bg-white/20 border border-white/10"
            >
              View Details
            </Link>
            {website.websiteUrl && (
              <a 
                href={website.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-bold text-slate-900 transition-all hover:scale-[1.02]"
                style={{ background: website.themeColor, boxShadow: `0 0 15px ${website.themeColor}40` }}
              >
                Visit Site
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
