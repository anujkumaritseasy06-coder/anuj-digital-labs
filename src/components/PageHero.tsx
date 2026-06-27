import Link from "next/link";

const Logo = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="40" height="40" rx="10" fill="#1e3a8a" />
    <path
      d="M8 28 L14 12 L20 24 L26 12 L32 28"
      stroke="#10b981"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <circle cx="20" cy="20" r="3" fill="#ffffff" opacity="0.8" />
  </svg>
);

interface PageHeroProps {
  badge: string;
  title: string;
  highlight?: string;
  titleSuffix?: string;
  description: string;
  breadcrumb: { label: string; href?: string }[];
}

export function PageHero({
  badge,
  title,
  highlight,
  titleSuffix,
  description,
  breadcrumb,
}: PageHeroProps) {
  return (
    <section
      className="relative overflow-hidden pt-32 pb-20 px-4 sm:px-6 lg:px-8"
      style={{ background: "linear-gradient(135deg, #020617 0%, #0f172a 40%, #1a1040 70%, #0d2550 100%)" }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 hero-grid opacity-40 pointer-events-none" aria-hidden="true" />
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.12), transparent)" }} />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.10), transparent)" }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex justify-center items-center gap-2 text-sm text-blue-200/60 mb-6">
          {breadcrumb.map((crumb, i) => (
            <span key={crumb.label} className="flex items-center gap-2">
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-emerald-400 transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-white/80">{crumb.label}</span>
              )}
              {i < breadcrumb.length - 1 && (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </span>
          ))}
        </nav>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-400/20 text-emerald-300 text-sm font-medium mb-6">
          <span className="w-2 h-2 bg-emerald-400 rounded-full" aria-hidden="true" />
          {badge}
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
          {title}{" "}
          {highlight && <span className="text-emerald-400">{highlight}</span>}
          {titleSuffix && <> {titleSuffix}</>}
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-blue-100/75 leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full h-12 lg:h-16">
          <path d="M0 60V30C240 0 480 60 720 30C960 0 1200 60 1440 30V60H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}

export { Logo };
