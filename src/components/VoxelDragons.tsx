import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Dragon configuration
interface DragonConfig {
  id: number;
  startX: number;
  y: number;
  z: number;
  speed: number;
  direction: 1 | -1;
  scale: number;
  wingSpeed: number;
  tailSpeed: number;
}

// Generate random dragons
const generateDragons = (count: number): DragonConfig[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    startX: Math.random() * 40 - 20,
    y: Math.random() * 8 - 4,
    z: Math.random() * 15 - 25, // -25 to -10 (behind camera plane)
    speed: 0.8 + Math.random() * 1.2,
    direction: Math.random() > 0.5 ? 1 : -1,
    scale: 0.3 + Math.random() * 0.4,
    wingSpeed: 3 + Math.random() * 2,
    tailSpeed: 2 + Math.random() * 1.5,
  }));
};

// Voxel Dragon Component
const VoxelDragon = ({ config }: { config: DragonConfig }) => {
  const groupRef = useRef<THREE.Group>(null);
  const leftWingRef = useRef<THREE.Group>(null);
  const rightWingRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Group>(null);
  const tail2Ref = useRef<THREE.Group>(null);
  const tail3Ref = useRef<THREE.Group>(null);

  // Materials
  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x1a1a2e),
        roughness: 0.8,
        metalness: 0.2,
      }),
    []
  );

  const wingMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x2d1b4e),
        roughness: 0.7,
        metalness: 0.1,
        transparent: true,
        opacity: 0.9,
      }),
    []
  );

  const eyeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x9b59b6),
        emissive: new THREE.Color(0x9b59b6),
        emissiveIntensity: 2,
        roughness: 0.3,
      }),
    []
  );

  const accentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x4a1a6b),
        roughness: 0.6,
        metalness: 0.3,
      }),
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();

    // Move dragon across screen
    groupRef.current.position.x += config.speed * 0.02 * config.direction;

    // Reset position when off screen
    if (config.direction === 1 && groupRef.current.position.x > 25) {
      groupRef.current.position.x = -25;
    } else if (config.direction === -1 && groupRef.current.position.x < -25) {
      groupRef.current.position.x = 25;
    }

    // Body roll and pitch
    groupRef.current.rotation.z = Math.sin(time * 0.5) * 0.1;
    groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.05;

    // Wing flapping
    if (leftWingRef.current && rightWingRef.current) {
      const wingAngle = Math.sin(time * config.wingSpeed) * 0.4;
      leftWingRef.current.rotation.z = wingAngle + 0.2;
      rightWingRef.current.rotation.z = -wingAngle - 0.2;
    }

    // Tail movement
    if (tailRef.current) {
      tailRef.current.rotation.y = Math.sin(time * config.tailSpeed) * 0.3;
      tailRef.current.rotation.x = Math.sin(time * config.tailSpeed * 0.7) * 0.1;
    }
    if (tail2Ref.current) {
      tail2Ref.current.rotation.y = Math.sin(time * config.tailSpeed + 0.5) * 0.4;
    }
    if (tail3Ref.current) {
      tail3Ref.current.rotation.y = Math.sin(time * config.tailSpeed + 1) * 0.5;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[config.startX, config.y, config.z]}
      scale={config.scale}
      rotation={[0, config.direction === 1 ? 0 : Math.PI, 0]}
    >
      {/* Main Body */}
      <mesh material={bodyMaterial} position={[0, 0, 0]}>
        <boxGeometry args={[3, 1.5, 1.5]} />
      </mesh>

      {/* Chest */}
      <mesh material={accentMaterial} position={[0.8, -0.3, 0]}>
        <boxGeometry args={[1.5, 1, 1.2]} />
      </mesh>

      {/* Head */}
      <group position={[2.2, 0.3, 0]}>
        <mesh material={bodyMaterial}>
          <boxGeometry args={[1.2, 1, 1]} />
        </mesh>
        {/* Snout */}
        <mesh material={bodyMaterial} position={[0.7, -0.1, 0]}>
          <boxGeometry args={[0.8, 0.6, 0.7]} />
        </mesh>
        {/* Eyes */}
        <mesh material={eyeMaterial} position={[0.3, 0.2, 0.4]}>
          <boxGeometry args={[0.25, 0.25, 0.15]} />
        </mesh>
        <mesh material={eyeMaterial} position={[0.3, 0.2, -0.4]}>
          <boxGeometry args={[0.25, 0.25, 0.15]} />
        </mesh>
        {/* Horns */}
        <mesh material={accentMaterial} position={[-0.2, 0.6, 0.3]} rotation={[0, 0, 0.3]}>
          <boxGeometry args={[0.15, 0.5, 0.15]} />
        </mesh>
        <mesh material={accentMaterial} position={[-0.2, 0.6, -0.3]} rotation={[0, 0, 0.3]}>
          <boxGeometry args={[0.15, 0.5, 0.15]} />
        </mesh>
      </group>

      {/* Left Wing */}
      <group ref={leftWingRef} position={[0, 0.5, 0.8]}>
        {/* Wing arm */}
        <mesh material={bodyMaterial} position={[0, 0.3, 0.8]} rotation={[0, 0, 0.5]}>
          <boxGeometry args={[0.3, 1.5, 0.25]} />
        </mesh>
        {/* Wing membrane segments */}
        <mesh material={wingMaterial} position={[-0.3, 0.8, 1.2]}>
          <boxGeometry args={[1.5, 0.1, 1]} />
        </mesh>
        <mesh material={wingMaterial} position={[-0.8, 0.6, 1.5]}>
          <boxGeometry args={[1.2, 0.1, 0.8]} />
        </mesh>
        <mesh material={wingMaterial} position={[-1.2, 0.4, 1.8]}>
          <boxGeometry args={[0.8, 0.1, 0.6]} />
        </mesh>
        {/* Wing fingers */}
        <mesh material={bodyMaterial} position={[0.2, 0.8, 1.8]} rotation={[0, 0, 0.2]}>
          <boxGeometry args={[0.15, 0.8, 0.15]} />
        </mesh>
        <mesh material={bodyMaterial} position={[-0.5, 0.7, 2]} rotation={[0, 0, 0.4]}>
          <boxGeometry args={[0.15, 0.7, 0.15]} />
        </mesh>
      </group>

      {/* Right Wing */}
      <group ref={rightWingRef} position={[0, 0.5, -0.8]}>
        <mesh material={bodyMaterial} position={[0, 0.3, -0.8]} rotation={[0, 0, -0.5]}>
          <boxGeometry args={[0.3, 1.5, 0.25]} />
        </mesh>
        <mesh material={wingMaterial} position={[-0.3, 0.8, -1.2]}>
          <boxGeometry args={[1.5, 0.1, 1]} />
        </mesh>
        <mesh material={wingMaterial} position={[-0.8, 0.6, -1.5]}>
          <boxGeometry args={[1.2, 0.1, 0.8]} />
        </mesh>
        <mesh material={wingMaterial} position={[-1.2, 0.4, -1.8]}>
          <boxGeometry args={[0.8, 0.1, 0.6]} />
        </mesh>
        <mesh material={bodyMaterial} position={[0.2, 0.8, -1.8]} rotation={[0, 0, -0.2]}>
          <boxGeometry args={[0.15, 0.8, 0.15]} />
        </mesh>
        <mesh material={bodyMaterial} position={[-0.5, 0.7, -2]} rotation={[0, 0, -0.4]}>
          <boxGeometry args={[0.15, 0.7, 0.15]} />
        </mesh>
      </group>

      {/* Tail */}
      <group ref={tailRef} position={[-1.8, 0, 0]}>
        <mesh material={bodyMaterial}>
          <boxGeometry args={[1.2, 0.8, 0.8]} />
        </mesh>
        {/* Spikes */}
        <mesh material={accentMaterial} position={[0, 0.5, 0]}>
          <boxGeometry args={[0.2, 0.4, 0.2]} />
        </mesh>

        <group ref={tail2Ref} position={[-0.9, 0, 0]}>
          <mesh material={bodyMaterial}>
            <boxGeometry args={[1, 0.6, 0.6]} />
          </mesh>
          <mesh material={accentMaterial} position={[0, 0.4, 0]}>
            <boxGeometry args={[0.18, 0.35, 0.18]} />
          </mesh>

          <group ref={tail3Ref} position={[-0.8, 0, 0]}>
            <mesh material={bodyMaterial}>
              <boxGeometry args={[0.8, 0.4, 0.4]} />
            </mesh>
            {/* Tail tip */}
            <mesh material={accentMaterial} position={[-0.5, 0, 0]}>
              <boxGeometry args={[0.5, 0.5, 0.5]} />
            </mesh>
            <mesh material={accentMaterial} position={[-0.8, 0, 0]}>
              <boxGeometry args={[0.3, 0.6, 0.3]} />
            </mesh>
          </group>
        </group>
      </group>

      {/* Legs */}
      <group position={[0.5, -0.9, 0.5]}>
        <mesh material={bodyMaterial}>
          <boxGeometry args={[0.4, 0.8, 0.4]} />
        </mesh>
        <mesh material={bodyMaterial} position={[0.2, -0.5, 0]}>
          <boxGeometry args={[0.5, 0.3, 0.35]} />
        </mesh>
      </group>
      <group position={[0.5, -0.9, -0.5]}>
        <mesh material={bodyMaterial}>
          <boxGeometry args={[0.4, 0.8, 0.4]} />
        </mesh>
        <mesh material={bodyMaterial} position={[0.2, -0.5, 0]}>
          <boxGeometry args={[0.5, 0.3, 0.35]} />
        </mesh>
      </group>
      <group position={[-1, -0.8, 0.4]}>
        <mesh material={bodyMaterial}>
          <boxGeometry args={[0.35, 0.6, 0.35]} />
        </mesh>
      </group>
      <group position={[-1, -0.8, -0.4]}>
        <mesh material={bodyMaterial}>
          <boxGeometry args={[0.35, 0.6, 0.35]} />
        </mesh>
      </group>
    </group>
  );
};

