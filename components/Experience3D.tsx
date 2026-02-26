import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Float, Stars, Trail, MeshTransmissionMaterial, Environment, Sparkles as DreiSparkles } from '@react-three/drei';
import * as THREE from 'three';
import { PROJECTS } from '../constants';

const SHAPES = ['sphere', 'knot', 'cube', 'triangle'] as const;
type ShapeType = typeof SHAPES[number];

const MorphingShape: React.FC<{ scrollOffset: number }> = ({ scrollOffset }) => {
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const [currentShapeIndex, setCurrentShapeIndex] = useState(0);
  const [targetShapeIndex, setTargetShapeIndex] = useState(0);
  const transitionProgress = useRef(0);
  const shapeChangeTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const changeShape = () => {
      setTargetShapeIndex((prev) => (prev + 1) % SHAPES.length);
      transitionProgress.current = 0;
    };

    shapeChangeTimer.current = setInterval(changeShape, 4000);
    return () => {
      if (shapeChangeTimer.current) clearInterval(shapeChangeTimer.current);
    };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    transitionProgress.current = Math.min(transitionProgress.current + 0.008, 1);
    const progress = THREE.MathUtils.smoothstep(transitionProgress.current, 0, 1);
    
    const prevScale = Math.sin(progress * Math.PI) * 0.3;
    const currScale = 1 - Math.sin(progress * Math.PI) * 0.3;

    meshRefs.current.forEach((mesh, idx) => {
      if (!mesh) return;
      
      const isPrev = idx === currentShapeIndex;
      const isCurr = idx === targetShapeIndex;
      
      if (isPrev || isCurr) {
        const scale = isPrev ? (1 - progress) : progress;
        mesh.scale.setScalar(scale * (1 + Math.sin(t * 2) * 0.05));
        mesh.visible = scale > 0.01;
      } else {
        mesh.visible = false;
        mesh.scale.setScalar(0);
      }
    });

    if (transitionProgress.current >= 1) {
      setCurrentShapeIndex(targetShapeIndex);
    }

    if (meshRefs.current[currentShapeIndex]) {
      meshRefs.current[currentShapeIndex].rotation.y = t * 0.15;
      meshRefs.current[currentShapeIndex].rotation.z = t * 0.08;
    }
  });

  const geometries = useMemo(() => [
    new THREE.SphereGeometry(1.8, 64, 64),
    new THREE.TorusKnotGeometry(1.2, 0.4, 128, 32),
    new THREE.BoxGeometry(2.8, 2.8, 2.8, 32, 32, 32),
    new THREE.IcosahedronGeometry(2, 1),
  ], []);

  return (
    <group>
      {SHAPES.map((shape, idx) => (
        <mesh
          key={shape}
          ref={(el) => { meshRefs.current[idx] = el; }}
          geometry={geometries[idx]}
          visible={idx === 0}
        >
          <MeshTransmissionMaterial
            backside
            backsideThickness={1}
            thickness={3}
            roughness={0.1}
            transmission={1}
            chromaticAberration={0.5}
            anisotropy={0.5}
            distortion={0.4}
            distortionScale={0.5}
            temporalDistortion={0.2}
            color="#a5f3fc"
            bg="#020617"
            toneMapped={true}
          />
        </mesh>
      ))}
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
        width={2} 
        length={8} 
        color={new THREE.Color(project.color).multiplyScalar(2)} // Boost brightness
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
      
      <Stars radius={150} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />
      <DreiSparkles count={100} scale={10} size={2} speed={0.4} opacity={0.5} color="#22d3ee" />
      
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
        dpr={[1, 2]} 
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ 
          antialias: true, 
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