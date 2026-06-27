/**
 * db.ts — Firebase Firestore data access layer.
 *
 * All reads and writes go through this module.
 */

import { db } from './firebase-admin';
import type { AdminApp, StoreStats } from '@/types/admin';

const APPS_COLLECTION = 'apps';
const META_COLLECTION = 'meta';

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
async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  let slug = base;
  let isUnique = false;
  let i = 2;

  while (!isUnique) {
    const snapshot = await db.collection(APPS_COLLECTION).where('slug', '==', slug).get();
    let collision = false;
    snapshot.forEach(doc => {
      if (doc.id !== excludeId) collision = true;
    });

    if (!collision) {
      isUnique = true;
    } else {
      slug = `${base}-${i}`;
      i++;
    }
  }

  return slug;
}

async function updateLastUpdated() {
  await db.collection(META_COLLECTION).doc('stats').set({
    lastUpdated: new Date().toISOString()
  }, { merge: true });
}

// ── Public API ───────────────────────────────────────────────────────────────

export interface AppFilters {
  q?: string;
  status?: string;
  category?: string;
  platform?: string;
}

/** Return all apps, optionally filtered. Sorted by displayOrder then name. */
export async function getApps(filters?: AppFilters): Promise<AdminApp[]> {
  let query: FirebaseFirestore.Query = db.collection(APPS_COLLECTION);

  if (filters?.status && filters.status !== 'all') {
    query = query.where('publishStatus', '==', filters.status);
  }
  if (filters?.category && filters.category !== 'all') {
    query = query.where('category', '==', filters.category);
  }
  if (filters?.platform && filters.platform !== 'all') {
    query = query.where('platform', '==', filters.platform);
  }

  const snapshot = await query.get();
  let result: AdminApp[] = [];
  snapshot.forEach(doc => {
    result.push(doc.data() as AdminApp);
  });

  if (filters?.q) {
    const q = filters.q.toLowerCase();
    result = result.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.shortDescription.toLowerCase().includes(q)
    );
  }

  return result.sort(
    (a, b) =>
      (a.displayOrder ?? 0) - (b.displayOrder ?? 0) ||
      a.name.localeCompare(b.name)
  );
}

/** Return a single app by ID, or null. */
export async function getApp(id: string): Promise<AdminApp | null> {
  const doc = await db.collection(APPS_COLLECTION).doc(id).get();
  return doc.exists ? (doc.data() as AdminApp) : null;
}

/**
 * Return a single published app by slug.
 * Falls back to matching by id for legacy links.
 */
export async function getAppBySlug(slug: string): Promise<AdminApp | null> {
  const snapshot = await db.collection(APPS_COLLECTION)
    .where('publishStatus', '==', 'published')
    .where('slug', '==', slug)
    .limit(1)
    .get();

  if (!snapshot.empty) {
    return snapshot.docs[0].data() as AdminApp;
  }

  // Fallback to matching by id
  const idDoc = await db.collection(APPS_COLLECTION).doc(slug).get();
  if (idDoc.exists) {
    const app = idDoc.data() as AdminApp;
    if (app.publishStatus === 'published') return app;
  }

  return null;
}

/**
 * Return related published apps in the same category, excluding the given id.
 * Returns up to `limit` apps.
 */
export async function getRelatedApps(category: string, excludeId: string, limit = 3): Promise<AdminApp[]> {
  const snapshot = await db.collection(APPS_COLLECTION)
    .where('publishStatus', '==', 'published')
    .where('category', '==', category)
    .get();

  const result: AdminApp[] = [];
  snapshot.forEach(doc => {
    if (doc.id !== excludeId) {
      result.push(doc.data() as AdminApp);
    }
  });

  return result
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
    .slice(0, limit);
}

/** Create a new app. ID, slug, and timestamps are auto-assigned. */
export async function createApp(
  data: Omit<AdminApp, 'id' | 'slug' | 'createdAt' | 'updatedAt'> & { slug?: string }
): Promise<AdminApp> {
  const now = new Date().toISOString();

  const baseSlug = data.slug?.trim()
    ? generateSlug(data.slug)
    : generateSlug(data.name);

  const slug = await uniqueSlug(baseSlug);
  const id = crypto.randomUUID();

  const app: AdminApp = {
    ...data,
    id,
    slug,
    createdAt: now,
    updatedAt: now,
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

  await db.collection(APPS_COLLECTION).doc(id).set(app);
  await updateLastUpdated();
  return app;
}

/** Update an existing app. Returns the updated app or null if not found. */
export async function updateApp(
  id: string,
  data: Partial<Omit<AdminApp, 'id' | 'createdAt'>>
): Promise<AdminApp | null> {
  const docRef = db.collection(APPS_COLLECTION).doc(id);
  const doc = await docRef.get();
  if (!doc.exists) return null;

  const now = new Date().toISOString();
  let slug = data.slug;
  if (slug !== undefined) {
    slug = await uniqueSlug(generateSlug(slug), id);
  }

  const updates: any = {
    ...data,
    updatedAt: now,
  };
  if (slug !== undefined) updates.slug = slug;

  await docRef.update(updates);
  await updateLastUpdated();

  const updatedDoc = await docRef.get();
  return updatedDoc.data() as AdminApp;
}

/** Delete an app by ID. Returns true if deleted, false if not found. */
export async function deleteApp(id: string): Promise<boolean> {
  const docRef = db.collection(APPS_COLLECTION).doc(id);
  const doc = await docRef.get();
  if (!doc.exists) return false;

  await docRef.delete();
  await updateLastUpdated();
  return true;
}

/** Return only published apps — used by the public /apps page. */
export async function getPublishedApps(): Promise<AdminApp[]> {
  const snapshot = await db.collection(APPS_COLLECTION)
    .where('publishStatus', '==', 'published')
    .get();

  const apps: AdminApp[] = [];
  snapshot.forEach(doc => {
    apps.push(doc.data() as AdminApp);
  });

  return apps.sort(
    (a, b) =>
      (a.displayOrder ?? 0) - (b.displayOrder ?? 0) ||
      a.name.localeCompare(b.name)
  );
}

/** Return dashboard stats. */
export async function getStoreStats(): Promise<StoreStats> {
  const snapshot = await db.collection(APPS_COLLECTION).get();
  
  let total = 0;
  let published = 0;
  let draft = 0;

  snapshot.forEach(doc => {
    total++;
    const status = doc.data().publishStatus;
    if (status === 'published') published++;
    if (status === 'draft') draft++;
  });

  let lastUpdated = null;
  const metaDoc = await db.collection(META_COLLECTION).doc('stats').get();
  if (metaDoc.exists) {
    lastUpdated = metaDoc.data()?.lastUpdated || null;
  }

  return {
    total,
    published,
    draft,
    lastUpdated,
  };
}
