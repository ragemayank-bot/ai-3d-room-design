import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useDesignStore from '../../store/useDesignStore';

function FurnitureItem({ item, isSelected, onSelect }) {
    const meshRef = useRef();
    const outlineRef = useRef();
    const [hovered, setHovered] = useState(false);
    const { viewMode, updateFurniture } = useDesignStore();

    const { position, rotation, scale, dimensions, color, name } = item;

    // Create geometry based on furniture type
    const geometry = useMemo(() => {
        const { w, h, d } = dimensions;

        // Different shapes for different furniture types
        if (name.toLowerCase().includes('lamp') || name.toLowerCase().includes('plant')) {
            return new THREE.CylinderGeometry(w / 2, w / 3, h, 16);
        }
        if (name.toLowerCase().includes('stool') || name.toLowerCase().includes('table')) {
            return new THREE.CylinderGeometry(w / 2, w / 2, h, 32);
        }
        if (name.toLowerCase().includes('rug')) {
            return new THREE.BoxGeometry(w, h, d);
        }
        // Default box shape
        return new THREE.BoxGeometry(w, h, d);
    }, [dimensions, name]);

    // Material with selection/hover states
    const material = useMemo(() => {
        return new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.7,
            metalness: 0.1,
        });
    }, [color]);

    // Hover effect
    useFrame(() => {
        if (meshRef.current) {
            // Slight floating animation when selected
            if (isSelected) {
                meshRef.current.position.y = position[1] + Math.sin(Date.now() * 0.003) * 0.02;
            }
        }
    });

    // Handle drag (simplified - using click to move for now)
    const handlePointerDown = (e) => {
        e.stopPropagation();
        onSelect();
    };

    // Simple drag on XZ plane
    const handlePointerMove = (e) => {
        if (isSelected && e.buttons === 1 && viewMode === 'edit') {
            e.stopPropagation();
            const point = e.point;
            updateFurniture(item.instanceId, {
                position: [point.x, position[1], point.z]
            });
        }
    };

    return (
        <group
            position={position}
            rotation={rotation}
            scale={scale}
        >
            {/* Main mesh */}
            <mesh
                ref={meshRef}
                geometry={geometry}
                material={material}
                castShadow
                receiveShadow
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            />

            {/* Selection/hover outline */}
            {(isSelected || hovered) && (
                <mesh ref={outlineRef} geometry={geometry}>
                    <meshBasicMaterial
                        color={isSelected ? "#667eea" : "#8b5cf6"}
                        transparent
                        opacity={0.3}
                        side={THREE.BackSide}
                    />
                </mesh>
            )}

            {/* Selection ring on floor */}
            {isSelected && (
                <mesh
                    position={[0, -dimensions.h / 2 + 0.01, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                >
                    <ringGeometry args={[
                        Math.max(dimensions.w, dimensions.d) / 2 + 0.1,
                        Math.max(dimensions.w, dimensions.d) / 2 + 0.2,
                        32
                    ]} />
                    <meshBasicMaterial color="#667eea" transparent opacity={0.5} />
                </mesh>
            )}

            {/* Hover glow */}
            {hovered && !isSelected && (
                <pointLight
                    position={[0, dimensions.h, 0]}
                    intensity={0.3}
                    color="#8b5cf6"
                    distance={2}
                />
            )}
        </group>
    );
}

export default FurnitureItem;
