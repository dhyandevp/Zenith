# Zenith

A public digital museum for the internet. Discover, explore, and share curated artifacts — movies, games, books, software, music, articles, and more — beautifully organized in one place.

Zenith uses AI to instantly classify any search query or URL, generating rich metadata, categories, and artwork previews.

## Features

- **Universal Search** — Search for anything: movies, games, books, GitHub repos, articles, music, software, or paste any URL. The AI engine classifies, describes, and categorizes it instantly.
- **Artifact Pages** — Every item gets a beautiful, dedicated page with artwork, metadata, tags, and external links.
- **Explore & Filter** — Browse the entire catalog with real-time search and type-based filtering.
- **Collections** — Browse curated collections of related artifacts.
- **Bento Grid Layout** — Responsive, dynamic card layouts with keyboard navigation.
- **Aurora Forest Design** — A premium interface with glassmorphism, fluid micro-animations, and a natural color palette.

## Technology Stack

| Category       | Technology                              |
| -------------- | --------------------------------------- |
| Framework      | Next.js 16 (App Router)                |
| Language       | TypeScript 5                            |
| Styling        | Tailwind CSS v4                         |
| Animations     | Framer Motion                           |
| Database       | Firebase Firestore (real-time, NoSQL)   |
| AI Engine      | OpenRouter API (Google Gemini 2.5 Flash)|
| Icons          | Lucide React                            |

## Folder Structure

```text
/
├── app/                       # Next.js App Router
│   ├── (public)/              # Public routes (explore, artifact, collections)
│   │   ├── artifact/[slug]/   # Individual artifact pages
│   │   ├── collections/       # Collection browsing
│   │   └── explore/           # Full catalog with search & filters
│   ├── layout.tsx             # Root layout with SEO metadata
│   ├── page.tsx               # Landing page
│   ├── sitemap.ts             # Dynamic sitemap
│   └── robots.ts              # Robots.txt config
├── components/                # Reusable React components
│   ├── cards/                 # Artifact cards
│   ├── layout/                # Navigation, Footer
│   ├── search/                # Search input & preview sheet
│   └── ui/                    # Core UI components (BentoGrid, Hero, etc.)
├── constants/                 # Shared constants (categories)
├── hooks/                     # Custom React hooks
├── lib/                       # Utilities & server actions
│   ├── actions/               # Server actions (AI search)
│   └── firebase.ts            # Firebase client SDK config
├── types/                     # TypeScript type definitions
└── public/                    # Static assets
```

## Getting Started

### Prerequisites

- Node.js 20+
- A Firebase project with Firestore enabled
- An [OpenRouter](https://openrouter.ai) API key

### Installation

```bash
git clone https://github.com/your-username/zenith.git
cd zenith
npm install
```

### Environment Variables

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env.local
```

| Variable                              | Description                         |
| ------------------------------------- | ----------------------------------- |
| `NEXT_PUBLIC_FIREBASE_API_KEY`        | Firebase client API key             |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`    | Firebase auth domain                |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID`     | Firebase project ID                 |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket             |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID  |
| `NEXT_PUBLIC_FIREBASE_APP_ID`         | Firebase app ID                     |
| `OPENROUTER_API_KEY`                  | OpenRouter API key for AI search    |
| `NEXT_PUBLIC_APP_URL`                 | Public URL (for sitemap, OG tags)   |

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build

```bash
npm run build
npm start
```

### Linting & Type Checking

```bash
npm run lint
npm run type-check
```

## Deployment

Zenith is a standard Next.js application and can be deployed to any platform that supports it:

- **Vercel** — Zero-config deployment
- **Cloudflare Pages** — Via OpenNext adapter
- **Firebase Hosting** — With `next export` or Cloud Run

Deploy Firestore rules and indexes:

```bash
npx firebase-tools deploy --only firestore
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## Developer

Developed and maintained by **Dhyandev P**

Developer Links:
- [Portfolio & Contact](https://linktr.ee/DhyandevRTX)
- [GitHub](https://github.com/DhyandevP)
- [LinkedIn](https://linkedin.com/in/DhyandevP)

## License

This project is licensed under the MIT License.
