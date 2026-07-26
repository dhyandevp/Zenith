# Zenith — Cloudflare Workers Deployment Guide

> Deploy Zenith to Cloudflare Workers using `@opennextjs/cloudflare`.

---

## Pre-deploy checklist

- [ ] `.env.local` is in `.gitignore`
- [ ] `.open-next/` is in `.gitignore`
- [ ] Clerk production instance created at [clerk.com](https://clerk.com) (separate from dev)
- [ ] Production Clerk keys obtained (`pk_live_` and `sk_live_`)
- [ ] All Firebase config values collected from [Firebase Console](https://console.firebase.google.com)
- [ ] OpenRouter API key confirmed working
- [ ] Firebase Firestore security rules deployed:
  ```bash
  firebase deploy --only firestore:rules
  ```
- [ ] `wrangler.toml` present with `name = "zenith"`
- [ ] `@opennextjs/cloudflare` and `wrangler` installed as devDependencies
- [ ] Ran `npm run preview` locally and confirmed app works

---

## Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "feat: Zenith v1.0 — Clerk auth + Cloudflare Workers deploy"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/zenith.git
git push -u origin main
```

---

## Step 2 — First-time Cloudflare login

```bash
npx wrangler login
```

This opens your browser. Select your Cloudflare account and authorize Wrangler.

---

## Step 3 — Add environment variables to Cloudflare

Go to: **Cloudflare Dashboard → Workers & Pages → zenith → Settings → Variables and Secrets**

| Variable Name | Where to get it | Type |
|---|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk Dashboard → API Keys | Plain text |
| `CLERK_SECRET_KEY` | Clerk Dashboard → API Keys | **Secret (encrypted)** |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Use `/sign-in` | Plain text |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Use `/sign-up` | Plain text |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | Use `/` | Plain text |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | Use `/` | Plain text |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Console → Project Settings | Plain text |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Console → Project Settings | Plain text |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase Console → Project Settings | Plain text |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase Console → Project Settings | Plain text |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase Console → Project Settings | Plain text |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase Console → Project Settings | Plain text |
| `OPENROUTER_API_KEY` | [openrouter.ai](https://openrouter.ai) → API Keys | **Secret (encrypted)** |

> **Important:** `NEXT_PUBLIC_` vars must be added here too — Cloudflare Workers only inject them at runtime, not build time. Unlike Vercel, there is no separate "build-time" env.

---

## Step 4 — Deploy

```bash
npm run deploy
```

This runs: `opennextjs-cloudflare build && opennextjs-cloudflare deploy`

Your live URL will be: `https://zenith.YOUR-SUBDOMAIN.workers.dev`

---

## Step 5 — Connect your domain (optional)

1. Go to **Cloudflare Dashboard → Workers & Pages → zenith → Custom Domains**
2. Click **Add**
3. Enter your domain (e.g., `zenith.app` or `museum.yourdomain.com`)
4. Cloudflare handles DNS + SSL automatically

---

## Step 6 — Update Clerk domain

1. Go to **Clerk Dashboard → Domains**
2. Add your live Cloudflare URL (e.g., `https://zenith.YOUR-SUBDOMAIN.workers.dev`)
3. If using a custom domain, add that too

> **Without this step, sign-in will fail with a domain mismatch error.**

---

## Step 7 — Post-deploy verification checklist

- [ ] Homepage loads at your Workers URL
- [ ] Sign up creates a new account
- [ ] Sign in and sign out work correctly
- [ ] `/artifact/[any-slug]` loads **without** being logged in (public for SEO)
- [ ] Submitting a new artifact requires login (redirects to `/sign-in`)
- [ ] Submitted artifact appears in Firestore console with `submittedBy` field
- [ ] OG preview is correct — test at [opengraph.xyz](https://opengraph.xyz)
- [ ] Google rich results test passes — [search.google.com/test/rich-results](https://search.google.com/test/rich-results)

---

## Troubleshooting

| Error | Fix |
|---|---|
| `nodejs_compat not enabled` | `wrangler.toml` missing `compatibility_flags = ["nodejs_compat"]` |
| `Clerk: Invalid publishable key` | You're using a `pk_test_` key in production — switch to `pk_live_` |
| `Firebase permission denied` | `firestore.rules` not deployed yet. Run `firebase deploy --only firestore:rules` |
| `500 on artifact submit` | `OPENROUTER_API_KEY` missing in Cloudflare dashboard variables |
| `Auth not working / domain mismatch` | Domain not added to Clerk dashboard (Step 6) |
| `NEXT_PUBLIC_ vars undefined at runtime` | Must add them in Cloudflare dashboard — Workers don't inline them at build time |
| `Build fails with peer dep errors` | Run `npm install --legacy-peer-deps` |
