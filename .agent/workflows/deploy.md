---
description: Deploy to Vercel
---

# Deployment Workflow

## Prerequisites Checklist

- [ ] Google Maps API key obtained and Directions API enabled
- [ ] Firebase project created with Firestore enabled
- [ ] Firestore security rules configured
- [ ] Buy Me a Coffee username updated in `components/SupportPrompt.tsx`
- [ ] All environment variables ready

## Step 1: Configure Environment Variables

Create `.env.local` in project root:

```bash
cp .env.example .env.local
```

Fill in all values:
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

## Step 2: Test Locally

// turbo
```bash
npm run dev
```

Visit http://localhost:3000 and test:
1. Paste a Google Maps URL
2. Click "Convert to GPX"
3. Verify GPX file downloads
4. Test Apple Maps URL
5. Verify warning appears

## Step 3: Build for Production

```bash
npm run build
```

Verify no build errors.

## Step 4: Deploy to Vercel

### Option A: Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (first time)
vercel

# Add environment variables
vercel env add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID
vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
vercel env add NEXT_PUBLIC_FIREBASE_APP_ID

# Deploy to production
vercel --prod
```

### Option B: Vercel Dashboard

1. Push code to GitHub
2. Go to https://vercel.com/new
3. Import your repository
4. Add environment variables in project settings
5. Click "Deploy"

## Step 5: Post-Deployment Verification

- [ ] Visit production URL
- [ ] Test Google Maps conversion
- [ ] Test Apple Maps conversion
- [ ] Verify support prompt appears after 3 conversions
- [ ] Check Firebase usage tracking in Firestore console
- [ ] Test GPX file in Strava or Garmin Connect

## Step 6: Monitor

- Check Vercel Analytics for traffic
- Monitor Firebase Firestore for usage data
- Track Google Maps API usage in Cloud Console
- Monitor conversion success rate

## Troubleshooting

### Build Fails
- Check all environment variables are set
- Verify Firebase config is correct
- Check for TypeScript errors

### API Errors
- Verify Google Maps API key is valid
- Check Directions API is enabled
- Verify API key restrictions allow your domain

### Firebase Errors
- Check Firestore security rules
- Verify Firebase config values
- Check Firebase project is active

## Custom Domain (Optional)

In Vercel dashboard:
1. Go to project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
