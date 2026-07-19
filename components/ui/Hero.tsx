"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="pt-48 pb-20 px-6 flex flex-col items-center text-center max-w-4xl mx-auto">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-5xl md:text-7xl font-bold tracking-tight text-pine dark:text-clovers leading-tight"
      >
        Save Anything.<br />
        <span className="text-timeless">Understand Everything.</span><br />
        Remember Forever.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 text-lg text-timeless max-w-2xl font-body"
      >
        Zenith is your personal digital museum. Paste any link, and we&apos;ll automatically organize, categorize, and beautifully present it.
      </motion.p>
    </section>
  );
}
