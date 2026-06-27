/**
 * admin.ts — Type definitions for the Admin Panel.
 *
 * AdminApp is the canonical type stored in data/apps.json.
 * It is a superset of the public AppEntry used by AppCard.
 */

// ── Shared enums ────────────────────────────────────────────────────────────

export type AppPlatform = 'Android' | 'Web' | 'Android & Web';

export type AppCategory =
  | 'Productivity'
  | 'Utilities'
  | 'Business'
  | 'AI Tools'
  | 'Finance'
  | 'Education'
  | 'Health'
  | 'Lifestyle'
  | 'Other';

/** Controls whether the app appears on the public /apps page */
export type PublishStatus = 'draft' | 'published';

/** The badge shown on the public app card */
export type ReleaseStatus = 'available' | 'coming-soon';

// ── Rich content types ───────────────────────────────────────────────────────

export interface AppBenefit {
  icon: string;       // emoji or icon name
  title: string;
  description: string;
}

export interface AppStep {
  icon: string;       // emoji or icon name
  title: string;
  description: string;
}

export interface AppFAQ {
  question: string;
  answer: string;
}

export interface AppChangelog {
  version: string;
  date: string;
  whatsNew: string[];
  bugFixes: string[];
}

// ── Admin App ────────────────────────────────────────────────────────────────

export interface AdminApp {
  /** UUID — generated on creation, never changes */
  id: string;

  /** URL-safe slug — auto-generated from name, e.g. "form-ready" */
  slug: string;

  // ── Basic
  name: string;
  shortDescription: string;
  fullDescription: string;
  tagline: string;          // catchy one-liner for the detail page hero
  category: AppCategory;
  platform: AppPlatform;
  version: string;

  // ── Features & Content
  keyFeatures: string[];
  benefits: AppBenefit[];
  howItWorks: AppStep[];

  // ── Media
  iconUrl: string;
  bannerUrl: string;        // hero background image
  screenshots: string[];

  // ── Links
  playStoreUrl: string;
  websiteUrl: string;
  learnMoreHref: string;
  privacyPolicyUrl: string;
  supportUrl: string;

  // ── Status
  /** Whether the app is visible on the public site */
  publishStatus: PublishStatus;
  /** The "Available / Coming Soon" badge shown on the public card */
  releaseStatus: ReleaseStatus;

  // ── Settings
  featured: boolean;
  displayOrder: number;
  themeColor: string;       // hex color for accent glow, e.g. "#10b981"

  // ── Rich content
  faqs: AppFAQ[];
  changelog: AppChangelog[];

  // ── SEO
  seoTitle: string;
  seoDescription: string;
  ogImageUrl: string;

  // ── Timestamps
  createdAt: string;
  updatedAt: string;
}

// ── JSON store root shape ────────────────────────────────────────────────────

export interface AppStore {
  apps: AdminApp[];
  lastUpdated: string | null;
}

// ── Dashboard stats ──────────────────────────────────────────────────────────

export interface StoreStats {
  total: number;
  published: number;
  draft: number;
  lastUpdated: string | null;
}

// ── Public-facing shape consumed by AppCard + App Detail page ────────────────

export interface PublicAppEntry {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  tagline: string;
  category: AppCategory;
  platform: AppPlatform;
  version: string;
  keyFeatures: string[];
  benefits: AppBenefit[];
  howItWorks: AppStep[];
  /** Maps from AdminApp.releaseStatus */
  status: ReleaseStatus;
  iconUrl?: string;
  bannerUrl?: string;
  screenshots: string[];
  playStoreUrl?: string;
  websiteUrl?: string;
  learnMoreHref?: string;
  privacyPolicyUrl?: string;
  supportUrl?: string;
  themeColor: string;
  faqs: AppFAQ[];
  changelog: AppChangelog[];
  seoTitle: string;
  seoDescription: string;
  ogImageUrl?: string;
  updatedAt: string;
  featured: boolean;
}
