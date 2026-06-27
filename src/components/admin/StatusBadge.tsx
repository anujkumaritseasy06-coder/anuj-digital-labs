import type { PublishStatus } from '@/types/admin';

interface StatusBadgeProps {
  status: PublishStatus;
  size?: 'sm' | 'md';
}

const config = {
  published: {
    label: 'Published',
    color: '#34d399',
    bg: 'rgba(16,185,129,0.12)',
    border: 'rgba(16,185,129,0.3)',
    dot: '#10b981',
  },
  draft: {
    label: 'Draft',
    color: '#94a3b8',
    bg: 'rgba(148,163,184,0.1)',
    border: 'rgba(148,163,184,0.2)',
    dot: '#64748b',
  },
};

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const c = config[status];
  const textSize = size === 'sm' ? 'text-[10px]' : 'text-[11px]';
  const padding = size === 'sm' ? 'px-2 py-0.5' : 'px-3 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full ${textSize} ${padding}`}
      style={{ background: c.bg, color: c.color, border: `1px solid ${c.border}` }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.dot }} aria-hidden="true" />
      {c.label}
    </span>
  );
}
