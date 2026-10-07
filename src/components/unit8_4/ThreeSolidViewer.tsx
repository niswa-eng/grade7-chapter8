import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface ThreeSolidViewerProps {
  solidId: string;
  isInteractMode: boolean;
  highlightFaces?: boolean;
  highlightEdges?: boolean;
  highlightVertices?: boolean;
  orthoView?: 'front' | 'side' | 'plan' | null;
}

export const ThreeSolidViewer: React.FC<ThreeSolidViewerProps> = ({
  solidId,
  isInteractMode,
  highlightFaces,
  highlightEdges,
  highlightVertices,
  orthoView
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(true);
  const [isWireframe, setIsWireframe] = useState<boolean>(false);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Drag interaction state
  const isDraggingRef = useRef<boolean>(false);
  const prevPointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Reset camera view
  const handleResetCamera = () => {
    if (cameraRef.current && meshGroupRef.current) {
      cameraRef.current.position.set(2.8, 2.2, 3.2);
      cameraRef.current.lookAt(0, 0, 0);
      meshGroupRef.current.rotation.set(0, 0, 0);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xf8fafc);

    // Camera
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
    camera.position.set(2.8, 2.2, 3.2);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x93c5fd, 0.4);
    dirLight2.position.set(-5, -3, -5);
    scene.add(dirLight2);

    // Group for the solid
    const meshGroup = new THREE.Group();
    scene.add(meshGroup);
    meshGroupRef.current = meshGroup;

    // Floor grid shadow / indicator
    const gridHelper = new THREE.GridHelper(4, 8, 0x94a3b8, 0xe2e8f0);
    gridHelper.position.y = -1.2;
    scene.add(gridHelper);

    // Floor direction arrow helper (Front is -Z, Side is +X)
    const arrowDir = new THREE.Vector3(0, 0, -1);
    const arrowOrigin = new THREE.Vector3(0, -1.18, 1.6);
    const arrowHelper = new THREE.ArrowHelper(arrowDir, arrowOrigin, 0.8, 0x2563eb, 0.25, 0.15);
    scene.add(arrowHelper);

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      renderer.dispose();
      container.innerHTML = '';
    };
  }, []);

  // Update solid geometry
  useEffect(() => {
    const meshGroup = meshGroupRef.current;
    if (!meshGroup) return;

    // Clear old geometry
    while (meshGroup.children.length > 0) {
      const obj = meshGroup.children[0] as THREE.Mesh;
      if (obj.geometry) obj.geometry.dispose();
      meshGroup.remove(obj);
    }

    let geom: THREE.BufferGeometry;
    let solidColor = 0x3b82f6;

    switch (solidId) {
      case 'cuboid':
        geom = new THREE.BoxGeometry(2.2, 1.2, 1.4);
        solidColor = 0x0ea5e9;
        break;
      case 'triangular_prism': {
        const shape = new THREE.Shape();
        shape.moveTo(-0.9, -0.6);
        shape.lineTo(0.9, -0.6);
        shape.lineTo(0, 0.9);
        shape.closePath();
        const extrudeSettings = { depth: 1.8, bevelEnabled: false };
        geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        geom.center();
        solidColor = 0x10b981;
        break;
      }
      case 'square_pyramid':
        geom = new THREE.ConeGeometry(1.3, 1.8, 4);
        geom.rotateY(Math.PI / 4);
        solidColor = 0xf59e0b;
        break;
      case 'tetrahedron':
        geom = new THREE.TetrahedronGeometry(1.4);
        solidColor = 0xec4899;
        break;
      case 'cylinder':
        geom = new THREE.CylinderGeometry(0.9, 0.9, 1.9, 32);
        solidColor = 0x8b5cf6;
        break;
      case 'cone':
        geom = new THREE.ConeGeometry(1.1, 2.0, 32);
        solidColor = 0xf97316;
        break;
      case 'sphere':
        geom = new THREE.SphereGeometry(1.1, 32, 24);
        solidColor = 0x06b6d4;
        break;
      case 'cube':
      default:
        geom = new THREE.BoxGeometry(1.6, 1.6, 1.6);
        solidColor = 0x3b82f6;
        break;
    }

    // Material
    const material = new THREE.MeshStandardMaterial({
      color: solidColor,
      roughness: 0.35,
      metalness: 0.1,
      wireframe: isWireframe
    });

    const mesh = new THREE.Mesh(geom, material);
    meshGroup.add(mesh);

    // Clear dark edges
    const edgesGeom = new THREE.EdgesGeometry(geom);
    const edgesMat = new THREE.LineBasicMaterial({
      color: 0x0f172a,
      linewidth: 3
    });
    const edgeLines = new THREE.LineSegments(edgesGeom, edgesMat);
    meshGroup.add(edgeLines);
  }, [solidId, isWireframe]);

  // Handle Orthographic camera views
  useEffect(() => {
    const camera = cameraRef.current;
    const meshGroup = meshGroupRef.current;
    if (!camera || !meshGroup) return;

    if (orthoView === 'front') {
      setIsAutoRotate(false);
      camera.position.set(0, 0, 4.2);
      camera.lookAt(0, 0, 0);
      meshGroup.rotation.set(0, 0, 0);
    } else if (orthoView === 'side') {
      setIsAutoRotate(false);
      camera.position.set(4.2, 0, 0); // Viewed from the right side
      camera.lookAt(0, 0, 0);
      meshGroup.rotation.set(0, 0, 0);
    } else if (orthoView === 'plan') {
      setIsAutoRotate(false);
      camera.position.set(0, 4.2, 0); // Viewed from top
      camera.lookAt(0, 0, 0);
      meshGroup.rotation.set(0, 0, 0);
    }
  }, [orthoView]);

  // Animation Loop
  useEffect(() => {
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const renderer = rendererRef.current;
    const meshGroup = meshGroupRef.current;

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      if (isAutoRotate && meshGroup && !isDraggingRef.current) {
        meshGroup.rotation.y += 0.008;
      }

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    };

    animate();

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isAutoRotate]);

  // Touch pointer handlers for Orbit rotation
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isInteractMode) return;
    isDraggingRef.current = true;
    prevPointerRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isInteractMode || !isDraggingRef.current || !meshGroupRef.current) return;
    const dx = e.clientX - prevPointerRef.current.x;
    const dy = e.clientY - prevPointerRef.current.y;
    prevPointerRef.current = { x: e.clientX, y: e.clientY };

    meshGroupRef.current.rotation.y += dx * 0.01;
    meshGroupRef.current.rotation.x += dy * 0.01;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none overflow-hidden rounded-3xl">
      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`w-full h-full ${isInteractMode ? 'cursor-grab active:cursor-grabbing touch-none' : 'pointer-events-none'}`}
      />

      {/* Control Buttons Floating Bar */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-lg border border-slate-200 z-10">
        <button
          onClick={() => setIsAutoRotate(!isAutoRotate)}
          className={`px-3 py-2 rounded-xl font-bold text-xs transition-all active:scale-95 ${
            isAutoRotate ? 'bg-purple-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
          title="Auto-rotate solid"
        >
          {isAutoRotate ? 'Pause Spin' : 'Auto Rotate'}
        </button>

        <button
          onClick={() => setIsWireframe(!isWireframe)}
          className={`px-3 py-2 rounded-xl font-bold text-xs transition-all active:scale-95 ${
            isWireframe ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
          title="Toggle wireframe mode"
        >
          {isWireframe ? 'Solid' : 'Wireframe'}
        </button>

        <button
          onClick={handleResetCamera}
          className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs active:scale-95"
          title="Reset 3D camera"
        >
          Reset View
        </button>
      </div>
    </div>
  );
};
