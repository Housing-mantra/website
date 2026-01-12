import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://housingmantra.in'),
  title: {
    default: "Housing Mantra - Premium Real Estate in Pune & PCMC",
    template: "%s | Housing Mantra"
  },
  description: "Find your dream home with Housing Mantra. Explore verified resdential and commercial properties in Pune, PCMC, Moshi, Charholi, and more. Direct from owners, 100% transparent.",
  keywords: ["Real Estate Pune", "Flats in PCMC", "2 BHK in Moshi", "3 BHK in Charholi", "Housing Mantra", "Property in Pune", "Commercial Spaces Pune", "Real Estate Agent"],
  authors: [{ name: "Housing Mantra" }],
  creator: "Housing Mantra",
  publisher: "Housing Mantra",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://housingmantra.in",
    title: "Housing Mantra - Find Your Perfect Home",
    description: "Discover verified properties in Pune and PCMC. Luxury apartments, affordable homes, and commercial spaces.",
    siteName: "Housing Mantra",
    images: [
      {
        url: "/og-image.jpg", // We might need to ensure this image exists or use a generic one
        width: 1200,
        height: 630,
        alt: "Housing Mantra - Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Housing Mantra - Premium Real Estate in Pune",
    description: "Your trusted partner for buying and selling property in Pune and PCMC.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${rubik.variable} antialiased font-rubik`}
      >
        {children}
      </body>
    </html>
  );
}
