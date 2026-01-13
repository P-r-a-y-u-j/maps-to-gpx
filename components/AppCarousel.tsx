'use client';

import { useState } from 'react';

const COMPATIBLE_APPS = [
    {
        name: 'Strava',
        description: 'Track your runs and rides',
        icon: '🏃',
        color: 'from-orange-500 to-red-500'
    },
    {
        name: 'TravelBoast',
        description: 'Create travel videos',
        icon: '✈️',
        color: 'from-blue-500 to-cyan-500'
    },
    {
        name: 'Garmin',
        description: 'GPS devices & tracking',
        icon: '⌚',
        color: 'from-blue-600 to-blue-400'
    },
    {
        name: 'Komoot',
        description: 'Outdoor navigation',
        icon: '🗺️',
        color: 'from-green-500 to-emerald-500'
    },
    {
        name: 'AllTrails',
        description: 'Hiking & trail guides',
        icon: '🥾',
        color: 'from-green-600 to-lime-500'
    },
];

export default function AppCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % COMPATIBLE_APPS.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + COMPATIBLE_APPS.length) % COMPATIBLE_APPS.length);
    };

    const currentApp = COMPATIBLE_APPS[currentIndex];

    return (
        <div className="w-full max-w-4xl mx-auto py-16">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Compatible with your favorite apps
            </h2>

            <div className="relative">
                <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-xl p-12">
                    <div className="flex flex-col items-center justify-center text-center min-h-[200px]">
                        <div className={`text-8xl mb-6 transition-all duration-500 ${currentIndex % 2 === 0 ? 'scale-100' : 'scale-110'}`}>
                            {currentApp.icon}
                        </div>
                        <h3 className={`text-3xl font-bold mb-3 bg-gradient-to-r ${currentApp.color} bg-clip-text text-transparent`}>
                            {currentApp.name}
                        </h3>
                        <p className="text-gray-400 text-lg">{currentApp.description}</p>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={prev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-slate-800 hover:bg-slate-700 rounded-full p-4 shadow-xl border border-slate-600 transition-all hover:scale-110"
                    aria-label="Previous app"
                >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    onClick={next}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-slate-800 hover:bg-slate-700 rounded-full p-4 shadow-xl border border-slate-600 transition-all hover:scale-110"
                    aria-label="Next app"
                >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-8">
                    {COMPATIBLE_APPS.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-2 rounded-full transition-all ${index === currentIndex
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 w-12'
                                    : 'bg-slate-600 w-2 hover:bg-slate-500'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
