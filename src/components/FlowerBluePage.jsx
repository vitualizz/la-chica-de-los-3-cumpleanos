import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Función para crear los vértices de la rosa usando matemáticas paramétricas
function generateRoseGeometry(cols = 600, rows = 30, opening = 2, vDensity = 8, pAlign = 3.6, curve1 = 2, curve2 = 1.3) {
  const vertices = [];
  const faces = [];
  const colors = [];
  
  const t_D = (180 * 15) / cols;
  const r_D = 1 / rows;
  
  // Generar vértices
  for (let r = 0; r <= rows; r++) {
    for (let theta = 0; theta <= cols; theta++) {
      const phi = (180 / opening) * Math.exp((-theta * t_D) / (vDensity * 180));
      const petalCut = 1 - (1/2) * Math.pow((5/4) * Math.pow(1 - ((pAlign * theta * t_D % 360) / 180), 2) - 1/4, 2);
      const hangDown = curve1 * Math.pow(r * r_D, 2) * Math.pow(curve2 * r * r_D - 1, 2) * Math.sin((phi * Math.PI) / 180);
      
      const pX = 2.6 * petalCut * (r * r_D * Math.sin((phi * Math.PI) / 180) + hangDown * Math.cos((phi * Math.PI) / 180)) * Math.sin((theta * t_D * Math.PI) / 180);
      const pY = 2.6 * petalCut * (r * r_D * Math.cos((phi * Math.PI) / 180) - hangDown * Math.sin((phi * Math.PI) / 180)); // Invertido (sin el negativo)
      const pZ = 2.6 * petalCut * (r * r_D * Math.sin((phi * Math.PI) / 180) + hangDown * Math.cos((phi * Math.PI) / 180)) * Math.cos((theta * t_D * Math.PI) / 180);
      
      vertices.push(pX, pY, pZ);
      
      // Color gradient from dark blue to light blue
      const brightness = 0.2 + r * r_D * 0.8;
      colors.push(brightness, brightness, brightness);
    }
  }
  
  // Generar caras (triangles)
  for (let r = 0; r < rows; r++) {
    for (let theta = 0; theta < cols; theta++) {
      const current = r * (cols + 1) + theta;
      const next = current + cols + 1;
      
      // Primer triángulo
      faces.push(current, next, next + 1);
      // Segundo triángulo
      faces.push(current, next + 1, current + 1);
    }
  }
  
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(faces);
  geometry.computeVertexNormals();
  
  return geometry;
}

// Componente de la rosa paramétrica
function ParametricRose() {
  const meshRef = useRef();
  
  const geometry = useMemo(() => {
    return generateRoseGeometry(600, 30, 2, 8, 3.6, 2, 1.3);
  }, []);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.rotation.y = time * 0.15;
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.03;
    }
  });
  
  return (
    <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow position={[0, 0, 0]}>
      <meshStandardMaterial
        vertexColors
        color="#5BA3F5"
        roughness={0.3}
        metalness={0.15}
        side={THREE.DoubleSide}
        envMapIntensity={0.6}
      />
    </mesh>
  );
}

// Tallo mejorado con matemática de curva suave
function Stem() {
  const meshRef = useRef();
  
  const geometry = useMemo(() => {
    // Crear una curva más natural usando función matemática
    const points = [];
    const segments = 100;
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const y = -t * 6.5; // Longitud del tallo (más largo)
      
      // Agregar curvatura natural con función sinusoidal amortiguada
      const x = Math.sin(t * Math.PI * 2) * 0.06 * (1 - t * 0.5);
      const z = Math.cos(t * Math.PI * 3) * 0.04 * (1 - t * 0.7);
      
      points.push(new THREE.Vector3(x, y, z));
    }
    
    const curve = new THREE.CatmullRomCurve3(points);
    
    return new THREE.TubeGeometry(curve, 100, 0.065, 16, false);
  }, []);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      // Balanceo muy sutil del tallo
      meshRef.current.rotation.z = Math.sin(time * 0.4) * 0.02;
      meshRef.current.rotation.x = Math.cos(time * 0.3) * 0.01;
    }
  });
  
  return (
    <mesh ref={meshRef} geometry={geometry} castShadow position={[0, 0.1, 0]}>
      <meshStandardMaterial
        color="#2d5016"
        roughness={0.6}
        metalness={0.1}
      />
    </mesh>
  );
}

