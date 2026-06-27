import { NextResponse } from 'next/server';
import { getApp, updateApp, deleteApp } from '@/lib/db';

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: RouteParams) {
  const { id } = await params;
  const app = await getApp(id);
  if (!app) return NextResponse.json({ error: 'App not found' }, { status: 404 });
  return NextResponse.json({ app });
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const data = await request.json();
    const app = await updateApp(id, data);
    if (!app) return NextResponse.json({ error: 'App not found' }, { status: 404 });
    return NextResponse.json({ app });
  } catch (err) {
    console.error('Failed to update app:', err);
    return NextResponse.json({ error: 'Failed to update app' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: RouteParams) {
  const { id } = await params;
  const deleted = await deleteApp(id);
  if (!deleted) return NextResponse.json({ error: 'App not found' }, { status: 404 });
  return NextResponse.json({ ok: true });
}
