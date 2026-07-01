/**
 * websites.ts — Type definitions for the Website Portfolio Management System.
 */

// ── Shared enums ────────────────────────────────────────────────────────────

export type WebsiteCategory =
  | 'Corporate'
  | 'Business'
  | 'Restaurant'
  | 'Education'
  | 'Healthcare'
  | 'Portfolio'
  | 'Landing Page'
  | 'Ecommerce'
  | 'Blog'
  | 'Calculator'
  | 'Tools'
  | 'AI'
  | 'Government'
  | 'Personal'
  | 'Other';

export type PublishStatus = 'draft' | 'published';

// ── Admin Website ────────────────────────────────────────────────────────────

export interface AdminWebsite {
  /** UUID — generated on creation, never changes */
  id: string;

  // ── Basic
  name: string;
  category: WebsiteCategory;
  
  // ── Media
  bannerImage: string; 

  // ── Links
  websiteUrl: string;

  // ── Settings
  featured: boolean;
  sortOrder: number;
  themeColor?: string;
  hoverColor?: string;

  // ── Status
  publishStatus: PublishStatus;
  
  // ── Timestamps
  createdAt: string;
  updatedAt: string;
}

// ── Dashboard stats ──────────────────────────────────────────────────────────

export interface WebsiteStoreStats {
  total: number;
  published: number;
  draft: number;
  archived: number;
  lastUpdated: string | null;
}

export interface PublicWebsiteEntry {
  id: string;
  name: string;
  category: WebsiteCategory;
  bannerImage: string;
  websiteUrl: string;
  featured: boolean;
  sortOrder: number;
  publishStatus: PublishStatus;
  updatedAt: string;
  themeColor?: string;
  hoverColor?: string;
}