// Floating particles
const Particles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 100;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = Math.random() * -30;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    const time = state.clock.getElapsedTime();

    const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] -= 0.01; // Fall down
      posArray[i * 3] += Math.sin(time + i) * 0.002; // Sway

      // Reset particles that fall too low
      if (posArray[i * 3 + 1] < -10) {
        posArray[i * 3 + 1] = 10;
        posArray[i * 3] = (Math.random() - 0.5) * 50;
      }
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color={0x9b59b6}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Scene content
const Scene = ({ dragonCount = 5 }: { dragonCount?: number }) => {
  const dragons = useMemo(() => generateDragons(dragonCount), [dragonCount]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} color={0x9b8fd9} />
      <directionalLight position={[-10, -5, -5]} intensity={0.3} color={0x6b5b95} />
      <pointLight position={[0, 5, -10]} intensity={0.5} color={0x9b59b6} />

      {/* Dragons */}
      {dragons.map((config) => (
        <VoxelDragon key={config.id} config={config} />
      ))}

      {/* Particles */}
      <Particles />
    </>
  );
};

// Main component
interface VoxelDragonsProps {
  dragonCount?: number;
  enabled?: boolean;
}

const VoxelDragons = ({ dragonCount = 5, enabled = true }: VoxelDragonsProps) => {
  if (!enabled) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none z-20"
      style={{ opacity: 0.85 }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]} // Limit pixel ratio for performance
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene dragonCount={dragonCount} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default VoxelDragons;
