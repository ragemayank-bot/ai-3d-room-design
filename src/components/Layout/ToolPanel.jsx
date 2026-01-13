import './ToolPanel.css';
import useDesignStore from '../../store/useDesignStore';

// Icons
const MoveIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="5 9 2 12 5 15" />
        <polyline points="9 5 12 2 15 5" />
        <polyline points="15 19 12 22 9 19" />
        <polyline points="19 9 22 12 19 15" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="12" y1="2" x2="12" y2="22" />
    </svg>
);

const RotateIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 2v6h-6" />
        <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
        <path d="M3 22v-6h6" />
        <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    </svg>
);

const ScaleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="15 3 21 3 21 9" />
        <polyline points="9 21 3 21 3 15" />
        <line x1="21" y1="3" x2="14" y2="10" />
        <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
);

const DuplicateIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
);

const TrashIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
);

function ToolPanel() {
    const {
        furniture,
        selectedId,
        updateFurniture,
        removeFurniture,
        addFurniture,
        clearSelection
    } = useDesignStore();

    const selectedItem = furniture.find(f => f.instanceId === selectedId);

    if (!selectedItem) return null;

    const handlePositionChange = (axis, value) => {
        const newPosition = [...selectedItem.position];
        const axisIndex = axis === 'x' ? 0 : axis === 'y' ? 1 : 2;
        newPosition[axisIndex] = parseFloat(value);
        updateFurniture(selectedId, { position: newPosition });
    };

    const handleRotationChange = (value) => {
        const newRotation = [0, (parseFloat(value) * Math.PI) / 180, 0];
        updateFurniture(selectedId, { rotation: newRotation });
    };

    const handleScaleChange = (value) => {
        const scale = parseFloat(value);
        updateFurniture(selectedId, { scale: [scale, scale, scale] });
    };

    const handleDuplicate = () => {
        addFurniture(selectedItem.id);
    };

    const handleDelete = () => {
        removeFurniture(selectedId);
    };

    const currentRotation = Math.round((selectedItem.rotation[1] * 180) / Math.PI);
    const currentScale = selectedItem.scale[0];

    return (
        <aside className="tool-panel animate-slide-left">
            <div className="tool-panel-header">
                <div className="selected-item-info">
                    <div
                        className="item-color"
                        style={{ background: selectedItem.color }}
                    />
                    <div className="item-details">
                        <span className="item-name">{selectedItem.name}</span>
                        <span className="item-price">${selectedItem.price}</span>
                    </div>
                </div>
                <button className="btn btn-ghost btn-icon" onClick={clearSelection}>
                    ×
                </button>
            </div>

            <div className="tool-section">
                <div className="section-header">
                    <MoveIcon />
                    <span>Position</span>
                </div>
                <div className="position-inputs">
                    <div className="input-group">
                        <label>X</label>
                        <input
                            type="number"
                            className="input"
                            value={selectedItem.position[0].toFixed(2)}
                            onChange={(e) => handlePositionChange('x', e.target.value)}
                            step="0.1"
                        />
                    </div>
                    <div className="input-group">
                        <label>Y</label>
                        <input
                            type="number"
                            className="input"
                            value={selectedItem.position[1].toFixed(2)}
                            onChange={(e) => handlePositionChange('y', e.target.value)}
                            step="0.1"
                        />
                    </div>
                    <div className="input-group">
                        <label>Z</label>
                        <input
                            type="number"
                            className="input"
                            value={selectedItem.position[2].toFixed(2)}
                            onChange={(e) => handlePositionChange('z', e.target.value)}
                            step="0.1"
                        />
                    </div>
                </div>
            </div>

            <div className="divider"></div>

            <div className="tool-section">
                <div className="section-header">
                    <RotateIcon />
                    <span>Rotation</span>
                </div>
                <div className="slider-group">
                    <input
                        type="range"
                        className="slider"
                        min="0"
                        max="360"
                        value={currentRotation}
                        onChange={(e) => handleRotationChange(e.target.value)}
                    />
                    <span className="slider-value">{currentRotation}°</span>
                </div>
            </div>

            <div className="divider"></div>

            <div className="tool-section">
                <div className="section-header">
                    <ScaleIcon />
                    <span>Scale</span>
                </div>
                <div className="slider-group">
                    <input
                        type="range"
                        className="slider"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={currentScale}
                        onChange={(e) => handleScaleChange(e.target.value)}
                    />
                    <span className="slider-value">{currentScale.toFixed(1)}x</span>
                </div>
            </div>

            <div className="divider"></div>

            <div className="tool-section">
                <div className="section-header">
                    <span>Dimensions</span>
                </div>
                <div className="dimensions-display">
                    <div className="dim-item">
                        <span className="dim-label">W</span>
                        <span className="dim-value">{(selectedItem.dimensions.w * currentScale).toFixed(2)}m</span>
                    </div>
                    <div className="dim-item">
                        <span className="dim-label">H</span>
                        <span className="dim-value">{(selectedItem.dimensions.h * currentScale).toFixed(2)}m</span>
                    </div>
                    <div className="dim-item">
                        <span className="dim-label">D</span>
                        <span className="dim-value">{(selectedItem.dimensions.d * currentScale).toFixed(2)}m</span>
                    </div>
                </div>
            </div>

            <div className="tool-panel-footer">
                <button className="btn btn-secondary" onClick={handleDuplicate}>
                    <DuplicateIcon />
                    <span>Duplicate</span>
                </button>
                <button className="btn btn-ghost delete-btn" onClick={handleDelete}>
                    <TrashIcon />
                    <span>Delete</span>
                </button>
            </div>
        </aside>
    );
}

export default ToolPanel;
