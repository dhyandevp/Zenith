"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Star, MoreHorizontal } from "lucide-react";
import { CategoryPlaceholder } from "../ui/CategoryPlaceholder";
import { ContextMenuModal } from "../ui/ContextMenuModal";
import { EditArtifactModal } from "../modals/EditArtifactModal";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type ArtifactType = "ARTICLE" | "GITHUB" | "MOVIE" | "BOOK" | "TWEET" | "IMAGE" | "GAME" | "SOFTWARE" | "MUSIC";

export interface Artifact {
  id: string;
  title: string;
  description?: string;
  type: ArtifactType;
  imageUrl?: string;
  source: string;
  size?: "sm" | "md" | "lg" | "wide";
  isFavorite?: boolean;
  url?: string;
  tags?: string[];
}

interface ArtifactCardProps {
  artifact: Artifact;
  className?: string;
  isFocused?: boolean;
}

export function ArtifactCard({ artifact, className, isFocused }: ArtifactCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this artifact?")) {
      await deleteDoc(doc(db, "artifacts", artifact.id));
    }
  };

  const handleFavorite = async () => {
    try {
      const docRef = doc(db, "artifacts", artifact.id);
      await updateDoc(docRef, {
        isFavorite: !artifact.isFavorite
      });
    } catch (error) {
      console.error("Failed to favorite:", error);
    }
  };

  return (
    <>
      <Link
        href={`/artifact/${artifact.id}`}
        className={clsx(
        "group relative overflow-hidden rounded-[20px] bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-silver/30 shadow-[0_4px_12px_rgba(0,0,0,0.08)] dark:shadow-none hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 flex flex-col justify-end p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aquamarine",
        isFocused && "ring-2 ring-aquamarine -translate-y-2 shadow-[0_12px_40px_rgba(0,0,0,0.2)] scale-[1.02]",
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
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
        </div>
      ) : (
        <CategoryPlaceholder type={artifact.type} />
      )}

      {/* Quick Actions (Top Right) */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <button 
          onClick={(e) => { e.preventDefault(); handleFavorite(); }}
          aria-label={artifact.isFavorite ? "Unfavorite" : "Favorite"}
          className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/60 hover:text-aquamarine transition-colors"
        >
          <Star size={18} className={artifact.isFavorite ? "fill-aquamarine text-aquamarine" : ""} />
        </button>
        <button 
          onClick={(e) => { e.preventDefault(); setIsMenuOpen(true); }}
          aria-label="More options"
          className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/60 hover:text-aquamarine transition-colors"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="relative z-10 flex flex-col transition-transform duration-500 group-hover:translate-y-[-4px]">
        <div className="font-mono text-[10px] tracking-widest text-silver/80 mb-2 uppercase flex items-center gap-2">
          <span className="bg-aquamarine/20 text-aquamarine px-2 py-0.5 rounded-full">{artifact.type}</span>
          <span>{artifact.source}</span>
        </div>
        <h3 className={clsx(
          "font-display leading-tight text-white drop-shadow-md",
          artifact.size === "lg" ? "text-3xl" : "text-xl"
        )}>
          {artifact.title}
        </h3>
      </div>
    </Link>

    <ContextMenuModal 
      artifact={artifact}
      isOpen={isMenuOpen}
      onClose={() => setIsMenuOpen(false)}
      onDelete={handleDelete}
      onFavorite={handleFavorite}
      onEdit={() => { setIsMenuOpen(false); setIsEditOpen(true); }}
    />
    {isEditOpen && (
      <EditArtifactModal 
        artifact={artifact} 
        onClose={() => setIsEditOpen(false)} 
      />
    )}
    </>
  );
}
