/**
 * admin.ts — Type definitions for the Admin Panel.
 *
 * AdminApp is the canonical type stored in data/apps.json.
 * It is a superset of the public AppEntry used by AppCard.
 */

// ── Shared enums ────────────────────────────────────────────────────────────

export type AppCategory =
  | 'Android'
  | 'AI'
  | 'Productivity'
  | 'Business'
  | 'Education'
  | 'Health'
  | 'Finance'
  | 'Utility'
  | 'Calculator'
  | 'Tools'
  | 'Document'
  | 'Scanner'
  | 'Offline'
  | 'Coming Soon'
  | 'Released';

/** Controls whether the app appears on the public /apps page */
export type PublishStatus = 'draft' | 'published';

/** The badge shown on the public app card */
export type ReleaseStatus = 'available' | 'coming-soon';

// ── Admin App ────────────────────────────────────────────────────────────────

export interface AdminApp {
  /** UUID — generated on creation, never changes */
  id: string;

  // ── Basic
  name: string;
  category: AppCategory;

  // ── Media
  bannerUrl: string;        // hero background image

  // ── Links
  playStoreUrl?: string;
  websiteUrl?: string;

  // ── Status
  /** Whether the app is visible on the public site */
  publishStatus: PublishStatus;
  /** The "Available / Coming Soon" badge shown on the public card */
  releaseStatus: ReleaseStatus;

  // ── Settings
  featured: boolean;
  displayOrder: number;
  themeColor?: string;
  hoverColor?: string;

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

// ── Public-facing shape consumed by AppCard ──────────────────────────────────

export interface PublicAppEntry {
  id: string;
  name: string;
  category: AppCategory;
  /** Maps from AdminApp.releaseStatus */
  status: ReleaseStatus;
  bannerUrl: string;
  playStoreUrl?: string;
  websiteUrl?: string;
  updatedAt: string;
  featured: boolean;
  themeColor?: string;
  hoverColor?: string;
}
