import { ShieldCheck, Video, Tag, Briefcase } from "lucide-react";

const SERVICES = [
    {
        icon: ShieldCheck,
        title: "100% Verified Listings",
        description: "Every property is visited and verified by our experts.",
    },
    {
        icon: Video,
        title: "Virtual Tours",
        description: "Explore homes from the comfort of your couch with 3D tours.",
    },
    {
        icon: Tag,
        title: "Lowest Price Guarantee",
        description: "We negotiate the best prices for you, guaranteed.",
    },
    {
        icon: Briefcase,
        title: "Legal Assistance",
        description: "Expert legal help for hassle-free documentation.",
    },
];

export function ServiceHighlights() {
    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Why Choose Housing Mantra?</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We provide a complete ecosystem for your real estate needs, ensuring trust, transparency, and convenience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {SERVICES.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={index}
                                className="group flex flex-col items-center text-center p-6 bg-white rounded-md custom-shadow hover:-translate-y-1 transition-all duration-300 border border-gray-100"
                            >
                                <div className="mb-6 p-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    <Icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-gray-900">{service.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
