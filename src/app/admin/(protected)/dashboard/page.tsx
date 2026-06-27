import { getStoreStats, getApps } from '@/lib/db';
import StatsCard from '@/components/admin/StatsCard';
import StatusBadge from '@/components/admin/StatusBadge';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

function formatDate(iso: string | null): string {
  if (!iso) return 'Never';
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export default async function DashboardPage() {
  const stats = await getStoreStats();
  const recentApps = (await getApps()).slice(0, 6);

  const statCards = [
    {
      title: 'Total Apps',
      value: stats.total,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      accent: '#10b981', accentLight: 'rgba(16,185,129,0.1)', accentBorder: 'rgba(16,185,129,0.2)',
    },
    {
      title: 'Published',
      value: stats.published,
      subtitle: 'Visible on /apps',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M9 12l2 2 4-4M21 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s9 4.477 9 10z" />
        </svg>
      ),
      accent: '#34d399', accentLight: 'rgba(52,211,153,0.1)', accentBorder: 'rgba(52,211,153,0.2)',
    },
    {
      title: 'Drafts',
      value: stats.draft,
      subtitle: 'Not yet published',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      accent: '#fbbf24', accentLight: 'rgba(251,191,36,0.1)', accentBorder: 'rgba(251,191,36,0.2)',
    },
    {
      title: 'Last Updated',
      value: stats.lastUpdated ? new Date(stats.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—',
      subtitle: stats.lastUpdated ? formatDate(stats.lastUpdated) : 'No changes yet',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      accent: '#60a5fa', accentLight: 'rgba(96,165,250,0.1)', accentBorder: 'rgba(96,165,250,0.2)',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Welcome back 👋</h2>
          <p className="text-slate-500 text-sm mt-1">Here's what's happening with your apps.</p>
        </div>
        <Link
          href="/admin/apps/new"
          id="dashboard-add-app-btn"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:-translate-y-px"
          style={{ background: 'linear-gradient(135deg, #059669, #10b981)', boxShadow: '0 0 20px rgba(16,185,129,0.25)' }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Add App
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <StatsCard key={card.title} {...card} />
        ))}
      </div>

      {/* Recent apps table */}
      {recentApps.length > 0 && (
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 className="text-white font-semibold text-[15px]">All Apps</h3>
            <Link href="/admin/apps" className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors">
              View All →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  {['App', 'Category', 'Platform', 'Status', 'Updated', ''].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentApps.map((app) => (
                  <tr
                    key={app.id}
                    className="transition-colors hover:bg-white/[0.02]"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {app.iconUrl ? (
                          <img src={app.iconUrl} alt={app.name} className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
                        ) : (
                          <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center"
                            style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
                            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        <div>
                          <p className="text-white font-medium">{app.name}</p>
                          <p className="text-slate-500 text-xs truncate max-w-[200px]">{app.shortDescription}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400">{app.category}</td>
                    <td className="px-6 py-4 text-slate-400">{app.platform}</td>
                    <td className="px-6 py-4"><StatusBadge status={app.publishStatus} size="sm" /></td>
                    <td className="px-6 py-4 text-slate-500 text-xs whitespace-nowrap">
                      {new Date(app.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/apps/${app.id}/edit`}
                        className="text-emerald-400 hover:text-emerald-300 text-xs font-medium transition-colors whitespace-nowrap"
                      >
                        Edit →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {recentApps.length === 0 && (
        <div
          className="rounded-2xl p-12 text-center"
          style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.18)' }}>
            <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-white font-bold text-lg mb-2">No apps yet</h3>
          <p className="text-slate-500 text-sm mb-6">Get started by adding your first app.</p>
          <Link
            href="/admin/apps/new"
            id="dashboard-empty-add-btn"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-px"
            style={{ background: 'linear-gradient(135deg, #059669, #10b981)', boxShadow: '0 0 20px rgba(16,185,129,0.25)' }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Add First App
          </Link>
        </div>
      )}
    </div>
  );
}
