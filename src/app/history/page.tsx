"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { History, ArrowLeft, Loader2, Clock } from "lucide-react";

interface HistoryEntry {
  id: string;
  viewedAt: string;
  project: {
    id: string;
    title: string;
    image: string;
    location: string;
    price: string;
    status: string;
    type: string;
  };
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const meRes = await fetch("/api/auth/me");
        const meData = await meRes.json();

        if (!meData.success || !meData.user) {
          setIsLoggedIn(false);
          setLoading(false);
          return;
        }

        setIsLoggedIn(true);

        const res = await fetch("/api/user/history");
        const data = await res.json();
        if (data.success) {
          setHistory(data.history);
        }
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "Yesterday";
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-20 font-sans">
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          <div className="flex items-center gap-4 mb-10">
            <Link href="/" className="text-gray-400 hover:text-primary transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                <History className="h-7 w-7 text-primary" />
                Browse History
              </h1>
              <p className="text-gray-500 mt-1 text-sm font-medium">Properties you've recently viewed</p>
            </div>
          </div>

          {loading && (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {!loading && !isLoggedIn && (
            <div className="text-center py-20 bg-white rounded-[5px] border border-gray-100 p-8 shadow-sm">
              <History className="h-16 w-16 text-gray-200 mx-auto mb-4" />
              <h2 className="text-xl font-black text-gray-900 mb-2">Login to See Your History</h2>
              <p className="text-gray-500 mb-6 text-sm font-medium">Sign in to automatically track properties you visit.</p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/95 text-white font-bold text-sm px-6 py-3.5 rounded-[5px] shadow-md shadow-primary/10 active:scale-[0.98] transition-all"
              >
                Sign In
              </Link>
            </div>
          )}

          {!loading && isLoggedIn && history.length === 0 && (
            <div className="text-center py-20 bg-white rounded-[5px] border border-gray-100 p-8 shadow-sm">
              <History className="h-16 w-16 text-gray-200 mx-auto mb-4" />
              <h2 className="text-xl font-black text-gray-900 mb-2">No History Yet</h2>
              <p className="text-gray-500 mb-6 text-sm font-medium">Start exploring projects — your recently viewed properties will appear here.</p>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/95 text-white font-bold text-sm px-6 py-3.5 rounded-[5px] shadow-md shadow-primary/10 active:scale-[0.98] transition-all"
              >
                Explore Projects
              </Link>
            </div>
          )}

          {!loading && isLoggedIn && history.length > 0 && (
            <div className="space-y-4">
              {history.map((entry) => (
                <Link
                  key={entry.id}
                  href={`/projects/${entry.project.id}`}
                  className="flex gap-5 bg-white rounded-[5px] border border-gray-100 shadow-sm hover:shadow-md transition-all p-4 group"
                >
                  <div className="relative w-28 h-20 rounded-[3px] overflow-hidden shrink-0">
                    <img
                      src={entry.project.image}
                      alt={entry.project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-bold text-gray-900 text-sm truncate group-hover:text-primary transition-colors">
                        {entry.project.title}
                      </h3>
                      <span className="flex items-center gap-1 text-[10px] text-gray-400 shrink-0 font-medium">
                        <Clock className="h-3 w-3" />
                        {formatDate(entry.viewedAt)}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs mt-0.5 font-medium">{entry.project.location}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-primary font-black text-xs">{entry.project.price}</span>
                      <span className="px-2 py-0.5 bg-primary/5 text-primary text-[9px] font-extrabold rounded-[3px] uppercase tracking-wider border border-primary/10">
                        {entry.project.status}
                      </span>
                      <span className="text-gray-400 text-[10px] font-medium">{entry.project.type}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
