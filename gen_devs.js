
const names = [
    "VTP Realty", "Sobha Realty", "Rohan Builders", "Mahindra Lifespaces", "Saheel Properties", 
    "Gera Developers", "Hiranandani Developers", "Adani Realty", "Ashwariyam Group", 
    "Nageshwar Developers", "Vilas Javdekar Developers", "SSD Group", "Shapoorji Pallonji", 
    "Kolte Patil", "Tata Housing", "Yeashda Realty Pune", "Chourang Ventures Pune", 
    "Pride Group", "Nivasa Group", "SD Group", "Nexus Group", "Goel Ganga Corporation", 
    "Pride Purple Group", "Gini Construction", "Kamalraj group Pune", "Kohinoor Group", 
    "Pristine Properties", "Platinum Realty Group", "Tanisq Builders", "Landmark Township Pune", 
    "Sankalp Group", "Amarnath Group pune", "Kuldeep Group Pune", "Aakar Realty Pune", 
    "Lotus Group pune", "Vision Creative Group Pune", "Shakuntal Group Pune", 
    "Mangalam Landmarks", "SB Patil Group", "Nyati", "Mantra Properties", "Nirman Groups", 
    "Clover Builders", "Sukhmani Construction", "Naikhware Construction", "SR Kulkarni Developers", 
    "Parth Developers", "Siddesh Developers", "Raviraj Realty", "Oree Realty", 
    "Paranjape Schemes", "Badhekar Group", "Royal", "Rahul Construction", 
    "Yash Promotors & Builder", "Tanishq Group", "Majestique Landmark", "Malpani Group", 
    "Kumar Properties", "Dhandeep Developers", "Sudhir Mandke Group", "Kumar Builders", 
    "Matoshree Developers", "Nirmriti Developers", "Saarthi Group", "Gokhale Constructions", 
    "Kunal Group", "Ranjeet Developers", "Ashapuri Developers", "Mahalaxmi Group", 
    "Ansul Group", "Unique Properties", "Abhinav Group"
];

const domains = {
    "VTP Realty": "vtprealty.in",
    "Sobha Realty": "sobha.com",
    "Mahindra Lifespaces": "mahindralifespaces.com",
    "Gera Developers": "gera.in",
    "Kolte Patil": "koltepatil.com",
    "Tata Housing": "tatahousing.in",
    "Nyati": "nyatigroup.com",
    "Kumar Properties": "kumarproperties.com",
    "Kohinoor Group": "kohinoorgroup.co.in",
    "Rohan Builders": "rohanbuilders.com",
    "Pride Group": "pridegroup.net",
    "Vilas Javdekar Developers": "vilasjavdekar.com",
    "Paranjape Schemes": "paranjape.com",
    "Shapoorji Pallonji": "shapoorjipallonji.com",
    "Goel Ganga Corporation": "goelganga.com",
    "Adani Realty": "adanirealty.com",
    "Hiranandani Developers": "hiranandani.com",
    "Puranik Builders": "puranikbuilders.com",
    "Nagpal Group": "nagpalgroup.com",
    "Godrej Properties": "godrejproperties.com",
    "Lodha Group": "lodhagroup.in",
    "Mantra Properties": "mantraproperties.com"
};

const colors = [
    "bg-red-100 text-red-600", "bg-blue-100 text-blue-600", "bg-green-100 text-green-600",
    "bg-yellow-100 text-yellow-600", "bg-purple-100 text-purple-600", "bg-pink-100 text-pink-600",
    "bg-indigo-100 text-indigo-600", "bg-teal-100 text-teal-600", "bg-orange-100 text-orange-600",
    "bg-cyan-100 text-cyan-600"
];

const developers = names.map((name, index) => {
    const id = name.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
    const domain = domains[name];
    const logo = domain ? `https://logo.clearbit.com/${domain}` : null;
    const initials = name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
    const color = colors[index % colors.length];

    return {
        id,
        name,
        projectsCount: (20 + (index % 50)) + "+ Projects",
        initials,
        logo,
        color,
        description: `${name} is a premier real estate developer committed to excellence and quality in every project. With a focus on customer satisfaction and innovative design, they have established themselves as a trusted name in the industry.`,
        experience: (10 + (index % 30)) + " Years",
        projectsDelivered: (20 + (index % 50)) + "+",
        ongoingProjects: (5 + (index % 15)) + "",
        about: `${name} has been at the forefront of the real estate development, bringing innovation and sustainability to the industry. Their commitment to superior construction quality and timely delivery has earned them numerous accolades.`,
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
    };
});

// Godrej, Lodha, Runwal manually
const baseDevs = [
    {
        id: "godrej-properties",
        name: "Godrej Properties",
        projectsCount: "31+ Projects",
        initials: "GP",
        logo: "https://logo.clearbit.com/godrejproperties.com",
        color: "bg-blue-100 text-blue-600",
        description: "Godrej Properties brings the Godrej Group philosophy of innovation, sustainability, and excellence to the real estate industry.",
        experience: "33 Years",
        projectsDelivered: "80+",
        ongoingProjects: "25",
        about: "Established in 1990, Godrej Properties Limited is a real estate company with its head office in Mumbai, India.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
    },
    {
        id: "lodha-group",
        name: "Lodha Group",
        projectsCount: "44+ Projects",
        initials: "LG",
        logo: "https://logo.clearbit.com/lodhagroup.in",
        color: "bg-yellow-100 text-yellow-600",
        description: "Lodha Group is among the largest real estate developers in India.",
        experience: "43 Years",
        projectsDelivered: "100+",
        ongoingProjects: "30",
        about: "Founded in 1980 by Mangal Lodha, the Lodha Group is India's No. 1 real estate developer by residential sales.",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop"
    },
    {
        id: "runwal-group",
        name: "Runwal",
        projectsCount: "21+ Projects",
        initials: "R",
        logo: "https://logo.clearbit.com/runwal.com",
        color: "bg-red-100 text-red-600",
        description: "Runwal Group is a known real estate brand in Mumbai and Pune.",
        experience: "45 Years",
        projectsDelivered: "50+",
        ongoingProjects: "10",
        about: "Established in 1978, Runwal Developers is one of Mumbai’s premier real estate developers.",
        image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=2000&auto=format&fit=crop"
    }
];

const allDevs = [...baseDevs, ...developers];
console.log(JSON.stringify(allDevs, null, 4));
