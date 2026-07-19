# Zenith

Zenith is a premium, AI-powered digital curational tool designed to help you save, organize, and retrieve anything on the internet with a single click. Think of it as your intelligent second brain, beautifully designed with the "Aurora Forest" aesthetic.

## Features

- **Universal Saving:** Save links, articles, movies, books, games, repositories, and tweets.
- **AI-Powered Metadata:** Zenith uses OpenRouter AI (Google Gemini 2.5 Flash) to automatically classify your links, generate rich descriptions, and extract relevant tags instantly.
- **Collections & Favorites:** Group your artifacts into custom collections or favorite them for quick access.
- **Live Search & Filtering:** Instantly search through your entire library and filter by content type (e.g., Article, GitHub, Movie) with zero latency.
- **Premium Interface:** A stunning, responsive UI built with Tailwind v4, utilizing glassmorphism, fluid micro-animations, and dynamic bento grid layouts.

## Technology Stack

- **Framework**: Next.js 16.2 (App Router, Turbopack)
- **Styling**: Tailwind CSS v4 & Framer Motion
- **Authentication**: Clerk
- **Database**: Firebase Firestore (NoSQL, Real-time)
- **Intelligence**: OpenRouter API
- **Deployment**: Firebase Hosting / Cloudflare (via OpenNext)

## Folder Structure

```text
/
├── app/                  # Next.js App Router (Pages, Layouts, API Routes)
├── components/           # Reusable React components
│   ├── cards/            # Artifact cards and skeletons
│   ├── layout/           # Sidebar, Navigation, Footer
│   ├── modals/           # Popovers and dialogs (Edit, Context, Create)
│   ├── search/           # Intelligent search bar and previews
│   └── ui/               # Core atomic UI components
├── lib/                  # Utility functions, Server Actions, Firebase init
├── public/               # Static assets
└── styles/               # Global CSS
```

## Running Locally

### 1. Prerequisites
- Node.js 20+
- A Firebase Project (with Firestore enabled)
- A Clerk Account
- An OpenRouter Account (for AI extraction)

### 2. Environment Variables
Copy `.env.example` to `.env.local` and populate it with your credentials:

```bash
cp .env.example .env.local
```

### 3. Installation
Install the dependencies:

```bash
npm install
```

### 4. Development Server
Start the Turbopack development server:

```bash
npm run dev
```
Navigate to `http://localhost:3000` to view the application.

## Deployment

Zenith is fully optimized for production deployment on Firebase.

1. Ensure your `.firebaserc` is pointing to the correct project.
2. Deploy your strict Firestore rules and indexing schema:
```bash
npx firebase-tools deploy --only firestore
```
3. Build and deploy your Next.js application using your preferred CI/CD or hosting provider (e.g., Cloudflare Pages with OpenNext, or Vercel).

## License

This project is licensed under the MIT License.
