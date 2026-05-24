"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight } from "lucide-react";
import { cn } from '@/lib/utils';

const DeveloperLogo = ({ dev }: { dev: any }) => {
    const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
    const initials = dev.initials || dev.name.split(' ').map((n: string) => n[0]).slice(0, 2).join('');
    const randomColorClasses = ["bg-red-50 text-red-600", "bg-blue-50 text-blue-600", "bg-amber-50 text-amber-600", "bg-emerald-50 text-emerald-600"];
    const fallbackColor = randomColorClasses[dev.name.charCodeAt(0) % randomColorClasses.length];

    return (
        <div className="relative w-full h-full bg-white">
            {/* Fallback Initials - Always in background while loading or on error */}
            <div className={cn(
                "absolute inset-0 flex items-center justify-center text-xl font-black uppercase tracking-tighter transition-opacity duration-300",
                fallbackColor,
                status === 'loaded' ? 'opacity-0' : 'opacity-100'
            )}>
                {initials}
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
    const [developers, setDevelopers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDevs() {
            try {
                const res = await fetch("/api/projects");
                const data = await res.json();
                if (data.success) {
                    setDevelopers(data.developers);
                }
            } catch (err) {
                console.error("Failed to load developers:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchDevs();
    }, []);

    if (loading) {
        return (
            <section className="py-20 bg-gray-50/50">
                <div className="container mx-auto px-4 text-center py-10 animate-pulse text-lg font-bold text-gray-400">
                    Loading Trusted Partners...
                </div>
            </section>
        );
    }
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
                    {developers.slice(0, 8).map((dev) => (
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
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 opacity-80">{dev.projectsCount} Projects</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
