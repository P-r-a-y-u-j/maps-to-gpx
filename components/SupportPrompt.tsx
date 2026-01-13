'use client';

interface SupportPromptProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SupportPrompt({ isOpen, onClose }: SupportPromptProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-3xl shadow-2xl max-w-md w-full p-8 animate-slide-up">
                <div className="text-center">
                    <div className="text-6xl mb-6 animate-bounce">☕</div>
                    <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Enjoying this tool?
                    </h3>
                    <p className="text-gray-300 mb-8 text-lg">
                        If it's been useful, consider supporting its development
                    </p>

                    <div className="flex flex-col gap-4">
                        <a
                            href="https://www.buymeacoffee.com/yourusername"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-4 px-8 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <span className="text-2xl">☕</span>
                            <span>Buy Me a Coffee</span>
                        </a>
                        <button
                            onClick={onClose}
                            className="bg-slate-700 hover:bg-slate-600 text-gray-200 font-semibold py-4 px-8 rounded-xl transition-all duration-200"
                        >
                            Maybe later
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
