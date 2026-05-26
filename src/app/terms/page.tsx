import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Scale, CheckCircle2, ShieldAlert, FileText } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Housing Mantra",
  description: "Read the official Terms of Service and Conditions for using the Housing Mantra real estate platform.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen font-sans bg-gray-50/50 pt-16">
      <Navbar />

      {/* Premium Hero Banner */}
      <div className="relative bg-gradient-to-r from-[#2F0D5E] via-[#6c1cdc] to-[#1A0636] text-white py-16 md:py-20 overflow-hidden shadow-inner">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(246,212,12,0.1),transparent_40%)]" />
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="h-6 w-6 text-secondary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-white/10 px-3 py-1 rounded-[3px] border border-white/15">
              LEGAL FRAMEWORK
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-none mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-gray-300 text-sm font-bold uppercase tracking-wider">
            Last Updated: May 26, 2026
          </p>
        </div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Quick Nav (Left Column) */}
          <div className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-40 space-y-2 bg-white p-6 rounded-[5px] border border-gray-100 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 ml-1">
                SECTIONS
              </p>
              {[
                "1. Introduction",
                "2. User Account & Verification",
                "3. Property Listings & MahaRERA",
                "4. Intellectual Property",
                "5. Limitation of Liability",
                "6. Governing Law"
              ].map((sec, idx) => (
                <div key={idx} className="text-xs font-bold text-gray-600 hover:text-primary transition-colors py-2 px-1 border-b border-gray-50 last:border-0">
                  {sec}
                </div>
              ))}
            </div>
          </div>

          {/* Legal Clauses (Right Column) */}
          <div className="lg:col-span-3 space-y-10 bg-white rounded-[5px] p-8 md:p-12 border border-gray-100 shadow-sm text-gray-700">
            
            {/* Warning Box */}
            <div className="bg-yellow-50/50 border border-yellow-200/50 rounded-[5px] p-6 flex gap-4 items-start">
              <ShieldAlert className="h-6 w-6 text-yellow-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-sm text-yellow-800 uppercase tracking-wider mb-1">Important Notice</h4>
                <p className="text-xs text-yellow-700 leading-relaxed">
                  Please read these Terms of Service carefully before utilizing the Housing Mantra portal. By accessing the site, listing a property, or inquiring about projects, you unconditionally agree to comply with these terms.
                </p>
              </div>
            </div>

            {/* Section 1 */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <span className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                  1
                </span>
                <h2 className="text-xl font-extrabold text-gray-900 uppercase tracking-tight">
                  Introduction &amp; Acceptance
                </h2>
              </div>
              <p className="text-sm leading-relaxed">
                Welcome to **Housing Mantra** ("we", "us", "our"). These Terms &amp; Conditions govern your access to and use of our website (housingmantra.in), including any properties listed, developer profiles, and real-time support modules such as Mantra AI.
              </p>
              <p className="text-sm leading-relaxed">
                By browsing, registering, or requesting pricing details on our platform, you confirm that you are at least 18 years old and fully competent to enter into, abide by, and comply with these legal regulations.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <span className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                  2
                </span>
                <h2 className="text-xl font-extrabold text-gray-900 uppercase tracking-tight">
                  User Account &amp; OTP Verification
                </h2>
              </div>
              <p className="text-sm leading-relaxed">
                To access personalized services (such as bookmarking, searching history, and listing custom properties), users must verify their identity using our **Firebase Mobile OTP Authentication** module.
              </p>
              <div className="space-y-2">
                {[
                  "You agree to provide complete, authentic, and updated contact numbers during verification.",
                  "You are entirely responsible for keeping your login credentials confidential and secure.",
                  "We reserve the absolute right to suspend or block any verified account suspected of malicious activities, fake postings, or spamming."
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-start text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <span className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                  3
                </span>
                <h2 className="text-xl font-extrabold text-gray-900 uppercase tracking-tight">
                  Property Listings &amp; MahaRERA Compliance
                </h2>
              </div>
              <p className="text-sm leading-relaxed">
                Housing Mantra functions as a trusted facilitator offering access to premium residential and commercial projects in Pune, PCMC, Moshi, Charholi, and nearby micro-markets.
              </p>
              <p className="text-sm leading-relaxed">
                All listed projects, images, floor plans, and brochures are curated directly from authorized builders or official RERA documents. While we make every attempt to verify registrations, users are strictly advised to cross-examine and validate the official **MahaRERA ID** mentioned on individual project pages before committing any financial investments.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <span className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                  4
                </span>
                <h2 className="text-xl font-extrabold text-gray-900 uppercase tracking-tight">
                  Intellectual Property Rights
                </h2>
              </div>
              <p className="text-sm leading-relaxed">
                All original source code, trademarks, customized branding elements (including the Housing Mantra logo, custom vector artwork, and dynamic components), databases, layout schemas, and custom AI integration structures belong exclusively to Housing Mantra TM.
              </p>
              <p className="text-sm leading-relaxed">
                Copying, distributing, scrap-mining listings, or cloning designs for commercial projects without explicit written consent is strictly prohibited and subject to legal prosecution.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <span className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                  5
                </span>
                <h2 className="text-xl font-extrabold text-gray-900 uppercase tracking-tight">
                  Limitation of Liability
                </h2>
              </div>
              <p className="text-sm leading-relaxed">
                Under no circumstances shall Housing Mantra, its directors, employees, or tech partners be liable for any direct or indirect damages, financial losses, or transactional issues arising between home buyers and third-party developers. 
              </p>
              <p className="text-sm leading-relaxed">
                Any pricing quotations, possession timelines, or project modifications shown on the website are subject to developer-end changes and do not constitute an official legal binding.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <span className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                  6
                </span>
                <h2 className="text-xl font-extrabold text-gray-900 uppercase tracking-tight">
                  Governing Law &amp; Jurisdiction
                </h2>
              </div>
              <p className="text-sm leading-relaxed">
                These terms shall be governed by, interpreted, and construed in absolute accordance with the laws of India. Any legal disputes or claims arising out of your usage of the portal shall be subject to the exclusive jurisdiction of the competent courts in Pune, Maharashtra.
              </p>
            </section>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
