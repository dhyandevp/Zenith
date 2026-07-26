"use server";

import type { AIArtifactMetadata } from "@/types/artifact";
import { VALID_TYPES } from "@/constants/categories";
import * as cheerio from "cheerio";

import { auth } from "@clerk/nextjs/server";

// Utility to fetch and extract OpenGraph metadata from a URL
async function fetchOpenGraphData(url: string) {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      },
      signal: AbortSignal.timeout(2000), // 2 second timeout to keep UI snappy
    });

    if (!response.ok) return null;

    const html = await response.text();
    const $ = cheerio.load(html);

    const getMeta = (property: string) => 
      $(`meta[property='${property}']`).attr("content") || 
      $(`meta[name='${property}']`).attr("content") || 
      null;

    const ogImage = getMeta("og:image") || getMeta("twitter:image");
    const ogTitle = getMeta("og:title") || getMeta("twitter:title") || $("title").text();
    const ogDescription = getMeta("og:description") || getMeta("twitter:description") || getMeta("description");

    return {
      title: ogTitle,
      description: ogDescription,
      imageUrl: ogImage?.startsWith("/") ? new URL(ogImage, url).toString() : ogImage,
    };
  } catch (error) {
    console.warn(`Failed to fetch OpenGraph data for ${url}:`, error);
    return null;
  }
}

export async function searchWithAI(query: string): Promise<AIArtifactMetadata> {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Sign in to add artifacts to Zenith');
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OpenRouter API key is missing. Please add OPENROUTER_API_KEY to your environment variables."
    );
  }

  const systemPrompt = `You are the Zenith intelligence engine.
Your task is to classify a user's search query into an artifact.
The query could be a URL or a natural language string (e.g., "Lovable", "Interstellar", "React").

Analyze the query and return ONLY a strict JSON object with the following schema, with no markdown formatting or extra text:
{
  "title": "Clean, official title",
  "description": "A concise 2-5 sentence description summarizing verified information. Do not invent facts.",
  "type": "Must be one of: ARTICLE, GITHUB, MOVIE, BOOK, TWEET, IMAGE, GAME, SOFTWARE, MUSIC, SHOPPING, LINK",
  "source": "Platform, Creator, or Company (e.g., 'Christopher Nolan', 'Naughty Dog', 'Vercel')",
  "url": "The most authoritative official URL for this entity (CRITICAL: this will be scraped for images/metadata. Use Wikipedia, IMDB, Steam, or official sites if exact is unknown). Use null only if impossible to find.",
  "imageUrl": "A direct URL to a high-quality logo or cover image (use only if highly confident, otherwise null)",
  "tags": ["Array", "of", "3-5", "relevant", "tags"],
  "confidence": A number from 0 to 1 indicating your confidence
}
CRITICAL: Do not invent metadata. Favor precision over hallucination. Prioritize official websites for the URL.`;

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "X-Title": "Zenith",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Query: ${query}` },
        ],
        response_format: { type: "json_object" },
        max_tokens: 1500,
      }),
    }
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`AI classification failed (${response.status}): ${body}`);
  }

  const data = await response.json();
  let content: string = data.choices[0].message.content;

  // Strip markdown fencing if present
  if (content.startsWith("```json")) {
    content = content.replace(/```json\n?/, "").replace(/```$/, "");
  }

  const parsed: AIArtifactMetadata = JSON.parse(content);

  // Validate type — fall back to ARTICLE if the model invents one
  if (!VALID_TYPES.has(parsed.type)) {
    parsed.type = "ARTICLE";
  }

  // ENRICHMENT PHASE: If AI provided a URL, scrape it for authoritative metadata & images
  if (parsed.url) {
    const ogData = await fetchOpenGraphData(parsed.url);
    if (ogData) {
      // Prioritize scraped high-quality images and official descriptions
      parsed.imageUrl = ogData.imageUrl || parsed.imageUrl;
      
      // Only override description/title if the scraped ones are substantial
      if (ogData.description && ogData.description.length > 20) {
        parsed.description = ogData.description;
      }
      
      if (ogData.title && ogData.title.length > 2 && parsed.confidence < 0.8) {
        // If AI wasn't very confident, trust the official site's title
        parsed.title = ogData.title;
      }
    }
  }

  // Attach auth metadata for Firestore writes
  return {
    ...parsed,
    submittedBy: userId,
    submittedAt: new Date().toISOString(),
  };
}

export async function saveArtifact(slug: string, artifact: AIArtifactMetadata) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Sign in to save artifacts to Zenith');
  }

  const { setDocument } = await import("@/lib/firestore-rest");

  try {
    await setDocument("artifacts", slug, {
      title: artifact.title,
      description: artifact.description,
      type: artifact.type,
      source: artifact.source,
      url: artifact.url || null,
      imageUrl: artifact.imageUrl || null,
      tags: artifact.tags,
      confidence: artifact.confidence,
      submittedBy: userId,
      submittedAt: artifact.submittedAt || new Date().toISOString(),
      createdAt: new Date(),
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to save artifact:", error);
    throw new Error("Failed to save artifact to Firestore");
  }
}

