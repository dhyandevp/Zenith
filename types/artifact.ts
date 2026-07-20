/** All supported artifact categories in Zenith */
export type ArtifactType =
  | "ARTICLE"
  | "GITHUB"
  | "MOVIE"
  | "BOOK"
  | "TWEET"
  | "IMAGE"
  | "GAME"
  | "SOFTWARE"
  | "MUSIC"
  | "SHOPPING"
  | "LINK";

/** Core artifact data model stored in Firestore */
export interface Artifact {
  id: string;
  title: string;
  description?: string;
  type: ArtifactType;
  imageUrl?: string;
  source: string;
  size?: "sm" | "md" | "lg" | "wide";
  url?: string;
  tags?: string[];
  createdAt?: { toMillis: () => number };
}

/** AI-classified metadata returned from the search server action */
export interface AIArtifactMetadata {
  title: string;
  description: string;
  type: ArtifactType;
  source: string;
  url?: string;
  imageUrl?: string;
  tags: string[];
  confidence: number;
}
