import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { getCurrentUser } from '@/lib/auth';

// GET – fetch browse history for logged-in user
export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, message: 'Unauthorized.' }, { status: 401 });
  }

  const snapshot = await adminDb
    .collection('history')
    .where('userId', '==', user.userId)
    .orderBy('viewedAt', 'desc')
    .limit(50)
    .get();

  const history = [];
  for (const doc of snapshot.docs) {
    const data = doc.data();
    const projectDoc = await adminDb.collection('projects').doc(data.projectId).get();
    const project = projectDoc.exists ? { id: projectDoc.id, ...projectDoc.data() } : null;

    if (project) {
      history.push({
        id: doc.id,
        viewedAt: data.viewedAt,
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

  return NextResponse.json({ success: true, history });
}

// POST – record a project view
export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, message: 'Not logged in.' }, { status: 401 });
  }

  const { projectId } = await req.json();
  if (!projectId) {
    return NextResponse.json({ success: false, message: 'projectId is required.' }, { status: 400 });
  }

  const entry = await adminDb.collection('history').add({
    userId: user.userId,
    projectId,
    viewedAt: new Date().toISOString(),
  });

  return NextResponse.json({ success: true, entry: { id: entry.id } });
}
