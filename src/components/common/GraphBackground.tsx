import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function GraphBackground() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.z = 120;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Torus knot wireframe with a subtle glow
    const torusGeom = new THREE.TorusKnotGeometry(90, 18, 240, 48);
    const edges = new THREE.EdgesGeometry(torusGeom);
    const coreMaterial = new THREE.LineBasicMaterial({
      color: 0x4ef4ff,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    });
    const torusLines = new THREE.LineSegments(edges, coreMaterial);

    const glowMaterial = new THREE.LineBasicMaterial({
      color: 0xe86a20,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const glowEdges = new THREE.LineSegments(edges.clone(), glowMaterial);
    glowEdges.scale.multiplyScalar(1.04);

    scene.add(glowEdges);
    scene.add(torusLines);

    const animate = () => {
      requestAnimationFrame(animate);

      torusLines.rotation.x += 0.001;
      torusLines.rotation.y += 0.0015;
      glowEdges.rotation.x = torusLines.rotation.x;
      glowEdges.rotation.y = torusLines.rotation.y;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    />
  );
}

export default GraphBackground;
