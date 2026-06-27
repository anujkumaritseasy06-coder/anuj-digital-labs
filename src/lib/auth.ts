/**
 * auth.ts — JWT signing, verification, and cookie utilities.
 * Uses `jose` (Edge-compatible) — no native crypto bindings.
 */

import { SignJWT, jwtVerify } from 'jose';

export const COOKIE_NAME = 'adl_admin_token';
const EXPIRY = '8h';

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET environment variable is not set');
  return new TextEncoder().encode(secret);
}

/**
 * Sign a JWT payload and return the token string.
 */
export async function signToken(payload: { username: string }): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(EXPIRY)
    .sign(getSecret());
}

/**
 * Verify a JWT token string. Returns the decoded payload or null if invalid.
 */
export async function verifyToken(token: string): Promise<{ username: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return { username: payload.username as string };
  } catch {
    return null;
  }
}

/**
 * Cookie configuration shared between login and middleware.
 * Does NOT include `value` — callers add that separately.
 */
export const COOKIE_BASE = {
  name: COOKIE_NAME,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  maxAge: 60 * 60 * 8, // 8 hours
  path: '/',
};
