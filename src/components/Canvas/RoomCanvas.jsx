import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Grid, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import './RoomCanvas.css';
import Room from './Room';
import FurnitureItem from './FurnitureItem';
import useDesignStore from '../../store/useDesignStore';

function Scene() {
    const { furniture, room, viewMode, selectedId, selectFurniture, clearSelection } = useDesignStore();

    return (
        <>
            {/* Camera */}
            <PerspectiveCamera makeDefault position={[8, 6, 8]} fov={50} />

            {/* Controls */}
            <OrbitControls
                makeDefault
                minPolarAngle={0.2}
                maxPolarAngle={Math.PI / 2.1}
                minDistance={3}
                maxDistance={20}
                enableDamping
                dampingFactor={0.05}
            />

            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight
                position={[5, 10, 5]}
                intensity={1}
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
            />
            <pointLight position={[-5, 5, -5]} intensity={0.3} color="#fbd38d" />
            <hemisphereLight intensity={0.3} groundColor="#1a1a25" />

            {/* Environment */}
            <Environment preset="apartment" background={false} />

            {/* Room */}
            <Room />

            {/* Grid */}
            <Grid
                position={[0, 0.01, 0]}
                args={[room.width, room.depth]}
                cellSize={0.5}
                cellThickness={0.5}
                cellColor="#4a5568"
                sectionSize={1}
                sectionThickness={1}
                sectionColor="#667eea"
                fadeDistance={15}
                fadeStrength={1}
                followCamera={false}
                infiniteGrid={false}
            />

            {/* Contact Shadows */}
            <ContactShadows
                position={[0, 0, 0]}
                scale={20}
                blur={2}
                far={4}
                opacity={0.5}
            />

            {/* Furniture Items */}
            {furniture.map((item) => (
                <FurnitureItem
                    key={item.instanceId}
                    item={item}
                    isSelected={selectedId === item.instanceId}
                    onSelect={() => selectFurniture(item.instanceId)}
                />
            ))}

            {/* Click on empty space to deselect */}
            <mesh
                position={[0, -0.01, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                onClick={(e) => {
                    e.stopPropagation();
                    clearSelection();
                }}
                visible={false}
            >
                <planeGeometry args={[100, 100]} />
            </mesh>

            {/* Post-processing Effects */}
            {viewMode === 'preview' && (
                <EffectComposer>
                    <Bloom
                        luminanceThreshold={0.9}
                        luminanceSmoothing={0.9}
                        intensity={0.3}
                    />
                    <Vignette eskil={false} offset={0.1} darkness={0.5} />
                </EffectComposer>
            )}
        </>
    );
}

function LoadingFallback() {
    return (
        <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#667eea" wireframe />
        </mesh>
    );
}

function RoomCanvas() {
    const { isLoading, viewMode, furniture, getTotalCost, budget } = useDesignStore();
    const totalCost = getTotalCost();
    const isOverBudget = totalCost > budget;

    return (
        <div className="canvas-wrapper">
            {isLoading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <span className="loading-text">Generating your design...</span>
                </div>
            )}

            <Canvas
                shadows
                gl={{ antialias: true, alpha: false }}
                dpr={[1, 2]}
                style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #12121a 100%)' }}
            >
                <Suspense fallback={<LoadingFallback />}>
                    <Scene />
                </Suspense>
            </Canvas>

            {/* View mode indicator */}
            <div className="view-mode-indicator">
                <span className="dot"></span>
                <span>{viewMode === 'edit' ? 'Edit Mode' : viewMode === 'preview' ? 'Preview Mode' : '360° View'}</span>
            </div>

            {/* Stats bar */}
            <div className="stats-bar">
                <div className="stat-item">
                    <span className="stat-label">Items:</span>
                    <span className="stat-value">{furniture.length}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Total:</span>
                    <span className={`stat-value ${isOverBudget ? 'over-budget' : 'under-budget'}`}>
                        ${totalCost.toLocaleString()}
                    </span>
                </div>
            </div>

            {/* Empty state hint */}
            {furniture.length === 0 && !isLoading && (
                <div className="empty-state">
                    <div className="empty-state-icon">🏠</div>
                    <h3>Your room is empty</h3>
                    <p>Add furniture from the catalog or describe your dream room using AI</p>
                </div>
            )}
        </div>
    );
}

export default RoomCanvas;
