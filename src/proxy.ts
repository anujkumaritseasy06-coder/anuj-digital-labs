/**
 * proxy.ts — Edge proxy for admin route protection.
 *
 * Protects:
 *   /admin/*          → redirect to /admin/login if no valid token
 *   /api/admin/*      → return 401 if no valid token
 *
 * Allows without auth:
 *   /admin/login
 *   /api/admin/auth/* (login/logout/me)
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const COOKIE_NAME = 'adl_admin_token';

async function isValidToken(token: string): Promise<boolean> {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Public paths — always allow ──────────────────────────────────────────
  if (
    pathname === '/admin/login' ||
    pathname.startsWith('/api/admin/auth/')
  ) {
    return NextResponse.next();
  }

  // ── Check token ──────────────────────────────────────────────────────────
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const valid = token ? await isValidToken(token) : false;

  if (!valid) {
    // API routes → 401 JSON
    if (pathname.startsWith('/api/admin/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // Admin pages → redirect to login
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
