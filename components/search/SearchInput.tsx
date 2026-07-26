"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { searchWithAI } from "@/lib/actions/search";
import { PreviewSheet } from "./PreviewSheet";
import Image from "next/image";
import type { AIArtifactMetadata } from "@/types/artifact";

export function SearchInput() {
  const [query, setQuery] = useState("");
  const [suggestion, setSuggestion] = useState<AIArtifactMetadata | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedArtifact, setSelectedArtifact] =
    useState<AIArtifactMetadata | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSearch() {
    const trimmed = query.trim();
    if (trimmed.length < 2 || isAnalyzing) return;

    setIsAnalyzing(true);
    setError(null);
    setSuggestion(null);
    try {
      const result = await searchWithAI(trimmed);
      setSuggestion(result);
    } catch {
      setError("Failed to analyze. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (suggestion) {
        openPreview(suggestion);
      } else {
        handleSearch();
      }
    }
  };

  const openPreview = (artifact: AIArtifactMetadata) => {
    setSelectedArtifact(artifact);
    setIsPreviewOpen(true);
    setSuggestion(null);
    setQuery("");
    inputRef.current?.blur();
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-6 relative z-10">
      <div className="relative group">
        <div className="absolute inset-0 bg-aquamarine/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <div className="relative flex flex-col bg-white/40 dark:bg-pine/60 backdrop-blur-md border border-silver/30 rounded-[28px] shadow-lg transition-all focus-within:ring-2 focus-within:ring-aquamarine/50 focus-within:border-aquamarine">
          <div className="flex items-center p-2">
            <div className="pl-4 pr-2 text-timeless flex items-center">
              {isAnalyzing ? (
                <Loader2
                  size={24}
                  strokeWidth={1.5}
                  className="animate-spin text-aquamarine"
                />
              ) : (
                <Search size={24} strokeWidth={1.5} />
              )}
            </div>

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search anything — movies, games, books, URLs..."
              aria-label="Search for artifacts"
              className="no-focus-ring flex-1 bg-transparent border-none outline-none ring-0 focus:ring-0 focus:outline-none focus-visible:outline-none text-lg py-4 px-2 text-pine dark:text-clovers placeholder:text-timeless/70 font-body"
            />

            {/* Search button */}
            <button
              onClick={handleSearch}
              disabled={isAnalyzing || query.trim().length < 2}
              className="mr-2 bg-pine dark:bg-clovers text-white dark:text-pine px-5 py-2.5 rounded-full font-display font-semibold text-sm flex items-center gap-2 hover:bg-pine/90 dark:hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              <Sparkles size={16} />
              Analyze
            </button>
          </div>

          <AnimatePresence>
            {(suggestion || error) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="border-t border-silver/20 p-2"
                role="status"
                aria-live="polite"
              >
                {error ? (
                  <div className="flex items-center gap-3 px-4 py-3 text-red-500/80 text-sm font-body">
                    <AlertCircle size={18} /> {error}
                  </div>
                ) : suggestion ? (
                  <button
                    onClick={() => openPreview(suggestion)}
                    className="w-full text-left flex items-center gap-4 p-3 rounded-[20px] transition-all duration-200 ease-out outline-none bg-white/60 dark:bg-black/30 shadow-sm hover:bg-white/80 dark:hover:bg-black/40"
                  >
                    {suggestion.imageUrl ? (
                      <div className="w-14 h-14 rounded-[12px] overflow-hidden relative shrink-0">
                        <Image
                          src={suggestion.imageUrl}
                          alt={suggestion.title}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-[12px] bg-aquamarine/10 flex items-center justify-center shrink-0">
                        <Sparkles size={22} className="text-aquamarine" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-display font-semibold text-pine dark:text-clovers truncate">
                          {suggestion.title}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider font-mono text-timeless bg-silver/20 px-2 py-0.5 rounded-full shrink-0">
                          {suggestion.type}
                        </span>
                      </div>
                      <p className="font-body text-xs text-timeless truncate">
                        {suggestion.source} • {suggestion.description}
                      </p>
                    </div>

                    <div className="text-[10px] font-mono text-aquamarine flex flex-col items-end shrink-0 pl-2">
                      <span>
                        {(suggestion.confidence * 100).toFixed(0)}%
                      </span>
                      <span>Match</span>
                    </div>
                  </button>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {selectedArtifact && (
        <PreviewSheet
          artifact={selectedArtifact}
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}
    </div>
  );
}
