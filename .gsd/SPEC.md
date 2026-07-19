# SPEC.md — Project Specification

> **Status**: `FINALIZED`

## Vision
Zenith is an intelligent digital memory platform that automatically transforms internet content into a searchable, visually curated library (a "Digital Museum").

## Goals
1. **Universal Capture & Intelligent Recognition:** Automatically fetch metadata, artwork, and categories for URLs.
2. **Beautiful Visual Library:** Display content in a responsive, non-uniform Bento Grid showcasing large artwork and minimal chrome.
3. **High Performance & Quality:** Fast navigation, <2s load times, WCAG AA accessibility, and perfect scores in Lighthouse.
4. **Aurora Forest Design:** Implement the quiet luxury of the Aurora Forest design language. No generic templates, no pure black.

## Non-Goals (Out of Scope)
- Manual organization as the primary method (e.g., manual folders/tagging).
- Social networking features.
- Admin dashboards or corporate aesthetics.
- Quick MVP/prototype (must be production-quality).

## Users
Students, Developers, Designers, Gamers, Movie/Music Enthusiasts, and Shoppers seeking a beautiful, automated visual bookmarking solution.

## Constraints
- **Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion.
- **Backend:** Firebase (Firestore, Storage) + Clerk Auth.
- **Design:** Strict compliance with Aurora Forest Design System (DDS).
- **Process:** All major UI must originate from Stitch MCP.

## Success Criteria
- [ ] Paste a URL -> Analyzed, categorized, fetched artwork, added to grid smoothly.
- [ ] Lighthouse scores >= 95 for Performance, Accessibility, Best Practices.
- [ ] Metadata accuracy > 95%.
- [ ] Instant-feeling search and real-time sync.
