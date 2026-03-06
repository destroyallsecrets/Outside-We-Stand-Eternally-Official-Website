import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Float, Stars, Trail, MeshTransmissionMaterial, Environment, Sparkles as DreiSparkles } from '@react-three/drei';
import * as THREE from 'three';
import { PROJECTS } from '../constants';

const SHAPES = ['sphere', 'knot', 'cube', 'triangle'] as const;
type ShapeType = typeof SHAPES[number];

const MorphingShape: React.FC<{ scrollOffset: number }> = ({ scrollOffset }) => {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(2, 2));
    return geo;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
      groupRef.current.rotation.z = Math.cos(t * 0.2) * 0.1;
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.3;
      groupRef.current.position.x = Math.cos(t * 0.25) * 0.2;
    }
    
    if (linesRef.current) {
      const geo = linesRef.current.geometry as THREE.BufferGeometry;
      const count = geo.attributes.position.count;
      const progress = (t * 30) % count;
      geo.setDrawRange(0, progress);
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#22d3ee" />
      </lineSegments>
    </group>
  );
};

const OrbitingProject: React.FC<{ 
  index: number; 
  total: number; 
  project: typeof PROJECTS[0];
  scrollOffset: number; 
}> = ({ index, total, project, scrollOffset }) => {
  const groupRef = useRef<THREE.Group>(null);
  const radius = 4.5;
  const angleStart = (index / total) * Math.PI * 2;

  useFrame((state) => {
    if (groupRef.current) {
      // Calculate orbital position
      // We speed up rotation based on scroll to give a "warp speed" feeling
      const t = state.clock.getElapsedTime() * 0.3 + (scrollOffset * Math.PI * 2);
      const angle = angleStart + t;
      
      // Mobius Strip Logic: The Y position oscillates twice per revolution
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(angle * 2 + t) * 2; 

      groupRef.current.position.set(x, y, z);
      
      // Ensure text always faces camera
      groupRef.current.lookAt(state.camera.position);
    }
  });

  return (
    <group ref={groupRef}>
      <Trail
        width={1.5} 
        length={4} 
        color={new THREE.Color(project.color).multiplyScalar(2)}
        attenuation={(t) => t * t}
      >
        <mesh>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color={project.color} toneMapped={false} />
        </mesh>
      </Trail>
      
      <Float speed={4} rotationIntensity={0.5} floatIntensity={0.2}>
        <Text
          position={[0, 0.4, 0]}
          fontSize={0.25}
          font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
          anchorX="center"
          anchorY="middle"
          color="white"
          outlineWidth={0.02}
          outlineColor={project.color}
        >
          {project.title.toUpperCase()}
        </Text>
      </Float>
    </group>
  );
};

const SceneContent: React.FC<{ scrollOffset: number }> = ({ scrollOffset }) => {
  const { camera } = useThree();

  useFrame((state) => {
    // Cinematic Camera Movement
    // Zoom in/out based on scroll
    const targetZ = 10 - scrollOffset * 5;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    
    // Slight camera roll for dynamic feel
    const targetRotZ = scrollOffset * 0.1;
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, targetRotZ, 0.05);

    // Mouse parallax influence (subtle)
    const mouseX = state.pointer.x * 0.5;
    const mouseY = state.pointer.y * 0.5;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouseY, 0.05);
  });

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.2} />
      
      {/* Cinematic Lighting Setup */}
      <pointLight position={[10, 10, 10]} intensity={2} color="#22d3ee" distance={20} decay={2} />
      <pointLight position={[-10, -5, -10]} intensity={2} color="#e879f9" distance={20} decay={2} />
      <spotLight 
        position={[0, 10, 0]} 
        angle={0.5} 
        penumbra={1} 
        intensity={3} 
        color="#ffffff" 
        castShadow 
      />
      
      <Stars radius={100} depth={30} count={3000} factor={3} saturation={0} fade speed={0.5} />
      <DreiSparkles count={50} scale={8} size={1.5} speed={0.3} opacity={0.4} color="#22d3ee" />
      
      <MorphingShape scrollOffset={scrollOffset} />

      {PROJECTS.map((project, idx) => (
        <OrbitingProject 
          key={project.id} 
          index={idx} 
          total={PROJECTS.length} 
          project={project}
          scrollOffset={scrollOffset}
        />
      ))}
    </>
  );
};

export const Experience3D: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
  return (
    <div className="fixed inset-0 z-0 bg-slate-950 pointer-events-none">
      <Canvas 
        dpr={[1, 1.5]} 
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ 
          antialias: true, 
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
          alpha: true
        }}
      >
        <SceneContent scrollOffset={scrollProgress} />
      </Canvas>
    </div>
  );
};