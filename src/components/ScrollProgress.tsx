"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrollHeight > 0) {
        const currentProgress = Math.min(Math.max(scrollY / scrollHeight, 0), 1);
        setProgress(currentProgress);
        // Show after scrolling down a bit (e.g., 100px)
        setIsVisible(scrollY > 100);
      } else {
        setProgress(0);
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // SVG Circle properties
  const size = 64;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - progress * circumference;
  
  // Calculate percentage for display
  const percentage = Math.round(progress * 100);

  return (
    <div
      className="fixed bottom-6 right-6 z-[9999] pointer-events-none transition-all duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.8)",
      }}
    >
      {/* Outer Glow / Drop Shadow */}
      <div 
        className="absolute inset-0 rounded-full transition-all duration-300"
        style={{
          boxShadow: `0 0 25px rgba(16,185,129,${0.2 + (progress * 0.4)}), 0 0 50px rgba(6,182,212,${0.1 + (progress * 0.3)})`,
          opacity: 0.8,
        }}
      />
      
      {/* Floating Glass Container */}
      <div
        className="relative flex items-center justify-center rounded-full overflow-hidden"
        style={{
          width: size,
          height: size,
          background: "rgba(2, 6, 23, 0.65)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        {/* SVG Progress Circle */}
        <svg
          className="absolute inset-0 transform -rotate-90 transition-all duration-150 ease-out"
          width={size}
          height={size}
        >
          {/* Background Track Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth={strokeWidth}
          />
          
          {/* Glowing Progress Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="url(#gradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 0.15s ease-out",
              filter: "drop-shadow(0 0 6px rgba(16,185,129,0.8))",
            }}
          />
          
          {/* Neon Gradient Def */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Center Content: Percentage & Arrow */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto cursor-pointer" 
             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
             title="Scroll to top"
        >
          {/* Inner pulse ring when at 100% */}
          {percentage === 100 && (
             <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-emerald-400" />
          )}
          
          <span className="text-[10px] font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-br from-emerald-300 to-cyan-300 leading-none">
            {percentage}%
          </span>
          
          {/* Dynamic Arrow (points down, points up at 100%) */}
          <svg 
            className="w-3.5 h-3.5 mt-0.5 text-emerald-400 transition-transform duration-500"
            style={{ transform: percentage === 100 ? "rotate(180deg)" : "rotate(0deg)" }}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
