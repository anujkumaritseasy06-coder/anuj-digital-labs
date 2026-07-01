'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppCard from '@/components/AppCard';
import type { PublicAppEntry, AppCategory } from '@/types/admin';

interface ClientAppGalleryProps {
  apps: PublicAppEntry[];
}

const CATEGORIES: ('All' | AppCategory)[] = [
  'All',
  'Android',
  'AI',
  'Productivity',
  'Business',
  'Education',
  'Health',
  'Finance',
  'Utility',
  'Calculator',
  'Tools',
  'Document',
  'Scanner',
  'Offline',
  'Coming Soon',
  'Released',
];

export default function ClientAppGallery({ apps }: ClientAppGalleryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | AppCategory>('All');
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);

  // Filter apps
  const filteredApps = useMemo(() => {
    return apps.filter(app => {
      // 1. Text Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!app.name.toLowerCase().includes(query) && !app.category.toLowerCase().includes(query)) {
          return false;
        }
      }
      
      // 2. Category Filter
      if (selectedCategory !== 'All') {
        if (selectedCategory === 'Coming Soon') {
          if (app.status !== 'coming-soon') return false;
        } else if (selectedCategory === 'Released') {
          if (app.status !== 'available') return false;
        } else {
          if (app.category !== selectedCategory) return false;
        }
      }
      
      return true;
    }).sort((a, b) => {
      // Featured apps first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [apps, searchQuery, selectedCategory]);

  return (
    <div>


      {/* Grid */}
      <div className="min-h-[500px]">
        {filteredApps.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-6 border border-white/10">
              <svg className="w-10 h-10 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No apps found</h3>
            <p className="text-slate-500 max-w-sm">
              We couldn't find any apps to display here.
            </p>
          </motion.div>
        ) : (
          <motion.div 
            layout
            className="flex flex-wrap justify-center gap-6 md:gap-8 pt-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredApps.map((app) => (
                <motion.div
                  key={app.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(25%-1.5rem)] max-w-[400px]"
                >
                  <AppCard app={app} onComingSoon={() => setShowComingSoonModal(true)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Premium Coming Soon Modal */}
      <AnimatePresence>
        {showComingSoonModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              onClick={() => setShowComingSoonModal(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl shadow-2xl p-8 text-center overflow-hidden"
            >
              {/* Modal ambient glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-emerald-500/20 blur-3xl rounded-full" />
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <svg className="w-8 h-8 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3">Coming Soon</h3>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  This application is currently under development. Check back later to see our latest innovations.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <button 
                    onClick={() => setShowComingSoonModal(false)}
                    className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors border border-white/10"
                  >
                    Close
                  </button>
                  <button 
                    onClick={() => setShowComingSoonModal(false)}
                    className="flex-1 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-bold transition-colors shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                  >
                    Notify Me
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
