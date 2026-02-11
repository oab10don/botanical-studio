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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
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
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;

    async function init(container: HTMLDivElement) {
      try {
        const mod = await import("@mkkellogg/gaussian-splats-3d");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const GS3D = (mod as any).default ?? mod;

        if (disposed) return;

        // rootElement無しで生成（document.bodyにCanvasが追加される）
        const viewer = new GS3D.Viewer({
          useBuiltInControls: true,
          selfDrivenMode: true,
          renderMode: GS3D.RenderMode?.Always ?? 0,
          sceneRevealMode: GS3D.SceneRevealMode?.Instant ?? 2,
          logLevel: GS3D.LogLevel?.None ?? 0,
          gpuAcceleratedSort: true,
          sharedMemoryForWorkers:
            typeof crossOriginIsolated !== "undefined" && crossOriginIsolated,
        });

        viewerRef.current = viewer;

        // Viewerが document.body に追加した canvas を自分のコンテナに移動
        const canvas = viewer.renderer?.domElement as
          | HTMLCanvasElement
          | undefined;
        if (canvas) {
          canvasRef.current = canvas;
          canvas.style.position = "absolute";
          canvas.style.top = "0";
          canvas.style.left = "0";
          canvas.style.width = "100%";
          canvas.style.height = "100%";
          container.appendChild(canvas);

          // コンテナサイズに合わせてレンダラーをリサイズ
          const rect = container.getBoundingClientRect();
          viewer.renderer.setSize(rect.width, rect.height);
          viewer.camera.aspect = rect.width / rect.height;
          viewer.camera.updateProjectionMatrix();
        }

        // Viewer の loading UI 要素も移動（存在すれば）
        const loadingUI = document.querySelector(
          ".loader-container"
        ) as HTMLElement | null;
        if (loadingUI && loadingUI.parentNode === document.body) {
          loadingUI.remove();
        }

        await viewer.addSplatScene(url, {
          showLoadingUI: false,
          splatAlphaRemovalThreshold: 5,
        });

        if (disposed) {
          try {
            viewer.dispose();
          } catch {
            /* ignore */
          }
          return;
        }

        viewer.start();

        // リサイズ対応
        const ro = new ResizeObserver((entries) => {
          for (const entry of entries) {
            const { width, height } = entry.contentRect;
            if (width === 0 || height === 0) return;
            viewer.renderer?.setSize(width, height);
            if (viewer.camera) {
              viewer.camera.aspect = width / height;
              viewer.camera.updateProjectionMatrix();
            }
          }
        });
        ro.observe(container);

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

        return () => {
          ro.disconnect();
          container.removeEventListener("pointerdown", handleInteraction);
          container.removeEventListener("wheel", handleInteraction);
        };
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
      if (autoRotateTimerRef.current) clearTimeout(autoRotateTimerRef.current);

      const viewer = viewerRef.current;
      if (viewer) {
        try {
          viewer.dispose();
        } catch {
          /* ignore cleanup errors */
        }
        viewerRef.current = null;
      }

      // canvas が body に残っている場合も削除
      const canvas = canvasRef.current;
      if (canvas?.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      canvasRef.current = null;

      cleanupPromise?.then((cleanup) => cleanup?.());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}
    />
  );
}
