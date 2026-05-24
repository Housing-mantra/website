import { NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase-admin';
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Forbidden. Admin privileges required.' }, { status: 403 });
    }

    const { name, email, phone, password, role } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Email and password are required.' }, { status: 400 });
    }

    // Check if email already exists in Firebase Auth
    try {
      await adminAuth.getUserByEmail(email.toLowerCase().trim());
      return NextResponse.json({ success: false, message: 'Email already registered.' }, { status: 400 });
    } catch {
      // Good — user doesn't exist yet
    }

    // Create user in Firebase Auth
    const newFirebaseUser = await adminAuth.createUser({
      email: email.toLowerCase().trim(),
      password,
      displayName: name,
    });

    // Create user profile in Firestore
    await adminDb.collection('users').doc(newFirebaseUser.uid).set({
      email: email.toLowerCase().trim(),
      name: name || '',
      phone: phone || '',
      role: role || 'CUSTOMER',
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'User created successfully!',
      user: {
        id: newFirebaseUser.uid,
        name,
        email: email.toLowerCase().trim(),
        role: role || 'CUSTOMER',
      },
    });
  } catch (error: any) {
    console.error('[Admin Create User Error]:', error);
    return NextResponse.json({ success: false, message: error?.message || 'Internal Server Error.' }, { status: 500 });
  }
}
