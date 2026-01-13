import { useMemo } from 'react';
import * as THREE from 'three';
import useDesignStore from '../../store/useDesignStore';

function Room() {
    const { room } = useDesignStore();
    const { width, depth, height, wallColor, floorColor } = room;

    // Create materials 
    const wallMaterial = useMemo(() =>
        new THREE.MeshStandardMaterial({
            color: wallColor,
            roughness: 0.9,
            metalness: 0,
            side: THREE.DoubleSide
        }), [wallColor]);

    const floorMaterial = useMemo(() =>
        new THREE.MeshStandardMaterial({
            color: floorColor,
            roughness: 0.8,
            metalness: 0.1,
        }), [floorColor]);

    // Wall thickness
    const wallThickness = 0.1;

    return (
        <group>
            {/* Floor */}
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0, 0]}
                receiveShadow
            >
                <planeGeometry args={[width, depth]} />
                <primitive object={floorMaterial} />
            </mesh>

            {/* Back Wall */}
            <mesh
                position={[0, height / 2, -depth / 2]}
                receiveShadow
            >
                <boxGeometry args={[width, height, wallThickness]} />
                <primitive object={wallMaterial} />
            </mesh>

            {/* Left Wall */}
            <mesh
                position={[-width / 2, height / 2, 0]}
                receiveShadow
            >
                <boxGeometry args={[wallThickness, height, depth]} />
                <primitive object={wallMaterial} />
            </mesh>

            {/* Right Wall (half height for open feel) */}
            <mesh
                position={[width / 2, height / 4, 0]}
                receiveShadow
            >
                <boxGeometry args={[wallThickness, height / 2, depth]} />
                <meshStandardMaterial
                    color={wallColor}
                    roughness={0.9}
                    transparent
                    opacity={0.3}
                />
            </mesh>

            {/* Floor border/edge detail */}
            <mesh
                position={[0, 0.02, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
            >
                <ringGeometry args={[Math.max(width, depth) / 2 - 0.1, Math.max(width, depth) / 2, 64]} />
                <meshBasicMaterial color="#667eea" transparent opacity={0.1} />
            </mesh>

            {/* Ceiling light fixture point */}
            <mesh position={[0, height - 0.1, 0]}>
                <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} />
                <meshStandardMaterial color="#faf089" emissive="#faf089" emissiveIntensity={0.5} />
            </mesh>

            {/* Corner accent lights */}
            <pointLight position={[-width / 2 + 0.5, 0.5, -depth / 2 + 0.5]} intensity={0.1} color="#667eea" />
            <pointLight position={[width / 2 - 0.5, 0.5, -depth / 2 + 0.5]} intensity={0.1} color="#d946ef" />
        </group>
    );
}

export default Room;
