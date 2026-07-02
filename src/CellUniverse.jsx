import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const clusterColors = [0x69e2ff, 0xffc857, 0xff6b8b, 0x8cff8a, 0xd6a4ff];

function makeRandom(seed) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function createCells(count = 190) {
  const random = makeRandom(1847);
  return Array.from({ length: count }, (_, index) => {
    const cluster = index % clusterColors.length;
    return {
      cluster,
      phase: random() * Math.PI * 2,
      speed: 0.6 + random() * 0.9,
      seedA: random(),
      seedB: random(),
      seedC: random(),
      position: new THREE.Vector3(),
      target: new THREE.Vector3(),
    };
  });
}

function setTarget(cell, mode, index) {
  const angle = cell.seedA * Math.PI * 2;
  const spread = 0.65 + cell.seedB * 0.9;
  const clusterCenters = [
    new THREE.Vector3(-2.9, 0.9, -0.5),
    new THREE.Vector3(-1.1, -1.15, 0.5),
    new THREE.Vector3(1.15, 1.0, 0.9),
    new THREE.Vector3(2.85, -0.55, -0.4),
    new THREE.Vector3(0.1, 0.15, 1.35),
  ];

  if (mode === "cluster") {
    const center = clusterCenters[cell.cluster];
    cell.target.set(
      center.x + Math.cos(angle) * spread,
      center.y + Math.sin(angle * 1.2) * spread * 0.72,
      center.z + (cell.seedC - 0.5) * 1.5,
    );
    return;
  }

  if (mode === "trajectory") {
    const branch = cell.cluster - 2;
    const t = index / 190;
    const bend = Math.sin(t * Math.PI * 2.8);
    cell.target.set(
      -3.2 + t * 6.4,
      branch * 0.28 + bend * (0.45 + Math.abs(branch) * 0.12),
      Math.cos(t * Math.PI * 4 + branch) * 0.75 + branch * 0.22,
    );
    return;
  }

  if (mode === "niche") {
    const ring = 0.8 + cell.cluster * 0.36 + cell.seedB * 0.55;
    const zLift = cell.cluster === 1 || cell.cluster === 3 ? 0.85 : -0.25;
    cell.target.set(
      Math.cos(angle) * ring,
      Math.sin(angle) * ring * 0.62,
      zLift + Math.sin(angle * 3) * 0.55 + (cell.seedC - 0.5) * 0.5,
    );
    return;
  }

  const radius = 0.75 + cell.seedA * 2.65;
  const layer = (cell.cluster - 2) * 0.25;
  cell.target.set(
    Math.cos(angle) * radius * 1.15 + Math.sin(cell.seedB * 8) * 0.25,
    Math.sin(angle) * radius * 0.7 + layer,
    Math.sin(radius * 2.5 + angle) * 0.7 + (cell.seedC - 0.5) * 0.5,
  );
}

export default function CellUniverse({ mode }) {
  const mountRef = useRef(null);
  const modeRef = useRef(mode);
  const cells = useMemo(() => createCells(), []);

  useEffect(() => {
    modeRef.current = mode;
    cells.forEach((cell, index) => setTarget(cell, mode, index));
  }, [cells, mode]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 8.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    group.rotation.x = -0.18;
    scene.add(group);

    const geometry = new THREE.SphereGeometry(0.082, 18, 18);
    const material = new THREE.MeshPhysicalMaterial({
      roughness: 0.32,
      metalness: 0.06,
      transparent: true,
      opacity: 0.93,
      vertexColors: true,
      emissive: 0x061018,
      emissiveIntensity: 0.24,
    });
    const mesh = new THREE.InstancedMesh(geometry, material, cells.length);
    group.add(mesh);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.08,
      wireframe: true,
    });
    const ring = new THREE.Mesh(new THREE.TorusKnotGeometry(2.45, 0.012, 140, 8, 2, 5), ringMaterial);
    ring.rotation.x = Math.PI / 2.7;
    group.add(ring);

    cells.forEach((cell, index) => {
      setTarget(cell, modeRef.current, index);
      cell.position.copy(cell.target);
      mesh.setColorAt(index, new THREE.Color(clusterColors[cell.cluster]));
    });
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

    const ambient = new THREE.AmbientLight(0xffffff, 1.5);
    const key = new THREE.DirectionalLight(0x9defff, 2.3);
    key.position.set(3, 3, 5);
    const warm = new THREE.PointLight(0xffcf74, 2.2, 10);
    warm.position.set(-3, -2, 4);
    scene.add(ambient, key, warm);

    const dummy = new THREE.Object3D();
    const pointer = { x: 0, y: 0 };
    let frameId = 0;

    function resize() {
      const { width, height } = mount.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    }

    function onPointerMove(event) {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    }

    function animate(time) {
      const t = time * 0.001;
      group.rotation.y += (pointer.x * 0.18 - group.rotation.y) * 0.025;
      group.rotation.x += (-0.18 - pointer.y * 0.08 - group.rotation.x) * 0.025;
      ring.rotation.z = t * 0.08;

      cells.forEach((cell, index) => {
        cell.position.lerp(cell.target, 0.035);
        const float = Math.sin(t * cell.speed + cell.phase) * 0.065;
        dummy.position.set(cell.position.x, cell.position.y + float, cell.position.z);
        const scale = 0.82 + cell.seedC * 0.45 + Math.sin(t + cell.phase) * 0.06;
        dummy.scale.setScalar(scale);
        dummy.updateMatrix();
        mesh.setMatrixAt(index, dummy.matrix);
      });
      mesh.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);
    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      geometry.dispose();
      material.dispose();
      ring.geometry.dispose();
      ringMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [cells]);

  return <div className="cell-universe" ref={mountRef} aria-hidden="true" />;
}
