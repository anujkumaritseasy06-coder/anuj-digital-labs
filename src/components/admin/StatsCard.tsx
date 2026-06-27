interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  accent: string;
  accentLight: string;
  accentBorder: string;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  accent,
  accentLight,
  accentBorder,
}: StatsCardProps) {
  return (
    <div
      className="relative flex items-start gap-4 p-5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
      style={{
        background: 'rgba(15,23,42,0.7)',
        border: `1px solid ${accentBorder}`,
        boxShadow: `0 4px 20px rgba(0,0,0,0.3), 0 0 30px ${accentLight}`,
      }}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: accentLight, border: `1px solid ${accentBorder}`, color: accent }}
      >
        {icon}
      </div>

      {/* Text */}
      <div>
        <p className="text-slate-400 text-[12px] font-medium uppercase tracking-wider mb-1">
          {title}
        </p>
        <p className="text-white text-2xl font-bold leading-tight">{value}</p>
        {subtitle && (
          <p className="text-slate-500 text-[12px] mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
