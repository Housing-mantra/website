import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Real Estate Developers in Pune | Trusted Builders",
  description:
    "Explore profiles of Pune's most trusted real estate developers — VTP Realty, Kolte Patil, Godrej Properties, Shapoorji Pallonji & more. Verified track records, RERA registered projects & developer reviews.",
  keywords: [
    "Developers in Pune",
    "Top Builders Pune",
    "VTP Realty",
    "Kolte Patil",
    "Godrej Properties Pune",
    "Trusted Builders PCMC",
    "Real Estate Developers Pune",
  ],
  openGraph: {
    title: "Trusted Real Estate Developers in Pune | Housing Mantra",
    description:
      "Browse 50+ verified developer profiles with project portfolios, experience & track records.",
    url: "https://www.housingmantra.in/developers",
  },
};

export default function DevelopersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
