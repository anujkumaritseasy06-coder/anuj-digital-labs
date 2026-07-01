'use client';

import React, { useState, useRef, MouseEvent, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { PublicWebsiteEntry } from '@/types/websites';

export default function WebsiteCard({ website }: { website: PublicWebsiteEntry }) {
  const themeColor = website.themeColor || '#10b981';
  const hoverColor = website.hoverColor || '#34d399';

  return (
    <motion.a
      href={website.websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        '--hover-color': hoverColor,
      } as React.CSSProperties}
      className="group relative flex flex-col w-full h-[380px] rounded-[32px] cursor-pointer"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ scale: 1.03, y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.5 }}
    >
      {/* Outer ambient glow behind the card (subtle constant glow) */}
      <div 
        className="absolute inset-0 z-[-1] opacity-25 rounded-[32px] blur-xl group-hover:opacity-50 transition-all duration-700" 
        style={{ backgroundColor: themeColor }}
      />

      {/* Animated Spinning Border Layer */}
      <div className="absolute inset-0 rounded-[32px] overflow-hidden z-0 border border-white/5">
         <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] animate-[spin_4s_linear_infinite] opacity-70 group-hover:opacity-100 transition-opacity duration-500" 
            style={{ background: `conic-gradient(from 0deg, transparent 0 280deg, ${themeColor}cc 360deg)` }}
         />
      </div>

      {/* Main Card Container (Inner Mask) */}
      <div className="absolute inset-[1.5px] rounded-[30.5px] bg-slate-950 flex flex-col overflow-hidden z-10">
        
        {/* Banner Image Container */}
        <div className="relative w-full h-[240px] shrink-0 bg-slate-950 overflow-hidden z-0">
          {website.bannerImage ? (
            <Image
              src={website.bannerImage}
              alt={website.name}
              fill
              className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.12]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-700 font-medium tracking-widest uppercase text-xs">No Image Available</div>
          )}
          
          {/* Subtle vignette on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />
          
          {/* Top Badges */}
          <div className="absolute top-5 left-5 right-5 flex justify-between items-start z-30">
            {website.featured ? (
              <span className="px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.5)] transform transition-transform group-hover:scale-105 group-hover:-translate-y-1">
                Featured
              </span>
            ) : (
              <div />
            )}
            
            <span className="px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-black/60 text-white border border-white/20 transform transition-transform group-hover:scale-105 group-hover:-translate-y-1">
              {website.category}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 flex-1 flex flex-col justify-center z-30 bg-[#0f172a] border-t border-white/5 relative">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-extrabold text-white tracking-tight group-hover:text-[var(--hover-color)] transition-colors duration-500 drop-shadow-md">
                {website.name}
              </h3>
              <p className="text-sm font-medium text-slate-400 mt-1 flex items-center gap-2 group-hover:text-[var(--hover-color)] transition-colors duration-300">
                <span>View live website</span>
                <motion.span 
                  className="inline-block opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"
                >
                  →
                </motion.span>
              </p>
            </div>
            
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-slate-950 group-hover:bg-[var(--hover-color)] group-hover:border-[var(--hover-color)] transition-all duration-500 shadow-[0_0_0_rgba(16,185,129,0)] group-hover:shadow-[0_0_25px_var(--hover-color)] transform group-hover:-translate-y-1 group-hover:rotate-12 group-hover:scale-110 relative overflow-hidden">
               {/* Internal button shine effect */}
               <div className="absolute inset-0 bg-white/30 -translate-x-full skew-x-[-45deg] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
              <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  );
}
