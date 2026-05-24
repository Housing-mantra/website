import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [projectsSnap, developersSnap] = await Promise.all([
      adminDb.collection('projects').where('isActive', '==', true).get(),
      adminDb.collection('developers').get(),
    ]);

    const projects = projectsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const developers = developersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json({
      success: true,
      projects,
      developers,
    });
  } catch (error: any) {
    console.error('Error fetching public projects:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch projects.',
    }, { status: 500 });
  }
}
