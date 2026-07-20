"use client";

import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
  QueryConstraint,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { BentoGrid } from "./BentoGrid";
import { ArtifactCardSkeleton } from "./ArtifactCardSkeleton";
import type { Artifact, ArtifactType } from "@/types/artifact";

export interface LiveBentoGridProps {
  filter?: {
    collectionId?: string;
    type?: ArtifactType;
    search?: string;
  };
}

export function LiveBentoGrid({ filter }: LiveBentoGridProps) {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const constraints: QueryConstraint[] = [];

    if (filter?.collectionId) {
      constraints.push(where("collectionId", "==", filter.collectionId));
    }

    if (filter?.type) {
      constraints.push(where("type", "==", filter.type));
    }

    constraints.push(orderBy("createdAt", "desc"));

    const q = query(collection(db, "artifacts"), ...constraints);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedArtifacts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Artifact[];
        setArtifacts(fetchedArtifacts);
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [filter?.collectionId, filter?.type]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[250px]">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <ArtifactCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  let displayedArtifacts = artifacts;
  if (filter?.search) {
    const q = filter.search.toLowerCase();
    displayedArtifacts = artifacts.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        (a.description && a.description.toLowerCase().includes(q)) ||
        (a.tags && a.tags.some((t) => t.toLowerCase().includes(q)))
    );
  }

  if (displayedArtifacts.length === 0) {
    return (
      <div className="text-center py-20 border border-silver/20 rounded-[20px] bg-white/10 dark:bg-pine/10 backdrop-blur-md">
        <p className="font-body text-timeless">
          {filter?.search
            ? "No artifacts match your search."
            : "No artifacts found here yet."}
        </p>
      </div>
    );
  }

  return <BentoGrid artifacts={displayedArtifacts} />;
}
