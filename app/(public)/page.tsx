import { Hero } from "@/components/ui/Hero";
import { SearchInput } from "@/components/search/SearchInput";
import { LiveBentoGrid } from "@/components/ui/LiveBentoGrid";

export default function Home() {
  return (
    <>
      {/* Negative margin to counteract the pt-24 from public layout,
          since the Hero component manages its own top padding (pt-48) */}
      <div className="-mt-24">
        <Hero />
        <SearchInput />
      </div>

      {/* Live Curated Artifacts Section */}
      <section className="w-full max-w-7xl mx-auto px-6 mt-32 pb-32">
        <h2 className="font-display text-2xl font-semibold mb-8 text-pine dark:text-clovers">
          Curated Artifacts
        </h2>
        <LiveBentoGrid />
      </section>
    </>
  );
}
