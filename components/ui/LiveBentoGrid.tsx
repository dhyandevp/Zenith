"use client";

import { useEffect, useState } from "react";
import { collection, query, where, orderBy, onSnapshot, QueryConstraint } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@clerk/nextjs";
import { BentoGrid } from "./BentoGrid";
import { Artifact, ArtifactType } from "../cards/ArtifactCard";
import { ArtifactCardSkeleton } from "./ArtifactCardSkeleton";

export interface LiveBentoGridProps {
  filter?: {
    isFavorite?: boolean;
    collectionId?: string;
    type?: ArtifactType;
    search?: string;
  }
}

export function LiveBentoGrid({ filter }: LiveBentoGridProps) {
  const { userId, isLoaded } = useAuth();
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;
    
    if (!userId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }

    const constraints: QueryConstraint[] = [
      where("userId", "==", userId)
    ];

    if (filter?.isFavorite !== undefined) {
      constraints.push(where("isFavorite", "==", filter.isFavorite));
    }
    
    if (filter?.collectionId) {
      constraints.push(where("collectionId", "==", filter.collectionId));
    }

    if (filter?.type) {
      constraints.push(where("type", "==", filter.type));
    }

    constraints.push(orderBy("createdAt", "desc"));

    const q = query(collection(db, "artifacts"), ...constraints);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedArtifacts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Artifact[];
      setArtifacts(fetchedArtifacts);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching artifacts:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId, isLoaded, filter?.collectionId, filter?.isFavorite, filter?.type]);

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
    displayedArtifacts = artifacts.filter(a => 
      a.title.toLowerCase().includes(q) || 
      (a.description && a.description.toLowerCase().includes(q)) ||
      (a.tags && a.tags.some(t => t.toLowerCase().includes(q)))
    );
  }

  if (displayedArtifacts.length === 0) {
    return (
      <div className="text-center py-20 border border-silver/20 rounded-[20px] bg-white/10 dark:bg-pine/10 backdrop-blur-md">
        <p className="font-body text-timeless">
          {filter?.search ? "No artifacts match your search." : "No artifacts found here."}
        </p>
      </div>
    );
  }

  return <BentoGrid artifacts={displayedArtifacts} />;
}
