import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at Housing Mantra | Join Pune's #1 PropTech Team",
  description:
    "Explore open positions at Housing Mantra — Sales Consultants, Full-Stack Developers, Digital Marketing roles. Build the future of real estate in Pune.",
  keywords: [
    "Housing Mantra Careers",
    "Real Estate Jobs Pune",
    "PropTech Jobs",
    "Sales Jobs Pune",
    "Next.js Developer Jobs",
  ],
  openGraph: {
    title: "Join Housing Mantra — We're Hiring!",
    description:
      "Explore career opportunities in sales, technology, and marketing at Pune's leading PropTech platform.",
    url: "https://www.housingmantra.in/careers",
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
