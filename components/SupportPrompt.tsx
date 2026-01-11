'use client';

interface SupportPromptProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SupportPrompt({ isOpen, onClose }: SupportPromptProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-8 animate-slide-up">
                <div className="text-center">
                    <div className="text-5xl mb-4">☕</div>
                    <h3 className="text-2xl font-bold mb-3 gradient-text">
                        Enjoying this tool?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        If it's been useful, consider supporting its development
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <a
                            href="https://www.buymeacoffee.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 gradient-primary text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
                        >
                            ☕ Support
                        </a>
                        <button
                            onClick={onClose}
                            className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                            Maybe later
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
