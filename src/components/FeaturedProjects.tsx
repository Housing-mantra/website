"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight, Building2, ShieldCheck, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { PROJECTS, DEVELOPERS } from "@/lib/data";

// Order of projects from folders 2 to 11
const FEATURED_IDS = [
  "prism-city-blue",
  "the-forestia-chikhli",
  "topaz-towers-charholi",
  "sankalp-sierra-charholi",
  "kamalraj-indradhanu-charholi",
  "santiago-skymont",
  "shaligram-greenstone-charholi",
  "shakuntal-alentia-charholi",
  "sankalp-torezza-ravet",
  "sai-ananta-charholi"
];

export function FeaturedProjects() {
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);
  const [developersList, setDevelopersList] = useState<any[]>(DEVELOPERS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        
        let apiProjects = [];
        let apiDevelopers = DEVELOPERS;
        
        if (data.success) {
          apiProjects = data.projects || [];
          if (data.developers && data.developers.length > 0) {
            apiDevelopers = data.developers;
          }
        }
        
        setDevelopersList(apiDevelopers);

        // Build the precise list of 10 featured projects (Folders 2 to 11)
        const orderedFeatured = FEATURED_IDS.map(id => {
          // 1. Try finding in API results
          const apiMatch = apiProjects.find((p: any) => p.id === id || p.slug === id);
          if (apiMatch) return apiMatch;
          
          // 2. Fall back to static data
          return PROJECTS.find(p => p.id === id);
        }).filter(Boolean);

        // On the homepage Featured section, display exactly 4 projects
        setFeaturedProjects(orderedFeatured.slice(0, 4));
      } catch (err) {
        console.error("Failed to load featured projects:", err);
        // Direct static fallback
        const staticFeatured = FEATURED_IDS.map(id => PROJECTS.find(p => p.id === id)).filter(Boolean);
        setFeaturedProjects(staticFeatured.slice(0, 4));
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col gap-3 mb-12">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-72 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 w-full bg-white border border-gray-100 rounded-[5px] animate-pulse p-5 space-y-4">
                <div className="h-48 w-full bg-gray-200 rounded-[5px]" />
                <div className="h-6 w-3/4 bg-gray-200 rounded" />
                <div className="h-4 w-1/2 bg-gray-200 rounded" />
                <div className="h-10 w-full bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50/50 font-sans">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="text-primary text-[10px] font-black uppercase tracking-widest bg-primary/5 px-3 py-1.5 rounded-[3px] border border-primary/10">
              Verified Collection
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-4 tracking-tight uppercase">
              Featured Projects
            </h2>
            <p className="text-gray-500 mt-2 font-medium text-sm md:text-base">
              Premium handpicked projects from Pune's finest developer folders (2-11)
            </p>
          </div>
          <Link
            href="/projects"
            className="group flex items-center gap-2.5 bg-primary hover:bg-primary/95 text-white font-bold text-xs px-5 py-3.5 rounded-[5px] transition-all shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
          >
            Explore All Projects
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => {
            const devId = project.developerId || project.developer?.id;
            const developer = developersList.find(d => d.id === devId);
            
            return (
              <Link href={`/projects/${project.id}`} key={project.id} className="block group">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
                  viewport={{ once: true }}
                  className="relative rounded-[5px] border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden h-full flex flex-col"
                >
                  {/* Image and Status Tag */}
                  <div className="relative h-56 w-full overflow-hidden shrink-0">
                    <img
                      src={project.image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    
                    {/* Status badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-primary text-[9px] font-black px-3 py-1.5 rounded-[3px] uppercase tracking-wider border border-primary/10 shadow-sm">
                      {project.status || "Ongoing"}
                    </div>

                    {/* RERA Badge if exists */}
                    {project.rera && (
                      <div className="absolute top-4 right-4 bg-primary text-white text-[9px] font-black px-3 py-1.5 rounded-[3px] uppercase tracking-wider shadow-sm flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3 text-secondary" />
                        RERA Approved
                      </div>
                    )}
                  </div>

                  {/* Details block */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Developer tag */}
                      {developer && (
                        <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-gray-400 mb-3 bg-gray-50 border border-gray-100 py-1 px-2.5 rounded-[3px] w-fit">
                          <Building2 className="h-3 w-3 text-secondary fill-secondary/10" />
                          {developer.name}
                        </div>
                      )}

                      <h3 className="text-xl font-extrabold text-gray-900 mb-1 group-hover:text-primary transition-colors line-clamp-1 leading-snug">
                        {project.title}
                      </h3>
                      
                      <div className="flex items-center gap-1.5 text-gray-500 text-xs font-semibold mb-4">
                        <MapPin className="h-4 w-4 text-primary shrink-0" />
                        {project.location}
                      </div>

                      <p className="text-gray-400 text-xs font-medium line-clamp-2 leading-relaxed mb-6">
                        {project.description || "Premium high-rise tower configuration designed for ultimate residential luxury and connectivity."}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-50 pt-5 mt-auto">
                      <div>
                        <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest leading-none mb-1">Starting from</p>
                        <p className="font-black text-lg text-primary leading-none tracking-tight">₹ {project.price}</p>
                      </div>
                      <span className="text-[10px] font-bold text-secondary bg-primary hover:bg-primary/95 px-3 py-2 rounded-[3px] uppercase tracking-wider transition-colors">
                        View Details
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
