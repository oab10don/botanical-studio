"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { PlantCard } from "@/data/plants";

interface PlantDetailModalProps {
  plant: PlantCard | null;
  onClose: () => void;
}

/**
 * 植物の詳細ポップアップ
 * 3D Gaussian Splat モデル + テキスト情報を表示
 */
export default function PlantDetailModal({
  plant,
  onClose,
}: PlantDetailModalProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const viewerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hintVisible, setHintVisible] = useState(true);
  const [hintFading, setHintFading] = useState(false);

  // モーダルが開くたびにヒントをリセット
  useEffect(() => {
    if (plant) {
      setHintVisible(true);
      setHintFading(false);
    }
  }, [plant]);

  const dismissHint = useCallback(() => {
    if (!hintFading) {
      setHintFading(true);
      setTimeout(() => setHintVisible(false), 1000);
    }
  }, [hintFading]);

  useEffect(() => {
    if (!plant || !hintVisible) return;
    const onPointerMove = (e: PointerEvent) => {
      if (e.buttons > 0) dismissHint();
    };
    const onTouchMove = () => dismissHint();
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("touchmove", onTouchMove);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [plant, hintVisible, dismissHint]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!plant) return;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [plant, handleKeyDown]);

  // 3D Viewer のセットアップ
  useEffect(() => {
    if (!plant || !containerRef.current) return;

    let disposed = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let viewer: any = null;

    (async () => {
      const mod = await import("@mkkellogg/gaussian-splats-3d");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const GS3D = (mod as any).default ?? mod;

      if (disposed) return;

      viewer = new GS3D.Viewer({
        selfDrivenMode: true,
        useBuiltInControls: true,
        rootElement: containerRef.current,
        cameraUp: [0, 1, 0],
        initialCameraPosition: [0, -0.2, 1.8],
        initialCameraLookAt: [0, 0.2, 0],
        sharedMemoryForWorkers:
          typeof crossOriginIsolated !== "undefined" && crossOriginIsolated,
      });

      viewerRef.current = viewer;

      await viewer.addSplatScene(plant.modelUrl, {
        showLoadingUI: false,
        splatAlphaRemovalThreshold: 5,
      });

      if (disposed) return;

      viewer.start();

      if (viewer.controls) {
        viewer.controls.enablePan = false;
        viewer.controls.enableZoom = false;
        viewer.controls.autoRotate = true;
        viewer.controls.autoRotateSpeed = 0.8;
        viewer.controls.maxPolarAngle = Math.PI * 0.75;
        viewer.controls.minPolarAngle = Math.PI * 0.25;
      }

      function lockTarget() {
        if (disposed) return;
        if (viewer?.controls) {
          viewer.controls.target.set(0, 0.2, 0);
        }
        requestAnimationFrame(lockTarget);
      }
      lockTarget();
    })();

    return () => {
      disposed = true;
      try {
        viewerRef.current?.dispose();
      } catch {
        /* ignore */
      }
      viewerRef.current = null;
      // Viewer が rootElement 内に作成した canvas を削除
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [plant]);

  if (!plant) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-[#fafcf8] shadow-xl">
        {/* 閉じるボタン */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white transition-colors hover:bg-black/50"
          aria-label="閉じる"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* 3Dモデル表示エリア */}
        <div className="relative">
          <div
            ref={containerRef}
            className="aspect-square w-full overflow-hidden rounded-t-2xl bg-[#e8f0e4]"
          />
          {hintVisible && (
            <div
              className={`pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-xs text-white backdrop-blur-sm transition-opacity duration-1000 ${
                hintFading ? "opacity-0" : "opacity-100"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 8V6a2 2 0 0 0-4 0v2" />
                <path d="M18 12V8a2 2 0 0 0-4 0v4" />
                <path d="M22 12v1a10 10 0 0 1-20 0v-1a2 2 0 0 1 4 0v0a2 2 0 0 0 4 0V6a2 2 0 0 1 4 0v6" />
              </svg>
              ドラッグで回転できます
            </div>
          )}
        </div>

        {/* テキスト情報 */}
        <div className="p-5">
          <h2 className="text-lg font-medium text-[#2d2d2d]">{plant.name}</h2>
          <p className="mt-1 text-xs text-[#5a7a50]">{plant.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-gray-500">
            {plant.description}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
