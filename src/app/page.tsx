import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ServiceHighlights } from "@/components/ServiceHighlights";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { CityExplorer } from "@/components/CityExplorer";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen font-sans pt-16">
      <Navbar />
      <Hero />
      <FeaturedProjects />
      <CityExplorer />
      <ServiceHighlights />
      <Footer />
    </main>
  );
}
