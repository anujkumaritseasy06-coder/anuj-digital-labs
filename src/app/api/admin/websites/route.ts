import { NextResponse } from 'next/server';
import { getWebsites, createWebsite } from '@/lib/websites-db';

export async function GET(request: Request) {
  try {

    const { searchParams } = new URL(request.url);
    const filters = {
      q: searchParams.get('q') || undefined,
      status: searchParams.get('status') || undefined,
      category: searchParams.get('category') || undefined,
    };

    const websites = await getWebsites(filters);
    return NextResponse.json(websites);
  } catch (error) {
    console.error('Error in GET /api/admin/websites:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {

    const body = await request.json();
    const website = await createWebsite(body);

    return NextResponse.json(website, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admin/websites:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
