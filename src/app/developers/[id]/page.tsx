
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getDeveloperBySlug } from "@/lib/db-helpers";
import { adminDb } from "@/lib/firebase-admin";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Building2, MapPin, Award, Calendar, Home, CheckCircle } from "lucide-react";

// ISR: Cache for 5 minutes, background regeneration
export const revalidate = 300;

export default async function DeveloperProfile({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const developer = await getDeveloperBySlug(id);

    if (!developer) {
        notFound();
    }

    // Get all projects for this developer from Firestore
    const projectsSnap = await adminDb
        .collection('projects')
        .where('developerId', '==', developer.id)
        .where('isActive', '==', true)
        .get();

    const developerProjects = projectsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Initials & Color styling generators
    const initials = (developer as any).initials || developer.name.split(' ').map((n: string) => n[0]).slice(0, 2).join('');
    const randomColorClasses = ["bg-red-500 text-white", "bg-blue-500 text-white", "bg-amber-500 text-white", "bg-emerald-500 text-white"];
    const fallbackColor = randomColorClasses[developer.name.charCodeAt(0) % randomColorClasses.length];
    const color = (developer as any).color || fallbackColor;

    // Derived statistics
    const experience = (developer as any).experience || `${2026 - developer.established} Years`;
    const projectsDelivered = (developer as any).projectsDelivered || Math.max(0, developer.projectsCount - 3);
    const ongoingProjects = (developer as any).ongoingProjects || 3;
    const about = developer.description || `Leading real estate developer committed to creating outstanding living and business spaces.`;

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Hero Section */}
            <div className="relative h-[40vh] w-full pt-20">
                <Image
                    src={developer.image}
                    alt={developer.name}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 py-12">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-white text-center md:text-left">
                            <div className={`h-24 w-24 rounded-[5px] flex items-center justify-center text-3xl font-bold border-4 border-white/20 shadow-xl ${color}`}>
                                {initials}
                            </div>
                            <div className="flex-1">
                                <h1 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight">
                                    {developer.name}
                                </h1>
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-white/90 font-medium">
                                    <span className="flex items-center gap-1">
                                        <Award className="w-4 h-4 text-amber-400" />
                                        {experience} Experience
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Building2 className="w-4 h-4 text-amber-400" />
                                        {developer.projectsCount} Projects
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Details */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* About */}
                        <section className="bg-white rounded-[5px] p-8 md:p-10 shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Building2 className="w-6 h-6 text-amber-600" />
                                About {developer.name}
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-lg mb-8">
                                {about}
                            </p>
                            
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                <div className="bg-amber-50/50 p-6 rounded-[5px] border border-amber-100 text-center">
                                    <Calendar className="w-6 h-6 text-amber-600 mx-auto mb-3" />
                                    <span className="block text-gray-500 text-xs font-semibold uppercase mb-1">Established</span>
                                    <span className="block text-gray-900 font-bold text-xl">{developer.established}</span>
                                </div>
                                <div className="bg-amber-50/50 p-6 rounded-[5px] border border-amber-100 text-center">
                                    <CheckCircle className="w-6 h-6 text-amber-600 mx-auto mb-3" />
                                    <span className="block text-gray-500 text-xs font-semibold uppercase mb-1">Delivered</span>
                                    <span className="block text-gray-900 font-bold text-xl">{projectsDelivered}</span>
                                </div>
                                <div className="bg-amber-50/50 p-6 rounded-[5px] border border-amber-100 text-center">
                                    <Home className="w-6 h-6 text-amber-600 mx-auto mb-3" />
                                    <span className="block text-gray-500 text-xs font-semibold uppercase mb-1">Ongoing</span>
                                    <span className="block text-gray-900 font-bold text-xl">{ongoingProjects}</span>
                                </div>
                            </div>
                        </section>

                        {/* Projects by Developer */}
                        <section>
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-3xl font-bold text-gray-900">Projects by {developer.name}</h2>
                                <span className="bg-white px-4 py-2 rounded-[5px] text-sm font-bold text-amber-600 border border-amber-100 shadow-sm">
                                    {developerProjects.length} Listings
                                </span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {developerProjects.map((project: any) => (
                                    <Link 
                                        href={`/projects/${project.id}`} 
                                        key={project.id}
                                        className="group bg-white rounded-[5px] overflow-hidden shadow-sm transition-all duration-500 border border-gray-100"
                                    >
                                        <div className="h-56 overflow-hidden relative">
                                            <img 
                                                src={project.image} 
                                                alt={project.title}
                                                className="w-full h-full object-cover transition-transform duration-500"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-[5px] text-xs font-bold text-gray-900 shadow-sm uppercase tracking-wider">
                                                    {project.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-extrabold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors line-clamp-1">
                                                {project.title}
                                            </h3>
                                            <div className="flex items-center text-gray-500 text-sm mb-4">
                                                <MapPin className="w-4 h-4 mr-1 text-amber-600" />
                                                {project.location}
                                            </div>
                                            <div className="flex justify-between items-end border-t border-gray-50 pt-4">
                                                <div className="text-amber-600 font-black text-lg">
                                                    {project.price.split(' onwards')[0]}
                                                    <span className="block text-[10px] text-gray-400 font-semibold uppercase tracking-widest mt-0.5">Starting From</span>
                                                </div>
                                                <div className="bg-gray-900 text-white p-2 rounded-[5px] group-hover:bg-amber-600 transition-colors">
                                                    <ChevronRight className="w-5 h-5" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Contact/Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-[5px] p-8 shadow-sm border border-gray-100 sticky top-24">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Inquiry Form</h3>
                            <p className="text-gray-500 mb-8 text-sm font-medium">
                                Get exclusive offers and detailed brochure for {developer.name} projects.
                            </p>

                            <form className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-[5px] focus:outline-none focus:ring-4 focus:ring-amber-600/10 focus:border-amber-600 transition-all font-medium"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-[5px] focus:outline-none focus:ring-4 focus:ring-amber-600/10 focus:border-amber-600 transition-all font-medium"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Email (Optional)</label>
                                    <input
                                        type="email"
                                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-[5px] focus:outline-none focus:ring-4 focus:ring-amber-600/10 focus:border-amber-600 transition-all font-medium"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <button type="button" className="w-full bg-gray-900 text-white py-4 rounded-[5px] font-black text-sm uppercase tracking-widest hover:bg-amber-600 transition-all shadow-lg shadow-gray-200 hover:shadow-amber-600/30">
                                    Contact Developer
                                </button>
                                <p className="text-[10px] text-gray-400 text-center font-medium">
                                    By submitting, you agree to our Terms of Use and Privacy Policy.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
