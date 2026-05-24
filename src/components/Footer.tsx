import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-footer text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div>
                        <div className="mb-6 flex items-center gap-3 select-none">
                            {/* Beautiful sharp icon */}
                            <svg className="h-10 w-10 shrink-0" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="40" cy="40" r="36" fill="none" stroke="#ffffff" strokeWidth="2.5" />
                                <circle cx="40" cy="40" r="30.5" fill="none" stroke="#ffffff" strokeWidth="1.2" />
                                <path d="M40 22 L22 36 L24 55 L56 55 L58 36 Z" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinejoin="round" />
                                <path d="M40 33 L30 42 L30 55 L50 55 L50 42 Z" fill="#ef4444" />
                            </svg>
                            
                            {/* Brand Text Column */}
                            <div className="flex flex-col items-start leading-none gap-1">
                                <span className="text-[22px] font-oswald font-black text-white tracking-tight flex items-start gap-0.5 leading-none">
                                    HOUSING MANTRA
                                    <span className="text-[8px] font-sans font-extrabold text-white select-none mt-0.5">TM</span>
                                </span>
                                <span className="bg-white text-gray-900 text-[9px] font-sans font-black uppercase tracking-wider px-2 py-0.5 rounded-[2px] text-center whitespace-nowrap">
                                    Everything About Real-Estate
                                </span>
                            </div>
                        </div>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            India&apos;s most trusted real estate platform. We help you find the perfect home with transparency and ease.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-white/10 rounded-[5px] hover:bg-primary transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="p-2 bg-white/10 rounded-[5px] hover:bg-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="p-2 bg-white/10 rounded-[5px] hover:bg-primary transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="p-2 bg-white/10 rounded-[5px] hover:bg-primary transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/blogs" className="hover:text-primary transition-colors">Real Estate Blog</Link></li>
                        </ul>
                    </div>

                    {/* Properties */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Properties</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li><Link href="/buy" className="hover:text-primary transition-colors">Buy Property</Link></li>
                            <li><Link href="/rent" className="hover:text-primary transition-colors">Rent Property</Link></li>
                            <li><Link href="/commercial" className="hover:text-primary transition-colors">Commercial</Link></li>
                            <li><Link href="/new-projects" className="hover:text-primary transition-colors">New Projects</Link></li>
                            <li><Link href="/plots" className="hover:text-primary transition-colors">Plots / Land</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 mt-1 shrink-0" />
                                <span>123, Tech Park, Sector 5<br />Gurgaon, Haryana - 122001</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 shrink-0" />
                                <span>+91 99999 00000</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 shrink-0" />
                                <span>support@housingmantra.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
                    <p>© {new Date().getFullYear()} Housing Mantra. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
