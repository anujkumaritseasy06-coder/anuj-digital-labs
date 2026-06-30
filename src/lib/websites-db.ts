/**
 * websites-db.ts — Firebase Firestore data access layer for Websites.
 */

import { db } from './firebase-admin';
import type { AdminWebsite, WebsiteStoreStats } from '@/types/websites';

const WEBSITES_COLLECTION = 'websites';
const META_COLLECTION = 'meta_websites';

/**
 * Generate a URL-safe slug from a website name.
 */
export function generateWebsiteSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Ensure a slug is unique among existing websites.
 */
async function uniqueWebsiteSlug(base: string, excludeId?: string): Promise<string> {
  let slug = base;
  let isUnique = false;
  let i = 2;

  while (!isUnique) {
    const snapshot = await db.collection(WEBSITES_COLLECTION).where('slug', '==', slug).get();
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

export interface WebsiteFilters {
  q?: string;
  status?: string;
  category?: string;
}

/** Return all websites, optionally filtered. Sorted by displayOrder then name. */
export async function getWebsites(filters?: WebsiteFilters): Promise<AdminWebsite[]> {
  let query: FirebaseFirestore.Query = db.collection(WEBSITES_COLLECTION);

  if (filters?.status && filters.status !== 'all') {
    query = query.where('publishStatus', '==', filters.status);
  }
  if (filters?.category && filters.category !== 'all') {
    query = query.where('category', '==', filters.category);
  }

  const snapshot = await query.get();
  let result: AdminWebsite[] = [];
  snapshot.forEach(doc => {
    result.push(doc.data() as AdminWebsite);
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

/** Return a single website by ID, or null. */
export async function getWebsite(id: string): Promise<AdminWebsite | null> {
  const doc = await db.collection(WEBSITES_COLLECTION).doc(id).get();
  return doc.exists ? (doc.data() as AdminWebsite) : null;
}

/**
 * Return a single published website by slug.
 * Falls back to matching by id for legacy links.
 */
export async function getWebsiteBySlug(slug: string): Promise<AdminWebsite | null> {
  const snapshot = await db.collection(WEBSITES_COLLECTION)
    .where('publishStatus', '==', 'published')
    .where('slug', '==', slug)
    .limit(1)
    .get();

  if (!snapshot.empty) {
    return snapshot.docs[0].data() as AdminWebsite;
  }

  // Fallback to matching by id
  const idDoc = await db.collection(WEBSITES_COLLECTION).doc(slug).get();
  if (idDoc.exists) {
    const site = idDoc.data() as AdminWebsite;
    if (site.publishStatus === 'published') return site;
  }

  return null;
}

/** Create a new website. ID, slug, and timestamps are auto-assigned. */
export async function createWebsite(
  data: Omit<AdminWebsite, 'id' | 'slug' | 'createdAt' | 'updatedAt'> & { slug?: string }
): Promise<AdminWebsite> {
  const now = new Date().toISOString();

  const baseSlug = data.slug?.trim()
    ? generateWebsiteSlug(data.slug)
    : generateWebsiteSlug(data.name);

  const slug = await uniqueWebsiteSlug(baseSlug);
  const id = crypto.randomUUID();

  const website: AdminWebsite = {
    ...data,
    id,
    slug,
    createdAt: now,
    updatedAt: now,
    techStack: data.techStack ?? [],
    features: data.features ?? [],
    designProcess: data.designProcess ?? { colors: [], typography: [] },
    gallery: data.gallery ?? { desktopScreenshots: [], tabletScreenshots: [], mobileScreenshots: [] },
    scores: data.scores ?? { performance: 0, accessibility: 0, seo: 0, security: 0, bestPractices: 0 },
    badges: data.badges ?? [],
    tags: data.tags ?? [],
    themeColor: data.themeColor ?? '#10b981',
    ogImageUrl: data.ogImageUrl ?? '',
  };

  await db.collection(WEBSITES_COLLECTION).doc(id).set(website);
  await updateLastUpdated();
  return website;
}

/** Update an existing website. Returns the updated website or null if not found. */
export async function updateWebsite(
  id: string,
  data: Partial<Omit<AdminWebsite, 'id' | 'createdAt'>>
): Promise<AdminWebsite | null> {
  const docRef = db.collection(WEBSITES_COLLECTION).doc(id);
  const doc = await docRef.get();
  if (!doc.exists) return null;

  const now = new Date().toISOString();
  let slug = data.slug;
  if (slug !== undefined) {
    slug = await uniqueWebsiteSlug(generateWebsiteSlug(slug), id);
  }

  const updates: any = {
    ...data,
    updatedAt: now,
  };
  if (slug !== undefined) updates.slug = slug;

  await docRef.update(updates);
  await updateLastUpdated();

  const updatedDoc = await docRef.get();
  return updatedDoc.data() as AdminWebsite;
}

/** Delete a website by ID. Returns true if deleted, false if not found. */
export async function deleteWebsite(id: string): Promise<boolean> {
  const docRef = db.collection(WEBSITES_COLLECTION).doc(id);
  const doc = await docRef.get();
  if (!doc.exists) return false;

  await docRef.delete();
  await updateLastUpdated();
  return true;
}

/** Return only published websites — used by the public /websites page. */
export async function getPublishedWebsites(): Promise<AdminWebsite[]> {
  const snapshot = await db.collection(WEBSITES_COLLECTION)
    .where('publishStatus', '==', 'published')
    .get();

  const websites: AdminWebsite[] = [];
  snapshot.forEach(doc => {
    websites.push(doc.data() as AdminWebsite);
  });

  return websites.sort(
    (a, b) =>
      (a.displayOrder ?? 0) - (b.displayOrder ?? 0) ||
      a.name.localeCompare(b.name)
  );
}

/** Return dashboard stats for websites. */
export async function getWebsiteStoreStats(): Promise<WebsiteStoreStats> {
  const snapshot = await db.collection(WEBSITES_COLLECTION).get();
  
  let total = 0;
  let published = 0;
  let draft = 0;
  let archived = 0;

  snapshot.forEach(doc => {
    total++;
    const status = doc.data().publishStatus;
    if (status === 'published') published++;
    if (status === 'draft') draft++;
    if (status === 'archived') archived++;
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
    archived,
    lastUpdated,
  };
}
