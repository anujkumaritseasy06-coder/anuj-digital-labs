import React from 'react';
import type { WebsiteBadgeType } from '@/types/websites';

interface PremiumBadgeProps {
  type: WebsiteBadgeType;
  className?: string;
}

const BADGE_STYLES: Record<string, { bg: string, text: string, border: string, glow: string }> = {
  'Featured Project': {
    bg: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(217,119,6,0.05))',
    text: 'text-amber-400',
    border: 'rgba(245,158,11,0.4)',
    glow: 'rgba(245,158,11,0.3)',
  },
  'Premium Project': {
    bg: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(147,51,234,0.05))',
    text: 'text-purple-400',
    border: 'rgba(168,85,247,0.4)',
    glow: 'rgba(168,85,247,0.3)',
  },
  'Editor\'s Choice': {
    bg: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(5,150,105,0.05))',
    text: 'text-emerald-400',
    border: 'rgba(16,185,129,0.4)',
    glow: 'rgba(16,185,129,0.3)',
  },
  'Innovation': {
    bg: 'linear-gradient(135deg, rgba(56,189,248,0.2), rgba(2,132,199,0.05))',
    text: 'text-sky-400',
    border: 'rgba(56,189,248,0.4)',
    glow: 'rgba(56,189,248,0.3)',
  },
  'Trending': {
    bg: 'linear-gradient(135deg, rgba(249,115,22,0.2), rgba(234,88,12,0.05))',
    text: 'text-orange-400',
    border: 'rgba(249,115,22,0.4)',
    glow: 'rgba(249,115,22,0.3)',
  },
  'Excellence': {
    bg: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(79,70,229,0.05))',
    text: 'text-indigo-400',
    border: 'rgba(99,102,241,0.4)',
    glow: 'rgba(99,102,241,0.3)',
  },
  'Signature Project': {
    bg: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(148,163,184,0.05))',
    text: 'text-white',
    border: 'rgba(255,255,255,0.3)',
    glow: 'rgba(255,255,255,0.2)',
  },
  'New': {
    bg: 'linear-gradient(135deg, rgba(244,63,94,0.2), rgba(225,29,72,0.05))',
    text: 'text-rose-400',
    border: 'rgba(244,63,94,0.4)',
    glow: 'rgba(244,63,94,0.3)',
  },
};

export default function PremiumBadge({ type, className = '' }: PremiumBadgeProps) {
  if (type === 'None') return null;

  const style = BADGE_STYLES[type] || BADGE_STYLES['Featured Project'];

  return (
    <div
      className={`relative inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md overflow-hidden group ${style.text} ${className}`}
      style={{
        background: style.bg,
        border: `1px solid ${style.border}`,
        boxShadow: `0 0 15px ${style.glow}, inset 0 0 10px ${style.glow}`,
      }}
    >
      {/* Moving Shimmer Effect */}
      <div 
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" 
        style={{ transform: 'skewX(-20deg)' }}
      />
      
      {/* Icon based on type */}
      {type === 'Editor\'s Choice' && <span className="mr-1.5 text-[10px]">★</span>}
      {type === 'Premium Project' && <span className="mr-1.5 text-[10px]">👑</span>}
      {type === 'Signature Project' && <span className="mr-1.5 text-[10px]">✦</span>}
      {type === 'Trending' && <span className="mr-1.5 text-[10px]">🔥</span>}
      {type === 'Innovation' && <span className="mr-1.5 text-[10px]">💡</span>}
      
      <span className="relative z-10">{type}</span>
      
      {/* Extra floating glow element for 3D effect */}
      <div 
        className="absolute w-4 h-4 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
        style={{ background: style.text, top: '-50%', left: '20%' }}
      />
    </div>
  );
}
