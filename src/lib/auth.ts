import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from './firebase-admin';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'housingmantra_jwt_secret_key_987654321'
);

export interface SessionUser {
  userId: string;
  email: string;
  name: string;
  role: string; // "CUSTOMER", "AGENT", "ADMIN"
}

// Sign a session JWT (stored in httpOnly cookie)
export async function signSessionJWT(payload: SessionUser): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

// Verify session cookie
export async function verifySessionJWT(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as SessionUser;
  } catch {
    return null;
  }
}

// Get current user from cookie
export async function getCurrentUser(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    if (!token) return null;
    return await verifySessionJWT(token);
  } catch {
    return null;
  }
}

// Get or create a Firestore user profile document
export async function getOrCreateUserProfile(uid: string, email: string, name?: string) {
  const userRef = adminDb.collection('users').doc(uid);
  const userDoc = await userRef.get();

  if (userDoc.exists) {
    return { id: uid, ...userDoc.data() };
  }

  // Create new profile
  const newProfile = {
    email,
    name: name || '',
    phone: '',
    role: 'CUSTOMER',
    createdAt: new Date().toISOString(),
  };

  await userRef.set(newProfile);
  return { id: uid, ...newProfile };
}
