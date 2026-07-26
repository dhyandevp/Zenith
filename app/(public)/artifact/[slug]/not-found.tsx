// app/(public)/artifact/[slug]/not-found.tsx — Aurora Forest 404
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080b12] overflow-hidden relative">
      {/* Ambient blobs */}
      <div className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#1a3a5c] opacity-25 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#0f2a1a] opacity-30 blur-[120px] pointer-events-none" />

      {/* Faint "404" backdrop */}
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(8rem,25vw,16rem)] font-thin text-white/[0.04] select-none pointer-events-none z-0">
        404
      </span>

      {/* Foreground content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        <p className="text-white/30 text-xs tracking-[0.2em] uppercase mb-4">
          404 · Not Found
        </p>

        <h1 className="text-white text-3xl font-light mb-3">
          Artifact not found
        </h1>

        <p className="text-white/50 text-sm max-w-xs text-center mb-8">
          This artifact may have been removed or the link might be wrong.
        </p>

        <Link
          href="/"
          className="bg-white text-[#080b12] font-medium rounded-full px-6 py-2.5 text-sm hover:bg-white/90 transition-colors"
        >
          Back to Zenith
        </Link>
      </motion.div>
    </div>
  );
}
