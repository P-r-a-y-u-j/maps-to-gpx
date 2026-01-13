'use client';

import { useEffect, useRef, useState } from 'react';
import { getRemoteConfig, fetchAndActivate, getString } from 'firebase/remote-config';
import { app } from '@/lib/firebase';

interface App {
    name: string;
    icon: string;
}

// Default apps (fallback if Remote Config fails)
const DEFAULT_APPS: App[] = [
    { name: 'Strava', icon: '🏃' },
    { name: 'Garmin', icon: '⌚' },
    { name: 'Komoot', icon: '🗺️' },
    { name: 'AllTrails', icon: '🥾' },
    { name: 'TravelBoast', icon: '✈️' },
    { name: 'Ride with GPS', icon: '🚴' },
    { name: 'Wahoo', icon: '📱' },
    { name: 'Suunto', icon: '⌚' },
    { name: 'Polar', icon: '💪' },
    { name: 'Coros', icon: '🏔️' },
];

export default function HeroCarousel() {
    const scrollRef1 = useRef<HTMLDivElement>(null);
    const scrollRef2 = useRef<HTMLDivElement>(null);
    const [apps, setApps] = useState<App[]>(DEFAULT_APPS);

    // Fetch apps from Firebase Remote Config
    useEffect(() => {
        const loadApps = async () => {
            try {
                if (!app) return; // Firebase not configured

                const remoteConfig = getRemoteConfig(app);
                remoteConfig.settings.minimumFetchIntervalMillis = 3600000; // 1 hour

                await fetchAndActivate(remoteConfig);
                const appsJson = getString(remoteConfig, 'compatible_apps');

                if (appsJson) {
                    const parsedApps = JSON.parse(appsJson);
                    setApps(parsedApps);
                }
            } catch (error) {
                console.log('Using default apps:', error);
                // Keep default apps
            }
        };

        loadApps();
    }, []);

    // Split apps into two rows
    const midpoint = Math.ceil(apps.length / 2);
    const row1Apps = apps.slice(0, midpoint);
    const row2Apps = apps.slice(midpoint);

    // Auto-scroll effect for row 1 (left to right)
    useEffect(() => {
        const scrollContainer = scrollRef1.current;
        if (!scrollContainer) return;

        let scrollPosition = 0;
        const scroll = () => {
            scrollPosition += 0.5;
            if (scrollPosition >= scrollContainer.scrollWidth / 3) {
                scrollPosition = 0;
            }
            scrollContainer.scrollLeft = scrollPosition;
        };

        const interval = setInterval(scroll, 20);
        return () => clearInterval(interval);
    }, [apps]);

    // Auto-scroll effect for row 2 (right to left)
    useEffect(() => {
        const scrollContainer = scrollRef2.current;
        if (!scrollContainer) return;

        let scrollPosition = scrollContainer.scrollWidth / 3;
        const scroll = () => {
            scrollPosition -= 0.5;
            if (scrollPosition <= 0) {
                scrollPosition = scrollContainer.scrollWidth / 3;
            }
            scrollContainer.scrollLeft = scrollPosition;
        };

        const interval = setInterval(scroll, 20);
        return () => clearInterval(interval);
    }, [apps]);

    // Triple the apps for infinite scroll
    const duplicatedRow1 = [...row1Apps, ...row1Apps, ...row1Apps];
    const duplicatedRow2 = [...row2Apps, ...row2Apps, ...row2Apps];

    return (
        <div className="w-full space-y-3">
            {/* Row 1 - Scrolls left to right */}
            <div className="overflow-hidden">
                <div
                    ref={scrollRef1}
                    className="flex gap-3 overflow-x-hidden"
                    style={{ scrollBehavior: 'auto' }}
                >
                    {duplicatedRow1.map((app, index) => (
                        <div
                            key={`row1-${app.name}-${index}`}
                            className="flex-shrink-0 bg-white rounded-lg px-4 py-2.5 border border-gray-200 flex items-center gap-2 min-w-[130px]"
                        >
                            <span className="text-xl">{app.icon}</span>
                            <span className="font-semibold text-gray-900 text-sm whitespace-nowrap">
                                {app.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Row 2 - Scrolls right to left */}
            <div className="overflow-hidden">
                <div
                    ref={scrollRef2}
                    className="flex gap-3 overflow-x-hidden"
                    style={{ scrollBehavior: 'auto' }}
                >
                    {duplicatedRow2.map((app, index) => (
                        <div
                            key={`row2-${app.name}-${index}`}
                            className="flex-shrink-0 bg-white rounded-lg px-4 py-2.5 border border-gray-200 flex items-center gap-2 min-w-[130px]"
                        >
                            <span className="text-xl">{app.icon}</span>
                            <span className="font-semibold text-gray-900 text-sm whitespace-nowrap">
                                {app.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
