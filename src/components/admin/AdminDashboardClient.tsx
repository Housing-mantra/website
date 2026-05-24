"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Building2, Users, FileText, Plus, LogOut, ShieldAlert,
  Search, Shield, Check, Trash2, Mail, Phone, Calendar
} from 'lucide-react';
import Link from 'next/link';

interface AdminDashboardClientProps {
  stats: {
    projects: number;
    developers: number;
    users: number;
    leads: number;
  };
  projects: any[];
  users: any[];
  leads: any[];
  currentUser: {
    name: string;
    email: string;
  };
}

export function AdminDashboardClient({ stats, projects, users, leads, currentUser }: AdminDashboardClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'users' | 'leads'>('overview');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  
  // Add User Form State
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState('CUSTOMER'); // CUSTOMER, AGENT, ADMIN
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  // Search States
  const [projectSearch, setProjectSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [leadSearch, setLeadSearch] = useState('');

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.refresh();
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);

    try {
      const res = await fetch('/api/admin/users/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newUserName,
          email: newUserEmail,
          phone: newUserPhone,
          password: newUserPassword,
          role: newUserRole,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to create user.');
      }

      // Success
      setIsAddUserOpen(false);
      setNewUserName('');
      setNewUserEmail('');
      setNewUserPhone('');
      setNewUserPassword('');
      setNewUserRole('CUSTOMER');
      router.refresh();
    } catch (err: any) {
      setFormError(err?.message || 'Error creating user.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteUser = async (id: string, email: string) => {
    if (email === 'admin@housingmantra.in') {
      alert('Cannot delete the primary admin user!');
      return;
    }
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const res = await fetch(`/api/admin/users/delete?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok && data.success) {
        router.refresh();
      } else {
        alert(data.message || 'Delete failed.');
      }
    } catch (err) {
      alert('Error deleting user.');
    }
  };

  // Filters
  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
    p.location.toLowerCase().includes(projectSearch.toLowerCase())
  );

  const filteredUsers = users.filter(u => 
    (u.name || '').toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.role.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
    l.mobile.includes(leadSearch) ||
    (l.project?.title || '').toLowerCase().includes(leadSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50/50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo Header - Brand Match */}
          <div className="h-16 flex items-center px-6 border-b border-gray-100 bg-white">
            <span className="text-xl font-bold text-gray-900 tracking-tight flex items-center">
              Housing<span className="text-primary font-extrabold">Mantra</span>
              <span className="text-[10px] font-bold uppercase bg-primary/10 text-primary px-2 py-0.5 rounded ml-2 tracking-wider">
                Admin
              </span>
            </span>
          </div>

          {/* User Info Card */}
          <div className="p-5 border-b border-gray-100 bg-gray-50/30">
            <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Logged In As</p>
            <p className="font-bold text-sm text-gray-800 mt-1 truncate">{currentUser.name}</p>
            <p className="text-xs text-gray-500 truncate mt-0.5">{currentUser.email}</p>
          </div>

          {/* Menu Items - Premium Brand Align */}
          <nav className="p-4 space-y-1">
            {[
              { id: 'overview', label: 'Overview', icon: Building2 },
              { id: 'projects', label: 'Manage Projects', icon: Building2 },
              { id: 'users', label: 'Manage Users', icon: Users },
              { id: 'leads', label: 'Enquiries / Leads', icon: FileText },
            ].map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-[5px] text-sm font-semibold transition-all ${
                    activeTab === item.id 
                      ? 'bg-primary/5 text-primary shadow-none border-l-2 border-primary rounded-l-none' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 hover:text-red-700 rounded-[5px] text-sm font-bold transition-all"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 border-b border-gray-100 flex items-center justify-between px-8 bg-white shrink-0">
          <h1 className="text-lg font-black tracking-tight text-gray-800 capitalize">
            {activeTab} Dashboard
          </h1>
          <div className="text-xs text-gray-400 font-extrabold uppercase tracking-widest">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </header>

        <div className="p-8 max-w-7xl w-full mx-auto space-y-8 flex-1">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Cards - Premium Modern Minimalist Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: 'Total Projects', count: stats.projects, icon: Building2 },
                  { label: 'Developers', count: stats.developers, icon: Building2 },
                  { label: 'Registered Users', count: stats.users, icon: Users },
                  { label: 'Captured Leads', count: stats.leads, icon: FileText },
                ].map((card, i) => {
                  const Icon = card.icon;
                  return (
                    <div key={i} className="p-6 border border-gray-100 bg-white rounded-[5px] flex items-center justify-between shadow-sm">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{card.label}</p>
                        <p className="text-3xl font-black text-gray-900 mt-2">{card.count}</p>
                      </div>
                      <div className="h-12 w-12 bg-primary/5 rounded-[5px] flex items-center justify-center text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Recent Leads */}
              <div className="bg-white border border-gray-100 rounded-[5px] p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Recent Enquiries</h3>
                  <button onClick={() => setActiveTab('leads')} className="text-xs font-bold text-primary hover:underline">
                    View All Leads
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/50 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
                        <th className="p-4">Client Details</th>
                        <th className="p-4">Project</th>
                        <th className="p-4">Form Name</th>
                        <th className="p-4">CRM Status</th>
                        <th className="p-4 text-right">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm text-gray-700 bg-white">
                      {leads.slice(0, 5).map(lead => (
                        <tr key={lead.id} className="hover:bg-gray-50/30 transition-colors">
                          <td className="p-4">
                            <p className="font-bold text-gray-900">{lead.name}</p>
                            <p className="text-xs text-gray-400 font-semibold mt-0.5">{lead.mobile}</p>
                          </td>
                          <td className="p-4 font-bold text-primary">{lead.project?.title || 'Unknown Project'}</td>
                          <td className="p-4 text-xs text-gray-500 font-semibold">{lead.queryForm}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-[5px] text-[10px] font-extrabold tracking-wider ${
                              lead.crmSynced ? 'bg-emerald-50 text-emerald-700 border border-emerald-100/60' : 'bg-amber-50 text-amber-700 border border-amber-100/60'
                            }`}>
                              {lead.crmSynced ? 'SYNCED' : 'PENDING'}
                            </span>
                          </td>
                          <td className="p-4 text-right text-xs text-gray-400 font-semibold">
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                      {leads.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-12 text-center text-gray-400 font-semibold">No leads captured yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={projectSearch}
                    onChange={e => setProjectSearch(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-[5px] pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 placeholder-gray-400 font-semibold transition-all"
                  />
                </div>
                <div className="w-full md:w-auto">
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/95 text-white text-xs font-bold uppercase tracking-wider rounded-[5px] shadow-sm active:scale-95 transition-all cursor-pointer">
                    <Plus className="h-4 w-4" /> Add Project
                  </button>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-[5px] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/50 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
                        <th className="p-4">Project Info</th>
                        <th className="p-4">Location</th>
                        <th className="p-4">Price</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Type</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm text-gray-700 bg-white">
                      {filteredProjects.map(proj => (
                        <tr key={proj.id} className="hover:bg-gray-50/30 transition-colors">
                          <td className="p-4 flex items-center gap-3">
                            <img src={proj.image} alt={proj.title} className="h-10 w-10 object-cover rounded-[5px] border border-gray-100 shadow-sm" />
                            <div>
                              <p className="font-bold text-gray-900">{proj.title}</p>
                              <p className="text-xs text-gray-400 font-semibold mt-0.5">By {proj.developer?.name}</p>
                            </div>
                          </td>
                          <td className="p-4 font-semibold text-gray-600">{proj.location}</td>
                          <td className="p-4 text-primary font-black">{proj.price}</td>
                          <td className="p-4">
                            <span className="px-2.5 py-1 rounded-[5px] text-[10px] font-extrabold bg-gray-50 text-primary border border-gray-200 uppercase tracking-wider">
                              {proj.status}
                            </span>
                          </td>
                          <td className="p-4 text-xs text-gray-500 font-semibold">{proj.type}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: USERS */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={userSearch}
                    onChange={e => setUserSearch(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-[5px] pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 placeholder-gray-400 font-semibold transition-all"
                  />
                </div>
                <div className="w-full md:w-auto">
                  <button 
                    onClick={() => setIsAddUserOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/95 text-white text-xs font-bold uppercase tracking-wider rounded-[5px] shadow-sm active:scale-95 transition-all cursor-pointer"
                  >
                    <Plus className="h-4 w-4" /> Add User / Agent
                  </button>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-[5px] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/50 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
                        <th className="p-4">Name / Contact</th>
                        <th className="p-4">Email Address</th>
                        <th className="p-4">Role</th>
                        <th className="p-4">Joined Date</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm text-gray-700 bg-white">
                      {filteredUsers.map(user => (
                        <tr key={user.id} className="hover:bg-gray-50/30 transition-colors">
                          <td className="p-4">
                            <p className="font-bold text-gray-900 flex items-center gap-1.5">
                              {user.name || 'Anonymous'}
                              {user.role === 'ADMIN' && <Shield className="h-3.5 w-3.5 text-primary fill-primary/10" />}
                            </p>
                            <p className="text-xs text-gray-400 font-semibold mt-0.5">{user.phone || 'No phone'}</p>
                          </td>
                          <td className="p-4 font-semibold text-gray-600">{user.email}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-[5px] text-[10px] font-extrabold tracking-wider ${
                              user.role === 'ADMIN' 
                                ? 'bg-red-50 text-red-700 border border-red-100/60' 
                                : user.role === 'AGENT'
                                  ? 'bg-primary/10 text-primary border border-primary/20'
                                  : 'bg-emerald-50 text-emerald-700 border border-emerald-100/60'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="p-4 text-xs text-gray-400 font-semibold">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleDeleteUser(user.id, user.email)}
                              className="text-gray-400 hover:text-red-655 text-red-500 p-1.5 rounded hover:bg-red-50 transition-all cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LEADS */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search leads..."
                    value={leadSearch}
                    onChange={e => setLeadSearch(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-[5px] pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 placeholder-gray-400 font-semibold transition-all"
                  />
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-[5px] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/50 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
                        <th className="p-4">Customer Details</th>
                        <th className="p-4">Project Interest</th>
                        <th className="p-4">Message</th>
                        <th className="p-4">CRM Sync</th>
                        <th className="p-4 text-right">Captured</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm text-gray-700 bg-white">
                      {filteredLeads.map(lead => (
                        <tr key={lead.id} className="hover:bg-gray-50/30 transition-colors">
                          <td className="p-4">
                            <p className="font-bold text-gray-900">{lead.name}</p>
                            <div className="flex items-center gap-3 text-xs text-gray-400 mt-1 font-semibold">
                              <span className="flex items-center gap-1"><Phone className="h-3 w-3 text-primary" />{lead.mobile}</span>
                              {lead.email && <span className="flex items-center gap-1"><Mail className="h-3 w-3 text-primary" />{lead.email}</span>}
                            </div>
                          </td>
                          <td className="p-4">
                            <p className="font-bold text-primary">{lead.project?.title || 'Unknown Project'}</p>
                            <p className="text-xs text-gray-400 font-semibold mt-0.5">{lead.queryForm}</p>
                          </td>
                          <td className="p-4 text-gray-550 italic max-w-xs truncate font-semibold">{lead.message || 'No custom query'}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-[5px] text-[10px] font-extrabold tracking-wider ${
                              lead.crmSynced ? 'bg-emerald-50 text-emerald-700 border border-emerald-100/60' : 'bg-amber-50 text-amber-700 border border-amber-100/60'
                            }`}>
                              {lead.crmSynced ? 'SYNCED' : 'PENDING'}
                            </span>
                          </td>
                          <td className="p-4 text-right text-xs text-gray-400 font-semibold">
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Add User Modal */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white border border-gray-100 rounded-[5px] w-full max-w-md p-8 shadow-2xl relative">
            <h3 className="text-lg font-bold text-gray-800 mb-6 uppercase tracking-wider">Create User Profile</h3>

            {formError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-100 text-red-650 text-xs rounded-[5px] font-semibold">
                {formError}
              </div>
            )}

            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={e => setNewUserName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 placeholder-gray-400 font-semibold transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={e => setNewUserEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 placeholder-gray-400 font-semibold transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Phone</label>
                <input
                  type="text"
                  value={newUserPhone}
                  onChange={e => setNewUserPhone(e.target.value)}
                  placeholder="Phone number"
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 placeholder-gray-400 font-semibold transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Password</label>
                <input
                  type="password"
                  required
                  value={newUserPassword}
                  onChange={e => setNewUserPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 placeholder-gray-400 font-semibold transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Assign Role</label>
                <select
                  value={newUserRole}
                  onChange={e => setNewUserRole(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 font-bold transition-all"
                >
                  <option value="CUSTOMER">CUSTOMER (Standard User)</option>
                  <option value="AGENT">AGENT (Broker / Builder)</option>
                  <option value="ADMIN">ADMIN (Super User)</option>
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 py-3.5 rounded-[5px] text-sm font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex-1 bg-primary hover:bg-primary/95 text-white py-3.5 rounded-[5px] text-sm font-bold transition-all shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {formLoading ? 'Creating...' : 'Save User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
