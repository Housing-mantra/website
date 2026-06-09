import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ServiceHighlights } from "@/components/ServiceHighlights";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { CityExplorer } from "@/components/CityExplorer";
import { TrustedDevelopers } from "@/components/TrustedDevelopers";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen font-sans">
      <Navbar />
      <Hero />
      <FeaturedProjects />
      <CityExplorer />
      <TrustedDevelopers />
      <ServiceHighlights />
      
      {/* SEO Content Section to Resolve Thin Content */}
      <section className="bg-slate-50 py-16 px-4 md:px-8 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 font-serif">Your Trusted Real Estate Partner in Pune & PCMC</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Welcome to Housing Mantra, Pune's premier digital real estate platform. We specialize in connecting home buyers, investors, and developers with verified properties. Whether you are looking for a premium 2 BHK apartment in Moshi, a spacious 3 BHK river-facing residence in Dudulgaon, or commercial shops in high-footfall areas of PCMC, Housing Mantra provides a comprehensive, transparent, and hassle-free experience.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            Our team curates exclusive listings from leading real estate developers in Pune, including Landmark Group, Mangalam Projects, and Shaligram Group. Every project featured on our portal comes with verified RERA registration details, pricing charts, carpet area breakdowns, layout designs, and real-time possession timelines. By working directly with developers and verified owners, we ensure a zero-brokerage model for new projects, passing the maximum value directly to our clients.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Why Choose Housing Mantra?</h3>
              <ul className="space-y-2 text-slate-600 list-disc list-inside">
                <li><strong>100% Verified Properties:</strong> Every home listing is cross-checked against RERA standards.</li>
                <li><strong>Direct-from-Builder Pricing:</strong> Get access to exclusive pre-launch offers, smart payment plans, and lowest price guarantees.</li>
                <li><strong>Comprehensive Local Expertise:</strong> Deep insight into rapidly expanding Pune suburbs like Charholi Budruk, Wadmukhwadi, Ravet, Moshi, and Chikhali.</li>
                <li><strong>Virtual Tours & Site Visits:</strong> Seamlessly book physical site visits with dedicated relationship managers.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Rapid Growth Suburbs in Pune</h3>
              <p className="text-slate-600 leading-relaxed mb-3">
                Key suburbs include Charholi Budruk, which has emerged as Pune's smartest township destination, offering excellent connectivity to Lohegaon airport and the IT hubs of Hinjewadi and Yerwada. Dudulgaon on the Dehu-Alandi road is experiencing high demand for river-view properties. Similarly, Chikhali and Moshi continue to attract industrial professionals seeking affordable premium housing solutions.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Start your search today with Housing Mantra and find the perfect home that fits your budget and lifestyle.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
