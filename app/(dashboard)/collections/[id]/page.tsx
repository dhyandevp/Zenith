"use client";

import { use, useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@clerk/nextjs";
import { LiveBentoGrid } from "@/components/ui/LiveBentoGrid";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CollectionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const collectionId = resolvedParams.id;
  const { userId, isLoaded } = useAuth();
  const [collectionName, setCollectionName] = useState<string>("Loading...");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isLoaded || !userId) return;

    const fetchCollection = async () => {
      try {
        const docRef = doc(db, "collections", collectionId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().userId === userId) {
          setCollectionName(docSnap.data().name);
        } else {
          setError(true);
        }
      } catch (e) {
        console.error(e);
        setError(true);
      }
    };
    fetchCollection();
  }, [collectionId, userId, isLoaded]);

  if (error) {
    return (
      <div className="px-8 py-10 max-w-[1280px] w-full mx-auto">
        <h1 className="text-2xl text-pine dark:text-clovers">Collection not found.</h1>
        <Link href="/collections" className="text-aquamarine mt-4 inline-block hover:underline">
          &larr; Back to Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="px-8 py-10 max-w-[1280px] w-full mx-auto pb-32">
      <header className="mb-12">
        <Link href="/collections" className="inline-flex items-center gap-2 text-pine/60 hover:text-pine dark:text-clovers/60 dark:hover:text-clovers transition-colors mb-6 font-body text-sm font-medium">
          <ArrowLeft size={16} />
          Back to Collections
        </Link>
        <h1 className="font-display text-4xl font-bold text-pine dark:text-clovers tracking-tight">{collectionName}</h1>
      </header>
      
      <section>
        <LiveBentoGrid filter={{ collectionId }} />
      </section>
    </div>
  );
}
