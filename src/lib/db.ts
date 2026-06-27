/**
 * db.ts — JSON-file data access layer.
 *
 * All reads and writes go through this module.
 * The data file is located at: <project-root>/data/apps.json
 *
 * NOTE ON DEPLOYMENT:
 * This module uses Node.js `fs` — it must only be imported in:
 *   - Next.js Route Handlers (server-only)
 *   - Next.js Server Components
 *   - NOT client components, NOT middleware (Edge)
 */

import fs from 'fs';
import path from 'path';
import type { AdminApp, AppStore, StoreStats } from '@/types/admin';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_PATH = path.join(DATA_DIR, 'apps.json');

// ── Internal helpers ─────────────────────────────────────────────────────────

function ensureDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readStore(): AppStore {
  ensureDir();
  if (!fs.existsSync(DATA_PATH)) {
    const initial: AppStore = { apps: [], lastUpdated: null };
    fs.writeFileSync(DATA_PATH, JSON.stringify(initial, null, 2), 'utf-8');
    return initial;
  }
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8')) as AppStore;
  } catch {
    return { apps: [], lastUpdated: null };
  }
}

function writeStore(store: AppStore): void {
  ensureDir();
  // Atomic write: write to tmp then rename
  const tmp = DATA_PATH + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(store, null, 2), 'utf-8');
  fs.renameSync(tmp, DATA_PATH);
}

/**
 * Generate a URL-safe slug from an app name.
 * e.g. "FormReady Pro" → "formready-pro"
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Ensure a slug is unique among existing apps (excluding a given app id).
 * If the slug is taken, appends -2, -3, etc.
 */
function uniqueSlug(store: AppStore, base: string, excludeId?: string): string {
  const existing = store.apps
    .filter((a) => a.id !== excludeId)
    .map((a) => a.slug);

  if (!existing.includes(base)) return base;

  let i = 2;
  while (existing.includes(`${base}-${i}`)) i++;
  return `${base}-${i}`;
}

// ── Public API ───────────────────────────────────────────────────────────────

export interface AppFilters {
  q?: string;
  status?: string;
  category?: string;
  platform?: string;
}

/** Return all apps, optionally filtered. Sorted by displayOrder then name. */
export function getApps(filters?: AppFilters): AdminApp[] {
  const { apps } = readStore();
  let result = [...apps];

  if (filters?.q) {
    const q = filters.q.toLowerCase();
    result = result.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.shortDescription.toLowerCase().includes(q)
    );
  }
  if (filters?.status && filters.status !== 'all') {
    result = result.filter((a) => a.publishStatus === filters.status);
  }
  if (filters?.category && filters.category !== 'all') {
    result = result.filter((a) => a.category === filters.category);
  }
  if (filters?.platform && filters.platform !== 'all') {
    result = result.filter((a) => a.platform === filters.platform);
  }

  return result.sort(
    (a, b) =>
      (a.displayOrder ?? 0) - (b.displayOrder ?? 0) ||
      a.name.localeCompare(b.name)
  );
}

/** Return a single app by ID, or null. */
export function getApp(id: string): AdminApp | null {
  const { apps } = readStore();
  return apps.find((a) => a.id === id) ?? null;
}

/**
 * Return a single published app by slug.
 * Falls back to matching by id for legacy links.
 */
export function getAppBySlug(slug: string): AdminApp | null {
  const { apps } = readStore();
  return (
    apps.find((a) => a.slug === slug && a.publishStatus === 'published') ??
    apps.find((a) => a.id === slug && a.publishStatus === 'published') ??
    null
  );
}

/**
 * Return related published apps in the same category, excluding the given id.
 * Returns up to `limit` apps.
 */
export function getRelatedApps(category: string, excludeId: string, limit = 3): AdminApp[] {
  const { apps } = readStore();
  return apps
    .filter(
      (a) =>
        a.publishStatus === 'published' &&
        a.category === category &&
        a.id !== excludeId
    )
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
    .slice(0, limit);
}

/** Create a new app. ID, slug, and timestamps are auto-assigned. */
export function createApp(
  data: Omit<AdminApp, 'id' | 'slug' | 'createdAt' | 'updatedAt'> & { slug?: string }
): AdminApp {
  const store = readStore();
  const now = new Date().toISOString();

  const baseSlug = data.slug?.trim()
    ? generateSlug(data.slug)
    : generateSlug(data.name);

  const slug = uniqueSlug(store, baseSlug);

  const app: AdminApp = {
    ...data,
    id: crypto.randomUUID(),
    slug,
    createdAt: now,
    updatedAt: now,
    // Ensure all new optional arrays have defaults
    benefits: data.benefits ?? [],
    howItWorks: data.howItWorks ?? [],
    faqs: data.faqs ?? [],
    changelog: data.changelog ?? [],
    tagline: data.tagline ?? '',
    bannerUrl: data.bannerUrl ?? '',
    themeColor: data.themeColor ?? '#10b981',
    privacyPolicyUrl: data.privacyPolicyUrl ?? '',
    supportUrl: data.supportUrl ?? '',
    ogImageUrl: data.ogImageUrl ?? '',
  };
  store.apps.push(app);
  store.lastUpdated = now;
  writeStore(store);
  return app;
}

/** Update an existing app. Returns the updated app or null if not found. */
export function updateApp(
  id: string,
  data: Partial<Omit<AdminApp, 'id' | 'createdAt'>>
): AdminApp | null {
  const store = readStore();
  const idx = store.apps.findIndex((a) => a.id === id);
  if (idx === -1) return null;
  const now = new Date().toISOString();

  // If slug is being changed, ensure uniqueness
  let slug = data.slug;
  if (slug !== undefined) {
    slug = uniqueSlug(store, generateSlug(slug), id);
  }

  store.apps[idx] = {
    ...store.apps[idx],
    ...data,
    ...(slug !== undefined ? { slug } : {}),
    updatedAt: now,
  };
  store.lastUpdated = now;
  writeStore(store);
  return store.apps[idx];
}

/** Delete an app by ID. Returns true if deleted, false if not found. */
export function deleteApp(id: string): boolean {
  const store = readStore();
  const before = store.apps.length;
  store.apps = store.apps.filter((a) => a.id !== id);
  if (store.apps.length === before) return false;
  store.lastUpdated = new Date().toISOString();
  writeStore(store);
  return true;
}

/** Return only published apps — used by the public /apps page. */
export function getPublishedApps(): AdminApp[] {
  const { apps } = readStore();
  return apps
    .filter((a) => a.publishStatus === 'published')
    .sort(
      (a, b) =>
        (a.displayOrder ?? 0) - (b.displayOrder ?? 0) ||
        a.name.localeCompare(b.name)
    );
}

/** Return dashboard stats. */
export function getStoreStats(): StoreStats {
  const { apps, lastUpdated } = readStore();
  return {
    total: apps.length,
    published: apps.filter((a) => a.publishStatus === 'published').length,
    draft: apps.filter((a) => a.publishStatus === 'draft').length,
    lastUpdated,
  };
}
