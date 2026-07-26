"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import * as THREE from "three";
import { useIsMounted } from "@/hooks/useMounted";

interface Particle2D {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
}

export default function ThreeBackground() {
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

    // --- 1. Canvas Size and Orthographic Camera Setup ---
    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();

    // Orthographic camera for flat 2D layout (looks down Z-axis)
    const camera = new THREE.OrthographicCamera(
      -width / 2,
      width / 2,
      height / 2,
      -height / 2,
      1,
      1000
    );
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- 2. Particles Initialization ---
    // Generate particle count based on screen area (just like the old canvas did)
    const area = width * height;
    const particleDensity = 14000; // pixels per particle
    const particleCount = Math.min(Math.floor(area / particleDensity), 90);

    const particles: Particle2D[] = [];
    for (let i = 0; i < particleCount; i++) {
      const baseRadius = Math.random() * 2.2 + 1.2;
      particles.push({
        x: (Math.random() - 0.5) * width,
        y: (Math.random() - 0.5) * height,
        vx: (Math.random() - 0.5) * 0.7, // Original calm drifting speeds
        vy: (Math.random() - 0.5) * 0.7,
        baseRadius,
        radius: baseRadius,
      });
    }

    // Buffers for rendering points in WebGL
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const c1 = isDark ? new THREE.Color("#155dfc") : new THREE.Color("#132139"); // Royal Blue / Dark Navy
    const c2 = isDark ? new THREE.Color("#488bfb") : new THREE.Color("#396fc8"); // Accent Sky Blue / Accent Medium Blue

    // Setup Points Geometry
    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    pointsGeometry.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    // Smooth circle texture for points
    const createCircleTexture = () => {
      const size = 64;
      const textureCanvas = document.createElement("canvas");
      textureCanvas.width = size;
      textureCanvas.height = size;
      const ctx = textureCanvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(
          size / 2, size / 2, 0,
          size / 2, size / 2, size / 2
        );
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.8)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.15)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
      }
      return new THREE.CanvasTexture(textureCanvas);
    };

    const pointsMaterial = new THREE.PointsMaterial({
      size: 15, // Larger particles for visibility
      map: createCircleTexture(),
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.95 : 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(points);

    // --- 3. Line Connections Geometry (Plexus) ---
    const maxLines = (particleCount * particleCount) / 2 + particleCount;
    const linePositions = new Float32Array(maxLines * 2 * 3);
    const lineColors = new Float32Array(maxLines * 2 * 3);

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    linesGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.35 : 0.25,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const lineSegments = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lineSegments);

    // --- 4. Mouse Configuration ---
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      active: false,
      radius: 160, // Original interaction radius in pixels
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.active = true;
      const rect = canvas.getBoundingClientRect();
      const clientX = event.clientX - rect.left;
      const clientY = event.clientY - rect.top;
      // Convert to camera center coordinate (-width/2 to width/2)
      mouse.targetX = clientX - width / 2;
      mouse.targetY = -(clientY - height / 2); // Invert Y for WebGL
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        mouse.active = true;
        const rect = canvas.getBoundingClientRect();
        const clientX = event.touches[0].clientX - rect.left;
        const clientY = event.touches[0].clientY - rect.top;
        mouse.targetX = clientX - width / 2;
        mouse.targetY = -(clientY - height / 2);
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // --- 5. Animation Loop ---
    let frameId: number;
    const maxConnectDist = 80; // Shrunk to have more isolated particles when no mouse

    const animate = () => {
      // Smooth mouse coordinate interpolation (inertia)
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // 5a. Update Particle Positions and Physics
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];

        // Apply normal drift speed
        p.x += p.vx;
        p.y += p.vy;

        // Bounce back from boundaries (canvas edges)
        const marginX = width / 2;
        const marginY = height / 2;

        if (p.x < -marginX) { p.x = -marginX; p.vx *= -1; }
        if (p.x > marginX) { p.x = marginX; p.vx *= -1; }
        if (p.y < -marginY) { p.y = -marginY; p.vy *= -1; }
        if (p.y > marginY) { p.y = marginY; p.vy *= -1; }

        // Mouse gravity interaction (attract and push away when leaving)
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            // Gravity pull
            p.vx += (dx / dist) * force * 0.015;
            p.vy += (dy / dist) * force * 0.015;

            p.radius = p.baseRadius + force * 2.5;
          } else if (dist < mouse.radius * 1.5) {
            // Slingshot push-away force when exiting the cursor range
            const force = (mouse.radius * 1.5 - dist) / (mouse.radius * 0.5);
            p.vx -= (dx / dist) * force * 0.035;
            p.vy -= (dy / dist) * force * 0.035;
            p.radius += (p.baseRadius - p.radius) * 0.05;
          } else {
            p.radius += (p.baseRadius - p.radius) * 0.05;
          }
        } else {
          p.radius += (p.baseRadius - p.radius) * 0.05;
        }

        // Apply drag/friction
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const normalMaxSpeed = 0.6;
        const maxAllowedSpeed = 1.8;

        if (speed > maxAllowedSpeed) {
          p.vx = (p.vx / speed) * maxAllowedSpeed;
          p.vy = (p.vy / speed) * maxAllowedSpeed;
        } else if (speed > normalMaxSpeed) {
          p.vx *= 0.95;
          p.vy *= 0.95;
        }

        // Write points into WebGL buffer (Z is flat 0)
        particlePositions[i * 3] = p.x;
        particlePositions[i * 3 + 1] = p.y;
        particlePositions[i * 3 + 2] = 0;

        // Colors: Default to base color c1 (purple). Interpolate to c2 (blue) if near active mouse.
        const color = c1.clone();
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const ratio = 1 - dist / mouse.radius;
            color.lerp(c2, ratio);
          }
        }
        particleColors[i * 3] = color.r;
        particleColors[i * 3 + 1] = color.g;
        particleColors[i * 3 + 2] = color.b;
      }

      pointsGeometry.attributes.position.needsUpdate = true;
      pointsGeometry.attributes.color.needsUpdate = true;

      // 5b. Update Lines segment buffer
      let lineIndex = 0;
      const linePosArray = linesGeometry.attributes.position.array as Float32Array;
      const lineColorArray = linesGeometry.attributes.color.array as Float32Array;

      const marginX = width / 2;

      for (let i = 0; i < particleCount; i++) {
        const p1 = particles[i];

        // Draw connections between close particles
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            linePosArray[lineIndex * 6] = p1.x;
            linePosArray[lineIndex * 6 + 1] = p1.y;
            linePosArray[lineIndex * 6 + 2] = 0;

            linePosArray[lineIndex * 6 + 3] = p2.x;
            linePosArray[lineIndex * 6 + 4] = p2.y;
            linePosArray[lineIndex * 6 + 5] = 0;

            // Fade lines based on distance
            const alpha = 1 - dist / maxConnectDist;
            const rc1 = c1.clone().lerp(c2, (p1.x + marginX) / width);
            const rc2 = c1.clone().lerp(c2, (p2.x + marginX) / width);

            // Highlight connections if close to active mouse
            let isHighlighted = false;
            if (mouse.active) {
              const d1 = Math.sqrt((mouse.x - p1.x) ** 2 + (mouse.y - p1.y) ** 2);
              const d2 = Math.sqrt((mouse.x - p2.x) ** 2 + (mouse.y - p2.y) ** 2);
              isHighlighted = d1 < mouse.radius || d2 < mouse.radius;
            }

            const brightness = isHighlighted ? (isDark ? 0.7 : 0.55) : (isDark ? 0.35 : 0.22);
            lineColorArray[lineIndex * 6] = rc1.r * alpha * brightness;
            lineColorArray[lineIndex * 6 + 1] = rc1.g * alpha * brightness;
            lineColorArray[lineIndex * 6 + 2] = rc1.b * alpha * brightness;

            lineColorArray[lineIndex * 6 + 3] = rc2.r * alpha * brightness;
            lineColorArray[lineIndex * 6 + 4] = rc2.g * alpha * brightness;
            lineColorArray[lineIndex * 6 + 5] = rc2.b * alpha * brightness;

            lineIndex++;
          }
        }

        // Draw dynamic connection from particle to mouse cursor
        if (mouse.active) {
          const dxMouse = mouse.x - p1.x;
          const dyMouse = mouse.y - p1.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (distMouse < mouse.radius) {
            linePosArray[lineIndex * 6] = p1.x;
            linePosArray[lineIndex * 6 + 1] = p1.y;
            linePosArray[lineIndex * 6 + 2] = 0;

            linePosArray[lineIndex * 6 + 3] = mouse.x;
            linePosArray[lineIndex * 6 + 4] = mouse.y;
            linePosArray[lineIndex * 6 + 5] = 0;

            const alpha = (1 - distMouse / mouse.radius) * 0.8;
            const rc1 = c1.clone().lerp(c2, (p1.x + marginX) / width);

            const brightness = isDark ? 0.8 : 0.55;
            lineColorArray[lineIndex * 6] = rc1.r * alpha * brightness;
            lineColorArray[lineIndex * 6 + 1] = rc1.g * alpha * brightness;
            lineColorArray[lineIndex * 6 + 2] = rc1.b * alpha * brightness;

            lineColorArray[lineIndex * 6 + 3] = c2.r * alpha * brightness;
            lineColorArray[lineIndex * 6 + 4] = c2.g * alpha * brightness;
            lineColorArray[lineIndex * 6 + 5] = c2.b * alpha * brightness;

            lineIndex++;
          }
        }
      }

      linesGeometry.attributes.position.needsUpdate = true;
      linesGeometry.attributes.color.needsUpdate = true;
      linesGeometry.setDrawRange(0, lineIndex * 2);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    // --- 6. Resize handler ---
    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;

      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // --- 7. Cleanup WebGL Context ---
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);

      pointsGeometry.dispose();
      pointsMaterial.dispose();
      if (pointsMaterial.map) pointsMaterial.map.dispose();

      linesGeometry.dispose();
      linesMaterial.dispose();

      renderer.dispose();
    };
  }, [isDark]);

  if (!mounted) {
    return (
      <div
        suppressHydrationWarning
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      suppressHydrationWarning
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        suppressHydrationWarning
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
