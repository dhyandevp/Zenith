import { ArtifactCard } from "@/components/cards/ArtifactCard";
import { useArtifactKeyboardNav } from "@/hooks/useArtifactKeyboardNav";
import type { Artifact } from "@/types/artifact";

interface BentoGridProps {
  artifacts: Artifact[];
}

export function BentoGrid({ artifacts }: BentoGridProps) {
  const focusedIndex = useArtifactKeyboardNav(artifacts);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[250px]">
      {artifacts.map((artifact, index) => {
        let spanClass = "";

        switch (artifact.size) {
          case "lg":
            spanClass = "md:col-span-2 md:row-span-2";
            break;
          case "wide":
            spanClass = "md:col-span-2 row-span-1";
            break;
          case "md":
            spanClass = "md:col-span-1 md:row-span-2";
            break;
          case "sm":
          default:
            spanClass = "col-span-1 row-span-1";
            break;
        }

        return (
          <ArtifactCard
            key={artifact.id}
            artifact={artifact}
            className={spanClass}
            isFocused={focusedIndex === index}
          />
        );
      })}
    </div>
  );
}
