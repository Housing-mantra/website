import { NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase-admin';
import { PROJECTS, DEVELOPERS } from '@/lib/data';

export async function GET() {
  try {
    console.log('[Seed] Starting Firestore seeding...');

    // 1. Seed Admin user in Firebase Auth + Firestore
    let adminUid = '';
    try {
      const existing = await adminAuth.getUserByEmail('digital.housingmantra@gmail.com');
      adminUid = existing.uid;
    } catch {
      const newAdmin = await adminAuth.createUser({
        email: 'digital.housingmantra@gmail.com',
        password: 'adminlogin',
        displayName: 'Super Admin',
      });
      adminUid = newAdmin.uid;
    }

    await adminDb.collection('users').doc(adminUid).set({
      email: 'digital.housingmantra@gmail.com',
      name: 'Super Admin',
      phone: '9999900000',
      role: 'ADMIN',
      createdAt: new Date().toISOString(),
    }, { merge: true });

    // 2. Seed Customer user
    let customerUid = '';
    try {
      const existing = await adminAuth.getUserByEmail('customer@housingmantra.in');
      customerUid = existing.uid;
    } catch {
      const newCustomer = await adminAuth.createUser({
        email: 'customer@housingmantra.in',
        password: 'password123',
        displayName: 'John Doe',
      });
      customerUid = newCustomer.uid;
    }

    await adminDb.collection('users').doc(customerUid).set({
      email: 'customer@housingmantra.in',
      name: 'John Doe',
      phone: '8888800000',
      role: 'CUSTOMER',
      createdAt: new Date().toISOString(),
    }, { merge: true });

    console.log('[Seed] Users seeded.');

    // 3. Seed Developers
    const batch1 = adminDb.batch();
    for (const dev of DEVELOPERS) {
      const cleanProjectsCount = dev.projectsCount
        ? parseInt(dev.projectsCount.replace(/[^0-9]/g, '')) || 0
        : 0;

      const devRef = adminDb.collection('developers').doc(dev.id);
      batch1.set(devRef, {
        slug: dev.id,
        name: dev.name,
        logo: dev.logo || '',
        image: (dev as any).image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop',
        initials: (dev as any).initials || '',
        color: (dev as any).color || '',
        experience: (dev as any).experience || '',
        projectsDelivered: (dev as any).projectsDelivered || '',
        ongoingProjects: (dev as any).ongoingProjects || '',
        description: dev.description || dev.about,
        established: dev.experience ? 2026 - (parseInt(dev.experience) || 10) : 2010,
        projectsCount: cleanProjectsCount,
        createdAt: new Date().toISOString(),
      }, { merge: true });
    }
    await batch1.commit();
    console.log(`[Seed] Seeded ${DEVELOPERS.length} developers.`);

    // 4. Seed Projects (in batches of 400 max — Firestore limit is 500 per batch)
    let seededProjectsCount = 0;
    const devIds = new Set(DEVELOPERS.map(d => d.id));

    // Process in chunks of 400
    for (let i = 0; i < PROJECTS.length; i += 400) {
      const chunk = PROJECTS.slice(i, i + 400);
      const batch = adminDb.batch();

      for (const proj of chunk) {
        if (!devIds.has(proj.developerId)) continue;

        const projRef = adminDb.collection('projects').doc(proj.id);
        batch.set(projRef, {
          slug: proj.id,
          title: proj.title,
          description: proj.description || '',
          image: proj.image || '',
          gallery: proj.gallery || [],
          status: proj.status || 'ONGOING',
          type: proj.type || 'Apartment',
          price: proj.price || '',
          location: proj.location || '',
          city: 'Pune',
          possession: proj.possession || '',
          units: proj.units || '',
          landArea: proj.landArea || '',
          towers: proj.towers || '',
          rera: proj.rera || '',
          features: proj.features || [],
          developerId: proj.developerId,
          floorPlans: proj.floorPlans || [],
          attractions: proj.attractions || [],
          isActive: true,
          createdAt: new Date().toISOString(),
        }, { merge: true });

        seededProjectsCount++;
      }

      await batch.commit();
    }

    console.log(`[Seed] Seeded ${seededProjectsCount} projects.`);

    return NextResponse.json({
      success: true,
      message: 'Firestore seeding completed!',
      users: {
        admin: 'digital.housingmantra@gmail.com / adminlogin',
        customer: 'customer@housingmantra.in / password123',
      },
      seededCount: {
        developers: DEVELOPERS.length,
        projects: seededProjectsCount,
      },
    });

  } catch (error: any) {
    console.error('[Seed Error]:', error);
    return NextResponse.json({
      success: false,
      message: 'Seeding failed.',
      error: error?.message,
    }, { status: 500 });
  }
}
