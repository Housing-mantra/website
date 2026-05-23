"use client";

import React, { useState } from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DEVELOPERS } from "@/lib/data";
import Link from "next/link";
import { ChevronRight, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const DeveloperLogo = ({ dev }: { dev: any }) => {
    const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

    return (
        <div className="relative w-full h-full bg-white">
            {/* Fallback Initials - Always in background while loading or on error */}
            <div className={cn(
                "absolute inset-0 flex items-center justify-center text-3xl font-black uppercase tracking-tighter transition-opacity duration-300",
                dev.color,
                status === 'loaded' ? 'opacity-0' : 'opacity-100'
            )}>
                {dev.initials}
            </div>
            
            {/* Actual Logo */}
            {dev.logo && (
                <img 
                    src={dev.logo} 
                    alt={dev.name} 
                    className={cn(
                        "w-full h-full object-contain p-3 relative z-10 transition-all duration-500", 
                        status === 'loaded' ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    )}
                    onLoad={() => setStatus('loaded')}
                    onError={() => setStatus('error')}
                />
            )}
        </div>
    );
};

export default function DevelopersPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Breadcrumb */}
            <div className="bg-white border-b mt-16">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center text-sm text-gray-500 gap-2">
                        <Link href="/" className="hover:text-amber-600">Home</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-gray-900 font-medium">Developers</span>
                    </div>
                </div>
            </div>

            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Our Trusted Partners</h1>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium">
                            Collaborating with India's most visionaries and award-winning builders.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {DEVELOPERS.map((dev) => (
                            <Link 
                                href={`/developers/${dev.id}`} 
                                key={dev.id}
                                className="group bg-white rounded-[5px] p-5 flex items-center gap-4 transition-all duration-500 border border-gray-100 shadow-sm"
                            >
                                <div className="h-16 w-16 min-w-[64px] rounded-[5px] flex items-center justify-center overflow-hidden bg-white border border-gray-100 transition-all shadow-sm relative">
                                    <DeveloperLogo dev={dev} />
                                </div>
                                <div className="min-w-0">
                                    <h2 className="text-sm font-bold text-gray-900 group-hover:text-amber-600 transition-colors truncate leading-tight">
                                        {dev.name}
                                    </h2>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 opacity-80">
                                        {dev.projectsCount}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
