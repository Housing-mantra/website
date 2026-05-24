"use client";

import React, { useState } from 'react';
import { Lock, Mail, Loader2, ShieldAlert } from 'lucide-react';

export function AdminLoginClient() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center relative overflow-hidden font-sans">
      {/* Decorative Brand Purple & Yellow Orbs */}
      <div className="absolute top-0 -left-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-6 z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4 bg-muted px-4 py-1.5 rounded-[5px] border border-border">
            <ShieldAlert className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Security Control</span>
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            Housing<span className="text-primary font-extrabold">Mantra</span>
          </h2>
          <p className="mt-2 text-sm text-gray-500 font-medium">
            Administrative Management Portal
          </p>
        </div>

        <div className="bg-white border border-border p-8 rounded-[5px] shadow-lg shadow-primary/5">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-[5px] font-medium">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 bg-muted/30 border border-border rounded-[5px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all font-medium"
                  placeholder="admin@housingmantra.in"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 bg-muted/30 border border-border rounded-[5px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white font-bold rounded-[5px] text-sm transition-all shadow-md active:scale-[0.99] cursor-pointer"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  'Authorize Access'
                )}
              </button>
            </div>
          </form>

          {/* Test Credentials info */}
          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2 text-primary">Testing Credentials</p>
            <p className="text-xs text-gray-600 font-medium font-bold">admin@housingmantra.in / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
