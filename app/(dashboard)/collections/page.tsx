"use client";

import { useState, useEffect } from "react";
import { FolderOpen, Plus } from "lucide-react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@clerk/nextjs";
import { EmptyState } from "@/components/ui/EmptyState";
import { CreateCollectionModal } from "@/components/modals/CreateCollectionModal";
import Link from "next/link";

interface Collection {
  id: string;
  name: string;
}

export default function CollectionsPage() {
  const { userId, isLoaded } = useAuth();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    if (!userId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "collections"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name
      }));
      setCollections(fetched);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId, isLoaded]);

  return (
    <div className="px-8 py-10 max-w-[1280px] w-full mx-auto relative min-h-screen pb-32">
      <header className="mb-12 flex items-end justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold text-pine dark:text-clovers tracking-tight">Collections</h1>
          <p className="font-body text-timeless mt-2">Organize your digital museum into curated exhibits.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-aquamarine text-pine px-4 py-2.5 rounded-[12px] font-medium font-body hover:bg-aquamarine/90 transition-colors"
        >
          <Plus size={18} />
          New Collection
        </button>
      </header>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="h-32 rounded-[20px] bg-white/5 dark:bg-pine/5 border border-silver/20 animate-pulse" />
          ))}
        </div>
      ) : collections.length === 0 ? (
        <EmptyState
          icon={FolderOpen}
          title="No Collections Yet"
          description="Create custom collections to categorize your saved artifacts, from 'Watch Later' to 'Design Inspiration'."
          action={{ label: "Create Collection", onClick: () => setIsModalOpen(true) }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {collections.map(c => (
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

      {isModalOpen && <CreateCollectionModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
