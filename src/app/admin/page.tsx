import React from 'react';
import { getCurrentUser } from '@/lib/auth';
import { adminDb } from '@/lib/firebase-admin';
import { AdminLoginClient } from '@/components/admin/AdminLoginClient';
import { AdminDashboardClient } from '@/components/admin/AdminDashboardClient';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const currentUser = await getCurrentUser();

  // If not logged in, or not ADMIN, show Admin login portal
  if (!currentUser || currentUser.role !== 'ADMIN') {
    return <AdminLoginClient />;
  }

  // Load stats from Firestore
  const [projectsSnap, developersSnap, usersSnap, leadsSnap] = await Promise.all([
    adminDb.collection('projects').get(),
    adminDb.collection('developers').get(),
    adminDb.collection('users').get(),
    adminDb.collection('leads').get(),
  ]);

  const stats = {
    projects: projectsSnap.size,
    developers: developersSnap.size,
    users: usersSnap.size,
    leads: leadsSnap.size,
  };

  // Load detailed records
  const projects = projectsSnap.docs.map(doc => {
    const data = doc.data();
    return { id: doc.id, ...data };
  });

  // Attach developer name to projects
  const devMap = new Map<string, any>();
  developersSnap.docs.forEach(doc => devMap.set(doc.id, { id: doc.id, ...doc.data() }));
  const projectsWithDev = projects.map((p: any) => ({
    ...p,
    developer: devMap.get(p.developerId) || null,
  }));

  const users = usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const leads = leadsSnap.docs.map(doc => {
    const data = doc.data();
    const project = data.projectId ? devMap.get(data.projectId) || null : null;
    return { id: doc.id, ...data, project };
  });

  // For leads, get project titles
  const leadsWithProjects = [];
  for (const doc of leadsSnap.docs) {
    const data = doc.data();
    let project = null;
    if (data.projectId) {
      const projDoc = await adminDb.collection('projects').doc(data.projectId).get();
      if (projDoc.exists) {
        project = { id: projDoc.id, title: projDoc.data()?.title || 'Unknown' };
      }
    }
    leadsWithProjects.push({ id: doc.id, ...data, project });
  }

  return (
    <AdminDashboardClient
      stats={stats}
      projects={projectsWithDev}
      users={users}
      leads={leadsWithProjects}
      currentUser={currentUser}
    />
  );
}
