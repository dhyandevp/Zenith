import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Star, FolderInput, Pencil, Trash2, Tag, Copy } from "lucide-react";
import { Artifact } from "@/components/cards/ArtifactCard";

interface ContextMenuModalProps {
  artifact: Artifact;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  onFavorite: () => void;
}

export function ContextMenuModal({ artifact, isOpen, onClose, onDelete, onFavorite }: ContextMenuModalProps) {
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
            <div className="flex items-center justify-between mb-4 px-2">
              <h4 className="font-display font-semibold text-pine dark:text-clovers truncate max-w-[250px]">
                {artifact.title}
              </h4>
              <button 
                onClick={onClose}
                className="p-2 rounded-full bg-silver/20 hover:bg-silver/40 text-pine dark:text-clovers transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <MenuButton icon={ExternalLink} label="Open Source URL" onClick={() => { alert("Opening source URL"); onClose(); }} />
            <MenuButton icon={Star} label="Favorite" onClick={() => { onFavorite(); onClose(); }} />
            <MenuButton icon={FolderInput} label="Move to Collection" onClick={() => { alert("Move to collection"); onClose(); }} />
            <MenuButton icon={Pencil} label="Rename Artifact" onClick={() => { alert("Rename artifact"); onClose(); }} />
            <MenuButton icon={Tag} label="Edit Tags" onClick={() => { alert("Edit tags"); onClose(); }} />
            <MenuButton icon={Copy} label="Copy Link" onClick={() => { navigator.clipboard.writeText(window.location.origin + "/artifact/" + artifact.id); onClose(); }} />
            
            <div className="h-px bg-silver/20 my-2" />
            
            <MenuButton 
              icon={Trash2} 
              label="Delete Artifact" 
              onClick={() => { onDelete(); onClose(); }} 
              destructive 
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function MenuButton({ icon: Icon, label, onClick, destructive }: { icon: any, label: string, onClick: () => void, destructive?: boolean }) {
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
