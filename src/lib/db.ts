/**
 * db.ts — Firebase Firestore data access layer for Apps.
 *
 * All reads and writes go through this module.
 */

import { db } from './firebase-admin';
import type { AdminApp, StoreStats } from '@/types/admin';

const APPS_COLLECTION = 'apps';
const META_COLLECTION = 'meta';

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

  const snapshot = await query.get();
  let result: AdminApp[] = [];
  snapshot.forEach(doc => {
    result.push(doc.data() as AdminApp);
  });

  if (filters?.q) {
    const q = filters.q.toLowerCase();
    result = result.filter(
      (a) => a.name.toLowerCase().includes(q)
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

/** Create a new app. ID and timestamps are auto-assigned. */
export async function createApp(
  data: Omit<AdminApp, 'id' | 'createdAt' | 'updatedAt'>
): Promise<AdminApp> {
  const now = new Date().toISOString();
  const id = crypto.randomUUID();

  const app: AdminApp = {
    ...data,
    id,
    createdAt: now,
    updatedAt: now,
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
  const updates: any = {
    ...data,
    updatedAt: now,
  };

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
