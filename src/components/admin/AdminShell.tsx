'use client';

import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import { usePathname } from 'next/navigation';

const PAGE_TITLES: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/apps': 'App Management',
  '/admin/apps/new': 'New App',
  '/admin/media': 'Media Library',
};

function getTitle(pathname: string): string {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname];
  if (pathname.includes('/edit')) return 'Edit App';
  return 'Admin';
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const title = getTitle(pathname);

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: '#070d1c', color: '#e2e8f0' }}
    >
      {/* ── Desktop sidebar ────────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:flex-shrink-0">
        <AdminSidebar />
      </div>

      {/* ── Mobile sidebar overlay ─────────────────────────────────────────── */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
          <div
            className="fixed inset-y-0 left-0 z-50 w-72 lg:hidden"
            style={{ boxShadow: '4px 0 32px rgba(0,0,0,0.5)' }}
          >
            <AdminSidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </>
      )}

      {/* ── Main area ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <AdminTopbar title={title} onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto">
          <div className="p-5 sm:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
