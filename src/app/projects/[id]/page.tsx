import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getProjectBySlug, getDeveloperBySlug } from "@/lib/db-helpers";
import { notFound } from "next/navigation";
import Image from "next/image";
import { 
    MapPin, CheckCircle, ArrowLeft, Building2, Phone, Mail, 
    Calendar, Maximize, Layout, Layers, Compass, 
    ShieldCheck, GraduationCap, 
    HeartPulse, Utensils, Store, Smartphone
} from "lucide-react";
import Link from "next/link";
import { ProjectActions } from "@/components/ProjectActions";

import { Metadata } from "next";

export const dynamic = 'force-dynamic';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const project = await getProjectBySlug(id);

    if (!project) {
        return {
            title: "Project Not Found",
            description: "The requested project could not be found.",
        };
    }

    return {
        title: project.title || "Project Details",
        description: project.description?.substring(0, 160) || project.title || "Premium Real Estate Project",
        openGraph: {
            title: `${project.title || "Project"} - ${project.location || "Pune"}`,
            description: project.description?.substring(0, 160) || project.title || "",
            images: [
                {
                    url: project.image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop",
                    width: 1200,
                    height: 630,
                    alt: project.title || "Project Image",
                }
            ],
        },
    };
}

export default async function ProjectDetails({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const project = await getProjectBySlug(id) as any;

    if (!project) {
        notFound();
    }

    const developer = project.developerId ? await getDeveloperBySlug(project.developerId) : null;

    // Safe fallbacks for lists
    const features = project.features || [];
    const gallery = project.gallery || [];
    const floorPlans = project.floorPlans || [];
    const attractions = project.attractions || [];

    return (
        <main className="min-h-screen font-sans bg-gray-50/50 pt-16">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "RealEstateListing",
                        "name": project.title || "Project Details",
                        "description": project.description || "",
                        "url": `https://housingmantra.in/projects/${project.id}`,
                        "image": project.image || "",
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": project.location || "Pune",
                            "addressRegion": "Maharashtra",
                            "addressCountry": "IN"
                        },
                        "offers": {
                            "@type": "Offer",
                            "priceCurrency": "INR",
                            "price": project.price || "",
                            "availability": "https://schema.org/InStock"
                        }
                    })
                }}
            />
            <Navbar />

            {/* Clean Professional Hero Section */}
            <div className="relative h-[65vh] min-h-[500px] w-full overflow-hidden">
                <Image
                    src={project.image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop"}
                    alt={project.title || "Project Details"}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute inset-0 flex flex-col justify-end pb-12">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl">
                            <nav className="flex items-center gap-2 text-white/80 text-[11px] font-bold uppercase tracking-widest mb-6">
                                <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
                                <span>/</span>
                                <Link href="/projects" className="hover:text-amber-400 transition-colors">Pune Projects</Link>
                                <span>/</span>
                                <span className="text-white">{project.title || "Details"}</span>
                            </nav>

                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <span className="px-4 py-1.5 bg-amber-600 text-white text-[10px] font-bold rounded-[5px] tracking-widest uppercase shadow-sm">
                                    {project.status || "Ongoing"}
                                </span>
                                <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md text-white text-[10px] font-bold rounded-[5px] tracking-widest uppercase border border-white/20">
                                    {project.type || "Apartment"}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 uppercase tracking-tight">
                                {project.title || "Premium Project"}
                            </h1>
                            
                            <div className="flex flex-wrap items-center gap-8">
                                <div className="flex items-center gap-2 text-white/90">
                                    <MapPin className="h-5 w-5 text-amber-500" />
                                    <span className="text-lg font-bold">{project.location || "Pune"}</span>
                                </div>
                                {developer && (
                                    <Link href={`/developers/${developer.id}`} className="flex items-center gap-2 text-white/90 group">
                                        <Building2 className="h-5 w-5 text-amber-500" />
                                        <span className="text-lg font-bold group-hover:text-amber-400 transition-colors">By {developer.name}</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Secondary Nav Bar - Matching Site Consistency */}
            <div className="sticky top-16 z-40 bg-white border-b border-gray-100 hidden md:block shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-4">
                        <div className="flex gap-8">
                            {['Overview', 'Amenities', 'Gallery', 'Location'].map((item) => (
                                <a 
                                    key={item} 
                                    href={`#${item.toLowerCase()}`}
                                    className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-amber-600 transition-all"
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                        {/* Bookmark + Share – client-side, also logs browse history */}
                        <ProjectActions projectId={project.id} />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-16">
                        
                        <section id="overview" className="scroll-mt-32">
                            <div className="bg-white rounded-[5px] p-10 border border-gray-100 shadow-sm">
                                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Project Overview</h2>
                                <p className="text-gray-600 leading-relaxed text-lg mb-10">
                                    {project.description || "Premium residential project with modern configurations and state of the art layouts."}
                                </p>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    {[
                                        { label: 'Possession', value: project.possession || "On Request", icon: Calendar },
                                        { label: 'Units', value: project.units || "Premium", icon: Building2 },
                                        { label: 'Land Area', value: project.landArea || "On Request", icon: Maximize },
                                        { label: 'Towers', value: project.towers || "On Request", icon: Layers },
                                        { label: 'RERA ID', value: project.rera || "Registered", icon: ShieldCheck },
                                        { label: 'Type', value: project.type || "Apartment", icon: Layout }
                                    ].map((stat, i) => (
                                        <div key={i} className="p-5 rounded-[5px] bg-gray-50 border border-gray-100">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                            <p className="text-sm font-bold text-gray-900">{stat.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {features.length > 0 && (
                            <section id="amenities" className="scroll-mt-32">
                                <div className="bg-white rounded-[5px] p-10 border border-gray-100 shadow-sm">
                                    <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Amenities</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                        {features.map((feature: string, index: number) => (
                                            <div key={index} className="flex flex-col gap-3">
                                                <div className="h-10 w-10 rounded-[5px] bg-gray-50 border border-gray-100 flex items-center justify-center text-amber-600">
                                                    <CheckCircle className="h-5 w-5" />
                                                </div>
                                                <span className="text-gray-900 font-bold text-xs uppercase tracking-wider">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Floor Plans Section (Legacy but Improved) */}
                        {floorPlans.length > 0 && (
                            <section id="floor-plans" className="scroll-mt-36">
                                <div className="bg-white rounded-[5px] p-10 shadow-sm border border-gray-100">
                                    <div className="flex items-center gap-5 mb-8 border-b border-gray-50 pb-6">
                                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Floor Plans</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {floorPlans.map((plan: any, idx: number) => (
                                            <div key={idx} className="bg-gray-50/50 rounded-[5px] p-2 border border-gray-100 overflow-hidden group">
                                                <div className="relative aspect-square rounded-[5px] overflow-hidden bg-white mb-4">
                                                    <Image
                                                        src={plan.image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=500&auto=format&fit=crop"}
                                                        alt={plan.title || "Floor Plan"}
                                                        fill
                                                        className="object-contain p-8 transition-transform duration-700"
                                                    />
                                                </div>
                                                <div className="px-6 py-4 flex flex-col gap-2">
                                                    <h3 className="text-lg font-bold text-gray-900 uppercase tracking-tight">{plan.title}</h3>
                                                    <div className="flex justify-between items-center text-sm">
                                                        <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Area: {plan.area}</span>
                                                        <span className="text-primary font-bold">₹ {plan.price}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Gallery Section */}
                        {gallery.length > 0 && (
                            <section id="gallery" className="scroll-mt-32">
                                <div className="bg-white rounded-[5px] p-10 border border-gray-100 shadow-sm">
                                    <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Project Gallery</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {gallery.map((img: string, index: number) => (
                                            <div key={index} className="relative h-80 rounded-[5px] overflow-hidden group shadow-sm">
                                                <Image
                                                    src={img}
                                                    alt={`Gallery ${index + 1}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Neighborhood / Attractions */}
                        {attractions.length > 0 && (
                            <section id="location" className="scroll-mt-32">
                                <div className="bg-white rounded-[5px] p-10 border border-gray-100 shadow-sm">
                                    <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Location & Connectivity</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        <div className="space-y-6">
                                            {attractions.map((attr: any, idx: number) => (
                                                <div key={idx} className="flex items-center justify-between p-6 bg-gray-50/50 rounded-[5px] border border-gray-100 group hover:border-primary/20 transition-all">
                                                    <div className="flex items-center gap-5">
                                                        <div className="h-12 w-12 bg-white rounded-[5px] flex items-center justify-center shadow-sm transition-all">
                                                            {attr.category === 'Education' && <GraduationCap className="h-6 w-6" />}
                                                            {attr.category === 'Healthcare' && <HeartPulse className="h-6 w-6" />}
                                                            {attr.category === 'Shopping' && <Store className="h-6 w-6" />}
                                                            {(attr.category === 'Entertainment' || attr.category === 'Dining' || attr.category === 'Transport' || attr.category === 'Locality') && <Utensils className="h-6 w-6" />}
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-900 font-bold text-base">{attr.name}</p>
                                                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{attr.category}</p>
                                                        </div>
                                                    </div>
                                                    <span className="text-secondary font-bold text-xs px-4 py-2 bg-white rounded-[5px] shadow-sm">{attr.distance}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="relative aspect-square rounded-[5px] overflow-hidden shadow-sm border border-gray-100 leading-[0]">
                                            <Image
                                                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop"
                                                alt="Location Map Placeholder"
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center backdrop-blur-[1px]">
                                                <div className="bg-white/95 backdrop-blur-xl p-8 rounded-[5px] shadow-sm text-center border border-white/40 max-w-[200px]">
                                                    <MapPin className="h-10 w-10 text-primary mx-auto mb-4 animate-bounce" />
                                                    <p className="text-gray-900 font-bold text-lg mb-1 leading-tight">{project.title}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-40 space-y-6">
                            <div className="bg-white rounded-[5px] p-10 border border-gray-100 shadow-sm">
                                <h3 className="text-3xl font-extrabold text-gray-900 mb-2">Enquire Now</h3>
                                <p className="text-gray-500 font-medium mb-8">Get official brochure & pricing details.</p>

                                <form className="space-y-5">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm font-bold text-gray-900 transition-all"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm font-bold text-gray-900 transition-all"
                                            placeholder="+91 00000 00000"
                                        />
                                    </div>
                                    <button type="button" className="w-full bg-amber-600 text-white py-5 rounded-[5px] font-bold uppercase tracking-widest text-xs hover:bg-gray-900 transition-all shadow-sm active:scale-95">
                                        Request Details
                                    </button>
                                </form>

                                <div className="mt-8 border-t border-gray-100 pt-8">
                                    <div className="grid grid-cols-2 gap-4">
                                        <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-[5px] border border-gray-100 hover:border-amber-200 transition-all group">
                                            <Phone className="h-5 w-5 text-gray-400 group-hover:text-amber-600" />
                                            <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Call Now</span>
                                        </button>
                                        <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-[5px] border border-gray-100 hover:border-blue-200 transition-all group">
                                            <Smartphone className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                                            <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500">WhatsApp</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white p-6 rounded-[5px] border border-gray-100 shadow-sm flex items-center gap-4">
                                <div className="h-10 w-10 bg-green-50 rounded-[5px] flex items-center justify-center">
                                    <ShieldCheck className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Authenticated</p>
                                    <p className="text-xs font-bold text-gray-900 leading-none">MahaRERA Registered</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Mobile Action Bar (Sticky Focus) */}
            <div className="md:hidden fixed bottom-6 left-6 right-6 z-[99] animate-bounce">
                <button className="w-full bg-primary text-white py-5 rounded-[5px] font-bold uppercase tracking-widest text-xs shadow-2xl shadow-primary/40 active:scale-95 transition-all">
                    Enquire Now
                </button>
            </div>

            <Footer />
        </main>
    );
}
