"use client";
 
import React, { useState } from 'react';
import { Lock, Mail, Loader2, ShieldAlert, ChevronUp, Eye, EyeOff } from 'lucide-react';
 
export function AdminLoginClient() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
 
  // Password Reset States
  const [mode, setMode] = useState<'login' | 'forgot'>('login');
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  const [resetLink, setResetLink] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Login failed.');
      }

      if (data.user.role !== 'ADMIN') {
        throw new Error('Forbidden. You do not have administrator permissions.');
      }

      // Successful admin login, reload page to load dashboard
      window.location.reload();
    } catch (err: any) {
      setError(err?.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResetSuccess('');
    setResetLink('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to request reset link.');
      }

      setResetSuccess(data.message);
      if (data.resetLink) {
        setResetLink(data.resetLink);
      }
    } catch (err: any) {
      setError(err?.message || 'Error requesting reset.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#6c1cdc]/5 flex flex-col justify-center relative overflow-hidden admin-font">
      {/* Decorative Brand Purple & Yellow Orbs */}
      <div className="absolute top-0 -left-10 w-[500px] h-[500px] bg-[#6c1cdc]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#f6d40c]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-[420px] px-4 z-10">
        
        {/* Main Card Wrapper (Strict rounded-[5px] to match platform aesthetics) */}
        <div 
          className="bg-white border border-transparent rounded-[5px] overflow-hidden flex flex-col relative pb-8"
          style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}
        >
          
          {/* Top Residential Houses SVG Illustration */}
          <div className="w-full h-32 relative bg-slate-50 border-b border-slate-100">
            <svg className="w-full h-full object-cover" viewBox="0 0 500 150" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="500" height="150" fill="#f8fafc" />
              <path d="M40 30 C 50 30, 55 25, 60 30 C 65 35, 80 35, 85 30 C 90 25, 100 30, 105 35" stroke="#f1f5f9" strokeWidth="2" strokeLinecap="round" />
              <path d="M380 40 C 390 40, 395 35, 400 40 C 405 45, 420 45, 425 40" stroke="#f1f5f9" strokeWidth="2" strokeLinecap="round" />
              <circle cx="50" cy="115" r="16" fill="#e2f1dd" />
              <circle cx="62" cy="108" r="11" fill="#d2e8cb" />
              <rect x="53" y="120" width="3" height="15" fill="#a3b899" />
              <rect x="80" y="95" width="40" height="40" fill="#fef9c3" />
              <polygon points="75,95 100,75 125,95" fill="#fef08a" />
              <rect x="94" y="110" width="12" height="25" fill="#ca8a04" opacity="0.12" />
              <rect x="135" y="80" width="55" height="55" fill="#f4effc" />
              <polygon points="130,80 162.5,55 195,80" fill="#e8def8" />
              <rect x="155" y="98" width="15" height="37" fill="#6c1cdc" opacity="0.1" />
              <rect x="145" y="90" width="10" height="10" fill="#ca8a04" opacity="0.1" />
              <rect x="210" y="85" width="60" height="50" fill="#fffbe5" />
              <polygon points="205,85 240,60 275,85" fill="#fef08a" />
              <rect x="232" y="102" width="15" height="33" fill="#b45309" opacity="0.15" />
              <rect x="290" y="90" width="50" height="45" fill="#eff6ff" />
              <polygon points="285,90 315,68 345,90" fill="#dbeafe" />
              <rect x="308" y="105" width="14" height="30" fill="#3b82f6" opacity="0.12" />
              <rect x="360" y="100" width="35" height="35" fill="#fef9c3" />
              <polygon points="355,100 377.5,80 400,100" fill="#fef08a" />
              <circle cx="430" cy="118" r="14" fill="#e2f1dd" />
              <rect x="428" y="122" width="3" height="13" fill="#a3b899" />
              <line x1="0" y1="135" x2="500" y2="135" stroke="#e2e8f0" strokeWidth="2" />
            </svg>
            {/* Overlapping Brand Logo Badge (Strict rounded-[5px] to match platform aesthetics) */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 h-14 w-14 bg-[#6c1cdc] flex items-center justify-center rounded-[5px] shadow-md border-4 border-white z-20">
              <ChevronUp className="h-8 w-8 text-white stroke-[4]" />
            </div>
          </div>

          <div className="px-8 pt-10 text-center flex flex-col items-center">
            <h2 className="text-xl font-extrabold text-gray-900 tracking-tight leading-snug">
              {mode === 'login' ? 'Housing Mantra' : 'Password Recovery'}
            </h2>
            <p className="text-sm text-gray-500 font-bold tracking-wider mt-1.5 uppercase">
              {mode === 'login' ? 'Admin Access Portal' : 'Reset secret password'}
            </p>
          </div>

          {/* Form Content container */}
          <div className="px-8 mt-6 w-full">
            {error && (
              <div className="mb-5 p-4 bg-red-50 border border-red-100 text-red-600 text-xs rounded-[5px] font-semibold text-center leading-relaxed">
                {error}
              </div>
            )}

            {resetSuccess && (
              <div className="mb-5 p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs rounded-[5px] font-semibold text-center leading-relaxed">
                {resetSuccess}
              </div>
            )}

            {mode === 'login' ? (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-slate-700 mb-2">
                    Admin Email Address
                  </label>
                  <div className="relative flex items-center border border-gray-300 rounded-[5px] px-3.5 py-3 focus-within:ring-2 focus-within:ring-[#6c1cdc]/20 focus-within:border-[#6c1cdc] transition-all bg-white">
                    <Mail className="h-4.5 w-4.5 text-gray-400 mr-2.5" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none text-sm font-semibold"
                      placeholder="yourname@housingmantra.in"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="password" className="block text-xs font-bold text-slate-700">
                      Secret Password
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setMode('forgot');
                        setError('');
                        setResetSuccess('');
                        setResetLink('');
                      }}
                      className="text-xs font-bold text-[#6c1cdc] hover:text-[#510fb3] transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative flex items-center border border-gray-300 rounded-[5px] px-3.5 py-3 focus-within:ring-2 focus-within:ring-[#6c1cdc]/20 focus-within:border-[#6c1cdc] transition-all bg-white">
                    <Lock className="h-4.5 w-4.5 text-gray-400 mr-2.5" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none text-sm font-semibold pr-8"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4.5 w-4.5" />
                      ) : (
                        <Eye className="h-4.5 w-4.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center py-3.5 px-4 bg-gradient-to-r from-[#6c1cdc] to-[#510fb3] hover:from-[#7b2be4] hover:to-[#5e12cc] disabled:from-[#6c1cdc]/40 disabled:to-[#510fb3]/40 text-white font-extrabold rounded-[5px] text-sm transition-all active:scale-[0.99] cursor-pointer shadow-md shadow-[#6c1cdc]/10"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      'Authorize Access'
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <form className="space-y-4" onSubmit={handleResetSubmit}>
                <div>
                  <label htmlFor="resetEmail" className="block text-xs font-bold text-slate-700 mb-2">
                    Verify Admin Email
                  </label>
                  <div className="relative flex items-center border border-gray-300 rounded-[5px] px-3.5 py-3 focus-within:ring-2 focus-within:ring-[#6c1cdc]/20 focus-within:border-[#6c1cdc] transition-all bg-white">
                    <Mail className="h-4.5 w-4.5 text-gray-400 mr-2.5" />
                    <input
                      id="resetEmail"
                      name="resetEmail"
                      type="email"
                      required
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="block w-full bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none text-sm font-semibold"
                      placeholder="yourname@housingmantra.in"
                    />
                  </div>
                </div>

                {resetLink && (
                  <div className="pt-2 animate-bounce-short">
                    <a
                      href={resetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex justify-center items-center text-center py-3.5 px-4 bg-gradient-to-r from-[#10b981] to-[#047857] hover:from-[#059669] hover:to-[#065f46] text-white font-bold rounded-[5px] text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      👉 Set New Password Now
                    </a>
                  </div>
                )}

                <div className="flex gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setError('');
                      setResetSuccess('');
                      setResetLink('');
                    }}
                    className="flex-1 text-center py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 font-bold rounded-[5px] text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Back to Login
                  </button>
                  
                  {!resetLink && (
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 flex justify-center items-center py-3.5 bg-gradient-to-r from-[#6c1cdc] to-[#510fb3] hover:from-[#7b2be4] hover:to-[#5e12cc] disabled:from-[#6c1cdc]/40 disabled:to-[#510fb3]/40 text-white font-bold rounded-[5px] text-xs uppercase tracking-wider transition-all shadow-md active:scale-[0.99] cursor-pointer"
                    >
                      {loading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        'Reset'
                      )}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
