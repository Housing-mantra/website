"use client";

import { useState } from "react";
import { Search, MapPin, Home, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
    { id: "residential", label: "Residential", icon: Home },
    { id: "commercial", label: "Commercial", icon: Building2 },
];

export function Hero() {
    const [activeTab, setActiveTab] = useState("residential");

    return (
        <section className="relative h-[660px] w-full flex items-center justify-center">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=2670&auto=format&fit=crop")',
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-[#2F0D5E]/80 mix-blend-multiply" />
            </div>

            <div className="relative z-10 w-full max-w-4xl px-4 text-center -mt-[10%] md:mt-0">
                <h1 className="mb-2 text-3xl font-bold text-white md:text-5xl drop-shadow-lg">
                    Find Your <span className="text-secondary">Perfect Home</span>
                </h1>
                <p className="mb-4 text-lg text-gray-200">
                    Search from over 1 million+ verified properties in Pune
                </p>

                {/* Search Card */}
                <div className="rounded-md bg-white p-3 custom-shadow backdrop-blur-sm bg-white/95">
                    {/* Tabs */}
                    <div className="mb-4 flex gap-4 border-b border-gray-200 px-4 pt-2">
                        {TABS.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "flex items-center gap-2 border-b-2 pb-2 text-sm font-medium transition-colors",
                                        activeTab === tab.id
                                            ? "border-primary text-primary"
                                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Search Input */}
                    <div className="flex flex-col gap-2 p-2 md:flex-row">
                        <div className="relative flex-1">
                            <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by Locality, Project, or Landmark..."
                                className="w-full rounded-md border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 custom-shadow"
                            />
                        </div>
                        <button className="flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-3 font-semibold text-white transition-all hover:bg-primary/90 active:scale-95 custom-shadow">
                            <Search className="h-5 w-5" />
                            Search
                        </button>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 flex justify-center gap-6 text-white/90">
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-400" />
                        <span className="text-sm font-medium">100% Verified Listings</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-400" />
                        <span className="text-sm font-medium">Direct from Owners</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
