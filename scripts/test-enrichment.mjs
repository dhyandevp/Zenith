import * as cheerio from "cheerio";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// Load .env.local manually
function loadEnv() {
  const envPath = resolve(ROOT, ".env.local");
  const content = readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    let value = trimmed.slice(eqIdx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}
loadEnv();

async function fetchOpenGraphData(url) {
  console.log(`\n[2] Fetching authoritative URL: ${url}`);
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      },
      signal: AbortSignal.timeout(4000),
    });

    if (!response.ok) {
      console.log(`    ❌ Failed to fetch URL. Status: ${response.status}`);
      return null;
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const getMeta = (property) => 
      $(`meta[property='${property}']`).attr("content") || 
      $(`meta[name='${property}']`).attr("content") || 
      null;

    const ogImage = getMeta("og:image") || getMeta("twitter:image");
    const ogTitle = getMeta("og:title") || getMeta("twitter:title") || $("title").text();
    const ogDescription = getMeta("og:description") || getMeta("twitter:description") || getMeta("description");

    console.log(`    ✅ Successfully scraped OpenGraph data!`);
    return {
      title: ogTitle,
      description: ogDescription,
      imageUrl: ogImage?.startsWith("/") ? new URL(ogImage, url).toString() : ogImage,
    };
  } catch (error) {
    console.warn(`    ❌ Error fetching OpenGraph data:`, error.message);
    return null;
  }
}

async function testSearch(query) {
  console.log(`\n======================================================`);
  console.log(`[1] AI Classification Phase for query: "${query}"`);
  
  const apiKey = process.env.OPENROUTER_API_KEY;
  const systemPrompt = `You are the Zenith intelligence engine.
Your task is to classify a user's search query into an artifact.
The query could be a URL or a natural language string.

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

  const data = await response.json();
  let content = data.choices[0].message.content;
  if (content.startsWith("\`\`\`json")) {
    content = content.replace(/\`\`\`json\n?/, "").replace(/\`\`\`$/, "");
  }

  const parsed = JSON.parse(content);
  console.log(`    🤖 AI Output (Before Enrichment):`);
  console.log(JSON.stringify(parsed, null, 2));

  if (parsed.url) {
    const ogData = await fetchOpenGraphData(parsed.url);
    if (ogData) {
      console.log(`\n[3] Enrichment Phase Merge:`);
      console.log(`    🖼️  OG Image: ${ogData.imageUrl || 'None'}`);
      console.log(`    📝  OG Description: ${ogData.description ? ogData.description.substring(0, 100) + '...' : 'None'}`);
      
      parsed.imageUrl = ogData.imageUrl || parsed.imageUrl;
      if (ogData.description && ogData.description.length > 20) {
        parsed.description = ogData.description;
      }
      if (ogData.title && ogData.title.length > 2 && parsed.confidence < 0.8) {
        parsed.title = ogData.title;
      }
    }
  }

  console.log(`\n[4] 🎯 FINAL ENRICHED ARTIFACT:`);
  console.log(JSON.stringify(parsed, null, 2));
  console.log(`======================================================\n`);
}

async function runTests() {
  await testSearch("Lovable");
  await testSearch("Inception movie");
}

runTests();
