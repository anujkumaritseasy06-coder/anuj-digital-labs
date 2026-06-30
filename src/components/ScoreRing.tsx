'use client';

import { useEffect, useState, useId } from 'react';

interface ScoreRingProps {
  score: number;
  label: string;
  size?: number;
  strokeWidth?: number;
}

function getColorForScore(score: number) {
  if (score >= 90) return { 
    stroke: '#10b981', 
    gradientEnd: '#34d399', 
    conic: 'conic-gradient(from 0deg, #064e3b, #059669, #10b981, #34d399, #10b981, #059669, #064e3b)',
    text: 'Excellent' 
  };
  if (score >= 70) return { 
    stroke: '#f59e0b', 
    gradientEnd: '#fbbf24', 
    conic: 'conic-gradient(from 0deg, #78350f, #d97706, #f59e0b, #fbbf24, #f59e0b, #d97706, #78350f)',
    text: 'Good' 
  };
  if (score >= 50) return { 
    stroke: '#f97316', 
    gradientEnd: '#fb923c', 
    conic: 'conic-gradient(from 0deg, #7c2d12, #ea580c, #f97316, #fb923c, #f97316, #ea580c, #7c2d12)',
    text: 'Average' 
  };
  return { 
    stroke: '#f43f5e', 
    gradientEnd: '#fb7185', 
    conic: 'conic-gradient(from 0deg, #881337, #e11d48, #f43f5e, #fb7185, #f43f5e, #e11d48, #881337)',
    text: 'Needs Improvement' 
  };
}

export default function ScoreRing({ score, label, size = 120, strokeWidth = 10 }: ScoreRingProps) {
  const gradId = useId().replace(/:/g, '');
  const [displayScore, setDisplayScore] = useState(0);
  const [ringScore, setRingScore] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRingScore(score);
      
      let startTimestamp: number | null = null;
      const duration = 2000; // Smooth 2s build-up

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
  const colorInfo = getColorForScore(score);

  return (
    <div className="flex flex-col items-center group cursor-default">
      {/* Injecting custom keyframes for perfectly smooth continuous animations */}
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

      {/* Container with extra space for the massive 3D glow */}
      <div className="relative flex items-center justify-center transition-all duration-700 hover:scale-105" style={{ width: size, height: size }}>
        
        {/* Continuous 3D Spinning Background Glow */}
        <div 
          className="absolute rounded-full blur-[20px] mix-blend-screen opacity-70 animate-ring-spin"
          style={{ 
            inset: '-10px',
            background: colorInfo.conic,
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
            background: colorInfo.conic
          }}
        />

        {/* SVG Progress Rings */}
        <svg 
          className="absolute top-0 left-0 -rotate-90 z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]" 
          width={size} 
          height={size}
        >
          <defs>
            {/* SVG native animation for continuous flow within the stroke itself */}
            <linearGradient id={`grad-${gradId}`} x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%">
                 <animate attributeName="stop-color" values={`${colorInfo.stroke};${colorInfo.gradientEnd};${colorInfo.stroke}`} dur="3s" repeatCount="indefinite" />
               </stop>
               <stop offset="100%">
                 <animate attributeName="stop-color" values={`${colorInfo.gradientEnd};${colorInfo.stroke};${colorInfo.gradientEnd}`} dur="3s" repeatCount="indefinite" />
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

        {/* Number Display (Optimized and Clean) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
          <span 
            className="font-bold font-sans tracking-tight transition-all duration-700 ease-out"
            style={{ 
              fontSize: size * 0.32,
              color: isDone ? '#ffffff' : '#94a3b8',
              textShadow: isDone ? `0 0 15px ${colorInfo.stroke}` : 'none',
              transform: isDone ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            {displayScore}
          </span>
        </div>
      </div>
      
      {/* Label and Status */}
      <div className="mt-8 text-center z-10">
        <p className="text-sm font-bold text-white uppercase tracking-[0.2em] drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] opacity-95">
          {label}
        </p>
      </div>
    </div>
  );
}
