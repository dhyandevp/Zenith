"use client";

import { useState, useEffect } from "react";
import { FolderOpen } from "lucide-react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { EmptyState } from "@/components/ui/EmptyState";
import Link from "next/link";

interface Collection {
  id: string;
  name: string;
}

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "collections"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setCollections(fetched);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="px-6 md:px-8 py-10 max-w-[1280px] w-full mx-auto relative min-h-screen pb-32">
      <header className="mb-12">
        <h1 className="font-display text-4xl font-bold text-pine dark:text-clovers tracking-tight">
          Collections
        </h1>
        <p className="font-body text-timeless mt-2">
          Curated exhibits from the digital museum.
        </p>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 rounded-[20px] bg-white/5 dark:bg-pine/5 border border-silver/20 animate-pulse"
            />
          ))}
        </div>
      ) : collections.length === 0 ? (
        <EmptyState
          icon={FolderOpen}
          title="No Collections Yet"
          description="Collections will appear here once they are curated."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {collections.map((c) => (
            <Link
              key={c.id}
              href={`/collections/${c.id}`}
              className="group block p-6 bg-white/20 dark:bg-pine/20 backdrop-blur-md border border-silver/20 rounded-[20px] hover:border-aquamarine/50 hover:bg-white/40 dark:hover:bg-pine/40 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-4 text-pine dark:text-clovers">
                <div className="w-10 h-10 rounded-full bg-aquamarine/20 flex items-center justify-center text-aquamarine">
                  <FolderOpen size={20} />
                </div>
                <h3 className="font-display font-semibold text-lg truncate group-hover:text-aquamarine transition-colors">
                  {c.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
