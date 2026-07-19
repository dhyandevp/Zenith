"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { addDoc, collection as firestoreCollection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@clerk/nextjs";

interface CreateCollectionModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export function CreateCollectionModal({ onClose, onSuccess }: CreateCollectionModalProps) {
  const { userId } = useAuth();
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !userId) return;

    try {
      setIsSubmitting(true);
      setError(null);
      
      await addDoc(firestoreCollection(db, "collections"), {
        userId,
        name: name.trim(),
        createdAt: serverTimestamp(),
      });
      
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error("Error creating collection:", err);
      setError("Failed to create collection. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-pine/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-pine border border-silver/20 rounded-[20px] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-silver/10">
          <h2 className="font-display font-semibold text-xl text-pine dark:text-clovers">Create Collection</h2>
          <button 
            onClick={onClose}
            className="text-pine/50 hover:text-pine dark:text-clovers/50 dark:hover:text-clovers transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-pine/80 dark:text-clovers/80 mb-2">
              Collection Name
            </label>
            <input
              id="name"
              type="text"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Design Inspiration"
              className="w-full bg-white dark:bg-pine/50 border border-silver/20 rounded-[12px] px-4 py-3 text-pine dark:text-clovers focus:outline-none focus:ring-2 focus:ring-aquamarine/50 transition-all font-body placeholder:text-timeless"
              required
            />
            {error && <p className="mt-2 text-red-500 text-sm font-body">{error}</p>}
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-[12px] font-medium font-body text-pine/70 hover:bg-silver/10 dark:text-clovers/70 dark:hover:bg-white/5 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim() || isSubmitting}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-[12px] font-medium font-body bg-aquamarine text-pine hover:bg-aquamarine/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]"
            >
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
