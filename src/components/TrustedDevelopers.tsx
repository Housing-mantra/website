"use client";

import React, { useState } from 'react';
import { DEVELOPERS } from "@/lib/data";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from '@/lib/utils';

const DeveloperLogo = ({ dev }: { dev: any }) => {
    const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

    return (
        <div className="relative w-full h-full bg-white">
            {/* Fallback Initials - Always in background while loading or on error */}
            <div className={cn(
                "absolute inset-0 flex items-center justify-center text-xl font-black uppercase tracking-tighter transition-opacity duration-300",
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
                        "w-full h-full object-contain p-2 relative z-10 transition-all duration-500", 
                        status === 'loaded' ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    )}
                    onLoad={() => setStatus('loaded')}
                    onError={() => setStatus('error')}
                />
            )}
        </div>
    );
};

export const TrustedDevelopers = () => {
    return (
        <section className="py-20 bg-gray-50/50">
            <div className="container mx-auto px-4">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Trusted Developers</h2>
                        <p className="text-gray-500 font-medium">Partnering with India's most reputable and award-winning builders.</p>
                    </div>
                    <Link 
                        href="/developers" 
                        className="flex items-center gap-2 text-amber-600 font-bold hover:gap-3 transition-all group"
                    >
                        See All Developers
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {DEVELOPERS.slice(0, 8).map((dev) => (
                        <Link
                            key={dev.id}
                            href={`/developers/${dev.id}`}
                            className="group flex items-center gap-4 p-5 bg-white rounded-[5px] border border-gray-100 shadow-sm transition-all duration-500"
                        >
                            <div className="h-16 w-16 min-w-[64px] rounded-[5px] flex items-center justify-center overflow-hidden bg-white border border-gray-50 group-hover:border-amber-100 transition-all shadow-sm relative">
                                <DeveloperLogo dev={dev} />
                            </div>
                            <div className="min-w-0">
                                <h3 className="text-sm font-bold text-gray-900 group-hover:text-amber-600 transition-colors truncate leading-tight">{dev.name}</h3>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 opacity-80">{dev.projectsCount}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
