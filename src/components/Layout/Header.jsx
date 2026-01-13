import './Header.css';
import useDesignStore from '../../store/useDesignStore';

// Icons as simple SVG components
const Logo = () => (
    <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
        <defs>
            <linearGradient id="headerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#d946ef" />
            </linearGradient>
        </defs>
        <rect x="10" y="10" width="80" height="80" rx="16" fill="url(#headerLogoGrad)" />
        <path d="M30 65 L30 45 L50 35 L70 45 L70 65 L50 75 Z" fill="none" stroke="white" strokeWidth="3" strokeLinejoin="round" />
        <path d="M50 35 L50 55 M30 45 L50 55 L70 45" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
);

const EditIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);

const EyeIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const CubeIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
);

const UndoIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 7v6h6" />
        <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
    </svg>
);

const RedoIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 7v6h-6" />
        <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" />
    </svg>
);

const DownloadIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

const ShareIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
);

function Header() {
    const { viewMode, setViewMode, undo, redo, historyIndex, history } = useDesignStore();

    const handleExport = () => {
        alert('Export functionality would save your design as an image or 3D file');
    };

    const handleShare = () => {
        alert('Share functionality would generate a shareable link');
    };

    return (
        <header className="header">
            <div className="header-left">
                <div className="logo-section">
                    <Logo />
                    <div className="brand">
                        <span className="brand-name">Mayank</span>
                        <span className="brand-suffix">3D</span>
                    </div>          </div>

                <div className="project-name">
                    <input
                        type="text"
                        className="project-input"
                        defaultValue="My Dream Living Room"
                        placeholder="Project name..."
                    />
                </div>
            </div>

            <div className="header-center">
                <div className="view-mode-toggle">
                    <button
                        className={`mode-btn ${viewMode === 'edit' ? 'active' : ''}`}
                        onClick={() => setViewMode('edit')}
                        title="Edit Mode"
                    >
                        <EditIcon />
                        <span>Edit</span>
                    </button>
                    <button
                        className={`mode-btn ${viewMode === 'preview' ? 'active' : ''}`}
                        onClick={() => setViewMode('preview')}
                        title="Preview Mode"
                    >
                        <EyeIcon />
                        <span>Preview</span>
                    </button>
                    <button
                        className={`mode-btn ${viewMode === '360' ? 'active' : ''}`}
                        onClick={() => setViewMode('360')}
                        title="360° View"
                    >
                        <CubeIcon />
                        <span>360°</span>
                    </button>
                </div>
            </div>

            <div className="header-right">
                <div className="history-controls">
                    <button
                        className="btn btn-ghost btn-icon tooltip"
                        onClick={undo}
                        disabled={historyIndex <= 0}
                        data-tooltip="Undo"
                    >
                        <UndoIcon />
                    </button>
                    <button
                        className="btn btn-ghost btn-icon tooltip"
                        onClick={redo}
                        disabled={historyIndex >= history.length - 1}
                        data-tooltip="Redo"
                    >
                        <RedoIcon />
                    </button>
                </div>

                <div className="divider-vertical"></div>

                <button className="btn btn-secondary" onClick={handleExport}>
                    <DownloadIcon />
                    <span>Export</span>
                </button>

                <button className="btn btn-primary" onClick={handleShare}>
                    <ShareIcon />
                    <span>Share</span>
                </button>
            </div>
        </header>
    );
}

export default Header;
