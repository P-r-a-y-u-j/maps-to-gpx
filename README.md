# Map Link → GPX Converter

Convert Google Maps and Apple Maps links to GPX files instantly. No login required. Free, fast, and privacy-friendly.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Google Maps API key (with Directions API enabled)
- Firebase project with Firestore

### Installation

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Add your API keys to .env.local
# Then run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🔑 Environment Setup

### 1. Mapbox Access Token

1. Go to [mapbox.com](https://www.mapbox.com/)
2. Sign up for a free account (100,000 requests/month free)
3. Go to your [Account Dashboard](https://account.mapbox.com/)
4. Copy your **Default Public Token** (starts with `pk.`)
5. Add to `.env.local`:
   ```
   MAPBOX_ACCESS_TOKEN=pk.your_token_here
   ```

### 3. Firebase Remote Config (Optional - for dynamic app list)

The compatible apps carousel can be managed via Firebase Remote Config:

1. See [REMOTE_CONFIG_SETUP.md](./REMOTE_CONFIG_SETUP.md) for detailed instructions
2. If not configured, the app uses default hardcoded apps

### 2. Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Add a web app
4. Enable Firestore Database
5. Copy config values to `.env.local`

**Firestore Security Rules:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /usage/{anonId} {
      allow read, write: if true;
    }
  }
}
```

### 3. Buy Me a Coffee

Update your username in `components/SupportPrompt.tsx`:
```typescript
href="https://www.buymeacoffee.com/YOUR_USERNAME"
```

## 📦 Features

- ✅ **Google Maps Support** - Full support with waypoints
- ✅ **Apple Maps Support** - Start and end locations
- ✅ **No Login Required** - Anonymous cookie-based tracking
- ✅ **Privacy First** - No personal data collected
- ✅ **Always Free** - Unlimited conversions
- ✅ **Fast** - Converts in under 5 seconds
- ✅ **GPX 1.1 Format** - Compatible with Strava, Garmin, etc.

## 🎨 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **API**: Mapbox Directions & Geocoding APIs
- **Hosting**: Vercel (recommended)

## 📤 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables
vercel env add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
# ... add all other env vars

# Deploy to production
vercel --prod
```

Or use the [Vercel Dashboard](https://vercel.com) to import from GitHub.

## 🧪 Testing

Test with these URLs:

**Google Maps:**
```
https://www.google.com/maps/dir/New+York,+NY/Boston,+MA/
```

**Apple Maps:**
```
https://maps.apple.com/?saddr=San+Francisco&daddr=Los+Angeles
```

## 📝 License

MIT

## 🙏 Acknowledgments

Built with ❤️ for cyclists, runners, and travelers.

---

**Note**: Apple Maps routes are recreated using Google Maps and may not exactly match the original route.
