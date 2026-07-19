"use client";

import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 min-h-screen bg-clovers dark:bg-pine">
      <Loader2 size={48} className="text-aquamarine animate-spin mb-6" />
      <h2 className="font-display text-2xl font-semibold text-pine dark:text-clovers animate-pulse">
        Retrieving artifacts...
      </h2>
    </div>
  );
}
