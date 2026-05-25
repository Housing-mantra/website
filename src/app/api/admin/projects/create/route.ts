import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { getCurrentUser } from '@/lib/auth';

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json({ success: false, message: 'Forbidden. Admin privileges required.' }, { status: 403 });
    }

    const data = await req.json();
    const {
      title,
      description,
      image,
      gallery,
      status,
      type,
      price,
      location,
      city,
      possession,
      units,
      landArea,
      towers,
      rera,
      features,
      developerId,
      attractions
    } = data;

    if (!title || !developerId) {
      return NextResponse.json({ success: false, message: 'Project Title and Developer are required.' }, { status: 400 });
    }

    // Generate unique slug
    let baseSlug = slugify(title);
    if (!baseSlug) baseSlug = 'project';
    
    let finalSlug = baseSlug;
    const existingDoc = await adminDb.collection('projects').doc(finalSlug).get();
    if (existingDoc.exists) {
      finalSlug = `${baseSlug}-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    // Parse arrays
    const parsedFeatures = Array.isArray(features) 
      ? features 
      : typeof features === 'string' 
        ? features.split(',').map(f => f.trim()).filter(Boolean)
        : [];

    const parsedGallery = Array.isArray(gallery) 
      ? gallery 
      : typeof gallery === 'string' 
        ? gallery.split(',').map(g => g.trim()).filter(Boolean)
        : [];

    const parsedAttractions = Array.isArray(attractions) 
      ? attractions 
      : typeof attractions === 'string' 
        ? attractions.split(',').map(a => a.trim()).filter(Boolean)
        : [];

    // Create the project document in Firestore
    const projectData = {
      id: finalSlug,
      slug: finalSlug,
      title,
      description: description || '',
      image: image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop',
      gallery: parsedGallery,
      status: status || 'UNDER_CONSTRUCTION',
      type: type || 'Apartment',
      price: price || '',
      location: location || '',
      city: city || 'Pune',
      possession: possession || '',
      units: units || '',
      landArea: landArea || '',
      towers: towers || '',
      rera: rera || '',
      features: parsedFeatures,
      developerId,
      floorPlans: [],
      attractions: parsedAttractions,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    await adminDb.collection('projects').doc(finalSlug).set(projectData);

    return NextResponse.json({
      success: true,
      message: 'Project created successfully!',
      project: projectData,
    });
  } catch (error: any) {
    console.error('[Admin Create Project Error]:', error);
    return NextResponse.json({ success: false, message: error?.message || 'Internal Server Error.' }, { status: 500 });
  }
}
