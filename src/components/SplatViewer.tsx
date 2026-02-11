"use client";

import { useEffect, useRef, useCallback } from "react";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const viewerRef = useRef<any>(null);
  const autoRotateTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleInteraction = useCallback(() => {
    if (autoRotateTimerRef.current) {
      clearTimeout(autoRotateTimerRef.current);
      autoRotateTimerRef.current = undefined;
    }
    // 自動回転を止める
    const viewer = viewerRef.current;
    if (viewer?.controls) {
      viewer.controls.autoRotate = false;
    }
  }, []);

  const handleReset = useCallback(() => {
    // ページリロードでリセット（viewer のカメラ初期位置はviewer内部が管理）
    const viewer = viewerRef.current;
    if (!viewer) return;
    // controls.reset() があれば使う
    if (viewer.controls?.reset) {
      viewer.controls.reset();
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;

    async function init(container: HTMLDivElement) {
      try {
        const mod = await import("@mkkellogg/gaussian-splats-3d");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const GS3D = (mod as any).default ?? mod;

        if (disposed) return;

        // Viewerに全てを任せる（Scene, Renderer, Camera を自動管理）
        const viewer = new GS3D.Viewer({
          rootElement: container,
          useBuiltInControls: true,
          selfDrivenMode: true,
          renderMode: GS3D.RenderMode?.Always ?? 0,
          sceneRevealMode: GS3D.SceneRevealMode?.Instant ?? 2,
          logLevel: GS3D.LogLevel?.None ?? 0,
          gpuAcceleratedSort: true,
          sharedMemoryForWorkers: true,
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

        // 自動回転
        if (autoRotate && viewer.controls) {
          viewer.controls.autoRotate = true;
          viewer.controls.autoRotateSpeed = 0.5;

          autoRotateTimerRef.current = setTimeout(() => {
            if (viewer.controls) {
              viewer.controls.autoRotate = false;
            }
          }, 3000);
        }

        // ユーザーインタラクション検出
        container.addEventListener("pointerdown", handleInteraction);
        container.addEventListener("wheel", handleInteraction);
      } catch (err) {
        if (!disposed) {
          const error = err instanceof Error ? err : new Error(String(err));
          console.error("[SplatViewer] Load error:", error);
          onError?.(error);
        }
      }
    }

    init(container);

    return () => {
      disposed = true;
      if (autoRotateTimerRef.current) {
        clearTimeout(autoRotateTimerRef.current);
      }
      container.removeEventListener("pointerdown", handleInteraction);
      container.removeEventListener("wheel", handleInteraction);

      const viewer = viewerRef.current;
      if (viewer?.dispose) {
        viewer.dispose();
      }
      viewerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return (
    <div className={className} style={{ position: "relative", width: "100%", height: "100%" }}>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
      <button
        onClick={handleReset}
        aria-label="カメラ位置をリセット"
        className="absolute bottom-4 right-4 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-colors"
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
