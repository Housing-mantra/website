import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email address is required.' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if the user exists in Firestore and is an admin
    const usersSnapshot = await adminDb
      .collection('users')
      .where('email', '==', cleanEmail)
      .limit(1)
      .get();

    if (usersSnapshot.empty) {
      return NextResponse.json({ success: false, message: 'No registered user found with this email.' }, { status: 404 });
    }

    const userData = usersSnapshot.docs[0].data();
    if (userData.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Access denied. Password reset for administrative users only.' }, { status: 403 });
    }

    // Generate Firebase password reset link
    const resetLink = await adminAuth.generatePasswordResetLink(cleanEmail);

    return NextResponse.json({
      success: true,
      message: 'Password reset link generated successfully!',
      resetLink, // Returned directly for administrative/dev convenience
    });
  } catch (error: any) {
    console.error('[Reset Password Error]:', error);
    return NextResponse.json({ success: false, message: error?.message || 'Failed to generate reset link.' }, { status: 500 });
  }
}
