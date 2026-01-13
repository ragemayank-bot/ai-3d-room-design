import { useState } from 'react';
import './Sidebar.css';
import useDesignStore from '../../store/useDesignStore';
import AIStylist from '../AI/AIStylist';

// Icons
const CatalogIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
    </svg>
);

const RoomIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);

const AIIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a2 2 0 1 1 0 4h-1v1a2 2 0 0 1-2 2h-1v1a2 2 0 1 1-4 0v-1h-2v1a2 2 0 1 1-4 0v-1H7a2 2 0 0 1-2-2v-1H4a2 2 0 1 1 0-4h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
        <circle cx="9" cy="13" r="1" />
        <circle cx="15" cy="13" r="1" />
    </svg>
);

const LayersIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
    </svg>
);

const PlusIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const TrashIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
);

const categories = [
    { id: 'seating', name: 'Seating', icon: '🛋️' },
    { id: 'tables', name: 'Tables', icon: '🪑' },
    { id: 'lighting', name: 'Lighting', icon: '💡' },
    { id: 'storage', name: 'Storage', icon: '🗄️' },
    { id: 'bedroom', name: 'Bedroom', icon: '🛏️' },
    { id: 'decor', name: 'Decor', icon: '🌿' },
];

function Sidebar() {
    const {
        sidebarTab,
        setSidebarTab,
        catalog,
        furniture,
        addFurniture,
        removeFurniture,
        selectFurniture,
        selectedId,
        room,
        setRoom,
        roomPresets,
        applyPreset,
        designStyles,
        currentStyle,
        setStyle,
        getTotalCost,
        budget,
        clearAll
    } = useDesignStore();

    const [activeCategory, setActiveCategory] = useState('seating');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCatalog = catalog.filter(item => {
        const matchesCategory = item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const totalCost = getTotalCost();
    const isOverBudget = totalCost > budget;

    return (
        <aside className="sidebar">
            {/* Tab Navigation */}
            <div className="sidebar-tabs">
                <button
                    className={`sidebar-tab ${sidebarTab === 'catalog' ? 'active' : ''}`}
                    onClick={() => setSidebarTab('catalog')}
                    title="Furniture Catalog"
                >
                    <CatalogIcon />
                </button>
                <button
                    className={`sidebar-tab ${sidebarTab === 'room' ? 'active' : ''}`}
                    onClick={() => setSidebarTab('room')}
                    title="Room Settings"
                >
                    <RoomIcon />
                </button>
                <button
                    className={`sidebar-tab ${sidebarTab === 'layers' ? 'active' : ''}`}
                    onClick={() => setSidebarTab('layers')}
                    title="Layers"
                >
                    <LayersIcon />
                </button>
                <button
                    className={`sidebar-tab ${sidebarTab === 'ai' ? 'active' : ''}`}
                    onClick={() => setSidebarTab('ai')}
                    title="AI Stylist"
                >
                    <AIIcon />
                </button>
            </div>

            {/* Content Area */}
            <div className="sidebar-content">
                {/* Catalog Tab */}
                {sidebarTab === 'catalog' && (
                    <div className="sidebar-panel animate-fade-in">
                        <div className="panel-header">
                            <h3>Furniture Catalog</h3>
                            <span className="badge badge-accent">{catalog.length} items</span>
                        </div>

                        <div className="search-box">
                            <input
                                type="text"
                                className="input"
                                placeholder="Search furniture..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="category-tabs">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(cat.id)}
                                >
                                    <span className="category-icon">{cat.icon}</span>
                                    <span className="category-name">{cat.name}</span>
                                </button>
                            ))}
                        </div>

                        <div className="furniture-grid">
                            {filteredCatalog.map(item => (
                                <div
                                    key={item.id}
                                    className="furniture-card"
                                    onClick={() => addFurniture(item.id)}
                                >
                                    <div
                                        className="furniture-preview"
                                        style={{ background: item.color }}
                                    >
                                        <div className="furniture-3d-placeholder">
                                            <span>3D</span>
                                        </div>
                                    </div>
                                    <div className="furniture-info">
                                        <span className="furniture-name">{item.name}</span>
                                        <span className="furniture-price">${item.price}</span>
                                    </div>
                                    <button className="add-btn">
                                        <PlusIcon />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Room Settings Tab */}
                {sidebarTab === 'room' && (
                    <div className="sidebar-panel animate-fade-in">
                        <div className="panel-header">
                            <h3>Room Settings</h3>
                        </div>

                        <div className="settings-section">
                            <label className="settings-label">Room Presets</label>
                            <div className="presets-grid">
                                {Object.entries(roomPresets).map(([id, preset]) => (
                                    <button
                                        key={id}
                                        className="preset-card"
                                        onClick={() => applyPreset(id)}
                                    >
                                        <span className="preset-name">{preset.name}</span>
                                        <span className="preset-size">
                                            {preset.dimensions.width}x{preset.dimensions.depth}m
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="divider"></div>

                        <div className="settings-section">
                            <label className="settings-label">Dimensions</label>
                            <div className="dimension-inputs">
                                <div className="input-group">
                                    <label>Width (m)</label>
                                    <input
                                        type="number"
                                        className="input"
                                        value={room.width}
                                        onChange={(e) => setRoom({ width: parseFloat(e.target.value) })}
                                        min="2" max="20" step="0.5"
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Depth (m)</label>
                                    <input
                                        type="number"
                                        className="input"
                                        value={room.depth}
                                        onChange={(e) => setRoom({ depth: parseFloat(e.target.value) })}
                                        min="2" max="20" step="0.5"
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Height (m)</label>
                                    <input
                                        type="number"
                                        className="input"
                                        value={room.height}
                                        onChange={(e) => setRoom({ height: parseFloat(e.target.value) })}
                                        min="2" max="5" step="0.1"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="divider"></div>

                        <div className="settings-section">
                            <label className="settings-label">Design Style</label>
                            <div className="styles-list">
                                {designStyles.map(style => (
                                    <button
                                        key={style.id}
                                        className={`style-card ${currentStyle === style.id ? 'active' : ''}`}
                                        onClick={() => setStyle(style.id)}
                                    >
                                        <div className="style-colors">
                                            {style.colors.map((color, i) => (
                                                <div key={i} className="style-color" style={{ background: color }} />
                                            ))}
                                        </div>
                                        <div className="style-info">
                                            <span className="style-name">{style.name}</span>
                                            <span className="style-desc">{style.description}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="divider"></div>

                        <div className="settings-section">
                            <label className="settings-label">Colors</label>
                            <div className="color-inputs">
                                <div className="input-group">
                                    <label>Wall Color</label>
                                    <div className="color-input-wrapper">
                                        <input
                                            type="color"
                                            value={room.wallColor}
                                            onChange={(e) => setRoom({ wallColor: e.target.value })}
                                        />
                                        <span>{room.wallColor}</span>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <label>Floor Color</label>
                                    <div className="color-input-wrapper">
                                        <input
                                            type="color"
                                            value={room.floorColor}
                                            onChange={(e) => setRoom({ floorColor: e.target.value })}
                                        />
                                        <span>{room.floorColor}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Layers Tab */}
                {sidebarTab === 'layers' && (
                    <div className="sidebar-panel animate-fade-in">
                        <div className="panel-header">
                            <h3>Scene Layers</h3>
                            <button className="btn btn-ghost btn-icon" onClick={clearAll} title="Clear All">
                                <TrashIcon />
                            </button>
                        </div>

                        <div className="budget-summary">
                            <div className="budget-row">
                                <span>Total Cost</span>
                                <span className={`budget-value ${isOverBudget ? 'over' : ''}`}>
                                    ${totalCost.toLocaleString()}
                                </span>
                            </div>
                            <div className="budget-row">
                                <span>Budget</span>
                                <span className="budget-value">${budget.toLocaleString()}</span>
                            </div>
                            <div className="budget-bar">
                                <div
                                    className="budget-fill"
                                    style={{
                                        width: `${Math.min(100, (totalCost / budget) * 100)}%`,
                                        background: isOverBudget ? 'var(--color-error)' : 'var(--color-accent-gradient)'
                                    }}
                                />
                            </div>
                        </div>

                        <div className="divider"></div>

                        <div className="layers-list">
                            {furniture.length === 0 ? (
                                <div className="empty-layers">
                                    <p>No furniture added yet</p>
                                    <span>Click items in the catalog to add them</span>
                                </div>
                            ) : (
                                furniture.map((item, index) => (
                                    <div
                                        key={item.instanceId}
                                        className={`layer-item ${selectedId === item.instanceId ? 'selected' : ''}`}
                                        onClick={() => selectFurniture(item.instanceId)}
                                    >
                                        <div
                                            className="layer-color"
                                            style={{ background: item.color }}
                                        />
                                        <div className="layer-info">
                                            <span className="layer-name">{item.name}</span>
                                            <span className="layer-price">${item.price}</span>
                                        </div>
                                        <button
                                            className="layer-delete"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeFurniture(item.instanceId);
                                            }}
                                        >
                                            <TrashIcon />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {/* AI Stylist Tab */}
                {sidebarTab === 'ai' && <AIStylist />}
            </div>
        </aside>
    );
}

export default Sidebar;
