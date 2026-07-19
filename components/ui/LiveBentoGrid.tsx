"use client";

import { useEffect, useState } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@clerk/nextjs";
import { BentoGrid } from "./BentoGrid";
import { Artifact } from "../cards/ArtifactCard";
import { Loader2 } from "lucide-react";
import { ArtifactCardSkeleton } from "./ArtifactCardSkeleton";

export function LiveBentoGrid() {
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

    const q = query(
      collection(db, "artifacts"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

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
  }, [userId, isLoaded]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[250px]">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <ArtifactCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (artifacts.length === 0) {
    return (
      <div className="text-center py-20 border border-silver/20 rounded-[20px] bg-white/10 dark:bg-pine/10 backdrop-blur-md">
        <p className="font-body text-timeless">No artifacts curated yet. Paste a URL to begin.</p>
      </div>
    );
  }

  return <BentoGrid artifacts={artifacts} />;
}
