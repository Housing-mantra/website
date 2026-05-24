"use client";

import { useEffect, useState } from "react";
import { Bookmark, Share2 } from "lucide-react";

interface ProjectActionsProps {
  projectId: string;
}

export function ProjectActions({ projectId }: ProjectActionsProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [copied, setCopied] = useState(false);

  // On mount: log history + check bookmark state
  useEffect(() => {
    const init = async () => {
      try {
        const meRes = await fetch("/api/auth/me");
        const meData = await meRes.json();

        if (meData.success && meData.user) {
          setIsLoggedIn(true);

          // Log browse history silently
          fetch("/api/user/history", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ projectId }),
          }).catch(() => {});

          // Check if already bookmarked
          const bmRes = await fetch("/api/user/bookmarks");
          const bmData = await bmRes.json();
          if (bmData.success) {
            const found = bmData.bookmarks.some((b: any) => b.project.id === projectId);
            setIsBookmarked(found);
          }
        }
      } catch (err) {
        // Silent – don't break the page
      }
    };

    init();
  }, [projectId]);

  const toggleBookmark = async () => {
    if (!isLoggedIn) {
      window.location.href = "/login";
      return;
    }

    setLoading(true);
    try {
      if (isBookmarked) {
        const res = await fetch(`/api/user/bookmarks?projectId=${projectId}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.success) setIsBookmarked(false);
      } else {
        const res = await fetch("/api/user/bookmarks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ projectId }),
        });
        const data = await res.json();
        if (data.success) setIsBookmarked(true);
      }
    } catch (err) {
      console.error("Bookmark error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      // Ignore
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* Bookmark Button */}
      <button
        onClick={toggleBookmark}
        disabled={loading}
        title={isBookmarked ? "Remove bookmark" : "Save to bookmarks"}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-[5px] border text-sm font-semibold transition-all ${
          isBookmarked
            ? "bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100"
            : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
        }`}
      >
        <Bookmark
          className={`h-4 w-4 transition-all ${isBookmarked ? "fill-amber-500 text-amber-500" : ""}`}
        />
        <span className="hidden md:inline">{isBookmarked ? "Saved" : "Save"}</span>
      </button>

      {/* Share Button */}
      <button
        onClick={handleShare}
        title="Share this project"
        className="flex items-center gap-2 px-4 py-2.5 rounded-[5px] border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 text-sm font-semibold transition-all"
      >
        <Share2 className="h-4 w-4" />
        <span className="hidden md:inline">{copied ? "Copied!" : "Share"}</span>
      </button>
    </div>
  );
}
