"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { updates, type UpdateCategory } from "@/data/updates";

/** Category metadata */
const categoryMeta: Record<UpdateCategory, { label: string; color: string; bg: string; border: string }> = {
  announcement: { label: "Announcement", color: "#60a5fa", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.25)" },
  release:       { label: "Release",      color: "#34d399", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.25)" },
  maintenance:   { label: "Maintenance",  color: "#fbbf24", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.25)" },
  news:          { label: "News",         color: "#a78bfa", bg: "rgba(139,92,246,0.1)", border: "rgba(139,92,246,0.25)" },
};

/** Category filter chips */
type Filter = UpdateCategory | "all";
const filterOptions: { id: Filter; label: string }[] = [
  { id: "all", label: "All Updates" },
  { id: "announcement", label: "Announcements" },
  { id: "release", label: "Releases" },
  { id: "maintenance", label: "Maintenance" },
  { id: "news", label: "News" },
];

/** Format ISO date to readable string */
function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

/** Update card */
function UpdateCard({ entry }: { entry: (typeof updates)[0] }) {
  const meta = categoryMeta[entry.category];

  return (
    <article
      id={`update-${entry.id}`}
      className="flex flex-col gap-4 p-6 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 group"
      style={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)";
        (e.currentTarget as HTMLElement).style.borderColor = "#cbd5e1";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
        (e.currentTarget as HTMLElement).style.borderColor = "#e2e8f0";
      }}
    >
      {/* Top row: category + date */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full"
          style={{ background: meta.bg, color: meta.color, border: `1px solid ${meta.border}` }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: meta.color }} aria-hidden="true" />
          {meta.label}
        </span>
        <time
          dateTime={entry.date}
          className="text-[12px] font-medium text-slate-400"
        >
          {formatDate(entry.date)}
        </time>
      </div>

      {/* Title */}
      <h2 className="text-[16px] font-bold text-slate-800 leading-snug group-hover:text-emerald-700 transition-colors duration-200">
        {entry.title}
      </h2>

      {/* Excerpt */}
      <p className="text-slate-500 text-[14px] leading-relaxed flex-1">
        {entry.excerpt}
      </p>

      {/* Read More */}
      {entry.slug && (
        <Link
          href={`/updates/${entry.slug}`}
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-emerald-600 hover:text-emerald-700 transition-colors mt-auto"
        >
          Read More
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </article>
  );
}

export default function UpdatesPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const filtered =
    activeFilter === "all"
      ? updates
      : updates.filter((u) => u.category === activeFilter);

  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          badge="What's New"
          title="Latest"
          highlight="Updates"
          description="Product announcements, feature releases, maintenance updates, and company news — all in one place."
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Latest Updates" },
          ]}
        />

        <section
          aria-label="Latest updates feed"
          className="py-16 px-4 sm:px-6 lg:px-8"
          style={{ background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)" }}
        >
          <div className="max-w-7xl mx-auto">
            {/* Filter chips */}
            <div className="flex flex-wrap items-center gap-2 mb-10" role="group" aria-label="Filter updates by category">
              {filterOptions.map((opt) => {
                const isActive = activeFilter === opt.id;
                return (
                  <button
                    key={opt.id}
                    id={`filter-${opt.id}`}
                    onClick={() => setActiveFilter(opt.id)}
                    aria-pressed={isActive}
                    className="text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    style={{
                      background: isActive ? "linear-gradient(135deg, #059669, #10b981)" : "#f1f5f9",
                      color: isActive ? "#ffffff" : "#475569",
                      border: isActive ? "1px solid transparent" : "1px solid #e2e8f0",
                      boxShadow: isActive ? "0 0 16px rgba(16,185,129,0.25)" : "none",
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            {/* Grid or empty state */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-20">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: "#f1f5f9", border: "1px solid #e2e8f0" }}
                  aria-hidden="true"
                >
                  <svg className="w-8 h-8 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <p className="text-slate-500 text-[15px]">No updates in this category yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((entry) => (
                  <UpdateCard key={entry.id} entry={entry} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
