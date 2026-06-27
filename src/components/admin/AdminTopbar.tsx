'use client';

interface AdminTopbarProps {
  title: string;
  onMenuClick: () => void;
}

export default function AdminTopbar({ title, onMenuClick }: AdminTopbarProps) {
  return (
    <header
      className="flex items-center gap-4 px-5 sm:px-8 h-16 flex-shrink-0"
      style={{
        background: 'rgba(6, 12, 26, 0.95)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Mobile menu button */}
      <button
        id="admin-mobile-menu-btn"
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
        aria-label="Open navigation menu"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Page title */}
      <h1 className="text-white font-semibold text-[15px] flex-1">{title}</h1>

      {/* Right: session indicator */}
      <div
        className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-medium"
        style={{
          background: 'rgba(16,185,129,0.08)',
          border: '1px solid rgba(16,185,129,0.18)',
          color: '#6ee7b7',
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
        Admin Session Active
      </div>
    </header>
  );
}
