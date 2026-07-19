Zenith
Architecture Decision Records

Version: 1.0

ADR-001: Frontend Framework

Status: Accepted

Decision

Use Next.js 15 (App Router) as the frontend framework.

Context

Zenith requires:

Excellent SEO
Server-side rendering
Streaming
Server Components
Fast navigation
Edge deployment
Decision Drivers
React ecosystem
Excellent Vercel support
App Router
Server Components
TypeScript-first
Performance
Alternatives Considered
Remix
Astro
SvelteKit
Consequences

Pros

Excellent developer experience
Great SEO
Fast rendering
Mature ecosystem

Cons

More complex routing than traditional React
ADR-002: Authentication

Status: Accepted

Decision

Use Clerk as the authentication provider.

Context

Zenith requires:

Secure authentication
Social login
Email/password
Session management
MFA support
User profile management

Building authentication from scratch would significantly increase development complexity and security risk.

Why Clerk?
Enterprise-grade authentication
Simple React & Next.js integration
Supports Google, GitHub, Apple, Discord, and email/password
Built-in session management
Multi-factor authentication
User profile management
Organization support for future team features
Webhooks for backend synchronization
Alternatives Considered
Firebase Authentication

Pros

Integrated with Firebase

Cons

Less polished UI
Requires more customization
Session handling in Next.js is more involved
Auth.js (NextAuth)

Pros

Open source
Highly customizable

Cons

More configuration
More maintenance
Smaller feature set out of the box
Supabase Auth

Pros

Open source
Integrated database

Cons

Would require replacing Firebase
Consequences

Pros

Secure authentication
Less authentication code
Faster development
Professional user experience

Cons

Vendor dependency
Monthly cost at scale
ADR-003: Backend Platform

Status: Accepted

Decision

Use Firebase as the backend platform.

Context

Zenith stores user libraries, collections, metadata, and preferences.

The application needs:

Real-time synchronization
Scalable database
Serverless infrastructure
Easy deployment
Cloud storage
Analytics
Firebase Services
Firestore
Cloud Storage
Cloud Functions (future)
Firebase Analytics (future)
Firebase App Check
Firebase Hosting (optional)
Why Firebase?
Fully managed backend
Automatic scaling
Excellent SDKs
Real-time updates
Minimal backend maintenance
Strong integration with web and mobile
Alternatives Considered
Supabase

Pros

PostgreSQL
SQL queries
Open source

Cons

Less mature real-time capabilities for this use case
PostgreSQL + Prisma

Pros

Full SQL power
Strong relational modeling

Cons

Requires infrastructure management
Slower initial development
MongoDB Atlas

Pros

Flexible schema

Cons

More operational complexity
No built-in ecosystem like Firebase
Consequences

Pros

Rapid development
Automatic scaling
Minimal DevOps
Real-time capabilities

Cons

Vendor lock-in
Firestore query limitations
Cost optimization needed for very large datasets
ADR-004: Database

Status: Accepted

Decision

Use Cloud Firestore as the primary database.

Collections
users
items
collections
categories
tags
preferences
activity
Why Firestore?
NoSQL document model fits user libraries
Real-time listeners
Offline support
Automatic scaling
Flexible schema evolution
Trade-offs

Pros

Fast reads
Offline-first
Simple client SDK

Cons

No joins
Denormalization required
Query constraints
ADR-005: File Storage

Status: Accepted

Decision

Use Firebase Cloud Storage.

Stored Assets
Cover images
User avatars
Collection covers
Cached thumbnails
Benefits
Secure access rules
CDN-backed delivery
Easy integration with Firestore
Scalable storage
ADR-006: Design System

Status: Accepted

Decision

Adopt the Aurora Forest design language as Zenith's official design system.

Principles
Quiet luxury
Editorial layouts
Frosted surfaces
Organic color palette
Soft ambient lighting
Minimal chrome
Content-first UI
Outcome

Zenith should be visually recognizable from a single screenshot.

ADR-007: State Management

Status: Accepted

Decision

Use:

React Context for global UI state
TanStack Query for server state
Local component state for UI interactions
Alternatives
Redux Toolkit
Zustand
MobX
Why?
Keeps architecture simple
Excellent caching
Optimistic updates
Works well with Firebase
ADR-008: Search

Status: Planned

Decision

Start with Firestore queries and client-side filtering.

Future upgrade:

Algolia
Typesense
Meilisearch
Reason

Avoid unnecessary complexity until search requirements grow.

ADR-009: Motion & Animation

Status: Accepted

Decision

Use Framer Motion for all interface animations.

Principles
Motion communicates hierarchy
Smooth transitions
No decorative animations
Respect reduced-motion preferences
ADR-010: Deployment

Status: Accepted

Frontend
Vercel
Backend
Firebase
CI/CD
GitHub Actions
Benefits
Automatic deployments
Preview environments
Scalable infrastructure
Technology Stack Summary
Layer	Technology
Frontend	Next.js 15 + React 19
Language	TypeScript
Styling	Tailwind CSS
UI Components	shadcn/ui
Animation	Framer Motion
Authentication	Clerk
Database	Cloud Firestore
File Storage	Firebase Cloud Storage
Backend	Firebase
State Management	React Context + TanStack Query
Forms	React Hook Form + Zod
Deployment	Vercel + Firebase
Analytics (Future)	Firebase Analytics
Error Monitoring (Future)	Sentry
Future ADRs

As Zenith evolves, add new ADRs for major architectural decisions, such as:

ADR-011: AI Metadata Pipeline (e.g., Gemini, OpenAI, or custom models)
ADR-012: Browser Extension Architecture (Chrome, Firefox, Safari)
ADR-013: Mobile Apps (React Native vs. Flutter vs. native)
ADR-014: Offline Synchronization Strategy
ADR-015: Real-time Collaboration & Shared Collections

Keeping ADRs concise (typically 1–2 pages each) and creating a new one only for significant decisions will make the architecture history much easier to maintain.