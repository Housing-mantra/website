import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { getCurrentUser } from '@/lib/auth';

export async function DELETE(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Forbidden. Admin privileges required.' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const developerId = searchParams.get('id');

    if (!developerId) {
      return NextResponse.json({ success: false, message: 'Developer ID is required.' }, { status: 400 });
    }

    // Check if developer exists in Firestore
    const developerDoc = await adminDb.collection('developers').doc(developerId).get();
    if (!developerDoc.exists) {
      return NextResponse.json({ success: false, message: 'Developer not found.' }, { status: 404 });
    }

    // Delete from Firestore
    await adminDb.collection('developers').doc(developerId).delete();

    return NextResponse.json({ success: true, message: 'Developer profile deleted successfully.' });
  } catch (error: any) {
    console.error('[Admin Delete Developer Error]:', error);
    return NextResponse.json({ success: false, message: error?.message || 'Internal Server Error.' }, { status: 500 });
  }
}
