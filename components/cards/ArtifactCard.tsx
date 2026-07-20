"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { CategoryPlaceholder } from "../ui/CategoryPlaceholder";
import type { Artifact } from "@/types/artifact";

interface ArtifactCardProps {
  artifact: Artifact;
  className?: string;
  isFocused?: boolean;
}

export function ArtifactCard({
  artifact,
  className,
  isFocused,
}: ArtifactCardProps) {
  return (
    <Link
      href={`/artifact/${artifact.id}`}
      className={clsx(
        "group relative overflow-hidden rounded-[20px] bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-silver/30 shadow-[0_4px_12px_rgba(0,0,0,0.08)] dark:shadow-none hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 flex flex-col justify-end p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aquamarine",
        isFocused &&
          "ring-2 ring-aquamarine -translate-y-2 shadow-[0_12px_40px_rgba(0,0,0,0.2)] scale-[1.02]",
        className
      )}
    >
      {/* Background Image or Placeholder */}
      {artifact.imageUrl ? (
        <div className="absolute inset-0 z-0 bg-pine/20">
          <Image
            src={artifact.imageUrl}
            alt={artifact.title}
            fill
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
        </div>
      ) : (
        <CategoryPlaceholder type={artifact.type} />
      )}

      <div className="relative z-10 flex flex-col transition-transform duration-500 group-hover:translate-y-[-4px]">
        <div className="font-mono text-[10px] tracking-widest text-silver/80 mb-2 uppercase flex items-center gap-2">
          <span className="bg-aquamarine/20 text-aquamarine px-2 py-0.5 rounded-full">
            {artifact.type}
          </span>
          <span>{artifact.source}</span>
        </div>
        <h3
          className={clsx(
            "font-display leading-tight text-white drop-shadow-md",
            artifact.size === "lg" ? "text-3xl" : "text-xl"
          )}
        >
          {artifact.title}
        </h3>
      </div>
    </Link>
  );
}
