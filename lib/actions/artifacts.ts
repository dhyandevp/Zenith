"use server";

import * as cheerio from "cheerio";

export type ArtifactType = "ARTICLE" | "GITHUB" | "MOVIE" | "BOOK" | "TWEET" | "IMAGE" | "GAME" | "SOFTWARE" | "MUSIC";

export interface ScrapedMetadata {
  title: string;
  description: string;
  imageUrl: string | null;
  type: ArtifactType;
  source: string;
  url: string;
}

export async function scrapeMetadata(url: string): Promise<ScrapedMetadata> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "ZenithBot/1.0",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Basic extraction
    const title = $('meta[property="og:title"]').attr('content') || $('title').text() || "Untitled";
    const description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || "";
    let imageUrl = $('meta[property="og:image"]').attr('content') || $('meta[name="twitter:image"]').attr('content') || null;

    if (imageUrl && imageUrl.startsWith('/')) {
      const urlObj = new URL(url);
      imageUrl = `${urlObj.protocol}//${urlObj.host}${imageUrl}`;
    }

    // Determine Source and Type
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.replace("www.", "");
    
    let type: ArtifactType = "ARTICLE";
    let source = hostname;

    if (hostname.includes("github.com")) {
      type = "GITHUB";
      source = "GitHub";
    } else if (hostname.includes("imdb.com") || hostname.includes("letterboxd.com")) {
      type = "MOVIE";
      source = hostname.includes("imdb") ? "IMDb" : "Letterboxd";
    } else if (hostname.includes("goodreads.com") || hostname.includes("amazon.")) {
      type = "BOOK";
      source = hostname.includes("goodreads") ? "Goodreads" : "Amazon";
    } else if (hostname.includes("twitter.com") || hostname.includes("x.com")) {
      type = "TWEET";
      source = "X / Twitter";
    } else if (hostname.includes("dribbble.com") || hostname.includes("pinterest.com") || imageUrl?.endsWith('.png') || imageUrl?.endsWith('.jpg')) {
      // Very naive image detection
      type = "IMAGE";
    }

    return {
      title,
      description,
      imageUrl,
      type,
      source,
      url
    };
  } catch (error) {
    console.error("Error scraping metadata:", error);
    throw new Error("Failed to scrape metadata");
  }
}
