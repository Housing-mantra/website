import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { getCurrentUser } from '@/lib/auth';

export async function PUT(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Forbidden. Admin privileges required.' }, { status: 403 });
    }

    const data = await req.json();
    const {
      id,
      name,
      logo,
      image,
      experience,
      projectsDelivered,
      ongoingProjects,
      description,
      established
    } = data;

    if (!id) {
      return NextResponse.json({ success: false, message: 'Developer ID is required.' }, { status: 400 });
    }

    // Check if developer exists in Firestore
    const developerDoc = await adminDb.collection('developers').doc(id).get();
    if (!developerDoc.exists) {
      return NextResponse.json({ success: false, message: 'Developer not found.' }, { status: 404 });
    }

    // Extract initials from name if name changed
    let initials = developerDoc.data()?.initials || 'DEV';
    if (name) {
      initials = name
        .split(' ')
        .map((w: string) => w[0])
        .join('')
        .toUpperCase()
        .substring(0, 3) || 'DEV';
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (logo !== undefined) updateData.logo = logo;
    if (image !== undefined) updateData.image = image;
    if (experience !== undefined) updateData.experience = experience;
    if (projectsDelivered !== undefined) updateData.projectsDelivered = projectsDelivered;
    if (ongoingProjects !== undefined) updateData.ongoingProjects = ongoingProjects;
    if (description !== undefined) updateData.description = description;
    if (established !== undefined) updateData.established = parseInt(established) || 2010;
    updateData.initials = initials;
    updateData.updatedAt = new Date().toISOString();

    await adminDb.collection('developers').doc(id).update(updateData);

    return NextResponse.json({
      success: true,
      message: 'Developer profile updated successfully!',
    });
  } catch (error: any) {
    console.error('[Admin Update Developer Error]:', error);
    return NextResponse.json({ success: false, message: error?.message || 'Internal Server Error.' }, { status: 500 });
  }
}
