'use client';

import { useState } from 'react';

const COMPATIBLE_APPS = [
    {
        name: 'Strava',
        description: 'Track your runs and rides',
        icon: '🏃',
    },
    {
        name: 'TravelBoast',
        description: 'Create travel videos',
        icon: '✈️',
    },
    {
        name: 'Garmin',
        description: 'GPS devices & tracking',
        icon: '⌚',
    },
    {
        name: 'Komoot',
        description: 'Outdoor navigation',
        icon: '🗺️',
    },
    {
        name: 'AllTrails',
        description: 'Hiking & trail guides',
        icon: '🥾',
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

    return (
        <div className="w-full max-w-4xl mx-auto py-12">
            <h2 className="text-3xl font-bold text-center mb-8 gradient-text">
                Compatible with your favorite apps
            </h2>

            <div className="relative">
                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-500 ease-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {COMPATIBLE_APPS.map((app, index) => (
                            <div
                                key={index}
                                className="min-w-full flex flex-col items-center justify-center p-8"
                            >
                                <div className="text-7xl mb-4">{app.icon}</div>
                                <h3 className="text-2xl font-bold mb-2">{app.name}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{app.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={prev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Previous app"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    onClick={next}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Next app"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-6">
                    {COMPATIBLE_APPS.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                                    ? 'bg-primary-500 w-8'
                                    : 'bg-gray-300 dark:bg-gray-600'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
