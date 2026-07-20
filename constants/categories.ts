import type { ArtifactType } from "@/types/artifact";

/** All valid artifact categories with display labels */
export const CATEGORIES: { value: ArtifactType; label: string }[] = [
  { value: "ARTICLE", label: "Article" },
  { value: "GITHUB", label: "GitHub" },
  { value: "MOVIE", label: "Movie" },
  { value: "BOOK", label: "Book" },
  { value: "TWEET", label: "Tweet" },
  { value: "IMAGE", label: "Image" },
  { value: "GAME", label: "Game" },
  { value: "SOFTWARE", label: "Software" },
  { value: "MUSIC", label: "Music" },
  { value: "SHOPPING", label: "Shopping" },
  { value: "LINK", label: "Link" },
];

/** Set of valid artifact type strings for runtime validation */
export const VALID_TYPES = new Set<string>(CATEGORIES.map((c) => c.value));
