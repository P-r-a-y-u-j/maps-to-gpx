'use client';

import { useState } from 'react';

const COMPATIBLE_APPS = [
    { name: 'Strava', description: 'Track your runs and rides', icon: '🏃', color: 'text-orange-600' },
    { name: 'TravelBoast', description: 'Create travel videos', icon: '✈️', color: 'text-blue-600' },
    { name: 'Garmin', description: 'GPS devices & tracking', icon: '⌚', color: 'text-blue-700' },
    { name: 'Komoot', description: 'Outdoor navigation', icon: '🗺️', color: 'text-green-600' },
    { name: 'AllTrails', description: 'Hiking & trail guides', icon: '🥾', color: 'text-green-700' },
];

export default function AppCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => setCurrentIndex((prev) => (prev + 1) % COMPATIBLE_APPS.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + COMPATIBLE_APPS.length) % COMPATIBLE_APPS.length);

    const currentApp = COMPATIBLE_APPS[currentIndex];

    return (
        <div className="w-full max-w-4xl mx-auto py-16">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
                Compatible with your favorite apps
            </h2>

            <div className="relative">
                <div className="overflow-hidden rounded-2xl bg-gray-50 border-2 border-gray-200 p-12">
                    <div className="flex flex-col items-center justify-center text-center min-h-[200px]">
                        <div className="text-8xl mb-6 transition-all duration-500">
                            {currentApp.icon}
                        </div>
                        <h3 className={`text-3xl font-bold mb-3 ${currentApp.color}`}>
                            {currentApp.name}
                        </h3>
                        <p className="text-gray-600 text-lg">{currentApp.description}</p>
                    </div>
                </div>

                <button
                    onClick={prev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white hover:bg-gray-50 rounded-full p-4 shadow-lg border-2 border-gray-200 transition-all hover:scale-110"
                    aria-label="Previous app"
                >
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    onClick={next}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white hover:bg-gray-50 rounded-full p-4 shadow-lg border-2 border-gray-200 transition-all hover:scale-110"
                    aria-label="Next app"
                >
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                <div className="flex justify-center gap-2 mt-8">
                    {COMPATIBLE_APPS.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-2 rounded-full transition-all ${index === currentIndex
                                    ? 'bg-blue-600 w-12'
                                    : 'bg-gray-300 w-2 hover:bg-gray-400'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
