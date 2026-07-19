import { FolderOpen } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

export default function CollectionsPage() {
  return (
    <div className="px-8 py-10 max-w-[1280px] w-full mx-auto">
      <header className="mb-12">
        <h1 className="font-display text-4xl font-bold text-pine dark:text-clovers tracking-tight">Collections</h1>
        <p className="font-body text-timeless mt-2">Organize your digital museum into curated exhibits.</p>
      </header>
      
      <EmptyState
        icon={FolderOpen}
        title="No Collections Yet"
        description="Create custom collections to categorize your saved artifacts, from 'Watch Later' to 'Design Inspiration'."
        action={{ label: "Create Collection", href: "#" }}
      />
    </div>
  );
}
