// proxy.ts — Clerk auth proxy for Zenith (Next.js 16)
//
// Artifact pages (/artifact/*) MUST stay public for SEO:
// Google needs to crawl them for JSON-LD, OpenGraph, and indexing.
// This proxy runs on Cloudflare Workers Edge runtime — Edge-compatible only.

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",                // Homepage
  "/artifact/(.*)",   // Artifact pages — public for SEO + JSON-LD
  "/explore(.*)",     // Explore page
  "/collections(.*)", // Collections page
  "/about(.*)",       // About page
  "/sign-in(.*)",     // Clerk sign-in
  "/sign-up(.*)",     // Clerk sign-up
]);

export default clerkMiddleware(
  async (auth, request) => {
    if (!isPublicRoute(request)) {
      await auth.protect();
    }
  },
  { publishableKey: process.env.CLERK_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY }
);

export const config = {
  matcher: [
    // Skip Next.js internals and static files unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
