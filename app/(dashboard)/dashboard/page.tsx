import { LiveBentoGrid } from "@/components/ui/LiveBentoGrid";
import { Search } from "lucide-react";
import { DashboardStats } from "@/components/ui/DashboardStats";

export default function DashboardPage() {
  return (
    <div className="px-8 py-10 max-w-[1280px] w-full mx-auto">
      <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-display text-4xl font-bold text-pine dark:text-clovers tracking-tight">Dashboard</h1>
          <p className="font-body text-timeless mt-2">Welcome back to your digital museum.</p>
        </div>
        
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-timeless" />
          </div>
          <input
            type="text"
            placeholder="Search your artifacts..."
            className="w-full bg-white/40 dark:bg-white/5 backdrop-blur-md border border-silver/30 rounded-full py-3 pl-11 pr-4 text-pine dark:text-clovers placeholder:text-timeless/70 outline-none focus:ring-2 focus:ring-aquamarine/50 transition-all font-body"
          />
        </div>
      </header>

      <DashboardStats />
      
      <section>
        <h2 className="font-display text-2xl font-semibold text-pine dark:text-clovers mb-6">Recent Curations</h2>
        <LiveBentoGrid />
      </section>
    </div>
  );
}
