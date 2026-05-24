import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';
import { signSessionJWT, getOrCreateUserProfile } from '@/lib/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth as clientAuth } from '@/lib/firebase';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Email and password are required.' }, { status: 400 });
    }

    // Verify with Firebase Auth (server-side via Admin SDK)
    let firebaseUser;
    try {
      firebaseUser = await adminAuth.getUserByEmail(email.toLowerCase().trim());
    } catch {
      return NextResponse.json({ success: false, message: 'Invalid credentials.' }, { status: 401 });
    }

    // Verify password by generating a custom token and checking — 
    // Firebase Admin SDK doesn't directly verify passwords
    // So we use the client SDK approach via REST API
    const verifyRes = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          password,
          returnSecureToken: true,
        }),
      }
    );

    if (!verifyRes.ok) {
      return NextResponse.json({ success: false, message: 'Invalid credentials.' }, { status: 401 });
    }

    const verifyData = await verifyRes.json();

    // Get/create user profile from Firestore
    const profile = await getOrCreateUserProfile(
      firebaseUser.uid,
      firebaseUser.email || email,
      firebaseUser.displayName || ''
    );

    // Sign session JWT
    const token = await signSessionJWT({
      userId: firebaseUser.uid,
      email: firebaseUser.email || email,
      name: (profile as any).name || firebaseUser.displayName || '',
      role: (profile as any).role || 'CUSTOMER',
    });

    const response = NextResponse.json({
      success: true,
      message: 'Login successful!',
      user: {
        id: firebaseUser.uid,
        email: firebaseUser.email,
        name: (profile as any).name || firebaseUser.displayName || '',
        role: (profile as any).role || 'CUSTOMER',
      },
    });

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    console.error('[Login API Error]:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error.' }, { status: 500 });
  }
}
