import { useState, useRef, useEffect } from 'react';
import './AIStylist.css';
import useDesignStore from '../../store/useDesignStore';

// Icons
const SendIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
);

const BotIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M12 11V4" />
        <circle cx="12" cy="4" r="2" />
        <path d="M8 16h.01" />
        <path d="M16 16h.01" />
    </svg>
);

const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const quickActions = [
    "Suggest furniture for my budget",
    "What colors go well together?",
    "How can I maximize space?",
    "Recommend lighting options",
];

function AIStylist() {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);
    const { aiMessages, sendMessage, isAITyping, furniture, budget, getTotalCost } = useDesignStore();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [aiMessages, isAITyping]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim() || isAITyping) return;

        sendMessage(input);
        setInput('');
    };

    const handleQuickAction = (action) => {
        if (isAITyping) return;
        sendMessage(action);
    };

    const totalCost = getTotalCost();

    return (
        <div className="ai-stylist animate-fade-in">
            <div className="stylist-header">
                <div className="stylist-avatar">
                    <BotIcon />
                </div>
                <div className="stylist-info">
                    <h3>AI Interior Stylist</h3>
                    <span className="stylist-status">
                        <span className="status-dot"></span>
                        Online
                    </span>
                </div>
            </div>

            <div className="stylist-context">
                <div className="context-item">
                    <span className="context-label">Items</span>
                    <span className="context-value">{furniture.length}</span>
                </div>
                <div className="context-item">
                    <span className="context-label">Spent</span>
                    <span className="context-value">${totalCost.toLocaleString()}</span>
                </div>
                <div className="context-item">
                    <span className="context-label">Budget</span>
                    <span className="context-value">${budget.toLocaleString()}</span>
                </div>
            </div>

            <div className="messages-container">
                {aiMessages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.role}`}>
                        <div className="message-avatar">
                            {msg.role === 'assistant' ? <BotIcon /> : <UserIcon />}
                        </div>
                        <div className="message-content">
                            <p>{msg.content}</p>
                        </div>
                    </div>
                ))}

                {isAITyping && (
                    <div className="message assistant">
                        <div className="message-avatar">
                            <BotIcon />
                        </div>
                        <div className="message-content typing">
                            <div className="typing-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <div className="quick-actions">
                {quickActions.map((action, i) => (
                    <button
                        key={i}
                        className="quick-action-btn"
                        onClick={() => handleQuickAction(action)}
                        disabled={isAITyping}
                    >
                        {action}
                    </button>
                ))}
            </div>

            <form className="chat-input-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="chat-input"
                    placeholder="Ask for design advice..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isAITyping}
                />
                <button
                    type="submit"
                    className="chat-submit"
                    disabled={!input.trim() || isAITyping}
                >
                    <SendIcon />
                </button>
            </form>
        </div>
    );
}

export default AIStylist;
