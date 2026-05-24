"use client";

import Link from "next/link";
import { Menu, User, X, MapPin, ChevronDown, Building2, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const LOCATIONS = ["Pune", "Mumbai", "Bangalore"];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState("Pune");
    const pathname = usePathname();

    const [user, setUser] = useState<any>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Profile Edit State Variables
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [profileError, setProfileError] = useState("");
    const [profileSuccess, setProfileSuccess] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/auth/me");
                const data = await res.json();
                if (data.success && data.user) {
                    setUser(data.user);
                }
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        };
        fetchUser();
    }, []);

    const isTransparent = pathname === "/" && !isScrolled && !isMobileMenuOpen;

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

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setProfileError("");
        setProfileSuccess("");

        if (!editName.trim()) {
            setProfileError("Name is required.");
            return;
        }
        if (!editEmail.trim()) {
            setProfileError("Email address is required.");
            return;
        }

        setIsSaving(true);
        try {
            const res = await fetch("/api/user/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: editName.trim(), email: editEmail.trim() }),
            });
            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.message || "Failed to update profile.");
            }

            setUser(data.user);
            setProfileSuccess("Profile updated successfully!");
            setTimeout(() => {
                setIsProfileModalOpen(false);
            }, 1200);
        } catch (err: any) {
            setProfileError(err?.message || "Failed to save updates.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <nav
            className={cn(
                "fixed top-0 z-50 w-full transition-all duration-300",
                isTransparent ? "bg-transparent" : "bg-white shadow-sm"
            )}
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                        <span className={cn(
                            "text-2xl font-bold transition-colors",
                            isTransparent ? "text-white" : "text-primary"
                        )}>
                            Housing Mantra
                        </span>
                    </Link>

                    {/* Desktop Location Dropdown */}
                    <div className="hidden md:block relative">
                        <button
                            onClick={() => setIsLocationOpen(!isLocationOpen)}
                            className={cn(
                                "flex items-center gap-1 text-sm font-medium transition-colors outline-none",
                                isTransparent
                                    ? "text-white/90 hover:text-white"
                                    : "text-gray-600 hover:text-primary"
                            )}
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
                                    className="absolute top-full left-0 mt-4 w-48 rounded-[5px] bg-white p-2 shadow-sm ring-1 ring-black/5 z-50"
                                >
                                    <div className="flex flex-col gap-1">
                                        {LOCATIONS.map((city) => {
                                            const isComingSoon = city === "Mumbai" || city === "Bangalore";
                                            return (
                                                <Link
                                                    key={city}
                                                    href={isComingSoon ? "#" : `/projects-in-${city.toLowerCase()}`}
                                                    onClick={(e) => {
                                                        if (isComingSoon) {
                                                            e.preventDefault();
                                                            return;
                                                        }
                                                        setSelectedCity(city);
                                                        setIsLocationOpen(false);
                                                    }}
                                                    className={cn(
                                                        "rounded-[5px] px-3 py-2 text-sm transition-colors text-left flex items-center justify-between group",
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

                    {/* Desktop Menu Links */}
                    <div className="hidden md:flex items-center gap-6 border-l border-gray-200 pl-6 ml-2">
                        <Link 
                            href="/developers" 
                            className={cn(
                                "text-sm font-semibold transition-colors uppercase tracking-wider",
                                isTransparent ? "text-white/90 hover:text-white" : "text-gray-600 hover:text-primary"
                            )}
                        >
                            Developers
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/post-property" className={cn(
                        "hidden md:flex items-center gap-2 rounded-[5px] px-4 py-2 text-sm font-medium transition-colors",
                        isTransparent
                            ? "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                            : "bg-secondary/10 text-secondary-foreground hover:bg-secondary/20 shadow-sm"
                    )}>
                        <span className="bg-secondary text-white rounded-full p-0.5 text-xs">FREE</span>
                        Post Property
                    </Link>
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className={cn(
                                    "flex items-center gap-2 rounded-[5px] border text-sm font-medium transition-colors p-2 md:px-4 md:py-2",
                                    isTransparent
                                        ? "border-white/30 text-white hover:bg-white/10"
                                        : "border-gray-200 text-gray-900 hover:bg-gray-50"
                                )}
                            >
                                <User className="h-4 w-4" />
                                <span className="hidden md:inline truncate max-w-[100px]">Hi, {user.name.split(' ')[0]}</span>
                            </button>
                            
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 rounded-[5px] bg-white p-2 shadow-md ring-1 ring-black/5 z-50 text-gray-700">
                                    {user.role === 'ADMIN' && (
                                        <a
                                            href={
                                                typeof window !== 'undefined' && 
                                                (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
                                                    ? "http://admin.localhost:3000"
                                                    : "https://admin.housingmantra.in"
                                            }
                                            className="block rounded-[5px] px-3 py-2 text-sm hover:bg-gray-50 hover:text-primary font-medium border-b border-gray-100"
                                        >
                                            Admin Panel
                                        </a>
                                    )}
                                    <Link
                                        href="/bookmarks"
                                        onClick={() => setIsDropdownOpen(false)}
                                        className="block rounded-[5px] px-3 py-2 text-sm hover:bg-gray-50 hover:text-primary"
                                    >
                                        My Bookmarks
                                    </Link>
                                    <Link
                                        href="/history"
                                        onClick={() => setIsDropdownOpen(false)}
                                        className="block rounded-[5px] px-3 py-2 text-sm hover:bg-gray-50 hover:text-primary"
                                    >
                                        Browse History
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsDropdownOpen(false);
                                            setEditName(user.name || "");
                                            setEditEmail(user.email || "");
                                            setProfileError("");
                                            setProfileSuccess("");
                                            setIsProfileModalOpen(true);
                                        }}
                                        className="w-full text-left block rounded-[5px] px-3 py-2 text-sm hover:bg-gray-50 hover:text-primary"
                                    >
                                        Edit Profile
                                    </button>
                                    <hr className="my-1 border-gray-100" />
                                    <button
                                        onClick={async () => {
                                            setIsDropdownOpen(false);
                                            await fetch('/api/auth/logout', { method: 'POST' });
                                            window.location.reload();
                                        }}
                                        className="w-full text-left rounded-[5px] px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className={cn(
                                "flex items-center gap-2 rounded-[5px] border text-sm font-medium transition-colors p-2 md:px-4 md:py-2",
                                isTransparent
                                    ? "border-white/30 text-white hover:bg-white/10"
                                    : "border-gray-200 text-gray-900 hover:bg-gray-50"
                            )}
                        >
                            <User className="h-4 w-4" />
                            <span className="hidden md:inline">Login</span>
                        </Link>
                    )}
                    <button
                        className={cn(
                            "md:hidden p-2",
                            isTransparent ? "text-white" : "text-gray-900"
                        )}
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
                                                href={isComingSoon ? "#" : `/projects-in-${city.toLowerCase()}`}
                                                onClick={(e) => {
                                                    if (isComingSoon) {
                                                        e.preventDefault();
                                                        return;
                                                    }
                                                    setSelectedCity(city);
                                                    setIsMobileMenuOpen(false);
                                                }}
                                                className={cn(
                                                    "flex items-center justify-between gap-2 rounded-[5px] border p-2 text-sm font-medium transition-colors",
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
                                className="flex items-center justify-between gap-2 rounded-[5px] bg-secondary/10 px-4 py-3 text-sm font-medium text-secondary-foreground hover:bg-secondary/20 transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    <span>Post Property</span>
                                    <span className="bg-secondary text-white rounded-full px-1.5 py-0.5 text-[10px]">FREE</span>
                                </div>
                            </Link>

                            <Link
                                href="/developers"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center justify-between gap-2 rounded-[5px] border border-gray-100 bg-gray-50/50 px-4 py-3 text-sm font-medium text-gray-700 hover:border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    <Building2 className="h-4 w-4 text-amber-500" />
                                    <span>Browse Developers</span>
                                </div>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Profile Edit Modal */}
            <AnimatePresence>
                {isProfileModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        {/* Overlay with blur effect */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => !isSaving && setIsProfileModalOpen(false)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />

                        {/* Modal container with strict 5px rounded corners */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 15 }}
                            transition={{ type: "spring", duration: 0.4 }}
                            className="relative w-full max-w-[420px] bg-white rounded-[5px] shadow-2xl border border-gray-100 z-10 overflow-hidden text-gray-900"
                        >
                            {/* Decorative Brand Purple Header Strip */}
                            <div className="bg-primary/5 px-6 py-4.5 border-b border-gray-100 flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Edit Profile</h3>
                                    <p className="text-xs text-gray-500 font-medium">Update your account information</p>
                                </div>
                                <button
                                    type="button"
                                    disabled={isSaving}
                                    onClick={() => setIsProfileModalOpen(false)}
                                    className="p-1.5 rounded-full hover:bg-gray-200/65 text-gray-400 hover:text-gray-700 transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <form onSubmit={handleUpdateProfile} className="p-6 space-y-4">
                                {profileError && (
                                    <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs font-semibold rounded-[5px] text-center">
                                        {profileError}
                                    </div>
                                )}
                                {profileSuccess && (
                                    <div className="p-3 bg-green-50 border border-green-100 text-green-600 text-xs font-semibold rounded-[5px] text-center">
                                        {profileSuccess}
                                    </div>
                                )}

                                {/* Outlined Name input field (rounded-[5px]) */}
                                <div className="space-y-1.5">
                                    <label htmlFor="modal-name" className="text-xs font-bold text-gray-500 uppercase tracking-wide">Full Name</label>
                                    <div className="flex items-center border border-gray-300 rounded-[5px] px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all bg-white">
                                        <User className="h-4.5 w-4.5 text-gray-400 mr-2.5" />
                                        <input
                                            id="modal-name"
                                            type="text"
                                            required
                                            disabled={isSaving}
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                            className="block w-full bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none text-sm font-semibold"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                </div>

                                {/* Outlined Email input field (rounded-[5px]) */}
                                <div className="space-y-1.5">
                                    <label htmlFor="modal-email" className="text-xs font-bold text-gray-500 uppercase tracking-wide">Email Address</label>
                                    <div className="flex items-center border border-gray-300 rounded-[5px] px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all bg-white">
                                        <span className="text-sm font-semibold text-gray-400 pr-2.5 border-r border-gray-200 mr-2.5">Email</span>
                                        <input
                                            id="modal-email"
                                            type="email"
                                            required
                                            disabled={isSaving}
                                            value={editEmail}
                                            onChange={(e) => setEditEmail(e.target.value)}
                                            className="block w-full bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none text-sm font-semibold"
                                            placeholder="Enter your email address"
                                        />
                                    </div>
                                </div>

                                {/* Submit and Action buttons (rounded-[5px]) */}
                                <div className="flex items-center gap-3 pt-3">
                                    <button
                                        type="button"
                                        disabled={isSaving}
                                        onClick={() => setIsProfileModalOpen(false)}
                                        className="flex-1 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:bg-gray-50 text-sm font-bold rounded-[5px] transition-all cursor-pointer text-center"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="flex-1 py-2.5 bg-primary hover:bg-primary/95 disabled:bg-primary/50 text-white text-sm font-bold rounded-[5px] transition-all cursor-pointer flex items-center justify-center shadow-md shadow-primary/10"
                                    >
                                        {isSaving ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            "Save Updates"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </nav>
    );
}
