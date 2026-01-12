"use client";

import Link from "next/link";
import Image from "next/image";

const CITIES = [
    {
        name: "Pimpri",
        properties: "4,500 Properties",
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800&auto=format&fit=crop",
    },
    {
        name: "Chinchwad",
        properties: "3,800 Properties",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop",
    },
    {
        name: "Borhade Wadi",
        properties: "1,200 Properties",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    },
    {
        name: "Akurdi",
        properties: "2,100 Properties",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop",
    },
    {
        name: "Moshi",
        properties: "3,500 Properties",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
    },
    {
        name: "Spine Road",
        properties: "980 Properties",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
    },
    {
        name: "Dudulgoan",
        properties: "560 Properties",
        image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=800&auto=format&fit=crop",
    },
    {
        name: "Charoli",
        properties: "2,300 Properties",
        image: "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?q=80&w=800&auto=format&fit=crop",
    },
    {
        name: "Wadmukhwadi",
        properties: "890 Properties",
        image: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=800&auto=format&fit=crop",
    },
    {
        name: "Dighi",
        properties: "1,750 Properties",
        image: "https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=800&auto=format&fit=crop",
    },
];

export function CityExplorer() {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Explore homes on Housing Mantra</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover homes across India&apos;s most vibrant cities. Each destination offers thousands of verified listings, reviews, and local insights.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {CITIES.map((city) => (
                        <Link
                            href={`/city/${city.name.toLowerCase()}`}
                            key={city.name}
                            className="group relative block h-80 w-full overflow-hidden rounded-md border border-gray-100 custom-shadow"
                        >
                            <Image
                                src={city.image}
                                alt={city.name}
                                fill
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />

                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="text-xl font-bold mb-1">{city.name}</h3>
                                <p className="text-sm font-medium opacity-90">{city.properties}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
