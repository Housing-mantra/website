import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Shield, CheckCircle2, Lock, EyeOff } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Housing Mantra",
  description: "Learn how Housing Mantra collects, protects, uses, and secures your personal information and search preferences.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen font-sans bg-gray-50/50 pt-16">
      <Navbar />

      {/* Premium Hero Banner */}
      <div className="relative bg-gradient-to-r from-[#2F0D5E] via-[#6c1cdc] to-[#1A0636] text-white py-16 md:py-20 overflow-hidden shadow-inner">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(246,212,12,0.1),transparent_40%)]" />
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-6 w-6 text-secondary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-white/10 px-3 py-1 rounded-[3px] border border-white/15">
              DATA PRIVACY &amp; TRUST
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-none mb-4">
            Privacy Policy
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
                "1. Info We Collect",
                "2. How We Use Info",
                "3. Information Sharing",
                "4. Data Security",
                "5. Cookies & Tracking",
                "6. Your Privacy Choices"
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
            <div className="bg-purple-50/50 border border-purple-200/50 rounded-[5px] p-6 flex gap-4 items-start">
              <Lock className="h-6 w-6 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-sm text-primary uppercase tracking-wider mb-1">Our Privacy Commitment</h4>
                <p className="text-xs text-primary/80 leading-relaxed font-medium">
                  At Housing Mantra, your trust is our most valued asset. We are committed to maintaining the confidentiality, integrity, and security of all personal details and property preference records. We do not sell your personal data under any circumstances.
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
                  Information We Collect
                </h2>
              </div>
              <p className="text-sm leading-relaxed">
                When you access, search, and register on the Housing Mantra portal, we collect the following sets of data:
              </p>
              <div className="space-y-2">
                {[
                  "**Personal Information:** Your name, email address, and mobile phone number provided during account registration or lead inquiry forms.",
                  "**Verification Credentials:** Secured OTP authentication request logs managed through Firebase Authentication.",
                  "**Engagement Preferences:** Properties bookmarked, project detail pages browsed, and regional searches conducted to customize your dashboard feed.",
                  "**Interaction History:** Messages, inquiries, or feedback submitted through contact forms or the Mantra AI Assistant support module."
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-start text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  </div>
                ))}
              </div>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <span className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                  2
                </span>
                <h2 className="text-xl font-extrabold text-gray-900 uppercase tracking-tight">
                  How We Utilize Your Information
                </h2>
              </div>
              <p className="text-sm leading-relaxed">
                We process your personal information based on legitimate business needs and user choices:
              </p>
              <p className="text-sm leading-relaxed">
                We utilize your phone number to authenticate your sessions securely via standard OTPs. Your property bookmarks and search logs are stored locally or in Firestore to allow you to easily access your favorite flats or developers on your next visit. We also process query details via **Mantra AI** to automatically suggest the most relevant residential matches matching your requirements.
              </p>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <span className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                  3
                </span>
                <h2 className="text-xl font-extrabold text-gray-900 uppercase tracking-tight">
                  Information Sharing Policies
                </h2>
              </div>
              <p className="text-sm leading-relaxed">
                We value your privacy. We only share lead details in the following circumstances:
              </p>
              <p className="text-sm leading-relaxed">
                * **Authorized Developers:** When you explicitly click "Request Details" or "Enquire Now" on a specific property page (e.g. Shaligram Group, Sankalp, Saiananta), we transmit your name and phone number to that verified builder so they can schedule free site visits and provide pricing brochures.
                * **Legal Enforcement:** If required by standard regulatory authorities, MahaRERA mandates, or courts to defend trademark ownership or verify listings.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <span className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                  4
                </span>
                <h2 className="text-xl font-extrabold text-gray-900 uppercase tracking-tight">
                  Data Security &amp; Encryption
                </h2>
              </div>
              <p className="text-sm leading-relaxed">
                We use secure communication networks, database encryption rules, and industry-standard security certificates to safeguard your profile and authentication data. Firebase User IDs are protected using encrypted security hashes.
              </p>
              <p className="text-sm leading-relaxed">
                While we strive for absolute security, please note that no digital transmission over the internet or server-side database is 100% immune, and we cannot guarantee complete absolute security of user-side devices.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <span className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                  5
                </span>
                <h2 className="text-xl font-extrabold text-gray-900 uppercase tracking-tight">
                  Cookies &amp; Local Tracking Technologies
                </h2>
              </div>
              <p className="text-sm leading-relaxed">
                To improve response speed, we utilize standard browser cookies and local storage tokens. These store non-sensitive variables such as search history filters, profile dropdown preferences, or dynamic theme states so the page compiles instantly on reload.
              </p>
              <p className="text-sm leading-relaxed">
                You can block or delete cookies through standard browser settings, though doing so might disable certain personalized features like auto-bookmarking.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <span className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                  6
                </span>
                <h2 className="text-xl font-extrabold text-gray-900 uppercase tracking-tight">
                  Your Privacy Choices &amp; Control
                </h2>
              </div>
              <p className="text-sm leading-relaxed">
                You have full control over your personal data:
              </p>
              <p className="text-sm leading-relaxed">
                You can instantly delete your bookmarks from the dashboard, clear your browsed property history logs, update your registered email/name in the Profile Settings pop-up, or request full account deletion by contacting our security team at **support@housingmantra.com**.
              </p>
            </section>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
