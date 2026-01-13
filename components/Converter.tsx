'use client';

import { useState } from 'react';
import { getAnonId } from '@/lib/anonId';
import SupportPrompt from './SupportPrompt';

export default function Converter() {
    const [mapUrl, setMapUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [showAppleWarning, setShowAppleWarning] = useState(false);
    const [showSupportPrompt, setShowSupportPrompt] = useState(false);

    const handleConvert = async () => {
        if (!mapUrl.trim()) {
            setError('Please enter a map URL');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess(false);
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

            // Show success message
            setSuccess(true);
            setTimeout(() => setSuccess(false), 5000);

            // Show support prompt if needed
            if (data.showSupportPrompt) {
                setTimeout(() => setShowSupportPrompt(true), 1000);
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
        <div className="w-full max-w-3xl mx-auto">
            <div className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-xl shadow-2xl">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-xl"></div>

                <div className="relative space-y-6">
                    <div>
                        <label htmlFor="mapUrl" className="block text-sm font-semibold mb-3 text-gray-300">
                            📍 Paste your map link
                        </label>
                        <input
                            id="mapUrl"
                            type="text"
                            value={mapUrl}
                            onChange={(e) => setMapUrl(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleConvert()}
                            placeholder="https://maps.google.com/... or https://maps.apple.com/..."
                            className="w-full px-5 py-4 rounded-xl bg-slate-900/50 border border-slate-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            disabled={loading}
                        />
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-5 py-4 rounded-xl animate-fade-in backdrop-blur-sm">
                            <div className="flex items-start gap-3">
                                <span className="text-xl">❌</span>
                                <div className="flex-1">
                                    <p className="font-semibold mb-1">Conversion Failed</p>
                                    <p className="text-sm text-red-200">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-500/10 border border-green-500/30 text-green-300 px-5 py-4 rounded-xl animate-fade-in backdrop-blur-sm">
                            <div className="flex items-start gap-3">
                                <span className="text-xl">✅</span>
                                <div className="flex-1">
                                    <p className="font-semibold mb-1">Success!</p>
                                    <p className="text-sm text-green-200">Your GPX file has been downloaded. Check your downloads folder!</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {showAppleWarning && (
                        <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 px-5 py-4 rounded-xl animate-fade-in backdrop-blur-sm">
                            <div className="flex items-start gap-3">
                                <span className="text-xl">⚠️</span>
                                <div className="flex-1">
                                    <p className="font-semibold mb-1">Apple Maps Limitation</p>
                                    <p className="text-sm text-yellow-200">
                                        Apple Maps does not include intermediate stops. This GPX is recreated using start and end locations only.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleConvert}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-5 px-8 rounded-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-3">
                                <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                <span>Converting your route...</span>
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <span>✨</span>
                                <span>Convert to GPX</span>
                                <span>→</span>
                            </span>
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
