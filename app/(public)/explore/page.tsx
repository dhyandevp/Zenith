"use client";

import { useState } from "react";
import { LiveBentoGrid } from "@/components/ui/LiveBentoGrid";
import { Search, Filter } from "lucide-react";
import { CATEGORIES } from "@/constants/categories";
import type { ArtifactType } from "@/types/artifact";

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<ArtifactType | "ALL">("ALL");

  return (
    <div className="px-6 md:px-8 py-10 max-w-[1280px] w-full mx-auto pb-32">
      <header className="mb-12">
        <h1 className="font-display text-4xl font-bold text-pine dark:text-clovers tracking-tight">
          Explore
        </h1>
        <p className="font-body text-timeless mt-2">
          Browse the entire collection of curated digital artifacts.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-pine/50 dark:text-clovers/50">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search artifacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search artifacts"
            id="explore-search"
            className="w-full pl-11 pr-4 py-3 rounded-[12px] bg-white/40 dark:bg-pine/40 border border-silver/20 focus:outline-none focus:ring-2 focus:ring-aquamarine/50 font-body text-pine dark:text-clovers placeholder:text-timeless transition-all backdrop-blur-md"
          />
        </div>

        <div className="relative min-w-[160px]">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-pine/50 dark:text-clovers/50">
            <Filter size={18} />
          </div>
          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value as ArtifactType | "ALL")
            }
            aria-label="Filter by type"
            id="explore-filter"
            className="w-full pl-11 pr-8 py-3 rounded-[12px] bg-white/40 dark:bg-pine/40 border border-silver/20 focus:outline-none focus:ring-2 focus:ring-aquamarine/50 font-body text-pine dark:text-clovers transition-all backdrop-blur-md appearance-none cursor-pointer"
          >
            <option value="ALL">All Types</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <section>
        <LiveBentoGrid
          filter={{
            search,
            type: type === "ALL" ? undefined : type,
          }}
        />
      </section>
    </div>
  );
}
