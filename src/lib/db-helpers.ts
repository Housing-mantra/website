import { adminDb } from './firebase-admin';

export interface FirestoreProject {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  gallery: string[];
  status: string;
  type: string;
  price: string;
  location: string;
  city: string;
  possession: string;
  units: string;
  landArea: string;
  towers: string;
  rera: string;
  features: string[];
  developerId: string;
  floorPlans: any[];
  attractions: string[];
  isActive: boolean;
  createdAt: string;
}

export interface FirestoreDeveloper {
  id: string;
  slug: string;
  name: string;
  logo: string;
  image: string;
  initials: string;
  color: string;
  experience: string;
  projectsDelivered: string;
  ongoingProjects: string;
  description: string;
  established: number;
  projectsCount: number;
  createdAt: string;
}

// Fetch all active projects
export async function getProjects(): Promise<FirestoreProject[]> {
  try {
    const snapshot = await adminDb.collection('projects').where('isActive', '==', true).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FirestoreProject));
  } catch (error) {
    console.error('Error fetching projects from Firestore:', error);
    return [];
  }
}

// Fetch single project by ID or Slug
export async function getProjectBySlug(slug: string): Promise<FirestoreProject | null> {
  try {
    const docRef = adminDb.collection('projects').doc(slug);
    const docSnap = await docRef.get();
    if (docSnap.exists) {
      return { id: docSnap.id, ...docSnap.data() } as FirestoreProject;
    }

    // Try querying by slug field if ID didn't match
    const querySnap = await adminDb.collection('projects').where('slug', '==', slug).limit(1).get();
    if (!querySnap.empty) {
      const match = querySnap.docs[0];
      return { id: match.id, ...match.data() } as FirestoreProject;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching project ${slug} from Firestore:`, error);
    return null;
  }
}

// Fetch all developers
export async function getDevelopers(): Promise<FirestoreDeveloper[]> {
  try {
    const snapshot = await adminDb.collection('developers').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FirestoreDeveloper));
  } catch (error) {
    console.error('Error fetching developers from Firestore:', error);
    return [];
  }
}

// Fetch single developer by ID or Slug
export async function getDeveloperBySlug(slug: string): Promise<FirestoreDeveloper | null> {
  try {
    const docRef = adminDb.collection('developers').doc(slug);
    const docSnap = await docRef.get();
    if (docSnap.exists) {
      return { id: docSnap.id, ...docSnap.data() } as FirestoreDeveloper;
    }

    const querySnap = await adminDb.collection('developers').where('slug', '==', slug).limit(1).get();
    if (!querySnap.empty) {
      const match = querySnap.docs[0];
      return { id: match.id, ...match.data() } as FirestoreDeveloper;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching developer ${slug} from Firestore:`, error);
    return null;
  }
}
