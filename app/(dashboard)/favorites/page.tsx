import { LiveBentoGrid } from "@/components/ui/LiveBentoGrid";

export default function FavoritesPage() {
  return (
    <div className="px-8 py-10 max-w-[1280px] w-full mx-auto">
      <header className="mb-12">
        <h1 className="font-display text-4xl font-bold text-pine dark:text-clovers tracking-tight">Favorites</h1>
        <p className="font-body text-timeless mt-2">Your most cherished artifacts, easily accessible.</p>
      </header>
      
      <section>
        {/* We will filter LiveBentoGrid to only show favorites in the future */}
        <LiveBentoGrid />
      </section>
    </div>
  );
}
