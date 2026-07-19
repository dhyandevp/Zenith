import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/ui/Hero";
import { SearchInput } from "@/components/search/SearchInput";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      <Navigation />
      
      <div className="flex-1 flex flex-col relative z-10">
        <Hero />
        <SearchInput />
        
        {/* Mock Bento Grid Section for visual weight on Landing Page */}
        <section className="w-full max-w-7xl mx-auto px-6 mt-32">
          <h2 className="font-display text-2xl font-semibold mb-8 text-pine dark:text-clovers">Curated Artifacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
            <div className="md:col-span-2 bg-white/40 dark:bg-card-dark/40 backdrop-blur-md rounded-[20px] border border-silver/20 p-6 flex flex-col justify-end">
              <div className="font-mono text-timeless text-sm mb-2">ARTICLE</div>
              <h3 className="font-display text-xl text-pine dark:text-clovers">The Evolution of Digital Interfaces</h3>
            </div>
            <div className="bg-white/40 dark:bg-card-dark/40 backdrop-blur-md rounded-[20px] border border-silver/20 p-6 flex flex-col justify-end">
              <div className="font-mono text-timeless text-sm mb-2">GITHUB</div>
              <h3 className="font-display text-xl text-pine dark:text-clovers">next.js</h3>
            </div>
            <div className="bg-white/40 dark:bg-card-dark/40 backdrop-blur-md rounded-[20px] border border-silver/20 p-6 flex flex-col justify-end">
              <div className="font-mono text-timeless text-sm mb-2">BOOK</div>
              <h3 className="font-display text-xl text-pine dark:text-clovers">The Design of Everyday Things</h3>
            </div>
            <div className="md:col-span-2 bg-white/40 dark:bg-card-dark/40 backdrop-blur-md rounded-[20px] border border-silver/20 p-6 flex flex-col justify-end">
              <div className="font-mono text-timeless text-sm mb-2">MOVIE</div>
              <h3 className="font-display text-xl text-pine dark:text-clovers">Blade Runner 2049</h3>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
