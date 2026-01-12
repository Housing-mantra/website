"use client";



const DEVELOPERS = [
    {
        name: "Godrej Properties",
        projects: "31+ Projects",
        initials: "GP",
        color: "bg-blue-100 text-blue-600",
    },
    {
        name: "Lodha Group",
        projects: "44+ Projects",
        initials: "LG",
        color: "bg-yellow-100 text-yellow-600",
    },
    {
        name: "Runwal",
        projects: "21+ Projects",
        initials: "R",
        color: "bg-red-100 text-red-600",
    },
    {
        name: "Adani Realty",
        projects: "16+ Projects",
        initials: "AR",
        color: "bg-green-100 text-green-600",
    },
    {
        name: "Oberoi Realty",
        projects: "16+ Projects",
        initials: "OR",
        color: "bg-purple-100 text-purple-600",
    },
    {
        name: "Kalpataru",
        projects: "21+ Projects",
        initials: "K",
        color: "bg-indigo-100 text-indigo-600",
    },
    {
        name: "Shapoorji Pallonji",
        projects: "9+ Projects",
        initials: "SP",
        color: "bg-pink-100 text-pink-600",
    },
    {
        name: "Prestige Group",
        projects: "76+ Projects",
        initials: "PG",
        color: "bg-orange-100 text-orange-600",
    },
    {
        name: "Hiranandani Group",
        projects: "15+ Projects",
        initials: "HG",
        color: "bg-teal-100 text-teal-600",
    },
    {
        name: "Rustomjee",
        projects: "24+ Projects",
        initials: "R",
        color: "bg-cyan-100 text-cyan-600",
    },
];

export function TrustedDevelopers() {
    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Trusted Developers in India</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Find projects from India&apos;s most reputable and award-winning builders.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {DEVELOPERS.map((dev, index) => (
                        <div
                            key={index}
                            className="group flex flex-col items-center justify-center p-6 bg-white rounded-md border border-gray-100 custom-shadow hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                        >
                            {/* Logo Placeholder */}
                            <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold ${dev.color}`}>
                                {dev.initials}
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 text-center mb-1">{dev.name}</h3>
                            <p className="text-sm font-medium text-gray-500">{dev.projects}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
