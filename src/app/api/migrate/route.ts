import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { db } from '@/lib/firebase-admin';
import type { AdminApp } from '@/types/admin';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'apps.json');
    if (!fs.existsSync(dataPath)) {
      return NextResponse.json({ message: 'No apps.json found. Skipping migration.' });
    }

    const fileContent = fs.readFileSync(dataPath, 'utf-8');
    const { apps } = JSON.parse(fileContent);

    let migrated = 0;

    for (const app of apps) {
      // 1. Upload local images to Firebase Storage
      const appRef = { ...app } as AdminApp;

      const uploadLocalImage = async (urlStr: string) => {
        if (!urlStr.startsWith('/uploads/')) return urlStr;
        
        const localFilename = urlStr.replace('/uploads/', '');
        const localFilepath = path.join(process.cwd(), 'public', 'uploads', localFilename);
        
        if (fs.existsSync(localFilepath)) {
          console.log('Uploading to Cloudinary:', localFilename, '...');
          const result = await cloudinary.uploader.upload(localFilepath, {
            folder: 'anuj-digital-labs/uploads',
            public_id: localFilename.replace(/\.[^/.]+$/, ''), // remove extension
          });
          return result.secure_url;
        }
        return urlStr;
      };

      // Process icon
      if (appRef.iconUrl) {
        appRef.iconUrl = await uploadLocalImage(appRef.iconUrl);
      }
      // Process banner
      if (appRef.bannerUrl) {
        appRef.bannerUrl = await uploadLocalImage(appRef.bannerUrl);
      }
      // Process screenshots
      if (appRef.screenshots && appRef.screenshots.length > 0) {
        for (let i = 0; i < appRef.screenshots.length; i++) {
          appRef.screenshots[i] = await uploadLocalImage(appRef.screenshots[i]);
        }
      }

      // 2. Save to Firestore
      await db.collection('apps').doc(appRef.id).set(appRef);
      migrated++;
    }

    // 3. Rename apps.json to prevent double-migration
    fs.renameSync(dataPath, dataPath + '.migrated');

    return NextResponse.json({ message: `Successfully migrated ${migrated} apps.` });
  } catch (error: any) {
    console.error('Migration error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
