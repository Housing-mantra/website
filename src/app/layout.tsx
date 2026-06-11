import type { Metadata } from "next";
import { Rubik, Oswald } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { MantraAiAgent } from "@/components/MantraAiAgent";

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
  metadataBase: new URL('https://www.housingmantra.in'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: "Find Your Perfect Home in Pune & PCMC | Housing Mantra",
    template: "%s | Housing Mantra"
  },
  description: "Find your dream home with Housing Mantra. Explore verified residential & commercial properties in Pune and PCMC. 100% transparent and reliable real estate.",
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
    url: "https://www.housingmantra.in",
    title: "Find Your Perfect Home in Pune & PCMC | Housing Mantra",
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
    title: "Find Your Perfect Home in Pune & PCMC | Housing Mantra",
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
  },
  other: {
    "geo.region": "IN-MH",
    "geo.placename": "Pune, Maharashtra",
    "geo.position": "18.5992;73.7634",
    "ICBM": "18.5992, 73.7634",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtag/js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TWMGNJQN');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body
        className={`${rubik.variable} ${oswald.variable} antialiased font-sans`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TWMGNJQN"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Housing Mantra",
              "image": "https://www.housingmantra.in/logo.png",
              "@id": "https://www.housingmantra.in",
              "url": "https://www.housingmantra.in",
              "telephone": "+91 78880 41188",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Office No - C-103, Wisteriaa Fortune, Bhumkar Das Gugre Rd, Bhagwan Nagar, Bhumkar Nagar, Wakad",
                "addressLocality": "Pimpri-Chinchwad, Pune",
                "addressRegion": "Maharashtra",
                "postalCode": "411033",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 18.5992,
                "longitude": 73.7634
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
                "https://www.instagram.com/housingmantrapune",
                "https://www.linkedin.com/company/housingmantra",
                "https://www.youtube.com/@housingmantra"
              ]
            })
          }}
        />
        {children}
        <MantraAiAgent />
      </body>
    </html>
  );
}
