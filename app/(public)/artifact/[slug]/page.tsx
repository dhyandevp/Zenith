import { Metadata } from "next";
import { ArtifactDetailClient } from "./ArtifactDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  // Attempt to fetch artifact data for dynamic metadata
  // In production, this would fetch from Firestore server-side
  return {
    title: `Artifact | Zenith`,
    description: `View this curated artifact on Zenith — the public digital museum.`,
    openGraph: {
      title: `Artifact | Zenith`,
      description: `View this curated artifact on Zenith — the public digital museum.`,
      type: "article",
      url: `https://zenith.app/artifact/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `Artifact | Zenith`,
      description: `View this curated artifact on Zenith — the public digital museum.`,
    },
  };
}

export default async function ArtifactPage({ params }: PageProps) {
  const { slug } = await params;

  return <ArtifactDetailClient artifactId={slug} />;
}
