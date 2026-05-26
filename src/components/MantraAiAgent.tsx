"use client";

import { useEffect, useState, useRef } from "react";
import { Sparkles, Send, X, Bot, User, Loader2, Building2, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function MantraAiAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `**Namaste! I am Mantra AI.** 🏡  
Your personal property search assistant. How can I help you find your dream home in Pune today?  

I can fetch live site listings, compare BHK options, or find the best properties in **Moshi, Charholi, PCMC**, and more!`
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Listen to the global event dispatched from Navbar
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
    };
    window.addEventListener("open-ai-chat", handleOpenChat);
    return () => {
      window.removeEventListener("open-ai-chat", handleOpenChat);
    };
  }, []);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input.trim();
    if (!text || isLoading) return;

    if (!textToSend) {
      setInput("");
    }

    const newMessages = [...messages, { role: "user", content: text } as Message];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages })
      });

      const data = await res.json();
      if (data.reply) {
        setMessages([...newMessages, { role: "assistant", content: data.reply }]);
      } else {
        setMessages([
          ...newMessages,
          { role: "assistant", content: "Apologies, I encountered an issue connecting to the servers. Please try again." }
        ]);
      }
    } catch (err) {
      console.error("AI chat communication error:", err);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Network error! Please make sure your server is running and try again." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion);
  };

  // Convert simple markdown-like double asterisks and links into clean JSX
  const renderMessageContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      let elements: React.ReactNode[] = [];
      let currentText = line;
      let keyCounter = 0;

      // Match markdown bold syntax **text**
      const boldRegex = /\*\*(.*?)\*\*/g;
      let boldMatch;
      let lastIndex = 0;

      // Handle simple markdown links [text](url)
      const linkRegex = /\[(.*?)\]\((.*?)\)/g;

      // Parse bold elements
      const segments: { type: "text" | "bold"; content: string }[] = [];
      let tempMatch;
      let tempLastIndex = 0;

      while ((tempMatch = boldRegex.exec(line)) !== null) {
        if (tempMatch.index > tempLastIndex) {
          segments.push({ type: "text", content: line.substring(tempLastIndex, tempMatch.index) });
        }
        segments.push({ type: "bold", content: tempMatch[1] });
        tempLastIndex = boldRegex.lastIndex;
      }
      if (tempLastIndex < line.length) {
        segments.push({ type: "text", content: line.substring(tempLastIndex) });
      }

      // If no bold segments, treat as single text segment
      const finalSegments = segments.length > 0 ? segments : [{ type: "text" as const, content: line }];

      const renderedSegments = finalSegments.map((seg, sIdx) => {
        if (seg.type === "bold") {
          return <strong key={sIdx} className="font-extrabold text-gray-900">{seg.content}</strong>;
        }

        // Parse links inside text segments
        const parts: React.ReactNode[] = [];
        let linkMatch;
        let lLastIndex = 0;
        const text = seg.content;

        while ((linkMatch = linkRegex.exec(text)) !== null) {
          if (linkMatch.index > lLastIndex) {
            parts.push(text.substring(lLastIndex, linkMatch.index));
          }
          const linkText = linkMatch[1];
          const linkUrl = linkMatch[2];

          parts.push(
            <Link 
              key={`link-${keyCounter++}`} 
              href={linkUrl} 
              className="text-primary hover:underline font-bold inline-flex items-center gap-0.5"
            >
              {linkText}
            </Link>
          );
          lLastIndex = linkRegex.lastIndex;
        }

        if (lLastIndex < text.length) {
          parts.push(text.substring(lLastIndex));
        }

        return <span key={sIdx}>{parts.length > 0 ? parts : text}</span>;
      });

      return (
        <p key={idx} className="mb-2 leading-relaxed text-sm last:mb-0">
          {renderedSegments}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Sparkles Trigger Button */}
      <div className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center h-14 w-14 rounded-full bg-primary text-white shadow-[0_10px_30px_rgba(108,28,220,0.4)] border border-primary/20 cursor-pointer focus:outline-none relative group overflow-hidden"
        >
          {/* Neon Golden Rotating Ring */}
          <div className="absolute inset-0 rounded-full border border-secondary/30 scale-100 group-hover:scale-110 group-hover:border-secondary/70 transition-all duration-300 animate-spin-slow" />
          
          {/* Active AI Radar Sonar Waves */}
          {!isOpen && (
            <>
              <span className="absolute inset-0 rounded-full bg-primary/45 opacity-75 animate-ping" />
              <span className="absolute inset-0 rounded-full bg-secondary/25 opacity-55 animate-ping [animation-delay:0.5s]" />
            </>
          )}

          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="sparkles"
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.3, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <Sparkles className="h-6 w-6 text-secondary animate-pulse" />
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#f6d40c]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Slide-over Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Overlay (Only on Mobile for focus) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 bg-black z-50"
            />

            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed bottom-24 right-4 left-4 md:left-auto md:bottom-28 md:right-8 z-50 w-auto md:w-[420px] h-[70vh] max-h-[640px] flex flex-col bg-white/95 backdrop-blur-md rounded-[10px] border border-gray-100 shadow-2xl overflow-hidden leading-normal font-sans"
            >
              {/* Premium Gradient Header */}
              <div className="bg-gradient-to-r from-[#2F0D5E] via-[#6c1cdc] to-[#1A0636] p-4 text-white flex items-center justify-between shadow-md relative">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 relative shadow-inner">
                    <Bot className="h-5 w-5 text-secondary" />
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-[#2F0D5E]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-sm uppercase tracking-wider text-white">Mantra AI</span>
                      <span className="bg-secondary/20 border border-secondary/30 text-secondary text-[8.5px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-[3px]">AGENT</span>
                    </div>
                    <span className="text-[10px] text-gray-300 font-bold uppercase tracking-wider flex items-center gap-1 leading-none">
                      Housing Expert • Online
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-full transition-colors focus:outline-none cursor-pointer"
                >
                  <X className="h-5 w-5 text-gray-300 hover:text-white" />
                </button>
              </div>

              {/* Chat Message Feed */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 max-w-[85%] ${
                      msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                    }`}
                  >
                    {/* Role Avatar */}
                    <div
                      className={`h-8 w-8 shrink-0 rounded-full flex items-center justify-center shadow-sm text-xs ${
                        msg.role === "user"
                          ? "bg-secondary text-black"
                          : "bg-primary text-white"
                      }`}
                    >
                      {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`rounded-[10px] px-4 py-3 text-sm shadow-sm ${
                        msg.role === "user"
                          ? "bg-primary text-white rounded-tr-none"
                          : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <p className="leading-relaxed">{msg.content}</p>
                      ) : (
                        renderMessageContent(msg.content)
                      )}
                    </div>
                  </div>
                ))}

                {/* Loading Indicator */}
                {isLoading && (
                  <div className="flex gap-3 max-w-[85%]">
                    <div className="h-8 w-8 shrink-0 rounded-full bg-primary text-white flex items-center justify-center shadow-sm">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                    <div className="bg-white text-gray-500 border border-gray-100 rounded-[10px] rounded-tl-none px-4 py-3 text-xs font-medium flex items-center gap-2">
                      <span className="flex gap-1">
                        <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </span>
                      Mantra AI is finding matching properties...
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Interactive Suggestion Chips */}
              <div className="px-4 py-2 bg-gray-50/80 border-t border-gray-100 flex flex-wrap gap-2 overflow-x-auto select-none">
                {[
                  { text: "🔍 Show Moshi Projects", query: "Show me active projects in Moshi" },
                  { text: "💰 Flats under 50 Lakhs", query: "Show me projects under 50 Lakhs budget" },
                  { text: "🏡 Ready Possession", query: "Which projects have Ready Possession status?" }
                ].map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(s.query)}
                    className="text-[10px] md:text-xs font-bold text-gray-700 bg-white border border-gray-100 hover:border-primary/20 hover:text-primary rounded-full px-3 py-1.5 shadow-sm transition-all duration-200 cursor-pointer active:scale-95 whitespace-nowrap"
                  >
                    {s.text}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="p-3 border-t border-gray-100 bg-white flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  placeholder="Ask Mantra AI (e.g. Flats in PCMC)..."
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-100 rounded-[5px] text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary font-medium text-gray-800 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-3 bg-primary hover:bg-primary/95 text-white rounded-[5px] flex items-center justify-center transition-all cursor-pointer active:scale-95 disabled:opacity-40 shadow-md shadow-primary/10 shrink-0"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
