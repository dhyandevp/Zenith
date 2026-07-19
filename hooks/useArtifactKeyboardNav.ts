import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Artifact } from "@/components/cards/ArtifactCard";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function useArtifactKeyboardNav(artifacts: Artifact[]) {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      // Don't trigger if inside an input or textarea
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") {
        return;
      }

      if (artifacts.length === 0) return;

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          setFocusedIndex(prev => (prev + 1) % artifacts.length);
          break;
        case "ArrowLeft":
          e.preventDefault();
          setFocusedIndex(prev => (prev - 1 + artifacts.length) % artifacts.length);
          break;
        case "ArrowDown":
          // Simplified 1D grid nav (jump by ~2 for standard columns)
          e.preventDefault();
          setFocusedIndex(prev => Math.min(prev + 2, artifacts.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex(prev => Math.max(prev - 2, 0));
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
        case "Delete":
        case "Backspace":
          if (focusedIndex >= 0) {
            e.preventDefault();
            if (confirm("Delete this artifact?")) {
              await deleteDoc(doc(db, "artifacts", artifacts[focusedIndex].id));
              setFocusedIndex(-1);
            }
          }
          break;
        case "f":
        case "F":
          if (focusedIndex >= 0) {
            e.preventDefault();
            alert("Favorite toggled for " + artifacts[focusedIndex].title);
            // Future: update firestore isFavorite
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [artifacts, focusedIndex, router]);

  return focusedIndex;
}
