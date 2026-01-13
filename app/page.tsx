import Converter from '@/components/Converter';
import HeroCarousel from '@/components/HeroCarousel';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Logo Only - No Nav */}
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">G</span>
          </div>
          <span className="font-bold text-2xl text-gray-900">GPX Converter</span>
        </div>
      </div>

      {/* Hero Section - Side by Side with Carousel */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Free • No Login • Privacy First</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Turn map links into<br />
                <span className="text-blue-600">GPX files</span> instantly
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Convert Google Maps and Apple Maps directions to GPX format in seconds.
                Perfect for Strava, Garmin, Komoot, and all GPS devices.
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-col gap-3 mb-8">
                <div className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>No signup required</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Unlimited conversions</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>100% free forever</span>
                </div>
              </div>

              {/* Secondary CTA - Support */}
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span>Love this tool?</span>
                <a
                  href="https://www.buymeacoffee.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-900 rounded-lg font-medium transition-colors"
                >
                  <span>☕</span>
                  <span>Buy me a coffee</span>
                </a>
              </div>
            </div>

            {/* Right: Converter */}
            <div>
              <Converter />

              {/* App Carousel - Below Converter */}
              <div className="mt-8">
                <p className="text-sm font-semibold text-gray-700 mb-4 text-center">Works seamlessly with:</p>
                <div className="flex justify-center">
                  <HeroCarousel />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Works With Your Favorite Apps */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Works with your favorite apps
            </h2>
            <p className="text-lg text-gray-600">
              Import your GPX files into any GPS-compatible application
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { name: 'Strava', icon: '🏃' },
              { name: 'Garmin', icon: '⌚' },
              { name: 'Komoot', icon: '🗺️' },
              { name: 'AllTrails', icon: '🥾' },
              { name: 'TravelBoast', icon: '✈️' },
            ].map((app) => (
              <div key={app.name} className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                <div className="text-4xl mb-3">{app.icon}</div>
                <div className="font-semibold text-gray-900">{app.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-lg text-gray-600">
              Three simple steps to get your GPX file
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold text-xl mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Copy your route link
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Open Google Maps or Apple Maps, create or find your route, and copy the share link
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold text-xl mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Paste and convert
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Paste the link in the converter above and click the button. Conversion takes just a few seconds
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold text-xl mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Use your GPX file
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Download automatically starts. Import the GPX file into your favorite fitness or navigation app
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why choose GPX Converter?
            </h2>
            <p className="text-lg text-gray-600">
              Built with privacy, speed, and simplicity in mind
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Optimized conversion pipeline processes routes in under 5 seconds
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Privacy First</h3>
              <p className="text-gray-600">
                No account needed. No tracking. Your routes are never stored on our servers
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Always Free</h3>
              <p className="text-gray-600">
                Unlimited conversions with no hidden fees, paywalls, or premium tiers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            About this tool
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            GPX Converter was built for cyclists, runners, hikers, and travelers who need a simple way to
            export routes from popular mapping services. We believe in keeping things simple, fast, and
            accessible to everyone—no account required, no data collected, just pure functionality.
          </p>
          <p className="text-gray-600 leading-relaxed">
            This is a passion project maintained by developers who love the outdoors. If you find it useful,
            consider supporting us with a coffee. It keeps the servers running and motivates us to keep improving!
          </p>
          <div className="mt-8">
            <a
              href="https://www.buymeacoffee.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-xl font-semibold transition-all hover:shadow-lg"
            >
              <span className="text-xl">☕</span>
              <span>Support this project</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center text-sm text-gray-500 space-y-3">
            <p className="text-gray-600">
              Made with ❤️ for cyclists, runners, hikers, and travelers
            </p>
            <p className="text-xs">
              Apple Maps routes are recreated using available data and may not exactly match the original route.
            </p>
            <p className="text-xs">
              This tool uses cookies for anonymous usage tracking. No personal data is collected.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
