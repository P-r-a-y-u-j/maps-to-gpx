import Converter from '@/components/Converter';
import AppCarousel from '@/components/AppCarousel';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

      <div className="relative container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30">
            <span className="text-sm font-medium text-blue-300">✨ Free Forever • No Login Required</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Map Link → GPX
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-4">
            Convert Google Maps and Apple Maps links to GPX files in seconds
          </p>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Perfect for Strava, Garmin, Komoot, and all GPS devices
          </p>
        </div>

        {/* Converter - Main Focus */}
        <div className="mb-20 animate-slide-up">
          <Converter />
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-20 max-w-5xl mx-auto">
          <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">⚡</div>
            <h3 className="text-xl font-bold mb-2 text-white">Lightning Fast</h3>
            <p className="text-gray-400">
              Convert routes in under 5 seconds with our optimized pipeline
            </p>
          </div>

          <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🔒</div>
            <h3 className="text-xl font-bold mb-2 text-white">Privacy First</h3>
            <p className="text-gray-400">
              No login, no tracking, no data storage. Your privacy matters.
            </p>
          </div>

          <div className="group p-8 rounded-2xl bg-gradient-to-br from-pink-500/10 to-orange-500/10 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 hover:scale-105">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🎯</div>
            <h3 className="text-xl font-bold mb-2 text-white">Always Free</h3>
            <p className="text-gray-400">
              Unlimited conversions, forever. No hidden fees or paywalls.
            </p>
          </div>
        </div>

        {/* Compatible Apps */}
        <AppCarousel />

        {/* How It Works */}
        <div className="max-w-3xl mx-auto mt-20 mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            How it works
          </h2>

          <div className="space-y-8">
            <div className="flex gap-6 items-start group">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                1
              </div>
              <div className="flex-1 pt-2">
                <h3 className="font-bold text-xl mb-2 text-white">Copy your map link</h3>
                <p className="text-gray-400">
                  Open Google Maps or Apple Maps, share your route, and copy the link
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start group">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                2
              </div>
              <div className="flex-1 pt-2">
                <h3 className="font-bold text-xl mb-2 text-white">Paste and convert</h3>
                <p className="text-gray-400">
                  Paste the link above and click "Convert to GPX" - it takes just seconds
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start group">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 text-white flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                3
              </div>
              <div className="flex-1 pt-2">
                <h3 className="font-bold text-xl mb-2 text-white">Download and use</h3>
                <p className="text-gray-400">
                  Import the GPX file into Strava, Garmin, Komoot, or any GPS device
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 pt-16 border-t border-gray-800">
          <p className="mb-3 text-gray-400">
            Made with ❤️ for cyclists, runners, and travelers
          </p>
          <p className="text-xs text-gray-600 mb-2">
            Apple Maps routes are recreated and may not exactly match the original route.
          </p>
          <p className="text-xs text-gray-600">
            This tool uses cookies for anonymous usage tracking. No personal data is collected.
          </p>
        </footer>
      </div>
    </div>
  );
}
