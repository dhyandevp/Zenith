import { ExternalLink, Code2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Zenith and the developer behind the digital museum.",
};

export default function AboutPage() {
  return (
    <div className="px-6 md:px-8 py-10 max-w-[1280px] w-full mx-auto pb-32 flex-1">
      <header className="mb-12 max-w-3xl">
        <h1 className="font-display text-4xl font-bold text-pine dark:text-clovers tracking-tight mb-4">
          About Zenith
        </h1>
        <p className="font-body text-pine/80 dark:text-silver/80 text-lg leading-relaxed">
          Zenith is a public digital museum designed to classify, organize, and
          preserve the artifacts of the internet. It leverages artificial
          intelligence to instantly categorize URLs and search queries into a
          beautifully curated library.
        </p>
      </header>

      <section className="mt-16">
        <div className="bg-white/40 dark:bg-pine/20 backdrop-blur-md border border-silver/30 rounded-[32px] p-8 md:p-12 max-w-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 text-pine/5 dark:text-clovers/5 group-hover:text-aquamarine/10 transition-colors duration-700 pointer-events-none">
            <Code2 size={120} strokeWidth={1} />
          </div>

          <div className="relative z-10">
            <h2 className="font-display text-2xl font-bold text-pine dark:text-clovers mb-2 flex items-center gap-2">
              Developer
            </h2>
            
            <p className="font-body text-pine/70 dark:text-silver/70 text-lg mb-8 leading-relaxed max-w-xl">
              Zenith is designed and developed by <strong className="text-pine dark:text-clovers font-semibold">Dhyandev P</strong>, 
              focusing on creating a premium digital memory experience with modern 
              web technologies and thoughtful design.
            </p>

            <a
              href="https://linktr.ee/DhyandevRTX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-pine dark:bg-clovers text-white dark:text-pine px-6 py-3 rounded-full font-display font-semibold hover:bg-pine/90 dark:hover:bg-white transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm"
            >
              View Developer Profile
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
