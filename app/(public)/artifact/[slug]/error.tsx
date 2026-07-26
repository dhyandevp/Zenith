// app/(public)/artifact/[slug]/error.tsx — Aurora Forest error boundary
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080b12] overflow-hidden relative">
      {/* Ambient blobs */}
      <div className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#1a3a5c] opacity-25 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#0f2a1a] opacity-30 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        {/* Warning triangle SVG */}
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mb-6"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>

        <h2 className="text-2xl font-light text-white mb-3">
          Something went wrong
        </h2>

        <p className="text-white/50 text-sm max-w-sm mb-8">
          {error.message || "This artifact couldn't be loaded."}
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={reset}
            className="border border-white/15 text-white/80 hover:text-white hover:border-white/30 rounded-full px-5 py-2 text-sm transition-all"
          >
            Try again
          </button>
          <Link
            href="/"
            className="bg-white text-[#080b12] font-medium rounded-full px-5 py-2 text-sm hover:bg-white/90 transition-colors"
          >
            Back to museum
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
