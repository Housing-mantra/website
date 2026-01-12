"use client";

import Link from "next/link";
import { Menu, User, X, MapPin, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

const LOCATIONS = ["Pune", "Mumbai", "Bangalore"];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState("Pune");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        handleScroll(); // Check initial state
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isMobileMenuOpen]);

    return (
        <nav
            className={cn(
                "fixed top-0 z-50 w-full transition-all duration-300 bg-white custom-shadow"
            )}
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                        <span className="text-2xl font-bold transition-colors text-primary">
                            Housing Mantra
                        </span>
                    </Link>

                    {/* Desktop Location Dropdown */}
                    <div className="hidden md:block relative">
                        <button
                            onClick={() => setIsLocationOpen(!isLocationOpen)}
                            className="flex items-center gap-1 text-sm font-medium transition-colors outline-none text-gray-600 hover:text-primary"
                        >
                            <MapPin className="h-4 w-4" />
                            <span>{selectedCity}</span>
                            <ChevronDown className={cn("h-4 w-4 transition-transform", isLocationOpen ? "rotate-180" : "")} />
                        </button>

                        <AnimatePresence>
                            {isLocationOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-0 mt-4 w-48 rounded-md bg-white p-2 custom-shadow ring-1 ring-black/5 z-50"
                                >
                                    <div className="flex flex-col gap-1">
                                        {LOCATIONS.map((city) => {
                                            const isComingSoon = city === "Mumbai" || city === "Bangalore";
                                            return (
                                                <Link
                                                    key={city}
                                                    href={isComingSoon ? "#" : `/city/${city.toLowerCase()}`}
                                                    onClick={(e) => {
                                                        if (isComingSoon) {
                                                            e.preventDefault();
                                                            return;
                                                        }
                                                        setSelectedCity(city);
                                                        setIsLocationOpen(false);
                                                    }}
                                                    className={cn(
                                                        "rounded-md px-3 py-2 text-sm transition-colors text-left flex items-center justify-between group",
                                                        selectedCity === city
                                                            ? "bg-primary/5 text-primary font-medium"
                                                            : isComingSoon
                                                                ? "text-gray-400 cursor-not-allowed"
                                                                : "text-gray-700 hover:bg-gray-50 hover:text-primary"
                                                    )}
                                                >
                                                    {city}
                                                    {isComingSoon && (
                                                        <span className="text-[10px] font-normal text-primary bg-primary/5 px-2 py-0.5 rounded-full ml-2">
                                                            Soon
                                                        </span>
                                                    )}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/post-property" className="hidden md:flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors bg-secondary/10 text-secondary-foreground hover:bg-secondary/20">
                        <span className="bg-secondary text-white rounded-full p-0.5 text-xs">FREE</span>
                        Post Property
                    </Link>
                    <button className="flex items-center gap-2 rounded-md border text-sm font-medium transition-colors p-2 md:px-4 md:py-2 border-gray-200 text-gray-900 hover:bg-gray-50">
                        <User className="h-4 w-4" />
                        <span className="hidden md:inline">Login</span>
                    </button>
                    <button
                        className="md:hidden p-2 text-gray-900"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100vh" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-16 left-0 right-0 z-40 bg-white border-t border-gray-100 md:hidden overflow-y-auto pb-20"
                    >
                        <div className="flex flex-col p-6 gap-6">
                            <div className="flex flex-col gap-4">
                                <p className="text-xs font-semibold uppercase text-gray-400">Select City</p>
                                <div className="grid grid-cols-2 gap-3">
                                    {LOCATIONS.map((city) => {
                                        const isComingSoon = city === "Mumbai" || city === "Bangalore";
                                        return (
                                            <Link
                                                key={city}
                                                href={isComingSoon ? "#" : `/city/${city.toLowerCase()}`}
                                                onClick={(e) => {
                                                    if (isComingSoon) {
                                                        e.preventDefault();
                                                        return;
                                                    }
                                                    setSelectedCity(city);
                                                    setIsMobileMenuOpen(false);
                                                }}
                                                className={cn(
                                                    "flex items-center justify-between gap-2 rounded-md border p-2 text-sm font-medium transition-colors",
                                                    selectedCity === city
                                                        ? "border-primary bg-primary/5 text-primary"
                                                        : isComingSoon
                                                            ? "border-gray-100 text-gray-400 cursor-not-allowed bg-gray-50/50"
                                                            : "border-gray-100 text-gray-700 hover:border-primary/20 hover:bg-primary/5 hover:text-primary"
                                                )}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-3 w-3" />
                                                    {city}
                                                </div>
                                                {isComingSoon && (
                                                    <span className="text-[10px] font-normal text-white bg-gray-400 px-2 py-0.5 rounded ml-2">
                                                        Soon
                                                    </span>
                                                )}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            <Link
                                href="/post-property"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center justify-between gap-2 rounded-md bg-secondary/10 px-4 py-3 text-sm font-medium text-secondary-foreground hover:bg-secondary/20 transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    <span>Post Property</span>
                                    <span className="bg-secondary text-white rounded-full px-1.5 py-0.5 text-[10px]">FREE</span>
                                </div>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
