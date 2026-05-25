"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight, Building2, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
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
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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

        setFeaturedProjects(orderedFeatured);
      } catch (err) {
        console.error("Failed to load featured projects:", err);
        const staticFeatured = FEATURED_IDS.map(id => PROJECTS.find(p => p.id === id)).filter(Boolean);
        setFeaturedProjects(staticFeatured);
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  // Helper functions to dynamically extract BHK and Area ranges from configurations
  const getBHKRange = (project: any) => {
    if (project.configurations && project.configurations.length > 0) {
      const nums = project.configurations
        .map((c: any) => c.type.replace(/[^0-9]/g, ""))
        .filter(Boolean);
      if (nums.length > 0) {
        const uniqueNums = Array.from(new Set(nums)).sort();
        return uniqueNums.join(",") + " BHK";
      }
    }
    const match = project.type?.match(/\d+/g);
    if (match) {
      return Array.from(new Set(match)).sort().join(",") + " BHK";
    }
    return "2,3 BHK";
  };

  const getAreaRange = (project: any) => {
    if (project.configurations && project.configurations.length > 0) {
      const areas = project.configurations.map((c: any) => c.area);
      const allNumbers: number[] = [];
      areas.forEach((a: string) => {
        const matches = a.replace(/,/g, "").match(/\d+/g);
        if (matches) {
          matches.forEach(num => allNumbers.push(parseInt(num)));
        }
      });
      if (allNumbers.length > 0) {
        const min = Math.min(...allNumbers);
        const max = Math.max(...allNumbers);
        if (min === max) {
          return `${min} Sq Ft`;
        }
        return `${min} - ${max} Sq Ft`;
      }
    }
    return "695 - 1375 Sq Ft";
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      
      if (maxScroll > 0) {
        setScrollProgress((scrollLeft / maxScroll) * 100);
      }
      
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < maxScroll - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = direction === "left" ? -clientWidth * 0.8 : clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <section className="py-24 bg-gray-50/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col gap-3 mb-12">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mt-2" />
          </div>
          <div className="flex gap-8 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[480px] min-w-[380px] bg-white border border-gray-100 rounded-[5px] animate-pulse p-6 space-y-4 shrink-0">
                <div className="h-56 w-full bg-gray-200 rounded-[5px]" />
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#fafbfc] font-sans relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-[#1b2534]">
            What Are the Trending New Projects in Pune
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore top-rated, RERA-verified projects from trusted developers across Pune's fastest-growing markets.
          </p>
        </div>

        {/* Carousel container with chevrons */}
        <div className="relative group/carousel">
          
          {/* Scroll Navigation Chevrons - Elegant side absolute layout or top header */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 z-20 transition-opacity duration-300">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`p-3.5 rounded-full border bg-white border-[#eef2f6] shadow-md transition-all duration-300 flex items-center justify-center ${
                canScrollLeft
                  ? "hover:bg-primary hover:text-white text-gray-700 cursor-pointer active:scale-90"
                  : "opacity-0 pointer-events-none"
              }`}
              title="Scroll Left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 -right-4 z-20 transition-opacity duration-300">
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`p-3.5 rounded-full border bg-white border-[#eef2f6] shadow-md transition-all duration-300 flex items-center justify-center ${
                canScrollRight
                  ? "hover:bg-primary hover:text-white text-gray-700 cursor-pointer active:scale-90"
                  : "opacity-0 pointer-events-none"
              }`}
              title="Scroll Right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Horizontal Scrollable Wrapper */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-8 scrollbar-none"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {featuredProjects.map((project, index) => {
              const devId = project.developerId || project.developer?.id;
              const developer = developersList.find(d => d.id === devId);
              
              return (
                <Link
                  href={`/projects/${project.id}`}
                  key={project.id}
                  className="block shrink-0 w-[82vw] sm:w-[45vw] md:w-[31.5vw] lg:w-[calc(25%-18px)] min-w-[260px] lg:min-w-0 max-w-[380px] lg:max-w-none snap-start group"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
                    viewport={{ once: true }}
                    className="relative rounded-[5px] border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300 overflow-hidden h-[360px] flex flex-col justify-between"
                  >
                    {/* Image Block */}
                    <div className="relative h-[175px] w-full overflow-hidden shrink-0 rounded-t-[5px]">
                      <img
                        src={project.image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                      
                      {/* Watermark logo style */}
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-primary text-[9px] font-black px-2.5 py-1.5 rounded-[4px] uppercase tracking-wider shadow-sm border border-gray-100">
                        {project.status ? project.status.split(" ")[0] : "Active"}
                      </div>

                      {/* RERA Badge top-right */}
                      {project.rera && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[8px] font-black px-2.5 py-1.5 rounded-[4px] uppercase tracking-wider shadow-sm flex items-center gap-1">
                          <ShieldCheck className="h-3 w-3 text-white" />
                          RERA Approved
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-4 flex-1 flex flex-col justify-between bg-white rounded-b-[5px]">
                      <div>
                        {/* Title */}
                        <h3 className="text-[#1b2534] text-base font-bold group-hover:text-primary transition-colors line-clamp-1 leading-snug mb-0.5">
                          {project.title}
                        </h3>
                        
                        {/* Location */}
                        <div className="flex items-center gap-1 text-[#6f7e92] text-[12px] font-medium mb-1.5">
                          <MapPin className="h-3.5 w-3.5 text-[#6f7e92] shrink-0" />
                          {project.location}
                        </div>

                        {/* Price */}
                        <p className="text-[#1b2534] text-[15px] font-extrabold tracking-tight">
                          ₹ {project.price.includes("onwards") ? project.price.replace("onwards", "") : project.price}
                        </p>
                      </div>

                      {/* Bottom Section with Dotted Line & Columns */}
                      <div className="mt-auto">
                        {/* Dotted Divider line */}
                        <div className="border-t border-dashed border-[#eef2f6] my-2.5 w-full" />
                        
                        {/* Metadata Grid */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-[#a0aebf] text-[9px] uppercase font-extrabold tracking-widest mb-0.5">BHK</p>
                            <p className="text-[#1b2534] text-[12px] font-extrabold tracking-tight line-clamp-1">
                              {getBHKRange(project)}
                            </p>
                          </div>
                          <div>
                            <p className="text-[#a0aebf] text-[9px] uppercase font-extrabold tracking-widest mb-0.5">AREA</p>
                            <p className="text-[#1b2534] text-[12px] font-extrabold tracking-tight line-clamp-1">
                              {getAreaRange(project)}
                            </p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>

        </div>

        {/* Dynamic Scroll Progress Bar */}
        <div className="mt-6 flex flex-col items-center gap-3">
          <div className="w-48 h-[3px] bg-gray-100 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-primary transition-all duration-150 rounded-full"
              style={{ width: `${Math.max(scrollProgress, 5)}%` }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
