import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Float, Trail, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { PROJECTS } from '../constants';

const MorphingShape: React.FC<{ scrollOffset: number }> = ({ scrollOffset }) => {
  const groupRef = useRef<THREE.Group>(null);
  const baseLinesRef = useRef<THREE.LineSegments>(null);
  const drawLinesRef = useRef<THREE.LineSegments>(null);
  const lightLineRef = useRef<THREE.Line>(null);

  const baseGeometry = useMemo(() => {
    return new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(2, 2));
  }, []);

  const drawGeometry = useMemo(() => {
    return new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(2, 2));
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const loopDuration = 8;
    const progress = (t % loopDuration) / loopDuration;
    
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
      groupRef.current.rotation.z = Math.cos(t * 0.2) * 0.1;
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.3;
      groupRef.current.position.x = Math.cos(t * 0.25) * 0.2;
    }
    
    if (baseLinesRef.current) {
      const baseMat = baseLinesRef.current.material as THREE.LineBasicMaterial;
      baseMat.opacity = 0.3 + Math.sin(progress * Math.PI) * 0.2;
      baseMat.transparent = true;
    }
    
    if (drawLinesRef.current) {
      const drawGeo = drawLinesRef.current.geometry as THREE.BufferGeometry;
      const drawMat = drawLinesRef.current.material as THREE.LineBasicMaterial;
      
      const drawProgress = progress;
      const vertexCount = drawGeo.attributes.position.count;
      const visibleCount = Math.floor(vertexCount * drawProgress);
      drawGeo.setDrawRange(0, visibleCount);
      
      drawMat.opacity = 1;
      drawMat.transparent = true;
    }
    
    if (lightLineRef.current) {
      const lightGeo = lightLineRef.current.geometry as THREE.BufferGeometry;
      const lightMat = lightLineRef.current.material as THREE.LineBasicMaterial;
      
      const lightProgress = progress;
      const vertexCount = lightGeo.attributes.position.count;
      const lightIndex = Math.floor(vertexCount * lightProgress);
      lightGeo.setDrawRange(0, lightIndex + 1);
      
      lightMat.opacity = 1;
      lightMat.transparent = true;
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments ref={baseLinesRef} geometry={baseGeometry}>
        <lineBasicMaterial color="#22d3ee" transparent opacity={0.4} />
      </lineSegments>
      
      <lineSegments ref={drawLinesRef} geometry={drawGeometry}>
        <lineBasicMaterial color="#22d3ee" transparent opacity={1} />
      </lineSegments>
      
      <line ref={lightLineRef} geometry={baseGeometry}>
        <lineBasicMaterial color="#ffffff" transparent opacity={1} />
      </line>
    </group>
  );
};

const StarField: React.FC<{ scrollOffset: number }> = ({ scrollOffset }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  
  const { positions, colors, projectIndices } = useMemo(() => {
    const count = 50;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const projectIndices: number[] = [];
    
    const colorMap: Record<string, THREE.Color> = {
      'AI Agent': new THREE.Color('#f472b6'),
      'Web App': new THREE.Color('#22d3ee'),
      'Tool': new THREE.Color('#a3e635'),
      'Game': new THREE.Color('#fb923c'),
      'Framework': new THREE.Color('#a78bfa'),
      default: new THREE.Color('#22d3ee'),
    };
    
    PROJECTS.forEach((project, i) => {
      if (i >= count) return;
      projectIndices.push(i);
      
      const angle = (i / Math.min(count, PROJECTS.length)) * Math.PI * 2;
      const radius = 15 + Math.random() * 10;
      const height = (Math.random() - 0.5) * 30;
      
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius - 20;
      
      const projectColor = colorMap[project.category] || colorMap.default;
      colors[i * 3] = projectColor.r;
      colors[i * 3 + 1] = projectColor.g;
      colors[i * 3 + 2] = projectColor.b;
    });
    
    return { positions, colors, projectIndices };
  }, []);

  const linePositions = useMemo(() => {
    const lines: number[] = [];
    for (let i = 0; i < projectIndices.length - 1; i++) {
      const idx1 = projectIndices[i] * 3;
      const idx2 = projectIndices[i + 1] * 3;
      lines.push(positions[idx1], positions[idx1 + 1], positions[idx1 + 2]);
      lines.push(positions[idx2], positions[idx2 + 1], positions[idx2 + 2]);
    }
    return new Float32Array(lines);
  }, [positions, projectIndices]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (pointsRef.current) {
      const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < projectIndices.length; i++) {
        const i3 = i * 3;
        const pulse = 1 + Math.sin(time * 2 + i * 0.5) * 0.3;
        posArray[i3] += Math.sin(time + i) * 0.003;
        posArray[i3 + 1] += Math.cos(time * 0.7 + i) * 0.003;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
    
    if (linesRef.current) {
      const lineGeo = linesRef.current.geometry as THREE.BufferGeometry;
      const linePos = lineGeo.attributes.position.array as Float32Array;
      
      for (let i = 0; i < linePos.length; i += 3) {
        linePos[i + 2] += scrollOffset * 0.3;
        if (linePos[i + 2] > 10) {
          linePos[i + 2] = -30;
        }
      }
      lineGeo.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#22d3ee" transparent opacity={0.15} />
      </lineSegments>
      
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.4}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
        />
      </points>
    </>
  );
};

const WarpStars: React.FC<{ scrollOffset: number }> = ({ scrollOffset }) => {
  const starsRef = useRef<THREE.Points>(null);
  
  const { positions } = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    
    return { positions };
  }, []);

  useFrame((state) => {
    if (starsRef.current) {
      const time = state.clock.getElapsedTime();
      const posArray = starsRef.current.geometry.attributes.position.array as Float32Array;
      const velocity = 0.05 + Math.abs(scrollOffset) * 3;
      
      for (let i = 0; i < posArray.length / 3; i++) {
        posArray[i * 3 + 2] += velocity;
        
        if (posArray[i * 3 + 2] > 50) {
          posArray[i * 3 + 2] = -50;
        }
      }
      starsRef.current.geometry.attributes.position.needsUpdate = true;
      starsRef.current.rotation.z = time * 0.01;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#ffffff"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
};

const NavigationStars: React.FC<{ scrollOffset: number }> = ({ scrollOffset }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  const { positions, sizes } = useMemo(() => {
    const count = 100;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = -20 - Math.random() * 30;
      sizes[i] = 0.02 + Math.random() * 0.08;
    }
    
    return { positions, sizes };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.rotation.z = time * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color="#67e8f9"
          transparent
          opacity={0.7}
          sizeAttenuation
        />
      </points>
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
      const t = state.clock.getElapsedTime() * 0.3 + (scrollOffset * Math.PI * 2);
      const angle = angleStart + t;
      
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(angle * 2 + t) * 2; 

      groupRef.current.position.set(x, y, z);
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
    const targetZ = 10 - scrollOffset * 5;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    
    const targetRotZ = scrollOffset * 0.1;
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, targetRotZ, 0.05);

    const mouseX = state.pointer.x * 0.5;
    const mouseY = state.pointer.y * 0.5;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouseY, 0.05);
  });

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.2} />
      
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
      
      <StarField scrollOffset={scrollOffset} />
      <WarpStars scrollOffset={scrollOffset} />
      <NavigationStars scrollOffset={scrollOffset} />
      
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
