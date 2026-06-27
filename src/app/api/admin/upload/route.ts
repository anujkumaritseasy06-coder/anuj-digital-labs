import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB raw input limit
const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

// ── Compression settings ────────────────────────────────────────────────────
// Icons are square — compress to 512×512 max
// Screenshots — compress to 1080px wide max, quality 80
// All output as WebP for best size/quality ratio

const ICON_MAX_PX = 512;
const SCREENSHOT_MAX_PX = 1080;
const WEBP_QUALITY = 82;          // 0-100, 82 is excellent quality at ~10× smaller size
const MAX_OUTPUT_BYTES = 300_000; // Try to stay under 300 KB

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    // Optional hint: 'icon' for square app icons, 'screenshot' for screenshots
    const hint = (formData.get('hint') as string | null) ?? 'screenshot';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    if (!ALLOWED_MIME.has(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPEG, PNG, WebP, GIF.' },
        { status: 400 }
      );
    }
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { error: `File too large. Maximum input size is ${MAX_SIZE_BYTES / 1024 / 1024} MB.` },
        { status: 400 }
      );
    }

    // Ensure upload directory exists
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    const inputBuffer = Buffer.from(await file.arrayBuffer());

    // ── Process with sharp ──────────────────────────────────────────────────
    const isIcon = hint === 'icon';
    const maxPx = isIcon ? ICON_MAX_PX : SCREENSHOT_MAX_PX;

    let pipeline = sharp(inputBuffer);

    // Get metadata to decide resize strategy
    const meta = await pipeline.metadata();
    const { width = 0, height = 0 } = meta;

    if (isIcon) {
      // Icons: resize to fit within 512×512, keep aspect, no upscale
      if (width > ICON_MAX_PX || height > ICON_MAX_PX) {
        pipeline = pipeline.resize(ICON_MAX_PX, ICON_MAX_PX, {
          fit: 'inside',
          withoutEnlargement: true,
        });
      }
    } else {
      // Screenshots: resize width to max 1080px, keep aspect, no upscale
      if (width > maxPx) {
        pipeline = pipeline.resize(maxPx, undefined, {
          fit: 'inside',
          withoutEnlargement: true,
        });
      }
    }

    // Convert to WebP
    const outputBuffer = await pipeline
      .webp({ quality: WEBP_QUALITY, effort: 4 })
      .toBuffer();

    // ── Save file ───────────────────────────────────────────────────────────
    const filename = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.webp`;
    const filepath = path.join(UPLOAD_DIR, filename);
    fs.writeFileSync(filepath, outputBuffer);

    // Build response with size info
    const originalKB = Math.round(file.size / 1024);
    const compressedKB = Math.round(outputBuffer.length / 1024);
    const savedPct = Math.round((1 - outputBuffer.length / file.size) * 100);

    return NextResponse.json({
      url: `/uploads/${filename}`,
      filename,
      originalSize: file.size,
      compressedSize: outputBuffer.length,
      // Human-readable summary for admin UI
      summary: `${originalKB} KB → ${compressedKB} KB (saved ${savedPct}%)`,
    });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
