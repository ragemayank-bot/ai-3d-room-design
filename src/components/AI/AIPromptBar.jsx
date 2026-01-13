import { useState } from 'react';
import './AIPromptBar.css';
import useDesignStore from '../../store/useDesignStore';

// Icons
const SparklesIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

const SendIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
);

const presetPrompts = [
    "Modern minimalist living room, Scandinavian style",
    "Cozy bedroom with warm lighting, bohemian vibes",
    "Elegant home office, industrial design",
    "Luxurious dining room, contemporary aesthetic",
];

function AIPromptBar() {
    const [prompt, setPrompt] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const { generateFromPrompt, isLoading } = useDesignStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt.trim() || isLoading) return;

        await generateFromPrompt(prompt);
        setPrompt('');
        setIsExpanded(false);
    };

    const handlePresetClick = async (presetPrompt) => {
        setPrompt(presetPrompt);
        await generateFromPrompt(presetPrompt);
        setPrompt('');
        setIsExpanded(false);
    };

    return (
        <div className={`ai-prompt-bar ${isExpanded ? 'expanded' : ''}`}>
            <form className="prompt-form" onSubmit={handleSubmit}>
                <div className="prompt-icon">
                    <SparklesIcon />
                </div>

                <input
                    type="text"
                    className="prompt-input"
                    placeholder="Describe your dream room... (e.g., Modern living room with green accents)"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onFocus={() => setIsExpanded(true)}
                    disabled={isLoading}
                />

                <button
                    type="submit"
                    className="prompt-submit"
                    disabled={!prompt.trim() || isLoading}
                >
                    {isLoading ? (
                        <div className="btn-spinner"></div>
                    ) : (
                        <SendIcon />
                    )}
                </button>
            </form>

            {isExpanded && (
                <div className="prompt-suggestions animate-slide-down">
                    <div className="suggestions-header">
                        <span>Quick prompts</span>
                        <button
                            className="close-suggestions"
                            onClick={() => setIsExpanded(false)}
                        >
                            ×
                        </button>
                    </div>
                    <div className="suggestions-grid">
                        {presetPrompts.map((p, i) => (
                            <button
                                key={i}
                                className="suggestion-chip"
                                onClick={() => handlePresetClick(p)}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AIPromptBar;
