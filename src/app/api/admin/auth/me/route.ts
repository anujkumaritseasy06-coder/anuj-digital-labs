import { NextResponse } from 'next/server';

// Middleware already verified the token before this handler runs.
// If we reach here, the session is valid.
export async function GET() {
  return NextResponse.json({ ok: true });
}
