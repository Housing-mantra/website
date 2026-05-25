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
      name,
      logo,
      image,
      experience,
      projectsDelivered,
      ongoingProjects,
      description,
      established
    } = data;

    if (!name) {
      return NextResponse.json({ success: false, message: 'Developer Name is required.' }, { status: 400 });
    }

    // Generate unique slug
    let baseSlug = slugify(name);
    if (!baseSlug) baseSlug = 'developer';

    let finalSlug = baseSlug;
    const existingDoc = await adminDb.collection('developers').doc(finalSlug).get();
    if (existingDoc.exists) {
      finalSlug = `${baseSlug}-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    // Extract Initials
    const initials = name
      .split(' ')
      .map((w: string) => w[0])
      .join('')
      .toUpperCase()
      .substring(0, 3);

    // Dynamic harmonized color selections based on initials length
    const colors = ['bg-blue-600', 'bg-indigo-600', 'bg-purple-600', 'bg-pink-600', 'bg-emerald-600', 'bg-amber-600'];
    const chosenColor = colors[Math.floor(Math.random() * colors.length)];

    const developerData = {
      id: finalSlug,
      slug: finalSlug,
      name,
      logo: logo || '',
      image: image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop',
      initials: initials || 'DEV',
      color: chosenColor,
      experience: experience || '10+ Years',
      projectsDelivered: projectsDelivered || '20+',
      ongoingProjects: ongoingProjects || '3+',
      description: description || '',
      established: parseInt(established) || 2015,
      projectsCount: 0,
      createdAt: new Date().toISOString(),
    };

    await adminDb.collection('developers').doc(finalSlug).set(developerData);

    return NextResponse.json({
      success: true,
      message: 'Developer profile created successfully!',
      developer: developerData,
    });
  } catch (error: any) {
    console.error('[Admin Create Developer Error]:', error);
    return NextResponse.json({ success: false, message: error?.message || 'Internal Server Error.' }, { status: 500 });
  }
}
