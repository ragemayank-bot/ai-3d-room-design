import './WelcomeModal.css';

const features = [
    {
        icon: '🎨',
        title: 'AI-Powered Design',
        description: 'Describe your dream room and watch AI bring it to life'
    },
    {
        icon: '🏠',
        title: '3D Visualization',
        description: 'Interactive 3D room editor with real-time rendering'
    },
    {
        icon: '🛋️',
        title: 'Furniture Catalog',
        description: 'Browse and place furniture from our curated collection'
    },
    {
        icon: '💬',
        title: 'AI Stylist',
        description: 'Get personalized design recommendations'
    },
];

function WelcomeModal({ onClose }) {
    return (
        <div className="welcome-overlay">
            <div className="welcome-modal animate-slide-up">
                <div className="welcome-header">
                    <div className="welcome-logo">
                        <svg width="48" height="48" viewBox="0 0 100 100" fill="none">
                            <defs>
                                <linearGradient id="welcomeLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#6366f1" />
                                    <stop offset="50%" stopColor="#8b5cf6" />
                                    <stop offset="100%" stopColor="#d946ef" />
                                </linearGradient>
                            </defs>
                            <rect x="10" y="10" width="80" height="80" rx="16" fill="url(#welcomeLogoGrad)" />
                            <path d="M30 65 L30 45 L50 35 L70 45 L70 65 L50 75 Z" fill="none" stroke="white" strokeWidth="3" strokeLinejoin="round" />
                            <path d="M50 35 L50 55 M30 45 L50 55 L70 45" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                    </div>
                    <h1>Welcome to <span className="gradient-text">Mayank 3D</span></h1>
                    <p className="welcome-subtitle">
                        The next-generation AI-powered interior design studio
                    </p>
                </div>

                <div className="features-grid">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className="feature-card"
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            <div className="feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>

                <div className="welcome-actions">
                    <button className="btn btn-primary btn-large" onClick={onClose}>
                        Start Designing
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                </div>

                <p className="welcome-footer">
                    Built by <strong>Mayank Raghuvanshi</strong> • AI-Powered Interior Design
                </p>
            </div>
        </div>
    );
}

export default WelcomeModal;
