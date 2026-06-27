import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

export async function GET() {
  if (!fs.existsSync(UPLOAD_DIR)) {
    return NextResponse.json({ files: [] });
  }

  const files = fs
    .readdirSync(UPLOAD_DIR)
    .filter((f) => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
    .map((f) => {
      const stat = fs.statSync(path.join(UPLOAD_DIR, f));
      return {
        name: f,
        url: `/uploads/${f}`,
        size: stat.size,
        createdAt: stat.birthtime.toISOString(),
      };
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return NextResponse.json({ files });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  // Prevent directory traversal
  if (!name || name.includes('..') || name.includes('/') || name.includes('\\')) {
    return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
  }

  const filepath = path.join(UPLOAD_DIR, name);
  if (!fs.existsSync(filepath)) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  fs.unlinkSync(filepath);
  return NextResponse.json({ ok: true });
}
