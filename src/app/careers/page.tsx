"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Award, 
  Users, 
  Zap, 
  Heart, 
  CheckCircle2, 
  Upload, 
  Send,
  Building
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Position {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  responsibilities: string[];
  requirements: string[];
}

export default function CareersPage() {
  const [activeTab, setActiveTab] = useState<"all" | "sales" | "tech" | "marketing">("all");
  const [selectedJob, setSelectedJob] = useState<Position | null>(null);
  
  // Job Application Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    resume: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const openPositions: Position[] = [
    {
      id: "sales-consultant",
      title: "Senior Real Estate Consultant",
      department: "sales",
      location: "Moshi & PCMC, Pune",
      type: "Full-Time",
      experience: "2-5 Years",
      responsibilities: [
        "Conduct customized site visits for prospective residential and commercial property buyers.",
        "Provide in-depth consultation regarding project configurations, MahaRERA registrations, and developer reputations.",
        "Formulate pricing estimates and coordinate property transactions with transparency."
      ],
      requirements: [
        "Proven experience in Pune real estate sales, particularly PCMC/Pune West sectors.",
        "Excellent verbal communication and negotiation skills in English, Marathi, and Hindi.",
        "Must possess own vehicle for site visits and client support."
      ]
    },
    {
      id: "fullstack-engineer",
      title: "Full-Stack Next.js Developer",
      department: "tech",
      location: "Baner (HQ), Pune",
      type: "Full-Time",
      experience: "3+ Years",
      responsibilities: [
        "Architect and maintain modular React components, database integration models, and AI chatbot routes in Next.js.",
        "Optimize Web Core Vitals, serverless functions, and Firebase/Prisma backend schemas.",
        "Ensure pixel-perfect, highly responsive UI transitions across both desktop and mobile screens."
      ],
      requirements: [
        "Expert knowledge of React, Next.js (App Router), TypeScript, TailwindCSS, and Node.js.",
        "Familiarity with Firestore, SQLite, Prisma ORM, and cloud hosting services.",
        "Strong passion for building beautiful, rich, and high-performance Web Applications."
      ]
    },
    {
      id: "marketing-manager",
      title: "Digital Marketing Specialist",
      department: "marketing",
      location: "Baner, Pune (Hybrid)",
      type: "Full-Time",
      experience: "2+ Years",
      responsibilities: [
        "Strategize and execute paid marketing campaigns (Google Ads, Meta Ads) for new residential project launches.",
        "Analyze traffic acquisition metrics, lead generation funnels, and search engine optimization (SEO) indicators.",
        "Curate content updates, newsletters, and visual portfolios highlighting site achievements."
      ],
      requirements: [
        "Proven track record of managing lead generation campaigns specifically in real estate or B2C startups.",
        "In-depth command of SEO metrics, Google Search Console, and Web Analytics.",
        "Creative copywriting skills and familiarity with design platforms."
      ]
    }
  ];

  const filteredPositions = openPositions.filter(job => {
    if (activeTab === "all") return true;
    return job.department === activeTab;
  });

  const handleApplyClick = (job: Position) => {
    setSelectedJob(job);
    setFormData(prev => ({ ...prev, position: job.title }));
    
    // Smooth scroll to the form at the bottom
    setTimeout(() => {
      document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate database post and email trigger
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "",
        resume: "",
        message: ""
      });
      setSelectedJob(null);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gray-50/50 pt-16 font-sans">
      <Navbar />

      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-[#2F0D5E] via-[#6c1cdc] to-[#1A0636] text-white py-20 overflow-hidden shadow-inner">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(246,212,12,0.1),transparent_40%)]" />
        <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-4 bg-white/10 px-4 py-1.5 rounded-full border border-white/15">
            <Briefcase className="h-4 w-4 text-secondary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              WE ARE HIRING
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-none mb-4">
            Build the Future of <br className="hidden md:inline" /> Real Estate
          </h1>
          <p className="text-gray-300 max-w-2xl text-sm md:text-base font-medium leading-relaxed mb-6">
            Join the fastest-growing PropTech platform in Pune. We are looking for passionate builders, thinkers, and sales leaders to join our premium crew.
          </p>
          <a
            href="#positions"
            className="inline-flex items-center gap-2 bg-secondary text-black hover:bg-secondary/95 px-6 py-3 rounded-[5px] text-xs md:text-sm font-black uppercase tracking-wider transition-all hover:translate-x-1 duration-300"
          >
            Explore Openings <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Core Values Section */}
      <section className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-primary text-[10px] font-extrabold uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
            OUR CULTURE
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-gray-950 mt-3 mb-2">
            Why Work at Housing Mantra?
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            We provide a dynamic, transparent workspace built on collaboration, cutting-edge tech, and rewards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Zap className="h-6 w-6 text-secondary" />,
              title: "Rapid Growth & Learning",
              desc: "Work closely with senior leaders, gain exposure to high-value Pune markets, and accelerate your carrier velocity."
            },
            {
              icon: <Award className="h-6 w-6 text-secondary" />,
              title: "Premium Rewards",
              desc: "Competitive base packages, massive transactional incentives, robust health benefits, and periodic bonuses."
            },
            {
              icon: <Heart className="h-6 w-6 text-secondary" />,
              title: "Work-Life Integration",
              desc: "Flexible hybrid work schemas, regular team-building, interactive sessions, and collaborative work spaces."
            }
          ].map((v, i) => (
            <div key={i} className="bg-white p-8 rounded-[5px] border border-gray-100 shadow-sm flex flex-col items-center md:items-start text-center md:text-left hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-primary rounded-[5px] flex items-center justify-center mb-5 shadow-md shadow-primary/10">
                {v.icon}
              </div>
              <h3 className="font-extrabold text-gray-950 uppercase tracking-tight text-base mb-2">
                {v.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Board */}
      <section className="bg-[#2F0D5E]/5 py-12 border-y border-gray-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: "10,000+", label: "Verified Listings" },
              { val: "50+", label: "Active Partners" },
              { val: "5,000+", label: "Happy Families" },
              { val: "Pune & PCMC", label: "Core Operations" }
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <p className="text-2xl md:text-3xl font-black text-primary tracking-tight">
                  {stat.val}
                </p>
                <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Positions Grid */}
      <section id="positions" className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-200 pb-6 mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-gray-950">
              Current Openings
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              Filter by department to find your perfect job role.
            </p>
          </div>

          {/* Department Tabs */}
          <div className="flex bg-white p-1 rounded-[5px] border border-gray-200 shadow-sm overflow-x-auto max-w-full select-none shrink-0">
            {[
              { id: "all", label: "All Roles" },
              { id: "sales", label: "Sales & Advisory" },
              { id: "tech", label: "Technology" },
              { id: "marketing", label: "Marketing" }
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
        </div>

        {/* Positions List */}
        <div className="space-y-6">
          {filteredPositions.map(job => (
            <div 
              key={job.id} 
              className="bg-white rounded-[5px] border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-primary/10 text-primary text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                      {job.department}
                    </span>
                    <span className="bg-gray-100 text-gray-600 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5" /> {job.type}
                    </span>
                    <span className="bg-gray-100 text-gray-600 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1">
                      <MapPin className="h-2.5 w-2.5" /> {job.location}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-extrabold text-gray-950 uppercase tracking-tight">
                    {job.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-bold mt-1">
                    Experience required: {job.experience}
                  </p>
                </div>

                <div className="shrink-0 flex flex-wrap gap-3">
                  <button
                    onClick={() => handleApplyClick(job)}
                    className="bg-primary hover:bg-primary/95 text-white px-5 py-2.5 rounded-[5px] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Apply Instantly
                  </button>
                </div>
              </div>

              {/* Responsibilities & Requirements detail grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-100 text-xs">
                <div>
                  <h4 className="font-extrabold text-gray-950 uppercase tracking-wider mb-2">Core Responsibilities</h4>
                  <ul className="space-y-1.5 list-disc list-inside text-gray-500 leading-relaxed font-medium">
                    {job.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-extrabold text-gray-950 uppercase tracking-wider mb-2">Basic Requirements</h4>
                  <ul className="space-y-1.5 list-disc list-inside text-gray-500 leading-relaxed font-medium">
                    {job.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}

          {filteredPositions.length === 0 && (
            <div className="text-center py-12 bg-white rounded-[5px] border border-gray-100 shadow-sm text-gray-500 font-bold text-sm uppercase tracking-wide">
              No vacancies currently available for this category.
            </div>
          )}
        </div>
      </section>

      {/* Interactive Application Form */}
      <section id="application-form" className="container mx-auto px-4 py-8 max-w-xl pb-24">
        <div className="bg-white border border-gray-100 rounded-[5px] shadow-xl p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-secondary" />
          
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 uppercase tracking-tight">
                    Submit Job Application
                  </h3>
                  <p className="text-xs text-gray-400 font-semibold mt-1">
                    {selectedJob 
                      ? `Applying for: ${selectedJob.title}` 
                      : "Choose a position or submit an open application"}
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Selected Job hidden or prefilled */}
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1.5">
                      Select Position *
                    </label>
                    <select
                      value={formData.position}
                      onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-[5px] text-xs focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary font-bold text-gray-700 uppercase"
                    >
                      <option value="">-- Choose Position --</option>
                      {openPositions.map(op => (
                        <option key={op.id} value={op.title}>{op.title}</option>
                      ))}
                      <option value="Open Application (General)">Open Application (General Interest)</option>
                    </select>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="ENTER FULL NAME"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-[5px] text-xs focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary font-bold text-gray-700"
                    />
                  </div>

                  {/* Contact Info (Row) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="ENTER EMAIL ADDRESS"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-[5px] text-xs focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary font-bold text-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1.5">
                        Mobile Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="ENTER 10 DIGIT NUMBER"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-[5px] text-xs focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary font-bold text-gray-700"
                      />
                    </div>
                  </div>

                  {/* Portfolio / CV Link */}
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1.5">
                      Resume Link / Portfolio Link (Google Drive / LinkedIn) *
                    </label>
                    <input
                      type="url"
                      required
                      value={formData.resume}
                      onChange={(e) => setFormData(prev => ({ ...prev, resume: e.target.value }))}
                      placeholder="HTTPS://DRIVE.GOOGLE.COM/FILE/..."
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-[5px] text-xs focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary font-bold text-gray-700"
                    />
                  </div>

                  {/* Cover Message */}
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1.5">
                      Short Description (Why Join Housing Mantra?)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="TELL US A BIT ABOUT YOUR PASSIONS..."
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-[5px] text-xs focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary font-medium text-gray-700"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-primary hover:bg-primary/95 disabled:bg-primary/70 text-white rounded-[5px] text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-md shadow-primary/10"
                  >
                    {isSubmitting ? (
                      <span>TRANSMITTING DETAILS...</span>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>SUBMIT APPLICATION</span>
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="text-center py-10 space-y-4"
              >
                <div className="h-16 w-16 bg-green-50 rounded-full flex items-center justify-center mx-auto border border-green-100">
                  <CheckCircle2 className="h-8 w-8 text-green-500 animate-bounce" />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 uppercase tracking-tight">
                  Application Received!
                </h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed font-semibold">
                  Thank you! Your profile data and resume link have been securely received by the **Housing Mantra HR Department**. We will review your application and get in touch with you within 48 hours.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 bg-primary hover:bg-primary/95 text-white px-6 py-2.5 rounded-[5px] text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Apply for Another Position
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </main>
  );
}
