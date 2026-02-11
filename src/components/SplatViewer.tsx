"use client";

import { useEffect, useRef, useCallback } from "react";
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
 * @mkkellogg/gaussian-splats-3d の Viewer を直接使用
 */
export default function SplatViewer({
  url,
  onLoad,
  onError,
  autoRotate = true,
  className,
}: SplatViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<unknown>(null);
  const autoRotateTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const initialCameraPositionRef = useRef<THREE.Vector3>(new THREE.Vector3());
  const initialCameraTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const interactedRef = useRef(false);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);

  const handleInteraction = useCallback(() => {
    interactedRef.current = true;
    if (autoRotateTimerRef.current) {
      clearTimeout(autoRotateTimerRef.current);
      autoRotateTimerRef.current = undefined;
    }
  }, []);

  const handleReset = useCallback(() => {
    const viewer = viewerRef.current as {
      camera?: THREE.Camera;
      controls?: { target: THREE.Vector3; update: () => void };
    } | null;
    if (!viewer?.camera || !viewer?.controls) return;

    viewer.camera.position.copy(initialCameraPositionRef.current);
    viewer.controls.target.copy(initialCameraTargetRef.current);
    viewer.controls.update();
    interactedRef.current = false;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;

    async function init(container: HTMLDivElement) {
      try {
        const GaussianSplats3D = await import(
          "@mkkellogg/gaussian-splats-3d"
        );

        if (disposed) return;

        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(container.clientWidth, container.clientHeight);
        rendererRef.current = renderer;
        container.appendChild(renderer.domElement);

        const camera = new THREE.PerspectiveCamera(
          65,
          container.clientWidth / container.clientHeight,
          0.1,
          500
        );
        camera.position.set(0, 1, 5);
        initialCameraPositionRef.current.copy(camera.position);

        const viewer = new GaussianSplats3D.Viewer({
          threeScene: scene,
          renderer,
          camera,
          useBuiltInControls: true,
          selfDrivenMode: true,
          renderMode: GaussianSplats3D.RenderMode.Always,
          sceneRevealMode: GaussianSplats3D.SceneRevealMode.Gradual,
          logLevel: GaussianSplats3D.LogLevel.None,
          gpuAcceleratedSort: true,
        });

        viewerRef.current = viewer;

        await viewer.addSplatScene(url, {
          showLoadingUI: false,
          splatAlphaRemovalThreshold: 5,
        });

        if (disposed) {
          await viewer.dispose();
          return;
        }

        viewer.start();
        onLoad?.();

        // 自動回転: 3秒間だけ低速で回転
        if (autoRotate && viewer.controls) {
          const controls = viewer.controls as {
            autoRotate: boolean;
            autoRotateSpeed: number;
          };
          controls.autoRotate = true;
          controls.autoRotateSpeed = 0.5;

          autoRotateTimerRef.current = setTimeout(() => {
            controls.autoRotate = false;
          }, 3000);
        }

        // ユーザーインタラクション検出
        container.addEventListener("pointerdown", handleInteraction);
        container.addEventListener("wheel", handleInteraction);

        // リサイズ対応
        const ro = new ResizeObserver((entries) => {
          for (const entry of entries) {
            const { width, height } = entry.contentRect;
            if (width === 0 || height === 0) continue;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
          }
        });
        ro.observe(container);

        return () => ro.disconnect();
      } catch (err) {
        if (!disposed) {
          const error = err instanceof Error ? err : new Error(String(err));
          console.error("[SplatViewer] Load error:", error);
          onError?.(error);
        }
      }
    }

    const cleanupPromise = init(container);

    return () => {
      disposed = true;
      if (autoRotateTimerRef.current) {
        clearTimeout(autoRotateTimerRef.current);
      }
      container.removeEventListener("pointerdown", handleInteraction);
      container.removeEventListener("wheel", handleInteraction);

      const viewer = viewerRef.current as { dispose?: () => Promise<void> } | null;
      if (viewer?.dispose) {
        viewer.dispose();
      }
      viewerRef.current = null;

      if (rendererRef.current) {
        const domElement = rendererRef.current.domElement;
        if (domElement.parentNode) {
          domElement.parentNode.removeChild(domElement);
        }
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      sceneRef.current = null;

      cleanupPromise?.then((cleanup) => cleanup?.());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return (
    <div className={className} style={{ position: "relative", width: "100%", height: "100%" }}>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
      <button
        onClick={handleReset}
        aria-label="カメラ位置をリセット"
        className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-colors"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 12a9 9 0 1 1 3.26-6.92" />
          <path d="M3 2v5h5" />
        </svg>
      </button>
    </div>
  );
}
