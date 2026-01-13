'use client';

interface SupportPromptProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SupportPrompt({ isOpen, onClose }: SupportPromptProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
                <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl">☕</span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        Enjoying this tool?
                    </h3>

                    <p className="text-gray-600 mb-8 leading-relaxed">
                        This tool is free and always will be. If you find it useful, consider supporting its development.
                    </p>

                    <div className="space-y-3">
                        <a
                            href="https://www.buymeacoffee.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-4 px-6 rounded-xl transition-all duration-200 hover:shadow-lg"
                        >
                            <span className="flex items-center justify-center gap-2">
                                <span className="text-xl">☕</span>
                                <span>Buy Me a Coffee</span>
                            </span>
                        </a>

                        <button
                            onClick={onClose}
                            className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-4 px-6 rounded-xl transition-all duration-200"
                        >
                            Maybe later
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
