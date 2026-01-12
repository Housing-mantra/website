
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PROJECTS } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const project = PROJECTS.find((p) => p.id === id);

    if (!project) {
        return {
            title: "Project Not Found",
            description: "The requested project could not be found.",
        };
    }

    return {
        title: project.title,
        description: project.description.substring(0, 160),
        openGraph: {
            title: `${project.title} - ${project.location}`,
            description: project.description.substring(0, 160),
            images: [
                {
                    url: project.image,
                    width: 1200,
                    height: 630,
                    alt: project.title,
                }
            ],
        },
    };
}

export async function generateStaticParams() {
    return PROJECTS.map((project) => ({
        id: project.id,
    }));
}

export default async function ProjectDetails({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const project = PROJECTS.find((p) => p.id === id);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen font-sans bg-gray-50 pt-16">
            <Navbar />

            {/* Hero Section */}
            <div className="relative h-[60vh] w-full">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex flex-col justify-end pb-12">
                    <div className="container mx-auto px-4 text-white">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" /> Back to Projects
                        </Link>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold mb-3 inline-block">
                                    {project.status}
                                </span>
                                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                                    {project.title}
                                </h1>
                                <div className="flex items-center gap-2 text-lg text-gray-200">
                                    <MapPin className="h-5 w-5" />
                                    {project.location}
                                </div>
                            </div>
                            <div className="flex flex-col items-start md:items-end">
                                <span className="text-gray-200 text-sm">Starting from</span>
                                <span className="text-3xl md:text-4xl font-bold text-primary">
                                    {project.price}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">Overview</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {project.description}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <span className="block text-gray-500 text-sm mb-1">Project Type</span>
                                    <span className="font-semibold text-gray-800">{project.type}</span>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <span className="block text-gray-500 text-sm mb-1">Location</span>
                                    <span className="font-semibold text-gray-800">{project.location}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">Amenities & Features</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {project.features.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-primary" />
                                        <span className="text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">Project Gallery</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {project.gallery.map((img, index) => (
                                    <div key={index} className="relative h-64 rounded-lg overflow-hidden group">
                                        <Image
                                            src={img}
                                            alt={`Gallery ${index + 1}`}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-24">
                            <h3 className="text-xl font-bold mb-4 text-gray-800">Interested in this project?</h3>
                            <p className="text-gray-600 mb-6 text-sm">
                                Fill out the form below and our team will get back to you with the brochure and pricing details.
                            </p>

                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <button type="button" className="w-full bg-primary text-white py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors">
                                    Request Details
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
