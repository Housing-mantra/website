"use client";

import React, { useState } from 'react';
import { Lock, Mail, Loader2, ShieldAlert } from 'lucide-react';

export function AdminLoginClient() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <div className="min-h-screen bg-gray-50/60 flex flex-col justify-center relative overflow-hidden font-sans">
      {/* Decorative Brand Purple & Yellow Orbs */}
      <div className="absolute top-0 -left-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-6 z-10">
        <div className="bg-white border border-gray-100 p-8 rounded-[5px] shadow-sm">
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-1.5 select-none">
              <svg className="h-[36px] w-[36px] shrink-0" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="40" cy="40" r="36" fill="none" stroke="#111827" strokeWidth="2.5" />
                  <circle cx="40" cy="40" r="30.5" fill="none" stroke="#111827" strokeWidth="1.2" />
                  <path d="M40 22 L22 36 L24 55 L56 55 L58 36 Z" fill="none" stroke="#111827" strokeWidth="2.5" strokeLinejoin="round" />
                  <path d="M40 33 L30 42 L30 55 L50 55 L50 42 Z" fill="#b91c1c" />
              </svg>
              <div className="text-left flex flex-col items-stretch w-fit leading-none gap-0.5">
                  <div className="relative">
                      <span className="text-[20px] font-oswald font-black text-gray-900 tracking-tight leading-none whitespace-nowrap">
                          HOUSING MANTRA
                      </span>
                      <span className="text-[6px] font-sans font-extrabold text-gray-900 select-none absolute -right-3 top-0">TM</span>
                  </div>
                  <div className="w-full bg-gray-950 text-white text-[7.5px] font-sans font-black uppercase tracking-[0.04em] py-0.5 rounded-[1px] text-center whitespace-nowrap">
                      Everything About Real-Estate
                  </div>
              </div>
            </div>
          </div>

          <h2 className="text-center text-sm font-black text-gray-800 uppercase tracking-widest mb-6">
            {mode === 'login' ? 'Admin Portal Access' : 'Password Recovery'}
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-650 text-xs rounded-[5px] font-semibold text-center animate-shake">
              {error}
            </div>
          )}

          {resetSuccess && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs rounded-[5px] font-semibold text-center">
              {resetSuccess}
            </div>
          )}

          {mode === 'login' ? (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Admin Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-[5px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all font-semibold"
                    placeholder="admin@housingmantra.in"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('forgot');
                      setError('');
                      setResetSuccess('');
                      setResetLink('');
                    }}
                    className="text-xs font-bold text-primary hover:text-primary/80 transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Lock className="h-4.5 w-4.5" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-[5px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all font-semibold"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center py-3 px-4 bg-primary hover:bg-primary/95 disabled:bg-primary/50 text-white font-bold rounded-[5px] text-sm transition-all shadow-sm active:scale-[0.99] cursor-pointer"
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
            <form className="space-y-5" onSubmit={handleResetSubmit}>
              <div>
                <label htmlFor="resetEmail" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Verify Admin Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                  <input
                    id="resetEmail"
                    name="resetEmail"
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="block w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-[5px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all font-semibold"
                    placeholder="admin@housingmantra.in"
                  />
                </div>
              </div>

              {resetLink && (
                <div className="pt-2 animate-bounce-short">
                  <a
                    href={resetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex justify-center items-center text-center py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-[5px] text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    👉 Set New Password Now
                  </a>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setError('');
                    setResetSuccess('');
                    setResetLink('');
                  }}
                  className="flex-1 text-center py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-[5px] text-sm transition-all cursor-pointer"
                >
                  Back to Login
                </button>
                
                {!resetLink && (
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 flex justify-center items-center py-3 bg-primary hover:bg-primary/95 disabled:bg-primary/50 text-white font-bold rounded-[5px] text-sm transition-all shadow-sm active:scale-[0.99] cursor-pointer"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      'Reset Password'
                    )}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
