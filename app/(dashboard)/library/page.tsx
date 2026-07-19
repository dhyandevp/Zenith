import { LiveBentoGrid } from "@/components/ui/LiveBentoGrid";

export default function LibraryPage() {
  return (
    <div className="px-8 py-10 max-w-[1280px] w-full mx-auto">
      <header className="mb-12">
        <h1 className="font-display text-4xl font-bold text-pine dark:text-clovers tracking-tight">Library</h1>
        <p className="font-body text-timeless mt-2">All your saved artifacts, beautifully organized.</p>
      </header>
      
      <section>
        <LiveBentoGrid />
      </section>
    </div>
  );
}
