import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Building2, 
  Target, 
  Compass, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  Clock, 
  Users2 
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Housing Mantra",
  description: "Learn more about Pune's leading PropTech real estate platform. We specialize in verified, direct-builder residential and commercial listings in Moshi, Charholi, and PCMC.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50/50 pt-16 font-sans">
      <Navbar />

      {/* Premium Hero Banner */}
      <div className="relative bg-gradient-to-r from-[#2F0D5E] via-[#6c1cdc] to-[#1A0636] text-white py-20 overflow-hidden shadow-inner">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(246,212,12,0.1),transparent_40%)]" />
        <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-4 bg-white/10 px-4 py-1.5 rounded-full border border-white/15">
            <Building2 className="h-4 w-4 text-secondary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              OUR IDENTITY
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-none mb-4">
            Redefining Pune's <br className="hidden md:inline" /> PropTech Experience
          </h1>
          <p className="text-gray-300 max-w-2xl text-sm md:text-base font-medium leading-relaxed">
            Housing Mantra is Pune's premium real-estate search portal, dedicated to connecting home buyers directly with verified, top-tier builders in PCMC, Moshi, Charholi, and Pune West.
          </p>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <section className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="bg-white p-8 md:p-10 rounded-[5px] border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-primary" />
            <div className="h-12 w-12 bg-primary/10 rounded-[5px] flex items-center justify-center mb-6">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-950 uppercase tracking-tight mb-4">
              Our Mission
            </h3>
            <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-medium">
              To eliminate the complexities and hidden commission overheads in property search. We empower home-seekers by providing comprehensive, structured database search files, genuine developer credentials, and RERA compliance data so they can buy their home with absolute confidence and 100% peace of mind.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white p-8 md:p-10 rounded-[5px] border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-secondary" />
            <div className="h-12 w-12 bg-secondary/10 rounded-[5px] flex items-center justify-center mb-6">
              <Compass className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-950 uppercase tracking-tight mb-4">
              Our Vision
            </h3>
            <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-medium">
              To become Pune's undisputed number-one digital destination for all residential and commercial real-estate transactions. We aim to leverage state-of-the-art Web technology, premium interactive layouts, and custom artificial intelligence capabilities (like our **Mantra AI Agent**) to guide families in finding their perfect flats.
            </p>
          </div>
        </div>
      </section>

      {/* Core Narrative / Story */}
      <section className="bg-white border-y border-gray-100 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-6 text-center md:text-left">
            <div className="text-center">
              <span className="text-primary text-[10px] font-extrabold uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
                GENESIS STORY
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-gray-950 mt-3 mb-6">
                The Housing Mantra Journey
              </h2>
            </div>
            
            <p className="text-sm text-gray-600 leading-relaxed font-medium">
              Housing Mantra was founded in Pune with a simple, disruptive idea: **real estate search should be transparent, straightforward, and direct.** For years, home buyers have struggled to navigate inflated price quotations, unverified configurations, and heavy broker commissions.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed font-medium">
              We set out to change that by constructing a robust PropTech web system. By working **directly with verified builders** (including prestigious developers like Shaligram Group, Sankalp Developers, Saiananta, and Shakuntal Group), we ensure that our users get direct, bottom-line developer prices with zero hidden charges. 
            </p>
            <p className="text-sm text-gray-600 leading-relaxed font-medium">
              Every listing on our platform goes through a strict verification standard, confirming its **MahaRERA ID, possession timeline, floor-plans, and structural quality**.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Pillars */}
      <section className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-primary text-[10px] font-extrabold uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
            OUR CORE PILLARS
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-gray-950 mt-3 mb-2">
            Why Pune Prefers Us
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            We hold ourselves to the highest standards of reliability, transparency, and advanced product technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <ShieldCheck className="h-6 w-6 text-secondary" />,
              title: "100% MahaRERA Verified",
              desc: "We showcase exact, genuine MahaRERA numbers and layout approvals. No false promises, no misleading launch advertisements."
            },
            {
              icon: <Sparkles className="h-6 w-6 text-secondary" />,
              title: "AI-Powered Navigation",
              desc: "Our next-generation Mantra AI Agent provides real-time chat guidance, matching project price listings automatically based on your requirements."
            },
            {
              icon: <Users2 className="h-6 w-6 text-secondary" />,
              title: "0% Brokerage Burden",
              desc: "Connecting you directly with corporate builder sales teams. Pay absolute direct prices with zero middle-man broker fee commission."
            }
          ].map((pillar, i) => (
            <div key={i} className="bg-white p-8 rounded-[5px] border border-gray-100 shadow-sm flex flex-col items-center md:items-start text-center md:text-left hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-primary rounded-[5px] flex items-center justify-center mb-5 shadow-md shadow-primary/10">
                {pillar.icon}
              </div>
              <h3 className="font-extrabold text-gray-950 uppercase tracking-tight text-base mb-2">
                {pillar.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
