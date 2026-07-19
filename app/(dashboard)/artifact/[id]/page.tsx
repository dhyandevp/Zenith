"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@clerk/nextjs";
import { Artifact } from "@/components/cards/ArtifactCard";
import { ArrowLeft, Star, Trash2, ExternalLink, Calendar, Tag, Folder } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CategoryPlaceholder } from "@/components/ui/CategoryPlaceholder";

export default function ArtifactDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { userId } = useAuth();
  const [artifact, setArtifact] = useState<Artifact & { description?: string; tags?: string[]; createdAt?: any; url?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    async function fetchArtifact() {
      try {
        const docRef = doc(db, "artifacts", params.id as string);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists() && docSnap.data().userId === userId) {
          setArtifact({ id: docSnap.id, ...docSnap.data() } as any);
        } else {
          router.push("/not-found");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchArtifact();
  }, [params.id, userId, router]);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this artifact?")) {
      try {
        await deleteDoc(doc(db, "artifacts", params.id as string));
        router.push("/dashboard");
      } catch (error) {
        console.error(error);
        alert("Failed to delete");
      }
    }
  };

  if (loading) {
    return (
      <div className="p-8 max-w-[1280px] mx-auto w-full animate-pulse">
        <div className="w-32 h-6 bg-silver/20 rounded-md mb-8" />
        <div className="w-full h-[400px] bg-silver/10 rounded-[32px] mb-8" />
        <div className="w-1/2 h-12 bg-silver/20 rounded-md mb-4" />
        <div className="w-full h-24 bg-silver/20 rounded-md" />
      </div>
    );
  }

  if (!artifact) return null;

  return (
    <div className="relative min-h-screen pb-24">
      {/* Background Blur Effect */}
      {artifact.imageUrl && (
        <div className="absolute inset-0 z-0 h-[600px] overflow-hidden opacity-30 pointer-events-none">
          <Image src={artifact.imageUrl} alt="Background" fill className="object-cover blur-3xl scale-110" />
          <div className="absolute inset-0 bg-gradient-to-b from-clovers/50 to-clovers dark:from-pine/50 dark:to-pine" />
        </div>
      )}

      <div className="relative z-10 px-6 py-8 max-w-[1000px] mx-auto w-full">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-timeless hover:text-pine dark:hover:text-clovers transition-colors mb-8 font-body font-medium">
          <ArrowLeft size={20} /> Back to Dashboard
        </Link>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 mb-12">
          {/* Artwork */}
          <div className="w-full md:w-[400px] shrink-0">
            <div className="relative w-full aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl border border-silver/20 bg-pine/10">
              {artifact.imageUrl ? (
                <Image src={artifact.imageUrl} alt={artifact.title} fill className="object-cover" priority />
              ) : (
                <CategoryPlaceholder type={artifact.type} title={artifact.title} />
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-aquamarine/20 text-aquamarine font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full">
                {artifact.type}
              </span>
              <span className="font-mono text-xs text-timeless uppercase tracking-widest">
                {artifact.source}
              </span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-pine dark:text-clovers leading-tight mb-6 tracking-tight">
              {artifact.title}
            </h1>
            
            <p className="font-body text-lg text-pine/80 dark:text-silver/90 leading-relaxed mb-8 max-w-2xl">
              {artifact.description}
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              {artifact.url && (
                <a 
                  href={artifact.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-pine dark:bg-clovers text-white dark:text-pine px-6 py-3 rounded-full font-display font-semibold flex items-center gap-2 hover:bg-pine/90 dark:hover:bg-white transition-colors"
                >
                  Visit Source <ExternalLink size={18} />
                </a>
              )}
              <button className="bg-white/40 dark:bg-black/20 border border-silver/30 px-6 py-3 rounded-full font-display font-medium text-pine dark:text-clovers flex items-center gap-2 hover:bg-white/60 dark:hover:bg-black/40 transition-colors">
                <Star size={18} /> Favorite
              </button>
            </div>
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/40 dark:bg-white/5 border border-silver/20 rounded-[24px] p-6 backdrop-blur-md">
            <div className="flex items-center gap-2 text-timeless text-sm font-medium uppercase tracking-wider mb-4">
              <Tag size={16} /> Tags
            </div>
            <div className="flex flex-wrap gap-2">
              {artifact.tags?.map(tag => (
                <span key={tag} className="text-xs bg-aquamarine/10 text-aquamarine px-2 py-1 rounded-md font-medium">
                  {tag}
                </span>
              ))}
              {(!artifact.tags || artifact.tags.length === 0) && (
                <span className="text-sm text-timeless">No tags assigned.</span>
              )}
            </div>
          </div>

          <div className="bg-white/40 dark:bg-white/5 border border-silver/20 rounded-[24px] p-6 backdrop-blur-md">
            <div className="flex items-center gap-2 text-timeless text-sm font-medium uppercase tracking-wider mb-4">
              <Folder size={16} /> Collection
            </div>
            <p className="font-display text-lg text-pine dark:text-clovers font-medium">
              Library (Default)
            </p>
          </div>

          <div className="bg-white/40 dark:bg-white/5 border border-silver/20 rounded-[24px] p-6 backdrop-blur-md">
            <div className="flex items-center gap-2 text-timeless text-sm font-medium uppercase tracking-wider mb-4">
              <Calendar size={16} /> Date Added
            </div>
            <p className="font-display text-lg text-pine dark:text-clovers font-medium">
              {artifact.createdAt ? new Date(artifact.createdAt.toMillis()).toLocaleDateString() : 'Unknown'}
            </p>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="border-t border-red-500/20 pt-8 flex justify-end">
          <button 
            onClick={handleDelete}
            className="text-red-500 flex items-center gap-2 font-medium hover:text-red-600 transition-colors bg-red-500/10 px-4 py-2 rounded-lg"
          >
            <Trash2 size={18} /> Delete Artifact
          </button>
        </div>
      </div>
    </div>
  );
}
