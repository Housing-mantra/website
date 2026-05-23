"use client";

import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PROJECTS, DEVELOPERS } from "@/lib/data";
import { MapPin, Building2, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Suspense, useState, useEffect } from "react";

function ProjectsContent() {
    const searchParams = useSearchParams();
    const areaFilter = searchParams.get("area");
    const searchFilter = searchParams.get("search") || "";
    const [searchQuery, setSearchQuery] = useState(searchFilter);

    useEffect(() => {
        setSearchQuery(searchFilter);
    }, [searchFilter]);

    let filteredProjects = areaFilter 
        ? PROJECTS.filter(p => p.location.toLowerCase().includes(areaFilter.toLowerCase()))
        : PROJECTS;

    if (searchQuery) {
        const query = searchQuery.toLowerCase().trim();
        filteredProjects = filteredProjects.filter(p => 
            p.title.toLowerCase().includes(query) || 
            p.location.toLowerCase().includes(query)
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <div>
                    <h1 className="text-4xl font-bold mb-2">
                        {areaFilter ? `Projects in ${areaFilter}` : "All Projects"}
                    </h1>
                    <p className="text-gray-600">
                        Showing {filteredProjects.length} premium projects in Pune.
                    </p>
                </div>
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search by project or locality..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-[5px] border border-gray-100 shadow-sm focus:outline-none focus:ring-1 focus:ring-primary/20"
                    />
                </div>
            </div>

            {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProjects.map((project, index) => {
                        const developer = DEVELOPERS.find(d => d.id === project.developerId);
                        return (
                            <Link href={`/projects/${project.id}`} key={project.id} className="block">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="group rounded-[5px] border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full"
                                >
                                    <div className="relative h-48 w-full overflow-hidden">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute top-3 left-3 bg-secondary text-black text-[10px] font-bold px-2 py-0.5 rounded-[3px] uppercase">
                                            {project.status}
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">{project.title}</h3>
                                        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                                            <MapPin className="h-4 w-4" />
                                            {project.location}
                                        </div>
                                        {developer && (
                                            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 mb-4 bg-gray-50 py-1 px-2 rounded w-fit">
                                                <Building2 className="h-3 w-3 text-amber-500" />
                                                {developer.name}
                                            </div>
                                        )}
                                        <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                                            <div>
                                                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Starting Price</p>
                                                <p className="font-bold text-lg text-primary">{project.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-[5px] border border-dashed border-gray-200">
                    <p className="text-gray-500 text-lg">No projects found in this area yet.</p>
                </div>
            )}
        </div>
    );
}

export default function ProjectsPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <Suspense fallback={<div className="h-screen flex items-center justify-center font-bold">Loading Projects...</div>}>
                <ProjectsContent />
            </Suspense>
            <Footer />
        </main>
    );
}
