import Converter from '@/components/Converter';
import AppCarousel from '@/components/AppCarousel';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
            Map Link → GPX Converter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Convert Google Maps and Apple Maps links to GPX files instantly.
            <br />
            <span className="font-semibold">No login. No limits. Just fast, free conversions.</span>
          </p>
        </div>

        {/* Converter */}
        <div className="mb-16 animate-slide-up">
          <Converter />
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
          <div className="text-center p-6 glass rounded-xl">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Convert routes in under 5 seconds
            </p>
          </div>

          <div className="text-center p-6 glass rounded-xl">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="text-xl font-bold mb-2">Privacy First</h3>
            <p className="text-gray-600 dark:text-gray-400">
              No login required. No data stored.
            </p>
          </div>

          <div className="text-center p-6 glass rounded-xl">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="text-xl font-bold mb-2">Always Free</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Unlimited conversions, no paywalls
            </p>
          </div>
        </div>

        {/* Compatible Apps Carousel */}
        <AppCarousel />

        {/* How It Works */}
        <div className="max-w-3xl mx-auto mt-16 mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 gradient-text">
            How it works
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full gradient-primary text-white flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Copy your map link</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  From Google Maps or Apple Maps
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full gradient-primary text-white flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Paste and convert</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Click the button and wait a few seconds
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full gradient-primary text-white flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Download your GPX</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Import into Strava, Garmin, or any GPX-compatible app
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 dark:text-gray-400 pt-12 border-t border-gray-200 dark:border-gray-700">
          <p className="mb-2">
            Made with ❤️ for cyclists, runners, and travelers
          </p>
          <p className="text-xs">
            Apple Maps routes are recreated using Google Maps and may not exactly match the original route.
          </p>
          <p className="text-xs mt-4">
            This tool uses cookies for anonymous usage tracking. No personal data is collected.
          </p>
        </footer>
      </div>
    </div>
  );
}
