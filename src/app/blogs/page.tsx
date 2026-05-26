"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  User, 
  ChevronRight, 
  Filter,
  Send,
  CheckCircle2,
  X,
  FileText,
  Bookmark
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: "guide" | "investment" | "infrastructure" | "rera";
  categoryLabel: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  keyTakeaways: string[];
}

export default function BlogsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "guide" | "investment" | "infrastructure" | "rera">("all");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  
  // Newsletter Form State
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const blogPosts: BlogPost[] = [
    {
      id: "moshi-vs-charholi",
      title: "Moshi vs. Charholi: Which Pune Sector is Best for 2 BHK Homes?",
      excerpt: "An in-depth micro-market comparison of infrastructure, prices, possession timelines, and investment returns for home buyers.",
      category: "investment",
      categoryLabel: "Investment Tips",
      date: "May 24, 2026",
      readTime: "6 Min Read",
      author: "Mantra Advisory Team",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=60",
      keyTakeaways: [
        "Moshi offers closer access to Chakan Industrial Belt, driving higher rental yields.",
        "Charholi has premium larger-scale township projects and closer connectivity to Pune Airport.",
        "Average property rates in Charholi are ₹ 5,500 - 6,200/sqft, while Moshi stands at ₹ 5,200 - 5,800/sqft."
      ],
      content: `### Micro-Market Analysis: Moshi vs. Charholi
Pune's northern corridor has witnessed monumental growth over the past decade, heavily driven by the PCMC industrial development and the Chakan automotive manufacturing belt. For home-seekers targeting premium yet affordable 2 BHK and 3 BHK homes, two locations stand out: **Moshi** and **Charholi Budruk**.

#### 1. Connectivity and Transit
*   **Moshi:** Situated right on the Nashik Highway (NH-60), Moshi enjoys direct connectivity to Talawade IT Park, Bhosari, and Chakan. The upcoming Metro extension along Pune-Nashik highway is set to accelerate transit times immensely.
*   **Charholi:** Located close to the Alandi-Pune road, Charholi offers quicker access to the eastern IT corridor (Vimannagar, Kalyani Nagar) and Pune Airport (just 15-20 minutes away).

#### 2. Pricing and Configuration Ranges
Average property pricing is slightly premium in Charholi due to massive, master-planned township developments like Saiananta and Pride World City. 
*   **Moshi:** Starting from ₹ 38 Lakhs for a 1 BHK, and ₹ 50 - 68 Lakhs for a spacious 2 BHK flat.
*   **Charholi:** 2 BHK configurations range between ₹ 52 - 75 Lakhs, with premium 3 BHKs going up to ₹ 95 Lakhs.

#### 3. Verdict
If your workplace lies in Chakan, Talawade, or Bhosari, **Moshi** is your optimal destination. If you seek larger luxury township living closer to Pune Airport and eastern IT hubs, **Charholi** is the definitive winner.`
    },
    {
      id: "rera-buying-guide",
      title: "Understanding MahaRERA: A Home Buyer's Protection Guide",
      excerpt: "Learn how to verify MahaRERA registration numbers, analyze litigation details, and secure your financial investments against delays.",
      category: "rera",
      categoryLabel: "MahaRERA Updates",
      date: "May 20, 2026",
      readTime: "5 Min Read",
      author: "Advocate Suresh Patil",
      image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=60",
      keyTakeaways: [
        "Always verify the MahaRERA ID directly on the official maharerait.maharashtra.gov.in portal.",
        "RERA mandates that builders maintain 70% of buyer funds in a separate Escrow account.",
        "Compensation rights exist under Section 18 for project delivery delays."
      ],
      content: `### Securing Your Home with MahaRERA
The Real Estate (Regulation and Development) Act of 2016 (RERA) completely revolutionized the Indian property market, bringing standard accountability and transparency. In Maharashtra, **MahaRERA** acts as the primary regulatory watchdog protecting home buyers.

#### Core Verification Steps
1.  **Extract the MahaRERA Number:** Check the project details page on Housing Mantra. Every listed project (like Shakuntal Alentia or Topaz Tower) displays its unique registration ID.
2.  **Verify Litigations:** Log onto the official MahaRERA website, input the registration ID, and check the 'Litigation' section. This highlights any active legal disputes or pending property ownership claims.
3.  **Check Layout Approvals:** RERA ensures developers cannot change building layouts without 2/3rd buyer consent. Check the RERA page to download approved floor plans.

#### The Escrow Safety Net
RERA strictly mandates that developers store 70% of collection proceeds in a dedicated bank escrow account, which can only be withdrawn for construction and land acquisition costs. This prevents fund diversion to new projects and significantly minimizes project delays.`
    },
    {
      id: "home-loan-checklist",
      title: "Document Checklist for Instant Home Loan Approvals",
      excerpt: "A complete walkthrough of essential income, property, and identification documents required for seamless bank loans.",
      category: "guide",
      categoryLabel: "Home Buying Guide",
      date: "May 15, 2026",
      readTime: "4 Min Read",
      author: "Finance Expert Neha Shah",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=60",
      keyTakeaways: [
        "Maintain a CIBIL credit score of 750 or above for lowest interest rates.",
        "Keep 3 months of salary slips and 2 years of Form 16 ready.",
        "Ensure the property has a valid Commencement Certificate (CC) and RERA approval."
      ],
      content: `### Fast-Track Your Home Loan Approval
Securing a home loan can feel overwhelming due to the heavy paperwork required. However, having a prepared folder containing verified documents can fast-track your sanction letter to within 3 to 5 business days.

#### 1. KYC & Identification Documents
*   **Proof of Identity:** PAN Card, Aadhaar Card, or Passport.
*   **Proof of Address:** Aadhaar, Utility Bills, or Registered Rental Agreement.

#### 2. Financial & Income Documents (For Salaried Individuals)
*   **Salary Slips:** Last 3 consecutive months of company salary slips.
*   **Tax Records:** Form 16 for the last 2 financial years.
*   **Bank Statements:** Last 6 months of corporate salary account statements showing salary credits.

#### 3. Property Legal Documents
Banks conduct thorough title searches before approving loans. You must provide:
*   Commencement Certificate (CC) and Approved Building Plan.
*   Registered Agreement to Sale.
*   MahaRERA Registration Certificate.`
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    if (activeTab === "all") return true;
    return post.category === activeTab;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubscribing) return;
    setIsSubscribing(true);

    setTimeout(() => {
      setIsSubscribing(false);
      setIsSuccess(true);
      setEmail("");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gray-50/50 pt-16 font-sans">
      <Navbar />

      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-[#2F0D5E] via-[#6c1cdc] to-[#1A0636] text-white py-16 md:py-20 overflow-hidden shadow-inner">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(246,212,12,0.1),transparent_40%)]" />
        <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-4 bg-white/10 px-4 py-1.5 rounded-full border border-white/15">
            <BookOpen className="h-4 w-4 text-secondary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              KNOWLEDGE CORNER
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-none mb-4">
            Housing Mantra Blog
          </h1>
          <p className="text-gray-300 max-w-xl text-sm md:text-base font-medium leading-relaxed">
            Your premium real-estate intelligence hub. Get expert insights on home loan structures, infrastructure updates, and RERA compliance in Pune.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <section className="container mx-auto px-4 pt-12 max-w-5xl">
        <div className="flex bg-white p-1.5 rounded-[5px] border border-gray-200 shadow-sm overflow-x-auto select-none max-w-full">
          {[
            { id: "all", label: "All Insights" },
            { id: "guide", label: "Home Buying Guides" },
            { id: "investment", label: "Investment Strategy" },
            { id: "infrastructure", label: "Infrastructure News" },
            { id: "rera", label: "MahaRERA Compliance" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-[3px] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:text-primary hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <article 
              key={post.id} 
              className="bg-white rounded-[5px] border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow group cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              {/* Blog Image */}
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-primary text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded">
                  {post.categoryLabel}
                </span>
              </div>

              {/* Blog Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                  </div>
                  <h3 className="font-extrabold text-gray-950 uppercase tracking-tight text-base group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50 text-[10px] font-black uppercase tracking-wider text-primary">
                  <span className="flex items-center gap-1 text-gray-500 font-semibold"><User className="h-3 w-3" /> {post.author}</span>
                  <span className="flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">Read Article <ChevronRight className="h-3 w-3" /></span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-[5px] border border-gray-100 shadow-sm text-gray-500 font-bold text-sm uppercase tracking-wide">
            No articles listed in this category yet. Stay tuned!
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-4 pb-24 max-w-4xl">
        <div className="bg-gradient-to-r from-primary to-[#2F0D5E] rounded-[5px] shadow-xl p-8 md:p-12 text-white relative overflow-hidden text-center md:text-left">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(246,212,12,0.08),transparent_40%)]" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
            <div className="space-y-2">
              <span className="text-secondary text-[10px] font-black uppercase tracking-widest bg-secondary/15 px-3 py-1 rounded">
                NEWSLETTER REGISTRATION
              </span>
              <h3 className="text-2xl font-extrabold uppercase tracking-tight">
                Unlock Property Deals
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed font-semibold">
                Subscribe to receive weekly infrastructure updates, exclusive price launch announcements, and real-estate insights.
              </p>
            </div>

            <div>
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <form onSubmit={handleSubscribe} className="flex gap-2 flex-col sm:flex-row">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ENTER EMAIL ADDRESS"
                      className="flex-1 px-4 py-3 bg-white/10 border border-white/15 focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none rounded-[5px] text-xs font-bold placeholder-white/45 text-white"
                    />
                    <button
                      type="submit"
                      disabled={isSubscribing}
                      className="px-6 py-3 bg-secondary text-black hover:bg-secondary/95 rounded-[5px] text-xs font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
                    >
                      {isSubscribing ? (
                        <span>PROCESSING...</span>
                      ) : (
                        <>
                          <Send className="h-3.5 w-3.5" />
                          <span>SUBSCRIBE</span>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-3 bg-white/10 p-4 rounded-[5px] border border-white/15 justify-center md:justify-start"
                  >
                    <CheckCircle2 className="h-6 w-6 text-secondary shrink-0 animate-bounce" />
                    <div>
                      <p className="text-xs font-extrabold uppercase text-white">Subscribed Successfully!</p>
                      <p className="text-[10px] text-gray-300">You are now registered for Pune market updates.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Article Detail Drawer */}
      <AnimatePresence>
        {selectedPost && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="fixed inset-0 bg-black z-[100]"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-[101] w-full md:w-[600px] bg-white shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5" /> ARTICLE VIEW
                </span>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-1.5 hover:bg-gray-200 rounded-full transition-colors cursor-pointer focus:outline-none"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                {/* Meta details */}
                <div className="space-y-3">
                  <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded">
                    {selectedPost.categoryLabel}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-gray-950 uppercase tracking-tight leading-tight">
                    {selectedPost.title}
                  </h2>
                  <div className="flex items-center gap-4 text-xs text-gray-400 font-bold uppercase pb-4 border-b border-gray-100">
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {selectedPost.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {selectedPost.readTime}</span>
                    <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> {selectedPost.author}</span>
                  </div>
                </div>

                {/* Cover Image */}
                <div className="h-56 overflow-hidden rounded-[5px]">
                  <img 
                    src={selectedPost.image} 
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Key takeaways box */}
                <div className="bg-yellow-50/50 border border-yellow-200/40 rounded-[5px] p-6 space-y-3">
                  <h4 className="font-extrabold text-yellow-800 uppercase tracking-wider text-xs flex items-center gap-1">
                    <Bookmark className="h-4 w-4" /> Key Insights
                  </h4>
                  <ul className="space-y-2 text-xs text-yellow-700 leading-relaxed font-semibold">
                    {selectedPost.keyTakeaways.map((takeaway, idx) => (
                      <li key={idx} className="flex gap-2 items-start">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Rich text body (Markdown support) */}
                <div className="text-gray-700 space-y-4 text-sm leading-relaxed font-sans">
                  {selectedPost.content.split("\n\n").map((para, i) => {
                    if (para.startsWith("###")) {
                      return <h3 key={i} className="text-lg font-black text-gray-950 uppercase tracking-tight pt-4">{para.replace("###", "").trim()}</h3>;
                    }
                    if (para.startsWith("####")) {
                      return <h4 key={i} className="text-base font-extrabold text-gray-950 uppercase tracking-tight pt-2">{para.replace("####", "").trim()}</h4>;
                    }
                    if (para.startsWith("*")) {
                      return (
                        <ul key={i} className="space-y-1.5 list-disc list-inside pl-2">
                          {para.split("\n").map((li, lIdx) => (
                            <li key={lIdx} className="text-gray-600 font-medium" dangerouslySetInnerHTML={{ __html: li.replace(/^\*\s*/, "").replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                          ))}
                        </ul>
                      );
                    }
                    if (para.match(/^\d+\./)) {
                      return (
                        <ol key={i} className="space-y-1.5 list-decimal list-inside pl-2">
                          {para.split("\n").map((li, lIdx) => (
                            <li key={lIdx} className="text-gray-600 font-medium" dangerouslySetInnerHTML={{ __html: li.replace(/^\d+\.\s*/, "").replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                          ))}
                        </ol>
                      );
                    }
                    return <p key={i} className="text-gray-600 font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
                  })}
                </div>

                {/* Bottom Match recommendations */}
                <div className="pt-8 border-t border-gray-100 text-center space-y-4 pb-12">
                  <h4 className="font-extrabold text-gray-900 uppercase tracking-wider text-xs">
                    Ready to explore matched listings?
                  </h4>
                  <p className="text-xs text-gray-500 font-medium max-w-sm mx-auto">
                    Let our smart real-estate advisor matches you with verified projects matching these regional criteria.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedPost(null);
                      window.dispatchEvent(new CustomEvent('open-ai-chat'));
                    }}
                    className="bg-primary hover:bg-primary/95 text-white px-6 py-3 rounded-[5px] text-xs font-black uppercase tracking-wider transition-all active:scale-95 shadow-md shadow-primary/10 cursor-pointer inline-flex items-center gap-1.5"
                  >
                    Consult Mantra AI <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
