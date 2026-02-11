"use client";

import { useEffect, useRef } from "react";

interface MeshViewerProps {
  url: string;
  poster?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  autoRotate?: boolean;
  className?: string;
}

// model-viewer Web Component の JSX 型定義
type ModelViewerAttributes = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement> & {
    src?: string;
    poster?: string;
    "camera-controls"?: boolean;
    "auto-rotate"?: boolean;
    "auto-rotate-delay"?: string;
    "rotation-per-second"?: string;
    "shadow-intensity"?: string;
    "shadow-softness"?: string;
    exposure?: string;
    "environment-image"?: string;
    "interaction-prompt"?: string;
    "camera-orbit"?: string;
    "field-of-view"?: string;
    ar?: boolean;
    loading?: "auto" | "lazy" | "eager";
    reveal?: "auto" | "manual";
    alt?: string;
  },
  HTMLElement
>;

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerAttributes;
    }
  }
}

/**
 * GLB/USDZ メッシュモデルを表示するコンポーネント
 * @google/model-viewer Web Component を使用
 */
export default function MeshViewer({
  url,
  poster,
  onLoad,
  onError,
  autoRotate = true,
  className,
}: MeshViewerProps) {
  const modelViewerRef = useRef<HTMLElement>(null);
  const importedRef = useRef(false);

  // model-viewer を動的インポート（SSR回避）
  useEffect(() => {
    if (importedRef.current) return;
    importedRef.current = true;
    import("@google/model-viewer").catch((err) => {
      console.error("[MeshViewer] Failed to load model-viewer:", err);
    });
  }, []);

  useEffect(() => {
    const el = modelViewerRef.current;
    if (!el) return;

    const handleLoad = () => onLoad?.();
    const handleError = (e: Event) => {
      const error = new Error(
        (e as CustomEvent)?.detail?.message ?? "Model load failed"
      );
      console.error("[MeshViewer] Load error:", error);
      onError?.(error);
    };

    el.addEventListener("load", handleLoad);
    el.addEventListener("error", handleError);

    return () => {
      el.removeEventListener("load", handleLoad);
      el.removeEventListener("error", handleError);
    };
  }, [onLoad, onError]);

  return (
    <model-viewer
      ref={modelViewerRef}
      src={url}
      poster={poster}
      camera-controls
      auto-rotate={autoRotate}
      auto-rotate-delay="0"
      rotation-per-second="15deg"
      shadow-intensity="0.5"
      exposure="1"
      interaction-prompt="none"
      loading="eager"
      alt="3D plant model"
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
