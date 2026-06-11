import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-footer text-white pt-16 pb-24 md:pb-8">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div>
                        <div className="mb-6 flex items-center gap-1.5 select-none">
                            {/* Beautiful sharp icon */}
                            <svg className="h-[38px] w-[38px] md:h-10 md:w-10 shrink-0" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="40" cy="40" r="36" fill="none" stroke="#ffffff" strokeWidth="2.5" />
                                <circle cx="40" cy="40" r="30.5" fill="none" stroke="#ffffff" strokeWidth="1.2" />
                                <path d="M40 22 L22 36 L24 55 L56 55 L58 36 Z" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinejoin="round" />
                                <path d="M40 33 L30 42 L30 55 L50 55 L50 42 Z" fill="#ef4444" />
                            </svg>
                            
                            {/* Brand Text Column */}
                            <div className="flex flex-col items-stretch w-fit leading-none gap-1">
                                <div className="relative">
                                    <span className="text-[22px] font-oswald font-black text-white tracking-tight leading-none whitespace-nowrap">
                                        HOUSING MANTRA
                                    </span>
                                    <span className="text-[7px] font-sans font-extrabold text-white select-none absolute -right-3.5 top-0">TM</span>
                                </div>
                                <div className="w-full bg-white text-gray-900 text-[7.5px] font-sans font-black uppercase tracking-[0.04em] py-0.5 rounded-[1px] text-center whitespace-nowrap">
                                    Everything About Real-Estate
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            India&apos;s most trusted real estate platform. We help you find the perfect home with transparency and ease.
                        </p>
                        <div className="flex gap-4">
                            <a href="javascript:void(0)" className="p-2 bg-white/10 rounded-[5px] hover:bg-primary transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="javascript:void(0)" className="p-2 bg-white/10 rounded-[5px] hover:bg-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="javascript:void(0)" className="p-2 bg-white/10 rounded-[5px] hover:bg-primary transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="javascript:void(0)" className="p-2 bg-white/10 rounded-[5px] hover:bg-primary transition-colors">
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
                    <p>Copyright © {new Date().getFullYear()} Housing Mantra</p>
                </div>
            </div>

            {/* Mobile Sticky Footer Bar */}
            <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#11052C] border-t border-white/10 flex z-[999] shadow-[0_-4px_12px_rgba(0,0,0,0.15)]">
                <a href="tel:+917030390071" className="flex-1 flex items-center justify-center gap-1.5 py-3 font-bold text-[12px] uppercase tracking-wider bg-[#1A0636] text-secondary transition-all active:scale-[0.98]">
                    <Phone className="h-3.5 w-3.5 shrink-0" />
                    Call Sales
                </a>
                <a href="https://wa.me/917030390071?text=Hi,%20I'm%20interested%20in%20Housing%20Mantra%20projects.%20Please%20share%20pricing%20and%20brochures." target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-3 font-bold text-[12px] uppercase tracking-wider bg-[#25d366] text-white transition-all active:scale-[0.98]">
                    <svg className="h-[16px] w-[16px] shrink-0 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/>
                    </svg>
                    WhatsApp
                </a>
            </div>
        </footer>
    );
}
