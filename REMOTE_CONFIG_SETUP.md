# Firebase Remote Config Setup

## Overview
The compatible apps carousel is powered by Firebase Remote Config, allowing you to update the app list without deploying new code.

## Setup Instructions

### 1. Enable Remote Config in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Remote Config** in the left sidebar
4. Click **Create configuration**

### 2. Add the Compatible Apps Parameter

1. Click **Add parameter**
2. Set parameter key: `compatible_apps`
3. Set default value (JSON format):

```json
[
  { "name": "Strava", "icon": "🏃" },
  { "name": "Garmin", "icon": "⌚" },
  { "name": "Komoot", "icon": "🗺️" },
  { "name": "AllTrails", "icon": "🥾" },
  { "name": "TravelBoast", "icon": "✈️" },
  { "name": "Ride with GPS", "icon": "🚴" },
  { "name": "Wahoo", "icon": "📱" },
  { "name": "Suunto", "icon": "⌚" },
  { "name": "Polar", "icon": "💪" },
  { "name": "Coros", "icon": "🏔️" }
]
```

4. Click **Save**
5. Click **Publish changes**

### 3. Update Apps Remotely

To add or update apps:

1. Go to Firebase Console → Remote Config
2. Edit the `compatible_apps` parameter
3. Update the JSON array:
   - Add new apps: `{ "name": "App Name", "icon": "emoji" }`
   - Remove apps: Delete the object from array
   - Reorder: Change array order
4. Click **Publish changes**

**Changes will be live within 1 hour** (or immediately if you clear cache)

## JSON Format

Each app object requires:
- `name` (string): Display name of the app
- `icon` (string): Emoji icon (single emoji character)

Example:
```json
{ "name": "Strava", "icon": "🏃" }
```

## Emoji Icons

Recommended emojis for fitness/GPS apps:
- 🏃 Running
- 🚴 Cycling
- ⌚ Smartwatch
- 🗺️ Maps/Navigation
- 🥾 Hiking
- ✈️ Travel
- 📱 Mobile app
- 💪 Fitness
- 🏔️ Outdoor/Mountain
- 🚶 Walking
- 🏊 Swimming
- ⛷️ Skiing

## Fallback

If Remote Config fails to load, the app uses default apps hardcoded in `HeroCarousel.tsx`.

## Testing

To test Remote Config:
1. Update the parameter in Firebase Console
2. Wait 1 hour OR clear browser cache
3. Refresh the website
4. Verify new apps appear in carousel

## Cache Duration

Current setting: **1 hour** (3600000 milliseconds)

To change, edit `HeroCarousel.tsx`:
```typescript
remoteConfig.settings.minimumFetchIntervalMillis = 3600000; // Change this value
```
