"use server";

import { auth } from "@clerk/nextjs/server";
import { ArtifactType } from "@/components/cards/ArtifactCard";

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

export async function searchWithAI(query: string): Promise<AIArtifactMetadata> {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OpenRouter API key is missing. Please add it to your environment variables.");
  }

  const systemPrompt = `You are the Zenith intelligence engine.
Your task is to classify a user's search query into an artifact.
The query could be a URL (e.g., https://github.com/vercel/next.js) or a natural language string (e.g., "Interstellar", "React", "The Last of Us").

Analyze the query and return ONLY a strict JSON object with the following schema, with no markdown formatting or extra text:
{
  "title": "Clean, official title",
  "description": "A concise 1-2 sentence description",
  "type": "Must be one of: ARTICLE, GITHUB, MOVIE, BOOK, TWEET, IMAGE, GAME, SOFTWARE, MUSIC",
  "source": "Platform or Author (e.g., 'GitHub', 'Christopher Nolan', 'Naughty Dog')",
  "url": "Official URL if known, else null",
  "imageUrl": "A direct URL to a high-quality poster or thumbnail if known (or null)",
  "tags": ["Array", "of", "3-5", "relevant", "tags"],
  "confidence": A number from 0 to 1 indicating your confidence in this classification
}
CRITICAL: Do not invent metadata if you are unsure. Favor precision over hallucination.`;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000", 
        "X-Title": "Zenith",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash", // Fast, highly capable free/cheap model on OpenRouter
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Query: ${query}` }
        ],
        response_format: { type: "json_object" },
        max_tokens: 1500 // Limit tokens to prevent 402 Payment Required errors on free accounts
      }),
    });

    if (!response.ok) {
      console.error("OpenRouter API error:", await response.text());
      throw new Error(`Failed to fetch AI classification: ${response.statusText}`);
    }

    const data = await response.json();
    let content = data.choices[0].message.content;
    
    // Sometimes models wrap in markdown ```json
    if (content.startsWith("```json")) {
      content = content.replace(/```json\n?/, "").replace(/```$/, "");
    }

    const parsed: AIArtifactMetadata = JSON.parse(content);
    
    // Ensure fallback type if AI invents one
    const validTypes = ["ARTICLE", "GITHUB", "MOVIE", "BOOK", "TWEET", "IMAGE", "GAME", "SOFTWARE", "MUSIC"];
    if (!validTypes.includes(parsed.type)) {
      parsed.type = "ARTICLE";
    }

    return parsed;

  } catch (error) {
    console.error("Error in searchWithAI:", error);
    throw new Error("Failed to process intelligent search");
  }
}
