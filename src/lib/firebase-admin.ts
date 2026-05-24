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

  // Extremely intelligent diagnostics to help user fix production key issues instantly
  if (!privateKey.startsWith('-----BEGIN PRIVATE KEY-----') || !privateKey.endsWith('-----END PRIVATE KEY-----')) {
    const startStr = privateKey.substring(0, 30).replace(/\n/g, '\\n');
    const endStr = privateKey.substring(Math.max(0, privateKey.length - 30)).replace(/\n/g, '\\n');
    const diagnosticMsg = `FIREBASE_PRIVATE_KEY is malformed in production! ` +
      `Length: ${privateKey.length}. ` +
      `Starts with: "${startStr}...". ` +
      `Ends with: "...${endStr}". ` +
      `Key must start with "-----BEGIN PRIVATE KEY-----" and end with "-----END PRIVATE KEY-----" (including 5 dashes). ` +
      `Please verify your Vercel Environment Variables and copy-paste the private key completely.`;
    console.error(diagnosticMsg);
    throw new Error(diagnosticMsg);
  }

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
