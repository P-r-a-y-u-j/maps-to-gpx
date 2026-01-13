'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const COOKIE_NOTICE_DISMISSED = 'cookie_notice_dismissed';

export default function CookieNotice() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Check if user has already dismissed the notice
        const dismissed = Cookies.get(COOKIE_NOTICE_DISMISSED);
        if (!dismissed) {
            setShow(true);
        }
    }, []);

    const handleDismiss = () => {
        Cookies.set(COOKIE_NOTICE_DISMISSED, 'true', { expires: 365 });
        setShow(false);
    };

    if (!show) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in">
            <div className="container mx-auto max-w-4xl">
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-900 font-medium mb-1">
                                We use cookies for anonymous usage tracking
                            </p>
                            <p className="text-xs text-gray-600">
                                No personal data is collected. Just a random ID to track conversion milestones.{' '}
                                <a href="#footer" className="text-blue-600 hover:underline">Learn more</a>
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleDismiss}
                        className="flex-shrink-0 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
                    >
                        Got it
                    </button>
                </div>
            </div>
        </div>
    );
}
