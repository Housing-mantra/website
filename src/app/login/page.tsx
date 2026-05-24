"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2, ShieldCheck, User, Mail, ChevronUp } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

type LoginStep = 'phone' | 'otp' | 'profile';

export default function CustomerLoginPage() {
  const router = useRouter();
  
  // State variables
  const [step, setStep] = useState<LoginStep>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [tempUid, setTempUid] = useState('');

  // Initialize invisible Recaptcha Verifier on component mount
  useEffect(() => {
    if (typeof window !== 'undefined' && auth) {
      try {
        (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          callback: () => {
            // Recaptcha resolved
          },
          'expired-callback': () => {
            setError('reCAPTCHA expired. Please try again.');
          }
        });
      } catch (err: any) {
        console.error('Recaptcha Init Error:', err);
      }
    }
    
    return () => {
      if ((window as any).recaptchaVerifier) {
        try {
          (window as any).recaptchaVerifier.clear();
        } catch {}
      }
    };
  }, []);

  // 1. Request OTP Action (Real SMS via Firebase)
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    try {
      const appVerifier = (window as any).recaptchaVerifier;
      if (!appVerifier) {
        throw new Error('Verification assistant failed to load. Please refresh the page.');
      }

      const formattedNumber = `+91${cleanPhone}`;
      
      // Request SMS code directly from Firebase SMS Gateway
      const confirmation = await signInWithPhoneNumber(auth, formattedNumber, appVerifier);
      
      setConfirmationResult(confirmation);
      setStep('otp');
    } catch (err: any) {
      console.error('[SMS request error]:', err);
      setError(err?.message || 'Failed to send OTP code. Please check mobile number format.');
    } finally {
      setLoading(false);
    }
  };

  // 2. Verify OTP Action (Firebase confirm & Server JWT session signature)
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (otp.length < 6) {
      setError('Please enter the 6-digit verification code.');
      return;
    }

    if (!confirmationResult) {
      setError('Active session not found. Please request a new verification code.');
      setStep('phone');
      return;
    }

    setLoading(true);
    try {
      // Validate OTP with Firebase server
      const result = await confirmationResult.confirm(otp);
      const user = result.user;
      
      // Fetch verified client ID Token
      const idToken = await user.getIdToken();

      // Submit verified ID Token to backend to set secure httpOnly cookie session
      const res = await fetch('/api/auth/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify-firebase-token', idToken }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Verification validation failed.');
      }

      if (data.needsProfileComplete) {
        // User is brand new! Navigate to complete profile step
        setTempUid(data.tempUid);
        setStep('profile');
      } else {
        // User already exists! Logged in successfully
        router.push('/');
        router.refresh();
      }
    } catch (err: any) {
      console.error('[OTP Verification Error]:', err);
      setError(err?.message || 'Incorrect verification code. Please check and try again.');
    } finally {
      setLoading(false);
    }
  };

  // 3. Complete Profile Action (New User registration)
  const handleCompleteProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!tempUid) {
      setError('Missing authentication session. Please sign in again.');
      setStep('phone');
      return;
    }

    setLoading(true);
    try {
      const cleanPhone = phone.replace(/[^0-9]/g, '');
      const res = await fetch('/api/auth/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'complete-profile',
          tempUid,
          phone: cleanPhone,
          name: name.trim(),
          email: email.trim().toLowerCase(),
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Profile setup failed.');
      }

      // Profile completed successfully! Redirect home
      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError(err?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#6c1cdc]/5 flex flex-col justify-center relative overflow-hidden font-sans">
      {/* Decorative Brand Purple & Yellow Orbs */}
      <div className="absolute top-0 -left-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/15 rounded-full blur-3xl" />

      {/* Top Bar Navigation */}
      <div className="absolute top-6 left-6 z-10">
        <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors text-sm font-semibold">
          <ArrowLeft className="h-4 w-4 text-primary" />
          Back to home
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-[420px] px-4 z-10">
        
        {/* Main Card Wrapper (Strict rounded-[5px] to match platform aesthetics) */}
        <div className="bg-white border border-slate-100 rounded-[5px] shadow-lg shadow-primary/5 overflow-hidden flex flex-col relative pb-8">
          
          {/* Top Residential Houses SVG Illustration */}
          <div className="w-full h-32 relative bg-slate-50 border-b border-slate-100">
            <svg className="w-full h-full object-cover" viewBox="0 0 500 150" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Light subtle sky background */}
              <rect width="500" height="150" fill="#f8fafc" />
              
              {/* Cloud details */}
              <path d="M40 30 C 50 30, 55 25, 60 30 C 65 35, 80 35, 85 30 C 90 25, 100 30, 105 35" stroke="#f1f5f9" strokeWidth="2" strokeLinecap="round" />
              <path d="M380 40 C 390 40, 395 35, 400 40 C 405 45, 420 45, 425 40" stroke="#f1f5f9" strokeWidth="2" strokeLinecap="round" />
              
              {/* Left Tree */}
              <circle cx="50" cy="115" r="16" fill="#e2f1dd" />
              <circle cx="62" cy="108" r="11" fill="#d2e8cb" />
              <rect x="53" y="120" width="3" height="15" fill="#a3b899" />
              
              {/* House 1: Soft Yellow/Cream (Left) */}
              <rect x="80" y="95" width="40" height="40" fill="#fef9c3" />
              <polygon points="75,95 100,75 125,95" fill="#fef08a" />
              <rect x="94" y="110" width="12" height="25" fill="#ca8a04" opacity="0.12" />
              
              {/* House 2: White/Soft Lavender (Left-Center) */}
              <rect x="135" y="80" width="55" height="55" fill="#f4effc" />
              <polygon points="130,80 162.5,55 195,80" fill="#e8def8" />
              <rect x="155" y="98" width="15" height="37" fill="#6c1cdc" opacity="0.1" />
              <rect x="145" y="90" width="10" height="10" fill="#ca8a04" opacity="0.1" />
              
              {/* House 3: Warm Cream (Center-Right) */}
              <rect x="210" y="85" width="60" height="50" fill="#fffbe5" />
              <polygon points="205,85 240,60 275,85" fill="#fef08a" />
              <rect x="232" y="102" width="15" height="33" fill="#b45309" opacity="0.15" />
              
              {/* House 4: Soft Blue-Indigo (Right) */}
              <rect x="290" y="90" width="50" height="45" fill="#eff6ff" />
              <polygon points="285,90 315,68 345,90" fill="#dbeafe" />
              <rect x="308" y="105" width="14" height="30" fill="#3b82f6" opacity="0.12" />
              
              {/* House 5: Small Yellow/Gold (Far Right) */}
              <rect x="360" y="100" width="35" height="35" fill="#fef9c3" />
              <polygon points="355,100 377.5,80 400,100" fill="#fef08a" />
              
              {/* Right Tree */}
              <circle cx="430" cy="118" r="14" fill="#e2f1dd" />
              <rect x="428" y="122" width="3" height="13" fill="#a3b899" />
              
              {/* Clean Ground Horizon Line */}
              <line x1="0" y1="135" x2="500" y2="135" stroke="#e2e8f0" strokeWidth="2" />
            </svg>

            {/* Overlapping Brand Logo Badge (Strict rounded-[5px] to match platform aesthetics) */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 h-14 w-14 bg-primary flex items-center justify-center rounded-[5px] shadow-md border-4 border-white z-20">
              <ChevronUp className="h-8 w-8 text-white stroke-[4]" />
            </div>
          </div>

          <div className="px-8 pt-10 text-center flex flex-col items-center">
            
            {/* Core Titles */}
            <h2 className="text-xl font-extrabold text-gray-900 tracking-tight leading-snug">
              {step === 'phone' && 'Housing Mantra'}
              {step === 'otp' && 'Enter security code'}
              {step === 'profile' && 'Complete Profile'}
            </h2>
            
            <p className="text-sm text-gray-500 font-bold tracking-wider mt-1.5 uppercase">
              {step === 'phone' && 'Log in / sign up'}
              {step === 'otp' && `Verification sent to +91 ${phone}`}
              {step === 'profile' && 'Register your new customer profile'}
            </p>
          </div>

          {/* Form Content container */}
          <div className="px-8 mt-6 w-full">
            <div id="recaptcha-container"></div>
            {error && (
              <div className="mb-5 p-4 bg-red-50 border border-red-100 text-red-600 text-xs rounded-[5px] font-semibold text-center leading-relaxed">
                {error}
              </div>
            )}

            {/* STEP 1: ENTER PHONE NUMBER */}
            {step === 'phone' && (
              <form className="space-y-4" onSubmit={handleRequestOtp}>
                
                {/* Outlined Phone Input with separator exactly as in screenshot (Strict rounded-[5px]) */}
                <div className="flex items-center border border-gray-300 rounded-[5px] px-4 py-3.5 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all bg-white">
                  <span className="text-base font-semibold text-gray-900 pr-3 border-r border-gray-200">+91</span>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                    className="block w-full pl-3 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none text-base font-semibold"
                    placeholder="Phone number"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading || phone.length < 10}
                    className="w-full flex justify-center items-center py-3.5 px-4 bg-primary hover:bg-primary/95 disabled:bg-primary/50 text-white font-extrabold rounded-[5px] text-base transition-all active:scale-[0.99] cursor-pointer shadow-md shadow-primary/10"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      'Continue'
                    )}
                  </button>
                </div>

                <div className="pt-4 text-center">
                  <p className="text-[11px] text-gray-400 font-medium leading-normal">
                    By continuing, you agree to Housing Mantra’s <span className="underline hover:text-primary cursor-pointer">Terms & Conditions</span>.
                  </p>
                </div>
              </form>
            )}

            {/* STEP 2: VERIFY OTP CODE */}
            {step === 'otp' && (
              <form className="space-y-4" onSubmit={handleVerifyOtp}>
                
                {/* Outlined OTP Code Input (Strict rounded-[5px]) */}
                <div className="flex items-center border border-gray-300 rounded-[5px] px-4 py-3.5 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all bg-white">
                  <span className="text-base font-semibold text-gray-400 pr-3 border-r border-gray-200">OTP</span>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                    className="block w-full pl-3 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none text-base tracking-[0.3em] font-black"
                    placeholder="••••••"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading || otp.length < 6}
                    className="w-full flex justify-center items-center py-3.5 px-4 bg-primary hover:bg-primary/95 disabled:bg-primary/50 text-white font-extrabold rounded-[5px] text-base transition-all active:scale-[0.99] cursor-pointer shadow-md shadow-primary/10"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      'Verify & Proceed'
                    )}
                  </button>
                </div>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setStep('phone')}
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    Change phone number
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: COMPLETE PROFILE */}
            {step === 'profile' && (
              <form className="space-y-4" onSubmit={handleCompleteProfile}>
                
                {/* Full name input (Strict rounded-[5px]) */}
                <div className="flex items-center border border-gray-300 rounded-[5px] px-4 py-3.5 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all bg-white">
                  <span className="text-sm font-semibold text-gray-400 pr-3 border-r border-gray-200">Name</span>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-3 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none text-base font-semibold"
                    placeholder="Full name"
                  />
                </div>

                {/* Email address input (Strict rounded-[5px]) */}
                <div className="flex items-center border border-gray-300 rounded-[5px] px-4 py-3.5 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all bg-white">
                  <span className="text-sm font-semibold text-gray-400 pr-3 border-r border-gray-200">Email</span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-3 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none text-base font-semibold"
                    placeholder="Email address"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center py-3.5 px-4 bg-primary hover:bg-primary/95 disabled:bg-primary/50 text-white font-extrabold rounded-[5px] text-base transition-all active:scale-[0.99] cursor-pointer shadow-md"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      'Complete & Sign In'
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
