import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Star, FolderInput, Pencil, Trash2, Copy, LucideIcon } from "lucide-react";
import { Artifact } from "@/components/cards/ArtifactCard";

interface ContextMenuModalProps {
  artifact: Artifact;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  onFavorite: () => void;
  onEdit?: () => void;
}

export function ContextMenuModal({ artifact, isOpen, onClose, onDelete, onFavorite, onEdit }: ContextMenuModalProps) {
  const [mode, setMode] = useState<"menu" | "collections">("menu");

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setMode("menu"), 200); // Reset mode after close animation
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
            className="fixed inset-0 bg-pine/40 dark:bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ y: "100%", opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: "100%", opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 md:left-1/2 md:-translate-x-1/2 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:w-[400px] bg-white/70 dark:bg-pine/80 backdrop-blur-2xl border border-silver/30 rounded-t-[32px] md:rounded-[32px] shadow-2xl p-6 z-[100] flex flex-col gap-2"
            onClick={(e) => e.preventDefault()} // Prevent Link navigation
          >
            {mode === "menu" ? (
              <>
                <div className="flex items-center justify-between mb-4 px-2">
                  <h4 className="font-display font-semibold text-pine dark:text-clovers truncate max-w-[250px]">
                    {artifact.title}
                  </h4>
                  <button 
                    onClick={onClose}
                    aria-label="Close menu"
                    className="p-2 rounded-full bg-silver/20 hover:bg-silver/40 text-pine dark:text-clovers transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                <MenuButton icon={ExternalLink} label="Open Source URL" onClick={() => { 
                  if (artifact.url) window.open(artifact.url, '_blank'); 
                  else alert("No URL available");
                  onClose(); 
                }} />
                <MenuButton icon={Star} label={artifact.isFavorite ? "Unfavorite" : "Favorite"} onClick={() => { onFavorite(); onClose(); }} />
                <MenuButton icon={FolderInput} label="Move to Collection" onClick={() => setMode("collections")} />
                {onEdit && <MenuButton icon={Pencil} label="Edit Artifact" onClick={onEdit} />}
                <MenuButton icon={Copy} label="Copy Link" onClick={() => { navigator.clipboard.writeText(window.location.origin + "/artifact/" + artifact.id); onClose(); }} />
                
                <div className="h-px bg-silver/20 my-2" />
                
                <MenuButton 
                  icon={Trash2} 
                  label="Delete Artifact" 
                  onClick={() => { onDelete(); onClose(); }} 
                  destructive 
                />
              </>
            ) : (
              <CollectionSelector 
                artifactId={artifact.id} 
                onClose={onClose} 
                onBack={() => setMode("menu")} 
              />
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function MenuButton({ icon: Icon, label, onClick, destructive }: { icon: LucideIcon, label: string, onClick: () => void, destructive?: boolean }) {
  return (
    <button
      onClick={(e) => { e.preventDefault(); onClick(); }}
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-[16px] transition-colors font-medium ${
        destructive 
          ? "text-red-500 hover:bg-red-500/10" 
          : "text-pine dark:text-clovers hover:bg-white/40 dark:hover:bg-black/20"
      }`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );
}

import { useState, useEffect } from "react";
import { collection, query, where, orderBy, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@clerk/nextjs";
import { ArrowLeft, Loader2 } from "lucide-react";

function CollectionSelector({ artifactId, onClose, onBack }: { artifactId: string, onClose: () => void, onBack: () => void }) {
  const { userId } = useAuth();
  const [collections, setCollections] = useState<{id: string, name: string}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    const fetchCollections = async () => {
      const q = query(collection(db, "collections"), where("userId", "==", userId), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      setCollections(snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name })));
      setLoading(false);
    };
    fetchCollections();
  }, [userId]);

  const handleMove = async (collectionId: string | null) => {
    try {
      await updateDoc(doc(db, "artifacts", artifactId), { collectionId });
      onClose();
    } catch (e) {
      console.error(e);
      alert("Failed to move to collection");
    }
  };

  return (
    <div className="flex flex-col gap-2 min-h-[250px]">
      <div className="flex items-center gap-3 mb-4 px-2">
        <button onClick={onBack} className="p-2 rounded-full bg-silver/20 hover:bg-silver/40 text-pine dark:text-clovers transition-colors">
          <ArrowLeft size={16} />
        </button>
        <h4 className="font-display font-semibold text-pine dark:text-clovers">Move to Collection</h4>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center text-pine/50 dark:text-clovers/50">
          <Loader2 size={24} className="animate-spin" />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto max-h-[300px] flex flex-col gap-1 pr-1">
          <button
            onClick={() => handleMove(null)}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-[12px] transition-colors font-medium text-pine dark:text-clovers hover:bg-white/40 dark:hover:bg-black/20 text-left"
          >
            None (Remove from Collection)
          </button>
          {collections.map(c => (
            <button
              key={c.id}
              onClick={() => handleMove(c.id)}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-[12px] transition-colors font-medium text-pine dark:text-clovers hover:bg-white/40 dark:hover:bg-black/20 text-left"
            >
              <FolderInput size={16} className="opacity-50" />
              {c.name}
            </button>
          ))}
          {collections.length === 0 && (
            <p className="text-center text-pine/50 dark:text-clovers/50 mt-4 text-sm">
              No collections found. Create one in the Collections tab.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
