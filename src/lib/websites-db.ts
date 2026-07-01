/**
 * websites-db.ts — Firebase Firestore data access layer for Websites.
 */

import { db } from './firebase-admin';
import type { AdminWebsite, WebsiteStoreStats } from '@/types/websites';

const WEBSITES_COLLECTION = 'websites';
const META_COLLECTION = 'meta_websites';

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
        a.name.toLowerCase().includes(q)
    );
  }

  return result.sort(
    (a, b) =>
      (a.sortOrder ?? 0) - (b.sortOrder ?? 0) ||
      a.name.localeCompare(b.name)
  );
}

/** Return a single website by ID, or null. */
export async function getWebsite(id: string): Promise<AdminWebsite | null> {
  const doc = await db.collection(WEBSITES_COLLECTION).doc(id).get();
  return doc.exists ? (doc.data() as AdminWebsite) : null;
}

/** Create a new website. ID and timestamps are auto-assigned. */
export async function createWebsite(
  data: Omit<AdminWebsite, 'id' | 'createdAt' | 'updatedAt'>
): Promise<AdminWebsite> {
  const now = new Date().toISOString();
  const id = crypto.randomUUID();

  const website: AdminWebsite = {
    ...data,
    id,
    createdAt: now,
    updatedAt: now,
    featured: data.featured ?? false,
    sortOrder: data.sortOrder ?? 0,
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

  const updates: any = {
    ...data,
    updatedAt: now,
  };

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
    (a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return (a.sortOrder ?? 0) - (b.sortOrder ?? 0) || a.name.localeCompare(b.name);
    }
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
