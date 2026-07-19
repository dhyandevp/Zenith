# Zenith (v2.0)

> "Save anything. Zenith remembers everything."

Zenith is a premium, AI-powered digital curational platform. It uses the visual metaphor of a museum exhibit for all your saved artifacts, combined with cutting-edge AI for universal capture and semantic search.

Built on the **Aurora Forest** design language (deep greens, vibrant aquamarines, and rich silvers), Zenith achieves a completely unbranded, immersive interface that disappears behind your content.

## Features
- **Universal Capture:** Paste a URL, and Zenith's AI automatically extracts metadata, tags, and category, and retrieves high-quality artwork.
- **Museum Dashboard:** View all your artifacts in an immersive, responsive Bento Grid.
- **Deep Interactivity:** Hover states, Quick Actions, and Context Menus allow you to easily Favorite, Open, or Delete artifacts.
- **Power User Ready:** Full keyboard navigation (`Arrow Keys`, `Enter`, `F`, `Delete`).
- **Realtime Sync:** Powered by Firebase Firestore, your Dashboard updates instantly across all devices.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4, Framer Motion
- **Authentication:** Clerk
- **Database:** Firebase Firestore
- **AI Engine:** OpenRouter (Google Gemini Flash)
- **Icons:** Lucide React

## Local Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env.local` file:
```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# OpenRouter (AI Metadata & Search)
OPENROUTER_API_KEY=sk-or-v1-...
```

### 3. Run Development Server
```bash
npm run dev
```

## Production Build
Zenith requires strict typing and zero ESLint errors to build.
```bash
npm run build
```

## License
MIT
