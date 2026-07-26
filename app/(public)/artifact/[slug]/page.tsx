import { Metadata } from "next";
import { ArtifactDetailClient } from "./ArtifactDetailClient";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Artifact } from "@/types/artifact";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getArtifact(slug: string): Promise<Artifact | null> {
  try {
    const docRef = doc(db, "artifacts", slug);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Artifact;
    }
  } catch (error) {
    console.error("Error fetching artifact", error);
  }
  return null;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const artifact = await getArtifact(slug);

  if (!artifact) {
    return {
      title: "Artifact Not Found | Zenith",
      description: "This artifact could not be found.",
    };
  }

  const title = `${artifact.title}: Reviews, Alternatives & Summary | Zenith`;
  const description = artifact.description || `Explore ${artifact.title} on Zenith — the public digital museum.`;
  const url = `https://zenith.app/artifact/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url,
      images: artifact.imageUrl ? [{ url: artifact.imageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: artifact.imageUrl ? [artifact.imageUrl] : undefined,
    },
  };
}

export default async function ArtifactPage({ params }: PageProps) {
  const { slug } = await params;
  const artifact = await getArtifact(slug);
  
  if (!artifact) {
    return <ArtifactDetailClient artifactId={slug} />;
  }

  const schemaType = artifact.type === "SOFTWARE" || artifact.type === "GITHUB" 
    ? "SoftwareApplication" 
    : "Product";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: artifact.title,
    description: artifact.description,
    url: artifact.url || `https://zenith.app/artifact/${slug}`,
    image: artifact.imageUrl,
    applicationCategory: schemaType === "SoftwareApplication" ? "DeveloperApplication" : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtifactDetailClient artifactId={slug} initialArtifact={artifact} />
    </>
  );
}
