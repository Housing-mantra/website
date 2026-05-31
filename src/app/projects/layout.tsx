import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Projects in Pune & PCMC | Flats, Villas, Commercial",
  description:
    "Explore 100+ verified residential & commercial projects in Pune, PCMC, Moshi, Charholi, Ravet & more. Filter by location, price & type. RERA registered listings only.",
  keywords: [
    "Projects in Pune",
    "Flats in PCMC",
    "New Projects Pune 2026",
    "2 BHK Moshi",
    "3 BHK Charholi",
    "Apartments near Hinjewadi",
    "RERA approved projects Pune",
  ],
  openGraph: {
    title: "Browse All Real Estate Projects in Pune | Housing Mantra",
    description:
      "Find your dream home from 100+ premium projects across Pune & PCMC. Verified by Housing Mantra.",
    url: "https://www.housingmantra.in/projects",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
