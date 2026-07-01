import { NextResponse } from 'next/server';
import { getApps, createApp } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const apps = await getApps({
    q: searchParams.get('q') ?? undefined,
    status: searchParams.get('status') ?? undefined,
    category: searchParams.get('category') ?? undefined,
  });
  return NextResponse.json({ apps });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.name?.trim()) {
      return NextResponse.json({ error: 'App name is required' }, { status: 400 });
    }
    if (!data.category) {
      return NextResponse.json({ error: 'Category is required' }, { status: 400 });
    }
    if (!data.bannerUrl?.trim()) {
      return NextResponse.json({ error: 'Banner image is required' }, { status: 400 });
    }

    const app = await createApp({
      name: data.name.trim(),
      category: data.category,
      bannerUrl: data.bannerUrl.trim(),
      playStoreUrl: data.playStoreUrl?.trim() ?? '',
      websiteUrl: data.websiteUrl?.trim() ?? '',
      publishStatus: data.publishStatus === 'published' ? 'published' : 'draft',
      releaseStatus: data.releaseStatus === 'available' ? 'available' : 'coming-soon',
      featured: Boolean(data.featured),
      displayOrder: Number(data.displayOrder) || 0,
      themeColor: data.themeColor?.trim() || '#10b981',
      hoverColor: data.hoverColor?.trim() || '#34d399',
    });

    return NextResponse.json({ app }, { status: 201 });
  } catch (err) {
    console.error('Failed to create app:', err);
    return NextResponse.json({ error: 'Failed to create app' }, { status: 500 });
  }
}
