"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Tag as TagIcon,
  BarChart2,
  Plus,
  Check,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { saveArtifact } from "@/lib/actions/search";
import type { AIArtifactMetadata } from "@/types/artifact";

interface PreviewSheetProps {
  artifact: AIArtifactMetadata;
  isOpen: boolean;
  onClose: () => void;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function PreviewSheet({
  artifact,
  isOpen,
  onClose,
}: PreviewSheetProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  async function handleSave() {
    setSaving(true);
    setSaveError(null);
    try {
      const slug = slugify(artifact.title);
      await saveArtifact(slug, artifact);
      setSaved(true);
      // Navigate to the new artifact page after a short delay
      setTimeout(() => {
        onClose();
        router.push(`/artifact/${slug}`);
      }, 800);
    } catch (err) {
      console.error(err);
      setSaveError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-pine/40 dark:bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 md:left-1/2 md:-translate-x-1/2 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:w-[600px] bg-white/70 dark:bg-pine/80 backdrop-blur-2xl border border-silver/30 rounded-t-[32px] md:rounded-[32px] shadow-2xl p-6 md:p-8 z-50 max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-label={`Preview: ${artifact.title}`}
          >
            <button
              onClick={onClose}
              aria-label="Close preview"
              className="absolute top-6 right-6 p-2 rounded-full bg-silver/20 hover:bg-silver/40 text-pine dark:text-clovers transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col md:flex-row gap-6 mb-8">
              {artifact.imageUrl ? (
                <div className="relative w-full md:w-40 h-40 rounded-[20px] overflow-hidden shrink-0 shadow-lg border border-silver/20 bg-pine/5">
                  <Image
                    src={artifact.imageUrl}
                    alt={artifact.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-full md:w-40 h-40 rounded-[20px] bg-gradient-to-br from-aquamarine/20 to-pine/10 flex items-center justify-center shrink-0 border border-silver/20">
                  <span className="font-display font-bold text-4xl text-pine/30 dark:text-clovers/30">
                    {artifact.title.charAt(0)}
                  </span>
                </div>
              )}

              <div className="flex flex-col justify-center">
                <div className="font-mono text-xs tracking-widest text-timeless uppercase mb-2">
                  {artifact.type} • {artifact.source}
                </div>
                <h2 className="font-display text-3xl font-bold text-pine dark:text-clovers leading-tight mb-2">
                  {artifact.title}
                </h2>
                <p className="font-body text-pine/70 dark:text-silver/80 text-sm">
                  {artifact.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/40 dark:bg-black/20 rounded-[16px] p-4 flex flex-col gap-1">
                <div className="flex items-center gap-2 text-timeless text-xs font-medium uppercase tracking-wider">
                  <TagIcon size={14} /> Tags
                </div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {artifact.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-aquamarine/10 text-aquamarine px-2 py-1 rounded-md font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white/40 dark:bg-black/20 rounded-[16px] p-4 flex flex-col gap-1">
                <div className="flex items-center gap-2 text-timeless text-xs font-medium uppercase tracking-wider">
                  <BarChart2 size={14} /> AI Confidence
                </div>
                <div className="flex items-center gap-2 mt-1 h-full">
                  <div className="flex-1 bg-silver/20 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-aquamarine"
                      style={{ width: `${artifact.confidence * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-pine dark:text-clovers">
                    {Math.round(artifact.confidence * 100)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              {/* Save to Zenith button */}
              <button
                onClick={handleSave}
                disabled={saving || saved}
                className={`w-full py-4 rounded-[16px] font-display font-semibold text-lg flex items-center justify-center gap-2 transition-colors ${
                  saved
                    ? "bg-emerald-500 text-white"
                    : "bg-pine dark:bg-clovers text-white dark:text-pine hover:bg-pine/90 dark:hover:bg-white"
                } disabled:opacity-70`}
              >
                {saving ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> Saving...
                  </>
                ) : saved ? (
                  <>
                    <Check size={20} /> Saved to Zenith!
                  </>
                ) : (
                  <>
                    <Plus size={20} /> Save to Zenith
                  </>
                )}
              </button>

              {saveError && (
                <p className="text-red-500 text-sm text-center font-body">
                  {saveError}
                </p>
              )}

              {artifact.url && (
                <a
                  href={artifact.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white/40 dark:bg-white/10 text-pine dark:text-silver py-4 rounded-[16px] font-display font-semibold text-lg flex items-center justify-center gap-2 hover:bg-white/60 dark:hover:bg-white/20 transition-colors"
                >
                  <ExternalLink size={20} /> Visit Source
                </a>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
