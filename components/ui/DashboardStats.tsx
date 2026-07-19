"use client";

import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@clerk/nextjs";
import { Library, FolderOpen, Star, Activity } from "lucide-react";

export function DashboardStats() {
  const { userId, isLoaded } = useAuth();
  const [stats, setStats] = useState({
    totalArtifacts: 0,
    collections: 0,
    favorites: 0,
  });

  useEffect(() => {
    if (!isLoaded || !userId) return;

    // Listen to artifacts
    const qArtifacts = query(collection(db, "artifacts"), where("userId", "==", userId));
    const unsubArtifacts = onSnapshot(qArtifacts, (snapshot) => {
      setStats(prev => ({ ...prev, totalArtifacts: snapshot.size }));
    });

    return () => {
      unsubArtifacts();
    };
  }, [userId, isLoaded]);

  const statCards = [
    { label: "Total Artifacts", value: stats.totalArtifacts, icon: Library },
    { label: "Collections", value: stats.collections, icon: FolderOpen },
    { label: "Favorites", value: stats.favorites, icon: Star },
    { label: "Curator Level", value: "Novice", icon: Activity },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      {statCards.map((stat) => (
        <div key={stat.label} className="bg-white/40 dark:bg-pine/20 backdrop-blur-md border border-silver/30 rounded-[20px] p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-timeless text-sm font-medium uppercase tracking-wider">
            <stat.icon size={16} /> {stat.label}
          </div>
          <div className="font-display text-3xl font-bold text-pine dark:text-clovers">
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
}
