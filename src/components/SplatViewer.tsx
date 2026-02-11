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
  const viewerElRef = useRef<HTMLDivElement | null>(null);
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

    // コンテナの実ピクセルサイズを取得
    const rect = container.getBoundingClientRect();

    // 非React管理の子divを明示的ピクセルサイズで作成
    // ライブラリは rootElement.offsetWidth/offsetHeight でサイズ取得するため
    const viewerEl = document.createElement("div");
    viewerEl.style.width = rect.width + "px";
    viewerEl.style.height = rect.height + "px";
    container.appendChild(viewerEl);
    viewerElRef.current = viewerEl;

    console.log("[SplatViewer] container:", rect.width, "x", rect.height);
    console.log("[SplatViewer] viewerEl offset:", viewerEl.offsetWidth, "x", viewerEl.offsetHeight);

    async function init(container: HTMLDivElement) {
      try {
        const mod = await import("@mkkellogg/gaussian-splats-3d");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const GS3D = (mod as any).default ?? mod;

        if (disposed) return;

        const viewer = new GS3D.Viewer({
          rootElement: viewerEl,
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

        // canvas サイズ確認
        const canvas = viewerEl.querySelector("canvas");
        console.log("[SplatViewer] canvas:", canvas?.width, "x", canvas?.height);

        // ライブラリが body に追加する loading UI を削除
        const loadingUI = document.querySelector(
          ".loader-container"
        ) as HTMLElement | null;
        if (loadingUI) loadingUI.remove();

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

        // カメラ位置を確認
        if (viewer.camera) {
          const p = viewer.camera.position;
          console.log("[SplatViewer] camera:", p.x.toFixed(2), p.y.toFixed(2), p.z.toFixed(2));
        }

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
          console.error("[SplatViewer] error:", error);
          onError?.(error);
        }
      }
    }

    init(container);

    // コンテナリサイズ → viewerEl サイズ更新（ライブラリの ResizeObserver が検知）
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width === 0 || height === 0) return;
        viewerEl.style.width = width + "px";
        viewerEl.style.height = height + "px";
      }
    });
    ro.observe(container);

    return () => {
      disposed = true;
      ro.disconnect();
      if (autoRotateTimerRef.current) clearTimeout(autoRotateTimerRef.current);
      container.removeEventListener("pointerdown", handleInteraction);
      container.removeEventListener("wheel", handleInteraction);

      const viewer = viewerRef.current;
      if (viewer) {
        // dispose() は内部で document.body.removeChild(rootElement) を実行するが、
        // viewerEl は body の子ではないためエラーになる → try/catch で無視
        try {
          viewer.dispose();
        } catch {
          /* ignore: library assumes rootElement is child of body */
        }
        viewerRef.current = null;
      }

      // viewerEl を手動で削除
      if (viewerEl.parentNode) {
        viewerEl.parentNode.removeChild(viewerEl);
      }
      viewerElRef.current = null;
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
