"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/lib/data";

export function FeaturedProjects() {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Featured Projects</h2>
                        <p className="text-gray-600">Handpicked projects for you based on popularity.</p>
                    </div>
                    <button className="hidden md:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                        View All Projects <ArrowRight className="h-5 w-5" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {PROJECTS.map((project, index) => (
                        <Link href={`/projects/${project.id}`} key={project.id} className="block">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group cursor-pointer rounded-md border border-gray-100 bg-white custom-shadow transition-all duration-300 overflow-hidden h-full"
                            >
                                <div className="relative h-48 w-full overflow-hidden">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 left-3 bg-secondary text-black text-xs font-bold px-3 py-1 rounded-full uppercase">
                                        {project.status}
                                    </div>
                                </div>

                                <div className="p-5">
                                    <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">{project.title}</h3>
                                    <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                                        <MapPin className="h-4 w-4" />
                                        {project.location}
                                    </div>
                                    <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                                        <div>
                                            <p className="text-xs text-gray-500">Starting from</p>
                                            <p className="font-bold text-lg text-primary">{project.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                <button className="mt-8 md:hidden w-full flex items-center justify-center gap-2 text-primary font-semibold hover:bg-gray-50 p-3 rounded-md border border-gray-100 custom-shadow">
                    View All Projects <ArrowRight className="h-5 w-5" />
                </button>
            </div>
        </section>
    );
}
