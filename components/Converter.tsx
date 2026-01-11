'use client';

import { useState } from 'react';
import { getAnonId } from '@/lib/anonId';
import SupportPrompt from './SupportPrompt';

export default function Converter() {
    const [mapUrl, setMapUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showAppleWarning, setShowAppleWarning] = useState(false);
    const [showSupportPrompt, setShowSupportPrompt] = useState(false);

    const handleConvert = async () => {
        if (!mapUrl.trim()) {
            setError('Please enter a map URL');
            return;
        }

        setLoading(true);
        setError('');
        setShowAppleWarning(false);

        try {
            const anonId = getAnonId();

            const response = await fetch('/api/convert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mapUrl: mapUrl.trim(),
                    anonId,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Conversion failed');
                setLoading(false);
                return;
            }

            // Show Apple Maps warning if applicable
            if (data.isAppleMaps) {
                setShowAppleWarning(true);
            }

            // Download GPX file
            const blob = new Blob([data.gpx], { type: 'application/gpx+xml' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'route.gpx';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            // Show support prompt if needed
            if (data.showSupportPrompt) {
                setTimeout(() => setShowSupportPrompt(true), 500);
            }

            // Clear input
            setMapUrl('');

        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="glass rounded-2xl p-8 shadow-2xl">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="mapUrl" className="block text-sm font-medium mb-2">
                            Paste your map link
                        </label>
                        <input
                            id="mapUrl"
                            type="text"
                            value={mapUrl}
                            onChange={(e) => setMapUrl(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleConvert()}
                            placeholder="https://maps.google.com/... or https://maps.apple.com/..."
                            className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                            disabled={loading}
                        />
                    </div>

                    {error && (
                        <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg animate-fade-in">
                            {error}
                        </div>
                    )}

                    {showAppleWarning && (
                        <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-300 px-4 py-3 rounded-lg animate-fade-in">
                            <p className="font-semibold mb-1">⚠️ Apple Maps Limitation</p>
                            <p className="text-sm">
                                Apple Maps does not include intermediate stops. This GPX is recreated using start and end locations only.
                            </p>
                        </div>
                    )}

                    <button
                        onClick={handleConvert}
                        disabled={loading}
                        className="w-full gradient-primary text-white font-bold py-4 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Converting...
                            </span>
                        ) : (
                            'Convert to GPX'
                        )}
                    </button>
                </div>
            </div>

            <SupportPrompt
                isOpen={showSupportPrompt}
                onClose={() => setShowSupportPrompt(false)}
            />
        </div>
    );
}
