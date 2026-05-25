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
      title,
      developerId,
      status,
      type,
      rera,
      price,
      location,
      city,
      possession,
      landArea,
      towers,
      units,
      image,
      gallery,
      features,
      attractions,
      description
    } = data;

    if (!id) {
      return NextResponse.json({ success: false, message: 'Project ID is required.' }, { status: 400 });
    }

    // Check if project exists
    const projectDoc = await adminDb.collection('projects').doc(id).get();
    if (!projectDoc.exists) {
      return NextResponse.json({ success: false, message: 'Project not found.' }, { status: 404 });
    }

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (developerId !== undefined) updateData.developerId = developerId;
    if (status !== undefined) updateData.status = status;
    if (type !== undefined) updateData.type = type;
    if (rera !== undefined) updateData.rera = rera;
    if (price !== undefined) updateData.price = price;
    if (location !== undefined) updateData.location = location;
    if (city !== undefined) updateData.city = city;
    if (possession !== undefined) updateData.possession = possession;
    if (landArea !== undefined) updateData.landArea = landArea;
    if (towers !== undefined) updateData.towers = towers;
    if (units !== undefined) updateData.units = units;
    if (image !== undefined) updateData.image = image;
    if (gallery !== undefined) updateData.gallery = gallery;
    if (features !== undefined) updateData.features = features;
    if (attractions !== undefined) updateData.attractions = attractions;
    if (description !== undefined) updateData.description = description;
    updateData.updatedAt = new Date().toISOString();

    await adminDb.collection('projects').doc(id).update(updateData);

    return NextResponse.json({
      success: true,
      message: 'Project updated successfully!',
    });
  } catch (error: any) {
    console.error('[Admin Update Project Error]:', error);
    return NextResponse.json({ success: false, message: error?.message || 'Internal Server Error.' }, { status: 500 });
  }
}
