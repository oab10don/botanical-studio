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
  const wrapperRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const viewerRef = useRef<any>(null);
  const autoRotateTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleInteraction = useCallback(() => {
    if (autoRotateTimerRef.current) {
      clearTimeout(autoRotateTimerRef.current);
      autoRotateTimerRef.current = undefined;
    }
    const viewer = viewerRef.current;
    if (viewer?.controls) {
      viewer.controls.autoRotate = false;
    }
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let disposed = false;

    // React が管理しないコンテナを作成し、Viewerに渡す
    const container = document.createElement("div");
    container.style.width = "100%";
    container.style.height = "100%";
    wrapper.appendChild(container);

    async function init() {
      try {
        const mod = await import("@mkkellogg/gaussian-splats-3d");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const GS3D = (mod as any).default ?? mod;

        if (disposed) return;

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

        if (autoRotate && viewer.controls) {
          viewer.controls.autoRotate = true;
          viewer.controls.autoRotateSpeed = 0.5;
          autoRotateTimerRef.current = setTimeout(() => {
            if (viewer.controls) viewer.controls.autoRotate = false;
          }, 3000);
        }

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

    init();

    return () => {
      disposed = true;
      if (autoRotateTimerRef.current) clearTimeout(autoRotateTimerRef.current);
      container.removeEventListener("pointerdown", handleInteraction);
      container.removeEventListener("wheel", handleInteraction);

      const viewer = viewerRef.current;
      if (viewer?.dispose) {
        try { viewer.dispose(); } catch { /* ignore cleanup errors */ }
      }
      viewerRef.current = null;

      // Viewerが管理していたコンテナごと削除
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return (
    <div className={className} style={{ position: "relative", width: "100%", height: "100%" }}>
      <div ref={wrapperRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
