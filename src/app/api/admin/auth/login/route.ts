import { NextResponse } from 'next/server';
import { signToken, COOKIE_BASE } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body as { username?: string; password?: string };

    const validUser = username === process.env.ADMIN_USERNAME;
    const validPass = password === process.env.ADMIN_PASSWORD;

    if (!validUser || !validPass) {
      // Constant-time delay to prevent timing attacks
      await new Promise((r) => setTimeout(r, 500 + Math.random() * 200));
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = await signToken({ username: username! });

    const response = NextResponse.json({ ok: true });
    response.cookies.set({ ...COOKIE_BASE, value: token });
    return response;
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
