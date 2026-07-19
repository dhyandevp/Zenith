import { FileQuestion } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 min-h-screen bg-clovers dark:bg-pine">
      <EmptyState
        icon={FileQuestion}
        title="Artifact Not Found"
        description="The page or artifact you are looking for has been lost in the digital archives."
        action={{ label: "Return Home", href: "/" }}
      />
    </div>
  );
}
