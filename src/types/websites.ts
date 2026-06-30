/**
 * websites.ts — Type definitions for the Website Portfolio Management System.
 */

// ── Shared enums ────────────────────────────────────────────────────────────

export type WebsiteCategory =
  | 'Business'
  | 'Restaurant'
  | 'Education'
  | 'Healthcare'
  | 'Portfolio'
  | 'Landing Page'
  | 'Corporate'
  | 'Ecommerce'
  | 'Blog'
  | 'Calculator'
  | 'Tools'
  | 'SaaS'
  | 'AI'
  | 'Government'
  | 'Personal'
  | 'NGO'
  | 'Other';

export type PublishStatus = 'draft' | 'published';

export type WebsiteBadgeType =
  | 'Featured Project'
  | 'Premium Project'
  | 'Editor\'s Choice'
  | 'Innovation'
  | 'Trending'
  | 'Excellence'
  | 'Signature Project'
  | 'New'
  | 'None';

// ── Rich content types ───────────────────────────────────────────────────────

export interface WebsiteScores {
  performance: number; // 0-100
  accessibility: number; // 0-100
  seo: number; // 0-100
  security: number; // 0-100
  bestPractices: number; // 0-100
}

export interface WebsiteFeature {
  icon: string; // emoji or icon name
  title: string;
  description: string;
}

export interface WebsiteDesignProcess {
  colors: { hex: string; name: string }[];
  typography: { family: string; usage: string }[];
}

export interface WebsiteGallery {
  desktopScreenshots: string[];
  tabletScreenshots: string[];
  mobileScreenshots: string[];
}

// ── Admin Website ────────────────────────────────────────────────────────────

export interface AdminWebsite {
  /** UUID — generated on creation, never changes */
  id: string;

  /** URL-safe slug — auto-generated from name */
  slug: string;

  // ── Basic
  name: string;
  shortDescription: string;
  fullDescription: string;
  tagline: string;
  category: WebsiteCategory;
  industry: string;
  clientName: string;
  completionDate: string; // ISO date string or generic format
  projectDuration: string;
  developerNotes: string;
  
  // ── Tech
  techStack: string[];

  // ── Features
  features: WebsiteFeature[];
  designProcess: WebsiteDesignProcess;

  // ── Media
  thumbnailUrl: string; // Used for cards
  gallery: WebsiteGallery;

  // ── Links
  websiteUrl: string;
  sourceCodeUrl: string;
  caseStudyUrl: string;

  // ── Status
  publishStatus: PublishStatus;
  
  // ── Metrics
  scores: WebsiteScores;

  // ── Settings
  badges: WebsiteBadgeType[];
  displayOrder: number;
  themeColor: string;
  tags: string[];

  // ── SEO
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  ogImageUrl: string;

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
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  tagline: string;
  category: WebsiteCategory;
  industry: string;
  clientName: string;
  completionDate: string;
  techStack: string[];
  features: WebsiteFeature[];
  designProcess: WebsiteDesignProcess;
  thumbnailUrl: string;
  gallery: WebsiteGallery;
  websiteUrl: string;
  sourceCodeUrl: string;
  caseStudyUrl: string;
  scores: WebsiteScores;
  badges: WebsiteBadgeType[];
  themeColor: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  ogImageUrl: string;
  updatedAt: string;
}
