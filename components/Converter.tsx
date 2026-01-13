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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mapUrl: mapUrl.trim(), anonId }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Conversion failed');
                setLoading(false);
                return;
            }

            if (data.isAppleMaps) {
                setShowAppleWarning(true);
            }

            const blob = new Blob([data.gpx], { type: 'application/gpx+xml' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'route.gpx';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            setSuccess(true);
            setTimeout(() => setSuccess(false), 5000);

            if (data.showSupportPrompt) {
                setTimeout(() => setShowSupportPrompt(true), 1000);
            }

            setMapUrl('');
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="w-full max-w-3xl mx-auto">
                {/* Removed outer border - just shadow */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-6 md:p-8">
                        <div className="space-y-4">
                            {/* Input - No outer border */}
                            <div className="relative">
                                <input
                                    type="text"
                                    value={mapUrl}
                                    onChange={(e) => setMapUrl(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleConvert()}
                                    placeholder="Paste your Google Maps or Apple Maps link here..."
                                    className="w-full px-6 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors placeholder:text-gray-400"
                                    disabled={loading}
                                />
                                {mapUrl && (
                                    <button
                                        onClick={() => setMapUrl('')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                )}
                            </div>

                            {/* Messages */}
                            {error && (
                                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                                    <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    <div className="flex-1">
                                        <p className="font-semibold text-red-900 text-sm">Conversion failed</p>
                                        <p className="text-red-700 text-sm mt-1">{error}</p>
                                    </div>
                                </div>
                            )}

                            {success && (
                                <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <div className="flex-1">
                                        <p className="font-semibold text-green-900 text-sm">Success!</p>
                                        <p className="text-green-700 text-sm mt-1">Your GPX file has been downloaded</p>
                                    </div>
                                </div>
                            )}

                            {showAppleWarning && (
                                <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                                    <svg className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <div className="flex-1">
                                        <p className="font-semibold text-yellow-900 text-sm">Apple Maps limitation</p>
                                        <p className="text-yellow-700 text-sm mt-1">
                                            Apple Maps doesn't provide intermediate waypoints. Route recreated using start and end points only.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Convert Button */}
                            <button
                                onClick={handleConvert}
                                disabled={loading || !mapUrl.trim()}
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-3"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        <span>Converting...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Convert to GPX</span>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <SupportPrompt isOpen={showSupportPrompt} onClose={() => setShowSupportPrompt(false)} />
        </>
    );
}
