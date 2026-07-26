import type { MetadataRoute } from "next";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://zenith.app";
const PAGE_SIZE = 10000; // Limit per sitemap chunk

export async function generateSitemaps() {
  // For a massive database, you would determine the total count here and generate multiple IDs.
  // We'll start with 1 chunk for the initial programmatic batch.
  return [{ id: 0 }];
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/explore`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/collections`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];

  const routes: MetadataRoute.Sitemap = id === 0 ? [...staticRoutes] : [];

  try {
    const artifactsRef = collection(db, "artifacts");
    const q = query(artifactsRef, limit(PAGE_SIZE));
    const snapshot = await getDocs(q);

    snapshot.forEach((doc) => {
      const data = doc.data();
      routes.push({
        url: `${BASE_URL}/artifact/${doc.id}`,
        lastModified: data.createdAt?.toMillis()
          ? new Date(data.createdAt.toMillis())
          : new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    });
  } catch (error) {
    console.error("Error generating sitemap for artifacts", error);
  }

  return routes;
}
