"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Bookmark, ArrowLeft, Loader2, Trash2 } from "lucide-react";

interface BookmarkedProject {
  id: string;
  createdAt: string;
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

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const meRes = await fetch("/api/auth/me");
        const meData = await meRes.json();

        if (!meData.success || !meData.user) {
          setIsLoggedIn(false);
          setLoading(false);
          return;
        }

        setIsLoggedIn(true);

        const res = await fetch("/api/user/bookmarks");
        const data = await res.json();
        if (data.success) {
          setBookmarks(data.bookmarks);
        }
      } catch (err) {
        console.error("Error fetching bookmarks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookmarks();
  }, []);

  const removeBookmark = async (projectId: string) => {
    try {
      const res = await fetch(`/api/user/bookmarks?projectId=${projectId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setBookmarks((prev) => prev.filter((b) => b.project.id !== projectId));
      }
    } catch (err) {
      console.error("Error removing bookmark:", err);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          <div className="flex items-center gap-4 mb-10">
            <Link href="/" className="text-gray-400 hover:text-gray-600 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                <Bookmark className="h-7 w-7 text-amber-500 fill-amber-500/20" />
                My Bookmarks
              </h1>
              <p className="text-gray-500 mt-1 text-sm">Properties you saved for later</p>
            </div>
          </div>

          {loading && (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
            </div>
          )}

          {!loading && !isLoggedIn && (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
              <Bookmark className="h-16 w-16 text-gray-200 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Login to View Bookmarks</h2>
              <p className="text-gray-500 mb-6 text-sm">Sign in to save and access your favourite properties.</p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all"
              >
                Sign In
              </Link>
            </div>
          )}

          {!loading && isLoggedIn && bookmarks.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
              <Bookmark className="h-16 w-16 text-gray-200 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">No Bookmarks Yet</h2>
              <p className="text-gray-500 mb-6 text-sm">Explore projects and click the bookmark icon to save them here.</p>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all"
              >
                Explore Projects
              </Link>
            </div>
          )}

          {!loading && isLoggedIn && bookmarks.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarks.map((b) => (
                <div
                  key={b.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={b.project.image}
                      alt={b.project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <button
                      onClick={() => removeBookmark(b.project.id)}
                      className="absolute top-3 right-3 bg-white/90 hover:bg-red-50 text-red-500 p-2 rounded-full transition-colors shadow-sm"
                      title="Remove bookmark"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-amber-600 text-white text-[9px] font-bold rounded uppercase tracking-widest">
                      {b.project.status}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 text-base mb-1 line-clamp-1">{b.project.title}</h3>
                    <p className="text-gray-500 text-xs mb-3">{b.project.location}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-amber-600 font-extrabold text-sm">{b.project.price}</span>
                      <Link
                        href={`/projects/${b.project.id}`}
                        className="text-xs font-bold text-primary hover:underline"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
