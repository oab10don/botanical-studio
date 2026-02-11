"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * 3D操作のヒントを表示するコンポーネント
 * ユーザーがドラッグ操作をするまで表示し続ける
 */
export default function InteractionHint() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  const handleInteraction = useCallback(() => {
    if (!fading) {
      setFading(true);
      setTimeout(() => setVisible(false), 1000);
    }
  }, [fading]);

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      // ドラッグ中（ボタン押下状態での移動）のみ反応
      if (e.buttons > 0) {
        handleInteraction();
      }
    };
    const onTouchMove = () => {
      handleInteraction();
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("touchmove", onTouchMove);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [handleInteraction]);

  if (!visible) return null;

  return (
    <div
      className={`pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 rounded-full bg-black/50 px-5 py-2.5 text-sm text-white backdrop-blur-sm transition-opacity duration-1000 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M14 8V6a2 2 0 0 0-4 0v2" />
        <path d="M18 12V8a2 2 0 0 0-4 0v4" />
        <path d="M22 12v1a10 10 0 0 1-20 0v-1a2 2 0 0 1 4 0v0a2 2 0 0 0 4 0V6a2 2 0 0 1 4 0v6" />
      </svg>
      <span>ドラッグで回転できます</span>
    </div>
  );
}
