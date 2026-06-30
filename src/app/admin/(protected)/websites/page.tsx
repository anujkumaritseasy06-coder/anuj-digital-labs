'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import type { AdminWebsite } from '@/types/websites';
import StatusBadge from '@/components/admin/StatusBadge';
import ConfirmModal from '@/components/admin/ConfirmModal';

const CATEGORIES = [
  'all', 'Business', 'Restaurant', 'Education', 'Healthcare', 'Portfolio', 
  'Landing Page', 'Corporate', 'Ecommerce', 'Blog', 'Calculator', 
  'Tools', 'SaaS', 'AI', 'Government', 'Personal', 'NGO', 'Other'
];
const STATUSES = ['all', 'published', 'draft', 'archived'];

export default function WebsitesListPage() {
  const [websites, setWebsites] = useState<AdminWebsite[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('all');
  const [category, setCategory] = useState('all');
  const [deleteTarget, setDeleteTarget] = useState<AdminWebsite | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchWebsites = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (status !== 'all') params.set('status', status);
    if (category !== 'all') params.set('category', category);
    const res = await fetch(`/api/admin/websites?${params}`);
    const data = await res.json();
    setWebsites(Array.isArray(data) ? data : []);
    setLoading(false);
  }, [q, status, category]);

  useEffect(() => {
    const t = setTimeout(fetchWebsites, 250);
    return () => clearTimeout(t);
  }, [fetchWebsites]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await fetch(`/api/admin/websites/${deleteTarget.id}`, { method: 'DELETE' });
    setDeleteTarget(null);
    fetchWebsites();
  };

  const handleTogglePublish = async (site: AdminWebsite) => {
    setTogglingId(site.id);
    const next = site.publishStatus === 'published' ? 'draft' : 'published';
    await fetch(`/api/admin/websites/${site.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ publishStatus: next }),
    });
    setTogglingId(null);
    fetchWebsites();
  };

  const selectCls = `px-3 py-2 rounded-xl text-sm text-slate-300 outline-none focus:ring-1 focus:ring-emerald-500/40 transition-all`;
  const selectStyle = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', colorScheme: 'dark' as const };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Website Management</h2>
          <p className="text-slate-500 text-sm mt-0.5">{websites.length} website{websites.length !== 1 ? 's' : ''} found</p>
        </div>
        <Link
          href="/admin/websites/new"
          id="websites-add-btn"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-px"
          style={{ background: 'linear-gradient(135deg, #059669, #10b981)', boxShadow: '0 0 20px rgba(16,185,129,0.25)' }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Add Website
        </Link>
      </div>

      {/* Search & Filters */}
      <div
        className="flex flex-wrap gap-3 p-4 rounded-2xl"
        style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            id="websites-search"
            type="text"
            placeholder="Search by name or description…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl text-sm text-slate-300 placeholder-slate-600 outline-none focus:ring-1 focus:ring-emerald-500/40 transition-all"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
          />
        </div>
        <select id="filter-status" value={status} onChange={(e) => setStatus(e.target.value)} className={selectCls} style={selectStyle}>
          {STATUSES.map((s) => <option key={s} value={s}>{s === 'all' ? 'All Statuses' : s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
        <select id="filter-category" value={category} onChange={(e) => setCategory(e.target.value)} className={selectCls} style={selectStyle}>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-500">
            <svg className="w-5 h-5 animate-spin mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Loading…
          </div>
        ) : websites.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <p className="text-lg mb-2">No websites found</p>
            <p className="text-sm">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  {['Website', 'Category', 'Status', 'Order', 'Actions'].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {websites.map((site) => (
                  <tr
                    key={site.id}
                    className="transition-colors hover:bg-white/[0.02]"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {site.thumbnailUrl ? (
                          <img src={site.thumbnailUrl} alt={site.name} className="w-12 h-9 rounded-xl object-cover flex-shrink-0" />
                        ) : (
                          <div className="w-12 h-9 rounded-xl flex-shrink-0 flex items-center justify-center"
                            style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.18)' }}>
                            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-white font-medium truncate max-w-[180px]">{site.name}</p>
                          <a href={site.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline text-xs truncate max-w-[180px] block">
                            {site.websiteUrl}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400 whitespace-nowrap">{site.category}</td>
                    <td className="px-6 py-4"><StatusBadge status={site.publishStatus} size="sm" /></td>
                    <td className="px-6 py-4 text-slate-500 text-center">{site.displayOrder}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {/* Toggle publish */}
                        <button
                          id={`toggle-publish-${site.id}`}
                          onClick={() => handleTogglePublish(site)}
                          disabled={togglingId === site.id}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:-translate-y-px disabled:opacity-50"
                          style={site.publishStatus === 'published'
                            ? { background: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.25)' }
                            : { background: 'rgba(52,211,153,0.1)', color: '#34d399', border: '1px solid rgba(52,211,153,0.25)' }
                          }
                        >
                          {site.publishStatus === 'published' ? 'Unpublish' : 'Publish'}
                        </button>
                        {/* Edit */}
                        <Link
                          href={`/admin/websites/${site.id}`}
                          id={`edit-website-${site.id}`}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white transition-all hover:-translate-y-px"
                          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                        >
                          Edit
                        </Link>
                        {/* Delete */}
                        <button
                          id={`delete-website-${site.id}`}
                          onClick={() => setDeleteTarget(site)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                          aria-label={`Delete ${site.name}`}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <ConfirmModal
          title="Delete Website"
          message={`Are you sure you want to permanently delete "${deleteTarget.name}"? This action cannot be undone.`}
          confirmLabel="Delete Website"
          danger
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
