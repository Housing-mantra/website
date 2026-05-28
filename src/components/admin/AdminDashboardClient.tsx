"use client";

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Building2, Users, FileText, Plus, LogOut, ShieldAlert,
  Search, Shield, Check, Trash2, Mail, Phone, Calendar, Briefcase, Pencil, ChevronUp
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
  developers: any[];
  users: any[];
  leads: any[];
  currentUser: {
    name: string;
    email: string;
  };
}

export function AdminDashboardClient({ stats, projects, developers, users, leads, currentUser }: AdminDashboardClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const activeTab: 'overview' | 'projects' | 'developers' | 'users' | 'leads' | 'add-project' | 'add-developer' = 
    pathname === '/admin/projects/add' ? 'add-project' :
    pathname === '/admin/developers/add' ? 'add-developer' :
    pathname.includes('/projects') ? 'projects' :
    pathname.includes('/developers') ? 'developers' :
    pathname.includes('/users') ? 'users' :
    pathname.includes('/leads') ? 'leads' : 'overview';

  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
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
  const [devSearch, setDevSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [leadSearch, setLeadSearch] = useState('');

  // Add Developer Form State
  const [isAddDevOpen, setIsAddDevOpen] = useState(false);
  const [isEditDevOpen, setIsEditDevOpen] = useState(false);
  const [editingDeveloperId, setEditingDeveloperId] = useState('');
  const [devName, setDevName] = useState('');
  const [devLogo, setDevLogo] = useState('');
  const [devImage, setDevImage] = useState('');
  const [devExperience, setDevExperience] = useState('');
  const [devProjectsDelivered, setDevProjectsDelivered] = useState('');
  const [devOngoingProjects, setDevOngoingProjects] = useState('');
  const [devDescription, setDevDescription] = useState('');
  const [devEstablished, setDevEstablished] = useState('');

  // Add Project Form State
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDeveloperId, setProjectDeveloperId] = useState('');
  const [projectStatus, setProjectStatus] = useState('UNDER_CONSTRUCTION');
  const [projectType, setProjectType] = useState('Apartment');
  const [projectRera, setProjectRera] = useState('');
  const [projectPrice, setProjectPrice] = useState('');
  const [projectLocation, setProjectLocation] = useState('');
  const [projectCity, setProjectCity] = useState('Pune');
  const [projectPossession, setProjectPossession] = useState('');
  const [projectLandArea, setProjectLandArea] = useState('');
  const [projectTowers, setProjectTowers] = useState('');
  const [projectUnits, setProjectUnits] = useState('');
  const [projectImage, setProjectImage] = useState('');
  const [projectGallery, setProjectGallery] = useState('');
  const [projectFeatures, setProjectFeatures] = useState('');
  const [projectAttractions, setProjectAttractions] = useState('');
  const [projectDescription, setProjectDescription] = useState('');



  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await fetch(`/api/admin/projects/delete?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok && data.success) {
        router.refresh();
      } else {
        alert(data.message || 'Delete failed.');
      }
    } catch (err) {
      alert('Error deleting project.');
    }
  };

  const handleStartEditProject = (proj: any) => {
    setEditingProjectId(proj.id);
    setProjectTitle(proj.title || '');
    setProjectDeveloperId(proj.developerId || '');
    setProjectStatus(proj.status || 'UNDER_CONSTRUCTION');
    setProjectType(proj.type || 'Apartment');
    setProjectRera(proj.rera || '');
    setProjectPrice(proj.price || '');
    setProjectLocation(proj.location || '');
    setProjectCity(proj.city || 'Pune');
    setProjectPossession(proj.possession || '');
    setProjectLandArea(proj.landArea || '');
    setProjectTowers(proj.towers || '');
    setProjectUnits(proj.units || '');
    setProjectImage(proj.image || '');
    setProjectGallery(proj.gallery || '');
    setProjectFeatures(proj.features || '');
    setProjectAttractions(proj.attractions || '');
    setProjectDescription(proj.description || '');
    setFormError('');
    setIsEditProjectOpen(true);
  };

  const handleEditProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);

    try {
      const res = await fetch('/api/admin/projects/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingProjectId,
          title: projectTitle,
          developerId: projectDeveloperId,
          status: projectStatus,
          type: projectType,
          rera: projectRera,
          price: projectPrice,
          location: projectLocation,
          city: projectCity,
          possession: projectPossession,
          landArea: projectLandArea,
          towers: projectTowers,
          units: projectUnits,
          image: projectImage,
          gallery: projectGallery,
          features: projectFeatures,
          attractions: projectAttractions,
          description: projectDescription,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to update project.');
      }

      // Success
      setIsEditProjectOpen(false);
      setEditingProjectId('');
      setProjectTitle('');
      setProjectDeveloperId('');
      setProjectStatus('UNDER_CONSTRUCTION');
      setProjectType('Apartment');
      setProjectRera('');
      setProjectPrice('');
      setProjectLocation('');
      setProjectCity('Pune');
      setProjectPossession('');
      setProjectLandArea('');
      setProjectTowers('');
      setProjectUnits('');
      setProjectImage('');
      setProjectGallery('');
      setProjectFeatures('');
      setProjectAttractions('');
      setProjectDescription('');
      router.refresh();
    } catch (err: any) {
      setFormError(err?.message || 'Error updating project.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleAddDeveloper = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);

    try {
      const res = await fetch('/api/admin/developers/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: devName,
          logo: devLogo,
          image: devImage,
          experience: devExperience,
          projectsDelivered: devProjectsDelivered,
          ongoingProjects: devOngoingProjects,
          description: devDescription,
          established: devEstablished,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to add developer.');
      }

      // Reset
      setIsAddDevOpen(false);
      setDevName('');
      setDevLogo('');
      setDevImage('');
      setDevExperience('');
      setDevProjectsDelivered('');
      setDevOngoingProjects('');
      setDevDescription('');
      setDevEstablished('');
      router.push('/admin/developers');
      router.refresh();
    } catch (err: any) {
      setFormError(err?.message || 'Error creating developer profile.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteDeveloper = async (id: string) => {
    if (!confirm('Are you sure you want to delete this developer? This will remove their record from Firestore.')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/developers/delete?id=${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to delete developer.');
      }

      router.refresh();
    } catch (err: any) {
      alert(err?.message || 'Error deleting developer.');
    }
  };

  const handleStartEditDeveloper = (dev: any) => {
    setEditingDeveloperId(dev.id);
    setDevName(dev.name || '');
    setDevLogo(dev.logo || '');
    setDevImage(dev.image || '');
    setDevExperience(dev.experience || '');
    setDevProjectsDelivered(dev.projectsDelivered || '');
    setDevOngoingProjects(dev.ongoingProjects || '');
    setDevDescription(dev.description || '');
    setDevEstablished(dev.established?.toString() || '');
    setFormError('');
    setIsEditDevOpen(true);
  };

  const handleEditDeveloperSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);

    try {
      const res = await fetch('/api/admin/developers/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingDeveloperId,
          name: devName,
          logo: devLogo,
          image: devImage,
          experience: devExperience,
          projectsDelivered: devProjectsDelivered,
          ongoingProjects: devOngoingProjects,
          description: devDescription,
          established: devEstablished,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to update developer profile.');
      }

      // Reset
      setIsEditDevOpen(false);
      setEditingDeveloperId('');
      setDevName('');
      setDevLogo('');
      setDevImage('');
      setDevExperience('');
      setDevProjectsDelivered('');
      setDevOngoingProjects('');
      setDevDescription('');
      setDevEstablished('');
      router.refresh();
    } catch (err: any) {
      setFormError(err?.message || 'Error updating developer profile.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);

    try {
      const res = await fetch('/api/admin/projects/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: projectTitle,
          developerId: projectDeveloperId || (developers[0]?.id || ''),
          status: projectStatus,
          type: projectType,
          rera: projectRera,
          price: projectPrice,
          location: projectLocation,
          city: projectCity,
          possession: projectPossession,
          landArea: projectLandArea,
          towers: projectTowers,
          units: projectUnits,
          image: projectImage,
          gallery: projectGallery,
          features: projectFeatures,
          attractions: projectAttractions,
          description: projectDescription,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to create project.');
      }

      // Success
      setIsAddProjectOpen(false);
      // Reset form
      setProjectTitle('');
      setProjectDeveloperId('');
      setProjectStatus('UNDER_CONSTRUCTION');
      setProjectType('Apartment');
      setProjectRera('');
      setProjectPrice('');
      setProjectLocation('');
      setProjectCity('Pune');
      setProjectPossession('');
      setProjectLandArea('');
      setProjectTowers('');
      setProjectUnits('');
      setProjectImage('');
      setProjectGallery('');
      setProjectFeatures('');
      setProjectAttractions('');
      setProjectDescription('');
      router.push('/admin/projects');
      router.refresh();
    } catch (err: any) {
      setFormError(err?.message || 'Error creating project.');
    } finally {
      setFormLoading(false);
    }
  };

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
    if (email === 'digital.housingmantra@gmail.com') {
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

  const filteredDevelopers = (developers || []).filter(d => 
    d.name.toLowerCase().includes(devSearch.toLowerCase()) ||
    (d.description || '').toLowerCase().includes(devSearch.toLowerCase())
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
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex admin-font relative overflow-hidden">
      {/* Premium Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#6c1cdc]/3 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#f6d40c]/3 rounded-full blur-[140px] pointer-events-none" />

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col justify-between shrink-0 z-10 shadow-sm">
        <div>
          {/* Logo Header - Brand Match */}
          <div className="h-16 flex items-center px-2 border-b border-slate-100 bg-transparent justify-start shrink-0 overflow-visible">
            <Link href="/" className="flex items-center gap-1.5 select-none shrink-0 overflow-visible">
              {/* Beautiful sharp icon */}
              <svg className="h-[38px] w-[38px] md:h-10 md:w-10 shrink-0" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="40" cy="40" r="36" fill="none" stroke="#111827" strokeWidth="2.5" />
                  <circle cx="40" cy="40" r="30.5" fill="none" stroke="#111827" strokeWidth="1.2" />
                  <path d="M40 22 L22 36 L24 55 L56 55 L58 36 Z" fill="none" stroke="#111827" strokeWidth="2.5" strokeLinejoin="round" />
                  <path d="M40 33 L30 42 L30 55 L50 55 L50 42 Z" fill="#b91c1c" />
              </svg>
              
              {/* Brand Text Column */}
              <div className="flex flex-col items-stretch w-fit leading-none gap-1 shrink-0 overflow-visible">
                  <div className="relative overflow-visible">
                      <span className="text-[22px] font-oswald font-black text-gray-900 tracking-tight leading-none whitespace-nowrap">
                          HOUSING MANTRA
                      </span>
                      <span className="text-[7px] font-sans font-extrabold text-gray-900 select-none absolute -right-3.5 top-0">TM</span>
                  </div>
                  <div className="w-full bg-gray-950 text-white text-[7.5px] font-sans font-black uppercase tracking-[0.04em] py-0.5 rounded-[1px] text-center whitespace-nowrap">
                      Everything About Real-Estate
                  </div>
              </div>
            </Link>
          </div>

          {/* Menu Items - Premium Brand Align */}
          <nav className="p-4 space-y-1">
            {[
              { id: 'overview', label: 'Overview', icon: Building2 },
              { id: 'projects', label: 'Manage Projects', icon: Building2 },
              { id: 'developers', label: 'Manage Developers', icon: Briefcase },
              { id: 'users', label: 'Manage Users', icon: Users },
              { id: 'leads', label: 'Enquiries / Leads', icon: FileText },
            ].map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => router.push(item.id === 'overview' ? '/admin' : `/admin/${item.id}`)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-[6px] text-sm font-semibold transition-all ${
                    activeTab === item.id 
                      ? 'bg-slate-50 text-[#6c1cdc] shadow-sm border-l-4 border-[#6c1cdc] rounded-l-none font-black' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer - Beautiful Profile Avatar Popover Dropdown */}
        <div className="p-4 border-t border-slate-100 bg-transparent relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-full flex items-center gap-3 px-2 py-1.5 hover:bg-slate-50 rounded-[6px] transition-all cursor-pointer text-left focus:outline-none select-none border border-transparent hover:border-slate-100"
          >
            {/* Circular Avatar */}
            <div className="h-9 w-9 rounded-full bg-[#6c1cdc]/10 text-[#6c1cdc] flex items-center justify-center font-bold text-sm tracking-wider uppercase shrink-0 border border-[#6c1cdc]/20 shadow-sm">
              {currentUser.name ? currentUser.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2) : 'SA'}
            </div>
            {/* User Info details */}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-xs text-slate-800 truncate leading-none">
                {currentUser.name || 'Super Admin'}
              </p>
              <p className="text-[9.5px] text-slate-400 font-medium truncate mt-1.5 leading-none">
                {currentUser.email || 'digital.housingmantra@gmail.com'}
              </p>
            </div>
            <ChevronUp className={`h-4.5 w-4.5 text-gray-400 transition-transform duration-200 shrink-0 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {isProfileOpen && (
            <div className="absolute bottom-16 left-4 right-4 bg-white border border-slate-200 rounded-[6px] shadow-lg p-2.5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="px-2 py-1.5 border-b border-slate-100 pb-2 mb-1.5">
                <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest leading-none">Site Administrator</p>
                <p className="font-bold text-xs text-slate-800 mt-1.5 truncate leading-none">{currentUser.name || 'Super Admin'}</p>
                <p className="text-[9.5px] text-slate-400 mt-1.5 font-medium truncate leading-none">{currentUser.email || 'digital.housingmantra@gmail.com'}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-2 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-[5px] text-xs font-extrabold transition-all cursor-pointer text-left"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto z-10 relative bg-[#f8fafc]">
        <header className="h-16 border-b border-slate-100 flex items-center justify-between px-8 bg-white shrink-0 shadow-sm">
          <h1 className="text-lg font-black tracking-tight text-slate-800 capitalize">
            {activeTab === 'add-project' ? 'Add New Project' : activeTab === 'add-developer' ? 'Add New Developer' : `${activeTab} Dashboard`}
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/admin/developers/add')}
              className="flex items-center gap-1.5 px-3.5 py-2 border border-slate-200 hover:border-[#6c1cdc] text-slate-700 hover:text-[#6c1cdc] bg-white text-xs font-bold rounded-[5px] shadow-sm cursor-pointer active:scale-95 transition-all"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Developer
            </button>
            <button
              onClick={() => router.push('/admin/projects/add')}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-[#6c1cdc] to-[#510fb3] hover:from-[#7b2be4] hover:to-[#5e12cc] text-white text-xs font-bold rounded-[5px] shadow-md shadow-[#6c1cdc]/10 cursor-pointer active:scale-95 transition-all"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Project
            </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl w-full mx-auto space-y-8 flex-1">
          {/* TAB: ADD DEVELOPER INLINE VIEW */}
          {activeTab === 'add-developer' && (
            <div className="bg-white border border-slate-100 rounded-[10px] p-8 shadow-sm">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Create New Developer</h3>
                  <p className="text-xs text-slate-400 mt-1 font-semibold">Create a new developer profile on the platform.</p>
                </div>
                <button 
                  type="button" 
                  onClick={() => router.push('/admin/developers')}
                  className="px-3 py-1.5 border border-slate-200 hover:border-red-500 hover:text-red-500 rounded-[5px] text-xs font-bold transition-all bg-white cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              {formError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-150 text-red-650 text-xs rounded-[6px] font-semibold">
                  ⚠️ {formError}
                </div>
              )}

              <form onSubmit={handleAddDeveloper} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Developer Name</label>
                    <input
                      type="text"
                      required
                      value={devName}
                      onChange={e => setDevName(e.target.value)}
                      autoComplete="off"
                      className={`block w-full px-4 py-2.5 bg-slate-50/50 border rounded-[6px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 text-sm font-semibold transition-all ${
                        developers.some(d => d.name?.toLowerCase() === devName.trim().toLowerCase()) && devName.trim()
                          ? 'border-red-400 focus:ring-red-200 focus:border-red-500'
                          : 'border-slate-200 focus:ring-[#6c1cdc]/10 focus:border-[#6c1cdc]'
                      }`}
                      placeholder="e.g. Swagat Group, VTP Realty"
                    />
                    {/* Duplicate warning */}
                    {developers.some(d => d.name?.toLowerCase() === devName.trim().toLowerCase()) && devName.trim() && (
                      <div className="mt-1.5 flex items-center gap-1.5 text-red-600 text-[11px] font-bold">
                        <span>⚠️</span>
                        <span>A developer named &quot;{devName.trim()}&quot; already exists. Please use a unique name.</span>
                      </div>
                    )}
                    {/* Autocomplete suggestions */}
                    {devName.trim().length >= 1 && !developers.some(d => d.name?.toLowerCase() === devName.trim().toLowerCase()) && (
                      (() => {
                        const suggestions = developers.filter(d =>
                          d.name?.toLowerCase().includes(devName.trim().toLowerCase())
                        );
                        return suggestions.length > 0 ? (
                          <div className="absolute z-20 top-full mt-1 left-0 right-0 bg-white border border-slate-200 rounded-[8px] shadow-lg overflow-hidden">
                            <p className="px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-slate-400 bg-slate-50 border-b border-slate-100">Existing Developers</p>
                            {suggestions.map(d => (
                              <button
                                key={d.id}
                                type="button"
                                onClick={() => setDevName(d.name)}
                                className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-[#6c1cdc]/5 text-left transition-colors cursor-pointer"
                              >
                                {d.logo ? (
                                  <img src={d.logo} alt={d.name} className="h-6 w-6 object-contain rounded border border-slate-200 bg-slate-50" />
                                ) : (
                                  <div className="h-6 w-6 rounded-[4px] bg-[#6c1cdc]/10 text-[#6c1cdc] font-black flex items-center justify-center text-[9px]">
                                    {(d.initials || d.name?.substring(0,2) || 'D').toUpperCase()}
                                  </div>
                                )}
                                <div>
                                  <p className="text-xs font-black text-slate-800">{d.name}</p>
                                  {d.established && <p className="text-[10px] text-slate-400 font-semibold">Est. {d.established}</p>}
                                </div>
                              </button>
                            ))}
                          </div>
                        ) : null;
                      })()
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Est. Year (Established)</label>
                    <input
                      type="number"
                      value={devEstablished}
                      onChange={e => setDevEstablished(e.target.value)}
                      className="block w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-[6px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/10 focus:border-[#6c1cdc] text-sm font-semibold transition-all"
                      placeholder="e.g. 1998"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Years of Experience</label>
                    <input
                      type="text"
                      value={devExperience}
                      onChange={e => setDevExperience(e.target.value)}
                      className="block w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-[6px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/10 focus:border-[#6c1cdc] text-sm font-semibold transition-all"
                      placeholder="e.g. 25+ Years"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Delivered Projects Count</label>
                    <input
                      type="text"
                      value={devProjectsDelivered}
                      onChange={e => setDevProjectsDelivered(e.target.value)}
                      className="block w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-[6px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/10 focus:border-[#6c1cdc] text-sm font-semibold transition-all"
                      placeholder="e.g. 80+ Projects"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Ongoing Projects Count</label>
                    <input
                      type="text"
                      value={devOngoingProjects}
                      onChange={e => setDevOngoingProjects(e.target.value)}
                      className="block w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-[6px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/10 focus:border-[#6c1cdc] text-sm font-semibold transition-all"
                      placeholder="e.g. 8 Projects"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Developer Logo URL</label>
                    <input
                      type="text"
                      value={devLogo}
                      onChange={e => setDevLogo(e.target.value)}
                      className="block w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-[6px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/10 focus:border-[#6c1cdc] text-sm font-semibold transition-all"
                      placeholder="e.g. https://domain.com/logo.png"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Developer Banner/Cover Image URL</label>
                  <input
                    type="text"
                    value={devImage}
                    onChange={e => setDevImage(e.target.value)}
                    className="block w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-[6px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/10 focus:border-[#6c1cdc] text-sm font-semibold transition-all"
                    placeholder="e.g. https://images.unsplash.com/..."
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Developer Description / About Builder</label>
                  <textarea
                    value={devDescription}
                    onChange={e => setDevDescription(e.target.value)}
                    rows={4}
                    className="block w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-[6px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/10 focus:border-[#6c1cdc] text-sm font-semibold transition-all"
                    placeholder="Provide builder details, legacy, key specialties, corporate values..."
                  />
                </div>

                <div className="flex gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => router.push('/admin/developers')}
                    className="flex-1 py-3 bg-white hover:bg-slate-50 text-slate-500 border border-slate-200 rounded-[6px] text-xs font-black uppercase tracking-wider transition-all cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formLoading || (!!devName.trim() && developers.some(d => d.name?.toLowerCase() === devName.trim().toLowerCase()))}
                    className="flex-1 py-3 bg-gradient-to-r from-[#6c1cdc] to-[#510fb3] hover:from-[#7b2be4] hover:to-[#5e12cc] disabled:from-[#6c1cdc]/40 disabled:to-[#510fb3]/40 text-white font-black rounded-[6px] text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                  >
                    {formLoading ? 'Creating Profile...' : 'Save & Publish Builder'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB: ADD PROJECT INLINE VIEW */}
          {activeTab === 'add-project' && (
            <div className="bg-white border border-slate-100 rounded-[10px] p-8 shadow-sm">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Create New Real-Estate Project</h3>
                  <p className="text-xs text-slate-400 mt-1 font-semibold">Fill out all sections below to add a new project listing.</p>
                </div>
                <button 
                  type="button" 
                  onClick={() => router.push('/admin/projects')}
                  className="px-3 py-1.5 border border-slate-200 hover:border-red-500 hover:text-red-500 rounded-[5px] text-xs font-bold transition-all bg-white cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              {formError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-655 text-xs rounded-[5px] font-semibold">
                  {formError}
                </div>
              )}

              <form onSubmit={handleAddProject} className="space-y-6">
                {/* SECTION 1: BASIC INFORMATION */}
                <div>
                  <p className="text-[11px] font-extrabold uppercase text-[#6c1cdc] tracking-widest border-b border-slate-100 pb-2 mb-4">1. Basic Information</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Project Title</label>
                      <input
                        type="text"
                        required
                        value={projectTitle}
                        onChange={e => setProjectTitle(e.target.value)}
                        placeholder="e.g. Swagat Parishram, Topaz Towers"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/10 focus:border-[#6c1cdc] text-gray-800 placeholder-gray-400 font-semibold transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Select Developer</label>
                      <select
                        value={projectDeveloperId}
                        onChange={e => setProjectDeveloperId(e.target.value)}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/10 focus:border-[#6c1cdc] text-gray-800 font-bold transition-all"
                      >
                        <option value="">-- Choose Developer --</option>
                        {developers.map(dev => (
                          <option key={dev.id || dev.slug} value={dev.id || dev.slug}>
                            {dev.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">RERA Registration ID</label>
                      <input
                        type="text"
                        value={projectRera}
                        onChange={e => setProjectRera(e.target.value)}
                        placeholder="e.g. PM1261012502712"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/10 focus:border-[#6c1cdc] text-gray-800 placeholder-gray-400 font-semibold transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Project Type</label>
                      <select
                        value={projectType}
                        onChange={e => setProjectType(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/10 focus:border-[#6c1cdc] text-gray-800 font-bold transition-all"
                      >
                        <option value="Apartment">Apartment / Flats</option>
                        <option value="Penthouse">Penthouse</option>
                        <option value="Villa">Villa / Bungalow</option>
                        <option value="Plot">Plot / Land</option>
                        <option value="Commercial">Commercial Space</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Status</label>
                      <select
                        value={projectStatus}
                        onChange={e => setProjectStatus(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/10 focus:border-[#6c1cdc] text-gray-800 font-bold transition-all"
                      >
                        <option value="UNDER_CONSTRUCTION">Under Construction</option>
                        <option value="READY_TO_MOVE">Ready to Move</option>
                        <option value="LAUNCHED">Newly Launched</option>
                        <option value="COMPLETED">Completed</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Price Range / Starting</label>
                      <input
                        type="text"
                        value={projectPrice}
                        onChange={e => setProjectPrice(e.target.value)}
                        placeholder="e.g. ₹57 Lakhs - ₹85.7 Lakhs"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/10 focus:border-[#6c1cdc] text-gray-800 placeholder-gray-400 font-semibold transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 2: LOCATION & SPECIFICATIONS */}
                <div>
                  <p className="text-[11px] font-extrabold uppercase text-[#6c1cdc] tracking-widest border-b border-slate-100 pb-2 mb-4">2. Location & Scale</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Location Address</label>
                      <input
                        type="text"
                        value={projectLocation}
                        onChange={e => setProjectLocation(e.target.value)}
                        placeholder="e.g. Charholi Budruk, Wadmukhwadi"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/10 focus:border-[#6c1cdc] text-gray-800 placeholder-gray-400 font-semibold transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">City</label>
                      <input
                        type="text"
                        value={projectCity}
                        onChange={e => setProjectCity(e.target.value)}
                        placeholder="e.g. Pune"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/10 focus:border-[#6c1cdc] text-gray-800 placeholder-gray-400 font-semibold transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Possession Timeline</label>
                      <input
                        type="text"
                        value={projectPossession}
                        onChange={e => setProjectPossession(e.target.value)}
                        placeholder="e.g. Dec 2026, Ready to Move"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/10 focus:border-[#6c1cdc] text-gray-800 placeholder-gray-400 font-semibold transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Land Area Size</label>
                      <input
                        type="text"
                        value={projectLandArea}
                        onChange={e => setProjectLandArea(e.target.value)}
                        placeholder="e.g. 2.5 Acres"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/10 focus:border-[#6c1cdc] text-gray-800 placeholder-gray-400 font-semibold transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Total Towers</label>
                      <input
                        type="text"
                        value={projectTowers}
                        onChange={e => setProjectTowers(e.target.value)}
                        placeholder="e.g. 5 Towers (G+12 Floors)"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/10 focus:border-[#6c1cdc] text-gray-800 placeholder-gray-400 font-semibold transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Total Units Listing</label>
                      <input
                        type="text"
                        value={projectUnits}
                        onChange={e => setProjectUnits(e.target.value)}
                        placeholder="e.g. 350 Units"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/10 focus:border-[#6c1cdc] text-gray-800 placeholder-gray-400 font-semibold transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 3: IMAGE ASSETS */}
                <div>
                  <p className="text-[11px] font-extrabold uppercase text-[#6c1cdc] tracking-widest border-b border-slate-100 pb-2 mb-4">3. Image & Media Assets</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Primary Cover Image URL</label>
                      <input
                        type="text"
                        value={projectImage}
                        onChange={e => setProjectImage(e.target.value)}
                        placeholder="e.g. /projects/charholi_tower.jpg"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/10 focus:border-[#6c1cdc] text-gray-800 placeholder-gray-400 font-semibold transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Gallery / Floor Plans (Comma-separated URLs)</label>
                      <input
                        type="text"
                        value={projectGallery}
                        onChange={e => setProjectGallery(e.target.value)}
                        placeholder="e.g. /projects/floor1.jpg, /projects/floor2.jpg"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/10 focus:border-[#6c1cdc] text-gray-800 placeholder-gray-400 font-semibold transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 4: DETAILED DESCRIPTION */}
                <div>
                  <p className="text-[11px] font-extrabold uppercase text-[#6c1cdc] tracking-widest border-b border-slate-100 pb-2 mb-4">4. Additional Features & Details</p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Project Amenities / Key Features (Comma-separated)</label>
                      <input
                        type="text"
                        value={projectFeatures}
                        onChange={e => setProjectFeatures(e.target.value)}
                        placeholder="e.g. Swimming Pool, Club House, 24/7 Security, Gymnasium, Landscaped Garden"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/10 focus:border-[#6c1cdc] text-gray-800 placeholder-gray-400 font-semibold transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Location Attractions / Nearby Hubs (Comma-separated)</label>
                      <input
                        type="text"
                        value={projectAttractions}
                        onChange={e => setProjectAttractions(e.target.value)}
                        placeholder="e.g. D-Mart (5 mins), Airport (15 mins), DY Patil University (8 mins)"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/10 focus:border-[#6c1cdc] text-gray-800 placeholder-gray-400 font-semibold transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Detailed Project Description</label>
                      <textarea
                        value={projectDescription}
                        onChange={e => setProjectDescription(e.target.value)}
                        rows={4}
                        placeholder="Provide a comprehensive marketing description detailing carpet area variants, structural specifics, ventilation, standard fitting materials..."
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/10 focus:border-[#6c1cdc] text-gray-800 placeholder-gray-400 font-semibold transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* FORM ACTIONS */}
                <div className="flex gap-4 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => router.push('/admin/projects')}
                    className="flex-1 bg-white hover:bg-slate-50 text-slate-500 border border-slate-200 py-3.5 rounded-[5px] text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="flex-1 bg-gradient-to-r from-[#6c1cdc] to-[#510fb3] hover:from-[#7b2be4] hover:to-[#5e12cc] disabled:from-[#6c1cdc]/40 disabled:to-[#510fb3]/40 text-white py-3.5 rounded-[5px] text-xs font-black uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                  >
                    {formLoading ? 'Saving Project...' : 'Save & Publish Project'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Cards - Premium Modern Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: 'Total Projects', count: stats.projects, icon: Building2 },
                  { label: 'Developers', count: stats.developers, icon: Building2 },
                  { label: 'Registered Users', count: stats.users, icon: Users },
                  { label: 'Captured Leads', count: stats.leads, icon: FileText },
                ].map((card, i) => {
                  const Icon = card.icon;
                  return (
                    <div key={i} className="p-6 bg-white border border-slate-100 hover:border-[#6c1cdc]/20 rounded-[10px] flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-300 group">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{card.label}</p>
                        <p className="text-3xl font-black text-slate-800 mt-2 tracking-tight">{card.count}</p>
                      </div>
                      <div className="h-12 w-12 bg-[#6c1cdc]/10 group-hover:bg-[#6c1cdc]/20 rounded-[8px] flex items-center justify-center text-[#6c1cdc] transition-all">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Recent Leads */}
              <div className="bg-white border border-slate-100 rounded-[10px] p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Recent Enquiries</h3>
                  <button onClick={() => setActiveTab('leads')} className="text-xs font-black text-[#6c1cdc] hover:text-[#510fb3] hover:underline cursor-pointer transition-colors">
                    View All Leads
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                        <th className="p-4">Client Details</th>
                        <th className="p-4">Project</th>
                        <th className="p-4">Form Name</th>
                        <th className="p-4">CRM Status</th>
                        <th className="p-4 text-right">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm text-slate-700 bg-transparent">
                      {leads.slice(0, 5).map(lead => (
                        <tr key={lead.id} className="hover:bg-slate-50/30 transition-colors">
                          <td className="p-4">
                            <p className="font-bold text-slate-800">{lead.name}</p>
                            <p className="text-xs text-slate-400 font-medium mt-0.5">{lead.mobile}</p>
                          </td>
                          <td className="p-4 font-bold text-[#6c1cdc]">{lead.project?.title || 'Unknown Project'}</td>
                          <td className="p-4 text-xs text-slate-500 font-medium">{lead.queryForm}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-[4px] text-[9px] font-black tracking-wider ${
                              lead.crmSynced ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
                            }`}>
                              {lead.crmSynced ? 'SYNCED' : 'PENDING'}
                            </span>
                          </td>
                          <td className="p-4 text-right text-xs text-slate-400 font-medium">
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                      {leads.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-12 text-center text-slate-400 font-semibold">No leads captured yet.</td>
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
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={projectSearch}
                    onChange={e => setProjectSearch(e.target.value)}
                    className="w-full bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/10 focus:border-[#6c1cdc] rounded-[6px] pl-10 pr-4 py-2.5 text-sm font-semibold transition-all"
                  />
                </div>
                 <div className="w-full md:w-auto">
                  <button 
                    onClick={() => router.push('/admin/projects/add')}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#6c1cdc] to-[#510fb3] hover:from-[#7b2be4] hover:to-[#5e12cc] text-white text-xs font-bold uppercase tracking-wider rounded-[6px] shadow-sm active:scale-95 transition-all cursor-pointer"
                  >
                    <Plus className="h-4 w-4" /> Add Project
                  </button>
                </div>
              </div>

              {filteredProjects.length === 0 ? (
                <div className="bg-white border border-slate-100 rounded-[10px] py-16 text-center shadow-sm">
                  <p className="text-slate-400 font-semibold text-sm">No projects found.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredProjects.map(proj => (
                    <div key={proj.id} className="bg-white border border-slate-100 rounded-[12px] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden group">
                      {/* Card Image */}
                      <div className="relative h-44 bg-slate-100 overflow-hidden">
                        <img
                          src={proj.image || '/placeholder.jpg'}
                          alt={proj.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        {/* Status Badge */}
                        <span className="absolute top-3 left-3 px-2 py-0.5 rounded-[4px] text-[9px] font-black uppercase tracking-wider bg-white/90 text-slate-700 border border-white/50 shadow-sm">
                          {proj.status?.replace(/_/g, ' ')}
                        </span>
                        {/* Type Badge */}
                        <span className="absolute top-3 right-3 px-2 py-0.5 rounded-[4px] text-[9px] font-black uppercase tracking-wider bg-[#6c1cdc]/90 text-white shadow-sm">
                          {proj.type}
                        </span>
                        {/* Price on image */}
                        <p className="absolute bottom-3 left-3 text-white font-black text-sm drop-shadow">{proj.price}</p>
                      </div>

                      {/* Card Body */}
                      <div className="p-4">
                        <h4 className="font-black text-slate-800 text-sm leading-snug mb-1 line-clamp-1">{proj.title}</h4>
                        <p className="text-[11px] text-slate-400 font-semibold mb-1">By {proj.developer?.name || '—'}</p>
                        {proj.location && (
                          <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mb-3">
                            <span className="text-[#6c1cdc]">📍</span> {proj.location}
                          </p>
                        )}

                        {/* Actions */}
                        <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                          <button
                            onClick={() => handleStartEditProject(proj)}
                            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-slate-50 hover:bg-[#6c1cdc]/5 border border-slate-200 hover:border-[#6c1cdc]/30 text-slate-600 hover:text-[#6c1cdc] rounded-[6px] text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer"
                          >
                            <Pencil className="h-3 w-3" /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProject(proj.id)}
                            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-red-50 hover:bg-red-100 border border-red-100 hover:border-red-200 text-red-500 hover:text-red-700 rounded-[6px] text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer"
                          >
                            <Trash2 className="h-3 w-3" /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: DEVELOPERS */}
          {activeTab === 'developers' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search developer directory..."
                    value={devSearch}
                    onChange={e => setDevSearch(e.target.value)}
                    className="w-full bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/10 focus:border-[#6c1cdc] rounded-[6px] pl-10 pr-4 py-2.5 text-sm font-semibold transition-all"
                  />
                </div>
                <div className="w-full md:w-auto">
                  <button 
                    onClick={() => router.push('/admin/developers/add')}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#6c1cdc] to-[#510fb3] hover:from-[#7b2be4] hover:to-[#5e12cc] text-white text-xs font-bold uppercase tracking-wider rounded-[6px] shadow-sm active:scale-95 transition-all cursor-pointer"
                  >
                    <Plus className="h-4 w-4" /> Add Developer
                  </button>
                </div>
              </div>

              <div className="bg-white border border-slate-100 rounded-[10px] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                        <th className="p-4">Developer Name</th>
                        <th className="p-4">Experience</th>
                        <th className="p-4">Est. Year</th>
                        <th className="p-4">Projects (Delivered / Ongoing)</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm text-slate-700 bg-transparent">
                      {filteredDevelopers.map(dev => (
                        <tr key={dev.id} className="hover:bg-slate-50/30 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              {dev.logo ? (
                                <img src={dev.logo} alt={dev.name} className="h-10 w-10 object-contain rounded border border-slate-200 bg-slate-50" />
                              ) : (
                                <div className={`h-10 w-10 rounded-[6px] ${dev.color || 'bg-[#6c1cdc]/10'} ${dev.color ? 'text-white' : 'text-[#6c1cdc]'} font-bold flex items-center justify-center text-xs border border-slate-100`}>
                                  {dev.initials || dev.name?.substring(0,2)?.toUpperCase() || 'DEV'}
                                </div>
                              )}
                              <div>
                                <p className="font-bold text-slate-800">{dev.name}</p>
                                <p className="text-xs text-slate-400 font-medium mt-0.5">ID: {dev.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 font-semibold text-slate-600">{dev.experience || '—'}</td>
                          <td className="p-4 font-semibold text-slate-400">{dev.established || '—'}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded border border-emerald-100">
                                {dev.projectsDelivered || '—'} Delivered
                              </span>
                              <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded border border-blue-100">
                                {dev.ongoingProjects || '—'} Ongoing
                              </span>
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleStartEditDeveloper(dev)}
                                className="p-1.5 rounded hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer"
                                title="Edit Developer Profile"
                              >
                                <Pencil className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteDeveloper(dev.id)}
                                className="p-1.5 rounded hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors cursor-pointer"
                                title="Delete Developer Profile"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredDevelopers.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-12 text-center text-slate-400 font-semibold">No developers found in directory.</td>
                        </tr>
                      )}
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
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={userSearch}
                    onChange={e => setUserSearch(e.target.value)}
                    className="w-full bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/10 focus:border-[#6c1cdc] rounded-[6px] pl-10 pr-4 py-2.5 text-sm font-semibold transition-all"
                  />
                </div>
                <div className="w-full md:w-auto">
                  <button 
                    onClick={() => setIsAddUserOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#6c1cdc] to-[#510fb3] hover:from-[#7b2be4] hover:to-[#5e12cc] text-white text-xs font-bold uppercase tracking-wider rounded-[6px] shadow-sm active:scale-95 transition-all cursor-pointer"
                  >
                    <Plus className="h-4 w-4" /> Add User / Agent
                  </button>
                </div>
              </div>

              <div className="bg-white border border-slate-100 rounded-[10px] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                        <th className="p-4">Name / Contact</th>
                        <th className="p-4">Email Address</th>
                        <th className="p-4">Role</th>
                        <th className="p-4">Joined Date</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm text-slate-700 bg-transparent">
                      {filteredUsers.map(user => (
                        <tr key={user.id} className="hover:bg-slate-50/30 transition-colors">
                          <td className="p-4">
                            <p className="font-bold text-slate-800 flex items-center gap-1.5">
                              {user.name || 'Anonymous'}
                              {user.role === 'ADMIN' && <Shield className="h-3.5 w-3.5 text-[#6c1cdc] fill-[#6c1cdc]/10" />}
                            </p>
                            <p className="text-xs text-slate-400 font-semibold mt-0.5">{user.phone || 'No phone'}</p>
                          </td>
                          <td className="p-4 font-semibold text-slate-600">{user.email}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-[4px] text-[9px] font-black tracking-wider ${
                              user.role === 'ADMIN' 
                                ? 'bg-red-50 text-red-700 border border-red-100' 
                                : user.role === 'AGENT'
                                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                                  : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="p-4 text-xs text-slate-400 font-semibold">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleDeleteUser(user.id, user.email)}
                              className="text-red-650 hover:text-red-855 p-1.5 rounded hover:bg-red-50 transition-all cursor-pointer"
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
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search leads..."
                    value={leadSearch}
                    onChange={e => setLeadSearch(e.target.value)}
                    className="w-full bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/10 focus:border-[#6c1cdc] rounded-[6px] pl-10 pr-4 py-2.5 text-sm font-semibold transition-all"
                  />
                </div>
              </div>

              <div className="bg-white border border-slate-100 rounded-[10px] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                        <th className="p-4">Customer Details</th>
                        <th className="p-4">Project Interest</th>
                        <th className="p-4">Message</th>
                        <th className="p-4">CRM Sync</th>
                        <th className="p-4 text-right">Captured</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm text-slate-700 bg-transparent">
                      {filteredLeads.map(lead => (
                        <tr key={lead.id} className="hover:bg-slate-50/30 transition-colors">
                          <td className="p-4">
                            <p className="font-bold text-slate-800">{lead.name}</p>
                            <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 font-semibold">
                              <span className="flex items-center gap-1"><Phone className="h-3 w-3 text-[#6c1cdc]" />{lead.mobile}</span>
                              {lead.email && <span className="flex items-center gap-1"><Mail className="h-3 w-3 text-[#6c1cdc]" />{lead.email}</span>}
                            </div>
                          </td>
                          <td className="p-4">
                            <p className="font-bold text-[#6c1cdc]">{lead.project?.title || 'Unknown Project'}</p>
                            <p className="text-xs text-slate-400 font-semibold mt-0.5">{lead.queryForm}</p>
                          </td>
                          <td className="p-4 text-slate-500 italic max-w-xs truncate font-semibold">{lead.message || 'No custom query'}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-[4px] text-[9px] font-black tracking-wider ${
                              lead.crmSynced ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
                            }`}>
                              {lead.crmSynced ? 'SYNCED' : 'PENDING'}
                            </span>
                          </td>
                          <td className="p-4 text-right text-xs text-slate-400 font-semibold">
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



      {/* Edit Developer Modal */}
      {isEditDevOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-[#120526]/95 backdrop-blur-2xl border border-white/[0.08] w-full max-w-2xl p-8 shadow-[0_20px_50px_rgba(108,28,220,0.15)] relative my-8 max-h-[90vh] overflow-y-auto rounded-[12px] text-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-white uppercase tracking-wider">Update Developer Profile</h3>
              <button 
                type="button" 
                onClick={() => setIsEditDevOpen(false)}
                className="text-white/60 hover:text-white font-black text-xl cursor-pointer"
              >
                &times;
              </button>
            </div>

            {formError && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-300 text-xs rounded-[6px] font-semibold">
                ⚠️ {formError}
              </div>
            )}

            <form onSubmit={handleEditDeveloperSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-white/60 mb-2">Developer Name</label>
                  <input
                    type="text"
                    required
                    value={devName}
                    onChange={e => setDevName(e.target.value)}
                    className="block w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-[6px] text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/40 focus:border-[#6c1cdc] text-sm font-semibold transition-all"
                    placeholder="e.g. Swagat Group, VTP Realty"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-white/60 mb-2">Est. Year (Established)</label>
                  <input
                    type="number"
                    value={devEstablished}
                    onChange={e => setDevEstablished(e.target.value)}
                    className="block w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-[6px] text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/40 focus:border-[#6c1cdc] text-sm font-semibold transition-all"
                    placeholder="e.g. 1998"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-white/60 mb-2">Years of Experience</label>
                  <input
                    type="text"
                    value={devExperience}
                    onChange={e => setDevExperience(e.target.value)}
                    className="block w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-[6px] text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/40 focus:border-[#6c1cdc] text-sm font-semibold transition-all"
                    placeholder="e.g. 25+ Years"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-white/60 mb-2">Delivered Projects Count</label>
                  <input
                    type="text"
                    value={devProjectsDelivered}
                    onChange={e => setDevProjectsDelivered(e.target.value)}
                    className="block w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-[6px] text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/40 focus:border-[#6c1cdc] text-sm font-semibold transition-all"
                    placeholder="e.g. 80+ Projects"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-white/60 mb-2">Ongoing Projects Count</label>
                  <input
                    type="text"
                    value={devOngoingProjects}
                    onChange={e => setDevOngoingProjects(e.target.value)}
                    className="block w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-[6px] text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/40 focus:border-[#6c1cdc] text-sm font-semibold transition-all"
                    placeholder="e.g. 8 Projects"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-white/60 mb-2">Developer Logo URL</label>
                  <input
                    type="text"
                    value={devLogo}
                    onChange={e => setDevLogo(e.target.value)}
                    className="block w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-[6px] text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/40 focus:border-[#6c1cdc] text-sm font-semibold transition-all"
                    placeholder="e.g. https://domain.com/logo.png"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-white/60 mb-2">Developer Banner/Cover Image URL</label>
                <input
                  type="text"
                  value={devImage}
                  onChange={e => setDevImage(e.target.value)}
                  className="block w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-[6px] text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/40 focus:border-[#6c1cdc] text-sm font-semibold transition-all"
                  placeholder="e.g. https://images.unsplash.com/..."
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-white/60 mb-2">Developer Description / About Builder</label>
                <textarea
                  value={devDescription}
                  onChange={e => setDevDescription(e.target.value)}
                  rows={4}
                  className="block w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-[6px] text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/40 focus:border-[#6c1cdc] text-sm font-semibold transition-all"
                  placeholder="Provide builder details, legacy, key specialties, corporate values..."
                />
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditDevOpen(false)}
                  className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white/80 border border-white/5 rounded-[6px] text-xs uppercase tracking-wider transition-all cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex-1 py-3 bg-gradient-to-r from-[#6c1cdc] to-[#510fb3] hover:from-[#7b2be4] hover:to-[#5e12cc] disabled:from-[#6c1cdc]/40 disabled:to-[#510fb3]/40 text-white font-bold rounded-[6px] text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  {formLoading ? 'Updating Profile...' : 'Update & Publish Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="bg-[#120526]/95 backdrop-blur-2xl border border-white/[0.08] w-full max-w-md p-8 shadow-[0_20px_50px_rgba(108,28,220,0.15)] relative rounded-[12px] text-white animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-white uppercase tracking-wider">Create User Profile</h3>
              <button 
                type="button" 
                onClick={() => setIsAddUserOpen(false)}
                className="text-white/60 hover:text-white font-black text-xl cursor-pointer"
              >
                &times;
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 text-red-300 text-xs rounded-[6px] font-semibold">
                ⚠️ {formError}
              </div>
            )}

            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-white/60 mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={e => setNewUserName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-[6px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/40 focus:border-[#6c1cdc] text-white placeholder-white/20 font-semibold transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-white/60 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={e => setNewUserEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-[6px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/40 focus:border-[#6c1cdc] text-white placeholder-white/20 font-semibold transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-white/60 mb-2">Phone</label>
                <input
                  type="text"
                  value={newUserPhone}
                  onChange={e => setNewUserPhone(e.target.value)}
                  placeholder="Phone number"
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-[6px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/40 focus:border-[#6c1cdc] text-white placeholder-white/20 font-semibold transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-white/60 mb-2">Password</label>
                <input
                  type="password"
                  required
                  value={newUserPassword}
                  onChange={e => setNewUserPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-[6px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/40 focus:border-[#6c1cdc] text-white placeholder-white/20 font-semibold transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-white/60 mb-2">Assign Role</label>
                <select
                  value={newUserRole}
                  onChange={e => setNewUserRole(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-[6px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6c1cdc]/40 focus:border-[#6c1cdc] text-white font-bold transition-all [&_option]:bg-[#120526]"
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
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white/80 border border-white/5 py-3.5 rounded-[6px] text-xs uppercase tracking-wider font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex-1 bg-gradient-to-r from-[#6c1cdc] to-[#510fb3] hover:from-[#7b2be4] hover:to-[#5e12cc] text-white py-3.5 rounded-[6px] text-xs uppercase tracking-wider font-bold transition-all shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {formLoading ? 'Creating...' : 'Save User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



      {/* Edit Project Modal */}
      {isEditProjectOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white border border-gray-100 rounded-[5px] w-full max-w-4xl p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wider">Update Real-Estate Project</h3>
              <button 
                type="button" 
                onClick={() => setIsEditProjectOpen(false)}
                className="text-gray-400 hover:text-gray-600 font-black text-xl"
              >
                &times;
              </button>
            </div>

            {formError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-650 text-xs rounded-[5px] font-semibold">
                {formError}
              </div>
            )}

            <form onSubmit={handleEditProjectSubmit} className="space-y-6">
              {/* SECTION 1: BASIC INFORMATION */}
              <div>
                <p className="text-[11px] font-extrabold uppercase text-primary tracking-widest border-b border-gray-100 pb-2 mb-4">1. Basic Information</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Project Title</label>
                    <input
                      type="text"
                      required
                      value={projectTitle}
                      onChange={e => setProjectTitle(e.target.value)}
                      placeholder="e.g. Swagat Parishram, Topaz Towers"
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 placeholder-gray-400 font-semibold transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Select Developer</label>
                    <select
                      value={projectDeveloperId}
                      onChange={e => setProjectDeveloperId(e.target.value)}
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 font-bold transition-all"
                    >
                      <option value="">-- Choose Developer --</option>
                      {developers.map(dev => (
                        <option key={dev.id || dev.slug} value={dev.id || dev.slug}>
                          {dev.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">RERA Registration ID</label>
                    <input
                      type="text"
                      value={projectRera}
                      onChange={e => setProjectRera(e.target.value)}
                      placeholder="e.g. PM1261012502712"
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 placeholder-gray-400 font-semibold transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Project Status</label>
                    <select
                      value={projectStatus}
                      onChange={e => setProjectStatus(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 font-bold transition-all"
                    >
                      <option value="UNDER_CONSTRUCTION">Under Construction</option>
                      <option value="NEW_LAUNCH">New Launch</option>
                      <option value="READY_TO_MOVE">Ready to Move</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Property Type</label>
                    <select
                      value={projectType}
                      onChange={e => setProjectType(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 font-bold transition-all"
                    >
                      <option value="Apartment">Apartment / Flat</option>
                      <option value="Villa">Villa / Row House</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Plot">Residential Plot</option>
                      <option value="Commercial">Commercial Shop / Office</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Price Starting From</label>
                    <input
                      type="text"
                      required
                      value={projectPrice}
                      onChange={e => setProjectPrice(e.target.value)}
                      placeholder="e.g. ₹75 Lacs*, ₹1.25 Cr*"
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 placeholder-gray-400 font-semibold transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Possession Date</label>
                    <input
                      type="text"
                      required
                      value={projectPossession}
                      onChange={e => setProjectPossession(e.target.value)}
                      placeholder="e.g. Dec 2027, Ready"
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 placeholder-gray-400 font-semibold transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: LOCATION & PLANNING */}
              <div>
                <p className="text-[11px] font-extrabold uppercase text-primary tracking-widest border-b border-gray-100 pb-2 mb-4">2. Location & Planning</p>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Location Locality Address</label>
                    <input
                      type="text"
                      required
                      value={projectLocation}
                      onChange={e => setProjectLocation(e.target.value)}
                      placeholder="e.g. Ambawadi, Kharadi, Charholi Budruk"
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 placeholder-gray-400 font-semibold transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">City</label>
                    <select
                      value={projectCity}
                      onChange={e => setProjectCity(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 font-bold transition-all"
                    >
                      <option value="Pune">Pune</option>
                      <option value="Ahmedabad">Ahmedabad</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Bangalore">Bangalore</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Total Land Area</label>
                    <input
                      type="text"
                      value={projectLandArea}
                      onChange={e => setProjectLandArea(e.target.value)}
                      placeholder="e.g. 1.5 Acres, 5 Acres"
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 placeholder-gray-400 font-semibold transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Towers & Units</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={projectTowers}
                        onChange={e => setProjectTowers(e.target.value)}
                        placeholder="Towers"
                        className="w-full bg-gray-50/50 border border-gray-200 rounded-[5px] px-2 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 placeholder-gray-400 font-semibold transition-all text-center"
                      />
                      <input
                        type="text"
                        value={projectUnits}
                        onChange={e => setProjectUnits(e.target.value)}
                        placeholder="Units"
                        className="w-full bg-gray-50/50 border border-gray-200 rounded-[5px] px-2 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 placeholder-gray-400 font-semibold transition-all text-center"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3: MEDIA & SPECIFICATIONS */}
              <div>
                <p className="text-[11px] font-extrabold uppercase text-primary tracking-widest border-b border-gray-100 pb-2 mb-4">3. Media & Specifications</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Project Main Display Image URL</label>
                    <input
                      type="text"
                      required
                      value={projectImage}
                      onChange={e => setProjectImage(e.target.value)}
                      placeholder="e.g. /projects/filename.webp or Unsplash URL"
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 placeholder-gray-400 font-semibold transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Gallery Images (Comma-separated URLs)</label>
                    <input
                      type="text"
                      value={projectGallery}
                      onChange={e => setProjectGallery(e.target.value)}
                      placeholder="e.g. /projects/g1.webp, /projects/g2.webp"
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 placeholder-gray-400 font-semibold transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Project Key Features (Comma-separated)</label>
                    <textarea
                      value={projectFeatures}
                      onChange={e => setProjectFeatures(e.target.value)}
                      placeholder="Infinity pool, 24/7 solar backups, gated multi-tier security, modern clubhouse"
                      rows={2}
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 placeholder-gray-400 font-semibold transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Project Special Attractions / USPs (Comma-separated)</label>
                    <textarea
                      value={projectAttractions}
                      onChange={e => setProjectAttractions(e.target.value)}
                      placeholder="Low density planning, 4 high-speed elevators per tower"
                      rows={2}
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 placeholder-gray-400 font-semibold transition-all"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Project Description</label>
                  <textarea
                    value={projectDescription}
                    onChange={e => setProjectDescription(e.target.value)}
                    placeholder="Provide a detailed description of the project, highlighting connectivity, builder legacy, and construction standards..."
                    rows={4}
                    className="w-full bg-gray-50/50 border border-gray-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 placeholder-gray-400 font-semibold transition-all"
                  />
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-4 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsEditProjectOpen(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 py-3.5 rounded-[5px] text-sm font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex-1 bg-primary hover:bg-primary/95 text-white py-3.5 rounded-[5px] text-sm font-bold transition-all shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {formLoading ? 'Updating Project...' : 'Update & Publish Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
