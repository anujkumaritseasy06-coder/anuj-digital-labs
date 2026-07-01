'use client';

import React, { useState, useMemo } from 'react';
import WebsiteCard from '@/components/WebsiteCard';
import type { PublicWebsiteEntry, WebsiteCategory } from '@/types/websites';
import { motion, AnimatePresence } from 'framer-motion';

interface ClientGalleryProps {
  websites: PublicWebsiteEntry[];
}

const CATEGORIES: WebsiteCategory[] = [
  'Corporate', 'Business', 'Restaurant', 'Education', 'Healthcare',
  'Portfolio', 'Landing Page', 'Ecommerce', 'Blog', 'Calculator',
  'Tools', 'AI', 'Government', 'Personal', 'Other'
];

export default function ClientGallery({ websites }: ClientGalleryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<WebsiteCategory | 'All'>('All');

  const filteredWebsites = useMemo(() => {
    return websites.filter((website) => {
      const matchesSearch = website.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || website.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [websites, searchQuery, activeCategory]);

  return (
    <div className="w-full">


      {/* Gallery Grid */}
      {filteredWebsites.length === 0 ? (
        <div className="text-center py-24 px-4 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-sm">
          <div className="w-24 h-24 mx-auto mb-6 opacity-50">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-slate-400 w-full h-full">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">No Websites Found</h3>
          <p className="text-slate-400">
            We haven't published any websites yet. Check back soon!
          </p>
        </div>
      ) : (
        <motion.div 
          layout
          className="flex flex-wrap justify-center gap-6 md:gap-8 pt-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredWebsites.map((website) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={website.id}
                className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(25%-1.5rem)] max-w-[400px]"
              >
                <WebsiteCard website={website} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
