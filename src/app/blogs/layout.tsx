import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Blog | Home Buying Guides, Investment Tips & RERA Updates",
  description:
    "Read expert real estate articles on home buying in Pune — investment strategies, MahaRERA compliance, home loan guides, infrastructure updates & micro-market analysis by Housing Mantra.",
  keywords: [
    "Real Estate Blog Pune",
    "Home Buying Guide",
    "MahaRERA Guide",
    "Property Investment Tips",
    "Pune Real Estate News",
    "Home Loan Checklist",
  ],
  openGraph: {
    title: "Housing Mantra Blog — Premium Real Estate Insights",
    description:
      "Expert articles on home buying, RERA compliance, and property investment in Pune.",
    url: "https://www.housingmantra.in/blogs",
  },
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
