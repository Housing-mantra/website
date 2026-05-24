import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { getCurrentUser } from '@/lib/auth';

// GET – fetch all bookmarks for logged-in user
export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, message: 'Unauthorized.' }, { status: 401 });
  }

  const snapshot = await adminDb
    .collection('bookmarks')
    .where('userId', '==', user.userId)
    .orderBy('createdAt', 'desc')
    .get();

  const bookmarks = [];
  for (const doc of snapshot.docs) {
    const data = doc.data();
    // Get project details
    const projectDoc = await adminDb.collection('projects').doc(data.projectId).get();
    const project = projectDoc.exists ? { id: projectDoc.id, ...projectDoc.data() } : null;

    if (project) {
      bookmarks.push({
        id: doc.id,
        createdAt: data.createdAt,
        project: {
          id: project.id,
          title: (project as any).title,
          image: (project as any).image,
          location: (project as any).location,
          price: (project as any).price,
          status: (project as any).status,
          type: (project as any).type,
        },
      });
    }
  }

  return NextResponse.json({ success: true, bookmarks });
}

// POST – add a bookmark
export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, message: 'Unauthorized.' }, { status: 401 });
  }

  const { projectId } = await req.json();
  if (!projectId) {
    return NextResponse.json({ success: false, message: 'projectId is required.' }, { status: 400 });
  }

  // Check if already bookmarked
  const existing = await adminDb
    .collection('bookmarks')
    .where('userId', '==', user.userId)
    .where('projectId', '==', projectId)
    .get();

  if (!existing.empty) {
    return NextResponse.json({ success: true, bookmark: { id: existing.docs[0].id } });
  }

  const bookmark = await adminDb.collection('bookmarks').add({
    userId: user.userId,
    projectId,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ success: true, bookmark: { id: bookmark.id } });
}

// DELETE – remove a bookmark
export async function DELETE(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, message: 'Unauthorized.' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get('projectId');
  if (!projectId) {
    return NextResponse.json({ success: false, message: 'projectId is required.' }, { status: 400 });
  }

  const snapshot = await adminDb
    .collection('bookmarks')
    .where('userId', '==', user.userId)
    .where('projectId', '==', projectId)
    .get();

  const batch = adminDb.batch();
  snapshot.docs.forEach((doc) => batch.delete(doc.ref));
  await batch.commit();

  return NextResponse.json({ success: true, message: 'Bookmark removed.' });
}
