import { initializeApp, getApps, cert, type ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

let adminApp: any = null;

function getAdminApp() {
  if (adminApp) return adminApp;
  
  const apps = getApps();
  if (apps.length > 0) {
    adminApp = apps[0];
    return adminApp;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID || 'housing-mantra-9d7e8';
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!privateKey || !clientEmail) {
    console.warn("WARNING: Firebase Admin credentials not fully loaded in environment variables. Initializing fallback client.");
    adminApp = initializeApp({ projectId });
    return adminApp;
  }

  // Robustly clean private key for Vercel / serverless deployments
  let cleanedKey = privateKey.trim();
  
  // 1. Strip surrounding double or single quotes added by dashboard copy-pasting, handling whitespace
  cleanedKey = cleanedKey.replace(/^['"]|['"]$/g, '').trim();

  // 2. Normalize and replace literal escaped newlines with actual newline characters
  cleanedKey = cleanedKey.replace(/\\+n/g, '\n').replace(/\\n/g, '\n');

  privateKey = cleanedKey;

  const serviceAccount: ServiceAccount = {
    projectId,
    clientEmail,
    privateKey,
  };

  adminApp = initializeApp({ credential: cert(serviceAccount) });
  return adminApp;
}

// Lazy loaded Proxy for Firestore
export const adminDb = new Proxy({} as any, {
  get(target, prop) {
    const app = getAdminApp();
    const dbInstance = getFirestore(app);
    const value = (dbInstance as any)[prop];
    if (typeof value === 'function') {
      return value.bind(dbInstance);
    }
    return value;
  }
}) as ReturnType<typeof getFirestore>;

// Lazy loaded Proxy for Firebase Auth
export const adminAuth = new Proxy({} as any, {
  get(target, prop) {
    const app = getAdminApp();
    const authInstance = getAuth(app);
    const value = (authInstance as any)[prop];
    if (typeof value === 'function') {
      return value.bind(authInstance);
    }
    return value;
  }
}) as ReturnType<typeof getAuth>;

export default getAdminApp;
