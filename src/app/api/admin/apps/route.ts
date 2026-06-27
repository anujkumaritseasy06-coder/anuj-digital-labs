import { NextResponse } from 'next/server';
import { getApps, createApp } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const apps = getApps({
    q: searchParams.get('q') ?? undefined,
    status: searchParams.get('status') ?? undefined,
    category: searchParams.get('category') ?? undefined,
    platform: searchParams.get('platform') ?? undefined,
  });
  return NextResponse.json({ apps });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.name?.trim()) {
      return NextResponse.json({ error: 'App name is required' }, { status: 400 });
    }
    if (!data.shortDescription?.trim()) {
      return NextResponse.json({ error: 'Short description is required' }, { status: 400 });
    }
    if (!data.category) {
      return NextResponse.json({ error: 'Category is required' }, { status: 400 });
    }
    if (!data.platform) {
      return NextResponse.json({ error: 'Platform is required' }, { status: 400 });
    }

    const app = createApp({
      name: data.name.trim(),
      slug: data.slug?.trim() ?? '',
      shortDescription: data.shortDescription.trim(),
      fullDescription: data.fullDescription?.trim() ?? '',
      tagline: data.tagline?.trim() ?? '',
      category: data.category,
      platform: data.platform,
      version: data.version?.trim() ?? '',
      keyFeatures: Array.isArray(data.keyFeatures) ? data.keyFeatures.filter(Boolean) : [],
      benefits: Array.isArray(data.benefits) ? data.benefits : [],
      howItWorks: Array.isArray(data.howItWorks) ? data.howItWorks : [],
      iconUrl: data.iconUrl ?? '',
      bannerUrl: data.bannerUrl?.trim() ?? '',
      screenshots: Array.isArray(data.screenshots) ? data.screenshots : [],
      playStoreUrl: data.playStoreUrl?.trim() ?? '',
      websiteUrl: data.websiteUrl?.trim() ?? '',
      learnMoreHref: data.learnMoreHref?.trim() ?? '',
      privacyPolicyUrl: data.privacyPolicyUrl?.trim() ?? '',
      supportUrl: data.supportUrl?.trim() ?? '',
      publishStatus: data.publishStatus === 'published' ? 'published' : 'draft',
      releaseStatus: data.releaseStatus === 'available' ? 'available' : 'coming-soon',
      featured: Boolean(data.featured),
      displayOrder: Number(data.displayOrder) || 0,
      themeColor: data.themeColor?.trim() ?? '#10b981',
      faqs: Array.isArray(data.faqs) ? data.faqs : [],
      changelog: Array.isArray(data.changelog) ? data.changelog : [],
      seoTitle: data.seoTitle?.trim() ?? '',
      seoDescription: data.seoDescription?.trim() ?? '',
      ogImageUrl: data.ogImageUrl?.trim() ?? '',
    });

    return NextResponse.json({ app }, { status: 201 });
  } catch (err) {
    console.error('Failed to create app:', err);
    return NextResponse.json({ error: 'Failed to create app' }, { status: 500 });
  }
}
