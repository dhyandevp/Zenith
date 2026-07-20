import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Artifact } from "@/types/artifact";

export function useArtifactKeyboardNav(artifacts: Artifact[]) {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if inside an input or textarea
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (artifacts.length === 0) return;

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          setFocusedIndex((prev) => (prev + 1) % artifacts.length);
          break;
        case "ArrowLeft":
          e.preventDefault();
          setFocusedIndex(
            (prev) => (prev - 1 + artifacts.length) % artifacts.length
          );
          break;
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((prev) =>
            Math.min(prev + 2, artifacts.length - 1)
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev) => Math.max(prev - 2, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (focusedIndex >= 0) {
            router.push(`/artifact/${artifacts[focusedIndex].id}`);
          }
          break;
        case "Escape":
          e.preventDefault();
          setFocusedIndex(-1);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [artifacts, focusedIndex, router]);

  return focusedIndex;
}
