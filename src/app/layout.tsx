import type { Metadata } from "next";
import { Rubik, Oswald } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://housingmantra.in'),
  title: {
    default: "Find Your Perfect Home in Pune | Housing Mantra",
    template: "%s | Housing Mantra"
  },
  description: "Find your dream home with Housing Mantra. Explore verified residential and commercial properties in Pune, PCMC, Moshi, Charholi, and more. Direct from owners, 100% transparent and reliable real estate services.",
  keywords: [
    "Real Estate Pune", 
    "Flats in PCMC", 
    "2 BHK in Moshi", 
    "3 BHK in Charholi", 
    "Housing Mantra", 
    "Property in Pune", 
    "Commercial Spaces Pune", 
    "Real Estate Agent Pune",
    "New Projects in Pune",
    "Affordable Housing Pune",
    "Luxury Apartments Pune"
  ],
  authors: [{ name: "Housing Mantra" }],
  creator: "Housing Mantra",
  publisher: "Housing Mantra",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://housingmantra.in",
    title: "Find Your Perfect Home in Pune | Housing Mantra",
    description: "Discover verified residential and commercial properties in Pune and PCMC. Luxury apartments, affordable homes, and premium commercial spaces.",
    siteName: "Housing Mantra",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Housing Mantra - Real Estate Pune",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Your Perfect Home in Pune | Housing Mantra",
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
  verification: {
    google: "GkMTJb_H-KisnK4eOR1yKDoQN-c3H43u9Ua5Qvxc1Xg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${rubik.variable} ${oswald.variable} antialiased font-rubik`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Housing Mantra",
              "image": "https://housingmantra.in/logo.png",
              "@id": "https://housingmantra.in",
              "url": "https://housingmantra.in",
              "telephone": "+91 9172605307",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Moshi",
                "addressLocality": "Pune",
                "postalCode": "412105",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 18.6672,
                "longitude": 73.8741
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "09:00",
                "closes": "21:00"
              },
              "sameAs": [
                "https://www.facebook.com/housingmantra",
                "https://www.instagram.com/housingmantra",
                "https://www.linkedin.com/company/housingmantra"
              ]
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