// Hojas mejoradas con forma más simple y realista
function Leaves() {
  const leafGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    
    // Forma de hoja simple y elegante
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.4, 0.1, 0.5, 0.4, 0.35, 0.8);
    shape.bezierCurveTo(0.25, 1.0, 0.1, 1.1, 0, 1.05);
    shape.bezierCurveTo(-0.1, 1.1, -0.25, 1.0, -0.35, 0.8);
    shape.bezierCurveTo(-0.5, 0.4, -0.4, 0.1, 0, 0);
    
    const extrudeSettings = {
      steps: 1,
      depth: 0.04,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 2
    };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);
  
  return (
    <group>
      {/* Hoja 1 - Izquierda superior */}
      <mesh
        geometry={leafGeometry}
        position={[0.15, -2.5, 0]}
        rotation={[1.2, 0, -1.0]}
        scale={[0.8, 0.8, 1]}
        castShadow
      >
        <meshStandardMaterial
          color="#3a7d23"
          roughness={0.5}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Hoja 2 - Derecha media */}
      <mesh
        geometry={leafGeometry}
        position={[0.13, -3.8, 0.15]}
        rotation={[1.2, 0, 0.8]}
        scale={[0.9, 0.9, 1]}
        castShadow
      >
        <meshStandardMaterial
          color="#4a9d2e"
          roughness={0.5}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Hoja 3 - Izquierda inferior */}
      <mesh
        geometry={leafGeometry}
        position={[0.1, -5.0, 0.05]}
        rotation={[1.25, 0, -0.7]}
        scale={[0.85, 0.85, 1]}
        castShadow
      >
        <meshStandardMaterial
          color="#356b1f"
          roughness={0.5}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// Fondo más iluminado
function Background() {
  return (
    <>
      {/* Fondo principal más claro */}
      <mesh position={[0, 0, -8]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          color="#2a2a3e"
          roughness={0.9}
          metalness={0}
        />
      </mesh>
      
      {/* Piso */}
      <mesh position={[0, -6, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#1f1f2e"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
    </>
  );
}

export default function App() {
  const [isMobile, _setIsMobile] = useState(window.innerWidth < 768);

  return (
    <div className="w-full h-screen bg-gradient-to-b from-slate-800 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Texto romántico */}
      <div className="absolute top-4 sm:top-8 left-0 right-0 z-10 text-center px-4">
        <h3 className="text-lg sm:text-2xl md:text-4xl font-light text-blue-200 tracking-wide drop-shadow-lg">
          Esta rosa hecha de matemáticas no se marchita.
          <br />
          Y pensar que siempre dije que lo fugaz era la regla… parece que alguna excepción tenía que existir, ¿no?.
        </h3>
      </div>

      {/* Canvas 3D */}
      <Canvas shadows className="w-full h-full">
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={isMobile ? 100 : 55} />
        
        {/* Iluminación mejorada - más brillante */}
        <ambientLight intensity={0.6} color="#f0f0ff" />
        
        {/* Luz principal más intensa */}
        <directionalLight
          position={[5, 10, 7]}
          intensity={1.8}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        {/* Luz de relleno lateral */}
        <pointLight
          position={[-6, 3, 4]}
          intensity={1.0}
          color="#b8d8ff"
        />
        
        {/* Luz trasera para contorno */}
        <pointLight
          position={[0, 5, -6]}
          intensity={0.8}
          color="#ffffff"
        />
        
        {/* Luz inferior suave */}
        <pointLight
          position={[0, -4, 2]}
          intensity={0.5}
          color="#a8c8ff"
        />
        
        {/* Rosa paramétrica */}
        <ParametricRose />
        
        {/* Tallo mejorado */}
        <Stem />
        
        {/* Hojas mejoradas */}
        <Leaves />
        
        {/* Fondo */}
        <Background />
        
        {/* Environment más claro */}
        <Environment preset="sunset" />
        
        {/* Controles de cámara */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={5}
          maxDistance={18}
          maxPolarAngle={Math.PI / 1.5}
          autoRotate={false}
          target={[0, -2, 0]}
        />
      </Canvas>

      <div className="text-blue-400 font-bold text-sm absolute bottom-4 sm:bottom-8 left-0 right-0 z-10 text-center px-4">
        <br />
        (Puedes mover la rosa, producto de estudiar mucho y 3 red bulls csmre, no esperes menos de nadie mrda añañañaña)
      </div>

      {/* Partículas flotantes más visibles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-blue-200 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3 + Math.random() * 0.3,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-30px) scale(1.3);
          }
        }
      `}</style>
    </div>
  );
}
