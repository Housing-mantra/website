import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';
import { signSessionJWT } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, phone } = body;

    // 1. VERIFY FIREBASE NATIVE ID TOKEN ACTION (Option 2)
    if (action === 'verify-firebase-token') {
      const { idToken } = body;
      if (!idToken) {
        return NextResponse.json({ success: false, message: 'Firebase ID Token is required.' }, { status: 400 });
      }

      // Securely decode/verify the client's token
      const decodedToken = await adminAuth.verifyIdToken(idToken);
      const uid = decodedToken.uid;
      const firebasePhone = decodedToken.phone_number; // e.g. "+919999900000"

      if (!firebasePhone) {
        return NextResponse.json({ success: false, message: 'Phone number not found in verified credential.' }, { status: 400 });
      }

      // Extract last 10 digits as clean domestic mobile number
      const cleanPhone = firebasePhone.replace(/[^0-9]/g, '').slice(-10);

      // Check if user already has a profile in Firestore
      const userQuery = await adminDb.collection('users').where('phone', '==', cleanPhone).limit(1).get();

      if (!userQuery.empty) {
        // User exists! Sign them in instantly
        const userDoc = userQuery.docs[0];
        const targetUser = {
          id: userDoc.id,
          ...userDoc.data()
        };

        const token = await signSessionJWT({
          userId: targetUser.id,
          email: targetUser.email || '',
          name: targetUser.name || '',
          role: targetUser.role || 'CUSTOMER',
        });

        const response = NextResponse.json({
          success: true,
          message: 'Login successful!',
          user: {
            id: targetUser.id,
            email: targetUser.email,
            name: targetUser.name,
            role: targetUser.role,
          },
        });

        response.cookies.set('auth_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
        });

        return response;
      } else {
        // User is brand new! Prompt profile completion
        return NextResponse.json({
          success: true,
          needsProfileComplete: true,
          tempUid: uid,
          phone: cleanPhone,
          message: 'Please complete your profile details to continue.'
        });
      }
    }

    // 2. COMPLETE PROFILE REGISTRATION ACTION
    if (action === 'complete-profile') {
      const { tempUid, name, email, phone: suppliedPhone } = body;

      if (!tempUid || !name || !email || !suppliedPhone) {
        return NextResponse.json({ success: false, message: 'Missing registration details.' }, { status: 400 });
      }

      const cleanPhone = suppliedPhone.replace(/[^0-9]/g, '').slice(-10);
      const cleanEmail = email.toLowerCase().trim();

      // Check if email already registered in Firestore users
      const emailQuery = await adminDb.collection('users').where('email', '==', cleanEmail).limit(1).get();
      if (!emailQuery.empty) {
        return NextResponse.json({ success: false, message: 'This email address is already registered.' }, { status: 400 });
      }

      // Check if the auth account already exists (or link it)
      let authUser;
      try {
        authUser = await adminAuth.getUser(tempUid);
      } catch {
        // Safe check
      }

      // Sync display name and email inside Firebase Auth
      if (authUser) {
        await adminAuth.updateUser(tempUid, {
          email: cleanEmail,
          displayName: name,
        });
      }

      // Create profile document in Firestore
      const newProfile = {
        email: cleanEmail,
        name,
        phone: cleanPhone,
        role: 'CUSTOMER',
        createdAt: new Date().toISOString(),
      };

      await adminDb.collection('users').doc(tempUid).set(newProfile, { merge: true });

      // Generate Session Token
      const token = await signSessionJWT({
        userId: tempUid,
        email: cleanEmail,
        name,
        role: 'CUSTOMER',
      });

      const response = NextResponse.json({
        success: true,
        message: 'Profile registered successfully!',
        user: {
          id: tempUid,
          email: cleanEmail,
          name,
          role: 'CUSTOMER',
        },
      });

      response.cookies.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }

    // 3. MOCK FLOW FALLBACK (For Developer Testing)
    if (!phone) {
      return NextResponse.json({ success: false, message: 'Mobile number is required.' }, { status: 400 });
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      return NextResponse.json({ success: false, message: 'Invalid mobile number. Please enter a valid 10-digit number.' }, { status: 400 });
    }

    if (action === 'request') {
      const userQuery = await adminDb.collection('users').where('phone', '==', cleanPhone).limit(1).get();
      const exists = !userQuery.empty;
      const otp = '123456'; 

      return NextResponse.json({
        success: true,
        exists,
        message: `OTP sent successfully to ${cleanPhone}.`,
        otp,
      });
    }

    if (action === 'verify') {
      const { otp, name, email } = body;

      if (!otp) {
        return NextResponse.json({ success: false, message: 'OTP is required.' }, { status: 400 });
      }

      if (otp !== '123456') {
        return NextResponse.json({ success: false, message: 'Invalid OTP. Please enter 123456 to verify.' }, { status: 400 });
      }

      const userQuery = await adminDb.collection('users').where('phone', '==', cleanPhone).limit(1).get();
      let targetUser: any = null;

      if (!userQuery.empty) {
        const userDoc = userQuery.docs[0];
        targetUser = {
          id: userDoc.id,
          ...userDoc.data()
        };
      } else {
        if (!name || !email) {
          return NextResponse.json({
            success: true,
            needsProfileComplete: true,
            message: 'Please complete your profile to continue.'
          });
        }

        const cleanEmail = email.toLowerCase().trim();

        let existingAuthUser;
        try {
          existingAuthUser = await adminAuth.getUserByEmail(cleanEmail);
        } catch {}

        let newUid = '';
        if (existingAuthUser) {
          newUid = existingAuthUser.uid;
        } else {
          const newAuth = await adminAuth.createUser({
            email: cleanEmail,
            displayName: name,
            password: 'otp-generated-' + Math.random().toString(36).slice(-8),
          });
          newUid = newAuth.uid;
        }

        const newProfile = {
          email: cleanEmail,
          name,
          phone: cleanPhone,
          role: 'CUSTOMER',
          createdAt: new Date().toISOString(),
        };

        await adminDb.collection('users').doc(newUid).set(newProfile, { merge: true });

        targetUser = {
          id: newUid,
          ...newProfile
        };
      }

      const token = await signSessionJWT({
        userId: targetUser.id,
        email: targetUser.email,
        name: targetUser.name,
        role: targetUser.role,
      });

      const response = NextResponse.json({
        success: true,
        message: 'Login successful!',
        user: {
          id: targetUser.id,
          email: targetUser.email,
          name: targetUser.name,
          role: targetUser.role,
        },
      });

      response.cookies.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }

    return NextResponse.json({ success: false, message: 'Invalid action.' }, { status: 400 });

  } catch (error: any) {
    console.error('[OTP Authentication Error]:', error);
    return NextResponse.json({ success: false, message: error?.message || 'Internal Server Error.' }, { status: 500 });
  }
}
