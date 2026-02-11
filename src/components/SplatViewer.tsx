"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface SplatViewerProps {
  url: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  autoRotate?: boolean;
  className?: string;
}

/**
 * Gaussian Splat (PLY/KSPLAT) を表示するコンポーネント
 *
 * DropInViewer を使用し、Three.js の renderer/camera/scene を完全に自前管理。
 * ライブラリのDOM管理（rootElement）を一切使わないため、
 * Reactコンテナ内に安定して埋め込み可能。
 */
export default function SplatViewer({
  url,
  onLoad,
  onError,
  autoRotate = true,
  className,
}: SplatViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let animId = 0;
    let renderer: THREE.WebGLRenderer | null = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let controls: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let dropIn: any = null;

    async function init(container: HTMLDivElement) {
      try {
        const mod = await import("@mkkellogg/gaussian-splats-3d");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const GS3D = (mod as any).default ?? mod;

        if (disposed) return;

        const rect = container.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        // --- Renderer ---
        renderer = new THREE.WebGLRenderer({ antialias: false });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(rect.width, rect.height);
        renderer.setClearColor(new THREE.Color(0xf5f7f3), 1.0);
        container.appendChild(renderer.domElement);

        // --- Scene ---
        const scene = new THREE.Scene();

        // --- Camera ---
        const camera = new THREE.PerspectiveCamera(
          65,
          rect.width / rect.height,
          0.1,
          500
        );
        camera.position.set(0, 5, 12);
        camera.up.set(0, -1, 0);
        camera.lookAt(0, 0, 0);

        // --- DropInViewer（ライブラリのDOM管理を完全バイパス）---
        dropIn = new GS3D.DropInViewer({
          gpuAcceleratedSort: true,
          sharedMemoryForWorkers:
            typeof crossOriginIsolated !== "undefined" && crossOriginIsolated,
        });
        scene.add(dropIn);

        // --- OrbitControls ---
        controls = new GS3D.OrbitControls(camera, renderer.domElement);
        controls.enablePan = false;
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.rotateSpeed = 0.5;
        controls.minDistance = 3;
        controls.maxDistance = 30;
        controls.maxPolarAngle = Math.PI * 0.75;
        controls.minPolarAngle = 0.1;
        controls.target.set(0, 0, 0);
        controls.update();

        // --- モデル読み込み ---
        await dropIn.addSplatScene(url, {
          showLoadingUI: false,
          splatAlphaRemovalThreshold: 5,
        });

        if (disposed) return;

        onLoad?.();

        // --- 自動回転 ---
        if (autoRotate) {
          controls.autoRotate = true;
          controls.autoRotateSpeed = 0.5;
          setTimeout(() => {
            if (!disposed && controls) controls.autoRotate = false;
          }, 5000);
        }

        // --- アニメーションループ ---
        const localRenderer = renderer;
        function animate() {
          if (disposed) return;
          animId = requestAnimationFrame(animate);
          controls?.update();
          localRenderer.render(scene, camera);
        }
        animate();

        // --- リサイズ ---
        const ro = new ResizeObserver((entries) => {
          for (const entry of entries) {
            const { width, height } = entry.contentRect;
            if (width === 0 || height === 0) return;
            localRenderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
          }
        });
        ro.observe(container);

        return () => ro.disconnect();
      } catch (err) {
        if (!disposed) {
          const error = err instanceof Error ? err : new Error(String(err));
          console.error("[SplatViewer] error:", error);
          onError?.(error);
        }
      }
    }

    const cleanupPromise = init(container);

    return () => {
      disposed = true;
      cancelAnimationFrame(animId);
      if (controls) {
        controls.dispose();
        controls = null;
      }
      if (renderer) {
        renderer.domElement.remove();
        renderer.dispose();
        renderer = null;
      }
      if (dropIn?.viewer) {
        try {
          dropIn.viewer.dispose();
        } catch {
          /* ignore: dropInMode has no DOM to clean */
        }
      }
      cleanupPromise?.then((cleanup) => cleanup?.());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    />
  );
}
