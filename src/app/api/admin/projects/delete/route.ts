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
    const projectId = searchParams.get('id');

    if (!projectId) {
      return NextResponse.json({ success: false, message: 'Project ID is required.' }, { status: 400 });
    }

    // Check if project exists in Firestore
    const projectDoc = await adminDb.collection('projects').doc(projectId).get();
    if (!projectDoc.exists) {
      return NextResponse.json({ success: false, message: 'Project not found.' }, { status: 404 });
    }

    // Delete from Firestore
    await adminDb.collection('projects').doc(projectId).delete();

    return NextResponse.json({ success: true, message: 'Project deleted successfully.' });
  } catch (error: any) {
    console.error('[Admin Delete Project Error]:', error);
    return NextResponse.json({ success: false, message: error?.message || 'Internal Server Error.' }, { status: 500 });
  }
}
