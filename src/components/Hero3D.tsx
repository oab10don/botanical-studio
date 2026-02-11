"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { PlantModel } from "@/types/plant";
import { useReducedMotion, useSaveData } from "@/lib/use-reduced-motion";
import InteractionHint from "./InteractionHint";

const SplatViewer = dynamic(() => import("./SplatViewer"), { ssr: false });
const MeshViewer = dynamic(() => import("./MeshViewer"), { ssr: false });

type ViewerState = "poster" | "loading" | "ready" | "error";

const LOAD_TIMEOUT_MS = 8000;

interface Hero3DProps {
  model: PlantModel;
  className?: string;
  priority?: boolean;
}

/**
 * 3Dヒーロー表示の統合コンポーネント
 * ポスター画像を即時表示し、3Dモデルを遅延ロード後にフェードイン
 */
export default function Hero3D({
  model,
  className = "",
  priority = false,
}: Hero3DProps) {
  const [state, setState] = useState<ViewerState>("poster");
  const reducedMotion = useReducedMotion();
  const saveData = useSaveData();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const shouldLoad3D = !saveData && !reducedMotion;

  // 3Dロード開始
  useEffect(() => {
    if (!shouldLoad3D) return;

    setState("loading");

    timeoutRef.current = setTimeout(() => {
      setState((prev) => (prev === "loading" ? "error" : prev));
    }, LOAD_TIMEOUT_MS);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [shouldLoad3D]);

  const handleLoad = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setState("ready");
  }, []);

  const handleError = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setState("error");
  }, []);

  const showPoster = state === "poster" || state === "error";
  const showViewer = state === "loading" || state === "ready";

  return (
    <div
      className={`relative overflow-hidden bg-[#f5f7f3] ${className}`}
    >
      {/* ポスター画像（即時表示、3D ready後にフェードアウト） */}
      <div
        className={`absolute inset-0 z-10 transition-opacity duration-700 ${
          state === "ready" ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <Image
          src={model.poster}
          alt="Plant preview"
          fill
          className="object-contain"
          priority={priority}
          sizes="100vw"
        />
      </div>

      {/* 3Dビューア */}
      {showViewer && (
        <div className="absolute inset-0">
          {model.type === "splat" ? (
            <SplatViewer
              url={model.url}
              onLoad={handleLoad}
              onError={handleError}
              autoRotate={!reducedMotion}
            />
          ) : (
            <MeshViewer
              url={model.url}
              poster={model.poster}
              onLoad={handleLoad}
              onError={handleError}
              autoRotate={!reducedMotion}
            />
          )}
        </div>
      )}

      {/* ローディングインジケーター */}
      {state === "loading" && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#6b8f5e] border-t-transparent" />
        </div>
      )}

      {/* 操作ヒント */}
      {state === "ready" && <InteractionHint />}

      {/* ポスター固定時のバッジ */}
      {showPoster && (saveData || reducedMotion) && (
        <div className="absolute bottom-4 left-4 z-20 rounded-full bg-white/80 px-3 py-1 text-xs text-gray-500 backdrop-blur-sm">
          {saveData ? "データセーバー有効" : "モーション軽減モード"}
        </div>
      )}
    </div>
  );
}
