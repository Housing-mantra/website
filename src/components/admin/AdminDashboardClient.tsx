"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Building2, Users, FileText, Plus, LogOut, ShieldAlert,
  Search, Shield, Check, Trash2, Mail, Phone, Calendar, Briefcase, Pencil
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
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'developers' | 'users' | 'leads'>('overview');
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
    <div className="min-h-screen bg-gray-50/50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo Header - Brand Match */}
          <div className="h-16 flex items-center px-5 border-b border-gray-100 bg-white justify-start">
            <Link href="/" className="flex items-center gap-1.5 select-none">
              <svg className="h-[34px] w-[34px] shrink-0" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="40" cy="40" r="36" fill="none" stroke="#111827" strokeWidth="2.5" />
                  <circle cx="40" cy="40" r="30.5" fill="none" stroke="#111827" strokeWidth="1.2" />
                  <path d="M40 22 L22 36 L24 55 L56 55 L58 36 Z" fill="none" stroke="#111827" strokeWidth="2.5" strokeLinejoin="round" />
                  <path d="M40 33 L30 42 L30 55 L50 55 L50 42 Z" fill="#b91c1c" />
              </svg>
              <div className="flex flex-col items-stretch w-fit leading-none gap-0.5">
                  <div className="relative">
                      <span className="text-[18px] font-oswald font-black text-gray-900 tracking-tight leading-none whitespace-nowrap">
                          HOUSING MANTRA
                      </span>
                      <span className="text-[6px] font-sans font-extrabold text-gray-900 select-none absolute -right-3 top-0">TM</span>
                  </div>
                  <div className="w-full bg-gray-950 text-white text-[6.5px] font-sans font-black uppercase tracking-[0.04em] py-0.5 rounded-[1px] text-center whitespace-nowrap">
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

        {/* Sidebar Footer - Beautiful Profile Avatar & Sleek Logout */}
        <div className="p-4 border-t border-gray-100 bg-white flex flex-col gap-3">
          <div className="flex items-center gap-3 px-2 py-1 select-none">
            {/* Circular Avatar */}
            <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm tracking-wider uppercase shrink-0 border border-primary/20">
              {currentUser.name ? currentUser.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2) : 'SA'}
            </div>
            {/* User Info details */}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-xs text-gray-800 truncate leading-none">
                {currentUser.name || 'Super Admin'}
              </p>
              <p className="text-[10px] text-gray-400 font-medium truncate mt-1.5 leading-none">
                {currentUser.email || 'admin@housingmantra.in'}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-red-500 hover:bg-red-50 hover:text-red-700 rounded-[5px] text-xs font-bold transition-all border border-transparent hover:border-red-100"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign Out
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
                  <button 
                    onClick={() => setIsAddProjectOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/95 text-white text-xs font-bold uppercase tracking-wider rounded-[5px] shadow-sm active:scale-95 transition-all cursor-pointer"
                  >
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
                        <th className="p-4 text-right">Actions</th>
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
                          <td className="p-4 text-right flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleStartEditProject(proj)}
                              className="text-primary hover:text-primary/80 p-1.5 rounded hover:bg-primary/5 transition-all cursor-pointer"
                              title="Edit Project"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(proj.id)}
                              className="text-gray-400 hover:text-red-655 text-red-500 p-1.5 rounded hover:bg-red-50 transition-all cursor-pointer"
                              title="Delete Project"
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

          {/* TAB: DEVELOPERS */}
          {activeTab === 'developers' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search developer directory..."
                    value={devSearch}
                    onChange={e => setDevSearch(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-[5px] pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 placeholder-gray-400 font-semibold transition-all"
                  />
                </div>
                <div className="w-full md:w-auto">
                  <button 
                    onClick={() => setIsAddDevOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/95 text-white text-xs font-bold uppercase tracking-wider rounded-[5px] shadow-sm active:scale-95 transition-all cursor-pointer"
                  >
                    <Plus className="h-4 w-4" /> Add Developer
                  </button>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-[5px] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/50 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
                        <th className="p-4">Developer Name</th>
                        <th className="p-4">Experience</th>
                        <th className="p-4">Est. Year</th>
                        <th className="p-4">Projects (Delivered / Ongoing)</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm text-gray-700 bg-white">
                      {filteredDevelopers.map(dev => (
                        <tr key={dev.id} className="hover:bg-gray-50/30 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              {dev.logo ? (
                                <img src={dev.logo} alt={dev.name} className="h-10 w-10 object-contain rounded border border-gray-100 bg-white" />
                              ) : (
                                <div className={`h-10 w-10 rounded ${dev.color || 'bg-primary/10'} text-white font-bold flex items-center justify-center text-xs`}>
                                  {dev.initials || 'DEV'}
                                </div>
                              )}
                              <div>
                                <p className="font-bold text-gray-900">{dev.name}</p>
                                <p className="text-xs text-gray-400 font-semibold mt-0.5">ID: {dev.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 font-semibold text-gray-750">{dev.experience || '10+ Years'}</td>
                          <td className="p-4 font-semibold text-gray-500">{dev.established || '2010'}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded border border-emerald-100">
                                {dev.projectsDelivered || '20+'} Delivered
                              </span>
                              <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded border border-blue-100">
                                {dev.ongoingProjects || '3+'} Ongoing
                              </span>
                            </div>
                          </td>
                           <td className="p-4 text-right flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleStartEditDeveloper(dev)}
                              className="text-primary hover:text-primary/80 p-1 rounded hover:bg-primary/5 transition-colors cursor-pointer"
                              title="Edit Developer Profile"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteDeveloper(dev.id)}
                              className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors cursor-pointer"
                              title="Delete Developer Profile"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredDevelopers.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-12 text-center text-gray-400 font-semibold">No developers found in directory.</td>
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

      {/* Add Developer Modal */}
      {isAddDevOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white border border-gray-100 rounded-[5px] w-full max-w-2xl p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wider">Create Developer Profile</h3>
              <button 
                type="button" 
                onClick={() => setIsAddDevOpen(false)}
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

            <form onSubmit={handleAddDeveloper} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Developer Name</label>
                  <input
                    type="text"
                    required
                    value={devName}
                    onChange={e => setDevName(e.target.value)}
                    className="block w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-[5px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-semibold transition-all"
                    placeholder="e.g. Swagat Group, VTP Realty"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Est. Year (Established)</label>
                  <input
                    type="number"
                    value={devEstablished}
                    onChange={e => setDevEstablished(e.target.value)}
                    className="block w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-[5px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-semibold transition-all"
                    placeholder="e.g. 1998"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Years of Experience</label>
                  <input
                    type="text"
                    value={devExperience}
                    onChange={e => setDevExperience(e.target.value)}
                    className="block w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-[5px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-semibold transition-all"
                    placeholder="e.g. 25+ Years"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Delivered Projects Count</label>
                  <input
                    type="text"
                    value={devProjectsDelivered}
                    onChange={e => setDevProjectsDelivered(e.target.value)}
                    className="block w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-[5px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-semibold transition-all"
                    placeholder="e.g. 80+ Projects"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Ongoing Projects Count</label>
                  <input
                    type="text"
                    value={devOngoingProjects}
                    onChange={e => setDevOngoingProjects(e.target.value)}
                    className="block w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-[5px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-semibold transition-all"
                    placeholder="e.g. 8 Projects"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Developer Logo URL</label>
                  <input
                    type="text"
                    value={devLogo}
                    onChange={e => setDevLogo(e.target.value)}
                    className="block w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-[5px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-semibold transition-all"
                    placeholder="e.g. https://domain.com/logo.png"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Developer Banner/Cover Image URL</label>
                <input
                  type="text"
                  value={devImage}
                  onChange={e => setDevImage(e.target.value)}
                  className="block w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-[5px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-semibold transition-all"
                  placeholder="e.g. https://images.unsplash.com/..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Developer Description / About Builder</label>
                <textarea
                  value={devDescription}
                  onChange={e => setDevDescription(e.target.value)}
                  rows={4}
                  className="block w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-[5px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-semibold transition-all"
                  placeholder="Provide builder details, legacy, key specialties, corporate values..."
                />
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddDevOpen(false)}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-250 text-gray-750 font-bold rounded-[5px] text-xs uppercase tracking-wider transition-all cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex-1 py-3 bg-primary hover:bg-primary/95 disabled:bg-primary/50 text-white font-bold rounded-[5px] text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  {formLoading ? 'Creating Profile...' : 'Save & Publish Builder'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Developer Modal */}
      {isEditDevOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white border border-gray-100 rounded-[5px] w-full max-w-2xl p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wider">Update Developer Profile</h3>
              <button 
                type="button" 
                onClick={() => setIsEditDevOpen(false)}
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

            <form onSubmit={handleEditDeveloperSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Developer Name</label>
                  <input
                    type="text"
                    required
                    value={devName}
                    onChange={e => setDevName(e.target.value)}
                    className="block w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-[5px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-semibold transition-all"
                    placeholder="e.g. Swagat Group, VTP Realty"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Est. Year (Established)</label>
                  <input
                    type="number"
                    value={devEstablished}
                    onChange={e => setDevEstablished(e.target.value)}
                    className="block w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-[5px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-semibold transition-all"
                    placeholder="e.g. 1998"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Years of Experience</label>
                  <input
                    type="text"
                    value={devExperience}
                    onChange={e => setDevExperience(e.target.value)}
                    className="block w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-[5px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-semibold transition-all"
                    placeholder="e.g. 25+ Years"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Delivered Projects Count</label>
                  <input
                    type="text"
                    value={devProjectsDelivered}
                    onChange={e => setDevProjectsDelivered(e.target.value)}
                    className="block w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-[5px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-semibold transition-all"
                    placeholder="e.g. 80+ Projects"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Ongoing Projects Count</label>
                  <input
                    type="text"
                    value={devOngoingProjects}
                    onChange={e => setDevOngoingProjects(e.target.value)}
                    className="block w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-[5px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-semibold transition-all"
                    placeholder="e.g. 8 Projects"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Developer Logo URL</label>
                  <input
                    type="text"
                    value={devLogo}
                    onChange={e => setDevLogo(e.target.value)}
                    className="block w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-[5px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-semibold transition-all"
                    placeholder="e.g. https://domain.com/logo.png"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Developer Banner/Cover Image URL</label>
                <input
                  type="text"
                  value={devImage}
                  onChange={e => setDevImage(e.target.value)}
                  className="block w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-[5px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-semibold transition-all"
                  placeholder="e.g. https://images.unsplash.com/..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Developer Description / About Builder</label>
                <textarea
                  value={devDescription}
                  onChange={e => setDevDescription(e.target.value)}
                  rows={4}
                  className="block w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-[5px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm font-semibold transition-all"
                  placeholder="Provide builder details, legacy, key specialties, corporate values..."
                />
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditDevOpen(false)}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-[5px] text-xs uppercase tracking-wider transition-all cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex-1 py-3 bg-primary hover:bg-primary/95 disabled:bg-primary/50 text-white font-bold rounded-[5px] text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
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

      {/* Add Project Modal */}
      {isAddProjectOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white border border-gray-100 rounded-[5px] w-full max-w-4xl p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wider">Create New Real-Estate Project</h3>
              <button 
                type="button" 
                onClick={() => setIsAddProjectOpen(false)}
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

            <form onSubmit={handleAddProject} className="space-y-6">
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

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Project Type</label>
                    <select
                      value={projectType}
                      onChange={e => setProjectType(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 font-bold transition-all"
                    >
                      <option value="Apartment">Apartment / Flats</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Villa">Villa / Bungalow</option>
                      <option value="Plot">Plot / Land</option>
                      <option value="Commercial">Commercial Space</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Status</label>
                    <select
                      value={projectStatus}
                      onChange={e => setProjectStatus(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 font-bold transition-all"
                    >
                      <option value="UNDER_CONSTRUCTION">Under Construction</option>
                      <option value="READY_TO_MOVE">Ready to Move</option>
                      <option value="LAUNCHED">Newly Launched</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Price Range / Starting</label>
                    <input
                      type="text"
                      value={projectPrice}
                      onChange={e => setProjectPrice(e.target.value)}
                      placeholder="e.g. ₹57 Lakhs - ₹85.7 Lakhs"
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 placeholder-gray-400 font-semibold transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: LOCATION & SPECIFICATIONS */}
              <div>
                <p className="text-[11px] font-extrabold uppercase text-primary tracking-widest border-b border-gray-100 pb-2 mb-4">2. Location & Scale</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Location Address</label>
                    <input
                      type="text"
                      value={projectLocation}
                      onChange={e => setProjectLocation(e.target.value)}
                      placeholder="e.g. Charholi Budruk, Wadmukhwadi"
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 placeholder-gray-400 font-semibold transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">City</label>
                    <input
                      type="text"
                      value={projectCity}
                      onChange={e => setProjectCity(e.target.value)}
                      placeholder="e.g. Pune"
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 placeholder-gray-400 font-semibold transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Possession Timeline</label>
                    <input
                      type="text"
                      value={projectPossession}
                      onChange={e => setProjectPossession(e.target.value)}
                      placeholder="e.g. Dec 2030"
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 placeholder-gray-400 font-semibold transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Total Land Area</label>
                    <input
                      type="text"
                      value={projectLandArea}
                      onChange={e => setProjectLandArea(e.target.value)}
                      placeholder="e.g. 5.4 Acres"
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 placeholder-gray-400 font-semibold transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Towers & Floors</label>
                    <input
                      type="text"
                      value={projectTowers}
                      onChange={e => setProjectTowers(e.target.value)}
                      placeholder="e.g. 4 Towers (B+G+23)"
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 placeholder-gray-400 font-semibold transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Units / Density</label>
                    <input
                      type="text"
                      value={projectUnits}
                      onChange={e => setProjectUnits(e.target.value)}
                      placeholder="e.g. 350 Units / 8 per floor"
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 placeholder-gray-400 font-semibold transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: MEDIA & ADDITIONAL */}
              <div>
                <p className="text-[11px] font-extrabold uppercase text-primary tracking-widest border-b border-gray-100 pb-2 mb-4">3. Media & Extra Information</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Main Banner Image URL</label>
                    <input
                      type="text"
                      value={projectImage}
                      onChange={e => setProjectImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 placeholder-gray-400 font-semibold transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Gallery Images (Comma-separated URLs)</label>
                    <input
                      type="text"
                      value={projectGallery}
                      onChange={e => setProjectGallery(e.target.value)}
                      placeholder="url1, url2, url3"
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 placeholder-gray-400 font-semibold transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Amenities / Features (Comma-separated)</label>
                    <textarea
                      value={projectFeatures}
                      onChange={e => setProjectFeatures(e.target.value)}
                      placeholder="Gym, Swimming Pool, Clubhouse, CCTV, 3-tier security"
                      rows={2}
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-[5px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-800 placeholder-gray-400 font-semibold transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Key Selling Points / Attractions (Comma-separated)</label>
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
                  onClick={() => setIsAddProjectOpen(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 py-3.5 rounded-[5px] text-sm font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex-1 bg-primary hover:bg-primary/95 text-white py-3.5 rounded-[5px] text-sm font-bold transition-all shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {formLoading ? 'Saving Project...' : 'Save & Publish Project'}
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
