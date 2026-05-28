import { NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase-admin';
import { getCurrentUser } from '@/lib/auth';

export async function DELETE(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Forbidden. Admin privileges required.' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('id');

    if (!userId) {
      return NextResponse.json({ success: false, message: 'User ID is required.' }, { status: 400 });
    }

    // Get user profile from Firestore to check protections
    const userDoc = await adminDb.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      return NextResponse.json({ success: false, message: 'User not found.' }, { status: 404 });
    }

    const userData = userDoc.data();

    // Protect primary admin
    if (userData?.email === 'digital.housingmantra@gmail.com') {
      return NextResponse.json({ success: false, message: 'Cannot delete the primary admin user.' }, { status: 400 });
    }

    // Protect self-deletion
    if (userId === currentUser.userId) {
      return NextResponse.json({ success: false, message: 'Cannot delete your own admin account.' }, { status: 400 });
    }

    // Delete from Firebase Auth
    try {
      await adminAuth.deleteUser(userId);
    } catch {
      // User may not exist in Auth — still delete from Firestore
    }

    // Delete from Firestore
    await adminDb.collection('users').doc(userId).delete();

    return NextResponse.json({ success: true, message: 'User deleted successfully.' });
  } catch (error: any) {
    console.error('[Admin Delete User Error]:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error.' }, { status: 500 });
  }
}
