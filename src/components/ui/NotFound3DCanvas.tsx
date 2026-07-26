"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import * as THREE from "three";
import { useIsMounted } from "@/hooks/useMounted";

export default function NotFound3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const mounted = useIsMounted();
  const isDark = mounted ? resolvedTheme !== "light" : true;

  useEffect(() => {
    if (!mounted) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const fogColor = isDark ? 0x020507 : 0xf8f8f9;
    scene.fog = new THREE.FogExp2(fogColor, 0.0012);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Realistic Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 1.2 : 1.8);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(isDark ? 0x38bdf8 : 0x0284c7, isDark ? 4.0 : 5.0);
    mainLight.position.set(12, 12, 10);
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(isDark ? 0xa855f7 : 0x2563eb, isDark ? 2.5 : 3.0);
    rimLight.position.set(-12, -10, -5);
    scene.add(rimLight);

    const planetPointLight = new THREE.PointLight(isDark ? 0x38bdf8 : 0x0284c7, isDark ? 6 : 8, 30);
    planetPointLight.position.set(7.5, -2, 5);
    scene.add(planetPointLight);

    // 3. Stars / Space Particles Background
    const starsCount = 950;
    const starsGeometry = new THREE.BufferGeometry();
    const starsPositions = new Float32Array(starsCount * 3);
    const starsColors = new Float32Array(starsCount * 3);

    const c1 = isDark ? new THREE.Color("#488bfb") : new THREE.Color("#0284c7");
    const c2 = isDark ? new THREE.Color("#155dfc") : new THREE.Color("#2563eb");
    const c3 = isDark ? new THREE.Color("#ffffff") : new THREE.Color("#0369a1");

    for (let i = 0; i < starsCount; i++) {
      starsPositions[i * 3] = (Math.random() - 0.5) * 85;
      starsPositions[i * 3 + 1] = (Math.random() - 0.5) * 85;
      starsPositions[i * 3 + 2] = (Math.random() - 0.5) * 85;

      const rand = Math.random();
      const starColor = rand > 0.6 ? c1 : rand > 0.3 ? c2 : c3;
      starsColors[i * 3] = starColor.r;
      starsColors[i * 3 + 1] = starColor.g;
      starsColors[i * 3 + 2] = starColor.b;
    }

    starsGeometry.setAttribute("position", new THREE.BufferAttribute(starsPositions, 3));
    starsGeometry.setAttribute("color", new THREE.BufferAttribute(starsColors, 3));

    const createStarTexture = () => {
      const size = 32;
      const tCanvas = document.createElement("canvas");
      tCanvas.width = size;
      tCanvas.height = size;
      const ctx = tCanvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
        if (isDark) {
          grad.addColorStop(0, "rgba(255, 255, 255, 1)");
          grad.addColorStop(0.3, "rgba(72, 139, 251, 0.8)");
          grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        } else {
          grad.addColorStop(0, "rgba(2, 132, 199, 1)");
          grad.addColorStop(0.4, "rgba(37, 99, 235, 0.7)");
          grad.addColorStop(1, "rgba(248, 248, 249, 0)");
        }
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, size, size);
      }
      return new THREE.CanvasTexture(tCanvas);
    };

    const starsMaterial = new THREE.PointsMaterial({
      size: isDark ? 0.7 : 0.8,
      map: createStarTexture(),
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.9 : 0.75,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });

    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    // 4. REALISTIC 3D PLANET (Right side)
    const mainPlanetGroup = new THREE.Group();
    scene.add(mainPlanetGroup);

    const planetRadius = 4.2;
    const planetGeometry = new THREE.SphereGeometry(planetRadius, 64, 64);

    // Create Detailed Procedural Texture for Continents, Oceans & Craters
    const createRealisticPlanetTexture = () => {
      const size = 1024;
      const pCanvas = document.createElement("canvas");
      pCanvas.width = size;
      pCanvas.height = size;
      const ctx = pCanvas.getContext("2d");
      if (ctx) {
        // Deep Ocean Base
        const bgGrad = ctx.createLinearGradient(0, 0, size, size);
        if (isDark) {
          bgGrad.addColorStop(0, "#091e3a");
          bgGrad.addColorStop(0.5, "#0b2b52");
          bgGrad.addColorStop(1, "#031024");
        } else {
          bgGrad.addColorStop(0, "#0284c7");
          bgGrad.addColorStop(0.5, "#0369a1");
          bgGrad.addColorStop(1, "#075985");
        }
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, size, size);

        // Draw Organic Continent Landmasses
        const landColors = isDark
          ? ["#1e40af", "#1d4ed8", "#2563eb", "#3b82f6", "#155dfc"]
          : ["#38bdf8", "#7dd3fc", "#0284c7", "#bae6fd"];

        for (let i = 0; i < 28; i++) {
          const cx = Math.random() * size;
          const cy = Math.random() * size;
          const r = Math.random() * 140 + 50;

          ctx.beginPath();
          ctx.ellipse(cx, cy, r, r * (Math.random() * 0.5 + 0.5), Math.random() * Math.PI, 0, Math.PI * 2);
          ctx.fillStyle = landColors[Math.floor(Math.random() * landColors.length)];
          ctx.fill();

          // Sub-islands
          for (let j = 0; j < 4; j++) {
            const ix = cx + (Math.random() - 0.5) * r * 1.4;
            const iy = cy + (Math.random() - 0.5) * r * 1.4;
            const ir = Math.random() * 35 + 10;
            ctx.beginPath();
            ctx.arc(ix, iy, ir, 0, Math.PI * 2);
            ctx.fillStyle = landColors[Math.floor(Math.random() * landColors.length)];
            ctx.fill();
          }
        }

        // Craters & Topography Details
        for (let k = 0; k < 60; k++) {
          const crX = Math.random() * size;
          const crY = Math.random() * size;
          const crR = Math.random() * 18 + 4;

          ctx.beginPath();
          ctx.arc(crX, crY, crR, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? "rgba(3, 16, 36, 0.45)" : "rgba(3, 105, 161, 0.35)";
          ctx.fill();

          ctx.beginPath();
          ctx.arc(crX - crR * 0.25, crY - crR * 0.25, crR * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
          ctx.fill();
        }
      }
      return new THREE.CanvasTexture(pCanvas);
    };

    // Procedural Bump Map for 3D Elevation
    const createPlanetBumpMap = () => {
      const size = 512;
      const bCanvas = document.createElement("canvas");
      bCanvas.width = size;
      bCanvas.height = size;
      const ctx = bCanvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#808080";
        ctx.fillRect(0, 0, size, size);

        for (let i = 0; i < 40; i++) {
          const bx = Math.random() * size;
          const by = Math.random() * size;
          const br = Math.random() * 60 + 10;

          const grad = ctx.createRadialGradient(bx, by, 0, bx, by, br);
          grad.addColorStop(0, "#ffffff");
          grad.addColorStop(1, "#808080");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(bx, by, br, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      return new THREE.CanvasTexture(bCanvas);
    };

    const planetTexture = createRealisticPlanetTexture();
    const bumpMapTexture = createPlanetBumpMap();

    const planetMaterial = new THREE.MeshStandardMaterial({
      map: planetTexture,
      bumpMap: bumpMapTexture,
      bumpScale: 0.12,
      roughness: 0.45,
      metalness: 0.1,
      emissive: isDark ? 0x09264a : 0x0284c7,
      emissiveIntensity: isDark ? 0.35 : 0.25,
    });

    const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
    mainPlanetGroup.add(planetMesh);

    // Semi-Transparent Cloud Atmosphere Layer
    const cloudGeometry = new THREE.SphereGeometry(planetRadius * 1.025, 48, 48);
    const createCloudTexture = () => {
      const size = 512;
      const cCanvas = document.createElement("canvas");
      cCanvas.width = size;
      cCanvas.height = size;
      const ctx = cCanvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "rgba(0,0,0,0)";
        ctx.fillRect(0, 0, size, size);

        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        for (let i = 0; i < 35; i++) {
          const x = Math.random() * size;
          const y = Math.random() * size;
          const r = Math.random() * 80 + 20;

          ctx.beginPath();
          ctx.ellipse(x, y, r * 1.8, r * 0.6, Math.random() * Math.PI, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      return new THREE.CanvasTexture(cCanvas);
    };
    const cloudTexture = createCloudTexture();
    const cloudMaterial = new THREE.MeshStandardMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    mainPlanetGroup.add(cloudMesh);

    // Glowing Outer Atmosphere Rim
    const atmoGeometry = new THREE.SphereGeometry(planetRadius * 1.06, 32, 32);
    const atmoMaterial = new THREE.MeshBasicMaterial({
      color: isDark ? 0x38bdf8 : 0x0284c7,
      transparent: true,
      opacity: isDark ? 0.25 : 0.35,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });
    const atmoMesh = new THREE.Mesh(atmoGeometry, atmoMaterial);
    mainPlanetGroup.add(atmoMesh);

    // Detailed Saturn-like Orbital Rings
    const ringGeometry = new THREE.RingGeometry(planetRadius * 1.3, planetRadius * 1.85, 64);
    ringGeometry.rotateX(Math.PI / 2.2);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: isDark ? 0x38bdf8 : 0x0284c7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: isDark ? 0.45 : 0.6,
      wireframe: true,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    mainPlanetGroup.add(ringMesh);

    // Outer Thin Ring
    const outerRingGeometry = new THREE.RingGeometry(planetRadius * 2.0, planetRadius * 2.05, 64);
    outerRingGeometry.rotateX(Math.PI / 2.1);
    const outerRingMaterial = new THREE.MeshBasicMaterial({
      color: isDark ? 0xa855f7 : 0x2563eb,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const outerRingMesh = new THREE.Mesh(outerRingGeometry, outerRingMaterial);
    mainPlanetGroup.add(outerRingMesh);

    // Update Planet Position
    const updatePlanetPosition = () => {
      if (window.innerWidth < 768) {
        mainPlanetGroup.position.set(0, -5.5, 0);
        mainPlanetGroup.scale.set(0.75, 0.75, 0.75);
      } else {
        mainPlanetGroup.position.set(7.5, -2, 0);
        mainPlanetGroup.scale.set(1, 1, 1);
      }
    };
    updatePlanetPosition();

    // 5. Interactive Drag & Spin Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    const velocity = { x: 0, y: 0 };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      previousMousePosition = { x: clientX, y: clientY };
      canvas.style.cursor = "grabbing";
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const deltaX = clientX - previousMousePosition.x;
        const deltaY = clientY - previousMousePosition.y;

        velocity.x = deltaX * 0.008;
        velocity.y = deltaY * 0.008;

        mainPlanetGroup.rotation.y += velocity.x;
        mainPlanetGroup.rotation.x += velocity.y;

        previousMousePosition = { x: clientX, y: clientY };
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
      canvas.style.cursor = "grab";
    };

    canvas.style.cursor = "grab";
    canvas.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);

    canvas.addEventListener("touchstart", handlePointerDown, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    window.addEventListener("touchend", handlePointerUp);

    // 6. Animation Loop
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      if (!isDragging) {
        velocity.x *= 0.95;
        velocity.y *= 0.95;

        mainPlanetGroup.rotation.y += velocity.x + 0.004;
        mainPlanetGroup.rotation.x += velocity.y + 0.0008;
      }

      cloudMesh.rotation.y += 0.006;
      ringMesh.rotation.z = elapsedTime * 0.06;
      outerRingMesh.rotation.z = -elapsedTime * 0.04;
      starField.rotation.y = elapsedTime * 0.015;

      const floatY = Math.sin(elapsedTime * 1.2) * 0.4;
      if (window.innerWidth < 768) {
        mainPlanetGroup.position.y = -5.5 + floatY;
      } else {
        mainPlanetGroup.position.y = -2 + floatY;
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    // 7. Resize Handler
    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      updatePlanetPosition();
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      canvas.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);

      canvas.removeEventListener("touchstart", handlePointerDown);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerUp);

      window.removeEventListener("resize", handleResize);

      starsGeometry.dispose();
      starsMaterial.dispose();
      if (starsMaterial.map) starsMaterial.map.dispose();

      planetGeometry.dispose();
      planetMaterial.dispose();
      planetTexture.dispose();
      bumpMapTexture.dispose();

      cloudGeometry.dispose();
      cloudMaterial.dispose();
      cloudTexture.dispose();

      atmoGeometry.dispose();
      atmoMaterial.dispose();

      ringGeometry.dispose();
      ringMaterial.dispose();
      outerRingGeometry.dispose();
      outerRingMaterial.dispose();

      renderer.dispose();
    };
  }, [isDark, mounted]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
