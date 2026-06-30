'use client';

import { useEffect, useState, useId } from 'react';

type ScoreType = 'performance' | 'accessibility' | 'best-practices' | 'seo';

interface ScoreCardProps {
  score: number;
  label: string;
  type: ScoreType;
  description: string;
}

function getTheme(type: ScoreType) {
  switch (type) {
    case 'performance':
      return {
        stroke: '#10b981', // emerald-500
        gradientEnd: '#34d399', // emerald-400
        conic: 'conic-gradient(from 0deg, #022c22, #059669, #10b981, #34d399, #10b981, #059669, #022c22)',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>
          </svg>
        )
      };
    case 'accessibility':
      return {
        stroke: '#3b82f6', // blue-500
        gradientEnd: '#60a5fa', // blue-400
        conic: 'conic-gradient(from 0deg, #172554, #1d4ed8, #3b82f6, #60a5fa, #3b82f6, #1d4ed8, #172554)',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="16" cy="4" r="1"/><path d="m18 19 1-7-6 1"/><path d="m5 8 3-3 5.5 3-2.36 3.5"/><path d="M4.24 14.5a5 5 0 0 0 6.88 6"/><path d="M13.76 17.5a5 5 0 0 0-6.88-6"/>
          </svg>
        )
      };
    case 'best-practices':
      return {
        stroke: '#a855f7', // purple-500
        gradientEnd: '#c084fc', // purple-400
        conic: 'conic-gradient(from 0deg, #3b0764, #7e22ce, #a855f7, #c084fc, #a855f7, #7e22ce, #3b0764)',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/>
          </svg>
        )
      };
    case 'seo':
      return {
        stroke: '#eab308', // yellow-500
        gradientEnd: '#facc15', // yellow-400
        conic: 'conic-gradient(from 0deg, #422006, #ca8a04, #eab308, #facc15, #eab308, #ca8a04, #422006)',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
          </svg>
        )
      };
  }
}

export default function ScoreCard({ score, label, type, description }: ScoreCardProps) {
  const size = 120;
  const strokeWidth = 8;
  const gradId = useId().replace(/:/g, '');
  const [displayScore, setDisplayScore] = useState(0);
  const [ringScore, setRingScore] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const theme = getTheme(type);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRingScore(score);
      
      let startTimestamp: number | null = null;
      const duration = 2000;

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        const easeOut = 1 - Math.pow(1 - progress, 4);
        setDisplayScore(Math.floor(easeOut * score));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setDisplayScore(score);
          setIsDone(true);
        }
      };
      window.requestAnimationFrame(step);

    }, 300);
    return () => clearTimeout(timer);
  }, [score]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (ringScore / 100) * circumference;

  return (
    <div className="bg-[#0b1120] border border-white/[0.08] hover:border-white/[0.15] hover:-translate-y-1 transition-all duration-300 rounded-[20px] p-8 relative flex flex-col items-center w-full max-w-[300px] shadow-2xl">
      {/* Top Left Icon */}
      <div 
        className="absolute top-6 left-6 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
        style={{ color: theme.stroke }}
      >
        {theme.icon}
      </div>

      <style>{`
        @keyframes ring-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-ring-spin {
          animation: ring-spin 4s linear infinite;
        }
        .animate-ring-spin-fast {
          animation: ring-spin 3s linear infinite reverse;
        }
      `}</style>

      {/* Ring Container */}
      <div className="relative flex items-center justify-center mt-12 mb-8 transition-all duration-700 hover:scale-105" style={{ width: size, height: size }}>
        
        {/* Continuous 3D Spinning Background Glow */}
        <div 
          className="absolute rounded-full blur-[25px] mix-blend-screen opacity-70 animate-ring-spin"
          style={{ 
            inset: '-10px',
            background: theme.conic,
          }}
        />

        {/* 3D Recessed Dark Dial Core */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 50% 50%, #020617 0%, #0a0f1e 100%)',
            boxShadow: 'inset 0 10px 25px rgba(0,0,0,1), inset 0 0 15px rgba(0,0,0,0.9), 0 2px 4px rgba(255,255,255,0.05)'
          }}
        />

        {/* Inner Core Pulse */}
        <div 
          className={`absolute inset-4 rounded-full blur-[15px] transition-opacity duration-1000 ${isDone ? 'opacity-40' : 'opacity-0'} animate-ring-spin-fast`}
          style={{
            background: theme.conic
          }}
        />

        {/* SVG Progress Rings */}
        <svg 
          className="absolute top-0 left-0 -rotate-90 z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]" 
          width={size} 
          height={size}
        >
          <defs>
            <linearGradient id={`grad-${gradId}`} x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%">
                 <animate attributeName="stop-color" values={`${theme.stroke};${theme.gradientEnd};${theme.stroke}`} dur="3s" repeatCount="indefinite" />
               </stop>
               <stop offset="100%">
                 <animate attributeName="stop-color" values={`${theme.gradientEnd};${theme.stroke};${theme.gradientEnd}`} dur="3s" repeatCount="indefinite" />
               </stop>
            </linearGradient>
          </defs>

          {/* Background Track Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          {/* Foreground Animated Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`url(#grad-${gradId})`}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 2s cubic-bezier(0.25, 1, 0.5, 1)' }}
          />
        </svg>

        {/* Number Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pt-2">
          <div className="flex items-baseline justify-center">
            <span 
              className="font-bold font-sans tracking-tight transition-all duration-700 ease-out leading-none"
              style={{ 
                fontSize: size * 0.35,
                color: '#ffffff',
                textShadow: isDone ? `0 0 15px ${theme.stroke}` : 'none',
                transform: isDone ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              {displayScore}
            </span>
          </div>
          <span 
            className="text-white/50 font-medium tracking-widest mt-1 transition-all duration-700"
            style={{ 
              fontSize: size * 0.12,
              transform: isDone ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            /100
          </span>
        </div>
      </div>
      
      {/* Label and Status */}
      <div className="text-center z-10 w-full mt-4">
        <h3 
          className="text-sm font-bold uppercase tracking-[0.2em] mb-4"
          style={{ color: theme.stroke, textShadow: `0 0 10px ${theme.stroke}40` }}
        >
          {label}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed max-w-[240px] mx-auto text-center h-20">
          {description}
        </p>
      </div>
    </div>
  );
}
